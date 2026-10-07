---
outline: "deep"
description: "💬 开箱即用的聊天界面组件，包含会话列表、消息气泡与输入区，适用于 IM、客服、站内信等场景"
---

# C_Chat 聊天组件

> 💬 开箱即用的聊天界面组件，包含会话列表、消息气泡与输入区，适用于 IM、客服、站内信等场景

## 🚀 在线演示

<DemoIframe src="/preview/chat" title="聊天组件" height="700" />

## ✨ 特性

- **👤 联系人侧栏**: 可配置显示/隐藏，支持当前选中联系人高亮
- **💬 消息气泡**: 自动区分自己/对方消息，支持头像、用户名与时间戳
- **📥 历史消息加载**: 内置加载状态与加载更多
- **✏️ 输入区**: 可配置占位符与发送按钮

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
  <C_Chat
    :contacts="contacts"
    :messages="messages"
    current-contact-id="u1"
    self-name="我"
    show-contacts
    show-timestamp
    @send="onSend"
  />
</template>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `contacts` | `ChatContact[]` | `[]` | 联系人列表 |
| `messages` | `ChatMessage[]` | `[]` | 消息列表 |
| `current-contact-id` | `string` | — | 当前选中的联系人 ID |
| `placeholder` | `string` | — | 输入框占位符 |
| `show-contacts` | `boolean` | — | 是否显示联系人侧栏 |
| `show-timestamp` | `boolean` | — | 是否显示消息时间戳 |
| `self-avatar` | `string` | — | 当前用户头像 |
| `self-name` | `string` | — | 当前用户名 |
| `show-send-btn` | `boolean` | — | 是否显示发送按钮 |
| `loading-history` | `boolean` | — | 是否正在加载历史消息 |

完整的类型定义请查看 [@robot-admin/naive-ui-components](https://www.npmjs.com/package/@robot-admin/naive-ui-components) 包内 `C_Chat/types.ts`。
