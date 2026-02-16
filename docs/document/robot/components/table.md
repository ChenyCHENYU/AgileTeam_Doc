---
outline: 'deep'
---

# C_Table 超级表格组件

> 🚀 基于 Naive UI 的全能表格组件，「薄 UI 壳 + 厚 Composable 引擎」架构，让数据管理变得简单而强大

## ✨ 特性

- **🎯 5种编辑模式**: 支持行编辑（row）、单元格编辑（cell）、模态框编辑（modal）、混合模式（both）和只读模式（none）
- **📱 智能分页**: 内置分页功能，支持远程/本地分页、自定义分页配置和响应式展示
- **🔽 展开折叠**: 支持行展开和异步数据懒加载，完美处理层级数据和嵌套子表格
- **✅ 行选择**: 支持单选、多选、父子关联选择（strict/loose）、子表格选择
- **⚡ 动态行操作**: 内置添加、插入、删除、复制、上移、下移，配套打印/截图/水印
- **🎨 内置操作栏**: 自带详情、编辑、删除按钮（二元法则：`false` 禁用 / 函数即 API），支持自定义操作
- **🛡️ 表单验证**: 列级验证规则集成，模态框编辑自动生成 `C_Form` 表单
- **📊 打印导出**: 支持 Canvas/SVG 水印、打印预设（table/form/report）、截图下载
- **🔧 列设置面板**: 列搜索、可见性、拖拽排序、固定列、列宽调整、一键重置
- **🚀 CRUD 模式**: `useTableCrud` + `<C_Table :crud="table" />` 一行代码搞定 CRUD
- **💪 TypeScript**: 完整的泛型类型定义和类型安全
- **⚡ 高性能**: Composable 拆分的状态管理器，按需计算和渲染

## 📦 安装

::: code-group

```bash [bun (推荐)]
# 基于 Naive UI，确保已安装依赖
bun install naive-ui
```

```bash [pnpm]
# 基于 Naive UI，确保已安装依赖
pnpm install naive-ui
```

```bash [yarn]
# 基于 Naive UI，确保已安装依赖
yarn add naive-ui
```

```bash [npm]
# 基于 Naive UI，确保已安装依赖
npm install naive-ui
```

:::

## 🏗️ 架构概览

```
C_Table/index.vue ──── 薄 UI 壳（模板 + 事件桥接）
  │
  ├── useTableConfig     ← 配置解析（resolveConfig）
  ├── useTableManager    ← 统一状态管理器
  │    ├── useRowEdit    ← 行编辑
  │    ├── useCellEdit   ← 单元格编辑
  │    ├── useModalEdit  ← 模态框编辑
  │    ├── useTableExpand ← 展开 + 选择
  │    └── useDynamicRow  ← 动态行操作
  ├── useTableColumns    ← 列处理引擎
  ├── useTableActions    ← 操作按钮渲染
  ├── usePagination      ← 分页逻辑
  └── ColumnSettings     ← 列设置面板
```

## 🎯 快速开始

### CRUD 模式（推荐）

```vue {3-8}
<template>
  <!-- 一行搞定 CRUD -->
  <C_Table
    :crud="table"
    :config="{
      edit: { mode: 'modal', modalTitle: '编辑员工信息' },
    }"
  />
</template>

<script setup lang="ts">
  import { useTableCrud } from '@robot-admin/request-core'
  import type { UseTableCrudConfig } from '@robot-admin/request-core'

  interface Employee {
    id: number
    name: string
    age: number
    email: string
    department: string
  }

  const employeeConfig: UseTableCrudConfig<Employee> = {
    api: {
      list: '/employees/list',
      get: '/employees/:id',
      update: '/employees/:id',
      remove: '/employees/:id',
      create: '/employees',
    },
    columns: [
      {
        key: 'name',
        title: '姓名',
        editable: true,
        required: true,
        editType: 'input',
      },
      {
        key: 'age',
        title: '年龄',
        editable: true,
        editType: 'number',
        editProps: { min: 18, max: 65 },
      },
      { key: 'email', title: '邮箱', editable: true, editType: 'email' },
      {
        key: 'department',
        title: '部门',
        editable: true,
        editType: 'select',
        editProps: {
          options: [
            { label: '技术部', value: 'tech' },
            { label: '人事部', value: 'hr' },
          ],
        },
      },
    ],
    idKey: 'id',
    createNewRow: () => ({
      id: Date.now(),
      name: '',
      age: 25,
      email: '',
      department: 'tech',
    }),
  }

  const table = useTableCrud(employeeConfig)
</script>
```

### 手动模式

```vue {4-12}
<template>
  <C_Table
    :data="tableData"
    :columns="tableColumns"
    :loading="loading"
    :config="{
      edit: { mode: 'modal' },
      actions: { edit: handleEdit, delete: handleDelete, detail: handleDetail },
      pagination: { pageSize: 20 },
    }"
    @save="handleSave"
    @cancel="handleCancel"
  />
</template>

<script setup>
  const loading = ref(false)
  const tableData = ref([
    { id: 1, name: '张三', age: 28, email: 'zhangsan@example.com' },
    { id: 2, name: '李四', age: 32, email: 'lisi@example.com' },
  ])

  const tableColumns = [
    { key: 'name', title: '姓名', editable: true },
    { key: 'age', title: '年龄', editable: true, editType: 'number' },
    { key: 'email', title: '邮箱', editable: true, editType: 'email' },
  ]

  const handleSave = (rowData, rowIndex) => {
    console.log('保存数据:', rowData)
  }
  const handleCancel = (rowData, rowIndex) => {
    console.log('取消编辑')
  }
  const handleEdit = async row => {
    /* API 调用 */
  }
  const handleDelete = async row => {
    /* API 调用 */
  }
  const handleDetail = row => {
    /* 查看详情 */
  }
</script>
```

### 5种编辑模式

```vue {6-8}
<template>
  <div>
    <!-- 模式切换 -->
    <n-radio-group v-model:value="editMode">
      <n-radio-button value="row">行编辑</n-radio-button>
      <n-radio-button value="cell">单元格编辑</n-radio-button>
      <n-radio-button value="modal">模态框编辑</n-radio-button>
      <n-radio-button value="both">混合模式</n-radio-button>
      <n-radio-button value="none">只读模式</n-radio-button>
    </n-radio-group>

    <!-- 编辑模式实时切换 -->
    <C_Table
      :crud="table"
      :config="{
        edit: {
          mode: editMode,
          modalTitle: '编辑员工信息',
          modalWidth: 700,
        },
      }"
    />
  </div>
</template>

<script setup>
  const editMode = ref('modal')
  const table = useTableCrud(employeeConfig)
</script>
```

## 📖 API 文档

### Props（极简 API）

| 参数        | 类型                                   | 默认值            | 说明                                                    |
| ----------- | -------------------------------------- | ----------------- | ------------------------------------------------------- |
| **columns** | `TableColumn[]`                        | —                 | 列配置数组（crud 模式下可省略）                         |
| **data**    | `MaybeRefLike<DataRecord[]>`           | —                 | 数据源（支持跨 Vue 实例 Ref）                           |
| **loading** | `MaybeRefLike<boolean>`                | `false`           | 加载状态                                                |
| **rowKey**  | `(row: DataRecord) => DataTableRowKey` | `(row) => row.id` | 行唯一键函数                                            |
| **config**  | `TableConfig`                          | `{}`              | 统一功能配置对象                                        |
| **crud**    | `CrudBinding`                          | —                 | CRUD 绑定（传入 `useTableCrud()` 返回值，自动接管一切） |

### `config` 配置详解

```typescript
interface TableConfig<T extends DataRecord = DataRecord> {
  edit?: EditConfig | boolean // 编辑配置
  actions?: SimpleTableActions<T> // 操作按钮
  pagination?: PaginationConfig | boolean // 分页配置
  expand?: ExpandConfig<T> | boolean // 展开配置
  selection?: SelectionConfig<T> | boolean // 选择配置
  dynamicRows?: DynamicRowsOptions<T> | boolean // 动态行配置
  toolbar?: ToolbarConfig // 工具栏配置
  display?: DisplayConfig // 显示配置
}
```

#### EditConfig — 编辑配置

| 字段             | 类型                                             | 默认值       | 说明               |
| ---------------- | ------------------------------------------------ | ------------ | ------------------ |
| `enabled`        | `boolean`                                        | `true`       | 是否启用编辑       |
| `mode`           | `'row' \| 'cell' \| 'modal' \| 'both' \| 'none'` | `'modal'`    | 编辑模式           |
| `showRowActions` | `boolean`                                        | `true`       | 是否显示行操作按钮 |
| `modalTitle`     | `string`                                         | `'编辑数据'` | 模态框标题         |
| `modalWidth`     | `number`                                         | `600`        | 模态框宽度         |

#### SimpleTableActions — 操作配置（二元法则）

```typescript
interface SimpleTableActions<T> {
  edit?: false | ApiFunction<T> // false = 禁用，函数 = API
  delete?: false | ApiFunction<T> // false = 禁用，函数 = API
  detail?: false | ApiFunction<T> // false = 禁用，函数 = 查看
  custom?: CustomAction<T>[] // 自定义操作按钮
  render?: RenderFunction<T> // 完全自定义渲染
}
```

#### PaginationConfig — 分页配置

| 字段              | 类型                             | 默认值              | 说明             |
| ----------------- | -------------------------------- | ------------------- | ---------------- |
| `enabled`         | `boolean`                        | `true`              | 是否启用分页     |
| `page`            | `number`                         | `1`                 | 当前页码         |
| `pageSize`        | `number`                         | `10`                | 每页条数         |
| `showSizePicker`  | `boolean`                        | `true`              | 显示每页条数选择 |
| `showQuickJumper` | `boolean`                        | `true`              | 显示快速跳转     |
| `pageSizes`       | `number[]`                       | `[10, 20, 50, 100]` | 可选的每页条数   |
| `simple`          | `boolean`                        | `false`             | 简洁模式         |
| `size`            | `'small' \| 'medium' \| 'large'` | `'medium'`          | 分页器尺寸       |
| `remote`          | `boolean`                        | —                   | 远程分页模式     |

#### ExpandConfig — 展开配置

| 字段                  | 类型                                                        | 说明             |
| --------------------- | ----------------------------------------------------------- | ---------------- |
| `enabled`             | `boolean`                                                   | 是否启用展开     |
| `defaultExpandedKeys` | `DataTableRowKey[]`                                         | 默认展开的行     |
| `onLoadData`          | `(row: T) => Promise<any[]> \| any[]`                       | 异步加载展开数据 |
| `renderContent`       | `(row, expandData, loading, childSelection?) => VNodeChild` | 展开内容渲染     |
| `rowExpandable`       | `(row: T) => boolean`                                       | 行是否可展开     |

#### SelectionConfig — 选择配置

| 字段                               | 类型                               | 说明                  |
| ---------------------------------- | ---------------------------------- | --------------------- |
| `enabled`                          | `boolean`                          | 是否启用选择          |
| `defaultCheckedKeys`               | `DataTableRowKey[]`                | 默认选中的行          |
| `rowCheckable`                     | `(row: T) => boolean`              | 行是否可选            |
| `maxSelection`                     | `number`                           | 最大选择数量          |
| `childSelection.enabled`           | `boolean`                          | 是否启用子表格选择    |
| `childSelection.childRowCheckable` | `(childRow, parentRow) => boolean` | 子行是否可选          |
| `parentChildLink.enabled`          | `boolean`                          | 是否启用父子联动      |
| `parentChildLink.mode`             | `'strict' \| 'loose'`              | 联动模式（严格/宽松） |

#### DynamicRowsOptions — 动态行配置

| 字段                   | 类型                            | 默认值       | 说明             |
| ---------------------- | ------------------------------- | ------------ | ---------------- |
| `defaultRowData`       | `() => T`                       | `() => ({})` | 新行默认数据工厂 |
| `enableRadioSelection` | `boolean`                       | `true`       | 启用单选         |
| `enableAdd`            | `boolean`                       | `true`       | 启用添加行       |
| `enableInsert`         | `boolean`                       | `true`       | 启用插入行       |
| `enableDelete`         | `boolean`                       | `true`       | 启用删除行       |
| `enableCopy`           | `boolean`                       | `true`       | 启用复制行       |
| `enableMove`           | `boolean`                       | `true`       | 启用移动行       |
| `enablePrint`          | `boolean`                       | `true`       | 启用打印         |
| `confirmDelete`        | `boolean`                       | `true`       | 删除前确认       |
| `printOptions`         | `PrintWatermarkOptions`         | —            | 打印水印配置     |
| `printPreset`          | `'table' \| 'form' \| 'report'` | `'table'`    | 打印预设         |
| `onRowChange`          | `(data: T[]) => void`           | —            | 行数据变化回调   |
| `onSelectionChange`    | `(key, row) => void`            | —            | 选择变化回调     |
| `onRowAdd`             | `(newRow: T) => void`           | —            | 添加行回调       |
| `onRowDelete`          | `(row, index) => void`          | —            | 删除行回调       |
| `onRowCopy`            | `(original, copy) => void`      | —            | 复制行回调       |
| `onRowMove`            | `(row, from, to) => void`       | —            | 移动行回调       |

#### ToolbarConfig — 工具栏配置

| 字段             | 类型      | 默认值 | 说明               |
| ---------------- | --------- | ------ | ------------------ |
| `show`           | `boolean` | `true` | 是否显示工具栏     |
| `columnSettings` | `boolean` | `true` | 是否启用列设置齿轮 |

#### DisplayConfig — 显示配置

| 字段          | 类型                             | 默认值     | 说明         |
| ------------- | -------------------------------- | ---------- | ------------ |
| `striped`     | `boolean`                        | `true`     | 斑马纹       |
| `bordered`    | `boolean`                        | `true`     | 边框         |
| `singleLine`  | `boolean`                        | `true`     | 单行显示     |
| `size`        | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸         |
| `maxHeight`   | `number \| string`               | —          | 最大高度     |
| `scrollX`     | `number \| string`               | —          | 横向滚动宽度 |
| `columnWidth` | `number`                         | `180`      | 默认列宽     |

### Events

| 事件名                       | 参数                                           | 说明           |
| ---------------------------- | ---------------------------------------------- | -------------- |
| **save**                     | `(rowData, rowIndex, columnKey?)`              | 保存编辑时触发 |
| **cancel**                   | `(rowData, rowIndex)`                          | 取消编辑时触发 |
| **update:data**              | `(data: T[])`                                  | 数据更新时触发 |
| **row-add**                  | `(newRow)`                                     | 添加行时触发   |
| **row-delete**               | `(deletedRow, index)`                          | 删除行时触发   |
| **row-copy**                 | `(originalRow, newRow)`                        | 复制行时触发   |
| **row-move**                 | `(row, fromIndex, toIndex)`                    | 移动行时触发   |
| **row-selection-change**     | `(selectedKey, selectedRow)`                   | 动态行单选变化 |
| **selection-change**         | `(checkedKeys, checkedRows, childSelections?)` | 多选变化       |
| **child-selection-change**   | `(parentKey, childKeys, childRows)`            | 子选择变化     |
| **parent-child-link-change** | `(parentKey, shouldSelect)`                    | 父子联动变化   |
| **expand-change**            | `(expandedKeys, row?, expanded?)`              | 展开状态变化   |
| **pagination-change**        | `(page, pageSize)`                             | 分页变化       |
| **view-detail**              | `(data)`                                       | 查看详情       |
| **column-change**            | `(columns)`                                    | 列设置变更     |

### 暴露方法

| 方法名                 | 签名                              | 说明                     |
| ---------------------- | --------------------------------- | ------------------------ |
| **startEdit**          | `(rowKey, columnKey?) => void`    | 开始编辑指定行/单元格    |
| **expandAll**          | `() => Promise<void>`             | 展开所有行               |
| **collapseAll**        | `() => void`                      | 折叠所有行               |
| **selectAll**          | `() => void`                      | 全选                     |
| **clearSelection**     | `() => void`                      | 清除选择                 |
| **clearAllSelections** | `() => void`                      | 清除所有选择（含子选择） |
| **clearRowSelection**  | `() => void`                      | 清除动态行单选           |
| **resetToFirstPage**   | `() => void`                      | 重置到第一页             |
| **getSelectedRows**    | `() => T[]`                       | 获取选中行数据           |
| **getEditingData**     | `() => any`                       | 获取编辑中的数据         |
| **isEditing**          | `(rowKey, columnKey?) => boolean` | 判断是否正在编辑         |
| **isExpanded**         | `(rowKey) => boolean`             | 判断行是否展开           |
| **getManager**         | `() => StateManager`              | 获取底层状态管理器       |

### Slots

| 插槽名            | 说明                                   |
| ----------------- | -------------------------------------- |
| **toolbar-left**  | 工具栏左侧自定义内容                   |
| **toolbar-right** | 工具栏右侧自定义内容（列设置齿轮之前） |

::: details 🔧 类型定义 — 完整的 TypeScript 接口定义

#### 核心类型

```typescript
type DataRecord = Record<string, unknown>
type EditMode = 'row' | 'cell' | 'both' | 'modal' | 'none'
type EditType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'date'
  | 'number'
  | 'switch'
  | 'email'
  | 'mobile'
type MaybeRefLike<T> = { value: T } | T | MaybeRef<T>
```

#### 表格列配置

```typescript
// 联合类型：普通列 | 内置列
type TableColumn<T> = NormalTableColumn<T> | BuiltInTableColumn<T>

// 普通数据列
interface NormalTableColumn<T> extends BaseTableColumn<T> {
  key: keyof T | string
  title: string
}

// 内置列（选择列 / 展开列 / 序号列）
interface BuiltInTableColumn<T> extends BaseTableColumn<T> {
  type: 'selection' | 'expand' | 'index'
  renderExpand?: (rowData: T, rowIndex: number) => VNodeChild
}

// 列扩展属性
interface BaseTableColumn<T> {
  width?: number
  editable?: boolean // 是否可编辑
  required?: boolean // 是否必填
  editType?: EditType // 编辑控件类型
  editProps?: EditProps // 编辑控件属性
  editRender?: (value, rowData, rowIndex) => VNodeChild // 自定义编辑渲染
  render?: (rowData, rowIndex) => VNodeChild // 自定义显示渲染
  fixed?: 'left' | 'right' // 固定列
  resizable?: boolean // 列宽可拖拽
  minWidth?: number
  maxWidth?: number
  visible?: boolean // 列设置可见性
}
```

#### 编辑控件属性

```typescript
interface EditProps {
  min?: number
  max?: number
  step?: number
  showButton?: boolean
  type?: string
  rows?: number
  placeholder?: string
  options?: SelectOption[]
  rules?: FormItemRule[]
  format?: string
  valueFormat?: string
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
}
```

#### 自定义操作按钮

```typescript
interface CustomAction<T> {
  key: string
  label: string | ((row: T, index: number) => string)
  icon: string | ((row: T, index: number) => string)
  type?: ButtonType | ((row: T, index: number) => ButtonType)
  onClick: (row: T, index: number) => void | Promise<void>
  show?: (row: T, index: number) => boolean
  disabled?: (row: T, index: number) => boolean
  tooltip?: string
}
```

#### CRUD 绑定

```typescript
interface CrudBinding {
  data: Ref<any[]>
  loading: Ref<boolean>
  columns: ComputedRef<any[]>
  actions?: ComputedRef<any>
  pagination?: ComputedRef<any>
  tableRef?: Ref<any>
  save?: (...args: any[]) => any
  handleCancel?: () => any
  handlePaginationChange?: (page: number, pageSize: number) => void
  handleRowDelete?: (...args: any[]) => void
  detail?: { show: (...args: any[]) => void }
}
```

:::

## 🎨 使用示例

::: details 👥 员工管理表格 — CRUD + 5种编辑模式 + 自定义操作

```vue {8-14}
<template>
  <div class="table-demo-page">
    <!-- 编辑模式切换 -->
    <n-radio-group v-model:value="editMode">
      <n-radio-button
        v-for="mode in EDIT_MODES"
        :key="mode.value"
        :value="mode.value"
      >
        {{ mode.label }}
      </n-radio-button>
    </n-radio-group>

    <!-- 表格组件 -->
    <C_Table
      :crud="table"
      :config="{
        edit: {
          mode: editMode,
          modalTitle: '编辑员工信息',
          modalWidth: 700,
        },
      }"
    />
  </div>
</template>

<script setup lang="ts">
  import type { EditMode, DataRecord } from '@/types/modules/table'
  import { useTableCrud } from '@robot-admin/request-core'
  import type {
    UseTableCrudConfig,
    TableColumn,
  } from '@robot-admin/request-core'
  import { PRESET_RULES } from '@robot-admin/form-validate'

  interface Employee extends DataRecord {
    id: number
    name: string
    age: number
    gender: 'male' | 'female'
    email: string
    department: string
    status: string
  }

  const editMode = ref<EditMode>('modal')

  const EDIT_MODES = [
    { value: 'row', label: '行编辑' },
    { value: 'cell', label: '单元格编辑' },
    { value: 'both', label: '混合模式' },
    { value: 'modal', label: '模态框编辑' },
    { value: 'none', label: '只读模式' },
  ]

  const employeeConfig: UseTableCrudConfig<Employee> = {
    api: {
      list: '/employees/list',
      update: '/employees/:id',
      remove: '/employees/:id',
      create: '/employees',
    },
    columns: [
      {
        key: 'name',
        title: '姓名',
        width: 120,
        editable: true,
        required: true,
        editType: 'input',
        editProps: { rules: [PRESET_RULES.length('姓名', 2, 20)] },
      },
      {
        key: 'age',
        title: '年龄',
        width: 100,
        editable: true,
        editType: 'number',
        editProps: { min: 18, max: 65 },
      },
      {
        key: 'gender',
        title: '性别',
        width: 100,
        editable: true,
        editType: 'select',
        editProps: {
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
          ],
        },
        render: row => (row.gender === 'male' ? '男' : '女'),
      },
      {
        key: 'email',
        title: '邮箱',
        width: 200,
        editable: true,
        editType: 'email',
        editProps: { rules: [PRESET_RULES.email('邮箱')] },
      },
      {
        key: 'department',
        title: '部门',
        width: 120,
        editable: true,
        editType: 'select',
        editProps: {
          options: [
            { label: '技术部', value: 'tech' },
            { label: '人事部', value: 'hr' },
            { label: '市场部', value: 'market' },
          ],
        },
      },
    ],
    // 自定义操作按钮
    customActions: [
      {
        key: 'copy',
        label: '复制',
        icon: 'mdi:content-copy',
        type: 'default',
        handler: (row, ctx) => {
          const newRow = { ...row, id: Date.now(), name: `${row.name}_副本` }
          ctx.data.splice(ctx.index + 1, 0, newRow)
          ctx.message.success('复制成功')
        },
      },
      {
        key: 'authorize',
        label: '授权',
        icon: 'mdi:shield-key',
        type: 'warning',
        handler: (row, ctx) => {
          ctx.dialog.info({
            title: '员工授权',
            content: `正在为员工 "${row.name}" 配置系统权限...`,
            positiveText: '确定',
          })
        },
      },
    ],
    idKey: 'id',
    createNewRow: () => ({
      id: Date.now(),
      name: '',
      age: 25,
      gender: 'male',
      email: '',
      department: 'tech',
      status: 'probation',
    }),
  }

  const table = useTableCrud(employeeConfig)
</script>
```

:::

::: details 🔽 嵌套展开表格 — 父子选择联动 + 异步加载

```vue {4-15}
<template>
  <div>
    <!-- 工具栏 -->
    <C_ActionBar :actions="toolbarActions" />

    <!-- 展开表格 -->
    <C_Table
      ref="tableRef"
      :data="data"
      :columns="columns"
      :loading="loading"
      :config="tableConfig"
      @expand-change="handleExpandChange"
      @selection-change="handleSelectionChange"
    />
  </div>
</template>

<script setup>
  const tableRef = ref()
  const linkMode = ref('strict') // 'strict' | 'loose'

  const tableConfig = computed(() => ({
    expand: {
      enabled: true,
      onLoadData: async row => {
        // 异步加载子数据
        const res = await fetch(`/api/children/${row.id}`)
        return await res.json()
      },
      renderContent: (row, expandData, loading, childSelection) => {
        if (loading) return h('div', '加载中...')
        return h(CTable, {
          data: expandData,
          columns: childColumns,
          config: { selection: childSelection },
        })
      },
      rowExpandable: row => row.hasChildren,
    },
    selection: {
      enabled: true,
      childSelection: { enabled: true },
      parentChildLink: {
        enabled: true,
        mode: linkMode.value, // 'strict': 父子完全联动 / 'loose': 独立选择
      },
    },
  }))

  const toolbarActions = [
    {
      key: 'expandAll',
      label: '展开全部',
      onClick: () => tableRef.value?.expandAll(),
    },
    {
      key: 'collapseAll',
      label: '折叠全部',
      onClick: () => tableRef.value?.collapseAll(),
    },
    {
      key: 'selectAll',
      label: '全选',
      onClick: () => tableRef.value?.selectAll(),
    },
    {
      key: 'clearAll',
      label: '清空',
      onClick: () => tableRef.value?.clearAllSelections(),
    },
  ]
</script>
```

:::

::: details ⚡ 动态行操作 — 增删复制移动 + 打印水印

```vue {5-27}
<template>
  <C_Table
    :crud="table"
    :config="{
      dynamicRows: {
        enableRadioSelection: true,
        enableAdd: true,
        enableInsert: true,
        enableDelete: true,
        enableCopy: true,
        enableMove: true,
        enablePrint: true,
        confirmDelete: true,
        defaultRowData: createDefaultEmployee,
        printOptions: {
          text: '内部机密',
          color: 'rgba(0,0,0,0.1)',
          fontSize: 20,
          angle: -30,
          type: 'canvas',
        },
        printPreset: 'table',
        onRowAdd: row => addLog('新增', row.name),
        onRowDelete: row => addLog('删除', row.name),
        onRowCopy: (orig, copy) => addLog('复制', orig.name),
        onRowMove: (row, from, to) => addLog('移动', `${from} → ${to}`),
      },
    }"
    @row-add="handleRowAdd"
    @row-delete="handleRowDelete"
    @save="handleSave"
  />
</template>

<script setup>
  import { useTableCrud } from '@robot-admin/request-core'

  const createDefaultEmployee = () => ({
    id: Date.now(),
    name: '新员工',
    age: 25,
    email: '',
    department: 'tech',
    salary: 8000,
    status: 'probation',
  })

  const table = useTableCrud(dynamicConfig)
</script>
```

:::

::: details 🔧 操作按钮二元法则 — 零配置 vs 完全定制

```vue
<template>
  <!-- 场景1: 零配置 — 默认启用编辑/删除/详情 -->
  <C_Table :crud="table" />

  <!-- 场景2: 禁用部分操作 -->
  <C_Table
    :data="data"
    :columns="columns"
    :config="{
      actions: {
        edit: false, // 禁用编辑
        delete: handleDelete, // 函数 = API
        detail: false, // 禁用详情
        custom: [
          // 自定义操作
          {
            key: 'process',
            label: '处理',
            icon: 'mdi:check-circle',
            type: 'success',
            onClick: handleProcess,
            show: row => row.status === 'pending',
          },
          {
            key: 'cancel',
            label: '取消',
            icon: 'mdi:cancel',
            type: 'error',
            onClick: handleCancel,
            show: row => ['pending', 'processed'].includes(row.status),
          },
        ],
      },
    }"
  />
</template>
```

:::

## 🛠️ 高级用法

::: details ⚙️ 列设置面板 — 搜索、排序、固定、可见性

```vue {6-9}
<template>
  <C_Table
    :data="data"
    :columns="columns"
    :config="{
      toolbar: {
        show: true,
        columnSettings: true, // 启用列设置齿轮图标
      },
      display: {
        columnWidth: 180, // 默认列宽
      },
    }"
    @column-change="handleColumnChange"
  >
    <!-- 工具栏自定义内容 -->
    <template #toolbar-left>
      <n-button
        type="primary"
        @click="handleAdd"
        >新增</n-button
      >
    </template>
    <template #toolbar-right>
      <n-button @click="handleExport">导出</n-button>
    </template>
  </C_Table>
</template>
```

**列设置面板功能：**

- 🔍 搜索列名过滤
- 👁️ 列可见性切换（checkbox）
- 📌 列固定（左固定 / 右固定 / 取消固定）
- 🔄 拖拽排序 + 上移下移按钮
- ↔️ 列宽调整全局开关
- 🔄 全选 / 全不选 / 重置
- 📊 统计信息（已选 N / 总共 M 列）
  :::

::: details 🖨️ 打印和导出 — 水印配置

```typescript
// Canvas 水印
const printOptions = {
  text: '内部机密文件',
  color: 'rgba(0, 0, 0, 0.08)',
  fontSize: 20,
  angle: -30,
  type: 'canvas', // 'canvas' | 'svg'
  density: 3,
}

// SVG 水印
const svgPrintOptions = {
  text: 'CONFIDENTIAL',
  color: 'rgba(255, 0, 0, 0.05)',
  fontSize: 24,
  angle: -45,
  type: 'svg',
}

// 三种打印预设
// 'table'  — 表格样式打印
// 'form'   — 表单样式打印
// 'report' — 报告样式打印
```

:::

## ⚠️ 注意事项

### 1. CRUD 模式 vs 手动模式

::: code-group

```vue [✅ CRUD 模式（推荐）]
<!-- useTableCrud 自动接管数据、加载、分页、操作 -->
<C_Table :crud="table" :config="{ edit: { mode: 'modal' } }" />

<script setup>
  const table = useTableCrud(config)
  // table 自动提供: data, loading, columns, actions, pagination, refresh(), create(), etc.
</script>
```

```vue [✅ 手动模式]
<!-- 手动管理所有状态和事件 -->
<C_Table
  :data="data"
  :columns="columns"
  :loading="loading"
  :config="config"
  @save="handleSave"
  @cancel="handleCancel"
  @row-delete="handleDelete"
  @pagination-change="handlePageChange"
/>
```

:::

### 2. 操作按钮的二元法则

::: code-group

```typescript [✅ 推荐]
// 函数 = 启用并指定 API
actions: {
  edit: async (row) => await api.update(row),
  delete: async (row) => await api.remove(row.id),
  detail: (row) => showDetail(row),
}
```

```typescript [✅ 禁用操作]
// false = 明确禁用
actions: {
  edit: false,
  delete: false,
}
```

:::

### 3. 列配置最佳实践

::: code-group

```typescript [✅ 推荐]
// 完整的列配置 + 验证规则
const columns: TableColumn[] = [
  {
    key: 'email',
    title: '邮箱',
    width: 200,
    editable: true,
    required: true,
    editType: 'email',
    editProps: {
      rules: [PRESET_RULES.email('邮箱')],
      placeholder: '请输入邮箱',
    },
  },
]
```

```typescript [❌ 不推荐]
// 缺少编辑类型和验证
const columns = [{ key: 'email', title: '邮箱' }]
```

:::

### 4. 事件处理

::: code-group

```typescript [✅ 推荐]
// 完整的错误处理 + 状态管理
const handleSave = async (rowData, rowIndex) => {
  try {
    await api.update(rowData.id, rowData)
    message.success('保存成功')
  } catch (error) {
    message.error('保存失败')
    throw error // 重要：抛出错误阻止表格状态更新
  }
}
```

```typescript [❌ 不推荐]
// 缺少错误处理
const handleSave = rowData => {
  console.log('保存:', rowData)
}
```

:::

## 🐛 故障排除

::: details ❓ Q1: 编辑模式无效？
**A1:** 检查列配置和全局配置：

```typescript
// 1. 列必须设置 editable + editType
const columns = [
  {
    key: 'name',
    title: '姓名',
    editable: true, // ✅ 必须
    editType: 'input', // ✅ 必须指定编辑控件类型
  },
]

// 2. config.edit 不能为 false/none
const config = {
  edit: {
    mode: 'modal', // ✅ 不能是 'none'
    enabled: true, // ✅ 不能是 false
  },
}
```

:::

::: details ❓ Q2: CRUD 模式下事件没触发？
**A2:** CRUD 模式会自动桥接事件，不需要手动监听：

```vue
<!-- ❌ CRUD 模式下不需要手动绑定这些事件 -->
<C_Table :crud="table" @save="..." @cancel="..." @row-delete="..." />

<!-- ✅ CRUD 模式：事件由 useTableCrud 内部处理 -->
<C_Table :crud="table" :config="{ edit: { mode: 'modal' } }" />

<!-- ✅ 手动模式：需要手动绑定事件 -->
<C_Table
  :data="data"
  :columns="cols"
  @save="handleSave"
  @cancel="handleCancel"
/>
```

:::

::: details ❓ Q3: 自定义操作按钮超过3个时如何展示？
**A3:** 超过的按钮会自动收纳到「更多操作」下拉菜单中（`NDropdown`）：

```typescript
const config = {
  actions: {
    // 内置操作 + 自定义操作，超过阈值自动收纳
    edit: handleEdit,
    delete: handleDelete,
    custom: [
      { key: 'a', label: '操作A', onClick: handleA },
      { key: 'b', label: '操作B', onClick: handleB },
      { key: 'c', label: '操作C', onClick: handleC }, // 会进入下拉菜单
    ],
  },
}
```

:::

::: details ❓ Q4: 父子选择联动不生效？
**A4:** 确保同时启用了展开、选择和父子联动：

```typescript
const config = {
  expand: {
    enabled: true,              // ✅ 必须启用展开
    renderContent: ...,         // ✅ 展开内容中包含子表格
  },
  selection: {
    enabled: true,              // ✅ 必须启用选择
    childSelection: {
      enabled: true,            // ✅ 必须启用子选择
    },
    parentChildLink: {
      enabled: true,            // ✅ 必须启用联动
      mode: 'strict',           // 'strict' = 父子完全同步 / 'loose' = 独立
    },
  },
}
```

:::

## 🎯 最佳实践

### 1. 数据结构设计

```typescript
// ✅ 推荐：继承 DataRecord，必须有唯一标识
interface Employee extends DataRecord {
  id: number // 必须有唯一标识
  name: string
  email: string
  department: string
  status: 'active' | 'inactive'
}

// ✅ 使用 ref 包裹响应式数据
const tableData = ref<Employee[]>([])
```

### 2. 配置对象提取

```typescript
// ✅ 推荐：将配置提取到独立 data.ts 文件
// data.ts
export const employeeConfig: UseTableCrudConfig<Employee> = {
  api: { list: '/api/list', update: '/api/:id' },
  columns: getTableColumns(),
  customActions: getCustomActions(),
  detail: getDetailConfig(),
  createNewRow: createDefaultEmployee,
}

// index.vue
import { employeeConfig } from './data'
const table = useTableCrud(employeeConfig)
```

### 3. 编辑控件映射

```typescript
// 内置的编辑控件映射
const EDIT_TYPE_MAP = {
  input: NInput, // 文本输入
  textarea: NInput, // 多行文本（type='textarea'）
  number: NInputNumber, // 数字输入
  select: NSelect, // 下拉选择
  date: NDatePicker, // 日期选择
  switch: NSwitch, // 开关
  email: NInput, // 邮箱（附加邮箱验证）
  mobile: NInput, // 手机号（附加手机号验证）
}

// 自定义编辑渲染
const columns = [
  {
    key: 'custom',
    title: '自定义',
    editable: true,
    editRender: (value, rowData, rowIndex) => {
      return h(MyCustomComponent, {
        value,
        onChange: newVal => {
          /* 更新逻辑 */
        },
      })
    },
  },
]
```

### 4. 性能优化

```vue
<template>
  <C_Table
    :crud="table"
    :config="{
      pagination: { pageSize: 50 }, // 适中的页面大小
      display: { maxHeight: '600px' }, // 固定最大高度
    }"
  />
</template>

<script setup>
  // 配置对象用 computed 避免不必要的重建
  const tableConfig = computed(() => ({
    edit: { mode: editMode.value },
    display: { size: tableSize.value },
  }))
</script>
```

## 📝 更新日志

### v2.0.0 (2026-02)

- ✨ 全新「薄 UI 壳 + 厚 Composable 引擎」架构重构
- ✨ 统一 `config` 对象替代分散的 Props
- ✨ `useTableManager` 统一状态管理器
- ✨ 列处理引擎 `useTableColumns` 自动序号列、操作列
- ✨ 操作按钮「二元法则」：`false` 禁用 / 函数即 API
- ✨ `ColumnSettings` 列设置面板（搜索、拖拽、固定、可见性）
- ✨ 动态行操作 `useDynamicRow`（增删复制移动 + 打印水印）
- ✨ 嵌套展开 + 父子选择联动（strict/loose）
- ✨ CRUD 绑定模式 `useTableCrud`
- ✨ 完整的 TypeScript 泛型类型安全

### v1.0.0 (2025-06)

- 🎉 初始版本发布
- ✨ 基础表格功能
- ✨ 简单的编辑支持

<!--@include: ./snippets/contribute.md -->

**💡 提示**: C_Table 组件采用「薄 UI 壳 + 厚 Composable 引擎」架构设计——UI 层只负责模板和事件桥接，核心逻辑全部在 Composable 中。支持 CRUD 一行搞定和手动精细控制两种模式，适配从简单数据展示到复杂嵌套表格的全场景需求。列设置面板、动态行操作、打印水印、父子选择联动等企业级功能开箱即用。如果遇到问题请先查看文档，或者在团队群里讨论。🚀
