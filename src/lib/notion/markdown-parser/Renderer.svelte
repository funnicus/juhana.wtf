<script lang="ts">
  import { HighlightAuto } from "svelte-highlight";
  import atelierSulphurPoolLight from "svelte-highlight/styles/atelier-sulphurpool-light";

  import Annotations from './Annotations.svelte';
  import Heading from './components/Heading.svelte';
  import Paragraph from './components/Paragraph.svelte';
  import Strong from './components/Strong.svelte';

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
    code: null,
    image: null
  };

  $: code = `.body { border-radius: 10px; }`;
</script>

<svelte:head>
  {@html atelierSulphurPoolLight}
</svelte:head>



{#each blocks as block}
  {#if block.external}
    <img src={block.external.url} alt="iamge" />
  {:else if block.type === 'code' && block.rich_text}
      {#each block.rich_text as rich_text}
        <HighlightAuto code={rich_text.text.content} />
      {/each}
  {:else if block.rich_text}
    <svelte:component this={components[block.type]} heading={block.type}>
      {#each block.rich_text as rich_text}
        <Annotations text={rich_text.text} annotations={rich_text.annotations}/>
      {/each}
    </svelte:component>
  {/if}
{/each}
