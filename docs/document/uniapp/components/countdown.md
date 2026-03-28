---
outline: "deep"
---

# C_CountDown 倒计时

> ⏳ 高精度倒计时组件，支持毫秒级渲染、自定义格式模板和手动控制（开始/暂停/重置），提供 slot 自定义展示 UI。

## ✨ 特性

- **⚡ 毫秒级**：`millisecond` 开启高帧率计时（`SS` 格式变量）
- **🎨 自定义格式**：`DD:HH:mm:ss:SS` 任意拼接，多余变量自动补零隐藏
- **🔧 手动控制**：通过模板引用调用 `start()` / `pause()` / `reset()`
- **🎁 插槽渲染**：插槽提供 `{ time, text }` 可完全自定义倒计时 UI

## 🎯 快速开始

```vue
<template>
  <!-- 默认文字展示 -->
  <C_CountDown :time="5 * 60 * 1000" format="mm:ss" />

  <!-- 自定义 UI -->
  <C_CountDown :time="deadline" format="HH:mm:ss">
    <template #default="{ time }">
      <view class="flex gap-2">
        <C_Tag type="warning">{{ time.hours }}时</C_Tag>
        <C_Tag type="warning">{{ time.minutes }}分</C_Tag>
        <C_Tag type="error">{{ time.seconds }}秒</C_Tag>
      </view>
    </template>
  </C_CountDown>
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `time` | `number` | `0` | 倒计时总时长（毫秒） |
| `format` | `string` | `'HH:mm:ss'` | 格式化模板（见下表） |
| `autoStart` | `boolean` | `true` | 是否自动开始 |
| `millisecond` | `boolean` | `false` | 是否开启毫秒级渲染 |

### 格式化变量

| 变量 | 说明 |
| --- | --- |
| `DD` | 天数 |
| `HH` | 小时（两位补零） |
| `mm` | 分钟（两位补零） |
| `ss` | 秒（两位补零） |
| `SS` | 毫秒（两位补零，需开启 `millisecond`） |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `finish` | - | 倒计时结束时触发 |
| `change` | `TimeData` | 每次计时更新时触发 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 自定义展示，提供 `{ time: TimeData, text: string }` |

### TimeData 类型

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `days` | `number` | 剩余天数 |
| `hours` | `number` | 剩余小时 |
| `minutes` | `number` | 剩余分钟 |
| `seconds` | `number` | 剩余秒 |
| `milliseconds` | `number` | 剩余毫秒 |

### 实例方法（模板引用）

| 方法名 | 说明 |
| --- | --- |
| `start()` | 开始计时 |
| `pause()` | 暂停计时 |
| `reset()` | 重置为初始时长（若 autoStart=true 则同时开始） |

## 🎨 使用示例

::: details 💡 验证码发送倒计时（手动控制）
```vue
<template>
  <view class="flex gap-2">
    <wd-input v-model="code" placeholder="请输入验证码" />
    <wd-button
      v-if="!counting"
      @click="sendCode"
    >
      发送验证码
    </wd-button>
    <C_CountDown
      v-else
      ref="countDownRef"
      :time="60000"
      :auto-start="false"
      format="ss 秒后重发"
      @finish="counting = false"
    />
  </view>
</template>

<script setup lang="ts">
const counting = ref(false)
const countDownRef = ref()

async function sendCode() {
  await requestVerifyCode()
  counting.value = true
  await nextTick()
  countDownRef.value?.start()
}
</script>
:::

::: details 💡 秒杀活动结束倒计时
```vue
<template>
  <C_CountDown :time="saleEndTime - Date.now()" format="HH:mm:ss" @finish="onSaleEnd">
    <template #default="{ time }">
      <view class="flex items-center gap-1 text-red-500 font-bold">
        <text>{{ time.hours }}</text>
        <text>:</text>
        <text>{{ String(time.minutes).padStart(2, '0') }}</text>
        <text>:</text>
        <text>{{ String(time.seconds).padStart(2, '0') }}</text>
      </view>
    </template>
  </C_CountDown>
</template>
:::
