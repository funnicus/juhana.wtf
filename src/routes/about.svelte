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
		class="p-4 flex items-center pb-0 max-w-screen-xl min-h-screen mx-auto"
	>
		<article class="p-4">
			<div>
				<h1 class="text-6xl mb-8">Hello, I'm Juhana 👋🏻 </h1>
				<p class="mb-4 text-lg">
					I'm a curious software developer, currently interested in web development and the Rust programming language.
					I'm most skilled with fullstack development, using modern web technologies like <b>React (Next.js)</b>, <b>TypeScript</b>, 
					<b>GraphQL</b> and <b>Node.js</b>.
				</p>
				<p class="mb-4 text-lg">
					For the last three years, I have studied <i>Information and Communcation Technology</i> at University of Turku. 
					I'm also a <i>Co-Founder</i> at Kvanttori Oy and currently work as a <i>Software Developer Trainee</i> at Futurice.
				</p>
				<p class="mb-4 text-lg">
					On my free time, I like to motorcycle, play video games, workout and make tasty pizzas. I
					also listen music alot. Some of my favorites are <b>Grimes</b>,
					<b>Urlich Schnauss</b>, <b>Biosphere</b>
					and especially the album <i>Moon Safari</i> from <b>Air</b>.
				</p>
			</div>
		</article>
	</section>

	<section>

	</section>
</div>
