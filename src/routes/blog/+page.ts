import type { Post, ResolvedPost } from '$lib/types';

export const load = async () => {
	const allPostFiles = import.meta.glob('./posts/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = (await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const resolvedPost = (await resolver()) as ResolvedPost;
			console.log(path);
			const postPath = path.slice(8, -3); // Remove './posts/' and '.md'

			return {
				meta: resolvedPost.metadata,
				path: postPath
			};
		})
	)) as Post[];

	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
	});

	return {
		posts: sortedPosts
	};
};
