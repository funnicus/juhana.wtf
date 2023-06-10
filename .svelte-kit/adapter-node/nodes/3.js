import * as universal from '../entries/pages/blog/_page.ts.js';

export const index = 3;
export const component = async () => (await import('../entries/pages/blog/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/blog/+page.ts";
export const imports = ["_app/immutable/nodes/3.844d17f6.js","_app/immutable/chunks/index.d81acb00.js"];
export const stylesheets = [];
export const fonts = [];
