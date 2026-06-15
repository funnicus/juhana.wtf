import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

const DEFAULT_SITE_URL = 'https://juhana.wtf';

export type NewsletterConfig = {
	enabled: boolean;
	missing: string[];
	siteUrl: string;
	turnstileSiteKey: string;
	turnstileSecretKey: string;
	postmarkServerToken: string;
	postmarkTransactionalStream: string;
	postmarkFromEmail: string;
};

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export const getNewsletterConfig = (): NewsletterConfig => {
	const siteUrl = trimTrailingSlash(publicEnv.PUBLIC_SITE_URL || DEFAULT_SITE_URL);
	const config = {
		databaseUrl: privateEnv.DATABASE_URL,
		subscriptionsEnabled: privateEnv.SUBSCRIPTIONS_ENABLED,
		turnstileSiteKey: publicEnv.PUBLIC_TURNSTILE_SITE_KEY,
		turnstileSecretKey: privateEnv.TURNSTILE_SECRET_KEY,
		postmarkServerToken: privateEnv.POSTMARK_SERVER_TOKEN,
		postmarkTransactionalStream: privateEnv.POSTMARK_TRANSACTIONAL_STREAM,
		postmarkFromEmail: privateEnv.POSTMARK_FROM_EMAIL
	};
	const missing = [
		config.subscriptionsEnabled === 'true' ? undefined : 'SUBSCRIPTIONS_ENABLED=true',
		config.databaseUrl ? undefined : 'DATABASE_URL',
		config.turnstileSiteKey ? undefined : 'PUBLIC_TURNSTILE_SITE_KEY',
		config.turnstileSecretKey ? undefined : 'TURNSTILE_SECRET_KEY',
		config.postmarkServerToken ? undefined : 'POSTMARK_SERVER_TOKEN',
		config.postmarkTransactionalStream ? undefined : 'POSTMARK_TRANSACTIONAL_STREAM',
		config.postmarkFromEmail ? undefined : 'POSTMARK_FROM_EMAIL'
	].filter((value): value is string => Boolean(value));

	return {
		enabled: missing.length === 0,
		missing,
		siteUrl,
		turnstileSiteKey: config.turnstileSiteKey ?? '',
		turnstileSecretKey: config.turnstileSecretKey ?? '',
		postmarkServerToken: config.postmarkServerToken ?? '',
		postmarkTransactionalStream: config.postmarkTransactionalStream ?? '',
		postmarkFromEmail: config.postmarkFromEmail ?? ''
	};
};

export const getPublicNewsletterConfig = () => {
	const config = getNewsletterConfig();

	return {
		enabled: config.enabled,
		turnstileSiteKey: config.enabled ? config.turnstileSiteKey : ''
	};
};
