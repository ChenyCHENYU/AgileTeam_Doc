# 更新日志

本项目的所有重要变更都记录在此文件中。
格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本管理遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### 新增

- 组件文档补全 6 页：`C_Tabs` / `C_FormModal` / `C_Loading` / `C_PageLoading`（组件库）
  与 `C_EnvironmentBadge` / `C_LogoutTransition`（uniApp），均依据源码 types 编写

### 修正

- 生态项目归因：Robot_Uniapp（v1.0.0）与 Robot_H5（v1.8.0）严格区分，
  `@robot-h5/core` 归属 H5 项目；组件库版本对齐 v0.14.2（55 个组件）
- Robot_Cloud 版本标注为 `v1.0.0-SNAPSHOT`（与 pom.xml 一致）
- 首页角色区补全「运维」「团队」；组件分类计数改为实测分区（合计精确 55）
- 跨端组件数 33 → 35（Robot_Uniapp `src/components/global` 实测）

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

[3.1.0]: https://github.com/ChenyCHENYU/AgileTeam_Doc/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/ChenyCHENYU/AgileTeam_Doc/releases/tag/v3.0.0
