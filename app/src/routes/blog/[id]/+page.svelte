<script lang="ts">
	//import Renderer from "$lib/notion/markdown-parser/Renderer.svelte";
  //import type { Block } from "$lib/notion/markdown-parser/types";
// <Renderer blocks={page.blocks} />
	export let page: {  blocks: any[], properties: any };
</script>

<section class="bg-image-grey">
  <article class="pt-24 max-w-4xl md:min-h-screen mx-auto p-8 text-xl">
    <header class="mb-16">
      <h1 class="text-5xl mt-6 mb-6 font-bold">{page.properties.title}</h1>
      <p class="mb-10"><i>{page.properties.excerpt}</i></p>
      <span>
      {#each page.properties.tags as tag}
        {`${tag} | `}
			{/each}
      <b>{page.properties.publishDate}</b>
    </span>
    </header>
    
    
  </article>
</section>