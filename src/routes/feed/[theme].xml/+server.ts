import { error, type RequestHandler } from '@sveltejs/kit';
import { getPostsByTheme } from '$lib/blog/posts';
import { createRssFeed } from '$lib/blog/rss';
import { getTheme } from '$lib/blog/themes';

export const GET: RequestHandler = async ({ params }) => {
	const theme = getTheme(params.theme ?? '');

	if (!theme) {
		error(404, 'Theme not found');
	}

	const posts = await getPostsByTheme(theme.slug);
	const xml = createRssFeed({
		title: `${theme.name} – Juhana Kuparinen`,
		description: theme.description,
		path: `/feed/${theme.slug}.xml`,
		posts
	});

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'max-age=3600'
		}
	});
};
