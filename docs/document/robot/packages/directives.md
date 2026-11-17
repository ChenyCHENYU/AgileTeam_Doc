---
outline: "deep"
description: "@robot-admin/directives 2.0.2：Vue 3 的 11 个通用交互指令——复制、防抖、节流、拖拽、长按、权限、水印、懒加载、Loading、Tooltip、点击外部，按需子路径引入。"
reviewAfter: "2027-05-16"
---

# directives 交互指令

> **把复制、防抖与权限等交互，收敛为可预测的指令。** Vue 3 · TypeScript · 11 个指令 · 按需子路径

`@robot-admin/directives` 为 Vue 3 提供 **11 个通用交互指令**，当前版本 **2.0.2**。它关注 DOM 交互、应用级权限和反馈适配，以及挂载、更新、卸载时的资源清理，无运行时 UI 框架依赖。Robot Admin 的自定义指令体系即由本包提供。

## 指令清单

| 指令 | 主要能力 |
| :---: | :--- |
| `v-copy` | 动态文本、异步文本、Clipboard 降级、键盘支持与复制反馈 |
| `v-debounce` / `v-throttle` | handler 事件模式、leading / trailing 与动态事件 |
| `v-drag` / `v-longpress` | 指针交互、边界／网格、长按容差与取消 |
| `v-permission` | 应用级权限 Provider、AND / OR、通配符与三种降级 |
| `v-watermark` / `v-lazy` | 多行水印、图片／背景懒加载、更新竞态处理 |
| `v-loading` / `v-tooltip` | 加载反馈、焦点提示、ARIA、CSP nonce |
| `v-click-outside` | 外部点击、排除项、Shadow DOM 与共享监听 |

## 快速开始

需要 **Vue ≥3.3.0**：

```bash
bun add @robot-admin/directives vue@^3.3.0
```

### 局部使用

`<script setup>` 中导入的指令可直接作为模板指令使用：

```vue
<script setup lang="ts">
import { ref } from "vue";
import vDebounce from "@robot-admin/directives/debounce";

const keyword = ref("");
const search = (event: Event) => {
  keyword.value = (event.target as HTMLInputElement).value;
};
</script>

<template>
  <input v-debounce:input="{ handler: search, delay: 300 }" placeholder="输入关键词" />
  <p>防抖后的关键词：{{ keyword }}</p>
</template>
```

新代码推荐由指令持有 `handler`；`v-debounce="300" @click="save"` 等旧事件模式仍兼容。

### 应用级注册

```ts
import { createDirectives } from "@robot-admin/directives";

createApp(App)
  .use(createDirectives({ prefix: "ra-" }))
  .mount("#app");
```

此时模板使用 `v-ra-copy`、`v-ra-loading` 等名称。权限数据和消息回调通过 `createDirectives({ permission, notify })` 接入。

## 入口与应用边界

| 需求 | 选择 |
| :--- | :--- |
| 全量注册与统一适配 | 根入口 `createDirectives(options)` |
| 单项交互 | `/copy`、`/debounce`、`/permission` 等 11 个子路径 |
| 兼容原项目 | 根入口 `setupDirectives(app, options)` |
| Nuxt / SSR | 客户端插件内注册；根模块导入不主动访问 DOM |

状态按元素隔离；卸载清理计时器、Observer、全局监听和临时 DOM。权限指令只控制界面呈现，接口授权由服务端执行。

## 相关链接

- [生态包总览](/robot/packages/preface) · [指南：自定义指令](/robot/guide/custom-directive)
- [github.com/ChenyCHENYU/robot-admin-packages](https://github.com/ChenyCHENYU/robot-admin-packages) · [npm](https://www.npmjs.com/package/@robot-admin/directives)
