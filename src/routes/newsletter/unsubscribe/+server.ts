import { redirect, type RequestHandler } from '@sveltejs/kit';
import { unsubscribeAll } from '$lib/server/newsletter/subscriptions';

export const GET: RequestHandler = async ({ url }) => {
	const token = url.searchParams.get('token');

	if (token) {
		await unsubscribeAll(token);
	}

	redirect(303, '/newsletter/unsubscribed');
};
