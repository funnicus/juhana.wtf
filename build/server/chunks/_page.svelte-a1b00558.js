import { c as create_ssr_component, e as escape } from './index-64ea2edd.js';

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const randomString = (n) => Array(n).join().split(",").map(function() {
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}).join("");
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let name = `${randomString(6)} ${randomString(9)}`;
  const shuffle = () => {
    let iteration = 0;
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const myName = "Juhana Kuparinen";
    const interval = setInterval(
      () => {
        name = name.split("").map((_, index) => {
          if (index === 6)
            return " ";
          if (index < iteration) {
            return myName[index];
          }
          return letters[Math.floor(Math.random() * 61)];
        }).join("");
        if (iteration >= name.length) {
          clearInterval(interval);
        }
        iteration += 1 / 7;
      },
      10
    );
    return name;
  };
  shuffle();
  return `${$$result.head += `<!-- HEAD_svelte-1utbc2f_START -->${$$result.title = `<title>juhana.wtf</title>`, ""}<meta name="${"description"}" content="${"Welcome to my interwebs home!"}"><!-- HEAD_svelte-1utbc2f_END -->`, ""}

<section>
	<section class="${"p-4 pb-0 max-w-screen-lg md:min-h-screen mx-auto flex xl:flex-row flex-col pt-20 items-center justify-between"}"><header class="${"box-border p-4"}"><div class="${"w-min mx-auto"}"><h1 aria-labelledby="${"Juhana Kuparinen"}" id="${"my-name"}" class="${"text-8xl mb-8 text-color-text-primary cursor-pointer"}">${escape(name)}</h1>
				<h4 class="${"text-2xl"}"><span class="${"text-image-grey"}">Software Engineer | Entrepreneur | Student</span></h4></div></header>
		<div class="${"h-auto max-w-lg"}"><img src="${"/me.png"}" alt="${"Juhana Kuparinen"}"></div></section></section>



`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-a1b00558.js.map
