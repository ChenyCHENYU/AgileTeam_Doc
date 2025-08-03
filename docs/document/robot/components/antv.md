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

```bash
# 安装 AntV 相关依赖
bun add @antv/g6 @antv/x6 @antv/g2
```

## 🎯 快速开始

### 基础用法

```vue
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

### 完整功能示例

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
          style="width: 150px"
        />
        
        <n-select
          v-model:value="chartConfig.theme"
          :options="themeOptions"
          placeholder="选择主题"
          style="width: 100px"
        />
        
        <n-switch v-model:value="chartConfig.readonly">
          <template #checked>只读</template>
          <template #unchecked>编辑</template>
        </n-switch>
        
        <n-switch v-model:value="chartConfig.showToolbar">
          <template #checked>显示工具栏</template>
          <template #unchecked>隐藏工具栏</template>
        </n-switch>
        
        <n-input-group>
          <n-input-number
            v-model:value="chartConfig.width"
            :min="300"
            :step="50"
            placeholder="宽度"
            style="width: 100px"
          />
          <n-input-group-label>×</n-input-group-label>
          <n-input-number
            v-model:value="chartConfig.height"
            :min="200"
            :step="50"
            placeholder="高度"
            style="width: 100px"
          />
        </n-input-group>
      </n-space>
    </div>

    <!-- 图表容器 -->
    <div class="chart-container">
      <C_AntV
        ref="chartRef"
        :type="chartConfig.type"
        :data="currentChartData"
        :width="chartConfig.width"
        :height="chartConfig.height"
        :readonly="chartConfig.readonly"
        :show-toolbar="chartConfig.showToolbar"
        :theme="chartConfig.theme"
        @ready="handleChartReady"
        @data-change="handleDataChange"
        class="chart-instance"
      />
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <n-space>
        <n-button type="primary" @click="loadSampleData">
          加载示例数据
        </n-button>
        <n-button @click="exportData">
          导出数据
        </n-button>
        <n-button @click="exportImage">
          导出图片
        </n-button>
        <n-button @click="fitView">
          适应画布
        </n-button>
        <n-button type="warning" @click="clearData">
          清空数据
        </n-button>
      </n-space>
    </div>

    <!-- 数据预览 -->
    <div class="data-preview">
      <n-card title="数据预览" size="small">
        <n-tabs type="line" size="small">
          <n-tab-pane name="json" tab="JSON 数据">
            <n-code
              :code="JSON.stringify(currentChartData, null, 2)"
              language="json"
              :show-line-numbers="true"
              :word-wrap="true"
            />
          </n-tab-pane>
          <n-tab-pane name="stats" tab="统计信息">
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value">{{ chartStats.nodeCount }}</div>
                <div class="stat-label">节点数</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ chartStats.edgeCount }}</div>
                <div class="stat-label">连线数</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ chartStats.complexity }}</div>
                <div class="stat-label">复杂度</div>
              </div>
            </div>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </div>
</template>

<script setup>
const chartRef = ref()
const message = useMessage()

// 图表配置
const chartConfig = reactive({
  type: 'er',
  theme: 'light',
  width: 800,
  height: 600,
  readonly: false,
  showToolbar: true,
})

const chartTypeOptions = [
  { label: 'ER 图', value: 'er' },
  { label: 'BPMN 流程图', value: 'bpmn' },
  { label: 'UML 类图', value: 'uml' },
]

const themeOptions = [
  { label: '浅色', value: 'light' },
  { label: '深色', value: 'dark' },
]

// 当前图表数据
const currentChartData = ref(null)

// 示例数据
const sampleData = {
  er: {
    nodes: [
      {
        id: 'user',
        label: '用户表 (User)',
        type: 'table',
        x: 100,
        y: 100,
        fields: [
          { name: 'id', type: 'INT', key: 'PK', comment: '主键' },
          { name: 'username', type: 'VARCHAR(50)', nullable: false, comment: '用户名' },
          { name: 'email', type: 'VARCHAR(100)', nullable: false, comment: '邮箱' },
          { name: 'created_at', type: 'TIMESTAMP', comment: '创建时间' },
        ],
      },
      {
        id: 'order',
        label: '订单表 (Order)',
        type: 'table',
        x: 400,
        y: 100,
        fields: [
          { name: 'id', type: 'INT', key: 'PK', comment: '主键' },
          { name: 'user_id', type: 'INT', key: 'FK', comment: '用户ID' },
          { name: 'amount', type: 'DECIMAL(10,2)', nullable: false, comment: '金额' },
          { name: 'status', type: 'ENUM', comment: '状态' },
          { name: 'created_at', type: 'TIMESTAMP', comment: '创建时间' },
        ],
      },
      {
        id: 'product',
        label: '商品表 (Product)',
        type: 'table',
        x: 100,
        y: 350,
        fields: [
          { name: 'id', type: 'INT', key: 'PK', comment: '主键' },
          { name: 'name', type: 'VARCHAR(100)', nullable: false, comment: '商品名' },
          { name: 'price', type: 'DECIMAL(10,2)', nullable: false, comment: '价格' },
          { name: 'stock', type: 'INT', comment: '库存' },
        ],
      },
      {
        id: 'order_item',
        label: '订单项表 (OrderItem)',
        type: 'table',
        x: 400,
        y: 350,
        fields: [
          { name: 'id', type: 'INT', key: 'PK', comment: '主键' },
          { name: 'order_id', type: 'INT', key: 'FK', comment: '订单ID' },
          { name: 'product_id', type: 'INT', key: 'FK', comment: '商品ID' },
          { name: 'quantity', type: 'INT', nullable: false, comment: '数量' },
          { name: 'price', type: 'DECIMAL(10,2)', nullable: false, comment: '单价' },
        ],
      },
    ],
    edges: [
      {
        id: 'user_order',
        source: 'user',
        target: 'order',
        label: '1:N',
        type: 'one-to-many',
      },
      {
        id: 'order_item_order',
        source: 'order',
        target: 'order_item',
        label: '1:N',
        type: 'one-to-many',
      },
      {
        id: 'product_order_item',
        source: 'product',
        target: 'order_item',
        label: '1:N',
        type: 'one-to-many',
      },
    ],
  },
  bpmn: {
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
        x: 200,
        y: 200,
      },
      {
        id: 'gateway1',
        label: '金额判断',
        type: 'exclusiveGateway',
        x: 350,
        y: 200,
      },
      {
        id: 'task2',
        label: '主管审批',
        type: 'task',
        x: 500,
        y: 150,
      },
      {
        id: 'task3',
        label: '财务审批',
        type: 'task',
        x: 500,
        y: 250,
      },
      {
        id: 'end',
        label: '结束',
        type: 'endEvent',
        x: 650,
        y: 200,
      },
    ],
    edges: [
      {
        id: 'flow1',
        source: 'start',
        target: 'task1',
        label: '',
      },
      {
        id: 'flow2',
        source: 'task1',
        target: 'gateway1',
        label: '',
      },
      {
        id: 'flow3',
        source: 'gateway1',
        target: 'task2',
        label: '≤1000',
      },
      {
        id: 'flow4',
        source: 'gateway1',
        target: 'task3',
        label: '>1000',
      },
      {
        id: 'flow5',
        source: 'task2',
        target: 'end',
        label: '',
      },
      {
        id: 'flow6',
        source: 'task3',
        target: 'end',
        label: '',
      },
    ],
    flows: [
      { id: 'flow1', name: '开始流程' },
      { id: 'flow2', name: '提交申请' },
      { id: 'flow3', name: '小额审批' },
      { id: 'flow4', name: '大额审批' },
      { id: 'flow5', name: '审批完成' },
      { id: 'flow6', name: '审批完成' },
    ],
  },
  uml: {
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
          '- password: String',
        ],
        methods: [
          '+ login(): boolean',
          '+ logout(): void',
          '+ updateProfile(): void',
          '+ changePassword(): boolean',
        ],
      },
      {
        id: 'Order',
        label: 'Order',
        type: 'class',
        x: 400,
        y: 100,
        attributes: [
          '- id: Long',
          '- userId: Long',
          '- amount: BigDecimal',
          '- status: OrderStatus',
          '- createdAt: LocalDateTime',
        ],
        methods: [
          '+ calculate(): BigDecimal',
          '+ cancel(): void',
          '+ confirm(): void',
          '+ getStatus(): OrderStatus',
        ],
      },
      {
        id: 'Product',
        label: 'Product',
        type: 'class',
        x: 100,
        y: 400,
        attributes: [
          '- id: Long',
          '- name: String',
          '- price: BigDecimal',
          '- stock: Integer',
        ],
        methods: [
          '+ updateStock(quantity: int): void',
          '+ updatePrice(price: BigDecimal): void',
          '+ isAvailable(): boolean',
        ],
      },
      {
        id: 'OrderItem',
        label: 'OrderItem',
        type: 'class',
        x: 400,
        y: 400,
        attributes: [
          '- id: Long',
          '- orderId: Long',
          '- productId: Long',
          '- quantity: Integer',
          '- price: BigDecimal',
        ],
        methods: [
          '+ calculateSubtotal(): BigDecimal',
          '+ updateQuantity(qty: int): void',
        ],
      },
    ],
    edges: [
      {
        id: 'user_order',
        source: 'User',
        target: 'Order',
        label: '1..*',
        type: 'association',
      },
      {
        id: 'order_orderitem',
        source: 'Order',
        target: 'OrderItem',
        label: '1..*',
        type: 'composition',
      },
      {
        id: 'product_orderitem',
        source: 'Product',
        target: 'OrderItem',
        label: '1..*',
        type: 'association',
      },
    ],
  },
}

// 计算属性
const chartStats = computed(() => {
  if (!currentChartData.value) {
    return { nodeCount: 0, edgeCount: 0, complexity: '简单' }
  }

  const nodes = currentChartData.value.nodes || []
  const edges = currentChartData.value.edges || []
  const nodeCount = nodes.length
  const edgeCount = edges.length

  let complexity = '简单'
  if (nodeCount > 10 || edgeCount > 15) {
    complexity = '复杂'
  } else if (nodeCount > 5 || edgeCount > 8) {
    complexity = '中等'
  }

  return { nodeCount, edgeCount, complexity }
})

// 事件处理函数
const handleChartReady = (graph) => {
  console.log('图表就绪:', graph)
  message.success('图表初始化完成')
}

const handleDataChange = (data) => {
  console.log('数据变化:', data)
  currentChartData.value = data
}

// 操作方法
const loadSampleData = () => {
  const data = sampleData[chartConfig.type]
  if (data) {
    currentChartData.value = { ...data }
    message.success(`已加载${chartTypeOptions.find(t => t.value === chartConfig.type)?.label}示例数据`)
  }
}

const exportData = () => {
  if (!currentChartData.value) {
    message.warning('暂无数据')
    return
  }

  const dataStr = JSON.stringify(currentChartData.value, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${chartConfig.type}-chart-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)

  message.success('数据导出成功')
}

const exportImage = () => {
  if (chartRef.value) {
    const graph = chartRef.value.getGraph()
    if (graph && graph.downloadPNG) {
      graph.downloadPNG(`${chartConfig.type}-chart-${Date.now()}`)
      message.success('图片导出成功')
    } else {
      message.warning('当前图表不支持图片导出')
    }
  }
}

const fitView = () => {
  if (chartRef.value) {
    const graph = chartRef.value.getGraph()
    if (graph && graph.fitView) {
      graph.fitView()
      message.success('已适应画布大小')
    }
  }
}

const clearData = () => {
  currentChartData.value = null
  message.success('数据已清空')
}

// 监听图表类型变化
watch(
  () => chartConfig.type,
  (newType) => {
    console.log('图表类型变更为:', newType)
    // 可以自动加载对应类型的示例数据
    loadSampleData()
  }
)

// 初始化
onMounted(() => {
  loadSampleData()
})
</script>

<style scoped>
.chart-demo {
  padding: 20px;
}

.control-panel {
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
}

.chart-container {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.chart-instance {
  width: 100%;
  height: 100%;
}

.action-buttons {
  margin-bottom: 20px;
}

.data-preview {
  max-height: 400px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px 0;
}

.stat-item {
  text-align: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #1890ff;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}
</style>
```

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

```vue
<template>
  <div class="database-design">
    <n-card title="数据库设计工具">
      <!-- 表管理 -->
      <div class="table-manager mb-20px">
        <n-space>
          <n-button type="primary" @click="addTable">
            <template #icon>
              <i class="i-mdi:table-plus"></i>
            </template>
            添加表
          </n-button>
          <n-button @click="generateSQL">
            <template #icon>
              <i class="i-mdi:code-braces"></i>
            </template>
            生成 SQL
          </n-button>
          <n-button @click="validateSchema">
            <template #icon>
              <i class="i-mdi:check-circle"></i>
            </template>
            验证模式
          </n-button>
          <n-button @click="exportSchema">
            <template #icon>
              <i class="i-mdi:download"></i>
            </template>
            导出模式
          </n-button>
        </n-space>
      </div>

      <!-- ER 图 -->
      <C_AntV
        ref="erChartRef"
        type="er"
        :data="databaseSchema"
        :width="1000"
        :height="600"
        :show-toolbar="true"
        @ready="handleERReady"
        @data-change="handleSchemaChange"
        class="er-diagram"
      />

      <!-- 表详情面板 -->
      <div class="table-details mt-20px">
        <n-grid cols="2" x-gap="20">
          <n-grid-item>
            <n-card title="表列表" size="small">
              <div class="table-list">
                <div
                  v-for="table in databaseSchema.nodes"
                  :key="table.id"
                  class="table-item"
                  :class="{ active: selectedTable?.id === table.id }"
                  @click="selectTable(table)"
                >
                  <div class="table-icon">
                    <i class="i-mdi:table"></i>
                  </div>
                  <div class="table-info">
                    <div class="table-name">{{ table.label }}</div>
                    <div class="table-fields">{{ table.fields?.length || 0 }} 个字段</div>
                  </div>
                </div>
              </div>
            </n-card>
          </n-grid-item>
          
          <n-grid-item>
            <n-card title="字段详情" size="small">
              <div v-if="selectedTable" class="field-details">
                <div class="table-name">{{ selectedTable.label }}</div>
                <n-table size="small">
                  <thead>
                    <tr>
                      <th>字段名</th>
                      <th>类型</th>
                      <th>键</th>
                      <th>可空</th>
                      <th>注释</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="field in selectedTable.fields"
                      :key="field.name"
                    >
                      <td>{{ field.name }}</td>
                      <td>{{ field.type }}</td>
                      <td>
                        <n-tag
                          v-if="field.key"
                          :type="getKeyType(field.key)"
                          size="small"
                        >
                          {{ field.key }}
                        </n-tag>
                      </td>
                      <td>
                        <n-tag
                          :type="field.nullable ? 'warning' : 'success'"
                          size="small"
                        >
                          {{ field.nullable ? 'YES' : 'NO' }}
                        </n-tag>
                      </td>
                      <td>{{ field.comment || '-' }}</td>
                    </tr>
                  </tbody>
                </n-table>
              </div>
              <n-empty v-else description="请选择一个表" size="small" />
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>

      <!-- 关系管理 -->
      <div class="relationship-manager mt-20px">
        <n-card title="表关系" size="small">
          <div class="relationship-list">
            <div
              v-for="edge in databaseSchema.edges"
              :key="edge.id"
              class="relationship-item"
            >
              <div class="relationship-info">
                <span class="table-name">{{ getTableName(edge.source) }}</span>
                <i class="i-mdi:arrow-right mx-8px"></i>
                <span class="table-name">{{ getTableName(edge.target) }}</span>
              </div>
              <div class="relationship-type">
                <n-tag :type="getRelationshipTypeColor(edge.type)" size="small">
                  {{ edge.label }}
                </n-tag>
              </div>
            </div>
          </div>
        </n-card>
      </div>
    </n-card>

    <!-- 添加表对话框 -->
    <n-modal v-model:show="showAddTableModal" title="添加数据表">
      <n-card style="width: 600px" title="新建数据表">
        <n-form :model="newTable" label-placement="left" label-width="80">
          <n-form-item label="表名">
            <n-input v-model:value="newTable.name" placeholder="请输入表名" />
          </n-form-item>
          <n-form-item label="注释">
            <n-input v-model:value="newTable.comment" placeholder="请输入表注释" />
          </n-form-item>
          <n-form-item label="字段">
            <div class="field-editor">
              <div
                v-for="(field, index) in newTable.fields"
                :key="index"
                class="field-row"
              >
                <n-input
                  v-model:value="field.name"
                  placeholder="字段名"
                  style="width: 120px"
                />
                <n-select
                  v-model:value="field.type"
                  :options="fieldTypeOptions"
                  placeholder="类型"
                  style="width: 120px"
                />
                <n-select
                  v-model:value="field.key"
                  :options="keyTypeOptions"
                  placeholder="键"
                  style="width: 80px"
                  clearable
                />
                <n-switch v-model:value="field.nullable" size="small">
                  <template #checked>可空</template>
                  <template #unchecked>非空</template>
                </n-switch>
                <n-input
                  v-model:value="field.comment"
                  placeholder="注释"
                  style="width: 100px"
                />
                <n-button
                  size="small"
                  @click="removeField(index)"
                  quaternary
                  type="error"
                >
                  <template #icon>
                    <i class="i-mdi:delete"></i>
                  </template>
                </n-button>
              </div>
              <n-button @click="addField" dashed block>
                <template #icon>
                  <i class="i-mdi:plus"></i>
                </template>
                添加字段
              </n-button>
            </div>
          </n-form-item>
        </n-form>
        
        <template #footer>
          <n-space justify="end">
            <n-button @click="showAddTableModal = false">取消</n-button>
            <n-button type="primary" @click="confirmAddTable">确定</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
const erChartRef = ref()
const message = useMessage()

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
        { name: 'id', type: 'BIGINT', key: 'PK', nullable: false, comment: '主键' },
        { name: 'username', type: 'VARCHAR(50)', nullable: false, comment: '用户名' },
        { name: 'email', type: 'VARCHAR(100)', nullable: false, comment: '邮箱' },
        { name: 'password_hash', type: 'VARCHAR(255)', nullable: false, comment: '密码哈希' },
        { name: 'created_at', type: 'TIMESTAMP', nullable: false, comment: '创建时间' },
        { name: 'updated_at', type: 'TIMESTAMP', nullable: false, comment: '更新时间' },
      ],
    },
    {
      id: 'orders',
      label: '订单表 (orders)',
      type: 'table',
      x: 500,
      y: 100,
      fields: [
        { name: 'id', type: 'BIGINT', key: 'PK', nullable: false, comment: '主键' },
        { name: 'user_id', type: 'BIGINT', key: 'FK', nullable: false, comment: '用户ID' },
        { name: 'order_number', type: 'VARCHAR(50)', nullable: false, comment: '订单号' },
        { name: 'total_amount', type: 'DECIMAL(10,2)', nullable: false, comment: '总金额' },
        { name: 'status', type: 'ENUM', nullable: false, comment: '订单状态' },
        { name: 'created_at', type: 'TIMESTAMP', nullable: false, comment: '创建时间' },
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

const selectedTable = ref(null)
const showAddTableModal = ref(false)

// 新建表单
const newTable = reactive({
  name: '',
  comment: '',
  fields: [
    { name: 'id', type: 'BIGINT', key: 'PK', nullable: false, comment: '主键' },
  ],
})

const fieldTypeOptions = [
  { label: 'BIGINT', value: 'BIGINT' },
  { label: 'INT', value: 'INT' },
  { label: 'VARCHAR(50)', value: 'VARCHAR(50)' },
  { label: 'VARCHAR(100)', value: 'VARCHAR(100)' },
  { label: 'VARCHAR(255)', value: 'VARCHAR(255)' },
  { label: 'TEXT', value: 'TEXT' },
  { label: 'DECIMAL(10,2)', value: 'DECIMAL(10,2)' },
  { label: 'TIMESTAMP', value: 'TIMESTAMP' },
  { label: 'DATE', value: 'DATE' },
  { label: 'BOOLEAN', value: 'BOOLEAN' },
  { label: 'ENUM', value: 'ENUM' },
]

const keyTypeOptions = [
  { label: 'PK', value: 'PK' },
  { label: 'FK', value: 'FK' },
  { label: 'UK', value: 'UK' },
]

// 事件处理
const handleERReady = (graph) => {
  console.log('ER图初始化完成:', graph)
}

const handleSchemaChange = (data) => {
  databaseSchema.value = data
}

const selectTable = (table) => {
  selectedTable.value = table
}

const addTable = () => {
  showAddTableModal.value = true
  // 重置表单
  newTable.name = ''
  newTable.comment = ''
  newTable.fields = [
    { name: 'id', type: 'BIGINT', key: 'PK', nullable: false, comment: '主键' },
  ]
}

const addField = () => {
  newTable.fields.push({
    name: '',
    type: 'VARCHAR(50)',
    key: '',
    nullable: true,
    comment: '',
  })
}

const removeField = (index) => {
  newTable.fields.splice(index, 1)
}

const confirmAddTable = () => {
  if (!newTable.name) {
    message.error('请输入表名')
    return
  }

  const tableNode = {
    id: newTable.name.toLowerCase(),
    label: `${newTable.comment} (${newTable.name})`,
    type: 'table',
    x: Math.random() * 400 + 100,
    y: Math.random() * 300 + 100,
    fields: [...newTable.fields],
  }

  databaseSchema.value.nodes.push(tableNode)
  showAddTableModal.value = false
  message.success('表添加成功')
}

const generateSQL = () => {
  const sqlStatements = []

  databaseSchema.value.nodes.forEach(table => {
    let sql = `CREATE TABLE ${table.id} (\n`
    
    const fieldsSql = table.fields.map(field => {
      let fieldSql = `  ${field.name} ${field.type}`
      if (!field.nullable) fieldSql += ' NOT NULL'
      if (field.key === 'PK') fieldSql += ' PRIMARY KEY'
      if (field.comment) fieldSql += ` COMMENT '${field.comment}'`
      return fieldSql
    })
    
    sql += fieldsSql.join(',\n')
    sql += '\n);'
    
    sqlStatements.push(sql)
  })

  // 添加外键约束
  databaseSchema.value.edges.forEach(edge => {
    if (edge.type === 'one-to-many') {
      const sql = `ALTER TABLE ${edge.target} ADD FOREIGN KEY (${edge.source}_id) REFERENCES ${edge.source}(id);`
      sqlStatements.push(sql)
    }
  })

  // 导出 SQL 文件
  const sqlContent = sqlStatements.join('\n\n')
  const blob = new Blob([sqlContent], { type: 'text/sql' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `database-schema-${Date.now()}.sql`
  link.click()
  URL.revokeObjectURL(url)

  message.success('SQL 文件已生成并下载')
}

const validateSchema = () => {
  const errors = []

  // 验证表
  databaseSchema.value.nodes.forEach(table => {
    if (!table.fields.some(field => field.key === 'PK')) {
      errors.push(`表 ${table.label} 缺少主键`)
    }
  })

  // 验证外键关系
  databaseSchema.value.edges.forEach(edge => {
    const sourceTable = databaseSchema.value.nodes.find(n => n.id === edge.source)
    const targetTable = databaseSchema.value.nodes.find(n => n.id === edge.target)
    
    if (!sourceTable || !targetTable) {
      errors.push(`关系 ${edge.id} 引用了不存在的表`)
    }
  })

  if (errors.length === 0) {
    message.success('数据库模式验证通过')
  } else {
    message.error(`发现 ${errors.length} 个问题：\n${errors.join('\n')}`)
  }
}

const exportSchema = () => {
  const dataStr = JSON.stringify(databaseSchema.value, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `database-schema-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)

  message.success('数据库模式已导出')
}

// 辅助方法
const getTableName = (tableId) => {
  const table = databaseSchema.value.nodes.find(n => n.id === tableId)
  return table ? table.label : tableId
}

const getKeyType = (key) => {
  const typeMap = {
    'PK': 'error',
    'FK': 'warning',
    'UK': 'info',
  }
  return typeMap[key] || 'default'
}

const getRelationshipTypeColor = (type) => {
  const colorMap = {
    'one-to-one': 'success',
    'one-to-many': 'info',
    'many-to-many': 'warning',
  }
  return colorMap[type] || 'default'
}

// 初始化
onMounted(() => {
  selectedTable.value = databaseSchema.value.nodes[0]
})
</script>

<style scoped>
.database-design {
  padding: 24px;
}

.er-diagram {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.table-list {
  max-height: 300px;
  overflow-y: auto;
}

.table-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 8px;
}

.table-item:hover {
  background-color: #f0f0f0;
}

.table-item.active {
  background-color: #e6f7ff;
  border: 1px solid #1890ff;
}

.table-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1890ff;
  color: white;
  border-radius: 6px;
  margin-right: 12px;
}

.table-info {
  flex: 1;
}

.table-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.table-fields {
  font-size: 12px;
  color: #666;
}

.field-details .table-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.relationship-list {
  space-y: 8px;
}

.relationship-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
}

.field-editor {
  space-y: 8px;
}

.field-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
</style>
```

### 场景 2: 业务流程建模 BPMN

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
                  <n-descriptions-item label="位置">
                    ({{ selectedNode.x }}, {{ selectedNode.y }})
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
                    <n-form-item v-if="selectedNode.type === 'gateway'" label="条件">
                      <n-input
                        v-model:value="selectedNode.condition"
                        type="textarea"
                        placeholder="输入条件表达式"
                        :rows="3"
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
                  <div class="stat-label">网关节点</div>
                  <div class="stat-value">{{ getNodeCountByType('gateway') }}</div>
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
  
  // 检查网关是否有条件
  const gatewayNodes = processData.value.nodes.filter(n => n.type.includes('Gateway'))
  gatewayNodes.forEach(gateway => {
    if (!gateway.condition) {
      errors.push(`网关节点 "${gateway.label}" 缺少条件表达式`)
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
        { id: 'task3', label: 'HR备案', type: 'task', x: 550, y: 200, assignee: 'hr' },
        { id: 'end', label: '请假生效', type: 'endEvent', x: 700, y: 200 },
      ],
      edges: [
        { id: 'flow1', source: 'start', target: 'task1', label: '' },
        { id: 'flow2', source: 'task1', target: 'task2', label: '' },
        { id: 'flow3', source: 'task2', target: 'task3', label: '批准' },
        { id: 'flow4', source: 'task3', target: 'end', label: '' },
      ],
      flows: [
        { id: 'flow1', name: '提交申请' },
        { id: 'flow2', name: '等待审批' },
        { id: 'flow3', name: '审批通过' },
        { id: 'flow4', name: '流程结束' },
      ],
    },
    expense: {
      nodes: [
        { id: 'start', label: '发起报销', type: 'startEvent', x: 100, y: 200 },
        { id: 'task1', label: '填写报销单', type: 'task', x: 250, y: 200, assignee: 'user' },
        { id: 'gateway1', label: '金额判断', type: 'exclusiveGateway', x: 400, y: 200, condition: 'amount > 1000' },
        { id: 'task2', label: '主管审批', type: 'task', x: 550, y: 150, assignee: 'manager' },
        { id: 'task3', label: '财务审批', type: 'task', x: 550, y: 250, assignee: 'finance' },
        { id: 'task4', label: '财务付款', type: 'task', x: 700, y: 200, assignee: 'finance' },
        { id: 'end', label: '报销完成', type: 'endEvent', x: 850, y: 200 },
      ],
      edges: [
        { id: 'flow1', source: 'start', target: 'task1', label: '' },
        { id: 'flow2', source: 'task1', target: 'gateway1', label: '' },
        { id: 'flow3', source: 'gateway1', target: 'task2', label: '≤1000' },
        { id: 'flow4', source: 'gateway1', target: 'task3', label: '>1000' },
        { id: 'flow5', source: 'task2', target: 'task4', label: '' },
        { id: 'flow6', source: 'task3', target: 'task4', label: '' },
        { id: 'flow7', source: 'task4', target: 'end', label: '' },
      ],
      flows: [
        { id: 'flow1', name: '提交报销' },
        { id: 'flow2', name: '进入审批' },
        { id: 'flow3', name: '小额审批' },
        { id: 'flow4', name: '大额审批' },
        { id: 'flow5', name: '等待付款' },
        { id: 'flow6', name: '等待付款' },
        { id: 'flow7', name: '报销完成' },
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

### 场景 3: UML 类图设计

```vue
<template>
  <div class="uml-designer">
    <n-card title="UML 类图设计工具">
      <!-- 类管理工具栏 -->
      <div class="class-toolbar mb-20px">
        <n-space align="center">
          <n-button type="primary" @click="addClass">
            <template #icon>
              <i class="i-mdi:plus"></i>
            </template>
            添加类
          </n-button>
          <n-button @click="addInterface">
            <template #icon>
              <i class="i-mdi:source-branch"></i>
            </template>
            添加接口
          </n-button>
          <n-button @click="generateCode">
            <template #icon>
              <i class="i-mdi:code-braces"></i>
            </template>
            生成代码
          </n-button>
          <n-button @click="analyzeDesign">
            <template #icon>
              <i class="i-mdi:chart-line"></i>
            </template>
            设计分析
          </n-button>
          <n-divider vertical />
          <n-select
            v-model:value="selectedLanguage"
            :options="languageOptions"
            placeholder="选择语言"
            style="width: 120px"
          />
          <n-select
            v-model:value="selectedPattern"
            :options="patternOptions"
            placeholder="设计模式"
            style="width: 120px"
            @update:value="applyPattern"
          />
        </n-space>
      </div>

      <!-- UML 类图 -->
      <C_AntV
        ref="umlChartRef"
        type="uml"
        :data="classModel"
        :width="1200"
        :height="700"
        :show-toolbar="true"
        @ready="handleUMLReady"
        @data-change="handleModelChange"
        class="uml-diagram"
      />

      <!-- 设计面板 -->
      <div class="design-panel mt-20px">
        <n-grid cols="4" x-gap="20">
          <!-- 类列表 -->
          <n-grid-item>
            <n-card title="类列表" size="small">
              <div class="class-list">
                <div
                  v-for="classNode in classModel.nodes"
                  :key="classNode.id"
                  class="class-item"
                  :class="getClassTypeClass(classNode.type)"
                  @click="selectClass(classNode)"
                >
                  <div class="class-icon">
                    <i :class="getClassIcon(classNode.type)"></i>
                  </div>
                  <div class="class-info">
                    <div class="class-name">{{ classNode.label }}</div>
                    <div class="class-type">{{ getClassTypeName(classNode.type) }}</div>
                    <div class="class-stats">
                      {{ classNode.attributes?.length || 0 }} 属性,
                      {{ classNode.methods?.length || 0 }} 方法
                    </div>
                  </div>
                </div>
              </div>
            </n-card>
          </n-grid-item>

          <!-- 类详情 -->
          <n-grid-item>
            <n-card title="类详情" size="small">
              <div v-if="selectedClass" class="class-details">
                <n-form :model="selectedClass" size="small">
                  <n-form-item label="类名">
                    <n-input v-model:value="selectedClass.label" />
                  </n-form-item>
                  <n-form-item label="类型">
                    <n-select
                      v-model:value="selectedClass.type"
                      :options="classTypeOptions"
                    />
                  </n-form-item>
                  <n-form-item label="可见性">
                    <n-select
                      v-model:value="selectedClass.visibility"
                      :options="visibilityOptions"
                    />
                  </n-form-item>
                </n-form>

                <!-- 属性管理 -->
                <div class="attributes-section">
                  <div class="section-header">
                    <span>属性</span>
                    <n-button size="tiny" @click="addAttribute">
                      <template #icon>
                        <i class="i-mdi:plus"></i>
                      </template>
                    </n-button>
                  </div>
                  <div class="attribute-list">
                    <div
                      v-for="(attr, index) in selectedClass.attributes"
                      :key="index"
                      class="attribute-item"
                    >
                      <n-input
                        v-model:value="attr.name"
                        placeholder="属性名"
                        size="small"
                      />
                      <n-button
                        size="tiny"
                        @click="removeAttribute(index)"
                        quaternary
                        type="error"
                      >
                        <template #icon>
                          <i class="i-mdi:delete"></i>
                        </template>
                      </n-button>
                    </div>
                  </div>
                </div>

                <!-- 方法管理 -->
                <div class="methods-section">
                  <div class="section-header">
                    <span>方法</span>
                    <n-button size="tiny" @click="addMethod">
                      <template #icon>
                        <i class="i-mdi:plus"></i>
                      </template>
                    </n-button>
                  </div>
                  <div class="method-list">
                    <div
                      v-for="(method, index) in selectedClass.methods"
                      :key="index"
                      class="method-item"
                    >
                      <n-input
                        v-model:value="method.name"
                        placeholder="方法名"
                        size="small"
                      />
                      <n-button
                        size="tiny"
                        @click="removeMethod(index)"
                        quaternary
                        type="error"
                      >
                        <template #icon>
                          <i class="i-mdi:delete"></i>
                        </template>
                      </n-button>
                    </div>
                  </div>
                </div>
              </div>
              <n-empty v-else description="请选择一个类" size="small" />
            </n-card>
          </n-grid-item>

          <!-- 关系管理 -->
          <n-grid-item>
            <n-card title="类关系" size="small">
              <div class="relationship-list">
                <div
                  v-for="edge in classModel.edges"
                  :key="edge.id"
                  class="relationship-item"
                >
                  <div class="relationship-info">
                    <div class="relationship-classes">
                      <span class="class-name">{{ getClassName(edge.source) }}</span>
                      <i class="i-mdi:arrow-right mx-4px"></i>
                      <span class="class-name">{{ getClassName(edge.target) }}</span>
                    </div>
                    <div class="relationship-type">
                      <n-tag :type="getRelationshipColor(edge.type)" size="small">
                        {{ getRelationshipName(edge.type) }}
                      </n-tag>
                      <span v-if="edge.multiplicity" class="multiplicity">
                        {{ edge.multiplicity }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 添加关系 -->
              <div class="add-relationship mt-16px">
                <n-form :model="newRelationship" size="small">
                  <n-form-item label="源类">
                    <n-select
                      v-model:value="newRelationship.source"
                      :options="classOptions"
                      placeholder="选择源类"
                    />
                  </n-form-item>
                  <n-form-item label="目标类">
                    <n-select
                      v-model:value="newRelationship.target"
                      :options="classOptions"
                      placeholder="选择目标类"
                    />
                  </n-form-item>
                  <n-form-item label="关系类型">
                    <n-select
                      v-model:value="newRelationship.type"
                      :options="relationshipTypeOptions"
                      placeholder="选择关系"
                    />
                  </n-form-item>
                  <n-button @click="addRelationship" size="small" block>
                    添加关系
                  </n-button>
                </n-form>
              </div>
            </n-card>
          </n-grid-item>

          <!-- 设计分析 -->
          <n-grid-item>
            <n-card title="设计分析" size="small">
              <div v-if="designAnalysis" class="analysis-result">
                <div class="analysis-item">
                  <div class="analysis-label">复杂度评分</div>
                  <div class="analysis-value">
                    <n-progress
                      :percentage="designAnalysis.complexity"
                      :color="getComplexityColor(designAnalysis.complexity)"
                    />
                  </div>
                </div>

                <div class="analysis-item">
                  <div class="analysis-label">耦合度</div>
                  <div class="analysis-value">
                    <n-tag :type="getCouplingType(designAnalysis.coupling)">
                      {{ designAnalysis.coupling }}
                    </n-tag>
                  </div>
                </div>

                <div class="analysis-item">
                  <div class="analysis-label">内聚度</div>
                  <div class="analysis-value">
                    <n-tag :type="getCohesionType(designAnalysis.cohesion)">
                      {{ designAnalysis.cohesion }}
                    </n-tag>
                  </div>
                </div>

                <div class="analysis-suggestions">
                  <div class="suggestions-title">设计建议</div>
                  <ul class="suggestions-list">
                    <li v-for="suggestion in designAnalysis.suggestions" :key="suggestion">
                      {{ suggestion }}
                    </li>
                  </ul>
                </div>
              </div>
              <n-empty v-else description="点击分析按钮" size="small" />
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
    </n-card>

    <!-- 代码生成对话框 -->
    <n-modal v-model:show="showCodeModal" style="width: 80%">
      <n-card title="生成代码" :bordered="false">
        <n-tabs type="line">
          <n-tab-pane
            v-for="(code, className) in generatedCode"
            :key="className"
            :name="className"
            :tab="className"
          >
            <n-code
              :code="code"
              :language="selectedLanguage"
              :show-line-numbers="true"
              :word-wrap="true"
            />
          </n-tab-pane>
        </n-tabs>
        
        <template #footer>
          <n-space justify="end">
            <n-button @click="showCodeModal = false">关闭</n-button>
            <n-button type="primary" @click="downloadCode">下载代码</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
const umlChartRef = ref()
const message = useMessage()

// UML 类模型
const classModel = ref({
  nodes: [
    {
      id: 'User',
      label: 'User',
      type: 'class',
      x: 100,
      y: 100,
      visibility: 'public',
      attributes: [
        '- id: Long',
        '- username: String',
        '- email: String',
        '- password: String',
      ],
      methods: [
        '+ login(): boolean',
        '+ logout(): void',
        '+ updateProfile(): void',
        '+ changePassword(): boolean',
      ],
    },
    {
      id: 'Order',
      label: 'Order',
      type: 'class',
      x: 400,
      y: 100,
      visibility: 'public',
      attributes: [
        '- id: Long',
        '- userId: Long',
        '- amount: BigDecimal',
        '- status: OrderStatus',
        '- createdAt: LocalDateTime',
      ],
      methods: [
        '+ calculate(): BigDecimal',
        '+ cancel(): void',
        '+ confirm(): void',
        '+ getStatus(): OrderStatus',
      ],
    },
    {
      id: 'OrderService',
      label: 'OrderService',
      type: 'interface',
      x: 400,
      y: 350,
      visibility: 'public',
      attributes: [],
      methods: [
        '+ createOrder(userId: Long, amount: BigDecimal): Order',
        '+ cancelOrder(orderId: Long): void',
        '+ getOrdersByUser(userId: Long): List<Order>',
      ],
    },
  ],
  edges: [
    {
      id: 'user_order',
      source: 'User',
      target: 'Order',
      label: 'places',
      type: 'association',
      multiplicity: '1..*',
    },
    {
      id: 'order_service',
      source: 'OrderService',
      target: 'Order',
      label: 'manages',
      type: 'dependency',
    },
  ],
})

const selectedClass = ref(null)
const selectedLanguage = ref('java')
const selectedPattern = ref('')
const showCodeModal = ref(false)
const generatedCode = ref({})
const designAnalysis = ref(null)

// 新关系表单
const newRelationship = reactive({
  source: '',
  target: '',
  type: 'association',
})

// 选项配置
const languageOptions = [
  { label: 'Java', value: 'java' },
  { label: 'C#', value: 'csharp' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Python', value: 'python' },
]

const patternOptions = [
  { label: '工厂模式', value: 'factory' },
  { label: '单例模式', value: 'singleton' },
  { label: '观察者模式', value: 'observer' },
  { label: '策略模式', value: 'strategy' },
]

const classTypeOptions = [
  { label: '类', value: 'class' },
  { label: '接口', value: 'interface' },
  { label: '抽象类', value: 'abstract' },
  { label: '枚举', value: 'enum' },
]

const visibilityOptions = [
  { label: 'Public', value: 'public' },
  { label: 'Private', value: 'private' },
  { label: 'Protected', value: 'protected' },
]

const relationshipTypeOptions = [
  { label: '关联', value: 'association' },
  { label: '聚合', value: 'aggregation' },
  { label: '组合', value: 'composition' },
  { label: '继承', value: 'inheritance' },
  { label: '实现', value: 'implementation' },
  { label: '依赖', value: 'dependency' },
]

const classOptions = computed(() =>
  classModel.value.nodes.map(node => ({
    label: node.label,
    value: node.id,
  }))
)

// 事件处理
const handleUMLReady = (graph) => {
  console.log('UML图初始化完成:', graph)
}

const handleModelChange = (data) => {
  classModel.value = data
}

const selectClass = (classNode) => {
  selectedClass.value = { ...classNode }
}

const addClass = () => {
  const newClass = {
    id: `Class${classModel.value.nodes.length + 1}`,
    label: `NewClass`,
    type: 'class',
    x: Math.random() * 400 + 100,
    y: Math.random() * 300 + 100,
    visibility: 'public',
    attributes: ['- id: Long'],
    methods: ['+ getId(): Long'],
  }
  
  classModel.value.nodes.push(newClass)
  message.success('已添加新类')
}

const addInterface = () => {
  const newInterface = {
    id: `Interface${classModel.value.nodes.length + 1}`,
    label: `NewInterface`,
    type: 'interface',
    x: Math.random() * 400 + 100,
    y: Math.random() * 300 + 100,
    visibility: 'public',
    attributes: [],
    methods: ['+ doSomething(): void'],
  }
  
  classModel.value.nodes.push(newInterface)
  message.success('已添加新接口')
}

const addAttribute = () => {
  if (selectedClass.value) {
    selectedClass.value.attributes.push('- newAttribute: String')
  }
}

const removeAttribute = (index) => {
  if (selectedClass.value) {
    selectedClass.value.attributes.splice(index, 1)
  }
}

const addMethod = () => {
  if (selectedClass.value) {
    selectedClass.value.methods.push('+ newMethod(): void')
  }
}

const removeMethod = (index) => {
  if (selectedClass.value) {
    selectedClass.value.methods.splice(index, 1)
  }
}

const addRelationship = () => {
  if (newRelationship.source && newRelationship.target && newRelationship.type) {
    const relationship = {
      id: `rel_${Date.now()}`,
      source: newRelationship.source,
      target: newRelationship.target,
      type: newRelationship.type,
      label: getRelationshipName(newRelationship.type),
      multiplicity: '1..*',
    }
    
    classModel.value.edges.push(relationship)
    
    // 重置表单
    newRelationship.source = ''
    newRelationship.target = ''
    newRelationship.type = 'association'
    
    message.success('关系添加成功')
  }
}

const generateCode = () => {
  const code = {}
  
  classModel.value.nodes.forEach(classNode => {
    if (selectedLanguage.value === 'java') {
      code[classNode.label] = generateJavaCode(classNode)
    } else if (selectedLanguage.value === 'typescript') {
      code[classNode.label] = generateTypeScriptCode(classNode)
    }
    // 可以添加更多语言支持
  })
  
  generatedCode.value = code
  showCodeModal.value = true
}

const generateJavaCode = (classNode) => {
  let code = ''
  
  if (classNode.type === 'interface') {
    code += `public interface ${classNode.label} {\n`
  } else {
    code += `public class ${classNode.label} {\n`
  }
  
  // 属性
  classNode.attributes.forEach(attr => {
    code += `    ${attr};\n`
  })
  
  if (classNode.attributes.length > 0) {
    code += '\n'
  }
  
  // 方法
  classNode.methods.forEach(method => {
    if (classNode.type === 'interface') {
      code += `    ${method};\n`
    } else {
      code += `    ${method} {\n        // TODO: implement\n    }\n\n`
    }
  })
  
  code += '}'
  
  return code
}

const generateTypeScriptCode = (classNode) => {
  let code = ''
  
  if (classNode.type === 'interface') {
    code += `export interface ${classNode.label} {\n`
  } else {
    code += `export class ${classNode.label} {\n`
  }
  
  // 属性（转换为 TypeScript 格式）
  classNode.attributes.forEach(attr => {
    const tsAttr = attr.replace(/: \w+/, ': any') // 简化类型转换
    code += `    ${tsAttr};\n`
  })
  
  if (classNode.attributes.length > 0) {
    code += '\n'
  }
  
  // 方法
  classNode.methods.forEach(method => {
    const tsMethod = method.replace(/\(\):\s*\w+/, '(): any') // 简化返回类型
    if (classNode.type === 'interface') {
      code += `    ${tsMethod};\n`
    } else {
      code += `    ${tsMethod} {\n        // TODO: implement\n    }\n\n`
    }
  })
  
  code += '}'
  
  return code
}

const analyzeDesign = () => {
  const nodeCount = classModel.value.nodes.length
  const edgeCount = classModel.value.edges.length
  const avgMethodsPerClass = classModel.value.nodes.reduce((sum, node) => 
    sum + (node.methods?.length || 0), 0) / nodeCount
  
  // 计算复杂度（简化算法）
  const complexity = Math.min(100, (nodeCount * 10 + edgeCount * 5 + avgMethodsPerClass * 3))
  
  // 计算耦合度
  const coupling = edgeCount > nodeCount ? '高' : edgeCount > nodeCount / 2 ? '中' : '低'
  
  // 计算内聚度（基于方法数量的简化计算）
  const cohesion = avgMethodsPerClass > 10 ? '低' : avgMethodsPerClass > 5 ? '中' : '高'
  
  // 生成建议
  const suggestions = []
  if (complexity > 70) {
    suggestions.push('设计复杂度较高，考虑拆分大类')
  }
  if (coupling === '高') {
    suggestions.push('类之间耦合度过高，考虑引入接口解耦')
  }
  if (avgMethodsPerClass > 15) {
    suggestions.push('平均方法数过多，考虑职责分离')
  }
  if (suggestions.length === 0) {
    suggestions.push('设计整体良好，继续保持')
  }
  
  designAnalysis.value = {
    complexity,
    coupling,
    cohesion,
    suggestions,
  }
  
  message.success('设计分析完成')
}

const applyPattern = (patternKey) => {
  if (!patternKey) return
  
  const patterns = {
    factory: () => {
      // 添加工厂模式相关类
      const factory = {
        id: 'Factory',
        label: 'Factory',
        type: 'class',
        x: 100,
        y: 400,
        visibility: 'public',
        attributes: [],
        methods: ['+ createProduct(): Product'],
      }
      
      const product = {
        id: 'Product',
        label: 'Product',
        type: 'interface',
        x: 300,
        y: 400,
        visibility: 'public',
        attributes: [],
        methods: ['+ operation(): void'],
      }
      
      classModel.value.nodes.push(factory, product)
      classModel.value.edges.push({
        id: 'factory_product',
        source: 'Factory',
        target: 'Product',
        type: 'dependency',
        label: 'creates',
      })
    },
    singleton: () => {
      // 添加单例模式
      const singleton = {
        id: 'Singleton',
        label: 'Singleton',
        type: 'class',
        x: 100,
        y: 400,
        visibility: 'public',
        attributes: ['- instance: Singleton'],
        methods: [
          '- Singleton()',
          '+ getInstance(): Singleton',
        ],
      }
      
      classModel.value.nodes.push(singleton)
    },
  }
  
  const pattern = patterns[patternKey]
  if (pattern) {
    pattern()
    message.success(`${patternOptions.find(p => p.value === patternKey)?.label}模式已应用`)
  }
}

const downloadCode = () => {
  Object.entries(generatedCode.value).forEach(([className, code]) => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    const extension = selectedLanguage.value === 'java' ? '.java' : '.ts'
    link.download = `${className}${extension}`
    link.click()
    URL.revokeObjectURL(url)
  })
  
  message.success('代码文件已下载')
}

// 辅助方法
const getClassTypeClass = (type) => {
  const classMap = {
    'class': 'class-normal',
    'interface': 'class-interface',
    'abstract': 'class-abstract',
    'enum': 'class-enum',
  }
  return classMap[type] || 'class-normal'
}

const getClassIcon = (type) => {
  const iconMap = {
    'class': 'i-mdi:code-braces',
    'interface': 'i-mdi:source-branch',
    'abstract': 'i-mdi:code-braces-box',
    'enum': 'i-mdi:format-list-bulleted',
  }
  return iconMap[type] || 'i-mdi:code-braces'
}

const getClassTypeName = (type) => {
  const nameMap = {
    'class': '类',
    'interface': '接口',
    'abstract': '抽象类',
    'enum': '枚举',
  }
  return nameMap[type] || type
}

const getClassName = (classId) => {
  const classNode = classModel.value.nodes.find(n => n.id === classId)
  return classNode ? classNode.label : classId
}

const getRelationshipName = (type) => {
  const nameMap = {
    'association': '关联',
    'aggregation': '聚合',
    'composition': '组合',
    'inheritance': '继承',
    'implementation': '实现',
    'dependency': '依赖',
  }
  return nameMap[type] || type
}

const getRelationshipColor = (type) => {
  const colorMap = {
    'association': 'default',
    'aggregation': 'info',
    'composition': 'success',
    'inheritance': 'warning',
    'implementation': 'error',
    'dependency': 'default',
  }
  return colorMap[type] || 'default'
}

const getComplexityColor = (complexity) => {
  if (complexity < 30) return '#52c41a'
  if (complexity < 70) return '#fa8c16'
  return '#ff4d4f'
}

const getCouplingType = (coupling) => {
  const typeMap = {
    '低': 'success',
    '中': 'warning',
    '高': 'error',
  }
  return typeMap[coupling] || 'default'
}

const getCohesionType = (cohesion) => {
  const typeMap = {
    '高': 'success',
    '中': 'warning',
    '低': 'error',
  }
  return typeMap[cohesion] || 'default'
}
</script>

<style scoped>
.uml-designer {
  padding: 24px;
}

.uml-diagram {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.class-list {
  max-height: 300px;
  overflow-y: auto;
}

.class-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 4px;
  transition: background-color 0.2s;
}

.class-item:hover {
  background-color: #f0f0f0;
}

.class-normal { border-left: 4px solid #1890ff; }
.class-interface { border-left: 4px solid #52c41a; }
.class-abstract { border-left: 4px solid #fa8c16; }
.class-enum { border-left: 4px solid #722ed1; }

.class-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.class-info {
  flex: 1;
}

.class-name {
  font-weight: 500;
  margin-bottom: 2px;
}

.class-type {
  font-size: 12px;
  color: #666;
  margin-bottom: 2px;
}

.class-stats {
  font-size: 11px;
  color: #999;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 8px 0;
  font-weight: 600;
}

.attribute-list,
.method-list {
  space-y: 4px;
}

.attribute-item,
.method-item {
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
}

.relationship-list {
  max-height: 200px;
  overflow-y: auto;
}

.relationship-item {
  padding: 8px;
  background: #f8f9fa;
  border-radius: 6px;
  margin-bottom: 4px;
}

.relationship-classes {
  font-size: 14px;
  margin-bottom: 4px;
}

.relationship-type {
  display: flex;
  align-items: center;
  gap: 8px;
}

.multiplicity {
  font-size: 12px;
  color: #666;
}

.analysis-result {
  space-y: 12px;
}

.analysis-item {
  margin-bottom: 12px;
}

.analysis-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.analysis-value {
  margin-bottom: 8px;
}

.suggestions-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.suggestions-list {
  font-size: 12px;
  color: #666;
  padding-left: 16px;
}

.suggestions-list li {
  margin-bottom: 4px;
}
</style>
```

## 🛠️ 高级用法

### 数据格式转换和适配

```vue
<template>
  <C_AntV
    ref="adaptiveChartRef"
    :type="chartType"
    :data="adaptedData"
    @ready="handleChartReady"
    @data-change="handleAdaptedDataChange"
  />
</template>

<script setup>
const adaptiveChartRef = ref()

// 数据适配器
class DiagramDataAdapter {
  static adaptToER(rawData) {
    if (rawData.tables) {
      // 从数据库表结构转换为 ER 图格式
      return {
        nodes: rawData.tables.map(table => ({
          id: table.name,
          label: table.comment || table.name,
          type: 'table',
          x: table.x || Math.random() * 400,
          y: table.y || Math.random() * 400,
          fields: table.columns.map(col => ({
            name: col.name,
            type: col.type,
            key: col.isPrimaryKey ? 'PK' : col.isForeignKey ? 'FK' : null,
            nullable: col.nullable,
            comment: col.comment,
          })),
        })),
        edges: rawData.relations?.map(rel => ({
          id: rel.id,
          source: rel.fromTable,
          target: rel.toTable,
          label: rel.type,
          type: rel.cardinality,
        })) || [],
      }
    }
    
    return rawData
  }

  static adaptToBPMN(workflowData) {
    if (workflowData.workflow) {
      // 从工作流数据转换为 BPMN 格式
      return {
        nodes: workflowData.workflow.tasks.map(task => ({
          id: task.id,
          label: task.name,
          type: task.type === 'start' ? 'startEvent' : 
                task.type === 'end' ? 'endEvent' : 'task',
          x: task.position?.x || 0,
          y: task.position?.y || 0,
          assignee: task.assignee,
        })),
        edges: workflowData.workflow.flows.map(flow => ({
          id: flow.id,
          source: flow.from,
          target: flow.to,
          label: flow.condition,
        })),
        flows: workflowData.workflow.flows,
      }
    }
    
    return workflowData
  }

  static adaptToUML(codeStructure) {
    if (codeStructure.classes) {
      // 从代码结构转换为 UML 格式
      return {
        nodes: codeStructure.classes.map(cls => ({
          id: cls.name,
          label: cls.name,
          type: cls.isInterface ? 'interface' : 'class',
          x: cls.x || Math.random() * 400,
          y: cls.y || Math.random() * 400,
          attributes: cls.fields.map(field => 
            `${field.visibility} ${field.name}: ${field.type}`
          ),
          methods: cls.methods.map(method => 
            `${method.visibility} ${method.name}(${method.parameters}): ${method.returnType}`
          ),
        })),
        edges: codeStructure.relationships?.map(rel => ({
          id: rel.id,
          source: rel.from,
          target: rel.to,
          type: rel.type,
          label: rel.name,
        })) || [],
      }
    }
    
    return codeStructure
  }
}

const chartType = ref('er')
const rawData = ref(null)

const adaptedData = computed(() => {
  if (!rawData.value) return null
  
  switch (chartType.value) {
    case 'er':
      return DiagramDataAdapter.adaptToER(rawData.value)
    case 'bpmn':
      return DiagramDataAdapter.adaptToBPMN(rawData.value)
    case 'uml':
      return DiagramDataAdapter.adaptToUML(rawData.value)
    default:
      return rawData.value
  }
})

const handleChartReady = (graph) => {
  console.log('自适应图表就绪:', graph)
}

const handleAdaptedDataChange = (data) => {
  // 将数据转换回原始格式
  console.log('适配数据变化:', data)
}
</script>
```

### 图表主题定制

```vue
<template>
  <div class="theme-customizer">
    <C_AntV
      ref="themedChartRef"
      :type="chartType"
      :data="chartData"
      :theme="customTheme"
      @ready="applyCustomTheme"
    />
    
    <!-- 主题编辑器 -->
    <div class="theme-editor">
      <n-card title="主题编辑器" size="small">
        <n-form :model="themeConfig" size="small">
          <n-form-item label="背景色">
            <n-color-picker v-model:value="themeConfig.backgroundColor" />
          </n-form-item>
          <n-form-item label="节点颜色">
            <n-color-picker v-model:value="themeConfig.nodeColor" />
          </n-form-item>
          <n-form-item label="边线颜色">
            <n-color-picker v-model:value="themeConfig.edgeColor" />
          </n-form-item>
          <n-form-item label="文字颜色">
            <n-color-picker v-model:value="themeConfig.textColor" />
          </n-form-item>
          <n-form-item label="字体大小">
            <n-slider
              v-model:value="themeConfig.fontSize"
              :min="10"
              :max="24"
              :step="1"
            />
          </n-form-item>
        </n-form>
        
        <n-button @click="saveTheme" type="primary" block>
          应用主题
        </n-button>
      </n-card>
    </div>
  </div>
</template>

<script setup>
const themedChartRef = ref()

const themeConfig = reactive({
  backgroundColor: '#ffffff',
  nodeColor: '#1890ff',
  edgeColor: '#666666',
  textColor: '#333333',
  fontSize: 14,
})

const customTheme = computed(() => ({
  backgroundColor: themeConfig.backgroundColor,
  node: {
    style: {
      fill: themeConfig.nodeColor,
      stroke: themeConfig.edgeColor,
    },
    labelCfg: {
      style: {
        fill: themeConfig.textColor,
        fontSize: themeConfig.fontSize,
      },
    },
  },
  edge: {
    style: {
      stroke: themeConfig.edgeColor,
    },
    labelCfg: {
      style: {
        fill: themeConfig.textColor,
        fontSize: themeConfig.fontSize - 2,
      },
    },
  },
}))

const applyCustomTheme = (graph) => {
  // 应用自定义主题到图表实例
  if (graph && graph.updateTheme) {
    graph.updateTheme(customTheme.value)
  }
}

const saveTheme = () => {
  localStorage.setItem('chart-theme', JSON.stringify(themeConfig))
  
  if (themedChartRef.value) {
    const graph = themedChartRef.value.getGraph()
    applyCustomTheme(graph)
  }
  
  message.success('主题已应用')
}

// 加载保存的主题
onMounted(() => {
  const savedTheme = localStorage.getItem('chart-theme')
  if (savedTheme) {
    Object.assign(themeConfig, JSON.parse(savedTheme))
  }
})
</script>
```

## ⚠️ 注意事项

### 1. 数据格式一致性

```javascript
// ✅ 推荐：确保数据格式符合图表类型要求
const validateDataFormat = (type, data) => {
  const validators = {
    er: (data) => {
      return data.nodes?.every(node => 
        node.id && node.label && node.type && node.fields
      )
    },
    bpmn: (data) => {
      return data.nodes?.every(node => 
        node.id && node.label && node.type
      ) && data.flows
    },
    uml: (data) => {
      return data.nodes?.every(node => 
        node.id && node.label && node.type && 
        node.attributes && node.methods
      )
    },
  }
  
  return validators[type]?.(data) || false
}

// 使用验证
if (!validateDataFormat(chartType, chartData)) {
  console.error('数据格式不符合图表类型要求')
}
```

### 2. 性能优化

```javascript
// ✅ 推荐：大数据量时的优化策略
const optimizeChartData = (data, type) => {
  // 节点数量过多时进行分页或虚拟化
  if (data.nodes?.length > 100) {
    return {
      ...data,
      nodes: data.nodes.slice(0, 100), // 限制显示数量
      hasMore: true,
    }
  }
  
  // 复杂关系时简化显示
  if (data.edges?.length > 200) {
    return {
      ...data,
      edges: data.edges.filter(edge => edge.important !== false),
    }
  }
  
  return data
}
```

### 3. 类型转换处理

```javascript
// ✅ 推荐：安全的类型转换
const safeTypeConversion = (data, fromType, toType) => {
  try {
    const converters = {
      'er-to-uml': (erData) => {
        return {
          nodes: erData.nodes.map(table => ({
            id: table.id,
            label: table.label,
            type: 'class',
            attributes: table.fields.map(field => 
              `- ${field.name}: ${field.type}`
            ),
            methods: ['+ getId(): String'],
          })),
          edges: erData.edges.map(edge => ({
            ...edge,
            type: 'association',
          })),
        }
      },
      // 添加更多转换器
    }
    
    const converter = converters[`${fromType}-to-${toType}`]
    return converter ? converter(data) : data
  } catch (error) {
    console.error('类型转换失败:', error)
    return data
  }
}
```

## 🐛 故障排除

### 常见问题

#### Q1: 图表不显示或显示异常？

**A1:** 检查数据格式和组件配置：

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

#### Q2: 数据更新不响应？

**A2:** 检查数据响应式和更新方式：

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

#### Q3: 图表类型切换时出错？

**A3:** 处理类型切换时的数据清理：

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

#### Q4: 导出功能不工作？

**A4:** 检查图表实例和导出方法：

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

#### Q5: 自定义主题不生效？

**A5:** 检查主题配置和应用时机：

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

## 🎯 最佳实践

### 1. 数据管理策略

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

### 2. 组件复用模式

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

### 3. 错误处理和监控

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
  
  // 渲染错误恢复
  async recoverFromRenderError(context) {
    const { chartRef } = context
    if (chartRef.value) {
      // 重新初始化图表
      const graph = chartRef.value.getGraph()
      if (graph && graph.destroy) {
        graph.destroy()
      }
      
      await nextTick()
      // 触发重新渲染
      if (graph && graph.render) {
        graph.render()
      }
    }
  }
  
  // 数据错误恢复
  async recoverFromDataError(context) {
    const { data, type } = context
    
    // 尝试修复数据格式
    const fixedData = this.fixDataFormat(data, type)
    if (fixedData) {
      context.updateData(fixedData)
      return true
    }
    
    return false
  }
  
  // 修复数据格式
  fixDataFormat(data, type) {
    try {
      const fixers = {
        er: (data) => {
          // 确保 ER 图数据格式正确
          if (!data.nodes) data.nodes = []
          if (!data.edges) data.edges = []
          
          data.nodes.forEach(node => {
            if (!node.fields) node.fields = []
            if (!node.type) node.type = 'table'
          })
          
          return data
        },
        bpmn: (data) => {
          // 确保 BPMN 图数据格式正确
          if (!data.nodes) data.nodes = []
          if (!data.edges) data.edges = []
          if (!data.flows) data.flows = []
          
          return data
        },
        uml: (data) => {
          // 确保 UML 图数据格式正确
          if (!data.nodes) data.nodes = []
          if (!data.edges) data.edges = []
          
          data.nodes.forEach(node => {
            if (!node.attributes) node.attributes = []
            if (!node.methods) node.methods = []
          })
          
          return data
        },
      }
      
      const fixer = fixers[type]
      return fixer ? fixer(JSON.parse(JSON.stringify(data))) : data
    } catch (error) {
      console.error('数据修复失败:', error)
      return null
    }
  }
  
  // 网络错误恢复
  async recoverFromNetworkError(context) {
    // 重试网络操作
    const { operation, maxRetries = 3 } = context
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        await operation()
        return true
      } catch (error) {
        if (i === maxRetries - 1) throw error
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)))
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

### 4. 性能优化策略

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
  
  // 虚拟滚动优化
  setupVirtualScrolling(containerRef, itemHeight = 50) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 渲染可见区域的内容
          this.renderVisibleItems(entry.target)
        }
      })
    })
    
    return observer
  }
  
  // 渲染可见项目
  renderVisibleItems(container) {
    const items = container.querySelectorAll('.chart-item')
    items.forEach(item => {
      if (!item.dataset.rendered) {
        // 延迟渲染复杂内容
        requestIdleCallback(() => {
          this.renderComplexItem(item)
          item.dataset.rendered = 'true'
        })
      }
    })
  }
  
  // 渲染复杂项目
  renderComplexItem(item) {
    // 实际的复杂渲染逻辑
    console.log('渲染复杂项目:', item)
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

## 📝 更新日志

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

### v1.1.0 (计划中)

- 🔄 支持更多图表类型（组织架构图、网络拓扑图）
- 🔄 增强的数据导入导出功能
- 🔄 实时协作编辑支持
- 🔄 图表动画和过渡效果
- 🔄 移动端优化和触摸手势
- 🔄 插件系统和扩展机制
- 🔄 国际化支持增强
- 🔄 性能监控和分析工具

## 🎯 路线图

### 短期目标 (1-3个月)

- [ ] **图表类型扩展**: 支持组织架构图、甘特图、网络拓扑图
- [ ] **导入导出增强**: 支持 Visio、Draw.io 等格式的导入导出
- [ ] **协作功能**: 实时多人编辑和评论系统
- [ ] **性能优化**: 大数据量图表的虚拟化渲染

### 中期目标 (3-6个月)

- [ ] **AI 辅助**: 智能图表布局优化和设计建议
- [ ] **移动端**: 专门的移动端适配和手势操作
- [ ] **云端同步**: 图表数据云端存储和同步
- [ ] **模板市场**: 丰富的行业模板库

### 长期目标 (6-12个月)

- [ ] **3D 图表**: 支持三维图表展示
- [ ] **VR/AR**: 虚拟现实和增强现实图表体验
- [ ] **数据连接**: 直接连接数据库和 API
- [ ] **自动化**: 从代码自动生成图表

## 🤝 贡献指南

我们欢迎社区贡献！请遵循以下指南：

### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/your-org/c-antv.git
cd c-antv

# 安装依赖
bun install

# 启动开发服务器
bun dev

# 运行测试
bun test

# 代码检查
bun lint

# 类型检查
bun type-check
```

### 贡献流程

1. **Fork 项目** - 在 GitHub 上 Fork 项目
2. **创建分支** - 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. **开发功能** - 编写代码并确保测试通过
4. **提交更改** - 提交有意义的提交信息 (`git commit -m 'Add amazing feature'`)
5. **推送分支** - 推送到你的 Fork (`git push origin feature/amazing-feature`)
6. **创建 PR** - 创建 Pull Request 并描述你的更改

### 编码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 配置
- 为新功能编写测试用例
- 更新相关文档
- 保持向后兼容性

### 新增图表类型

如果要添加新的图表类型，请遵循以下步骤：

1. 在 `layout` 目录下创建新的图表组件
2. 在 `types` 中定义相关类型接口
3. 在主组件中注册新的图表类型
4. 添加相应的测试用例
5. 更新文档和示例

### 提交规范

使用 [Conventional Commits](https://conventionalcommits.org/) 规范：

```
type(scope): description

feat(chart): add network topology chart support
fix(er): resolve table relationship rendering issue
docs(readme): update API documentation
test(bpmn): add BPMN flow validation tests
perf(render): optimize large dataset rendering
```

## 📄 许可证

Copyright (c) 2025 by ChenYu, All Rights Reserved.

---

**💡 提示**: 这个通用图表组件基于强大的 AntV 生态系统构建，提供了统一的接口来使用不同类型的专业图表。无论是数据库设计的 ER 图、业务流程的 BPMN 图，还是软件架构的 UML 图，都能通过一个组件轻松实现。支持智能数据适配、主题定制、性能优化等企业级功能，结合完整的 TypeScript 支持和响应式设计，让专业图表的使用变得简单高效。如果遇到问题请先查看文档和故障排除部分，或者在团队群里讨论。让我们一起打造更专业的可视化图表体验！ 📊
