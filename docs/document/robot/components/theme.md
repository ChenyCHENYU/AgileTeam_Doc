---
outline: "deep"
---

# C_Theme 主题切换组件

> 🎨 一键切换浅色/深色/跟随系统三种主题模式，配合 Naive UI 主题系统使用

## 🚀 在线演示

::: tip 💻 在线体验
该组件已集成在 Robot Admin 顶部工具栏中，点击主题图标即可循环切换 → [Robot Admin](https://robotadmin.cn)
:::

## ✨ 特性

- **🔄 三种模式**: 浅色（light）、深色（dark）、跟随系统（system）
- **🔁 循环切换**: 点击按钮按 system → light → dark 循环
- **💡 Tooltip 提示**: 悬浮显示当前模式名称
- **🎯 v-model 绑定**: 与父组件/Store 状态双向同步

## 📦 安装

::: code-group

```bash [bun (推荐)]
bun add @robot-admin/naive-ui-components
```

```bash [pnpm]
pnpm add @robot-admin/naive-ui-components
```

```bash [npm]
npm install @robot-admin/naive-ui-components
```

:::

## 🎯 快速开始

### 基础使用

```vue {3}
<template>
  <!-- 点击循环切换：跟随系统 → 浅色 → 深色 -->
  <C_Theme v-model="themeMode" />
</template>

<script setup>
import { ref } from "vue";

const themeMode = ref("system"); // 'system' | 'light' | 'dark'
</script>
```

### 配合 Naive UI 主题

```vue
<template>
  <NConfigProvider :theme="naiveTheme">
    <C_Theme v-model="themeMode" />
    <!-- 应用内容 -->
  </NConfigProvider>
</template>

<script setup>
import { ref, computed } from "vue";
import { darkTheme } from "naive-ui";

const themeMode = ref("system");

const naiveTheme = computed(() => {
  if (themeMode.value === "dark") return darkTheme;
  if (themeMode.value === "light") return null;
  // system 模式：根据系统偏好
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? darkTheme
    : null;
});
</script>
```

### 配合 Store 使用

```vue
<template>
  <C_Theme v-model="appStore.themeMode" />
</template>

<script setup>
import { useAppStore } from "@/stores";

const appStore = useAppStore();
</script>
```

## 📖 API 文档

### Props

| 参数           | 类型        | 默认值     | 说明                         |
| -------------- | ----------- | ---------- | ---------------------------- |
| **modelValue** | `ThemeMode` | `'system'` | 当前主题模式（v-model 绑定） |

### ThemeMode 类型

```typescript
type ThemeMode = "system" | "light" | "dark";
```

### Events

| 事件名                | 参数                | 说明               |
| --------------------- | ------------------- | ------------------ |
| **update:modelValue** | `(mode: ThemeMode)` | 主题模式切换时触发 |

### 图标映射

| 模式     | 图标                      | Tooltip        |
| -------- | ------------------------- | -------------- |
| `system` | `mdi:sun-moon-stars`      | 当前: 跟随系统 |
| `light`  | `mdi:white-balance-sunny` | 当前: 浅色模式 |
| `dark`   | `mdi:moon-and-stars`      | 当前: 深色模式 |

## 🎨 使用示例

::: details 💡 在头部栏使用 - 与其他工具按钮组合

```vue
<template>
  <div class="navbar-actions">
    <C_GlobalSearch />
    <C_Language v-model="lang" />
    <C_Theme v-model="theme" />
    <C_NotificationCenter />
  </div>
</template>
```

:::

::: details 🔧 持久化主题偏好

```vue
<script setup>
import { ref, watch } from "vue";

const themeMode = ref(localStorage.getItem("theme-mode") || "system");

watch(themeMode, (mode) => {
  localStorage.setItem("theme-mode", mode);
  // 更新 HTML class 以配合 CSS
  document.documentElement.className = mode === "dark" ? "dark" : "";
});
</script>
```

:::

## ⚠️ 注意事项

### 1. system 模式的实现

`system` 模式只是标识，**实际的系统偏好检测需要在消费侧实现**：

```typescript
const isDarkPreferred = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;
```

### 2. 与 UnoCSS 暗黑模式配合

```typescript
// unocss.config.ts
export default defineConfig({
  theme: {
    dark: "class", // 使用 class 策略
  },
});
```

## 📝 更新日志

### v0.3.0 (2025-05-13)

- ✨ 新增主题切换组件
- ✨ 支持三种模式循环切换
- ✨ Tooltip 提示当前模式

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个组件设计用于团队协作，如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更好的开发体验！ 🚀
