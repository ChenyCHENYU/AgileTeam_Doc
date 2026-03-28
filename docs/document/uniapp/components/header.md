---
outline: "deep"
---

# C_Header 导航头部

> 🧭 沉浸式自定义导航头部，支持玻璃拟态视觉效果、用户信息展示和安全区自动适配。

## ✨ 特性

- **🎨 玻璃拟态设计**：动态渐变背景 + 磨砂玻璃叠层，视觉层次感丰富
- **🔒 安全区自适应**：自动读取状态栏高度，适配刘海屏
- **👤 双模式切换**：首页用户模式（头像 + 昵称） / 详情返回模式（返回按钮 + 标题）
- **🔔 通知角标**：实时展示未读消息数
- **📶 在线状态**：支持用户在线状态显示

## 🎯 快速开始

### 首页用户模式

```vue
<template>
  <C_Header
    :notification-count="unreadCount"
    @user-click="goToProfile"
    @notification-click="goToMessages"
  />
</template>
```

### 二级页面返回模式

```vue
<template>
  <C_Header title="订单详情" show-back @back-click="handleBack" />
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | `''` | 标题文字（返回模式下显示在返回按钮旁） |
| `showBack` | `boolean` | `false` | 是否显示返回按钮（开启则切换为返回模式） |
| `showStatus` | `boolean` | `true` | 是否显示用户在线状态 |
| `notificationCount` | `number` | `0` | 通知未读数（>0 时显示角标） |
| `avatarSrc` | `string` | `''` | 用户头像地址（为空时从 UserStore 读取） |
| `nickname` | `string` | `''` | 昵称（为空时从 UserStore 读取） |
| `statusText` | `string` | `'在线'` | 在线状态文字 |
| `statusType` | `'online' \| 'busy' \| 'offline'` | `'online'` | 状态类型 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `userClick` | `event` | 点击用户区域（头像/昵称） |
| `notificationClick` | `event` | 点击通知按钮 |
| `settingsClick` | `event` | 点击设置按钮 |
| `statusClick` | `event` | 点击状态指示器 |
| `backClick` | `event` | 点击返回按钮 |

## 🎨 使用示例

::: details 💡 自定义状态 — 繁忙模式
```vue
<template>
  <C_Header
    status-text="忙碌中"
    status-type="busy"
    :notification-count="5"
    @user-click="openProfile"
  />
</template>
```
:::

::: details 💡 带自定义标题的返回模式
```vue
<template>
  <C_Header
    title="编辑个人资料"
    :show-back="true"
    @back-click="() => uni.navigateBack()"
  />
</template>
```
:::
