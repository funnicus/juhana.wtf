<script lang="ts">
  import type { Annotations, Text } from './types';

  export let annotations: Annotations
  export let text: Text
  console.log(annotations)
</script>

{#if annotations.bold}
  <strong><svelte:self text={text} annotations={{ ...annotations, bold: false }}/></strong>
{:else if annotations.italic}
  <i><svelte:self text={text} annotations={{ ...annotations, italic: false }}/></i>
{:else if annotations.strikethrough}
  <strike><svelte:self text={text} annotations={{ ...annotations, strikethrough: false }}/></strike>
{:else if annotations.underline}
  <span style="text-decoration: underline;"><svelte:self text={text} annotations={{ ...annotations, underline: false }}/></span>
{:else if annotations.code}
  <code><svelte:self text={text} annotations={{ ...annotations, code: false }}/></code>
{:else if text.link}
  <a href={text.link.url} title={text.link.url} style="color: #9b9a97; text-decoration: underline;">{text.content}</a>
{:else}
  {text.content}
{/if}