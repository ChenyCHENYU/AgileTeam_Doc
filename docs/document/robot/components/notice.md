---
outline: 'deep'
---

# C_Notification 消息通知组件

> 🔔 消息通知弹出框组件，支持多类型消息展示和管理

## ✨ 特性

- **📋 多类型消息**: 支持通知、关注、待办三种消息类型
- **🎯 弹出式交互**: 点击触发弹出框显示消息列表
- **📜 滚动支持**: 消息过多时支持垂直滚动
- **👤 头像展示**: 支持用户头像和消息来源展示
- **🏷️ 标签标记**: 待办事项支持状态标签
- **⚡ 快捷操作**: 提供清空和查看更多等操作

## 📦 安装

组件已全局注册，直接使用即可：

```vue
<template>
  <C_Notification />
</template>
```

## 🎯 快速开始

### 基础用法

```vue
<template>
  <!-- 在顶部导航栏使用 -->
  <NLayoutHeader>
    <div class="header-actions">
      <C_Notification />
      <UserAvatar />
    </div>
  </NLayoutHeader>
</template>
```

### 自定义数据

```vue
<template>
  <C_Notification :data="customData" />
</template>

<script setup>
const customData = [
  {
    title: '系统通知',
    content: [
      {
        title: '系统维护通知',
        time: '2025-08-11 10:00:00',
        avatar: '/avatar/system.png'
      }
    ]
  }
]
</script>
```

## 📖 API 文档

### 数据结构

#### NoticeItem (通知项)
```typescript
interface NoticeItem {
  title: string    // 通知标题
  time: string     // 通知时间
  avatar: string   // 头像 URL
}
```

#### FollowItem (关注项)
```typescript
interface FollowItem {
  avatar: string   // 头像 URL
  title: string    // 标题
  desc: string     // 描述内容
  time: string     // 时间
}
```

#### TodoItem (待办项)
```typescript
interface TodoItem {
  title: string    // 待办标题
  desc: string     // 待办描述
  tag: string      // 状态标签文本
  tagType: 'success' | 'warning' | 'error' | 'info' | ''  // 标签类型
}
```

#### ListItem (列表项)
```typescript
interface ListItem {
  title: string              // 标签页标题
  content: ContentItem[]     // 消息内容数组
}
```

#### ActionItem (操作项)
```typescript
interface ActionItem {
  text: string    // 操作文本
  icon: string    // 图标类名
}
```

### 组件事件

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| **@click-item** | `(item: ContentItem, index: number)` | 点击消息项触发 |
| **@click-action** | `(item: ActionItem, index: number)` | 点击操作按钮触发 |

## 🎨 使用示例

### 场景 1: 标准管理后台

```vue
<template>
  <NLayoutHeader bordered>
    <div class="header-container">
      <div class="header-left">
        <AppLogo />
        <SystemMenu />
      </div>
      
      <div class="header-right">
        <!-- 消息通知 -->
        <C_Notification 
          @click-item="handleNotificationClick"
          @click-action="handleActionClick"
        />
        
        <UserDropdown />
      </div>
    </div>
  </NLayoutHeader>
</template>

<script setup>
// 处理消息点击
const handleNotificationClick = (item, index) => {
  console.log('处理消息:', item)
  
  // 根据消息类型进行不同处理
  if ('avatar' in item && 'desc' in item) {
    // 关注类消息
    router.push(`/profile/${item.userId}`)
  } else if ('tag' in item) {
    // 待办类消息
    router.push(`/todo/${item.id}`)
  } else {
    // 普通通知
    markAsRead(item.id)
  }
}

// 处理操作点击
const handleActionClick = (action, index) => {
  if (action.text === '清空代办') {
    clearTodos()
  } else if (action.text === '查看更多') {
    router.push('/notifications')
  }
}
</script>
```

### 场景 2: 实时消息推送

```vue
<template>
  <C_Notification 
    :data="notificationData" 
    @click-item="handleMessageClick"
  />
</template>

<script setup>
import { useWebSocket } from '@vueuse/core'

const notificationData = ref([
  {
    title: '通知',
    content: []
  },
  {
    title: '消息',
    content: []
  }
])

// WebSocket 连接
const { data } = useWebSocket('ws://localhost:8080/notifications')

// 监听消息推送
watch(data, (newMessage) => {
  if (newMessage) {
    const message = JSON.parse(newMessage)
    
    // 添加到对应的消息列表
    if (message.type === 'notification') {
      notificationData.value[0].content.unshift({
        title: message.title,
        time: message.time,
        avatar: message.avatar
      })
    } else if (message.type === 'message') {
      notificationData.value[1].content.unshift({
        avatar: message.sender.avatar,
        title: message.sender.name,
        desc: message.content,
        time: message.time
      })
    }
    
    // 限制消息数量
    notificationData.value.forEach(list => {
      if (list.content.length > 50) {
        list.content = list.content.slice(0, 50)
      }
    })
  }
})

const handleMessageClick = (item) => {
  // 标记为已读
  markAsRead(item.id)
  
  // 跳转到详情页
  if (item.conversationId) {
    router.push(`/chat/${item.conversationId}`)
  }
}
</script>
```

### 场景 3: 自定义操作按钮

```vue
<template>
  <C_Notification 
    :actions="customActions"
    @click-action="handleCustomAction"
  />
</template>

<script setup>
const customActions = [
  { text: '全部已读', icon: 'i-mdi:check-all' },
  { text: '消息设置', icon: 'i-mdi:cog-outline' },
  { text: '清空历史', icon: 'i-mdi:delete-sweep' }
]

const handleCustomAction = (action) => {
  switch (action.text) {
    case '全部已读':
      markAllAsRead()
      break
    case '消息设置':
      openSettings()
      break
    case '清空历史':
      clearHistory()
      break
  }
}

const markAllAsRead = async () => {
  try {
    await api.markAllNotificationsRead()
    message.success('已全部标记为已读')
    // 刷新消息列表
    refreshNotifications()
  } catch (error) {
    message.error('操作失败')
  }
}
</script>
```

### 场景 4: 消息过滤和搜索

```vue
<template>
  <div class="notification-wrapper">
    <!-- 过滤器 -->
    <NCard class="filter-card">
      <NSpace>
        <NSelect 
          v-model:value="filterType" 
          :options="typeOptions"
          placeholder="消息类型"
          clearable
        />
        <NDatePicker 
          v-model:value="dateRange" 
          type="daterange" 
          placeholder="时间范围"
        />
        <NInput 
          v-model:value="searchKeyword" 
          placeholder="搜索消息内容"
          clearable
        >
          <template #prefix>
            <span class="i-mdi:magnify"></span>
          </template>
        </NInput>
      </NSpace>
    </NCard>
    
    <!-- 通知组件 -->
    <C_Notification :data="filteredData" />
  </div>
</template>

<script setup>
const filterType = ref('')
const dateRange = ref(null)
const searchKeyword = ref('')

const typeOptions = [
  { label: '系统通知', value: 'system' },
  { label: '用户关注', value: 'follow' },
  { label: '待办事项', value: 'todo' }
]

// 原始数据
const rawData = ref([...]) // 原始通知数据

// 过滤后的数据
const filteredData = computed(() => {
  return rawData.value.map(list => ({
    ...list,
    content: list.content.filter(item => {
      // 类型过滤
      if (filterType.value && !matchType(item, filterType.value)) {
        return false
      }
      
      // 时间范围过滤
      if (dateRange.value && !inDateRange(item.time, dateRange.value)) {
        return false
      }
      
      // 关键词搜索
      if (searchKeyword.value && !matchKeyword(item, searchKeyword.value)) {
        return false
      }
      
      return true
    })
  }))
})
</script>
```

## 🎨 样式定制

### 自定义主题样式

```scss
// 自定义通知容器样式
.notification-container {
  position: relative;
  
  // 触发图标样式
  .notification-icon {
    color: #606266;
    cursor: pointer;
    transition: color 0.3s;
    
    &:hover {
      color: #409eff;
    }
  }
}

// 自定义弹出框样式
.notification-popover {
  .n-popover__content {
    padding: 0;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
}

// 自定义标签页样式
.notification-tabs {
  .n-tabs-nav {
    padding: 0 16px;
    background: #fafafa;
  }
  
  .n-tabs-tab {
    font-weight: 500;
  }
}

// 自定义通知项样式
.notification-item {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  // 头像样式
  .notification-avatar {
    margin-right: 12px;
    flex-shrink: 0;
  }
  
  // 内容区域
  .notification-details {
    flex: 1;
    min-width: 0;
    
    .notification-title {
      font-size: 14px;
      font-weight: 500;
      color: #333;
      margin-bottom: 4px;
    }
    
    .notification-desc {
      font-size: 13px;
      color: #666;
      margin-bottom: 6px;
      line-height: 1.4;
    }
    
    .notification-time {
      font-size: 12px;
      color: #999;
    }
  }
}

// 暗色主题适配
.dark {
  .notification-item {
    border-bottom-color: #2a2a2a;
    
    &:hover {
      background-color: #2a2a2a;
    }
    
    .notification-title {
      color: #e8e8e8;
    }
    
    .notification-desc {
      color: #b3b3b3;
    }
  }
}
```

## ⚙️ 高级用法

### 未读消息徽章

```vue
<template>
  <NBadge :value="unreadCount" :max="99">
    <C_Notification @click-item="handleRead" />
  </NBadge>
</template>

<script setup>
const unreadCount = computed(() => {
  return notificationStore.getUnreadCount()
})

const handleRead = (item) => {
  // 标记为已读
  notificationStore.markAsRead(item.id)
}
</script>
```

### 消息声音提醒

```vue
<script setup>
const playSound = () => {
  const audio = new Audio('/sounds/notification.mp3')
  audio.play().catch(() => {
    console.warn('无法播放提示音')
  })
}

// 监听新消息
watch(() => notificationStore.latest, (newMessage) => {
  if (newMessage && document.visibilityState === 'visible') {
    playSound()
  }
})
</script>
```

## 🐛 常见问题

### Q1: 消息数据不更新？

**A1:** 确保数据是响应式的：

```javascript
// ✅ 正确 - 使用响应式数据
const notificationData = ref([...])

// ❌ 错误 - 普通对象
const notificationData = [...] 
```

### Q2: 弹出框位置不正确？

**A2:** 检查触发元素的定位：

```scss
.notification-container {
  position: relative; // 必需
  display: inline-block;
}
```

### Q3: 滚动区域高度异常？

**A3:** 确保滚动容器有正确的最大高度：

```vue
<NScrollbar max-height="350px"> // 设置最大高度
  <!-- 内容 -->
</NScrollbar>
```

### Q4: 图标不显示？

**A4:** 检查图标类名和 CSS：

```vue
<!-- 确保图标库已正确引入 -->
<div class="i-mdi:bell-outline"></div>
```

## 🎯 最佳实践

### 1. 数据管理

```javascript
// 使用 Pinia 管理通知状态
export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
    unreadCount: 0
  }),
  
  actions: {
    addNotification(notification) {
      this.notifications.unshift(notification)
      this.unreadCount++
    },
    
    markAsRead(id) {
      const item = this.notifications.find(n => n.id === id)
      if (item && !item.read) {
        item.read = true
        this.unreadCount--
      }
    }
  }
})
```

### 2. 性能优化

```vue
<script setup>
// 使用虚拟滚动处理大量消息
import { VirtualList } from '@tanstack/vue-virtual'

// 分页加载
const pageSize = 20
const loadMore = () => {
  // 加载更多消息
}
</script>
```

### 3. 无障碍支持

```vue
<template>
  <div
    role="button" 
    :aria-label="`${unreadCount} 条未读消息`"
    tabindex="0"
    @keydown.enter="togglePopover"
  >
    <C_Notification />
  </div>
</template>
```

## 📝 更新日志

### v1.0.0 (2025-05-11)

- ✨ 初始版本发布
- ✨ 支持三种消息类型展示
- ✨ 弹出式交互设计
- ✨ 头像和标签支持
- ✨ 滚动和操作功能

## 🤝 贡献指南

组件位置：`src/components/global/C_Notification/index.vue`

如需扩展功能，请考虑：
1. 保持弹出框交互的流畅性
2. 确保消息数据结构的一致性
3. 维护良好的视觉层次
4. 更新相关类型定义

## 📄 许可证

Copyright (c) 2025 by ChenYu, All Rights Reserved 😎

---

**💡 提示**: 消息通知组件提供了类似移动端的通知中心体验，支持多种消息类型的统一展示。组件内置了完善的类型检查和事件处理，可以轻松集成到各种管理后台中。建议配合状态管理库使用，以便更好地管理消息的读取状态和实时更新。