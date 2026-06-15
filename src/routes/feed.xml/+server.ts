import type { RequestHandler } from '@sveltejs/kit';
import { getPublishedPosts } from '$lib/blog/posts';
import { createRssFeed } from '$lib/blog/rss';

export const GET: RequestHandler = async () => {
	const posts = await getPublishedPosts();
	const xml = createRssFeed({
		title: 'Juhana Kuparinen – Blog',
		description:
			'Theme-organized writing by Juhana Kuparinen on software, entrepreneurship, creativity, life systems, and meaning.',
		path: '/feed.xml',
		posts
	});

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'max-age=3600'
		}
	});
};
