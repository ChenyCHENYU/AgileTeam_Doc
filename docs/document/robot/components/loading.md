---
outline: "deep"
description: "⏳ 加载指示组件，主题色 SVG 旋转动画，可配尺寸/颜色与可访问提示文案"
---

# C_Loading 加载指示

> ⏳ 轻量加载指示器，SVG 旋转动画默认使用 Naive UI 主题主色，自带可访问的加载说明

## ✨ 特性

- **🎨 主题联动**: 默认取 Naive UI 主题主色，无需手动传色
- **📐 尺寸可调**: `size` 控制 SVG 尺寸（默认 48px）
- **♿ 可访问**: 未传 `label` 时仍输出可访问的加载说明

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
  <C_Loading />
  <C_Loading :size="32" label="数据加载中" color="#18a058" />
</template>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `number` | `48` | SVG 尺寸（px） |
| `label` | `string` | — | 可见提示文案；不传时仍提供可访问说明 |
| `color` | `string` | 主题主色 | 旋转图形颜色 |

完整类型定义请查看包内 `C_Loading/types.ts`。
