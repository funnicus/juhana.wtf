<script lang="ts">
	import Renderer from "$lib/notion/markdown-parser/Renderer.svelte";
  import type { Block } from "$lib/notion/markdown-parser/types";

	export let blocks: Block[];
</script>

<Renderer blocks={blocks} />