export const load = async ({ params }) => {
	const post = await import(`../${params.slug}.md`);

	return {
		content: post.default,
		meta: post.metadata
	};
};
