

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.9c368bae.js","_app/immutable/chunks/scheduler.8b5db029.js","_app/immutable/chunks/index.ad1cbfff.js","_app/immutable/chunks/singletons.70e43409.js"];
export const stylesheets = [];
export const fonts = [];
