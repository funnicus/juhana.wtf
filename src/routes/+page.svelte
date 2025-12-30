<script lang="ts">
	import { randomString } from '$lib/helpers';

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
</script>

<svelte:head>
	<title>juhana.wtf</title>
	<meta name="description" content="Welcome to my interwebs home!" />
</svelte:head>

<section class="mb-20 xl:mb-0">
	<section
		class="mx-auto flex max-w-screen-lg flex-col items-center justify-between p-4 pt-20 pb-0 md:min-h-screen xl:flex-row"
	>
		<header class="box-border">
			<div class="mx-auto w-min">
				<div role="button" tabindex="0" on:mousedown={() => shuffle()}>
					<h1
						aria-labelledby="Juhana Kuparinen"
						id="my-name"
						class="text-color-text-primary mb-8 cursor-pointer text-6xl md:text-8xl"
					>
						{name}
					</h1>
				</div>
				<h4 class="md:text-2xl">
					<span class="text-image-grey">Software Engineer | Entrepreneur</span>
				</h4>
			</div>
			<h4 class="mt-4 md:text-3xl">
					<a href="/blog" class="text-image-grey hover:underline">Check out my blog <span class="finger-wave inline-block">👈</span></a>
			</h4>
		</header>
		<div class="h-auto max-w-lg">
			<img src="/me.png" alt="Juhana Kuparinen" />
		</div>
	</section>
</section>
