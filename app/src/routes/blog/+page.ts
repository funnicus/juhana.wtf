/*import type { RequestHandler } from '@sveltejs/kit';
import { getBlogs } from '$lib/notion/queries';

export const get: RequestHandler<Record<string, never>, { blogs: any }> = async () => {
	const blogs = await getBlogs();

	if (blogs) {
		return {
			status: 200,
			body: { blogs }
		};
	}

	return {
		status: 500
	};
};
*/
