<script lang="ts">
	import { resolve } from '$app/paths';

	export let title: string;
	export let description: string;
	export let date: string;
	export let href: `${`/blog/posts/${string}`}`;
	export let tags: string[] = [];
	export let readTime: number;
</script>

<article class="w-96 rounded-lg transition-all">
	<a href={resolve(href)} class="block">
		<header class="mb-4">
			<h2 class="mb-2 text-2xl font-bold text-black transition-colors hover:text-blue-600">
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
				<span class="text-gray-400">•</span>
				<span>{readTime} min read</span>
				{#if tags.length > 0}
					<span class="text-gray-400">•</span>
					<div class="flex flex-wrap gap-2">
						{#each tags as tag (tag)}
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
		<span class="text-blue-600 hover:underline"> Read more → </span>
	</a>
</article>
