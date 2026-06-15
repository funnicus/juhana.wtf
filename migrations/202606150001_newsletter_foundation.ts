import { sql, type Kysely } from 'kysely';

const themeSlugs = [
	'builder-notes',
	'from-agency-to-studio',
	'myth-meaning-direction',
	'personal-operating-system',
	'creative-practice'
];

const subscriberStatuses = ['pending', 'active', 'unsubscribed'];
const campaignStatuses = ['draft', 'queued', 'sending', 'sent', 'failed'];
const deliveryStatuses = ['queued', 'sending', 'sent', 'failed'];

const textList = (values: string[]) => sql.join(values.map((value) => sql.lit(value)));

export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.createTable('subscribers')
		.addColumn('id', 'integer', (column) => column.generatedAlwaysAsIdentity().primaryKey())
		.addColumn('email', 'text', (column) => column.notNull().unique())
		.addColumn('status', 'text', (column) =>
			column
				.notNull()
				.defaultTo('pending')
				.check(sql`status in (${textList(subscriberStatuses)})`)
		)
		.addColumn('created_at', 'timestamptz', (column) => column.notNull().defaultTo(sql`now()`))
		.addColumn('updated_at', 'timestamptz', (column) => column.notNull().defaultTo(sql`now()`))
		.addColumn('confirmed_at', 'timestamptz')
		.addColumn('confirmation_token_hash', 'text')
		.addColumn('confirmation_expires_at', 'timestamptz')
		.addColumn('unsubscribe_token_hash', 'text')
		.execute();

	await db.schema
		.createTable('subscriber_theme_preferences')
		.addColumn('subscriber_id', 'integer', (column) =>
			column.notNull().references('subscribers.id').onDelete('cascade')
		)
		.addColumn('theme_slug', 'text', (column) =>
			column.notNull().check(sql`theme_slug in (${textList(themeSlugs)})`)
		)
		.addColumn('created_at', 'timestamptz', (column) => column.notNull().defaultTo(sql`now()`))
		.addPrimaryKeyConstraint('subscriber_theme_preferences_pkey', ['subscriber_id', 'theme_slug'])
		.execute();

	await db.schema
		.createTable('email_campaigns')
		.addColumn('id', 'integer', (column) => column.generatedAlwaysAsIdentity().primaryKey())
		.addColumn('post_slug', 'text', (column) => column.notNull())
		.addColumn('post_theme', 'text', (column) =>
			column.notNull().check(sql`post_theme in (${textList(themeSlugs)})`)
		)
		.addColumn('subject', 'text', (column) => column.notNull())
		.addColumn('status', 'text', (column) =>
			column
				.notNull()
				.defaultTo('draft')
				.check(sql`status in (${textList(campaignStatuses)})`)
		)
		.addColumn('created_at', 'timestamptz', (column) => column.notNull().defaultTo(sql`now()`))
		.addColumn('queued_at', 'timestamptz')
		.addColumn('sent_at', 'timestamptz')
		.execute();

	await db.schema
		.createIndex('email_campaigns_post_slug_idx')
		.on('email_campaigns')
		.column('post_slug')
		.execute();

	await db.schema
		.createTable('email_deliveries')
		.addColumn('id', 'integer', (column) => column.generatedAlwaysAsIdentity().primaryKey())
		.addColumn('campaign_id', 'integer', (column) =>
			column.notNull().references('email_campaigns.id').onDelete('cascade')
		)
		.addColumn('subscriber_id', 'integer', (column) =>
			column.notNull().references('subscribers.id').onDelete('cascade')
		)
		.addColumn('status', 'text', (column) =>
			column
				.notNull()
				.defaultTo('queued')
				.check(sql`status in (${textList(deliveryStatuses)})`)
		)
		.addColumn('attempt_count', 'integer', (column) => column.notNull().defaultTo(0))
		.addColumn('claimed_at', 'timestamptz')
		.addColumn('sent_at', 'timestamptz')
		.addColumn('provider_message_id', 'text')
		.addColumn('error', 'text')
		.addColumn('created_at', 'timestamptz', (column) => column.notNull().defaultTo(sql`now()`))
		.addColumn('updated_at', 'timestamptz', (column) => column.notNull().defaultTo(sql`now()`))
		.execute();

	await db.schema
		.createIndex('email_deliveries_campaign_status_idx')
		.on('email_deliveries')
		.columns(['campaign_id', 'status'])
		.execute();

	await db.schema
		.createIndex('email_deliveries_subscriber_idx')
		.on('email_deliveries')
		.column('subscriber_id')
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('email_deliveries').ifExists().execute();
	await db.schema.dropTable('email_campaigns').ifExists().execute();
	await db.schema.dropTable('subscriber_theme_preferences').ifExists().execute();
	await db.schema.dropTable('subscribers').ifExists().execute();
}
