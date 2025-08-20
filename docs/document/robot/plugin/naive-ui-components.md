# @agile-team/naive-ui-components

> 让 Naive UI 组件开发不再重复造轮子 🎨

专门解决 Vue3 + Naive UI 项目中那些让人头疼的组件复用问题。每次项目都要重写一遍图标组件？代码高亮总是配置不对？业务组件散落在各个项目里无法复用？这个组件库就是为了这些烦恼而生的。

## 🤔 为什么要做这个？

基于 Naive UI 开发项目时经常遇到的痛点：

- 😤 **重复开发组件**：每个项目都要重新写一遍图标、代码展示等常用组件
- 🤦‍♂️ **配置总是出错**：代码高亮、图标库每次配置都踩坑，浪费时间
- 😮‍💨 **组件质量不一**：不同项目的同类组件实现方式各异，维护困难
- 🔍 **缺少业务沉淀**：好用的组件没有统一收集，无法在团队间复用

就想着能不能把这些常用的、经过验证的组件统一封装，让大家开箱即用。

## ✨ 现在的效果

### 🎯 开箱即用

基于 Naive UI 封装，保持一致的设计语言和交互体验。

### ⚡ 零配置启动

图标、代码高亮等复杂组件已经配置好，直接使用即可。

### 🔧 TypeScript 全支持

完整的类型定义，开发时有智能提示和类型检查。

### 📚 完整文档支持

每个组件都有详细的使用文档和交互式示例。

## ✨ 工具特性

简单说就是做了这几件事：

- 🎨 **统一设计规范** - 基于 Naive UI，保持视觉和交互一致性
- ⚡ **常用组件封装** - 图标、代码高亮等高频使用的组件
- 🔧 **TypeScript 友好** - 完整类型定义，开发体验良好
- 📚 **文档齐全** - 交互式文档，使用示例丰富
- 🛠️ **易于扩展** - 清晰的开发规范，方便添加新组件

## 🚀 快速体验

### 装个包

```bash
npm install @agile-team/naive-ui-components
```

别忘了必需的依赖：

```bash
npm install vue@^3.3.0 naive-ui@^2.35.0
```

### 试试看

**全局注册（推荐）**

```typescript
// main.ts
import { createApp } from "vue";
import NaiveUIComponents from "@agile-team/naive-ui-components";
import "@agile-team/naive-ui-components/style";

const app = createApp(App);
app.use(NaiveUIComponents);
app.mount("#app");
```

**按需使用**

```vue
<script setup lang="ts">
import { C_Icon, C_Code } from "@agile-team/naive-ui-components";
import "@agile-team/naive-ui-components/style";
</script>

<template>
  <C_Icon name="mdi:home" size="24" />
  <C_Code language="javascript" :code="'console.log(\"Hello World\")'" />
</template>
```

## 🎭 效果展示

### 图标组件

```vue
<template>
  <!-- 基础使用 -->
  <C_Icon name="mdi:heart" size="32" color="red" />

  <!-- 可点击图标 -->
  <C_Icon name="mdi:settings" size="24" clickable @click="handleSettings" />

  <!-- 自定义样式 -->
  <C_Icon
    name="mdi:star"
    size="48"
    color="linear-gradient(45deg, #FF6B6B, #4ECDC4)"
  />
</template>
```

### 代码高亮组件

```vue
<template>
  <C_Code
    language="javascript"
    :code="jsCode"
    :line-numbers="true"
    theme="github-dark"
    copy-button
  />
</template>

<script setup lang="ts">
const jsCode = `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
`;
</script>
```

## 🛠️ 支持的组件

目前提供这些常用组件：

### 🎨 基础组件

| 组件       | 说明         | 主要功能                   |
| ---------- | ------------ | -------------------------- |
| **C_Icon** | 图标组件     | 支持 Iconify 全套图标库    |
| **C_Code** | 代码高亮组件 | 多语言语法高亮、复制、行号 |

### 📋 正在开发

| 组件         | 说明     | 预计功能             |
| ------------ | -------- | -------------------- |
| **C_Table**  | 增强表格 | 自动分页、筛选、导出 |
| **C_Form**   | 智能表单 | 自动验证、动态字段   |
| **C_Upload** | 文件上传 | 拖拽、预览、进度显示 |

## 🎨 使用方式

### 三种使用模式

**全局注册 - 适合大项目**

```typescript
// 一次注册，全局使用
app.use(NaiveUIComponents);
```

**按需导入 - 适合小项目**

```vue
// 只导入需要的组件 import { C_Icon, C_Code } from
'@agile-team/naive-ui-components'
```

**类型安全使用**

```vue
<script setup lang="ts">
import type { IconProps, CodeProps } from "@agile-team/naive-ui-components";

// 享受完整的类型提示
const iconProps: IconProps = {
  name: "mdi:home",
  size: 24,
  clickable: true,
};
</script>
```

### 实际项目中

**后台管理项目**

```vue
<!-- 导航图标 -->
<C_Icon name="mdi:dashboard" size="20" />
<C_Icon name="mdi:account-group" size="20" />

<!-- API 文档展示 -->
<C_Code
  language="json"
  :code="responseExample"
  theme="vs-dark"
  :line-numbers="true"
/>
```

**技术博客项目**

```vue
<!-- 文章中的代码块 -->
<C_Code language="vue" :code="vueExample" copy-button :line-numbers="true" />

<!-- 社交图标 -->
<C_Icon name="mdi:github" size="24" clickable @click="openGithub" />
```

## 🔧 开发和扩展

### 项目结构很清晰

```
src/
├── components/           # 组件库
│   ├── C_Icon/          # 图标组件
│   │   ├── index.vue    # 组件实现
│   │   ├── index.ts     # 类型导出
│   │   └── index.scss   # 组件样式
│   └── C_Code/          # 代码组件
├── hooks/               # 公共逻辑
├── plugins/             # 插件扩展
└── index.ts            # 统一导出
```

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/your-username/naive-ui-components.git
cd naive-ui-components && npm install

# 开发模式
npm run dev              # 监听文件变化
npm run playground       # 本地测试页面

# 构建发布
npm run build
```

### 添加新组件

想要贡献新组件？流程很简单：

**1. 创建组件结构**

```bash
src/components/C_YourComponent/
├── index.vue        # 组件实现
├── index.ts         # 导出定义
└── index.scss       # 样式文件
```

**2. 组件实现**

```vue
<!-- index.vue -->
<template>
  <div class="c-your-component">
    <!-- 组件内容 -->
  </div>
</template>

<script lang="ts" setup>
export interface YourComponentProps {
  /** 属性描述 */
  someProp?: string;
  /** 尺寸大小 */
  size?: number | string;
}

const props = withDefaults(defineProps<YourComponentProps>(), {
  someProp: "default",
  size: 16,
});

const emit = defineEmits<{
  change: [value: string];
  click: [event: MouseEvent];
}>();

// 组件逻辑
</script>

<style lang="scss" scoped>
.c-your-component {
  // 样式实现
}
</style>
```

**3. 导出配置**

```typescript
// index.ts
import C_YourComponent from "./index.vue";

export default C_YourComponent;
export { C_YourComponent };
export type { YourComponentProps } from "./index.vue";
```

**4. 注册到组件库**

```typescript
// src/index.ts
import C_YourComponent from "./components/C_YourComponent/index.vue";

const components = [C_Code, C_Icon, C_YourComponent];

export { C_Code, C_Icon, C_YourComponent };
export type { YourComponentProps } from "./components/C_YourComponent/index.vue";
```

### 开发规范

遵循这些约定能让组件库更好维护：

- **命名规范**：组件用 `C_` 前缀，文件用 PascalCase
- **类型安全**：所有 props 都要有 TypeScript 接口
- **样式隔离**：使用 scoped 样式，遵循 BEM 命名
- **文档友好**：prop 注释要写清楚，方便生成文档

## 🤔 一些说明

**Q: 为什么基于 Naive UI？**  
A: Naive UI 设计优秀、TypeScript 支持好，适合企业级项目。

**Q: 可以和其他 UI 库一起用吗？**  
A: 可以，组件都有 `C_` 前缀，不会冲突。

**Q: 组件样式可以自定义吗？**  
A: 可以，支持通过 CSS 变量和 class 覆盖样式。

**Q: 如何请求新组件？**  
A: 在 GitHub Issues 中提出需求，我们会评估并开发。

**Q: 组件会持续更新吗？**  
A: 会的，我们会持续优化现有组件，并根据需求添加新组件。

## 🎉 一起完善

这个组件库还在持续完善中，如果你：

- 🐛 发现了 bug 或兼容性问题
- 💡 有好的组件想法或改进建议
- 🔧 想贡献代码或新组件
- 📝 愿意完善文档和示例

都很欢迎在 GitHub 上参与讨论！

**快速开始**

```bash
# 立即体验
npm install @agile-team/naive-ui-components

# 查看完整文档
# https://www.tzagileteam.com/robot/components/preface
```

---

## 📎 相关链接

[![npm version](https://img.shields.io/npm/v/@agile-team/naive-ui-components.svg)](https://www.npmjs.com/package/@agile-team/naive-ui-components)
[![GitHub stars](https://img.shields.io/github/stars/ChenyCHENYU/naive-ui-components?style=social)](https://github.com/your-username/naive-ui-components)

如果这个组件库让你的开发变得更轻松，给个 star 支持一下吧 ⭐

[📚 组件文档](https://www.tzagileteam.com/robot/components/preface) • [🏠 GitHub 仓库](https://github.com/ChenyCHENYU/naive-ui-components) • [📦 NPM 包](https://www.npmjs.com/package/@agile-team/naive-ui-components) • [🐛 问题反馈](https://github.com/ChenyCHENYU/naive-ui-components/issues)

---

**让组件复用变得简单高效，专注于业务功能的实现！** 🎨
