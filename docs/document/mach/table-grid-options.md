---
outline: "deep"
description: "MachTable GridOptions 配置参考：数据与身份、布局主题密度、列交互、选择编辑剪贴板、树分组详情、分页与远程数据、Worker 处理器、状态持久化、国际化与安全的完整配置项表。"
reviewAfter: "2027-05-16"
---

# MachTable GridOptions 配置

`GridOptions<TData>` 是 Core、Vue 与 React 的统一配置契约。Vue 模板使用 kebab-case，React/TypeScript 使用 camelCase。建议用 `defineGridOptions<T>()` 或 `satisfies GridOptions<T>` 保留完整类型推断。

> 🔍 **检索关键词**：columnDefs、rowData、rowKey、rowNumber、defaultColDef、columnTypes、initialState、size、theme、columnLayout、enableColumnResize、domLayout、maxBodyHeight、rowStyleRules、stripedRows、multiSort、manualSorting、manualFiltering、quickFilterText、advancedFilterModel、rowSelection、editType、singleClickEdit、rowEditValidator、undoStackSize、enableRangeSelection、fillHandle、contextMenu、treeData、childrenKey、loadTreeChildren、masterDetail、detailRowHeight、pinnedTopRowData、pagination、datasource、datasourceMode、blockSize、infiniteBufferRows、maxBlocksInCache、dataProcessor、persistence、loading、error、watermark、showSummary、statusBar、locale、suppressClipboard

```ts
const options = defineGridOptions<Order>({
  rowKey: "id",
  columnDefs,
  rowData,
  columnLayout: "fit"
});
```

## 数据与身份

| 配置 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `columnDefs` | `(ColDef<T> \| ColDefGroup<T>)[] \| null` | `[]` | 列与分组表头定义 |
| `rowData` | `T[] \| null` | `[]` | 本地行数据；与 `datasource` 不同时使用 |
| `rowKey` | `FieldPath<T> \| (row) => string \| number` | 自动 ID | 稳定业务主键；编辑、选择保持、事务、树和远程数据强烈建议提供 |
| `rowNumber` | `boolean` | Vue/React `true`，Core `false` | 自动序号列；关闭不影响显式 `indexColumn()` |
| `defaultColDef` | `Partial<ColDef<T>>` | 内置默认列 | 全列默认值 |
| `columnTypes` | `Record<string, Partial<ColDef<T>>>` | `{}` | 通过 `colDef.type` 复用的语义列类型 |
| `initialState` | `GridState` | — | 列与首批数据就绪后原子恢复的 v2 状态 |

`rowKey` 支持点路径和派生函数：`rowKey: "identity.id"` 或 `rowKey: (row) => \`${row.tenantId}:${row.id}\``。返回值必须稳定、非空且在整个数据集唯一。

## 布局、主题与密度

| 配置 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `"compact" \| "normal" \| "large"` | `"normal"` | 联动字号、行高和间距 |
| `theme` | `"light" \| "dark" \| "auto"` | `"light"` | 明暗主题；`auto` 跟随系统 |
| `rowHeight` / `headerHeight` | `number` | 随密度 | 行高 / 单层表头高度 |
| `getRowHeight` | `(params) => number` | — | 可变行高 |
| `rowBuffer` | `number` | `8` | 视口上下预渲染行数 |
| `columnLayout` | `"auto" \| "normal" \| "fit"` | `"auto"` | 少列按基准比例铺满，多列保留基准横滚；`normal` 纯内容布局，`fit` 持续填满 |
| `enableColumnResize` | `boolean` | `false` | 鼠标、触控、双击和键盘列宽调整 |
| `domLayout` | `"normal" \| "autoHeight"` | `"normal"` | 自动高度只用于小型本地表 |
| `maxBodyHeight` | `number` | 未设上限 | 自动高度模式下表体像素上限，超过后虚拟滚动 |
| `rowStyleRules` | `RowStyleRule<T>[]` | `[]` | 条件整行颜色，首条命中 |
| `stripedRows` / `showCellBorders` | `boolean` | `false` | 斑马纹 / 纵向单元格边框 |
| `className` | `string` | `""` | Core 根元素附加类名 |

::: warning 高度要求
默认虚拟布局的宿主必须有明确高度。`autoHeight` 用于本地数据，不能与 `datasource` 混用。空态、加载态和错误态预留 180px 最小展示空间（`--mach-overlay-min-height` 可覆盖）。
:::

## 列交互

| 配置 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `columnMenu` | `boolean` | `false` | 表头排序、固定、宽度和显隐菜单 |
| `multiSort` | `boolean` | `true` | Shift 叠加多列排序 |
| `manualSorting` / `manualFiltering` | `boolean` | `false` | 只更新模型和事件，由服务端执行 |
| `quickFilterText` | `string \| null` | `null` | 跨列快速搜索 |
| `advancedFilterModel` | `AdvancedFilterModel \| null` | `null` | 可序列化 AND/OR/NOT 表达式树 |
| `aggFuncs` | `Record<string, (values) => unknown>` | 内置 | 自定义聚合函数 |

## 选择、编辑和剪贴板

| 配置 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `rowSelection` | `"none" \| "single" \| "multiple"` | `"none"` | 行选择模式 |
| `editType` | `"cell" \| "fullRow"` | `"cell"` | 单元格或原子整行编辑 |
| `editableIndicator` | `"hover" \| "always" \| "none"` | `"hover"` | 可编辑铅笔提示策略 |
| `singleClickEdit` | `boolean` | `false` | 单击开始编辑 |
| `rowEditValidator` | `(params) => result \| Promise<result>` | — | 整行跨字段校验 |
| `undoStackSize` | `number` | `100` | 撤销栈容量；`0` 关闭 |
| `enableRangeSelection` | `boolean` | `false` | Excel 式单元格范围选择 |
| `fillHandle` | `boolean` | `true` | 范围填充柄 |
| `suppressClipboard` | `boolean` | `false` | 禁用复制、剪切和粘贴 |
| `contextMenu` | `boolean` | `false` | 内置右键菜单 |
| `getContextMenuItems` | `(params) => items \| null` | 内置项 | 自定义菜单 |
| `flashCells` | `boolean` | `true` | 值变化后的短暂高亮 |

## 树、分组、详情和固定行

| 配置 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `treeData` | `boolean` | `false` | 树数据模式 |
| `childrenKey` | `string` | `"children"` | 本地子节点字段 |
| `isTreeRowExpandable` | `(params) => boolean` | — | 标记可远程展开节点 |
| `loadTreeChildren` | `async ({ data, node, api, signal }) => rows` | — | 可取消、去重的懒加载 |
| `autoCheckedChildren` | `boolean` | `true` | 树选择父子联动 |
| `defaultExpandAll` | `boolean` | `false` | 初始展开全部 |
| `masterDetail` | `boolean` | `false` | 主从详情 |
| `detailRowHeight` | `number` | `240` | 详情行高度 |
| `detailRowRenderer` | `(params) => RenderOutput` | — | 详情 renderer |
| `isRowExpandable` | `(params) => boolean` | 全部 | 详情行展开条件 |
| `applyRowDrag` | `boolean` | `true` | 行拖动后自动应用重排 |
| `pinnedTopRowData` / `pinnedBottomRowData` | `T[] \| null` | `[]` | 顶部/底部固定行 |

## 分页与远程数据

| 配置 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `pagination` | `boolean \| PaginationConfig` | `true` | 默认客户端分页，每页 20 条；`datasource` 无限模式自动关闭 |
| `datasource` | `GridDatasource<T>` | — | 无限/随机访问数据源 |
| `datasourceMode` | `"sequential" \| "block"` | `"sequential"` | 顺序追加或随机块模型 |
| `blockSize` | `number` | `100` | 每块行数 |
| `infiniteBufferRows` | `number` | `40` | 顺序模式预取阈值 |
| `maxBlocksInCache` | `number` | `12` | 随机块 LRU 容量 |
| `datasourceMaxConcurrentRequests` | `number` | `4` | 活动请求上限 |
| `blockPrefetch` | `number` | `1` | 相邻块预取半径 |
| `datasourceRowCount` | `number` | — | 首次响应前的已知总量 |
| `datasourceRetryCount` / `datasourceRetryDelay` / `datasourceRetryJitter` | `number` | `2` / `300` / `0.15` | 自动重试次数 / 首次退避毫秒 / 抖动比例 |
| `asyncTransactionWaitMillis` | `number` | `16` | 异步事务合并窗口 |

::: tip 选型建议
普通 B 端请求分页优先使用 `/workflows` 的 `useMachTableQuery()`；百万级可跳转长列表再选 `datasourceMode: "block"`。
:::

## 大型本地数据处理

| 配置 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `dataProcessor` | `GridDataProcessor<T> \| (() => GridDataProcessor<T>)` | — | 单表独占的异步过滤/排序处理器，或零参工厂 |
| `dataProcessorMinRows` | `number` | `5000` | 启用 Processor 的最小行数 |

处理器实现 `process(request): Promise<{ rowIds: readonly string[] }>`，接收稳定 ID、原始记录、列字段、过滤/排序模型及 `signal`。仅达到行数阈值且需要本地过滤/排序时启用；树、分组和主从详情使用原有管线。Processor 失败会安全回退主线程；Worker helper 位于 `/worker` 子入口。**不要在多张表之间复用同一个 processor。**

## 状态持久化

```ts
interface GridPersistenceOptions {
  key: string;
  sections?: readonly ("columns" | "sort" | "filter" | "pagination" | "selection" | "expansion")[];
  store?: GridStateStore;   // 默认安全的 localStorage store，可接后端或 IndexedDB
  debounceMs?: number;      // 默认 160
}
```

| 配置 | 默认值 | 说明 |
| --- | --- | --- |
| `persistence` | `false` | 自动加载并保存 v2 GridState；`sections: ["columns"]` 仅保存列偏好 |
| `initialState` | — | 首屏恢复，不自动保存 |

`key` 应包含应用、租户、用户和表格场景，避免不同身份共享偏好。

## 呈现、辅助信息与安全

| 配置 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `loading` | `boolean` | `false` | 加载覆盖层 |
| `error` | `unknown \| null` | `null` | 错误覆盖层，优先于空状态 |
| `overlayLoadingTemplate` / `overlayNoRowsTemplate` / `overlayErrorTemplate` | `OverlayTemplate` | 内置 | 文本、HTMLElement 或工厂 |
| `allowUnsafeOverlayHtml` | `boolean` | `false` | 仅对完全可信静态 HTML 开启 |
| `suppressNoRowsOverlay` | `boolean` | `false` | 关闭空状态 |
| `tooltipComponent` | `(params) => string \| HTMLElement` | 原生 title | 自定义 Tooltip |
| `tooltipShowDelay` | `number` | `600` | Tooltip 延迟 |
| `watermark` | `boolean \| WatermarkConfig` | `false` | Canvas 平铺水印 |
| `showSummary` | `boolean` | `false` | 底部合计行 |
| `summaryMethod` | `(params) => string` | 行数 | 每列合计文本 |
| `statusBar` | `boolean \| StatusBarConfig` | `false` | 行数、选择数和范围聚合状态栏 |

Overlay 字符串默认按纯文本渲染。富内容优先返回 HTMLElement，避免将服务端或用户输入交给 HTML 渲染。

## 国际化、可访问性与扩展

| 配置 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `locale` | `MachTableLocale` | 中文 | 文案覆盖；提供 `LOCALE_EN` |
| `components` | `GridComponents` | `{}` | 当前实例 renderer/editor 注册表 |
| `features` | `GridFeature[]` | `[]` | 实例级扩展与生命周期 |
| `actionPolicy` | `ActionPolicy<T>` | — | 操作列权限、确认和异常策略 |
| `ariaLabel` | `string` | 内置英文 | grid/treegrid 可访问名称 |
| `ariaLabelledBy` / `ariaDescribedBy` | `string` | — | 外部标签/说明元素 ID |
| `suppressCellFocus` / `suppressHeaderFocus` | `boolean` | `false` | 关闭相应键盘焦点 |
| `suppressRowHoverHighlight` | `boolean` | `false` | 关闭行悬停高亮 |
| `suppressWarnings` | `boolean` | `false` | 关闭开发期配置警告 |

## 相关文档

[Vue 接入](/mach/table-vue) · [列定义 ColDef](/mach/table-col-def) · [GridApi 与事件](/mach/table-grid-api) · [高级能力](/mach/table-advanced)
