

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.edced662.js","_app/immutable/chunks/scheduler.8b5db029.js","_app/immutable/chunks/index.ad1cbfff.js"];
export const stylesheets = [];
export const fonts = [];
