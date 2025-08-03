import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import { head, nav, sidebar, socialLinks, search } from "./_config/index";

export default defineConfig({
  srcDir: "document",
  outDir: "../../dist",
  lang: "zh-CN",
  base: "/",
  title: "AGILE TEAM",
  description: "敏捷开发团队 - 拥抱开放,拥抱变化",

  // 基础配置
  cleanUrls: true,
  head,

  // 开启最后更新时间 (关键配置)
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

    // 页面大纲设置 (修复配置)
    outline: {
      level: [2, 3],
      label: "本页导航",
    },

    // 最后更新时间显示文本 (移到正确位置)
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
        "https://github.com/ChenyCHENYU/agile_team_doc/edit/main/docs/document/:path",
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

  // Markdown配置
  markdown: {
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
    lineNumbers: true,
    config: (md) => {
      // 自定义markdown配置
    },
  },

  // 构建配置
  vite: {
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("../", import.meta.url)),
        },
        {
          find: "@docs",
          replacement: fileURLToPath(new URL("../document", import.meta.url)),
        },
        {
          find: "@config",
          replacement: fileURLToPath(new URL("./_config", import.meta.url)),
        },
        {
          find: "@theme",
          replacement: fileURLToPath(new URL("./theme", import.meta.url)),
        },
        {
          find: "@icons",
          replacement: fileURLToPath(new URL("./theme/icons", import.meta.url)),
        },
        {
          find: "@components",
          replacement: fileURLToPath(new URL("./components", import.meta.url)),
        },
        {
          find: "@public",
          replacement: fileURLToPath(
            new URL("../document/public", import.meta.url)
          ),
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
  },
});
