---
outline: "deep"
description: "MachTable ColDef 列定义参考：标识与标题、宽度与布局、交互开关、值与渲染（valueGetter/valueFormatter/valueSetter）、编辑、选择与行、多级表头与内置工具列模板。"
reviewAfter: "2027-05-16"
---

# MachTable 列定义（ColDef）

列描述符是 MachTable 声明式配置的核心。`columnDefs` 数组的元素为 `ColDef`（叶子列）或 `ColDefGroup`（表头分组）。

## 标识与标题

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `colId` | `string` | `field` 或 `col_{i}` | 列唯一标识（排序/过滤/列状态都以它为键）；同名自动去重加后缀 |
| `field` | `string` | — | 数据取值字段，支持点路径 `a.b.c` |
| `headerName` | `string` | `field` | 表头文本 |
| `align` | `"left" \| "center" \| "right"` | `"center"` | 单元格内容对齐 |
| `headerAlign` | `"left" \| "center" \| "right"` | 跟随 `align` | 表头文本对齐（独立于单元格） |
| `headerTooltip` | `string` | — | 表头 title 提示 |
| `headerClass` | `string \| string[]` | — | 表头附加类名 |
| `headerComponent` | `(p) => string \| HTMLElement \| { el, destroy }` | — | 自定义表头内容 |

## 宽度与布局

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `width` | `number` | 内容测宽 | 显式首选宽度 px |
| `autoWidth` | `boolean` | `true` | 未声明 width 时按内容抽样测宽；`false` 使用 150px |
| `minWidth` / `maxWidth` | `number` | `80` / 自动测宽 360 | 边界约束 |
| `flex` | `number` | `0` | 弹性权重：容器有多余空间时按权重分配 |
| `suppressSizeToFit` | `boolean` | `false` | `columnLayout: "fit"` 下保持本列宽度；工具列模板默认开启 |
| `suppressColumnMenu` | `boolean` | `false` | 隐藏本列表头工具入口 |
| `pinned` | `"left" \| "right" \| boolean` | — | 固定列；`true` 等价 `"left"` |
| `hide` | `boolean` | `false` | 初始隐藏 |

未声明 `width` 的列默认按表头和已加载数据的显示文本测宽：每列均匀抽样最多 100 行，默认 80–360px。长内容在单元格内省略，表格保留内部横向滚动。图形/操作等特殊列请指定宽度。

## 交互开关

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `sortable` | `boolean` | `true` | 点击表头排序（asc → desc → 无） |
| `resizable` | `boolean` | `true` | 当前列允许调宽；需表格级 `enableColumnResize: true` 才有把手 |
| `movable` | `boolean` | `true` | 拖拽表头换位（分组内或同窗格内） |
| `filter` | `boolean \| "text" \| "number" \| "date" \| "set"` | `false` | 过滤器类型；`true` 等价 `"text"`；过滤摘要显示为表头 tag |
| `filterParams` | `{ values?, maxValues? }` | — | set 过滤器候选值；默认从数据派生（上限 500） |

## 值与渲染

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `valueGetter` | `(p) => TValue` | 取值（替代 field）；排序/过滤/导出一致使用 |
| `valueFormatter` | `(p) => any` | 显示格式化；返回非字符串自动 `String()` |
| `valueSetter` | `(p) => boolean` | 写值（编辑/粘贴/填充/撤销统一入口）；返回是否变更 |
| `valueParser` | `(p) => TValue` | 同步规范编辑器、粘贴和导入的输入值 |
| `valueSerializer` | `(p) => unknown` | 决定剪贴板、CSV 与 typed matrix/XLSX 的输出值 |
| `status` | `boolean \| Record<string, { label?, color? }>` | 状态标签：`true` 使用默认状态色；映射支持业务文字、`success/warning/danger/info/neutral` 语义色或 CSS 色；仅影响展示 |
| `cellRenderer` | `(p) => string \| HTMLElement \| { el, destroy }` | 自定义单元格；字符串查注册表（内置 `statusTag` / `progressBar` / `link`） |
| `cellRendererParams` | `Record<string, any>` | 渲染器参数通道 |
| `cellClass` / `cellStyle` | 类名 / CSS 对象或工厂 | 附加类名 / 动态行内样式（条件标红等） |
| `tooltipValueGetter` | `(p) => string \| null` | 覆盖默认 title |
| `wrapText` | `boolean` | 单元格自动换行（配合 `autoHeight`） |
| `type` | `string \| string[]` | 从全局 `columnTypes` 解析语义类型；从左到右合并，当前列字段最终覆盖 |

状态列示例：

```ts
const columns = [
  { field: "customer", headerName: "客户", maxWidth: 280 },
  { field: "status", headerName: "状态", status: true },
  { field: "planStatus", headerName: "计划状态", status: {
    S1B: { label: "待复核", color: "danger" },
    S1C: { label: "已完成", color: "success" },
    special: { label: "特殊处理", color: "#8b5cf6" }
  }}
];
```

## 编辑

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `editable` | `boolean \| (p) => boolean` | 可编辑开关；粘贴/填充/Delete 只写可编辑格 |
| `cellEditor` | `"text" \| "number" \| "date" \| "select" \| 工厂函数 \| 注册名` | 编辑器；内置按值类型自动推断 |
| `cellEditorParams` | `{ values: (string \| number)[] }` | select 编辑器选项 |
| `validate` | `(newValue, p) => string \| true \| null \| Promise<…>` | 返回字符串显示错误并拒绝写入；支持异步 |
| `singleClickEdit` | `boolean` | 列级单击编辑 |

## 选择与行

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `checkboxSelection` | `boolean` | 复选框列（单选模式时呈 radio） |
| `selectable` | `(p) => boolean` | 行级禁选；全选/分组级联自动跳过 |
| `rowDrag` | `boolean` | 行拖拽手柄列 |
| `rowGroup` | `boolean` | 作为分组字段（多列多级） |
| `aggFunc` | `string` | 聚合函数名（sum/avg/count/min/max/first/last 或自定义注册） |
| `autoRowSpan` | `boolean` | 自动合并连续相同值单元格 |
| `rowSpan` / `colSpan` | `(p) => number` | 回调式跨行/跨列数 |
| `autoHeight` | `boolean` | 配合 `wrapText` 按浏览器排版测高并缓存 |
| `initialSort` | `"asc" \| "desc"` | 初始排序 |
| `onCellClick` / `onCellDoubleClick` | `(e) => void` | 列级单元格事件 |

::: warning 跨行合并边界
跨行合并依赖原锚点留在虚拟缓冲内。使用有界小跨度时，确保 `rowBuffer` ≥ 最大合并行数（三行合并用默认 8 行缓冲即可）。长分组优先使用分组行或独立报表。
:::

## ColDefGroup（多级表头）

```ts
{
  headerName: "业务信息",
  children: [
    { field: "name", headerName: "名称" },
    { headerName: "指标", children: [{ field: "score", headerName: "分数" }] }  // 任意嵌套
  ]
}
```

- 表头行数自动 = 最大嵌套深度；分组单元格跨子列居中
- 叶子列交互（排序/过滤/拖拽/调宽）不受分组影响
- `columnDefs` 更新时分组结构随之重建（列状态按 colId 保留）

## 内置工具列模板

```ts
// 复选框列
{ colId: "sel", headerName: "", width: 40, checkboxSelection: true, pinned: "left",
  sortable: false, resizable: false, movable: false }

// 序号列（分组/明细/树形下行号只计数据行）
{ colId: "idx", headerName: "#", type: "index", width: 52 }

// 行拖拽列
{ colId: "drag", headerName: "", rowDrag: true, width: 40,
  sortable: false, resizable: false, movable: false }
```

Core 另提供 `selectionColumn()` / `indexColumn()` / `dragColumn()` / `actionsColumn()` / `rowActionsColumn()` 工厂，Vue 可用 `rowActionsColumn({ onView, onEdit, onDelete, extraActions })` 一行生成操作列（低频动作收入 `…` 菜单，支持 `drawer` / `inline` 溢出形态）。

## 相关文档

[GridOptions 配置](/mach/table-grid-options) · [GridApi 与事件](/mach/table-grid-api) · [Vue 接入](/mach/table-vue)
