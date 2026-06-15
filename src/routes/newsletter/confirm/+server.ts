import { redirect, type RequestHandler } from '@sveltejs/kit';
import { confirmSubscription } from '$lib/server/newsletter/subscriptions';

export const GET: RequestHandler = async ({ url }) => {
	const token = url.searchParams.get('token');

	if (!token) {
		redirect(303, '/newsletter/confirmed?status=invalid');
	}

	const confirmed = await confirmSubscription(token);

	redirect(
		303,
		confirmed ? '/newsletter/confirmed?status=success' : '/newsletter/confirmed?status=invalid'
	);
};
