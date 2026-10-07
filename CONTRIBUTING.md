# 参与共建

感谢你有兴趣为 AGILE TEAM 文档站做贡献 —— 每一个页面右下角都有「在 GitHub 上编辑」入口，小事直接改，大事先对齐。

## 快速路径

| 我想… | 怎么做 |
| --- | --- |
| 修正错别字 / 小瑕疵 | 直接点击页面右下角编辑链接，提交 PR |
| 纠正组件文档错误 | 提 [文档纠错 Issue](https://github.com/ChenyCHENYU/AgileTeam_Doc/issues/new?template=docs-bug.yml)，附页面链接与预期内容 |
| 新增 / 补全组件文档 | 参考 [components/snippets/contribute](docs/document/robot/components/snippets/contribute.md) 的页面结构规范 |
| 反馈组件本身 Bug | 前往 [Robot_Admin 仓库](https://github.com/ChenyCHENYU/Robot_Admin/issues) 提交 |

## 文档页结构规范

组件文档页统一结构（参考 `docs/document/robot/components/barcode.md`）：

```markdown
---
outline: "deep"
description: "一句话导读（会进入搜索摘要与 og:description）"
---

# C_Xxx 组件名

> emoji 一句话定位

## 🚀 在线演示        ← <DemoIframe src="/preview/xxx" />
## ✨ 特性            ← 4-8 条，每条一行
## 📦 安装            ← code-group：bun / pnpm / npm
## 🎯 基础用法         ← 可运行代码示例
## 📋 API             ← Props / Events / Slots 表格（对照组件库 types.ts）
```

## 本地开发

```bash
git clone https://github.com/ChenyCHENYU/AgileTeam_Doc.git
cd AgileTeam_Doc
bun install
bun run dev       # http://localhost:5888
```

## 提交前自查

- [ ] `bun run build` 通过（含死链检测）
- [ ] 新页面已在 `docs/.vitepress/_config/sidebarArr.js` 登记
- [ ] frontmatter 含 `description`
- [ ] 组件 API 与 `naive-ui-components` 包内 `types.ts` 一致，未凭记忆编写

## 提交信息约定

沿用仓库现有风格：`feat:` / `fix:` / `docs:` / `chore:` / `优化:` + 中文摘要。
