---
outline: "deep"
description: "MachTable 高频场景配方精选：useMachTableQuery 远程查询分页跨页选择、批量保存与乐观锁冲突处理、树形懒加载，含完整可运行代码与请求协议。"
reviewAfter: "2027-05-18"
---

# MachTable 场景配方精选

从仓库 33 篇 [recipes](https://github.com/ChenyCHENYU/MachTable/tree/main/docs/recipes) 中精选三个最高频的 B 端场景，给出可直接落地的完整代码。

> 🔍 **检索关键词**：useMachTableQuery、MachTablePageRequest、bindings、retry、reload、resetPage、debounceMs、mode、manual、auto、allMatching、excludedKeys、saveBatch、savedRowIds、GridBatchSaveResult、resolveSaveConflict、saveDetailed、useMachTableEditing、guardBeforeUnload、treeData、childrenKey、isTreeRowExpandable、loadTreeChildren、treeLoading、treeChildrenLoaded、treeLoadError、force

## 一、远程查询、分页与跨页选择

`useMachTableQuery`（`/workflows`）把 B 端列表最容易重复出错的部分收拢为一个类型安全控制器：请求分页、服务端排序/过滤、请求取消、乱序响应保护、加载/错误状态和跨页选择。

### 标准页面

```vue
<script setup lang="ts">
import { reactive } from "vue";
import { MachTable, type ColDef } from "@agile-team/mach-table-vue";
import { useMachTableQuery } from "@agile-team/mach-table-vue/workflows";
import { getOrderPageApi } from "@/api/orders";

interface Order { orderId: string; customer: string; amount: number }
const query = reactive({ keyword: "", status: "" });

const table = useMachTableQuery<Order, typeof query>({
  query,
  rowKey: "orderId",
  request: getOrderPageApi,
});
const { bindings } = table;

const columns: ColDef<Order>[] = [
  { field: "orderId", headerName: "订单号", pinned: "left" },
  { field: "customer", headerName: "客户", flex: 1 },
  { field: "amount", headerName: "金额" }
];
</script>

<template>
  <div style="height: 560px">
    <MachTable v-bind="bindings" :column-defs="columns" />
  </div>
</template>
```

默认就是 `list` 场景——无需声明外部分页器、手动 `loading` 或请求序号。查询失败后可调用 `table.retry()`。

### 请求协议

每次请求都会收到当次状态的独立快照；请求必须返回 `{ rows, total }`，接口形态不同时在项目接口层转换一次：

```ts
import type { MachTablePageRequest } from "@agile-team/mach-table-vue/workflows";

export async function getOrderPageApi(params: MachTablePageRequest<OrderFilters>) {
  const response = await getOrdersApi({
    ...params.query,
    page: params.page,
    size: params.pageSize,
    sort: params.sortModel,
    filters: params.filterModel,
    expression: params.advancedFilterModel,
    quickFilter: params.quickFilterText
  }, { signal: params.signal });
  return { rows: response.records, total: response.total };
}
```

| 要点 | 行为 |
| --- | --- |
| 自动/手动模式 | `mode: "auto"` 变化即查；`mode: "manual"` 由查询按钮 `table.reload({ resetPage: true })` 显式提交 |
| 取消与乱序 | 新查询立即中止旧请求；即使请求库忽略 `AbortSignal`，晚到的旧响应也不会覆盖新数据 |
| 失败恢复 | 错误进入 `table.error`，保留上一份有效结果与选择状态，`retry()` 恢复 |
| 跨页全选 | 表达为 `allMatching + excludedKeys`，不要求客户端加载全部 ID |
| 防抖/页大小 | 按需加 `debounceMs`、`pageSize` / `pageSizeOptions` |

## 二、批量保存、失败与版本冲突

`api.editing.save()` 以**稳定变更快照**为边界：提交开始后用户可以继续编辑；旧请求成功时只确认快照中的同值修改，新产生的修改仍保持脏状态。

```ts
const result = await api.editing.save(async (changes) => {
  const response = await orderApi.saveBatch(changes);
  return {
    savedRowIds: response.savedIds,   // 可表达部分成功
    failures: response.failures,
    conflicts: response.conflicts
  };
});

console.table(result.saved);      // 已确认的变更
console.table(result.failures);   // 失败行（保持脏状态）
console.table(result.conflicts);  // 乐观锁冲突
```

失败明细结构：

```ts
// 校验失败
{ rowId: "order-2", code: "AMOUNT_REQUIRED", message: "金额不能为空",
  colIds: ["amount"], retryable: false }

// 乐观锁冲突（业务必须明确选择，不会静默覆盖）
{ rowId: "order-3", code: "VERSION_CONFLICT", message: "订单已被其他用户修改",
  serverData: latestOrder, serverVersion: latestOrder.version, retryable: true }

resolveSaveConflict(api, conflict, "acceptServer");  // 或 "keepLocal"
```

Vue 响应式封装：

```ts
const editing = useMachTableEditing(table, { guardBeforeUnload: true });
const result = await editing.saveDetailed(orderApi.saveChanges);

if (result.conflicts.length) {
  editing.reveal(result.conflicts[0].rowId);                 // 定位到冲突行
  editing.resolveConflict(result.conflicts[0].rowId, "keepLocal");
}
```

同一实例不允许并发保存，重复调用立即报错，避免响应顺序不确定。

## 三、树表懒加载

适合组织树、物料分类、区域资产和大目录。加载器只在用户**第一次展开**可展开节点时执行；同节点并发请求自动合并。

```ts
const options: GridOptions<Department> = {
  treeData: true,
  childrenKey: "children",
  rowData: roots,
  rowKey: "id",                                          // 懒加载场景强制要求稳定唯一
  isTreeRowExpandable: ({ data }) => data.hasChildren,
  loadTreeChildren: async ({ data, signal }) => {
    const response = await departmentApi.children(data.id, { signal });
    return response.records;
  }
};
```

### 状态与重试

```ts
node.treeLoading;          // 请求中
node.treeChildrenLoaded;   // 已加载
node.treeLoadError;        // 失败（展开图标进入错误态，再次点击重试）

await api.hierarchy.loadTreeChildren(rowId);              // 已加载直接命中缓存
await api.hierarchy.loadTreeChildren(rowId, { force: true }); // 强制重取并原子替换子树
```

成功和失败分别发出 `treeChildrenLoaded` / `treeChildrenLoadFailed` 事件（失败同时进入 `gridError`）。

### 生命周期保证

- `api.rows.setData()`、切换数据集和 `api.destroy()` 会中止仍在进行的子级请求
- 同一节点的并发加载共享 Promise，避免双击造成重复请求
- 强制重试在新数据成功后才替换旧子树；失败不会写入半棵树
- 树输入最多 256 层，循环引用被拒绝；候选无效时保留已有数据、选择与编辑状态
- 服务端仍必须校验数据权限——`isTreeRowExpandable` 只负责交互，不是安全边界

## 更多配方

完整 33 篇配方见仓库 [docs/recipes](https://github.com/ChenyCHENYU/MachTable/tree/main/docs/recipes)：高级过滤、多范围选区、导入预览、无限滚动、随机块数据源、主从详情、保存视图、列工作台、Worker 处理、性能与变量行高、XLSX 等。

## 相关文档

[高级能力](/mach/table-advanced) · [GridApi 与事件](/mach/table-grid-api) · [GridOptions 配置](/mach/table-grid-options) · [Vue 接入](/mach/table-vue)
