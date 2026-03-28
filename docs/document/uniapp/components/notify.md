---
outline: "deep"
---

# C_Notify 通知条

> 📢 顶部/底部弹出的轻量通知条，自动倒计时消失，支持 4 种语义类型和手势滑动关闭。

## ✨ 特性

- **⏱️ 自动消失**：`duration` ms 后自动隐藏（设 `0` 则常驻）
- **🎨 4 种语义**：`primary` / `success` / `warning` / `error` 自动配色
- **👆 手势关闭**：`swipeable` 开启后可向上/下滑动关闭
- **📍 双向位置**：`top`（顶部）和 `bottom`（底部）

## 🎯 快速开始

```vue
<template>
  <C_Notify
    v-model:visible="notifyVisible"
    :message="notifyMsg"
    :type="notifyType"
    :duration="3000"
  />
</template>

<script setup lang="ts">
const notifyVisible = ref(false)
const notifyMsg = ref('')
const notifyType = ref('success')

// 封装便捷方法
function showNotify(msg: string, type = 'success') {
  notifyMsg.value = msg
  notifyType.value = type
  notifyVisible.value = true
}
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | 是否显示（v-model:visible） |
| `message` | `string` | `''` | 通知内容 |
| `type` | `'primary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | 语义类型 |
| `duration` | `number` | `3000` | 显示时长（ms），`0` 常驻不自动关闭 |
| `position` | `'top' \| 'bottom'` | `'top'` | 通知位置 |
| `background` | `string` | `''` | 自定义背景颜色（覆盖 type） |
| `color` | `string` | `''` | 自定义文字颜色（覆盖 type） |
| `swipeable` | `boolean` | `true` | 是否可手势滑动关闭 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:visible` | `boolean` | v-model:visible 更新 |
| `close` | - | 通知关闭时触发 |

## 🎨 使用示例

::: details 💡 操作结果反馈（与 API 结合）
```vue
<template>
  <C_Notify v-model:visible="nv" :message="nm" :type="nt" />
</template>

<script setup lang="ts">
const nv = ref(false)
const nm = ref('')
const nt = ref<'success' | 'error'>('success')

async function handleSubmit() {
  try {
    await submitApi(form)
    nm.value = '提交成功！'
    nt.value = 'success'
  } catch {
    nm.value = '提交失败，请重试'
    nt.value = 'error'
  } finally {
    nv.value = true
  }
}
</script>
:::
