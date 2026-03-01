<script lang="ts">
	import { resolve } from '$app/paths';
	import { randomString } from '$lib/helpers';
	import JsonLd from '$lib/JsonLd.svelte';

	let name = `${randomString(6)} ${randomString(9)}`;

	const shuffle = () => {
		let iteration = 0;

		const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		const myName = 'Juhana Kuparinen';

		const interval = setInterval(() => {
			name = name
				.split('')
				.map((_: string, index: number) => {
					// Add space after 6th letter
					if (index === 6) return ' ';

					if (index < iteration) {
						return myName[index];
					}

					return letters[Math.floor(Math.random() * 61)];
				})
				.join('');

			if (iteration >= name.length) {
				clearInterval(interval);
			}

			iteration += 1 / 7;
		}, 10);

		return name;
	};

	shuffle();

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Juhana Kuparinen',
		url: 'https://juhana.wtf',
		jobTitle: 'Software Engineer',
		description:
			'Software Engineer and Entrepreneur. Personal website and blog about software development.',
		image: 'https://juhana.wtf/me.webp',
		sameAs: [
			'https://github.com/funnicus',
			'https://www.linkedin.com/in/juhana-kuparinen-6284b8198/',
			'https://rateyourmusic.com/~fennicus',
			'https://glitchwave.com/user/fennicus/',
			'https://www.goodreads.com/user/show/139209302-juhana-kuparinen'
		]
	};
</script>

<JsonLd {schema} />

<svelte:head>
	<title>Juhana Kuparinen – Software Engineer & Entrepreneur</title>
	<meta
		name="description"
		content="Juhana Kuparinen is a Software Engineer and Entrepreneur. Welcome to my personal website and blog."
	/>
	<link rel="canonical" href="https://juhana.wtf/" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://juhana.wtf/" />
	<meta property="og:title" content="Juhana Kuparinen – Software Engineer & Entrepreneur" />
	<meta
		property="og:description"
		content="Juhana Kuparinen is a Software Engineer and Entrepreneur. Welcome to my personal website and blog."
	/>
	<meta property="og:image" content="https://juhana.wtf/me.webp" />
	<meta property="og:image:alt" content="Juhana Kuparinen" />
	<meta property="og:site_name" content="juhana.wtf" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Juhana Kuparinen – Software Engineer & Entrepreneur" />
	<meta
		name="twitter:description"
		content="Juhana Kuparinen is a Software Engineer and Entrepreneur. Welcome to my personal website and blog."
	/>
	<meta name="twitter:image" content="https://juhana.wtf/me.webp" />
	<meta name="twitter:image:alt" content="Juhana Kuparinen" />
</svelte:head>

<section class="mb-20 xl:mb-0">
	<section
		class="mx-auto flex max-w-screen-lg flex-col items-center justify-between p-4 pt-20 pb-0 md:min-h-screen xl:flex-row"
	>
		<header class="box-border">
			<div class="mx-auto w-min">
				<div role="button" tabindex="0" on:mousedown={() => shuffle()}>
					<h1
						aria-label="Juhana Kuparinen"
						id="my-name"
						class="text-color-text-primary mb-8 cursor-pointer text-6xl md:text-8xl"
					>
						{name}
					</h1>
				</div>
				<h2 class="md:text-2xl">
					<span class="text-image-grey">Software Engineer | Entrepreneur</span>
				</h2>
				<p class="text-image-grey mt-4 max-w-sm text-sm leading-relaxed md:text-base">
					I build software and occasionally write about it. Welcome to my corner of the internet.
				</p>
			</div>
			<h3 class="mt-8 md:text-3xl">
				<a href={resolve('/blog')} class="text-image-grey hover:underline"
					>Check out my blog <span class="finger-wave inline-block">👈</span></a
				>
			</h3>
		</header>
		<div class="h-auto max-w-lg">
			<img src="/me.webp" alt="Juhana Kuparinen" />
		</div>
	</section>
</section>
