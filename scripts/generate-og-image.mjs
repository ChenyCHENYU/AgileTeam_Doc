// 生成社交分享卡 og-card.png（1200×630）：深色渐变 + 机器人 Logo + 标题 + 最新数据栏
// 用法：bun scripts/generate-og-image.mjs   （package.json: bun run og:image）
// 数据栏读 _config/versions.js 事实源；改版本后重跑本脚本即可。
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";
import { VERSIONS } from "../docs/.vitepress/_config/versions.js";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const logoSvg = await readFile(join(root, "docs", "document", "public", "logo.svg"));
const outPath = join(root, "docs", "document", "public", "assets", "img", "og-card.png");

const W = 1200;
const H = 630;
const logoHref = `data:image/svg+xml;base64,${logoSvg.toString("base64")}`;

const stats = [
  { num: VERSIONS.componentCount, label: "生产级组件" },
  { num: VERSIONS.uniappComponents, label: "跨端组件" },
  { num: VERSIONS.machEngines, label: "Mach 引擎" },
  { num: `${VERSIONS.engineeringPlugins}+${VERSIONS.packagesCount}`, label: "插件与生态包" },
  { num: VERSIONS.docPages, label: "文档页面" },
];

const statCells = stats
  .map((s, i) => {
    const x = 60 + i * 220;
    return `
    <text x="${x}" y="505" font-size="44" font-weight="800" fill="#c4b5fd" font-family="Helvetica, Arial, sans-serif">${s.num}</text>
    <text x="${x}" y="542" font-size="20" fill="rgba(255,255,255,0.72)" font-family="Helvetica, 'PingFang SC', sans-serif">${s.label}</text>`;
  })
  .join("");

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#151a33"/>
      <stop offset="55%" stop-color="#2b2350"/>
      <stop offset="100%" stop-color="#4338ca"/>
    </linearGradient>
    <radialGradient id="glow" cx="82%" cy="12%" r="55%">
      <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#a78bfa" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="title2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7dd3fc"/>
      <stop offset="100%" stop-color="#c4b5fd"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <circle cx="1130" cy="580" r="130" fill="#60a5fa" opacity="0.08"/>
  <circle cx="60" cy="90" r="100" fill="#818cf8" opacity="0.07"/>

  <image xlink:href="${logoHref}" x="70" y="120" width="240" height="240" opacity="0.96"/>

  <rect x="430" y="132" rx="15" width="330" height="34" fill="rgba(167,139,250,0.14)" stroke="rgba(196,181,253,0.45)" stroke-width="1"/>
  <text x="595" y="155" text-anchor="middle" font-size="18" font-weight="600" fill="#c4b5fd" font-family="Helvetica, 'PingFang SC', sans-serif" letter-spacing="1">ROBOT ADMIN · 敏捷团队知识平台</text>

  <text x="430" y="235" font-size="56" font-weight="800" fill="#ffffff" font-family="'PingFang SC', 'Hiragino Sans GB', sans-serif">企业级中后台框架</text>
  <text x="430" y="308" font-size="56" font-weight="800" fill="url(#title2)" font-family="'PingFang SC', 'Hiragino Sans GB', sans-serif">文档与生态中心</text>

  <text x="430" y="356" font-size="22" fill="rgba(255,255,255,0.85)" font-family="Helvetica, sans-serif">www.tzagileteam.com</text>
  <text x="430" y="392" font-size="19" fill="rgba(255,255,255,0.55)" font-family="Helvetica, 'PingFang SC', sans-serif">Vue 3.5 · TypeScript · Naive UI · Vite 8 · Mach Engines</text>

  <line x1="60" y1="448" x2="1140" y2="448" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
  ${statCells}
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outPath);
const meta = await sharp(outPath).metadata();
await writeFile("/dev/null", "");
console.log(`✓ og-card 已重绘：${meta.width}×${meta.height}（数据：${stats.map((s) => s.num).join(" / ")}）`);
