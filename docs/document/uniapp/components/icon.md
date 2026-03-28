---
outline: "deep"
---

# C_Icon 图标

> 🎨 统一图标组件，聚合 UnoCSS 图标、wot-design-uni 图标、SVG 文件和图片四种来源，用一个组件处理所有图标场景。

## ✨ 特性

- **🌈 四种来源**：`unocss` / `wot` / `svg` / `image` 一站式适配
- **🎨 Fluent Color**：完美支持 Microsoft Fluent Color 多彩图标集（`i-fluent-color-*`）
- **📏 统一尺寸**：`size` 属性数字（px）或字符串（CSS 值）均可
- **👆 可点击**：有 `click` 监听时自动包裹点击区域
- **🔴 兜底显示**：图标缺失时显示红色 `?` 占位，便于调试

## 🎯 快速开始

```vue
<template>
  <!-- UnoCSS 图标（最常用） -->
  <C_Icon name="i-fluent-color-home-28" :size="24" />

  <!-- Wot design 图标 -->
  <C_Icon type="wot" name="check" :size="20" color="#34C759" />

  <!-- SVG 文件 -->
  <C_Icon type="svg" name="/static/icons/logo.svg" :size="32" />
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `'unocss' \| 'wot' \| 'svg' \| 'image' \| 'custom'` | `'unocss'` | 图标来源类型 |
| `name` | `string` | `''` | 图标名称（UnoCSS 类名/wot 图标名/文件路径） |
| `size` | `string \| number` | `24` | 图标大小（数字为 px，字符串原样传入） |
| `color` | `string` | `'#333'` | 图标颜色（`unocss` 和 `wot` 类型有效） |
| `bold` | `boolean` | `false` | 是否加粗（`wot` 类型专用） |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `click` | `Event` | 点击图标时触发 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | `type='custom'` 时的自定义内容 |

## 🎨 使用示例

::: details 💡 常用 Fluent Color 图标参考

```vue
<template>
  <view class="flex flex-wrap gap-4">
    <!-- 首页 -->
    <C_Icon name="i-fluent-color-home-28" :size="32" />
    <!-- 消息 -->
    <C_Icon name="i-fluent-color-chat-28" :size="32" />
    <!-- 用户 -->
    <C_Icon name="i-fluent-color-person-28" :size="32" />
    <!-- 设置 -->
    <C_Icon name="i-fluent-color-settings-28" :size="32" />
    <!-- 工单 / 任务 -->
    <C_Icon name="i-fluent-color-task-list-ltr-28" :size="32" />
    <!-- 数据趋势 -->
    <C_Icon name="i-fluent-color-data-trending-28" :size="32" />
    <!-- 文档 -->
    <C_Icon name="i-fluent-color-document-28" :size="32" />
    <!-- 警告 -->
    <C_Icon name="i-fluent-color-warning-28" :size="32" />
  </view>
</template>
```
:::

::: details 💡 可点击的带颜色图标按钮
```vue
<template>
  <view class="icon-btn" @click="handleShare">
    <C_Icon name="i-fluent-color-share-28" :size="24" />
    <text class="text-xs text-gray-600">分享</text>
  </view>
</template>
:::
