---
outline: "deep"
---

# C_Tabbar 底部导航

> 📍 底部标签导航栏，支持玻璃拟态（glass）和扁平简约（flat）两种视觉风格，内置安全区适配和 Fluent Color 多彩图标。

## ✨ 特性

- **🎨 双风格切换**：`glass`（玻璃拟态）和 `flat`（扁平简约）两种模式
- **🌈 Fluent Color 图标**：内置 Microsoft Fluent Color 多彩图标集
- **🔒 SafeArea 内置**：自动适配 iOS Home Bar
- **🔔 角标支持**：可为每个 Tab 配置未读数角标
- **🧭 页面联动**：点击自动调用 `uni.switchTab` 或 `uni.navigateTo`

## 🎯 快速开始

```vue
<template>
  <C_Tabbar v-model="currentTab" :tab-list="tabs" mode="glass" />
</template>

<script setup lang="ts">
const currentTab = ref(0)

const tabs = [
  { id: 1, text: '首页', unoIcon: 'i-fluent-color-home-28',   path: '/pages/index/index' },
  { id: 2, text: '消息', unoIcon: 'i-fluent-color-chat-28',   path: '/pages/message/index', badge: 3 },
  { id: 3, text: '组件', unoIcon: 'i-fluent-color-apps-28',   path: '/pages/robot/index' },
  { id: 4, text: '我的', unoIcon: 'i-fluent-color-person-28', path: '/pages/profile/index' },
]
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `number` | `0` | 当前选中索引（v-model） |
| `tabList` | `TabItem[]` | `[]` | Tab 配置数组 |
| `mode` | `'glass' \| 'flat'` | `'glass'` | 视觉风格模式 |
| `activeColor` | `string` | `'#007AFF'` | 选中颜色 |
| `inactiveColor` | `string` | `'#8E8E93'` | 未选中颜色 |

### TabItem 类型

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | :---: | --- |
| `id` | `number \| string` | ✅ | 唯一标识 |
| `text` | `string` | ✅ | 标签文字 |
| `path` | `string` | ✅ | 跳转路径 |
| `unoIcon` | `string` | - | UnoCSS 图标类名（优先） |
| `icon` | `string` | - | wd-icon 图标名（未选中状态） |
| `activeIcon` | `string` | - | wd-icon 图标名（选中状态） |
| `badge` | `number` | - | 角标数（>0 显示，>99 显示 99+） |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `change` | `(item: TabItem, index: number)` | Tab 切换时触发 |
| `update:modelValue` | `number` | v-model 更新 |

## 🎨 使用示例

::: details 💡 flat 风格 + 消息角标
```vue
<template>
  <C_Tabbar
    v-model="activeTab"
    :tab-list="tabs"
    mode="flat"
    active-color="#FF6B35"
  />
</template>

<script setup lang="ts">
const activeTab = ref(0)
const messageStore = useMessageStore()

const tabs = computed(() => [
  {
    id: 1, text: '首页',
    icon: 'home', activeIcon: 'home',
    path: '/pages/index/index',
  },
  {
    id: 2, text: '消息',
    icon: 'notification', activeIcon: 'notification',
    path: '/pages/message/index',
    badge: messageStore.totalUnread,  // 实时联动
  },
])
</script>
```
:::
