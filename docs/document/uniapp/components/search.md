---
outline: "deep"
---

# C_Search 搜索框

> 🔍 搜索框组件，内置防抖输入、搜索历史记录（本地持久化）和快捷历史点击，开箱即用。

## ✨ 特性

- **⏱️ 防抖输入**：`debounceTime` 控制输入防抖延迟，避免频繁请求
- **📜 历史记录**：搜索历史自动持久化到 uni.storage，最多保存 `maxHistory` 条
- **⌨️ 键盘确认**：confirm-type 为 search，触发键盘搜索按钮
- **🔘 操作按钮**：`showAction` 控制右侧"搜索"按钮显示

## 🎯 快速开始

```vue
<template>
  <C_Search
    placeholder="搜索工单..."
    @search="onSearch"
    @input="onInput"
  />
</template>

<script setup lang="ts">
function onSearch(keyword: string) {
  fetchList({ keyword })
}

function onInput(keyword: string) {
  // 防抖后的实时输入
  console.log(keyword)
}
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `placeholder` | `string` | `'搜索'` | 输入框占位文本 |
| `maxHistory` | `number` | `10` | 最大历史记录条数 |
| `showHistory` | `boolean` | `true` | 是否展示搜索历史 |
| `debounceTime` | `number` | `300` | 防抖延迟（ms） |
| `showAction` | `boolean` | `true` | 是否显示右侧搜索按钮 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `search` | `string` | 点击搜索按钮或键盘确认时触发（同时保存历史） |
| `input` | `string` | 防抖输入值变化时触发 |
| `clear` | - | 点击清空按钮时触发 |

## 🎨 使用示例

::: details 💡 配合 usePagination 实现搜索列表
```vue
<template>
  <C_Search @search="onSearch" @clear="onSearch('')" />
  <C_List :loading="loading" :finished="finished" @load="loadMore">
    <C_Card v-for="item in list" :key="item.id" :title="item.name" />
  </C_List>
</template>

<script setup lang="ts">
const keyword = ref('')

const { list, loading, finished, loadMore, refresh } = usePagination(
  (page, size) => searchApi({ keyword: keyword.value, page, size })
)

function onSearch(kw: string) {
  keyword.value = kw
  refresh()
}
</script>
:::
