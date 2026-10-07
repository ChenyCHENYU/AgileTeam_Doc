<div align="center">

<a href="https://www.tzagileteam.com">
  <img src="https://raw.githubusercontent.com/ChenyCHENYU/AgileTeam_Doc/main/docs/document/public/logo.svg" width="150" alt="AGILE TEAM">
</a>

<br>

# AGILE TEAM

**Robot Admin Enterprise Admin Framework · One-stop Docs Platform for Agile Teams**

*Embrace openness, embrace change*

`Vue 3.5` · `TypeScript 5.8` · `Naive UI` · `Vite 8` · `VitePress` · `UniApp`

<br>

[![CI][ci-badge]][ci-url]
[![License: MIT][license-badge]][license-url]
[![npm][components-badge]][components-url]
[![npm downloads][components-dt-badge]][components-url]
[![npm][cli-badge]][cli-url]
[![Docs][docs-badge]][docs-url]

**Docs** · [tzagileteam.com][docs-url] &nbsp;|&nbsp; **Live Demo** · [robotadmin.cn][demo-url] &nbsp;|&nbsp; **中文版 README** · [README.md](./README.md)

</div>

---

## 📊 Overview

| &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| :---: | :---: | :---: | :---: |
| **54** | **33** | **8** | **225+** |
| Production components | Cross-platform components | Engineering plugins | Doc pages |
| Form engine · virtual table · flow charts | H5 / WeChat Mini Program / App | Build · env · collaboration | Six role tracks |

**Performance baseline** — HMR <100ms · First paint <2s · Bundle <2MB

## ✨ Highlights

- 🧩 **54 production-grade components** — form engine, virtual-scrolling table, flow charts, e-signature, fully typed
- 📱 **One design system, every platform** — admin web and uniApp cross-platform (H5 / Mini Programs / iOS / Android)
- ⚡ **60-second project bootstrap** — smart templates via CLI, bun / pnpm auto-detected
- 🔌 **8 engineering plugins** — multi-env management, first-paint optimization, type cleaning, multi-repo push
- 📖 **Docs as team assets** — six role tracks: product / design / frontend / backend / QA / ops & management
- 🌗 **Dark mode & full-text search** — 225+ pages, instant local search

## 📦 Ecosystem

| Project | Version | Description |
| --- | :---: | --- |
| [Robot_Admin][demo-url] | `v2.7.0` | Admin framework (Vue 3.5 · TS 5.8 · Vite 8 · UnoCSS) |
| [@robot-admin/naive-ui-components][components-url] | `v0.13.6` | 54 components as standalone package with auto-import |
| [@agile-team/mach-table-vue][machtable-url] | [![npm][machtable-ver-badge]][machtable-url] [![npm][machtable-dt-badge]][machtable-url] | Framework-agnostic enterprise data grid |
| [@agile-team/robot-cli][cli-url] | `v3.2.0` | Scaffolding CLI |
| Robot uniApp | `v1.8.0` | Cross-platform mobile framework (33 components) |

## 🚀 Quick Start

Create an admin project:

```bash
npx @agile-team/robot-cli create my-project
```

Run the docs site locally:

```bash
git clone https://github.com/ChenyCHENYU/AgileTeam_Doc.git
cd AgileTeam_Doc
bun install && bun run dev
```

## 🤝 Contributing

Issues and pull requests are welcome — every page has an "edit on GitHub" link.
See [CONTRIBUTING.md](./CONTRIBUTING.md) for the page structure spec.

## 📄 License

[MIT](./LICENSE) © 2025 CHENY · [Blog][blog-url] · [GitHub][github-url]

[ci-badge]: https://img.shields.io/github/actions/workflow/status/ChenyCHENYU/AgileTeam_Doc/ci.yml?style=flat-square&label=CI
[ci-url]: https://github.com/ChenyCHENYU/AgileTeam_Doc/actions/workflows/ci.yml
[license-badge]: https://img.shields.io/badge/License-MIT-18A058?style=flat-square
[license-url]: ./LICENSE
[components-badge]: https://img.shields.io/npm/v/@robot-admin/naive-ui-components?style=flat-square&color=18A058&label=naive-ui-components
[components-dt-badge]: https://img.shields.io/npm/dt/@robot-admin/naive-ui-components?style=flat-square&color=18A058&label=downloads
[components-url]: https://www.npmjs.com/package/@robot-admin/naive-ui-components
[cli-badge]: https://img.shields.io/npm/v/@agile-team/robot-cli?style=flat-square&color=18A058&label=robot-cli
[cli-url]: https://www.npmjs.com/package/@agile-team/robot-cli
[docs-badge]: https://img.shields.io/badge/docs-tzagileteam.com-6366f1?style=flat-square
[docs-url]: https://www.tzagileteam.com
[demo-url]: https://www.robotadmin.cn
[machtable-url]: https://www.npmjs.com/package/@agile-team/mach-table-vue
[machtable-ver-badge]: https://img.shields.io/npm/v/@agile-team/mach-table-vue?style=flat-square&color=18A058&label=mach-table
[machtable-dt-badge]: https://img.shields.io/npm/dm/@agile-team/mach-table-vue?style=flat-square&color=18A058&label=downloads
[blog-url]: https://yangchenyu.top
[github-url]: https://github.com/ChenyCHENYU
