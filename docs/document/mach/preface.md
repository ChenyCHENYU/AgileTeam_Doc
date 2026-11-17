---
outline: "deep"
description: "Mach 生态是 Agile Team 面向复杂 B 端业务的自研引擎矩阵：MachTable 企业数据表格引擎与 MachReport 报表引擎。本页总览双引擎定位、包体系、与 Robot Admin 的关系及授权说明。"
reviewAfter: "2027-05-16"
---

# Mach 生态总览

<div class="hero-banner">
  <h2>⚙️ 面向复杂 B 端业务的引擎矩阵</h2>
  <p>数据表格 · 报表输出 · 框架无关内核 · 前后端共用契约</p>
</div>

Mach 生态是 Agile Team 沉淀多年的两台自研引擎：**MachTable** 解决"复杂业务数据怎么高效呈现与编辑"，**MachReport** 解决"业务数据怎么按工业标准排版输出"。两者共用 `@agile-team` npm scope、TypeScript-first 内核与配置中心体验（`defineMachTableConfig` / `defineMachReportConfig`），可独立使用，也可与 Robot Admin 中后台框架无缝组合。

## 双引擎定位

| 维度 | MachTable 数据表格引擎 | MachReport 报表引擎 |
| :---: | :--- | :--- |
| 一句话 | 高性能企业数据表格（Data Grid） | 分页报表引擎 + Vue 3 预览组件 |
| 解决什么 | 后台列表、工业台账、订单/工单、低代码表格底座 | 业务宽表、明细台账、工业标签、填报核对 |
| 架构 | 框架无关 Core + Vue 3 / React 18 官方适配 | 模板 + 数据 + 输出分离，`RenderPlan` 统一中间产物 |
| 当前版本 | v0.42.1（四包同步） | v2.26.1（单包多入口） |
| npm 包 | `@agile-team/mach-table` `-vue` `-react` `-xlsx` | `@agile-team/mach-report` |
| 输出能力 | CSV / XLSX 导出、远程全量导出快照 | 预览 / 打印 / PDF / 真 `.xlsx` / 逐页 PNG / Word 兼容 `.doc` |
| 仓库 | [github.com/ChenyCHENYU/MachTable](https://github.com/ChenyCHENYU/MachTable) | [github.com/ChenyCHENYU/MachReport](https://github.com/ChenyCHENYU/MachReport) |

## 与 Robot Admin 的关系

Robot Admin（v2.7.0）已正式安装 `@agile-team/mach-table-vue` 0.42.1 作为数据表格底座，并通过 Chromium / Firefox / WebKit 三浏览器回归验收。MachTable 与 MachReport 不绑定任何 UI 组件库：

- MachTable 提供与 Naive UI、Element Plus 的官方集成指南（CSS 变量桥接、编辑器桥接）
- MachReport 预览外壳主题仅影响自身，不改写模板与导出样式

因此两个引擎可以直接服务于任意 Vue 3 / React / 原生 TS 项目，不要求先接入 Robot Admin。

## 共同的工程基因

- **内核零运行时依赖**：重型依赖（ExcelJS、pdf-lib、node-sql-parser、BWIPP 条码等）内联进对应子入口，按需加载
- **配置中心**：应用 `defaults` → 命名 `presets` → 单实例 props 逐层覆盖，配置来源可解释
- **有界执行**：并发、队列、取消、内存预算都有明确边界，不承诺无法兑现的抢占
- **质量门禁**：`pnpm verify` 覆盖类型、Lint、复杂度上限、覆盖率、API 快照、publint、gzip 预算；Playwright 三浏览器 E2E

## 授权说明

两个引擎均采用 **Source-Available License 1.0**（源码可查看、可学习、可内部使用，商业授权需书面许可），与文档站其余 MIT 组件库不同。商用或分发前请查阅各仓库 `LICENSE` 文件。

## 下一步

**MachTable 表格引擎**

- [介绍与快速开始](/mach/table) — 能力矩阵、四包体系、Vue/React/原生 60 秒上手
- [Vue 接入](/mach/table-vue) · [GridOptions 配置](/mach/table-grid-options) · [列定义 ColDef](/mach/table-col-def) · [GridApi 与事件](/mach/table-grid-api) · [高级能力](/mach/table-advanced) · [UI 库集成](/mach/table-integration)

**MachReport 报表引擎**

- [介绍与快速开始](/mach/report) — RenderPlan 架构、入口清单、本地/注册/Node 快速开始
- [Vue 组件](/mach/report-vue) · [模板 DSL](/mach/report-template) · [参数与数据](/mach/report-data) · [编辑与填报](/mach/report-editing) · [输出与导出](/mach/report-export) · [工业标签](/mach/report-labels) · [Node Runtime](/mach/report-server)
