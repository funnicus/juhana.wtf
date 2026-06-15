import type { PostWithTheme } from './posts';

const baseUrl = 'https://juhana.wtf';

const escapeXml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

export const createRssFeed = ({
	title,
	description,
	path,
	posts
}: {
	title: string;
	description: string;
	path: string;
	posts: PostWithTheme[];
}) => {
	const latestPost = posts[0];
	const lastBuildDate = latestPost
		? new Date(latestPost.meta.date).toUTCString()
		: new Date().toUTCString();
	const feedUrl = `${baseUrl}${path}`;

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${baseUrl}/blog</link>
    <description>${escapeXml(description)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${posts
	.map((post) => {
		const postUrl = `${baseUrl}/blog/${post.slug}`;

		return `    <item>
      <title>${escapeXml(post.meta.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.meta.description)}</description>
      <pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.theme.name)}</category>
    </item>`;
	})
	.join('\n')}
  </channel>
</rss>`;
};
