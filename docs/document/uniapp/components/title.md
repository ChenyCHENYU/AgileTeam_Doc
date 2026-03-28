---
outline: "deep"
---

# C_Title 标题

> 📰 玻璃拟态风格的区块标题组件，集成主/副标题、左右图标、分割线和装饰元素，让页面分区更美观直观。

## ✨ 特性

- **🪟 玻璃拟态**：内置毛玻璃背景、光影渐变层和边框光效，开箱即用
- **🎨 6 种语义类型**：`default` / `primary` / `success` / `warning` / `danger` / `info`
- **🔢 6 级层次**：通过 `level` 1-6 控制字号层级
- **🖼️ 左右图标**：左侧图标卡片 + 右侧图标卡片，灵活组合
- **📏 分割线**：支持顶部/底部位置和渐变样式

## 🎯 快速开始

```vue
<template>
  <!-- 带图标的区块标题 -->
  <C_Title
    title="工单管理"
    subtitle="实时查看所有工单状态"
    type="primary"
    left-icon="i-fluent-color-document-28"
  />

  <!-- 简洁标题 -->
  <C_Title title="基本信息" :level="3" show-divider />
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | - (**必填**) | 主标题文字 |
| `subtitle` | `string` | `''` | 副标题/描述文字 |
| `level` | `1-6` | `2` | 标题级别（影响字号） |
| `type` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` | 语义类型（影响配色） |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | 对齐方式 |
| `bold` | `boolean` | `true` | 标题是否加粗 |
| `leftIcon` | `string` | `''` | 左侧图标名（UnoCSS 类名） |
| `rightIcon` | `string` | `''` | 右侧图标名（UnoCSS 类名） |
| `iconType` | `string` | `'unocss'` | 图标类型 |
| `iconSize` | `number` | `20` | 图标大小（px） |
| `iconColor` | `string` | `''` | 图标颜色 |
| `showDivider` | `boolean` | `false` | 是否显示分割线 |
| `dividerPosition` | `'top' \| 'bottom'` | `'bottom'` | 分割线位置 |
| `showDecoration` | `boolean` | `true` | 是否显示底部装饰条 |
| `clickable` | `boolean` | `false` | 是否可点击（悬浮上移效果） |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `click` | - | `clickable` 为 `true` 时点击触发 |

## 🎨 使用示例

::: details 💡 仪表板多彩区块标题
```vue
<template>
  <C_Title
    title="实时数据"
    subtitle="最近 24 小时汇总"
    type="success"
    left-icon="i-fluent-color-data-trending-28"
    size="large"
  />
  <C_Title
    title="待处理工单"
    subtitle="请及时跟进"
    type="warning"
    left-icon="i-fluent-color-task-list-ltr-28"
  />
  <C_Title
    title="异常告警"
    type="danger"
    left-icon="i-fluent-color-warning-28"
    right-icon="i-fluent-color-arrow-right-28"
    clickable
    @click="goAlerts"
  />
</template>
:::

::: details 💡 居中 + 底部分割线（表单区块）
```vue
<template>
  <C_Title
    title="账号信息"
    :level="3"
    align="center"
    show-divider
    divider-position="bottom"
    type="default"
  />
</template>
:::
