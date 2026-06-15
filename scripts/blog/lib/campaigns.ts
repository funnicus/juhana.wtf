import { sql, type Kysely } from 'kysely';
import type { Database } from '../../../src/lib/server/db/schema';
import { generateToken, hashToken } from '../../../src/lib/server/newsletter/tokens';
import { getCampaignConfig } from './config';
import { renderCampaignEmail, sendCampaignEmail } from './email';
import { getCampaignPost } from './posts';

type CampaignDelivery = {
	id: number;
	email: string;
};

const getCampaignBySlug = async (db: Kysely<Database>, slug: string) =>
	await db
		.selectFrom('email_campaigns')
		.selectAll()
		.where('post_slug', '=', slug)
		.executeTakeFirst();

const refreshCampaignStatus = async (db: Kysely<Database>, campaignId: number) => {
	const rows = await db
		.selectFrom('email_deliveries')
		.select(({ fn }) => ['status', fn.count<number>('id').as('count')])
		.where('campaign_id', '=', campaignId)
		.groupBy('status')
		.execute();

	const counts = new Map(rows.map((row) => [row.status, Number(row.count)]));
	const queued = counts.get('queued') ?? 0;
	const sending = counts.get('sending') ?? 0;
	const failed = counts.get('failed') ?? 0;

	if (queued + sending > 0) {
		await db
			.updateTable('email_campaigns')
			.set({ status: 'sending' })
			.where('id', '=', campaignId)
			.execute();
		return 'sending';
	}

	if (failed > 0) {
		await db
			.updateTable('email_campaigns')
			.set({ status: 'failed' })
			.where('id', '=', campaignId)
			.execute();
		return 'failed';
	}

	await db
		.updateTable('email_campaigns')
		.set({ status: 'sent', sent_at: sql`now()` })
		.where('id', '=', campaignId)
		.execute();

	return 'sent';
};

export const previewCampaign = async (slug: string, email?: string) => {
	const post = await getCampaignPost(slug);
	const unsubscribeToken = 'preview-token';
	const preview = renderCampaignEmail({
		post,
		siteUrl: process.env.PUBLIC_SITE_URL || 'https://juhana.wtf',
		unsubscribeToken
	});

	console.log(`Subject: ${preview.subject}`);
	console.log('');
	console.log(preview.text);

	if (!email) {
		return;
	}

	const config = getCampaignConfig();
	const messageId = await sendCampaignEmail({
		config,
		to: email,
		post,
		unsubscribeToken
	});

	console.log('');
	console.log(`Preview sent to ${email}: ${messageId}`);
};

export const queueCampaign = async (db: Kysely<Database>, slug: string) => {
	const post = await getCampaignPost(slug);
	const existing = await getCampaignBySlug(db, slug);

	if (existing) {
		return {
			campaignId: existing.id,
			status: existing.status,
			queuedDeliveries: 0,
			message: `Campaign already exists with status ${existing.status}.`
		};
	}

	return await db.transaction().execute(async (trx) => {
		const campaign = await trx
			.insertInto('email_campaigns')
			.values({
				post_slug: post.slug,
				post_theme: post.theme,
				subject: post.title,
				status: 'queued',
				queued_at: sql`now()`
			})
			.returning(['id', 'status'])
			.executeTakeFirstOrThrow();

		const subscribers = await trx
			.selectFrom('subscribers')
			.innerJoin(
				'subscriber_theme_preferences',
				'subscriber_theme_preferences.subscriber_id',
				'subscribers.id'
			)
			.select(['subscribers.id'])
			.where('subscribers.status', '=', 'active')
			.where('subscriber_theme_preferences.theme_slug', '=', post.theme)
			.execute();

		if (subscribers.length > 0) {
			await trx
				.insertInto('email_deliveries')
				.values(
					subscribers.map((subscriber) => ({
						campaign_id: campaign.id,
						subscriber_id: subscriber.id,
						status: 'queued'
					}))
				)
				.onConflict((conflict) => conflict.columns(['campaign_id', 'subscriber_id']).doNothing())
				.execute();
		}

		return {
			campaignId: campaign.id,
			status: campaign.status,
			queuedDeliveries: subscribers.length,
			message: `Queued campaign ${campaign.id} for ${subscribers.length} subscribers.`
		};
	});
};

const claimDeliveries = async (
	db: Kysely<Database>,
	campaignId: number,
	limit: number
): Promise<CampaignDelivery[]> =>
	await db.transaction().execute(async (trx) => {
		const deliveries = await trx
			.selectFrom('email_deliveries')
			.innerJoin('subscribers', 'subscribers.id', 'email_deliveries.subscriber_id')
			.select(['email_deliveries.id', 'subscribers.email'])
			.where('email_deliveries.campaign_id', '=', campaignId)
			.where('email_deliveries.status', '=', 'queued')
			.orderBy('email_deliveries.id')
			.limit(limit)
			.forUpdate()
			.skipLocked()
			.execute();

		if (deliveries.length === 0) {
			return [];
		}

		await trx
			.updateTable('email_deliveries')
			.set({
				status: 'sending',
				claimed_at: sql`now()`,
				attempt_count: sql`attempt_count + 1`,
				updated_at: sql`now()`
			})
			.where(
				'id',
				'in',
				deliveries.map((delivery) => delivery.id)
			)
			.execute();

		return deliveries;
	});

export const processCampaign = async (db: Kysely<Database>, slug: string, limit: number) => {
	const campaign = await getCampaignBySlug(db, slug);

	if (!campaign) {
		throw new Error(`Campaign for post ${slug} does not exist. Queue it first.`);
	}

	if (campaign.status === 'sent') {
		return { processed: 0, failed: 0, status: 'sent', message: 'Campaign is already sent.' };
	}

	const post = await getCampaignPost(campaign.post_slug);
	const config = getCampaignConfig();

	await db
		.updateTable('email_campaigns')
		.set({ status: 'sending' })
		.where('id', '=', campaign.id)
		.execute();

	const deliveries = await claimDeliveries(db, campaign.id, limit);
	let sent = 0;
	let failed = 0;

	for (const delivery of deliveries) {
		const unsubscribeToken = generateToken();
		const unsubscribeTokenHash = hashToken(unsubscribeToken);

		try {
			await db
				.updateTable('email_deliveries')
				.set({
					unsubscribe_token_hash: unsubscribeTokenHash,
					updated_at: sql`now()`
				})
				.where('id', '=', delivery.id)
				.execute();

			const messageId = await sendCampaignEmail({
				config,
				to: delivery.email,
				post,
				unsubscribeToken
			});

			await db
				.updateTable('email_deliveries')
				.set({
					status: 'sent',
					provider_message_id: messageId,
					error: null,
					sent_at: sql`now()`,
					updated_at: sql`now()`
				})
				.where('id', '=', delivery.id)
				.execute();
			sent += 1;
		} catch (error) {
			await db
				.updateTable('email_deliveries')
				.set({
					status: 'failed',
					error: error instanceof Error ? error.message : String(error),
					updated_at: sql`now()`
				})
				.where('id', '=', delivery.id)
				.execute();
			failed += 1;
		}
	}

	const status = await refreshCampaignStatus(db, campaign.id);

	return {
		processed: deliveries.length,
		sent,
		failed,
		status,
		message: `Processed ${deliveries.length} deliveries: ${sent} sent, ${failed} failed. Campaign is ${status}.`
	};
};

export const retryCampaign = async (db: Kysely<Database>, slug: string) => {
	const campaign = await getCampaignBySlug(db, slug);

	if (!campaign) {
		throw new Error(`Campaign for post ${slug} does not exist.`);
	}

	const result = await db
		.updateTable('email_deliveries')
		.set({
			status: 'queued',
			claimed_at: null,
			error: null,
			unsubscribe_token_hash: null,
			updated_at: sql`now()`
		})
		.where('campaign_id', '=', campaign.id)
		.where('status', '=', 'failed')
		.executeTakeFirst();

	const retried = Number(result.numUpdatedRows);

	if (retried > 0) {
		await db
			.updateTable('email_campaigns')
			.set({
				status: 'queued',
				queued_at: sql`now()`,
				sent_at: null
			})
			.where('id', '=', campaign.id)
			.execute();
	}

	return {
		retried,
		message: `Re-queued ${retried} failed deliveries.`
	};
};
