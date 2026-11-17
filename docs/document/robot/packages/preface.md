---
outline: "deep"
description: "robot-admin-packages 是 Robot Admin 可复用、可插拔的公共能力 Monorepo：7 个运行时能力包 + 1 个工程工具，独立版本、Bun Workspaces、Changesets 发版。本页为生态包总览与能力地图。"
reviewAfter: "2027-05-16"
---

# 生态包总览（robot-admin-packages）

<div class="hero-banner">
  <h2>📦 可复用、可插拔的公共能力 Monorepo</h2>
  <p>7 个运行时能力包 · 1 个工程工具 · 独立版本 · Bun Workspaces</p>
</div>

[robot-admin-packages](https://github.com/ChenyCHENYU/robot-admin-packages) 把 Robot Admin 中可复用的能力做成独立 npm 包，让应用专注业务。所有包以 `@robot-admin/*` scope 发布、走 [Changesets](https://changesets.dev/) 独立发版，Robot Admin（v2.7.0）已全部正式消费。

## 能力地图

| 包 | 版本 | 一句话定位 |
| :--- | :---: | :--- |
| [@robot-admin/request-core](/robot/packages/request-core) | 0.7.0 | 实例级 Axios 编排与 Vue Headless CRUD 组合式函数 |
| [@robot-admin/dictionary](/robot/packages/dictionary) | 0.6.1 | 实例级字典/枚举，弹性加载 + 可选 Vue 集成 |
| [@robot-admin/form-validate](/robot/packages/form-validate) | 3.4.4 | 框架无关 RuleSpec，单包同时支持 Naive UI 与 Element Plus |
| [@robot-admin/file-utils](/robot/packages/file-utils) | 3.0.4 | Excel / CSV / ZIP / 图片 / 下载 / 可续传分片工具集 |
| [@robot-admin/directives](/robot/packages/directives) | 2.0.2 | 11 个 Vue 3 交互指令（复制/防抖/节流/拖拽/权限/水印…） |
| [@robot-admin/layout](/robot/packages/layout) | 3.3.4 | 6 种布局骨架 + 设置抽屉 + 宿主上下文 |
| [@robot-admin/theme](/robot/packages/theme) | 0.6.2 | 设计 Token、明暗/3 套设计风格、Pinia store、Naive 适配 |
| [@robot-admin/git-standards](/robot/packages/git-standards) | 1.0.6 | 零配置 Git 标准化 CLI（`robot-standards`） |

## 分层入口约定

运行时包普遍提供分层入口，按宿主依赖选择，避免引入不需要的运行时：

- **`/core` 或根入口**：框架无关内核（如 theme 的 Token、layout 的设置协议、dictionary 的根入口）
- **`/vue`**：Vue / Pinia 集成层，不绑定 UI 组件库
- **`/naive`**：Naive UI 呈现层（request-core 的 `useNaiveTableCrud`、layout 的骨架与设置抽屉、theme 的 `useNaiveTheme`）
- Element Plus 项目可复用 `/core` 与 `/vue` 层（form-validate 则是单包同时输出两套规则）

## 本地联调与发布

- **同目录联调**：与 Robot_Admin 同级时，`bun run dev:local` 直接以源码 HMR 联调
- **发布消费**：生产使用精确 npm 版本，`bun run verify` 全量门禁（类型 → 测试 → 构建 → 包检查）
- **版本策略**：子包用户可见变化走 Changesets 独立发版；纯文档调整不改版本

## 生态关系

- **Robot_Admin** — 应用演示与最大消费方
- **naive-ui-components** — 63 个业务组件库（独立仓库），依赖本 monorepo 的 form-validate
- **Robot_Cloud** — 认证与系统管理后端

::: tip 与组件文档的关系
`C_Layout` / `C_Header` / `C_MenuTop` 等布局能力已从组件库收敛进 `@robot-admin/layout`；指令类能力（v-copy、v-permission 等 11 项）统一由 `@robot-admin/directives` 提供。
:::
