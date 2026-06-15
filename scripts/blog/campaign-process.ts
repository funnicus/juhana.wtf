import { createScriptDb } from './lib/db';
import { processCampaign } from './lib/campaigns';
import { commandArgs } from './lib/args';

const [slug, limitArg] = commandArgs();
const limit = limitArg ? Number(limitArg) : 100;

if (!slug || !Number.isInteger(limit) || limit < 1) {
	console.error('Usage: pnpm blog:campaign:process -- <post-slug> [limit]');
	process.exit(1);
}

try {
	const db = createScriptDb();
	const result = await processCampaign(db, slug, limit);
	console.log(result.message);
	await db.destroy();
} catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
}
