import { getPublishedPosts } from '$lib/blog/posts';
import { themes } from '$lib/blog/themes';

export const load = async () => {
	const posts = await getPublishedPosts();

	return {
		latestPosts: posts.slice(0, 5),
		themes
	};
};
