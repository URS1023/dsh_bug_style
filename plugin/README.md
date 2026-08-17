# `@deepseek-ai/dsh-client-ui-fang-yuan-theme`

English | [中文](README.zh.md)

Opt-in illustrated character theme for the DeepSeek Harness browser application. Its client plugin registers one concrete dark `ThemeDefinition`, activates it for the plugin lifetime, and contributes a decorative `shell.overlay` seal. The palette uses bone text, blood-moon red actions, cicada-jade success states, translucent ink surfaces, and an original Fang Yuan fan-art background. The background WebP is embedded in the lazy client bundle, so the default Web composition downloads none of its bytes.

ThemeRuntime retains the latest durable built-in preference behind the process-local `fang-yuan` selection. Removing the registration restores that retained value; a built-in theme chosen later by the user remains selected. The seal is decorative and `aria-hidden`, honors reduced motion, and drops its secondary motto on narrow viewports. Theme colors and the full-screen background flow only through ui-theme semantic aliases; the package introduces no global stylesheet.

The theme supplies a cicada mask and five visual identities through `ThemeBrand`: `蛊真人` in the sidebar, `蛊真人 · 古月方源` with a `春秋蝉` badge in the hero, a cicada beside the actual selected Agent preset, `蛊道 · 工作区炼化` on the access selector, and `古月山寨` over the workspace section. The Agent preset name is never replaced: Standard, PTC, and user-authored modes continue to show their live names and menu state. Owning components keep their original accessible labels while the themed text remains decorative.

## Enable it

The Web bundle declares the plugin row disabled. Run the source checkout with the provided overlay:

```sh
pnpm dsh --profile web --patch examples/web-fang-yuan/cordis.yml
```

The overlay changes presentation only. Model access and every other Web-profile setting remain unchanged.

The project artwork source is [`assets/fang-yuan-background.webp`](assets/fang-yuan-background.webp). [`src/client/background.ts`](src/client/background.ts) embeds those exact bytes; the package test rejects drift between the two files.

## Model Experience

None, as this browser-side character theme registers nothing model-facing.

#### KV Cache effect

None; this package neither assembles nor sends a provider request.

## Known Limitations and Deferred Work

- **The custom id is process-local** — the Host settings schema persists only Light, Dark, and System. Selecting one of those built-in choices while the plugin remains loaded hides the Fang Yuan theme until the plugin is reloaded.
- **The illustration is one fixed composition** — `cover` cropping keeps the face visible across ordinary desktop and narrow layouts, but it does not provide separate portrait artwork for very tall screens.
