---
outline: 'deep'
---

# C_Progress

> 在 `ElementPlus` 基础上进行了简单封装了过渡动画，在原组件的基础上扩展了一些属性。

## Usage

`<C_Progress :percentage="60"/>`

### Props

| 属性        | 类型      | 默认值 | 说明                 |
| ----------- | --------- | ------ | -------------------- |
| percentage  | `number`  | 0      | 进度条进度(百分比)   |
| isAnimation | `boolean` | false  | 进度条是否有动画效果 |
| time        | `number`  | 3000   | 动画时长(毫秒)       |

### Interface

```ts
interface Props {
  percentage: number // 进度条进度 - 百分比
  isAnimation?: boolean // 进度条是否有动画效果
  time?: number // 动画时长(毫秒)
}

const props = withDefaults(defineProps<Props>(), {
  percentage: 0,
  isAnimation: false,
  time: 3000,
})
```

## Scene

进度条组件的简单使用，常用于加载，上传下载，需要过渡状态可视化的情况下。

### 用栗

```vue
<template>
  <C_Progress :percentage="60" isAnimation :time="3000" />
  <C_Progress
    :percentage="80"
    :isAnimation="true"
    :text-inside="true"
    :stroke-width="24"
    status="success"
  />
  <C_Progress type="circle" :percentage="70" isAnimation />
</template>
```

其他更多交互形式以及使用场景可以参考 `ElementPlus` 进度条组件：[ElProgress](http://element-plus.org/zh-CN/component/progress.html)
