---
outline: "deep"
description: "MachTable 与 UI 组件库集成：Naive UI 主题桥接（useThemeVars / CSS 变量）与单元格渲染、Element Plus 编辑器桥接（createElementPlusEditors）、弹层 z-index 与 Dialog 布局刷新。"
reviewAfter: "2027-05-16"
---

# MachTable UI 库集成

MachTable 不依赖任何 UI 组件库，样式作用域 `.mach-root` 封闭，互不冲突。本页给出与 Naive UI（Robot Admin 体系）和 Element Plus 的官方集成路径。

> 🔍 **检索关键词**：useThemeVars、n-config-provider、darkTheme、vueCellRenderer、NTag、NEllipsis、NSelect、NDatePicker、naiveEditor、createElementPlusEditors、ElSelect、ElDatePicker、ElInputNumber、vueCellEditor、ElConfigProvider、refreshLayout、mach-z-popup、mach-z-menu、C_Grid、renderType、appContext、themeVars、mach-primary

## Naive UI 集成

### 1. 主题桥接

方式 A：CSS 变量映射（Naive 的 `--n-*` 变量直接在模板内引用）：

```css
.mach-root {
  --mach-primary: var(--n-color-target, var(--n-primary-color, #18a058));
  --mach-border-color: var(--n-border-color, #efeff5);
  --mach-header-bg: var(--n-color-embedded, #fafafc);
  --mach-header-fg: var(--n-text-color-2, rgba(0, 0, 0, 0.66));
  --mach-body-fg: var(--n-text-color-1, rgba(0, 0, 0, 0.9));
  --mach-row-hover-bg: var(--n-color-hover, rgba(0, 0, 0, 0.03));
}
```

方式 B（推荐）：直接读取 Naive 的 `themeVars` 注入 CSS 变量，完全跟随 `n-config-provider` 的亮/暗/品牌切换，无需写两套 CSS：

```vue
<script setup lang="ts">
import { computed } from "vue";
import { darkTheme, useThemeVars } from "naive-ui";
const vars = useThemeVars();
const cssVars = computed(() => ({
  "--mach-primary": vars.value.primaryColor,
  "--mach-border-color": vars.value.borderColor,
  "--mach-header-bg": vars.value.bodyColor,
  "--mach-header-fg": vars.value.textColor2,
  "--mach-body-fg": vars.value.textColor1,
  "--mach-row-hover-bg": vars.value.hoverColor,
  "--mach-row-selected-bg": vars.value.primaryColorHover + "22"
}));
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : undefined">
    <MachTable :style="cssVars" :column-defs="columns" :row-data="rows" row-key="id" />
  </n-config-provider>
</template>
```

### 2. 单元格渲染 Naive 组件

```ts
import { h } from "vue";
import { NTag, NEllipsis } from "naive-ui";
import { vueCellRenderer } from "@agile-team/mach-table-vue/adapters";

const columns = [
  {
    field: "status", headerName: "状态", width: 110,
    cellRenderer: vueCellRenderer({
      render: () => h(NTag, { type: "warning", size: "small", bordered: false }, () => "待机")
    })
  },
  {
    field: "desc", headerName: "描述",
    cellRenderer: vueCellRenderer({
      render: () => h(NEllipsis, { style: "max-width: 100%" }, { default: () => "很长的描述文本…" })
    })
  }
];
```

### 3. 富编辑器（n-select / n-date-picker）

```ts
import { createApp, h } from "vue";
import { NSelect, NDatePicker } from "naive-ui";

function naiveEditor(component: any, props: Record<string, any> = {}) {
  return (params: any) => {
    const host = document.createElement("div");
    host.style.width = "100%";
    let value: any = params.value;
    const app = createApp({
      render: () => h(component, {
        ...props, value,
        "onUpdate:value": (v: any) => (value = v),
        size: "small", style: { width: "100%" }
      })
    });
    app.mount(host);
    setTimeout(() => host.querySelector("input")?.focus());
    return { el: host, getValue: () => value, destroy: () => app.unmount() };
  };
}

const tableOptions = {
  components: { cellEditors: {
    "n-select": naiveEditor(NSelect),
    "n-date": naiveEditor(NDatePicker, { type: "datetime" })
  }}
};
```

在组件 `setup()` 内创建会自动继承宿主 appContext（`n-config-provider` 注入随单元格生效）；模块顶层创建时可显式传 `{ appContext }`。

## Element Plus 集成

MachTable 不依赖 Element Plus；Vue 包提供可选编辑器桥接 `/editors`，**EP 组件由宿主传入**——未使用 EP 的项目零额外体积，使用 EP 的项目可继承 `ElConfigProvider` 的主题、尺寸与国际化上下文。

### 一次注册常用编辑器

```ts
// mach-table.config.ts
import { h } from "vue";
import { ElDatePicker, ElInput, ElInputNumber, ElOption, ElSelect } from "element-plus";
import { defineMachTableConfig } from "@agile-team/mach-table-vue";
import { createElementPlusEditors } from "@agile-team/mach-table-vue/editors";

const ep = createElementPlusEditors(
  {
    input: ElInput,
    inputNumber: ElInputNumber,
    select: ElSelect,
    datePicker: ElDatePicker
  },
  {
    select: {
      children: ({ params }) =>
        (params.colDef.cellEditorParams?.values ?? []).map((item: any) =>
          h(ElOption, {
            label: typeof item === "object" ? item.label : item,
            value: typeof item === "object" ? item.value : item
          }))
    },
    date: { props: { type: "date", valueFormat: "YYYY-MM-DD", teleported: true } }
  }
);

export default defineMachTableConfig({
  components: { cellEditors: {
    "ep-input": ep.input!,
    "ep-number": ep.number!,
    "ep-select": ep.select!,
    "ep-date": ep.date!
  }}
});
```

页面只声明编辑器名称：

```ts
const columns: ColDef<Order>[] = [
  { field: "customer", editable: true, cellEditor: "ep-input" },
  { field: "amount", editable: true, cellEditor: "ep-number" },
  { field: "status", editable: true, cellEditor: "ep-select",
    cellEditorParams: { values: [{ label: "待处理", value: "pending" }, { label: "已完成", value: "done" }] } },
  { field: "deliveryDate", editable: true, cellEditor: "ep-date" }
];
```

编辑器桥接统一处理 `modelValue`、初始聚焦、宽度和销毁；Enter/Escape/Tab 仍由表格编辑事务管理。非 EP 组件用通用工厂 `vueCellEditor(Component, { props, focusSelector, valueProp?, updateEvent? })`。

### 主题桥接

```css
.mach-root {
  --mach-primary: var(--el-color-primary, #409eff);
  --mach-border-color: var(--el-border-color-lighter, #e4e7ed);
  --mach-header-bg: var(--el-fill-color-light, #f5f7fa);
  --mach-body-fg: var(--el-text-color-primary, #303133);
  --mach-row-hover-bg: var(--el-fill-color-light, #f5f7fa);
}
html.dark .mach-root {
  --mach-border-color: var(--el-border-color-dark, #414243);
  --mach-header-bg: var(--el-fill-color-darker, #1d1d1d);
  --mach-body-fg: var(--el-text-color-primary, #e5eaf3);
  color-scheme: dark;
}
```

EP `size="small"` 对应表格 `size: "compact"`，默认对应 `normal`。

## 通用边界

| 关注点 | 说明 |
| --- | --- |
| 样式作用域 | `.mach-root` 封闭，不影响宿主组件库 |
| 弹层 z-index | 组件库有全局弹层管理时，覆写 `--mach-z-popup` / `--mach-z-menu` 对齐层级 |
| Dialog / Drawer | 隐藏容器变为可见后调用一次 `table.api.value?.view.refreshLayout()` |
| 保存闭环 | UI 编辑器只负责输入；提交统一走 `useMachTableEditing`（单元格/整行/异步校验/部分成功/冲突同一套规则），不因 UI 库不同形成多套业务状态 |
| 依赖 | Core 零依赖、vue 包 peer vue ≥ 3.2，不与组件库任何包冲突 |

## 与 @robot-admin/naive-ui-components 配合

Robot Admin 体系内两者共存互补：

- 只读大数据可视化大屏 → 组件库现有 C_Table（VTable 方案）
- 强交互业务表格（编辑/校验/框选/明细）→ MachTable（Robot_Admin 已正式安装 0.42.1）
- 组件库可新增 `C_Grid` 或给表格加 `renderType: "machTable"`，内部做一次列描述符映射（`TableColumnDesc → ColDef`）委托 MachTable 渲染

## 相关文档

[Vue 接入](/mach/table-vue) · [高级能力](/mach/table-advanced) · [GridOptions](/mach/table-grid-options)
· 仓库完整指南：[Naive UI 集成](https://github.com/ChenyCHENYU/MachTable/blob/main/docs/guide/naive-ui.md) · [Element Plus 集成](https://github.com/ChenyCHENYU/MachTable/blob/main/docs/guide/element-plus.md)
