import type { Post, ResolvedPost } from '$lib/types';
import { calcReadTime } from '$lib/helpers';

export const load = async () => {
	const allPostFiles = import.meta.glob('./posts/*.md', { eager: false });
	const allRawFiles = import.meta.glob('./posts/*.md', {
		query: '?raw',
		import: 'default',
		eager: false
	});
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = (await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const resolvedPost = (await resolver()) as ResolvedPost;
			const rawContent = (await allRawFiles[path]()) as string;
			const postPath = path.slice(8, -3); // Remove './posts/' and '.md'

			return {
				meta: resolvedPost.metadata,
				path: postPath,
				readTime: calcReadTime(rawContent)
			};
		})
	)) as Post[];

	const now = new Date();

	const publishedPosts = allPosts.filter((post) => new Date(post.meta.date) <= now);

	const sortedPosts = publishedPosts.sort((a, b) => {
		return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
	});

	return {
		posts: sortedPosts
	};
};
