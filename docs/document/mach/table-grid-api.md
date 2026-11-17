---
outline: "deep"
description: "MachTable GridApi 与事件参考：根级能力（batch/updateOptions/destroy）、12 个领域（rows/columns/selection/editing/filtering/sorting/pagination/hierarchy/view/state/io/diagnostics）与完整事件清单。"
reviewAfter: "2027-05-16"
---

# MachTable GridApi 与事件

`createGrid()`、Vue `useMachTable()` 与 React `useMachTable()` 返回同一套领域化 API。根级只负责生命周期、配置、事件和批处理；表格命令按职责归入 **12 个只读领域**。API 与各领域对象均被冻结，不能被页面意外改写。

> 🔍 **检索关键词**：batch、whenReady、getOption、updateOptions、destroy、setData、transact、transactAsync、flushTransactions、getCount、getById、forEachDisplayed、reorder、reload、purgeCache、setVisible、setPinned、setWidth、autoSize、openWorkbench、setRows、setById、selectAll、clear、startCell、startRow、getChanges、markSaved、rollback、save、undo、redo、setQuickText、setModel、setPage、setPageSize、setRowExpanded、loadTreeChildren、scrollToRow、refreshCells、refreshLayout、setOverlay、setPinnedRows、exportCsv、exportMatrix、importCsv、importMatrix、print、copyRange、getPerformance、gridReady、gridError、modelUpdated、selectionChanged、cellValueChanged、dirtyStateChanged、sortChanged、filterChanged、columnResized、rowDragEnd、paginationChanged、detailToggled、treeChildrenLoaded

```ts
api.rows.transact({ update: changedRows });
api.filtering.setQuickText("pending");
await api.editing.save(orderApi.saveChanges);
```

## 根级能力

| 方法 | 说明 |
| --- | --- |
| `batch(callback)` | 合并回调内的模型、布局和渲染更新；嵌套调用安全 |
| `whenReady()` | 首次布局和 `gridReady` 后返回当前 API |
| `getOption(key)` | 读取应用配置、预设和实例 props 合并后的当前值 |
| `updateOptions(patch)` | 原子校验并更新配置；一次 patch 最多提交一次视觉刷新 |
| `on(event, listener)` | 订阅事件并返回解除函数 |
| `destroy()` / `isDestroyed()` | 释放观察器、监听器、计时器、编辑器和远程请求 |

## api.rows

| 方法 | 说明 |
| --- | --- |
| `setData(rows)` | 全量替换本地数据；稳定 `rowKey` 保留选择语义 |
| `transact({ add?, addIndex?, remove?, update? })` | 同步增量事务 |
| `transactAsync(transaction, { signal? })` | 合并到异步事务队列，可取消 |
| `flushTransactions()` | 立即提交待处理异步事务 |
| `getCount()` / `getAt(index)` / `getById(id)` | 行数 / 按展示索引 / 按稳定 ID 取 RowNode |
| `forEach(callback)` / `forEachDisplayed(callback)` | 遍历当前 RowModel / 过滤排序后的展示行 |
| `reorder(fromIndex, toIndex)` | 本地行重排，成功返回 `true` |
| `isRemote()` / `reload({ signal? })` | 是否远程数据源 / 重载远程数据 |
| `ensureLoaded(start, end, { signal? })` | 确保随机块区间已加载 |
| `purgeCache()` / `getCacheSnapshot()` | 清空远程块缓存 / 缓存与请求队列诊断 |

## api.columns

| 方法 | 说明 |
| --- | --- |
| `getDefinitions()` / `setDefinitions(defs)` | 读取或替换列定义 |
| `getState()` / `setState(state)` / `resetState()` | 列状态快照、恢复和重置 |
| `setVisible(colId, visible)` | 设置显隐 |
| `setPinned(colId, side)` | 固定到左/右或取消固定 |
| `move(colId, toIndex)` | 调整列顺序 |
| `setWidth(colId, width)` | 程序化调整宽度（不受 `enableColumnResize` 开关限制） |
| `fit(width?)` | 按容器或指定宽度缩放列 |
| `autoSize(colId)` / `autoSizeAll()` | 按内容自动宽度；完整表头下限始终生效 |
| `getWorkbenchItems()` | 获取无 UI 绑定的列工作台模型 |
| `openWorkbench(anchor?)` / `closeWorkbench()` | 打开/关闭内置列工作台 |

## api.selection

| 方法 | 说明 |
| --- | --- |
| `getRows()` / `getNodes()` / `getIds()` | 全部已选行、节点或 ID |
| `getVisibleRows()` | 当前已加载且可见的已选行 |
| `setRows(rows, clearOthers?)` / `setById(id, selected?, clearOthers?)` | 设置选择 |
| `selectAll(filteredOnly?)` / `clear()` | 全选（可限过滤结果）/ 清空 |
| `getMode()` / `setMode(mode)` | 单选、多选或关闭 |
| `getRange()` / `clearRange()` | 单元格范围选择 |

远程"全选全部查询结果"由 `/workflows` 的 `useMachTableQuery()` 表达为 `allMatching + excludedKeys`，不要求客户端加载全部 ID。

## api.editing

| 方法 | 说明 |
| --- | --- |
| `startCell({ rowIndex, colId, keyPress? })` / `startRow(rowIndex)` | 开始单元格 / 原子整行编辑 |
| `isRowActive(rowIndex?)` | 判断是否编辑中 |
| `stop({ cancel? })` | 异步提交或取消当前编辑；校验失败返回 `false` |
| `getChanges()` / `getDirtyRowIds()` | 待保存变更 / 脏行 ID |
| `markSaved(rowIds?)` / `rollback(rowIds?)` | 确认 / 回滚指定或全部脏行 |
| `save(handler, rowIds?)` | 快照化保存，返回提交、成功、失败和冲突明细 |
| `undo()` / `redo()` / `canUndo()` / `canRedo()` | 撤销/重做 |

`save()` 返回 `{ submitted, saved, failures, conflicts }`；保存开始后产生的新编辑不会被旧请求误清除。

## api.filtering 与 api.sorting

| 方法 | 说明 |
| --- | --- |
| `filtering.getModel()` / `setModel(model)` | 普通列过滤模型 |
| `filtering.getAdvancedModel()` / `setAdvancedModel(model)` | 可序列化高级过滤 AST |
| `filtering.getQuickText()` / `setQuickText(text)` | 全局快速搜索 |
| `filtering.isPresent(colId?)` | 指定列或全局是否存在过滤 |
| `sorting.getModel()` / `setModel(model)` | 排序模型 |

## api.pagination

| 方法 | 说明 |
| --- | --- |
| `isEnabled()` / `setEnabled(enabled)` | 分页开关 |
| `getPage()` / `setPage(page)` | 页码（从 1 开始） |
| `getPageSize()` / `setPageSize(size)` | 每页数量 |
| `getPageCount()` / `getTotalRowCount()` | 总页数 / 当前已知总量 |

## api.hierarchy

| 方法 | 说明 |
| --- | --- |
| `isRowExpanded(id)` / `setRowExpanded(id, expanded)` | 树节点展开状态 |
| `isTreeRowLoading(id)` / `loadTreeChildren(id, { force? })` | 懒加载子节点请求状态 / 加载（force 显式重试） |
| `isGroupExpanded(id)` / `setGroupExpanded(id, expanded)` | 分组展开状态 |
| `setAllGroupsExpanded(expanded)` / `setAllDetailsExpanded(expanded)` | 展开/折叠全部分组或主从详情 |

## api.view

| 方法 | 说明 |
| --- | --- |
| `getRoot()` | 内部 grid 根元素；未挂载/已销毁为 `null` |
| `scrollToRow(index, position?)` | 滚动到行，可选 `top/bottom/middle/nearest` |
| `refreshCells(params?)` | 精确刷新行、列、固定行；`force` 可重建 renderer |
| `refreshLayout()` / `flush()` | 重新测量布局 / 立即提交视图更新 |
| `setOverlay("loading" \| "noRows" \| "error" \| null)` | 显式覆盖层 |
| `getPinnedRows(position)` / `setPinnedRows(position, rows)` | 顶部/底部固定行 |

Dialog/Drawer 中挂载的表格，容器变为可见后调用一次 `view.refreshLayout()`。

## api.state

| 方法 | 说明 |
| --- | --- |
| `get()` | 获取版本化 `GridState` |
| `apply(state, { sections?, emitEvents? })` | 原子恢复全部或指定区段 |

可选区段：`columns` / `sort` / `filter` / `pagination` / `selection` / `expansion`。自动持久化 `persistence` 使用同一契约。

## api.io

| 方法 | 说明 |
| --- | --- |
| `exportCsv(params?)` | 生成 CSV 字符串，默认防公式注入 |
| `exportMatrix(params?)` | 返回 `unknown[][]`，默认保留原始值类型，首行可选表头 |
| `importCsv(text, options?)` | 同步映射 CSV 并替换、追加或发起粘贴，返回 `boolean` |
| `importMatrix(rows, options?)` | 接收矩阵，支持 replace/append/paste 三种模式 |
| `print(options?)` / `copyRange()` | 打印当前表格 / 复制当前范围到剪贴板 |

`MatrixExportParams`：`includeHeader`（默认 true）、`headersOnly`、`onlySelected`、`onlyAllDisplayed`（本地分页时为当前页）、`target: "csv" | "xlsx"`（选择 `valueSerializer` 输出策略，不创建文件）、`protectFormulas`（默认 true）。分组/详情行及复选框列不导出。

`ImportMatrixOptions`：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `mode` | `"replace"` | `"replace"` 替换、`"append"` 追加、`"paste"` 走交互校验管线 |
| `headerRowIndex` | `0` | 表头索引；`-1` 表示无表头 |
| `columns` | — | 按矩阵顺序指定目标列 ID/field |
| `coerceNumbers` | `true` | 内置文本转换；前导零和超安全整数保留字符串 |
| `parseValue` | — | 同步回调，优先于列 `valueParser` |

导入限本地数据，每次最多 10000 数据行、含表头共 100000 单元格。XLSX 文件读写通过独立的 `@agile-team/mach-table-xlsx` 扩展提供；需要可等待的预览、校验和提交结果时使用 `/import` 计划（见[高级能力](/mach/table-advanced)）。

## api.diagnostics

| 方法 | 说明 |
| --- | --- |
| `get()` | 实例状态、活动 Feature、近期错误、远程/渲染/更新统计 |
| `getPerformance()` / `resetPerformance()` | 渲染、布局、DOM 数量、长任务和堆内存快照 / 重置样本 |

诊断 API 用于开发、测试和遥测采样，不应用来驱动业务状态。

## 事件 Events

事件双通道：`options.onXxx` 回调与 `api.on(type, fn)`（返回取消函数）；Vue 模板用 kebab-case（`@selection-changed`）。所有事件对象都含 `type` 与 `api` 字段。

### 生命周期与错误

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `gridReady` | `{ api }` | grid 可交互，`e.api` 即命令接口 |
| `gridDestroyed` | — | `api.destroy()` 执行后触发 |
| `modelUpdated` | `{ rowCount }` | 数据管道（过滤/排序/分组/无限块到达）刷新后 |
| `gridError` | `{ code, error, source, context? }` | 用户回调/数据源/持久化抛错时隔离上报；按稳定 `code` 聚合（`DATA_SOURCE_ERROR` / `VALIDATION_ERROR` / `RENDERER_ERROR` / `EDITOR_ERROR` / `STATE_ERROR` / `EVENT_HANDLER_ERROR` / `GRID_ERROR` 等） |

### 单元格 / 行 / 选择

| 事件 | 载荷 |
| --- | --- |
| `cellClicked` / `cellDoubleClicked` / `cellContextMenu` | `event, rowNode, rowIndex, column, colDef, value` |
| `rowClicked` / `rowDoubleClicked` | `event, rowNode, rowIndex` |
| `selectionChanged` | `{ selectedNodes, selectedRows }` |
| `rangeSelectionChanged` | `{ range: { row1, row2, colId1, colId2 } \| null }` |
| `rowDragEnd` | `{ rowNode, fromIndex, toIndex, targetIndex, applied }` |

### 排序 / 过滤 / 列

| 事件 | 载荷 |
| --- | --- |
| `sortChanged` | `{ sortModel: { colId, direction }[] }` |
| `filterChanged` | `{ filterModel, advancedFilterModel }` |
| `columnResized` | `{ colId, width, finished }`（拖拽帧 false，提交 true；自动持久化只响应完成事件） |
| `columnMoved` / `columnVisibilityChanged` / `displayedColumnsChanged` | `{ colId, toIndex? }` / `{ colId, visible }` / `{}` |

### 编辑

| 事件 | 载荷 | 说明 |
| --- | --- | --- |
| `cellEditingStarted` / `cellEditingStopped` | `{ rowIndex, colId, rowNode, old/newValue? }` | 编辑器挂载 / 结束 |
| `rowEditingStarted` / `rowEditingStopped` | `{ rowIndex, rowNode, data, cancelled?, changes? }` | 整行草稿提交或取消 |
| `cellValueChanged` | `{ oldValue, newValue, rowNode, column, data }` | 值落库；编辑/粘贴/填充/undo/redo 统一经此事件 |
| `dirtyStateChanged` | `{ dirtyRowIds }` | 脏数据集合变化 |

### 树 / 详情 / 分页

| 事件 | 载荷 |
| --- | --- |
| `detailToggled` | `{ rowId, rowNode, expanded }` |
| `treeChildrenLoaded` / `treeChildrenLoadFailed` | `{ rowId, children }` / `{ error }` |
| `paginationChanged` | `{ page, pageSize, pageCount, total }` |

## 相关文档

[GridOptions 配置](/mach/table-grid-options) · [列定义 ColDef](/mach/table-col-def) · [高级能力](/mach/table-advanced) · [Vue 接入](/mach/table-vue)
