import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { Kysely, PostgresDialect } from 'kysely';
import { FileMigrationProvider, Migrator } from 'kysely/migration';
import pg from 'pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	console.error('DATABASE_URL is required to run migrations.');
	process.exit(1);
}

const dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationFolder = path.resolve(dirname, '../../migrations');

const db = new Kysely<unknown>({
	dialect: new PostgresDialect({
		pool: new pg.Pool({
			connectionString: databaseUrl
		})
	})
});

const migrator = new Migrator({
	db,
	provider: new FileMigrationProvider({
		fs,
		migrationFolder,
		path,
		import: async (modulePath) => import(pathToFileURL(modulePath).href)
	})
});

const { error, results } = await migrator.migrateToLatest();

results?.forEach((result) => {
	const status = result.status === 'Success' ? 'migrated' : result.status.toLowerCase();
	console.log(`${status}: ${result.migrationName}`);
});

await db.destroy();

if (error) {
	console.error('Migration failed.');
	console.error(error);
	process.exit(1);
}

console.log('Migrations complete.');
