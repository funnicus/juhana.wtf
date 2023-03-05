<script lang="ts">
	import PostCard from "$lib/PostCard.svelte";

	export let blogs: any;
</script>

<section class="bg-image-grey pt-24">
	<div class="max-w-screen-lg mx-auto p-6">
		<h5 class="text-xl mb-24">Blogs:</h5>

		{#each blogs as blog}
		  <PostCard post={blog} />
		{/each}
	</div>
</section>