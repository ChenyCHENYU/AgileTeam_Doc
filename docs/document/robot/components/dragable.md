---
outline: 'deep'
---

# C_Draggable 拖拽组件

> 🎯 基于 vue-draggable-plus 的强大拖拽组件，让排序和重组变得简单而优雅

## 🚀 在线演示

<DemoIframe src="/preview/draggable" title="列表拖拽" height="700" />


## ✨ 特性

- **🎯 多种布局模式**: 支持垂直、水平、网格、弹性布局等多种排列方式
- **🔗 分组拖拽**: 支持跨列表拖拽，完美实现看板式交互
- **🖱️ 拖拽手柄**: 可自定义拖拽手柄，精确控制拖拽区域
- **🎨 丰富动画**: 内置平滑动画效果，提升用户体验
- **📱 响应式布局**: 自适应网格和弹性布局，完美适配各种屏幕
- **🔄 双向绑定**: 完整的数据双向绑定支持
- **🎪 事件系统**: 完整的拖拽生命周期事件监听
- **🎭 空状态**: 内置空状态显示，支持自定义空状态内容
- **💪 TypeScript**: 完整的类型定义和类型安全
- **🎛️ 高度定制**: 支持自定义样式、类名和渲染函数
- **⚡ 高性能**: 基于 vue-draggable-plus 的优化拖拽引擎

## 🏗️ 架构

采用 **薄 UI 壳 + 厚 Composable 引擎** 模式，将组件拆分为三层：

```
┌─────────────────────────────────────────────────────────┐
│              index.vue（~170 行 · 薄 UI 壳）              │
│  Template + Props/Emits + Composable 调用 + Expose       │
├─────────────────────────────────────────────────────────┤
│        useDraggableLayout.ts（~257 行 · 核心引擎）        │
│  布局计算 │ 拖拽选项 │ Item 辅助 │ 事件分发 │ CRUD       │
├─────────────────────────────────────────────────────────┤
│           draggable.d.ts（~110 行 · 类型系统）            │
│  DraggableItem │ DragEvent │ GroupOptions │ LayoutMode   │
│  DraggableProps │ DraggableEmits                         │
└─────────────────────────────────────────────────────────┘
```

| 文件                    | 行数 | 职责                                            |
| ----------------------- | ---- | ----------------------------------------------- |
| `index.vue`             | ~170 | 模板渲染 + Props 默认值 + Expose                |
| `useDraggableLayout.ts` | ~257 | 布局样式计算、拖拽选项构建、列表 CRUD、事件分发 |
| `draggable.d.ts`        | ~110 | 全部类型 / 接口定义                             |
| `index.scss`            | ~313 | 布局样式、拖拽状态、响应式适配                  |

## 📦 安装

::: code-group

```bash [bun (推荐)]
# 安装 vue-draggable-plus 依赖
bun add vue-draggable-plus
```

```bash [pnpm]
# 安装 vue-draggable-plus 依赖
pnpm add vue-draggable-plus
```

```bash [yarn]
# 安装 vue-draggable-plus 依赖
yarn add vue-draggable-plus
```

```bash [npm]
# 安装 vue-draggable-plus 依赖
npm install vue-draggable-plus
```

:::

## 🎯 快速开始

### 基础用法

```vue {3-13}
<template>
  <!-- 最简单的拖拽列表 -->
  <C_Draggable
    v-model="items"
    @drag-start="handleDragStart"
    @drag-end="handleDragEnd"
  >
    <template #default="{ item, index }">
      <div class="list-item">
        <span>{{ item.title }}</span>
      </div>
    </template>
  </C_Draggable>
</template>

<script setup>
  const items = ref([
    { id: 1, title: '第一项' },
    { id: 2, title: '第二项' },
    { id: 3, title: '第三项' },
  ])

  const handleDragStart = event => {
    console.log('拖拽开始:', event)
  }

  const handleDragEnd = event => {
    console.log('拖拽结束:', event)
  }
</script>
```

### 看板式拖拽

```vue {12-19}
<template>
  <div class="kanban-board">
    <div
      v-for="column in kanbanColumns"
      :key="column.key"
      class="kanban-column"
    >
      <div class="column-header">
        <h3>{{ column.title }} ({{ tasks[column.key].length }})</h3>
      </div>

      <C_Draggable
        v-model="tasks[column.key]"
        group="kanban"
        :animation="200"
        class="task-list"
        @item-add="handleTaskAdd"
        @item-remove="handleTaskRemove"
      >
        <template #default="{ item, index }">
          <div class="task-card">
            <div class="task-header">
              <n-tag
                :type="getPriorityType(item.priority)"
                size="small"
              >
                {{ item.priority }}
              </n-tag>
              <span class="task-date">{{ item.date }}</span>
            </div>
            <h4 class="task-title">{{ item.title }}</h4>
            <div class="task-meta">
              <span>{{ item.assignee }}</span>
              <span>{{ item.comments }} 评论</span>
            </div>
          </div>
        </template>

        <template #empty>
          <div class="empty-state">
            <div class="empty-icon">📋</div>
            <p>暂无任务</p>
          </div>
        </template>
      </C_Draggable>
    </div>
  </div>
</template>

<script setup>
  const kanbanColumns = [
    { key: 'todo', title: 'TODO' },
    { key: 'progress', title: 'IN PROGRESS' },
    { key: 'review', title: 'REVIEW' },
    { key: 'done', title: 'DONE' },
  ]

  const tasks = ref({
    todo: [
      {
        id: 1,
        title: 'Dashboard 页面重构',
        priority: 'high',
        date: '2025-07-20',
        assignee: 'Alex',
        comments: 5,
      },
    ],
    progress: [
      {
        id: 2,
        title: '用户权限系统',
        priority: 'medium',
        date: '2025-07-19',
        assignee: 'Bob',
        comments: 3,
      },
    ],
    review: [],
    done: [],
  })

  const getPriorityType = priority => {
    const types = {
      high: 'error',
      medium: 'warning',
      low: 'success',
    }
    return types[priority] || 'default'
  }

  const handleTaskAdd = (item, index) => {
    console.log('任务添加:', item, index)
  }

  const handleTaskRemove = (item, index) => {
    console.log('任务移除:', item, index)
  }
</script>

<style scoped>
  .kanban-board {
    display: flex;
    gap: 16px;
    padding: 20px;
  }

  .kanban-column {
    flex: 1;
    min-width: 280px;
    background: #f5f5f5;
    border-radius: 8px;
    padding: 16px;
  }

  .column-header h3 {
    margin: 0 0 16px 0;
    color: #333;
  }

  .task-list {
    min-height: 400px;
  }

  .task-card {
    background: white;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: grab;
  }

  .task-card:active {
    cursor: grabbing;
  }

  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .task-title {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 500;
  }

  .task-meta {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #666;
  }

  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #999;
  }

  .empty-icon {
    font-size: 32px;
    margin-bottom: 8px;
  }
</style>
```

## 📖 API 文档

### Props

| 参数               | 类型                     | 默认值              | 说明                     |
| ------------------ | ------------------------ | ------------------- | ------------------------ |
| **modelValue**     | `DraggableItem[]`        | `[]`                | 拖拽列表数据（双向绑定） |
| **disabled**       | `boolean`                | `false`             | 是否禁用拖拽功能         |
| **group**          | `string \| GroupOptions` | `'default'`         | 拖拽分组配置             |
| **sort**           | `boolean`                | `true`              | 是否允许列表内排序       |
| **animation**      | `number`                 | `200`               | 拖拽动画持续时间（毫秒） |
| **delay**          | `number`                 | `0`                 | 拖拽延迟时间（毫秒）     |
| **handle**         | `string`                 | `''`                | 拖拽手柄选择器           |
| **showHandle**     | `boolean`                | `false`             | 是否显示默认拖拽手柄     |
| **ghostClass**     | `string`                 | `'sortable-ghost'`  | 拖拽时幽灵元素的类名     |
| **chosenClass**    | `string`                 | `'sortable-chosen'` | 选中元素的类名           |
| **dragClass**      | `string`                 | `'sortable-drag'`   | 拖拽元素的类名           |
| **wrapperClass**   | `string`                 | `''`                | 包装器容器的类名         |
| **listClass**      | `string`                 | `''`                | 列表容器的类名           |
| **itemClass**      | `string`                 | `''`                | 列表项的类名             |
| **showEmptyState** | `boolean`                | `true`              | 是否显示空状态           |
| **emptyText**      | `string`                 | `'暂无数据'`        | 空状态提示文本           |
| **layout**         | `LayoutMode`             | `'vertical'`        | 布局模式                 |
| **gridColumns**    | `number`                 | `4`                 | 网格布局列数             |
| **gridRows**       | `number`                 | `-`                 | 网格布局行数             |
| **gap**            | `string \| number`       | `'8px'`             | 元素间距                 |
| **flexWrap**       | `boolean`                | `false`             | 是否允许弹性换行         |
| **justifyContent** | `string`                 | `'flex-start'`      | 主轴对齐方式             |
| **alignItems**     | `string`                 | `'stretch'`         | 交叉轴对齐方式           |
| **customStyles**   | `Record<string, any>`    | `{}`                | 自定义样式对象           |

### Events

| 事件名                | 参数                                   | 说明               |
| --------------------- | -------------------------------------- | ------------------ |
| **update:modelValue** | `(value: DraggableItem[])`             | 列表数据更新时触发 |
| **drag-start**        | `(event: DragEvent)`                   | 拖拽开始时触发     |
| **drag-end**          | `(event: DragEvent)`                   | 拖拽结束时触发     |
| **item-add**          | `(item: DraggableItem, index: number)` | 项目添加时触发     |
| **item-remove**       | `(item: DraggableItem, index: number)` | 项目移除时触发     |
| **list-change**       | `(list: DraggableItem[])`              | 列表变化时触发     |

### Slots

| 插槽名      | 参数                                      | 说明             |
| ----------- | ----------------------------------------- | ---------------- |
| **default** | `{ item, index, isDragging, isDisabled }` | 自定义列表项内容 |
| **empty**   | `-`                                       | 自定义空状态内容 |

### 暴露方法

| 方法名         | 参数                                    | 返回值                       | 说明         |
| -------------- | --------------------------------------- | ---------------------------- | ------------ |
| **addItem**    | `(item: DraggableItem, index?: number)` | `void`                       | 添加列表项   |
| **removeItem** | `(index: number)`                       | `DraggableItem \| null`      | 移除列表项   |
| **moveItem**   | `(fromIndex: number, toIndex: number)`  | `boolean`                    | 移动列表项   |
| **updateList** | `(newList: DraggableItem[])`            | `void`                       | 更新整个列表 |
| **clear**      | `-`                                     | `void`                       | 清空列表     |
| **getItem**    | `(index: number)`                       | `DraggableItem \| undefined` | 获取指定项目 |
| **findIndex**  | `(predicate: Function)`                 | `number`                     | 查找项目索引 |

## 类型定义

#### 拖拽项目接口

```typescript
interface DraggableItem {
  id: string | number
  title?: string
  name?: string
  label?: string
  description?: string
  [key: string]: any
}
```

#### 拖拽事件接口

```typescript
interface DragEvent {
  oldIndex: number
  newIndex: number
  item: DraggableItem
}
```

#### 分组配置接口

```typescript
interface GroupOptions {
  name: string
  pull?: boolean | string | string[]
  put?: boolean | string | string[]
  revertClone?: boolean
}
```

#### 布局模式

```typescript
type LayoutMode = 'vertical' | 'horizontal' | 'grid' | 'flex-wrap'
```

## 🎨 使用示例

::: details 📋 项目任务看板 - 完整的任务管理示例

```vue
<template>
  <div class="project-kanban">
    <n-card
      title="项目任务看板"
      style="margin-bottom: 16px;"
    >
      <n-space>
        <n-button
          type="primary"
          @click="addNewTask"
        >
          添加任务
        </n-button>
        <n-button @click="clearCompletedTasks"> 清理已完成 </n-button>
        <n-select
          v-model:value="filterPriority"
          :options="priorityOptions"
          placeholder="筛选优先级"
          clearable
          style="width: 150px"
        />
      </n-space>
    </n-card>

    <div class="kanban-container">
      <div
        v-for="status in taskStatuses"
        :key="status.key"
        class="status-column"
      >
        <div
          class="status-header"
          :class="status.headerClass"
        >
          <h3>{{ status.title }}</h3>
          <n-badge :value="getTaskCount(status.key)" />
        </div>

        <C_Draggable
          v-model="filteredTasks[status.key]"
          group="project-tasks"
          :animation="300"
          class="task-container"
          @item-add="handleTaskMoved"
          @item-remove="handleTaskMoved"
          @drag-end="handleDragEnd"
        >
          <template #default="{ item, index }">
            <div
              class="task-item"
              :class="getTaskClass(item)"
            >
              <div class="task-header">
                <n-tag
                  :type="getPriorityType(item.priority)"
                  size="small"
                >
                  {{ item.priority.toUpperCase() }}
                </n-tag>
                <n-dropdown
                  :options="getTaskMenuOptions(item)"
                  @select="handleTaskMenu"
                >
                  <n-button
                    size="tiny"
                    quaternary
                  >
                    <template #icon>
                      <div class="i-mdi:dots-vertical"></div>
                    </template>
                  </n-button>
                </n-dropdown>
              </div>

              <h4 class="task-title">{{ item.title }}</h4>

              <div
                class="task-description"
                v-if="item.description"
              >
                {{ item.description }}
              </div>

              <div
                class="task-tags"
                v-if="item.tags?.length"
              >
                <n-tag
                  v-for="tag in item.tags"
                  :key="tag"
                  size="small"
                  style="margin-right: 4px;"
                >
                  {{ tag }}
                </n-tag>
              </div>

              <div class="task-footer">
                <div class="assignee-info">
                  <n-avatar
                    :size="24"
                    :src="item.assignee.avatar"
                  />
                  <span>{{ item.assignee.name }}</span>
                </div>
                <div class="task-meta">
                  <span class="due-date">{{ formatDate(item.dueDate) }}</span>
                  <span class="comment-count">💬 {{ item.comments }}</span>
                </div>
              </div>

              <div
                class="task-progress"
                v-if="item.progress !== undefined"
              >
                <n-progress
                  :percentage="item.progress"
                  :color="getProgressColor(item.progress)"
                  :height="4"
                />
              </div>
            </div>
          </template>

          <template #empty>
            <div class="status-empty">
              <div :class="status.emptyIcon"></div>
              <p>{{ status.emptyText }}</p>
            </div>
          </template>
        </C_Draggable>
      </div>
    </div>

    <!-- 任务统计 -->
    <n-card
      class="mt-20px"
      title="任务统计"
    >
      <n-grid
        cols="4"
        x-gap="16"
      >
        <n-grid-item>
          <n-statistic
            label="总任务数"
            :value="totalTasksCount"
          />
        </n-grid-item>
        <n-grid-item>
          <n-statistic
            label="进行中"
            :value="inProgressCount"
          />
        </n-grid-item>
        <n-grid-item>
          <n-statistic
            label="已完成"
            :value="completedCount"
          />
        </n-grid-item>
        <n-grid-item>
          <n-statistic
            label="逾期任务"
            :value="overdueCount"
          />
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script setup>
  const message = useMessage()
  const dialog = useDialog()

  const filterPriority = ref(null)

  const priorityOptions = [
    { label: '高优先级', value: 'high' },
    { label: '中优先级', value: 'medium' },
    { label: '低优先级', value: 'low' },
  ]

  const taskStatuses = [
    {
      key: 'backlog',
      title: 'BACKLOG',
      headerClass: 'backlog-header',
      emptyIcon: 'i-mdi:clipboard-list-outline',
      emptyText: '暂无待办任务',
    },
    {
      key: 'todo',
      title: 'TODO',
      headerClass: 'todo-header',
      emptyIcon: 'i-mdi:format-list-checks',
      emptyText: '暂无计划任务',
    },
    {
      key: 'inProgress',
      title: 'IN PROGRESS',
      headerClass: 'progress-header',
      emptyIcon: 'i-mdi:progress-clock',
      emptyText: '暂无进行中任务',
    },
    {
      key: 'review',
      title: 'REVIEW',
      headerClass: 'review-header',
      emptyIcon: 'i-mdi:eye-check-outline',
      emptyText: '暂无待审核任务',
    },
    {
      key: 'done',
      title: 'DONE',
      headerClass: 'done-header',
      emptyIcon: 'i-mdi:check-circle-outline',
      emptyText: '暂无已完成任务',
    },
  ]

  const projectTasks = ref({
    backlog: [
      {
        id: 'task-1',
        title: '用户权限系统重构',
        description: '重新设计用户权限管理模块，支持更细粒度的权限控制',
        priority: 'high',
        assignee: {
          name: 'Alice',
          avatar:
            'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=64',
        },
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        comments: 5,
        tags: ['backend', 'security'],
        progress: 0,
      },
    ],
    todo: [
      {
        id: 'task-2',
        title: 'Dashboard 数据可视化',
        description: '实现实时数据图表展示功能',
        priority: 'medium',
        assignee: {
          name: 'Bob',
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64',
        },
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        comments: 2,
        tags: ['frontend', 'charts'],
        progress: 15,
      },
    ],
    inProgress: [
      {
        id: 'task-3',
        title: 'API 性能优化',
        description: '优化核心 API 接口响应时间',
        priority: 'high',
        assignee: {
          name: 'Charlie',
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64',
        },
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        comments: 8,
        tags: ['backend', 'performance'],
        progress: 60,
      },
    ],
    review: [
      {
        id: 'task-4',
        title: '移动端适配',
        description: '完善移动端用户体验',
        priority: 'medium',
        assignee: {
          name: 'Diana',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64',
        },
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        comments: 3,
        tags: ['frontend', 'mobile'],
        progress: 90,
      },
    ],
    done: [
      {
        id: 'task-5',
        title: '单元测试编写',
        description: '为核心业务逻辑编写单元测试',
        priority: 'low',
        assignee: {
          name: 'Eve',
          avatar:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64',
        },
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        comments: 1,
        tags: ['testing'],
        progress: 100,
      },
    ],
  })

  const filteredTasks = computed(() => {
    if (!filterPriority.value) {
      return projectTasks.value
    }

    const filtered = {}
    Object.keys(projectTasks.value).forEach(status => {
      filtered[status] = projectTasks.value[status].filter(
        task => task.priority === filterPriority.value
      )
    })
    return filtered
  })

  const totalTasksCount = computed(() => {
    return Object.values(projectTasks.value).flat().length
  })

  const inProgressCount = computed(() => {
    return projectTasks.value.inProgress.length
  })

  const completedCount = computed(() => {
    return projectTasks.value.done.length
  })

  const overdueCount = computed(() => {
    const now = new Date()
    return Object.values(projectTasks.value)
      .flat()
      .filter(task => new Date(task.dueDate) < now && task.progress < 100)
      .length
  })

  const getTaskCount = status => {
    return filteredTasks.value[status]?.length || 0
  }

  const getPriorityType = priority => {
    const types = {
      high: 'error',
      medium: 'warning',
      low: 'success',
    }
    return types[priority] || 'default'
  }

  const getTaskClass = task => {
    return {
      'high-priority': task.priority === 'high',
      overdue: new Date(task.dueDate) < new Date() && task.progress < 100,
    }
  }

  const getProgressColor = progress => {
    if (progress >= 80) return '#52c41a'
    if (progress >= 40) return '#1890ff'
    return '#faad14'
  }

  const formatDate = date => {
    return new Date(date).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
    })
  }

  const getTaskMenuOptions = task => {
    return [
      { label: '编辑', key: 'edit' },
      { label: '复制', key: 'copy' },
      { label: '删除', key: 'delete' },
    ]
  }

  const handleTaskMenu = (key, option) => {
    console.log('任务菜单操作:', key, option)
  }

  const handleTaskMoved = (item, index) => {
    message.success(`任务 "${item.title}" 已移动`)
  }

  const handleDragEnd = event => {
    console.log('拖拽完成:', event)
  }

  const addNewTask = () => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: `新任务 ${totalTasksCount.value + 1}`,
      description: '这是一个新添加的任务',
      priority: 'medium',
      assignee: {
        name: 'New User',
        avatar:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64',
      },
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      comments: 0,
      tags: ['new'],
      progress: 0,
    }

    projectTasks.value.backlog.push(newTask)
    message.success('新任务已添加到待办列表')
  }

  const clearCompletedTasks = () => {
    dialog.info({
      title: '清理已完成任务',
      content: `确定要清理 ${projectTasks.value.done.length} 个已完成的任务吗？`,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        projectTasks.value.done = []
        message.success('已完成的任务已清理')
      },
    })
  }
</script>

<style scoped>
  .project-kanban {
    padding: 24px;
  }

  .kanban-container {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    padding-bottom: 16px;
  }

  .status-column {
    flex: 1;
    min-width: 280px;
    max-width: 320px;
    background: #fafafa;
    border-radius: 8px;
    padding: 16px;
  }

  .status-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #e0e0e0;
  }

  .status-header h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  .backlog-header {
    border-bottom-color: #ff9800;
  }
  .todo-header {
    border-bottom-color: #2196f3;
  }
  .progress-header {
    border-bottom-color: #9c27b0;
  }
  .review-header {
    border-bottom-color: #ff5722;
  }
  .done-header {
    border-bottom-color: #4caf50;
  }

  .task-container {
    min-height: 500px;
  }

  .task-item {
    background: white;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
    cursor: grab;
    transition: all 0.2s ease;
  }

  .task-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }

  .task-item:active {
    cursor: grabbing;
  }

  .task-item.high-priority {
    border-left: 4px solid #f56565;
  }

  .task-item.overdue {
    background: #fff5f5;
    border-color: #feb2b2;
  }

  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .task-title {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
    color: #2d3748;
    line-height: 1.3;
  }

  .task-description {
    font-size: 14px;
    color: #4a5568;
    line-height: 1.4;
    margin-bottom: 12px;
  }

  .task-tags {
    margin-bottom: 12px;
  }

  .task-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .assignee-info {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #4a5568;
  }

  .task-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 12px;
    color: #718096;
    gap: 2px;
  }

  .status-empty {
    text-align: center;
    padding: 60px 20px;
    color: #a0aec0;
  }

  .status-empty div {
    font-size: 48px;
    margin-bottom: 12px;
  }
</style>
```

:::

::: details 🛠️ 技术栈管理 - 专业技术栈拖拽排序

```vue
<template>
  <div class="tech-stack-manager">
    <n-card
      title="技术栈管理"
      style="margin-bottom: 16px;"
    >
      <n-space>
        <n-button
          type="primary"
          @click="addTechStack"
        >
          添加技术栈
        </n-button>
        <n-button @click="sortByPopularity"> 按热度排序 </n-button>
        <n-switch v-model:value="showAdvancedInfo">
          <template #checked>详细信息</template>
          <template #unchecked>简单模式</template>
        </n-switch>
      </n-space>
    </n-card>

    <n-grid
      cols="2"
      x-gap="16"
    >
      <!-- 前端技术栈 -->
      <n-grid-item>
        <n-card
          title="前端技术栈"
          size="small"
        >
          <C_Draggable
            v-model="frontendTechs"
            group="tech-stacks"
            handle=".tech-handle"
            :animation="200"
            layout="vertical"
            gap="12px"
            @list-change="handleTechChange"
          >
            <template #default="{ item, index }">
              <div
                class="tech-item"
                :class="getTechClass(item)"
              >
                <div class="tech-header">
                  <div class="tech-logo">
                    <img
                      :src="item.logo"
                      :alt="item.name"
                    />
                  </div>
                  <div class="tech-info">
                    <h4 class="tech-name">{{ item.name }}</h4>
                    <p
                      class="tech-version"
                      v-if="showAdvancedInfo"
                    >
                      v{{ item.version }}
                    </p>
                  </div>
                  <div class="tech-actions">
                    <n-rate
                      v-model:value="item.rating"
                      size="small"
                      :count="5"
                      @update:value="updateRating(item, $event)"
                    />
                    <div class="tech-handle">
                      <div class="i-mdi:drag-vertical"></div>
                    </div>
                  </div>
                </div>

                <div
                  class="tech-description"
                  v-if="showAdvancedInfo"
                >
                  {{ item.description }}
                </div>

                <div
                  class="tech-meta"
                  v-if="showAdvancedInfo"
                >
                  <n-space size="small">
                    <n-tag
                      size="small"
                      :color="{ color: item.category.color }"
                    >
                      {{ item.category.name }}
                    </n-tag>
                    <n-tag
                      size="small"
                      type="info"
                    >
                      {{ item.difficulty }}
                    </n-tag>
                    <n-tag
                      size="small"
                      type="success"
                    >
                      {{ item.popularity }}% 使用率
                    </n-tag>
                  </n-space>
                </div>

                <div
                  class="tech-links"
                  v-if="showAdvancedInfo"
                >
                  <n-button-group size="tiny">
                    <n-button @click="openLink(item.officialSite)">
                      官网
                    </n-button>
                    <n-button @click="openLink(item.docs)"> 文档 </n-button>
                    <n-button
                      @click="openLink(item.github)"
                      v-if="item.github"
                    >
                      GitHub
                    </n-button>
                  </n-button-group>
                </div>
              </div>
            </template>
          </C_Draggable>
        </n-card>
      </n-grid-item>

      <!-- 后端技术栈 -->
      <n-grid-item>
        <n-card
          title="后端技术栈"
          size="small"
        >
          <C_Draggable
            v-model="backendTechs"
            group="tech-stacks"
            handle=".tech-handle"
            :animation="200"
            layout="vertical"
            gap="12px"
            @list-change="handleTechChange"
          >
            <template #default="{ item, index }">
              <div
                class="tech-item"
                :class="getTechClass(item)"
              >
                <div class="tech-header">
                  <div class="tech-logo">
                    <img
                      :src="item.logo"
                      :alt="item.name"
                    />
                  </div>
                  <div class="tech-info">
                    <h4 class="tech-name">{{ item.name }}</h4>
                    <p
                      class="tech-version"
                      v-if="showAdvancedInfo"
                    >
                      v{{ item.version }}
                    </p>
                  </div>
                  <div class="tech-actions">
                    <n-rate
                      v-model:value="item.rating"
                      size="small"
                      :count="5"
                      @update:value="updateRating(item, $event)"
                    />
                    <div class="tech-handle">
                      <div class="i-mdi:drag-vertical"></div>
                    </div>
                  </div>
                </div>

                <div
                  class="tech-description"
                  v-if="showAdvancedInfo"
                >
                  {{ item.description }}
                </div>

                <div
                  class="tech-meta"
                  v-if="showAdvancedInfo"
                >
                  <n-space size="small">
                    <n-tag
                      size="small"
                      :color="{ color: item.category.color }"
                    >
                      {{ item.category.name }}
                    </n-tag>
                    <n-tag
                      size="small"
                      type="info"
                    >
                      {{ item.difficulty }}
                    </n-tag>
                    <n-tag
                      size="small"
                      type="success"
                    >
                      {{ item.popularity }}% 使用率
                    </n-tag>
                  </n-space>
                </div>

                <div
                  class="tech-links"
                  v-if="showAdvancedInfo"
                >
                  <n-button-group size="tiny">
                    <n-button @click="openLink(item.officialSite)">
                      官网
                    </n-button>
                    <n-button @click="openLink(item.docs)"> 文档 </n-button>
                    <n-button
                      @click="openLink(item.github)"
                      v-if="item.github"
                    >
                      GitHub
                    </n-button>
                  </n-button-group>
                </div>
              </div>
            </template>
          </C_Draggable>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
  const message = useMessage()
  const showAdvancedInfo = ref(false)

  const frontendTechs = ref([
    {
      id: 'vue',
      name: 'Vue.js',
      version: '3.4.0',
      logo: 'https://vuejs.org/logo.svg',
      description: '渐进式 JavaScript 框架，用于构建用户界面',
      category: { name: '框架', color: '#42b883' },
      difficulty: '中等',
      popularity: 85,
      rating: 5,
      officialSite: 'https://vuejs.org/',
      docs: 'https://vuejs.org/guide/',
      github: 'https://github.com/vuejs/vue',
    },
    {
      id: 'react',
      name: 'React',
      version: '18.2.0',
      logo: 'https://react.dev/favicon-32x32.png',
      description: '用于构建用户界面的 JavaScript 库',
      category: { name: '框架', color: '#61dafb' },
      difficulty: '中等',
      popularity: 90,
      rating: 4,
      officialSite: 'https://react.dev/',
      docs: 'https://react.dev/learn',
      github: 'https://github.com/facebook/react',
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      version: '5.3.0',
      logo: 'https://www.typescriptlang.org/favicon-32x32.png',
      description: 'JavaScript 的超集，添加了静态类型定义',
      category: { name: '语言', color: '#3178c6' },
      difficulty: '中等',
      popularity: 75,
      rating: 5,
      officialSite: 'https://www.typescriptlang.org/',
      docs: 'https://www.typescriptlang.org/docs/',
      github: 'https://github.com/microsoft/TypeScript',
    },
  ])

  const backendTechs = ref([
    {
      id: 'nodejs',
      name: 'Node.js',
      version: '20.10.0',
      logo: 'https://nodejs.org/static/images/favicons/favicon-32x32.png',
      description: '基于 Chrome V8 引擎的 JavaScript 运行时',
      category: { name: '运行时', color: '#339933' },
      difficulty: '中等',
      popularity: 80,
      rating: 4,
      officialSite: 'https://nodejs.org/',
      docs: 'https://nodejs.org/docs/',
      github: 'https://github.com/nodejs/node',
    },
    {
      id: 'express',
      name: 'Express.js',
      version: '4.18.2',
      logo: 'https://expressjs.com/images/favicon.png',
      description: '快速、开放、极简的 Node.js Web 应用框架',
      category: { name: '框架', color: '#000000' },
      difficulty: '简单',
      popularity: 70,
      rating: 4,
      officialSite: 'https://expressjs.com/',
      docs: 'https://expressjs.com/en/4x/api.html',
      github: 'https://github.com/expressjs/express',
    },
  ])

  const getTechClass = tech => {
    return {
      'high-rating': tech.rating >= 4,
      popular: tech.popularity >= 80,
    }
  }

  const updateRating = (tech, rating) => {
    message.success(`${tech.name} 评分已更新为 ${rating} 星`)
  }

  const openLink = url => {
    window.open(url, '_blank')
  }

  const handleTechChange = list => {
    console.log(
      '技术栈顺序已更新:',
      list.map(t => t.name)
    )
  }

  const addTechStack = () => {
    const newTech = {
      id: `tech-${Date.now()}`,
      name: '新技术',
      version: '1.0.0',
      logo: 'https://via.placeholder.com/32',
      description: '这是一个新添加的技术栈',
      category: { name: '其他', color: '#666666' },
      difficulty: '未知',
      popularity: 0,
      rating: 3,
      officialSite: '#',
      docs: '#',
    }

    frontendTechs.value.push(newTech)
    message.success('新技术栈已添加')
  }

  const sortByPopularity = () => {
    frontendTechs.value.sort((a, b) => b.popularity - a.popularity)
    backendTechs.value.sort((a, b) => b.popularity - a.popularity)
    message.success('已按热度排序')
  }
</script>

<style scoped>
  .tech-stack-manager {
    padding: 24px;
  }

  .tech-item {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    transition: all 0.2s ease;
  }

  .tech-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-color: #d0d0d0;
  }

  .tech-item.high-rating {
    border-left: 4px solid #52c41a;
  }

  .tech-item.popular {
    background: linear-gradient(135deg, #fff 0%, #f0f9ff 100%);
  }

  .tech-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
  }

  .tech-logo {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }

  .tech-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .tech-info {
    flex: 1;
  }

  .tech-name {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .tech-version {
    margin: 0;
    font-size: 12px;
    color: #666;
  }

  .tech-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }

  .tech-handle {
    cursor: grab;
    color: #999;
    padding: 4px;
    border-radius: 4px;
    transition: color 0.2s ease;
  }

  .tech-handle:hover {
    color: #666;
    background: #f5f5f5;
  }

  .tech-handle:active {
    cursor: grabbing;
  }

  .tech-description {
    font-size: 14px;
    color: #555;
    line-height: 1.4;
    margin-bottom: 12px;
  }

  .tech-meta {
    margin-bottom: 12px;
  }

  .tech-links {
    display: flex;
    justify-content: flex-end;
  }
</style>
```

:::

::: details 📁 网格布局文件管理 - 灵活的文件拖拽系统

```vue
<template>
  <div class="file-manager">
    <n-card
      title="文件管理器"
      style="margin-bottom: 16px;"
    >
      <n-space>
        <n-button-group>
          <n-button
            :type="layout === 'grid' ? 'primary' : 'default'"
            @click="layout = 'grid'"
          >
            <template #icon><div class="i-mdi:grid"></div></template>
            网格
          </n-button>
          <n-button
            :type="layout === 'vertical' ? 'primary' : 'default'"
            @click="layout = 'vertical'"
          >
            <template #icon
              ><div class="i-mdi:format-list-bulleted"></div
            ></template>
            列表
          </n-button>
        </n-button-group>

        <n-slider
          v-model:value="gridColumns"
          :min="2"
          :max="8"
          :step="1"
          style="width: 120px"
          v-show="layout === 'grid'"
        />

        <n-button @click="addNewFile"> 添加文件 </n-button>

        <n-button @click="selectAll"> 全选 </n-button>

        <n-button
          @click="deleteSelected"
          :disabled="selectedFiles.length === 0"
          type="error"
        >
          删除选中 ({{ selectedFiles.length }})
        </n-button>
      </n-space>
    </n-card>

    <C_Draggable
      v-model="files"
      :layout="layout"
      :grid-columns="gridColumns"
      :gap="layout === 'grid' ? '16px' : '8px'"
      :animation="250"
      class="file-container"
      @drag-end="handleFileReorder"
    >
      <template #default="{ item, index }">
        <div
          class="file-item"
          :class="getFileClass(item)"
          @click="toggleFileSelection(item)"
          @dblclick="openFile(item)"
        >
          <div class="file-icon">
            <div :class="getFileIcon(item)"></div>
            <div class="file-size">{{ formatFileSize(item.size) }}</div>
          </div>

          <div class="file-info">
            <h4 class="file-name">{{ item.name }}</h4>
            <p class="file-meta">
              {{ formatDate(item.modifiedAt) }}
            </p>
            <p class="file-type">{{ item.type.toUpperCase() }}</p>
          </div>

          <div
            class="file-actions"
            @click.stop
          >
            <n-dropdown
              :options="getFileMenuOptions(item)"
              @select="handleFileAction"
            >
              <n-button
                size="tiny"
                quaternary
              >
                <template #icon>
                  <div class="i-mdi:dots-vertical"></div>
                </template>
              </n-button>
            </n-dropdown>
          </div>

          <div
            class="file-checkbox"
            @click.stop
          >
            <n-checkbox
              :checked="selectedFiles.includes(item.id)"
              @update:checked="toggleFileSelection(item)"
            />
          </div>
        </div>
      </template>

      <template #empty>
        <div class="empty-folder">
          <div class="i-mdi:folder-open-outline"></div>
          <p>文件夹为空</p>
          <n-button @click="addNewFile">添加第一个文件</n-button>
        </div>
      </template>
    </C_Draggable>

    <!-- 文件预览模态框 -->
    <n-modal
      v-model:show="showPreview"
      preset="dialog"
      style="width: 600px;"
    >
      <template #header>
        <span>{{ previewFile?.name }}</span>
      </template>
      <div
        class="file-preview"
        v-if="previewFile"
      >
        <div class="preview-content">
          <div class="preview-icon">
            <div :class="getFileIcon(previewFile)"></div>
          </div>
          <div class="preview-info">
            <h3>{{ previewFile.name }}</h3>
            <p><strong>类型:</strong> {{ previewFile.type }}</p>
            <p><strong>大小:</strong> {{ formatFileSize(previewFile.size) }}</p>
            <p
              ><strong>修改时间:</strong>
              {{ formatDate(previewFile.modifiedAt) }}</p
            >
            <p
              ><strong>创建时间:</strong>
              {{ formatDate(previewFile.createdAt) }}</p
            >
          </div>
        </div>
        <div class="preview-actions">
          <n-button-group>
            <n-button>下载</n-button>
            <n-button>重命名</n-button>
            <n-button type="error">删除</n-button>
          </n-button-group>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
  const message = useMessage()
  const dialog = useDialog()

  const layout = ref('grid')
  const gridColumns = ref(4)
  const selectedFiles = ref([])
  const showPreview = ref(false)
  const previewFile = ref(null)

  const files = ref([
    {
      id: 'file-1',
      name: 'project-proposal.pdf',
      type: 'pdf',
      size: 2048000,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'file-2',
      name: 'design-mockup.png',
      type: 'image',
      size: 512000,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'file-3',
      name: 'data-analysis.xlsx',
      type: 'spreadsheet',
      size: 1024000,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'file-4',
      name: 'meeting-notes.docx',
      type: 'document',
      size: 256000,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'file-5',
      name: 'app-source.zip',
      type: 'archive',
      size: 10240000,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'file-6',
      name: 'presentation.pptx',
      type: 'presentation',
      size: 3072000,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      modifiedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ])

  const getFileClass = file => {
    return {
      'file-selected': selectedFiles.value.includes(file.id),
      [`file-${file.type}`]: true,
    }
  }

  const getFileIcon = file => {
    const iconMap = {
      pdf: 'i-mdi:file-pdf-box text-red-500',
      image: 'i-mdi:file-image text-green-500',
      spreadsheet: 'i-mdi:file-excel-box text-green-600',
      document: 'i-mdi:file-word-box text-blue-500',
      archive: 'i-mdi:file-zip-box text-yellow-500',
      presentation: 'i-mdi:file-powerpoint-box text-orange-500',
      default: 'i-mdi:file-outline text-gray-500',
    }
    return iconMap[file.type] || iconMap.default
  }

  const formatFileSize = bytes => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const formatDate = date => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const toggleFileSelection = file => {
    const index = selectedFiles.value.indexOf(file.id)
    if (index > -1) {
      selectedFiles.value.splice(index, 1)
    } else {
      selectedFiles.value.push(file.id)
    }
  }

  const selectAll = () => {
    if (selectedFiles.value.length === files.value.length) {
      selectedFiles.value = []
    } else {
      selectedFiles.value = files.value.map(f => f.id)
    }
  }

  const openFile = file => {
    previewFile.value = file
    showPreview.value = true
  }

  const getFileMenuOptions = file => {
    return [
      { label: '打开', key: 'open' },
      { label: '重命名', key: 'rename' },
      { label: '复制', key: 'copy' },
      { label: '移动', key: 'move' },
      { type: 'divider' },
      { label: '删除', key: 'delete' },
    ]
  }

  const handleFileAction = (key, option) => {
    console.log('文件操作:', key)
    message.info(`执行操作: ${option.label}`)
  }

  const handleFileReorder = event => {
    message.success('文件顺序已更新')
  }

  const addNewFile = () => {
    const fileTypes = ['pdf', 'image', 'document', 'spreadsheet']
    const randomType = fileTypes[Math.floor(Math.random() * fileTypes.length)]

    const newFile = {
      id: `file-${Date.now()}`,
      name: `new-file-${files.value.length + 1}.${randomType}`,
      type: randomType,
      size: Math.floor(Math.random() * 5000000) + 100000,
      createdAt: new Date(),
      modifiedAt: new Date(),
    }

    files.value.push(newFile)
    message.success('新文件已添加')
  }

  const deleteSelected = () => {
    if (selectedFiles.value.length === 0) return

    dialog.warning({
      title: '删除文件',
      content: `确定要删除 ${selectedFiles.value.length} 个文件吗？此操作不可恢复。`,
      positiveText: '删除',
      negativeText: '取消',
      onPositiveClick: () => {
        files.value = files.value.filter(
          f => !selectedFiles.value.includes(f.id)
        )
        selectedFiles.value = []
        message.success('选中的文件已删除')
      },
    })
  }
</script>

<style scoped>
  .file-manager {
    padding: 24px;
  }

  .file-container.layout-vertical .file-name {
    font-size: 16px;
    margin-bottom: 4px;
  }

  .file-container.layout-vertical .file-size {
    display: inline-block;
    margin: 0 0 0 12px;
  }
</style>
```

:::

## 🛠️ 高级用法

::: details 🖱️ 自定义拖拽手柄 - 精确控制拖拽区域

```vue
<template>
  <C_Draggable
    v-model="items"
    handle=".custom-handle"
    :animation="200"
  >
    <template #default="{ item, index }">
      <div class="custom-item">
        <div class="custom-handle">
          <div class="handle-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
        <div class="item-content">
          {{ item.title }}
        </div>
      </div>
    </template>
  </C_Draggable>
</template>

<style scoped>
  .custom-item {
    display: flex;
    align-items: center;
    padding: 12px;
    background: white;
    border: 1px solid #e0e0e0;
    margin-bottom: 8px;
    border-radius: 6px;
  }

  .custom-handle {
    margin-right: 12px;
    cursor: grab;
    padding: 4px;
    border-radius: 4px;
    transition: background 0.2s ease;
  }

  .custom-handle:hover {
    background: #f5f5f5;
  }

  .custom-handle:active {
    cursor: grabbing;
  }

  .handle-dots {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    width: 12px;
    height: 12px;
  }

  .dot {
    width: 4px;
    height: 4px;
    background: #999;
    border-radius: 50%;
  }

  .item-content {
    flex: 1;
    font-weight: 500;
  }
</style>
```

:::

::: details 🔗 分组拖拽配置 - 跨列表拖拽设置

```vue
<template>
  <div class="group-demo">
    <!-- 源列表 -->
    <div class="source-list">
      <h3>源列表</h3>
      <C_Draggable
        v-model="sourceItems"
        :group="{ name: 'shared', pull: 'clone', put: false }"
        :sort="false"
      >
        <template #default="{ item }">
          <div class="source-item">
            {{ item.title }}
          </div>
        </template>
      </C_Draggable>
    </div>

    <!-- 目标列表 -->
    <div class="target-list">
      <h3>目标列表</h3>
      <C_Draggable
        v-model="targetItems"
        :group="{ name: 'shared', pull: true, put: true }"
      >
        <template #default="{ item }">
          <div class="target-item">
            {{ item.title }}
          </div>
        </template>
      </C_Draggable>
    </div>
  </div>
</template>

<script setup>
  const sourceItems = ref([
    { id: 1, title: '拖拽我到右侧' },
    { id: 2, title: '复制到目标列表' },
    { id: 3, title: '我也可以被拖拽' },
  ])

  const targetItems = ref([])
</script>

<style scoped>
  .group-demo {
    display: flex;
    gap: 20px;
  }

  .source-list,
  .target-list {
    flex: 1;
    min-height: 300px;
    background: #f5f5f5;
    padding: 16px;
    border-radius: 8px;
  }

  .source-item,
  .target-item {
    padding: 12px;
    background: white;
    margin-bottom: 8px;
    border-radius: 4px;
    cursor: grab;
  }

  .source-item:active,
  .target-item:active {
    cursor: grabbing;
  }
</style>
```

:::

::: details ✅ 条件拖拽和验证 - 智能拖拽控制

```vue
<template>
  <C_Draggable
    v-model="items"
    :disabled="isDragDisabled"
    @drag-start="handleDragStart"
    @drag-end="handleDragEnd"
  >
    <template #default="{ item, index }">
      <div
        class="conditional-item"
        :class="{
          draggable: item.draggable,
          locked: !item.draggable,
        }"
      >
        <div class="item-status">
          <div
            v-if="item.draggable"
            class="i-mdi:drag-vertical"
          ></div>
          <div
            v-else
            class="i-mdi:lock"
          ></div>
        </div>
        <div class="item-content">
          <h4>{{ item.title }}</h4>
          <p>{{ item.draggable ? '可拖拽' : '已锁定' }}</p>
        </div>
        <div class="item-actions">
          <n-button
            size="small"
            @click="toggleDraggable(item)"
          >
            {{ item.draggable ? '锁定' : '解锁' }}
          </n-button>
        </div>
      </div>
    </template>
  </C_Draggable>
</template>

<script setup>
  const message = useMessage()
  const isDragDisabled = ref(false)

  const items = ref([
    { id: 1, title: '可拖拽项目', draggable: true },
    { id: 2, title: '锁定项目', draggable: false },
    { id: 3, title: '另一个可拖拽项目', draggable: true },
  ])

  const handleDragStart = event => {
    const item = event.item
    if (!item.draggable) {
      message.warning('此项目已被锁定，无法拖拽')
      return false // 阻止拖拽
    }
  }

  const handleDragEnd = event => {
    console.log('拖拽完成:', event)
  }

  const toggleDraggable = item => {
    item.draggable = !item.draggable
    message.success(`${item.title} ${item.draggable ? '已解锁' : '已锁定'}`)
  }
</script>

<style scoped>
  .conditional-item {
    display: flex;
    align-items: center;
    padding: 16px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    margin-bottom: 8px;
    transition: all 0.2s ease;
  }

  .conditional-item.draggable {
    cursor: grab;
  }

  .conditional-item.draggable:active {
    cursor: grabbing;
  }

  .conditional-item.locked {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }

  .item-status {
    margin-right: 12px;
    font-size: 18px;
  }

  .item-content {
    flex: 1;
  }

  .item-content h4 {
    margin: 0 0 4px 0;
    font-size: 14px;
  }

  .item-content p {
    margin: 0;
    font-size: 12px;
    color: #666;
  }

  .item-actions {
    margin-left: 12px;
  }
</style>
```

:::

::: details 💾 数据持久化 - 本地存储和导入导出

```vue
<template>
  <div class="persistent-drag">
    <n-space class="mb-16px">
      <n-button @click="saveToLocal">保存到本地</n-button>
      <n-button @click="loadFromLocal">从本地加载</n-button>
      <n-button @click="exportData">导出数据</n-button>
      <n-upload
        @change="importData"
        :show-file-list="false"
        accept=".json"
      >
        <n-button>导入数据</n-button>
      </n-upload>
    </n-space>

    <C_Draggable
      v-model="persistentItems"
      @list-change="handleListChange"
      :animation="200"
    >
      <template #default="{ item, index }">
        <div class="persistent-item">
          <span>{{ item.title }}</span>
          <small>位置: {{ index + 1 }}</small>
        </div>
      </template>
    </C_Draggable>
  </div>
</template>

<script setup>
  const message = useMessage()
  const STORAGE_KEY = 'draggable-list-data'

  const persistentItems = ref([
    { id: 1, title: '第一项' },
    { id: 2, title: '第二项' },
    { id: 3, title: '第三项' },
  ])

  // 自动保存到 localStorage
  const handleListChange = list => {
    saveToLocal()
    console.log('列表已更新并保存:', list)
  }

  const saveToLocal = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentItems.value))
      message.success('数据已保存到本地')
    } catch (error) {
      message.error('保存失败: ' + error.message)
    }
  }

  const loadFromLocal = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        persistentItems.value = JSON.parse(saved)
        message.success('数据已从本地加载')
      } else {
        message.warning('没有找到保存的数据')
      }
    } catch (error) {
      message.error('加载失败: ' + error.message)
    }
  }

  const exportData = () => {
    const dataStr = JSON.stringify(persistentItems.value, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `draggable-data-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    message.success('数据已导出')
  }

  const importData = options => {
    const file = options.file.file
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result)
        if (Array.isArray(data)) {
          persistentItems.value = data
          message.success('数据已导入')
        } else {
          message.error('文件格式不正确')
        }
      } catch (error) {
        message.error('导入失败: ' + error.message)
      }
    }
    reader.readAsText(file)
  }

  // 页面加载时自动从本地加载
  onMounted(() => {
    loadFromLocal()
  })
</script>

<style scoped>
  .persistent-drag {
    padding: 20px;
  }

  .persistent-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    margin-bottom: 8px;
    cursor: grab;
  }

  .persistent-item:active {
    cursor: grabbing;
  }

  .persistent-item small {
    color: #666;
    font-size: 12px;
  }
</style>
```

:::

## ⚠️ 注意事项

### 1. 数据键值配置

::: code-group

```vue [✅ 推荐]
<!-- 确保每个项目有唯一的 id -->
<script setup>
  const items = ref([
    { id: 'unique-1', title: '项目一' }, // 必须有唯一 id
    { id: 'unique-2', title: '项目二' },
    { id: 'unique-3', title: '项目三' },
  ])
</script>
```

```vue [❌ 不推荐]
<!-- 缺少唯一标识 -->
<script setup>
  const items = ref([
    { title: '项目一' }, // 缺少 id，可能导致拖拽异常
    { title: '项目二' },
    { title: '项目三' },
  ])
</script>
```

:::

### 2. 分组配置

::: code-group

```vue [✅ 推荐]
<!-- 明确的分组配置 -->
<C_Draggable
  v-model="items"
  :group="{
    name: 'shared',
    pull: true, // 允许拖出
    put: true, // 允许拖入
  }"
/>
```

```vue [❌ 不推荐]
<!-- 模糊的分组配置 -->
<C_Draggable
  v-model="items"
  group="shared"  // 没有明确拖拽权限
/>
```

:::

### 3. 性能优化

::: code-group

```vue [✅ 推荐]
<!-- 大量数据时使用 shallowRef -->
<script setup>
  const items = shallowRef(largeDataSet) // 大量数据时使用 shallowRef

  // 批量更新
  const updateItems = newItems => {
    items.value = [...newItems] // 创建新数组触发更新
  }
</script>
```

```vue [❌ 不推荐]
<!-- 频繁操作响应式数组 -->
<script setup>
  const items = ref([])

  // 频繁的单个操作
  items.value.push(newItem) // 触发响应式更新
  items.value.splice(0, 1) // 又触发响应式更新
</script>
```

:::

### 4. 事件处理

::: code-group

```javascript [✅ 推荐]
// 完整的事件处理
const handleDragEnd = event => {
  if (event.oldIndex !== event.newIndex) {
    console.log(`项目从 ${event.oldIndex} 移动到 ${event.newIndex}`)
    // 处理位置变化
  }
}
```

```javascript [❌ 不推荐]
// 没有检查是否真的发生移动
const handleDragEnd = event => {
  console.log('拖拽结束') // 即使没有移动也会触发
}
```

:::

## 🐛 故障排除

::: details ❓ Q1: 拖拽不工作？
**A1:** 检查基础配置：

```vue
<!-- 确保数据格式正确 -->
<C_Draggable
  v-model="items"          <!-- 必须是响应式数组 -->
  :disabled="false"        <!-- 确保没有禁用 -->
/>

<script setup>
// 确保数据结构正确
const items = ref([
  { id: 1, title: '项目' }  // 必须有 id 字段
])
</script>
```

:::

::: details ❓ Q2: 跨列表拖拽失败？
**A2:** 检查分组配置：

```vue
<!-- 两个列表必须使用相同的分组名 -->
<C_Draggable v-model="list1" group="shared" />
<C_Draggable v-model="list2" group="shared" />

<!-- 或使用详细配置 -->
<C_Draggable
  v-model="list1"
  :group="{ name: 'shared', pull: true, put: true }"
/>
```

:::

::: details ❓ Q3: 拖拽手柄不生效？
**A3:** 检查手柄配置：

```vue
<!-- 确保手柄元素存在 -->
<C_Draggable handle=".my-handle">
  <template #default="{ item }">
    <div>
      <div class="my-handle">拖拽手柄</div>  <!-- 必须存在 -->
      <span>{{ item.title }}</span>
    </div>
  </template>
</C_Draggable>
```

:::

::: details ❓ Q4: 动画效果不流畅？
**A4:** 优化动画配置：

```vue
<C_Draggable
  v-model="items"
  :animation="200"           <!-- 调整动画时长 -->
  ghost-class="ghost-item"   <!-- 自定义幽灵样式 -->
/>

<style>
.ghost-item {
  opacity: 0.5;
  background: #e3f2fd;
}
</style>
```

:::

::: details ❓ Q5: 网格布局不对齐？
**A5:** 检查布局配置：

```vue
<C_Draggable
  v-model="items"
  layout="grid"
  :grid-columns="4"        <!-- 确保列数合理 -->
  gap="16px"               <!-- 设置合适的间距 -->
/>
```

:::

## 🎯 最佳实践

### 1. 数据结构设计

```typescript
// ✅ 推荐：标准化的数据结构
interface DraggableItem {
  id: string | number // 必需：唯一标识
  title: string // 显示标题
  description?: string // 可选：描述信息
  type?: string // 可选：类型标识
  metadata?: {
    // 可选：元数据
    category: string
    priority: number
    tags: string[]
  }
}

// 创建标准化数据的工厂函数
const createDraggableItem = (data: Partial<DraggableItem>): DraggableItem => {
  return {
    id: data.id || generateUniqueId(),
    title: data.title || '未命名项目',
    description: data.description,
    type: data.type || 'default',
    metadata: data.metadata || {},
  }
}
```

### 2. 组件封装最佳实践

```vue
<!-- 封装业务组件 -->
<template>
  <div class="task-board">
    <C_Draggable
      v-model="tasks"
      group="tasks"
      :animation="200"
      @list-change="handleTaskChange"
      @drag-end="handleTaskMoved"
    >
      <template #default="{ item, index }">
        <TaskCard
          :task="item"
          :index="index"
          @update="updateTask"
          @delete="deleteTask"
        />
      </template>

      <template #empty>
        <EmptyState
          icon="📋"
          title="暂无任务"
          description="拖拽任务到此处或点击添加"
          @add="addTask"
        />
      </template>
    </C_Draggable>
  </div>
</template>

<script setup>
  // 业务逻辑封装
  const { tasks, addTask, updateTask, deleteTask } = useTaskManager()

  const handleTaskChange = newTasks => {
    // 业务逻辑处理
    saveTasks(newTasks)
    analytics.track('tasks_reordered', { count: newTasks.length })
  }

  const handleTaskMoved = event => {
    // 移动完成后的处理
    const task = event.item
    analytics.track('task_moved', {
      taskId: task.id,
      fromIndex: event.oldIndex,
      toIndex: event.newIndex,
    })
  }
</script>
```

### 3. 性能优化策略

```vue
<template>
  <!-- 使用 v-memo 优化大量项目渲染 -->
  <C_Draggable
    v-model="items"
    :animation="150"
  >
    <template #default="{ item, index }">
      <div
        v-memo="[item.id, item.title, item.status]"
        class="item"
      >
        <!-- 只有关键属性变化才重新渲染 -->
        {{ item.title }}
      </div>
    </template>
  </C_Draggable>
</template>

<script setup>
  // 使用防抖优化频繁更新
  const debouncedSave = debounce(items => {
    saveItemsToServer(items)
  }, 1000)

  const handleListChange = items => {
    debouncedSave(items)
  }

  // 虚拟化长列表
  const visibleItems = computed(() => {
    if (items.value.length > 100) {
      // 只渲染可见区域的项目
      return items.value.slice(
        virtualScrollState.startIndex,
        virtualScrollState.endIndex
      )
    }
    return items.value
  })
</script>
```

### 4. 无障碍访问支持

```vue
<template>
  <C_Draggable
    v-model="items"
    role="list"
    aria-label="可拖拽任务列表"
  >
    <template #default="{ item, index }">
      <div
        class="accessible-item"
        role="listitem"
        :aria-label="`任务: ${item.title}, 位置: ${index + 1}`"
        tabindex="0"
        @keydown="handleKeyboardMove"
      >
        <span class="sr-only"> 使用方向键移动，空格键选择，回车键激活 </span>
        {{ item.title }}
      </div>
    </template>
  </C_Draggable>
</template>

<script setup>
  // 键盘导航支持
  const handleKeyboardMove = event => {
    const { key } = event
    const currentIndex = getCurrentItemIndex(event.target)

    switch (key) {
      case 'ArrowUp':
        moveItem(currentIndex, currentIndex - 1)
        break
      case 'ArrowDown':
        moveItem(currentIndex, currentIndex + 1)
        break
      case 'Enter':
        activateItem(currentIndex)
        break
    }
  }
</script>

<style scoped>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .accessible-item:focus {
    outline: 2px solid #1890ff;
    outline-offset: 2px;
  }
</style>
```

### 5. 错误处理和恢复

```vue
<script setup>
  const items = ref([])
  const itemsBackup = ref([])
  const error = ref(null)

  // 操作前备份
  const backupItems = () => {
    itemsBackup.value = JSON.parse(JSON.stringify(items.value))
  }

  // 错误恢复
  const restoreFromBackup = () => {
    items.value = [...itemsBackup.value]
    message.success('已恢复到上一个稳定状态')
  }

  // 带错误处理的拖拽处理
  const handleDragEnd = async event => {
    try {
      backupItems()

      // 执行业务逻辑
      await saveItemOrder(items.value)

      message.success('顺序已保存')
    } catch (err) {
      error.value = err.message
      restoreFromBackup()
      message.error('保存失败，已恢复原始顺序')
    }
  }

  // 数据验证
  const validateItems = newItems => {
    const ids = new Set()
    for (const item of newItems) {
      if (!item.id) {
        throw new Error('项目缺少必需的 id 字段')
      }
      if (ids.has(item.id)) {
        throw new Error(`重复的 id: ${item.id}`)
      }
      ids.add(item.id)
    }
    return true
  }

  // 监听数据变化并验证
  watch(
    items,
    newItems => {
      try {
        validateItems(newItems)
        error.value = null
      } catch (err) {
        error.value = err.message
        console.error('数据验证失败:', err)
      }
    },
    { deep: true }
  )
</script>
```

### 6. 测试友好的设计

```vue
<template>
  <C_Draggable
    v-model="items"
    data-testid="draggable-list"
    @list-change="handleListChange"
  >
    <template #default="{ item, index }">
      <div
        class="draggable-item"
        :data-testid="`item-${item.id}`"
        :data-index="index"
      >
        {{ item.title }}
      </div>
    </template>
  </C_Draggable>
</template>

<script setup>
  // 暴露测试方法
  const { moveItem, addItem, removeItem } = useDraggableController(items)

  // 测试辅助方法
  defineExpose({
    // 测试用的方法
    getItemCount: () => items.value.length,
    getItemById: id => items.value.find(item => item.id === id),
    moveItem,
    addItem,
    removeItem,

    // 状态获取
    isEmpty: () => items.value.length === 0,
    getItemOrder: () => items.value.map(item => item.id),
  })
</script>
```

## 📝 更新日志

### v1.1.0 (2026-02-17)

- ♻️ **架构重构**：采用「薄 UI 壳 + 厚 Composable 引擎」模式
- 📦 **类型外迁**：6 个 interface/type 迁移至 `types/modules/draggable.d.ts`
- 🎯 **Composable 提取**：`useDraggableLayout` 统一管理布局计算、拖拽选项、事件分发、列表 CRUD
- 📉 **瘦身效果**：`index.vue` 从 554 行降至 ~170 行（-69%）

### v1.0.0 (2025-07-19)

- ✨ 基于 vue-draggable-plus 的完整组件封装
- ✨ 支持多种布局模式（垂直、水平、网格、弹性布局）
- ✨ 完整的分组拖拽功能支持
- ✨ 自定义拖拽手柄和样式配置
- ✨ 内置空状态显示和自定义插槽
- ✨ 完整的事件系统和生命周期管理
- ✨ 丰富的配置选项和自定义样式支持
- ✨ 完整的TypeScript类型定义
- ✨ 响应式布局和移动端适配
- ✨ 高性能拖拽引擎和动画效果

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个拖拽组件基于强大的 `vue-draggable-plus` 库构建，提供了完整的拖拽排序功能和丰富的布局选项。支持看板式任务管理、分组拖拽、自定义布局等多种场景应用。无论是简单的列表排序还是复杂的多列表交互，都能提供流畅的拖拽体验。结合 TypeScript 支持和高度可定制的配置，让拖拽功能既强大又易用。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更直观的交互体验！ 🎯
