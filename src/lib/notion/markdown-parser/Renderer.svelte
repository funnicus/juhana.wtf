<script lang="ts">
  import Render from './Render.svelte';

  import type { Block } from './types';

	export let blocks: Block[] = [];

</script>

{#each blocks as block}
  {#each block.rich_text as rich_text}
    <Render type={block.type} text={rich_text.text} annotations={rich_text.annotations}/>
  {/each}
{/each}
