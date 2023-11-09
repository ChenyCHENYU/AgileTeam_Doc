---
outline: 'deep'
---

# C_Table

> 这个组件一般配合 `C_Table` 进行使用，用来处理列表内容的检索。

## Usage

`<C_FormSearch />`

### Props

| 属性                      | 类型           | 默认值 | 说明                   |
| ------------------------- | -------------- | ------ | ---------------------- |
| formItemList              | `I_FormItem[]` | []     | 检索区的表单项         |
| formParams                | `I_Object`     | -      | 要检索的参数           |
| formSearchInputHistoryNum | `string`       | -      | 检索的内容是否需要缓存 |

### Interface

```ts
interface Props {
  formItemList: I_FormItem[]
  formParams: I_Object
  formSearchInputHistoryNum?: string
}

const props = withDefaults(defineProps<Props>(), {
  formItemList: () => [],
})
```

### Events

注意，这里主要是内嵌的 `Upload` 组件暴露的方法。

| 事件名              | 说明                         | 回调参数 |
| ------------------- | ---------------------------- | -------- |
| e_changeParms       | 检索的内容发生变化           | -        |
| e_dispatchGetDataFn | 调用接口获取检索过滤后的数据 | -        |

## Scene

有时候，需要对有效检索的内容进行缓存，方便选用，参考 `C_Table` 示栗的组合使用 [Table](./table.md#示栗)。
