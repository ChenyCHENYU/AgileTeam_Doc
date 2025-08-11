---
outline: 'deep'
---

# C_Table 超级表格组件

> 🚀 基于 Naive UI 的全能表格组件，让数据管理变得简单而强大

## ✨ 特性

- **🎯 多种编辑模式**: 支持行编辑、单元格编辑、模态框编辑和混合编辑模式
- **📱 智能分页**: 内置分页功能，支持自定义分页配置和响应式展示
- **🔽 展开折叠**: 支持行展开和数据懒加载，完美处理层级数据
- **✅ 行选择**: 支持单选、多选、父子关联选择，灵活的选择策略
- **⚡ 动态行操作**: 内置添加、删除、复制、移动等常用操作
- **🎨 内置操作栏**: 自带编辑、删除、详情按钮，支持自定义操作
- **🛡️ 表单验证**: 集成表单验证，支持实时验证和错误提示
- **📊 数据导出**: 支持表格打印和截图下载功能
- **🎪 预设配置**: 提供多种预设模式，快速适配不同业务场景
- **💪 TypeScript**: 完整的类型定义和类型安全
- **⚡ 高性能**: 优化的虚拟滚动和按需渲染机制
- **🔧 高度可定制**: 支持自定义渲染、操作和样式配置

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

## 🎯 快速开始

### 基础用法

```vue {4,5,6,7,8}
<template>
  <!-- 最简单的表格 -->
  <C_Table
    :data="tableData"
    :columns="tableColumns"
    :loading="loading"
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

  const handleCancel = () => {
    console.log('取消编辑')
  }
</script>
```

### 多种编辑模式

```vue {6,7,8,9,10,11,12,13,14,15,16,17}
<template>
  <div class="edit-mode-demo">
    <!-- 编辑模式切换 -->
    <n-space class="mb-4">
      <n-radio-group v-model:value="editMode">
        <n-radio-button value="row">行编辑</n-radio-button>
        <n-radio-button value="cell">单元格编辑</n-radio-button>
        <n-radio-button value="modal">模态框编辑</n-radio-button>
        <n-radio-button value="both">混合模式</n-radio-button>
      </n-radio-group>
    </n-space>

    <!-- 表格组件 -->
    <C_Table
      :data="tableData"
      :columns="tableColumns"
      :edit-mode="editMode"
      modal-title="编辑员工信息"
      :modal-width="600"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
  const editMode = ref('modal')
  const tableData = ref([
    {
      id: 1,
      name: '张三',
      age: 28,
      department: 'tech',
      email: 'zhangsan@example.com',
      status: 'active'
    },
    {
      id: 2,
      name: '李四',
      age: 32,
      department: 'hr',
      email: 'lisi@example.com',
      status: 'active'
    },
  ])

  const tableColumns = [
    {
      key: 'name',
      title: '姓名',
      editable: true,
      required: true,
      editType: 'input'
    },
    {
      key: 'age',
      title: '年龄',
      editable: true,
      editType: 'number',
      editProps: { min: 18, max: 65 }
    },
    {
      key: 'department',
      title: '部门',
      editable: true,
      editType: 'select',
      editProps: {
        options: [
          { label: '技术部', value: 'tech' },
          { label: '人事部', value: 'hr' },
        ]
      }
    },
    {
      key: 'email',
      title: '邮箱',
      editable: true,
      editType: 'email'
    },
    {
      key: 'status',
      title: '状态',
      editable: true,
      editType: 'select',
      editProps: {
        options: [
          { label: '在职', value: 'active' },
          { label: '离职', value: 'inactive' },
        ]
      }
    }
  ]

  const handleSave = async (rowData, rowIndex) => {
    console.log('保存数据:', rowData)
    // 执行保存逻辑
  }
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| **data** | `DataRecord[]` | `[]` | 表格数据数组 |
| **columns** | `TableColumn[]` | `[]` | 表格列配置数组 |
| **loading** | `boolean` | `false` | 加载状态 |
| **editMode** | `'row' \| 'cell' \| 'modal' \| 'both' \| 'none'` | `'modal'` | 编辑模式 |
| **editable** | `boolean` | `true` | 是否可编辑 |
| **showRowActions** | `boolean` | `true` | 是否显示操作列 |
| **modalTitle** | `string` | `'编辑数据'` | 模态框标题 |
| **modalWidth** | `number` | `600` | 模态框宽度 |
| **actions** | `TableActions` | `{}` | 操作配置 |
| **pagination** | `PaginationConfig \| boolean` | `true` | 分页配置 |
| **expandable** | `boolean` | `false` | 是否支持展开 |
| **enableSelection** | `boolean` | `false` | 是否启用选择 |
| **rowKey** | `string \| Function` | `'id'` | 行数据的Key |
| **striped** | `boolean` | `true` | 是否显示斑马纹 |
| **bordered** | `boolean` | `true` | 是否显示边框 |
| **size** | `'small' \| 'medium' \| 'large'` | `'medium'` | 表格尺寸 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| **save** | `(rowData: DataRecord, rowIndex: number, columnKey?: string)` | 保存数据时触发 |
| **cancel** | `-` | 取消编辑时触发 |
| **row-add** | `(newRow: DataRecord)` | 添加行时触发 |
| **row-delete** | `(deletedRow: DataRecord, index: number)` | 删除行时触发 |
| **row-selection-change** | `(selectedKey: string, selectedRow: DataRecord)` | 行选择变化时触发 |
| **pagination-change** | `(page: number, pageSize: number)` | 分页变化时触发 |

### 暴露方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| **startEdit** | `(rowKey: string)` | `void` | 开始编辑指定行 |
| **cancelEdit** | `-` | `void` | 取消当前编辑 |
| **saveEdit** | `-` | `Promise<void>` | 保存当前编辑 |
| **addRow** | `-` | `void` | 添加新行 |
| **deleteRow** | `-` | `void` | 删除选中行 |
| **selectAll** | `-` | `void` | 全选 |
| **clearSelection** | `-` | `void` | 清除选择 |
| **expandAll** | `-` | `void` | 展开所有行 |
| **collapseAll** | `-` | `void` | 折叠所有行 |

::: details 🔧 类型定义 - 完整的 TypeScript 接口定义

#### 表格列配置

```typescript
interface TableColumn {
  key: string
  title: string
  width?: number
  editable?: boolean
  required?: boolean
  editType?: 'input' | 'number' | 'select' | 'date' | 'email' | 'textarea'
  editProps?: Record<string, any>
  render?: (row: DataRecord, index: number) => VNodeChild
  show?: boolean
}
```

#### 操作配置

```typescript
interface TableActions {
  edit?: false | {
    api?: string
    onEdit?: (row: DataRecord, index: number) => void | Promise<void>
  }
  delete?: false | {
    api?: string
    onDelete?: (row: DataRecord, index: number) => void | Promise<void>
    confirmText?: string | ((row: DataRecord) => string)
  }
  detail?: false | {
    onView?: (row: DataRecord, index: number) => void
  }
  custom?: Array<{
    key: string
    label: string
    icon?: string
    type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
    onClick: (row: DataRecord, index: number) => void | Promise<void>
    show?: (row: DataRecord, index: number) => boolean
  }>
}
```

#### 分页配置

```typescript
interface PaginationConfig {
  enabled?: boolean
  page?: number
  pageSize?: number
  showSizePicker?: boolean
  showQuickJumper?: boolean
  pageSizes?: number[]
  simple?: boolean
  size?: 'small' | 'medium' | 'large'
}
```
:::

## 🎨 使用示例

::: details 👥 员工管理表格 - 完整的CRUD操作示例
```vue {6,7,8,9,10,11,12,13,14,15,16}
<template>
  <div class="employee-management">
    <n-card title="员工管理" style="margin-bottom: 16px;">
      <!-- 工具栏 -->
      <template #header-extra>
        <n-space>
          <n-button type="primary" @click="handleAddEmployee">
            <template #icon>
              <n-icon><Plus /></n-icon>
            </template>
            添加员工
          </n-button>
          <n-button @click="handleExport">导出数据</n-button>
        </n-space>
      </template>

      <!-- 表格组件 -->
      <C_Table
        ref="employeeTableRef"
        :data="employeeData"
        :columns="employeeColumns"
        :loading="loading"
        edit-mode="modal"
        modal-title="编辑员工信息"
        :modal-width="700"
        :actions="employeeActions"
        :pagination="paginationConfig"
        @save="handleSave"
        @cancel="handleCancel"
        @row-delete="handleDelete"
        @pagination-change="handlePaginationChange"
      />
    </n-card>
  </div>
</template>

<script setup>
  import { Plus, Download } from '@vicons/ionicons5'
  
  const employeeTableRef = ref()
  const loading = ref(false)
  
  const employeeData = ref([
    {
      id: 1,
      name: '张三',
      age: 28,
      gender: 'male',
      email: 'zhangsan@example.com',
      department: 'tech',
      joinDate: new Date('2022-01-15').getTime(),
      status: 'active',
      description: '优秀的前端开发工程师'
    },
    {
      id: 2,
      name: '李四',
      age: 32,
      gender: 'female',
      email: 'lisi@example.com',
      department: 'hr',
      joinDate: new Date('2021-06-20').getTime(),
      status: 'active',
      description: '资深人力资源专员'
    },
  ])

  const employeeColumns = [
    {
      key: 'name',
      title: '姓名',
      width: 120,
      editable: true,
      required: true,
      editType: 'input'
    },
    {
      key: 'age',
      title: '年龄',
      width: 100,
      editable: true,
      editType: 'number',
      editProps: { min: 18, max: 65 }
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
          { label: '女', value: 'female' }
        ]
      },
      render: (row) => row.gender === 'male' ? '男' : '女'
    },
    {
      key: 'email',
      title: '邮箱',
      width: 200,
      editable: true,
      editType: 'email'
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
          { label: '财务部', value: 'finance' }
        ]
      },
      render: (row) => {
        const departmentMap = {
          tech: '技术部',
          hr: '人事部',
          market: '市场部',
          finance: '财务部'
        }
        return departmentMap[row.department] || row.department
      }
    },
    {
      key: 'joinDate',
      title: '入职日期',
      width: 140,
      editable: true,
      editType: 'date',
      render: (row) => {
        return row.joinDate 
          ? new Date(row.joinDate).toLocaleDateString()
          : '-'
      }
    },
    {
      key: 'status',
      title: '状态',
      width: 100,
      editable: true,
      editType: 'select',
      editProps: {
        options: [
          { label: '在职', value: 'active' },
          { label: '离职', value: 'inactive' },
          { label: '试用期', value: 'probation' }
        ]
      },
      render: (row) => {
        const statusMap = {
          active: '在职',
          inactive: '离职',
          probation: '试用期'
        }
        return statusMap[row.status] || row.status
      }
    },
    {
      key: 'description',
      title: '描述',
      width: 200,
      editable: true,
      editType: 'textarea',
      render: (row) => {
        const desc = row.description || ''
        return desc.length > 30 ? desc.substring(0, 30) + '...' : desc
      }
    }
  ]

  const employeeActions = {
    // 使用默认的编辑、删除、详情功能
    edit: {},
    delete: {
      confirmText: (row) => `确定要删除员工"${row.name}"吗？`
    },
    detail: {},
    
    // 自定义操作
    custom: [
      {
        key: 'copy',
        label: '复制',
        icon: 'mdi:content-copy',
        type: 'default',
        onClick: handleCopy
      },
      {
        key: 'authorize',
        label: '授权',
        icon: 'mdi:shield-key',
        type: 'warning',
        onClick: handleAuthorize,
        show: (row) => row.status === 'active'
      }
    ]
  }

  const paginationConfig = {
    enabled: true,
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    showQuickJumper: true,
    pageSizes: [10, 20, 50, 100]
  }

  const handleAddEmployee = () => {
    const newEmployee = {
      id: Date.now(),
      name: `新员工_${Math.floor(Math.random() * 1000)}`,
      age: 25,
      gender: 'male',
      email: `user${Date.now()}@example.com`,
      department: 'tech',
      joinDate: Date.now(),
      status: 'probation',
      description: '新入职员工，待完善信息'
    }
    
    employeeData.value.unshift(newEmployee)
    
    setTimeout(() => {
      employeeTableRef.value?.startEdit(newEmployee.id)
    }, 100)
  }

  const handleSave = async (rowData, rowIndex) => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      employeeData.value[rowIndex] = { ...rowData }
      message.success('员工信息保存成功')
    } catch (error) {
      message.error('保存失败，请重试')
      throw error
    } finally {
      loading.value = false
    }
  }

  const handleCancel = () => {
    message.info('已取消编辑')
  }

  const handleDelete = (deletedRow, index) => {
    employeeData.value.splice(index, 1)
    message.success(`已删除员工"${deletedRow.name}"`)
  }

  const handleCopy = (row, index) => {
    const newRow = {
      ...row,
      id: Date.now(),
      name: `${row.name}_副本`
    }
    employeeData.value.splice(index + 1, 0, newRow)
    message.success('复制成功')
  }

  const handleAuthorize = (row) => {
    dialog.info({
      title: '员工授权',
      content: `正在为员工 "${row.name}" 配置系统权限...`,
      positiveText: '确定',
      onPositiveClick: () => {
        message.success('授权配置完成')
      }
    })
  }

  const handleExport = () => {
    console.log('导出员工数据')
  }

  const handlePaginationChange = (page, pageSize) => {
    console.log('分页变化:', { page, pageSize })
  }
</script>
```
:::

::: details 📦 产品管理表格 - 展开功能和选择功能
```vue {4,5,6,7,8,9,10,11}
<template>
  <div class="product-management">
    <C_Table
      :data="productData"
      :columns="productColumns"
      :loading="loading"
      expandable
      enable-selection
      :actions="productActions"
      :on-load-expand-data="loadProductDetails"
      :render-expand-content="renderExpandContent"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
  const productData = ref([
    {
      id: 1,
      name: 'iPhone 15',
      category: 'electronics',
      price: 5999,
      stock: 100,
      status: 'active'
    },
    {
      id: 2,
      name: 'MacBook Pro',
      category: 'electronics',
      price: 14999,
      stock: 50,
      status: 'active'
    }
  ])

  const productColumns = [
    {
      key: 'name',
      title: '产品名称',
      editable: true,
      editType: 'input'
    },
    {
      key: 'category',
      title: '分类',
      editable: true,
      editType: 'select',
      editProps: {
        options: [
          { label: '电子产品', value: 'electronics' },
          { label: '服装', value: 'clothing' },
          { label: '家具', value: 'furniture' }
        ]
      }
    },
    {
      key: 'price',
      title: '价格',
      editable: true,
      editType: 'number',
      render: (row) => `¥${row.price}`
    },
    {
      key: 'stock',
      title: '库存',
      editable: true,
      editType: 'number'
    },
    {
      key: 'status',
      title: '状态',
      editable: true,
      editType: 'select',
      editProps: {
        options: [
          { label: '上架', value: 'active' },
          { label: '下架', value: 'inactive' }
        ]
      }
    }
  ]

  const productActions = {
    custom: [
      {
        key: 'inventory',
        label: '库存管理',
        icon: 'mdi:package-variant',
        type: 'info',
        onClick: handleInventoryManagement
      },
      {
        key: 'pricing',
        label: '价格调整',
        icon: 'mdi:currency-usd',
        type: 'warning',
        onClick: handlePricing
      }
    ]
  }

  // 加载产品详情（展开行内容）
  const loadProductDetails = async (row) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      specifications: [
        { name: '颜色', value: '深空灰' },
        { name: '存储', value: '256GB' },
        { name: '屏幕', value: '6.1英寸' }
      ],
      reviews: [
        { user: '用户A', rating: 5, comment: '非常好用' },
        { user: '用户B', rating: 4, comment: '性价比不错' }
      ]
    }
  }

  // 渲染展开内容
  const renderExpandContent = (row, expandData, loading) => {
    if (loading) {
      return h('div', { style: 'padding: 16px' }, '加载中...')
    }

    return h('div', { style: 'padding: 16px' }, [
      h('h4', '产品规格'),
      h('n-table', {
        size: 'small',
        columns: [
          { title: '属性', key: 'name' },
          { title: '值', key: 'value' }
        ],
        data: expandData.specifications
      }),
      h('h4', { style: 'margin-top: 16px' }, '用户评价'),
      h('n-table', {
        size: 'small',
        columns: [
          { title: '用户', key: 'user' },
          { title: '评分', key: 'rating' },
          { title: '评论', key: 'comment' }
        ],
        data: expandData.reviews
      })
    ])
  }

  const handleSave = (rowData, rowIndex) => {
    console.log('保存产品:', rowData)
  }

  const handleInventoryManagement = (row) => {
    console.log('库存管理:', row)
  }

  const handlePricing = (row) => {
    console.log('价格调整:', row)
  }
</script>
```
:::

::: details 📋 订单管理表格 - 自定义操作和状态管理
```vue {4,5,6,7,8,9}
<template>
  <C_Table
    :data="orderData"
    :columns="orderColumns"
    :loading="loading"
    edit-mode="none"
    :actions="orderActions"
    @save="handleSave"
  />
</template>

<script setup>
  const orderData = ref([
    {
      id: 'ORD001',
      customer: '张三',
      amount: 299.99,
      status: 'pending',
      createTime: new Date().getTime()
    },
    {
      id: 'ORD002',
      customer: '李四',
      amount: 599.99,
      status: 'shipped',
      createTime: new Date().getTime()
    }
  ])

  const orderColumns = [
    {
      key: 'id',
      title: '订单号',
      width: 120
    },
    {
      key: 'customer',
      title: '客户',
      width: 100
    },
    {
      key: 'amount',
      title: '金额',
      width: 100,
      render: (row) => `¥${row.amount}`
    },
    {
      key: 'status',
      title: '状态',
      width: 100,
      render: (row) => {
        const statusMap = {
          pending: '待处理',
          shipped: '已发货',
          delivered: '已送达',
          cancelled: '已取消'
        }
        return statusMap[row.status] || row.status
      }
    },
    {
      key: 'createTime',
      title: '创建时间',
      width: 180,
      render: (row) => new Date(row.createTime).toLocaleString()
    }
  ]

  const orderActions = {
    // 禁用默认的编辑和删除
    edit: false,
    delete: false,
    
    // 自定义操作
    custom: [
      {
        key: 'process',
        label: '处理订单',
        icon: 'mdi:check-circle',
        type: 'success',
        onClick: handleProcessOrder,
        show: (row) => row.status === 'pending'
      },
      {
        key: 'ship',
        label: '发货',
        icon: 'mdi:truck',
        type: 'primary',
        onClick: handleShipOrder,
        show: (row) => row.status === 'processed'
      },
      {
        key: 'cancel',
        label: '取消订单',
        icon: 'mdi:cancel',
        type: 'error',
        onClick: handleCancelOrder,
        show: (row) => ['pending', 'processed'].includes(row.status)
      },
      {
        key: 'track',
        label: '物流跟踪',
        icon: 'mdi:map-marker',
        type: 'info',
        onClick: handleTrackOrder,
        show: (row) => ['shipped', 'delivered'].includes(row.status)
      }
    ]
  }

  const handleProcessOrder = async (row) => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const index = orderData.value.findIndex(item => item.id === row.id)
      if (index !== -1) {
        orderData.value[index].status = 'processed'
      }
      
      message.success('订单处理成功')
    } catch (error) {
      message.error('处理失败')
    } finally {
      loading.value = false
    }
  }

  const handleShipOrder = async (row) => {
    dialog.info({
      title: '确认发货',
      content: `确定要发货订单 ${row.id} 吗？`,
      positiveText: '确定',
      onPositiveClick: async () => {
        loading.value = true
        try {
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const index = orderData.value.findIndex(item => item.id === row.id)
          if (index !== -1) {
            orderData.value[index].status = 'shipped'
          }
          
          message.success('发货成功')
        } catch (error) {
          message.error('发货失败')
        } finally {
          loading.value = false
        }
      }
    })
  }

  const handleCancelOrder = (row) => {
    dialog.warning({
      title: '取消订单',
      content: `确定要取消订单 ${row.id} 吗？此操作不可撤销。`,
      positiveText: '确定',
      onPositiveClick: () => {
        const index = orderData.value.findIndex(item => item.id === row.id)
        if (index !== -1) {
          orderData.value[index].status = 'cancelled'
        }
        message.success('订单已取消')
      }
    })
  }

  const handleTrackOrder = (row) => {
    dialog.info({
      title: '物流跟踪',
      content: `订单 ${row.id} 的物流信息：\n- 已发货\n- 运输中\n- 预计明天送达`,
      positiveText: '确定'
    })
  }
</script>
```
:::

## 🛠️ 高级用法

::: details ⚡ 预设配置模式 - 快速搭建CRUD表格
```vue {5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20}
<template>
  <C_Table
    :data="tableData"
    :columns="tableColumns"
    :preset="presetConfig"
    @save="handleSave"
  />
</template>

<script setup>
  // 使用预设配置快速搭建表格
  const presetConfig = {
    mode: 'crud', // CRUD模式
    features: {
      pagination: true,
      selection: true,
      export: true,
      print: true
    },
    actions: {
      create: true,
      edit: true,
      delete: true,
      view: true
    }
  }

  const tableData = ref([
    // 数据...
  ])

  const tableColumns = [
    // 列配置...
  ]

  const handleSave = (rowData, rowIndex) => {
    console.log('保存数据:', rowData)
  }
</script>
```
:::

::: details 🔄 动态行操作 - 添加、删除、复制和移动
```vue {5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20}
<template>
  <C_Table
    ref="tableRef"
    :data="tableData"
    :columns="tableColumns"
    :dynamic-rows-options="dynamicRowsOptions"
    @row-add="handleRowAdd"
    @row-delete="handleRowDelete"
    @row-move="handleRowMove"
  />
</template>

<script setup>
  const tableRef = ref()
  
  const dynamicRowsOptions = {
    showToolbar: true,
    showRowIndex: true,
    enableAdd: true,
    enableDelete: true,
    enableCopy: true,
    enableMove: true,
    maxRows: 100,
    minRows: 1
  }

  const handleRowAdd = (newRow) => {
    console.log('新增行:', newRow)
  }

  const handleRowDelete = (deletedRow, index) => {
    console.log('删除行:', deletedRow, index)
  }

  const handleRowMove = (row, fromIndex, toIndex) => {
    console.log('移动行:', row, fromIndex, toIndex)
  }

  // 编程式操作
  const addNewRow = () => {
    tableRef.value.addRow()
  }

  const deleteSelectedRow = () => {
    tableRef.value.deleteRow()
  }
</script>
```
:::

::: details 🎨 自定义渲染和验证 - 复杂字段处理
```vue {4,5,6,7}
<template>
  <C_Table
    :data="tableData"
    :columns="advancedColumns"
    edit-mode="modal"
    @save="handleSave"
  />
</template>

<script setup>
  import { PRESET_RULES } from '@/utils/v_verify'

  const advancedColumns = [
    {
      key: 'avatar',
      title: '头像',
      width: 80,
      render: (row) => {
        return h('img', {
          src: row.avatar || '/default-avatar.png',
          style: 'width: 40px; height: 40px; border-radius: 50%;'
        })
      }
    },
    {
      key: 'name',
      title: '姓名',
      editable: true,
      required: true,
      editType: 'input',
      editProps: {
        rules: [PRESET_RULES.length('姓名', 2, 20)]
      }
    },
    {
      key: 'email',
      title: '邮箱',
      editable: true,
      required: true,
      editType: 'email',
      editProps: {
        rules: [PRESET_RULES.email('邮箱')]
      }
    },
    {
      key: 'phone',
      title: '手机号',
      editable: true,
      editType: 'input',
      editProps: {
        rules: [PRESET_RULES.mobile('手机号')]
      }
    },
    {
      key: 'score',
      title: '评分',
      editable: true,
      editType: 'number',
      editProps: {
        min: 0,
        max: 100,
        step: 1
      },
      render: (row) => {
        const score = row.score || 0
        const color = score >= 80 ? 'success' : score >= 60 ? 'warning' : 'error'
        return h('n-tag', { type: color }, () => `${score}分`)
      }
    },
    {
      key: 'tags',
      title: '标签',
      editable: true,
      editType: 'select',
      editProps: {
        multiple: true,
        options: [
          { label: '优秀', value: 'excellent' },
          { label: '活跃', value: 'active' },
          { label: '新手', value: 'newbie' }
        ]
      },
      render: (row) => {
        const tags = row.tags || []
        return h('n-space', {}, () => 
          tags.map(tag => h('n-tag', { size: 'small' }, () => tag))
        )
      }
    }
  ]

  const handleSave = async (rowData, rowIndex) => {
    // 自定义验证逻辑
    if (rowData.email && rowData.phone) {
      const emailExists = await checkEmailExists(rowData.email)
      if (emailExists) {
        throw new Error('邮箱已存在')
      }
    }

    // 保存数据
    console.log('保存数据:', rowData)
  }

  const checkEmailExists = async (email) => {
    // 模拟API检查
    await new Promise(resolve => setTimeout(resolve, 500))
    return ['admin@example.com', 'test@example.com'].includes(email)
  }
</script>
```
:::


## 🎨 自定义样式

::: details 🎨 CSS 变量
```scss
.c-table-wrapper {
  --table-border-color: #e5e7eb;
  --table-header-bg: #f9fafb;
  --table-row-hover-bg: #f3f4f6;
  --table-action-color: #6b7280;
  --table-action-hover-color: #374151;
  --table-edit-border-color: #3b82f6;
  --table-edit-bg: #eff6ff;
  --table-border-radius: 8px;
}
```
:::

::: details 📱 响应式设计
```vue {6,7,8,9,10,11,12,13,14,15}
<template>
  <C_Table
    :data="tableData"
    :columns="responsiveColumns"
    :class="tableClass"
    :size="tableSize"
  />
</template>

<script setup>
  const breakpoint = useBreakpoint()
  
  const tableClass = computed(() => ({
    'table-mobile': breakpoint.value.xs,
    'table-tablet': breakpoint.value.md,
    'table-desktop': breakpoint.value.lg
  }))

  const tableSize = computed(() => {
    if (breakpoint.value.xs) return 'small'
    if (breakpoint.value.md) return 'medium'
    return 'large'
  })

  const responsiveColumns = computed(() => {
    const baseColumns = [
      { key: 'name', title: '姓名', width: 120 },
      { key: 'email', title: '邮箱', width: 200 },
      { key: 'phone', title: '手机', width: 150 },
      { key: 'department', title: '部门', width: 120 },
      { key: 'status', title: '状态', width: 100 }
    ]

    // 移动端隐藏部分列
    if (breakpoint.value.xs) {
      return baseColumns.filter(col => ['name', 'status'].includes(col.key))
    }

    // 平板端隐藏部分列
    if (breakpoint.value.md) {
      return baseColumns.filter(col => !['phone', 'department'].includes(col.key))
    }

    return baseColumns
  })
</script>

<style scoped>
  .table-mobile :deep(.n-data-table) {
    font-size: 14px;
  }

  .table-mobile :deep(.n-data-table-th) {
    padding: 8px 4px;
  }

  .table-mobile :deep(.n-data-table-td) {
    padding: 8px 4px;
  }
</style>
```
:::

## ⚠️ 注意事项

### 1. 数据绑定

::: code-group

```vue [✅ 推荐] {3,4,5}
<!-- 使用响应式数据 -->
<script setup>
  const tableData = ref([
    { id: 1, name: '张三' }
  ])
</script>
```

```vue [❌ 不推荐] {3,4,5}
<!-- 直接赋值 -->
<script setup>
  const tableData = [
    { id: 1, name: '张三' }
  ]
</script>
```

:::

### 2. 列配置

::: code-group

```javascript [✅ 推荐] {3,4,5,6,7,8,9}
// 完整的列配置
const columns = [
  {
    key: 'name',
    title: '姓名',
    width: 120,
    editable: true,
    required: true,
    editType: 'input'
  }
]
```

```javascript [❌ 不推荐] {3,4,5,6}
// 缺少必要配置
const columns = [
  {
    key: 'name',
    title: '姓名'
  }
]
```

:::

### 3. 事件处理

::: code-group

```javascript [✅ 推荐] {2,3,4,5,6,7,8,9,10,11,12,13,14}
// 完整的错误处理
const handleSave = async (rowData, rowIndex) => {
  try {
    loading.value = true
    await saveData(rowData)
    message.success('保存成功')
  } catch (error) {
    message.error('保存失败')
    throw error // 重要：抛出错误以阻止表格状态更新
  } finally {
    loading.value = false
  }
}
```

```javascript [❌ 不推荐] {2,3}
// 缺少错误处理
const handleSave = (rowData, rowIndex) => {
  console.log('保存数据:', rowData)
}
```

:::

## 🐛 故障排除

::: details ❓ Q1: 编辑模式无效？
**A1:** 检查编辑配置：

```javascript
// 确保列配置正确
const columns = [
  {
    key: 'name',
    title: '姓名',
    editable: true, // 必须设置为true
    editType: 'input' // 必须指定编辑类型
  }
]

// 确保表格配置正确
<C_Table
  :data="tableData"
  :columns="columns"
  :editable="true" // 全局编辑开关
  edit-mode="modal" // 指定编辑模式
/>
```
:::

::: details ❓ Q2: 分页不显示？
**A2:** 检查分页配置：

```javascript
// 确保数据量超过页面大小
const tableData = ref([
  // 至少需要超过pageSize的数据量
])

// 确保分页配置正确
const paginationConfig = {
  enabled: true, // 必须开启
  pageSize: 10
}
```
:::

::: details ❓ Q3: 自定义操作不显示？
**A3:** 检查操作配置：

```javascript
// 确保操作配置格式正确
const actions = {
  custom: [
    {
      key: 'copy', // 必须有唯一key
      label: '复制', // 必须有label
      onClick: handleCopy, // 必须有点击事件
      show: (row) => true // 可选的显示条件
    }
  ]
}
```
:::

::: details ❓ Q4: 表单验证不生效？
**A4:** 检查验证配置：

```javascript
// 确保验证规则正确
const columns = [
  {
    key: 'email',
    title: '邮箱',
    editable: true,
    required: true, // 必填验证
    editType: 'email', // 类型验证
    editProps: {
      rules: [PRESET_RULES.email('邮箱')] // 自定义验证规则
    }
  }
]
```
:::

## 🎯 最佳实践

### 1. 数据结构设计

```javascript {2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19}
// ✅ 推荐：统一的数据结构
interface TableRecord {
  id: string | number // 必须有唯一标识
  [key: string]: any
}

const tableData = ref<TableRecord[]>([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    status: 'active',
    createTime: new Date().getTime()
  }
])
```

### 2. 列配置管理

```javascript {2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29}
// ✅ 推荐：模块化的列配置
const createUserColumns = () => [
  {
    key: 'name',
    title: '姓名',
    width: 120,
    editable: true,
    required: true,
    editType: 'input',
    editProps: {
      rules: [PRESET_RULES.length('姓名', 2, 20)]
    }
  },
  {
    key: 'email',
    title: '邮箱',
    width: 200,
    editable: true,
    required: true,
    editType: 'email'
  }
]

// 使用时
const userColumns = createUserColumns()
```

### 3. 性能优化

```vue {10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42}
<template>
  <C_Table
    :data="tableData"
    :columns="columns"
    :loading="loading"
    :pagination="paginationConfig"
    @save="handleSave"
  />
</template>

<script setup>
  // 大数据量时使用分页
  const paginationConfig = {
    enabled: true,
    pageSize: 50, // 适中的页面大小
    showSizePicker: true
  }

  // 防抖处理保存操作
  const handleSave = useDebounceFn(async (rowData, rowIndex) => {
    loading.value = true
    try {
      await saveData(rowData)
      message.success('保存成功')
    } catch (error) {
      message.error('保存失败')
      throw error
    } finally {
      loading.value = false
    }
  }, 300)

  // 使用 shallowRef 优化大数据
  const tableData = shallowRef([
    // 大量数据...
  ])
</script>
```

### 4. 错误处理

```javascript {2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59}
// ✅ 推荐：完整的错误处理策略
const handleSave = async (rowData, rowIndex) => {
  const loadingKey = `save-${rowIndex}`
  
  try {
    loading.value = true
    
    // 前端验证
    if (!rowData.name) {
      throw new Error('姓名不能为空')
    }
    
    // API调用
    const response = await api.updateUser(rowData.id, rowData)
    
    // 成功处理
    tableData.value[rowIndex] = response.data
    message.success('保存成功')
    
  } catch (error) {
    // 错误分类处理
    if (error.response?.status === 400) {
      message.error('数据格式错误')
    } else if (error.response?.status === 409) {
      message.error('数据冲突，请刷新后重试')
    } else if (error.message) {
      message.error(error.message)
    } else {
      message.error('保存失败，请稍后重试')
    }
    
    // 记录错误日志
    console.error('保存失败:', error)
    
    // 重新抛出错误，阻止表格状态更新
    throw error
    
  } finally {
    loading.value = false
  }
}
```

## 📝 更新日志

### v2.0.0 (2025-07-18)

- ✨ 全新的表格架构，支持多种编辑模式
- ✨ 内置分页功能，支持自定义分页配置
- ✨ 智能操作系统，内置编辑、删除、详情操作
- ✨ 强大的展开功能，支持数据懒加载
- ✨ 完整的选择系统，支持父子关联选择
- ✨ 动态行操作，支持添加、删除、复制、移动
- ✨ 表单验证集成，支持实时验证和错误提示
- ✨ 完整的TypeScript支持和类型安全
- ✨ 响应式设计，适配移动端和桌面端
- ✨ 丰富的自定义选项和扩展能力

### v1.0.0 (2025-06-13)

- 🎉 初始版本发布
- ✨ 基础表格功能
- ✨ 简单的编辑支持
- ✨ 基本的操作按钮

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个表格组件是为了提升数据管理效率而设计的全功能解决方案。从简单的数据展示到复杂的CRUD操作，从单个字段编辑到完整的表单验证，都能轻松应对。支持分页、选择、展开、导出等企业级功能，让数据管理变得简单而高效。结合强大的自定义能力和完善的类型系统，能够满足各种复杂的业务需求。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更强大的数据管理体验！ 🚀