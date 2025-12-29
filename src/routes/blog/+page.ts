export const load = async () => {
	const allPostFiles = import.meta.glob('./posts/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const resolvedPost = (await resolver()) as any;
			const postPath = path.slice(2, -3); // Remove './' and '.md'

			return {
				meta: resolvedPost.metadata,
				path: `/blog/${postPath}`
			};
		})
	);

	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
	});

	return {
		posts: sortedPosts
	};
};
