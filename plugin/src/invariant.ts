/**
 * Package-owned invariant companion for
 * `@deepseek-ai/dsh-client-ui-fang-yuan-theme`.
 * @module @deepseek-ai/dsh-client-ui-fang-yuan-theme/invariant
 */

/* jscpd:ignore-start */
import type { Context } from '@deepseek-ai/cordis'
import type { InvariantInstaller } from '@deepseek-ai/dsh-invariants'

const PACKAGE_NAME = '@deepseek-ai/dsh-client-ui-fang-yuan-theme'

/** Cordis companion plugin name. */
export const name = 'client-ui-fang-yuan-theme-invariant'
/** Service required before the companion can reserve package ownership. */
export const inject = ['invariants']

/**
 * No runtime invariant: the plugin contributes a reversible ThemeRuntime
 * registration and a decorative root-scoped slot entry. Theme and slot
 * disposal are authoritative in their owning registries.
 */
const install: InvariantInstaller = () => {}

/**
 * Register this package's invariant companion.
 * @param ctx - Cordis context carrying the invariant service.
 * @returns the installed registration's disposer after setup succeeds.
 */
export const apply = (ctx: Context): Promise<() => void> =>
  Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install))
/* jscpd:ignore-end */
