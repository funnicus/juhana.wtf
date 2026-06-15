import { createScriptDb } from './lib/db';
import { queueCampaign } from './lib/campaigns';
import { commandArgs } from './lib/args';

const [slug] = commandArgs();

if (!slug) {
	console.error('Usage: pnpm blog:campaign:queue -- <post-slug>');
	process.exit(1);
}

try {
	const db = createScriptDb();
	const result = await queueCampaign(db, slug);
	console.log(result.message);
	await db.destroy();
} catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
}
