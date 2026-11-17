---
outline: "deep"
description: "MachReport 输出与导出：真 xlsx 工作簿（sheetMode 连续/逐页、raw 原始值、Node 流式 writeRowsToXlsx）、PDF 字体部署与 gzip、exportAs 格式清单与保真 strict 模式。"
reviewAfter: "2027-05-16"
---

# MachReport 输出与导出

一份 RenderPlan 统一输出到预览、打印、PDF、真 `.xlsx`、逐页 PNG 和 Word 兼容 `.doc`。Vue 预览工具栏按需动态加载导出引擎；原生与 Node 从子入口调用。

> 🔍 **检索关键词**：exportAs、pdf、xlsx、excel、png、image、word、doc、html、renderPlanToXlsx、sheetMode、auto、pages、continuous、valueMode、raw、text、paperSize、sheetName、additionalSheets、maxImageBytes、writeRowsToXlsx、renderPlanToWorkbook、renderPlanToPdf、pdfFontUrl、checkPdfFont、invalidateFontCache、createFontBytesMeasurer、createCanvasMeasurer、customFontFaces、gzip、ttf、otf、fidelity、strict、warn、OutputFidelityError、onDiagnostic、unsupported-text、runLabelStream、imposeLabelSheets

## 导出格式与入口

| 格式 | 入口 | 说明 |
| --- | --- | --- |
| 预览 / 打印 | `/vue` 或 `renderPlan` | DOM；浏览器打印使用对应 `@page` |
| PDF | `/pdf` | `renderPlanToPdf(plan, options)`，毫米尺寸保留 |
| Excel | `/xlsx` | `renderPlanToXlsx`，真 `.xlsx` 工作簿 |
| 图片 | 核心异步 API | 逐页 PNG（引擎级另支持 JPEG） |
| Word | 内置 | Word 兼容 HTML `.doc`（**不是 `.docx`**） |

Vue 组件：`report.exportAs("xlsx")`（`"excel"` 等价）、`exportAs("pdf")`、`exportAs("png" | "image")`、`exportAs("word" | "doc")`、`exportAs("html")`。

## Excel 导出

### 能力矩阵

| 能力 | 支持 | 边界 |
| --- | --- | --- |
| 工作簿 | `auto` 模式按逻辑表合并 wide 分段，其余每页一张 Sheet | `pages` 强制逐页；`continuous` 要求完整列表元数据 |
| 完整宽表 | 所有列按自然宽度保留，同一逻辑表纵向连续 | 不按纸张宽度压缩或截列；多报表隔离 |
| 表格 | 表头、明细、分组、小计、总计 | 汇总已在分页时计算，不生成 Excel 公式 |
| 尺寸与合并 | 列宽、行高、`colSpan` / `rowSpan` | 越界跨度裁剪在当前网格内 |
| 字体与样式 | 字号、字体族、粗斜体、下划线、颜色、对齐、换行、底色、细边框 | 不映射旋转、透明度等 |
| 数据条与色阶 | 色阶保留底色；数据条为静态半透明绘图快照 | 不是 Excel 动态条件格式，改格值不重算；`maxDataBars` 有界 |
| 单元格值 | `text` 写显示文本；`raw` 写原始 primitive 和数字格式 | Date/对象回退显示文本，不猜数字字符串 |
| 图片 | PNG/JPEG data URI 的 Logo、图片型码图/图表可嵌入，重复媒体复用 | SVG、格内网格与不可表达几何给出诊断 |
| 打印配置 | `paperSize: auto` 识别 A3/A4/A5；wide 可显式选纸 | 纸型仅影响打印，不改列宽 |

### Node 最小示例

```ts
import { writeFile } from "node:fs/promises";
import { createTemplate, paginateTemplate } from "@agile-team/mach-report";
import { renderPlanToXlsx } from "@agile-team/mach-report/xlsx";

const { plan } = paginateTemplate(template, { detail: rows });
const { buffer, warnings } = await renderPlanToXlsx(plan, {
  valueMode: "raw",
  sheetName: (pageIndex) => `出库明细${pageIndex + 1}`
});
await writeFile("report.xlsx", new Uint8Array(buffer));
```

### 配置项

| 配置 | 取值 | 说明 |
| --- | --- | --- |
| `sheetMode` | `"auto"`（默认）/ `"pages"` / `"continuous"` | wide 列表连续导出；全部逐页；强制连续（不明混合布局报错） |
| `valueMode` | `"text"` / `"raw"` | 未指定时 wide 为 raw、普通页面为 text |
| `paperSize` | `"auto"` / `"a3"` / `"a4"` / `"a5"` | 仅设置打印纸型 |
| `sheetName` | `(pageIndex) => string` | 需唯一并满足 Excel 命名规则；连续表默认用清理后的标题 |
| `additionalSheets` | 声明式附加表 | 单次编码写入说明表/原始数据表 |
| 图片预算 | `maxImageBytes` / `maxTotalImageBytes` / `maxImages` / `maxImagePixels` 等 | 超限始终失败 |

**raw 原始值**：分页列表在 `GridCell.value` 保留原始数值、字符串、布尔和 null；0 保持数值 0、false 保持布尔、`"00123"` 保持文本；百分比底层值为分数（0.899 + `0.00%` 显示 89.90%）。不要把订单号、长整型 ID、前导零编码自动转数字。

应用级一次配置，所有预览实例沿用：`defineMachReportConfig({ defaults: { xlsx: { valueMode: "raw", paperSize: "auto" } } })`。

### Node 流式数据导出

`/xlsx/node` 的 `writeRowsToXlsx` 直接消费 `AsyncIterable` 业务行，流式写出，不复刻页面布局；`columns[].align` 支持 `auto/left/center/right/justify`。

### 需要修改工作簿时

```ts
const { workbook } = await renderPlanToWorkbook(plan);   // 不编码
const dataSheet = workbook.addWorksheet("原始数据");
// 调整后统一写出一次
```

## PDF 导出

### 字体：一次配置

中文 PDF 需部署覆盖实际报表文字的字体并配置 `pdfFontUrl`（MachReport 不自动下载公共字库）：

```ts
defineMachReportConfig({ defaults: { pdfFontUrl: "/fonts/report-v1.otf" } });
```

- 有效 TTF / OTF 等 fontkit 支持的单字体文件；URL 直接返回字体字节（不能是 HTML 回退）
- 纯西文报表可设 `""` 使用 PDF 内置字体（无法覆盖中文）
- 完整中文字库可无损 gzip：直接配置 `.ttf.gz` / `.otf.gz` URL，包内按 gzip 魔数识别并解压，校验/缓存/嵌入仍用完整字节
- 更换字库推荐带版本的 URL；必须沿用同一 URL 时用 `invalidateFontCache(url)`（`/pdf`）清理字节缓存
- 自定义字体**完整嵌入**（不经子集化，避免中文 OTF 丢失字形映射）；缺字或页面渲染错误会阻止残缺文件下载

### 轻量预检

组件加载有效页面且 PDF 入口显示时，自动发起 HEAD 检查（不下载字体正文、不加载 PDF 引擎）。状态 `state.pdfFont.status`：`unchecked / checking / available / disabled / unverified（不支持 HEAD）/ error`；主动检查用 `report.checkPdfFont()`。

### 前后端共用字体度量

分页与输出应传入同一测量器，保证折行一致：

```ts
import { createFontBytesMeasurer, renderPlanToPdf } from "@agile-team/mach-report/pdf";

const faces = { regular: regularBytes, bold: boldBytes };
const measurer = createFontBytesMeasurer(faces);          // Node：按字体 advance 度量，不依赖 DOM
const { plan } = paginateTemplate(template, datasets, { measurer });
const result = await renderPlanToPdf(plan, { customFontFaces: faces, measurer, signal });
```

浏览器侧对应 `createCanvasMeasurer`。直接调用 `renderPlanToPdf` 应检查结果的 `unsupportedTextCount`、`pageErrors` 和 `fidelityWarnings`。

## 保真模式与图片预算

`renderPlanToPdf(plan, { fidelity: "strict" })` 对运行期缺字、坏图片、组件失败及已识别版式降级抛 `OutputFidelityError`；默认 `warn` 保留文件和诊断（适合显式人工检查，自动归档建议 strict）。稳定错误码如 `unsupported-text` / `invalid-image-data` / `component-render-failed` / `output-degraded` 通过 `onDiagnostic` 通知。`ImageMediaOptions`（`/pdf` 与 `/xlsx` 导出）统一约束单图/总量字节、像素、尺寸与数量，重复媒体按身份去重。

Canvas/PDF 支持文字与单元格的混合字体、颜色、粗斜体、下划线、片段背景，递归绘制并裁切格内子组件；Canvas 尚未实现透明度/旋转变换（宽松模式报告，严格模式拒绝）。

## 批量生成

`/server` 的 `runLabelStream()` 支持大量异步标签分批交付：等待归档回执后消费下一块，不缓存全部文件；核心 `imposeLabelSheets()` 提供整纸拼版。详见 [Node Runtime](/mach/report-server) 与 [工业标签](/mach/report-labels)。

## 相关文档

[Vue 组件](/mach/report-vue) · [模板 DSL](/mach/report-template) · [编辑与填报](/mach/report-editing)
· 仓库文档：[Excel 导出](https://github.com/ChenyCHENYU/MachReport/blob/main/docs/EXCEL.md) · [PDF 字体](https://github.com/ChenyCHENYU/MachReport/blob/main/docs/PDF.md) · [交付](https://github.com/ChenyCHENYU/MachReport/blob/main/docs/DELIVERY.md)
