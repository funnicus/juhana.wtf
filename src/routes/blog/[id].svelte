<script lang="ts">
	import Renderer from "$lib/notion/markdown-parser/Renderer.svelte";
  import type { Block } from "$lib/notion/markdown-parser/types";

	export let blocks: Block[];
</script>

<section class="pt-24 max-w-screen-xl md:min-h-screen mx-auto">
  <Renderer blocks={blocks} />
</section>