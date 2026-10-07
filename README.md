<div align="center">

<a href="https://www.tzagileteam.com">
  <img src="https://www.tzagileteam.com/assets/img/robot.webp" width="150" alt="AGILE TEAM">
</a>

<br>

# AGILE TEAM

**Robot Admin 企业级中后台框架 · 敏捷团队一站式文档站**

*拥抱开放，拥抱变化*

`Vue 3.5` · `TypeScript 5.8` · `Naive UI` · `Vite 8` · `VitePress` · `UniApp`

<br>

[![CI][ci-badge]][ci-url]
[![License: MIT][license-badge]][license-url]
[![npm][components-badge]][components-url]
[![npm][cli-badge]][cli-url]
[![Docs][docs-badge]][docs-url]

**文档站** · [tzagileteam.com][docs-url] &nbsp;|&nbsp; **在线演示** · [robotadmin.cn][demo-url] &nbsp;|&nbsp; **Gitee 镜像** · [AgileTeam_Doc][gitee-url]

</div>

---

## ✨ 特性

- 🧩 **54 个生产级组件** — 表单引擎、虚拟滚动表格、流程图、电子签名，TypeScript 类型完备
- 📱 **一套设计规范，多端复用** — 中后台与 uniApp 跨端（H5 / 微信小程序 / App）共享开发范式
- ⚡ **60 秒项目初始化** — 脚手架智能模板，自动检测 bun / pnpm
- 🔌 **8 个工程化插件** — 多环境管理、首屏优化、类型清理、多仓库同步推送
- 📖 **文档即团队资产** — 产品 / 设计 / 前端 / 后端 / 测试 / 运维 / 管理六大角色全覆盖
- 🌗 **深色模式与本地全文搜索** — 225 页文档即搜即达

## 🧭 文档导航

| 板块 | 内容 |
| --- | --- |
| [Robot Admin 指南][guide-url] | 架构 · 认证授权 · 路由 · 状态管理 · 工程实践 |
| [组件文档][components-doc-url] | 54 个组件：在线演示 + API + 代码示例 |
| [插件文档][plugin-url] | 8 个工程化插件的使用指南 |
| [脚手架 CLI][cli-doc-url] | 模板体系与项目创建流程 |
| [Robot uniApp][uniapp-url] | 跨端指南与 33 个移动端组件 |
| [岗位文档][roles-url] | 产品 / 设计 / 前后端 / 测试 / 运维 / 管理规范 |

## 📦 生态

- **[Robot_Admin][demo-url]** `v2.7.0` — 中后台主框架（Vue 3.5 · TS 5.8 · Vite 8 · UnoCSS）
- **[@robot-admin/naive-ui-components][components-url]** `v0.13.6` — 54 个业务组件独立包，`RobotNaiveUiResolver` 按需自动导入
- **[@agile-team/robot-cli][cli-url]** `v3.2.0` — 脚手架，一键创建项目
- **Robot uniApp** `v1.8.0` / **[@robot-h5/core][h5core-url]** `v1.2.0` — 跨端移动框架与核心能力包

## 🚀 快速开始

创建中后台项目：

```bash
npx @agile-team/robot-cli create my-project
```

本地运行文档站：

```bash
git clone https://github.com/ChenyCHENYU/AgileTeam_Doc.git
cd AgileTeam_Doc
bun install && bun run dev
```

## 🤝 参与共建

欢迎通过 [Issue][issues-url] 反馈问题或提交 Pull Request —— 文档站每个页面右下角都支持「在 GitHub 上编辑」。

[![Star History](https://api.star-history.com/svg?repos=ChenyCHENYU/AgileTeam_Doc&type=Date)](https://star-history.com/#ChenyCHENYU/AgileTeam_Doc&Date)

## 📄 License

[MIT](./LICENSE) © 2025 CHENY · [博客][blog-url] · [GitHub][github-url] · [Gitee][gitee-url]

<!-- 链接引用定义（保持正文干净） -->

[ci-badge]: https://img.shields.io/github/actions/workflow/status/ChenyCHENYU/AgileTeam_Doc/ci.yml?style=flat-square&label=CI
[ci-url]: https://github.com/ChenyCHENYU/AgileTeam_Doc/actions/workflows/ci.yml
[license-badge]: https://img.shields.io/badge/License-MIT-18A058?style=flat-square
[license-url]: ./LICENSE
[components-badge]: https://img.shields.io/npm/v/@robot-admin/naive-ui-components?style=flat-square&color=18A058&label=%40robot-admin%2Fnaive-ui-components
[components-url]: https://www.npmjs.com/package/@robot-admin/naive-ui-components
[cli-badge]: https://img.shields.io/npm/v/@agile-team/robot-cli?style=flat-square&color=18A058&label=%40agile-team%2Frobot-cli
[cli-url]: https://www.npmjs.com/package/@agile-team/robot-cli
[docs-badge]: https://img.shields.io/badge/docs-tzagileteam.com-6366f1?style=flat-square
[docs-url]: https://www.tzagileteam.com
[demo-url]: https://www.robotadmin.cn
[gitee-url]: https://gitee.com/ChenyCHENYU/AgileTeam_Doc
[guide-url]: https://www.tzagileteam.com/robot/guide/overview
[components-doc-url]: https://www.tzagileteam.com/robot/components/preface
[plugin-url]: https://www.tzagileteam.com/robot/plugin/console
[cli-doc-url]: https://www.tzagileteam.com/robot/cli/
[uniapp-url]: https://www.tzagileteam.com/uniapp/guide/overview
[roles-url]: https://www.tzagileteam.com/po/standard/introduction
[h5core-url]: https://www.npmjs.com/package/@robot-h5/core
[issues-url]: https://github.com/ChenyCHENYU/AgileTeam_Doc/issues
[blog-url]: https://yangchenyu.top
[github-url]: https://github.com/ChenyCHENYU
