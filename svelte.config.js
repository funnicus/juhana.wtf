import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
//import svelteImage from 'svelte-image';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	}
};

/**
 * vite: {
      optimizeDeps: {
        include: ['blurhash'],
      },
      ssr: {
        noExternal: ['svelte-image'],
      },
    },
 */

export default config;
