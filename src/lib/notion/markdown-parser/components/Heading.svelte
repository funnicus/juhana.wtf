<script lang="ts">
  export let heading: string
</script>

{#if heading === 'heading_1'}
  <h1 style="font-size: 2em; margin: 0.67em 0 0.67em; font-weight: bold;"><slot></slot></h1>
{:else if heading === 'heading_2'}
  <h2 style="font-size: 1.5em; margin: 0.83em 0 0.83em; font-weight: bold;"><slot></slot></h2>
{:else if heading === 'heading_3'}
  <h3 style="font-size: 1.17em; margin: 1em 0 1em; font-weight: bold;"><slot></slot></h3>
{:else if heading === 'heading_4'}
  <h4 style="margin: 1.33em 0 1.33em; font-weight: bold;"><slot></slot></h4>
{:else if heading === 'heading_5'}
  <h5 style="font-size: .83em; margin: 1.67em 0 1.67em; font-weight: bold;"><slot></slot></h5>
{:else if heading === 'heading_6'}
  <h6 style="font-size: .67em; margin: 2.33em 0 2.33em; font-weight: bold;"><slot></slot></h6>
{:else}
  <slot></slot>
{/if}