---
outline: "deep"
description: "🏷 环境角标，非生产环境右上角悬浮显示环境标识，点击展开 env/版本/API 地址详情，防呆防误操作"
---

# C_EnvironmentBadge 环境角标

> 🏷 防呆组件：非生产环境在页面右上角悬浮显示环境标识，避免把测试环境误当生产环境操作

## ✨ 特性

- **🚦 自动显隐**: 读取 `@/config/env` 配置，仅非生产环境显示
- **🔍 详情展开**: 点击角标展开面板，显示 `env` / `ver` / `api` 三项关键信息
- **🎯 零配置**: 接入后无需传参，跟随环境配置自动工作

## 🎯 基础用法

```vue
<template>
  <C_EnvironmentBadge />
</template>
```

角标文案与显隐由 `src/config/env` 中的环境配置驱动；点击角标可切换显示详情面板（环境名 / 版本号 / API 地址）。

## 📋 说明

该组件无 Props，全部行为由环境配置文件决定。配置示例：

```ts
// src/config/env.ts
export default {
  env: 'test',      // dev / test / gray / prod，非 prod 即显示角标
  version: '1.0.0',
  apiBase: 'https://test-api.example.com',
}
```
