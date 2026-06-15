import { getPublicNewsletterConfig } from '$lib/server/newsletter/config';

export const load = () => ({
	newsletter: getPublicNewsletterConfig()
});
