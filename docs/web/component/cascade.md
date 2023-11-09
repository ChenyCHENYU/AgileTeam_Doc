---
outline: 'deep'
---

# C_Cascade

> 区分于 `ElementPlus` 提供的级联交互形式，扩展封装了传统三级省市区形式的级联选择器。

## Usage

`<C_Cascade sourceData="sourceData name"/>`

### Props

| 属性       | 类型    | 默认值 | 说明   |
| ---------- | ------- | ------ | ------ |
| sourceData | `Array` | []     | 数据源 |

### Interface

```ts
// TODO: 源数据接口类型
interface I_AreaItem {
  name: string
  code: string
  children?: I_AreaItem[]
}

// TODO: 传递的数据接口类型
interface I_AreaData {
  name: string
  code: string
}

interface Props {
  sourceData: I_AreaItem[]
}

const props = withDefaults(defineProps<Props>(), {
  sourceData: () => [],
})
```

### Events

| 事件名       | 说明                 | 回调参数   |
| ------------ | -------------------- | ---------- |
| e_changeArae | 选择级联后获取的数据 | `areaData` |

## Scene

该组件使用场景，一般常用于省市区级联。

### 示栗

```vue{2,7}
<template>
  <C_Cascade :sourceData="allAreas" @e_changeArae="e_changeArae" />
</template>

<script lang="ts" setup>
import allAreas from '_c/lib/pca-code.json' // 省市区数据源
const e_changeArae = (areaData) => console.log('areaData ===>', areaData)
</script>
```

其他更多交互形式以及使用场景可以参考 `ElementPlus` 级联选择器：[ElCascade](http://element-plus.org/zh-CN/component/cascader.html#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95)，更多属性传递可通过原组件的 `attrs` 进行使用。
