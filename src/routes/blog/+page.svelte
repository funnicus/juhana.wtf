<script lang="ts">
	import PostCard from '$lib/PostCard.svelte';
	import { resolve } from '$app/paths';

	export let data;
</script>

<svelte:head>
	<title>Blog - juhana.wtf</title>
	<meta name="description" content="My blog posts and thoughts" />
</svelte:head>

<div class="mx-auto max-w-screen-lg px-4 py-12 flex flex-col gap-8 text-black">
	<a href={resolve("/")} class="text-blue-600 hover:underline">← Home</a>
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
					href={post.path}
				/>
			{/each}
		</div>
	{/if}
</div>
