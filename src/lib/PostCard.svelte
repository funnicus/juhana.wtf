<script lang="ts">
	export let title: string;
	export let description: string;
	export let date: string;
	export let href: string;
	export let tags: string[] = [];
</script>

<article class="rounded-lg border border-gray-300 transition-all hover:border-gray-400 hover:scale-101 bg-white">
	<a {href} class="block p-6">
		<header class="mb-4">
			<h2 class="mb-2 text-2xl font-bold text-black hover:text-blue-600 transition-colors">
				{title}
			</h2>
			<div class="flex flex-wrap items-center gap-3 text-sm text-black">
				<time datetime={date}>
					{new Date(date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
				{#if tags.length > 0}
					<span class="text-gray-400">•</span>
					<div class="flex flex-wrap gap-2">
						{#each tags as tag}
							<span class="rounded-full bg-gray-200 px-2 py-1 text-xs text-black">
								{tag}
							</span>
						{/each}
					</div>
				{/if}
			</div>
		</header>
		<p class="mb-4 text-black">
			{description}
		</p>
		<span class="text-blue-600 hover:underline">
			Read more →
		</span>
	</a>
</article>
