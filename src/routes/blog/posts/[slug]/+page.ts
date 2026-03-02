import { calcReadTime } from '$lib/helpers';
import type { ResolvedPost } from '$lib/types';

export const load = async ({ params }) => {
	const post = await import(`../${params.slug}.md`);
	const raw = await import(`../${params.slug}.md?raw`);

	return {
		content: post.default,
		meta: (post as ResolvedPost & { default: unknown }).metadata,
		slug: params.slug,
		readTime: calcReadTime(raw.default as string)
	};
};
