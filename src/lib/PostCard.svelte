<script lang="ts">
	export let post: { tags: string[], status: string, title: string, excerpt: string, publishDate: string, id: string };
</script>

<article class="mb-24 hover:opacity-80">
	<a href={`/blog/${post.id}`}>
		<header class="mb-5">
			<h2 class="text-4xl underline decoration-4 decoration-slate-800 mb-5">{post.title}</h2>
			<span class="text-slate-800">
				{#each post.tags as tag}
					{`${tag} | `}
				{/each}
				<b>{post.publishDate}</b>
			</span>
		</header>
		<p class="mb-5">
			{post.excerpt}
		</p>
		<p class="underline decoration-slate-800">
			<span>Read more</span> 🔎
		</p>
	</a>
</article>
