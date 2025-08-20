// .vitepress/theme/index.js
import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import { useData } from "vitepress";

// 导入你的组件和样式
import GiscusComment from "@components/GiscusComment.vue";
import GitHubBadges from "@components/GitHubBadges.vue";
import ImgWrap from "@components/ImgWrap.vue";
import ImgPreview from "@components/ImgPreview.vue";
import "./custom.css";
import "./styles/home.css";
import "./styles/newBadge.css";

// 导入 ~new 标记处理模块
import { initNewBadgeProcessor } from "./modules/newBadge.js";

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

    // 初始化 ~new 标记处理器
    initNewBadgeProcessor(router);
  },
};
