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
| **63** | **35** | **8+8** | **270+** |
| Production components | Cross-platform components | Plugins & packages | Doc pages |
| Form engine · data pickers · flow charts | H5 / WeChat Mini Program / App | 8 plugins · 8 ecosystem packages | Six role tracks |

**Performance baseline** — HMR <100ms · First paint <2s · Bundle <2MB · Mach dual engines (grid / report)

## ✨ Highlights

- 🧩 **63 production-grade components** — form engine, data/user pickers, flow charts, e-signature, fully typed
- ⚙️ **Mach dual engines** — `@agile-team/mach-table` data grid (Vue / React adapters) and `@agile-team/mach-report` report engine (PDF / Excel / industrial labels)
- 📱 **One design system, every platform** — admin web and uniApp cross-platform (H5 / Mini Programs / iOS / Android)
- ⚡ **60-second project bootstrap** — three-step CLI flow with non-interactive flags, bun / pnpm auto-detected
- 🔌 **8 engineering plugins + 8 ecosystem packages** — request-core, dictionary, form-validate, file-utils, directives, layout, theme, git-standards
- 📖 **Docs as team assets** — six role tracks: product / design / frontend / backend / QA / ops & management
- 🌗 **Dark mode & full-text search** — 270+ pages, instant local search, in-site changelog auto-synced

## 📦 Ecosystem

| Project | Version | Description |
| --- | :---: | --- |
| [Robot_Admin][demo-url] | `v2.7.0` | Admin framework (Vue 3.5 · TS 5.8 · Vite 8 · UnoCSS) |
| [@robot-admin/naive-ui-components][components-url] | `v0.40.5` | 63 components as standalone package with auto-import |
| [robot-admin-packages][packages-url] | 8 packages | Shared-capability monorepo (request · dictionary · form-validate · file-utils · directives · layout · theme · git-standards) |
| [@agile-team/mach-table][machtable-url] | [![npm][machtable-ver-badge]][machtable-url] [![npm][machtable-dt-badge]][machtable-url] | Framework-agnostic enterprise data grid (Vue / React adapters) |
| [@agile-team/mach-report][machreport-url] | [![npm][machreport-ver-badge]][machreport-url] [![npm][machreport-dt-badge]][machreport-url] | Report engine (wide tables · Excel binding · PDF/XLSX/PNG · industrial labels) |
| [@agile-team/robot-cli][cli-url] | `v3.3.0` | Scaffolding CLI (three-step flow · non-interactive flags · PC Full/Lite + H5) |
| Robot_Uniapp | `v1.7.2` | Cross-platform mobile framework (35 components · wot-design-uni) |
| [Robot_H5][roboth5-url] | `v1.8.0` | Mobile H5 app framework (Vue 3 · Vite 7 · Vant · 15 device hooks · wl-mbase) — [platform docs][roboth5-doc-url] |
| [@robot-h5/core][h5core-url] | `v1.2.0` | H5 core package (Bridge · 20+ hooks · offline storage) |
| Robot_Cloud | `v1.0.0-SNAPSHOT` | Backend microservices (Spring Cloud Alibaba) |

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
[roboth5-doc-url]: https://www.tzagileteam.com/h5/overview
[machtable-url]: https://www.npmjs.com/package/@agile-team/mach-table
[machreport-url]: https://www.npmjs.com/package/@agile-team/mach-report
[packages-url]: https://github.com/ChenyCHENYU/robot-admin-packages
[h5core-url]: https://www.npmjs.com/package/@robot-h5/core
[roboth5-url]: https://github.com/ChenyCHENYU/Robot_H5
[machtable-ver-badge]: https://img.shields.io/npm/v/@agile-team/mach-table?style=flat-square&color=18A058&label=mach-table
[machtable-dt-badge]: https://img.shields.io/npm/dm/@agile-team/mach-table?style=flat-square&color=18A058&label=downloads
[machreport-ver-badge]: https://img.shields.io/npm/v/@agile-team/mach-report?style=flat-square&color=18A058&label=mach-report
[machreport-dt-badge]: https://img.shields.io/npm/dm/@agile-team/mach-report?style=flat-square&color=18A058&label=downloads
[blog-url]: https://yangchenyu.top
[github-url]: https://github.com/ChenyCHENYU
