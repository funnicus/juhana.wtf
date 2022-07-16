import { sveltekit } from '@sveltejs/kit/experimental/vite';
// import { sveltekit } from '@sveltejs/kit/vite'; will throw an error

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['highlight.js', 'highlight.js/lib/core']
	}
};

export default config;
