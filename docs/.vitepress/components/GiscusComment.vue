<template>
  <div ref="commentRef" class="giscus-comment">
    <div v-if="visible" class="giscus-wrapper">
      <div class="giscus-header">
        <div class="giscus-title">
          <span class="title-icon">💬</span>
          <span class="title-text">评论区</span>
        </div>
        <div class="giscus-subtitle">欢迎参与讨论，分享你的想法</div>
      </div>

      <div class="giscus-container">
        <Giscus
          :key="currentTheme"
          :repo="config.repo"
          :repoId="config.repoId"
          :category="config.category"
          :categoryId="config.categoryId"
          :mapping="config.mapping"
          :strict="config.strict"
          :reactionsEnabled="config.reactionsEnabled"
          :emitMetadata="config.emitMetadata"
          :inputPosition="config.inputPosition"
          :theme="currentTheme"
          :lang="config.lang"
          :loading="config.loading"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref, onMounted, onUnmounted } from "vue";
import { useData } from "vitepress";
import Giscus from "@giscus/vue";

// JavaScript 版本的 props 定义（正确语法）
const props = defineProps({
  repo: {
    type: String,
    default: "ChenyCHENYU/AgileTeam_Doc",
  },
  repoId: {
    type: String,
    default: "R_kgDONPl5QQ",
  },
  category: {
    type: String,
    default: "General",
  },
  categoryId: {
    type: String,
    default: "DIC_kwDONPl5Qc4CtNen",
  },
  mapping: {
    type: String,
    default: "pathname",
  },
  customTheme: {
    type: String,
    default: "",
  },
});

// 获取VitePress主题数据
const { isDark } = useData();

// 计算当前主题
const currentTheme = computed(() => {
  if (props.customTheme) {
    return props.customTheme;
  }

  // 根据VitePress主题切换Giscus主题
  return isDark.value ? "dark" : "light";
});

// Giscus 配置对象
const config = {
  repo: props.repo,
  repoId: props.repoId,
  category: props.category,
  categoryId: props.categoryId,
  mapping: props.mapping,
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "zh-CN",
  loading: "lazy",
};

// 懒加载：进入视口后才渲染 Giscus iframe
const commentRef = ref();
const visible = ref(false);
let observer = null;

onMounted(() => {
  if (!commentRef.value) return;
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true;
        observer.disconnect();
        observer = null;
      }
    },
    { rootMargin: "200px" },
  );
  observer.observe(commentRef.value);
});

onUnmounted(() => {
  observer?.disconnect();
});

// 监听主题变化，强制重新渲染Giscus组件
watch(currentTheme, (newTheme) => {
  console.log("Giscus theme changed to:", newTheme);
});
</script>

<style scoped>
.giscus-wrapper {
  margin-bottom: 50px;
  background: linear-gradient(
    120deg,
    rgba(238, 174, 202, 0.2) 0%,
    rgba(148, 187, 233, 0.2) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.giscus-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.giscus-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.giscus-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.title-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.title-text {
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.giscus-subtitle {
  color: var(--vp-c-text-2, #666);
  font-size: 0.875rem;
  opacity: 0.8;
}

.giscus-container {
  position: relative;
}

.giscus-container::before {
  content: "";
  position: absolute;
  top: -1rem;
  left: -1rem;
  right: -1rem;
  bottom: -1rem;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.1) 0%,
    rgba(118, 75, 162, 0.1) 100%
  );
  border-radius: 12px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.giscus-wrapper:hover .giscus-container::before {
  opacity: 1;
}

/* 深色模式适配 */
.dark .giscus-wrapper {
  background: linear-gradient(
    120deg,
    rgba(238, 174, 202, 0.1) 0%,
    rgba(148, 187, 233, 0.1) 100%
  );
  border-color: rgba(255, 255, 255, 0.08);
}

.dark .giscus-wrapper:hover {
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .giscus-header {
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.dark .giscus-subtitle {
  color: var(--vp-c-text-2, #ccc);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .giscus-comment {
    margin: 2rem auto 1rem;
    padding: 0 0.5rem;
  }

  .giscus-wrapper {
    padding: 1.5rem;
    border-radius: 12px;
  }

  .title-text {
    font-size: 1.25rem;
  }

  .giscus-subtitle {
    font-size: 0.8rem;
  }
}

/* Giscus 内部样式优化 - 针对不同主题 */
.giscus-container :deep(.gsc-comments) {
  border-radius: 8px;
  overflow: hidden;
}

.giscus-container :deep(.gsc-comment-box) {
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

.giscus-container :deep(.gsc-comment-box-textarea) {
  border-radius: 6px;
  backdrop-filter: blur(5px);
}

.giscus-container :deep(.gsc-comment-author-avatar) {
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.giscus-container :deep(.gsc-comment) {
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  margin: 0.5rem 0;
}

.giscus-container :deep(.gsc-comment:hover) {
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
}

/* 针对深色模式的Giscus样式调整 */
.dark .giscus-container :deep(.gsc-comment-box) {
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .giscus-container :deep(.gsc-comment) {
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(255, 255, 255, 0.05);
}

.dark .giscus-container :deep(.gsc-comment:hover) {
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
}
</style>
