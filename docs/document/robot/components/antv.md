---
outline: 'deep'
---

# C_AntV 通用图表组件

> 📊 基于 AntV 的统一图表容器，支持 ER 图、BPMN 流程图、UML 类图等多种专业图表类型

## ✨ 特性

- **🎯 多图表支持**: 统一容器支持 ER 图、BPMN 流程图、UML 类图等专业图表
- **🔄 智能适配**: 自动处理不同图表类型的数据格式转换和适配
- **🎨 主题切换**: 支持明暗主题切换，适应不同使用场景
- **🔧 工具栏集成**: 内置工具栏支持，提供丰富的图表操作功能
- **📱 响应式设计**: 灵活的尺寸配置，自适应不同容器大小
- **🔒 只读模式**: 支持只读模式，适合数据展示和预览场景
- **💪 TypeScript**: 完整的类型定义和类型安全
- **⚡ 高性能**: 基于 AntV 的优化渲染引擎
- **🔌 可扩展**: 模块化设计，易于扩展新的图表类型
- **🔄 双向绑定**: 完整的数据双向绑定支持

## 📦 安装

::: code-group

```bash [bun (推荐)]
# 安装 AntV 相关依赖
bun add @antv/g6 @antv/x6 @antv/g2
```

```bash [pnpm]
# 安装 AntV 相关依赖
pnpm install @antv/g6 @antv/x6 @antv/g2
```

```bash [yarn]
# 安装 AntV 相关依赖
yarn add @antv/g6 @antv/x6 @antv/g2
```

```bash [npm]
# 安装 AntV 相关依赖
npm install @antv/g6 @antv/x6 @antv/g2
```

:::

## 🎯 快速开始

### 基础用法

```vue {3-8}
<template>
  <!-- 最简单的图表组件 -->
  <C_AntV
    type="er"
    :data="erData"
    @ready="handleChartReady"
    @data-change="handleDataChange"
  />
</template>

<script setup>
const erData = ref({
  nodes: [
    {
      id: '1',
      label: '用户表',
      type: 'table',
      x: 100,
      y: 100,
      fields: [
        { name: 'id', type: 'INT', key: 'PK' },
        { name: 'name', type: 'VARCHAR(50)' },
        { name: 'email', type: 'VARCHAR(100)' },
      ],
    },
    {
      id: '2',
      label: '订单表',
      type: 'table',
      x: 300,
      y: 200,
      fields: [
        { name: 'id', type: 'INT', key: 'PK' },
        { name: 'user_id', type: 'INT', key: 'FK' },
        { name: 'amount', type: 'DECIMAL(10,2)' },
      ],
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: '1',
      target: '2',
      label: '一对多',
    },
  ],
})

const handleChartReady = (graph) => {
  console.log('图表已就绪:', graph)
}

const handleDataChange = (data) => {
  console.log('数据变化:', data)
}
</script>
```

::: details 🎛️ 完整功能示例 - 带控制面板的演示
```vue
<template>
  <div class="chart-demo">
    <!-- 控制面板 -->
    <div class="control-panel">
      <n-space align="center">
        <n-select
          v-model:value="chartConfig.type"
          :options="chartTypeOptions"
          placeholder="选择图表类型"
        />
        <n-select
          v-model:value="chartConfig.theme"
          :options="themeOptions"
          placeholder="选择主题"
        />
        <n-switch v-model:value="chartConfig.readonly">
          <template #checked>只读</template>
          <template #unchecked>编辑</template>
        </n-switch>
      </n-space>
    </div>

    <!-- 图表容器 -->
    <C_AntV
      ref="chartRef"
      :type="chartConfig.type"
      :data="currentChartData"
      :readonly="chartConfig.readonly"
      :theme="chartConfig.theme"
      @ready="handleChartReady"
      @data-change="handleDataChange"
    />

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <n-space>
        <n-button type="primary" @click="loadSampleData">
          加载示例数据
        </n-button>
        <n-button @click="exportData">导出数据</n-button>
        <n-button @click="exportImage">导出图片</n-button>
      </n-space>
    </div>
  </div>
</template>

<script setup>
const chartRef = ref()
const currentChartData = ref(null)

// 图表配置
const chartConfig = reactive({
  type: 'er',
  theme: 'light',
  readonly: false,
})

const chartTypeOptions = [
  { label: 'ER 图', value: 'er' },
  { label: 'BPMN 流程图', value: 'bpmn' },
  { label: 'UML 类图', value: 'uml' },
]

// 示例数据
const sampleData = {
  er: {
    nodes: [
      {
        id: 'user',
        label: '用户表',
        type: 'table',
        fields: [
          { name: 'id', type: 'INT', key: 'PK' },
          { name: 'username', type: 'VARCHAR(50)' },
          { name: 'email', type: 'VARCHAR(100)' },
        ],
      },
    ],
    edges: [],
  },
  // 其他类型的示例数据...
}

const loadSampleData = () => {
  currentChartData.value = sampleData[chartConfig.type]
}

const exportData = () => {
  // 导出逻辑
}

const exportImage = () => {
  // 导出图片逻辑
}
</script>
```
:::

## 📖 API 文档

### Props

| 参数             | 类型                      | 默认值     | 说明                     |
| ---------------- | ------------------------- | ---------- | ------------------------ |
| **type**         | `'er' \| 'bpmn' \| 'uml'` | -          | 图表类型（必需）         |
| **data**         | `DiagramData`             | `null`     | 图表数据                 |
| **width**        | `string \| number`        | `'100%'`   | 图表宽度                 |
| **height**       | `string \| number`        | `'600px'`  | 图表高度                 |
| **readonly**     | `boolean`                 | `false`    | 是否只读模式             |
| **showToolbar**  | `boolean`                 | `true`     | 是否显示工具栏           |
| **theme**        | `'light' \| 'dark'`       | `'light'`  | 主题模式                 |

### Events

| 事件名            | 参数                      | 说明                       |
| ----------------- | ------------------------- | -------------------------- |
| **ready**         | `(graph: any)`            | 图表初始化完成时触发       |
| **data-change**   | `(data: DiagramData)`     | 图表数据变化时触发         |

### 暴露方法

| 方法名         | 参数     | 返回值          | 说明                       |
| -------------- | -------- | --------------- | -------------------------- |
| **getGraph**   | `-`      | `any`           | 获取图表实例               |
| **getData**    | `-`      | `DiagramData`   | 获取当前图表数据           |

### 类型定义

#### 基础数据接口

```typescript
// 通用图表数据接口
interface DiagramData {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  [key: string]: any
}

// 通用节点接口
interface DiagramNode {
  id: string
  label: string
  type: string
  x: number
  y: number
  [key: string]: any
}

// 通用边接口
interface DiagramEdge {
  id: string
  source: string
  target: string
  label?: string
  type?: string
  [key: string]: any
}
```

#### ER 图类型定义

```typescript
// ER 图数据接口
interface ERDiagramData extends DiagramData {
  nodes: ERNode[]
  edges: EREdge[]
}

// ER 图节点
interface ERNode extends DiagramNode {
  type: 'table' | 'view'
  fields: ERField[]
}

// 数据库字段
interface ERField {
  name: string
  type: string
  key?: 'PK' | 'FK' | 'UK'
  nullable?: boolean
  comment?: string
}

// ER 图边
interface EREdge extends DiagramEdge {
  type: 'one-to-one' | 'one-to-many' | 'many-to-many'
}
```

#### BPMN 图类型定义

```typescript
// BPMN 图数据接口
interface BPMNDiagramData extends DiagramData {
  nodes: BPMNNode[]
  edges: BPMNEdge[]
  flows: BPMNFlow[]
}

// BPMN 节点
interface BPMNNode extends DiagramNode {
  type: 'startEvent' | 'endEvent' | 'task' | 'gateway' | 'subProcess'
}

// BPMN 边
interface BPMNEdge extends DiagramEdge {
  type: 'sequenceFlow' | 'messageFlow' | 'association'
}

// BPMN 流
interface BPMNFlow {
  id: string
  name: string
  condition?: string
}
```

#### UML 图类型定义

```typescript
// UML 图数据接口
interface UMLDiagramData extends DiagramData {
  nodes: UMLNode[]
  edges: UMLEdge[]
}

// UML 节点
interface UMLNode extends DiagramNode {
  type: 'class' | 'interface' | 'abstract' | 'enum'
  attributes: string[]
  methods: string[]
  visibility?: 'public' | 'private' | 'protected'
}

// UML 边
interface UMLEdge extends DiagramEdge {
  type: 'inheritance' | 'implementation' | 'association' | 'composition' | 'aggregation'
  multiplicity?: string
}
```

## 🎨 使用示例

### 场景 1: 数据库设计 ER 图

::: details 🗄️ 数据库设计工具
```vue
<template>
  <div class="database-design">
    <n-card title="数据库设计工具">
      <!-- 工具栏 -->
      <div class="toolbar">
        <n-space>
          <n-button type="primary" @click="addTable">添加表</n-button>
          <n-button @click="generateSQL">生成 SQL</n-button>
          <n-button @click="validateSchema">验证模式</n-button>
        </n-space>
      </div>

      <!-- ER 图 -->
      <C_AntV
        ref="erChartRef"
        type="er"
        :data="databaseSchema"
        @ready="handleERReady"
        @data-change="handleSchemaChange"
      />

      <!-- 表详情 -->
      <div class="table-details">
        <n-card title="表详情" size="small">
          <div v-if="selectedTable">
            <h4>{{ selectedTable.label }}</h4>
            <n-table size="small">
              <thead>
                <tr>
                  <th>字段名</th>
                  <th>类型</th>
                  <th>键</th>
                  <th>注释</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="field in selectedTable.fields" :key="field.name">
                  <td>{{ field.name }}</td>
                  <td>{{ field.type }}</td>
                  <td>{{ field.key || '-' }}</td>
                  <td>{{ field.comment || '-' }}</td>
                </tr>
              </tbody>
            </n-table>
          </div>
        </n-card>
      </div>
    </n-card>
  </div>
</template>

<script setup>
const erChartRef = ref()
const selectedTable = ref(null)

// 数据库模式
const databaseSchema = ref({
  nodes: [
    {
      id: 'users',
      label: '用户表 (users)',
      type: 'table',
      x: 100,
      y: 100,
      fields: [
        { name: 'id', type: 'BIGINT', key: 'PK', comment: '主键' },
        { name: 'username', type: 'VARCHAR(50)', comment: '用户名' },
        { name: 'email', type: 'VARCHAR(100)', comment: '邮箱' },
      ],
    },
    {
      id: 'orders',
      label: '订单表 (orders)',
      type: 'table',
      x: 400,
      y: 100,
      fields: [
        { name: 'id', type: 'BIGINT', key: 'PK', comment: '主键' },
        { name: 'user_id', type: 'BIGINT', key: 'FK', comment: '用户ID' },
        { name: 'amount', type: 'DECIMAL(10,2)', comment: '金额' },
      ],
    },
  ],
  edges: [
    {
      id: 'users_orders',
      source: 'users',
      target: 'orders',
      label: '1:N',
      type: 'one-to-many',
    },
  ],
})

const addTable = () => {
  // 添加表逻辑
}

const generateSQL = () => {
  const sqlStatements = []
  
  databaseSchema.value.nodes.forEach(table => {
    let sql = `CREATE TABLE ${table.id} (\n`
    const fieldsSql = table.fields.map(field => {
      let fieldSql = `  ${field.name} ${field.type}`
      if (field.key === 'PK') fieldSql += ' PRIMARY KEY'
      return fieldSql
    })
    sql += fieldsSql.join(',\n') + '\n);'
    sqlStatements.push(sql)
  })

  // 下载 SQL 文件
  const sqlContent = sqlStatements.join('\n\n')
  const blob = new Blob([sqlContent], { type: 'text/sql' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'database-schema.sql'
  link.click()
  URL.revokeObjectURL(url)
}

const validateSchema = () => {
  // 验证逻辑
}
</script>
```
:::

### 场景 2: 业务流程建模 BPMN

::: details 🔄 BPMN 流程建模工具
```vue
<template>
  <div class="bpmn-modeler">
    <n-card title="业务流程建模工具">
      <!-- 流程控制 -->
      <div class="process-controls mb-20px">
        <n-space align="center">
          <n-button type="primary" @click="createNewProcess">
            <template #icon>
              <i class="i-mdi:plus"></i>
            </template>
            新建流程
          </n-button>
          <n-button @click="validateProcess">
            <template #icon>
              <i class="i-mdi:check-circle"></i>
            </template>
            验证流程
          </n-button>
          <n-button @click="simulateProcess">
            <template #icon>
              <i class="i-mdi:play"></i>
            </template>
            模拟执行
          </n-button>
          <n-button @click="deployProcess">
            <template #icon>
              <i class="i-mdi:cloud-upload"></i>
            </template>
            部署流程
          </n-button>
          <n-divider vertical />
          <n-select
            v-model:value="selectedTemplate"
            :options="processTemplates"
            placeholder="选择模板"
            style="width: 150px"
            clearable
            @update:value="loadTemplate"
          />
        </n-space>
      </div>

      <!-- BPMN 图 -->
      <C_AntV
        ref="bpmnChartRef"
        type="bpmn"
        :data="processData"
        :width="1200"
        :height="700"
        :show-toolbar="true"
        @ready="handleBPMNReady"
        @data-change="handleProcessChange"
        class="bpmn-diagram"
      />

      <!-- 流程信息面板 -->
      <div class="process-info-panel mt-20px">
        <n-grid cols="3" x-gap="20">
          <!-- 节点列表 -->
          <n-grid-item>
            <n-card title="流程节点" size="small">
              <div class="node-list">
                <div
                  v-for="node in processData.nodes"
                  :key="node.id"
                  class="node-item"
                  :class="getNodeTypeClass(node.type)"
                  @click="selectNode(node)"
                >
                  <div class="node-icon">
                    <i :class="getNodeIcon(node.type)"></i>
                  </div>
                  <div class="node-info">
                    <div class="node-label">{{ node.label }}</div>
                    <div class="node-type">{{ getNodeTypeName(node.type) }}</div>
                  </div>
                </div>
              </div>
            </n-card>
          </n-grid-item>

          <!-- 节点详情 -->
          <n-grid-item>
            <n-card title="节点详情" size="small">
              <div v-if="selectedNode" class="node-details">
                <n-descriptions :column="1" size="small">
                  <n-descriptions-item label="节点ID">
                    {{ selectedNode.id }}
                  </n-descriptions-item>
                  <n-descriptions-item label="节点名称">
                    {{ selectedNode.label }}
                  </n-descriptions-item>
                  <n-descriptions-item label="节点类型">
                    {{ getNodeTypeName(selectedNode.type) }}
                  </n-descriptions-item>
                </n-descriptions>

                <!-- 节点属性编辑 -->
                <div class="node-properties mt-16px">
                  <n-form :model="selectedNode" size="small">
                    <n-form-item label="节点名称">
                      <n-input v-model:value="selectedNode.label" />
                    </n-form-item>
                    <n-form-item v-if="selectedNode.type === 'task'" label="执行者">
                      <n-select
                        v-model:value="selectedNode.assignee"
                        :options="assigneeOptions"
                        placeholder="选择执行者"
                        clearable
                      />
                    </n-form-item>
                  </n-form>
                </div>
              </div>
              <n-empty v-else description="请选择一个节点" size="small" />
            </n-card>
          </n-grid-item>

          <!-- 流程统计 -->
          <n-grid-item>
            <n-card title="流程统计" size="small">
              <div class="process-stats">
                <div class="stat-item">
                  <div class="stat-label">总节点数</div>
                  <div class="stat-value">{{ processData.nodes.length }}</div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">流转线数</div>
                  <div class="stat-value">{{ processData.edges.length }}</div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">任务节点</div>
                  <div class="stat-value">{{ getNodeCountByType('task') }}</div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">复杂度</div>
                  <div class="stat-value">{{ calculateComplexity() }}</div>
                </div>
              </div>

              <!-- 验证结果 -->
              <div v-if="validationResult" class="validation-result mt-16px">
                <n-alert
                  :type="validationResult.valid ? 'success' : 'error'"
                  :title="validationResult.valid ? '验证通过' : '验证失败'"
                >
                  <ul v-if="validationResult.errors.length > 0">
                    <li v-for="error in validationResult.errors" :key="error">
                      {{ error }}
                    </li>
                  </ul>
                  <span v-else>流程定义正确，可以部署</span>
                </n-alert>
              </div>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>

      <!-- 流程模拟器 -->
      <div v-if="showSimulator" class="process-simulator mt-20px">
        <n-card title="流程模拟器" size="small">
          <div class="simulator-controls mb-16px">
            <n-space>
              <n-button type="primary" @click="startSimulation">
                <template #icon>
                  <i class="i-mdi:play"></i>
                </template>
                开始模拟
              </n-button>
              <n-button @click="stepSimulation" :disabled="!simulationRunning">
                <template #icon>
                  <i class="i-mdi:step-forward"></i>
                </template>
                单步执行
              </n-button>
              <n-button @click="stopSimulation" :disabled="!simulationRunning">
                <template #icon>
                  <i class="i-mdi:stop"></i>
                </template>
                停止模拟
              </n-button>
              <n-divider vertical />
              <span>当前节点: {{ currentSimulationNode?.label || '未开始' }}</span>
            </n-space>
          </div>

          <div class="simulation-log">
            <n-timeline>
              <n-timeline-item
                v-for="(log, index) in simulationLogs"
                :key="index"
                :type="log.type"
                :title="log.title"
                :content="log.content"
                :time="log.time"
              />
            </n-timeline>
          </div>
        </n-card>
      </div>
    </n-card>
  </div>
</template>

<script setup>
const bpmnChartRef = ref()
const message = useMessage()

// 流程数据
const processData = ref({
  nodes: [
    {
      id: 'start',
      label: '开始',
      type: 'startEvent',
      x: 100,
      y: 200,
    },
    {
      id: 'task1',
      label: '填写申请',
      type: 'task',
      x: 250,
      y: 200,
      assignee: 'user',
    },
    {
      id: 'gateway1',
      label: '金额判断',
      type: 'exclusiveGateway',
      x: 400,
      y: 200,
      condition: 'amount > 1000',
    },
    {
      id: 'task2',
      label: '主管审批',
      type: 'task',
      x: 550,
      y: 150,
      assignee: 'manager',
    },
    {
      id: 'task3',
      label: '财务审批',
      type: 'task',
      x: 550,
      y: 250,
      assignee: 'finance',
    },
    {
      id: 'end',
      label: '结束',
      type: 'endEvent',
      x: 700,
      y: 200,
    },
  ],
  edges: [
    { id: 'flow1', source: 'start', target: 'task1', label: '' },
    { id: 'flow2', source: 'task1', target: 'gateway1', label: '' },
    { id: 'flow3', source: 'gateway1', target: 'task2', label: '≤1000' },
    { id: 'flow4', source: 'gateway1', target: 'task3', label: '>1000' },
    { id: 'flow5', source: 'task2', target: 'end', label: '' },
    { id: 'flow6', source: 'task3', target: 'end', label: '' },
  ],
  flows: [
    { id: 'flow1', name: '提交申请' },
    { id: 'flow2', name: '进入审批' },
    { id: 'flow3', name: '小额审批' },
    { id: 'flow4', name: '大额审批' },
    { id: 'flow5', name: '审批完成' },
    { id: 'flow6', name: '审批完成' },
  ],
})

const selectedNode = ref(null)
const selectedTemplate = ref('')
const validationResult = ref(null)
const showSimulator = ref(false)
const simulationRunning = ref(false)
const currentSimulationNode = ref(null)
const simulationLogs = ref([])

// 流程模板
const processTemplates = [
  { label: '请假审批流程', value: 'leave' },
  { label: '报销审批流程', value: 'expense' },
  { label: '采购审批流程', value: 'purchase' },
  { label: '合同审批流程', value: 'contract' },
]

const assigneeOptions = [
  { label: '员工', value: 'user' },
  { label: '主管', value: 'manager' },
  { label: '财务', value: 'finance' },
  { label: '人事', value: 'hr' },
  { label: '总监', value: 'director' },
]

// 事件处理
const handleBPMNReady = (graph) => {
  console.log('BPMN图初始化完成:', graph)
}

const handleProcessChange = (data) => {
  processData.value = data
}

const selectNode = (node) => {
  selectedNode.value = { ...node }
}

const createNewProcess = () => {
  processData.value = {
    nodes: [
      {
        id: 'start',
        label: '开始',
        type: 'startEvent',
        x: 100,
        y: 200,
      },
      {
        id: 'end',
        label: '结束',
        type: 'endEvent',
        x: 300,
        y: 200,
      },
    ],
    edges: [],
    flows: [],
  }
  selectedNode.value = null
  message.success('已创建新流程')
}

const validateProcess = () => {
  const errors = []
  
  // 检查是否有开始节点
  const startNodes = processData.value.nodes.filter(n => n.type === 'startEvent')
  if (startNodes.length === 0) {
    errors.push('流程必须有一个开始节点')
  } else if (startNodes.length > 1) {
    errors.push('流程只能有一个开始节点')
  }
  
  // 检查是否有结束节点
  const endNodes = processData.value.nodes.filter(n => n.type === 'endEvent')
  if (endNodes.length === 0) {
    errors.push('流程必须有至少一个结束节点')
  }
  
  // 检查任务节点是否有执行者
  const taskNodes = processData.value.nodes.filter(n => n.type === 'task')
  taskNodes.forEach(task => {
    if (!task.assignee) {
      errors.push(`任务节点 "${task.label}" 缺少执行者`)
    }
  })
  
  validationResult.value = {
    valid: errors.length === 0,
    errors,
  }
  
  if (errors.length === 0) {
    message.success('流程验证通过')
  } else {
    message.error(`流程验证失败，发现 ${errors.length} 个问题`)
  }
}

const simulateProcess = () => {
  showSimulator.value = true
  message.info('流程模拟器已打开')
}

const deployProcess = () => {
  validateProcess()
  if (validationResult.value?.valid) {
    message.success('流程部署成功')
  } else {
    message.error('流程存在问题，无法部署')
  }
}

const loadTemplate = (templateKey) => {
  if (!templateKey) return
  
  const templates = {
    leave: {
      nodes: [
        { id: 'start', label: '员工申请', type: 'startEvent', x: 100, y: 200 },
        { id: 'task1', label: '填写请假申请', type: 'task', x: 250, y: 200, assignee: 'user' },
        { id: 'task2', label: '主管审批', type: 'task', x: 400, y: 200, assignee: 'manager' },
        { id: 'end', label: '请假生效', type: 'endEvent', x: 550, y: 200 },
      ],
      edges: [
        { id: 'flow1', source: 'start', target: 'task1', label: '' },
        { id: 'flow2', source: 'task1', target: 'task2', label: '' },
        { id: 'flow3', source: 'task2', target: 'end', label: '' },
      ],
      flows: [
        { id: 'flow1', name: '提交申请' },
        { id: 'flow2', name: '等待审批' },
        { id: 'flow3', name: '流程结束' },
      ],
    },
    expense: {
      nodes: [
        { id: 'start', label: '发起报销', type: 'startEvent', x: 100, y: 200 },
        { id: 'task1', label: '填写报销单', type: 'task', x: 250, y: 200, assignee: 'user' },
        { id: 'gateway1', label: '金额判断', type: 'exclusiveGateway', x: 400, y: 200, condition: 'amount > 1000' },
        { id: 'task2', label: '主管审批', type: 'task', x: 550, y: 150, assignee: 'manager' },
        { id: 'task3', label: '财务审批', type: 'task', x: 550, y: 250, assignee: 'finance' },
        { id: 'end', label: '报销完成', type: 'endEvent', x: 700, y: 200 },
      ],
      edges: [
        { id: 'flow1', source: 'start', target: 'task1', label: '' },
        { id: 'flow2', source: 'task1', target: 'gateway1', label: '' },
        { id: 'flow3', source: 'gateway1', target: 'task2', label: '≤1000' },
        { id: 'flow4', source: 'gateway1', target: 'task3', label: '>1000' },
        { id: 'flow5', source: 'task2', target: 'end', label: '' },
        { id: 'flow6', source: 'task3', target: 'end', label: '' },
      ],
      flows: [
        { id: 'flow1', name: '提交报销' },
        { id: 'flow2', name: '进入审批' },
        { id: 'flow3', name: '小额审批' },
        { id: 'flow4', name: '大额审批' },
        { id: 'flow5', name: '审批完成' },
        { id: 'flow6', name: '审批完成' },
      ],
    },
  }
  
  const template = templates[templateKey]
  if (template) {
    processData.value = { ...template }
    message.success(`已加载${processTemplates.find(t => t.value === templateKey)?.label}模板`)
  }
}

// 模拟执行
const startSimulation = () => {
  simulationRunning.value = true
  simulationLogs.value = []
  
  const startNode = processData.value.nodes.find(n => n.type === 'startEvent')
  if (startNode) {
    currentSimulationNode.value = startNode
    addSimulationLog('info', '流程开始', `从节点 "${startNode.label}" 开始执行`)
  }
}

const stepSimulation = () => {
  if (!currentSimulationNode.value) return
  
  // 查找下一个节点
  const outgoingEdges = processData.value.edges.filter(
    e => e.source === currentSimulationNode.value.id
  )
  
  if (outgoingEdges.length > 0) {
    const nextEdge = outgoingEdges[0] // 简化处理，取第一个
    const nextNode = processData.value.nodes.find(n => n.id === nextEdge.target)
    
    if (nextNode) {
      addSimulationLog('success', '流转', `从 "${currentSimulationNode.value.label}" 流转到 "${nextNode.label}"`)
      currentSimulationNode.value = nextNode
      
      if (nextNode.type === 'endEvent') {
        simulationRunning.value = false
        addSimulationLog('info', '流程结束', '流程执行完成')
      }
    }
  }
}

const stopSimulation = () => {
  simulationRunning.value = false
  currentSimulationNode.value = null
  addSimulationLog('warning', '流程中断', '用户手动停止了流程模拟')
}

const addSimulationLog = (type, title, content) => {
  simulationLogs.value.push({
    type,
    title,
    content,
    time: new Date().toLocaleTimeString(),
  })
}

// 辅助方法
const getNodeTypeClass = (type) => {
  const classMap = {
    'startEvent': 'node-start',
    'endEvent': 'node-end',
    'task': 'node-task',
    'exclusiveGateway': 'node-gateway',
    'parallelGateway': 'node-gateway',
  }
  return classMap[type] || 'node-default'
}

const getNodeIcon = (type) => {
  const iconMap = {
    'startEvent': 'i-mdi:play-circle',
    'endEvent': 'i-mdi:stop-circle',
    'task': 'i-mdi:clipboard-text',
    'exclusiveGateway': 'i-mdi:source-branch',
    'parallelGateway': 'i-mdi:source-merge',
  }
  return iconMap[type] || 'i-mdi:circle'
}

const getNodeTypeName = (type) => {
  const nameMap = {
    'startEvent': '开始事件',
    'endEvent': '结束事件',
    'task': '任务',
    'exclusiveGateway': '排他网关',
    'parallelGateway': '并行网关',
  }
  return nameMap[type] || type
}

const getNodeCountByType = (type) => {
  return processData.value.nodes.filter(n => n.type === type).length
}

const calculateComplexity = () => {
  const nodeCount = processData.value.nodes.length
  const edgeCount = processData.value.edges.length
  const gatewayCount = processData.value.nodes.filter(n => n.type.includes('Gateway')).length
  
  const complexity = nodeCount + edgeCount + gatewayCount * 2
  
  if (complexity < 10) return '简单'
  if (complexity < 20) return '中等'
  return '复杂'
}
</script>

<style scoped>
.bpmn-modeler {
  padding: 24px;
}

.bpmn-diagram {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.node-list {
  max-height: 300px;
  overflow-y: auto;
}

.node-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 4px;
  transition: background-color 0.2s;
}

.node-item:hover {
  background-color: #f0f0f0;
}

.node-start { border-left: 4px solid #52c41a; }
.node-end { border-left: 4px solid #ff4d4f; }
.node-task { border-left: 4px solid #1890ff; }
.node-gateway { border-left: 4px solid #fa8c16; }

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

.node-label {
  font-weight: 500;
  margin-bottom: 2px;
}

.node-type {
  font-size: 12px;
  color: #666;
}

.process-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-item {
  text-align: center;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 6px;
}

.stat-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: #1890ff;
}

.simulation-log {
  max-height: 300px;
  overflow-y: auto;
}
</style>
```
:::

### 场景 3: UML 类图设计

::: details 📊 UML 类图设计工具
```vue
<template>
  <div class="uml-designer">
    <n-card title="UML 类图设计工具">
      <!-- 工具栏 -->
      <div class="toolbar">
        <n-space>
          <n-button type="primary" @click="addClass">添加类</n-button>
          <n-button @click="addInterface">添加接口</n-button>
          <n-button @click="generateCode">生成代码</n-button>
        </n-space>
      </div>

      <!-- UML 图 -->
      <C_AntV
        ref="umlChartRef"
        type="uml"
        :data="classModel"
        @ready="handleUMLReady"
        @data-change="handleModelChange"
      />

      <!-- 类详情 -->
      <div class="class-details">
        <n-card title="类详情" size="small">
          <div v-if="selectedClass">
            <h4>{{ selectedClass.label }}</h4>
            <div class="attributes">
              <h5>属性</h5>
              <ul>
                <li v-for="attr in selectedClass.attributes" :key="attr">
                  {{ attr }}
                </li>
              </ul>
            </div>
            <div class="methods">
              <h5>方法</h5>
              <ul>
                <li v-for="method in selectedClass.methods" :key="method">
                  {{ method }}
                </li>
              </ul>
            </div>
          </div>
        </n-card>
      </div>
    </n-card>
  </div>
</template>

<script setup>
const umlChartRef = ref()
const selectedClass = ref(null)

// UML 类模型
const classModel = ref({
  nodes: [
    {
      id: 'User',
      label: 'User',
      type: 'class',
      x: 100,
      y: 100,
      attributes: [
        '- id: Long',
        '- username: String',
        '- email: String',
      ],
      methods: [
        '+ login(): boolean',
        '+ logout(): void',
        '+ updateProfile(): void',
      ],
    },
  ],
  edges: [],
})

const addClass = () => {
  // 添加类
}

const addInterface = () => {
  // 添加接口
}

const generateCode = () => {
  // 生成代码
}
</script>
```
:::

## 🛠️ 高级用法

::: details 🔄 数据格式转换和适配
```javascript
// 数据适配器
class DiagramDataAdapter {
  static adaptToER(rawData) {
    if (rawData.tables) {
      return {
        nodes: rawData.tables.map(table => ({
          id: table.name,
          label: table.comment || table.name,
          type: 'table',
          fields: table.columns.map(col => ({
            name: col.name,
            type: col.type,
            key: col.isPrimaryKey ? 'PK' : col.isForeignKey ? 'FK' : null,
          })),
        })),
        edges: rawData.relations || [],
      }
    }
    return rawData
  }

  static adaptToBPMN(workflowData) {
    if (workflowData.workflow) {
      return {
        nodes: workflowData.workflow.tasks.map(task => ({
          id: task.id,
          label: task.name,
          type: task.type === 'start' ? 'startEvent' : 'task',
        })),
        edges: workflowData.workflow.flows,
      }
    }
    return workflowData
  }
}
```
:::

::: details 🎨 图表主题定制
```javascript
// 主题定制器
const useCustomTheme = () => {
  const themeConfig = reactive({
    backgroundColor: '#ffffff',
    nodeColor: '#1890ff',
    edgeColor: '#666666',
    textColor: '#333333',
  })

  const customTheme = computed(() => ({
    backgroundColor: themeConfig.backgroundColor,
    node: {
      style: {
        fill: themeConfig.nodeColor,
        stroke: themeConfig.edgeColor,
      },
    },
    edge: {
      style: {
        stroke: themeConfig.edgeColor,
      },
    },
  }))

  return { themeConfig, customTheme }
}
```
:::

## ⚠️ 注意事项

### 1. 数据格式一致性

```javascript
// ✅ 推荐：确保数据格式符合图表类型要求
const validateDataFormat = (type, data) => {
  const validators = {
    er: (data) => data.nodes?.every(node => node.fields),
    bpmn: (data) => data.nodes?.every(node => node.type) && data.flows,
    uml: (data) => data.nodes?.every(node => node.attributes && node.methods),
  }
  
  return validators[type]?.(data) || false
}
```

### 2. 性能优化

```javascript
// ✅ 推荐：大数据量时的优化策略
const optimizeChartData = (data) => {
  if (data.nodes?.length > 100) {
    return {
      ...data,
      nodes: data.nodes.slice(0, 100),
      hasMore: true,
    }
  }
  return data
}
```

## 🐛 故障排除

### 常见问题

#### Q1: 图表不显示或显示异常？

**A1:** 检查数据格式和组件配置：

::: details 查看故障排除代码
```javascript
// 确保数据格式正确
const checkDataFormat = (type, data) => {
  console.log(`检查${type}类型数据:`, data)
  
  if (!data || !data.nodes) {
    console.error('缺少 nodes 数据')
    return false
  }
  
  if (!data.edges) {
    console.error('缺少 edges 数据')
    return false
  }
  
  return true
}

// 检查组件属性
const validateProps = (props) => {
  if (!['er', 'bpmn', 'uml'].includes(props.type)) {
    console.error('不支持的图表类型:', props.type)
    return false
  }
  
  return true
}
```
:::

#### Q2: 数据更新不响应？

**A2:** 检查数据响应式和更新方式：

::: details 查看数据更新代码
```javascript
// ✅ 正确的数据更新
const updateChartData = (newData) => {
  // 确保触发响应式更新
  chartData.value = { ...newData }
}

// ❌ 错误的更新方式
const wrongUpdate = (newData) => {
  chartData.value.nodes = newData.nodes // 可能不触发更新
}
```
:::

#### Q3: 图表类型切换时出错？

**A3:** 处理类型切换时的数据清理：

::: details 查看类型切换代码
```javascript
watch(
  () => props.type,
  (newType, oldType) => {
    if (newType !== oldType) {
      // 清理旧数据，防止格式冲突
      nextTick(() => {
        if (chartRef.value) {
          chartRef.value.clear?.()
        }
      })
    }
  }
)
```
:::

#### Q4: 导出功能不工作？

**A4:** 检查图表实例和导出方法：

::: details 查看导出功能代码
```javascript
const exportChart = (format = 'png') => {
  const graph = chartRef.value?.getGraph()
  
  if (!graph) {
    message.error('图表实例不存在')
    return
  }
  
  if (!graph.downloadPNG && format === 'png') {
    message.error('当前图表不支持PNG导出')
    return
  }
  
  try {
    if (format === 'png') {
      graph.downloadPNG(`chart-${Date.now()}`)
    } else if (format === 'svg') {
      graph.downloadSVG(`chart-${Date.now()}`)
    }
  } catch (error) {
    console.error('导出失败:', error)
    message.error('导出失败，请重试')
  }
}
```
:::

#### Q5: 自定义主题不生效？

**A5:** 检查主题配置和应用时机：

::: details 查看主题应用代码
```javascript
// ✅ 正确的主题应用
const applyTheme = (theme) => {
  const graph = chartRef.value?.getGraph()
  
  if (graph) {
    // 确保在图表就绪后应用主题
    nextTick(() => {
      if (graph.updateTheme) {
        graph.updateTheme(theme)
      } else {
        // 降级方案：重新渲染
        graph.render()
      }
    })
  }
}
```
:::

## 🎯 最佳实践

### 1. 数据管理策略

::: details 查看数据管理代码
```javascript
// 统一的数据管理器
class ChartDataManager {
  constructor() {
    this.data = reactive({
      er: null,
      bpmn: null,
      uml: null,
    })
    this.history = []
    this.currentIndex = -1
  }
  
  // 设置数据并记录历史
  setData(type, data) {
    this.data[type] = data
    this.addToHistory(type, data)
  }
  
  // 添加到历史记录
  addToHistory(type, data) {
    this.history = this.history.slice(0, this.currentIndex + 1)
    this.history.push({ type, data: JSON.parse(JSON.stringify(data)) })
    this.currentIndex++
    
    // 限制历史记录数量
    if (this.history.length > 50) {
      this.history.shift()
      this.currentIndex--
    }
  }
  
  // 撤销
  undo() {
    if (this.currentIndex > 0) {
      this.currentIndex--
      const { type, data } = this.history[this.currentIndex]
      this.data[type] = data
      return { type, data }
    }
    return null
  }
  
  // 重做
  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++
      const { type, data } = this.history[this.currentIndex]
      this.data[type] = data
      return { type, data }
    }
    return null
  }
  
  // 获取数据
  getData(type) {
    return this.data[type]
  }
  
  // 清空数据
  clear(type) {
    this.data[type] = null
    this.addToHistory(type, null)
  }
}

// 使用数据管理器
const dataManager = new ChartDataManager()

const handleDataChange = (data) => {
  dataManager.setData(currentChartType.value, data)
}

const undoChange = () => {
  const result = dataManager.undo()
  if (result) {
    currentChartData.value = result.data
  }
}
```
:::

### 2. 组件复用模式

::: details 查看组件复用代码
```javascript
// 可复用的图表组件封装
const useChart = (type, initialData = null) => {
  const chartRef = ref()
  const chartData = ref(initialData)
  const isReady = ref(false)
  const loading = ref(false)
  
  const methods = {
    async loadData(data) {
      loading.value = true
      try {
        chartData.value = data
        await nextTick()
        message.success('数据加载成功')
      } catch (error) {
        console.error('数据加载失败:', error)
        message.error('数据加载失败')
      } finally {
        loading.value = false
      }
    },
    
    exportData() {
      if (!chartRef.value) return null
      return chartRef.value.getData()
    },
    
    exportImage(format = 'png') {
      const graph = chartRef.value?.getGraph()
      if (graph && graph.downloadPNG) {
        graph.downloadPNG(`${type}-chart-${Date.now()}`)
        return true
      }
      return false
    },
    
    fitView() {
      const graph = chartRef.value?.getGraph()
      if (graph && graph.fitView) {
        graph.fitView()
        return true
      }
      return false
    },
    
    clear() {
      chartData.value = null
    },
  }
  
  const handleReady = (graph) => {
    isReady.value = true
    console.log(`${type}图表就绪`)
  }
  
  const handleDataChange = (data) => {
    chartData.value = data
  }
  
  return {
    chartRef,
    chartData,
    isReady,
    loading,
    methods,
    handleReady,
    handleDataChange,
  }
}

// 使用示例
const { 
  chartRef: erChartRef, 
  chartData: erData, 
  methods: erMethods 
} = useChart('er')
```
:::

### 3. 错误处理和监控

::: details 查看错误处理代码
```javascript
// 图表错误处理器
class ChartErrorHandler {
  constructor() {
    this.errors = []
    this.maxErrors = 50
  }
  
  // 记录错误
  logError(error, context = {}) {
    const errorInfo = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      message: error.message || error,
      stack: error.stack,
      context,
      level: this.getErrorLevel(error),
    }
    
    this.errors.unshift(errorInfo)
    
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors)
    }
    
    this.handleError(errorInfo)
  }
  
  // 获取错误级别
  getErrorLevel(error) {
    if (error.name === 'RenderError') return 'error'
    if (error.name === 'DataFormatError') return 'warning'
    if (error.name === 'NetworkError') return 'error'
    return 'info'
  }
  
  // 处理错误
  handleError(errorInfo) {
    switch (errorInfo.level) {
      case 'error':
        message.error(`图表错误: ${errorInfo.message}`)
        this.reportError(errorInfo)
        break
      case 'warning':
        message.warning(`图表警告: ${errorInfo.message}`)
        break
      case 'info':
        console.info('图表信息:', errorInfo.message)
        break
    }
  }
  
  // 错误恢复策略
  async attemptRecovery(error, context) {
    const strategies = {
      'RenderError': () => this.recoverFromRenderError(context),
      'DataFormatError': () => this.recoverFromDataError(context),
      'NetworkError': () => this.recoverFromNetworkError(context),
    }
    
    const strategy = strategies[error.name]
    if (strategy) {
      try {
        await strategy()
        return true
      } catch (recoveryError) {
        this.logError(recoveryError, { ...context, isRecovery: true })
        return false
      }
    }
    
    return false
  }
  
  // 上报错误
  reportError(errorInfo) {
    // 实际项目中发送到错误监控服务
    console.error('Error reported:', errorInfo)
  }
  
  // 获取错误统计
  getErrorStats() {
    const stats = {
      total: this.errors.length,
      byLevel: {},
      recent: this.errors.slice(0, 10),
    }
    
    this.errors.forEach(error => {
      stats.byLevel[error.level] = (stats.byLevel[error.level] || 0) + 1
    })
    
    return stats
  }
}

// 全局错误处理器
const chartErrorHandler = new ChartErrorHandler()

// 包装图表操作
const safeChartOperation = async (operation, context = {}) => {
  try {
    return await operation()
  } catch (error) {
    chartErrorHandler.logError(error, context)
    
    // 尝试自动恢复
    const recovered = await chartErrorHandler.attemptRecovery(error, context)
    if (!recovered) {
      throw error
    }
  }
}
```
:::

### 4. 性能优化策略

::: details 查看性能优化代码
```javascript
// 图表性能优化器
class ChartPerformanceOptimizer {
  constructor() {
    this.renderQueue = []
    this.isRendering = false
    this.renderTimeout = null
  }
  
  // 批量渲染优化
  batchRender(renderFn, delay = 100) {
    this.renderQueue.push(renderFn)
    
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout)
    }
    
    this.renderTimeout = setTimeout(() => {
      this.processRenderQueue()
    }, delay)
  }
  
  // 处理渲染队列
  async processRenderQueue() {
    if (this.isRendering) return
    
    this.isRendering = true
    
    try {
      // 合并同类型的渲染操作
      const uniqueRenders = this.deduplicateRenders(this.renderQueue)
      
      for (const renderFn of uniqueRenders) {
        await renderFn()
      }
    } finally {
      this.renderQueue = []
      this.isRendering = false
    }
  }
  
  // 去重渲染操作
  deduplicateRenders(renders) {
    const seen = new Set()
    return renders.filter(render => {
      const key = render.toString()
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }
  
  // 大数据量优化
  optimizeLargeDataset(data, maxNodes = 200, maxEdges = 500) {
    if (!data) return data
    
    let optimizedData = { ...data }
    
    // 节点数量优化
    if (data.nodes && data.nodes.length > maxNodes) {
      console.warn(`节点数量过多(${data.nodes.length})，进行优化`)
      
      // 保留重要节点，其他进行聚合
      const importantNodes = data.nodes.filter(node => node.important !== false)
      const otherNodes = data.nodes.filter(node => node.important === false)
      
      let finalNodes = importantNodes.slice(0, maxNodes * 0.8)
      
      if (otherNodes.length > 0) {
        // 创建聚合节点
        const aggregateNode = {
          id: 'aggregate-node',
          label: `其他节点 (${otherNodes.length})`,
          type: 'aggregate',
          x: 0,
          y: 0,
          children: otherNodes,
        }
        finalNodes.push(aggregateNode)
      }
      
      optimizedData.nodes = finalNodes
    }
    
    // 边数量优化
    if (data.edges && data.edges.length > maxEdges) {
      console.warn(`边数量过多(${data.edges.length})，进行优化`)
      
      // 保留重要关系
      optimizedData.edges = data.edges
        .filter(edge => edge.important !== false)
        .slice(0, maxEdges)
    }
    
    return optimizedData
  }
  
  // 内存使用监控
  monitorMemoryUsage() {
    if (performance.memory) {
      const memInfo = {
        used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024),
      }
      
      console.log('内存使用情况:', memInfo)
      
      // 内存使用过高时的处理
      if (memInfo.used / memInfo.limit > 0.8) {
        console.warn('内存使用过高，触发清理')
        this.cleanupMemory()
      }
      
      return memInfo
    }
    
    return null
  }
  
  // 清理内存
  cleanupMemory() {
    // 清理不必要的缓存
    if (window.gc) {
      window.gc()
    }
    
    // 清理图表缓存
    this.clearChartCache()
  }
  
  // 清理图表缓存
  clearChartCache() {
    // 清理图表相关的缓存数据
    console.log('清理图表缓存')
  }
}

// 全局性能优化器
const performanceOptimizer = new ChartPerformanceOptimizer()

// 使用性能优化
const useOptimizedChart = () => {
  const chartData = ref(null)
  
  const optimizedData = computed(() => {
    if (!chartData.value) return null
    return performanceOptimizer.optimizeLargeDataset(chartData.value)
  })
  
  const updateData = (newData) => {
    performanceOptimizer.batchRender(() => {
      chartData.value = newData
    })
  }
  
  // 定期监控性能
  onMounted(() => {
    const interval = setInterval(() => {
      performanceOptimizer.monitorMemoryUsage()
    }, 30000) // 每30秒检查一次
    
    onUnmounted(() => {
      clearInterval(interval)
    })
  })
  
  return {
    chartData,
    optimizedData,
    updateData,
  }
}
```
:::

## 📝 更新日志111

### v1.0.0 (2025-07-19)

- ✨ 统一的 AntV 图表容器组件
- ✨ 支持 ER 图、BPMN 流程图、UML 类图三种图表类型
- ✨ 智能数据格式转换和适配机制
- ✨ 完整的双向数据绑定支持
- ✨ 主题切换和自定义主题支持
- ✨ 工具栏集成和只读模式
- ✨ 完整的 TypeScript 类型定义
- ✨ 响应式设计和灵活尺寸配置
- ✨ 丰富的事件回调系统
- ✨ 高性能渲染和内存管理

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个通用图表组件基于强大的 AntV 生态系统构建，提供了统一的接口来使用不同类型的专业图表。无论是数据库设计的 ER 图、业务流程的 BPMN 图，还是软件架构的 UML 图，都能通过一个组件轻松实现。支持智能数据适配、主题定制、性能优化等企业级功能，结合完整的 TypeScript 支持和响应式设计，让专业图表的使用变得简单高效。如果遇到问题请先查看文档和故障排除部分，或者在团队群里讨论。让我们一起打造更专业的可视化图表体验！ 📊