---
outline: "deep"
---

# C_Cascader 级联选择

> 🗂️ 多级联动选择弹层，支持省/市/区等树形数据选择，内置搜索过滤和面包屑导航，字段名完全可自定义。

## ✨ 特性

- **🌳 多级联动**：Tree 结构数据自动驱动多层 Tab 切换
- **🔍 可搜索**：`filterable` 开启全量关键词搜索，自动展平匹配
- **🍞 面包屑 Tab**：已选路径以标签形式展示，可点击回退到任意层级
- **🏷️ 字段映射**：`valueKey` / `labelKey` / `childrenKey` 适配任意数据结构

## 🎯 快速开始

```vue
<template>
  <view @click="showCascader = true">
    {{ selectedLabel || '请选择地区' }}
  </view>

  <C_Cascader
    v-model:visible="showCascader"
    :options="regionData"
    title="选择地区"
    filterable
    @confirm="onConfirm"
  />
</template>

<script setup lang="ts">
const showCascader = ref(false)
const selectedLabel = ref('')

function onConfirm({ labels, values }: { labels: string[]; values: string[] }) {
  selectedLabel.value = labels.join(' / ')
  form.region = values
}
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | 是否显示（v-model:visible） |
| `options` | `CascaderOption[]` | `[]` | 树形选项数据 |
| `defaultValue` | `any[]` | `[]` | 初始选中值路径 |
| `title` | `string` | `'请选择'` | 弹层标题 |
| `valueKey` | `string` | `'value'` | 选项值字段名 |
| `labelKey` | `string` | `'label'` | 选项文字字段名 |
| `childrenKey` | `string` | `'children'` | 子级字段名 |
| `filterable` | `boolean` | `false` | 是否开启搜索 |
| `placeholder` | `string` | `'请输入关键词'` | 搜索框占位文本 |
| `resetOnClose` | `boolean` | `true` | 关闭后是否重置已选 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:visible` | `boolean` | v-model:visible 更新 |
| `confirm` | `{ labels: string[], values: any[] }` | 选择完成确认时触发 |
| `change` | `{ labels: string[], values: any[] }` | 每级选中变化时触发 |
| `close` | - | 弹层关闭时触发 |

## 🎨 使用示例

::: details 💡 省市区三级联动（表单中使用）
```vue
<template>
  <C_Form :model="form" :rules="rules">
    <wd-form-item label="所在地区" prop="region">
      <view class="flex items-center" @click="regionPicker = true">
        <text :class="form.region.length ? '' : 'text-gray-400'">
          {{ form.regionLabel || '请选择省市区' }}
        </text>
        <wd-icon name="arrow-right" size="14px" color="#ccc" class="ml-auto" />
      </view>
    </wd-form-item>
  </C_Form>

  <C_Cascader
    v-model:visible="regionPicker"
    :options="regionTree"
    title="选择地区"
    filterable
    @confirm="({ labels, values }) => {
      form.region = values
      form.regionLabel = labels.join(' ')
    }"
  />
</template>
:::
