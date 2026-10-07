---
outline: "deep"
description: "🚪 退出登录过渡组件，全屏遮罩显示「正在退出登录...」，衔接清缓存与跳转的等待间隙"
---

# C_LogoutTransition 退出过渡

> 🚪 退出登录时的全屏过渡遮罩，避免清缓存期间白屏或误操作

## ✨ 特性

- **🖥 全屏遮罩**: 退出期间阻断交互，防止重复点击
- **🎛 可见性受控**: `visible` 由退出流程控制
- **✏️ 文案可配**: 默认「正在退出登录...」

## 🎯 基础用法

```vue
<template>
  <C_LogoutTransition :visible="loggingOut" text="正在退出登录..." />
</template>

<script setup>
import { ref } from 'vue'

const loggingOut = ref(false)

const onLogout = async () => {
  loggingOut.value = true
  await clearStorage()
  await redirectToLogin()
  loggingOut.value = false
}
</script>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | 是否显示过渡遮罩 |
| `text` | `string` | `'正在退出登录...'` | 提示文案 |
