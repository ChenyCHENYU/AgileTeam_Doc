---
outline: "deep"
---

# C_Barcode 条形码组件

> 📊 基于 vue-barcode 的条形码生成组件，支持多种编码格式和自定义样式

## 🚀 在线演示

<DemoIframe src="/preview/barcode" title="条形码" height="700" />

## ✨ 特性

- **📦 多种编码格式**: CODE128、CODE39、EAN13、EAN8、UPC、ITF14、MSI、pharmacode
- **🎨 自定义样式**: 颜色、宽度、高度、字号、文字位置
- **🏷️ 标签支持**: 可在条形码下方显示自定义标签
- **⚠️ 错误处理**: 值无效时自动触发错误事件

## 📦 安装

::: code-group

```bash [bun (推荐)]
bun add @robot-admin/naive-ui-components
```

```bash [pnpm]
pnpm add @robot-admin/naive-ui-components
```

```bash [npm]
npm install @robot-admin/naive-ui-components
```

:::

## 🎯 快速开始

### 基础使用

```vue {3}
<template>
  <!-- 最简使用，默认 CODE128 格式 -->
  <C_Barcode value="1234567890" />
</template>
```

### 指定编码格式

```vue {3-4}
<template>
  <!-- EAN-13 商品条码 -->
  <C_Barcode value="5901234123457" format="EAN13" />
  <C_Barcode value="96385074" format="EAN8" />
</template>
```

### 自定义样式

```vue {3-8}
<template>
  <C_Barcode
    value="ROBOT-ADMIN"
    format="CODE128"
    :height="60"
    :width="1.5"
    line-color="#2080f0"
    :show-border="false"
  />
</template>
```

## 📖 API 文档

### Props

| 参数             | 类型                | 默认值      | 说明               |
| ---------------- | ------------------- | ----------- | ------------------ |
| **value**        | `string`            | -           | 条形码值（必填）   |
| **format**       | `BarcodeFormat`     | `'CODE128'` | 编码格式           |
| **width**        | `number`            | `2`         | 单条宽度           |
| **height**       | `number`            | `80`        | 条形码高度         |
| **showText**     | `boolean`           | `true`      | 是否显示值文本     |
| **fontSize**     | `number`            | `20`        | 值文本字号         |
| **textPosition** | `'bottom' \| 'top'` | `'bottom'`  | 值文本位置         |
| **lineColor**    | `string`            | `'#000000'` | 条形码颜色         |
| **background**   | `string`            | `'#FFFFFF'` | 背景颜色           |
| **showBorder**   | `boolean`           | `true`      | 是否显示边框       |
| **label**        | `string`            | `''`        | 自定义标签文本     |
| **showLabel**    | `boolean`           | `false`     | 是否显示自定义标签 |

### BarcodeFormat 类型

```typescript
type BarcodeFormat =
  | "CODE128" // 通用格式（推荐）
  | "CODE39" // 工业标准
  | "EAN13" // 国际商品条码（13位）
  | "EAN8" // 国际商品条码（8位）
  | "UPC" // 美国商品条码
  | "ITF14" // 物流包装条码
  | "MSI" // 库存管理
  | "pharmacode"; // 药品编码
```

### Events

| 事件名    | 参数             | 说明                 |
| --------- | ---------------- | -------------------- |
| **error** | `(error: Error)` | 条形码生成失败时触发 |

## 🎨 使用示例

::: details 📦 商品条码 - EAN13 标准格式

```vue
<template>
  <C_Barcode
    value="5901234123457"
    format="EAN13"
    label="红茶饮料 500ml"
    :show-label="true"
  />
</template>
```

:::

::: details 🏭 物流条码 - 带自定义配色

```vue
<template>
  <C_Barcode
    value="12345678901234"
    format="ITF14"
    :height="60"
    line-color="#1a5276"
    background="#f8f9fa"
  />
</template>
```

:::

::: details ⚠️ 错误处理

```vue
<template>
  <C_Barcode value="invalid" format="EAN13" @error="handleError" />
</template>

<script setup>
const handleError = (error) => {
  console.error("条形码生成失败:", error.message);
  // 提示用户检查输入值
};
</script>
```

:::

## ⚠️ 注意事项

### 1. 编码格式与值的对应关系

::: code-group

```vue [✅ 正确]
<!-- EAN13 必须是 13 位数字 -->
<C_Barcode value="5901234123457" format="EAN13" />
<!-- CODE128 支持任意 ASCII 字符 -->
<C_Barcode value="Robot-Admin-2026" format="CODE128" />
```

```vue [❌ 错误]
<!-- EAN13 不能传非数字或位数不对 -->
<C_Barcode value="abc" format="EAN13" />
```

:::

### 2. 格式选择建议

| 场景     | 推荐格式     | 说明         |
| -------- | ------------ | ------------ |
| 通用场景 | `CODE128`    | 支持全 ASCII |
| 商品零售 | `EAN13`      | 国际标准     |
| 物流包装 | `ITF14`      | 物流行业标准 |
| 药品管理 | `pharmacode` | 药品行业专用 |

## 📝 更新日志

### v0.5.0 (2025-12-02)

- ✨ 新增条形码组件
- ✨ 支持 8 种编码格式
- ✨ 支持自定义样式与标签

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个组件设计用于团队协作，如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更好的开发体验！ 🚀
