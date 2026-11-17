---
outline: "deep"
description: "MachReport 工业标签：ReportLabelStudio 标识工作台、createLabelTemplate 固定标签模板、字段绑定规则、多版/份数/预算、QR 与 Code128/Code39/EAN 编码与 createCodeAssetRenderers。"
reviewAfter: "2027-05-16"
---

# MachReport 工业标签

MachReport 的固定标签与宽表共用模板、渲染计划、数据来源和输出管线，适用于物料标签、包装标识、工艺卡、合格证及相邻的正反两版。

> 🔍 **检索关键词**：ReportLabelStudio、createLabelTemplate、defineLabelReport、createCodeAssetRenderers、rows、schema、rowKey、fields、semanticRole、identity-field、brand、preset、material、paired、warehouse、modelValue、show-save、prepare、guardChanges、preview、print、canPrint、LabelStudioController、copies、pages、repeat、dataset、binding、field、format、prefix、suffix、emptyText、qrcode、barcode、errorCorrection、Code128、Code39、EAN、dpi、maxPages、resolvePlanAssets、data-contract、inspectReportTemplateCompatibility

## ReportLabelStudio 标识工作台

图示"材料标识工作台"是 `/designer` 入口的包内组件，按需加载（普通报表不加载标签编码器）：

```vue
<script setup lang="ts">
import { ReportLabelStudio } from "@agile-team/mach-report/designer";

const rows = [{ id: "H1", heat: "26W007", grade: "S304LE", weight: 0 }];
const schema = {
  rowKey: "id",
  fields: [
    { field: "id", type: "text" as const },
    { field: "heat", label: "炉号", type: "text" as const, semanticRole: "identifier" as const },
    { field: "grade", label: "钢种", type: "text" as const },
    { field: "weight", label: "重量（kg）", type: "number" as const,
      format: { kind: "number" as const, digits: 3 } },
  ],
};
</script>

<template>
  <ReportLabelStudio :rows="rows" :schema="schema" title="材料标识" identity-field="id"
    :brand="{ name: 'MACH STEEL', tagline: '材料追溯' }" />
</template>
```

### 工作台能力

- 缺省打开 **80×55mm 双版成品标识**；左侧可切换单面物料卡、双版标识或 **100×60mm 仓储标签**
- 从业务字段目录选取最多 5 个显示字段（默认优先契约中声明的名称、维度和带单位的度量）
- 三款成品样式统一采用 **QR**，直接编码字段原值（支持中文业务标识）；需要 Code128 / Code39 / EAN 时在"添加内容 → 条形码"显式选择码制
- 点击"设计标签"进入可操作画布：顶部"添加内容"追加说明文字、字段、二维码或图片；支持撤销/重做、吸附、多选对齐
- `v-model` 接收/提供模板文档；`save` 可选回调沿用设计器修订契约；`show-save="false"` 收起内层保存
- 组件 ref 的 `LabelStudioController`：`mode`、`canPrint`、`preview()`（先准备有效草稿再进入成品预览）、`print()`、`guardChanges()`、`prepare()`
- 预览底部显示当前记录、业务键与版面名称，相邻按钮跳转上一条/下一条；`interaction.navigation: false` 可关闭
- A4 拼版按物理尺寸计算：80×55mm 为 2×4，100×60mm 为 1×4

## createLabelTemplate：固定标签模板

```ts
import { createLabelTemplate, createReportSource, defineLabelReport } from "@agile-team/mach-report";
import { createCodeAssetRenderers } from "@agile-team/mach-report/codes";

const template = createLabelTemplate({
  dataset: "materials", rowKey: "id",   // 默认 80 × 55 mm、0 页边距
  components: [
    { kind: "text", leftMm: 4, topMm: 4, widthMm: 50, heightMm: 6,
      binding: { field: "grade" }, style: { fontSize: 12 } },
    { kind: "qrcode", leftMm: 50, topMm: 18, widthMm: 25, heightMm: 25,
      binding: { field: "id" }, code: { errorCorrection: "M" } }
  ]
});

const fetcher = createReportSource({
  label: defineLabelReport({
    template,
    load: ({ signal }) => loadMaterials(signal)   // 宿主请求函数，直接返回记录数组
    // 静态数据用 rows: materials；可选 dataSchema: materialContract
  })
});

const assets = { assetRenderers: createCodeAssetRenderers({ dpi: 203 }) };
// Vue：<ReportPreview report-id="label" :fetcher="fetcher" :assets="assets" />
```

`defineLabelReport` 自动用 `template.repeat.dataset` 包装数组与单个 `dataSchema`；`rows` 与 `load` 二选一。面向静态固定标签模板和单数据集；动态模板、多数据集用 `defineReport`。

## 绑定规则

| 组件 | 绑定结果 |
| --- | --- |
| `text` | 当前记录字段 → 统一格式化后的文本 |
| `image` | 当前字段 → PNG/JPEG base64 data URL；空值不输出图片 |
| `qrcode` / `barcode` | 当前字段 → `code.value` → 真实 PNG 码图 |

`binding: { field, format?, prefix?, suffix?, emptyText? }` 使用与列表相同的声明式格式。`null` / `undefined` / 空字符串使用 `emptyText`；真实 `0`、`false` 和字符串前导零保留。

::: warning 绑定边界
字段名按记录的自有属性读取，`a.b` 是字面字段名而非路径。不执行 JavaScript、访问器或字符串表达式；缺字段、对象值或非有限数字明确失败——应先在宿主数据映射中整理成标量。动态绑定必须声明模板级 `repeat`，避免一个模板误读另一条物料。
:::

## 多版、份数与预算

```ts
const template = createLabelTemplate({
  dataset: "materials", rowKey: "id", widthMm: 80, heightMm: 55,
  copies: { field: "copies" },        // 也可为固定整数，默认 1
  pages: [
    { meta: { title: "产品标识" }, components: front },
    { meta: { title: "仓储识别" }, components: back }
  ]
});
```

- 输出顺序是 **记录 → 份数 → 模板页**，同一物料的一份正反两版相邻
- 页元数据保留数据集、行索引、稳定行键和副本索引，便于审计追溯
- 空数据生成零页，不生成空白标签
- 每条份数必须是 1–1000 的整数；默认限制 10000 物理页（`maxPages` 可调）
- 组件、网格行、全部槽位按展开后总成本限制 250000；大量打印建议分批（逐页生成或服务端任务管线）
- 支持预算与 `AbortSignal`；记录展开在分配页面前检查预算

## 编码与实际输出

`/codes` 内置 **QR、Code 128、Code 39、EAN-13、EAN-8**。`code` 配置码制、QR 纠错等级、静区和条码可读文字；编码器校验内容、物理区域、像素预算与静区，输出带白色背景的 PNG 供 DOM / PDF / Canvas / Excel 复用，**不会把假码作为成功结果**。

```ts
import { paginateTemplate, resolvePlanAssets } from "@agile-team/mach-report";
import { renderPlanToPdf } from "@agile-team/mach-report/pdf";

const { plan } = paginateTemplate(template, { materials }, { maxPages: 500 });
const resolved = await resolvePlanAssets(plan, { ...assets, signal });
const pdf = await renderPlanToPdf(resolved.plan, { customFontBytes, signal });
```

编码预算：默认每次资源准备最多生成 1000 张新码图、单图 32MiB、总量 128MiB、时长 30 秒；编码是同步 CPU 步骤，取消在执行前后生效；批量任务应使用 Worker 或服务端。

::: tip 打印验收
PDF 页面保留真实毫米尺寸；浏览器打印在驱动中选择同规格标签纸和 100% 比例，先核对偏移、裁切和扫码。连续输出两版不代表设备自动翻面；实体设备仍需试打和扫码验收。
:::

## 验收清单

- 用两条不同记录验证值、零值、前导零、二维码和条码内容相符
- 多版、多份按相邻顺序输出；空数据不生成标签
- 缺字段、非法码、文字溢出、超预算及取消均明确反馈，不输出不完整标签
- PDF MediaBox 与纸张毫米一致；用目标字体、打印机和扫码设备完成实样校准
- 模板保存后重新打开，字段绑定、尺寸和编码选项保持不变

## 相关文档

[输出与导出](/mach/report-export) · [模板 DSL](/mach/report-template) · [Node Runtime](/mach/report-server)
· 仓库文档：[工业标签](https://github.com/ChenyCHENYU/MachReport/blob/main/docs/LABELS.md) · [设计器](https://github.com/ChenyCHENYU/MachReport/blob/main/docs/DESIGNER.md)
