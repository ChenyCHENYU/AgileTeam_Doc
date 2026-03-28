---
outline: "deep"
---

# C_Tag 标签

> 🏷️ 轻量级状态/分类标签，内置 5 种语义色彩，支持朴素模式、圆角和关闭按钮，也可通过自定义颜色完全控制样式。

## ✨ 特性

- **🎨 5 种语义类型**：`primary` / `success` / `warning` / `error` / `info`
- **🔲 朴素模式**：浅色背景 + 彩色文字边框，低调不抢眼
- **💊 圆角形状**：`round` 属性切换为胶囊形
- **❌ 可关闭**：`closeable` 开启关闭按钮，点击触发 `close` 事件并自动隐藏
- **🖌️ 自定义颜色**：传入任意十六进制颜色，自动生成配套背景和边框

## 🎯 快速开始

```vue
<template>
  <C_Tag type="success">已完成</C_Tag>
  <C_Tag type="warning" plain>进行中</C_Tag>
  <C_Tag type="error" round closeable @close="onClose">异常</C_Tag>
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `text` | `string` | `''` | 标签文本（也可用默认插槽） |
| `type` | `'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | 语义类型 |
| `plain` | `boolean` | `false` | 朴素模式（浅色背景） |
| `round` | `boolean` | `false` | 圆角胶囊形 |
| `closeable` | `boolean` | `false` | 显示关闭按钮 |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 尺寸 |
| `color` | `string` | `''` | 自定义颜色（十六进制，优先于 type） |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `close` | - | 点击关闭按钮时触发（标签同时隐藏） |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 自定义标签内容（替代 text prop） |

## 🎨 使用示例

::: details 💡 工单状态标签映射
```vue
<template>
  <C_Tag :type="statusType(order.status)" plain>
    {{ order.statusText }}
  </C_Tag>
</template>

<script setup lang="ts">
function statusType(status: string) {
  const map: Record<string, string> = {
    pending:  'warning',
    doing:    'primary',
    done:     'success',
    rejected: 'error',
  }
  return map[status] ?? 'info'
}
</script>
:::

::: details 💡 动态标签组（可删除）
```vue
<template>
  <view class="flex flex-wrap gap-2">
    <C_Tag
      v-for="(label, i) in labels"
      :key="i"
      type="primary"
      plain
      round
      closeable
      @close="labels.splice(i, 1)"
    >
      {{ label }}
    </C_Tag>
  </view>
</template>

<script setup lang="ts">
const labels = ref(['标签A', '标签B', '标签C'])
</script>
:::
