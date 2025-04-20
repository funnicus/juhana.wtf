<script lang="ts">
	import '../app.css';
	import Footer from '$lib/Footer.svelte';
	import '../app.css';

	let { children } = $props();

	// TODO: type this better
	const click = ({ clientX, clientY }: MouseEvent) => {
		const wrapper = document.getElementById('bubble-wrapper');

		const bubble = document.createElement('div');

		bubble.className = 'bubble';
		bubble.style.left = `${clientX + window.scrollX}px`;
		bubble.style.top = `${clientY + window.scrollY}px`;

		wrapper?.appendChild(bubble);
		console.log('clicked', clientX, clientY);

		setTimeout(() => {
			wrapper?.removeChild(bubble);
			bubble.remove();
		}, 1000);
	};
</script>

<svelte:window on:mousedown={click} />

<div class="bg-color-primary-dark text-image-grey font-mono">
	<main id="bubble-wrapper">
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	:global {
		.bubble {
			position: absolute;
			z-index: 100;
			width: 1px;
			height: 1px;
			border-radius: 50%;
			background: #949494;

			animation:
				ripple 300ms ease-out forwards,
				fade 400ms ease-out forwards;

			pointer-events: none;
		}

		@keyframes ripple {
			0% {
				transform: translate(-100%, -100%);
			}
			80% {
				transform: translate(-100%, -100%) scale(50);
			}
			100% {
				transform: translate(-100%, -100%) scale(50);
				opacity: 0;
			}
		}

		@keyframes fade {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
	}
</style>
