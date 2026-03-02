---
outline: 'deep'
---

# C_Cascade 级联选择组件

> 🔗 基于 Naive UI 的三级联动选择器，让数据层级选择更简单、更直观

## 🚀 在线演示

<DemoIframe src="/preview/cascade" title="级联选择" height="700" />


## 🚀 特性

- **🔗 三级联动**: 支持最多三级数据联动选择
- **🎯 智能禁用**: 上级未选择时自动禁用下级选择器
- **🔄 自动清空**: 上级变更时自动清空下级已选值
- **💪 TypeScript**: 完整的类型定义和类型安全
- **🎨 灵活配置**: 支持自定义占位符和数据结构
- **⚡ 双向绑定**: 完整的 v-model 支持
- **🧹 清空功能**: 内置清空按钮，操作更便捷

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

```vue {3-7,13,15-30,32-34}
<template>
  <!-- 最简单的使用方式 -->
  <C_Cascade
    :data="cascadeData"
    v-model="selectedValue"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'   // robot admin 已自动导入，可以省略，演示只为更清晰

const selectedValue = ref({})

const cascadeData = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '余杭区', value: 'yuhang' },
        ],
      },
    ],
  },
]

const handleChange = (value) => {
  console.log('选中值:', value)
}
</script>
```

### 自定义占位符

```vue {4}
<template>
  <C_Cascade
    :data="cascadeData"
    :placeholders="['选择省份', '选择城市', '选择区县']"
    v-model="selectedValue"
  />
</template>
```

## 📖 API 文档

### Props

| 参数             | 类型            | 默认值                           | 说明           |
| ---------------- | --------------- | -------------------------------- | -------------- |
| **data**         | `CascadeItem[]` | `[]`                             | 级联数据源     |
| **placeholders** | `string[]`      | `['请选择', '请选择', '请选择']` | 各级占位符文本 |
| **modelValue**   | `CascadeValue`  | `{}`                             | v-model 绑定值 |

### Types

#### CascadeItem

```typescript
interface CascadeItem {
  label: string // 显示文本
  value: string | number // 选项值
  children?: CascadeItem[] // 子级数据
}
```

#### CascadeValue

```typescript
interface CascadeValue {
  primary?: {
    // 第一级选中项
    label: string
    value: string | number
  } | null
  secondary?: {
    // 第二级选中项
    label: string
    value: string | number
  } | null
  tertiary?: {
    // 第三级选中项
    label: string
    value: string | number
  } | null
}
```

### Events

| 事件名                | 参数                    | 说明             |
| --------------------- | ----------------------- | ---------------- |
| **update:modelValue** | `(value: CascadeValue)` | v-model 更新事件 |
| **change**            | `(value: CascadeValue)` | 选择变更事件     |

### 暴露方法

| 方法名              | 参数              | 返回值                | 说明               |
| ------------------- | ----------------- | --------------------- | ------------------ |
| **getLevelData**    | `(level: number)` | `CascadeItem[]`       | 获取指定层级数据   |
| **getSelectedItem** | `(index: number)` | `CascadeItem \| null` | 获取指定层级选中项 |

## 🎨 使用示例

::: details 🌍 地区选择器 - 省市区三级联动
```vue 
<template>
  <div class="region-selector">
    <h3>请选择地区</h3>
    <C_Cascade
      :data="regionData"
      :placeholders="['省份', '城市', '区县']"
      v-model="selectedRegion"
      @change="handleRegionChange"
    />

    <div v-if="selectedRegion.primary" class="selected-info">
      <p>已选择: {{ getSelectedPath() }}</p>
    </div>
  </div>
</template>

<script setup>
const selectedRegion = ref({})

const regionData = [
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      {
        label: '深圳市',
        value: 'shenzhen',
        children: [
          { label: '南山区', value: 'nanshan' },
          { label: '福田区', value: 'futian' },
          { label: '罗湖区', value: 'luohu' },
        ],
      },
      {
        label: '广州市',
        value: 'guangzhou',
        children: [
          { label: '天河区', value: 'tianhe' },
          { label: '越秀区', value: 'yuexiu' },
        ],
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
        children: [
          { label: '鼓楼区', value: 'gulou' },
          { label: '玄武区', value: 'xuanwu' },
        ],
      },
    ],
  },
]

const handleRegionChange = (value) => {
  console.log('地区变更:', value)
}

const getSelectedPath = () => {
  const path = []
  if (selectedRegion.value.primary)
    path.push(selectedRegion.value.primary.label)
  if (selectedRegion.value.secondary)
    path.push(selectedRegion.value.secondary.label)
  if (selectedRegion.value.tertiary)
    path.push(selectedRegion.value.tertiary.label)
  return path.join(' / ')
}
</script>
```
:::

::: details 🏢 部门选择器 - 组织架构级联
```vue {6,7,8,9,39}
<template>
  <div class="department-selector">
    <C_Cascade
      :data="departmentData"
      :placeholders="['选择公司', '选择部门', '选择小组']"
      v-model="selectedDepartment"
      @change="handleDepartmentChange"
    />
  </div>
</template>

<script setup>
const selectedDepartment = ref({})

const departmentData = [
  {
    label: '技术中心',
    value: 'tech',
    children: [
      {
        label: '前端部',
        value: 'frontend',
        children: [
          { label: 'React 组', value: 'react-team' },
          { label: 'Vue 组', value: 'vue-team' },
        ],
      },
      {
        label: '后端部',
        value: 'backend',
        children: [
          { label: 'Java 组', value: 'java-team' },
          { label: 'Node 组', value: 'node-team' },
        ],
      },
    ],
  },
]

const handleDepartmentChange = (value) => {
  // 可以根据选择结果进行权限控制等操作
  if (value.tertiary) {
    console.log('已选择到具体小组:', value.tertiary.label)
  }
}
</script>
```
:::

::: details 🛍️ 分类选择器 - 商品分类管理
```vue {6,7,8,9,50}
<template>
  <div class="category-selector">
    <h3>商品分类</h3>
    <C_Cascade
      :data="categoryData"
      :placeholders="['一级分类', '二级分类', '三级分类']"
      v-model="selectedCategory"
      @change="handleCategoryChange"
    />

    <!-- 显示选中的分类信息 -->
    <div v-if="selectedCategory.primary" class="category-result">
      <n-tag type="info">{{ selectedCategory.primary.label }}</n-tag>
      <n-tag v-if="selectedCategory.secondary" type="success">
        {{ selectedCategory.secondary.label }}
      </n-tag>
      <n-tag v-if="selectedCategory.tertiary" type="warning">
        {{ selectedCategory.tertiary.label }}
      </n-tag>
    </div>
  </div>
</template>

<script setup>
const selectedCategory = ref({})

const categoryData = [
  {
    label: '电子产品',
    value: 'electronics',
    children: [
      {
        label: '手机数码',
        value: 'mobile',
        children: [
          { label: '智能手机', value: 'smartphone' },
          { label: '平板电脑', value: 'tablet' },
        ],
      },
      {
        label: '电脑办公',
        value: 'computer',
        children: [
          { label: '笔记本', value: 'laptop' },
          { label: '台式机', value: 'desktop' },
        ],
      },
    ],
  },
]

const handleCategoryChange = (value) => {
  // 根据分类选择加载对应商品
  if (value.tertiary) {
    loadProductsByCategory(value.tertiary.value)
  }
}

const loadProductsByCategory = (categoryId) => {
  console.log('加载分类商品:', categoryId)
}
</script>
```
:::

## 🛠️ 高级用法

::: details 🔄 动态数据加载 - 异步获取级联数据
```vue 
<template>
  <C_Cascade
    :data="dynamicData"
    v-model="selectedValue"
    @change="handleDynamicChange"
  />
</template>

<script setup>
const dynamicData = ref([])
const selectedValue = ref({})

// 动态加载第一级数据
onMounted(async () => {
  try {
    const response = await fetch('/api/cascade/level1')
    dynamicData.value = await response.json()
  } catch (error) {
    console.error('加载数据失败:', error)
  }
})

const handleDynamicChange = async (value) => {
  // 当选择第一级时，动态加载第二级数据
  if (value.primary && !value.secondary) {
    const item = dynamicData.value.find((x) => x.value === value.primary.value)
    if (item && !item.children) {
      try {
        const response = await fetch(
          `/api/cascade/level2/${value.primary.value}`
        )
        const children = await response.json()
        item.children = children
      } catch (error) {
        console.error('加载子级数据失败:', error)
      }
    }
  }
}
</script>
```
:::

::: details 📋 表单集成 - 与 Naive UI 表单组件结合
```vue
<template>
  <n-form :model="formData" :rules="rules" ref="formRef">
    <n-form-item label="所属地区" path="region">
      <C_Cascade
        :data="regionData"
        v-model="formData.region"
        :placeholders="['省份', '城市', '区县']"
      />
    </n-form-item>

    <n-form-item>
      <n-button @click="handleSubmit" type="primary">提交</n-button>
      <n-button @click="handleReset">重置</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup>
const formRef = ref()
const formData = ref({
  region: {},
})

const rules = {
  region: {
    validator: (rule, value) => {
      if (!value.tertiary) {
        return new Error('请选择完整的地区信息')
      }
      return true
    },
    trigger: 'change',
  },
}

const handleSubmit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log('提交数据:', formData.value)
    }
  })
}

const handleReset = () => {
  formData.value.region = {}
}
</script>
```
:::

::: details 🎨 自定义样式 - 响应式设计和主题定制
```vue 
<template>
  <C_Cascade
    :data="cascadeData"
    v-model="selectedValue"
    class="custom-cascade"
  />
</template>

<style scoped>
.custom-cascade {
  :deep(.n-select-item) {
    min-width: 160px;
    border-radius: 8px;

    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;

    :deep(.n-select-item) {
      min-width: 100%;
    }
  }
}
</style>
```
:::

## ⚠️ 注意事项

### 1. 数据结构规范

::: code-group

```javascript [✅ 推荐] 
// 规范的数据结构
const correctData = [
  {
    label: '选项名称', // 必须：显示文本
    value: 'option_value', // 必须：唯一值
    children: [ // 可选：子级数据
      {
        label: '子选项',
        value: 'sub_option',
      },
    ],
  },
]
```

```javascript [❌ 不推荐] 
// 缺少必要字段
const incorrectData = [
  {
    name: '选项名称', // 错误：应该是 label
    id: 'option_id', // 错误：应该是 value
  },
]
```

:::

### 2. 性能优化

::: code-group

```vue [✅ 推荐]
<!-- 合理的数据量 -->
<C_Cascade :data="reasonableData" />
```

```vue [❌ 不推荐]
<!-- 过多的数据层级 -->
<!-- 避免超过 1000+ 选项的单级数据 -->
```

:::

### 3. 表单验证

::: code-group

```vue [✅ 推荐] 
<!-- 完整的验证逻辑 -->
<C_Cascade
  :data="cascadeData"
  v-model="formData.region"
  @change="validateRegion"
/>
```

```vue [❌ 不推荐]
<!-- 缺少验证 -->
<C_Cascade :data="cascadeData" v-model="formData.region" />
```

:::

## 🐛 故障排除

### 常见问题

#### Q1: 选择器不联动怎么办？

**A1:** 检查以下几点：

1. 确认数据结构正确 (label, value, children)
2. 检查 children 字段是否存在
3. 确认 value 值唯一性

```vue 
<!-- 检查数据结构 -->
<template>
  <div>
    <pre>{{ JSON.stringify(cascadeData, null, 2) }}</pre>
    <C_Cascade :data="cascadeData" v-model="selectedValue" />
  </div>
</template>
```

#### Q2: 选中值不正确怎么办？

**A2:** 检查 v-model 绑定：

::: code-group

```vue [✅ 正确] 
<script setup>
// 正确的初始值
const selectedValue = ref({})
</script>
```

```vue [❌ 错误]
<script setup>
// 错误的初始值
const selectedValue = ref(null) // 应该是对象
</script>
```

:::

#### Q3: 样式显示异常怎么办？

**A3:** 确保正确导入 Naive UI 样式：

```javascript
// main.js
import { createApp } from 'vue'
import naive from 'naive-ui'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

const app = createApp(App)
app.use(naive)
```

#### Q4: 动态数据加载失败？

**A4:** 添加错误处理：

```vue 
<script setup>
const loadData = async () => {
  try {
    const data = await fetchCascadeData()
    cascadeData.value = data
  } catch (error) {
    console.error('数据加载失败:', error)
    // 显示错误提示
    $message.error('数据加载失败，请重试')
  }
}
</script>
```

## 🎯 最佳实践

### 1. 数据预处理

```javascript
// ✅ 推荐：统一数据格式
const preprocessData = (rawData) => {
  return rawData.map((item) => ({
    label: item.name || item.label,
    value: item.id || item.value,
    children: item.children ? preprocessData(item.children) : undefined,
  }))
}
```

### 2. 异步加载优化

```vue 
<script setup>
// ✅ 推荐：缓存机制
const dataCache = new Map()

const loadLevelData = async (parentValue) => {
  if (dataCache.has(parentValue)) {
    return dataCache.get(parentValue)
  }

  const data = await fetchData(parentValue)
  dataCache.set(parentValue, data)
  return data
}
</script>
```

### 3. 用户体验优化

```vue 
<template>
  <!-- 加载状态 -->
  <n-spin :show="loading">
    <C_Cascade
      :data="cascadeData"
      v-model="selectedValue"
      :placeholders="
        loading ? ['加载中...', '加载中...', '加载中...'] : defaultPlaceholders
      "
    />
  </n-spin>
</template>
```

### 4. 响应式设计

```scss 
.cascade-container {
  .n-cascade-selector {
    display: flex;
    gap: 12px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 8px;
    }

    .n-select-item {
      flex: 1;
      min-width: 140px;

      @media (max-width: 768px) {
        min-width: 100%;
      }
    }
  }
}
```

## 📝 更新日志

### v1.0.0 (2025-05-28)

- ✨ 支持三级联动选择
- ✨ 智能禁用和自动清空
- ✨ 完整的 TypeScript 支持
- ✨ v-model 双向绑定
- ✨ 自定义占位符
- ✨ 基于 Naive UI 的稳定实现

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个组件设计用于团队协作，支持地区选择、部门选择、分类选择等多种场景。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更好的开发体验！ 🚀