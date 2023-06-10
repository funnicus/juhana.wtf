const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.png","me.png","me.png~"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.026bb67e.js","app":"_app/immutable/entry/app.1f9dcb3a.js","imports":["_app/immutable/entry/start.026bb67e.js","_app/immutable/chunks/index.d81acb00.js","_app/immutable/chunks/singletons.26afce48.js","_app/immutable/entry/app.1f9dcb3a.js","_app/immutable/chunks/index.d81acb00.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-599d35f7.js'),
			() => import('./chunks/1-3f195a3c.js'),
			() => import('./chunks/2-75afd821.js'),
			() => import('./chunks/3-ccfb84e7.js'),
			() => import('./chunks/4-55a39170.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/blog/[id]",
				pattern: /^\/blog\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
