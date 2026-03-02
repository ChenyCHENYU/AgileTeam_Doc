---
outline: 'deep'
---

# C_AntV 图编辑引擎

> 📊 基于 AntV X6 的统一图编辑容器，支持 ER 图、BPMN 流程图、UML 类图三种专业图表类型

## 🚀 在线演示

<DemoIframe src="/preview/antv" title="AntV 图编辑" height="800" />


## ✨ 特性

- **🎯 多图表支持**: 统一容器按 `type` 自动切换 ER / BPMN / UML 三种专业布局
- **🔄 智能适配**: 父组件自动完成 `BPMNDiagramData ↔ BPMNElement[]` 等数据格式转换
- **🎨 主题切换**: 跟随 `themeStore` 实时切换明暗主题，无需外部调用
- **🔧 工具栏集成**: 每种布局内置独立工具栏（增删改 + 居中/缩放 + 导出）
- **📱 响应式设计**: 容器尺寸变化时自动 resize，支持百分比和固定值
- **🔒 只读模式**: 传入 `readonly` 即可禁用所有编辑操作
- **💪 TypeScript**: 完整类型定义，`antv.d.ts` 集中管理全部接口
- **📤 文件导出**: 基于 `html2canvas` + `@robot-admin/file-utils` 实现 PNG / SVG / JSON 导出
- **🔌 可扩展**: 薄 UI 壳 + 厚 Composable 引擎，新增图表类型只需添加 Layout + data.ts

## 📦 依赖

| 包                               | 用途                                        |
| -------------------------------- | ------------------------------------------- |
| `@antv/x6` ^2.18.1               | X6 图编辑引擎                               |
| `html2canvas` ^1.4.1             | PNG 导出截图                                |
| `@robot-admin/file-utils` latest | 文件下载（`downloadBlob`）                  |
| `naive-ui`                       | UI 组件（NButton / NDrawer / NDropdown 等） |

## 🎯 快速开始

### 基础用法

```vue {3-8}
<template>
  <!-- 最简单的图表组件 -->
  <C_AntV
    type="er"
    :data="erData"
    @ready="handleReady"
    @data-change="handleDataChange"
  />
</template>

<script setup lang="ts">
  import type { ERDiagramData, DiagramData } from '@/types/antv'

  const erData = ref<ERDiagramData>({
    tables: [
      {
        id: 'user_table',
        name: '用户表',
        comment: '系统用户信息',
        fields: [
          {
            name: 'id',
            type: 'BIGINT',
            isPrimaryKey: true,
            isRequired: true,
            isForeignKey: false,
            comment: '主键',
          },
          {
            name: 'username',
            type: 'VARCHAR(50)',
            isPrimaryKey: false,
            isRequired: true,
            isForeignKey: false,
          },
          {
            name: 'email',
            type: 'VARCHAR(100)',
            isPrimaryKey: false,
            isRequired: true,
            isForeignKey: false,
          },
        ],
        position: { x: 100, y: 100 },
      },
    ],
    relations: [],
  })

  const handleReady = (graph: any) => {
    console.log('图表已就绪:', graph)
  }

  const handleDataChange = (data: DiagramData) => {
    console.log('数据变化:', data)
  }
</script>
```

::: details 🎛️ 完整功能示例 — 多图表 Tab 切换 + 数据预览

```vue
<template>
  <div class="diagram-demo">
    <NCard>
      <template #header>
        <NTabs
          v-model:value="currentType"
          type="line"
          size="medium"
          :bar-width="28"
        >
          <NTab
            name="er"
            tab="ER图"
          />
          <NTab
            name="bpmn"
            tab="BPMN图"
          />
          <NTab
            name="uml"
            tab="UML类图"
          />
        </NTabs>
      </template>

      <div class="chart-container">
        <C_AntV
          ref="diagramRef"
          :type="currentType"
          :data="currentData"
          width="100%"
          height="100%"
          :readonly="false"
          :show-toolbar="true"
          @ready="handleReady"
          @data-change="handleDataChange"
        />
      </div>
    </NCard>

    <NCard
      title="数据预览"
      style="margin-top: 16px"
    >
      <C_Code
        :code="JSON.stringify(graphData ?? currentData, null, 2)"
        language="json"
        title="当前图表数据（实时）"
        :show-header="true"
        :show-line-numbers="true"
        max-height="400px"
      />
    </NCard>
  </div>
</template>

<script setup lang="ts">
  import type { DiagramType, DiagramData } from '@/types/antv'

  const currentType = ref<DiagramType>('bpmn')
  const diagramRef = ref()
  const graphData = ref<DiagramData>()

  const currentData = computed((): DiagramData | undefined => {
    switch (currentType.value) {
      case 'er':
        return {
          tables: [
            {
              id: 'user_table',
              name: '用户表',
              comment: '系统用户信息',
              fields: [
                {
                  name: 'id',
                  type: 'BIGINT',
                  isPrimaryKey: true,
                  isRequired: true,
                  isForeignKey: false,
                },
                {
                  name: 'username',
                  type: 'VARCHAR(50)',
                  isPrimaryKey: false,
                  isRequired: true,
                  isForeignKey: false,
                },
              ],
              position: { x: 100, y: 100 },
            },
          ],
          relations: [],
        }
      case 'bpmn':
        return {
          nodes: [
            {
              id: 'start_1',
              type: 'start',
              name: '开始',
              position: { x: 100, y: 150 },
              properties: {},
            },
            {
              id: 'task_1',
              type: 'task',
              name: '审核任务',
              position: { x: 300, y: 150 },
              properties: { assignee: '审核员' },
            },
            {
              id: 'end_1',
              type: 'end',
              name: '结束',
              position: { x: 500, y: 150 },
              properties: {},
            },
          ],
          flows: [
            { id: 'flow_1', source: 'start_1', target: 'task_1', name: '提交' },
            { id: 'flow_2', source: 'task_1', target: 'end_1', name: '完成' },
          ],
        }
      case 'uml':
        return {
          classes: [
            {
              id: 'user_class',
              name: 'User',
              attributes: [
                { name: 'id', type: 'Long', visibility: 'private' },
                { name: 'username', type: 'String', visibility: 'private' },
              ],
              methods: [
                { name: 'getId', returnType: 'Long', visibility: 'public' },
                {
                  name: 'setUsername',
                  returnType: 'void',
                  visibility: 'public',
                },
              ],
              position: { x: 100, y: 100 },
            },
          ],
          relations: [],
        }
      default:
        return undefined
    }
  })

  const handleReady = () => {
    /* graph ready */
  }
  const handleDataChange = (data: DiagramData) => {
    graphData.value = data
  }
</script>

<style scoped>
  .chart-container {
    width: 100%;
    height: 600px;
    position: relative;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }
</style>
```

:::

## 📖 API 文档

### Props

| 参数            | 类型                      | 默认值    | 说明                        |
| --------------- | ------------------------- | --------- | --------------------------- |
| **type**        | `'er' \| 'bpmn' \| 'uml'` | —         | 图表类型（必填）            |
| **data**        | `DiagramData`             | —         | 初始数据                    |
| **width**       | `string \| number`        | `'100%'`  | 容器宽度                    |
| **height**      | `string \| number`        | `'600px'` | 容器高度                    |
| **readonly**    | `boolean`                 | `false`   | 是否只读模式                |
| **showToolbar** | `boolean`                 | `true`    | 是否显示工具栏              |
| **theme**       | `'light' \| 'dark'`       | `'light'` | 主题（自动跟随 themeStore） |

### Events

| 事件名          | 参数                  | 说明                     |
| --------------- | --------------------- | ------------------------ |
| **ready**       | `(graph: Graph)`      | Graph 实例创建完成时触发 |
| **data-change** | `(data: DiagramData)` | 图表数据变更时触发       |

### 暴露方法

| 方法名         | 返回值               | 说明                 |
| -------------- | -------------------- | -------------------- |
| **getGraph()** | `Graph \| undefined` | 获取 X6 Graph 实例   |
| **getData()**  | `DiagramData`        | 获取当前图表完整数据 |

## 🏗️ 架构设计

采用 **"薄 UI 壳 + 厚 Composable 引擎"** 模式：

```
C_AntV (index.vue)  ← 按 type 动态切换 Layout
  └─ <component :is="ERLayout | BPMNLayout | UMLLayout">
       ├─ useGraphBase()        ← 图实例管理（创建/销毁/缩放/主题切换）
       ├─ useGraphExport()      ← 导出（PNG / SVG / JSON）
       ├─ useEdgeInteraction()  ← 连线交互（高亮/删除/端口显隐）
       └─ *Editor.vue           ← 属性编辑侧抽屉
```

### 📂 目录结构

```
src/
├─ components/global/C_AntV/
│   ├─ index.vue                    # 入口 — 按 type 动态切换 Layout
│   ├─ utils/
│   │   └─ exportUtils.ts           # PNG / SVG / JSON 导出（html2canvas + @robot-admin/file-utils）
│   └─ layout/
│       ├─ ER/
│       │   ├─ index.vue            # ER 图布局
│       │   ├─ index.scss
│       │   ├─ data.ts              # 节点 / 连线 / 端口配置
│       │   └─ components/
│       │       └─ ERTableEditor.vue    # 表字段编辑抽屉
│       ├─ BPMN/
│       │   ├─ index.vue            # BPMN 流程图布局
│       │   ├─ index.scss
│       │   ├─ data.ts              # 事件/活动/网关/边配置
│       │   └─ components/
│       │       └─ BPMNPropertyEditor.vue  # 节点属性编辑抽屉
│       └─ UML/
│           ├─ index.vue            # UML 类图布局
│           ├─ index.scss
│           ├─ data.ts              # 类节点 / 继承边配置
│           └─ components/
│               └─ UMLClassEditor.vue      # 类编辑抽屉
├─ composables/AntV/
│   ├─ useGraphBase.ts              # 图实例管理
│   ├─ useGraphExport.ts            # 导出 composable
│   └─ useEdgeInteraction.ts        # 连线交互 composable
├─ types/antv.d.ts                  # 全部图表 TypeScript 类型定义
└─ views/demo/29-antv-x6-editor/
    └─ index.vue                    # 演示页面（Tab 切换 + 数据实时预览）
```

## 🔧 Composables 详解

### `useGraphBase(containerRef)`

管理 X6 Graph 实例的创建、销毁、缩放和主题。组件卸载时自动调用 `dispose()` 释放资源。

```ts
const containerRef = ref<HTMLDivElement>()
const {
  graph, // Ref<Graph | null>   — 图表实例
  loading, // Ref<boolean>        — 加载状态
  initGraph, // (options?) => Promise<void>
  destroyGraph, // () => void
  centerContent, // () => void
  zoomToFit, // () => void
  zoom, // (factor: number) => void
  resizeGraph, // () => void         — 容器尺寸变化时调用
  updateTheme, // (isDark: boolean) => void
} = useGraphBase(containerRef)
```

**内置能力：**

- 默认开启：滚轮缩放（Ctrl+滚轮）、框选、吸附线、快捷键、剪贴板
- 双重网格（`doubleMesh`）— 随主题自动切换颜色
- 容器尺寸为 0 时自动重试（最多 10 次，间隔 100ms）
- 监听 `themeStore.isDark` 自动调用 `updateTheme`

### `useGraphExport(graph, filenamePrefix)`

统一 PNG / SVG / JSON 导出，内置错误处理与 NMessage 提示。

```ts
const { exportOptions, handleExport } = useGraphExport(graph, 'er-diagram')

// 在模板中使用
// <NDropdown :options="exportOptions" @select="(key) => handleExport(key, getCurrentData)">
```

| 返回值                        | 说明                                                                                                       |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `exportOptions`               | `[{ label: '导出PNG', key: 'png' }, { label: '导出SVG', key: 'svg' }, { label: '导出JSON', key: 'json' }]` |
| `handleExport(key, getData?)` | `key` 为 `'png' \| 'svg' \| 'json'`，JSON 需传 `getData` 回调                                              |

**导出实现细节：**

| 格式     | 方案                                                                        | 依赖                                      |
| -------- | --------------------------------------------------------------------------- | ----------------------------------------- |
| **PNG**  | `html2canvas(graph.container)` → `canvas.toBlob()` → `downloadBlob()`       | `html2canvas` + `@robot-admin/file-utils` |
| **SVG**  | `graph.container.querySelector('svg')` → `XMLSerializer` → `downloadBlob()` | `@robot-admin/file-utils`                 |
| **JSON** | `JSON.stringify(getData())` → `downloadBlob()`                              | `@robot-admin/file-utils`                 |

### `useEdgeInteraction(graph, options?)`

连线交互行为封装（点击高亮、双击删除、端口显隐）。

```ts
const { bindInteractions, resetEdgeStyles, highlightEdge, togglePorts } =
  useEdgeInteraction(graph, {
    defaultColor: '#A2B1C3', // 连线默认颜色
    highlightColor: '#ff4d4f', // 高亮颜色
    strokeWidth: 2, // 默认线宽
    highlightStrokeWidth: 3, // 高亮线宽
    portPositions: ['top', 'right', 'bottom', 'left'], // 端口位置
    onDataChange: emitDataChange, // 数据变更回调
  })
```

**自动绑定的事件：**

- `edge:click` → 高亮该连线
- `edge:dblclick` → 删除该连线 + 触发 `onDataChange`
- `blank:click` / `node:click` → 重置所有连线颜色
- `edge:connected` → 触发 `onDataChange`
- `node:mouseenter` / `mouseleave` → 端口显隐动画（需配置 `portPositions`）

## 📐 类型定义

> 完整定义见 `src/types/antv.d.ts`

### ER 图

```typescript
interface ERDiagramData {
  tables: ERTable[]
  relations: ERRelation[]
}

interface ERTable {
  id: string
  name: string
  comment?: string
  fields: ERField[]
  position: Position
}

interface ERField {
  name: string
  type: string // 如 'BIGINT', 'VARCHAR(50)'
  isPrimaryKey: boolean
  isRequired: boolean
  isForeignKey: boolean
  foreignKey?: string // 格式: "table_id.field_name"
  comment?: string
  defaultValue?: string
}

interface ERRelation {
  id: string
  type: 'foreign-key' | 'one-to-one' | 'one-to-many' | 'many-to-many'
  sourceTable: string
  sourceField: string
  targetTable: string
  targetField: string
  name?: string
}
```

### BPMN 流程图

外部 API 使用 `BPMNDiagramData`，内部布局使用 `BPMNElement[]` 扁平数组。父组件 `C_AntV/index.vue` 自动完成双向格式转换。

```typescript
// 外部数据格式（传入 data prop）
interface BPMNDiagramData {
  nodes: BPMNNode[]
  flows: BPMNFlow[]
}

interface BPMNNode {
  id: string
  type: 'start' | 'end' | 'task' | 'gateway' | 'event'
  name: string
  position: Position
  properties: Record<string, any>
}

interface BPMNFlow {
  id: string
  source: string
  target: string
  name?: string
  condition?: string
}

// 内部布局使用的扁平结构
interface BPMNElement {
  id: string
  shape: string // 'event' | 'activity' | 'gateway' | 'bpmn-edge'
  x: number
  y: number
  width?: number
  height?: number
  label?: string
  source?: string // 边的源节点 ID
  target?: string // 边的目标节点 ID
  data?: Record<string, any>
}
```

### UML 类图

```typescript
interface UMLDiagramData {
  classes: UMLClass[]
  relations: UMLRelation[]
}

interface UMLClass {
  id: string
  name: string
  attributes: UMLAttribute[]
  methods: UMLMethod[]
  position: Position
  isAbstract?: boolean
}

interface UMLAttribute {
  name: string
  type: string
  visibility: 'public' | 'private' | 'protected'
  isStatic?: boolean
}

interface UMLMethod {
  name: string
  returnType: string
  visibility: 'public' | 'private' | 'protected'
  parameters?: string[]
  isStatic?: boolean
  isAbstract?: boolean
}

interface UMLRelation {
  id: string
  type:
    | 'inheritance'
    | 'composition'
    | 'aggregation'
    | 'association'
    | 'dependency'
  source: string
  target: string
  name?: string
  multiplicity?: string
}
```

### 通用类型

```typescript
type DiagramData = ERDiagramData | BPMNDiagramData | UMLDiagramData
type DiagramType = 'er' | 'bpmn' | 'uml'

interface Position {
  x: number
  y: number
}
```

## 🎨 使用示例

### 场景 1: 数据库设计 ER 图

::: details 🗄️ ER 图 — 多表 + 关系连线

```vue
<template>
  <C_AntV
    ref="erRef"
    type="er"
    :data="schema"
    :show-toolbar="true"
    @data-change="onSchemaChange"
  />
</template>

<script setup lang="ts">
  import type { ERDiagramData } from '@/types/antv'

  const erRef = ref()

  const schema = ref<ERDiagramData>({
    tables: [
      {
        id: 'users',
        name: '用户表',
        comment: '系统用户',
        fields: [
          {
            name: 'id',
            type: 'BIGINT',
            isPrimaryKey: true,
            isRequired: true,
            isForeignKey: false,
            comment: '主键',
          },
          {
            name: 'username',
            type: 'VARCHAR(50)',
            isPrimaryKey: false,
            isRequired: true,
            isForeignKey: false,
          },
          {
            name: 'email',
            type: 'VARCHAR(100)',
            isPrimaryKey: false,
            isRequired: true,
            isForeignKey: false,
          },
        ],
        position: { x: 100, y: 100 },
      },
      {
        id: 'orders',
        name: '订单表',
        comment: '用户订单',
        fields: [
          {
            name: 'id',
            type: 'BIGINT',
            isPrimaryKey: true,
            isRequired: true,
            isForeignKey: false,
          },
          {
            name: 'user_id',
            type: 'BIGINT',
            isPrimaryKey: false,
            isRequired: true,
            isForeignKey: true,
            foreignKey: 'users.id',
          },
          {
            name: 'amount',
            type: 'DECIMAL(10,2)',
            isPrimaryKey: false,
            isRequired: true,
            isForeignKey: false,
          },
        ],
        position: { x: 400, y: 100 },
      },
    ],
    relations: [
      {
        id: 'users_orders',
        type: 'one-to-many',
        sourceTable: 'users',
        sourceField: 'id',
        targetTable: 'orders',
        targetField: 'user_id',
        name: '用户→订单',
      },
    ],
  })

  const onSchemaChange = (data: ERDiagramData) => {
    schema.value = data as ERDiagramData
  }

  // 通过 ref 获取数据
  const exportSchema = () => {
    const currentData = erRef.value?.getData()
    console.log('当前 ER 数据:', currentData)
  }
</script>
```

:::

### 场景 2: 业务流程 BPMN 图

::: details 🔄 BPMN — 审批流程建模

```vue
<template>
  <C_AntV
    ref="bpmnRef"
    type="bpmn"
    :data="processData"
    :show-toolbar="true"
    @ready="onReady"
    @data-change="onProcessChange"
  />
</template>

<script setup lang="ts">
  import type { BPMNDiagramData } from '@/types/antv'

  const bpmnRef = ref()

  const processData = ref<BPMNDiagramData>({
    nodes: [
      {
        id: 'start',
        type: 'start',
        name: '发起申请',
        position: { x: 100, y: 200 },
        properties: {},
      },
      {
        id: 'review',
        type: 'task',
        name: '主管审批',
        position: { x: 300, y: 200 },
        properties: { assignee: 'manager' },
      },
      {
        id: 'check',
        type: 'gateway',
        name: '金额判断',
        position: { x: 500, y: 200 },
        properties: { condition: 'amount > 1000' },
      },
      {
        id: 'finance',
        type: 'task',
        name: '财务审核',
        position: { x: 700, y: 300 },
        properties: { assignee: 'finance' },
      },
      {
        id: 'end',
        type: 'end',
        name: '流程结束',
        position: { x: 700, y: 100 },
        properties: {},
      },
    ],
    flows: [
      { id: 'f1', source: 'start', target: 'review', name: '提交' },
      { id: 'f2', source: 'review', target: 'check', name: '审批通过' },
      { id: 'f3', source: 'check', target: 'end', name: '≤1000 直接通过' },
      {
        id: 'f4',
        source: 'check',
        target: 'finance',
        name: '>1000 需财务审核',
      },
      { id: 'f5', source: 'finance', target: 'end', name: '审核完成' },
    ],
  })

  const onReady = (graph: any) => {
    // BPMN 内部会自动加载示例数据
    // 若传入 data 则优先使用 data
  }

  const onProcessChange = (data: any) => {
    console.log('流程数据变更:', data)
  }
</script>
```

:::

### 场景 3: UML 类图

::: details 📊 UML — 类设计 + 继承关系

```vue
<template>
  <C_AntV
    ref="umlRef"
    type="uml"
    :data="classModel"
    :show-toolbar="true"
    @data-change="onModelChange"
  />
</template>

<script setup lang="ts">
  import type { UMLDiagramData } from '@/types/antv'

  const umlRef = ref()

  const classModel = ref<UMLDiagramData>({
    classes: [
      {
        id: 'animal',
        name: 'Animal',
        isAbstract: true,
        attributes: [
          { name: 'name', type: 'String', visibility: 'protected' },
          { name: 'age', type: 'int', visibility: 'private' },
        ],
        methods: [
          { name: 'eat', returnType: 'void', visibility: 'public' },
          {
            name: 'sleep',
            returnType: 'void',
            visibility: 'public',
            isAbstract: true,
          },
        ],
        position: { x: 200, y: 50 },
      },
      {
        id: 'dog',
        name: 'Dog',
        attributes: [{ name: 'breed', type: 'String', visibility: 'private' }],
        methods: [
          { name: 'bark', returnType: 'void', visibility: 'public' },
          { name: 'sleep', returnType: 'void', visibility: 'public' },
        ],
        position: { x: 100, y: 300 },
      },
      {
        id: 'cat',
        name: 'Cat',
        attributes: [
          { name: 'indoor', type: 'boolean', visibility: 'private' },
        ],
        methods: [
          { name: 'purr', returnType: 'void', visibility: 'public' },
          { name: 'sleep', returnType: 'void', visibility: 'public' },
        ],
        position: { x: 350, y: 300 },
      },
    ],
    relations: [
      { id: 'r1', type: 'inheritance', source: 'dog', target: 'animal' },
      { id: 'r2', type: 'inheritance', source: 'cat', target: 'animal' },
    ],
  })

  const onModelChange = (data: any) => {
    classModel.value = data as UMLDiagramData
  }
</script>
```

:::

## ⚠️ 注意事项

### 1. 容器必须有明确高度

```vue
<!-- ✅ 正确：容器有明确高度 -->
<div style="height: 600px">
  <C_AntV type="er" width="100%" height="100%" />
</div>

<!-- ❌ 错误：容器高度为 0，Graph 无法渲染 -->
<div>
  <C_AntV type="er" width="100%" height="100%" />
</div>
```

### 2. 数据格式必须匹配图表类型

```typescript
// ✅ ER 图使用 ERDiagramData
const erData: ERDiagramData = { tables: [...], relations: [...] }

// ✅ BPMN 使用 BPMNDiagramData
const bpmnData: BPMNDiagramData = { nodes: [...], flows: [...] }

// ✅ UML 使用 UMLDiagramData
const umlData: UMLDiagramData = { classes: [...], relations: [...] }

// ❌ 类型不匹配会导致渲染异常
```

### 3. 导出功能依赖 `@robot-admin/file-utils`

导出 PNG / SVG / JSON 均通过 `@robot-admin/file-utils` 的 `downloadBlob` 实现。确保 `main.ts` 中已调用 `setupFileUtils()` 完成初始化。

### 4. 主题跟随

无需手动调用主题切换。`useGraphBase` 内部监听 `themeStore.isDark`，自动更新背景色和网格颜色。

## 🐛 故障排除

### Q1: 图表不显示或空白？

**A:** 检查容器是否有实际像素高度。`useGraphBase` 在容器尺寸为 0 时会自动重试 10 次（每次间隔 100ms），但如果容器始终无高度则无法渲染。

::: details 查看排查代码

```javascript
// 检查容器尺寸
const el = document.querySelector('.chart-container')
console.log('容器尺寸:', el?.clientWidth, el?.clientHeight)
// 若输出 0，需给容器设置明确的 height
```

:::

### Q2: 导出 PNG 失败？

**A:** PNG 导出使用 `html2canvas` 截取图表容器的 DOM。常见问题：

1. 图表未就绪时调用导出 → 确保在 `@ready` 事件后操作
2. 跨域图片资源 → `html2canvas` 已配置 `useCORS: true`
3. `@robot-admin/file-utils` 未初始化 → 检查 `main.ts` 中 `setupFileUtils()`

### Q3: 切换 Tab 后数据被重置？

**A:** `C_AntV` 内部使用 `<component :is>` 动态切换布局组件。切换时旧组件会被销毁。如需跨 Tab 保留编辑数据，应在 `@data-change` 回调中缓存数据，切换回来时通过 `data` prop 传入。

### Q4: BPMN 数据格式不一致？

**A:** 外部使用 `BPMNDiagramData`（`{ nodes, flows }`），BPMN 布局内部使用 `BPMNElement[]` 扁平数组。`C_AntV/index.vue` 会自动做双向转换，无需手动处理。

## 📝 更新日志

### v1.1.0 (2026-02-16)

- 🐛 修复 PNG/SVG 导出报错（移除对不存在的 `@antv/x6-plugin-export` 的依赖）
- ✨ 导出改用 `html2canvas` + `@robot-admin/file-utils` 的 `downloadBlob`
- 🐛 修复 ER 图键盘事件监听器内存泄漏（`graph:removed` 事件不存在）
- 🐛 修复 Delete 键在 input/textarea 中误删连线
- 🐛 修复 ER 图 data watcher 不加载 relations（连线）
- 🐛 修复 BPMN 端口定位逻辑错误（`['event'].includes('circle')` 永远为 `false`）
- 🐛 修复 UML `getCurrentData` 丢失 relations 数据
- 🐛 修复 UML data watcher 为空壳不响应外部数据
- 🐛 修复 BPMN 主题 watcher 与 `useGraphBase` 重复
- 🐛 修复 UMLClassEditor 样式全局泄漏（缺少 `scoped`）
- 🐛 修复 `useGraphBase` 容器尺寸为 0 时无限递归（添加最大重试次数）
- ✨ `useGraphExport` 增加 try-catch + `useMessage` 错误提示
- ✨ Demo 页数据预览改为实时显示编辑数据

### v1.0.0 (2025-07-19)

- ✨ 统一的 AntV X6 图编辑容器组件
- ✨ 支持 ER 图、BPMN 流程图、UML 类图三种图表类型
- ✨ 智能数据格式转换和适配机制
- ✨ 主题切换和暗黑模式支持
- ✨ 完整的 TypeScript 类型定义
- ✨ 响应式设计和灵活尺寸配置

<!--@include: ./snippets/contribute.md -->

**💡 提示**: C_AntV 基于 AntV X6 构建，采用「薄 UI 壳 + 厚 Composable 引擎」分层架构。三个 Composable（`useGraphBase` / `useGraphExport` / `useEdgeInteraction`）封装所有可复用逻辑，Layout 组件只负责特定图表类型的 UI。导出功能使用 `html2canvas` + `@robot-admin/file-utils` 实现，无需安装 `@antv/x6-plugin-export`。如遇问题请先查看故障排除部分。📊
