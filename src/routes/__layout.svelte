<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<div class="font-mono">
	<Header />

	<main >
		<slot />
	</main>

	<Footer />
</div>
