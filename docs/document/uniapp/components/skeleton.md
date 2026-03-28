---
outline: "deep"
---

# C_Skeleton 骨架屏

> 💀 加载占位骨架屏组件，在内容加载完成前展示灰色占位块，避免页面空白，提升感知性能。

## ✨ 特性

- **🔄 呼吸动画**：`animate` 开启渐变闪烁效果，视觉更自然
- **🧩 组合式占位**：支持头像 + 标题 + 段落行数自由组合
- **💡 条件渲染**：`loading` 为 `false` 时自动渲染默认插槽（真实内容）
- **📏 末行缩短**：最后一行自动缩至 60% 宽度，模拟自然段落

## 🎯 快速开始

```vue
<template>
  <C_Skeleton :loading="loading" avatar title :rows="3">
    <!-- 加载完成后渲染真实内容 -->
    <C_Card :title="data.name" :subtitle="data.time">
      {{ data.desc }}
    </C_Card>
  </C_Skeleton>
</template>

<script setup lang="ts">
const loading = ref(true)
const data = ref({})

onMounted(async () => {
  data.value = await fetchDetail()
  loading.value = false
})
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `loading` | `boolean` | `true` | 是否显示骨架屏（`false` 时渲染插槽内容） |
| `rows` | `number` | `3` | 段落占位行数 |
| `animate` | `boolean` | `true` | 是否启用呼吸动画 |
| `avatar` | `boolean` | `false` | 是否显示头像占位块 |
| `title` | `boolean` | `true` | 是否显示标题占位行 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | `loading` 为 `false` 时渲染的真实内容 |

## 🎨 使用示例

::: details 💡 列表页加载态
```vue
<template>
  <view>
    <template v-if="loading">
      <!-- 渲染 5 个骨架卡片 -->
      <C_Skeleton
        v-for="i in 5"
        :key="i"
        :loading="true"
        avatar
        title
        :rows="2"
      />
    </template>
    <template v-else>
      <C_Card
        v-for="item in list"
        :key="item.id"
        :title="item.title"
      />
    </template>
  </view>
</template>
:::

::: details 💡 详情页骨架（加载完成后切换）
```vue
<template>
  <C_Skeleton :loading="!detail" title :rows="5">
    <view v-if="detail">
      <C_Title :title="detail.name" />
      <text>{{ detail.content }}</text>
    </view>
  </C_Skeleton>
</template>
:::
