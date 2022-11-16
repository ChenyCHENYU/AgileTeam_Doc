---
outline: 'deep'
---

# C_Table

> 在 `ElementPlus` 提供的表格组件基础上，封装了关于表格的通用使用，同时把 `FormSearch` 组件融入其中，以满足业务表单数据驱动。

## Usage

`<C_Table />`

### Props

| 属性       | 类型                            | 默认值                  | 说明           |
| ---------- | ------------------------------- | ----------------------- | -------------- |
| title      | `string`                        | -                       | 表格卡片标题   |
| columns    | `I_TableColumns[]`              | []                      | 要渲染的列表项 |
| tableData  | `any[]`                         | -                       | 表格数据源     |
| page       | `number`                        | 1                       | 页码           |
| pageSizes  | `number[]`                      | [10, 50, 100, 150, 200] | 页码区间       |
| pageSize   | `number`                        | 10                      | 当前条数       |
| total      | `number`                        | -                       | 总条数         |
| isShowPage | `boolean`                       | true                    | 是否显示分页   |
| pageAlign  | `'left' \| 'center' \| 'right'` | 'right'                 | 分页的排列方式 |

### Interface

```ts
interface Props {
  title?: string
  columns: I_TableColumns[]
  tableData: any[]
  page: number
  pageSizes?: number[]
  pageSize: number
  total: number
  isShowPage?: boolean
  pageAlign?: 'left' | 'center' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  page: 1,
  pageSizes: () => [10, 50, 100, 150, 200],
  pageSize: 10,
  isShowPage: true,
  pageAlign: 'right',
})
```

### Events

注意，这里主要是内嵌的 `Upload` 组件暴露的方法。

| 事件名                 | 说明                      | 回调参数     |
| ---------------------- | ------------------------- | ------------ |
| e_handlePageSizeChange | `page-size` 改变时触发    | `新当前页`   |
| e_handlePageChange     | `current-page `改变时触发 | `新每页条数` |

## Scene

下面是一个包含了 `C_FromSeach` 组件的表格业务组件，[FormSearch](./form-search.md) 参考，若单纯使用 `C_Table` 可以葫芦它，根据实际的业务场景进行选用。

### 示栗

```vue
<template>
  <C_FormSearch
    :formParams="FORM_PARAMS"
    :formItemList="FORM_ITEM_LIST"
    @e_dispatchGetDataFn="e_dispatchGetDataFn"
    formSearchInputHistoryNum="testHistoryInput"
  />

  <C_Table
    :tableData="tableData"
    :columns="columns"
    :page="page"
    :pageSize="pageSize"
    :total="total"
    @e_handlePageSizeChange="e_handlePageSizeChange"
    @e_handlePageChange="e_handlePageChange"
  />
</template>

<script lang="ts" setup>
import axios from 'axios'
import { COLUMNS, exposeTableData, FORM_ITEM_LIST, FORM_PARAMS } from './data'

const e_dispatchGetDataFn = () => {
  console.log('触发了父组件，父组件调用更新接口的数据 ')
}
const tableData = ref<any>([])
const columns = ref<any>([])

const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

const getAsyncTableData = async (asyData: any) => {
  tableData.value = await asyData
}

const e_handlePageSizeChange = (pageSizeVal) => {
  console.log('pageSizeVal ===>', pageSizeVal)
  pageSize.value = pageSizeVal
  getDataFn()
}
const e_handlePageChange = (pageVal) => {
  console.log('pageVal ===>', pageVal)
  page.value = pageVal
  getDataFn()
}

const getDataFn = async () => {
  const res = await axios.post('/api/list', {
    current: page.value,
    pageSzie: pageSize.value,
  })
  console.log('res ===>', res.data)
  columns.value = COLUMNS(res.data.data)
}

// 存放所有异步调用的方法
onMounted(() => {
  // 数据源如果从 data.tsx获取
  exposeTableData(getAsyncTableData)
  // mock 数据
  getDataFn()
})
</script>
```

其他更多交互形式以及使用场景可以参考 `ElementPlus` 表单组件和上传组件：[ElTable](http://element-plus.org/zh-CN/component/table.html) ，更多属性传递可通过原组件的 `attrs` 进行使用。
