---
outline: 'deep'
---

# C_Chat 聊天组件

> 💬 通用即时通讯聊天 UI 组件，支持联系人列表、消息气泡（文本/图片/文件/系统）、输入框，适用于 IM、客服、AI 对话等场景

## 🚀 在线演示

<DemoIframe src="/preview/chat" title="聊天组件" height="700" />

## ✨ 特性

- **👥 联系人面板**: 左侧联系人列表，搜索、未读角标、在线状态
- **💬 多消息类型**: 文本 / 图片 / 文件 / 系统消息，气泡样式自动区分
- **🤖 AI 对话模式**: 隐藏联系人侧栏，单窗口对话，适合 ChatBot 场景
- **⏱️ 时间戳分组**: 智能时间间隔显示，避免每条消息重复时间
- **🔄 重发机制**: 发送失败消息支持点击重新发送
- **📜 历史加载**: 支持滚动加载更多历史消息
- **🎨 CSS 变量**: 全部颜色/尺寸通过 CSS 变量定制，自动适配主题
- **💪 TypeScript**: 完整类型定义

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

## 🎯 快速开始

### 最简用法

```vue
<template>
  <C_Chat
    :contacts="contacts"
    :messages="messages"
    :current-contact-id="currentId"
    self-avatar="/avatar/me.png"
    self-name="CHENY"
    @send="handleSend"
    @select-contact="handleSelectContact"
  />
</template>

<script setup>
  // 无需导入，已全局注册
</script>
```

> [!TIP]
> 消息通过 `messages` prop 传入，发送时监听 `@send` 事件，组件不直接管理消息状态。

### AI 对话模式

```vue
<template>
  <C_Chat
    :messages="messages"
    :show-contacts="false"
    title="AI 助手"
    placeholder="问我任何问题..."
    self-name="User"
    @send="handleSend"
  />
</template>
```

::: details 📱 客服系统场景

```vue {4-6}
<template>
  <C_Chat
    :contacts="sessionList"
    :messages="currentMessages"
    :current-contact-id="activeSession"
    :loading-history="isLoading"
    self-avatar="/avatar/agent.png"
    self-name="客服小王"
    @send="sendToCustomer"
    @select-contact="switchSession"
    @load-more="loadHistory"
    @file-upload="uploadFile"
  />
</template>
```

:::

## � API 文档

### Props

| 参数               | 类型            | 默认值        | 说明                       |
| ------------------ | --------------- | ------------- | -------------------------- |
| **contacts**         | `ChatContact[]` | `[]`          | 联系人列表                 |
| **messages**         | `ChatMessage[]` | `[]`          | 消息列表                   |
| **currentContactId** | `string`        | `''`          | 当前选中联系人 ID          |
| **placeholder**      | `string`        | `'输入消息...'` | 输入框占位符             |
| **showContacts**     | `boolean`       | `true`        | 是否显示联系人侧栏         |
| **showTimestamp**    | `boolean`       | `true`        | 是否显示消息时间戳         |
| **selfAvatar**       | `string`        | `''`          | 当前用户头像 URL           |
| **selfName**         | `string`        | `''`          | 当前用户名                 |
| **showSendBtn**      | `boolean`       | `true`        | 是否显示发送按钮           |
| **loadingHistory**   | `boolean`       | `false`       | 是否正在加载历史消息       |
| **title**            | `string`        | `'聊天'`      | 标题（无联系人模式时显示） |

### ChatMessage

| 字段       | 类型            | 说明                       |
| ---------- | --------------- | -------------------------- |
| `id`       | `string`        | 唯一标识                   |
| `content`  | `string`        | 消息内容                   |
| `type`     | `MessageType`   | `'text' \| 'image' \| 'file' \| 'system'` |
| `sender`   | `MessageSender` | `'self' \| 'other' \| 'system'` |
| `timestamp`| `string \| number` | 发送时间                |
| `avatar`   | `string`        | 发送者头像 URL             |
| `username` | `string`        | 发送者用户名               |
| `status`   | `MessageStatus` | `'sending' \| 'sent' \| 'failed'` |
| `fileName` | `string`        | 文件名（type='file'）      |
| `fileSize` | `number`        | 文件大小（字节）           |

### ChatContact

| 字段          | 类型              | 说明           |
| ------------- | ----------------- | -------------- |
| `id`          | `string`          | 唯一标识       |
| `name`        | `string`          | 显示名称       |
| `avatar`      | `string`          | 头像 URL       |
| `lastMessage` | `string`          | 最后消息摘要   |
| `lastTime`    | `string \| number`| 最后消息时间   |
| `unread`      | `number`          | 未读数         |
| `online`      | `boolean`         | 是否在线       |

### Events

| 事件名           | 参数                 | 说明             |
| ---------------- | -------------------- | ---------------- |
| **send**           | `(content: string)`  | 发送消息         |
| **select-contact** | `(id: string)`       | 选中联系人       |
| **load-more**      | —                    | 加载更多历史消息 |
| **image-preview**  | `(url: string)`      | 点击图片预览     |
| **file-click**     | `(msg: ChatMessage)` | 点击文件消息     |
| **file-upload**    | —                    | 点击上传文件     |
| **emoji-click**    | —                    | 点击表情按钮     |
| **resend**         | `(msg: ChatMessage)` | 重发失败消息     |

### Slots

| 插槽名          | 说明                 |
| --------------- | -------------------- |
| `header`        | 自定义顶栏内容       |
| `input-actions` | 自定义输入框左侧操作 |

### Expose 方法

| 方法             | 类型         | 说明           |
| ---------------- | ------------ | -------------- |
| `scrollToBottom`  | `() => void` | 滚动到最新消息 |

### CSS 变量

| 变量                   | 默认值                      | 说明         |
| ---------------------- | --------------------------- | ------------ |
| `--chat-bg`            | `rgba(30, 30, 30, 1)`      | 主背景色     |
| `--chat-sidebar-bg`    | `rgba(25, 25, 25, 1)`      | 侧栏背景色   |
| `--chat-sidebar-width` | `280px`                     | 侧栏宽度     |
| `--chat-header-bg`     | `rgba(35, 35, 35, 0.95)`   | 顶栏背景色   |
| `--chat-bubble-self`   | `rgba(24, 89, 233, 0.85)`  | 自己消息气泡 |
| `--chat-bubble-other`  | `rgba(55, 55, 55, 0.9)`    | 对方消息气泡 |
| `--chat-text-primary`  | `rgba(255, 255, 255, 0.92)` | 主文字色     |
| `--chat-avatar-size`   | `36px`                      | 头像尺寸     |
| `--chat-radius`        | `12px`                      | 面板圆角     |

### 类型定义

```typescript
type MessageType = 'text' | 'image' | 'file' | 'system'
type MessageSender = 'self' | 'other' | 'system'
type MessageStatus = 'sending' | 'sent' | 'failed'

interface ChatMessage {
  id: string
  content: string
  type: MessageType
  sender: MessageSender
  timestamp: string | number
  avatar?: string
  username?: string
  status?: MessageStatus
  fileName?: string
  fileSize?: number
}

interface ChatContact {
  id: string
  name: string
  avatar?: string
  lastMessage?: string
  lastTime?: string | number
  unread?: number
  online?: boolean
}
```

## 🔧 常见问题

::: details ❌ 消息不会自动滚动到底部

调用 `expose` 方法手动滚动：

```vue
<script setup>
  const chatRef = ref()
  // 发送消息后
  nextTick(() => chatRef.value?.scrollToBottom())
</script>
```

:::

::: details ❌ 文件消息如何处理？

组件只负责展示，文件上传 / 下载逻辑由外部处理：

```vue
<C_Chat
  @file-upload="openUploadDialog"
  @file-click="downloadFile"
/>
```

:::

## � 更新日志

### v1.0.0

- ✨ 新增 `C_Chat` 聊天面板组件
- ✨ 支持多消息类型（文本、图片、文件、系统）
- ✨ 支持时间分组与无限滚动加载

## 📚 相关资源

- [演示页面源码](../../views/demo/49-chat/index.vue)

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 聊天面板组件适用于即时通讯、客服对话、团队协作等场景。支持多种消息类型和时间分组展示。如果遇到问题请先查看文档，或者在团队群里讨论。💬
