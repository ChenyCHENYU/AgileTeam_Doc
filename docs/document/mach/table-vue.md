---
outline: "deep"
description: "MachTable Vue 3 接入指南：三种接入模式、MachTable 组件 Props/事件/插槽/暴露实例、useMachTable 组合式函数、远程查询与编辑工作流、自定义 renderer 与 editor。"
reviewAfter: "2027-05-16"
---

# MachTable Vue 接入

`@agile-team/mach-table-vue` 要求 **Vue ≥ 3.2**。规范组件名只有 `<MachTable>`；适配包自动依赖 Core，并重导出公共类型和能力。

```bash
pnpm add @agile-team/mach-table-vue
```

```ts
// main.ts：样式只引入一次
import "@agile-team/mach-table-vue/styles.css";
```

## 三种接入模式

### 1. 局部导入（少量路由用表）

路由本身懒加载时，表格自然进入路由 chunk：

```vue
<script setup lang="ts">
import { h } from "vue";
import { MachTable, defineVueColumns } from "@agile-team/mach-table-vue";

interface Order { id: string; product: string; amount: number; status: "paid" | "pending" }
const rows: Order[] = [{ id: "SO-001", product: "卷材", amount: 12800, status: "pending" }];
const columns = defineVueColumns<Order>([
  { field: "product", headerName: "产品", flex: 1, editable: true },
  { field: "amount", headerName: "金额", width: 140, filter: "number" },
  {
    field: "status",
    headerName: "状态",
    render: (row) => h("span", { class: `order-status--${row.status}` }, row.status === "paid" ? "已支付" : "待支付")
  }
]);
</script>

<template>
  <div style="height: 600px">
    <MachTable :column-defs="columns" :row-data="rows" row-key="id" />
  </div>
</template>
```

`render(row, index, params)` 是 Vue 业务列推荐的自定义方式：可直接返回 `h()` VNode，且列、字典映射和展示规则保持在同一份数据配置中。

### 2. 同步全局插件（多数页面用表）

```ts
import { createApp } from "vue";
import { MachTablePlugin } from "@agile-team/mach-table-vue";

createApp(App).use(MachTablePlugin).mount("#app");
// 有统一约定时：app.use(MachTablePlugin, machTableConfig)
```

### 3. 异步全局插件（首屏轻量）

组件与 Core 在第一次渲染表格时才加载：

```ts
import AsyncMachTablePlugin, { preloadMachTable } from "@agile-team/mach-table-vue/async";

app.use(AsyncMachTablePlugin, {
  asyncComponentOptions: {
    loadingComponent: GridLoading,
    errorComponent: GridLoadError,
    delay: 120,
    timeout: 15_000,
    onError(error, retry, fail, attempts) {
      if (attempts <= 2) retry();
      else fail();
    }
  }
});

// 可选：路由 hover 时预取；重复调用安全
void preloadMachTable();
```

样式仍应同步引入，避免异步组件首次出现无样式闪烁。

## Props、事件与暴露实例

- **所有 `GridOptions` 都可作为 props**，模板使用 kebab-case（如 `:row-key`、`row-selection="multiple"`、`:enable-column-resize="true"`）
- `class/style/id/data-*/aria-*` 透传宿主；`grid-class-name` 作用于内部 grid 根元素
- Core 事件以 Vue kebab-case 监听，如 `@selection-changed`、`@grid-error`
- 组件暴露 `getApi()`、`getResolvedConfig()` 与 `explainOption()`

配置较多时用一份对象 `v-bind` 传入，`defineVueTableConfig<Row>()` 提供完整类型检查：

```vue
<MachTable
  v-bind="tableConfig"
  :ref="table.ref"
  :column-defs="columns"
  :row-data="rows"
  row-key="id"
  row-selection="multiple"
  :persistence="{ key: 'tenant:user:orders' }"
  @selection-changed="onSelectionChanged"
  @grid-error="reportGridError"
/>
```

## useMachTable()

```ts
const table = useMachTable<Order>();

function exportCsv() {
  const csv = table.api.value?.io.exportCsv({ prependBOM: true });
}

function undo() {
  table.api.value?.editing.undo();
}
```

| 返回 | 说明 |
| :--- | :--- |
| `ref` | 绑定 `<MachTable :ref="table.ref">` |
| `api` | 挂载后的响应式领域 API（见 [GridApi](/mach/table-grid-api)），卸载后自动置空 |
| `ready` | 首个布局帧和 `gridReady` 完成后为 `true` |

## 原生插槽

列通过 `colId`（未配置时为 `field`）匹配 `#cell-*`、`#header-*` 与 `#editor-*`；另支持通用 `#cell/#header/#editor` 与 `#loading/#empty/#error/#detail/#actions`。同列同时声明 render 与具名插槽时，**具名插槽优先**。

```vue
<MachTable :column-defs="columns" :row-data="rows" :loading="loading">
  <template #header-status>订单状态</template>
  <template #cell-status="{ value }">
    <NTag :type="value === 'done' ? 'success' : 'warning'" size="small">{{ value }}</NTag>
  </template>
  <template #editor-amount="{ value, setValue, commit, cancel }">
    <NInputNumber :value="value" @update:value="setValue" @keyup.enter="commit" @keyup.esc="cancel" />
  </template>
  <template #loading><AppTableSkeleton /></template>
  <template #empty><NEmpty description="暂无订单" /></template>
</MachTable>
```

加载态/空态已有可直接投产的默认呈现；只有需要品牌化时才声明 `#loading` / `#empty`，一旦声明，slot 始终拥有最高优先级。slot 自动继承宿主 appContext，并在虚拟行复用、覆盖层替换和表格销毁时卸载。

## 工作流与工具栏（/workflows、/ui）

```ts
import { useMachTableQuery, useMachTableEditing, useMachTableController } from "@agile-team/mach-table-vue/workflows";
import { MachTableToolbar } from "@agile-team/mach-table-vue/ui";
```

| 组合式函数 | 管理内容 |
| :--- | :--- |
| `useMachTableQuery` | 请求取消、过期响应、服务端分页、加载/空/错状态、跨页选择（`allMatching + excludedKeys`） |
| `useMachTableEditing` | 脏数据、部分成功、失败定位、乐观锁冲突、离页保护 |
| `useMachTableController` | 将表格、查询、编辑、选择和工具栏命令组合为单个页面控制器 |

```ts
const controller = useMachTableController({
  config: tableConfig,
  loading,
  theme: () => dark.value ? "dark" : "light",
  editMode,
  onGridError: reportGridError,
});
// 模板只需 v-bind="controller.bindings.value"
```

工具栏全局注册：`app.use(MachTableUiPlugin)`（来自 `/ui`）。只有导入 `/ui` 后 TypeScript 才声明全局 `<MachTableToolbar>`；主插件只注册 `<MachTable>`。

## 自定义 renderer 与 editor

框架桥接函数从 `/adapters` 与 `/editors` 按需导入：

```ts
// /adapters：任意 Vue 组件作为单元格/详情渲染器
import { vueCellRenderer, vueDetailRenderer } from "@agile-team/mach-table-vue/adapters";
const columns = [{ field: "status", cellRenderer: vueCellRenderer(StatusBadge) }];

// /editors：通用 Vue 编辑器与 Element Plus 工厂
import { vueCellEditor, createElementPlusEditors } from "@agile-team/mach-table-vue/editors";
const currencyEditor = vueCellEditor(CurrencyInput, {
  props: ({ data }) => ({ currency: data.currency }),
  focusSelector: "input",
});
```

纯文本格式化优先使用 `valueFormatter`，避免为每个可见单元格创建组件实例。

## 响应式更新

适配器只对实际变化的配置调用一次 `api.updateOptions()`。`rowData`、`columnDefs`、主题、密度、覆盖层和事件回调均可响应式更新；卸载时自动取消请求、监听器和渲染器。

## 相关文档

- [GridOptions 配置](/mach/table-grid-options) · [列定义 ColDef](/mach/table-col-def) · [GridApi 与事件](/mach/table-grid-api)
- [高级能力](/mach/table-advanced) · [UI 库集成](/mach/table-integration)
- 仓库完整指南：[Vue 接入](https://github.com/ChenyCHENYU/MachTable/blob/main/docs/guide/vue.md) · [React 接入](https://github.com/ChenyCHENYU/MachTable/blob/main/docs/guide/react.md) · [SSR](https://github.com/ChenyCHENYU/MachTable/blob/main/docs/guide/ssr.md)
