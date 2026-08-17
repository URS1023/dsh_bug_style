/**
 * Fang Yuan theme plugin, Node half. The feature is browser-only; this empty
 * apply keeps its lifecycle in the Host Loader so the client module registry
 * can discover and serve the browser bundle.
 */

/** Host plugin body; all behavior lives in the browser bundle. */
export function apply(): void {}
