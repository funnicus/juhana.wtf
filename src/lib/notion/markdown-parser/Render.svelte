<script lang="ts">
  import Heading from './components/Heading.svelte';
  import Paragraph from './components/Paragraph.svelte';
  import Strong from './components/Strong.svelte';
  import Code from './components/Code.svelte';

  import type { Type, Annotations, Text } from './types';

  export let type: Type
  export let annotations: Annotations
  export let text: Text

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

  // annotations <svelte:self type={type} annotations={annotations} text={text} />
</script>

<svelte:component this={components[type]} heading={type}>
    {#if annotations.bold}
      <strong>{text.content}</strong>
    {:else if text.link}
      <a href={text.link}>{text.content}</a>
    {:else}
      {text.content}
    {/if}
</svelte:component>