<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
import PostCard from "$lib/PostCard.svelte";

	export let blogs: any;
</script>

<svelte:head>
	<title>juhana.wtf</title>
	<meta name="description" content="Welcome to my interwebs home!" />
</svelte:head>

<section class="bg-image-grey">
	<section class="p-4 pb-0 max-w-screen-xl md:min-h-screen mx-auto flex xl:flex-row flex-col pt-20 items-center ">
		<header class="box-border p-4">
			<div class="w-min mx-auto">
				<h1 class="text-6xl mb-8">Juhana Kuparinen</h1>
				<h4 class="text-2xl">
					IT student and
					<br />
					Co-Founder
					<br />
					@ <a href="https://kvanttori.fi/" class="text-yellow-500">Kvanttori Oy</a>
				</h4>
			</div>
		</header>
		<div class="h-auto max-w-2/3">
			<img src="/me.jpg" alt="Juhana Kuparinen" />
		</div>
	</section>
</section>

<section class="bg-image-grey">
	<div class="max-w-screen-xl mx-auto p-6">
		<h5 class="text-xl mb-24">Recent articles:</h5>

		{#each blogs as blog}
		<PostCard post={blog} />
		{/each}
	</div>
</section>
