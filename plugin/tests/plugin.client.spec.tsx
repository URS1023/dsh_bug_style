// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import InvariantRegistry from '@deepseek-ai/dsh-invariants'
import { apply as nodeApply } from '../src/index.ts'
import * as ThemeInvariant from '../src/invariant.ts'
import { apply, inject } from '../src/client/index.ts'
import { FangYuanSigil } from '../src/client/FangYuanSigil.tsx'
import { FANG_YUAN_BACKGROUND_DATA_URI } from '../src/client/background.ts'
import { FANG_YUAN_THEME_ID } from '../src/client/theme.ts'

afterEach(cleanup)

interface RegisteredDefinition {
  id: string
  colorScheme: string
  tokens: Record<string, string>
}

interface Harness {
  readonly ctx: Parameters<typeof apply>[0]
  readonly disposeTheme: ReturnType<typeof vi.fn>
  readonly disposeSlot: ReturnType<typeof vi.fn>
  readonly registered: { definition?: RegisteredDefinition; component?: unknown }
  readonly setPreference: (value: string) => void
  readonly setTheme: ReturnType<typeof vi.fn>
  readonly themeCleanup: () => void
}

/** Build the narrow service double the plugin consumes. */
function harness(initial = 'system'): Harness {
  let preference = initial
  let themeCleanup: (() => void) | undefined
  const registered: Harness['registered'] = {}
  const disposeTheme = vi.fn()
  const disposeSlot = vi.fn()
  const setTheme = vi.fn((id: string) => { preference = id })
  const ctx = {
    theme: {
      getTheme: () => ({ preference, active: { id: preference } }),
      register: (definition: RegisteredDefinition) => {
        registered.definition = definition
        return disposeTheme
      },
      setTheme,
    },
    effect: (install: () => () => void) => { themeCleanup = install() },
    slots: {
      inject: (_name: string, install: () => () => void) => { install() },
      register: (_options: unknown, component: unknown) => {
        registered.component = component
        return disposeSlot
      },
    },
  } as unknown as Parameters<typeof apply>[0]
  apply(ctx)
  if (themeCleanup === undefined) throw new Error('theme effect did not install')
  return {
    ctx,
    disposeTheme,
    disposeSlot,
    registered,
    setPreference: (value) => { preference = value },
    setTheme,
    themeCleanup,
  }
}

describe('Fang Yuan theme plugin', () => {
  it('registers the dark character palette, activates it, and fills the shell overlay', () => {
    const fixture = harness()

    expect(inject).toEqual(['slots', 'theme'])
    expect(fixture.registered.definition?.id).toBe(FANG_YUAN_THEME_ID)
    expect(fixture.registered.definition?.colorScheme).toBe('dark')
    expect(fixture.registered.definition?.tokens['--dsw-alias-app-background-image'])
      .toMatch(/^url\("data:image\/webp;base64,/)
    expect(fixture.registered.definition?.tokens['--dsw-alias-brand-primary']).toBe('rgb(190, 52, 63)')
    expect(fixture.setTheme).toHaveBeenCalledWith(FANG_YUAN_THEME_ID)
    expect(fixture.registered.component).toBe(FangYuanSigil)
  })

  it('unregisters without writing a built-in preference', () => {
    const fixture = harness('dark')

    fixture.themeCleanup()

    expect(fixture.setTheme.mock.calls).toEqual([[FANG_YUAN_THEME_ID]])
    expect(fixture.disposeTheme).toHaveBeenCalledOnce()
  })

  it('keeps a later user selection when the plugin unloads', () => {
    const fixture = harness('system')
    fixture.setPreference('light')

    fixture.themeCleanup()

    expect(fixture.setTheme.mock.calls).toEqual([[FANG_YUAN_THEME_ID]])
    expect(fixture.disposeTheme).toHaveBeenCalledOnce()
  })

  it('renders the recognizable decorative signature outside the accessibility tree', () => {
    const ui = render(<FangYuanSigil />)
    const sigil = ui.container.querySelector('[data-fang-yuan-sigil]')

    expect(sigil?.getAttribute('aria-hidden')).toBe('true')
    expect(sigil?.textContent).toBe('春秋蝉古月方源求道不悔')
  })

  it('embeds the checked-in WebP bytes exactly', () => {
    const encoded = FANG_YUAN_BACKGROUND_DATA_URI.slice('data:image/webp;base64,'.length)
    const source = readFileSync(join(process.cwd(), 'packages/client/ui-fang-yuan-theme/assets/fang-yuan-background.webp'))

    expect(Buffer.from(encoded, 'base64')).toEqual(source)
  })

  it('registers its invariant ownership and keeps the Node half inert', async () => {
    const ctx = new Context()
    nodeApply()
    await ctx.plugin(InvariantRegistry, { enabled: true })

    await expect(ctx.plugin(ThemeInvariant).await()).resolves.toBeDefined()
  })
})
