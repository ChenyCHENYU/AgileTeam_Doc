---
outline: "deep"
---

# C_FloatButton 浮动按钮

> 🔘 悬浮操作按钮（FAB），固定于页面特定位置，支持拖拽移动，提供快捷的全局入口操作。

## ✨ 特性

- **📌 固定定位**：自动适配 SafeArea，bottom 自动加上 Home Bar 高度
- **✋ 可拖拽**：`draggable` 开启后用户可自由拖动按钮位置
- **🎨 插槽自定义**：默认显示 wd-icon，插槽可替换为任意内容
- **↙️ 位置配置**：支持右下角（`right-bottom`）和左下角（`left-bottom`）

## 🎯 快速开始

```vue
<template>
  <C_Layout>
    <!-- 页面内容 -->
    <C_List .../>

    <!-- 浮动按钮 -->
    <C_FloatButton
      icon="add"
      @click="openCreateModal"
    />
  </C_Layout>
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `icon` | `string` | `'add'` | wd-icon 图标名 |
| `position` | `'right-bottom' \| 'left-bottom'` | `'right-bottom'` | 按钮预设位置 |
| `bottom` | `number` | `120` | 距底部距离（rpx） |
| `right` | `number` | `40` | 距右侧距离（rpx，right-bottom 模式） |
| `left` | `number` | `40` | 距左侧距离（rpx，left-bottom 模式） |
| `size` | `number` | `100` | 按钮尺寸（rpx，正方形） |
| `draggable` | `boolean` | `false` | 是否可拖拽 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `click` | - | 点击按钮时触发（拖拽松手不触发） |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 自定义按钮内容（替代 icon） |

## 🎨 使用示例

::: details 💡 可拖拽的客服入口
```vue
<template>
  <C_FloatButton
    icon="customer-service"
    :size="120"
    draggable
    @click="openServiceChat"
  >
    <view class="flex flex-col items-center gap-0.5">
      <C_Icon name="i-fluent-color-chat-28" :size="24" />
      <text class="text-[10px] text-white">客服</text>
    </view>
  </C_FloatButton>
</template>
:::

::: details 💡 左下角自定义位置
```vue
<template>
  <C_FloatButton
    position="left-bottom"
    :left="30"
    :bottom="200"
    icon="arrow-up"
    @click="scrollToTop"
  />
</template>
:::
