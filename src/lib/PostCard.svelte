<script lang="ts">
	export let post: { tags: string[], status: string, title: string, excerpt: string, publishDate: string };
</script>

<article class="mb-24 hover:opacity-80">
	<a href="/blog">
		<header class="mb-5">
			<h2 class="text-4xl underline mb-5">{post.title}</h2>
			<span>
				{#each post.tags as tag}
				<span>{tag} |</span>
				{/each}
				<b>{post.publishDate}</b>
			</span>
		</header>
		<p class="mb-5">
			{post.excerpt}
		</p>
		<p class="underline">
			<a>Read more</a> 🔎
		</p>
	</a>
</article>
