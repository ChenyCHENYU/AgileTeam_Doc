/*
 * 页面过渡 — 路由切换进度条 + 首屏加载屏移除
 * 与 jh-agileteam-doc 保持一致：顶部 2px 渐变进度条
 */

const PROGRESS_CSS = `
.nav-progress-bar{z-index:9998;background:linear-gradient(90deg,#667eea,#764ba2,#667eea) 0 0/200% 100%;border-radius:0 1px 1px 0;width:100%;height:2px;animation:.8s ease-in-out infinite progress-slide;position:fixed;top:0;left:0}
.nav-progress-bar.is-leaving{opacity:0;transition:opacity .3s ease}
@keyframes progress-slide{0%{background-position:200% 0}to{background-position:-200% 0}}
@media (prefers-reduced-motion: reduce){.nav-progress-bar{animation:none}}
`;

let barEl = null;
let hideTimer = null;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("nav-progress-style")) return;
  const style = document.createElement("style");
  style.id = "nav-progress-style";
  style.textContent = PROGRESS_CSS;
  document.head.appendChild(style);
}

function showBar() {
  if (typeof document === "undefined") return;
  ensureStyles();
  if (!barEl) {
    barEl = document.createElement("div");
    barEl.className = "nav-progress-bar";
    document.body.appendChild(barEl);
  }
  clearTimeout(hideTimer);
  barEl.classList.remove("is-leaving");
  barEl.style.display = "block";
}

function hideBar() {
  if (typeof document === "undefined" || !barEl) return;
  hideTimer = setTimeout(() => {
    if (!barEl) return;
    barEl.classList.add("is-leaving");
    setTimeout(() => {
      if (barEl) barEl.style.display = "none";
    }, 320);
  }, 120);
}

export function removeLoader() {
  if (typeof document === "undefined") return;
  const loader = document.getElementById("app-loading");
  if (!loader || loader.dataset.leaving) return;
  loader.dataset.leaving = "1";
  loader.classList.add("is-leaving");
  setTimeout(() => loader.remove(), 450);
}

export function setupPageTransition(router) {
  // 链式包裹既有钩子（smartNewBadge 也占用 onAfterRouteChanged）
  const prevBefore = router.onBeforeRouteChange;
  const prevAfter = router.onAfterRouteChanged;

  router.onBeforeRouteChange = (to) => {
    prevBefore?.(to);
    showBar();
  };
  router.onAfterRouteChanged = (to) => {
    prevAfter?.(to);
    hideBar();
  };

  // 兜底：5s 后强制移除，避免极端情况下遮罩滞留（主移除时机在 Layout 挂载）
  setTimeout(removeLoader, 5000);
}
