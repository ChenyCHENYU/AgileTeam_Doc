---
outline: "deep"
description: "MachReport Vue 组件参考：MachReportPreview / ReportPreview 完整 Props、事件、ref 方法，useMachReport 控制句柄与只读 state，PlanFetcher 数据源与配置中心 defineMachReportConfig。"
reviewAfter: "2027-05-16"
---

# MachReport Vue 组件

`/vue` 入口提供预览组件、插件、配置中心与父页面控制句柄；要求 Vue `^3.2.47`，样式 `import "@agile-team/mach-report/vue/style.css"` 引入一次。

## 组件 Props

```vue
<MachReportPreview
  report-id="outbound-order"
  :params="{ id: orderId }"
  :param-defs="filters"
  height="70vh"
  @loaded="onLoaded"
  @error="onError"
/>
```

| 属性 | 作用 |
| --- | --- |
| `reportId` | 报表 ID，支持字符串、逗号分隔字符串或数组；多 ID 按顺序合并页 |
| `params` | 项目查询参数，传给数据源；宿主更新时同步参数面板 |
| `fetcher` | 当前组件的数据源，优先于插件注入（组件 → 插件 `fetcher` → 插件 `reports`） |
| `paramDefs` / `showParams` | 自动使用数据源的模板参数；prop 优先，`[]` 禁用自动面板定义；`showParams` 仅控制显隐 |
| `height` / `autoLoad` | 容器高度 / 自动加载；手动模式在 ID、参数或数据源变化时也取消并清理旧结果 |
| `showExport` / `showPrint` / `showPdfWindow` | 工具栏操作显隐 |
| `gapPx` / `messages` / `preset` | 页间距、文案与配置预设 |
| `editable` | 默认 `false`；`true` 本地双击编辑，或 `ReportEditingOptions` 配置权限/校验/保存（见[编辑与填报](/mach/report-editing)） |
| `excelImport` | 默认 `false`；`true` 显示 Excel 模板导入入口，或传 `ExcelImportOptions` |
| `toolbar` | 工具偏好上限：`{ search, thumbnails, zoom, editing, excelImport, exportFormats }`；设置不能绕过宿主限制 |
| `interaction` | 如 `{ calculations: true }` 默认启用只读选区计算 |
| `emptyState` | `true` 或 `{ title, description }`：有表头但业务行为空时显示 SVG 空态 |
| `theme` | 如 `{ emptyAccent: "#79a7e8" }` 覆盖空态强调色；只影响预览外壳 |
| `assets` | 资源适配器（如标签码图 `createCodeAssetRenderers`） |

## 组件事件

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `loaded` | `pageCount` | 加载完成 |
| `error` | `message, { code, cause? }` | `code` 可为 `param` / `fetch` / `validate` / `render` / `pdf` / `print` / `export` / `edit` / `import` / `config` |
| `warning` | `message` | 分页/导出告警 |
| `cell-edit` | `edit` | 编辑保存成功（逐格） |
| `template-import` | `result` | Excel 模板导入成功 |
| `preferences-change` | 当前实际启用的工具状态 | 宿主联动设置面板 |

## 组件 ref 方法

`reload()`、`print()`、`exportAs(format)`、`openPdfWindow()`、`gotoPage(page)`、`setParams(values, { reload? })`、`checkPdfFont()`。`exportAs` 支持 `html` / `pdf` / `xlsx`（`excel` 等价）/ `png`（`image`）/ `word`（`doc`，Word 兼容 HTML）；引擎级图片导出另支持 JPEG。编辑和导入另有 `getPlan()`、`getChanges()`、`importExcel(input, options?)`。

## useMachReport() 控制句柄

```ts
const report = useMachReport();
// 模板绑定 :ref="report.ref"
const { state } = report;   // 保持响应性，模板/computed 中直接读字段
await report.reload();
await report.exportAs("xlsx");
```

`state` 为只读响应式对象：`loading`、`hasPlan`、`pageCount`、`currentPage`、`exporting`、`printing`、`canExport`、`canPrint`、`error`、`pdfFont`、`editing`、`saving`、`importing`、`dirty`（本次计划有成功修改，不代表后台已保存）、`pendingLocalChanges`、`task`、`reportIds`、`params`、`diagnostics`。例如 `state.canExport` 直接驱动外部按钮。

## 数据源：三种接入

### 1. reports 注册（推荐）

```ts
app.use(machReportPlugin, {
  reports: {
    outbound: defineReport({
      template,                                    // 或异步加载函数
      load: ({ params, signal }) => orderApi.report(params, { signal }),
      mapData: (data) => ({ detail: data.items })  // 可选：映射到模板数据集
    })
  }
});
```

接口已返回数据集时直接 `load`；静态数据用 `{ template, datasets }`；固定标签用 `defineLabelReport`。

### 2. PlanFetcher（后端返回 RenderPlan）

```ts
type PlanFetcher = (input: {
  reportIds: string[];
  params: Record<string, string>;
  signal?: AbortSignal;
  onWarning?: (message: string) => void;
}) => Promise<RenderPlan>;

app.use(machReportPlugin, { fetcher: myPlanFetcher });
```

可选 `getParamDefs(reportIds)` 提供参数元数据。全部数据源缺失时组件显示配置错误，不发出隐式网络请求。

### 3. 本地 fetcher

`createLocalFetcher({ [reportId]: { template, datasets } })`，与远程 PlanFetcher 同一接口；请求工具 `createFetchRequest({ baseUrl, headers, credentials, timeoutMs })`。

## 配置中心

```ts
const config = defineMachReportConfig({
  defaults: {
    gapPx: 18,
    pdfFontUrl: "/fonts/NotoSansSC-Regular.ttf",
    showParams: true,
    editable: false,
    excelImport: false,
    preview: { overscanPages: 1, searchDebounceMs: 200 },   // 0–10 页 / 0–2000ms
    xlsx: { valueMode: "raw", paperSize: "auto" },
    messages: { title: "业务报表" },
    loadParamOptions   // 统一注册远程参数选项加载器
  },
  presets: { previewOnly: { showExport: false, showPrint: false, showPdfWindow: false } }
});

app.use(machReportPlugin, { fetcher, config });
```

优先级：**组件属性 → 路由级 `provideMachReportConfig(overlay)` → preset → 应用 defaults → 内置缺省**。`preview`、`xlsx`、`theme`、`messages` 均按字段继承。

## 预览交互

- 分页与跳页在右下方；导出格式收在一个菜单；搜索、字段目录和缩放各自成组
- `Ctrl/Cmd + F` 内容搜索：显示检索状态与命中数，Enter / Shift+Enter 切换命中，Esc 关闭
- 字段目录：中文列名、字段标识与章节分组同层弹层，↑↓ 选择、Enter 定位
- 「设置」分常规 / 工具 / 高级三页；支持方向键切页、焦点约束和 Esc 关闭
- 大报表正文与缩略图按可见窗口渲染；`createReportSource()` 异步分页在页面间让出执行，取消可及时生效

## 相关文档

[模板 DSL](/mach/report-template) · [参数与数据](/mach/report-data) · [编辑与填报](/mach/report-editing) · [输出与导出](/mach/report-export)
· 仓库文档：[交互](https://github.com/ChenyCHENYU/MachReport/blob/main/docs/INTERACTION.md) · [项目接入](https://github.com/ChenyCHENYU/MachReport/blob/main/docs/INTEGRATION.md)
