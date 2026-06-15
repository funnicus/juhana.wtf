import { redirect, type RequestHandler } from '@sveltejs/kit';
import { getNewsletterConfig } from '$lib/server/newsletter/config';
import { sendConfirmationEmail } from '$lib/server/newsletter/email';
import { createPendingSubscription, parseThemeSlugs } from '$lib/server/newsletter/subscriptions';
import { verifyTurnstileToken } from '$lib/server/newsletter/turnstile';

const logPrefix = '[newsletter:subscribe]';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const config = getNewsletterConfig();

	if (!config.enabled) {
		console.error(`${logPrefix} disabled or misconfigured: ${config.missing.join(', ')}`);
		return new Response('Subscriptions are unavailable.', { status: 503 });
	}

	const formData = await request.formData();
	const email = formData.get('email');
	const turnstileToken = formData.get('cf-turnstile-response');
	const themes = parseThemeSlugs(formData.getAll('themes'));

	if (typeof email !== 'string' || typeof turnstileToken !== 'string' || themes.length === 0) {
		return new Response('Subscription request could not be processed.', { status: 400 });
	}

	const turnstileOk = await verifyTurnstileToken({
		secretKey: config.turnstileSecretKey,
		token: turnstileToken,
		remoteIp: getClientAddress()
	});

	if (!turnstileOk) {
		return new Response('Subscription request could not be processed.', { status: 400 });
	}

	try {
		const pendingSubscription = await createPendingSubscription(email, themes);
		await sendConfirmationEmail({
			config,
			email: pendingSubscription.email,
			confirmationToken: pendingSubscription.confirmationToken,
			unsubscribeToken: pendingSubscription.unsubscribeToken,
			themes: pendingSubscription.themes
		});
	} catch (error) {
		console.error(`${logPrefix} failed`, error);
		return new Response('Subscriptions are unavailable.', { status: 503 });
	}

	redirect(303, '/newsletter/subscribed');
};
