// .vitepress/theme/modules/newBadge.js
// ~new 标记处理模块

/**
 * 处理 ~new 标记的核心函数
 */
function processNewBadges() {
  setTimeout(() => {
    // 1. 处理页面内容区域的标题
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading) => {
      if (heading.querySelector(".new-badge")) return;

      // 清理零宽字符和特殊空格
      let text = (heading.textContent || heading.innerText || "")
        .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
        .trim();

      const match = text.match(/^(.*?)\s*~(new|beta|hot)\s*$/i);

      if (match) {
        const [, title, badge] = match;
        const badgeEl = document.createElement("span");
        badgeEl.className = `new-badge new-badge-${badge.toLowerCase()}`;
        badgeEl.textContent = badge.toUpperCase();

        heading.innerHTML = "";
        heading.appendChild(document.createTextNode(title.trim()));
        heading.appendChild(badgeEl);
      }
    });

    // 2. 处理右侧大纲导航
    const outlineLinks = document.querySelectorAll(
      ".VPDocOutline a, .outline-link, .VPDocOutlineItem a, .VPDocAside a"
    );
    outlineLinks.forEach((link) => {
      if (link.querySelector(".new-badge")) return;

      let text = (link.textContent || link.innerText || "")
        .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
        .trim();
      const match = text.match(/^(.*?)\s*~(new|beta|hot)\s*$/i);

      if (match) {
        const [, title, badge] = match;
        const badgeEl = document.createElement("span");
        badgeEl.className = `new-badge new-badge-${badge.toLowerCase()} new-badge-tiny`;
        badgeEl.textContent = badge.toUpperCase();

        link.textContent = title.trim();
        link.appendChild(badgeEl);
      }
    });

    // 3. 处理侧边栏导航
    const sidebarLinks = document.querySelectorAll(
      ".VPSidebarItem .text, .sidebar-link, .vp-sidebar-link"
    );
    sidebarLinks.forEach((link) => {
      if (link.querySelector(".new-badge")) return;

      let text = (link.textContent || link.innerText || "")
        .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
        .trim();
      const match = text.match(/^(.*?)\s*~(new|beta|hot)\s*$/i);

      if (match) {
        const [, title, badge] = match;
        const badgeEl = document.createElement("span");
        badgeEl.className = `new-badge new-badge-${badge.toLowerCase()} new-badge-small`;
        badgeEl.textContent = badge.toUpperCase();

        link.textContent = title.trim();
        link.appendChild(badgeEl);
      }
    });
  }, 500);
}

/**
 * 初始化 ~new 标记处理器
 * @param {object} router - VitePress 路由器实例
 */
export function initNewBadgeProcessor(router) {
  if (typeof window === "undefined") return;

  // 路由变化时处理
  router.onAfterRouteChanged = () => {
    processNewBadges();
  };

  // 页面初始加载时处理
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", processNewBadges);
  } else {
    processNewBadges();
  }

  // 内容变化监听
  setTimeout(() => {
    const observer = new MutationObserver(() => {
      processNewBadges();
    });

    const targetNode = document.querySelector(".vp-doc") || document.body;
    observer.observe(targetNode, {
      childList: true,
      subtree: true,
    });
  }, 1000);
}

export default {
  init: initNewBadgeProcessor,
  process: processNewBadges,
};
