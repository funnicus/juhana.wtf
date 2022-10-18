<script lang="ts">
	let position = 0;

	const onScroll = () => {
		const currentPosition = window.pageYOffset;
		const nav = document.getElementById('nav');

		if (nav) {
			position > currentPosition ? (nav.style.top = '0px') : (nav.style.top = '-100px');
		}

		position = currentPosition;
	};
	//bg-zinc-300/75
	//bg-gray-900/75 text-white
</script>

<svelte:window on:scroll={onScroll} />

<header>
	<nav id="nav" class="bg-zinc-300/75 fixed w-screen transition-top duration-500 z-10">
		<ul class="flex items-center justify-between flex-wrap p-6 container mx-auto max-w-screen-lg">
			<li class="hover:underline">
				<a sveltekit:prefetch href="/">juhana.wtf</a>
			</li>
			<li class="hover:underline">
				<a sveltekit:prefetch href="/about">About</a>
			</li>
			<li class="hover:underline">
				<a sveltekit:prefetch href="/blog">Blog</a>
			</li>
		</ul>
	</nav>
</header>
