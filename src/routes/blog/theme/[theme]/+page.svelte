<script lang="ts">
	import { resolve } from '$app/paths';
	import JsonLd from '$lib/JsonLd.svelte';
	import PostCard from '$lib/PostCard.svelte';
	import SubscribeForm from '$lib/SubscribeForm.svelte';

	let { data } = $props();

	let canonicalUrl = $derived(`https://juhana.wtf/blog/theme/${data.theme.slug}`);
	let feedUrl = $derived(`https://juhana.wtf/feed/${data.theme.slug}.xml`);
	let schema = $derived({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: `${data.theme.name} – Juhana Kuparinen`,
		url: canonicalUrl,
		description: data.theme.description,
		author: {
			'@type': 'Person',
			name: 'Juhana Kuparinen',
			url: 'https://juhana.wtf'
		}
	});
</script>

<JsonLd {schema} />

<svelte:head>
	<title>{data.theme.name} – Juhana Kuparinen</title>
	<meta name="description" content={data.theme.description} />
	<link rel="canonical" href={canonicalUrl} />
	<link
		rel="alternate"
		type="application/rss+xml"
		title={`${data.theme.name} – Juhana Kuparinen`}
		href={feedUrl}
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content="{data.theme.name} – Juhana Kuparinen" />
	<meta property="og:description" content={data.theme.description} />
	<meta property="og:image" content="https://juhana.wtf/me.webp" />
	<meta property="og:image:alt" content="Juhana Kuparinen" />
	<meta property="og:site_name" content="juhana.wtf" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{data.theme.name} – Juhana Kuparinen" />
	<meta name="twitter:description" content={data.theme.description} />
	<meta name="twitter:image" content="https://juhana.wtf/me.webp" />
	<meta name="twitter:image:alt" content="Juhana Kuparinen" />
</svelte:head>

<div class="mx-auto flex max-w-screen-lg flex-col gap-10 px-4 py-12 text-black">
	<a href={resolve('/blog')} class="text-blue-600 hover:underline">← Blog</a>

	<header class={`rounded-lg border-l-4 p-6 ${data.theme.accent} ${data.theme.bgAccent}`}>
		<h1 class={`mb-4 text-4xl font-bold ${data.theme.textAccent}`}>{data.theme.name}</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-slate-800">{data.theme.description}</p>
		<a
			href={resolve('/feed/[theme].xml', { theme: data.theme.slug })}
			class="mt-4 inline-block text-sm text-blue-600 hover:underline"
		>
			Theme RSS feed
		</a>
	</header>

	{#if data.posts.length === 0}
		<p>No posts in this theme yet.</p>
	{:else}
		<div class="grid gap-12 md:grid-cols-2">
			{#each data.posts as post (post.meta.title)}
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

	{#if data.newsletter.enabled}
		<SubscribeForm
			themes={data.themes}
			turnstileSiteKey={data.newsletter.turnstileSiteKey}
			preselectedTheme={data.theme.slug}
		/>
	{/if}
</div>
