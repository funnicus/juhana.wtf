<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Theme, ThemeSlug } from '$lib/blog/themes';

	export let themes: readonly Theme[];
	export let turnstileSiteKey: string;
	export let preselectedTheme: ThemeSlug | undefined = undefined;
</script>

<svelte:head>
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<section class="rounded-lg border border-slate-200 bg-white p-5 text-black">
	<h2 class="mb-2 text-2xl font-bold">Subscribe</h2>
	<p class="mb-5 text-sm leading-relaxed text-slate-700">
		Get new posts by theme. Choose at least one; you will confirm by email.
	</p>

	<form method="POST" action={resolve('/newsletter/subscribe')} class="flex flex-col gap-4">
		<label class="flex flex-col gap-2 text-sm font-semibold">
			Email
			<input
				name="email"
				type="email"
				required
				autocomplete="email"
				class="rounded border border-slate-300 px-3 py-2 font-normal"
			/>
		</label>

		<fieldset class="flex flex-col gap-3">
			<legend class="mb-1 text-sm font-semibold">Themes</legend>
			{#each themes as theme (theme.slug)}
				<label class="flex gap-3 text-sm leading-relaxed">
					<input
						type="checkbox"
						name="themes"
						value={theme.slug}
						checked={preselectedTheme === theme.slug}
						class="mt-1"
					/>
					<span>
						<span class="font-semibold">{theme.name}</span>
						<span class="block text-slate-600">{theme.description}</span>
					</span>
				</label>
			{/each}
		</fieldset>

		<div class="cf-turnstile" data-sitekey={turnstileSiteKey}></div>

		<button
			type="submit"
			class="w-fit rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
		>
			Subscribe
		</button>
	</form>
</section>
