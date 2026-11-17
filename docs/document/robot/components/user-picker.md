---
outline: "deep"
description: "👤 人员选择器，基于 C_DataPicker 的业务封装：头像/工号/部门/岗位字段映射、组织树过滤、已选顺序调整"
---

# C_UserPicker 人员选择

> 👤 面向"选人"场景的业务选择器：内置人员字段映射、组织树范围过滤与已选顺序调整

## ✨ 特性

- **🧩 基于 C_DataPicker**: 继承弹窗 / 内联 / 气泡形态、历史记录、固定筛选与会话管理
- **👤 人员字段映射**: `fields` 声明 `avatar` / `code` / `department` / `job` / `status` 字段名，自动渲染人员卡片
- **🏢 组织树**: `organization` 只改变候选筛选范围，不把组织勾选转换为整部门人员选择
- **🔢 身份类型安全**: 编码类型由字段或 `value` 映射保证，不把数字来源绑定为字符串模型
- **↕️ 已选顺序**: `selectionOrder` 允许调整已选顺序（适合顺序审批）；默认只提供移除操作

## 📦 安装

::: code-group

```bash [bun (推荐)]
bun add @robot-admin/naive-ui-components
```

```bash [pnpm]
pnpm add @robot-admin/naive-ui-components
```

```bash [npm]
npm install @robot-admin/naive-ui-components
```

:::

## 🎯 基础用法

```vue
<template>
  <C_UserPicker
    v-model="approver"
    :source="userSource"
    :fields="{ avatar: 'avatar', department: 'deptName', job: 'jobName' }"
    title="选择审批人"
  />
</template>

<script setup>
import { ref } from 'vue'

const approver = ref(null)

const userSource = {
  // rowKey 绑定人员编码字段；提交值不同于行键时再声明 value(row)
  rowKey: 'userId',
  label: (row) => row.realName,
  request: async ({ page, pageSize, keyword }) =>
    userApi.page({ page, pageSize, keyword }),
}
</script>
```

### 组织树过滤 + 多选排序

```vue
<template>
  <C_UserPicker
    v-model="ccUsers"
    :source="userSource"
    multiple
    selection-order
    :organization="{ field: 'deptId', title: '按部门筛选', options: deptTree }"
  />
</template>

<script setup>
import { ref } from 'vue'

const ccUsers = ref([])
const deptTree = [
  { key: 'D01', label: '炼钢厂', children: [{ key: 'D0101', label: '转炉车间' }] },
]
</script>
```

## 📋 API

### Props（在 C_DataPicker 基础上新增）

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `source` | `UserPickerSource` | — | 必填；人员行键、标签、请求与回显映射 |
| `fields` | `UserPickerFields` | — | `avatar` / `code` / `department` / `job` / `status` 字段名映射 |
| `organization` | `UserPickerOrganization` | — | 组织树配置：`field` 过滤字段 + Tree 配置 |
| `selection-order` | `boolean` | — | 已选顺序可调整 |
| `columns` | `TableColumn[]` | — | 可选；候选表格列覆盖 |
| `multiple` | `boolean` | — | 多选 |

其余 Props（`presentation` / `history` / `fixedFilters` / `maxSelection` / `scope` 等）与 [C_DataPicker](/robot/components/data-picker) 一致。

### Slots

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| `trigger` | `{ open, disabled, opened, display }` | 自定义触发器 |
| `selected` | `{ items, remove, move, disabled }` | 自定义已选列表 |

### Events

`update:modelValue` / `select` / `cancel`，语义与 C_DataPicker 相同。

完整类型定义请查看包内 `C_UserPicker/types.ts`。
