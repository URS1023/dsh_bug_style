# `@deepseek-ai/dsh-client-ui-fang-yuan-theme`

[English](README.md) | 中文

DeepSeek Harness 浏览器应用的可选插画角色主题。其客户端插件注册一个具体的深色 `ThemeDefinition`，在插件生命周期内将其激活，并向 `shell.overlay` 贡献装饰印记。调色板采用骨白文字、血月红操作色、春秋蝉玉绿成功状态、半透明墨色表层，以及一张原创方源同人背景图。背景 WebP 嵌入惰性客户端 bundle，因此默认 Web 组合不会下载其中任何字节。

ThemeRuntime 会在进程内 `fang-yuan` 选择背后保留最新的持久化内置偏好。移除注册时会恢复该保留值；用户随后选择的内置主题会保持不变。印记属于装饰内容并设置 `aria-hidden`，遵循减少动态效果偏好，并在窄视口隐藏次要短句。主题颜色与全屏背景只通过 ui-theme 语义别名传递；该包不会引入全局样式表。

主题通过 `ThemeBrand` 提供一个春秋蝉 mask 和五处视觉身份：侧边栏的 `蛊真人`、hero 中带 `春秋蝉` 徽标的 `蛊真人 · 古月方源`、实际选中 Agent 预设旁的春秋蝉、访问选择器上的 `蛊道 · 工作区炼化`，以及工作区分区上的 `古月山寨`。Agent 预设名绝不会被替换：标准、PTC 与用户编写的模式继续显示各自实时名称和菜单状态。所属组件保留原无障碍标签，主题文字只作为装饰内容。

## 启用方式

Web 组合包声明了默认禁用的插件配置项。使用提供的 overlay（覆盖层）运行源码工作区：

```sh
pnpm dsh --profile web --patch examples/web-fang-yuan/cordis.yml
```

该覆盖层只改变展示。模型访问与 Web profile 的其他所有设置均保持不变。

项目插画源文件为 [`assets/fang-yuan-background.webp`](assets/fang-yuan-background.webp)。[`src/client/background.ts`](src/client/background.ts) 嵌入其完全相同的字节；包测试会拒绝两个文件之间的漂移。

## 模型体验

无，因为这个浏览器端角色主题不注册任何面向模型的内容。

#### KV Cache 影响

无；该包既不组装也不发送提供方请求。

## 已知限制与暂缓事项

- **自定义 id 只在进程内有效**：Host settings schema 只持久化浅色、深色和跟随系统。插件保持加载时若选择其中一个内置选项，方源主题会隐藏，直至重新加载插件。
- **插画只有一份固定构图**：`cover` 裁剪能在常见桌面与窄版布局中保持面部可见，但不会为很高的屏幕提供独立竖版插画。
