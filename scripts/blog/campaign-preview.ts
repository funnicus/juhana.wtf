import { previewCampaign } from './lib/campaigns';
import { commandArgs } from './lib/args';

const [slug, email] = commandArgs();

if (!slug) {
	console.error('Usage: pnpm blog:campaign:preview -- <post-slug> [email]');
	process.exit(1);
}

try {
	await previewCampaign(slug, email);
} catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
}
