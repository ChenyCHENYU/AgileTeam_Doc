---
outline: "deep"
---

# C_List 列表

> 📋 具备上拉加载、下拉刷新和虚拟滚动的高性能列表容器，内置加载中/加载完毕/失败/空状态处理，配合 `usePagination` 几乎零配置。

## ✨ 特性

- **⬆️ 上拉加载**：触底自动触发 `load` 事件
- **🔄 下拉刷新**：原生 refresher 下拉刷新
- **⚡ 虚拟滚动**：`virtual` 模式大数据量渲染，仅渲染可视区条目
- **🧩 内置状态**：加载中、加载完毕、加载失败、空状态自动处理
- **🤝 与 usePagination 配合**：天然集成分页逻辑

## 🎯 快速开始

```vue
<template>
  <C_List
    :loading="loading"
    :finished="finished"
    :show-empty="!list.length && !loading"
    @load="loadMore"
    @refresh="refresh"
  >
    <C_Card
      v-for="item in list"
      :key="item.id"
      :title="item.name"
    />
  </C_List>
</template>

<script setup lang="ts">
const { list, loading, finished, loadMore, refresh } = usePagination(fetchList)
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `loading` | `boolean` | `false` | 是否加载中 |
| `finished` | `boolean` | `false` | 是否已加载全部数据 |
| `finishedText` | `string` | `'没有更多了'` | 加载完毕提示文案 |
| `loadingText` | `string` | `'加载中...'` | 加载中提示文案 |
| `error` | `boolean` | `false` | 是否加载失败 |
| `errorText` | `string` | `'加载失败，点击重试'` | 失败提示文案（点击重新触发 `load`） |
| `showEmpty` | `boolean` | `false` | 是否显示空状态 |
| `emptyType` | `string` | `'list'` | 空状态图示类型（传给 C_Empty） |
| `emptyText` | `string` | `'暂无数据'` | 空状态提示文案 |
| `refresherEnabled` | `boolean` | `true` | 是否开启下拉刷新 |
| `virtual` | `boolean` | `false` | 是否开启虚拟滚动 |
| `items` | `any[]` | `[]` | 虚拟滚动数据源（`virtual` 为 `true` 时使用） |
| `itemHeight` | `number` | `80` | 虚拟滚动每项高度（px） |
| `buffer` | `number` | `10` | 虚拟滚动缓冲区数量 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `load` | - | 触底时触发（请求下一页数据） |
| `refresh` | - | 下拉刷新时触发（请求第一页数据） |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 普通模式下的列表项内容 |
| `item` | 虚拟滚动模式的单条渲染插槽，提供 `{ item, index }` |

## 🎨 使用示例

::: details 💡 与 usePagination 组合使用
```vue
<template>
  <C_List
    :loading="pagination.loading.value"
    :finished="pagination.finished.value"
    :show-empty="!pagination.list.value.length && !pagination.loading.value"
    empty-text="暂无工单"
    @load="pagination.loadMore"
    @refresh="pagination.refresh"
  >
    <C_Card
      v-for="item in pagination.list.value"
      :key="item.id"
      :title="item.title"
      :subtitle="item.createTime"
      clickable
      @click="router.push(`/detail/${item.id}`)"
    >
      <C_Tag :type="item.statusType">{{ item.statusText }}</C_Tag>
    </C_Card>
  </C_List>
</template>

<script setup lang="ts">
const pagination = usePagination(
  (page, size) => getWorkOrderList({ page, size }),
  { pageSize: 20 }
)
</script>
:::

::: details 💡 虚拟滚动大列表（万级数据）
```vue
<template>
  <C_List
    virtual
    :items="bigList"
    :item-height="64"
    :finished="true"
    :show-empty="!bigList.length"
  >
    <template #item="{ item }">
      <view class="flex items-center h-16 px-4 border-b border-gray-100">
        <text>{{ item.name }}</text>
      </view>
    </template>
  </C_List>
</template>
:::
