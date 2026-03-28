---
outline: "deep"
---

# C_TabNav 标签导航

> 🗂️ 可横向滚动的页内标签切换导航，支持下划线动画、吸顶固定和等分布局，用于页面内二级内容分类切换。

## ✨ 特性

- **🔄 横向滚动**：Tab 数量超屏时自动水平滚动，当前 Tab 始终居中
- **📌 吸顶固定**：`sticky` 模式配合自定义偏移，在页面滚动时固定
- **📐 等分宽度**：`equalWidth` 模式每个 Tab 均分容器宽度
- **🎯 下划线动画**：选中态下划线平滑过渡，支持自定义宽度
- **🔔 角标支持**：每个 Tab 可配置数字或文字角标

## 🎯 快速开始

```vue
<template>
  <C_TabNav v-model="activeTab" :tabs="tabs" show-line />
</template>

<script setup lang="ts">
const activeTab = ref('all')

const tabs = [
  { label: '全部', value: 'all' },
  { label: '待处理', value: 'pending', badge: 5 },
  { label: '进行中', value: 'doing' },
  { label: '已完成', value: 'done' },
]
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `string \| number` | `''` | 当前激活的 Tab value（v-model） |
| `tabs` | `TabNavItem[]` | `[]` | Tab 配置数组 |
| `scrollable` | `boolean` | `true` | 是否可横向滚动 |
| `showLine` | `boolean` | `true` | 是否显示下划线 |
| `lineWidth` | `number` | `40` | 下划线宽度（rpx） |
| `equalWidth` | `boolean` | `false` | 是否等分宽度 |
| `sticky` | `boolean` | `false` | 是否吸顶 |
| `stickyOffset` | `number` | `0` | 吸顶偏移量（px） |

### TabNavItem 类型

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | :---: | --- |
| `label` | `string` | ✅ | 标签文字 |
| `value` | `string \| number` | ✅ | 唯一标识 |
| `badge` | `string \| number` | - | 角标内容 |
| `disabled` | `boolean` | - | 是否禁用 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `string \| number` | v-model 更新 |
| `change` | `string \| number` | Tab 切换时触发 |

## 🎨 使用示例

::: details 💡 吸顶模式（顶部导航栏下方）
```vue
<template>
  <!-- 固定在导航栏（44px）下方 -->
  <C_TabNav
    v-model="tab"
    :tabs="tabs"
    sticky
    :sticky-offset="44"
    show-line
  />
  <view class="content">{{ currentContent }}</view>
</template>
:::

::: details 💡 等分布局（4 个 Tab 均分）
```vue
<template>
  <C_TabNav
    v-model="tab"
    :tabs="tabs"
    equal-width
    :show-line="false"
  />
</template>
:::
