// .vitepress/theme/modules/smartNewBadge.js
// 🤖 智能 NEW 标记处理模块 - 支持自动过期和多种标记类型

/**
 * 默认配置
 */
const DEFAULT_CONFIG = {
  defaultExpireDays: 30, // 默认过期天数
  badgeTypes: {
    new: 30, // NEW 标记 30 天过期
    updated: 21, // UPDATED 标记 21 天过期
    hot: 14, // HOT 标记 14 天过期
    beta: 60, // BETA 标记 60 天过期
  },
  enableLogs: false, // 生产环境默认关闭控制台日志
};

let config = { ...DEFAULT_CONFIG };

/**
 * 日志输出函数
 */
function log(message, type = "info") {
  if (!config.enableLogs) return;

  const icons = {
    info: "🤖",
    success: "✅",
    warn: "⏰",
    error: "❌",
  };

  console.log(`${icons[type]} 智能NEW标记: ${message}`);
}

/**
 * 获取页面的 frontmatter 数据
 */
function getPageFrontmatter() {
  try {
    // 尝试从 VitePress 上下文获取
    if (typeof window !== "undefined" && window.__VP_DATA__) {
      return window.__VP_DATA__.page?.frontmatter || {};
    }

    // 备用方案：从 meta 标签获取
    const metaTags = document.querySelectorAll('meta[name^="vp:"]');
    const frontmatter = {};

    metaTags.forEach((tag) => {
      const name = tag.getAttribute("name").replace("vp:", "");
      const content = tag.getAttribute("content");
      try {
        frontmatter[name] = JSON.parse(content);
      } catch {
        frontmatter[name] = content;
      }
    });

    return frontmatter;
  } catch (error) {
    log(`获取 frontmatter 失败: ${error.message}`, "warn");
    return {};
  }
}

/**
 * 获取文件最后修改时间
 */
function getFileLastModified() {
  try {
    // 尝试从 VitePress 页面数据获取
    if (typeof window !== "undefined" && window.__VP_DATA__) {
      const lastUpdated = window.__VP_DATA__.page?.lastUpdated;
      if (lastUpdated) {
        return new Date(lastUpdated);
      }
    }

    // 备用方案：从 meta 标签获取
    const lastUpdatedMeta = document.querySelector(
      'meta[name="vp:lastUpdated"]'
    );
    if (lastUpdatedMeta) {
      return new Date(parseInt(lastUpdatedMeta.getAttribute("content")));
    }

    // 最后备用方案：使用当前时间
    return new Date();
  } catch (error) {
    log(`获取文件修改时间失败，使用当前时间: ${error.message}`, "warn");
    return new Date();
  }
}

/**
 * 检查标记是否已过期
 */
function isBadgeExpired(badgeType, frontmatter, fileModifiedDate) {
  const now = new Date();

  // 方法1: 检查 frontmatter 中的具体过期日期
  const specificExpireKey = `${badgeType}Until`;
  const generalExpireKey = "newUntil";

  const specificExpire = frontmatter[specificExpireKey];
  const generalExpire = frontmatter[generalExpireKey];

  if (specificExpire) {
    const expireDate = new Date(specificExpire);
    const isExpired = now > expireDate;
    log(
      `标记 ${badgeType} 特定过期时间: ${specificExpire}, ${
        isExpired ? "已过期" : "有效"
      }`,
      isExpired ? "warn" : "success"
    );
    return isExpired;
  }

  if (generalExpire && badgeType === "new") {
    const expireDate = new Date(generalExpire);
    const isExpired = now > expireDate;
    log(
      `标记 ${badgeType} 通用过期时间: ${generalExpire}, ${
        isExpired ? "已过期" : "有效"
      }`,
      isExpired ? "warn" : "success"
    );
    return isExpired;
  }

  // 方法2: 基于文件修改时间和默认过期天数
  const expireDays = config.badgeTypes[badgeType] || config.defaultExpireDays;
  const expireDate = new Date(fileModifiedDate);
  expireDate.setDate(expireDate.getDate() + expireDays);

  const isExpired = now > expireDate;
  log(
    `标记 ${badgeType} 基于文件时间计算: 修改于 ${fileModifiedDate.toLocaleDateString()}, ` +
      `${expireDays}天后过期 (${expireDate.toLocaleDateString()}), ${
        isExpired ? "已过期" : "有效"
      }`,
    isExpired ? "warn" : "success"
  );

  return isExpired;
}

/**
 * 处理智能 NEW 标记的核心函数
 */
function processSmartNewBadges() {
  // 立即执行一次（内容通常已就绪），再于 rAF 和短延迟各兜底一次，
  // 避免路由切换后 DOM 未完全渲染导致标记丢失；重复处理有 .new-badge 守卫，无副作用
  const run = () => {
    const frontmatter = getPageFrontmatter();
    const fileModifiedDate = getFileLastModified();

    log(
      `开始处理页面标记，文件修改时间: ${fileModifiedDate.toLocaleDateString()}`
    );

    // 1. 处理页面内容区域的标题
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading) => {
      if (heading.querySelector(".new-badge")) return;

      // 清理零宽字符和特殊空格
      let text = (heading.textContent || heading.innerText || "")
        .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
        .trim();

      const match = text.match(/^(.*?)\s*~(new|updated|hot|beta)\s*$/i);

      if (match) {
        const [, title, badgeType] = match;
        const badge = badgeType.toLowerCase();

        // 检查标记是否已过期
        if (isBadgeExpired(badge, frontmatter, fileModifiedDate)) {
          // 过期了，只显示标题，不显示标记
          heading.innerHTML = title.trim();
          return;
        }

        // 未过期，显示标记
        const badgeEl = document.createElement("span");
        badgeEl.className = `new-badge new-badge-${badge}`;
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
      const match = text.match(/^(.*?)\s*~(new|updated|hot|beta)\s*$/i);

      if (match) {
        const [, title, badgeType] = match;
        const badge = badgeType.toLowerCase();

        // 检查标记是否已过期
        if (isBadgeExpired(badge, frontmatter, fileModifiedDate)) {
          link.textContent = title.trim();
          return;
        }

        const badgeEl = document.createElement("span");
        badgeEl.className = `new-badge new-badge-${badge} new-badge-tiny`;
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
      const match = text.match(/^(.*?)\s*~(new|updated|hot|beta)\s*$/i);

      if (match) {
        const [, title, badgeType] = match;
        const badge = badgeType.toLowerCase();

        // 检查标记是否已过期
        if (isBadgeExpired(badge, frontmatter, fileModifiedDate)) {
          link.textContent = title.trim();
          return;
        }

        const badgeEl = document.createElement("span");
        badgeEl.className = `new-badge new-badge-${badge} new-badge-small`;
        badgeEl.textContent = badge.toUpperCase();

        link.textContent = title.trim();
        link.appendChild(badgeEl);
      }
    });
  };

  run();
  requestAnimationFrame(run);
  setTimeout(run, 120);
}

/**
 * 初始化智能 ~new 标记处理器
 * @param {object} router - VitePress 路由器实例
 * @param {object} userConfig - 用户自定义配置
 */
export function initSmartNewBadgeProcessor(router, userConfig = {}) {
  if (typeof window === "undefined") return;

  // 合并用户配置
  config = {
    ...DEFAULT_CONFIG,
    ...userConfig,
    badgeTypes: {
      ...DEFAULT_CONFIG.badgeTypes,
      ...(userConfig.badgeTypes || {}),
    },
  };

  log("智能 NEW 标记系统已启动");
  log(`默认过期时间: ${config.defaultExpireDays} 天`);
  log(`支持的标记类型: ${Object.keys(config.badgeTypes).join(", ")}`);

  // 路由变化时处理
  router.onAfterRouteChanged = () => {
    processSmartNewBadges();
  };

  // 页面初始加载时处理
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", processSmartNewBadges);
  } else {
    processSmartNewBadges();
  }

  // 内容变化监听（防抖，避免 giscus/iframe 等 DOM 变动引发高频重扫）
  setTimeout(() => {
    let mutationTimer = null;
    const observer = new MutationObserver(() => {
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(processSmartNewBadges, 200);
    });

    const targetNode = document.querySelector(".vp-doc") || document.body;
    observer.observe(targetNode, {
      childList: true,
      subtree: true,
    });
  }, 1000);
}

// 兼容原有接口
export function initNewBadgeProcessor(router, userConfig = {}) {
  return initSmartNewBadgeProcessor(router, userConfig);
}

export default {
  init: initSmartNewBadgeProcessor,
  initSmart: initSmartNewBadgeProcessor,
  initLegacy: initNewBadgeProcessor,
  process: processSmartNewBadges,
};
