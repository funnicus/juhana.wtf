import { env } from '$env/dynamic/public';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
	return {
		plausibleEnabled: env.PUBLIC_PLAUSIBLE_ENABLED
	};
};
