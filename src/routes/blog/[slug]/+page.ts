import { error } from '@sveltejs/kit';
import { getPost, isPublished } from '$lib/blog/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const post = await getPost(params.slug);

	if (!post || !isPublished(post)) {
		error(404, 'Post not found');
	}

	return post;
};
