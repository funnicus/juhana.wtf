import type { RequestHandler } from '@sveltejs/kit';
import { getPublishedPosts } from '$lib/blog/posts';
import { themes } from '$lib/blog/themes';

export const GET: RequestHandler = async () => {
	const posts = await getPublishedPosts();
	const baseUrl = 'https://juhana.wtf';

	const staticPages = [
		{ url: '/', priority: '1.0', changefreq: 'monthly' },
		{ url: '/blog', priority: '0.9', changefreq: 'weekly' }
	];

	const themePages = themes.map((theme) => ({
		url: `/blog/theme/${theme.slug}`,
		priority: '0.8',
		changefreq: 'weekly'
	}));

	const postPages = posts.map((post) => ({
		url: `/blog/${post.slug}`,
		priority: '0.8',
		changefreq: 'monthly',
		lastmod: post.meta.date
	}));

	const allPages = [...staticPages, ...themePages, ...postPages];

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
