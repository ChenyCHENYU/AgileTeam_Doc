---
outline: "deep"
description: "MachReport 是面向业务宽表、明细台账与工业标签的 TypeScript 报表引擎：模板 + 数据 + 输出分离，RenderPlan 统一中间产物，支持预览、打印、PDF、Excel、PNG 与 Word 兼容输出。"
reviewAfter: "2027-05-16"
---

# MachReport 报表引擎

<div class="hero-banner">
  <h2>🖨️ 分页报表引擎 + Vue 3 预览组件</h2>
  <p>完整宽表 · Excel 模板绑定 · 规则填报与数据核对 · 工业标签 · 前后端共用契约</p>
</div>

[MachReport](https://github.com/ChenyCHENYU/MachReport) 是独立的 TypeScript 报表引擎与 Vue 3 预览组件，当前版本 **v2.26.1**。它把报表拆成"模板 + 数据 + 输出"三段：用 TypeScript DSL 或 JSON 定义模板，引擎 `paginateTemplate` 生成统一的 `RenderPlan`，再交给预览、打印、PDF、真 `.xlsx`、逐页 PNG 或 Word 兼容 `.doc` 输出。

```text
模板 + 数据 ── paginateTemplate ──┐
                                  ├─ RenderPlan ─┬─ Vue / DOM / Canvas
项目数据接口 ── PlanFetcher ──────┘              ├─ 浏览器打印 / HTML
                                                 └─ PDF / XLSX / 图片 / Word 兼容文档
```

## 核心能力

| 能力 | 说明 |
| :--- | :--- |
| 页面模型 | 毫米单位、A3/A4 等纸张预设、横纵向、页眉页脚 |
| 完整宽表 | `layout: "wide"` 自然列宽 + 横向滚动，Excel 自动合并为一张连续 Sheet |
| 明细与汇总 | 自动分页、多级分组加权小计、主从明细、层级动态矩阵、重复页眉页脚 |
| 预览交互 | 多选/级联/数值范围参数、远程字典、跨页选区、原生固定列、Ctrl/Cmd+F 内容搜索与字段目录 |
| 内容编辑 | 默认只读，双击编辑、整批校验、安全预填、原子保存、撤销重做、差异审阅 |
| Excel 导入 | 多 Sheet、合并样式、缓存公式值、单元格级定位错误 |
| 工业标签 | `ReportLabelStudio` 标识工作台：多版相邻、份数、真实 QR / Code 128 / EAN 条码 |
| 引擎复用 | Node Runtime、逐页分片、OpenAPI / Java 客户端、流式 Excel、可恢复持久任务 |
| 分析扩展 | 交叉表、受控表达式、柱/折线图元、只读选区计算、期间对比 |

宽表（`layout: "wide"`）与标准纸张（`paper: "a3" | "a4"` + `landscape`）互斥二选一：列很多时优先宽表，避免把所有列挤进一张纸的可用宽度。

## 安装与入口

```bash
pnpm add @agile-team/mach-report
```

一个包按需入口，内核零运行时依赖（ExcelJS、pdf-lib/fontkit、node-sql-parser、BWIPP 条码均内联于对应子入口）：

| 入口 | 用途 |
| :--- | :--- |
| `@agile-team/mach-report` | 模板 DSL、模板目录、数据源、分页、格式化、DOM / Canvas、页窗口 |
| `/vue` | 重导出核心 API；Vue 组件、插件、配置中心、父页面控制句柄 |
| `/pdf` | `renderPlanToPdf`、字体加载与缓存 |
| `/xlsx` · `/xlsx/node` | `renderPlanToXlsx`、`importExcelTemplate`、Node 流式行导出 |
| `/sql` | 动态 SQL 编译与单 SELECT 校验 |
| `/server` · `/server/node` | `createReportRuntime`、预算、持久任务协议、worker_threads 适配 |
| `/designer` | 可选 Vue 画布、Excel 绑定向导、规则与验收面板 |
| `/analytics` · `/codes` | 交叉表与图元 · QR / 条码编码为 PNG |

Vue 组件要求 Vue `^3.2.47`；只使用引擎、PDF 或 XLSX 时 Vue 是可选的。发布包声明 Node `>=18`。

## 60 秒开始

### Vue 3：本地模板与明细

```vue
<script setup lang="ts">
import { createTableTemplate, createLocalFetcher, ReportPreview } from "@agile-team/mach-report/vue";
import "@agile-team/mach-report/vue/style.css";

const template = createTableTemplate({
  title: "产品出库单",
  columns: [
    { header: "物料", field: "name", flex: 2 },
    { header: "数量", field: "qty" }
  ]
});

const fetcher = createLocalFetcher({
  outbound: { template, datasets: { detail: [{ name: "物料 A", qty: 3 }] } }
});
</script>

<template>
  <ReportPreview report-id="outbound" :fetcher="fetcher" height="70vh" />
</template>
```

标准明细只定义标题和列：默认 A4、10mm 页边距、表头居中、自动分配列宽并分页。

### 项目接入：注册一次，页面只传 ID 和参数

```ts
import { machReportPlugin, defineReport } from "@agile-team/mach-report/vue";
import "@agile-team/mach-report/vue/style.css";

app.use(machReportPlugin, {
  reports: {
    outbound: defineReport({
      template,
      load: ({ params, signal }) => orderApi.report(params, { signal }),
      mapData: (data) => ({ detail: data.items })
    })
  }
});
```

```vue
<MachReportPreview report-id="outbound" :params="{ orderId }" height="70vh" />
```

模板的 `params` 会自动生成查询面板；父页面用 `useMachReport()` 获得可等待的控制方法和只读响应式 `state`（如 `state.canExport` 直接驱动外部按钮），加载、页数、导出、打印与错误无需另建状态。

### 原生 TypeScript

```ts
import { createTemplate, paginateTemplate, renderPlan } from "@agile-team/mach-report";

const template = createTemplate()
  .page("a4")
  .text("第一张报表", { leftMm: 20, topMm: 20, widthMm: 100, heightMm: 10 })
  .build();

const { plan, warnings } = paginateTemplate(template, {});
document.querySelector("#report")!.replaceChildren(renderPlan(plan, document));
```

`paginateTemplate` 可在客户端或服务端运行；`renderPlan` 需要 DOM。大量页面使用页窗口或 Vue 预览组件，避免一次创建全部页面节点。

### Node Runtime：服务端复用同一份报表定义

```ts
import { createReportRuntime } from "@agile-team/mach-report/server";

const runtime = createReportRuntime({ reports, budget: { maxRows: 50_000, maxPages: 2_000 } });
const metadata = runtime.describe(); // 参数、数据 JSON Schema 与能力描述
const { bytes, contentType, stats } = await runtime.export({
  reportIds: ["daily"], params: { date: "2026-10-16" }, format: "xlsx"
});
```

Node 直接运行本包；Java 等后端可消费 JSON Schema 与 JSON 协议，通过独立 Node 服务复用引擎（参考仓库 `examples/server-java-node`）。

## 工业标签工作台

```vue
<ReportLabelStudio
  :rows="materials"
  :schema="materialContract"
  identity-field="id"
  :brand="{ name: 'MACH STEEL', tagline: '材料追溯' }"
/>
```

直接传入记录与字段契约，即可预览双版材料标识；左侧可切换单面物料卡、双版标识、仓储标签，二维码绑定业务编号原值。需要调整时进入"设计标签"，从统一的"添加内容"入口追加字段、文字和图片。

## 配置中心

通用文案、主题、页间距和 PDF 字体放入配置中心（体验对齐 mach-table）；优先级为内置值 → 应用 defaults → 命名 preset → 组件属性：

```ts
const config = defineMachReportConfig({
  defaults: {
    gapPx: 18,
    pdfFontUrl: "/fonts/NotoSansSC-Regular.ttf",
    xlsx: { valueMode: "raw" }
  },
  presets: { previewOnly: { showExport: false, showPrint: false } }
});

app.use(machReportPlugin, { fetcher, config });
```

中文 PDF 需部署覆盖所用字符的字体并配置 `pdfFontUrl`；`.doc` 出口是 Word 兼容的 HTML 文档（非 `.docx`）。

## 相关链接

- 深入使用：[Vue 组件](/mach/report-vue) · [模板 DSL](/mach/report-template) · [参数与数据](/mach/report-data) · [编辑与填报](/mach/report-editing) · [输出与导出](/mach/report-export) · [工业标签](/mach/report-labels) · [Node Runtime](/mach/report-server)
- 仓库：[github.com/ChenyCHENYU/MachReport](https://github.com/ChenyCHENYU/MachReport)
- npm：[@agile-team/mach-report](https://www.npmjs.com/package/@agile-team/mach-report)
- [Mach 生态总览](/mach/preface) · [MachTable 表格引擎](/mach/table)
