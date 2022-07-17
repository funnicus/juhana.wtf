<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import { onMount } from 'svelte';
	import '../app.css';

	let url: string;
	onMount(() => url = window.location.href);
</script>

<div class="font-mono">
	<Header />

	<main class="bg-image-grey">
		<slot />
	</main>

	<Footer />
</div>
