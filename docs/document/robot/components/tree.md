---
outline: 'deep'
---

# C_Tree 树形组件

> 🌳 功能强大的树形组件，支持多种预设模式和自定义配置

## ✨ 特性

- **🎯 多种模式**: 内置菜单、文件、组织架构三种预设模式
- **🔍 搜索功能**: 支持节点搜索和高亮显示
- **🎨 图标配置**: 灵活的图标映射和颜色配置
- **⚡ 操作按钮**: 可配置节点操作按钮和确认对话框
- **🏷️ 状态标签**: 支持节点状态标签显示
- **🔧 工具栏**: 内置搜索、新增、展开、刷新等工具
- **🖱️ 拖拽排序**: 可选择启用节点拖拽功能
- **📦 无缝集成**: 基于 Naive UI Tree 组件封装

## 📦 安装

组件已全局注册，直接使用即可：

```vue
<template>
  <C_Tree :data="treeData" />
</template>
```

## 🎯 快速开始

### 基础用法

```vue
<template>
  <C_Tree 
    :data="basicTreeData"
    @node-select="handleNodeSelect"
  />
</template>

<script setup>
const basicTreeData = [
  {
    id: '1',
    name: '一级节点',
    children: [
      {
        id: '1-1',
        name: '二级节点 1'
      },
      {
        id: '1-2',
        name: '二级节点 2'
      }
    ]
  }
]

const handleNodeSelect = (node, selectedKeys) => {
  console.log('选中节点:', node)
}
</script>
```

### 菜单模式

```vue
<template>
  <C_Tree 
    mode="menu"
    :data="menuData"
    @node-action="handleMenuAction"
    @add="handleAddMenu"
  />
</template>

<script setup>
const menuData = [
  {
    id: 'dashboard',
    name: '工作台',
    type: 'menu',
    icon: 'mdi:view-dashboard'
  },
  {
    id: 'system',
    name: '系统管理',
    type: 'directory',
    children: [
      {
        id: 'user',
        name: '用户管理',
        type: 'menu',
        icon: 'mdi:account-multiple'
      }
    ]
  }
]
</script>
```

### 文件模式

```vue
<template>
  <C_Tree 
    mode="file"
    :data="fileData"
    :draggable="false"
  />
</template>

<script setup>
const fileData = [
  {
    id: 'docs',
    name: '文档',
    type: 'folder',
    children: [
      {
        id: 'readme',
        name: 'README.md',
        type: 'file'
      },
      {
        id: 'images',
        name: '图片',
        type: 'folder',
        children: [
          {
            id: 'logo',
            name: 'logo.png',
            type: 'image'
          }
        ]
      }
    ]
  }
]
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| **data** | `TreeNodeData[]` | `[]` | 树形数据 |
| **mode** | `'menu' \| 'file' \| 'org' \| 'custom'` | `'custom'` | 树形模式 |
| **keyField** | `string` | `'id'` | 节点唯一标识字段 |
| **labelField** | `string` | `'name'` | 节点标签字段 |
| **childrenField** | `string` | `'children'` | 子节点字段 |
| **searchable** | `boolean` | `true` | 是否可搜索 |
| **searchPattern** | `string` | `''` | 搜索关键词 |
| **searchPlaceholder** | `string` | `'搜索...'` | 搜索框占位符 |
| **draggable** | `boolean` | `false` | 是否可拖拽 |
| **showLine** | `boolean` | `true` | 是否显示连接线 |
| **showToolbar** | `boolean` | `true` | 是否显示工具栏 |
| **addable** | `boolean` | `true` | 是否显示新增按钮 |
| **addText** | `string` | `'新增'` | 新增按钮文本 |
| **refreshable** | `boolean` | `true` | 是否显示刷新按钮 |
| **iconField** | `string` | `'icon'` | 图标字段名 |
| **iconConfig** | `IconConfig` | - | 图标配置 |
| **statusConfigs** | `StatusConfig[]` | `[]` | 状态配置 |
| **actions** | `ActionConfig[]` | `[]` | 操作按钮配置 |
| **defaultExpandAll** | `boolean` | `false` | 是否默认展开所有节点 |
| **defaultExpandedKeys** | `(string \| number)[]` | `[]` | 默认展开的节点 |
| **defaultSelectedKeys** | `(string \| number)[]` | `[]` | 默认选中的节点 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| **node-select** | `(node: TreeNodeData \| null, selectedKeys: (string \| number)[])` | 节点选择时触发 |
| **node-action** | `(action: string, node: TreeNodeData)` | 节点操作时触发 |
| **node-drop** | `(dropInfo: DropInfo)` | 节点拖拽时触发 |
| **add** | `(parentNode?: TreeNodeData)` | 点击新增时触发 |
| **refresh** | - | 点击刷新时触发 |

### 数据结构

#### TreeNodeData
```typescript
interface TreeNodeData {
  [key: string]: any          // 节点唯一标识（由 keyField 指定）
  name?: string               // 节点名称（由 labelField 指定）
  children?: TreeNodeData[]   // 子节点（由 childrenField 指定）
  type?: string              // 节点类型
  icon?: string              // 自定义图标
  disabled?: boolean         // 是否禁用
  [statusField: string]: any // 状态字段
}
```

#### IconConfig
```typescript
interface IconConfig {
  default?: string                    // 默认图标
  typeMap?: Record<string, string>    // 类型图标映射
  colorMap?: Record<string, string>   // 类型颜色映射
}
```

#### ActionConfig
```typescript
interface ActionConfig {
  key: string                                    // 操作标识
  text: string                                   // 操作文本
  icon: string                                   // 操作图标
  type?: 'primary' | 'info' | 'success' | 'warning' | 'error' | 'default'  // 按钮类型
  confirm?: string                               // 确认对话框文本
  show?: (node: TreeNodeData) => boolean         // 显示条件
}
```

#### StatusConfig
```typescript
interface StatusConfig {
  field: string                      // 状态字段名
  values: Record<string | number, {  // 状态值配置
    text: string                     // 显示文本
    type: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'  // 标签类型
  }>
}
```

### 组件方法

通过 ref 调用：

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| **expandAll** | - | 展开所有节点 |
| **collapseAll** | - | 收起所有节点 |
| **selectNode** | `key: string \| number` | 选中指定节点 |
| **getSelectedNode** | - | 获取当前选中节点 |

## 🎨 使用示例

### 场景 1: 系统菜单管理

```vue
<template>
  <NCard title="菜单管理">
    <C_Tree 
      mode="menu"
      :data="menuTreeData"
      :icon-config="menuIconConfig"
      :status-configs="menuStatusConfigs"
      @node-action="handleMenuAction"
      @add="handleAddMenu"
    />
  </NCard>
</template>

<script setup>
const menuTreeData = ref([
  {
    id: 'dashboard',
    name: '工作台',
    type: 'menu',
    icon: 'mdi:view-dashboard',
    status: 'active',
    sort: 1
  },
  {
    id: 'system',
    name: '系统管理',
    type: 'directory',
    status: 'active',
    sort: 2,
    children: [
      {
        id: 'user-management',
        name: '用户管理',
        type: 'menu',
        icon: 'mdi:account-multiple',
        status: 'active',
        sort: 1
      },
      {
        id: 'role-management',
        name: '角色管理',
        type: 'menu',
        icon: 'mdi:account-key',
        status: 'disabled',
        sort: 2
      }
    ]
  }
])

// 菜单图标配置
const menuIconConfig = {
  default: 'mdi:file-document',
  typeMap: {
    directory: 'mdi:folder',
    menu: 'mdi:file-document',
    button: 'mdi:button-cursor'
  },
  colorMap: {
    directory: '#f39c12',
    menu: '#3498db',
    button: '#e74c3c'
  }
}

// 菜单状态配置
const menuStatusConfigs = [
  {
    field: 'status',
    values: {
      active: { text: '启用', type: 'success' },
      disabled: { text: '禁用', type: 'error' },
      draft: { text: '草稿', type: 'warning' }
    }
  }
]

// 处理菜单操作
const handleMenuAction = (action, node) => {
  switch (action) {
    case 'edit':
      openMenuDialog(node)
      break
    case 'delete':
      deleteMenu(node.id)
      break
    case 'toggle-status':
      toggleMenuStatus(node)
      break
  }
}

// 新增菜单
const handleAddMenu = (parentNode) => {
  openMenuDialog(null, parentNode)
}
</script>
```

### 场景 2: 文件目录浏览

```vue
<template>
  <div class="file-explorer">
    <C_Tree 
      mode="file"
      :data="fileTreeData"
      :actions="fileActions"
      :icon-config="fileIconConfig"
      @node-select="handleFileSelect"
      @node-action="handleFileAction"
    />
    
    <!-- 文件预览区域 -->
    <div v-if="selectedFile" class="file-preview">
      <NCard :title="selectedFile.name">
        <FilePreview :file="selectedFile" />
      </NCard>
    </div>
  </div>
</template>

<script setup>
const selectedFile = ref(null)

const fileTreeData = ref([
  {
    id: 'root',
    name: '项目根目录',
    type: 'folder',
    children: [
      {
        id: 'src',
        name: 'src',
        type: 'folder',
        children: [
          {
            id: 'components',
            name: 'components',
            type: 'folder'
          },
          {
            id: 'main-js',
            name: 'main.js',
            type: 'file',
            size: '2.1KB',
            lastModified: '2025-08-11'
          }
        ]
      },
      {
        id: 'package-json',
        name: 'package.json',
        type: 'file',
        size: '1.5KB',
        lastModified: '2025-08-10'
      }
    ]
  }
])

// 文件图标配置
const fileIconConfig = {
  default: 'mdi:file',
  typeMap: {
    folder: 'mdi:folder',
    file: 'mdi:file-document',
    image: 'mdi:file-image',
    video: 'mdi:file-video',
    audio: 'mdi:file-music',
    pdf: 'mdi:file-pdf-box'
  },
  colorMap: {
    folder: '#f39c12',
    image: '#e74c3c',
    video: '#9b59b6',
    audio: '#1abc9c'
  }
}

// 文件操作配置
const fileActions = [
  {
    key: 'open',
    text: '打开',
    icon: 'mdi:folder-open',
    type: 'primary',
    show: (node) => node.type === 'folder'
  },
  {
    key: 'download',
    text: '下载',
    icon: 'mdi:download',
    type: 'info',
    show: (node) => node.type === 'file'
  },
  {
    key: 'rename',
    text: '重命名',
    icon: 'mdi:rename-box',
    type: 'warning'
  },
  {
    key: 'delete',
    text: '删除',
    icon: 'mdi:delete',
    type: 'error',
    confirm: '确认删除该文件吗？'
  }
]

const handleFileSelect = (node) => {
  selectedFile.value = node
}

const handleFileAction = (action, node) => {
  switch (action) {
    case 'open':
      if (node.type === 'folder') {
        // 展开文件夹逻辑
      } else {
        openFile(node)
      }
      break
    case 'download':
      downloadFile(node)
      break
    case 'rename':
      renameFile(node)
      break
    case 'delete':
      deleteFile(node)
      break
  }
}
</script>
```

### 场景 3: 组织架构管理

```vue
<template>
  <NCard title="组织架构">
    <C_Tree 
      mode="org"
      :data="orgTreeData"
      :icon-config="orgIconConfig"
      :status-configs="orgStatusConfigs"
      :actions="orgActions"
      @node-action="handleOrgAction"
    />
  </NCard>
</template>

<script setup>
const orgTreeData = ref([
  {
    id: 'company',
    name: '公司总部',
    type: 'company',
    memberCount: 256,
    status: 'active',
    children: [
      {
        id: 'tech-dept',
        name: '技术部',
        type: 'department',
        memberCount: 45,
        status: 'active',
        children: [
          {
            id: 'frontend-team',
            name: '前端组',
            type: 'team',
            memberCount: 12,
            status: 'active'
          },
          {
            id: 'backend-team',
            name: '后端组',
            type: 'team',
            memberCount: 18,
            status: 'active'
          }
        ]
      },
      {
        id: 'hr-dept',
        name: '人事部',
        type: 'department',
        memberCount: 8,
        status: 'active'
      }
    ]
  }
])

const orgIconConfig = {
  default: 'mdi:domain',
  typeMap: {
    company: 'mdi:domain',
    department: 'mdi:office-building',
    team: 'mdi:account-group',
    user: 'mdi:account'
  },
  colorMap: {
    company: '#e74c3c',
    department: '#3498db',
    team: '#f39c12',
    user: '#27ae60'
  }
}

const orgStatusConfigs = [
  {
    field: 'memberCount',
    values: {
      0: { text: '空部门', type: 'warning' }
    }
  }
]

const orgActions = [
  {
    key: 'add-dept',
    text: '新增下级部门',
    icon: 'mdi:plus',
    type: 'primary',
    show: (node) => ['company', 'department'].includes(node.type)
  },
  {
    key: 'add-user',
    text: '添加成员',
    icon: 'mdi:account-plus',
    type: 'info'
  },
  {
    key: 'edit',
    text: '编辑',
    icon: 'mdi:pencil',
    type: 'warning'
  },
  {
    key: 'delete',
    text: '删除',
    icon: 'mdi:delete',
    type: 'error',
    confirm: '确认删除该组织吗？',
    show: (node) => node.type !== 'company'
  }
]
</script>
```

### 场景 4: 自定义配置

```vue
<template>
  <C_Tree 
    mode="custom"
    :data="customTreeData"
    :icon-config="customIconConfig"
    :actions="customActions"
    :status-configs="customStatusConfigs"
    :draggable="true"
    @node-drop="handleNodeDrop"
  />
</template>

<script setup>
const customTreeData = ref([
  {
    id: 'project-1',
    name: '项目 Alpha',
    type: 'project',
    priority: 'high',
    progress: 75,
    status: 'in-progress',
    children: [
      {
        id: 'task-1',
        name: '需求分析',
        type: 'task',
        priority: 'medium',
        progress: 100,
        status: 'completed'
      },
      {
        id: 'task-2',
        name: '系统设计',
        type: 'task',
        priority: 'high',
        progress: 60,
        status: 'in-progress'
      }
    ]
  }
])

const customIconConfig = {
  default: 'mdi:circle-outline',
  typeMap: {
    project: 'mdi:folder-multiple',
    task: 'mdi:clipboard-text',
    milestone: 'mdi:flag'
  },
  colorMap: {
    project: '#9b59b6',
    task: '#3498db',
    milestone: '#e74c3c'
  }
}

const customStatusConfigs = [
  {
    field: 'status',
    values: {
      'not-started': { text: '未开始', type: 'default' },
      'in-progress': { text: '进行中', type: 'info' },
      'completed': { text: '已完成', type: 'success' },
      'cancelled': { text: '已取消', type: 'error' }
    }
  },
  {
    field: 'priority',
    values: {
      'low': { text: '低', type: 'default' },
      'medium': { text: '中', type: 'warning' },
      'high': { text: '高', type: 'error' }
    }
  }
]

const customActions = [
  {
    key: 'view',
    text: '查看详情',
    icon: 'mdi:eye',
    type: 'info'
  },
  {
    key: 'edit',
    text: '编辑',
    icon: 'mdi:pencil',
    type: 'primary'
  },
  {
    key: 'clone',
    text: '克隆',
    icon: 'mdi:content-copy',
    type: 'default'
  },
  {
    key: 'delete',
    text: '删除',
    icon: 'mdi:delete',
    type: 'error',
    confirm: '确认删除该项目吗？'
  }
]

// 处理拖拽
const handleNodeDrop = (dropInfo) => {
  console.log('节点拖拽:', dropInfo)
  // 更新树形数据
  updateTreeStructure(dropInfo)
}
</script>
```

## 🎨 样式定制

### 自定义树形样式

```scss
// 自定义树形容器
.c-tree {
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  overflow: hidden;
  
  // 工具栏样式
  .c-tree-toolbar {
    padding: 12px 16px;
    background: #fafafa;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .toolbar-left {
      flex: 1;
      
      .search-input {
        max-width: 300px;
      }
    }
    
    .toolbar-right {
      display: flex;
      gap: 8px;
    }
  }
  
  // 树形实例样式
  .c-tree-container {
    padding: 8px;
    min-height: 400px;
    
    .tree-instance {
      // 节点悬停显示操作按钮
      :deep(.n-tree-node) {
        &:hover {
          .tree-actions {
            opacity: 1 !important;
          }
        }
      }
      
      // 自定义节点样式
      :deep(.n-tree-node-content) {
        padding: 4px 8px;
        border-radius: 4px;
        transition: background-color 0.2s;
        
        &:hover {
          background-color: #f5f7fa;
        }
      }
      
      // 选中状态
      :deep(.n-tree-node--selected) {
        .n-tree-node-content {
          background-color: #e6f7ff;
          border: 1px solid #91d5ff;
        }
      }
    }
  }
}

// 暗色主题适配
.dark {
  .c-tree {
    border-color: #333;
    
    .c-tree-toolbar {
      background: #2a2a2a;
      border-bottom-color: #333;
    }
    
    .tree-instance {
      :deep(.n-tree-node-content) {
        &:hover {
          background-color: #2a2a2a;
        }
      }
      
      :deep(.n-tree-node--selected) {
        .n-tree-node-content {
          background-color: #1a3a5c;
          border-color: #4080ff;
        }
      }
    }
  }
}
```

### 自定义图标样式

```scss
// 自定义节点图标
.node-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  
  // 不同类型的图标样式
  &.icon-folder {
    color: #f39c12;
  }
  
  &.icon-file {
    color: #3498db;
  }
  
  &.icon-image {
    color: #e74c3c;
  }
}

// 状态标签样式
.status-tag {
  margin-left: 8px;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
}
```

## ⚙️ 高级用法

### 异步加载节点

```vue
<script setup>
const loadNodeData = async (node) => {
  const response = await api.getChildNodes(node.id)
  
  // 更新节点的子节点
  node.children = response.data
  
  // 触发树形组件更新
  nextTick(() => {
    treeRef.value?.expandNode(node.id)
  })
}

// 懒加载配置
const lazyLoadConfig = {
  load: loadNodeData,
  isLeaf: (node) => node.type === 'file'
}
</script>
```

### 虚拟滚动

```vue
<template>
  <!-- 大数据量时启用虚拟滚动 -->
  <C_Tree 
    :data="bigTreeData"
    :virtual="true"
    :virtual-height="400"
  />
</template>

<script setup>
// 生成大量数据
const generateBigData = (count = 10000) => {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push({
      id: `node-${i}`,
      name: `节点 ${i}`,
      type: 'item'
    })
  }
  return result
}

const bigTreeData = ref(generateBigData())
</script>
```

### 批量操作

```vue
<template>
  <div class="batch-operations">
    <div class="batch-toolbar">
      <NCheckbox 
        v-model:checked="selectAll"
        @update:checked="handleSelectAll"
      >
        全选
      </NCheckbox>
      
      <NButton 
        v-if="selectedNodes.length > 0"
        type="error"
        @click="batchDelete"
      >
        批量删除 ({{ selectedNodes.length }})
      </NButton>
    </div>
    
    <C_Tree 
      :data="treeData"
      :selectable="true"
      :multiple="true"
      @node-select="handleBatchSelect"
    />
  </div>
</template>

<script setup>
const selectedNodes = ref([])
const selectAll = ref(false)

const handleBatchSelect = (nodes, keys) => {
  selectedNodes.value = nodes
}

const batchDelete = async () => {
  if (selectedNodes.value.length === 0) return
  
  try {
    const ids = selectedNodes.value.map(node => node.id)
    await api.batchDeleteNodes(ids)
    
    // 刷新树形数据
    await refreshTreeData()
    selectedNodes.value = []
    
    message.success(`成功删除 ${ids.length} 个节点`)
  } catch (error) {
    message.error('批量删除失败')
  }
}
</script>
```

## 🐛 常见问题

### Q1: 树形数据不更新？

**A1:** 确保数据是响应式的：

```javascript
// ✅ 正确
const treeData = ref([...])

// ❌ 错误
const treeData = [...]
```

### Q2: 节点操作按钮不显示？

**A2:** 检查 actions 配置和 show 条件：

```javascript
const actions = [
  {
    key: 'edit',
    text: '编辑',
    icon: 'mdi:pencil',
    show: (node) => node.editable !== false // 显示条件
  }
]
```

### Q3: 自定义图标不生效？

**A3:** 确保图标库已正确引入：

```vue
<!-- 确保图标类名正确 -->
<script setup>
const iconConfig = {
  typeMap: {
    folder: 'mdi:folder', // 正确的图标类名
    file: 'mdi:file-document'
  }
}
</script>
```

### Q4: 搜索功能无效？

**A4:** 检查搜索字段配置：

```vue
<C_Tree 
  :data="treeData"
  searchable
  label-field="name" // 确保搜索字段正确
  :search-pattern="searchKeyword"
/>
```

## 🎯 最佳实践

### 1. 数据结构设计

```javascript
// 推荐的树形数据结构
const createTreeNode = (id, name, type, options = {}) => ({
  id,
  name,
  type,
  children: [],
  disabled: false,
  ...options
})

// 扁平数据转树形
const flatToTree = (flatData, parentId = null) => {
  return flatData
    .filter(item => item.parentId === parentId)
    .map(item => ({
      ...item,
      children: flatToTree(flatData, item.id)
    }))
}
```

### 2. 性能优化

```javascript
// 使用 shallowRef 优化大数据
import { shallowRef } from 'vue'

const treeData = shallowRef([...])

// 防抖搜索
import { debounce } from 'lodash-es'

const debouncedSearch = debounce((keyword) => {
  searchKeyword.value = keyword
}, 300)
```

### 3. 状态管理

```javascript
// 使用 Pinia 管理树形状态
export const useTreeStore = defineStore('tree', {
  state: () => ({
    treeData: [],
    expandedKeys: [],
    selectedKeys: [],
    searchKeyword: ''
  }),
  
  actions: {
    updateTreeData(data) {
      this.treeData = data
    },
    
    expandNode(key) {
      if (!this.expandedKeys.includes(key)) {
        this.expandedKeys.push(key)
      }
    },
    
    selectNode(key) {
      this.selectedKeys = [key]
    }
  }
})
```

### 4. 无障碍支持

```vue
<template>
  <div
    role="tree" 
    :aria-label="treeLabel"
    :aria-expanded="isExpanded"
  >
    <C_Tree 
      :data="treeData"
      @keydown="handleKeydown"
    />
  </div>
</template>

<script setup>
// 键盘导航支持
const handleKeydown = (event) => {
  switch (event.key) {
    case 'ArrowUp':
      selectPreviousNode()
      break
    case 'ArrowDown':
      selectNextNode()
      break
    case 'ArrowLeft':
      collapseNode()
      break
    case 'ArrowRight':
      expandNode()
      break
  }
}
</script>
```

## 📝 更新日志

### v1.0.0 (2025-08-11)

- ✨ 初始版本发布
- ✨ 支持菜单、文件、组织架构三种预设模式
- ✨ 内置搜索、工具栏、操作按钮功能
- ✨ 灵活的图标和状态配置
- ✨ 完整的事件系统和方法暴露
- ✨ 拖拽排序支持

### v1.1.0 (计划中)

- 🔄 异步节点加载
- 🔄 虚拟滚动优化
- 🔄 批量操作增强
- 🔄 更多预设模式

## 🤝 贡献指南

组件位置：`src/components/global/C_Tree/index.vue`

如需扩展功能，请考虑：
1. 保持配置的一致性和可扩展性
2. 确保预设模式的完整性
3. 维护良好的性能表现
4. 更新相关类型定义和文档

## 📄 许可证

Copyright (c) 2025 by ChenYu, All Rights Reserved 😎

---

**💡 提示**: 树形组件提供了丰富的预设模式和灵活的自定义配置，适用于菜单管理、文件浏览、组织架构等多种场景。组件内置了完整的工具栏和操作系统，可以快速构建功能完善的树形界面。建议根据具体业务场景选择合适的预设模式，并通过自定义配置满足特殊需求。