<script lang="ts">
  export let heading: string
</script>

{#if heading === 'heading_1'}
  <h1><slot></slot></h1>
{:else if heading === 'heading_2'}
  <h2><slot></slot></h2>
{:else if heading === 'heading_3'}
  <h3><slot></slot></h3>
{:else if heading === 'heading_4'}
  <h4><slot></slot></h4>
{:else if heading === 'heading_5'}
  <h5><slot></slot></h5>
{:else if heading === 'heading_6'}
  <h6><slot></slot></h6>
{:else}
  <slot></slot>
{/if}