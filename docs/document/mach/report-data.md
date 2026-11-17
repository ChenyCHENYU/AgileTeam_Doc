---
outline: "deep"
description: "MachReport 参数与数据：ReportParamDef 参数类型值契约表（日期范围/多选/级联/数值范围）、远程搜索与联动 loadParamOptions、DatasetContract 数据集契约、validateReportParams 前后端复用与 reportDateDefault 业务日期。"
reviewAfter: "2027-05-16"
---

# MachReport 参数与数据

参数定义保存在 `ReportTemplate.params` 中。预览自动生成表单，浏览器、Worker 与服务端复用核心参数校验；使用侧只传模板与取数函数，不维护第二份表单和规则。

## 参数类型与值契约

`params` 是 `Record<string, string>`——日期不转 JavaScript Date、不隐式转换时区、不补齐不完整日期。所有上下界包含边界；可选参数可完全清空。

| `type` | 接口值 | 控件与约束 |
| --- | --- | --- |
| `text`（或省略） | 文本字符串 | Unicode 字符数量 `minLength / maxLength` |
| `number` | 有限数字的字符串 | `min / max` 为有限数字；`typedValues` 中转换为数字 |
| `date` | `YYYY-MM-DD` | 严格有效日历日期 |
| `month` / `year` | `YYYY-MM` / `YYYY` | 月份 01–12 / 四位年份 0001–9999 |
| `dateRange` | `YYYY-MM-DD/YYYY-MM-DD` | 两端完整、真实且有序；允许同一天 |
| `select` | 已选选项的 `value` | 固定 `options` 或远程 `optionsSource` |
| `multiSelect` | JSON 字符串数组，如 `["YTS0","YTS1"]` | 去重、`minItems / maxItems`，最多 100 项 |
| `cascader` | JSON 路径，如 `["YT","EAF"]` | 完整父子叶节点路径，最多 16 层 |
| `numberRange` | JSON 数字范围，如 `[0,150]` | 两端有限、有序；`typedValues` 为数值二元组 |

```ts
import { createReportSource, type ReportParamDef } from "@agile-team/mach-report";

const params: ReportParamDef[] = [
  { field: "month", label: "月份", type: "month", required: true },
  { field: "year", label: "年度", type: "year", min: "2024", max: "2026" },
  { field: "period", label: "统计期间", type: "dateRange",
    min: "2026-01-01", max: "2026-12-31", defaultValue: "2026-10-01/2026-10-20" },
  { field: "plant", label: "厂别", type: "select", required: true,
    options: [{ label: "厂 A", value: "A" }], defaultValue: "A" },
  { field: "area", label: "区域", type: "select", required: true,
    optionsSource: "production.areas", dependsOn: ["plant"] },
];

const fetcher = createReportSource({ production: { template: { ...template, params }, load } });
```

`createReportSource` 在调用业务取数前合并默认值并校验；非法定义、默认值、类型或范围不会通过空表伪装成功。首次缺少必填条件时显示填写引导并等待查询；提交后标明具体字段并聚焦首个问题项。

### 复合值工具与业务日期

```ts
import {
  formatReportParamSelection, parseReportParamSelection,
  formatReportCascaderPath, parseReportCascaderPath,
  formatReportNumberRange, parseReportNumberRange, reportDateDefault,
} from "@agile-team/mach-report";

const values = {
  plants: formatReportParamSelection(["YTS0", "YTS1"]),
  area: formatReportCascaderPath(["YT", "EAF"]),
  weight: formatReportNumberRange([0, 150]),
  date: reportDateDefault({ preset: "yesterday", now: Date.now(), timeZone: "Asia/Shanghai" }),
};
```

parser 对无效值返回 `undefined`，formatter 抛错。**不要 CSV 拆分、丢弃前导零或把路径拼成斜杠字符串**。`reportDateDefault` 是纯日历求值（`today / yesterday / month-start / month-end`），必须传明确 `now` 与 IANA `timeZone`，可选 `offsetDays`（-3660 至 3660）；不偷偷使用浏览器或服务器时区。

## 远程搜索与联动选择

模板只增加两个可序列化字段：固定选项 `options`、远程选项 `optionsSource`（互斥），依赖字段 `dependsOn`。项目注册一个 `loadParamOptions` 接入现有 API：

```ts
import type { ReportParamOptionsLoader } from "@agile-team/mach-report/vue";

const loadParamOptions: ReportParamOptionsLoader = async ({ source, query, params, limit, signal }) => {
  // 由宿主的可信来源白名单分派；禁止直接把模板 source 当 URL 请求
  return dictionaryApi.search({ source, query, params, limit }, { signal });
  // 返回 [{ value: "EAF-1", label: "电炉一线" }]，最多 limit 项
};
```

```vue
<ReportPreview report-id="production" :fetcher="fetcher" :load-param-options="loadParamOptions" />
<!-- 或统一注册：defineMachReportConfig({ defaults: { loadParamOptions } }) -->
```

行为边界：

- 请求只包含当前字段声明的依赖参数快照；改上级时一次清空全部下级，缺少上级不发请求
- 搜索输入防抖 180ms；只有选中返回选项才改变参数值，搜索文字不进入报表查询
- 每字段最多呈现 100 项；超量/重复/非法结果显示失败状态，不静默截断
- 请求切换、关闭、依赖变动和卸载取消旧请求；15 秒未完成允许重试
- 缓存限当前字段实例、最多 32 条、60 秒；账号/租户变化应替换 loader
- 未知 ID 显示原始接口值，插件不推测名称

## 数据集契约（DatasetContract）

`ReportDefinition.dataSchema` 按数据集名声明字段契约：`text / number / boolean / date / decimal`、必填、可空、枚举、数值/长度范围、语义与单位；`rowKey` 验证非空且唯一。`decimal` 保留精确小数文本，数值字符串不自动转换。

```ts
import { columnsFromContract, datasetJsonSchema, type DatasetContract } from "@agile-team/mach-report";

const contract: DatasetContract = {
  rowKey: "id",
  fields: [
    { field: "heatNo", type: "text", required: true, semanticRole: "identifier" },
    { field: "weight", type: "decimal", unit: "吨" },
  ]
};
const template = createTableTemplate({ columns: columnsFromContract(contract) });
const schema = datasetJsonSchema(contract);   // 供后端核对 DTO
```

- `columnsFromContract(contract, overrides?)` 自动生成表头/语义；`datasetJsonSchema` 生成 JSON Schema
- 字段还可声明 `description`、`unit`、`missingMeaning`、`format`、`aggregation`（`"none"` 表达非可加指标）、`calculation: { description, dependsOn }`
- 唯一主键、权限和事务仍需服务端执行；契约是严格校验，不是自动修复

## Provider 与取数

统一 `ReportProvider` 规范 `query / save / export / templates` 可选能力；旧 `load / mapData / fetcher` 继续支持：

```ts
provider: {
  query: async ({ params, signal }) => ({
    datasets: await salesApi.query(params, { signal }),   // 返回 { detail: [...] }
    revision: "业务接口返回的修订号"                        // 可选，用于编辑 CAS
  })
}
```

数据应覆盖所需报表范围：普通列表接口只返回当前分页时，只能生成该批数据的报表；完整导出需后端提供完整结果或受控取数。

## 前后端复用校验

核心校验没有 Vue、DOM 或数据连接依赖，可在服务端执行同一份参数定义：

```ts
import { validateReportParams, parseReportDateRange, reportParamsJsonSchema } from "@agile-team/mach-report";

const checked = validateReportParams(definitions, request.params);
if (!checked.ok) return { code: "params", issues: checked.issues };

const range = checked.values.period ? parseReportDateRange(checked.values.period) : undefined;
const schema = reportParamsJsonSchema(definitions);   // JSON Schema Draft 2020-12
```

`validateReportParams` 返回 `{ ok, values, typedValues, issues }`（`values` 是兼容字符串 wire，`typedValues` 与 Schema 对应）；失败抛 `ReportParamValidationError`。不要用 `new Date()` 拆解日期参数，以免本地时区改变日期。

## 数据工作流工具

| 工具 | 用途 |
| --- | --- |
| `compileReportPredicate` / `evaluateReportPredicate` | 共享组合条件 |
| `validateReportDataset` / `assertReportValidation` | 整批候选检查 |
| `createReportPrefill` / `reportPrefillInputs` | 安全预填：只补空白、应用前冲突检查 |
| `compareReportData` | 两份快照按键增删变化、精确差额/容差/比率（期间对比） |
| `createReportChartData` | 同源有界聚合图表数据 |

## 相关文档

[Vue 组件](/mach/report-vue) · [模板 DSL](/mach/report-template) · [编辑与填报](/mach/report-editing) · [Node Runtime](/mach/report-server)
