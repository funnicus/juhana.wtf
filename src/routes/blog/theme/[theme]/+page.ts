import { error } from '@sveltejs/kit';
import { getPostsByTheme } from '$lib/blog/posts';
import { getTheme, themes } from '$lib/blog/themes';

export const load = async ({ params }) => {
	const theme = getTheme(params.theme);

	if (!theme) {
		error(404, 'Theme not found');
	}

	const posts = await getPostsByTheme(theme.slug);

	return {
		theme,
		themes,
		posts
	};
};
