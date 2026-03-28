---
outline: "deep"
---

# C_SwipeAction 滑动操作

> 👈 列表项左/右侧滑动操作组件，支持左滑和右滑各自配置多个操作按钮，常见于删除、置顶、标记已读等快捷操作。

## ✨ 特性

- **↔️ 双向操作**：`leftActions` 和 `rightActions` 独立配置，左右均支持多个按钮
- **🔗 平滑动画**：手势驱动，松手后弹性归位，操作后自动收起
- **🎨 类型颜色**：`type` 对应预设颜色（`danger`/`warning`/`primary`），也支持 `bgColor` 自定义
- **🔒 禁用控制**：`disabled` 一键锁定滑动

## 🎯 快速开始

```vue
<template>
  <C_SwipeAction
    v-for="item in list"
    :key="item.id"
    :right-actions="[
      { text: '删除', type: 'danger', icon: 'delete' },
    ]"
    @action="({ action }) => onSwipeAction(action, item)"
  >
    <C_Card :title="item.title" />
  </C_SwipeAction>
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `leftActions` | `SwipeActionItem[]` | `[]` | 左侧滑出的操作按钮组 |
| `rightActions` | `SwipeActionItem[]` | `[]` | 右侧滑出的操作按钮组 |
| `disabled` | `boolean` | `false` | 是否禁用滑动 |
| `threshold` | `number` | `30` | 触发展开的滑动阈值（rpx） |

### SwipeActionItem 类型

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `text` | `string` | 按钮文字 |
| `icon` | `string` | wd-icon 图标名 |
| `type` | `'danger' \| 'warning' \| 'primary'` | 预设颜色类型 |
| `bgColor` | `string` | 自定义背景颜色（优先于 type） |
| `style` | `object` | 额外内联样式 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `action` | `{ action: SwipeActionItem, index: number, side: 'left' \| 'right' }` | 按钮点击时触发 |
| `open` | `side: 'left' \| 'right'` | 展开时触发 |
| `close` | - | 收起时触发 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 列表项内容主体 |

## 🎨 使用示例

::: details 💡 右滑删除 + 左滑标记
```vue
<template>
  <C_SwipeAction
    v-for="msg in messages"
    :key="msg.id"
    :left-actions="[{ text: '已读', type: 'primary', icon: 'check' }]"
    :right-actions="[{ text: '删除', type: 'danger', icon: 'delete' }]"
    @action="({ action, side }) => handleAction(action, side, msg)"
  >
    <view class="flex items-center gap-3 p-4 bg-white">
      <C_Badge :value="msg.unread" dot>
        <image class="w-10 h-10 rounded-full" :src="msg.avatar" />
      </C_Badge>
      <view class="flex-1">
        <view class="font-medium">{{ msg.fromName }}</view>
        <view class="text-sm text-gray-500 truncate">{{ msg.preview }}</view>
      </view>
    </view>
  </C_SwipeAction>
</template>
:::
