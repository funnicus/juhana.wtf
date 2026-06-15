import type { ThemeSlug } from '$lib/blog/themes';

export type ResolvedPost = {
	metadata: {
		title: string;
		description: string;
		date: string;
		theme: ThemeSlug;
		draft: boolean;
		author?: string;
		tags?: string[];
		image?: string;
		featured?: boolean;
	};
};

export type Post = {
	meta: {
		title: string;
		description: string;
		date: string;
		theme: ThemeSlug;
		draft: boolean;
		author?: string;
		tags?: string[];
		image?: string;
		featured?: boolean;
	};
	slug: string;
	readTime: number;
};
