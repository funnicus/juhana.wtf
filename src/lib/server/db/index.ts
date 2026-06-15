import { env } from '$env/dynamic/private';
import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
import type { Database } from './schema';

let db: Kysely<Database> | undefined;

export const createDb = (connectionString = env.DATABASE_URL): Kysely<Database> => {
	if (!connectionString) {
		throw new Error('DATABASE_URL is required for database access.');
	}

	return new Kysely<Database>({
		dialect: new PostgresDialect({
			pool: new pg.Pool({
				connectionString
			})
		})
	});
};

export const getDb = (): Kysely<Database> => {
	db ??= createDb();

	return db;
};

export const closeDb = async () => {
	await db?.destroy();
	db = undefined;
};
