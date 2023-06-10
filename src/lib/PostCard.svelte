<script lang="ts">
	export let post: { tags: string[], status: string, title: string, excerpt: string, publishDate: string, id: string };
</script>

<div class="pb-24 pt-24 border-x-2 border-color-outline max-w-screen-lg mx-auto">
	<article class="hover:opacity-80 p-6">
		<a href={`/blog/${post.id}`}>
			<header class="mb-5">
				<h2 class="text-color-text-primary text-6xl underline decoration-4 decoration-color-text-tertiary mb-5">{post.title}</h2>
				<span class="text-color-text-tertiary">
					{#each post.tags as tag}
						{`${tag} | `}
					{/each}
					<b>{post.publishDate}</b>
				</span>
			</header>
			<p class="mb-5 text-2xl">
				{post.excerpt}
			</p>
			<p class="underline decoration-slate-800">
				<span>Read more</span> 🔎
			</p>
		</a>
	</article>
</div>
