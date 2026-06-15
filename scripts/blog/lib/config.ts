const DEFAULT_SITE_URL = 'https://juhana.wtf';

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export type CampaignConfig = {
	siteUrl: string;
	postmarkServerToken: string;
	postmarkBroadcastStream: string;
	postmarkFromEmail: string;
};

export const getSiteUrl = () => trimTrailingSlash(process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL);

export const getCampaignConfig = (): CampaignConfig => {
	const missing = [
		process.env.POSTMARK_SERVER_TOKEN ? undefined : 'POSTMARK_SERVER_TOKEN',
		process.env.POSTMARK_BROADCAST_STREAM ? undefined : 'POSTMARK_BROADCAST_STREAM',
		process.env.POSTMARK_FROM_EMAIL ? undefined : 'POSTMARK_FROM_EMAIL'
	].filter((value): value is string => Boolean(value));

	if (missing.length > 0) {
		throw new Error(`Missing campaign email config: ${missing.join(', ')}`);
	}

	return {
		siteUrl: getSiteUrl(),
		postmarkServerToken: process.env.POSTMARK_SERVER_TOKEN ?? '',
		postmarkBroadcastStream: process.env.POSTMARK_BROADCAST_STREAM ?? '',
		postmarkFromEmail: process.env.POSTMARK_FROM_EMAIL ?? ''
	};
};
