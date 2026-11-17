---
outline: "deep"
title: "更新日志"
description: "AGILE TEAM 文档站更新日志：版本特性、内容扩充与修正记录（自动同步自仓库 CHANGELOG.md）。"
---

# 📋 更新日志

本页由 `scripts/sync-changelog.mjs` 自动生成（`bun run dev` / `bun run build` 前执行），与仓库根 [CHANGELOG.md](https://github.com/ChenyCHENYU/AgileTeam_Doc/blob/main/CHANGELOG.md) 同源。当前最新版本：**3.2.0**。

# 更新日志

本项目的所有重要变更都记录在此文件中。
格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本管理遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### 新增

- **Mach 生态文档深度扩充 13 页**（依据两仓 docs/ 源文档与 README 提炼，从"介绍页"升级为"可用文档"）：
  - MachTable 6 页：Vue 接入（三种接入模式 / Props·事件·插槽 / useMachTable / 工作流 / adapters）、
    GridOptions 配置（数据与身份 / 布局主题 / 列交互 / 选择编辑剪贴板 / 树分组详情 / 分页远程 / Worker / 持久化 / i18n 全量配置表）、
    列定义 ColDef（标识 / 宽度 / 交互 / 值与渲染 / 编辑 / 选择与行 / 多级表头 / 工具列模板）、
    GridApi 与事件（根级能力 + 12 领域方法表 + 全量事件清单）、高级能力（场景预设与配置中心 / 编辑事务 / 远程查询 / 导入导出 /
    持久化 / 行拖拽 / 八个高级子入口）、UI 库集成（Naive UI 主题桥接与富编辑器 / Element Plus 编辑器工厂 / 通用边界）
  - MachReport 7 页：Vue 组件（Props·事件·ref 方法 / useMachReport state / 三种数据源 / 配置中心）、
    模板 DSL（createTemplate / createTableTemplate 完整选项表 / RenderPlan / 模板管理 API）、
    参数与数据（参数类型值契约表 / 远程搜索联动 / DatasetContract / 前后端复用校验）、
    编辑与填报（键盘操作表 / ReportEditingOptions / fields 类型控件 / 冲突核对 / Provider 编辑）、
    输出与导出（xlsx 能力矩阵与配置 / PDF 字体与 gzip / strict 保真）、工业标签（ReportLabelStudio / createLabelTemplate /
    绑定规则 / 多版份数 / 编码预算）、Node Runtime（describe·validate·prepare·export / 预算队列 / OpenAPI 与 Java 门面 /
    按页文档存储 / Worker）
- Mach sidebar 扩为 17 项（生态总览 + MachTable 7 页 + MachReport 8 页）；preface / table / report 入口页补子页导航

## [3.2.0] - 2026-11-16

### 新增

- **「Mach 生态」顶级导航**：新增 `/mach/` 板块 3 页 — 生态总览（双引擎定位 / 与 Robot Admin 关系 / Source-Available 授权）、
  MachTable（能力矩阵 / 四包体系 / Vue·React·原生快速开始 / 八个高级子入口）、MachReport（RenderPlan 架构 / 入口清单 / 本地·注册·Node Runtime 快速开始 / 工业标签）
- **「生态包」文档板块**：新增 `/robot/packages/` 9 页 — robot-admin-packages 总览（能力地图 / 分层入口 / dev:local 联调 / Changesets 版本策略）
  与 8 个包各一页（request-core 0.7.0 / dictionary 0.6.1 / form-validate 3.4.4 / file-utils 3.0.4 / directives 2.0.2 / layout 3.3.4 / theme 0.6.2 / git-standards 1.0.6），
  均依据各包 README 与 package.json 编写
- **组件文档补全 8 页**（依据组件库 0.40.5 源码 types）：`C_Select` / `C_AutoComplete` / `C_DataPicker` / `C_UserPicker` /
  `C_BatchResult` / `C_ErrorSummary` / `C_SectionNav` / `C_Density`，sidebar 同步挂载
- 组件文档补全 6 页：`C_Tabs` / `C_FormModal` / `C_Loading` / `C_PageLoading`（组件库）
  与 `C_EnvironmentBadge` / `C_LogoutTransition`（uniApp），均依据源码 types 编写
- 首页生态矩阵新增 `mach-report`（v2.26.1）与 `robot-admin-packages`（8 生态包）卡片
- `/robot/cli/` 侧边栏补基础条目（原为空数组）

### 修正

- **组件库口径全面对齐 v0.40.5（63 个组件）**：原 v0.14.2 / 55（部分页面 54）口径过时；
  guide 四页（overview / component-system / naive-ui-integration / project-structure）、components/preface、
  plugin/naive-ui-components、README、README_EN、HomePage 全部统一
- **MachTable 口径对齐 0.42.1 四包体系**：`@agile-team/mach-table`（Core）+ `-vue` / `-react` / `-xlsx`，
  原 `mach-table-vue v0.30.0` 单包口径过时；生态矩阵徽章切换到 Core 包
- **robot-cli 3.2 → 3.3.0**：三步创建流程、`--yes` / `--preset` 等非交互参数、`ROBOT_PROJECT.md` 记录、
  24 小时模板缓存；模板表修正为实际清单（robot-admin / robot-admin-base / robot-monorepo / robot-micro-app /
  robot-module-federation / robot-react(-base) / robot-h5 / robot-nest(-base/-micro) / robot-electron(-base)），
  修正 `robot-admin` 模板技术栈描述（Naive UI，非 Element Plus）
- 插件页 `naive-ui-components` 包名修正：`@agile-team/naive-ui-components` → `@robot-admin/naive-ui-components`（scope 迁移）
- `robot/guide/overview.md` Vite 7 → 8（与 Robot_Admin v2.7.0 的 vite 8.2.4 一致）
- `C_Layout` / `C_Header` / `C_MenuTop` 页面补充演进说明（布局能力收敛进 `@robot-admin/layout`）
- 组件 preface 统计表与指令表更新（11 个指令，`v-draggable` 修正为 `v-drag`，补充 v-lazy / v-loading / v-tooltip / v-click-outside）
- 生态项目归因：Robot_Uniapp（v1.0.0）与 Robot_H5（v1.8.0）严格区分，
  `@robot-h5/core` 归属 H5 项目
- Robot_Cloud 版本标注为 `v1.0.0-SNAPSHOT`（与 pom.xml 一致）
- 首页角色区补全「运维」「团队」；组件分类计数改为实测分区（合计精确 63）
- 跨端组件数 33 → 35（Robot_Uniapp `src/components/global` 实测）

### 新增（站点工程与体验）

- **站内更新日志页** `/changelog`：新增 `scripts/sync-changelog.mjs`，`bun run dev` / `build` 前自动同步根
  CHANGELOG.md（包装 frontmatter），导航「文档中心 → 管理」与侧边栏挂载
- **Robot_H5 文档页** `/h5/overview`：框架定位、能力地图（账号/业务示例/外观/15 设备 Hook/wl-mbase）、快速开始、
  页面路由与接口约定、项目结构；导航「Robot uniApp」菜单、首页生态卡片（原仅链 GitHub）同步指向
- **MachTable 场景配方精选页** `/mach/table-recipes`：远程查询（useMachTableQuery 完整协议）、
  批量保存与乐观锁冲突、树形懒加载三个高频场景的可落地代码
- **og:image 分享卡**：新增 `scripts/generate-og-image.mjs`（sharp，1200×630 渐变底 + 首页横幅居中），
  `head.js` 补 og:image / og:image:width / og:image:height / twitter:card
- **生态版本事实源** `docs/.vitepress/_config/versions.js`：HomePage 数据条 / 生态矩阵 / hero 文案全部改为
  构建期引用单一数据源，升级版本只改一处
- Lighthouse CI 预算页面扩至 7 个（补 /mach/preface、/mach/table-grid-options、/mach/report-editing、
  /robot/packages/preface）；Mach 导航下拉补「配置参考」「编辑与填报」直达
- README / README_EN 全面重排：完整徽章墙（CI · License · 4 npm 动态徽章）、Mach 双引擎卡片区、
  更新日志与 H5 平台文档深链、工程化质量与项目结构说明刷新

## [3.1.0] - 2026-10-07

### 新增

- **全定制首页**：弃用 VitePress 默认 home 模板，新增 `HomePage.vue` 分区式设计 —
  Hero / 数据条（54·33·8·225+·6）/ 生态矩阵（不对称网格 + 版本徽章）/ 组件体系（8 分类）/ 六大角色 / 终端风 CTA
- **SEO 三件套**：`sitemap.xml`、`robots.txt`、页面级 og 标签与 canonical；正文自动提取 description（210/225 页生效）
- **GitHub Actions CI**：bun install → vitepress build → 死链检测全量校验
- **Lighthouse CI**：性能 / SEO / 无障碍预算守护
- **图片优化脚本**：`bun run optimize:images`（sharp），logo 738KB→6KB、hero 转 WebP 30KB
- **SVG logo 体系**：品牌机器人标识（仓库 raw 直链，不依赖部署状态）+ SVG favicon
- **文档补全**：6 个空组件页（avatar-group / transfer / audio-player / chat / context-menu / timeline）
  依据组件库 `types.ts` 编写完整特性 / 安装 / API；89 个组件页补充 frontmatter description
- 生态矩阵收录 `@agile-team/mach-table-vue` 并挂 npm 动态徽章（版本 + 月下载自动更新）

### 修复

- 导航死链：「运维文档」指向不存在的 `/op/standard/norm`，改指 `/manage/job-responsibility/op`
- 首页特性卡片四色体系与错峰入场动画失效（`nth-child` 作用域错误，全部命中 index 1）
- DemoIframe 移动端高度硬编码 → 宽高比自适应（375px 屏实测 433px）
- Giscus 评论区残留 console.log；smartNewBadge 生产日志默认关闭 + MutationObserver 防抖
- 博客域名 `.com` → `.top`（3 处）；组件数口径 51 → 54；组件库版本 v0.8.1 → v0.13.6

### 性能

- 首页视觉升级为 Linear / Vercel 式极简风：单一极光合成器动画替代粒子 / 旋转光晕 / 全屏滤镜三组重绘源
- `vercel.json`：`/assets/*` 一年 immutable 缓存、`/pdf/*` 七天缓存、全站安全响应头
- 删除未使用依赖（naive-ui / @robot-admin/naive-ui-components），安装提速约 1/3

### 移除

- GitHub Pages 遗留 `CNAME`、无广告代码引用的孤儿 `ads.txt`、`.vscode` 追踪

## [3.0.0] - 2025-08-06

- 文档站架构升级：模块化配置拆分（nav / sidebar / search / head）
- DemoIframe 组件演示方案：嵌入 robotadmin.cn 真实环境
- 宽屏布局适配（参考 Element Plus 方案）+ 导航栏精简
- robot-uniApp 移动端文档（33 个跨端组件）

[3.2.0]: https://github.com/ChenyCHENYU/AgileTeam_Doc/compare/v3.1.0...v3.2.0
[3.1.0]: https://github.com/ChenyCHENYU/AgileTeam_Doc/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/ChenyCHENYU/AgileTeam_Doc/releases/tag/v3.0.0

