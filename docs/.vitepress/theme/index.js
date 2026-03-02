// .vitepress/theme/index.js
import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import { useData } from "vitepress";

// 导入你的组件和样式
import GiscusComment from "@components/GiscusComment.vue";
import GitHubBadges from "@components/GitHubBadges.vue";
import ImgWrap from "@components/ImgWrap.vue";
import ImgPreview from "@components/ImgPreview.vue";
import DemoIframe from "@components/DemoIframe.vue";
import "./custom.css";
import "./styles/home.css";
import "./styles/newBadge.css";

// 🤖 导入智能 NEW 标记处理模块
import { initSmartNewBadgeProcessor } from "./modules/smartNewBadge.js";

// 浏览器环境下初始化 Vercel Analytics
if (typeof window !== "undefined") {
  import("@vercel/analytics")
    .then(({ inject }) => {
      inject();
    })
    .catch(() => {
      console.warn("Failed to load Vercel Analytics");
    });
}

export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 在文档页面底部自动添加评论
      "doc-footer-before": () => {
        const { page, frontmatter } = useData();

        // 如果 frontmatter 中设置了 comments: false，则不显示评论
        if (frontmatter.value.comments === false) {
          return null;
        }

        // 首页不显示评论
        if (page.value.relativePath === "index.md") {
          return null;
        }

        // 其他页面显示评论
        return h(GiscusComment, {
          key: page.value.relativePath, // 确保页面切换时重新渲染
        });
      },
    });
  },

  enhanceApp({ app, router }) {
    // 注册全局组件
    app.component("GiscusComment", GiscusComment);
    app.component("GitHubBadges", GitHubBadges);
    app.component("ImgWrap", ImgWrap);
    app.component("ImgPreview", ImgPreview);
    app.component("DemoIframe", DemoIframe);

    // 🤖 初始化智能 NEW 标记处理器
    // 方式1: 使用默认配置
    initSmartNewBadgeProcessor(router);

    // 方式2: 自定义配置（可选，注释掉上面一行，使用下面的配置）
    /*
    initSmartNewBadgeProcessor(router, {
      defaultExpireDays: 45,  // 默认45天过期
      badgeTypes: {
        'new': 60,      // NEW 标记 60 天过期
        'updated': 30,  // UPDATED 标记 30 天过期
        'hot': 7,       // HOT 标记 7 天过期
        'beta': 90      // BETA 标记 90 天过期
      },
      enableLogs: true  // 启用控制台日志
    });
    */
  },
};