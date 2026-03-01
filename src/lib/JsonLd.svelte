<script lang="ts">
	import { buildJsonLdTag } from '$lib/helpers/jsonld';

	type Props = {
		schema: Record<string, unknown>;
	};

	let { schema }: Props = $props();

	let tag = $derived(buildJsonLdTag(schema));
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html tag}
</svelte:head>
