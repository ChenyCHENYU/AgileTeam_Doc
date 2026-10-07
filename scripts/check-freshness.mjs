// 内容保鲜检查：frontmatter 的 reviewAfter 早于今日则失败
// 用法：bun scripts/check-freshness.mjs  （CI 中随构建执行）
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = "docs/document";
const today = new Date().toISOString().slice(0, 10);
const stale = [];

(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === "public") continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".md")) {
      const fm = readFileSync(p, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const ra = fm && fm[1].match(/^\s*reviewAfter:\s*["']?([\d-]+)/m);
      if (ra && ra[1] < today) stale.push(`${p}  (reviewAfter: ${ra[1]})`);
    }
  }
})(ROOT);

if (stale.length) {
  console.error(`⚠️  以下版本敏感页面的复审日期已过期，请核对内容是否滞后：`);
  stale.forEach((s) => console.error("  " + s));
  process.exit(1);
}
console.log("✓ 内容保鲜检查通过");
