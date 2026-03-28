---
outline: "deep"
---

# C_IndexList 索引列表

> 📑 右侧索引栏快速定位列表，适合联系人、城市选择、地址簿等大量分组数据场景，右侧字母索引触摸可快速跳转。

## ✨ 特性

- **🔡 右侧索引栏**：触摸、滑动快速定位对应分组
- **📌 分组标题吸顶**：`sticky` 模式组标题滚动时固定在顶部
- **💡 触摸提示**：拖动时中央显示当前字母气泡浮层
- **🗂️ 灵活分槽**：通过插槽自定义每个分组内的条目渲染

## 🎯 快速开始

```vue
<template>
  <C_IndexList :data="contacts" sticky>
    <template #default="{ items }">
      <view
        v-for="contact in items"
        :key="contact.id"
        class="flex items-center gap-3 p-3"
      >
        <image class="w-10 h-10 rounded-full" :src="contact.avatar" />
        <text>{{ contact.name }}</text>
      </view>
    </template>
  </C_IndexList>
</template>

<script setup lang="ts">
// 数据必须按 indexKey 分组
const contacts = [
  { key: 'A', items: [{ id: 1, name: '阿宝', avatar: '...' }] },
  { key: 'B', items: [{ id: 2, name: '冰冰', avatar: '...' }] },
  { key: 'C', items: [{ id: 3, name: '陈明', avatar: '...' }] },
]
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `IndexGroup[]` | `[]` | 分组数据数组 |
| `indexKey` | `string` | `'key'` | 分组标识字段名 |
| `sticky` | `boolean` | `true` | 是否开启分组标题吸顶 |
| `activeColor` | `string` | `'#007AFF'` | 侧边栏高亮颜色 |

### IndexGroup 类型

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | :---: | --- |
| `[indexKey]` | `string` | ✅ | 分组标识（如 `'A'`、`'2025-01'`） |
| `items` | `any[]` | ✅ | 分组内的数据列表 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `select` | `string` | 点击侧边栏字母时触发，传入当前 indexKey |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 单个分组内容，提供 `{ group, items }` |

## 🎨 使用示例

::: details 💡 城市选择器
```vue
<template>
  <C_IndexList :data="cityGroups" @select="onIndexSelect">
    <template #default="{ items }">
      <view
        v-for="city in items"
        :key="city.code"
        class="px-4 py-3 border-b border-gray-100"
        @click="selectCity(city)"
      >
        {{ city.name }}
      </view>
    </template>
  </C_IndexList>
</template>

<script setup lang="ts">
const cityGroups = computed(() => {
  const grouped: Record<string, any[]> = {}
  cities.value.forEach(city => {
    const letter = city.pinyin[0].toUpperCase()
    if (!grouped[letter]) grouped[letter] = []
    grouped[letter].push(city)
  })
  return Object.keys(grouped).sort().map(k => ({ key: k, items: grouped[k] }))
})
</script>
:::
