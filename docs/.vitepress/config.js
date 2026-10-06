import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { head, nav, sidebar, socialLinks, search } from "./_config/index";

const SITE_URL = "https://www.tzagileteam.com";
const SRC_DIR = fileURLToPath(new URL("../document", import.meta.url));

// 从正文自动提取页面描述（跳过标题/代码块/表格，取首段有效文本）
function autoDescription(pageData) {
  const fallback = "敏捷开发团队 - 拥抱开放,拥抱变化";
  if (pageData.description && pageData.description !== fallback) {
    return pageData.description;
  }
  let raw = "";
  try {
    raw = readFileSync(join(SRC_DIR, pageData.relativePath), "utf8");
  } catch {
    return fallback;
  }
  const lines = raw
    .replace(/^---[\s\S]*?---\s*/, "")
    .replace(/```[\s\S]*?```/g, "\n")
    .replace(/<script[\s\S]*?<\/script>/g, "\n")
    .replace(/<style[\s\S]*?<\/style>/g, "\n")
    .replace(/<!--[\s\S]*?-->/g, "\n")
    .split("\n")
    .map((l) => l.trim());
  const first = lines.find(
    (l) =>
      l.length > 20 &&
      !l.startsWith("#") &&
      !l.startsWith("|") &&
      !l.startsWith(":::") &&
      !l.startsWith("<") &&
      !l.startsWith("!")
  );
  if (!first) return fallback;
  return (
    first
      .replace(/[*`>\[\]()#!-]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 100) || fallback
  );
}

export default defineConfig({
  srcDir: "document",
  lang: "zh-CN",
  base: "/",
  title: "AGILE TEAM",
  description: "敏捷开发团队 - 拥抱开放,拥抱变化",

  // SEO 站点地图
  sitemap: {
    hostname: SITE_URL,
  },

  // 基础配置
  cleanUrls: true,
  head,

  // 死链检测：仅忽略已知的外部链接和 demo 源码引用
  ignoreDeadLinks: [
    /^https:\/\/robotadmin\.cn/,
    /\.\/snippets\//,
    /\.\.\/\.\.\/views\/demo\//,
  ],

  // 开启最后更新时间
  lastUpdated: true,

  // 主题配置
  themeConfig: {
    // Logo和站点标题
    logo: "/logo.png",
    siteTitle: "AGILE TEAM",
    nav,
    sidebar,
    socialLinks,
    search,

    // 页面大纲设置
    outline: {
      level: [2, 3],
      label: "本页导航",
    },

    // 最后更新时间显示文本
    lastUpdated: {
      text: "最后更新",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    // 文档页面配置
    docFooter: {
      prev: "上一章",
      next: "下一章",
    },

    // 页脚
    footer: {
      message: "Released under the MIT License",
      copyright: "Copyright © 2025 CHENY - 金恒西安",
    },

    // 编辑链接
    editLink: {
      pattern:
        "https://github.com/ChenyCHENYU/AgileTeam_Doc/edit/main/docs/document/:path",
      text: "您可以协助完善此页面，点击在 github 上编辑",
    },

    // 返回顶部
    returnToTopLabel: "返回顶部",

    // 外部链接图标
    externalLinkIcon: true,

    // 侧边栏菜单标签
    sidebarMenuLabel: "菜单",

    // 深色模式开关标签
    darkModeSwitchLabel: "外观",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },

  // 每页 SEO：自动描述 + og 标签 + canonical
  transformPageData(pageData) {
    const description = autoDescription(pageData);
    pageData.description = description;

    const url =
      SITE_URL +
      "/" +
      pageData.relativePath
        .replace(/(^|\/)index\.md$/, "$1")
        .replace(/\.md$/, "");

    pageData.frontmatter.head = pageData.frontmatter.head || [];
    pageData.frontmatter.head.push(
      ["meta", { property: "og:title", content: pageData.title || "AGILE TEAM" }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { property: "og:url", content: url }],
      ["meta", { property: "og:image", content: `${SITE_URL}/assets/img/robot.webp` }],
      ["meta", { name: "twitter:card", content: "summary" }],
      ["link", { rel: "canonical", href: url }]
    );
  },

  // Markdown配置
  markdown: {
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
    lineNumbers: true,
    config(md) {
      // Demo Preview 插件已移除，组件演示改用 DemoIframe 嵌入 Robot Admin
    },
  },

  // 构建配置
  vite: {
    server: {
      port: 5888,
      host: true,
      open: true,
    },
    resolve: {
      alias: [
        {
          find: "@icons",
          replacement: fileURLToPath(new URL("./theme/icons", import.meta.url)),
        },
        {
          find: "@components",
          replacement: fileURLToPath(new URL("./components", import.meta.url)),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import ".vitepress/theme/custom.css";`,
        },
      },
    },
    esbuild: {
      target: "esnext",
    },
  },
});