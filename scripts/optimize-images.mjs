// 图片优化脚本：压缩 public 下的静态图片资源
// 用法：bun run optimize:images
import sharp from "sharp";
import { readdir, stat, rename } from "node:fs/promises";
import { join } from "node:path";

const PUBLIC_DIR = join(process.cwd(), "docs/document/public");

// [文件名, 配置]
const tasks = [
  // 导航栏 logo：显示约 24-32px，192px 覆盖 2x+ retina，全彩 PNG 保留渐变细节（不用调色板，避免色带）
  ["logo.png", { width: 192, format: "png", png: { compressionLevel: 9 } }],
  // 首页 hero：最大显示 420px（>=1920 屏），840px 2x，高质量 webp
  ["assets/img/robot.png", { width: 840, format: "webp", webp: { quality: 88 } }],
];

async function optimize([file, opts]) {
  const input = join(PUBLIC_DIR, file);

  let exists = true;
  try {
    await stat(input);
  } catch {
    exists = false;
  }
  if (!exists) {
    console.log(`${file}: 源文件不存在，跳过`);
    return;
  }

  const before = (await stat(input)).size;

  let pipeline = sharp(input).resize({ width: opts.width, withoutEnlargement: true });
  if (opts.format === "webp") pipeline = pipeline.webp(opts.webp);
  else pipeline = pipeline.png(opts.png);

  const output = opts.format === "webp" ? input.replace(/\.png$/, ".webp") : input;
  await pipeline.toFile(output + ".tmp");

  const after = (await stat(output + ".tmp")).size;
  await rename(output + ".tmp", output);

  const kb = (n) => `${(n / 1024).toFixed(1)}KB`;
  console.log(`${file} -> ${output.replace(PUBLIC_DIR + "/", "")}: ${kb(before)} -> ${kb(after)} (${((1 - after / before) * 100).toFixed(0)}% smaller)`);
}

for (const task of tasks) {
  await optimize(task);
}
console.log("done");
