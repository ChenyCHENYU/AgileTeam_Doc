---
outline: "deep"
description: "MachReport 单元格编辑与填报：editable 开关与键盘操作表、ReportEditingOptions（canEdit/validate/saveBatch）、fields 类型化输入控件配置表、冲突核对流程与 createProviderEditing。"
reviewAfter: "2027-05-16"
---

# MachReport 编辑与填报

报表默认**只读**。Vue 预览传入 `editable` 后，双击可编辑的单元格即可输入；输入类型、计划更新、输出同步、保存失败和过期任务隔离由包内处理。

> 🔍 **检索关键词**：editable、ReportEditingOptions、canEdit、validate、saveBatch、save、requireSource、fields、type、number、text、boolean、enum、date、label、hint、unit、required、min、max、precision、maxLength、trueLabel、falseLabel、options、createProviderEditing、cell-edit、resolveSaveConflict、reveal、guardChanges、beforeDiscard、confirmDiscard、pendingLocalChanges、cancelTask、task、excelImport、ExcelImportOptions、valueType

## 只需一个开关

```vue
<MachReportPreview report-id="production" :params="{ date }" editable />
```

| 操作 | 行为 |
| --- | --- |
| 双击单元格 | 打开当前值的编辑框 |
| 单击 / Shift + 单击 | 选择单元格 / 扩展矩形选区 |
| 方向键 / Shift + 方向键 | 移动焦点 / 扩展选区 |
| F2 / Enter（可编辑格） | 开始编辑 |
| Enter | 校验并提交 |
| Tab / Shift + Tab（编辑框内） | 提交后移动到下一格 / 上一格 |
| Shift + Enter | 文本内换行 |
| Esc | 取消当前输入 |
| Ctrl / Cmd + C、V | 复制选区 / 预校验后原子粘贴 |
| Ctrl / Cmd + Z / Shift + Z / Y | 撤销 / 重做 |
| 移出编辑框 | 提交当前输入 |
| 打印或导出 | 先提交当前编辑，失败则停止输出 |
| 重新加载、切换报表或卸载 | 取消过期操作，未保存意图经 `pendingLocalChanges` 与修改保护处理 |

`editable: true` 用于本次预览的本地修改，**不会自动调用业务写接口**。成功提交后，DOM、Canvas、打印、PDF 和 Excel 使用更新后的同一份 RenderPlan；宿主传入的原计划和数据对象不会被修改。

## 接上权限、业务校验与保存

需要业务闭环时，把开关换成 `ReportEditingOptions`：

```ts
import type { ReportEditingOptions } from "@agile-team/mach-report/vue";

const editing: ReportEditingOptions = {
  canEdit: (context) => !monthFrozen.value && context.table?.columnKey === "quantity",
  validate: (edit) => {
    if (typeof edit.value !== "number" || edit.value < 0) return "数量必须为非负数";
  },
  requireSource: true,
  saveBatch: (batch, { signal, action }) => reportApi.saveCells({ ...batch, action }, { signal })
};
```

```vue
<MachReportPreview report-id="production" :editable="editing" @cell-edit="onCellSaved" />
```

- `canEdit` 决定是否打开编辑框；`validate` 可同步/异步返回错误文字
- 所有粘贴格先完成类型、只读及业务校验，再调用**一次** `saveBatch`，成功后才应用整批修改并逐格发出 `cell-edit`
- 任何一格无权限、无效或冲突，当前计划保持不变——不会跳过只读格造成数据错位
- 配置了 `save` 而没有 `saveBatch` 时，插件拒绝多格持久化（避免多请求伪装原子事务）
- 保存期间不重复提交；失败保留原计划并显示错误；重新查询/卸载取消旧操作，晚到的返回不会覆盖新报表

`reportApi.saveCells` 是宿主自己的请求函数；服务端必须在一个事务中检查并保存整批，继续验证租户、可写字段、封月状态和并发版本。

## 按字段选择输入控件

需要类型控件、单位或范围提示时，只增加 `fields` 配置（不需要为每个格创建组件或 watcher）：

```ts
const editing: ReportEditingOptions = {
  fields: {
    quantity: { type: "number", label: "净重", unit: "吨", min: 0, max: 100, precision: 3 },
    heatNo: { type: "text", label: "炉号", required: true, maxLength: 20 },
    enabled: { type: "boolean", label: "启用", trueLabel: "是", falseLabel: "否" },
    status: { type: "enum", label: "状态", options: [
      { value: "open", label: "进行中" }, { value: "done", label: "已完成" }
    ] },
    businessDate: { type: "date", label: "业务日期", min: "2026-01-01", max: "2026-12-31" }
  },
  saveBatch: (batch, { signal }) => reportApi.saveCells(batch, { signal })
};
```

字段先按 `context.source.field` 匹配，否则使用 `context.table.columnKey`；不同数据集有同名字段时用 `fields: (context) => ...` 返回该格配置。

| 配置 | 行为 |
| --- | --- |
| `label` / `hint` / `unit` | 输入名称、说明与单位；说明通过 `aria-describedby` 关联 |
| `required` | 空字符串或 null 不允许提交；数字 `0`、布尔 `false` 有效 |
| `number.min / max / precision` | 含边界的范围、小数位上限；拒绝超限值，不自动四舍五入 |
| `text.maxLength` | 按 Unicode 码点计数；文本编号保留前导零 |
| `boolean` | 是/否选项，保存实际布尔值；`trueLabel / falseLabel` 改名称 |
| `enum.options` | 显示 `label`，保存实际 `value`；粘贴同样检查有效选项 |
| `date.min / max` | 显式业务日期，保存 `YYYY-MM-DD` 字符串，检查真实日历与范围 |

类型编辑器不改变数据模型：数字/布尔列应分别声明 `valueType: "number"` / `"boolean"`；日期使用文本业务字段。字段规则由核心 `parseReportCellFieldInput` / `validateReportCellFieldDefinition` 统一执行，Node 或其他框架可复用；浏览器校验不能替代服务端权限与业务校验。

## 统一 Provider 编辑

已使用统一 `ReportProvider` 时无需手写保存转接：

```ts
import { createProviderEditing } from "@agile-team/mach-report/vue";

const editing = createProviderEditing(productionProvider, {
  canEdit: (context) => context.source?.field === "quantity"
});
```

单报表预览自动绑定最近一次成功查询的 `reportId`、参数快照、来源修订和 `sourceToken`；`provider.save` 收到 `{ reportId, params, requestId, edits, action, signal }`，统一返回 `{ revision, sourceToken?, conflicts?, diagnostics? }`。多报表或自有路由应显式提供 `reportId` / `params` / `expectedRevision` / `sourceToken`。

## 冲突核对与整批提交

服务端拒绝一批修改时，插件保留整批本地意图（包括未单独报告冲突的格），从"核对保存冲突"进入处理流程：

1. 打开核对前暂停当前输入；核对面板使用最近成功查询的参数读取最新数据
2. 按稳定业务身份展示**修改前 / 保留我的修改 / 使用最新数据**；最新值等于修改前值时预选本地，最新值已等于本地目标时预选最新
3. 已缺失、已只读或身份不一致的项说明原因，仅允许选择最新结果
4. "校验并提交选择"先采用新查询，保留本地的项按新来源地址和新 CAS 令牌重新走完整校验与 `saveBatch`

再次冲突后未完成意图继续保留，可重新读取最新数据核对；`state.pendingLocalChanges` 包含待处理项，配合 `guardChanges` 提供离开保护。

## 修改保护与任务取消

| 配置 / 状态 | 契约 |
| --- | --- |
| `guardChanges` | 默认 true，重新查询或导入替换前保护本地输入/草稿 |
| `beforeDiscard(context)` | 返回 boolean/Promise，拒绝/异常/过期决定保留内容；默认内置确认 |
| `confirmDiscard(reason?)` | 供宿主路由等离开操作复用，默认 reason 为 `leave` |
| `state.task` / `@task` | taskId、kind、stage、status、可选 completed/total 与 cancellable |
| `cancelTask()` | 取消当前查询/导入/导出/打印准备，屏蔽迟到结果；不回滚业务保存 |

## Excel 模板导入

```vue
<MachReportPreview report-id="production" excel-import />
```

从 `.xlsx` 导入多工作表、合并、尺寸、基础样式与已有内容，转换为可复用模板；生成本地预览并发出 `template-import`，不调用业务写接口。原有业务数据的持久化和权限仍由宿主负责。详见仓库 [Excel 模板导入](https://github.com/ChenyCHENYU/MachReport/blob/main/docs/EXCEL_IMPORT.md) 与 [Excel 绑定](https://github.com/ChenyCHENYU/MachReport/blob/main/docs/EXCEL_BINDING.md)。

## 相关文档

[Vue 组件](/mach/report-vue) · [参数与数据](/mach/report-data) · [输出与导出](/mach/report-export) · [Node Runtime](/mach/report-server)
