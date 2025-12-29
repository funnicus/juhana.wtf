import { mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';

import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.svx', '.md'],
			highlight: {
				highlighter: async (code, lang = 'text') => {
					const highlighter = await createHighlighter({
						themes: ['nord'],
						langs: [
							'javascript',
							'typescript',
							'bash',
							'shell',
							'html',
							'css',
							'svelte',
							'json',
							'python'
						]
					});
					await highlighter.loadLanguage(lang);
					const html = highlighter.codeToHtml(code, { lang, theme: 'nord' });
					return `{@html \`${html}\` }`;
				}
			}
		})
	],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
