---
outline: "deep"
description: "🖱️ 全局右键上下文菜单，支持多级子菜单、禁用项与自动关闭"
---

# C_ContextMenu 右键菜单组件

> 🖱️ 全局右键上下文菜单，支持多级子菜单、禁用项与自动关闭

## 🚀 在线演示

<DemoIframe src="/preview/context-menu" title="右键菜单" height="600" />

## ✨ 特性

- **📚 多级子菜单**: 支持嵌套子菜单，可配置展开方向
- **🚫 状态控制**: 支持禁用单项或整个菜单
- **📐 宽度自适应**: 最小/最大宽度可配，防止内容溢出
- **⚡ 自动关闭**: 点击菜单项后自动关闭，可关闭该行为

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

## 🎯 基础用法

```vue
<template>
  <div @contextmenu.prevent="onContextMenu">右键点击此区域</div>
</template>

<script setup>
import { C_ContextMenu } from '@robot-admin/naive-ui-components'

const onContextMenu = (e) => {
  C_ContextMenu.show(e, [
    { key: 'copy', label: '复制' },
    { key: 'paste', label: '粘贴', disabled: true },
    {
      key: 'more',
      label: '更多',
      children: [{ key: 'export', label: '导出' }],
    },
  ])
}
</script>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `ContextMenuItem[]` | `[]` | 菜单项列表 |
| `min-width` | `number` | `180` | 菜单最小宽度 |
| `max-width` | `number` | `280` | 菜单最大宽度 |
| `sub-menu-placement` | `'right' \| 'left'` | `'right'` | 子菜单展开方向 |
| `auto-close` | `boolean` | `true` | 点击菜单项后是否自动关闭 |
| `disabled` | `boolean` | `false` | 是否禁用整个菜单 |
| `z-index` | `number` | `9999` | 自定义 z-index |

完整的类型定义请查看包内 `C_ContextMenu/types.ts`。
