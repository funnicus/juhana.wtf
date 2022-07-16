<script lang="ts">
	import Renderer from "$lib/notion/markdown-parser/Renderer.svelte";
  import type { Block } from "$lib/notion/markdown-parser/types";

	export let page: {  blocks: Block[], properties: any };
</script>

<section class="bg-image-grey">
  <article class="pt-24 max-w-screen-lg md:min-h-screen mx-auto p-8">
    <h1 class="text-5xl mt-6 mb-6 font-bold">{page.properties.title}</h1>
    <p>{page.properties.excerpt}</p>
    <span>{page.properties.publishDate}</span>
    <Renderer blocks={page.blocks} />
  </article>
</section>