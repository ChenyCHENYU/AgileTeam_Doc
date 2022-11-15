---
outline: 'deep'
---

# C_Notice

> 全局通知组件，用于接收一些 Scoket 信息， 有通知、关注、代办事项。

## Usage

`<C_Notice />`

### Props

| 属性  | 类型               | 默认值       | 说明           |
| ----- | ------------------ | ------------ | -------------- |
| icon  | `string`           | 'ElIconBell' | 显示的图标     |
| value | `string \| number` | ''           | 通知的数量     |
| max   | `number`           | -            | 通知数量最大值 |
| isDot | `string`           | false        | 是否显示小圆点 |

### Interface

```ts
interface Props {
  icon?: string //显示的图标
  value?: number | string // 通知的数量
  max?: number // 通知数量最大值
  isDot?: boolean // 是否显示小圆点
}

withDefaults(defineProps<Props>(), {
  icon: 'ElIconBell',
  value: '',
  isDot: false,
})
```

### Events

| 事件名        | 说明                 | 回调参数           |
| ------------- | -------------------- | ------------------ |
| e_clickItem   | 点击当前的通知项触发 | `{index, item:{}}` |
| e_clickAction | 点击当前的操作项触发 | `{index, item:{}}` |

## Scene

一般情况下，此类通知组件，基本在应用中顶层使用，且只使用一次，当然，也可以多路复用，其中的 `List` 组件根据业务需要自行调整即可。

### 示栗

```vue{2-11,14,16-17}
<template>
  <C_Notice value="12">
    <template #default>
      <C_List
        @e_clickItem="e_clickItem"
        @e_clickAction="e_clickAction"
        :LIST="LIST"
        :ACTIONS="ACTIONS"
      />
    </template>
  </C_Notice>
</template>
<script lang="ts" setup>
import { ACTIONS, LIST } from './data'

const e_clickItem = (val) => console.log(val)
const e_clickAction = (val) => console.log(val)
</script>
```
