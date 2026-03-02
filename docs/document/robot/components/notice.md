---
outline: 'deep'
---

# C_NotificationCenter 企业级通知中心

> 🔔 消息分类 · WebSocket 推送 · 乐观更新 · 桌面通知 — 让消息触达零延迟

## 🚀 在线演示

::: tip 💻 在线体验
该组件已集成在 Robot Admin 顶部工具栏中，点击铃铛图标即可查看 → [Robot Admin](https://robotadmin.cn)
:::

## ✨ 特性

- **📬 消息分类**: 系统通知 / 业务消息 / 告警预警，Tab 切换 + 各分类未读徽标
- **🔴 智能角标**: 未读数动画角标，紧急消息脉冲环提醒，溢出显示 99+
- **✅ 已读管理**: 单条标记已读、批量全部已读、乐观更新 + 失败自动回滚
- **📄 消息详情**: 列表 / 详情平滑切换，富文本渲染，操作链接跳转
- **⚡ WebSocket 推送**: 自动重连、心跳保活、连接状态可视化指示灯
- **🖥️ 桌面通知**: 浏览器 Notification API 集成，新消息即时弹窗
- **💾 本地持久化**: 未读状态 localStorage 缓存，刷新不丢失
- **🔄 自动轮询**: 可配置间隔的定时拉取，WebSocket 断连自动降级
- **🎨 主题适配**: 全量使用 CSS 变量，自动适配亮 / 暗主题
- **💪 TypeScript**: 完整的类型定义和类型安全

## 📦 安装

无外部依赖。组件通过 DynamicComponent 自动注册在 Layout Header 铃铛按钮位，无需手动引入。

## 🎯 快速开始

### 零配置使用

组件嵌入 `C_NavbarRight` 的 `headerActions` 中，零配置即可运行（自动加载内置模拟数据）：

```vue
<!-- C_NavbarRight 中已配置，无需额外操作 -->
<!-- headerActions: [{ type: 'component', componentName: 'C_NotificationCenter' }] -->
```

### 接入后端 API

```vue {3-10}
<template>
  <!-- Props 驱动：传入 API 函数即可对接后端 -->
  <C_NotificationCenter
    :fetch-notifications="api.fetchNotifications"
    :mark-as-read="api.markAsRead"
    :mark-all-read="api.markAllRead"
    :delete-notification="api.deleteNotification"
    :clear-notifications="api.clearNotifications"
    :polling-interval="30000"
    @unread-change="handleUnreadChange"
  />
</template>

<script setup>
  const handleUnreadChange = count => {
    console.log('未读数变化:', count)
  }
</script>
```

::: details ⚡ WebSocket 实时推送 - 自动重连 + 心跳保活

```vue {3-14}
<template>
  <C_NotificationCenter
    :ws-config="{
      url: 'wss://api.example.com/ws/notifications',
      autoReconnect: true,
      reconnectInterval: 3000,
      maxReconnectAttempts: 5,
      heartbeatInterval: 30000,
      heartbeatMessage: 'ping',
      getToken: () => userStore.token,
    }"
    desktop-notification
    :polling-interval="0"
    @new-message="handleNewMessage"
  />
</template>

<script setup>
  // WebSocket 推送时可关闭轮询（pollingInterval: 0）
  // WS 断连后组件自动降级为轮询模式

  const handleNewMessage = message => {
    console.log('收到新消息:', message.title)
  }
</script>
```

:::

::: details 🔧 手动控制 - 通过 ref 调用暴露方法

```vue {4,16-31}
<template>
  <div>
    <C_NotificationCenter
      ref="notificationRef"
      :fetch-notifications="api.fetchNotifications"
      :mark-as-read="api.markAsRead"
    />

    <NSpace>
      <NButton @click="refreshMessages">刷新消息</NButton>
      <NButton @click="readAll">全部已读</NButton>
    </NSpace>
  </div>
</template>

<script setup>
  const notificationRef = ref()

  const refreshMessages = () => {
    notificationRef.value?.refresh()
  }

  const readAll = async () => {
    await notificationRef.value?.markAllAsRead()
    const unread = notificationRef.value?.getUnreadCount()
    console.log('剩余未读:', unread) // 0
  }

  // 获取当前消息列表
  const messages = notificationRef.value?.getMessages()
</script>
```

:::

::: details 📬 后端 API 对接示例 - 完整的函数签名

```typescript
import type {
  FetchNotificationsFn,
  MarkAsReadFn,
  MarkAllReadFn,
  DeleteNotificationFn,
  ClearNotificationsFn,
} from '@/types/modules/notification'

// 拉取消息列表
const fetchNotifications: FetchNotificationsFn = async params => {
  const res = await request.get('/api/notifications', { params })
  return {
    list: res.data.list, // NotificationMessage[]
    total: res.data.total, // 总条数
    unreadCount: res.data.unreadCount,
  }
}

// 标记已读
const markAsRead: MarkAsReadFn = async ids => {
  await request.post('/api/notifications/read', { ids })
}

// 标记全部已读
const markAllRead: MarkAllReadFn = async category => {
  await request.post('/api/notifications/read-all', { category })
}

// 删除消息
const deleteNotification: DeleteNotificationFn = async ids => {
  await request.post('/api/notifications/delete', { ids })
}

// 清空消息
const clearNotifications: ClearNotificationsFn = async category => {
  await request.post('/api/notifications/clear', { category })
}
```

:::

## 📖 API 文档

### Props

| 参数                    | 类型                   | 默认值                | 说明                       |
| ----------------------- | ---------------------- | --------------------- | -------------------------- |
| **fetchNotifications**  | `FetchNotificationsFn` | —                     | 拉取消息列表函数           |
| **markAsRead**          | `MarkAsReadFn`         | —                     | 标记已读函数               |
| **markAllRead**         | `MarkAllReadFn`        | —                     | 标记全部已读函数           |
| **deleteNotification**  | `DeleteNotificationFn` | —                     | 删除消息函数               |
| **clearNotifications**  | `ClearNotificationsFn` | —                     | 清空消息函数               |
| **wsConfig**            | `NotificationWSConfig` | —                     | WebSocket 配置             |
| **desktopNotification** | `boolean`              | `false`               | 是否启用桌面通知           |
| **maxBadgeCount**       | `number`               | `99`                  | 角标最大显示数             |
| **pollingInterval**     | `number`               | `60000`               | 轮询间隔（ms），0 = 不轮询 |
| **pageSize**            | `number`               | `20`                  | 每页条数                   |
| **storageKey**          | `string`               | `notification_center` | localStorage 缓存 key      |

### Events

| 事件名             | 参数                                | 说明               |
| ------------------ | ----------------------------------- | ------------------ |
| **itemClick**      | `(message: NotificationMessage)`    | 点击消息           |
| **read**           | `(ids: string[])`                   | 消息标记已读       |
| **allRead**        | `(category?: NotificationCategory)` | 全部标记已读       |
| **delete**         | `(ids: string[])`                   | 删除消息           |
| **unreadChange**   | `(count: number)`                   | 未读数变化         |
| **wsStatusChange** | `(status: WSConnectionStatus)`      | WebSocket 状态变化 |
| **newMessage**     | `(message: NotificationMessage)`    | 收到新消息（WS）   |

### 暴露方法

| 方法名             | 签名                                                 | 说明             |
| ------------------ | ---------------------------------------------------- | ---------------- |
| **refresh**        | `() => Promise<void>`                                | 刷新消息列表     |
| **connectWS**      | `() => void`                                         | 手动连接 WS      |
| **disconnectWS**   | `() => void`                                         | 手动断开 WS      |
| **getUnreadCount** | `() => number`                                       | 获取未读数       |
| **getMessages**    | `() => NotificationMessage[]`                        | 获取当前消息列表 |
| **markRead**       | `(ids: string[]) => Promise<void>`                   | 手动标记已读     |
| **markAllAsRead**  | `(category?: NotificationCategory) => Promise<void>` | 手动全部已读     |

### 类型定义

#### 消息类别

```typescript
type NotificationCategory = 'system' | 'business' | 'alarm'
```

#### 消息优先级

```typescript
type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent'
```

#### 消息状态

```typescript
type NotificationStatus = 'unread' | 'read' | 'archived'
```

#### 消息体

```typescript
interface NotificationMessage {
  id: string // 消息唯一 ID
  title: string // 消息标题
  summary: string // 消息摘要（列表展示）
  content?: string // 富文本详情
  category: NotificationCategory // 消息类别
  priority: NotificationPriority // 优先级
  status: NotificationStatus // 消息状态
  timestamp: string // 发送时间（ISO 8601）
  sender?: { name: string; avatar?: string } // 发送者
  actionUrl?: string // 操作链接
  actionText?: string // 操作按钮文本
  extra?: Record<string, unknown> // 附加数据（业务扩展）
}
```

#### WebSocket 配置

```typescript
interface NotificationWSConfig {
  url: string // ws:// 或 wss:// 地址
  autoReconnect?: boolean // 自动重连（默认 true）
  reconnectInterval?: number // 重连间隔 ms（默认 3000）
  maxReconnectAttempts?: number // 最大重连次数（默认 5）
  heartbeatInterval?: number // 心跳间隔 ms（默认 30000，0=不发）
  heartbeatMessage?: string // 心跳消息（默认 'ping'）
  getToken?: () => string | undefined // 鉴权 token 获取函数
}
```

#### WebSocket 推送负载

```typescript
interface WSNotificationPayload {
  type: 'new_message' | 'read_sync' | 'count_update'
  data: NotificationMessage | NotificationMessage[] | { unreadCount: number }
}
```

## 🎨 使用示例

::: details 🏢 企业集成 - 对接权限系统 + 消息分发

```vue
<template>
  <C_NotificationCenter
    :fetch-notifications="fetchByRole"
    :mark-as-read="markAsRead"
    :mark-all-read="markAllRead"
    :delete-notification="deleteNotification"
    :ws-config="wsConfig"
    desktop-notification
    :polling-interval="30000"
    @item-click="handleItemClick"
    @unread-change="updateBadge"
  />
</template>

<script setup>
  const userStore = s_userStore()

  // 根据用户角色拉取对应消息
  const fetchByRole = async params => {
    const res = await request.get('/api/notifications', {
      params: { ...params, role: userStore.userInfo?.role },
    })
    return res.data
  }

  // WebSocket 配置：带鉴权
  const wsConfig = {
    url: `${import.meta.env.VITE_WS_BASE}/ws/notifications`,
    autoReconnect: true,
    getToken: () => userStore.token,
  }

  // 点击消息：跳转到关联页面
  const handleItemClick = message => {
    if (message.actionUrl) {
      router.push(message.actionUrl)
    }
  }

  // 未读数变化：更新浏览器标题
  const updateBadge = count => {
    document.title = count > 0 ? `(${count}) Robot Admin` : 'Robot Admin'
  }
</script>
```

:::

::: details 🔔 告警中心 - 监控系统告警推送

```vue
<template>
  <C_NotificationCenter
    :fetch-notifications="fetchAlarms"
    :ws-config="alarmWsConfig"
    desktop-notification
    :polling-interval="10000"
    @new-message="handleAlarm"
  />
</template>

<script setup>
  // 只拉取告警类消息
  const fetchAlarms = async params => {
    const res = await request.get('/api/alarms', { params })
    return {
      list: res.data.list.map(item => ({
        ...item,
        category: 'alarm',
        priority: item.level === 'critical' ? 'urgent' : 'high',
      })),
      total: res.data.total,
      unreadCount: res.data.unreadCount,
    }
  }

  const alarmWsConfig = {
    url: 'wss://monitor.example.com/ws/alarms',
    heartbeatInterval: 15000, // 告警场景心跳频率更高
  }

  // 紧急告警：播放提示音
  const handleAlarm = message => {
    if (message.priority === 'urgent') {
      new Audio('/sounds/alert.mp3').play()
    }
  }
</script>
```

:::

## 🛠️ 高级用法

::: details 📡 WebSocket 协议约定 - 前后端对接规范

```typescript
// 服务端推送消息格式：
// 1. 新消息推送
{
  type: 'new_message',
  data: {
    id: 'msg-xxx',
    title: '新的审批通知',
    summary: '张三提交了请假申请',
    category: 'business',
    priority: 'normal',
    status: 'unread',
    timestamp: '2026-02-27T10:30:00.000Z',
    sender: { name: '张三', avatar: '...' },
  }
}

// 2. 已读同步（多端同步场景）
{
  type: 'read_sync',
  data: [
    { id: 'msg-001' },
    { id: 'msg-002' },
  ]
}

// 3. 未读数校准
{
  type: 'count_update',
  data: { unreadCount: 5 }
}

// 鉴权：token 通过 URL 参数携带
// ws://host/ws/notifications?token=xxx
```

:::

::: details 🎨 自定义分类 - 扩展消息类别

```typescript
// 修改 constants.ts 中的 CATEGORY_MAP 和 CATEGORY_TABS
// 同时扩展 NotificationCategory 类型

// 1. 扩展类型（notification.d.ts）
type NotificationCategory = 'system' | 'business' | 'alarm' | 'todo'

// 2. 扩展分类映射（constants.ts）
export const CATEGORY_MAP = {
  // ...已有分类
  todo: {
    label: '待办事项',
    icon: 'i-mdi:clipboard-check-outline',
    color: 'primary',
  },
}

// 3. 扩展 Tab 列表（constants.ts）
export const CATEGORY_TABS = [
  { key: 'all', label: '全部' },
  { key: 'system', label: '系统通知' },
  { key: 'business', label: '业务消息' },
  { key: 'alarm', label: '告警预警' },
  { key: 'todo', label: '待办事项' },
]
```

:::

## ⚠️ 注意事项

### 1. API 对接

::: code-group

```vue [✅ 推荐]
<!-- 传入完整的 API 函数集 -->
<C_NotificationCenter
  :fetch-notifications="fetchFn"
  :mark-as-read="markReadFn"
  :mark-all-read="markAllReadFn"
  :delete-notification="deleteFn"
  :clear-notifications="clearFn"
/>
```

```vue [❌ 不推荐]
<!-- 只传拉取函数，不传操作函数 -->
<!-- 标记已读/删除只会本地更新，不会同步服务端 -->
<C_NotificationCenter :fetch-notifications="fetchFn" />
```

:::

### 2. WebSocket vs 轮询

::: code-group

```vue [✅ 推荐]
<!-- WS + 轮询双通道：WS 断连时自动降级 -->
<C_NotificationCenter :ws-config="wsConfig" :polling-interval="60000" />
```

```vue [❌ 不推荐]
<!-- 只用 WS 不设轮询兜底，断连后无法收到新消息 -->
<C_NotificationCenter :ws-config="wsConfig" :polling-interval="0" />
```

:::

### 3. 桌面通知

::: code-group

```vue [✅ 推荐]
<!-- 配合 WS 使用，新消息推送时弹桌面通知 -->
<C_NotificationCenter :ws-config="wsConfig" desktop-notification />
```

```vue [⚠️ 注意]
<!-- 纯轮询模式开启桌面通知，每次轮询都会弹窗 -->
<!-- 建议只在 WS 推送场景开启 -->
<C_NotificationCenter :polling-interval="10000" desktop-notification />
```

:::

## 🐛 故障排除

### 常见问题

::: details ❓ Q1: 切换分类时列表闪烁？
**A1:** 已优化。Mock 模式下切换分类不触发重新加载，仅客户端过滤。如果使用 API 模式仍然闪烁，检查后端响应速度，或考虑本地缓存策略。
:::

::: details ❓ Q2: WebSocket 连接状态一直显示"重连中"？
**A2:** 检查以下配置：

1. `wsConfig.url` 是否正确（ws:// 或 wss://）
2. `wsConfig.getToken` 是否返回有效 token
3. 后端 WS 服务是否正常运行
4. 浏览器控制台是否有跨域错误

```vue
<C_NotificationCenter
  :ws-config="{
    url: 'wss://正确的地址',
    getToken: () => userStore.token, // 确保 token 有效
    maxReconnectAttempts: 10, // 适当增加重试次数
  }"
/>
```

:::

::: details ❓ Q3: 桌面通知不弹出？
**A3:** 需要用户授权浏览器通知权限：

1. 确保传入 `desktop-notification` prop
2. 首次触发时浏览器会弹出授权弹窗
3. 如果用户拒绝，后续无法再弹出（需手动在浏览器设置中开启）
4. HTTPS 环境下才能使用 Notification API
   :::

::: details ❓ Q4: 未读状态刷新后丢失？
**A4:** 组件自动将未读 ID 持久化到 localStorage。如果仍丢失：

1. 检查 `storageKey` 是否与其他组件冲突
2. 确认 localStorage 未被清除
3. 接入后端 API 后，未读状态以服务端为准
   :::

## 🎯 最佳实践

### 1. 渐进式对接

```vue
<script setup>
  // 阶段1：零配置，Mock 数据体验功能
  // <C_NotificationCenter />

  // 阶段2：对接后端 API
  // <C_NotificationCenter :fetch-notifications="fetchFn" ... />

  // 阶段3：接入 WebSocket + 桌面通知
  // <C_NotificationCenter :ws-config="wsConfig" desktop-notification ... />
</script>
```

### 2. 合理的轮询间隔

```vue
<script setup>
  // 有 WebSocket 时：轮询作为兜底，间隔可以长一些
  const POLLING_WITH_WS = 120_000 // 2分钟

  // 无 WebSocket 时：轮询是唯一通道，间隔短一些
  const POLLING_WITHOUT_WS = 30_000 // 30秒

  // 告警场景：更短间隔
  const POLLING_ALARM = 10_000 // 10秒
</script>
```

### 3. 性能考量

```vue
<script setup>
  // 消息量大时建议：
  // 1. 后端分页（传入 pageSize）
  // 2. 服务端按分类过滤（减少传输量）
  // 3. WebSocket 推送增量消息（避免全量轮询）
  // 4. storageKey 按用户隔离（多用户场景）
</script>

<template>
  <C_NotificationCenter
    :page-size="15"
    :storage-key="`notification_${userId}`"
  />
</template>
```

## 📝 更新日志

### v1.0.0 (2026-02-27)

- ✨ 消息分类（系统通知 / 业务消息 / 告警预警）
- ✨ Props 驱动 API 对接（拉取 / 已读 / 删除 / 清空）
- ✨ WebSocket 实时推送（自动重连 + 心跳保活）
- ✨ 铃铛角标 + 紧急脉冲动画
- ✨ 消息详情富文本渲染 + 操作链接跳转
- ✨ 乐观更新 + 失败自动回滚
- ✨ 浏览器桌面通知 (Notification API)
- ✨ 未读状态 localStorage 持久化
- ✨ 自动轮询 + WS 降级双通道
- ✨ 完整的 TypeScript 类型定义
- ✨ 亮 / 暗主题自动适配 (CSS 变量)

> **零外部依赖**：纯原生 WebSocket + Notification API，无需安装任何第三方包。

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 组件内置了 8 条模拟消息，零配置即可运行。接入后端时只需传入 API 函数，组件内部自动切换为服务端数据源，无需修改任何 UI 代码。 🚀
