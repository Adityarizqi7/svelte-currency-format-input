export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.7730a922.js","app":"_app/immutable/entry/app.91446a92.js","imports":["_app/immutable/entry/start.7730a922.js","_app/immutable/chunks/scheduler.8b5db029.js","_app/immutable/chunks/singletons.70e43409.js","_app/immutable/entry/app.91446a92.js","_app/immutable/chunks/scheduler.8b5db029.js","_app/immutable/chunks/index.ad1cbfff.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
