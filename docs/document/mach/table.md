---
outline: "deep"
description: "MachTable 是面向复杂 B 端业务的高性能 TypeScript 数据表格引擎：框架无关内核、Vue 3 优先、React 18+ 官方支持。本页介绍能力矩阵、四包体系与 60 秒快速开始。"
reviewAfter: "2027-05-16"
---

# MachTable 数据表格引擎

<div class="hero-banner">
  <h2>📊 高性能企业数据表格</h2>
  <p>框架无关内核 · Vue 3 优先 · React 18+ 官方支持 · 虚拟化 · 编辑事务</p>
</div>

[MachTable](https://github.com/ChenyCHENYU/MachTable) 为后台管理、工业台账、订单/工单、财务报表和低代码平台提供一套可组合的数据网格能力。它不追求堆叠相似 API，而是把高频复杂场景做成稳定、类型安全且可诊断的产品能力。当前版本 **v0.42.1**，Robot Admin 已正式安装并通过三浏览器验收。

## 能力矩阵

| 维度 | 已具备的能力 |
| :---: | :--- |
| 大数据 | 行列双虚拟化、行池复用、可变行高索引、随机访问远程块、LRU 与并发控制、可选 Worker |
| 数据模型 | 本地/服务端排序过滤、分页、无限滚动、树与懒加载、分组聚合、主从详情、固定行 |
| 远程导出 | 可序列化的筛选、排序、可见列与跨页选择快照（`createRemoteExportRequest()`），供业务服务端执行全量导出 |
| 编辑 | 单元格与原子整行编辑、对勾/取消、同步异步校验、脏数据、撤销重做、部分保存与冲突处理 |
| 交互 | 多选/范围选择、复制粘贴、填充柄、主题化行拖拽与条件整行颜色、列宽调整、列工作台、上下文菜单、操作列 |
| 治理 | 分层配置、命名预设、配置来源解释、领域化 API、版本化状态、稳定错误码、诊断快照 |
| 安全 | CSV 公式注入防护、安全字段路径、Overlay 默认文本渲染、资源销毁与请求取消 |

内置两个命名预设：`list`（默认主列表：序号 + 内置分页 + 列筛选）与 `detail`（小明细：只读、不分页、超过 330px 虚拟滚动）。同页多张小明细只需 `preset="detail"`，无需每页重复一组开关。

## 四包体系：业务只装一个适配包

| 包名 | 用途 |
| :--- | :--- |
| `@agile-team/mach-table` | 框架无关 Core，零运行时依赖 |
| `@agile-team/mach-table-vue` | 官方 Vue 3 适配（含 `/async` `/workflows` `/ui` `/editors` 子入口） |
| `@agile-team/mach-table-react` | 官方 React 18+ 适配 |
| `@agile-team/mach-table-xlsx` | 可选 XLSX 导入导出扩展 |

```bash
# Vue 3
pnpm add @agile-team/mach-table-vue

# React 18+
pnpm add @agile-team/mach-table-react

# 仅原生 TypeScript / JavaScript
pnpm add @agile-team/mach-table
```

Vue 或 React 包会自动安装匹配的 Core，并重导出公共类型与核心能力；主题样式在应用入口只引入一次。

## 60 秒开始

### Vue 3

```vue
<script setup lang="ts">
import { ref } from "vue";
import { MachTable, type ColDef } from "@agile-team/mach-table-vue";
import "@agile-team/mach-table-vue/styles.css";

interface Order { id: string; customer: string; amount: number }
const rows = ref<Order[]>([{ id: "SO-001", customer: "Acme", amount: 12800 }]);
const columns: ColDef<Order>[] = [
  { field: "id", headerName: "订单号", pinned: "left" },
  { field: "customer", headerName: "客户" },
  { field: "amount", headerName: "金额", filter: "number" }
];
</script>

<template>
  <div style="height: 560px">
    <MachTable :column-defs="columns" :row-data="rows" row-key="id" />
  </div>
</template>
```

Vue 支持局部导入、同步全局插件 `app.use(MachTablePlugin)` 与异步插件三种接入方式；全局配置使用 `defineMachTableConfig`。

### React 18+

```tsx
import { useMemo } from "react";
import { MachTable, type ColDef } from "@agile-team/mach-table-react";
import "@agile-team/mach-table-react/styles.css";

interface Order { id: string; customer: string; amount: number }

export function OrdersPage({ rows }: { rows: Order[] }) {
  const columns = useMemo<ColDef<Order>[]>(() => [
    { field: "id", headerName: "订单号", pinned: "left" },
    { field: "customer", headerName: "客户" },
    { field: "amount", headerName: "金额", filter: "number" }
  ], []);
  return <div style={{ height: 560 }}>
    <MachTable<Order> columnDefs={columns} rowData={rows} rowKey="id" />
  </div>;
}
```

### 原生 TypeScript

```ts
import { createGrid, createMachTablePreset } from "@agile-team/mach-table";
import "@agile-team/mach-table/styles/mach-table.css";

const api = createGrid(document.querySelector("#grid")!, createMachTablePreset("list", {
  columnDefs: [{ field: "name", headerName: "名称" }],
  rowData: [{ id: "1", name: "MachTable" }],
  rowKey: "id"
}));

// Vue/React 适配器会自动销毁；原生接入由宿主在卸载时调用。
api.destroy();
```

## 八个高级子入口

高级能力独立于基础包，按需引入：

| 入口 | 能力 |
| :--- | :--- |
| `/workbench` | 高级过滤草稿、批量修改差异与冲突审阅、按需诊断 |
| `/preferences` | 租户/用户/页面/Schema 隔离、CAS、有序写入、历史状态 |
| `/ordering` | 多行与树移动、防环和父级约束、稳定身份保存、失败回滚 |
| `/server-side` | 服务端分组、聚合、route 分页缓存、事务刷新和层级选择 |
| `/multi-range` | Ctrl/Cmd 追加选区、格式化复制、校验清空与单次撤销 |
| `/analysis` | 有界 Pivot、算术与聚合公式、柱/折线图及数据表回退 |
| `/import` | 有界导入预览、规范值、异步校验、结构化错误 |
| `/business` | 本地语义合计与显式范围（`summarizeRows`） |

## 领域化 GridApi

根级仅负责生命周期、配置、事件和批处理；业务命令进入 12 个职责明确的领域（`rows` / `columns` / `selection` / `editing` / `filtering` / `sorting` / `pagination` / `hierarchy` / `view` / `state` / `io` / `diagnostics`），不再记忆方法海洋：

```ts
api.batch((grid) => {
  grid.rows.transact({ update: changedRows });
  grid.columns.setVisible("internalNote", false);
  grid.view.refreshCells({ rowIds: changedIds, columns: ["status"] });
});

const result = await api.editing.save(orderApi.saveChanges);
```

远程 B 端列表从 `/workflows` 使用 `useMachTableQuery`：内置取消旧请求、防止过期响应覆盖、服务端分页和跨页选择；`useMachTableEditing` 提供脏状态、部分成功、失败定位和乐观锁冲突闭环。

## 与 UI 组件库集成

MachTable 不依赖任何 UI 组件库，但提供官方集成指南：

- **Naive UI**：CSS 变量桥接 `--n-*`，`vueCellRenderer` 直接渲染 NTag 等组件
- **Element Plus**：`/editors` 入口的 `createElementPlusEditors`，EP 组件由宿主传入，零额外体积

## 相关链接

- 深入使用：[Vue 接入](/mach/table-vue) · [GridOptions 配置](/mach/table-grid-options) · [列定义 ColDef](/mach/table-col-def) · [GridApi 与事件](/mach/table-grid-api) · [高级能力](/mach/table-advanced) · [UI 库集成](/mach/table-integration)
- 仓库：[github.com/ChenyCHENYU/MachTable](https://github.com/ChenyCHENYU/MachTable)
- npm：[@agile-team/mach-table-vue](https://www.npmjs.com/package/@agile-team/mach-table-vue) · [@agile-team/mach-table](https://www.npmjs.com/package/@agile-team/mach-table) · [@agile-team/mach-table-react](https://www.npmjs.com/package/@agile-team/mach-table-react) · [@agile-team/mach-table-xlsx](https://www.npmjs.com/package/@agile-team/mach-table-xlsx)
- [Mach 生态总览](/mach/preface) · [MachReport 报表引擎](/mach/report)
