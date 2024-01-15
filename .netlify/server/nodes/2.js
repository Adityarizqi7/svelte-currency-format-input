

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.dcd95e35.js","_app/immutable/chunks/scheduler.8b5db029.js","_app/immutable/chunks/index.ad1cbfff.js"];
export const stylesheets = ["_app/immutable/assets/2.8dd29241.css"];
export const fonts = [];
