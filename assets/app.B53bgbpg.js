/**
 * name: agile-team-doc
 * version: v2.1.0
 * description: 敏捷团队构建的线上文档，希望同时帮助到团队伙伴和社区的大家
 * author: CHENY <ycyplus@gmail.com>
 * homepage: undefined
 */
import{R as o,aR as p,aS as u,aT as l,aU as c,aV as f,aW as d,aX as m,aY as h,aZ as g,a_ as A,d as v,u as P,v as b,s as w,a$ as y,b0 as C,b1 as R,aw as S}from"./chunks/framework.BjhQmtN6.js";import{t as _}from"./chunks/theme.kgMbJIyY.js";function i(e){if(e.extends){const a=i(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=i(_),E=v({name:"VitePressApp",setup(){const{site:e,lang:a,dir:t}=P();return b(()=>{w(()=>{document.documentElement.lang=a.value,document.documentElement.dir=t.value})}),e.value.router.prefetchLinks&&y(),C(),R(),s.setup&&s.setup(),()=>S(s.Layout)}});async function T(){globalThis.__VITEPRESS__=!0;const e=D(),a=V();a.provide(u,e);const t=l(e.route);return a.provide(c,t),a.component("Content",f),a.component("ClientOnly",d),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:m}),{app:a,router:e,data:t}}function V(){return A(E)}function D(){let e=o,a;return h(t=>{let n=g(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=import(n)),o&&(e=!1),r},s.NotFound)}o&&T().then(({app:e,router:a,data:t})=>{a.go().then(()=>{p(a.route,t.site),e.mount("#app")})});export{T as createApp};
