import { sql, type Kysely } from 'kysely';

const themeSlugs = [
	'builder-notes',
	'from-agency-to-studio',
	'myth-meaning-direction',
	'personal-operating-system',
	'creative-practice'
];

const textList = (values: string[]) => sql.join(values.map((value) => sql.lit(value)));

export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.createTable('subscriber_pending_theme_preferences')
		.addColumn('subscriber_id', 'integer', (column) =>
			column.notNull().references('subscribers.id').onDelete('cascade')
		)
		.addColumn('theme_slug', 'text', (column) =>
			column.notNull().check(sql`theme_slug in (${textList(themeSlugs)})`)
		)
		.addColumn('created_at', 'timestamptz', (column) => column.notNull().defaultTo(sql`now()`))
		.addPrimaryKeyConstraint('subscriber_pending_theme_preferences_pkey', [
			'subscriber_id',
			'theme_slug'
		])
		.execute();

	await sql`
		create unique index subscribers_confirmation_token_hash_idx
		on subscribers (confirmation_token_hash)
		where confirmation_token_hash is not null
	`.execute(db);

	await sql`
		create unique index subscribers_unsubscribe_token_hash_idx
		on subscribers (unsubscribe_token_hash)
		where unsubscribe_token_hash is not null
	`.execute(db);
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropIndex('subscribers_unsubscribe_token_hash_idx').ifExists().execute();
	await db.schema.dropIndex('subscribers_confirmation_token_hash_idx').ifExists().execute();
	await db.schema.dropTable('subscriber_pending_theme_preferences').ifExists().execute();
}
