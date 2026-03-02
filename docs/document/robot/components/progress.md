---
outline: 'deep'
---

# C_Progress 进度条组件

> 📊 基于 Naive UI 的多样化进度条组件，让进度展示更生动、更直观

## 🚀 在线演示

<DemoIframe src="/preview/progress" title="进度条" height="700" />


## 🚀 特性

- **📏 多种类型支持**: 线性、圆形、多圆环、仪表盘四种进度条类型
- **🎬 流畅动画**: 内置动画效果，支持自定义动画时长
- **🎨 灵活样式**: 支持渐变色、多色彩、自定义轨道样式
- **🔄 多圆环模式**: 独有的多圆环进度展示，适合复杂数据
- **💪 TypeScript**: 完整的类型定义和类型安全
- **🎯 状态支持**: 内置成功、错误、警告等状态样式
- **🔧 高度定制**: 支持自定义指示器、颜色、大小等
- **⚡ 性能优化**: 智能动画控制，流畅用户体验

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

### 基础使用

```vue {3,6,9}
<template>
  <!-- 最简单的使用方式 -->
  <C_Progress :percentage="75" />

  <!-- 带动画效果 -->
  <C_Progress :percentage="60" :is-animation="true" :time="2000" />

  <!-- 圆形进度条 -->
  <C_Progress type="circle" :percentage="80" :stroke-width="10" />
</template>
```

### 四种进度条类型

```vue {3,6,9-13,16}
<template>
  <!-- 1. 线性进度条 (默认) -->
  <C_Progress type="line" :percentage="75" :height="10" />

  <!-- 2. 圆形进度条 -->
  <C_Progress type="circle" :percentage="60" :stroke-width="8" />

  <!-- 3. 多圆环进度条 -->
  <C_Progress
    type="multiple-circle"
    :percentage="[75, 60, 45]"
    :color="['#ff6b6b', '#4ecdc4', '#45b7d1']"
  />

  <!-- 4. 仪表盘进度条 -->
  <C_Progress type="dashboard" :percentage="85" :gap-degree="120" />
</template>
```

## 📖 API 文档

### Props

| 参数                   | 类型                                                       | 默认值      | 说明                       |
| ---------------------- | ---------------------------------------------------------- | ----------- | -------------------------- |
| **percentage**         | `number \| number[]`                                       | `0`         | 进度值，数组用于多圆环类型 |
| **isAnimation**        | `boolean`                                                  | `false`     | 是否启用动画效果           |
| **time**               | `number`                                                   | `3000`      | 动画持续时间(毫秒)         |
| **type**               | `'line' \| 'circle' \| 'multiple-circle' \| 'dashboard'`   | `'line'`    | 进度条类型                 |
| **borderRadius**       | `number \| string`                                         | -           | 进度条圆角半径             |
| **circleGap**          | `number`                                                   | -           | 圆环间隙(多圆环类型)       |
| **color**              | `string \| string[] \| object \| object[]`                 | -           | 进度条颜色                 |
| **fillBorderRadius**   | `number \| string`                                         | -           | 填充部分圆角半径           |
| **gapDegree**          | `number`                                                   | -           | 缺口角度(仪表盘类型)       |
| **gapOffsetDegree**    | `number`                                                   | -           | 缺口偏移角度(仪表盘类型)   |
| **height**             | `number`                                                   | -           | 进度条高度(线形类型)       |
| **indicatorPlacement** | `'inside' \| 'outside'`                                    | `'outside'` | 指示器位置                 |
| **indicatorTextColor** | `string`                                                   | -           | 指示器文本颜色             |
| **offsetDegree**       | `number`                                                   | -           | 偏移角度                   |
| **railColor**          | `string \| string[]`                                       | -           | 轨道背景颜色               |
| **railStyle**          | `string \| CSSProperties \| Array`                         | -           | 轨道样式                   |
| **showIndicator**      | `boolean`                                                  | `true`      | 是否显示进度指示器         |
| **status**             | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | 进度条状态                 |
| **strokeWidth**        | `number`                                                   | `7`         | 进度条宽度/圆环厚度        |
| **unit**               | `string`                                                   | `'%'`       | 进度单位                   |

### Slots

| 插槽名        | 参数 | 说明         |
| ------------- | ---- | ------------ |
| **indicator** | -    | 自定义指示器 |

### 类型定义

#### CSS 类型

```typescript
type CSS = CSSProperties | string
```

#### Props 接口

```typescript
interface Props {
  percentage: number | number[]
  isAnimation?: boolean
  time?: number
  type?: 'line' | 'circle' | 'multiple-circle' | 'dashboard'
  // ... 其他属性
}
```

## 🎨 使用示例

::: details 📁 文件上传进度 - 实时进度展示
```vue {4-10,19-27,30}
<template>
  <div class="upload-progress">
    <h3>文件上传</h3>
    <C_Progress
      :percentage="uploadProgress"
      :is-animation="true"
      :time="1000"
      status="info"
      :height="8"
    />
    <p>{{ uploadProgress }}% 已完成</p>
  </div>
</template>

<script setup>
const uploadProgress = ref(0)

// 模拟文件上传
const simulateUpload = () => {
  const timer = setInterval(() => {
    uploadProgress.value += Math.random() * 10
    if (uploadProgress.value >= 100) {
      uploadProgress.value = 100
      clearInterval(timer)
    }
  }, 200)
}

onMounted(() => {
  simulateUpload()
})
</script>
```
:::

::: details 🎯 技能评估圆环 - 多技能水平展示
```vue {6-13}
<template>
  <div class="skills-assessment">
    <h3>技能评估</h3>
    <div class="skills-grid">
      <div v-for="skill in skills" :key="skill.name" class="skill-item">
        <C_Progress
          type="circle"
          :percentage="skill.level"
          :color="skill.color"
          :stroke-width="6"
          :is-animation="true"
          :time="2000"
        />
        <p>{{ skill.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const skills = ref([
  { name: 'Vue.js', level: 90, color: '#4fc08d' },
  { name: 'React', level: 75, color: '#61dafb' },
  { name: 'TypeScript', level: 85, color: '#3178c6' },
  { name: 'Node.js', level: 70, color: '#68a063' },
])
</script>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 24px;
  margin-top: 16px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
</style>
```
:::

::: details 🔄 多维度数据展示 - 项目进度总览
```vue {4-11}
<template>
  <div class="multi-dimension">
    <h3>项目进度总览</h3>
    <C_Progress
      type="multiple-circle"
      :percentage="projectProgress"
      :color="progressColors"
      :stroke-width="8"
      :circle-gap="4"
      :is-animation="true"
    >
      <template #indicator>
        <div class="custom-indicator">
          <div class="progress-legend">
            <div
              v-for="(item, index) in progressLabels"
              :key="index"
              class="legend-item"
            >
              <span
                class="legend-color"
                :style="{ backgroundColor: progressColors[index] }"
              ></span>
              <span class="legend-text"
                >{{ item }}: {{ projectProgress[index] }}%</span
              >
            </div>
          </div>
        </div>
      </template>
    </C_Progress>
  </div>
</template>

<script setup>
const projectProgress = ref([85, 70, 92])
const progressColors = ['#ff6b6b', '#4ecdc4', '#45b7d1']
const progressLabels = ['前端开发', '后端开发', '测试进度']
</script>

<style scoped>
.progress-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
</style>
```
:::

::: details 📊 仪表盘监控 - 系统性能监控
```vue {10-17}
<template>
  <div class="dashboard-monitor">
    <h3>系统监控</h3>
    <div class="monitor-grid">
      <div
        v-for="metric in systemMetrics"
        :key="metric.name"
        class="metric-card"
      >
        <C_Progress
          type="dashboard"
          :percentage="metric.value"
          :color="getStatusColor(metric.value)"
          :gap-degree="75"
          :stroke-width="10"
          :status="getStatus(metric.value)"
        />
        <div class="metric-info">
          <h4>{{ metric.name }}</h4>
          <p>{{ metric.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const systemMetrics = ref([
  { name: 'CPU 使用率', value: 65, description: '处理器负载' },
  { name: '内存使用率', value: 80, description: '内存占用' },
  { name: '磁盘使用率', value: 45, description: '存储空间' },
  { name: '网络带宽', value: 30, description: '网络流量' },
])

const getStatusColor = (value) => {
  if (value < 50) return '#52c41a'
  if (value < 80) return '#faad14'
  return '#ff4d4f'
}

const getStatus = (value) => {
  if (value < 50) return 'success'
  if (value < 80) return 'warning'
  return 'error'
}
</script>

<style scoped>
.monitor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-top: 16px;
}

.metric-card {
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  text-align: center;
}

.metric-info {
  margin-top: 12px;
}

.metric-info h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
}

.metric-info p {
  margin: 0;
  font-size: 12px;
  color: #666;
}
</style>
```
:::

## 🛠️ 高级用法

::: details 🌈 渐变色配置 - 自定义渐变效果
```vue 
<template>
  <div class="gradient-progress">
    <C_Progress
      :percentage="75"
      :color="gradientConfig"
      :height="12"
      :border-radius="6"
    />
  </div>
</template>

<script setup>
const gradientConfig = {
  stops: ['#ffecd2', '#fcb69f'],
}

// 多圆环渐变色
const multiGradientConfig = [
  { stops: ['#667eea', '#764ba2'] },
  { stops: ['#f093fb', '#f5576c'] },
  { stops: ['#4facfe', '#00f2fe'] },
]
</script>
```
:::

::: details 🔄 动态进度更新 - 实时进度控制
```vue 
<template>
  <div class="dynamic-progress">
    <C_Progress
      :percentage="dynamicProgress"
      :is-animation="true"
      :time="500"
      :color="progressColor"
    />
    <div class="controls">
      <n-button @click="increaseProgress">增加进度</n-button>
      <n-button @click="decreaseProgress">减少进度</n-button>
      <n-button @click="resetProgress">重置</n-button>
    </div>
  </div>
</template>

<script setup>
const dynamicProgress = ref(0)

const progressColor = computed(() => {
  if (dynamicProgress.value < 30) return '#ff4757'
  if (dynamicProgress.value < 70) return '#ffa502'
  return '#2ed573'
})

const increaseProgress = () => {
  dynamicProgress.value = Math.min(100, dynamicProgress.value + 10)
}

const decreaseProgress = () => {
  dynamicProgress.value = Math.max(0, dynamicProgress.value - 10)
}

const resetProgress = () => {
  dynamicProgress.value = 0
}
</script>
```
:::

::: details 🎨 自定义指示器 - 个性化进度展示
```vue 
<template>
  <div class="custom-indicator-demo">
    <C_Progress
      type="circle"
      :percentage="score"
      :stroke-width="12"
      :show-indicator="true"
    >
      <template #indicator>
        <div class="score-indicator">
          <div class="score-number">{{ score }}</div>
          <div class="score-label">分数</div>
          <div class="score-grade">{{ getGrade(score) }}</div>
        </div>
      </template>
    </C_Progress>
  </div>
</template>

<script setup>
const score = ref(88)

const getGrade = (value) => {
  if (value >= 90) return 'A'
  if (value >= 80) return 'B'
  if (value >= 70) return 'C'
  if (value >= 60) return 'D'
  return 'F'
}
</script>

<style scoped>
.score-indicator {
  text-align: center;
}

.score-number {
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
}

.score-label {
  font-size: 12px;
  color: #666;
  margin: 2px 0;
}

.score-grade {
  font-size: 16px;
  font-weight: bold;
  color: #52c41a;
}
</style>
```
:::

## 🔧 自定义样式



::: details 🎨 CSS 变量定制 - 主题色彩配置
```scss
.c-progress {
  --progress-primary-color: #1890ff;
  --progress-success-color: #52c41a;
  --progress-warning-color: #faad14;
  --progress-error-color: #ff4d4f;
  --progress-rail-color: #f5f5f5;
  --progress-text-color: #666;
}
```
:::


::: details 📱 响应式布局 - 移动端适配

```vue 
<template>
  <C_Progress
    :percentage="75"
    :height="progressHeight"
    :stroke-width="strokeWidth"
  />
</template>

<script setup>
const progressHeight = computed(() => {
  return window.innerWidth > 768 ? 12 : 8
})

const strokeWidth = computed(() => {
  return window.innerWidth > 768 ? 10 : 6
})
</script>
```
:::



## ⚠️ 注意事项

### 1. 动画性能

::: code-group

```vue [✅ 推荐]
<!-- 合理的动画时长 -->
<C_Progress :percentage="75" :is-animation="true" :time="2000" />
```

```vue [❌ 不推荐]
<!-- 过长的动画 -->
<C_Progress :percentage="75" :is-animation="true" :time="10000" />
```

:::

### 2. 多圆环数据

::: code-group

```vue [✅ 推荐]
<!-- 合理的圆环数量 -->
<C_Progress type="multiple-circle" :percentage="[75, 60, 45]" />
```

```vue [❌ 不推荐]
<!-- 过多的圆环 -->
<C_Progress type="multiple-circle" :percentage="[75, 60, 45, 30, 20, 10]" />
```

:::

### 3. 颜色配置

::: code-group

```vue [✅ 推荐] 
<!-- 一致的颜色数量 -->
<C_Progress
  type="multiple-circle"
  :percentage="[75, 60, 45]"
  :color="['#ff6b6b', '#4ecdc4', '#45b7d1']"
/>
```

```vue [❌ 不推荐]
<!-- 颜色数量不匹配 -->
<C_Progress
  type="multiple-circle"
  :percentage="[75, 60, 45]"
  :color="['#ff6b6b']"
/>
```

:::

## 🐛 故障排除

### 常见问题



::: details ❓ Q1: 动画不播放怎么办？
**A1:** 检查以下几点：

1. 确认设置了 `isAnimation: true`
2. 检查 `percentage` 初始值是否为 0
3. 确认组件已正确挂载

```vue 
<!-- 正确的动画配置 -->
<C_Progress :percentage="targetValue" :is-animation="true" :time="2000" />

<script setup>
const targetValue = ref(0)

onMounted(() => {
  // 延迟设置目标值触发动画
  setTimeout(() => {
    targetValue.value = 75
  }, 100)
})
</script>
```
:::


::: details ❓  Q2: 多圆环显示不正确？

**A2:** 检查数据格式：

::: code-group

```vue [✅ 正确]
<!-- 正确的多圆环配置 -->
<C_Progress
  type="multiple-circle"
  :percentage="[75, 60, 45]"
  :color="['#ff6b6b', '#4ecdc4', '#45b7d1']"
/>
```

```vue [❌ 错误] 
<!-- 错误：单个数值 -->
<C_Progress type="multiple-circle" :percentage="75" />
```
:::


::: details ❓   Q3: 自定义指示器不显示？

**A3:** 确保设置了正确的插槽：

```vue
<C_Progress :show-indicator="true">
  <template #indicator>
    <!-- 自定义内容 -->
  </template>
</C_Progress>
```

:::








## 🎯 最佳实践

### 1. 合理选择类型

```vue {
<!-- ✅ 推荐：根据场景选择类型 -->
<!-- 文件上传：线性进度条 -->
<C_Progress type="line" :percentage="uploadProgress" />

<!-- 技能评估：圆形进度条 -->
<C_Progress type="circle" :percentage="skillLevel" />

<!-- 多维度数据：多圆环 -->
<C_Progress type="multiple-circle" :percentage="multiData" />

<!-- 监控面板：仪表盘 -->
<C_Progress type="dashboard" :percentage="cpuUsage" />
```

### 2. 动画优化

```vue 
<template>
  <C_Progress
    :percentage="progress"
    :is-animation="shouldAnimate"
    :time="animationDuration"
  />
</template>

<script setup>
// 根据性能动态调整动画
const shouldAnimate = computed(() => {
  return !reducedMotion.value && performance.now() > 0
})

const animationDuration = computed(() => {
  return reducedMotion.value ? 0 : 2000
})
</script>
```

### 3. 无障碍支持

```vue
<template>
  <div
    role="progressbar"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <C_Progress :percentage="percentage" :aria-label="`进度: ${percentage}%`" />
  </div>
</template>
```

## 📝 更新日志

### v1.0.0 (2025-07-14)

- ✨ 支持四种进度条类型
- ✨ 内置流畅动画效果
- ✨ 多圆环进度展示
- ✨ 完整的 TypeScript 支持
- ✨ 灵活的样式配置
- ✨ 自定义指示器插槽

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个组件设计用于团队协作，支持文件上传、数据监控、技能展示等多种场景。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更好的开发体验！ 🚀