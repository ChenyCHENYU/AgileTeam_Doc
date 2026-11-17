---
outline: "deep"
description: "MachReport 模板 DSL：createTemplate 自由布局链式 API、createTableTemplate 标准明细工厂完整选项表（wide 宽表 / paper 纸张 / 列宽 flex / 对齐语义）、RenderPlan 数据模型与模板管理 API。"
reviewAfter: "2027-05-16"
---

# MachReport 模板 DSL

MachReport 的模板是纯数据（TypeScript DSL 构建或 JSON），引擎 `paginateTemplate` 将"模板 + 数据"分页为统一的 `RenderPlan`。页面与组件几何尺寸以**毫米**为单位。

## createTemplate()：自由布局

```ts
import { createTemplate, paginateTemplate } from "@agile-team/mach-report";

const template = createTemplate()
  .page("a4")                                    // 纸张预设或 { widthMm, heightMm }
  .text("出库单", { leftMm: 20, topMm: 10, widthMm: 100, heightMm: 10 })
  .list("detail", { leftMm: 12, topMm: 30, widthMm: 186 }, [
    { header: "物料", field: "name", widthMm: 120 },
    { header: "数量", field: "qty", widthMm: 66 }
  ])
  .build();

const { plan, warnings } = paginateTemplate(template, {
  detail: [{ name: "物料 A", qty: 3 }]
});
```

模板支持纸张尺寸、页边距、文本、图片、表格/明细、分组小计、总计、页码、格式化和条件格式。分页告警在 `warnings` 中返回，业务侧应记录或展示。

组件支持 `opacity`、绕自身框中心顺时针 `rotateDeg` 与 `align: "justify"`（DOM 与 PDF 出口）。`paginateTemplate` 可在客户端或服务端运行；可选传 `{ maxPages, maxCells, maxChartComponents }` 预算与 `AbortSignal`。

## createTableTemplate()：标准明细工厂

业务报表推荐工厂——只定义标题和列，默认 A4、10mm 页边距、表头居中、自动分配列宽并分页，返回普通 `ReportTemplate`：

```ts
import { createTableTemplate } from "@agile-team/mach-report";

const template = createTableTemplate({
  title: "产品出库单",
  columns: [
    { header: "物料", field: "name", flex: 2 },
    { header: "数量", field: "qty", format: { kind: "number", digits: 3 } }
  ]
});
```

### 完整选项

| 选项 | 行为 |
| --- | --- |
| `layout` | 默认 `page` 标准纸张布局；`wide` 按全部列自然宽度展开（完整宽表，纵向仅分段预览） |
| `paper` / `landscape` | page 默认 A4，支持纸张预设或 `{ widthMm, heightMm }`、横向；**与 wide 互斥** |
| `columnWidthMm` | 仅 wide：自动列基准宽度，默认 30mm；单列 `flex` 为其倍数 |
| `columns` | 必填非空列数组，沿用 `ListColumn` 的字段、样式与格式化；列 `widthMm` 可选 |
| 列 `widthMm` / `flex` | 固定毫米宽优先；page 中其余列按正权重分配余量，wide 中为基准宽度倍数（默认 1） |
| `margins` | 默认各 10mm：`marginTopMm` / `marginBottomMm` / `marginLeftMm` / `marginRightMm` |
| `title` / `titleStyle` | 可选首页标题；默认居中、加粗、16pt |
| `titleHeightMm` / `titleGapMm` | 标题默认占高 10mm，距表格 4mm；无标题不占空间 |
| `dataset` / `params` | 默认 `detail` 数据集 / 模板查询参数 |
| `listOptions` | 继承列表行高、字号、重复表头、分组、小计与总计 |
| 列 / `listOptions.align` | `auto / left / center / right / justify`；`auto` 下真实数字/日期/布尔居中、文本居左 |
| 列 / `listOptions.headerAlign` / `headerStyle` | 表头独立对齐与样式，列级覆盖整表；表头字号参与真实折行与行高测量 |
| 列 `semanticRole` | auto 模式中 identifier / dimension / date / measure 居中，text 居左；显式 align 优先 |
| `listOptions.rowKey` / `revisionField` / `sourceTokenField` | 来源字段，随生成单元格的 `source` 传递；不得用显示行号替代 |
| `listOptions.headerGrid` | 重复多层合并表头（通常由 Excel 绑定生成）；列数与列宽须一致 |

非法尺寸、无可用空间或 page 固定列溢出会**同步抛错**。内容样式优先级：条件规则 → 列 `align` → 列 `style.align` → 列表 `align` → 自动类型规则。

### 宽表 vs 纸张

```ts
// 完整宽表：列数再多也不压缩，Excel 自动合并连续 Sheet
const wide = createTableTemplate({ layout: "wide", columnWidthMm: 30, columns: allColumns });

// 标准纸张：A3 横向
const paper = createTableTemplate({ paper: "a3", landscape: true, columns });
```

| 使用目标 | 配置 |
| --- | --- |
| 完整宽表预览 + 连续 Excel | 模板 `layout: "wide"`；导出无需额外配置 |
| 宽表的 Excel 另选打印纸型 | 应用配置 `xlsx: { paperSize: "a3" \| "a4" }`，只影响打印设置 |
| 按标准纸张排版预览 / PDF / 打印 | 模板 `paper` + `landscape`，保持默认 `layout: "page"` |

列很多时优先宽表，避免把所有列挤进一张纸的可用宽度。

## RenderPlan 数据模型

```ts
import { RENDER_PLAN_SCHEMA_VERSION, validateRenderPlan, type RenderPlan } from "@agile-team/mach-report";

const plan: RenderPlan = {
  schemaVersion: RENDER_PLAN_SCHEMA_VERSION,
  pages: [{
    pageWidthMm: 210, pageHeightMm: 297,
    components: [{
      kind: "text",
      leftMm: 20, topMm: 20, widthMm: 100, heightMm: 10,
      text: "报表标题"
    }]
  }]
};

const result = validateRenderPlan(plan);
if (!result.ok) throw new Error(result.errors[0]?.message ?? "报表格式错误");
```

应用可以自己生成这个 JSON（后端直接返回 RenderPlan，前端用 `PlanFetcher` 接收），也可以用模板分页器生成。渲染树统一拒绝循环引用、超过 64 层嵌套或 100 万个组件与单元格。

## 模板管理 API

| API | 用途 |
| --- | --- |
| `defineReportTemplate({ id, name, revision?, description?, template })` | 创建版本化纯 JSON 文档 |
| `parseReportTemplate(unknown)` / `serializeReportTemplate(document)` | 接收文件文本/接口 JSON / 导出可持久化文本 |
| `validateReportTemplate` / `validateReportTemplateDocument` | 返回 `{ ok, errors, warnings }`；错误带字段路径 |
| `createTemplateRegistry(documents?)` | `get / list / register / remove`，读取返回独立快照；重复 ID 默认拒绝，更新用 `register(doc, { replace: true })` |
| `diffReportTemplates` / `reviewReportTemplate` | 语义变更、字段依赖与显式样例排版检查 |
| `createLabelTemplate(...)` | 固定工业标签模板（见[工业标签](/mach/report-labels)） |

报表定义中的 `template` 可为静态模板或**异步加载函数**（接收 `{ reportId, params, signal }`）：动态模板先校验再取业务数据，每次重新读取、无隐式缓存；自动参数面板需在定义的 `params` 中声明。

## 声明式图表与可视化

- 模板 `chartBinding` 直接声明数据集、分类、度量和聚合，不必在使用侧拼图形
- 列 `visual` 提供数据条与色阶，保持原始值（Excel 数据条为静态快照）
- `/analytics` 提供交叉表、受控计算与柱/折线图元

## 相关文档

[Vue 组件](/mach/report-vue) · [参数与数据](/mach/report-data) · [输出与导出](/mach/report-export) · [工业标签](/mach/report-labels)
· 仓库文档：[复杂报表](https://github.com/ChenyCHENYU/MachReport/blob/main/docs/COMPLEX_REPORTS.md) · [设计器](https://github.com/ChenyCHENYU/MachReport/blob/main/docs/DESIGNER.md)
