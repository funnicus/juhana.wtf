import { c as create_ssr_component, e as escape, v as validate_component } from "../../chunks/index.js";
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<footer class="${""}"><section>
		<div class="${"p-4 max-w-screen-lg mx-auto"}"><div class="${"mb-10"}"><article><h3 class="${"text-3xl mb-10"}"><b>Me around the web:</b></h3>
					<div class="${"flex justify-between max-w-screen-md text-color-text-tertiary text-xl md:flex-row flex-col"}"><a href="${"https://github.com/funnicus"}" class="${"hover:underline mb-3"}"><span>GitHub 🐙</span></a>
						<a href="${"https:/🎮/www.linkedin.com/in/juhana-kuparinen-6284b8198/"}" class="${"hover:underline mb-3"}"><span>LinkedIn 👔</span></a>
						<a href="${"https://rateyourmusic.com/~fennicus"}" class="${"hover:underline mb-3"}"><span>Rate Your Music 🎧</span></a>
						
						<a href="${"https://glitchwave.com/user/fennicus/"}" class="${"hover:underline mb-3"}"><span>Glitchwave 🎮</span></a></div></article></div>
			<span>Juhana Kuparinen © ${escape((/* @__PURE__ */ new Date()).getFullYear())}, Built with
				${escape(" ")}
				<a href="${"https://kit.svelte.dev/"}" class="${"text-orange-500"}">SvelteKit</a></span></div></section></footer>`;
});
const app = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "@keyframes svelte-3axs2t-ripple{0%{transform:translate(-100%, -100%)}80%{transform:translate(-100%, -100%) scale(50)}100%{transform:translate(-100%, -100%) scale(50);opacity:0}}@keyframes svelte-3axs2t-fade{0%{opacity:1}100%{opacity:0}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `

<div class="${"font-mono bg-color-primary-dark text-image-grey"}"><main id="${"bubble-wrapper"}">${slots.default ? slots.default({}) : ``}</main>

	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
</div>`;
});
export {
  Layout as default
};
