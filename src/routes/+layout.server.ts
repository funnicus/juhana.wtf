import { env } from '$env/dynamic/public';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
	return {
		plausibleDomain: env.PUBLIC_PLAUSIBLE_DOMAIN
	};
};
