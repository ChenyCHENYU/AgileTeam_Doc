---
outline: "deep"
---

# 可用 Hooks

> 🪝 Robot uniApp 内置了 10 个面向移动端场景的 Composables（组合式函数），覆盖加载、分页、上传、WebSocket 等高频需求。

## 📦 统一导出

所有 Hooks 均从 `@/composables` 统一导出，且通过 `unplugin-auto-import` 自动导入，**无需手动 import**：

```ts
// 以下写法均可直接在 <script setup> 中使用
const { loading, withLoading } = useLoading()
const { list, loadMore }       = usePagination(fetchFn)
```

---

## 🔄 useLoading

**加载态管理**，自动处理 loading 状态的开启和关闭：

```ts
export function useLoading(initialValue = false) {
  const loading = ref(false)

  const startLoading = () => { loading.value = true }
  const stopLoading  = () => { loading.value = false }

  // 包裹异步函数，自动管理 loading
  const withLoading = async (fn) => {
    startLoading()
    try {
      return await fn()
    } finally {
      stopLoading()
    }
  }

  return { loading, startLoading, stopLoading, withLoading }
}
```

**使用示例：**

```vue
<script setup lang="ts">
const { loading, withLoading } = useLoading()

const handleSave = () =>
  withLoading(async () => {
    await submitForm(formData)
    uni.showToast({ title: '保存成功' })
  })
</script>

<template>
  <wd-button :loading="loading" @click="handleSave">保 存</wd-button>
</template>
```

---

## 📜 usePagination

**分页 + 上拉加载**，适配移动端无限滚动场景：

```ts
export function usePagination(fetchFn, options = {}) {
  const { pageSize = 20, immediate = false } = options

  const list      = ref([])
  const loading   = ref(false)
  const finished  = ref(false)
  const refreshing = ref(false)

  const pagination = reactive({ page: 1, pageSize, total: 0 })

  const loadMore = async (params = {}) => {
    if (loading.value || finished.value) return
    // ...请求、追加数据、翻页
  }

  const refresh = () => {
    pagination.page = 1
    finished.value  = false
    refreshing.value = true
    return loadMore()
  }

  return { list, loading, finished, refreshing, pagination, loadMore, refresh }
}
```

**使用示例：**

```vue
<script setup lang="ts">
const { list, loading, finished, loadMore, refresh } =
  usePagination(getOrderList, { pageSize: 20, immediate: true })
</script>

<template>
  <wd-pull-refresh @refresh="refresh">
    <C_List :data="list">
      <template #item="{ item }">
        <view>{{ item.name }}</view>
      </template>
    </C_List>
    <wd-loadmore :loading="loading" :finished="finished" @load="loadMore" />
  </wd-pull-refresh>
</template>
```

---

## 📁 useUpload

**文件上传**，封装图片选择、压缩、进度追踪：

```ts
const { files, uploading, chooseImage, upload, removeFile } = useUpload({
  maxCount: 9,
  maxSize: 10 * 1024 * 1024,  // 10MB
  compress: true,
})
```

**Props：**

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `maxCount` | `number` | `9` | 最大文件数 |
| `maxSize` | `number` | `10MB` | 单文件最大体积（bytes） |
| `accept` | `string` | `IMAGE` | 文件类型 |
| `compress` | `boolean` | `true` | 是否压缩图片 |

**使用示例：**

```vue
<script setup lang="ts">
const { files, chooseImage, upload, removeFile } = useUpload({ maxCount: 3 })
</script>

<template>
  <C_Upload v-model="files" :max-count="3"
    @choose="chooseImage" @delete="removeFile" />
  <wd-button @click="upload('/api/upload')">上传</wd-button>
</template>
```

---

## 🔌 useWebSocket

**WebSocket 连接管理**，带自动重连、心跳检测和消息队列：

```ts
const { connect, send, close, status, lastMessage } = useWebSocket({
  url: 'wss://api.example.com/ws',
  autoReconnect: true,
  maxReconnect: 5,
  heartbeatInterval: 30000,
  onMessage: (data) => console.log('收到消息:', data),
})
```

**参数说明：**

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `url` | `string` | - | WebSocket 地址 |
| `autoReconnect` | `boolean` | `true` | 断线自动重连 |
| `maxReconnect` | `number` | `5` | 最大重连次数 |
| `reconnectDelay` | `number` | `3000` | 重连基础延迟(ms) |
| `heartbeatInterval` | `number` | `30000` | 心跳间隔(ms) |
| `heartbeatMessage` | `string` | `'ping'` | 心跳消息内容 |

**连接状态枚举：**

```ts
export const WS_STATUS = {
  CONNECTING:    'connecting',
  CONNECTED:     'connected',
  DISCONNECTED:  'disconnected',
  RECONNECTING:  'reconnecting',
}
```

---

## 💬 useModal

**弹窗控制**，简化 Modal 组件的显示/隐藏逻辑：

```ts
const { visible, open, close, confirm } = useModal({
  onConfirm: async () => {
    await deleteOrder(id)
    refresh()
  },
})
```

**使用示例：**

```vue
<script setup lang="ts">
const { visible, open, close } = useModal()
</script>

<template>
  <wd-button @click="open">打开弹窗</wd-button>
  <C_Modal v-model:visible="visible" title="确认删除？"
    @confirm="handleConfirm" @cancel="close" />
</template>
```

---

## ⏱️ useCountdown

**倒计时**，适合验证码、秒杀等场景：

```ts
const { count, counting, start, stop, reset } = useCountdown(60)
```

**使用示例：**

```vue
<script setup lang="ts">
const { count, counting, start } = useCountdown(60)

const sendCode = async () => {
  await sendVerifyCode(phone)
  start()   // 开始 60 秒倒计时
}
</script>

<template>
  <wd-button :disabled="counting" @click="sendCode">
    {{ counting ? `${count}s 后重发` : '发送验证码' }}
  </wd-button>
</template>
```

---

## 🌐 useNetwork

**网络状态检测**，自动监听网络切换：

```ts
const { networkType, isOnline, isWifi } = useNetwork()
```

**使用示例：**

```vue
<template>
  <C_Notify v-if="!isOnline" message="当前无网络，请检查网络连接" type="warning" />
</template>
```

---

## 📤 useShare

**分享功能**，封装微信小程序分享和 H5 端分享：

```ts
const { share } = useShare({
  title: '这是分享标题',
  path: '/pages/detail/index?id=123',
  imageUrl: 'https://example.com/image.png',
})
```

---

## 💀 usePageSkeleton

**骨架屏管理**，控制骨架屏的显示时机：

```ts
const { showSkeleton, hideSkeleton, skeletonVisible } = usePageSkeleton()

// 数据加载完成后关闭骨架屏
onMounted(async () => {
  showSkeleton()
  await fetchData()
  hideSkeleton()
})
```

**使用示例：**

```vue
<template>
  <C_Skeleton v-if="skeletonVisible" :rows="5" />
  <view v-else>
    <!-- 真实内容 -->
  </view>
</template>
```

---

## 📋 Hooks 速查表

| Hook | 主要返回值 | 适用场景 |
| --- | --- | --- |
| `useLoading` | `loading`, `withLoading` | 异步操作加载态 |
| `usePagination` | `list`, `loadMore`, `refresh` | 列表 + 上拉加载 |
| `useUpload` | `files`, `chooseImage`, `upload` | 图片 / 文件上传 |
| `useWebSocket` | `connect`, `send`, `status` | 实时通信 |
| `useModal` | `visible`, `open`, `close` | 弹窗状态控制 |
| `useCountdown` | `count`, `counting`, `start` | 倒计时 |
| `useNetwork` | `isOnline`, `isWifi` | 网络状态检测 |
| `useShare` | `share` | 页面分享 |
| `usePageSkeleton` | `skeletonVisible` | 骨架屏管理 |
