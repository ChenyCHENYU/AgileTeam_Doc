---
outline: "deep"
---

# C_Card 卡片

> 🃏 通用卡片容器，提供标题、副标题、内容区三段式结构，支持四级阴影强度和点击态反馈。

## ✨ 特性

- **📦 三段式布局**：Header / Body / Footer 独立插槽，结构清晰
- **🌑 四级阴影**：`none` / `sm` / `md` / `lg` 可调阴影层次感
- **👆 点击态**：开启 `clickable` 后拥有按压高亮效果
- **🔧 灵活扩展**：`extra` 插槽在标题右侧放置操作按钮

## 🎯 快速开始

```vue
<template>
  <C_Card title="工单详情" subtitle="2025-01-01" shadow="md">
    <text>这里是卡片内容……</text>

    <template #footer>
      <wd-button size="small">查看</wd-button>
    </template>
  </C_Card>
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | `''` | 卡片主标题 |
| `subtitle` | `string` | `''` | 卡片副标题（标题下方小字） |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | 阴影等级 |
| `padding` | `boolean` | `true` | 内容区是否有内边距 |
| `clickable` | `boolean` | `false` | 是否有点击态 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 卡片主体内容 |
| `header` | 完全自定义头部区域（优先于 title/subtitle） |
| `extra` | 头部右侧操作区 |
| `footer` | 卡片底部区域 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `click` | - | `clickable` 为 `true` 时点击触发 |

## 🎨 使用示例

::: details 💡 带操作按钮的列表卡片
```vue
<template>
  <C_Card
    v-for="item in list"
    :key="item.id"
    :title="item.name"
    :subtitle="item.time"
    shadow="md"
    clickable
    @click="goDetail(item.id)"
  >
    <view class="flex gap-2 items-center">
      <C_Tag :type="item.statusType">{{ item.statusText }}</C_Tag>
      <text class="text-sm text-gray-600">{{ item.desc }}</text>
    </view>

    <template #extra>
      <wd-icon name="arrow-right" size="16px" color="#999" />
    </template>
  </C_Card>
</template>
:::

::: details 💡 自定义头部 + 无内边距（图片卡片）
```vue
<template>
  <C_Card :padding="false" shadow="lg">
    <template #header>
      <view class="flex items-center gap-3 p-4">
        <image class="w-10 h-10 rounded-full" :src="user.avatar" />
        <view>
          <view class="font-bold">{{ user.name }}</view>
          <view class="text-xs text-gray-500">{{ user.role }}</view>
        </view>
      </view>
    </template>

    <!-- 图片铺满，无内边距 -->
    <image class="w-full h-48" :src="item.cover" mode="aspectFill" />
  </C_Card>
</template>
:::
