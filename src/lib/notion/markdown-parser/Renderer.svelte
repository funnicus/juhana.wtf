<script lang="ts">
  import Annotations from './Annotations.svelte';
  import Heading from './components/Heading.svelte';
  import Paragraph from './components/Paragraph.svelte';
  import Strong from './components/Strong.svelte';
  import Code from './components/Code.svelte';

  import type { Block } from './types';

	export let blocks: Block[] = [];

  export let components = {
    heading_1: Heading,
    heading_2: Heading,
    heading_3: Heading,
    heading_4: Heading,
    heading_5: Heading,
    heading_6: Heading,
    paragraph: Paragraph,
    bold: Strong,
    code: Code
  };
</script>

{#each blocks as block}
  <svelte:component this={components[block.type]} heading={block.type}>
    {#each block.rich_text as rich_text}
      <Annotations text={rich_text.text} annotations={rich_text.annotations}/>
    {/each}
  </svelte:component>
{/each}
