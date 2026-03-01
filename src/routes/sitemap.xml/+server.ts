import type { RequestHandler } from '@sveltejs/kit';
import type { ResolvedPost } from '$lib/types';

export const GET: RequestHandler = async () => {
	const allPostFiles = import.meta.glob('../blog/posts/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const resolvedPost = (await resolver()) as ResolvedPost;
			const postPath = path.slice(8, -3); // Remove '../blog/' and '.md'
			return {
				path: postPath,
				date: resolvedPost.metadata.date
			};
		})
	);

	const baseUrl = 'https://juhana.wtf';

	const staticPages = [
		{ url: '/', priority: '1.0', changefreq: 'monthly' },
		{ url: '/blog', priority: '0.9', changefreq: 'weekly' }
	];

	const postPages = allPosts.map((post) => ({
		url: `/blog/${post.path}`,
		priority: '0.8',
		changefreq: 'monthly',
		lastmod: post.date
	}));

	const allPages = [...staticPages, ...postPages];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map(
		(page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>${'lastmod' in page && page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
