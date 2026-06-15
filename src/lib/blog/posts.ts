import { calcReadTime } from '$lib/helpers';
import type { Post, ResolvedPost } from '$lib/types';
import type { Component } from 'svelte';
import { getTheme, isThemeSlug, type Theme } from './themes';

type PostModule = ResolvedPost & {
	default: Component;
};

export type PostWithTheme = Post & {
	theme: Theme;
};

export type PostPage = PostWithTheme & {
	content: Component;
};

const postModules = import.meta.glob('../../routes/blog/posts/*.md');
const rawPostModules = import.meta.glob('../../routes/blog/posts/*.md', {
	query: '?raw',
	import: 'default'
});

const slugFromPath = (path: string) => path.split('/').at(-1)?.replace(/\.md$/, '') ?? '';

const postPathForSlug = (slug: string) => `../../routes/blog/posts/${slug}.md`;

const assertString = (value: unknown, field: string, path: string): string => {
	if (typeof value !== 'string' || value.trim().length === 0) {
		throw new Error(`${path} has invalid frontmatter field: ${field}`);
	}

	return value;
};

const validateMetadata = (
	metadata: ResolvedPost['metadata'],
	path: string
): ResolvedPost['metadata'] => {
	const title = assertString(metadata.title, 'title', path);
	const description = assertString(metadata.description, 'description', path);
	const date = assertString(metadata.date, 'date', path);

	if (Number.isNaN(new Date(date).getTime())) {
		throw new Error(`${path} has invalid frontmatter field: date`);
	}

	if (!isThemeSlug(metadata.theme)) {
		throw new Error(`${path} has invalid frontmatter field: theme`);
	}

	if (typeof metadata.draft !== 'boolean') {
		throw new Error(`${path} has invalid frontmatter field: draft`);
	}

	return {
		...metadata,
		title,
		description,
		date,
		theme: metadata.theme,
		draft: metadata.draft
	};
};

const loadPost = async (path: string): Promise<PostWithTheme> => {
	const resolver = postModules[path];
	const rawResolver = rawPostModules[path];

	if (!resolver || !rawResolver) {
		throw new Error(`Missing post module for ${path}`);
	}

	const resolvedPost = (await resolver()) as PostModule;
	const rawContent = (await rawResolver()) as string;
	const meta = validateMetadata(resolvedPost.metadata, path);
	const theme = getTheme(meta.theme);

	if (!theme) {
		throw new Error(`${path} references an unknown theme`);
	}

	return {
		meta,
		slug: slugFromPath(path),
		readTime: calcReadTime(rawContent),
		theme
	};
};

export const isPublished = (post: Pick<Post, 'meta'>, now = new Date()) =>
	post.meta.draft !== true && new Date(post.meta.date) <= now;

export const getAllPosts = async (): Promise<PostWithTheme[]> => {
	const posts = await Promise.all(Object.keys(postModules).map(loadPost));

	return posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
};

export const getPublishedPosts = async (now = new Date()): Promise<PostWithTheme[]> => {
	const posts = await getAllPosts();

	return posts.filter((post) => isPublished(post, now));
};

export const getPost = async (slug: string): Promise<PostPage | undefined> => {
	const path = postPathForSlug(slug);
	const resolver = postModules[path];

	if (!resolver) {
		return undefined;
	}

	const post = await loadPost(path);
	const resolvedPost = (await resolver()) as PostModule;

	return {
		...post,
		content: resolvedPost.default
	};
};

export const getPostsByTheme = async (themeSlug: string): Promise<PostWithTheme[]> => {
	const posts = await getPublishedPosts();

	return posts.filter((post) => post.meta.theme === themeSlug);
};
