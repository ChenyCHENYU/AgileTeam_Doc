---
outline: "deep"
---

# C_Layout 页面布局

> 🏗️ 全局页面布局容器，集成 Header + Tabbar + 安全区适配，是所有页面的基础框架。

## ✨ 特性

- **📐 统一布局**：一个组件解决页面框架，避免每页重复写头部和底栏
- **🔒 安全区内置**：自动适配 iOS 刘海屏和 Home Bar
- **🧩 灵活组合**：Header 和 Tabbar 均可独立开关
- **💬 消息角标联动**：自动消费 `useMessageStore`，展示未读消息角标
- **⚡ 全局 Loading**：内置全屏加载状态

## 🎯 快速开始

### 主页面（带 Tabbar）

```vue
<template>
  <C_Layout show-header show-tabbar>
    <view class="p-4">
      <!-- 页面内容 -->
    </view>
  </C_Layout>
</template>
```

### 二级页面（带返回按钮）

```vue
<template>
  <C_Layout :show-tabbar="false">
    <C_Header title="订单详情" show-back />
    <view class="p-4">
      <!-- 页面内容 -->
    </view>
  </C_Layout>
</template>
```

### 纯内容页面（登录/注册）

```vue
<template>
  <C_Layout :show-header="false" :show-tabbar="false">
    <!-- 全屏内容，无导航 -->
  </C_Layout>
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `showHeader` | `boolean` | `false` | 是否显示顶部 Header |
| `showTabbar` | `boolean` | `false` | 是否显示底部 Tabbar |
| `headerConfig` | `object` | `{}` | 透传给 C_Header 的配置 |
| `tabbarConfig` | `object` | `{}` | 透传给 C_Tabbar 的配置 |
| `bgColor` | `string` | `''` | 页面背景色 |
| `notificationCount` | `number` | `0` | 通知角标数（默认自动读取 MessageStore） |
| `globalLoading` | `boolean` | `false` | 是否显示全屏 loading |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `userClick` | `event` | 点击 Header 用户头像 |
| `notificationClick` | `event` | 点击通知按钮 |
| `settingsClick` | `event` | 点击设置按钮 |
| `statusClick` | `event` | 点击状态指示器 |
| `tabChange` | `index: number` | Tabbar 切换页面 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 页面主体内容区域 |

## 🎨 使用示例

::: details 💡 典型主页面 — Dashboard
```vue
<template>
  <C_Layout
    show-header
    show-tabbar
    @user-click="goToProfile"
    @notification-click="goToMessages"
  >
    <view class="p-4 flex-col gap-4">
      <C_Card title="数据概览">
        <!-- 图表 -->
      </C_Card>
    </view>
  </C_Layout>
</template>

<script setup lang="ts">
const goToProfile  = () => uni.navigateTo({ url: '/pages/profile/index' })
const goToMessages = () => uni.navigateTo({ url: '/pages/message/index' })
</script>
```
:::

::: details 💡 带全局 Loading 的数据页
```vue
<template>
  <C_Layout :show-tabbar="false" :global-loading="loading">
    <C_Header title="数据报表" show-back />
    <view v-if="!loading" class="p-4">
      <!-- 数据展示 -->
    </view>
  </C_Layout>
</template>

<script setup lang="ts">
const { loading, withLoading } = useLoading()
onMounted(() => withLoading(fetchData))
</script>
```
:::
