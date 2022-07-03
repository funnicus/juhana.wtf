<script lang="ts">
	import { page } from '$app/stores';
</script>

<header>
	<nav class="bg-gray-900/75 text-white fixed w-screen">
		<ul class="flex items-center justify-between flex-wrap p-6 container mx-auto">
			<li>
				<a sveltekit:prefetch href="/">juhana.wtf</a>
			</li>
			<li>
				<a sveltekit:prefetch href="/about">About</a>
			</li>
			<li>
				<a sveltekit:prefetch href="/blog">Blog</a>
			</li>
		</ul>
	</nav>
</header>
