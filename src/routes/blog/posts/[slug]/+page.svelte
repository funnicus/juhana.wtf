<script lang="ts">
	import { resolve } from '$app/paths';

	export let data;

	$: jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.meta.title,
		description: data.meta.description,
		datePublished: data.meta.date,
		url: `https://juhana.wtf/blog/posts/${data.slug}`,
		image: data.meta.image ? `https://juhana.wtf${data.meta.image}` : 'https://juhana.wtf/me.webp',
		author: {
			'@type': 'Person',
			name: data.meta.author ?? 'Juhana Kuparinen',
			url: 'https://juhana.wtf'
		},
		publisher: {
			'@type': 'Person',
			name: 'Juhana Kuparinen',
			url: 'https://juhana.wtf'
		},
		keywords: data.meta.tags?.join(', ') ?? undefined,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://juhana.wtf/blog/posts/${data.slug}`
		}
	});

	$: canonicalUrl = `https://juhana.wtf/blog/posts/${data.slug}`;
	$: ogImage = data.meta.image
		? `https://juhana.wtf${data.meta.image}`
		: 'https://juhana.wtf/me.webp';
</script>

<svelte:head>
	<title>{data.meta.title} – Juhana Kuparinen</title>
	<meta name="description" content={data.meta.description} />
	<link rel="canonical" href={canonicalUrl} />

	{#if data.meta.tags && data.meta.tags.length > 0}
		<meta name="keywords" content={data.meta.tags.join(', ')} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content="{data.meta.title} – Juhana Kuparinen" />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:alt" content={data.meta.title} />
	<meta property="og:site_name" content="juhana.wtf" />
	<meta property="og:locale" content="en_US" />
	<meta property="article:published_time" content={data.meta.date} />
	<meta property="article:author" content={data.meta.author ?? 'Juhana Kuparinen'} />
	{#if data.meta.tags}
		{#each data.meta.tags as tag (tag)}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{data.meta.title} – Juhana Kuparinen" />
	<meta name="twitter:description" content={data.meta.description} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:image:alt" content={data.meta.title} />

	<!-- JSON-LD BlogPosting schema -->
	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>

<article class="prose prose-lg mx-auto max-w-screen-md px-4 py-12 text-black">
	<header class="not-prose mb-8">
		<h1 class="mb-2 text-4xl font-bold text-slate-900">{data.meta.title}</h1>
		<div class="flex flex-wrap gap-4 text-sm text-black">
			<time datetime={data.meta.date}>
				{new Date(data.meta.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
			{#if data.meta.author}
				<span>by {data.meta.author}</span>
			{/if}
		</div>
		{#if data.meta.tags && data.meta.tags.length > 0}
			<div class="mt-3 flex flex-wrap gap-2">
				{#each data.meta.tags as tag (tag)}
					<span class="rounded-full bg-gray-200 px-3 py-1 text-xs text-black">
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</header>

	<svelte:component this={data.content} />
</article>

<div class="mx-auto max-w-screen-md px-4 py-8">
	<a href={resolve('/blog')} class="text-blue-600 hover:underline">← Back to blog</a>
</div>
