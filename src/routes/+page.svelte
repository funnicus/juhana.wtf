<script lang="ts">
	//import PostCard from '$lib/PostCard.svelte';
	import { randomString } from '$lib/helpers';

	//export let blogs: any;

	/*const blogs: any[] = [
		{ tags: ['hello', 'world'], status: "", title: "Hello World", excerpt: "Terveisiä maailmalta", publishDate: "01-02-2020", id: "1" },
		{ tags: ['hello', 'world2'], status: "", title: "Hello World 2", excerpt: "Terveisiä maailmalta", publishDate: "01-02-2020", id: "1" }
	]*/

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

	shuffle()
</script>

<svelte:head>
	<title>juhana.wtf</title>
	<meta name="description" content="Welcome to my interwebs home!" />
</svelte:head>

<section>
	<!--section
		class="p-4 pb-0 max-w-screen-lg md:min-h-screen mx-auto flex xl:flex-row flex-col pt-20 items-center justify-between border-x-2 border-color-outline"
	-->
	<section
		class="p-4 pb-0 max-w-screen-lg md:min-h-screen mx-auto flex xl:flex-row flex-col pt-20 items-center justify-between"
	>
		<header class="box-border p-4">
			<div class="w-min mx-auto">
				<h1 
					aria-labelledby="Juhana Kuparinen" 
					id="my-name" 
					class="text-6xl md:text-8xl mb-8 text-color-text-primary cursor-pointer" 
					on:mousedown={() => shuffle()}>
					{name}
				</h1>
				<h4 class="md:text-2xl">
					<span class="text-image-grey">Software Engineer | Entrepreneur | Student</span>
				</h4>
			</div>
		</header>
		<div class="h-auto max-w-lg">
			<img src="/me.png" alt="Juhana Kuparinen" />
		</div>
	</section>
</section>

<!--section class="p-4 flex pb-0 pt-24 items-center max-w-screen-lg mx-auto relative">
	<h2 class="text-6xl">I am a:</h2>
</section>

<section class="p-4 flex pb-0 pt-24 items-center max-w-screen-lg mx-auto relative">
	<article class="p-4 bg-color-tertiary-dark rounded-xl">
		<div class="relative z-10">
			<h2 class="text-5xl mb-8 text-color-text-error">
				Software Engineer
			</h2>
			<p class="mb-4 text-lg">
				...mainly skilled in web development. I have a number of projects under my belt, using modern web
				technologies like <b>React (Next.js)</b>, <b>TypeScript</b>, <b>GraphQL</b> and <b>Node.js</b>.
			</p>
		</div>
	</article>
</section>

<section class="p-4 flex pb-0 pt-24 items-center max-w-screen-lg mx-auto relative">
	<article class="p-4 bg-color-tertiary-dark rounded-xl">
		<div class="relative z-10">
			<h2 class="text-5xl mb-8 text-color-text-error">
				Entrepreneur
			</h2>
			<p class="mb-4 text-lg">
				...and a <i>Co-Founder</i> at
				<a class="text-color-text-tertiary underline" href="https://kvanttori.fi"><b>Kvanttori Oy</b></a>. I 
				have picked up a lot of entrepreneurial skills during the last few years. There is nothing better than
				working for your own business with a couple of friends.
			</p>
		</div>
	</article>
</section>

<section class="p-4 flex pb-0 pt-24 items-center max-w-screen-lg mx-auto relative">
	<article class="p-4 bg-color-tertiary-dark rounded-xl">
		<div class="relative z-10">
			<h2 class="text-5xl mb-8 text-color-text-error">
				Student
			</h2>
			<p class="mb-4 text-lg">
				...and during the last four years, I have studied <i>Information and Communication Technology</i> at
				<b>University of Turku</b>. Currently I'm doing my master's studies, majoring in <b>Software Engineering</b>.
			</p>
		</div>
	</article>
</section-->

<!--section class="border-b-2 border-color-outline">
	<div class="border-t-2 border-color-outline">
		<h5 class="max-w-screen-lg mx-auto text-2xl p-6  border-x-2 border-color-outline">Recent articles:</h5>
	</div>
	{#each blogs as blog}
		<div class="border-t-2 border-color-outline">
			<PostCard post={blog} />
		</div>
	{/each}
	
</section -->