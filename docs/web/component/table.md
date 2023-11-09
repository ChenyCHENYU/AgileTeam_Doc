---
outline: 'deep'
---

# 基础表格 C_BaseTable | 高级表格 C_Table

> 在 `ElementPlus` 提供的表格 `Table` 组件基础上，封装了关于表格的通用使用，同时把 `FormSearch` 组件融入其中，以满足业务表单数据驱动。

在后台管理系统中，各种表格的交互场景，甚至可以说 60% 以上是表格表单的场景，为了方便，将表格做了两种态势的封装，方便大家使用，建议熟悉并掌握 `C_Table` 高级表格的使用。

## C_BseTable

基础表格将 `C_BaseTalbe` 和 `C_FormSearch` 组件拆开，按照实际的需要组合使用，通过给组件绑定对应的 `props` 和 `emits` 来完成数据的交互，`C_BaseTable` 和 `C_FormSearch` 的使用可以参考示栗。

### Usage

`<C_BaseTable />`

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

| 事件名                 | 说明                      | 回调参数     |
| ---------------------- | ------------------------- | ------------ |
| e_handlePageSizeChange | `page-size` 改变时触发    | `新当前页`   |
| e_handlePageChange     | `current-page `改变时触发 | `新每页条数` |

## Scene

下面是一个包含了 `C_FromSeach` 组件的表格业务组件，[FormSearch](./form-search.md) 参考，若单纯使用 `C_Table` 可以不引用它，根据实际的业务场景进行选用。

### 示栗

```vue{52}
<template>
  <C_FormSearch
    :formParams="FORM_PARAMS"
    :formItemList="FORM_ITEM_LIST"
    @e_dispatchGetDataFn="e_dispatchGetDataFn"
    formSearchInputHistoryNum="testHistoryInput"
  />

  <C_BaseTable
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


const e_handlePageSizeChange = (pageSizeVal) => {
  pageSize.value = pageSizeVal
  getDataFn()
}
const e_handlePageChange = (pageVal) => {
  page.value = pageVal
  getDataFn()
}

const getDataFn = async () => {
   // 这是示栗用来模拟 mock 请求
  const res = await axios.post('/api/list', {
    pageNum: page.value,
    pageSzie: pageSize.value,
  })
  // 注意这里获取的后台数据传递给 data.tsx 中的 COLUMNS 函数
  // ... 这里忽略请求接口的边界处理，实际场景需要编写
  tableData.value = res.data
  columns.value = COLUMNS(tableData)
}

onMounted(() => getDataFn())
</script>
```

## C_Table

严格意义来说，`C_Table` 是基于 `C_TableBase` 的增强版，做了一定程度的整合和扩展，并且将一些复用的 `API` 进行了内部包装，方便视图页面用最少的代码去实现业务逻辑，不用额外的去写很多结构化代码，比如增加了默认配置的单元格、行内动态编辑、删除、详情配置，通过配置自动生成，并且支持同步自定义这些功能，使用更方便、更简单。

### Usage

`<C_Table />`

### Props

| 属性         | 类型                                     | 默认值                  | 说明                   |
| ------------ | ---------------------------------------- | ----------------------- | ---------------------- |
| title        | `string`                                 | -                       | 表格卡片标题           |
| columns      | `I_TableColumns[]`                       | []                      | 要渲染的列表项         |
| pageSizes    | `number[]`                               | [10, 50, 100, 150, 200] | 页码区间               |
| isShowPage   | `boolean`                                | true                    | 是否显示分页           |
| pageAlign    | `'left' \| 'center' \| 'right'`          | 'right'                 | 分页的排列方式         |
| shadow       | `'always' \| 'hover' \| 'never'`         | 'hover'                 | 卡片阴影样式           |
| getTableData | `(params: I_FormParams) => Promise<any>` | -                       | 获取数据调用的异步方法 |
| formParams   | `I_FormParams`                           | -                       | 表格检索区域项         |
| formSearc... | `string`                                 | 'testInputHistory'      | 需要缓存的自定义字符串 |

### Interface

```ts
interface Props {
  title?: string
  // 表格项
  columns: I_TableColumns[]
  // 分页器页码区间
  pageSizes?: number[]
  // 是否显示分页
  isShowPage?: boolean
  // 分页的排列方式
  pageAlign?: 'left' | 'center' | 'right'
  // 卡片阴影样式
  shadow?: 'always' | 'hover' | 'never'
  // Table 组件获取数据调用的异步方法
  getTableData: (params: I_FormParams) => Promise<any>
  // FormSearch 检索区域的检索参数
  formParams?: I_FormParams
  // 表格检索区域项
  formItemList?: I_FormItem[]
  // 需要缓存的自定义字符串
  formSearchInputHistoryString?: string
}

const props = withDefaults(defineProps<Props>(), {
  pageSizes: () => [10, 50, 100, 150, 200],
  isShowPage: true,
  pageAlign: 'right',
  shadow: 'hover',
  formSearchInputHistoryString: 'testInputHistory',
})
```

### Events

如果页面组件的 `data.tex` 需要拿到接口获得数据触发这个方法，否则不需要触发它。

| 事件名          | 说明           | 回调参数    |
| --------------- | -------------- | ----------- |
| e_sendTableData | 获取数据时触发 | `tableData` |

## Scene

使用它最好的场景是，列表需要一系列综合功能，常规的增删改查，增删改查不用刻意去写，配置即可，侧重点主要放在其他页面交互场景上面，并且需要一些如刷新、打印、筛选列、折叠检索等功能的综合表格。

```vue{4-8,11-15}
// .vue 视图页
<template>
  <C_Table
    :formParams="FORM_PARAMS"    // 检索项参数
    :formItemList="FORM_ITEM_LIST" // 检索项要渲染项
    :columns="COLUMNS(tableData)"  // data.tsx 中需要使用 tableData 列表数据
    :getTableData="getTableData"  // tableData 源数据的接口，定义在 api 目录下的方法名
    @e_sendTableData="e_sendTableData"  // 获取最新的数据
  >
    <!-- 如果要使用详情模态框数据的话 -->
    <template #dialog="{ detailData }">    // 使用这个插槽是因为配置了详情弹出层
      这里，我将个性化编写我 dialog 要渲染的 DOM 节点，下面是后台返回的数据源
      <br />
      {{ detailData }}
    </template>
  </C_Table>
</template>

<script lang="ts" setup>
import { getTableData } from '@/api/demo'
import { COLUMNS, FORM_ITEM_LIST, FORM_PARAMS } from './data'

const tableData = ref()
const e_sendTableData = (data) => (tableData.value = data.value)
</script>
```

```tsx{5-6,100,124,129-132}
// data.tsx 数据页
import './index.scss'
import type { I_RenderParams, I_TableColumns } from '@/components/C_Table/types'
import type { I_FormItem } from '_c/C_FormSearch/types'
import { HTML_LINE_EDIT } from '_c/C_Table/useEffect'   // 引入动态单元格编辑
import { getDetail, deleteDataRow } from '@/api/demo' // 引入详情接口和删除接口

export const FORM_ITEM_LIST: I_FormItem[] = [
  {
    type: 'input',
    prop: 'name',
    placeholder: '请输入检索信息',
    isFocus: false,    // 这里配置的是某个检索区域需要数据缓存
    hisList: ['11111111', '2222222', '33333333'],  // 配合isFocus 使用
  },
  {
    type: 'select',
    prop: 'type',
    placeholder: '请选择车辆类型',
    list: [
      {
        labelDefault: 'one',
        value: 1,
      },
      {
        labelDefault: 'two',
        value: 2,
      },
      {
        labelDefault: 'three',
        value: 3,
      },
    ],
  },

  {
    type: 'date-range',
    prop: 'range',
  },

  {
    type: 'input',
    prop: 'test',
    placeholder: '请输入检索信息',
  },

  {
    type: 'input',
    prop: 'test',
    placeholder: '请输入检索信息',
    show: false,
  },
  {
    type: 'input',
    prop: 'test123',
    placeholder: '请输入检索信息',
    show: false,
  },
  {
    type: 'input',
    prop: 'test456',
    placeholder: '请输入检索信息',
    show: false,
  },
]

// TODO: 检索参数

export const FORM_PARAMS = {
  name: undefined,
  type: undefined,
  range: undefined,
}

// TODO: 要渲染的列表项
export const COLUMNS = (tableData?: any): I_TableColumns[] => {
  return [
    {
      type: 'index',
      label: '序号',
      width: 60,
    },
    {
      type: 'selection',
      label: '',
      width: 60,
    },
    {
      type: 'expand',
      label: '子级',
      width: 60,
    },
    {
      //表头
      label: '日期',
      print: 'date',
      // 对齐方式
      // TODO: 这里需要注意，响应式数据，必须传递对应的row，不能是具体的值
      render: (params: I_RenderParams) =>
        HTML_LINE_EDIT(params, 'date', tableData),  // 这列数据，需要单元格编辑
    },
    {
      label: '姓名',
      print: 'name',
      render: ({ row }: any) => (
        <div>
          <el-popover
            v-slots={{ reference: () => <el-tag>{row.name}</el-tag> }}
            effect="light"
            trigger="hover"
            placement="top"
            width="auto"
          >
            <div>name: {row.name}</div>
            <div>address: {row.address}</div>
          </el-popover>
        </div>
      ),
    },
    {
      label: '地址',
      print: 'address',
      render: (params: I_RenderParams) =>
        HTML_LINE_EDIT(params, 'address', tableData),  // 这列数据，需要单元格编辑
    },
    {
      label: '操作',
      actionBtns: {
        lineEdit: 'patchLineFn',   // 未写编辑接口，暂字符串占位，可以忽略
        delete: deleteDataRow, // 配置了删除按钮，调用删除接口
        detail: getDetail, // 配置了详情按钮，调用详情接口
      },
      render: ({ row, index }: any) => (
        <div>
          <div>
            <el-button size="small">
              <el-icon-more />
            </el-button>
          </div>
        </div>
      ),
    },
  ]
}
```

这样，一个带有可以缓存的检索区，列表增删改查、动态单元格、行内编辑，同时支持列表筛选、打印的综合表格就出来哈，`data.tsx` 是要渲染的数据层，可以根据自己的业务场景作为参考哦，然后可以看到，这样一个复杂的综合表格，业务代码`.vue` 加上 `data,tsx`数据页面，总共不到 200 行哦，样式？不需要额外定制的话，不需要写了哦。

其他更多交互形式以及使用场景可以参考 `ElementPlus` 表单组件和上传组件：[ElTable](http://element-plus.org/zh-CN/component/table.html) ，更多属性传递可通过原组件的 `attrs` 进行使用。
