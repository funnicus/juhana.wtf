<script lang="ts">
	import PostCard from '$lib/PostCard.svelte';
	import { resolve } from '$app/paths';
	import JsonLd from '$lib/JsonLd.svelte';

	let { data } = $props();

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Blog',
		name: 'Juhana Kuparinen – Blog',
		url: 'https://juhana.wtf/blog',
		description: 'Blog posts and thoughts by Juhana Kuparinen on software development and more.',
		author: {
			'@type': 'Person',
			name: 'Juhana Kuparinen',
			url: 'https://juhana.wtf'
		}
	};
</script>

<JsonLd {schema} />

<svelte:head>
	<title>Blog – Juhana Kuparinen</title>
	<meta
		name="description"
		content="Blog posts and thoughts by Juhana Kuparinen on software development and more."
	/>
	<link rel="canonical" href="https://juhana.wtf/blog" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://juhana.wtf/blog" />
	<meta property="og:title" content="Blog – Juhana Kuparinen" />
	<meta
		property="og:description"
		content="Blog posts and thoughts by Juhana Kuparinen on software development and more."
	/>
	<meta property="og:image" content="https://juhana.wtf/me.webp" />
	<meta property="og:image:alt" content="Juhana Kuparinen" />
	<meta property="og:site_name" content="juhana.wtf" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Blog – Juhana Kuparinen" />
	<meta
		name="twitter:description"
		content="Blog posts and thoughts by Juhana Kuparinen on software development and more."
	/>
	<meta name="twitter:image" content="https://juhana.wtf/me.webp" />
	<meta name="twitter:image:alt" content="Juhana Kuparinen" />
</svelte:head>

<div class="mx-auto flex max-w-screen-lg flex-col gap-8 px-4 py-12 text-black">
	<a href={resolve('/')} class="text-blue-600 hover:underline">← Home</a>
	<h1 class="mb-8 text-4xl font-bold text-black">Blog</h1>

	{#if data.posts.length === 0}
		<p class="text-black">No posts yet. Check back soon!</p>
	{:else}
		<div class="grid gap-16 md:grid-cols-2">
			{#each data.posts as post (post.meta.title)}
				<PostCard
					title={post.meta.title}
					description={post.meta.description}
					date={post.meta.date}
					href={`/blog/posts/${post.path}`}
					tags={post.meta.tags ?? []}
				/>
			{/each}
		</div>
	{/if}
</div>
