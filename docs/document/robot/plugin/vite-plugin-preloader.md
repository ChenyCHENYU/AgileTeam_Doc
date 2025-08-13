# vite-plugin-preloader

> 让页面切换不再转圈圈 ✨

解决路由切换时那些让人等得心焦的加载时间。每次点击图表页面都要转圈 3 秒？大文件加载慢得要命？这个插件就是为了解决这些问题。

## 🎯 为什么要做这个？

SPA 应用中经常遇到的痛点：

- 😤 **页面切换慢**：点击路由后要等几秒才显示，用户体验很差
- 🤦‍♂️ **重型组件卡顿**：echarts、富文本编辑器等大组件首次加载巨慢
- 😮‍💨 **用户流失严重**：等不及的用户直接关页面走人

团队里总有人抱怨某些页面太慢，但又不想大改架构，就想着能不能提前把这些页面悄悄加载好。

## ✨ 现在的效果

### ⚡ 秒开体验

用户点击前就把页面预加载好了，点击时瞬间显示。

### 🛠️ 零侵入配置

不用改任何业务代码，只在 vite 配置里加几行。

### 🧠 智能调度

按优先级预加载，不会影响首页性能。

### 🔍 完整调试

开发环境提供详细的加载进度和调试工具。

## ✨ 插件特性

简单说就是做了这几件事：

- 🛠️ **零侵入** - 不改业务代码，只在配置文件里设置
- ⚡ **真的快** - 构建时生成代码，运行时几乎零开销
- 🧠 **够聪明** - 按优先级预加载，不抢占主线程
- 🔍 **能调试** - 开发环境完整的调试工具和进度显示
- 📦 **很轻量** - 核心代码不到 200 行，不会增加打包体积

## 🚀 快速体验

### 安装个包

```bash
npm i vite-plugin-preloader -D
```

### 简单配置

```js
// vite.config.js
import preloader from "vite-plugin-preloader";

export default defineConfig({
  plugins: [
    vue(),
    preloader({
      routes: ["/dashboard", "/charts", "/calendar"],
    }),
  ],
});
```

就这样！不需要改任何业务代码，启动后会自动预加载这些页面。

## 🎭 效果对比

### 之前

```
点击路由 → 开始加载组件 → 等待 3 秒 → 页面显示
```

### 之后

```
点击路由 → 瞬间显示（已提前加载好）
```

控制台输出：

```
🚀 [预加载] 开始预加载 3 个页面
✅ [预加载] /dashboard (156ms) - 主页面，必须快
✅ [预加载] /charts (445ms) - echarts 太重了
✅ [预加载] /calendar (332ms) - fullcalendar 500KB
🎉 [预加载] 完成! 总耗时 1.2s
```

## 🎨 设计细节

### 工作原理

1. 页面加载完成后等待 2 秒（让首页稳定）
2. 按优先级依次预加载指定路由的组件
3. 组件加载后缓存在内存中
4. 用户点击时直接使用缓存的组件

### 智能调度

- 串行加载，不会同时请求多个大组件
- 可以设置优先级，重要页面先加载
- 后台异步进行，不影响用户操作

### 调试功能

开发环境下提供了完整的调试工具：

```js
// 浏览器控制台可用
preloaderDebug.stats(); // 查看加载统计
preloaderDebug.check("/dashboard"); // 检查页面状态
preloaderDebug.restart(); // 重新开始预加载
```

## 🛠️ 使用方式

### 基本配置

```js
preloader({
  routes: [
    "/demo/13-calendar", // 日历组件
    "/demo/29-antv-x6-editor", // 流程图编辑器
    "/demo/16-text-editor", // 富文本编辑器
  ],
});
```

### 精细化配置

```js
preloader({
  routes: [
    {
      path: "/dashboard",
      reason: "主页面，必须快",
      priority: 1,
    },
    {
      path: "/charts",
      reason: "echarts 太重了",
      priority: 2,
    },
  ],
  delay: 1000, // 延迟开始时间
  debug: true, // 显示调试信息
  showStatus: true, // 显示加载状态
});
```

### 配置选项

| 配置项       | 说明             | 默认值  |
| ------------ | ---------------- | ------- |
| `routes`     | 要预加载的路由   | `[]`    |
| `delay`      | 延迟开始时间(ms) | `2000`  |
| `showStatus` | 是否显示状态     | `true`  |
| `debug`      | 调试模式         | `false` |

### 使用建议

**适合预加载的页面：**

- ✅ 用户经常访问的核心页面
- ✅ 包含重型组件的页面（图表、编辑器）
- ✅ 首屏后的主要流程页面

**不建议预加载的页面：**

- ❌ 很少访问的管理页面
- ❌ 包含大量图片/视频的页面
- ❌ 需要权限验证的敏感页面

## 🔧 技术实现

主要技术点：

**构建时处理**

- 扫描配置生成预加载代码
- 创建虚拟模块自动注入到应用

**运行时调度**

- 页面稳定后按优先级串行加载
- 组件加载后缓存在内存中
- 失败时不影响正常路由跳转

**开发体验**

- 详细的加载日志和进度显示
- 完整的调试 API
- 可视化的状态反馈

## 🤔 一些说明

**Q: 会影响首页加载吗？**  
A: 不会，默认等待 2 秒后才开始，而且是后台异步进行。

**Q: 预加载失败怎么办？**  
A: 不影响正常使用，用户点击时还是会正常加载。

**Q: 支持动态路由吗？**  
A: 支持，比如 `/user/:id` 这样的路由也能预加载。

**Q: 会增加打包体积吗？**  
A: 几乎不会，生成的代码很少，而且会被 tree-shake。

**Q: 选择哪些页面预加载？**  
A: 建议选择 3-5 个最重要且加载较慢的页面。

## 🎉 一起完善

这个插件还在持续改进中，如果你：

- 🐛 遇到预加载不生效的问题
- 💡 有更好的调度策略想法
- 🔧 想优化加载算法

都很欢迎在 GitHub 上讨论交流！

---

## 📎 相关链接

[![npm version](https://img.shields.io/npm/v/vite-plugin-preloader.svg)](https://www.npmjs.com/package/vite-plugin-preloader)
[![GitHub stars](https://img.shields.io/github/stars/ChenyCHENYU/vite-plugin-preloader?style=social)](https://github.com/ChenyCHENYU/vite-plugin-preloader)

如果这个插件让你的页面切换变得丝滑，给个 star 支持一下吧 ⭐

[GitHub 仓库](https://github.com/ChenyCHENYU/vite-plugin-preloader) • [NPM 包](https://www.npmjs.com/package/vite-plugin-preloader) • [问题反馈](https://github.com/ChenyCHENYU/vite-plugin-preloader/issues)
