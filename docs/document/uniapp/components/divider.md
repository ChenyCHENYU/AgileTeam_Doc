---
outline: "deep"
---

# C_Divider 分割线

> ➖ 内容分割线组件，支持实线/虚线、居中/左/右文字标注，用于页面内容区域的视觉分隔。

## ✨ 特性

- **📝 文字标注**：分割线中间或两侧可添加分类文字
- **📌 三种对齐**：文字支持 `center` / `left` / `right` 三种位置
- **〰️ 虚线模式**：`dashed` 切换为虚线风格
- **🎨 完全自定义**：线条颜色、文字颜色、文字大小、上下间距均可配置

## 🎯 快速开始

```vue
<template>
  <!-- 简单分割线 -->
  <C_Divider />

  <!-- 带文字居中 -->
  <C_Divider text="基本信息" />

  <!-- 左对齐标题分割 -->
  <C_Divider text="近期动态" text-position="left" />

  <!-- 虚线 -->
  <C_Divider dashed />
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `text` | `string` | `''` | 分割线中间的文字（也可用插槽） |
| `textPosition` | `'center' \| 'left' \| 'right'` | `'center'` | 文字对齐位置 |
| `dashed` | `boolean` | `false` | 是否为虚线 |
| `lineColor` | `string` | `'#EBEBEB'` | 线条颜色 |
| `textColor` | `string` | `'#909399'` | 文字颜色 |
| `textSize` | `number` | `24` | 文字大小（rpx） |
| `margin` | `number` | `20` | 上下间距（rpx） |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 自定义分割线中间内容（替代 text prop） |

## 🎨 使用示例

::: details 💡 表单分组视觉分隔
```vue
<template>
  <C_Form :model="form" :rules="rules">
    <C_Divider text="基本信息" text-position="left" :margin="16" />

    <wd-form-item label="姓名" prop="name">
      <wd-input v-model="form.name" />
    </wd-form-item>
    <wd-form-item label="手机" prop="phone">
      <wd-input v-model="form.phone" />
    </wd-form-item>

    <C_Divider text="工作信息" text-position="left" :margin="16" />

    <wd-form-item label="部门" prop="dept">
      <wd-input v-model="form.dept" />
    </wd-form-item>
  </C_Form>
</template>
:::

::: details 💡 虚线 + 图标插槽
```vue
<template>
  <C_Divider dashed :margin="32">
    <view class="flex items-center gap-1">
      <C_Icon name="i-fluent-color-sparkle-28" :size="16" />
      <text class="text-gray-400 text-xs">我是有底线的</text>
    </view>
  </C_Divider>
</template>
:::
