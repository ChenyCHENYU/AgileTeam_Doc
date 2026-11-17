---
outline: "deep"
description: "MachTable 高级能力：场景预设与配置中心（list/detail、覆盖优先级、严格检查）、编辑事务闭环、远程查询工作流、导入导出、状态持久化与八个高级子入口（workbench/preferences/ordering/server-side/multi-range/analysis/import/business）。"
reviewAfter: "2027-05-16"
---

# MachTable 高级能力

## 场景预设与配置中心

Vue 和 React 的 `<MachTable>` 默认使用 `list` 场景。普通页面只传列和数据，不需要配置文件；同页的小明细表选择 `detail`。

| 场景 | 默认行为 | 页面负责 |
| --- | --- | --- |
| `list`（默认） | 序号、分页、列筛选、列设置和列宽调整 | 明确主表容器高度、业务列和数据 |
| `detail` | 保留序号，纯文字表头、只读、无分页；按内容收起，表体最多 330px 后虚拟滚动 | 业务列和数据，必要时单独覆盖高度或编辑能力 |

```vue
<MachTable :column-defs="orderColumns" :row-data="orders" row-key="id" />
<MachTable preset="detail" :column-defs="materialColumns" :row-data="basketA" row-key="id" />
```

场景按用途选择，不根据返回行数自动切换；`theme`、`size`、斑马纹、边框与场景分开。`rowNumber: false` 关序号、`pagination: false` 关分页、`:preset="false"` 退出场景。

### 配置一次，全项目统一差异

```ts
// src/config/mach-table.config.ts
import { createMachTablePreset, defineMachTableConfig } from "@agile-team/mach-table-vue";

export default defineMachTableConfig({
  defaults: { theme: "auto", size: "compact", stripedRows: true },
  presets: {
    // 继承内置 detail 再改一两项：明确使用 createMachTablePreset
    detail: createMachTablePreset("detail", { maxBodyHeight: 240 }),
    crud: createMachTablePreset("list", { rowSelection: "multiple", editType: "fullRow" })
  }
});

// app.use(MachTablePlugin, machTableConfig)
```

路由/布局可响应式叠加：`provideMachTableConfig(() => ({ defaults: { theme: dark.value ? "dark" : "light" } }))`；React 对应嵌套 `<MachTableProvider config={...}>`。

### 覆盖优先级（从低到高）

1. 适配器原生基底
2. 应用与路由/布局合并后的 `defaults`
3. 选中的 preset（项目同名自定义完整优先于内置场景；数组按从左到右合并）
4. 当前表格显式 props

`undefined` 表示继承，`false` 是明确关闭。`rowData`、`columnDefs`、`datasource`、`loading`、`error`、`initialState`、`persistence` 属于每张表，**不能放入全局 defaults/preset**。默认 `strict: true`，越界配置抛出带字段名的错误。

配置来源可诊断：`tableRef.value?.explainOption("maxBodyHeight")` 返回 `{ source: "built-in preset:detail", value: 330, layers }`。

## 编辑事务闭环

单元格编辑默认提供轻量编辑提示与就地对勾/取消；Enter / Escape / Tab 提供显式键盘流程；点击另一可编辑格会先校验提交当前值再无缝切换。`editType: "fullRow"` 将可编辑单元格作为一个原子事务提交。

```ts
const editing = useMachTableEditing(table.api, {
  save: (changes, { signal }) => orderApi.saveChanges(changes, { signal }),
  beforeUnload: true   // 离页保护
});

const result = await editing.save();
// result.failures 定位失败行；conflicts 处理乐观锁冲突
editing.rollback();
```

- 编辑/粘贴/清空/填充共用同步异步校验（列 `validate` / 表格 `rowEditValidator`）
- 撤销重做：`api.editing.undo()`，一次粘贴或填充保持为一个批次
- 部分保存：`save(handler)` 返回 `{ submitted, saved, failures, conflicts }`，保存开始后的新编辑不被旧请求误清除

## 远程查询工作流（/workflows）

```ts
import { useMachTableQuery } from "@agile-team/mach-table-vue/workflows";

const query = useMachTableQuery({
  api: table.api,
  fetcher: ({ page, pageSize, sortModel, filterModel, signal }) =>
    orderApi.page({ page, pageSize, sort: sortModel, filter: filterModel }, { signal }),
});
```

内置：取消旧请求、防止过期响应覆盖、服务端分页、加载/空/错状态、跨页选择（`allMatching + excludedKeys` 表达"全选全部查询结果"，不要求客户端加载全部 ID）。删除后直接 `reload()`；当前页越界时最多补查一次最后有效页。

## 导入导出

```ts
// 本地已加载数据
const csv = api.io.exportCsv({ prependBOM: true });
const matrix = api.io.exportMatrix({ onlySelected: true });
const ok = api.io.importCsv(text, { mode: "append" });

// XLSX 扩展
import { ... } from "@agile-team/mach-table-xlsx";
```

**服务端全量导出**使用可序列化快照，交给业务后端执行：

```ts
import { createRemoteExportRequest } from "@agile-team/mach-table-vue";

const request = createRemoteExportRequest(api);
// request 携带筛选、排序、可见列与跨页选择 → 后端全量生成文件
await exportApi.download(request);
```

## 状态持久化

```ts
persistence: {
  key: "tenant:user:orders",        // 应用:租户:用户:场景
  sections: ["columns"],            // 只保存列宽、顺序、显隐和固定；省略则保存完整工作区
  debounceMs: 160,
  store: customStore                // 默认 localStorage，可接后端或 IndexedDB
}
```

`sections` 同时限制写入与恢复；异步保存保持顺序，晚到加载不会覆盖用户刚完成的操作。持久化、`initialState` 与手动 `api.state.apply()` 走同一份 GridState 契约。

## 行拖拽与条件整行颜色

```ts
import { dragColumn, type GridOptions } from "@agile-team/mach-table-vue";

const options: GridOptions<Plan> = {
  rowKey: "id",
  columnDefs: [dragColumn(), { field: "name" }, { field: "status" }],
  rowStyleRules: [
    { when: ({ data }) => data.status === "S1B", tone: "danger" },
    { when: ({ data }) => data.status === "S1C", tone: "success" },
    { when: ({ data }) => data.issued, tone: "warning" }
  ],
  onRowDragEnd: ({ fromIndex, targetIndex, applied }) => {
    // 自动模式已完成移动；需要持久化时交给应用自己的保存流程
  }
};
```

## 八个高级子入口

| 入口 | 能力 | 核心导出 |
| --- | --- | --- |
| `/workbench` | 高级过滤草稿、批量修改差异与冲突审阅、按需诊断 | `mountAdvancedFilterBuilder` / `mountChangeReview`（另引 `styles/workbench.css`） |
| `/preferences` | 租户/用户/页面/Schema 隔离、CAS、有序写入、历史状态、列类型迁移报告 | 企业偏好控制器 |
| `/ordering` | 多行与树移动、防环和父级约束、稳定身份保存、失败回滚、撤销重做 | `createRowOrderController()`，`bindings` 可直接合入表格配置 |
| `/server-side` | 服务端分组、聚合、route 分页缓存、事务刷新和层级选择 | 层级 Store（独立 `styles/server-side.css`） |
| `/multi-range` | Ctrl/Cmd 追加选区、格式化复制、校验清空与单次撤销 | 多范围选区 |
| `/analysis` | 有界 Pivot、算术与聚合公式、柱/折线图及数据表回退 | 分析图元 |
| `/import` | 有界导入预览、规范值、异步校验、结构化错误与过期保护 | `createImportPlan()` |
| `/business` | 本地语义合计与显式范围 | `summarizeRows`（scope: page/selected/query；ratio 先汇总分子分母） |

没有 UI 的纯计算、偏好和排序控制器无需附加样式；服务端分组用 `/styles/server-side.css`，分析和多范围用 `/styles/workbench.css`。

## 大数据与 Worker

行列双虚拟化默认开启；5 万行以上本地过滤/排序可启用 `dataProcessor`（默认阈值 `dataProcessorMinRows: 5000`），Worker helper 位于 Core 或适配包 `/worker` 子入口。百万级可跳转长列表用 `datasourceMode: "block"` 随机块模型（LRU 缓存 + 并发控制 + 可选预取）。

## 质量与验收

- 提交前：`pnpm verify`（ESLint / TS / 单元与覆盖率 / 复杂度上限 15 / API 快照 / publint / gzip 预算 / 文档构建）+ `pnpm test:e2e`（Chromium / Firefox / WebKit）
- Robot_Admin 已正式安装 0.42.1 并通过三浏览器 42 项表格回归验收

## 相关文档

[GridOptions](/mach/table-grid-options) · [ColDef](/mach/table-col-def) · [GridApi 与事件](/mach/table-grid-api) · [UI 库集成](/mach/table-integration)
· 仓库 33 篇配方：[recipes 目录](https://github.com/ChenyCHENYU/MachTable/tree/main/docs/recipes)
