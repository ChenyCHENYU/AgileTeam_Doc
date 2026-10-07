<script setup>
import { useData } from "vitepress";

const { isDark } = useData();

const stats = [
  { num: "55", label: "生产级组件", sub: "表单引擎 · 虚拟表格 · 流程图" },
  { num: "35", label: "跨端组件", sub: "H5 · 小程序 · App" },
  { num: "8", label: "工程化插件", sub: "构建 · 环境 · 协作" },
  { num: "225+", label: "文档页面", sub: "本地全文搜索覆盖" },
  { num: "6", label: "大角色文档", sub: "产品到管理全覆盖" },
];

const ecosystem = [
  {
    icon: "🤖",
    name: "Robot_Admin",
    version: "v2.7.0",
    desc: "中后台主框架 · Vue 3.5 / TS 5.8 / Vite 8 / UnoCSS",
    link: "https://www.robotadmin.cn",
    tag: "在线演示 ↗",
    span: 3,
  },
  {
    icon: "🧩",
    name: "naive-ui-components",
    version: "v0.14.2",
    desc: "55 个业务组件独立包 · 按需自动导入",
    link: "https://www.npmjs.com/package/@robot-admin/naive-ui-components",
    tag: "npm ↗",
    span: 3,
  },
  {
    icon: "📊",
    name: "mach-table-vue",
    version: "v0.30.0",
    desc: "企业数据表格引擎 · 框架无关",
    link: "https://www.npmjs.com/package/@agile-team/mach-table-vue",
    tag: "npm ↗",
    span: 2,
  },
  {
    icon: "⚡",
    name: "robot-cli",
    version: "v3.2.0",
    desc: "60 秒创建项目 · 智能模板",
    link: "https://www.npmjs.com/package/@agile-team/robot-cli",
    tag: "npm ↗",
    span: 2,
  },
  {
    icon: "📱",
    name: "Robot_Uniapp",
    version: "v1.0.0",
    desc: "跨端移动框架 · 35 组件 · wot-design-uni",
    link: "/uniapp/guide/overview",
    tag: "查看文档 →",
    span: 2,
  },
  {
    icon: "💧",
    name: "Robot_H5",
    version: "v1.8.0",
    desc: "移动端 H5 应用框架 · Liquid Glass 设计",
    link: "https://github.com/ChenyCHENYU/Robot_H5",
    tag: "GitHub ↗",
    span: 2,
  },
  {
    icon: "☁️",
    name: "Robot_Cloud",
    version: "v1.0.0-SNAPSHOT",
    desc: "后端微服务框架 · Spring Cloud Alibaba — 认证 / 系统管理 / 权限治理，为 Robot_Admin 提供服务端支撑",
    link: "",
    tag: "暂未开源",
    span: 6,
  },
];

const categories = [
  { title: "表单输入", count: "12", desc: "表单引擎 · 级联 · 日期时间 · 上传 · 穿梭框", to: "/robot/components/form" },
  { title: "表格数据", count: "6", desc: "超级表格 · 甘特图 · 拖拽排序 · 时间线", to: "/robot/components/table" },
  { title: "可视化", count: "5", desc: "流程图 · 工作流 · 组织架构 · 地图 · 日程", to: "/robot/components/antv" },
  { title: "编辑器", count: "4", desc: "富文本 · Markdown · 代码 · 公式", to: "/robot/components/editor" },
  { title: "媒体文件", count: "7", desc: "预览 · 播放 · 裁剪 · 电子签名 · 二维码", to: "/robot/components/file-preview" },
  { title: "交互业务", count: "7", desc: "聊天 · 登录 · 全局搜索 · 验证码 · 通知中心", to: "/robot/components/chat" },
  { title: "布局导航", count: "7", desc: "菜单 · 面包屑 · 标签 · 折叠/分割面板 · 瀑布流", to: "/robot/components/layout" },
  { title: "基础与反馈", count: "7", desc: "图标 · 加载指示 · 骨架屏 · 主题 · 国际化", to: "/robot/components/loading" },
];

const roles = [
  { icon: "📋", title: "产品", desc: "需求调研 · 分析 · 方案 · 规范 · 工具表单", to: "/po/standard/introduction" },
  { icon: "🎨", title: "设计", desc: "设计规范 · 视觉风格 · 组件规范 · 工作流程", to: "/ui/standard/introduction" },
  { icon: "💻", title: "前端", desc: "编码规范 · 工程架构 · Vue3 实战 · TypeScript", to: "/web/get-familiar-quickly/engineering" },
  { icon: "⚙️", title: "后端", desc: "编码规范 · 工程架构 · 快速上手", to: "/rear-end/standard/norm" },
  { icon: "🧪", title: "测试", desc: "测试策略 · 用例设计 · 质量标准", to: "/qc/standard/norm" },
  { icon: "🔧", title: "运维", desc: "部署规范 · 版本管理 · 岗位职责", to: "/manage/job-responsibility/op" },
  { icon: "👔", title: "管理", desc: "岗位职责 · 27+ 模板 · 交付验收", to: "/manage/job-responsibility/pm" },
  { icon: "🏆", title: "团队", desc: "英雄墙 · 虚拟小组 · 开放共建", to: "/team/manage" },
];
</script>

<template>
  <main class="home" :class="{ dark: isDark }">
    <!-- ═══════════ Hero ═══════════ -->
    <section class="hero">
      <div class="hero-main">
        <span class="eyebrow">ROBOT ADMIN · 敏捷团队知识平台</span>
        <h1 class="title">
          企业级中后台框架
          <span class="grad">文档与生态中心</span>
        </h1>
        <p class="tagline">
          沉淀 55 个生产级组件、8 个工程化插件与六大角色协作文档 ——
          从脚手架到交付验收，一套设计规范贯穿中后台与跨端移动。
        </p>
        <div class="actions">
          <a class="btn primary" href="/robot/guide/overview">开始阅读指南</a>
          <a class="btn ghost" href="/robot/components/preface">浏览 55 个组件</a>
          <a class="btn ghost ext" href="https://www.robotadmin.cn" target="_blank" rel="noopener">在线演示 ↗</a>
        </div>
        <div class="stack">
          <span>Vue 3.5</span><i /><span>TypeScript 5.8</span><i /><span>Naive UI</span><i /><span>Vite 8</span><i /><span>UniApp</span>
        </div>
      </div>
      <div class="hero-fig">
        <img src="/assets/img/robot.webp" alt="AGILE TEAM" width="840" height="840" fetchpriority="high" decoding="async" />
      </div>
    </section>

    <!-- ═══════════ 数据条 ═══════════ -->
    <section class="stats">
      <div v-for="s in stats" :key="s.label" class="stat">
        <div class="num">{{ s.num }}</div>
        <div class="label">{{ s.label }}</div>
        <div class="sub">{{ s.sub }}</div>
      </div>
    </section>

    <!-- ═══════════ 生态矩阵 ═══════════ -->
    <section class="section">
      <header class="sec-head">
        <span class="kicker">ECOSYSTEM</span>
        <h2>生态矩阵</h2>
        <p>框架 · 组件库 · 表格引擎 · 脚手架，全部独立发版、可单独引用</p>
      </header>
      <div class="eco-grid">
        <component
          :is="e.link ? 'a' : 'div'"
          v-for="e in ecosystem"
          :key="e.name"
          class="eco-card"
          :class="'span-' + e.span"
          :href="e.link || undefined"
          :target="e.link && e.link.startsWith('http') ? '_blank' : undefined"
          :rel="e.link && e.link.startsWith('http') ? 'noopener' : undefined"
        >
          <div class="eco-top">
            <span class="eco-name"><span class="eco-icon">{{ e.icon }}</span>{{ e.name }}</span>
            <span class="eco-ver">{{ e.version }}</span>
          </div>
          <p class="eco-desc">{{ e.desc }}</p>
          <span class="eco-tag">{{ e.tag }}</span>
        </component>
      </div>
    </section>

    <!-- ═══════════ 组件体系 ═══════════ -->
    <section class="section">
      <header class="sec-head">
        <span class="kicker">COMPONENTS</span>
        <h2>组件体系</h2>
        <p>中后台 55 + 跨端 35 = 90 个组件，配套 TypeScript 类型与 API 文档，中后台组件支持在线演示</p>
      </header>
      <div class="cat-grid">
        <a v-for="c in categories" :key="c.title" class="cat-card" :href="c.to">
          <div class="cat-top">
            <span class="cat-title">{{ c.title }}</span>
            <span class="cat-count">{{ c.count }}</span>
          </div>
          <div class="cat-desc">{{ c.desc }}</div>
        </a>
      </div>
    </section>

    <!-- ═══════════ 六大角色 ═══════════ -->
    <section class="section">
      <header class="sec-head">
        <span class="kicker">DOCUMENTATION</span>
        <h2>六大角色文档中心</h2>
        <p>文档即团队资产 —— 知识与代码同源演进，拥抱开放，拥抱变化</p>
      </header>
      <div class="role-grid">
        <a v-for="r in roles" :key="r.title" class="role-card" :href="r.to">
          <span class="role-icon">{{ r.icon }}</span>
          <span class="role-body">
            <span class="role-title">{{ r.title }}</span>
            <span class="role-desc">{{ r.desc }}</span>
          </span>
          <span class="role-arrow">→</span>
        </a>
      </div>
    </section>

    <!-- ═══════════ CTA ═══════════ -->
    <section class="cta">
      <h2>60 秒，开始你的下一个中后台</h2>
      <div class="cmd">
        <span class="prompt">$</span>
        <code>npx @agile-team/robot-cli create my-project</code>
      </div>
      <p class="cta-note">
        或者 <a href="/robot/guide/overview">阅读指南</a> · <a href="/team/manage">认识团队</a> ·
        <a href="https://github.com/ChenyCHENYU/AgileTeam_Doc" target="_blank" rel="noopener">GitHub ↗</a>
      </p>
    </section>
  </main>
</template>

<style scoped>
/* ═══════════ 令牌 ═══════════ */
.home {
  --bg: #fafbfc;
  --fg: #101828;
  --fg-2: #475467;
  --fg-3: #667085;
  --line: rgba(16, 24, 40, 0.08);
  --line-strong: rgba(102, 126, 234, 0.45);
  --card: rgba(255, 255, 255, 0.72);
  --card-hover: rgba(255, 255, 255, 0.95);
  --brand-a: #667eea;
  --aurora-a: rgba(102, 126, 234, 0.13);
  --aurora-b: rgba(96, 165, 250, 0.09);
  --grad: linear-gradient(120deg, #667eea 0%, #a78bfa 55%, #60a5fa 100%);
  --shadow: 0 12px 32px -16px rgba(16, 24, 40, 0.18);
}
.home.dark {
  --bg: #0a0c12;
  --fg: #f2f4f7;
  --fg-2: #98a2b3;
  --fg-3: #7d8698;
  --line: rgba(255, 255, 255, 0.08);
  --line-strong: rgba(129, 140, 248, 0.5);
  --card: rgba(255, 255, 255, 0.03);
  --card-hover: rgba(255, 255, 255, 0.06);
  --brand-a: #818cf8;
  --aurora-a: rgba(129, 140, 248, 0.13);
  --aurora-b: rgba(125, 211, 252, 0.08);
  --grad: linear-gradient(120deg, #818cf8 0%, #c4b5fd 55%, #7dd3fc 100%);
  --shadow: 0 12px 36px -18px rgba(0, 0, 0, 0.65);
}

.home {
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - var(--vp-nav-height, 64px));
  background: var(--bg);
  color: var(--fg);
  padding-bottom: 48px;
}
.home::before {
  content: '';
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(ellipse 46% 36% at 16% 4%, var(--aurora-a) 0%, transparent 100%),
    radial-gradient(ellipse 40% 34% at 86% 14%, var(--aurora-b) 0%, transparent 100%);
  animation: drift 26s ease-in-out infinite alternate;
  pointer-events: none;
  will-change: transform;
}
@keyframes drift {
  from { transform: translate3d(-1.5%, -1%, 0); }
  to   { transform: translate3d(1.5%, 1.5%, 0) scale(1.04); }
}
.home > section { position: relative; z-index: 1; max-width: 1120px; margin: 0 auto; padding-left: 32px; padding-right: 32px; }

/* ═══════════ Hero ═══════════ */
.hero {
  display: flex;
  align-items: center;
  gap: 56px;
  padding-top: 88px;
  padding-bottom: 72px;
}
.hero-main { flex: 1; min-width: 0; }
.eyebrow {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--brand-a);
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  padding: 5px 14px;
  margin-bottom: 22px;
  background: color-mix(in srgb, var(--brand-a) 7%, transparent);
}
.title {
  font-size: clamp(2.3rem, 4.2vw, 3.4rem);
  line-height: 1.14;
  letter-spacing: -0.03em;
  font-weight: 800;
  margin: 0 0 18px;
  display: flex;
  flex-direction: column;
}
.title .grad {
  background: var(--grad);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.tagline {
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  line-height: 1.8;
  color: var(--fg-2);
  max-width: 56ch;
  margin: 0 0 28px;
}
.actions { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 30px; }
.btn {
  border-radius: 10px;
  padding: 11px 22px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.btn.primary {
  background: linear-gradient(120deg, var(--brand-a) 0%, #764ba2 100%);
  color: #fff;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.25);
}
.btn.primary:hover { transform: translateY(-1px); filter: brightness(1.06); }
.btn.ghost { color: var(--fg); border: 1px solid var(--line); }
.btn.ghost:hover { transform: translateY(-1px); border-color: var(--line-strong); }
.stack {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.82rem;
  color: var(--fg-3);
  font-weight: 550;
}
.stack i { width: 3px; height: 3px; border-radius: 50%; background: var(--fg-3); opacity: 0.5; }
.hero-fig { position: relative; width: clamp(240px, 24vw, 320px); flex-shrink: 0; }
.hero-fig::before {
  content: '';
  position: absolute;
  inset: -14%;
  background: radial-gradient(circle, color-mix(in srgb, var(--brand-a) 18%, transparent) 0%, transparent 68%);
}
.hero-fig img {
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  animation: floaty 9s ease-in-out infinite alternate;
}
@keyframes floaty { from { transform: translateY(0); } to { transform: translateY(-8px); } }

/* ═══════════ 数据条 ═══════════ */
.stats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding-top: 34px;
  padding-bottom: 34px;
}
.stat { text-align: left; }
.num {
  font-size: clamp(1.7rem, 2.6vw, 2.3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  background: var(--grad);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
}
.label { font-weight: 650; font-size: 0.92rem; margin-top: 6px; }
.sub { font-size: 0.76rem; color: var(--fg-3); margin-top: 3px; }

/* ═══════════ 区块节奏 ═══════════ */
.section { padding-top: 112px; }
.sec-head { margin-bottom: 32px; }
.kicker {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: var(--brand-a);
  margin-bottom: 10px;
}
.sec-head h2 {
  font-size: 1.65rem;
  font-weight: 780;
  letter-spacing: -0.02em;
  margin: 0 0 10px;
}
.sec-head p { margin: 0; color: var(--fg-3); font-size: 0.92rem; }

/* ═══════════ 生态 ═══════════ */
.eco-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
.eco-card {
  display: flex;
  flex-direction: column;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 22px 22px 18px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.22s ease, border-color 0.22s ease, background-color 0.22s ease, box-shadow 0.22s ease;
}
.eco-card.span-3 { grid-column: span 3; }
.eco-card.span-2 { grid-column: span 2; }
.eco-card.span-6 { grid-column: 1 / -1; }
.eco-card:hover {
  transform: translateY(-3px);
  border-color: var(--line-strong);
  background: var(--card-hover);
  box-shadow: var(--shadow);
}
.eco-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
.eco-name {
  font-weight: 700;
  font-size: 0.98rem;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.eco-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  font-size: 1.05rem;
  background: color-mix(in srgb, var(--brand-a) 9%, transparent);
  border: 1px solid color-mix(in srgb, var(--brand-a) 20%, transparent);
  flex-shrink: 0;
}
.eco-ver {
  font-size: 0.72rem;
  font-weight: 650;
  color: var(--brand-a);
  border: 1px solid color-mix(in srgb, var(--brand-a) 30%, transparent);
  border-radius: 6px;
  padding: 2px 9px;
  flex-shrink: 0;
}
.eco-desc { margin: 0 0 16px; font-size: 0.84rem; line-height: 1.6; color: var(--fg-2); flex: 1; }
.eco-tag {
  font-size: 0.74rem;
  font-weight: 650;
  color: var(--brand-a);
  letter-spacing: 0.02em;
  align-self: flex-start;
}

/* ═══════════ 组件分类 ═══════════ */
.cat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.cat-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 20px 20px 18px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.22s ease, border-color 0.22s ease, background-color 0.22s ease;
}
.cat-card:hover { transform: translateY(-3px); border-color: var(--line-strong); background: var(--card-hover); }
.cat-top { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 8px; }
.cat-title { font-weight: 700; font-size: 0.98rem; }
.cat-count {
  font-size: 0.86rem;
  font-weight: 800;
  background: var(--grad);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.cat-desc { font-size: 0.82rem; line-height: 1.65; color: var(--fg-3); }

/* ═══════════ 角色 ═══════════ */
.role-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.role-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 20px 22px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.22s ease, border-color 0.22s ease, background-color 0.22s ease;
}
.role-card:hover { transform: translateY(-3px); border-color: var(--line-strong); background: var(--card-hover); }
.role-icon {
  font-size: 1.45rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--brand-a) 8%, transparent);
  border: 1px solid var(--line);
  flex-shrink: 0;
}
.role-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.role-title { font-weight: 700; font-size: 0.98rem; }
.role-desc { font-size: 0.82rem; color: var(--fg-3); }
.role-arrow { color: var(--brand-a); opacity: 0; transform: translateX(-4px); transition: all 0.22s ease; }
.role-card:hover .role-arrow { opacity: 1; transform: translateX(0); }

/* ═══════════ CTA ═══════════ */
.cta { text-align: center; padding-top: 148px; }
.cta h2 {
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 28px;
}
.cmd {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 15px 24px;
  font-size: 0.88rem;
}
.cmd .prompt { color: var(--brand-a); font-weight: 700; }
.cmd code { font-family: var(--vp-font-mono, monospace); color: var(--fg); }
.cta-note { margin-top: 24px; font-size: 0.85rem; color: var(--fg-3); }
.cta-note a { color: var(--brand-a); text-decoration: none; font-weight: 600; }
.cta-note a:hover { text-decoration: underline; }

/* ═══════════ 响应式 ═══════════ */
@media (max-width: 1024px) {
  .hero { flex-direction: column-reverse; text-align: center; gap: 36px; padding-top: 56px; }
  .hero-main { display: flex; flex-direction: column; align-items: center; }
  .actions { justify-content: center; }
  .stack { justify-content: center; }
  .stats { grid-template-columns: repeat(3, 1fr); gap: 22px; }
  .eco-grid { grid-template-columns: repeat(2, 1fr); }
  .eco-card.span-3, .eco-card.span-2 { grid-column: span 1; }
  .eco-card.span-6 { grid-column: 1 / -1; }
  .cat-grid { grid-template-columns: repeat(2, 1fr); }
  .role-grid { grid-template-columns: 1fr; }
  .section { padding-top: 88px; }
  .cta { padding-top: 104px; }
}
@media (max-width: 640px) {
  .home > section { padding-left: 20px; padding-right: 20px; }
  .stats { grid-template-columns: repeat(2, 1fr); }
  .eco-grid { grid-template-columns: 1fr; }
  .cat-grid { grid-template-columns: 1fr; }
  .stack { display: none; }
  .section { padding-top: 72px; }
  .cta { padding-top: 88px; }
}

@media (prefers-reduced-motion: reduce) {
  .home::before, .hero-fig img { animation: none !important; }
  .btn:hover, .eco-card:hover, .cat-card:hover, .role-card:hover { transform: none; }
}
</style>
