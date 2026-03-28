---
outline: "deep"
---

# C_Badge 徽标

> 🔔 徽标数组件，叠加在任意子元素右上角显示未读数量、消息提示或状态圆点，支持封顶数值和自定义颜色。

## ✨ 特性

- **🔴 圆点模式**：`dot` 属性显示为小圆点，适合仅需提醒不需数字的场景
- **📊 封顶数值**：超过 `max` 时自动显示为 `max+`（默认 99+）
- **🎨 自定义颜色**：可自定义徽标背景颜色
- **📍 偏移控制**：通过 `offset` 微调徽标位置
- **🚫 零值控制**：`showZero` 控制值为 0 时是否显示

## 🎯 快速开始

```vue
<template>
  <!-- 数字徽标 -->
  <C_Badge :value="12">
    <wd-icon name="notification" size="24px" />
  </C_Badge>

  <!-- 圆点提示 -->
  <C_Badge dot>
    <image class="w-8 h-8 rounded-full" :src="avatar" />
  </C_Badge>

  <!-- 封顶 -->
  <C_Badge :value="999" :max="99">
    <C_Icon name="mail" />
  </C_Badge>
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `number \| string` | `0` | 徽标值 |
| `max` | `number` | `99` | 最大封顶值，超出显示 `max+` |
| `dot` | `boolean` | `false` | 是否为圆点模式 |
| `showZero` | `boolean` | `false` | 值为 0 时是否显示 |
| `color` | `string` | `'#FF3B30'` | 徽标背景颜色 |
| `offset` | `[number, number]` | `[0, 0]` | 水平/垂直偏移量（rpx） |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 徽标叠加的目标内容 |

## 🎨 使用示例

::: details 💡 Tabbar 消息角标联动
```vue
<template>
  <view class="tab-bar">
    <view
      v-for="tab in tabs"
      :key="tab.key"
      class="tab-item"
    >
      <C_Badge :value="tab.unreadCount" :max="99">
        <C_Icon :name="tab.icon" size="24" />
      </C_Badge>
      <text>{{ tab.label }}</text>
    </view>
  </view>
</template>
:::

::: details 💡 头像在线状态圆点
```vue
<template>
  <C_Badge dot :color="user.online ? '#34C759' : '#8E8E93'">
    <image class="w-12 h-12 rounded-full" :src="user.avatar" />
  </C_Badge>
</template>
:::
