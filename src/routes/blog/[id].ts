import { getOneBLog } from '$lib/notion/queries';
import type { RequestHandler } from '.svelte-kit/types/src/routes/blog/__types/[id]';

export const get: RequestHandler = async ({ params }) => {
	// `params.id` comes from [id].js
	//const item = await db.get(params.id);

	const { id } = params;

	const blocks = await getOneBLog(id);

	if (blocks) {
		return {
			status: 200,
			headers: {},
			body: { blocks }
		};
	}

	return {
		status: 404
	};
};
