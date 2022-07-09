<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="bg-image-grey">
	<section
		class="p-4 pb-0 max-w-screen-xl min-h-screen mx-auto flex xl:flex-row flex-col pt-20 justify-between items-center"
	>
		<article class="xl:w-1/2 p-4 text-gray-500">
			<div>
				<h1 class="text-6xl mb-8">About me</h1>
				<p class="mb-4 text-lg">
					Hello, my name is Juhana Kuparinen 👋🏻. I was born and raised in Helsinki, Finland but
					currently I study Information and Communcation Technology at University of Turku. I‘m
					interested in all things coding, with a focus on fullstack web development with React,
					Node.js, TypeScript and GraphQL.
				</p>
				<p class="mb-4 text-lg">
					On my free time, I like to motorcycle, play video games, workout and make tasty pizzas. I
					also listen music alot. Some of my favorites are <b>Boards of Canada</b>,
					<b>Urlich Schnauss</b>, <b>MGMT</b>
					and especially the album <i>Moon Safari</i> from <b>Air</b>.
				</p>
			</div>
		</article>
		<div class="xl:h-auto xl:w-2/3">
			<img src="/me.jpg" alt="Juhana Kuparinen" />
		</div>
	</section>

	<section>

	</section>
</div>
