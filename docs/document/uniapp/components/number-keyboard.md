---
outline: "deep"
---

# C_NumberKeyboard 数字键盘

> 🔢 自定义数字键盘弹层，适用于密码输入、金额输入等不调起系统键盘的场景，支持小数点、随机排列和自定义左下角按键。

## ✨ 特性

- **🔒 安全输入**：不调起系统键盘，防止第三方输入法截取
- **🎲 随机排列**：`randomOrder` 每次弹出时数字键位随机，增强安全性
- **💰 小数点**：`showDot` 支持金额类小数输入
- **🔧 自定义额外键**：左下角 `extraKey` 可配置任意字符（如 `+86`）

## 🎯 快速开始

```vue
<template>
  <view @click="keyboardVisible = true">
    <input :value="amount" readonly placeholder="请输入金额" />
  </view>

  <C_NumberKeyboard
    v-model="amount"
    v-model:visible="keyboardVisible"
    title="输入金额"
    show-dot
    :max-length="10"
    @done="onConfirm"
  />
</template>

<script setup lang="ts">
const keyboardVisible = ref(false)
const amount = ref('')

function onConfirm(val: string) {
  console.log('确认金额：', val)
}
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | 是否显示（v-model:visible） |
| `modelValue` | `string` | `''` | 当前输入值（v-model） |
| `title` | `string` | `''` | 键盘顶部标题（空则不显示标题栏） |
| `maxLength` | `number` | `20` | 最大输入长度 |
| `showDot` | `boolean` | `false` | 是否显示小数点 |
| `randomOrder` | `boolean` | `false` | 数字是否随机排列 |
| `extraKey` | `string` | `''` | 左下角自定义按键文本 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:visible` | `boolean` | v-model:visible 更新 |
| `update:modelValue` | `string` | v-model 更新 |
| `input` | `string` | 每次按键输入时触发（新值） |
| `delete` | `string` | 点击删除键时触发（新值） |
| `done` | `string` | 点击完成时触发（最终值） |

## 🎨 使用示例

::: details 💡 支付密码输入框（随机键盘）
```vue
<template>
  <view class="pay-input" @click="kbVisible = true">
    <view
      v-for="i in 6"
      :key="i"
      class="pay-input__dot"
      :class="{ filled: pwd.length >= i }"
    />
  </view>

  <C_NumberKeyboard
    v-model="pwd"
    v-model:visible="kbVisible"
    title="请输入支付密码"
    :max-length="6"
    random-order
    @done="onPayDone"
  />
</template>

<script setup lang="ts">
const pwd = ref('')
const kbVisible = ref(false)

watch(() => pwd.value.length, len => {
  if (len === 6) onPayDone(pwd.value)
})
</script>
:::
