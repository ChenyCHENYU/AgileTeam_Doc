// 同步根 CHANGELOG.md 到站内页面：包装 frontmatter 后写入 docs/document/changelog.md
// 用法：bun scripts/sync-changelog.mjs （dev/build 前自动执行，也可手动重跑）
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = join(root, "CHANGELOG.md");
const target = join(root, "docs", "document", "changelog.md");

const changelog = readFileSync(source, "utf8");
// 跳过 Unreleased，取最近一个正式版本号
const latest =
  changelog.match(/^## \[(?!Unreleased)([^\]]+)\]/m)?.[1] ?? "Unreleased";

const page = `---
outline: "deep"
title: "更新日志"
description: "AGILE TEAM 文档站更新日志：版本特性、内容扩充与修正记录（自动同步自仓库 CHANGELOG.md）。"
---

# 📋 更新日志

本页由 \`scripts/sync-changelog.mjs\` 自动生成（\`bun run dev\` / \`bun run build\` 前执行），与仓库根 [CHANGELOG.md](https://github.com/ChenyCHENYU/AgileTeam_Doc/blob/main/CHANGELOG.md) 同源。当前最新版本：**${latest}**。

${changelog}
`;

writeFileSync(target, page);
console.log(`✓ CHANGELOG 已同步至站内页面（最新版本：${latest}）`);
