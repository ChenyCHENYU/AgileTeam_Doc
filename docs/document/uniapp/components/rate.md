---
outline: "deep"
---

# C_Rate 评分

> ⭐ 评分组件，支持半星选择、自定义图标和颜色，可用于用户评价、质量评级等场景。

## ✨ 特性

- **½ 半星选择**：`allowHalf` 支持 0.5 精度评分
- **🎨 自定义图标**：选中/未选中图标均可替换（wd-icon 图标名）
- **🔒 只读/禁用**：`readonly` 仅展示，`disabled` 灰度不可交互
- **📏 灵活尺寸**：`size`（rpx）和 `gap`（rpx）完全可控

## 🎯 快速开始

```vue
<template>
  <!-- 基础评分 -->
  <C_Rate v-model="score" />

  <!-- 半星 + 自定义颜色 -->
  <C_Rate v-model="score" allow-half active-color="#FF6B35" />

  <!-- 只读展示 -->
  <C_Rate :model-value="4.5" allow-half readonly />
</template>

<script setup lang="ts">
const score = ref(3)
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `number` | `0` | 当前评分值（v-model） |
| `count` | `number` | `5` | 星星总数 |
| `size` | `number` | `40` | 图标尺寸（rpx） |
| `gap` | `number` | `8` | 图标间距（rpx） |
| `activeColor` | `string` | `'#FFCC00'` | 选中颜色 |
| `inactiveColor` | `string` | `'#C7C7CC'` | 未选中颜色 |
| `activeIcon` | `string` | `'star-on'` | 选中图标（wd-icon） |
| `inactiveIcon` | `string` | `'star'` | 未选中图标（wd-icon） |
| `allowHalf` | `boolean` | `false` | 是否允许半星 |
| `readonly` | `boolean` | `false` | 只读模式 |
| `disabled` | `boolean` | `false` | 禁用模式 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `number` | v-model 更新 |
| `change` | `number` | 评分变化时触发 |

## 🎨 使用示例

::: details 💡 评价表单中使用
```vue
<template>
  <C_Form>
    <wd-form-item label="服务评分">
      <C_Rate v-model="form.rating" allow-half :count="5" />
    </wd-form-item>
    <wd-form-item label="质量评分">
      <C_Rate v-model="form.quality" active-color="#34C759" />
    </wd-form-item>
  </C_Form>
</template>
:::

::: details 💡 列表只读星级展示
```vue
<template>
  <view v-for="item in list" :key="item.id" class="flex items-center gap-2">
    <C_Rate :model-value="item.rating" allow-half readonly :size="28" />
    <text class="text-sm text-gray-500">{{ item.rating }}分</text>
  </view>
</template>
:::
