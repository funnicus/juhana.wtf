<script lang="ts">
	import PostCard from '$lib/PostCard.svelte';
	import { resolve } from '$app/paths';
	import JsonLd from '$lib/JsonLd.svelte';
	import SubscribeForm from '$lib/SubscribeForm.svelte';

	let { data } = $props();

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Blog',
		name: 'Juhana Kuparinen – Blog',
		url: 'https://juhana.wtf/blog',
		description:
			'Theme-organized writing by Juhana Kuparinen on software, entrepreneurship, creativity, life systems, and meaning.',
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
		content="Theme-organized writing by Juhana Kuparinen on software, entrepreneurship, creativity, life systems, and meaning."
	/>
	<link rel="canonical" href="https://juhana.wtf/blog" />
	<link
		rel="alternate"
		type="application/rss+xml"
		title="Juhana Kuparinen – Blog"
		href="/feed.xml"
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://juhana.wtf/blog" />
	<meta property="og:title" content="Blog – Juhana Kuparinen" />
	<meta
		property="og:description"
		content="Theme-organized writing by Juhana Kuparinen on software, entrepreneurship, creativity, life systems, and meaning."
	/>
	<meta property="og:image" content="https://juhana.wtf/me.webp" />
	<meta property="og:image:alt" content="Juhana Kuparinen" />
	<meta property="og:site_name" content="juhana.wtf" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Blog – Juhana Kuparinen" />
	<meta
		name="twitter:description"
		content="Theme-organized writing by Juhana Kuparinen on software, entrepreneurship, creativity, life systems, and meaning."
	/>
	<meta name="twitter:image" content="https://juhana.wtf/me.webp" />
	<meta name="twitter:image:alt" content="Juhana Kuparinen" />
</svelte:head>

<div class="mx-auto flex max-w-screen-lg flex-col gap-12 px-4 py-12 text-black">
	<a href={resolve('/')} class="text-blue-600 hover:underline">← Home</a>

	<header class="max-w-2xl">
		<h1 class="mb-4 text-4xl font-bold text-black">Blog</h1>
		<p class="text-lg leading-relaxed text-slate-700">
			Writing separated by the kind of thinking it asks for: practical building, entrepreneurship,
			meaning, life systems, and creative process.
		</p>
		<a href={resolve('/feed.xml')} class="mt-4 inline-block text-sm text-blue-600 hover:underline">
			RSS feed
		</a>
	</header>

	<section>
		<h2 class="mb-5 text-2xl font-bold text-black">Themes</h2>
		<div class="grid gap-5 md:grid-cols-2">
			{#each data.themes as theme (theme.slug)}
				<a
					href={resolve(`/blog/theme/${theme.slug}`)}
					class={`rounded-lg border-l-4 bg-white p-5 shadow-sm transition hover:shadow-md ${theme.accent}`}
				>
					<h3 class={`mb-2 text-xl font-bold ${theme.textAccent}`}>{theme.name}</h3>
					<p class="mb-4 text-sm leading-relaxed text-slate-700">{theme.description}</p>
					<span class="text-sm text-blue-600 hover:underline">Read theme →</span>
				</a>
			{/each}
		</div>
	</section>

	<section>
		<h2 class="mb-5 text-2xl font-bold text-black">Latest</h2>
		{#if data.latestPosts.length === 0}
			<p class="text-black">No posts yet. Check back soon!</p>
		{:else}
			<div class="grid gap-12 md:grid-cols-2">
				{#each data.latestPosts as post (post.meta.title)}
					<PostCard
						title={post.meta.title}
						description={post.meta.description}
						date={post.meta.date}
						href={`/blog/${post.slug}`}
						tags={post.meta.tags ?? []}
						readTime={post.readTime}
					/>
				{/each}
			</div>
		{/if}
	</section>

	{#if data.newsletter.enabled}
		<SubscribeForm themes={data.themes} turnstileSiteKey={data.newsletter.turnstileSiteKey} />
	{/if}
</div>
