---
outline: "deep"
---

# 写在前面的话

<div class="hero-section">
  <div class="hero-content">
    <h1 class="hero-title">
      <span class="wave">🧩</span> Robot uniApp 组件库
    </h1>
    <p class="hero-subtitle">
      33 个精心打造的移动端跨平台组件，覆盖 H5、微信小程序、App 三端
    </p>
  </div>
</div>

## 📖 关于组件库

Robot uniApp 组件库（`C_*` 系列）是基于 **wot-design-uni** 基础 UI 库之上封装的**业务级组件集合**，聚焦在企业移动端应用中最常见的场景需求，而非重复造轮子。

每个组件都经过以下设计考量：

- **跨端兼容**：H5、微信小程序、App 三端均可使用，通过条件编译处理差异
- **TypeScript 优先**：完整的类型定义，IDE 智能提示开箱即用
- **easycom 自动注册**：无需手动 `import`，配置一次，全局可用
- **UnoCSS 样式**：组件内部使用 UnoCSS 原子化类，与项目风格统一
- **安全区适配**：布局类组件自动处理刘海屏和 Home Bar

## 🗂️ 组件分类

| 分类 | 组件数 | 典型组件 |
| --- | --- | --- |
| **布局组件** | 4 | C_Layout, C_Header, C_Tabbar, C_TabNav |
| **数据展示** | 13 | C_Card, C_Tag, C_Badge, C_List, C_Steps... |
| **表单组件** | 5 | C_Form, C_Search, C_Cascader, C_Calendar... |
| **反馈组件** | 5 | C_ActionSheet, C_Modal, C_SwipeAction... |
| **媒体 & 通用** | 6 | C_Upload, C_ImagePreview, C_Signature, C_Icon... |

## 🚀 快速使用

### 自动注册（推荐）

项目已在 `pages.json` 中配置 `easycom`，`C_*` 前缀组件自动注册：

```json
{
  "easycom": {
    "custom": {
      "^C_(.*)": "@/components/global/C_$1/index.vue"
    }
  }
}
```

无需任何 import，直接在模板中使用：

```vue
<template>
  <C_Layout>
    <C_Card title="示例卡片" padding>
      <C_Tag text="标签" type="primary" />
    </C_Card>
  </C_Layout>
</template>
```

### 手动引入（局部使用）

```vue
<script setup lang="ts">
import CCard from '@/components/global/C_Card/index.vue'
</script>
```

## 🎨 组件文件结构

每个组件遵循统一的文件结构：

```
C_Card/
├── index.vue    # 组件主体（模板 + 脚本 + 样式划分清晰）
├── data.ts      # Props 默认值、computed 逻辑、工具函数
└── index.scss   # 组件作用域样式（配合 SCSS 变量）
```

## 📝 文档规范说明

每个组件的文档包含：

1. **组件简介**：一句话概括用途和特点
2. **特性列表**：核心功能亮点
3. **快速开始**：最基础的使用代码示例
4. **API 文档**：完整的 Props / Events / Slots / Expose 表格
5. **使用示例**：覆盖典型业务场景的代码片段

::: tip 在线演示
组件演示页面请直接在 Robot uniApp 项目中运行，访问「组件库」页面查看实际效果。
:::

## 🔗 相关资源

- **wot-design-uni 文档** → [https://wot-design-uni.cn](https://wot-design-uni.cn)
- **UniApp 组件文档** → [https://uniapp.dcloud.net.cn/component](https://uniapp.dcloud.net.cn/component/)
- **Robot uniApp GitHub** → [https://github.com/ChenyCHENYU/Robot_uniApp](https://github.com/ChenyCHENYU/Robot_uniApp)
