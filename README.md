<div align="center">

# 🤖 Robot Admin

### 现代化企业级中后台框架 & 敏捷团队文档站

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D.svg?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Naive UI](https://img.shields.io/badge/Naive_UI-2.43-18A058.svg)](https://www.naiveui.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Components](https://img.shields.io/badge/Components-51+-blue.svg)](https://www.tzagileteam.com/robot/components/preface)

**重新定义中后台开发体验 — 热更新 <100ms · 首屏 <2s · 产物 <2MB**

[🌐 文档站](https://www.tzagileteam.com/) • [🎯 在线演示](https://www.robotadmin.cn/) • [📦 组件库](https://www.tzagileteam.com/robot/components/preface) • [⚡ 脚手架](https://www.tzagileteam.com/robot/cli/)

</div>

---

## 🏗 技术架构

```
Vue 3.5 + TypeScript 5.8 + Naive UI 2.43 + Vite 7 + UnoCSS
├── 🧩 51 个生产级组件（@robot-admin/naive-ui-components）
├── 📱 Robot uniApp（33 个跨端组件，覆盖 H5/小程序/App）
├── ⚡ Robot CLI（60s 一键创建项目）
├── 🔌 8 个工程化插件
└── 📖 VitePress 文档站（六大角色全覆盖）
```

## 🧩 组件体系（51+）

| 分类           | 组件                                                          | 亮点                        |
| -------------- | ------------------------------------------------------------- | --------------------------- |
| **表单**       | C_Form（8种布局）· C_FormSearch · C_Cascade · C_Date · C_Time | 动态表单 + JSON Schema 驱动 |
| **表格**       | C_Table（虚拟滚动）· C_VTableGantt · C_DragSortTable          | 万级数据流畅渲染            |
| **数据可视化** | ECharts 6 · AntV X6 · OrgChart · Workflow                     | BPMN/ER/UML 流程引擎        |
| **编辑器**     | WangEditor · Markdown · Code · FormulaEditor                  | 富文本 + 公式 + 代码高亮    |
| **文件媒体**   | FilePreview · AudioPlayer · ImageCropper · Signature          | 在线预览 + 裁剪 + 电子签名  |
| **交互**       | ContextMenu · DragSort · Guide · GlobalSearch · Captcha       | 右键菜单 + 拖拽 + 新手引导  |
| **布局**       | Layout · Menu · Header · Breadcrumb · TagsView · SplitPane    | 多种布局模式 + 标签页       |
| **指令**       | v-copy · v-watermark · v-drag · v-permission · v-debounce     | 7+ 自定义指令               |

所有组件均提供 **在线演示**（嵌入 robotadmin.cn 真实环境）、TypeScript 类型定义和完整 API 文档。

## 📱 Robot uniApp

基于 **Vue 3 + UniApp + wot-design-uni** 的跨端移动框架：

- **33 个业务组件**：布局（4）· 数据展示（13）· 表单（5）· 反馈交互（5）· 导航（6）
- **多端覆盖**：H5 / 微信小程序 / Android / iOS
- **开箱即用**：与 Robot Admin 共享设计规范和开发范式

## ⚡ Robot CLI

```bash
npx @agile-team/robot-cli create my-project
```

60 秒完成项目创建：智能模板分类 · 搜索筛选 · 始终拉取最新版本 · 自动检测 bun/pnpm。

## 🔌 工程化插件（8 个）

| 插件                               | 用途                 |
| ---------------------------------- | -------------------- |
| `@robot-admin/naive-ui-components` | 组件库独立包         |
| `robot-admin-env-manager`          | 多环境配置管理       |
| `vite-plugin-preloader`            | 首屏加载优化         |
| `ts-type-cleaner`                  | TS 类型文件清理      |
| `mgit-push`                        | 多仓库同步推送       |
| `git-branch-check-diff-commits`    | 分支差异检查         |
| `vscode-config`                    | 团队 VSCode 统一配置 |
| `console`                          | 开发调试增强         |

## 📖 文档站

本仓库是 Robot Admin 的 **VitePress 文档站**，除组件/插件文档外，还包含敏捷团队的多角色协作文档：

- **产品** — 需求调研 · 分析 · 方案 · 规范 · 工具表单
- **设计** — 设计规范 · 视觉风格 · 工作流程
- **前端/后端** — 编码规范 · 工程架构 · 快速上手
- **测试** — 测试策略 · 用例设计 · 质量标准
- **运维** — 部署规范 · 版本管理
- **管理** — 6 大角色职责 · 27+ 项目管理模板 · 交付验收标准

## 🚀 快速开始

```bash
# 克隆
git clone https://github.com/ChenyCHENYU/AgileTeam_Doc.git
cd AgileTeam_Doc

# 安装（推荐 Bun）
bun install

# 启动文档站
bun run dev

# 构建
bun run build
```

## 📊 项目结构

```
docs/
├── .vitepress/            # VitePress 配置 + 主题定制
│   ├── _config/           # 模块化配置（nav/sidebar/search）
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
    ├── op/                # 🔧 运维文档
    ├── manage/            # 👔 管理（职责/模板/验收）
    └── team/              # 🏆 团队英雄墙
```

## 🔗 链接

|                     |                                              |
| ------------------- | -------------------------------------------- |
| 📖 文档站           | https://www.tzagileteam.com/                 |
| 🎯 Robot Admin 演示 | https://www.robotadmin.cn/                   |
| 💻 GitHub           | https://github.com/ChenyCHENYU/AgileTeam_Doc |
| 🔄 Gitee 镜像       | https://gitee.com/ChenyCHENYU/AgileTeam_Doc  |
| 📝 博客             | https://yangchenyu.com                       |

## 📄 License

[MIT](LICENSE) © 2025 CHENY - 金恒西安
