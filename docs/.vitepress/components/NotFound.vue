<script setup>
import { useData } from "vitepress";

const { isDark } = useData();

const links = [
  { text: "回到首页", to: "/" },
  { text: "阅读指南", to: "/robot/guide/overview" },
  { text: "浏览 54 个组件", to: "/robot/components/preface" },
  { text: "六大角色文档", to: "/po/standard/introduction" },
];
</script>

<template>
  <div class="nf" :class="{ dark: isDark }">
    <div class="nf-code">
      <span class="c4">4</span>
      <img class="nf-bot" src="/logo.svg" alt="" />
      <span class="c0">0</span>
    </div>
    <h1 class="nf-title">这个页面走丢了</h1>
    <p class="nf-desc">
      它可能被移动或删除了 —— 试试右上角搜索，或从下面的入口继续：
    </p>
    <div class="nf-links">
      <a v-for="l in links" :key="l.to" class="nf-link" :href="l.to">{{ l.text }} →</a>
    </div>
  </div>
</template>

<style scoped>
.nf {
  --fg: #101828;
  --fg-3: #667085;
  --brand: #667eea;
  --line: rgba(16, 24, 40, 0.08);
  --line-strong: rgba(102, 126, 234, 0.45);
  --bg-chip: rgba(255, 255, 255, 0.72);
  min-height: 72vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px;
  color: var(--fg);
}
.nf.dark {
  --fg: #f2f4f7;
  --fg-3: #98a2b3;
  --brand: #818cf8;
  --line: rgba(255, 255, 255, 0.08);
  --line-strong: rgba(129, 140, 248, 0.5);
  --bg-chip: rgba(255, 255, 255, 0.04);
}

.nf-code {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(4rem, 10vw, 6.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
}
.c4, .c0 {
  background: linear-gradient(120deg, #667eea 0%, #a78bfa 55%, #60a5fa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.nf-bot {
  width: clamp(64px, 12vw, 104px);
  height: auto;
  animation: sway 7s ease-in-out infinite alternate;
}
@keyframes sway {
  from { transform: translateY(0) rotate(-6deg); }
  to   { transform: translateY(-8px) rotate(6deg); }
}

.nf-title {
  font-size: clamp(1.3rem, 2.6vw, 1.7rem);
  font-weight: 750;
  letter-spacing: -0.02em;
  margin: 28px 0 10px;
}
.nf-desc { color: var(--fg-3); font-size: 0.95rem; margin: 0 0 28px; }

.nf-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
.nf-link {
  color: var(--brand);
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  border: 1px solid var(--line);
  background: var(--bg-chip);
  border-radius: 10px;
  padding: 10px 18px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.nf-link:hover { border-color: var(--line-strong); transform: translateY(-1px); }

@media (prefers-reduced-motion: reduce) {
  .nf-bot { animation: none; }
  .nf-link:hover { transform: none; }
}
</style>
