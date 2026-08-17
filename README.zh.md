# dsh_bug_style

[English](README.md) | 中文

![方源主题预览](assets/fang-yuan-theme-preview.png)

这是 DeepSeek Harness 的可选**蛊真人／古月方源**视觉插件仓库。仓库只包含插件源码、原创背景图、干净的预览截图和一份集成补丁，不镜像完整的 DeepSeek Harness 仓库。

## 提供的内容

- 血月方源背景与半透明墨色表层。
- 侧边栏的 `蛊真人` 字标和春秋蝉图形。
- 带 `春秋蝉` 徽标的 `蛊真人 · 古月方源` hero 身份。
- 实时 Agent 预设名旁的春秋蝉图标。按钮仍显示实际的标准、PTC 或用户编写模式；菜单和选择行为保持不变。
- 访问模式选择器上的 `蛊道 · 工作区炼化`，以及工作区分区上的 `古月山寨`。
- 减少动态效果与窄视口处理，并保留原有无障碍标签。

## 在 DeepSeek Harness 工作区中使用

将本插件仓库与兼容版本的 DeepSeek Harness 源码树放在同级目录，然后在 Harness 仓库根目录执行：

```powershell
git clone https://github.com/URS1023/dsh_bug_style.git
git clone https://github.com/deepseek-ai/deepseek-harness.git
Set-Location deepseek-harness
git apply ../dsh_bug_style/deepseek-harness-fang-yuan.patch
pnpm install
pnpm run build
pnpm dsh --profile web --patch examples/web-fang-yuan/cordis.yml
```

补丁会让主题配置项在发布的 Web profile 中保持禁用；`examples/web-fang-yuan/cordis.yml` overlay（覆盖层）会显式启用它，因此普通界面在选择启用前保持不变。打开界面不需要模型凭据；发送模型提示词时仍采用普通 Web profile 的凭据要求。

如果要在用户的 Web profile 中长期启用，可以把下面的配置项加入 `$DSH_HOME/profiles/web/cordis.patch.yml`：

```yaml
- id: ui-fang-yuan-theme
  disabled: false
```

## 仓库内容

- [`plugin/`](plugin/README.md) —— 从 `@deepseek-ai/dsh-client-ui-fang-yuan-theme` 复制的独立包源码。
- [`deepseek-harness-fang-yuan.patch`](deepseek-harness-fang-yuan.patch) —— 用于现有 Harness 工作区的仅插件集成补丁。
- [`assets/fang-yuan-background.webp`](assets/fang-yuan-background.webp) —— 原创生成背景图。
- [`assets/fang-yuan-theme-preview.png`](assets/fang-yuan-theme-preview.png) —— 从真实无密钥 Web 组合生成的干净截图。

自定义主题 id 只在进程内有效。插件加载期间选择浅色、深色或跟随系统等内置主题后，内置选择会成为当前主题；重新加载或重新挂载插件即可再次激活方源主题。
