import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { isThemeSlug, type ThemeSlug } from '../../../src/lib/blog/themes';

export type CampaignPost = {
	slug: string;
	title: string;
	description: string;
	date: string;
	theme: ThemeSlug;
	draft: boolean;
};

const postsDir = path.resolve('src/routes/blog/posts');

const unquote = (value: string) => value.trim().replace(/^['"]|['"]$/g, '');

const parseFrontmatter = (source: string, slug: string): CampaignPost => {
	const match = source.match(/^---\s*\n([\s\S]*?)\n---/);

	if (!match) {
		throw new Error(`Post ${slug} is missing frontmatter.`);
	}

	const values = new Map<string, string>();

	match[1].split('\n').forEach((line) => {
		const separator = line.indexOf(':');

		if (separator === -1 || line.startsWith(' ') || line.startsWith('\t')) {
			return;
		}

		values.set(line.slice(0, separator).trim(), unquote(line.slice(separator + 1)));
	});

	const title = values.get('title');
	const description = values.get('description');
	const date = values.get('date');
	const theme = values.get('theme');
	const draft = values.get('draft');

	if (!title || !description || !date || !theme || !isThemeSlug(theme)) {
		throw new Error(`Post ${slug} has invalid campaign frontmatter.`);
	}

	return {
		slug,
		title,
		description,
		date,
		theme,
		draft: draft === 'true'
	};
};

export const getCampaignPost = async (slug: string): Promise<CampaignPost> => {
	const postPath = path.join(postsDir, `${slug}.md`);
	const source = await readFile(postPath, 'utf-8');
	const post = parseFrontmatter(source, slug);

	if (post.draft || new Date(post.date) > new Date()) {
		throw new Error(`Post ${slug} is not published.`);
	}

	return post;
};
