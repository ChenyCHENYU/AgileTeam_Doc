# Vite Console Plugin

> 让 Vite 启动信息更清爽一点 ✨

我写了个小插件，解决一些`颜值即正义`的问题，以及些微的`视觉洁癖`。在咱们 `Robot Admin` 项目里已经配置好了，大家可以体验一下效果。

## 🎯 为什么要做这个？

开发中遇到的一些小问题：

- 😮‍💨 **界面单调**：Vite 默认的启动信息太朴素了，审美疲劳
- 🤦‍♂️ **缺少关键信息**：不知道当前在哪个分支、什么版本，团队协作时容易搞混

就想着能不能让启动信息更实用、更好看一些。

## ✨ 现在的效果

### 🎨 更清晰的布局
信息分类展示，不是一坨文字混在一起。

### 🧠 自动展示关键信息
- 当前版本、Git 分支、最新提交
- 本地和网络访问地址整理好了
- 团队信息、项目状态一目了然

### 🚫 屏蔽无用信息
把 Vite 那些用不上的提示过滤掉。

## ✨ 插件特性

简单说就是做了这几件事：

- 🎨 **颜值提升** - 用了丰富的颜色和图标，让终端好看一些
- 🔧 **信息整合** - 自动抓取版本号、Git 信息、服务器地址
- 🚫 **信息过滤** - 屏蔽 Vite 那些用不着的提示
- ⚡ **开箱即用** - 基本零配置，装上就能用
- 🌿 **Git 集成** - 显示当前分支和提交，方便团队协作
- 🔄 **配置监听** - 配置文件改了会有提示

## 🚀 在 Robot Admin 中体验

项目中已经配置好了，直接启动就能看到效果：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev (推荐)
```

## 🎭 对比效果

### 之前（Vite 默认）
```
  VITE v7.0.0  ready in 123 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  Vue DevTools: Open http://localhost:3000/__devtools__/ as a separate window
  ➜  UnoCSS: http://localhost:3000/__unocss
  ➜  press h + enter to show help
```

### 现在（用了插件）
```
──────────────────────────────────────────────────

🚀 Robot Admin 后台管理系统

⚡ 服务器信息
   ● 本地访问   http://localhost:3000/
   ● 网络访问   http://192.168.1.100:3000/
   ● 开发工具   Vue DevTools & UnoCSS Inspector

📦 项目信息
   ● 版本号       v1.2.3
   ● 启动时间     2025-08-01 10:30:45
   ● Git 分支     main
   ● 提交哈希     a1b2c3d

👥 团队信息
   ● 架构组       AGILE|TEAM
   ● 负责人       CHENY

✨ 启动成功！ 开发服务器已就绪
──────────────────────────────────────────────────
```

## 🎨 设计细节

### 颜色和图标

用了一套还算协调的配色：
- 🟢 绿色：本地地址、成功状态
- 🔵 蓝色：网络地址、一般信息  
- 🟡 黄色：Git 提交、警告信息
- 🔴 红色：安全提醒
- 🟣 紫色：开发工具、分支信息

图标也选了比较直观的：
- 🚀 系统启动
- 📦 项目信息  
- 👥 团队信息
- ⚠️ 重要提醒
- ⚡ 服务器状态

### 智能过滤

会自动屏蔽这些：
- `➜ Local: http://localhost:xxxx/`
- `➜ Network: use --host to expose`
- `➜ Vue DevTools: Open http://...`
- `➜ press h + enter to show help`
- 各种 DevTools 的 URL 和快捷键提示

但保留有用的：
- `ready in Xms` - 构建时间
- `server restarted` - 服务器重启
- `hmr update` - 热更新
- 所有错误和警告

## 🛠️ 在其他项目中使用

如果想在自己的项目里用，可以这样配置：

### 安装
```bash
npm install vite-console-plugin -D
```

### 配置
```typescript
// vite.config.ts
import { defineConfig } from "vite";
import viteConsolePlugin from "vite-console-plugin";

export default defineConfig({
  plugins: [
    viteConsolePlugin({
      systemName: "你的项目名",
      owner: "你的名字",
    }),
  ],
});
```

### 可选配置

| 配置项        | 说明         | 默认值                       |
| ------------- | ------------ | ---------------------------- |
| `systemName`  | 项目名称     | `'Robot_Admin'`              |
| `description` | 项目描述     | `'后台管理系统'`             |
| `team`        | 团队名称     | `'AGILE\|TEAM'`              |
| `owner`       | 负责人       | `'CHENY'`                    |
| `warning`     | 协作提醒     | `'请勿随意修改配置文件'`     |
| `security`    | 安全提醒     | `'禁止部署未加密的敏感数据'` |
| `autoVersion` | 自动读取版本 | `true`                       |

### 使用示例

**个人项目**
```typescript
viteConsolePlugin({
  systemName: "我的项目",
  owner: "张三",
});
```

**团队项目**
```typescript
viteConsolePlugin({
  systemName: "电商后台",
  team: "前端组",
  owner: "李四",
  warning: "改配置前说一声",
});
```

## 🔧 技术实现

主要是这几个点：

**信息获取**
- 版本号：从 `package.json` 读取
- Git 分支：`git rev-parse --abbrev-ref HEAD`
- Git 提交：`git rev-parse --short HEAD`
- 服务器地址：Vite 提供的信息重新整理

**消息拦截**
- 重写了 `server.config.logger.info/warn`
- 同时拦截 `console.log/info/warn`
- 用正则匹配需要过滤的信息

**状态管理**
- 用 `globalThis` 避免多实例重复输出
- 350ms 延迟确保服务器完全启动

## 🤔 一些说明

**性能影响？** 只在开发时运行，不影响构建。

**版本要求？** Vite 3.0+ 都支持。

**自定义样式？** 暂时用的固定配色，后面可以考虑支持自定义。

**Git 信息获取失败？** 会显示默认信息，不影响使用。

## 📝 版本记录

### v1.0.0
- 🎉 初始版本
- ✨ 支持精美启动界面
- 🔧 自动获取项目和 Git 信息
- 🚫 智能屏蔽原生输出
- 🎨 完整的颜色图标系统

## 🎉 一起完善

这个插件还有改进空间，如果大家有想法或者发现问题：

- 🐛 遇到 bug 可以告诉我
- 💡 有改进建议也欢迎
- 🔧 想一起完善代码的话，随时欢迎

---

## 📎 相关链接

[![GitHub stars](https://img.shields.io/github/stars/ChenyCHENYU/vite-console-plugin?style=social)](https://github.com/ChenyCHENYU/vite-console-plugin)

如果觉得这个小工具插件还不错，可以给它个 star 支持一下 ⭐

[GitHub 仓库](https://github.com/ChenyCHENYU/vite-console-plugin) • [NPM 包](https://www.npmjs.com/package/vite-console-plugin) • [问题反馈](https://github.com/ChenyCHENYU/vite-console-plugin/issues)
