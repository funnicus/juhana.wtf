import { c as create_ssr_component, d as each, v as validate_component, f as add_attribute, e as escape } from './index-64ea2edd.js';

const PostCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { post } = $$props;
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  return `<div class="${"pb-24 pt-24 border-x-2 border-color-outline max-w-screen-lg mx-auto"}"><article class="${"hover:opacity-80 p-6"}"><a${add_attribute("href", `/blog/${post.id}`, 0)}><header class="${"mb-5"}"><h2 class="${"text-color-text-primary text-6xl underline decoration-4 decoration-color-text-tertiary mb-5"}">${escape(post.title)}</h2>
				<span class="${"text-color-text-tertiary"}">${each(post.tags, (tag) => {
    return `${escape(`${tag} | `)}`;
  })}
					<b>${escape(post.publishDate)}</b></span></header>
			<p class="${"mb-5 text-2xl"}">${escape(post.excerpt)}</p>
			<p class="${"underline decoration-slate-800"}"><span>Read more</span> 🔎
			</p></a></article></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { blogs } = $$props;
  if ($$props.blogs === void 0 && $$bindings.blogs && blogs !== void 0)
    $$bindings.blogs(blogs);
  return `<section class="${"bg-image-grey pt-24"}"><div class="${"max-w-screen-lg mx-auto p-6"}"><h5 class="${"text-xl mb-24"}">Blogs:</h5>

		${each(blogs, (blog) => {
    return `${validate_component(PostCard, "PostCard").$$render($$result, { post: blog }, {}, {})}`;
  })}</div></section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-0e1d2f70.js.map
