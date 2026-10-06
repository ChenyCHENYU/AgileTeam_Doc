<div align="center">

<a href="https://www.tzagileteam.com">
  <img src="https://www.tzagileteam.com/assets/img/robot.webp" width="150" alt="Robot Admin" />
</a>

&nbsp;

# Robot Admin

### 企业级中后台全链路解决方案

**Vue 3.5** &nbsp;·&nbsp; **TypeScript 5.8** &nbsp;·&nbsp; **Naive UI 2.44** &nbsp;·&nbsp; **Vite 8** &nbsp;·&nbsp; **UniApp**

&nbsp;

[![CI](https://img.shields.io/github/actions/workflow/status/ChenyCHENYU/AgileTeam_Doc/ci.yml?style=for-the-badge&label=CI)](https://github.com/ChenyCHENYU/AgileTeam_Doc/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](./LICENSE)
[![Components](https://img.shields.io/badge/Components-54-3B82F6?style=for-the-badge)](https://www.tzagileteam.com/robot/components/preface)
[![Docs](https://img.shields.io/badge/Docs-225%20pages-8B5CF6?style=for-the-badge)](https://www.tzagileteam.com)

[![npm](https://img.shields.io/npm/v/@robot-admin/naive-ui-components?style=for-the-badge&color=18A058&label=%40robot-admin%2Fcomponents)](https://www.npmjs.com/package/@robot-admin/naive-ui-components)
[![npm](https://img.shields.io/npm/v/@agile-team/robot-cli?style=for-the-badge&color=18A058&label=robot--cli)](https://www.npmjs.com/package/@agile-team/robot-cli)
[![VitePress](https://img.shields.io/badge/Powered%20by-VitePress-646CFF?style=for-the-badge)](https://vitepress.dev)

&nbsp;

**热更新 < 100ms** &nbsp;·&nbsp; **首屏 < 2s** &nbsp;·&nbsp; **产物 < 2MB**

**54** 生产级组件 &nbsp;|&nbsp; **33** 跨端组件 &nbsp;|&nbsp; **8** 工程化插件 &nbsp;|&nbsp; **6** 大角色文档

&nbsp;

[🌐 文档站](https://www.tzagileteam.com) &nbsp;·&nbsp; [🎯 在线演示](https://www.robotadmin.cn) &nbsp;·&nbsp; [📦 组件文档](https://www.tzagileteam.com/robot/components/preface) &nbsp;·&nbsp; [⚡ 脚手架](https://www.tzagileteam.com/robot/cli/)

</div>

---

## 设计理念

> 中后台开发不该是重复的堆砌，而应是工程化的沉淀。

| | |
| --- | --- |
| **🧩 沉淀复用** | 54 个业务组件独立成包，一套设计规范横跨中后台与移动端 |
| **⚡ 极致体验** | 热更新百毫秒级、首屏秒开、产物精简，性能作为默认约束 |
| **📖 文档即团队** | 文档站覆盖产品到运维六大角色，知识资产随代码同源演进 |

## 特性总览

| | |
| --- | --- |
| **🚀 工程化脚手架**<br>60 秒创建项目：智能模板、搜索筛选、自动检测 bun / pnpm | **🧩 组件自动导入**<br>`RobotNaiveUiResolver` 按需加载，TypeScript 类型完备 |
| **📱 一码多端**<br>uniApp 跨端方案覆盖 H5 / 微信小程序 / Android / iOS | **🔌 工程化插件矩阵**<br>多环境管理、首屏优化、类型清理、多仓库推送开箱即用 |
| **🌗 主题系统**<br>深浅双主题完整适配，文档演示环境实时联动 | **🔍 全文搜索**<br>本地索引中文搜索，225 页文档即搜即达 |

## 组件体系

| 分类 | 组件 | 亮点 |
| --- | --- | --- |
| 表单 | `C_Form`（8 种布局）· `C_FormSearch` · `C_FormModal` · `C_Cascade` · `C_Date` · `C_Time` · `C_Cron` | 动态表单 + 联动 + 异步选项 |
| 表格 | `C_Table`（虚拟滚动）· `C_VtableGantt` · `C_Draggable` | 万级数据流畅渲染 |
| 可视化 | `C_AntV`（X6）· `C_WorkFlow` · `C_OrgChart` · `C_Timeline` · `C_FullCalendar` | BPMN / ER / UML 流程引擎 |
| 编辑器 | `C_Editor` · `C_Markdown` · `C_Code` · `C_FormulaEditor` | 富文本 + 公式 + 代码高亮 |
| 媒体 | `C_FilePreview` · `C_VideoPlayer` · `C_ImageCropper` · `C_Signature` · `C_QRCode` · `C_Barcode` | 在线预览 + 裁剪 + 电子签名 |
| 交互 | `C_Chat` · `C_ContextMenu` · `C_GlobalSearch` · `C_Guide` · `C_Captcha` · `C_NotificationCenter` | 右键菜单 + 拖拽 + 新手引导 |
| 布局 | `C_Menu` · `C_Breadcrumb` · `C_TagsView` · `C_SplitPane` · `C_WaterFall` | 多布局模式 + 标签页 |
| 业务 | `C_Login` · `C_Map` · `C_City` · `C_Transfer` · `C_Tree` · `C_Steps` · `C_Theme` 等 | 开箱即用的业务能力 |

所有组件均提供**在线演示**（嵌入 robotadmin.cn 真实环境）、TypeScript 类型定义与完整 API 文档。

## 生态矩阵

| 项目 | 版本 | 说明 |
| --- | --- | --- |
| [Robot_Admin](https://www.robotadmin.cn) | 2.7.0 | 中后台主框架（Vue 3.5 + TS 5.8 + Vite 8 + UnoCSS） |
| [@robot-admin/naive-ui-components](https://www.npmjs.com/package/@robot-admin/naive-ui-components) | 0.13.6 | 54 个业务组件独立包，按需自动导入 |
| Robot uniApp | 1.8.0 | 跨端移动框架，33 个业务组件 |
| [@robot-h5/core](https://www.npmjs.com/package/@robot-h5/core) | 1.2.0 | uniApp 核心能力（Bridge / Hooks / 离线存储） |
| [@agile-team/robot-cli](https://www.npmjs.com/package/@agile-team/robot-cli) | 3.2.0 | 脚手架，60s 一键创建项目 |

<details>
<summary><b>🔌 8 个工程化插件</b></summary>

| 插件 | 用途 |
| --- | --- |
| `@robot-admin/naive-ui-components` | 组件库独立包 |
| `robot-admin-env-manager` | 多环境配置管理 |
| `vite-plugin-preloader` | 首屏加载优化 |
| `ts-type-cleaner` | TS 类型文件清理 |
| `mgit-push` | 多仓库同步推送 |
| `git-branch-check-diff-commits` | 分支差异检查 |
| `vscode-config` | 团队 VSCode 统一配置 |
| `console` | 开发调试增强 |

</details>

## 快速开始

**脚手架创建（推荐）**

```bash
npx @agile-team/robot-cli create my-project
```

**本仓库（文档站）**

```bash
git clone https://github.com/ChenyCHENYU/AgileTeam_Doc.git
cd AgileTeam_Doc
bun install     # 安装依赖（推荐 Bun）
bun run dev     # 启动文档站
bun run build   # 构建生产版本
```

## 文档站

本仓库是 Robot Admin 的 **VitePress 文档站**，除组件 / 插件 / CLI 文档外，还包含敏捷团队的多角色协作文档：

| 角色 | 内容 |
| --- | --- |
| 📋 产品 | 需求调研 · 分析 · 方案 · 规范 · 工具表单 |
| 🎨 设计 | 设计规范 · 视觉风格 · 工作流程 |
| 💻 前端 | 编码规范 · 工程架构 · Vue3 实战 |
| ⚙️ 后端 | 编码规范 · 工程架构 · 快速上手 |
| 🧪 测试 | 测试策略 · 用例设计 · 质量标准 |
| 🔧 运维 | 部署规范 · 版本管理 |
| 👔 管理 | 角色职责 · 27+ 模板 · 交付验收标准 |

<details>
<summary><b>📁 项目结构</b></summary>

```
docs/
├── .vitepress/            # VitePress 配置 + 主题定制
│   ├── _config/           # 模块化配置（nav/sidebar/search/SEO）
│   ├── components/        # Vue 组件（DemoIframe/评论/徽章）
│   └── theme/             # 主题（布局优化/首页样式/功能模块）
└── document/
    ├── robot/             # 🤖 Robot Admin（指南/组件/插件/CLI）
    ├── uniapp/            # 📱 Robot uniApp（指南/组件）
    ├── po/                # 📋 产品文档
    ├── ui/                # 🎨 设计文档
    ├── web/               # 💻 前端文档
    ├── rear-end/          # ⚙️ 后端文档
    ├── qc/                # 🧪 测试文档
    ├── manage/            # 👔 管理（职责/模板/验收）
    └── team/              # 🏆 团队英雄墙
```

</details>

## 贡献

欢迎通过 [Issue](https://github.com/ChenyCHENYU/AgileTeam_Doc/issues) 反馈问题或提交 Pull Request 参与共建 —— 文档站的每个页面都支持「在 GitHub 上编辑」。

[![Star History](https://api.star-history.com/svg?repos=ChenyCHENYU/AgileTeam_Doc&type=Date)](https://star-history.com/#ChenyCHENYU/AgileTeam_Doc&Date)

## 相关链接

| | |
| --- | --- |
| 📖 文档站 | https://www.tzagileteam.com |
| 🎯 在线演示 | https://www.robotadmin.cn |
| 💻 GitHub | https://github.com/ChenyCHENYU/AgileTeam_Doc |
| 🔄 Gitee 镜像 | https://gitee.com/ChenyCHENYU/AgileTeam_Doc |
| 📝 博客 | https://yangchenyu.top |

## License

[MIT](./LICENSE) © 2025 CHENY - 金恒西安
