---
outline: 'deep'
---

# C_VTableGantt 甘特图组件

> 📊 基于 VTable-Gantt 的高性能甘特图组件，支持多种预设模式和丰富的自定义配置

## ✨ 特性

- **🎯 五种预设模式**: 基础、项目、时间线、里程碑、官方演示模式
- **📋 任务管理**: 支持任务拖拽、调整大小、进度编辑
- **🔍 全屏支持**: 内置全屏切换功能
- **⚡ 高性能渲染**: 基于 VTable 虚拟滚动技术
- **🎨 主题定制**: 灵活的样式和主题配置
- **📱 响应式设计**: 自适应容器尺寸变化
- **🔧 工具栏集成**: 可配置的工具栏和操作按钮
- **📦 开箱即用**: 预配置多种常用场景

## 📦 安装

组件已全局注册，直接使用即可：

```vue
<template>
  <C_VTableGantt :data="ganttData" />
</template>
```

## 🎯 快速开始

### 基础用法

```vue
<template>
  <C_VTableGantt 
    :data="basicData"
    preset="basic"
    title="项目甘特图"
    @task-click="handleTaskClick"
  />
</template>

<script setup>
const basicData = [
  {
    id: '1',
    title: '项目启动',
    start: '2025-08-01',
    end: '2025-08-07',
    progress: 100
  },
  {
    id: '2',
    title: '需求分析',
    start: '2025-08-05',
    end: '2025-08-15',
    progress: 80
  },
  {
    id: '3',
    title: '系统设计',
    start: '2025-08-12',
    end: '2025-08-25',
    progress: 45
  }
]

const handleTaskClick = (task, event) => {
  console.log('点击任务:', task)
}
</script>
```

### 项目管理模式

```vue
<template>
  <C_VTableGantt 
    :data="projectData"
    preset="project"
    :height="700"
    @task-change="handleTaskChange"
  />
</template>

<script setup>
const projectData = [
  {
    id: 'phase1',
    title: '第一阶段',
    start: '2025-08-01',
    end: '2025-08-31',
    progress: 60,
    priority: '高',
    children: [
      {
        id: 'task1',
        title: '需求收集',
        start: '2025-08-01',
        end: '2025-08-07',
        progress: 100,
        priority: '高'
      },
      {
        id: 'task2',
        title: '原型设计',
        start: '2025-08-05',
        end: '2025-08-15',
        progress: 75,
        priority: '中'
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
| **data** | `GanttTask[]` | `[]` | 甘特图数据 |
| **preset** | `'basic' \| 'project' \| 'timeline' \| 'milestone' \| 'official'` | `'basic'` | 预设模式 |
| **options** | `GanttOptions` | `{}` | 自定义配置选项 |
| **height** | `string \| number` | `'600px'` | 组件高度 |
| **title** | `string` | `''` | 甘特图标题 |
| **showToolbar** | `boolean` | `true` | 是否显示工具栏 |
| **showFullscreenButton** | `boolean` | `true` | 是否显示全屏按钮 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| **gantt-created** | `gantt: VTableGantt` | 甘特图实例创建完成 |
| **task-click** | `(task: GanttTask, event: Event)` | 任务点击事件 |
| **task-change** | `(task: GanttTask, changes: any)` | 任务数据变更事件 |

### 数据结构

#### GanttTask
```typescript
interface GanttTask {
  id: string | number        // 任务唯一标识
  title: string             // 任务名称
  start: string | Date      // 开始时间
  end?: string | Date       // 结束时间
  progress?: number         // 进度百分比 (0-100)
  priority?: string         // 优先级
  type?: 'milestone' | 'task'  // 任务类型
  children?: GanttTask[]    // 子任务
  [key: string]: any        // 其他自定义字段
}
```

#### GanttOptions
```typescript
interface GanttOptions {
  taskListTable?: {         // 任务列表配置
    columns?: ColumnConfig[]  // 列配置
    tableWidth?: number      // 表格宽度
    theme?: ThemeConfig      // 主题配置
  }
  taskBar?: {              // 任务条配置
    startDateField?: string  // 开始时间字段
    endDateField?: string    // 结束时间字段
    progressField?: string   // 进度字段
    moveable?: boolean       // 是否可移动
    resizable?: boolean      // 是否可调整大小
    barStyle?: BarStyle      // 任务条样式
  }
  timelineHeader?: {       // 时间轴配置
    scales?: ScaleConfig[]   // 时间刻度配置
    backgroundColor?: string // 背景色
  }
  [key: string]: any       // 其他配置项
}
```

### 组件方法

通过 ref 调用：

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| **updateData** | `data: GanttTask[]` | 更新甘特图数据 |
| **updateOptions** | `options: GanttOptions` | 更新配置选项 |
| **toggleFullscreen** | - | 切换全屏模式 |

### 预设模式说明

| 模式 | 特点 | 适用场景 |
| --- | --- | --- |
| **basic** | 简洁清晰，基础功能完整 | 通用项目管理 |
| **project** | 支持编辑，层级展开，序号拖拽 | 复杂项目管理 |
| **timeline** | 时间线风格，紫色主题 | 事件时间线展示 |
| **milestone** | 里程碑展示，橙色主题 | 项目里程碑管理 |
| **official** | 官方演示配置，功能最全 | 功能展示和测试 |

## 🎨 使用示例

### 场景 1: 项目进度管理

```vue
<template>
  <NCard title="项目进度跟踪">
    <C_VTableGantt 
      ref="ganttRef"
      :data="projectData"
      preset="project"
      :height="800"
      title="软件开发项目"
      @task-change="handleProgressUpdate"
      @gantt-created="onGanttReady"
    />
    
    <!-- 项目统计 -->
    <div class="project-stats mt-4">
      <NStatistic 
        label="总任务数" 
        :value="totalTasks" 
      />
      <NStatistic 
        label="完成率" 
        :value="completionRate" 
        suffix="%" 
      />
      <NStatistic 
        label="剩余天数" 
        :value="remainingDays" 
      />
    </div>
  </NCard>
</template>

<script setup>
const ganttRef = ref()

const projectData = ref([
  {
    id: 'planning',
    title: '项目规划阶段',
    start: '2025-08-01',
    end: '2025-08-15',
    progress: 90,
    priority: '高',
    children: [
      {
        id: 'requirement',
        title: '需求分析',
        start: '2025-08-01',
        end: '2025-08-05',
        progress: 100,
        priority: '高'
      },
      {
        id: 'design',
        title: '系统设计',
        start: '2025-08-06',
        end: '2025-08-12',
        progress: 85,
        priority: '高'
      },
      {
        id: 'prototype',
        title: '原型制作',
        start: '2025-08-10',
        end: '2025-08-15',
        progress: 70,
        priority: '中'
      }
    ]
  },
  {
    id: 'development',
    title: '开发阶段',
    start: '2025-08-16',
    end: '2025-09-30',
    progress: 35,
    priority: '高',
    children: [
      {
        id: 'frontend',
        title: '前端开发',
        start: '2025-08-16',
        end: '2025-09-15',
        progress: 45,
        priority: '高'
      },
      {
        id: 'backend',
        title: '后端开发',
        start: '2025-08-20',
        end: '2025-09-20',
        progress: 30,
        priority: '高'
      },
      {
        id: 'integration',
        title: '系统集成',
        start: '2025-09-15',
        end: '2025-09-30',
        progress: 0,
        priority: '中'
      }
    ]
  },
  {
    id: 'testing',
    title: '测试阶段',
    start: '2025-09-25',
    end: '2025-10-15',
    progress: 0,
    priority: '高',
    children: [
      {
        id: 'unit-test',
        title: '单元测试',
        start: '2025-09-25',
        end: '2025-10-05',
        progress: 0,
        priority: '中'
      },
      {
        id: 'integration-test',
        title: '集成测试',
        start: '2025-10-01',
        end: '2025-10-10',
        progress: 0,
        priority: '高'
      },
      {
        id: 'uat',
        title: '用户验收测试',
        start: '2025-10-08',
        end: '2025-10-15',
        progress: 0,
        priority: '高'
      }
    ]
  }
])

// 计算项目统计
const totalTasks = computed(() => {
  const countTasks = (tasks) => {
    return tasks.reduce((count, task) => {
      return count + 1 + (task.children ? countTasks(task.children) : 0)
    }, 0)
  }
  return countTasks(projectData.value)
})

const completionRate = computed(() => {
  const calculateProgress = (tasks) => {
    let totalProgress = 0
    let taskCount = 0
    
    tasks.forEach(task => {
      if (task.children && task.children.length > 0) {
        const childResult = calculateProgress(task.children)
        totalProgress += childResult.total
        taskCount += childResult.count
      } else {
        totalProgress += task.progress || 0
        taskCount += 1
      }
    })
    
    return { total: totalProgress, count: taskCount }
  }
  
  const result = calculateProgress(projectData.value)
  return result.count > 0 ? Math.round(result.total / result.count) : 0
})

const remainingDays = computed(() => {
  const endDate = new Date('2025-10-15')
  const today = new Date()
  const diffTime = endDate - today
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

// 处理任务进度更新
const handleProgressUpdate = (task, changes) => {
  console.log('任务更新:', task.title, changes)
  
  // 可以在这里添加数据同步逻辑
  updateTaskInDatabase(task.id, changes)
  
  // 发送通知
  if (changes.progress === 100) {
    message.success(`任务"${task.title}"已完成！`)
  }
}

// 甘特图实例准备就绪
const onGanttReady = (ganttInstance) => {
  console.log('甘特图已准备就绪:', ganttInstance)
  
  // 可以调用甘特图的方法
  // ganttInstance.scrollToDate('2025-08-15')
}

// 导出项目报告
const exportReport = () => {
  const reportData = {
    projectName: '软件开发项目',
    totalTasks: totalTasks.value,
    completionRate: completionRate.value,
    remainingDays: remainingDays.value,
    tasks: projectData.value
  }
  
  // 导出逻辑
  downloadProjectReport(reportData)
}
</script>
```

### 场景 2: 产品发布时间线

```vue
<template>
  <C_VTableGantt 
    :data="timelineData"
    preset="timeline"
    title="产品发布时间线"
    :height="500"
    :options="timelineOptions"
  />
</template>

<script setup>
const timelineData = ref([
  {
    id: 'concept',
    title: '产品概念阶段',
    start: '2025-01-01',
    end: '2025-02-28',
    progress: 100
  },
  {
    id: 'research',
    title: '市场调研',
    start: '2025-02-15',
    end: '2025-03-31',
    progress: 100
  },
  {
    id: 'development',
    title: '产品开发',
    start: '2025-03-15',
    end: '2025-07-31',
    progress: 75
  },
  {
    id: 'testing',
    title: '产品测试',
    start: '2025-07-01',
    end: '2025-08-31',
    progress: 30
  },
  {
    id: 'launch',
    title: '产品发布',
    start: '2025-09-01',
    end: '2025-09-30',
    progress: 0
  }
])

const timelineOptions = {
  timelineHeader: {
    scales: [
      {
        unit: 'quarter',
        step: 1,
        format: (date) => `Q${date.quarter}`,
        style: { fontSize: 14, fontWeight: 'bold' }
      },
      {
        unit: 'month',
        step: 1,
        format: (date) => `${date.month}月`,
        style: { fontSize: 12 }
      }
    ]
  }
}
</script>
```

### 场景 3: 里程碑管理

```vue
<template>
  <div class="milestone-management">
    <C_VTableGantt 
      :data="milestoneData"
      preset="milestone"
      title="项目里程碑"
      :height="400"
      @task-click="handleMilestoneClick"
    />
    
    <!-- 里程碑详情 -->
    <NModal 
      v-model:show="showMilestoneDetail"
      title="里程碑详情"
    >
      <div v-if="selectedMilestone">
        <NDescriptions :column="2">
          <NDescriptionsItem label="里程碑名称">
            {{ selectedMilestone.title }}
          </NDescriptionsItem>
          <NDescriptionsItem label="目标日期">
            {{ selectedMilestone.start }}
          </NDescriptionsItem>
          <NDescriptionsItem label="重要性">
            <NTag :type="getPriorityType(selectedMilestone.priority)">
              {{ selectedMilestone.priority }}
            </NTag>
          </NDescriptionsItem>
          <NDescriptionsItem label="状态">
            <NTag :type="getStatusType(selectedMilestone.status)">
              {{ selectedMilestone.status }}
            </NTag>
          </NDescriptionsItem>
        </NDescriptions>
        
        <div class="mt-4">
          <h4>描述</h4>
          <p>{{ selectedMilestone.description }}</p>
        </div>
      </div>
    </NModal>
  </div>
</template>

<script setup>
const showMilestoneDetail = ref(false)
const selectedMilestone = ref(null)

const milestoneData = ref([
  {
    id: 'kickoff',
    title: '项目启动',
    start: '2025-08-01',
    priority: '高',
    status: '已完成',
    description: '项目正式启动，团队组建完成'
  },
  {
    id: 'alpha',
    title: 'Alpha 版本',
    start: '2025-09-15',
    priority: '高',
    status: '进行中',
    description: '内部测试版本发布'
  },
  {
    id: 'beta',
    title: 'Beta 版本',
    start: '2025-10-15',
    priority: '高',
    status: '计划中',
    description: '公开测试版本发布'
  },
  {
    id: 'release',
    title: '正式发布',
    start: '2025-11-30',
    priority: '极高',
    status: '计划中',
    description: '产品正式上线发布'
  }
])

const handleMilestoneClick = (milestone) => {
  selectedMilestone.value = milestone
  showMilestoneDetail.value = true
}

const getPriorityType = (priority) => {
  const typeMap = {
    '低': 'default',
    '中': 'info',
    '高': 'warning',
    '极高': 'error'
  }
  return typeMap[priority] || 'default'
}

const getStatusType = (status) => {
  const typeMap = {
    '已完成': 'success',
    '进行中': 'info',
    '计划中': 'default',
    '延期': 'error'
  }
  return typeMap[status] || 'default'
}
</script>
```

### 场景 4: 资源排期管理

```vue
<template>
  <div class="resource-scheduling">
    <div class="scheduling-header">
      <NSpace>
        <NSelect 
          v-model:value="selectedTeam"
          :options="teamOptions"
          placeholder="选择团队"
          style="width: 200px"
        />
        <NDatePicker 
          v-model:value="dateRange"
          type="daterange"
          :shortcuts="dateShortcuts"
        />
        <NButton type="primary" @click="loadScheduleData">
          查询排期
        </NButton>
      </NSpace>
    </div>
    
    <C_VTableGantt 
      :data="scheduleData"
      preset="project"
      title="团队资源排期"
      :height="600"
      :options="scheduleOptions"
      @task-change="handleScheduleChange"
    />
  </div>
</template>

<script setup>
const selectedTeam = ref('frontend')
const dateRange = ref([new Date('2025-08-01'), new Date('2025-12-31')])

const teamOptions = [
  { label: '前端团队', value: 'frontend' },
  { label: '后端团队', value: 'backend' },
  { label: '测试团队', value: 'testing' },
  { label: '产品团队', value: 'product' }
]

const dateShortcuts = {
  '本月': () => [startOfMonth(new Date()), endOfMonth(new Date())],
  '下个月': () => [startOfMonth(addMonths(new Date(), 1)), endOfMonth(addMonths(new Date(), 1))],
  '本季度': () => [startOfQuarter(new Date()), endOfQuarter(new Date())]
}

const scheduleData = ref([
  {
    id: 'member1',
    title: '张三 (前端工程师)',
    start: '2025-08-01',
    end: '2025-08-31',
    progress: 0,
    workload: '100%',
    children: [
      {
        id: 'task1',
        title: '首页重构',
        start: '2025-08-01',
        end: '2025-08-15',
        progress: 60,
        workload: '80%'
      },
      {
        id: 'task2',
        title: '用户中心开发',
        start: '2025-08-10',
        end: '2025-08-25',
        progress: 20,
        workload: '60%'
      }
    ]
  },
  {
    id: 'member2',
    title: '李四 (前端工程师)',
    start: '2025-08-01',
    end: '2025-08-31',
    progress: 0,
    workload: '90%',
    children: [
      {
        id: 'task3',
        title: '组件库开发',
        start: '2025-08-01',
        end: '2025-08-20',
        progress: 75,
        workload: '100%'
      }
    ]
  }
])

const scheduleOptions = {
  taskListTable: {
    columns: [
      { field: 'title', title: '成员/任务', width: 200, tree: true },
      { field: 'start', title: '开始日期', width: 120 },
      { field: 'end', title: '结束日期', width: 120 },
      { field: 'workload', title: '工作负荷', width: 80 },
      { field: 'progress', title: '进度', width: 80 }
    ]
  },
  taskBar: {
    barStyle: {
      barColor: (record) => {
        const workload = parseInt(record.workload || '0')
        if (workload > 100) return '#ff4d4f' // 超负荷 - 红色
        if (workload > 80) return '#faad14'  // 高负荷 - 橙色
        return '#52c41a'                     // 正常 - 绿色
      }
    }
  }
}

const loadScheduleData = async () => {
  try {
    const response = await api.getTeamSchedule({
      team: selectedTeam.value,
      startDate: dateRange.value[0],
      endDate: dateRange.value[1]
    })
    scheduleData.value = response.data
  } catch (error) {
    message.error('加载排期数据失败')
  }
}

const handleScheduleChange = (task, changes) => {
  // 检查资源冲突
  checkResourceConflict(task, changes)
  
  // 更新排期数据
  updateSchedule(task.id, changes)
}

const checkResourceConflict = (task, changes) => {
  // 资源冲突检查逻辑
  const hasConflict = detectScheduleConflict(task, changes)
  
  if (hasConflict) {
    message.warning('检测到资源冲突，请调整排期')
  }
}
</script>
```

### 场景 5: 自定义配置示例

```vue
<template>
  <C_VTableGantt 
    :data="customData"
    preset="basic"
    :options="customOptions"
    :height="700"
    title="自定义甘特图"
  />
</template>

<script setup>
const customData = ref([
  {
    id: 'project1',
    title: '项目 Alpha',
    start: '2025-08-01',
    end: '2025-08-30',
    progress: 65,
    department: '研发部',
    budget: 500000,
    risk: 'low'
  }
])

const customOptions = {
  // 自定义任务列表列
  taskListTable: {
    columns: [
      { field: 'title', title: '项目名称', width: 180, tree: true },
      { field: 'department', title: '负责部门', width: 120 },
      { field: 'budget', title: '预算(万元)', width: 100 },
      { field: 'risk', title: '风险等级', width: 100 },
      { field: 'start', title: '开始时间', width: 120 },
      { field: 'end', title: '结束时间', width: 120 },
      { field: 'progress', title: '进度%', width: 80 }
    ],
    tableWidth: 600,
    theme: {
      headerStyle: {
        borderColor: '#1890ff',
        borderLineWidth: 2,
        fontSize: 14,
        fontWeight: 'bold',
        bgColor: '#e6f7ff'
      },
      bodyStyle: {
        borderColor: '#d9d9d9',
        borderLineWidth: 1,
        fontSize: 13,
        bgColor: '#fff'
      }
    }
  },
  
  // 自定义任务条样式
  taskBar: {
    startDateField: 'start',
    endDateField: 'end',
    progressField: 'progress',
    moveable: true,
    resizable: true,
    labelText: '{title} - {progress}%',
    labelTextStyle: {
      fontSize: 12,
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold'
    },
    barStyle: {
      width: 24,
      cornerRadius: 12,
      borderLineWidth: 2,
      borderColor: '#fff',
      // 根据风险等级设置颜色
      barColor: (record) => {
        const riskColors = {
          low: '#52c41a',
          medium: '#faad14', 
          high: '#ff4d4f'
        }
        return riskColors[record.risk] || '#1890ff'
      }
    },
    hoverBarStyle: {
      barOverlayColor: 'rgba(24, 144, 255, 0.3)',
      borderLineWidth: 3,
      borderColor: '#1890ff'
    }
  },
  
  // 自定义时间轴
  timelineHeader: {
    backgroundColor: '#f8f9fa',
    colWidth: 80,
    horizontalLine: { lineWidth: 1, lineColor: '#e8e8e8' },
    verticalLine: { lineWidth: 1, lineColor: '#e8e8e8' },
    scales: [
      {
        unit: 'month',
        step: 1,
        format: (date) => `${date.year}年${date.month}月`,
        style: {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#1890ff',
          textAlign: 'center'
        }
      },
      {
        unit: 'week',
        step: 1,
        format: (date) => `第${date.week}周`,
        style: {
          fontSize: 12,
          color: '#666',
          textAlign: 'center'
        }
      }
    ]
  },
  
  // 自定义网格样式
  grid: {
    weekendBackgroundColor: '#fafafa',
    verticalLine: { lineWidth: 1, lineColor: '#f0f0f0' },
    horizontalLine: { lineWidth: 1, lineColor: '#f0f0f0' }
  },
  
  // 添加标记线
  markLine: [
    {
      date: '2025-08-15',
      style: { 
        lineWidth: 2, 
        lineColor: '#ff4d4f', 
        lineDash: [8, 4] 
      },
      label: '里程碑检查点'
    },
    {
      date: '2025-08-25',
      style: { 
        lineWidth: 2, 
        lineColor: '#52c41a', 
        lineDash: [4, 4] 
      },
      label: '交付节点'
    }
  ],
  
  // 自定义滚动条
  scrollStyle: {
    scrollRailColor: 'rgba(24, 144, 255, 0.1)',
    visible: 'always',
    width: 8,
    scrollSliderCornerRadius: 4,
    scrollSliderColor: '#1890ff'
  }
}
</script>
```

## 🎨 样式定制

### 自定义甘特图样式

```scss
// 甘特图容器样式
.c-vtable-gantt-wrapper {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  
  // 工具栏样式
  .gantt-toolbar {
    padding: 12px 16px;
    background: #fafafa;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .toolbar-left {
      .gantt-title {
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }
    }
    
    .toolbar-right {
      display: flex;
      gap: 8px;
    }
  }
  
  // 甘特图内容区域
  .gantt-container {
    position: relative;
    
    // 全屏状态下的样式调整
    &:fullscreen {
      background: #fff;
      z-index: 9999;
    }
  }
}

// 暗色主题适配
.dark {
  .c-vtable-gantt-wrapper {
    border-color: #333;
    background: #1a1a1a;
    
    .gantt-toolbar {
      background: #2a2a2a;
      border-bottom-color: #333;
      
      .gantt-title {
        color: #e8e8e8;
      }
    }
    
    .gantt-container {
      background: #1a1a1a;
      
      &:fullscreen {
        background: #1a1a1a;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .c-vtable-gantt-wrapper {
    .gantt-toolbar {
      flex-direction: column;
      gap: 12px;
      
      .toolbar-left,
      .toolbar-right {
        width: 100%;
        justify-content: center;
      }
    }
  }
}
```

### 自定义任务条样式

```scss
// 自定义任务条主题类
.gantt-theme-custom {
  // 高优先级任务
  .task-high-priority {
    .vtable-gantt-task-bar {
      background: linear-gradient(135deg, #ff6b6b, #ee5a24);
      box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
      
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
      }
    }
  }
  
  // 中等优先级任务
  .task-medium-priority {
    .vtable-gantt-task-bar {
      background: linear-gradient(135deg, #feca57, #ff9ff3);
      box-shadow: 0 2px 8px rgba(254, 202, 87, 0.3);
    }
  }
  
  // 低优先级任务
  .task-low-priority {
    .vtable-gantt-task-bar {
      background: linear-gradient(135deg, #48dbfb, #0abde3);
      box-shadow: 0 2px 8px rgba(72, 219, 251, 0.3);
    }
  }
  
  // 已完成任务
  .task-completed {
    .vtable-gantt-task-bar {
      background: linear-gradient(135deg, #2ed573, #1e90ff);
      box-shadow: 0 2px 8px rgba(46, 213, 115, 0.3);
    }
  }
  
  // 延期任务
  .task-overdue {
    .vtable-gantt-task-bar {
      background: linear-gradient(135deg, #ff4757, #c44569);
      box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
      animation: pulse 2s infinite;
    }
  }
}

// 脉冲动画
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
```

## ⚙️ 高级用法

### 数据格式转换

```vue
<script setup>
// 从后端 API 获取数据并转换格式
const fetchGanttData = async () => {
  try {
    const response = await api.getProjectTasks()
    const rawData = response.data
    
    // 转换数据格式
    const ganttData = transformToGanttFormat(rawData)
    return ganttData
  } catch (error) {
    console.error('获取甘特图数据失败:', error)
    return []
  }
}

// 数据格式转换函数
const transformToGanttFormat = (rawData) => {
  return rawData.map(item => ({
    id: item.taskId,
    title: item.taskName,
    start: formatDate(item.startDate),
    end: formatDate(item.endDate),
    progress: item.completionRate,
    priority: item.priorityLevel,
    type: item.taskType === 'milestone' ? 'milestone' : 'task',
    children: item.subTasks ? transformToGanttFormat(item.subTasks) : undefined
  }))
}

// 日期格式化
const formatDate = (dateString) => {
  return new Date(dateString).toISOString().split('T')[0]
}
</script>
```

### 实时数据更新

```vue
<script setup>
import { useWebSocket } from '@vueuse/core'

const ganttRef = ref()
const ganttData = ref([])

// WebSocket 连接
const { data: wsData } = useWebSocket('ws://localhost:8080/gantt-updates')

// 监听实时数据更新
watch(wsData, (newData) => {
  if (newData) {
    const update = JSON.parse(newData)
    
    switch (update.type) {
      case 'task_progress_update':
        updateTaskProgress(update.taskId, update.progress)
        break
      case 'task_date_change':
        updateTaskDate(update.taskId, update.startDate, update.endDate)
        break
      case 'new_task_added':
        addNewTask(update.task)
        break
      case 'task_deleted':
        removeTask(update.taskId)
        break
    }
  }
})

// 更新任务进度
const updateTaskProgress = (taskId, progress) => {
  const updateTaskInTree = (tasks) => {
    for (const task of tasks) {
      if (task.id === taskId) {
        task.progress = progress
        return true
      }
      if (task.children && updateTaskInTree(task.children)) {
        return true
      }
    }
    return false
  }
  
  updateTaskInTree(ganttData.value)
  ganttRef.value?.updateData(ganttData.value)
}

// 批量更新数据
const batchUpdateTasks = (updates) => {
  updates.forEach(update => {
    updateTaskProgress(update.taskId, update.progress)
  })
}
</script>
```

### 数据导出功能

```vue
<script setup>
// 导出甘特图数据为 Excel
const exportToExcel = async () => {
  try {
    const { utils, writeFile } = await import('xlsx')
    
    // 扁平化甘特图数据
    const flatData = flattenGanttData(ganttData.value)
    
    // 创建工作表
    const ws = utils.json_to_sheet(flatData.map(task => ({
      '任务ID': task.id,
      '任务名称': task.title,
      '开始时间': task.start,
      '结束时间': task.end,
      '进度': `${task.progress}%`,
      '优先级': task.priority,
      '类型': task.type,
      '层级': task.level
    })))
    
    // 创建工作簿
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, '甘特图数据')
    
    // 下载文件
    writeFile(wb, `甘特图数据_${new Date().toISOString().split('T')[0]}.xlsx`)
    
    message.success('导出成功')
  } catch (error) {
    message.error('导出失败')
  }
}

// 扁平化甘特图数据
const flattenGanttData = (data, level = 0, result = []) => {
  data.forEach(item => {
    result.push({ ...item, level })
    if (item.children && item.children.length > 0) {
      flattenGanttData(item.children, level + 1, result)
    }
  })
  return result
}

// 导出为 PDF
const exportToPDF = async () => {
  try {
    // 获取甘特图的 SVG 数据或截图
    const ganttElement = ganttRef.value?.$el
    
    const { jsPDF } = await import('jspdf')
    const html2canvas = (await import('html2canvas')).default
    
    // 生成截图
    const canvas = await html2canvas(ganttElement)
    const imgData = canvas.toDataURL('image/png')
    
    // 创建 PDF
    const pdf = new jsPDF('landscape', 'mm', 'a4')
    const imgWidth = 297 // A4 横向宽度
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    pdf.save(`甘特图_${new Date().toISOString().split('T')[0]}.pdf`)
    
    message.success('PDF导出成功')
  } catch (error) {
    message.error('PDF导出失败')
  }
}
</script>
```

### 任务依赖关系

```vue
<script setup>
// 添加任务依赖关系
const addTaskDependency = (sourceTaskId, targetTaskId, type = 'finish-start') => {
  const dependency = {
    id: `${sourceTaskId}-${targetTaskId}`,
    source: sourceTaskId,
    target: targetTaskId,
    type: type, // 'finish-start', 'start-start', 'finish-finish', 'start-finish'
    lag: 0 // 延迟天数
  }
  
  // 更新甘特图配置
  const currentOptions = ganttRef.value?.ganttInstance?.getOption()
  if (currentOptions) {
    currentOptions.dependencies = currentOptions.dependencies || []
    currentOptions.dependencies.push(dependency)
    ganttRef.value?.updateOptions(currentOptions)
  }
}

// 验证任务依赖关系
const validateDependencies = (tasks, dependencies) => {
  const errors = []
  
  dependencies.forEach(dep => {
    const sourceTask = findTaskById(tasks, dep.source)
    const targetTask = findTaskById(tasks, dep.target)
    
    if (!sourceTask || !targetTask) {
      errors.push(`依赖关系错误: 任务 ${dep.source} 或 ${dep.target} 不存在`)
      return
    }
    
    // 检查循环依赖
    if (hasCircularDependency(dep.source, dep.target, dependencies)) {
      errors.push(`检测到循环依赖: ${dep.source} → ${dep.target}`)
    }
    
    // 检查日期冲突
    if (hasDateConflict(sourceTask, targetTask, dep.type)) {
      errors.push(`日期冲突: ${sourceTask.title} 和 ${targetTask.title}`)
    }
  })
  
  return errors
}

// 自动调整任务日期基于依赖关系
const autoAdjustTaskDates = (tasks, dependencies) => {
  const adjustedTasks = JSON.parse(JSON.stringify(tasks))
  
  dependencies.forEach(dep => {
    const sourceTask = findTaskById(adjustedTasks, dep.source)
    const targetTask = findTaskById(adjustedTasks, dep.target)
    
    if (sourceTask && targetTask) {
      switch (dep.type) {
        case 'finish-start':
          if (new Date(targetTask.start) <= new Date(sourceTask.end)) {
            const newStart = addDays(new Date(sourceTask.end), dep.lag + 1)
            targetTask.start = formatDate(newStart)
            
            const duration = daysBetween(targetTask.end, targetTask.start)
            targetTask.end = formatDate(addDays(newStart, duration))
          }
          break
        // 其他依赖类型的处理逻辑...
      }
    }
  })
  
  return adjustedTasks
}
</script>
```

### 甘特图打印功能

```vue
<script setup>
// 打印甘特图
const printGantt = () => {
  const printWindow = window.open('', '_blank')
  const ganttElement = ganttRef.value?.$el
  
  if (ganttElement && printWindow) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>甘特图打印</title>
          <style>
            @media print {
              body { margin: 0; }
              .gantt-container { 
                width: 100% !important;
                height: auto !important;
              }
              .gantt-toolbar { display: none; }
            }
          </style>
        </head>
        <body>
          ${ganttElement.outerHTML}
        </body>
      </html>
    `
    
    printWindow.document.write(html)
    printWindow.document.close()
    
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 500)
  }
}

// 打印预览
const printPreview = () => {
  // 创建打印样式
  const printStyles = `
    <style>
      @page {
        size: A4 landscape;
        margin: 1cm;
      }
      .gantt-container {
        transform: scale(0.8);
        transform-origin: top left;
      }
    </style>
  `
  
  document.head.insertAdjacentHTML('beforeend', printStyles)
  
  // 触发打印预览
  window.print()
  
  // 清理样式
  setTimeout(() => {
    const styleElement = document.head.lastElementChild
    if (styleElement && styleElement.tagName === 'STYLE') {
      styleElement.remove()
    }
  }, 1000)
}
</script>
```

## 🐛 常见问题

### Q1: 甘特图不显示或初始化失败？

**A1:** 检查数据格式和容器元素：

```javascript
// ✅ 正确的数据格式
const ganttData = [
  {
    id: 'task1',           // 必需：唯一标识
    title: '任务名称',      // 必需：任务标题
    start: '2025-08-01',   // 必需：开始时间 (YYYY-MM-DD 格式)
    end: '2025-08-15',     // 必需：结束时间
    progress: 50           // 可选：进度 (0-100)
  }
]

// 确保容器有明确的高度
const containerHeight = '600px' // 或使用数字 600
```

### Q2: 任务拖拽不生效？

**A2:** 检查配置和事件绑定：

```javascript
const options = {
  taskBar: {
    moveable: true,    // 必须设置为 true
    resizable: true    // 允许调整大小
  }
}

// 确保绑定了变更事件
<C_VTableGantt 
  @task-change="handleTaskChange"  // 监听变更
/>
```

### Q3: 全屏功能异常？

**A3:** 检查浏览器兼容性和权限：

```javascript
// 检查全屏 API 支持
if (!document.fullscreenEnabled) {
  console.warn('浏览器不支持全屏功能')
}

// 处理全屏错误
const toggleFullscreen = async () => {
  try {
    if (!document.fullscreenElement) {
      await ganttContainerRef.value.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  } catch (error) {
    message.warning('全屏切换失败，请检查浏览器权限')
  }
}
```

### Q4: 时间轴显示异常？

**A4:** 检查时间格式和区域设置：

```javascript
// 确保日期格式正确
const formatDate = (date) => {
  if (typeof date === 'string') {
    return date // 已经是 YYYY-MM-DD 格式
  }
  return date.toISOString().split('T')[0]
}

// 时间轴配置
const timelineOptions = {
  timelineHeader: {
    scales: [
      {
        unit: 'month',
        step: 1,
        format: (date) => `${date.year}-${String(date.month).padStart(2, '0')}`
      }
    ]
  }
}
```

## 🎯 最佳实践

### 1. 数据管理

```javascript
// 使用响应式数据管理
const ganttData = ref([])

// 数据验证函数
const validateGanttData = (data) => {
  return data.every(task => {
    return task.id && 
           task.title && 
           task.start && 
           new Date(task.start) <= new Date(task.end || task.start)
  })
}

// 数据更新最佳实践
const updateGanttData = (newData) => {
  if (validateGanttData(newData)) {
    ganttData.value = newData
  } else {
    console.error('甘特图数据格式错误')
  }
}
```

### 2. 性能优化

```javascript
// 大数据量处理
const optimizeForLargeData = {
  // 启用虚拟滚动
  virtual: true,
  
  // 限制初始展开层级
  hierarchyExpandLevel: 2,
  
  // 延迟加载子任务
  lazyLoad: true,
  
  // 分页加载
  pagination: {
    pageSize: 100
  }
}

// 防抖更新
import { debounce } from 'lodash-es'

const debouncedUpdate = debounce((data) => {
  ganttRef.value?.updateData(data)
}, 300)
```

### 3. 错误处理

```javascript
// 全局错误处理
const handleGanttError = (error, context) => {
  console.error(`甘特图错误 [${context}]:`, error)
  
  // 根据错误类型处理
  switch (error.type) {
    case 'DATA_FORMAT_ERROR':
      message.error('数据格式错误，请检查数据结构')
      break
    case 'RENDER_ERROR':
      message.error('渲染失败，正在重试...')
      setTimeout(() => initGantt(), 1000)
      break
    default:
      message.error('未知错误，请联系技术支持')
  }
}

// 组件错误边界
onErrorCaptured((error, instance, info) => {
  handleGanttError(error, info)
  return false
})
```

### 4. 无障碍支持

```vue
<template>
  <div
    role="application"
    :aria-label="title || '甘特图'"
    aria-describedby="gantt-description"
  >
    <div id="gantt-description" class="sr-only">
      甘特图显示项目任务的时间安排和进度
    </div>
    
    <C_VTableGantt 
      :data="ganttData"
      @keydown="handleKeyboardNavigation"
    />
  </div>
</template>

<script setup>
// 键盘导航支持
const handleKeyboardNavigation = (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      // 向左滚动
      ganttRef.value?.ganttInstance?.scrollLeft(-50)
      break
    case 'ArrowRight':
      // 向右滚动
      ganttRef.value?.ganttInstance?.scrollLeft(50)
      break
  }
}
</script>
```

## 📝 更新日志

### v1.0.0 (2025-07-31)

- ✨ 初始版本发布
- ✨ 支持五种预设模式（基础、项目、时间线、里程碑、官方）
- ✨ 完整的任务管理功能（拖拽、调整、进度编辑）
- ✨ 全屏显示支持
- ✨ 丰富的配置选项和主题定制
- ✨ 响应式设计和工具栏集成

### v1.1.0 (计划中)

- 🔄 任务依赖关系可视化
- 🔄 批量操作功能
- 🔄 更多导出格式支持
- 🔄 实时协作功能

## 🤝 贡献指南

组件位置：`src/components/global/C_VTableGantt/index.vue`

如需扩展功能，请考虑：
1. 保持预设配置的一致性和实用性
2. 确保性能优化和错误处理
3. 维护良好的数据格式兼容性
4. 更新相关类型定义和文档
5. 添加单元测试覆盖新功能

## 📄 许可证

Copyright (c) 2025 by ChenYu, All Rights Reserved 😎

---

**💡 提示**: 甘特图组件基于 VTable-Gantt 构建，提供了高性能的任务调度和项目管理功能。组件内置了多种实用的预设模式，可以快速适配不同的业务场景。建议根据项目规模和复杂度选择合适的预设模式，并通过自定义配置满足特殊需求。对于大数据量场景，可以启用虚拟滚动和分页加载来优化性能。