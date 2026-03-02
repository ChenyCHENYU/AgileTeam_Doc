---
outline: 'deep'
---

# C_WorkFlow 工作流设计器组件

> 🔄 基于 Vue Flow 的可视化工作流设计器，让审批流程设计变得简单而直观

## 🚀 在线演示

<DemoIframe src="/preview/workflow" title="工作流设计" height="800" />


## ✨ 特性

- **🎨 可视化设计**: 基于 Vue Flow 的拖拽式流程设计，所见即所得
- **🔧 多种节点类型**: 支持开始、审批、抄送、条件分支等节点类型
- **👥 灵活的审批模式**: 支持或签、会签、顺序审批等多种审批策略
- **✅ 智能验证**: 内置 `useWorkflowValidation` 验证引擎，实时检查配置完整性
- **👁️ 流程预览**: 内置 `useWorkflowPreview` 拓扑排序 + 时间线步骤展示，一键查看完整流程
- **📋 场景模板**: 预置多种业务场景模板，快速构建标准流程
- **🔄 双向绑定**: 完整的数据双向绑定，支持动态更新
- **🏗️ Composable 架构**: 薄 UI 壳 + 厚 Composable 引擎，节点管理与验证逻辑分离
- **💪 TypeScript**: 完整的类型定义和类型安全
- **⚡ 高性能**: 优化的渲染机制和操作响应
- **🔌 高度可扩展**: 支持自定义节点类型和业务逻辑

## 📦 安装

::: code-group

```bash [bun (推荐)]
# 安装 Vue Flow 相关依赖
bun add @vue-flow/core @vue-flow/controls @vue-flow/minimap @vue-flow/background
```

```bash [pnpm]
# 安装 Vue Flow 相关依赖
pnpm install @vue-flow/core @vue-flow/controls @vue-flow/minimap @vue-flow/background
```

```bash [yarn]
# 安装 Vue Flow 相关依赖
yarn add @vue-flow/core @vue-flow/controls @vue-flow/minimap @vue-flow/background
```

```bash [npm]
# 安装 Vue Flow 相关依赖
npm install @vue-flow/core @vue-flow/controls @vue-flow/minimap @vue-flow/background
```

:::

## 🎯 快速开始

### 基础用法

```vue {3-9}
<template>
  <!-- 最简单的工作流设计器 -->
  <C_WorkFlow
    v-model="workflowData"
    :users="userList"
    :departments="deptList"
    @change="handleWorkflowChange"
    @save="handleWorkflowSave"
  />
</template>

<script setup>
  const workflowData = ref({
    nodes: [
      {
        id: 'start-1',
        type: 'start',
        position: { x: 150, y: 100 },
        data: {
          title: '发起人',
          status: 'active',
          initiators: [],
        },
      },
    ],
    edges: [],
    config: {
      version: '1.0',
      createdAt: new Date().toISOString(),
    },
  })

  const userList = ref([
    { id: '1', name: '张三', avatar: '', department: '技术部', role: '开发' },
    { id: '2', name: '李四', avatar: '', department: '产品部', role: '经理' },
  ])

  const deptList = ref([
    { id: 'tech', name: '技术部' },
    { id: 'product', name: '产品部' },
  ])

  const handleWorkflowChange = data => {
    console.log('工作流变更:', data)
  }

  const handleWorkflowSave = data => {
    console.log('工作流保存:', data)
  }
</script>
```

::: details 🎛️ 完整功能示例 - 带控制面板的演示

```vue
<template>
  <div class="workflow-designer">
    <!-- 工具栏 -->
    <div class="toolbar">
      <n-space align="center">
        <n-button
          type="primary"
          @click="saveWorkflow"
        >
          <template #icon>
            <i class="i-mdi:content-save"></i>
          </template>
          保存流程
        </n-button>

        <n-button @click="validateWorkflow">
          <template #icon>
            <i class="i-mdi:check-circle"></i>
          </template>
          验证流程
        </n-button>

        <n-button @click="exportWorkflow">
          <template #icon>
            <i class="i-mdi:download"></i>
          </template>
          导出流程
        </n-button>

        <n-dropdown
          :options="templateOptions"
          @select="loadTemplate"
        >
          <n-button>
            <template #icon>
              <i class="i-mdi:file-document-outline"></i>
            </template>
            加载模板
          </n-button>
        </n-dropdown>

        <n-button
          type="error"
          @click="clearWorkflow"
        >
          <template #icon>
            <i class="i-mdi:delete-sweep"></i>
          </template>
          清空画布
        </n-button>
      </n-space>
    </div>

    <!-- 工作流设计器 -->
    <div class="designer-container">
      <C_WorkFlow
        ref="workflowRef"
        v-model="workflowData"
        :users="userList"
        :roles="roleList"
        :departments="deptList"
        :readonly="designerConfig.readonly"
        :theme="designerConfig.theme"
        @change="handleWorkflowChange"
        @save="handleWorkflowSave"
        @node-click="handleNodeClick"
        @validate-error="handleValidateError"
        class="workflow-canvas"
      />
    </div>

    <!-- 侧边栏 -->
    <div class="sidebar">
      <!-- 流程统计 -->
      <n-card
        title="流程统计"
        size="small"
        class="mb-16px"
      >
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">{{ workflowStats.totalNodes }}</div>
            <div class="stat-label">总节点</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ workflowStats.approvalNodes }}</div>
            <div class="stat-label">审批节点</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ workflowStats.copyNodes }}</div>
            <div class="stat-label">抄送节点</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ workflowStats.conditionNodes }}</div>
            <div class="stat-label">条件节点</div>
          </div>
        </div>
      </n-card>

      <!-- 配置面板 -->
      <n-card
        title="设计器设置"
        size="small"
      >
        <n-space vertical>
          <div class="config-item">
            <n-switch v-model:value="designerConfig.readonly">
              <template #checked>只读模式</template>
              <template #unchecked>编辑模式</template>
            </n-switch>
          </div>
          <div class="config-item">
            <n-switch v-model:value="designerConfig.autoValidate">
              <template #checked>自动验证</template>
              <template #unchecked>手动验证</template>
            </n-switch>
          </div>
        </n-space>
      </n-card>
    </div>
  </div>
</template>

<script setup>
  const workflowRef = ref()
  const message = useMessage()

  const workflowData = ref({
    nodes: [
      {
        id: 'start-1',
        type: 'start',
        position: { x: 150, y: 100 },
        data: { title: '发起人', status: 'active', initiators: [] },
      },
    ],
    edges: [],
    config: { version: '1.0', createdAt: new Date().toISOString() },
  })

  const userList = ref([
    { id: '1', name: '张三', department: '技术部', role: '高级开发工程师' },
    { id: '2', name: '李四', department: '产品部', role: '产品经理' },
  ])

  const roleList = ref([
    { id: 'dev', name: '开发工程师' },
    { id: 'pm', name: '产品经理' },
  ])

  const deptList = ref([
    { id: 'tech', name: '技术部' },
    { id: 'product', name: '产品部' },
  ])

  const designerConfig = reactive({
    readonly: false,
    autoValidate: true,
  })

  const templateOptions = [
    { label: '请假审批流程', key: 'leave_approval' },
    { label: '报销审批流程', key: 'expense_approval' },
  ]

  const workflowStats = computed(() => {
    const nodes = workflowData.value.nodes || []
    return {
      totalNodes: nodes.length,
      approvalNodes: nodes.filter(n => n.type === 'approval').length,
      copyNodes: nodes.filter(n => n.type === 'copy').length,
      conditionNodes: nodes.filter(n => n.type === 'condition').length,
    }
  })

  const handleWorkflowChange = data => {
    if (designerConfig.autoValidate) validateWorkflow()
  }

  const handleWorkflowSave = data => message.success('工作流保存成功')
  const handleNodeClick = node => message.info(`点击了节点: ${node.data.title}`)
  const handleValidateError = errors => console.log('验证错误:', errors)

  const saveWorkflow = () => workflowRef.value?.saveWorkflow()
  const validateWorkflow = () => {
    const errors = workflowRef.value?.validateWorkflow() || []
    if (errors.length === 0) message.success('验证通过')
    else message.error(`发现 ${errors.length} 个问题`)
  }
  const exportWorkflow = () => {
    const data = workflowRef.value?.getCurrentWorkflowData()
    if (!data) return
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `workflow-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
    message.success('导出成功')
  }
  const loadTemplate = key => message.info(`加载模板: ${key}`)
  const clearWorkflow = () => {
    workflowData.value = {
      nodes: [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 150, y: 100 },
          data: { title: '发起人', status: 'active', initiators: [] },
        },
      ],
      edges: [],
      config: { version: '1.0', createdAt: new Date().toISOString() },
    }
    message.success('画布已清空')
  }
</script>
```

:::

## 📖 API 文档

### Props

| 参数            | 类型                | 默认值    | 说明                   |
| --------------- | ------------------- | --------- | ---------------------- |
| **modelValue**  | `WorkflowData`      | `null`    | 工作流数据（双向绑定） |
| **users**       | `User[]`            | `[]`      | 用户列表               |
| **roles**       | `Role[]`            | `[]`      | 角色列表               |
| **departments** | `Department[]`      | `[]`      | 部门列表               |
| **readonly**    | `boolean`           | `false`   | 是否只读模式           |
| **theme**       | `'light' \| 'dark'` | `'light'` | 主题模式               |

### Events

| 事件名                | 参数                          | 说明                 |
| --------------------- | ----------------------------- | -------------------- |
| **update:modelValue** | `(data: WorkflowData)`        | 工作流数据更新时触发 |
| **change**            | `(data: WorkflowData)`        | 工作流数据变化时触发 |
| **save**              | `(data: WorkflowData)`        | 保存工作流时触发     |
| **node-click**        | `(node: WorkflowNode)`        | 节点点击时触发       |
| **validate-error**    | `(errors: ValidationError[])` | 验证出错时触发       |

### 暴露方法

| 方法名                     | 参数               | 返回值              | 说明               |
| -------------------------- | ------------------ | ------------------- | ------------------ |
| **validateWorkflow**       | `-`                | `ValidationError[]` | 验证工作流配置     |
| **getCurrentWorkflowData** | `-`                | `WorkflowData`      | 获取当前工作流数据 |
| **saveWorkflow**           | `-`                | `void`              | 保存工作流         |
| **previewWorkflow**        | `-`                | `void`              | 预览工作流         |
| **deleteNode**             | `(nodeId: string)` | `void`              | 删除指定节点       |
| **stats**                  | `-`                | `WorkflowStats`     | 获取工作流统计信息 |

## 🏗️ 架构设计

> **设计模式**：薄 UI 壳 + 厚 Composable 引擎

```
index.vue（~430 行 · 薄 UI 壳）
├── 模板（~320 行）
│   ├── 浮动工具栏
│   ├── VueFlow 画布
│   ├── 节点添加菜单（Teleport）
│   ├── NodeConfigModal 配置弹窗
│   ├── 验证错误抽屉
│   └── 流程预览抽屉
├── 脚本（~105 行）
│   ├── useWorkflowNodes()      ← 节点管理
│   ├── useWorkflowValidation() ← 流程验证
│   ├── useWorkflowPreview()    ← 流程预览
│   └── 编排方法（save/preview/clear）
└── 样式引用 → index.scss

composables/WorkFlow/
├── useWorkflowNodes.ts（~340 行）
│   ├── 节点 CRUD（add/delete/reconnect）
│   ├── provide('showAddMenu') / provide('deleteNode')
│   ├── 边重连逻辑（reconnectEdges）
│   ├── 画布操作（fitView/resetNodes）
│   ├── 节点交互（onNodeClick/handleConfigSave）
│   └── modelValue 双向同步
├── useWorkflowValidation.ts（~159 行）
│   ├── 审批节点验证（审批人必填）
│   ├── 条件节点验证（分支完整性）
│   ├── 断连节点检测
│   ├── 错误节点定位（jumpToErrorNode）
│   └── UI 文案映射（field/error type）
└── useWorkflowPreview.ts（~250 行）
    ├── BFS 拓扑排序（sortNodesByFlow）
    ├── 节点详情提取（extractNodeDetails）
    ├── 流程步骤构建（buildFlowSteps）
    ├── 统计概览（computeStats）
    └── 预览面板开关（openPreview/closePreview）

nodes/                       ← 4 个节点子组件
├── StartNode.vue（175 行）
├── ApprovalNode.vue（422 行）
├── CopyNode.vue（320 行）
└── ConditionNode.vue（337 行）

NodeConfigModal.vue（496 行） ← 节点配置弹窗（独立组件）
data.ts（~120 行）            ← 常量 + 工厂函数 + NODE_Y_GAP
```

### Composable 详解

#### `useWorkflowNodes`

节点管理引擎——封装节点 CRUD、边重连、provide/inject 和画布操作。

```ts
import { useWorkflowNodes } from '@/composables/WorkFlow/useWorkflowNodes'

const {
  // 状态
  nodes, // Ref<WorkflowNode[]> — 节点列表
  edges, // Ref<WorkflowEdge[]> — 边列表
  showAddMenu, // Ref<boolean> — 添加菜单显示状态
  menuPosition, // Ref<MenuPosition> — 菜单位置
  showNodeConfig, // Ref<boolean> — 配置弹窗显示状态
  currentNode, // Ref<WorkflowNode | null> — 当前选中节点
  // 计算属性
  nodeTypes, // 节点组件映射（start/approval/copy/condition）
  workflowStats, // 流程统计信息
  // 方法
  addNode, // 添加节点（自动插入 + 边重连）
  deleteNode, // 删除节点（自动边重连 + 位置调整）
  onNodeClick, // 节点点击处理
  closeAddMenu, // 关闭添加菜单
  handleConfigSave, // 保存节点配置
  resetNodes, // 重置画布
  getCurrentWorkflowData, // 获取完整数据
  fitView, // 适应画布窗口
} = useWorkflowNodes(props, emit, vueFlowRef)
```

**内部行为：**

- 调用 `provide('showAddMenu', ...)` 和 `provide('deleteNode', ...)`，子节点通过 `inject` 获取
- 自动 `watch(props.modelValue)` 同步外部数据
- `onMounted` 时自动执行 `fitView`
- 节点间距统一使用 `NODE_Y_GAP`（180px）常量，避免堆叠

#### `useWorkflowValidation`

流程验证引擎——封装校验规则、错误展示和节点定位。

```ts
import { useWorkflowValidation } from '@/composables/WorkFlow/useWorkflowValidation'

const {
  // 状态
  validationErrors, // Ref<ValidationError[]> — 验证错误列表
  showValidationErrors, // Ref<boolean> — 错误抽屉显示状态
  // 方法
  validateWorkflow, // 执行验证（纯逻辑，返回 ValidationError[]）
  validateCurrentWorkflow, // 执行验证 + 更新 UI（消息提示 + 抽屉）
  jumpToErrorNode, // 定位到错误节点（画布居中 + 打开配置弹窗）
  getFieldDisplayName, // 字段名 → 中文显示名
  getErrorTypeText, // 错误类型 → 中文文案
  resetValidation, // 重置验证状态
} = useWorkflowValidation(nodes, edges, vueFlowRef, {
  onShowNodeConfig: node => {
    /* 打开配置弹窗 */
  },
  onValidateError: errors => emit('validate-error', errors),
})
```

**验证规则：**
| 节点类型 | 规则 | 错误类型 |
|----------|------|----------|
| `approval` | `approvers.length > 0` | `required` |
| `condition` | `conditions.length > 0` | `required` |
| `condition` | 所有 condition 的 name/field/operator/value 必填 | `incomplete` |
| 非 `start` | 必须与其他节点连接 | `warning` |

#### `useWorkflowPreview`

流程预览引擎——封装拓扑排序、节点详情提取和步骤展示。

```ts
import { useWorkflowPreview } from '@/composables/WorkFlow/useWorkflowPreview'

const {
  // 状态
  showPreview, // Ref<boolean> — 预览抽屉显示状态
  previewSteps, // Ref<FlowStep[]> — 排序后的流程步骤
  previewStats, // Ref<PreviewStats> — 统计概览
  // 方法
  openPreview, // 打开预览面板（自动构建步骤 + 统计）
  closePreview, // 关闭预览面板
} = useWorkflowPreview(nodes, edges)
```

**核心能力：**
| 功能 | 说明 |
|------|------|
| BFS 拓扑排序 | 按流程连接顺序排列节点，孤立节点追加在末尾 |
| 节点详情提取 | 自动解析审批人、审批模式、条件分支等配置 |
| 统计概览 | 总节点/审批/抄送/条件/连线数量 |
| 可读文案 | 将 `approvalMode: 'any'` 转换为 “或签（任一审批人通过即可）” |

### 类型定义

::: details 📝 完整类型定义（types/work-flow.d.ts）

```typescript
// ── 基础类型 ──────────────────────────────────────────
interface User {
  id: string
  name: string
  avatar?: string
  department: string
  role: string
  email?: string
  phone?: string
}

interface Role {
  id: string
  name: string
  description?: string
  level?: number
}

interface Department {
  id: string
  name: string
  parentId?: string
  manager?: string
}

interface Condition {
  id: string
  name: string
  field: string
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains'
  value: string
}

// ── 节点类型 ──────────────────────────────────────────
type NodeType = 'start' | 'approval' | 'copy' | 'condition'
type NodeStatus = 'pending' | 'approved' | 'rejected' | 'active' | 'completed'
type ApprovalMode = 'any' | 'all' | 'sequence'

interface BaseNodeData {
  title: string
  status?: NodeStatus
  config?: Record<string, any>
  initiators?: User[]
}

interface ApprovalNodeData extends BaseNodeData {
  approvers?: User[]
  approvalMode?: ApprovalMode
}

interface CopyNodeData extends BaseNodeData {
  copyUsers?: User[]
}

interface ConditionNodeData extends BaseNodeData {
  conditions?: Condition[]
}

type NodeData =
  | StartNodeData
  | ApprovalNodeData
  | CopyNodeData
  | ConditionNodeData

// ── 工作流结构 ────────────────────────────────────────
interface WorkflowNode {
  id: string
  type: NodeType
  position: { x: number; y: number }
  data: NodeData
  selected?: boolean
  dragging?: boolean
}

interface WorkflowEdge {
  id: string
  source: string
  target: string
  animated?: boolean
  type?: string
}

interface WorkflowData {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  config?: {
    version?: string
    createdAt?: string
    updatedAt?: string
  }
}

// ── 验证 ──────────────────────────────────────────────
type ValidationErrorType =
  | 'required'
  | 'invalid'
  | 'incomplete'
  | 'warning'
  | 'error'
  | 'custom'

interface ValidationError {
  nodeId: string
  nodeName: string
  field: string
  message: string
  type: ValidationErrorType
  details?: string
  severity?: 'low' | 'medium' | 'high'
  fixSuggestion?: string
}

// ── 组件接口 ──────────────────────────────────────────
interface WorkflowProps {
  users?: User[]
  roles?: Role[]
  departments?: Department[]
  modelValue?: WorkflowData
  readonly?: boolean
  theme?: 'light' | 'dark'
}

interface WorkflowEmits {
  'update:modelValue': [value: WorkflowData]
  change: [value: WorkflowData]
  'node-click': [node: WorkflowNode]
  save: [data: WorkflowData]
  'validate-error': [errors: ValidationError[]]
}

interface MenuPosition {
  x: number
  y: number
}

interface WorkflowStats {
  totalNodes: number
  approvalNodes: number
  copyNodes: number
  conditionNodes: number
  totalEdges: number
  validationErrors: number
}
```

:::

## 🎨 使用示例

### 场景 1: 请假审批流程

::: details 📝 请假审批流程设计器

```vue
<template>
  <div class="leave-approval-workflow">
    <n-card title="请假审批流程设计">
      <div class="workflow-config mb-20px">
        <n-space>
          <n-select
            v-model:value="leaveConfig.type"
            :options="leaveTypeOptions"
            placeholder="请假类型"
            style="width: 150px"
          />
          <n-input-number
            v-model:value="leaveConfig.days"
            :min="0.5"
            :step="0.5"
            placeholder="天数"
            style="width: 120px"
          >
            <template #suffix>天</template>
          </n-input-number>
        </n-space>
      </div>

      <C_WorkFlow
        ref="leaveWorkflowRef"
        v-model="leaveWorkflowData"
        :users="hrUsers"
        :departments="departments"
        @change="handleLeaveWorkflowChange"
        @save="handleLeaveWorkflowSave"
      />

      <div class="mt-20px">
        <n-space>
          <n-button
            type="primary"
            @click="generateLeaveWorkflow"
          >
            自动生成流程
          </n-button>
          <n-button @click="deployLeaveWorkflow"> 部署流程 </n-button>
        </n-space>
      </div>
    </n-card>
  </div>
</template>

<script setup>
  const leaveWorkflowRef = ref()
  const message = useMessage()

  const leaveConfig = reactive({
    type: 'annual_leave',
    days: 1,
  })

  const leaveTypeOptions = [
    { label: '年假', value: 'annual_leave' },
    { label: '病假', value: 'sick_leave' },
    { label: '事假', value: 'personal_leave' },
  ]

  const leaveWorkflowData = ref({
    nodes: [
      {
        id: 'start-1',
        type: 'start',
        position: { x: 150, y: 100 },
        data: { title: '员工申请', status: 'active', initiators: [] },
      },
    ],
    edges: [],
    config: { version: '1.0', createdAt: new Date().toISOString() },
  })

  const hrUsers = ref([
    { id: 'manager1', name: '张经理', department: '技术部', role: '部门经理' },
    { id: 'hr1', name: '李HR', department: '人事部', role: 'HR专员' },
  ])

  const departments = ref([
    { id: 'tech', name: '技术部' },
    { id: 'hr', name: '人事部' },
  ])

  const generateLeaveWorkflow = () => {
    const nodes = [
      {
        id: 'start-1',
        type: 'start',
        position: { x: 150, y: 100 },
        data: { title: '员工申请', status: 'active', initiators: [] },
      },
      {
        id: 'approval-manager',
        type: 'approval',
        position: { x: 150, y: 220 },
        data: {
          title: '直属主管审批',
          status: 'pending',
          approvers: [hrUsers.value[0]],
          approvalMode: 'any',
        },
      },
    ]

    const edges = [
      {
        id: 'edge-start-manager',
        source: 'start-1',
        target: 'approval-manager',
        animated: true,
      },
    ]

    // 超过3天增加 HR 审批
    if (leaveConfig.days > 3) {
      nodes.push({
        id: 'approval-hr',
        type: 'approval',
        position: { x: 150, y: 340 },
        data: {
          title: 'HR 审批',
          status: 'pending',
          approvers: [hrUsers.value[1]],
          approvalMode: 'any',
        },
      })
      edges.push({
        id: 'edge-manager-hr',
        source: 'approval-manager',
        target: 'approval-hr',
        animated: true,
      })
    }

    leaveWorkflowData.value = {
      nodes,
      edges,
      config: { version: '1.0', createdAt: new Date().toISOString() },
    }
    message.success('已自动生成请假审批流程')
  }

  const handleLeaveWorkflowChange = data => console.log('请假流程变更:', data)
  const handleLeaveWorkflowSave = data =>
    message.success('请假审批流程保存成功')
  const deployLeaveWorkflow = () => {
    const errors = leaveWorkflowRef.value?.validateWorkflow() || []
    if (errors.length === 0) message.success('流程部署成功')
    else message.error('流程存在问题，无法部署')
  }

  watch(
    () => leaveConfig.days,
    () => generateLeaveWorkflow()
  )
  onMounted(() => generateLeaveWorkflow())
</script>
```

:::

### 场景 2: 报销审批流程（条件分支）

::: details 💰 报销审批流程 - 基于金额的条件分支

```vue
<template>
  <div class="expense-workflow">
    <n-card title="报销审批流程设计">
      <div class="expense-rules mb-20px">
        <n-input-group>
          <n-input-group-label>小额上限</n-input-group-label>
          <n-input-number
            v-model:value="expenseRules.smallAmount"
            :min="0"
            :step="100"
          />
          <n-input-group-label>元</n-input-group-label>
        </n-input-group>
      </div>

      <C_WorkFlow
        ref="expenseWorkflowRef"
        v-model="expenseWorkflowData"
        :users="financeUsers"
        :departments="departments"
      />
    </n-card>
  </div>
</template>

<script setup>
  const expenseWorkflowRef = ref()

  const expenseRules = reactive({ smallAmount: 1000 })

  const financeUsers = ref([
    { id: 'manager', name: '部门经理', department: '技术部', role: '部门经理' },
    { id: 'finance', name: '财务经理', department: '财务部', role: '财务经理' },
    { id: 'cfo', name: '财务总监', department: '财务部', role: '财务总监' },
  ])

  const departments = ref([
    { id: 'tech', name: '技术部' },
    { id: 'finance', name: '财务部' },
  ])

  const expenseWorkflowData = ref({
    nodes: [
      {
        id: 'start-1',
        type: 'start',
        position: { x: 150, y: 100 },
        data: { title: '员工申请', status: 'active' },
      },
      {
        id: 'condition-amount',
        type: 'condition',
        position: { x: 150, y: 220 },
        data: {
          title: '金额条件判断',
          status: 'pending',
          conditions: [
            {
              id: 'small',
              name: '小额报销',
              field: 'amount',
              operator: 'less_than',
              value: '1000',
            },
            {
              id: 'large',
              name: '大额报销',
              field: 'amount',
              operator: 'greater_than',
              value: '1000',
            },
          ],
        },
      },
      {
        id: 'approval-small',
        type: 'approval',
        position: { x: 50, y: 340 },
        data: {
          title: '部门经理审批',
          status: 'pending',
          approvers: [financeUsers.value[0]],
          approvalMode: 'any',
        },
      },
      {
        id: 'approval-large',
        type: 'approval',
        position: { x: 250, y: 340 },
        data: {
          title: '财务总监审批',
          status: 'pending',
          approvers: [financeUsers.value[2]],
          approvalMode: 'all',
        },
      },
    ],
    edges: [
      {
        id: 'edge-1',
        source: 'start-1',
        target: 'condition-amount',
        animated: true,
      },
      {
        id: 'edge-2',
        source: 'condition-amount',
        target: 'approval-small',
        animated: true,
      },
      {
        id: 'edge-3',
        source: 'condition-amount',
        target: 'approval-large',
        animated: true,
      },
    ],
    config: { version: '1.0', createdAt: new Date().toISOString() },
  })
</script>
```

:::

## ⚠️ 注意事项

### 1. 节点数据结构

```javascript
// ✅ 推荐：完整的节点数据结构
const node = {
  id: 'unique-id', // 必需：唯一标识
  type: 'approval', // 必需：节点类型 (start | approval | copy | condition)
  position: { x: 150, y: 220 }, // 必需：位置信息
  data: {
    title: '审批节点', // 必需：节点标题
    status: 'pending', // 推荐：节点状态
    approvers: [], // 类型相关：审批人列表
    approvalMode: 'any', // 类型相关：审批模式
  },
}

// ❌ 不推荐：缺少必要字段
const incompleteNode = {
  type: 'approval', // 缺少 id 和 position
  data: { title: '审批节点' },
}
```

### 2. 容器高度

```vue
<!-- ✅ 确保父容器有固定高度（组件默认 600px） -->
<div style="height: 600px">
  <C_WorkFlow v-model="data" :users="users" />
</div>
```

### 3. provide/inject 机制

子节点组件通过 `inject` 获取父级提供的操作方法：

```ts
// 子节点内部（例如 ApprovalNode.vue）
const showAddMenuFn = inject('showAddMenu') // 显示添加菜单
const deleteNodeFn = inject('deleteNode') // 删除当前节点
```

这些方法由 `useWorkflowNodes` composable 通过 `provide` 注入，无需手动配置。

### 4. 数据验证

```javascript
// 通过 ref 调用组件暴露的验证方法
const workflowRef = ref()

// 纯逻辑验证（返回错误数组）
const errors = workflowRef.value.validateWorkflow()

// 或使用组件内置的 UI 验证（带消息提示 + 错误抽屉）
// 通过点击工具栏的"验证流程"按钮触发
```

## 🐛 故障排除

### 常见问题

#### Q1: 节点拖拽不生效？

**A1:** 组件默认开启拖拽。检查是否传了 `:readonly="true"`：

```vue
<C_WorkFlow
  v-model="workflowData"
  :readonly="false"  <!-- 确保非只读模式 -->
/>
```

#### Q2: 节点连接线显示异常？

**A2:** 检查边数据格式，确保 `source` 和 `target` 对应已存在的节点 ID：

```javascript
// ✅ 正确的边数据
const edge = {
  id: 'edge-1',
  source: 'node-1', // 确保此节点存在
  target: 'node-2', // 确保此节点存在
  animated: true,
}
```

#### Q3: 工作流验证总是失败？

**A3:** 检查节点配置是否完整：

```javascript
// 审批节点必须有审批人
if (node.type === 'approval') {
  // node.data.approvers 不能为空数组
}

// 条件节点必须有完整的条件配置
if (node.type === 'condition') {
  // 每个 condition 的 name、field、operator、value 都必须填写
}
```

#### Q4: 删除节点后连线断开？

**A4:** `useWorkflowNodes` 的 `deleteNode` 方法内置了边重连逻辑：删除节点时会自动将上游边与下游边重新连接，不会出现断连情况。如果仍有问题，检查是否通过外部方式直接操作了 `nodes` 数组。

#### Q5: 添加节点位置异常？

**A5:** 节点添加逻辑基于当前选中节点的位置计算（Y 轴 + `NODE_Y_GAP`，默认 180px），并会自动下推后续节点。确保通过组件内置的 `+` 按钮或 `addNode` 方法添加，不要直接 push 到 `nodes` 数组。

## 📝 更新日志

### v1.1.1 (2026-02-17)

- 👁️ **新功能**：提取 `useWorkflowPreview` composable（BFS 拓扑排序 + 时间线步骤 + 统计概览）
- 🎨 **改进**：预览面板结构化详情——审批方式彩色 Badge、人员 NTag 标签、警告高亮
- 🔧 **改进**：新增 `NODE_Y_GAP = 180` 常量，解决节点纵向堆叠问题
- 🔧 **改进**：条件分支子节点横向间距拉宽，避免左右重叠
- 🐛 **修复**：修复验证成功提示重复显示对勾图标的问题
- 🐛 **修复**：修复 `PassiveScrollPlugin` 强制覆盖 `@vue-flow/core` 的 `passive: false` 导致控制台警告

### v1.1.0 (2026-02-16)

- ♻️ **架构重构**：提取 `useWorkflowNodes` composable（节点 CRUD + provide/inject + 边重连）
- ♻️ **架构重构**：提取 `useWorkflowValidation` composable（流程验证 + 错误展示 + 节点定位）
- 📉 **瘦身**：`index.vue` 从 722 行 → 318 行（薄 UI 壳 + 编排方法）
- 🧹 **清理**：移除节点组件中的 `console.log` 调试残留
- 🔧 **改进**：`deferFitView` 统一封装延迟适应画布逻辑
- 🔧 **改进**：`reconnectEdges` 统一封装边重连逻辑
- 🔧 **改进**：`resetNodes` + `resetValidation` 分离关注点

### v1.0.0 (2025-07-04)

- ✨ 基于 Vue Flow 的可视化工作流设计器
- ✨ 支持开始、审批、抄送、条件分支节点类型
- ✨ 拖拽式节点添加和编辑功能
- ✨ 智能工作流验证机制
- ✨ `NodeConfigModal` 独立配置弹窗组件
- ✨ 完整的数据双向绑定支持
- ✨ 完整的 TypeScript 类型定义（`types/work-flow.d.ts`）
- ✨ 工作流预览和统计功能

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个工作流设计器组件基于强大的 Vue Flow 库构建，通过 `useWorkflowNodes`、`useWorkflowValidation` 和 `useWorkflowPreview` 三个 Composable 将节点管理、验证逻辑和流程预览彻底分离，UI 壳仅保留模板和跨 composable 编排方法。子节点通过 `provide/inject` 获取操作方法，无需层层传递 props。如果遇到问题请先查看文档和故障排除部分，或者在团队群里讨论。让我们一起打造更智能的工作流管理体验！ 🔄
