import { sql, type Kysely } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('email_deliveries')
		.addColumn('unsubscribe_token_hash', 'text')
		.execute();

	await db.schema.dropIndex('email_campaigns_post_slug_idx').ifExists().execute();

	await db.schema
		.createIndex('email_campaigns_post_slug_unique_idx')
		.on('email_campaigns')
		.column('post_slug')
		.unique()
		.execute();

	await db.schema
		.createIndex('email_deliveries_campaign_subscriber_unique_idx')
		.on('email_deliveries')
		.columns(['campaign_id', 'subscriber_id'])
		.unique()
		.execute();

	await sql`
		create unique index email_deliveries_unsubscribe_token_hash_idx
		on email_deliveries (unsubscribe_token_hash)
		where unsubscribe_token_hash is not null
	`.execute(db);
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropIndex('email_deliveries_unsubscribe_token_hash_idx').ifExists().execute();
	await db.schema.dropIndex('email_deliveries_campaign_subscriber_unique_idx').ifExists().execute();
	await db.schema.dropIndex('email_campaigns_post_slug_unique_idx').ifExists().execute();

	await db.schema
		.createIndex('email_campaigns_post_slug_idx')
		.on('email_campaigns')
		.column('post_slug')
		.execute();

	await db.schema.alterTable('email_deliveries').dropColumn('unsubscribe_token_hash').execute();
}
