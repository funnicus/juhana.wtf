<script lang="ts">
	import { page } from '$app/state';

	const success = $derived(page.url.searchParams.get('status') === 'success');
</script>

<svelte:head>
	<title
		>{success ? 'Subscription confirmed' : 'Confirmation link expired'} – Juhana Kuparinen</title
	>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto max-w-screen-sm px-4 py-16 text-black">
	<h1 class="mb-4 text-4xl font-bold">
		{success ? 'Subscription confirmed' : 'Confirmation link expired'}
	</h1>
	<p class="leading-relaxed text-slate-700">
		{#if success}
			You are subscribed to the selected themes.
		{:else}
			This confirmation link is invalid or expired. Submit the subscribe form again to get a fresh
			link.
		{/if}
	</p>
</section>
