/** Browser registration for the opt-in Fang Yuan theme and shell sigil. */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-theme/client'
import { FangYuanSigil } from './FangYuanSigil.tsx'
import { FANG_YUAN_THEME, FANG_YUAN_THEME_ID } from './theme.ts'

/** Services required by the theme registration and decorative overlay. */
export const inject = ['slots', 'theme']

/**
 * Register and activate the theme, then contribute its decorative signature.
 * ThemeRuntime retains the durable built-in preference behind this process-local
 * selection and restores it when the registration leaves.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => {
    const disposeTheme = ctx.theme.register(FANG_YUAN_THEME)
    ctx.theme.setTheme(FANG_YUAN_THEME_ID)
    return disposeTheme
  }, 'ui-fang-yuan-theme: theme registration')

  ctx.slots.inject('shell.overlay', () => ctx.slots.register({
    name: 'shell.overlay',
    id: 'fang-yuan-sigil',
    order: 90,
  }, FangYuanSigil))
}
