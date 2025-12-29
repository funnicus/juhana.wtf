<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>{data.meta.title} - juhana.wtf</title>
	<meta name="description" content={data.meta.description} />
</svelte:head>

<article class="prose prose-lg mx-auto max-w-screen-md px-4 py-12 text-black">
	<header class="mb-8 not-prose">
		<h1 class="mb-2 text-4xl font-bold text-black">{data.meta.title}</h1>
		<div class="flex gap-4 text-sm text-black">
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
	</header>

	<svelte:component this={data.content} />
</article>

<div class="mx-auto max-w-screen-md px-4 py-8">
	<a href="/blog" class="text-blue-600 hover:underline">← Back to blog</a>
</div>