import { getOneBLog } from '$lib/notion/queries';
import type { RequestHandler } from '.svelte-kit/types/src/routes/blog/__types/[id]';

export const get: RequestHandler = async ({ params }) => {
	// `params.id` comes from [id].js
	//const item = await db.get(params.id);

	const { id } = params;

	const page = await getOneBLog(id);
	//console.log(page);

	if (page) {
		return {
			status: 200,
			headers: {},
			body: { page }
		};
	}

	return {
		status: 404
	};
};
