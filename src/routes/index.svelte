<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import PostCard from '$lib/PostCard.svelte';

	export let blogs: any;

	// Prevent spamming during animation
	let animating = false;

	// TODO: type this better
	const click = ({ target }: MouseEvent) => {
		if (!target || animating) return;
		(target as HTMLDivElement).classList.add('animate-wave');
		animating = true;
		setTimeout(() => {
			(target as HTMLDivElement).classList.remove('animate-wave');
			animating = false;
		}, 1000);
	};
</script>

<svelte:head>
	<title>juhana.wtf</title>
	<meta name="description" content="Welcome to my interwebs home!" />
</svelte:head>

<section>
	<section
		class="p-4 pb-0 max-w-screen-lg md:min-h-screen mx-auto flex xl:flex-row flex-col pt-20 items-center justify-between"
	>
		<header class="box-border p-4">
			<div class="w-min mx-auto">
				<h1 class="text-6xl mb-8">Juhana Kuparinen</h1>
				<h4 class="text-2xl">
					ICT student and
					<br />
					Co-Founder
					<br />
					@ <a href="https://kvanttori.fi/" class="text-yellow-500">Kvanttori Oy</a>
				</h4>
			</div>
		</header>
		<div class="h-auto max-w-lg">
			<img src="/me.jpg" alt="Juhana Kuparinen" />
		</div>
	</section>
</section>

<section class="p-4 flex pb-0 pt-24 items-center max-w-screen-lg mx-auto relative">
	<svg id="main" viewBox="0 0 1000 400" class="absolute" style="width: 1200px; right: -44px;">
		<path
			d="M 76.568267,125.68753 C 515.75228,41.895844 748.34646,-15.891527 
				846.58499,39.006476 944.82352,93.904478 1011.279,112.68537 973.7172,209.47922 
				936.15541,306.27307 788.79762,356.83702 615.4355,369.83918 442.07339,382.84133 
				137.24501,382.84133 86.681057,355.39233 36.117107,327.94333 11.557474,301.93901 
				13.002159,222.48138 14.446843,143.02374 76.568267,125.68753 76.568267,125.68753 Z"
			fill="#fff"
		/>
	</svg>
	<article class="p-4">
		<div class="relative z-10">
			<h2 class="text-5xl mb-8">
				Hello, welcome to my homepage <div class="inline-block cursor-pointer" on:click={click}>
					👋🏻
				</div>
			</h2>
			<p class="mb-4 text-lg">
				I'm a curious software developer, currently interested in web development and the Rust
				programming language. I'm most skilled with full stack development, using modern web
				technologies like <b>React (Next.js)</b>, <b>TypeScript</b>,
				<b>GraphQL</b> and <b>Node.js</b>.
			</p>
			<p class="mb-4 text-lg">
				During the last four years, I have studied <i>Information and Communcation Technology</i> at
				<b>University of Turku</b>. I'm also a <i>Co-Founder</i> at
				<a class="text-slate-900 underline" href="https://kvanttori.fi"><b>Kvanttori Oy</b></a>
				and worked last summer as a
				<i>Software Developer Trainee</i> at <b>Futurice</b>.
			</p>
			<p class="mb-4 text-lg">
				On my free time, I like to play video games and workout. I'm also very much into motorcycles
				(and other motorized two-wheelers), and I have ridden them since I was 15! I also listen
				music alot. Lately I have been listening alot of
				<b>Shoegaze</b>,
				<b>Dreampop</b> and <b>Ambient</b> (as always).
			</p>
		</div>
	</article>
</section>

<section class="bg-image-grey pt-24">
	<div class="max-w-screen-lg mx-auto p-6">
		<h5 class="text-xl mb-24">Recent articles:</h5>

		{#each blogs as blog}
			<PostCard post={blog} />
		{/each}
	</div>
</section>
