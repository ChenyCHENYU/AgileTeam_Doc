// 初始加载屏 — 首屏 HTML 内联注入（transformIndexHtml），
// 水合完成后由 pageTransition 模块淡出移除
// 设计与 jh-agileteam-doc 保持一致：双环旋转 + </> 描边 + 品牌渐变

export const LOADER_HTML = `
<div class="app-loading" id="app-loading">
  <div class="app-loading__container">
    <svg class="app-loading__logo" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="36" stroke="url(#loading-gradient)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="180 226" class="app-loading__ring"></circle>
      <circle cx="40" cy="40" r="24" stroke="url(#loading-gradient)" stroke-width="1.5" stroke-dasharray="100 151" opacity="0.5" class="app-loading__ring app-loading__ring--inner"></circle>
      <path d="M32 34L26 40L32 46M48 34L54 40L48 46M43 30L37 50" stroke="url(#loading-gradient)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="app-loading__icon"></path>
      <defs>
        <linearGradient id="loading-gradient" x1="0" y1="0" x2="80" y2="80">
          <stop offset="0%" stop-color="#667eea"></stop>
          <stop offset="100%" stop-color="#764ba2"></stop>
        </linearGradient>
      </defs>
    </svg>
    <div class="app-loading__text">AGILE TEAM</div>
    <div class="app-loading__dots"><span></span><span></span><span></span></div>
  </div>
</div>
<style>
.app-loading{z-index:9999;background:#fafbfc;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}
.dark .app-loading{background:#0a0c12}
.app-loading__container{flex-direction:column;align-items:center;gap:20px;display:flex}
.app-loading__logo{width:80px;height:80px}
.app-loading__ring{transform-origin:50%;animation:1.8s cubic-bezier(.4,0,.2,1) infinite ring-spin}
.app-loading__ring--inner{animation-duration:2.4s;animation-direction:reverse}
.app-loading__icon{stroke-dasharray:120;stroke-dashoffset:120px;animation:1.2s cubic-bezier(.4,0,.2,1) .3s forwards icon-draw}
.app-loading__text{letter-spacing:3px;background:linear-gradient(135deg,#667eea,#764ba2);-webkit-text-fill-color:transparent;-webkit-background-clip:text;background-clip:text;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display',Inter,sans-serif;font-size:14px;font-weight:600}
.app-loading__dots{gap:6px;display:flex}
.app-loading__dots span{background:linear-gradient(135deg,#667eea,#764ba2);border-radius:50%;width:5px;height:5px;animation:1.2s ease-in-out infinite dot-pulse}
.app-loading__dots span:nth-child(2){animation-delay:.15s}
.app-loading__dots span:nth-child(3){animation-delay:.3s}
.app-loading.is-leaving{opacity:0;filter:blur(8px);transform:scale(.96);transition:opacity .4s cubic-bezier(.4,0,.2,1),transform .4s cubic-bezier(.4,0,.2,1),filter .4s cubic-bezier(.4,0,.2,1)}
@keyframes ring-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes icon-draw{to{stroke-dashoffset:0}}
@keyframes dot-pulse{0%,80%,to{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1.2)}}
@media (prefers-reduced-motion: reduce){
  .app-loading__ring,.app-loading__dots span{animation:none}
  .app-loading__icon{animation:none;stroke-dashoffset:0}
}
</style>
`;
