import { c as create_ssr_component, e as escape, d as each } from './index-64ea2edd.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { page } = $$props;
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  return `<section class="${"bg-image-grey"}"><article class="${"pt-24 max-w-4xl md:min-h-screen mx-auto p-8 text-xl"}"><header class="${"mb-16"}"><h1 class="${"text-5xl mt-6 mb-6 font-bold"}">${escape(page.properties.title)}</h1>
      <p class="${"mb-10"}"><i>${escape(page.properties.excerpt)}</i></p>
      <span>${each(page.properties.tags, (tag) => {
    return `${escape(`${tag} | `)}`;
  })}
      <b>${escape(page.properties.publishDate)}</b></span></header></article></section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-411e7dbc.js.map
