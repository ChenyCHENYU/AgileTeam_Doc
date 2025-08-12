---
outline: 'deep'
---

# C_WorkFlow 工作流设计器组件

> 🔄 基于 Vue Flow 的可视化工作流设计器，让审批流程设计变得简单而直观

## ✨ 特性

- **🎨 可视化设计**: 基于 Vue Flow 的拖拽式流程设计，所见即所得
- **🔧 多种节点类型**: 支持开始、审批、抄送、条件分支等节点类型
- **👥 灵活的审批模式**: 支持或签、会签、顺序审批等多种审批策略
- **✅ 智能验证**: 内置流程验证机制，实时检查配置完整性
- **📋 场景模板**: 预置多种业务场景模板，快速构建标准流程
- **🔄 双向绑定**: 完整的数据双向绑定，支持动态更新
- **📱 响应式设计**: 自适应不同屏幕尺寸，移动端友好
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
# 安装 WangEditor 相关依赖
pnpm install @vue-flow/core @vue-flow/controls @vue-flow/minimap @vue-flow/background
```

```bash [yarn]
# 安装 WangEditor 相关依赖
yarn add @vue-flow/core @vue-flow/controls @vue-flow/minimap @vue-flow/background
```

```bash [npm]
# 安装 WangEditor 相关依赖
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

const handleWorkflowChange = (data) => {
  console.log('工作流变更:', data)
}

const handleWorkflowSave = (data) => {
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
        <n-button type="primary" @click="saveWorkflow">
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

        <n-dropdown :options="templateOptions" @select="loadTemplate">
          <n-button>
            <template #icon>
              <i class="i-mdi:file-document-outline"></i>
            </template>
            加载模板
          </n-button>
        </n-dropdown>

        <n-button type="error" @click="clearWorkflow">
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
      <n-card title="流程统计" size="small" class="mb-16px">
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

      <!-- 流程预览 -->
      <n-card title="流程预览" size="small" class="mb-16px">
        <div class="flow-preview">
          <div
            v-for="(node, index) in workflowData.nodes"
            :key="node.id"
            class="preview-node"
            :class="getNodeTypeClass(node.type)"
            @click="selectNode(node)"
          >
            <div class="node-icon">
              <i :class="getNodeIcon(node.type)"></i>
            </div>
            <div class="node-info">
              <div class="node-title">{{ node.data.title }}</div>
              <div class="node-desc">{{ getNodeDescription(node) }}</div>
            </div>
            <div
              v-if="index < workflowData.nodes.length - 1"
              class="node-arrow"
            >
              <i class="i-mdi:chevron-down"></i>
            </div>
          </div>
        </div>
      </n-card>

      <!-- 配置面板 -->
      <n-card title="设计器设置" size="small">
        <n-space vertical>
          <div class="config-item">
            <n-switch v-model:value="designerConfig.readonly">
              <template #checked>只读模式</template>
              <template #unchecked>编辑模式</template>
            </n-switch>
          </div>

          <div class="config-item">
            <n-select
              v-model:value="designerConfig.theme"
              :options="themeOptions"
              placeholder="选择主题"
            />
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

// 工作流数据
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

// 用户数据
const userList = ref([
  {
    id: '1',
    name: '张三',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    department: '技术部',
    role: '高级开发工程师',
  },
  {
    id: '2',
    name: '李四',
    avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
    department: '产品部',
    role: '产品经理',
  },
])

const roleList = ref([
  { id: 'dev', name: '开发工程师' },
  { id: 'pm', name: '产品经理' },
  { id: 'designer', name: 'UI设计师' },
  { id: 'manager', name: '部门经理' },
])

const deptList = ref([
  { id: 'tech', name: '技术部' },
  { id: 'product', name: '产品部' },
  { id: 'design', name: '设计部' },
  { id: 'hr', name: '人事部' },
])

// 设计器配置
const designerConfig = reactive({
  readonly: false,
  theme: 'light',
  autoValidate: true,
})

const themeOptions = [
  { label: '浅色主题', value: 'light' },
  { label: '深色主题', value: 'dark' },
]

// 模板选项
const templateOptions = [
  { label: '请假审批流程', key: 'leave_approval' },
  { label: '报销审批流程', key: 'expense_approval' },
  { label: '采购审批流程', key: 'purchase_approval' },
  { label: '合同审批流程', key: 'contract_approval' },
]

// 计算属性
const workflowStats = computed(() => {
  const nodes = workflowData.value.nodes || []
  return {
    totalNodes: nodes.length,
    approvalNodes: nodes.filter((n) => n.type === 'approval').length,
    copyNodes: nodes.filter((n) => n.type === 'copy').length,
    conditionNodes: nodes.filter((n) => n.type === 'condition').length,
  }
})

// 事件处理函数
const handleWorkflowChange = (data) => {
  console.log('工作流变更:', data)

  // 自动验证
  if (designerConfig.autoValidate) {
    validateWorkflow()
  }
}

const handleWorkflowSave = (data) => {
  console.log('工作流保存:', data)
  message.success('工作流保存成功')
}

const handleNodeClick = (node) => {
  console.log('节点点击:', node)
  message.info(`点击了节点: ${node.data.title}`)
}

const handleValidateError = (errors) => {
  console.log('验证错误:', errors)
}

// 操作方法
const saveWorkflow = async () => {
  try {
    if (workflowRef.value) {
      await workflowRef.value.saveWorkflow()
    }
  } catch (error) {
    message.error('保存失败: ' + error.message)
  }
}

const validateWorkflow = () => {
  if (workflowRef.value) {
    const errors = workflowRef.value.validateWorkflow()
    if (errors.length === 0) {
      message.success('验证通过')
    } else {
      message.error(`发现 ${errors.length} 个问题`)
    }
  }
}

const exportWorkflow = () => {
  const dataStr = JSON.stringify(workflowData.value, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `workflow-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)

  message.success('工作流导出成功')
}

const loadTemplate = (templateKey) => {
  const templates = {
    leave_approval: {
      nodes: [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 150, y: 100 },
          data: { title: '员工发起', status: 'active', initiators: [] },
        },
        {
          id: 'approval-1',
          type: 'approval',
          position: { x: 150, y: 220 },
          data: {
            title: '直属主管审批',
            status: 'pending',
            approvers: [
              userList.value.find((u) => u.role.includes('经理')),
            ].filter(Boolean),
            approvalMode: 'any',
          },
        },
      ],
      edges: [
        {
          id: 'edge-start-approval',
          source: 'start-1',
          target: 'approval-1',
          animated: true,
        },
      ],
    },
  }

  const template = templates[templateKey]
  if (template) {
    workflowData.value = {
      ...template,
      config: {
        version: '1.0',
        createdAt: new Date().toISOString(),
      },
    }

    message.success(
      `已加载${templateOptions.find((t) => t.key === templateKey)?.label}模板`
    )
  }
}

const clearWorkflow = () => {
  workflowData.value = {
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
  }

  message.success('画布已清空')
}

const selectNode = (node) => {
  console.log('选中节点:', node)
}

const getNodeTypeClass = (type) => {
  const classMap = {
    start: 'node-start',
    approval: 'node-approval',
    copy: 'node-copy',
    condition: 'node-condition',
  }
  return classMap[type] || 'node-default'
}

const getNodeIcon = (type) => {
  const iconMap = {
    start: 'i-mdi:play-circle',
    approval: 'i-mdi:account-check',
    copy: 'i-mdi:email-outline',
    condition: 'i-mdi:source-branch',
  }
  return iconMap[type] || 'i-mdi:circle'
}

const getNodeDescription = (node) => {
  const { type, data } = node

  if (type === 'approval' && data.approvers?.length) {
    return `${data.approvers.length} 个审批人`
  }

  if (type === 'copy' && data.copyUsers?.length) {
    return `${data.copyUsers.length} 个抄送人`
  }

  if (type === 'condition' && data.conditions?.length) {
    return `${data.conditions.length} 个条件分支`
  }

  return '未配置'
}
</script>

<style scoped>
.workflow-designer {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 16px;
}

.toolbar {
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  background: #fafafa;
}

.designer-container {
  flex: 1;
  display: flex;
  gap: 16px;
}

.workflow-canvas {
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.sidebar {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-item {
  text-align: center;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 6px;
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  color: #1890ff;
}

.stat-label {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.flow-preview {
  max-height: 300px;
  overflow-y: auto;
}

.preview-node {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.preview-node:hover {
  background-color: #f0f0f0;
}

.node-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.node-info {
  flex: 1;
}

.node-title {
  font-weight: 600;
  font-size: 14px;
}

.node-desc {
  font-size: 12px;
  color: #666;
}

.node-arrow {
  margin-left: 8px;
  color: #999;
}

.config-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}

/* 节点类型样式 */
.node-start {
  border-left: 4px solid #52c41a;
}
.node-approval {
  border-left: 4px solid #1890ff;
}
.node-copy {
  border-left: 4px solid #fa8c16;
}
.node-condition {
  border-left: 4px solid #722ed1;
}
</style>
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

### 类型定义

::: details 📝 工作流数据接口
```typescript
interface WorkflowData {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  config: WorkflowConfig
}

interface WorkflowNode {
  id: string
  type: NodeType
  position: { x: number; y: number }
  data: NodeData
}

interface WorkflowEdge {
  id: string
  source: string
  target: string
  animated?: boolean
  type?: string
}

interface WorkflowConfig {
  version: string
  createdAt: string
  updatedAt?: string
}
```
:::

::: details 🎯 节点类型定义
```typescript
type NodeType = 'start' | 'approval' | 'copy' | 'condition'

interface NodeData {
  title: string
  status: 'active' | 'pending' | 'completed' | 'rejected'
  // 开始节点
  initiators?: User[]
  // 审批节点
  approvers?: User[]
  approvalMode?: 'any' | 'all' | 'sequence'
  // 抄送节点
  copyUsers?: User[]
  // 条件节点
  conditions?: Condition[]
}

interface Condition {
  id: string
  name: string
  field: string
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'not_equals'
  value: string
}
```
:::

::: details 👥 用户相关接口
```typescript
interface User {
  id: string
  name: string
  avatar?: string
  department?: string
  role?: string
}

interface Role {
  id: string
  name: string
  permissions?: string[]
}

interface Department {
  id: string
  name: string
  parentId?: string
}
```
:::

::: details ⚠️ 验证错误接口
```typescript
interface ValidationError {
  nodeId: string
  nodeName: string
  field: string
  message: string
  type: 'required' | 'incomplete' | 'warning' | 'error'
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
      <!-- 流程配置 -->
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
            :precision="1"
            placeholder="天数"
            style="width: 120px"
          >
            <template #suffix>天</template>
          </n-input-number>
          <n-switch v-model:value="leaveConfig.needHRApproval">
            <template #checked>需要HR审批</template>
            <template #unchecked>无需HR审批</template>
          </n-switch>
        </n-space>
      </div>

      <!-- 工作流设计器 -->
      <C_WorkFlow
        ref="leaveWorkflowRef"
        v-model="leaveWorkflowData"
        :users="hrUsers"
        :departments="departments"
        @change="handleLeaveWorkflowChange"
        @save="handleLeaveWorkflowSave"
      />

      <!-- 操作按钮 -->
      <div class="mt-20px">
        <n-space>
          <n-button type="primary" @click="generateLeaveWorkflow">
            自动生成流程
          </n-button>
          <n-button @click="testLeaveWorkflow"> 测试流程 </n-button>
          <n-button @click="deployLeaveWorkflow"> 部署流程 </n-button>
        </n-space>
      </div>
    </n-card>

    <!-- 流程测试模拟 -->
    <n-card class="mt-20px" title="流程测试">
      <div class="test-panel">
        <div class="test-form">
          <n-form :model="testForm" label-placement="left" label-width="80">
            <n-form-item label="申请人">
              <n-select
                v-model:value="testForm.applicant"
                :options="applicantOptions"
                placeholder="选择申请人"
              />
            </n-form-item>
            <n-form-item label="请假类型">
              <n-select
                v-model:value="testForm.leaveType"
                :options="leaveTypeOptions"
                placeholder="选择请假类型"
              />
            </n-form-item>
            <n-form-item label="请假天数">
              <n-input-number
                v-model:value="testForm.days"
                :min="0.5"
                :step="0.5"
                :precision="1"
              />
            </n-form-item>
            <n-form-item label="请假事由">
              <n-input
                v-model:value="testForm.reason"
                type="textarea"
                placeholder="请输入请假事由"
                :rows="3"
              />
            </n-form-item>
          </n-form>

          <n-button type="primary" @click="simulateLeaveApplication" block>
            模拟提交申请
          </n-button>
        </div>

        <!-- 流程执行结果 -->
        <div v-if="simulationResult" class="test-result">
          <h4>流程执行结果</h4>
          <div class="execution-steps">
            <div
              v-for="(step, index) in simulationResult.steps"
              :key="index"
              class="execution-step"
              :class="step.status"
            >
              <div class="step-icon">
                <i :class="getStepIcon(step.status)"></i>
              </div>
              <div class="step-content">
                <div class="step-title">{{ step.title }}</div>
                <div class="step-desc">{{ step.description }}</div>
                <div v-if="step.assignee" class="step-assignee">
                  执行人: {{ step.assignee }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup>
const leaveWorkflowRef = ref()
const message = useMessage()

// 请假配置
const leaveConfig = reactive({
  type: 'annual_leave',
  days: 1,
  needHRApproval: false,
})

const leaveTypeOptions = [
  { label: '年假', value: 'annual_leave' },
  { label: '病假', value: 'sick_leave' },
  { label: '事假', value: 'personal_leave' },
  { label: '产假', value: 'maternity_leave' },
  { label: '陪产假', value: 'paternity_leave' },
]

// 工作流数据
const leaveWorkflowData = ref({
  nodes: [
    {
      id: 'start-1',
      type: 'start',
      position: { x: 150, y: 100 },
      data: {
        title: '员工申请',
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

// 人员数据
const hrUsers = ref([
  {
    id: 'manager1',
    name: '张经理',
    avatar: '',
    department: '技术部',
    role: '部门经理',
  },
  {
    id: 'hr1',
    name: '李HR',
    avatar: '',
    department: '人事部',
    role: 'HR专员',
  },
])

const departments = ref([
  { id: 'tech', name: '技术部' },
  { id: 'hr', name: '人事部' },
  { id: 'management', name: '管理层' },
])

// 测试表单
const testForm = reactive({
  applicant: '',
  leaveType: 'annual_leave',
  days: 1,
  reason: '',
})

const applicantOptions = computed(() =>
  hrUsers.value.map((user) => ({
    label: user.name,
    value: user.id,
  }))
)

const simulationResult = ref(null)

// 自动生成请假流程
const generateLeaveWorkflow = () => {
  const nodes = [
    {
      id: 'start-1',
      type: 'start',
      position: { x: 150, y: 100 },
      data: {
        title: '员工申请',
        status: 'active',
        initiators: [],
      },
    },
  ]

  const edges = []
  let yPosition = 220

  // 根据天数添加审批节点
  if (leaveConfig.days <= 3) {
    // 3天以内：直属主管审批
    nodes.push({
      id: 'approval-manager',
      type: 'approval',
      position: { x: 150, y: yPosition },
      data: {
        title: '直属主管审批',
        status: 'pending',
        approvers: [hrUsers.value.find((u) => u.role === '部门经理')].filter(
          Boolean
        ),
        approvalMode: 'any',
      },
    })

    edges.push({
      id: 'edge-start-manager',
      source: 'start-1',
      target: 'approval-manager',
      animated: true,
    })
  }

  leaveWorkflowData.value = {
    nodes,
    edges,
    config: {
      version: '1.0',
      createdAt: new Date().toISOString(),
    },
  }

  message.success('已自动生成请假审批流程')
}

// 模拟请假申请
const simulateLeaveApplication = () => {
  if (!testForm.applicant || !testForm.reason) {
    message.warning('请填写完整信息')
    return
  }

  const steps = []

  // 开始节点
  steps.push({
    title: '申请提交',
    description: `${
      hrUsers.value.find((u) => u.id === testForm.applicant)?.name
    } 提交了 ${testForm.days} 天${
      leaveTypeOptions.find((t) => t.value === testForm.leaveType)?.label
    }申请`,
    status: 'completed',
    assignee: hrUsers.value.find((u) => u.id === testForm.applicant)?.name,
  })

  // 审批节点
  leaveWorkflowData.value.nodes.forEach((node) => {
    if (node.type === 'approval' && node.data.approvers?.length > 0) {
      steps.push({
        title: node.data.title,
        description: `等待 ${node.data.approvers[0].name} 审批`,
        status: 'pending',
        assignee: node.data.approvers[0].name,
      })
    }
  })

  simulationResult.value = {
    applicationId: `LEAVE-${Date.now()}`,
    steps,
    estimatedDuration: `${steps.length - 1} 个工作日`,
  }

  message.success('申请提交成功，流程已启动')
}

const getStepIcon = (status) => {
  const iconMap = {
    completed: 'i-mdi:check-circle',
    pending: 'i-mdi:clock-outline',
    rejected: 'i-mdi:close-circle',
  }
  return iconMap[status] || 'i-mdi:circle'
}

const handleLeaveWorkflowChange = (data) => {
  console.log('请假流程变更:', data)
}

const handleLeaveWorkflowSave = (data) => {
  console.log('请假流程保存:', data)
  message.success('请假审批流程保存成功')
}

const testLeaveWorkflow = () => {
  if (leaveWorkflowRef.value) {
    const errors = leaveWorkflowRef.value.validateWorkflow()
    if (errors.length === 0) {
      message.success('流程测试通过')
    } else {
      message.error(`流程存在 ${errors.length} 个问题`)
    }
  }
}

const deployLeaveWorkflow = () => {
  if (leaveWorkflowRef.value) {
    const errors = leaveWorkflowRef.value.validateWorkflow()
    if (errors.length === 0) {
      message.success('流程部署成功，现在可以使用此流程')
    } else {
      message.error('流程存在问题，无法部署')
    }
  }
}

// 监听配置变化自动生成流程
watch([() => leaveConfig.days, () => leaveConfig.needHRApproval], () => {
  generateLeaveWorkflow()
})

// 初始化
onMounted(() => {
  generateLeaveWorkflow()
})
</script>

<style scoped>
.leave-approval-workflow {
  padding: 24px;
}

.workflow-config {
  background: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
}

.test-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.test-form {
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
}

.test-result {
  padding: 16px;
  background: #f0f9ff;
  border-radius: 8px;
}

.execution-steps {
  margin-top: 16px;
}

.execution-step {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 6px;
}

.execution-step.completed {
  background: #f6ffed;
  border-left: 4px solid #52c41a;
}

.execution-step.pending {
  background: #fff7e6;
  border-left: 4px solid #fa8c16;
}

.step-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.step-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
}

.step-assignee {
  font-size: 12px;
  color: #999;
}
</style>
```
:::

### 场景 2: 报销审批流程

::: details 💰 报销审批流程设计器
```vue
<template>
  <div class="expense-approval-workflow">
    <n-card title="报销审批流程设计">
      <!-- 报销规则配置 -->
      <div class="expense-rules mb-20px">
        <h4>审批规则配置</h4>
        <div class="rule-grid">
          <div class="rule-item">
            <n-input-group>
              <n-input-group-label>小额报销</n-input-group-label>
              <n-input-number
                v-model:value="expenseRules.smallAmount"
                :min="0"
                :step="100"
                placeholder="金额上限"
              />
              <n-input-group-label>元以下</n-input-group-label>
            </n-input-group>
            <n-select
              v-model:value="expenseRules.smallAmountApprover"
              :options="approverOptions"
              placeholder="审批人"
              style="margin-top: 8px"
            />
          </div>

          <div class="rule-item">
            <n-input-group>
              <n-input-group-label>中额报销</n-input-group-label>
              <n-input-number
                v-model:value="expenseRules.mediumAmount"
                :min="0"
                :step="100"
                placeholder="金额上限"
              />
              <n-input-group-label>元以下</n-input-group-label>
            </n-input-group>
            <n-select
              v-model:value="expenseRules.mediumAmountApprover"
              :options="approverOptions"
              placeholder="审批人"
              style="margin-top: 8px"
            />
          </div>

          <div class="rule-item">
            <n-input-group>
              <n-input-group-label>大额报销</n-input-group-label>
              <n-input-number
                v-model:value="expenseRules.largeAmount"
                :min="0"
                :step="100"
                placeholder="金额上限"
              />
              <n-input-group-label>元以上</n-input-group-label>
            </n-input-group>
            <n-select
              v-model:value="expenseRules.largeAmountApprover"
              :options="approverOptions"
              placeholder="审批人"
              style="margin-top: 8px"
            />
          </div>
        </div>

        <n-button
          type="primary"
          @click="generateExpenseWorkflow"
          class="mt-16px"
        >
          根据规则生成流程
        </n-button>
      </div>

      <!-- 工作流设计器 -->
      <C_WorkFlow
        ref="expenseWorkflowRef"
        v-model="expenseWorkflowData"
        :users="financeUsers"
        :departments="departments"
        @change="handleExpenseWorkflowChange"
        @save="handleExpenseWorkflowSave"
      />
    </n-card>

    <!-- 报销测试 -->
    <n-card class="mt-20px" title="报销流程测试">
      <div class="expense-test">
        <div class="test-inputs">
          <n-form
            :model="expenseTestForm"
            label-placement="left"
            label-width="100"
          >
            <n-form-item label="报销人">
              <n-select
                v-model:value="expenseTestForm.applicant"
                :options="applicantOptions"
                placeholder="选择报销人"
              />
            </n-form-item>
            <n-form-item label="报销类型">
              <n-select
                v-model:value="expenseTestForm.type"
                :options="expenseTypeOptions"
                placeholder="选择报销类型"
              />
            </n-form-item>
            <n-form-item label="报销金额">
              <n-input-number
                v-model:value="expenseTestForm.amount"
                :min="0"
                :step="10"
                :precision="2"
                placeholder="请输入金额"
              >
                <template #suffix>元</template>
              </n-input-number>
            </n-form-item>
            <n-form-item label="报销说明">
              <n-input
                v-model:value="expenseTestForm.description"
                type="textarea"
                placeholder="请输入报销说明"
                :rows="3"
              />
            </n-form-item>
          </n-form>

          <n-button type="primary" @click="testExpenseFlow" block>
            测试报销流程
          </n-button>
        </div>

        <!-- 流程预测结果 -->
        <div v-if="expenseFlowPrediction" class="flow-prediction">
          <h4>流程预测</h4>
          <div class="prediction-info">
            <n-alert
              :type="expenseFlowPrediction.type"
              :title="expenseFlowPrediction.title"
            >
              {{ expenseFlowPrediction.message }}
            </n-alert>

            <div class="prediction-details mt-16px">
              <div class="detail-item">
                <span class="label">预计审批层级：</span>
                <span class="value">{{ expenseFlowPrediction.levels }} 级</span>
              </div>
              <div class="detail-item">
                <span class="label">预计用时：</span>
                <span class="value">{{ expenseFlowPrediction.duration }}</span>
              </div>
              <div class="detail-item">
                <span class="label">审批路径：</span>
                <span class="value">{{ expenseFlowPrediction.path }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup>
const expenseWorkflowRef = ref()
const message = useMessage()

// 报销规则配置
const expenseRules = reactive({
  smallAmount: 1000,
  smallAmountApprover: 'manager',
  mediumAmount: 5000,
  mediumAmountApprover: 'finance',
  largeAmount: 5000,
  largeAmountApprover: 'cfo',
})

const financeUsers = ref([
  {
    id: 'manager',
    name: '部门经理',
    avatar: '',
    department: '技术部',
    role: '部门经理',
  },
  {
    id: 'finance',
    name: '财务经理',
    avatar: '',
    department: '财务部',
    role: '财务经理',
  },
  {
    id: 'cfo',
    name: '财务总监',
    avatar: '',
    department: '财务部',
    role: '财务总监',
  },
])

const approverOptions = computed(() =>
  financeUsers.value.map((user) => ({
    label: user.name,
    value: user.id,
  }))
)

const departments = ref([
  { id: 'tech', name: '技术部' },
  { id: 'finance', name: '财务部' },
])

// 工作流数据
const expenseWorkflowData = ref({
  nodes: [],
  edges: [],
  config: {
    version: '1.0',
    createdAt: new Date().toISOString(),
  },
})

// 测试表单
const expenseTestForm = reactive({
  applicant: '',
  type: 'travel',
  amount: 0,
  description: '',
})

const applicantOptions = computed(() =>
  financeUsers.value.map((user) => ({
    label: user.name,
    value: user.id,
  }))
)

const expenseTypeOptions = [
  { label: '差旅费', value: 'travel' },
  { label: '餐费', value: 'meal' },
  { label: '交通费', value: 'transport' },
  { label: '办公用品', value: 'office' },
  { label: '培训费', value: 'training' },
]

const expenseFlowPrediction = ref(null)

// 生成报销审批流程
const generateExpenseWorkflow = () => {
  const nodes = [
    {
      id: 'start-1',
      type: 'start',
      position: { x: 150, y: 100 },
      data: {
        title: '员工申请',
        status: 'active',
        initiators: [],
      },
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
            id: 'small-amount',
            name: `小额报销(≤${expenseRules.smallAmount}元)`,
            field: 'amount',
            operator: 'less_than',
            value: expenseRules.smallAmount.toString(),
          },
          {
            id: 'medium-amount',
            name: `中额报销(${expenseRules.smallAmount + 1}-${
              expenseRules.mediumAmount
            }元)`,
            field: 'amount',
            operator: 'between',
            value: `${expenseRules.smallAmount + 1}-${
              expenseRules.mediumAmount
            }`,
          },
          {
            id: 'large-amount',
            name: `大额报销(>${expenseRules.mediumAmount}元)`,
            field: 'amount',
            operator: 'greater_than',
            value: expenseRules.mediumAmount.toString(),
          },
        ],
      },
    },
  ]

  const edges = [
    {
      id: 'edge-start-condition',
      source: 'start-1',
      target: 'condition-amount',
      animated: true,
    },
  ]

  // 添加审批节点
  const smallApprover = financeUsers.value.find(
    (u) => u.id === expenseRules.smallAmountApprover
  )
  if (smallApprover) {
    nodes.push({
      id: 'approval-small',
      type: 'approval',
      position: { x: 50, y: 340 },
      data: {
        title: '小额审批',
        status: 'pending',
        approvers: [smallApprover],
        approvalMode: 'any',
      },
    })

    edges.push({
      id: 'edge-condition-small',
      source: 'condition-amount',
      target: 'approval-small',
      animated: true,
    })
  }

  expenseWorkflowData.value = {
    nodes,
    edges,
    config: {
      version: '1.0',
      createdAt: new Date().toISOString(),
    },
  }

  message.success('报销审批流程已生成')
}

// 测试报销流程
const testExpenseFlow = () => {
  if (!expenseTestForm.applicant || !expenseTestForm.amount) {
    message.warning('请填写完整信息')
    return
  }

  const amount = expenseTestForm.amount
  let prediction = null

  if (amount <= expenseRules.smallAmount) {
    prediction = {
      type: 'success',
      title: '小额报销流程',
      message: `金额 ${amount} 元，走小额报销流程`,
      levels: 1,
      duration: '1-2 个工作日',
      path: '部门经理审批',
    }
  } else if (amount <= expenseRules.mediumAmount) {
    prediction = {
      type: 'info',
      title: '中额报销流程',
      message: `金额 ${amount} 元，走中额报销流程`,
      levels: 1,
      duration: '2-3 个工作日',
      path: '财务经理审批',
    }
  } else {
    prediction = {
      type: 'warning',
      title: '大额报销流程',
      message: `金额 ${amount} 元，走大额报销流程`,
      levels: 2,
      duration: '3-5 个工作日',
      path: '财务经理审批 → 财务总监审批',
    }
  }

  expenseFlowPrediction.value = prediction
  message.success('流程预测完成')
}

const handleExpenseWorkflowChange = (data) => {
  console.log('报销流程变更:', data)
}

const handleExpenseWorkflowSave = (data) => {
  console.log('报销流程保存:', data)
  message.success('报销审批流程保存成功')
}

// 监听规则变化自动重新生成
watch(
  expenseRules,
  () => {
    generateExpenseWorkflow()
  },
  { deep: true }
)

// 初始化
onMounted(() => {
  generateExpenseWorkflow()
})
</script>

<style scoped>
.expense-approval-workflow {
  padding: 24px;
}

.expense-rules {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.rule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.rule-item {
  padding: 16px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.expense-test {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.test-inputs {
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
}

.flow-prediction {
  padding: 16px;
  background: #f0f9ff;
  border-radius: 8px;
}

.prediction-details {
  background: white;
  padding: 16px;
  border-radius: 6px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.label {
  font-weight: 500;
  color: #666;
}

.value {
  color: #333;
  font-weight: 600;
}
</style>
```
:::

## 🛠️ 高级用法

::: details 🎨 自定义节点类型 - 扩展业务节点
```vue
<template>
  <div class="custom-workflow">
    <C_WorkFlow
      ref="customWorkflowRef"
      v-model="workflowData"
      :node-types="customNodeTypes"
      :users="users"
      @change="handleWorkflowChange"
    />
  </div>
</template>

<script setup>
import CustomNotificationNode from './nodes/CustomNotificationNode.vue'
import CustomDelayNode from './nodes/CustomDelayNode.vue'

// 扩展自定义节点类型
const customNodeTypes = computed(() => ({
  ...NODE_TYPES, // 基础节点类型
  notification: markRaw(CustomNotificationNode),
  delay: markRaw(CustomDelayNode),
}))

const workflowData = ref({
  nodes: [
    {
      id: 'start-1',
      type: 'start',
      position: { x: 150, y: 100 },
      data: { title: '发起人', status: 'active' },
    },
    {
      id: 'notification-1',
      type: 'notification',
      position: { x: 150, y: 220 },
      data: {
        title: '通知节点',
        status: 'pending',
        notificationConfig: {
          channels: ['email', 'sms'],
          template: 'approval_request',
          recipients: [],
        },
      },
    },
    {
      id: 'delay-1',
      type: 'delay',
      position: { x: 150, y: 340 },
      data: {
        title: '延时节点',
        status: 'pending',
        delayConfig: {
          duration: 24,
          unit: 'hours',
          condition: 'no_response',
        },
      },
    },
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'start-1',
      target: 'notification-1',
      animated: true,
    },
    {
      id: 'edge-2',
      source: 'notification-1',
      target: 'delay-1',
      animated: true,
    },
  ],
})

const handleWorkflowChange = (data) => {
  console.log('自定义工作流变更:', data)
}
</script>
```
:::

::: details 🔄 工作流版本管理 - 版本控制系统
```vue
<template>
  <div class="workflow-version-manager">
    <n-card title="工作流版本管理">
      <!-- 版本列表 -->
      <div class="version-list">
        <div
          v-for="version in workflowVersions"
          :key="version.id"
          class="version-item"
          :class="{ active: version.id === currentVersionId }"
          @click="loadVersion(version.id)"
        >
          <div class="version-header">
            <span class="version-name">{{ version.name }}</span>
            <span class="version-number">v{{ version.version }}</span>
          </div>
          <div class="version-meta">
            <span class="version-date">{{
              formatDate(version.createdAt)
            }}</span>
            <span class="version-author">{{ version.author }}</span>
          </div>
          <div class="version-status">
            <n-tag :type="getVersionStatusType(version.status)">
              {{ version.status }}
            </n-tag>
          </div>
        </div>
      </div>

      <!-- 版本操作 -->
      <div class="version-actions">
        <n-button type="primary" @click="createNewVersion">
          创建新版本
        </n-button>
        <n-button @click="compareVersions">
          版本对比
        </n-button>
        <n-button type="warning" @click="rollbackVersion">
          回滚版本
        </n-button>
      </div>
    </n-card>

    <!-- 工作流设计器 -->
    <n-card class="mt-20px" title="工作流编辑器">
      <C_WorkFlow
        ref="versionWorkflowRef"
        v-model="currentWorkflowData"
        :readonly="isReadonly"
        :users="users"
        @change="handleWorkflowChange"
        @save="saveCurrentVersion"
      />
    </n-card>
  </div>
</template>

<script setup>
const versionWorkflowRef = ref()
const message = useMessage()

// 版本管理状态
const workflowVersions = ref([
  {
    id: 'v1',
    name: '初始版本',
    version: '1.0.0',
    status: 'published',
    author: '张三',
    createdAt: new Date('2025-01-01'),
    nodeCount: 3,
    data: {},
  },
  {
    id: 'v2',
    name: '增加审批节点',
    version: '1.1.0',
    status: 'draft',
    author: '李四',
    createdAt: new Date('2025-01-15'),
    nodeCount: 5,
    data: {},
  },
])

const currentVersionId = ref('v2')
const currentWorkflowData = ref(null)

const isReadonly = computed(() => {
  const currentVersion = workflowVersions.value.find(
    (v) => v.id === currentVersionId.value
  )
  return currentVersion?.status === 'published'
})

// 版本管理方法
const loadVersion = (versionId) => {
  const version = workflowVersions.value.find((v) => v.id === versionId)
  if (version) {
    currentVersionId.value = versionId
    currentWorkflowData.value = { ...version.data }
    message.success(`已加载版本: ${version.name}`)
  }
}

const createNewVersion = () => {
  const currentVersion = workflowVersions.value.find(
    (v) => v.id === currentVersionId.value
  )
  const newVersion = {
    id: `v${workflowVersions.value.length + 1}`,
    name: `版本 ${workflowVersions.value.length + 1}`,
    version: incrementVersion(currentVersion.version),
    status: 'draft',
    author: '当前用户',
    createdAt: new Date(),
    nodeCount: currentWorkflowData.value?.nodes?.length || 0,
    data: { ...currentWorkflowData.value },
  }

  workflowVersions.value.push(newVersion)
  currentVersionId.value = newVersion.id
  message.success('新版本创建成功')
}

const saveCurrentVersion = () => {
  const versionIndex = workflowVersions.value.findIndex(
    (v) => v.id === currentVersionId.value
  )
  if (versionIndex !== -1) {
    workflowVersions.value[versionIndex].data = { ...currentWorkflowData.value }
    workflowVersions.value[versionIndex].nodeCount =
      currentWorkflowData.value?.nodes?.length || 0
    message.success('版本保存成功')
  }
}

const compareVersions = () => {
  message.info('版本对比功能')
}

const rollbackVersion = () => {
  message.info('版本回滚功能')
}

// 辅助方法
const getVersionStatusType = (status) => {
  const typeMap = {
    draft: 'info',
    published: 'success',
    archived: 'default',
  }
  return typeMap[status] || 'default'
}

const incrementVersion = (version) => {
  const parts = version.split('.')
  parts[2] = (parseInt(parts[2]) + 1).toString()
  return parts.join('.')
}

const formatDate = (date) => {
  return new Date(date).toLocaleString('zh-CN')
}

const handleWorkflowChange = (data) => {
  currentWorkflowData.value = data
}

// 初始化
onMounted(() => {
  loadVersion(currentVersionId.value)
})
</script>

<style scoped>
.workflow-version-manager {
  padding: 24px;
}

.version-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.version-item {
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.version-item:hover {
  border-color: #1890ff;
  background-color: #f0f9ff;
}

.version-item.active {
  border-color: #1890ff;
  background-color: #e6f7ff;
}

.version-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.version-name {
  font-weight: 600;
  font-size: 16px;
}

.version-number {
  color: #666;
  font-size: 14px;
}

.version-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #666;
}

.version-actions {
  display: flex;
  gap: 12px;
}
</style>
```
:::

## ⚠️ 注意事项

### 1. 节点数据结构

```javascript
// ✅ 推荐：完整的节点数据结构
const node = {
  id: 'unique-id', // 必需：唯一标识
  type: 'approval', // 必需：节点类型
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
  data: {
    title: '审批节点',
  },
}
```

### 2. 边连接处理

```javascript
// ✅ 推荐：正确的边连接
const edge = {
  id: generateEdgeId(sourceId, targetId), // 唯一ID
  source: sourceId, // 源节点ID
  target: targetId, // 目标节点ID
  animated: true, // 动画效果
  type: 'default', // 边类型
}

// ❌ 不推荐：缺少连接信息
const incompleteEdge = {
  id: 'edge-1',
  // 缺少 source 和 target
}
```

### 3. 数据验证

::: details 📝 工作流数据验证示例
```javascript
// ✅ 推荐：验证工作流数据
const validateWorkflowData = (data) => {
  const errors = []

  // 验证基本结构
  if (!data.nodes || !Array.isArray(data.nodes)) {
    errors.push('缺少节点数据')
  }

  if (!data.edges || !Array.isArray(data.edges)) {
    errors.push('缺少边数据')
  }

  // 验证节点
  data.nodes?.forEach((node) => {
    if (!node.id || !node.type) {
      errors.push(`节点 ${node.id || '未知'} 缺少必要字段`)
    }
  })

  return errors
}

// 使用验证
const errors = validateWorkflowData(workflowData.value)
if (errors.length > 0) {
  console.error('工作流数据验证失败:', errors)
}
```
:::

### 4. 性能优化

::: details ⚡ 性能优化策略
```javascript
// ✅ 推荐：大型工作流的性能优化
const useWorkflowPerformance = () => {
  // 使用 shallowRef 减少深度响应式开销
  const nodes = shallowRef([])
  const edges = shallowRef([])

  // 防抖的保存操作
  const debouncedSave = debounce(async (data) => {
    await saveWorkflow(data)
  }, 1000)

  // 批量更新节点
  const updateNodesInBatch = (updates) => {
    const newNodes = [...nodes.value]
    updates.forEach((update) => {
      const index = newNodes.findIndex((n) => n.id === update.id)
      if (index !== -1) {
        newNodes[index] = { ...newNodes[index], ...update }
      }
    })
    nodes.value = newNodes
  }

  return {
    nodes,
    edges,
    debouncedSave,
    updateNodesInBatch,
  }
}
```
:::

## 🐛 故障排除

### 常见问题

#### Q1: 节点拖拽不生效？

**A1:** 检查组件配置：

```vue
<C_WorkFlow
  v-model="workflowData"
  :nodes-draggable="true"  <!-- 确保开启拖拽 -->
  :readonly="false"        <!-- 确保非只读模式 -->
/>
```

#### Q2: 节点连接线显示异常？

**A2:** 检查边数据格式：

```javascript
// ✅ 正确的边数据
const edge = {
  id: 'edge-1',
  source: 'node-1', // 确保源节点存在
  target: 'node-2', // 确保目标节点存在
  animated: true,
}

// 验证节点是否存在
const sourceExists = nodes.value.some((n) => n.id === edge.source)
const targetExists = nodes.value.some((n) => n.id === edge.target)
```

#### Q3: 工作流验证总是失败？

**A3:** 检查验证规则：

```javascript
// 确保审批节点有审批人
if (node.type === 'approval') {
  if (!node.data.approvers || node.data.approvers.length === 0) {
    errors.push('审批节点缺少审批人')
  }
}

// 确保条件节点有条件配置
if (node.type === 'condition') {
  if (!node.data.conditions || node.data.conditions.length === 0) {
    errors.push('条件节点缺少条件配置')
  }
}
```

#### Q4: 组件渲染性能差？

**A4:** 优化数据结构：

```javascript
// ✅ 使用 shallowRef 优化性能
const workflowData = shallowRef({
  nodes: [],
  edges: [],
})

// ✅ 避免频繁的深度监听
watch(
  () => workflowData.value.nodes.length,
  (newLength) => {
    console.log('节点数量变化:', newLength)
  }
)

// ❌ 避免深度监听大对象
watch(
  workflowData,
  (newData) => {
    // 这会导致性能问题
  },
  { deep: true }
)
```

#### Q5: 自定义节点不显示？

**A5:** 检查节点注册：

```javascript
// ✅ 正确注册自定义节点
const customNodeTypes = {
  ...NODE_TYPES, // 基础节点
  customNode: markRaw(CustomNodeComponent), // 使用 markRaw
}

// ❌ 错误的注册方式
const customNodeTypes = {
  customNode: CustomNodeComponent, // 缺少 markRaw
}
```

## 🎯 最佳实践

### 1. 组件架构设计

::: details 🏗️ 推荐的组件架构
```javascript
// 推荐的组件架构
const useWorkflowDesigner = () => {
  // 状态管理
  const workflowState = reactive({
    data: null,
    loading: false,
    error: null,
    isDirty: false,
  })

  // 操作方法
  const workflowActions = {
    async loadWorkflow(id) {
      workflowState.loading = true
      try {
        const data = await api.getWorkflow(id)
        workflowState.data = data
        workflowState.isDirty = false
      } catch (error) {
        workflowState.error = error.message
      } finally {
        workflowState.loading = false
      }
    },

    async saveWorkflow() {
      try {
        await api.saveWorkflow(workflowState.data)
        workflowState.isDirty = false
        message.success('保存成功')
      } catch (error) {
        message.error('保存失败: ' + error.message)
      }
    },

    validateWorkflow() {
      return validateWorkflowData(workflowState.data)
    },
  }

  // 计算属性
  const workflowComputed = {
    hasChanges: computed(() => workflowState.isDirty),
    nodeCount: computed(() => workflowState.data?.nodes?.length || 0),
    isValid: computed(() => workflowActions.validateWorkflow().length === 0),
  }

  return {
    state: workflowState,
    actions: workflowActions,
    computed: workflowComputed,
  }
}
```
:::

### 2. 数据持久化策略

::: details 💾 工作流数据持久化
```javascript
// 工作流数据持久化
class WorkflowPersistence {
  constructor() {
    this.autosaveInterval = null
    this.saveQueue = []
  }

  // 启动自动保存
  startAutosave(workflowData, interval = 30000) {
    this.autosaveInterval = setInterval(() => {
      this.saveToLocal(workflowData.value)
    }, interval)
  }

  // 停止自动保存
  stopAutosave() {
    if (this.autosaveInterval) {
      clearInterval(this.autosaveInterval)
      this.autosaveInterval = null
    }
  }

  // 本地保存
  saveToLocal(data) {
    try {
      const saveData = {
        ...data,
        timestamp: Date.now(),
        version: '1.0',
      }
      localStorage.setItem('workflow-draft', JSON.stringify(saveData))
    } catch (error) {
      console.error('本地保存失败:', error)
    }
  }

  // 从本地恢复
  loadFromLocal() {
    try {
      const saved = localStorage.getItem('workflow-draft')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (error) {
      console.error('本地恢复失败:', error)
    }
    return null
  }

  // 远程保存队列
  async saveToRemote(data) {
    return new Promise((resolve, reject) => {
      this.saveQueue.push({ data, resolve, reject })
      this.processSaveQueue()
    })
  }

  // 处理保存队列
  async processSaveQueue() {
    if (this.processing || this.saveQueue.length === 0) return

    this.processing = true

    while (this.saveQueue.length > 0) {
      const { data, resolve, reject } = this.saveQueue.shift()

      try {
        await api.saveWorkflow(data)
        resolve()
      } catch (error) {
        reject(error)
      }
    }

    this.processing = false
  }

  // 清理资源
  destroy() {
    this.stopAutosave()
    this.saveQueue = []
  }
}

// 使用示例
const persistence = new WorkflowPersistence()

onMounted(() => {
  // 尝试恢复草稿
  const draft = persistence.loadFromLocal()
  if (draft) {
    workflowData.value = draft
    message.info('已恢复本地草稿')
  }

  // 启动自动保存
  persistence.startAutosave(workflowData)
})

onUnmounted(() => {
  persistence.destroy()
})
```
:::

### 3. 错误处理机制

::: details 🚨 工作流错误处理
```javascript
// 工作流错误处理类
class WorkflowErrorHandler {
  constructor() {
    this.errorLog = []
    this.maxLogSize = 100
  }

  // 记录错误
  logError(error, context = {}) {
    const errorEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      message: error.message || error,
      stack: error.stack,
      context,
      level: this.getErrorLevel(error),
    }

    this.errorLog.unshift(errorEntry)

    // 限制日志大小
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(0, this.maxLogSize)
    }

    // 根据错误级别处理
    this.handleErrorByLevel(errorEntry)
  }

  // 获取错误级别
  getErrorLevel(error) {
    if (error.name === 'ValidationError') return 'warning'
    if (error.name === 'NetworkError') return 'error'
    if (error.name === 'PermissionError') return 'error'
    return 'info'
  }

  // 根据级别处理错误
  handleErrorByLevel(errorEntry) {
    switch (errorEntry.level) {
      case 'error':
        message.error(errorEntry.message)
        this.reportToMonitoring(errorEntry)
        break
      case 'warning':
        message.warning(errorEntry.message)
        break
      case 'info':
        message.info(errorEntry.message)
        break
    }
  }

  // 错误恢复策略
  async attemptRecovery(error, context) {
    const recoveryStrategies = {
      NetworkError: () => this.retryOperation(context.operation),
      ValidationError: () => this.fixValidationErrors(context.data),
      PermissionError: () => this.requestPermission(context.resource),
    }

    const strategy = recoveryStrategies[error.name]
    if (strategy) {
      try {
        await strategy()
        message.success('错误已自动修复')
        return true
      } catch (recoveryError) {
        this.logError(recoveryError, { ...context, isRecovery: true })
        return false
      }
    }

    return false
  }

  // 修复验证错误
  async fixValidationErrors(data) {
    const fixes = []

    // 自动修复常见问题
    if (data.nodes) {
      data.nodes.forEach((node) => {
        // 确保必要字段存在
        if (!node.data) {
          node.data = {}
          fixes.push(`为节点 ${node.id} 添加了 data 字段`)
        }

        // 修复审批节点
        if (node.type === 'approval' && !node.data.approvers) {
          node.data.approvers = []
          fixes.push(`为审批节点 ${node.id} 初始化了审批人列表`)
        }
      })
    }

    if (fixes.length > 0) {
      message.info(`自动修复了 ${fixes.length} 个问题`)
      console.log('修复详情:', fixes)
    }

    return data
  }

  // 上报监控
  reportToMonitoring(errorEntry) {
    // 实际项目中集成错误监控服务
    console.error('Error reported to monitoring:', errorEntry)
  }
}

// 全局错误处理
const errorHandler = new WorkflowErrorHandler()

// 包装工作流操作
const safeWorkflowOperation = async (operation, context = {}) => {
  try {
    return await operation()
  } catch (error) {
    errorHandler.logError(error, context)

    // 尝试自动恢复
    const recovered = await errorHandler.attemptRecovery(error, context)
    if (!recovered) {
      throw error
    }
  }
}

// 使用示例
const saveWorkflow = async (data) => {
  await safeWorkflowOperation(() => api.saveWorkflow(data), {
    operation: 'save',
    data,
  })
}
```
:::

## 📝 更新日志

### v1.0.0 (2025-07-19)

- ✨ 基于 Vue Flow 的可视化工作流设计器
- ✨ 支持开始、审批、抄送、条件分支节点类型
- ✨ 拖拽式节点添加和编辑功能
- ✨ 智能工作流验证机制
- ✨ 内置多种业务场景模板
- ✨ 完整的数据双向绑定支持
- ✨ 响应式设计和移动端适配
- ✨ 完整的 TypeScript 类型定义
- ✨ 工作流预览和统计功能
- ✨ 错误处理和自动恢复机制

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个工作流设计器组件基于强大的 Vue Flow 库构建，提供了完整的可视化流程设计体验和丰富的业务场景支持。无论是简单的审批流程还是复杂的业务工作流，都能通过拖拽方式快速构建。支持多种节点类型、智能验证、模板系统等企业级功能，结合 TypeScript 支持和响应式设计，让工作流设计既专业又高效。如果遇到问题请先查看文档和故障排除部分，或者在团队群里讨论。让我们一起打造更智能的工作流管理体验！ 🔄