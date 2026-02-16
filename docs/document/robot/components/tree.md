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

## 🏗️ 架构

组件采用 **薄 UI 壳 + 厚 Composable 引擎** 架构：

| 文件                   | 职责                                 | 行数 |
| ---------------------- | ------------------------------------ | ---- |
| `index.vue`            | 模板渲染 + props/emits 声明          | ~168 |
| `data.ts`              | 预设模式配置（menu/file/org/custom） | ~95  |
| `useTreeOperations.ts` | 展开/选中/渲染/事件处理              | ~250 |
| `tree.d.ts`            | 类型定义                             | ~121 |
| `index.scss`           | 样式                                 | ~155 |

## 📦 安装

组件已全局注册，直接使用即可：

```vue
<template>
  <C_Tree :data="treeData" />
</template>
```

## 🎯 快速开始

### 基础用法

```vue {2-5}
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
          name: '二级节点 1',
        },
        {
          id: '1-2',
          name: '二级节点 2',
        },
      ],
    },
  ]

  const handleNodeSelect = (node, selectedKeys) => {
    console.log('选中节点:', node)
  }
</script>
```

### 菜单模式

```vue {2-7}
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
      icon: 'mdi:view-dashboard',
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
          icon: 'mdi:account-multiple',
        },
      ],
    },
  ]
</script>
```

### 文件模式

```vue {2-6}
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
          type: 'file',
        },
        {
          id: 'images',
          name: '图片',
          type: 'folder',
          children: [
            {
              id: 'logo',
              name: 'logo.png',
              type: 'image',
            },
          ],
        },
      ],
    },
  ]
</script>
```

## 📖 API 文档

### Props

| 参数                    | 类型                                    | 默认值                                                         | 说明                                         |
| ----------------------- | --------------------------------------- | -------------------------------------------------------------- | -------------------------------------------- |
| **data**                | `TreeNodeData[]`                        | `[]`                                                           | 树形数据                                     |
| **mode**                | `'menu' \| 'file' \| 'org' \| 'custom'` | `'custom'`                                                     | 树形模式，内置预设配置                       |
| **keyField**            | `string`                                | `'id'`                                                         | 节点唯一标识字段                             |
| **labelField**          | `string`                                | `'name'`                                                       | 节点标签字段                                 |
| **childrenField**       | `string`                                | `'children'`                                                   | 子节点字段                                   |
| **searchable**          | `boolean`                               | `true`                                                         | 是否可搜索                                   |
| **searchPattern**       | `string`                                | `''`                                                           | 搜索关键词（外部传入优先）                   |
| **searchPlaceholder**   | `string`                                | `'搜索...'`                                                    | 搜索框占位符                                 |
| **draggable**           | `boolean`                               | `false`                                                        | 是否可拖拽                                   |
| **showLine**            | `boolean`                               | `true`                                                         | 是否显示连接线                               |
| **showToolbar**         | `boolean`                               | `true`                                                         | 是否显示工具栏                               |
| **addable**             | `boolean`                               | `true`                                                         | 是否显示新增按钮                             |
| **addText**             | `string`                                | `'新增'`                                                       | 新增按钮文本                                 |
| **refreshable**         | `boolean`                               | `true`                                                         | 是否显示刷新按钮                             |
| **iconField**           | `string`                                | `'icon'`                                                       | 图标字段名                                   |
| **iconConfig**          | `IconConfig`                            | `{ default: 'mdi:circle-outline', typeMap: {}, colorMap: {} }` | 图标配置                                     |
| **statusConfigs**       | `StatusConfig[]`                        | `[]`                                                           | 状态配置                                     |
| **actions**             | `ActionConfig[]`                        | `[]`                                                           | 操作按钮配置（为空时使用预设模式的默认操作） |
| **defaultExpandAll**    | `boolean`                               | `false`                                                        | 是否默认展开所有节点                         |
| **defaultExpandedKeys** | `(string \| number)[]`                  | `[]`                                                           | 默认展开的节点                               |
| **defaultSelectedKeys** | `(string \| number)[]`                  | `[]`                                                           | 默认选中的节点                               |

### Events

| 事件名          | 参数                                                               | 说明                                                     |
| --------------- | ------------------------------------------------------------------ | -------------------------------------------------------- |
| **node-select** | `(node: TreeNodeData \| null, selectedKeys: (string \| number)[])` | 节点选择时触发                                           |
| **node-action** | `(action: string, node: TreeNodeData)`                             | 节点操作时触发                                           |
| **node-drop**   | `(info: DropInfo)`                                                 | 节点拖拽时触发                                           |
| **add**         | `(parentNode?: TreeNodeData)`                                      | 点击新增时触发（工具栏新增无参数，节点操作新增带父节点） |
| **refresh**     | -                                                                  | 点击刷新时触发                                           |

### Slots

| 插槽名              | 说明                     |
| ------------------- | ------------------------ |
| **toolbar-actions** | 自定义工具栏右侧操作按钮 |

### 数据结构

#### TreeNodeData

```typescript
interface TreeNodeData {
  id: string | number // 节点唯一标识（由 keyField 指定）
  name: string // 节点名称（由 labelField 指定）
  children?: TreeNodeData[] // 子节点（由 childrenField 指定）
  type?: string // 节点类型（用于图标映射）
  icon?: string // 自定义图标（优先于 typeMap）
  disabled?: boolean // 是否禁用
  [key: string]: any // 其他自定义字段
}
```

#### IconConfig

```typescript
interface IconConfig {
  default?: string // 默认图标
  typeMap?: Record<string, string> // 类型 → 图标映射
  colorMap?: Record<string, string> // 类型 → 颜色映射
}
```

#### ActionConfig

```typescript
interface ActionConfig {
  key: string // 操作标识
  text: string // 操作文本（也作为 icon title）
  icon: string // 操作图标
  type?: 'primary' | 'info' | 'success' | 'warning' | 'error' | 'default'
  confirm?: string // 确认对话框文本（设置后点击先弹确认）
  show?: (node: TreeNodeData) => boolean // 显示条件
}
```

#### StatusConfig

```typescript
interface StatusConfig {
  field: string // 状态字段名
  values: Record<
    string | number,
    {
      text: string // 显示文本
      type: 'success' | 'warning' | 'error' | 'info'
    }
  >
}
```

#### DropInfo

```typescript
interface DropInfo {
  node: TreeOption
  dragNode: TreeOption
  dropPosition: 'before' | 'inside' | 'after'
  event: DragEvent
}
```

### 组件方法 (Expose)

通过 ref 调用：

| 方法名              | 参数                    | 返回值                      | 说明                        |
| ------------------- | ----------------------- | --------------------------- | --------------------------- |
| **expandAll**       | -                       | `void`                      | 展开所有节点                |
| **collapseAll**     | -                       | `void`                      | 收起所有节点                |
| **selectNode**      | `key: string \| number` | `void`                      | 选中指定节点                |
| **getSelectedNode** | -                       | `TreeNodeData \| null`      | 获取当前选中节点            |
| **expandedKeys**    | -                       | `Ref<(string \| number)[]>` | 展开节点 key 数组（可读写） |
| **selectedKeys**    | -                       | `Ref<(string \| number)[]>` | 选中节点 key 数组（可读写） |

```typescript
const treeRef = ref()

// 展开所有
treeRef.value.expandAll()

// 选中指定节点
treeRef.value.selectNode('node-1')

// 获取选中节点
const node = treeRef.value.getSelectedNode()

// 直接访问展开/选中状态
console.log(treeRef.value.expandedKeys)
console.log(treeRef.value.selectedKeys)
```

## 🎨 使用示例

::: details 📋 场景 1: 系统菜单管理

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
      sort: 1,
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
          sort: 1,
        },
        {
          id: 'role-management',
          name: '角色管理',
          type: 'menu',
          icon: 'mdi:account-key',
          status: 'disabled',
          sort: 2,
        },
      ],
    },
  ])

  // 菜单图标配置（会与 menu 预设合并）
  const menuIconConfig = {
    default: 'mdi:file-document',
    typeMap: {
      directory: 'mdi:folder',
      menu: 'mdi:file-document',
      button: 'mdi:button-cursor',
    },
    colorMap: {
      directory: '#f39c12',
      menu: '#3498db',
      button: '#e74c3c',
    },
  }

  // 菜单状态配置
  const menuStatusConfigs = [
    {
      field: 'status',
      values: {
        active: { text: '启用', type: 'success' },
        disabled: { text: '禁用', type: 'error' },
        draft: { text: '草稿', type: 'warning' },
      },
    },
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
  const handleAddMenu = parentNode => {
    openMenuDialog(null, parentNode)
  }
</script>
```

:::

::: details 📁 场景 2: 文件目录浏览

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
    <div
      v-if="selectedFile"
      class="file-preview"
    >
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
            { id: 'components', name: 'components', type: 'folder' },
            { id: 'main-js', name: 'main.js', type: 'file', size: '2.1KB' },
          ],
        },
        {
          id: 'package-json',
          name: 'package.json',
          type: 'file',
          size: '1.5KB',
        },
      ],
    },
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
      pdf: 'mdi:file-pdf-box',
    },
    colorMap: {
      folder: '#f39c12',
      image: '#e74c3c',
      video: '#9b59b6',
      audio: '#1abc9c',
    },
  }

  // 自定义文件操作（覆盖 file 预设的默认操作）
  const fileActions = [
    {
      key: 'open',
      text: '打开',
      icon: 'mdi:folder-open',
      type: 'primary',
      show: node => node.type === 'folder',
    },
    {
      key: 'download',
      text: '下载',
      icon: 'mdi:download',
      type: 'info',
      show: node => node.type === 'file',
    },
    {
      key: 'rename',
      text: '重命名',
      icon: 'mdi:rename-box',
      type: 'warning',
    },
    {
      key: 'delete',
      text: '删除',
      icon: 'mdi:delete',
      type: 'error',
      confirm: '确认删除该文件吗？',
    },
  ]

  const handleFileSelect = node => {
    selectedFile.value = node
  }

  const handleFileAction = (action, node) => {
    switch (action) {
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

:::

::: details 🏢 场景 3: 组织架构管理

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
            },
            {
              id: 'backend-team',
              name: '后端组',
              type: 'team',
              memberCount: 18,
            },
          ],
        },
        { id: 'hr-dept', name: '人事部', type: 'department', memberCount: 8 },
      ],
    },
  ])

  const orgIconConfig = {
    default: 'mdi:domain',
    typeMap: {
      company: 'mdi:domain',
      department: 'mdi:office-building',
      team: 'mdi:account-group',
      user: 'mdi:account',
    },
    colorMap: {
      company: '#e74c3c',
      department: '#3498db',
      team: '#f39c12',
      user: '#27ae60',
    },
  }

  const orgStatusConfigs = [
    {
      field: 'memberCount',
      values: {
        0: { text: '空部门', type: 'warning' },
      },
    },
  ]

  const orgActions = [
    {
      key: 'add',
      text: '新增下级部门',
      icon: 'mdi:plus',
      type: 'primary',
      show: node => ['company', 'department'].includes(node.type),
    },
    {
      key: 'add-user',
      text: '添加成员',
      icon: 'mdi:account-plus',
      type: 'info',
    },
    {
      key: 'edit',
      text: '编辑',
      icon: 'mdi:pencil',
      type: 'warning',
    },
    {
      key: 'delete',
      text: '删除',
      icon: 'mdi:delete',
      type: 'error',
      confirm: '确认删除该组织吗？',
      show: node => node.type !== 'company',
    },
  ]
</script>
```

:::

::: details 🎨 场景 4: 自定义配置

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
      status: 'in-progress',
      children: [
        { id: 'task-1', name: '需求分析', type: 'task', status: 'completed' },
        { id: 'task-2', name: '系统设计', type: 'task', status: 'in-progress' },
      ],
    },
  ])

  const customIconConfig = {
    default: 'mdi:circle-outline',
    typeMap: {
      project: 'mdi:folder-multiple',
      task: 'mdi:clipboard-text',
      milestone: 'mdi:flag',
    },
    colorMap: {
      project: '#9b59b6',
      task: '#3498db',
      milestone: '#e74c3c',
    },
  }

  const customStatusConfigs = [
    {
      field: 'status',
      values: {
        'not-started': { text: '未开始', type: 'default' },
        'in-progress': { text: '进行中', type: 'info' },
        completed: { text: '已完成', type: 'success' },
        cancelled: { text: '已取消', type: 'error' },
      },
    },
    {
      field: 'priority',
      values: {
        low: { text: '低', type: 'default' },
        medium: { text: '中', type: 'warning' },
        high: { text: '高', type: 'error' },
      },
    },
  ]

  const customActions = [
    { key: 'view', text: '查看详情', icon: 'mdi:eye', type: 'info' },
    { key: 'edit', text: '编辑', icon: 'mdi:pencil', type: 'primary' },
    { key: 'clone', text: '克隆', icon: 'mdi:content-copy', type: 'default' },
    {
      key: 'delete',
      text: '删除',
      icon: 'mdi:delete',
      type: 'error',
      confirm: '确认删除该项目吗？',
    },
  ]

  const handleNodeDrop = dropInfo => {
    console.log('节点拖拽:', dropInfo)
  }
</script>
```

:::

## 🎨 样式定制

::: details 🎨 自定义树形样式

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
    }
  }
}
```

:::

## 🐛 常见问题

::: details ❓ Q1: 树形数据不更新？

**A1:** 确保数据是响应式的：

```javascript
// ✅ 正确
const treeData = ref([...])

// ❌ 错误
const treeData = [...]
```

:::

::: details ❓ Q2: 节点操作按钮不显示？

**A2:** 检查 actions 配置和 show 条件。操作按钮默认 `opacity: 0`，悬停时显示。如果 `actions` 属性为空数组，将使用预设模式的默认操作（`custom` 模式无默认操作）。

```javascript
const actions = [
  {
    key: 'edit',
    text: '编辑',
    icon: 'mdi:pencil',
    show: node => node.editable !== false,
  },
]
```

:::

::: details ❓ Q3: 自定义图标不生效？

**A3:** 图标优先级：节点自身 `icon` 字段 > `iconConfig.typeMap` > `iconConfig.default`

```javascript
const iconConfig = {
  default: 'mdi:circle-outline', // 兜底图标
  typeMap: {
    folder: 'mdi:folder', // 按 type 映射
    file: 'mdi:file-document',
  },
}
```

:::

::: details ❓ Q4: 搜索功能无效？

**A4:** 可以通过外部 `searchPattern` 传入搜索关键词，也可以使用内置搜索框。外部传入优先于内部搜索框。

```vue
<C_Tree :data="treeData" searchable :search-pattern="externalKeyword" />
```

:::

## 🎯 最佳实践

### 1. 数据结构设计

```javascript
// 扁平数据转树形
const flatToTree = (flatData, parentId = null) => {
  return flatData
    .filter(item => item.parentId === parentId)
    .map(item => ({
      ...item,
      children: flatToTree(flatData, item.id),
    }))
}
```

### 2. 性能优化

```javascript
// 使用 shallowRef 优化大数据
import { shallowRef } from 'vue'

const treeData = shallowRef([...])
```

### 3. 预设模式 + 自定义叠加

```vue
<!-- mode 预设提供默认 actions/iconConfig，传入 props 会与预设合并 -->
<C_Tree
  mode="menu"
  :data="menuData"
  :icon-config="{ colorMap: { directory: '#f39c12' } }"
/>
<!-- iconConfig.typeMap 使用 menu 预设的默认值，colorMap 使用自定义值 -->
```

## 📝 更新日志

### v2.0.0 (2026-02-17)

- ♻️ 重构为薄 UI 壳 + `useTreeOperations` composable 架构
- ♻️ 提取预设模式配置到 `data.ts`
- ♻️ 所有类型定义迁移到 `types/modules/tree.d.ts`
- ✨ 暴露 `expandedKeys` / `selectedKeys` 响应式引用
- ✨ 新增 `toolbar-actions` 插槽

### v1.0.0 (2025-07-28)

- ✨ 初始版本发布
- ✨ 支持菜单、文件、组织架构三种预设模式
- ✨ 内置搜索、工具栏、操作按钮功能
- ✨ 灵活的图标和状态配置
- ✨ 拖拽排序支持

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 树形组件提供了丰富的预设模式和灵活的自定义配置，适用于菜单管理、文件浏览、组织架构等多种场景。选择合适的 `mode` 预设可以获得开箱即用的图标和操作按钮，同时支持通过 props 覆盖预设配置。
