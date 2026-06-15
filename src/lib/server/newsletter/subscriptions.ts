import { sql } from 'kysely';
import type { ThemeSlug } from '$lib/blog/themes';
import { isThemeSlug } from '$lib/blog/themes';
import { getDb } from '$lib/server/db';
import { generateToken, hashToken } from './tokens';

const CONFIRMATION_DAYS = 7;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubscribeResult = {
	email: string;
	confirmationToken: string;
	unsubscribeToken?: string;
	themes: ThemeSlug[];
};

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const parseThemeSlugs = (values: FormDataEntryValue[]): ThemeSlug[] => {
	const unique = new Set<ThemeSlug>();

	values.forEach((value) => {
		if (typeof value === 'string' && isThemeSlug(value)) {
			unique.add(value);
		}
	});

	return [...unique];
};

export const isValidEmail = (email: string) => EMAIL_RE.test(email);

export const createPendingSubscription = async (
	emailInput: string,
	themes: ThemeSlug[]
): Promise<SubscribeResult> => {
	const email = normalizeEmail(emailInput);

	if (!isValidEmail(email)) {
		throw new Error('Invalid email');
	}

	if (themes.length === 0) {
		throw new Error('At least one theme is required');
	}

	const confirmationToken = generateToken();
	const unsubscribeToken = generateToken();
	const confirmationTokenHash = hashToken(confirmationToken);
	const unsubscribeTokenHash = hashToken(unsubscribeToken);
	const confirmationExpiresAt = new Date(Date.now() + CONFIRMATION_DAYS * 24 * 60 * 60 * 1000);
	const db = getDb();
	let shouldSendUnsubscribeToken = true;

	await db.transaction().execute(async (trx) => {
		const existing = await trx
			.selectFrom('subscribers')
			.select(['id', 'status', 'unsubscribe_token_hash'])
			.where('email', '=', email)
			.executeTakeFirst();

		const subscriber =
			existing ??
			(await trx
				.insertInto('subscribers')
				.values({
					email,
					status: 'pending',
					confirmation_token_hash: confirmationTokenHash,
					confirmation_expires_at: confirmationExpiresAt,
					unsubscribe_token_hash: unsubscribeTokenHash
				})
				.returning(['id', 'status'])
				.executeTakeFirstOrThrow());

		if (existing) {
			const keepExistingUnsubscribeToken =
				existing.status === 'active' && existing.unsubscribe_token_hash !== null;
			shouldSendUnsubscribeToken = !keepExistingUnsubscribeToken;

			await trx
				.updateTable('subscribers')
				.set({
					status: existing.status === 'active' ? 'active' : 'pending',
					confirmation_token_hash: confirmationTokenHash,
					confirmation_expires_at: confirmationExpiresAt,
					unsubscribe_token_hash: keepExistingUnsubscribeToken
						? existing.unsubscribe_token_hash
						: unsubscribeTokenHash,
					updated_at: sql`now()`
				})
				.where('id', '=', subscriber.id)
				.execute();
		}

		await trx
			.deleteFrom('subscriber_pending_theme_preferences')
			.where('subscriber_id', '=', subscriber.id)
			.execute();

		await trx
			.insertInto('subscriber_pending_theme_preferences')
			.values(themes.map((themeSlug) => ({ subscriber_id: subscriber.id, theme_slug: themeSlug })))
			.execute();
	});

	return {
		email,
		confirmationToken,
		unsubscribeToken: shouldSendUnsubscribeToken ? unsubscribeToken : undefined,
		themes
	};
};

export const confirmSubscription = async (token: string) => {
	const tokenHash = hashToken(token);
	const db = getDb();

	return await db.transaction().execute(async (trx) => {
		const subscriber = await trx
			.selectFrom('subscribers')
			.select(['id', 'confirmation_expires_at'])
			.where('confirmation_token_hash', '=', tokenHash)
			.executeTakeFirst();

		if (!subscriber || !subscriber.confirmation_expires_at) {
			return false;
		}

		if (new Date(subscriber.confirmation_expires_at) < new Date()) {
			return false;
		}

		const pendingThemes = await trx
			.selectFrom('subscriber_pending_theme_preferences')
			.select('theme_slug')
			.where('subscriber_id', '=', subscriber.id)
			.execute();

		if (pendingThemes.length === 0) {
			return false;
		}

		await trx
			.deleteFrom('subscriber_theme_preferences')
			.where('subscriber_id', '=', subscriber.id)
			.execute();

		await trx
			.insertInto('subscriber_theme_preferences')
			.values(
				pendingThemes.map(({ theme_slug }) => ({
					subscriber_id: subscriber.id,
					theme_slug
				}))
			)
			.execute();

		await trx
			.deleteFrom('subscriber_pending_theme_preferences')
			.where('subscriber_id', '=', subscriber.id)
			.execute();

		await trx
			.updateTable('subscribers')
			.set({
				status: 'active',
				confirmed_at: sql`now()`,
				confirmation_token_hash: null,
				confirmation_expires_at: null,
				updated_at: sql`now()`
			})
			.where('id', '=', subscriber.id)
			.execute();

		return true;
	});
};

export const unsubscribeAll = async (token: string) => {
	const tokenHash = hashToken(token);
	const db = getDb();

	await db.transaction().execute(async (trx) => {
		const subscriber = await trx
			.selectFrom('subscribers')
			.select('id')
			.where('unsubscribe_token_hash', '=', tokenHash)
			.executeTakeFirst();

		if (!subscriber) {
			return;
		}

		await trx
			.updateTable('subscribers')
			.set({
				status: 'unsubscribed',
				confirmation_token_hash: null,
				confirmation_expires_at: null,
				updated_at: sql`now()`
			})
			.where('id', '=', subscriber.id)
			.execute();

		await trx
			.deleteFrom('subscriber_theme_preferences')
			.where('subscriber_id', '=', subscriber.id)
			.execute();

		await trx
			.deleteFrom('subscriber_pending_theme_preferences')
			.where('subscriber_id', '=', subscriber.id)
			.execute();
	});
};
