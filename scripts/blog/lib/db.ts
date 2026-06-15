import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
import type { Database } from '../../../src/lib/server/db/schema';

export const createScriptDb = () => {
	const connectionString = process.env.DATABASE_URL;

	if (!connectionString) {
		throw new Error('DATABASE_URL is required.');
	}

	return new Kysely<Database>({
		dialect: new PostgresDialect({
			pool: new pg.Pool({
				connectionString
			})
		})
	});
};
