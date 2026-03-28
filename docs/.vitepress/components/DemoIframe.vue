<script setup>
import { computed, ref } from "vue";
import { useData } from "vitepress";

const props = defineProps({
  /** 预览路径，如 /preview/table */
  src: { type: String, required: true },
  /** iframe 标题 */
  title: { type: String, default: "组件演示" },
  /** iframe 高度（px） */
  height: { type: [String, Number], default: 700 },
});

const { isDark } = useData();

// Robot Admin 线上地址（始终使用线上部署版本）
const baseUrl = "https://robotadmin.cn";

// Hash 模式完整 URL，跟随 VitePress 当前主题
const fullUrl = computed(() => `${baseUrl}/#${props.src}`);

const iframeHeight = computed(() => {
  const h =
    typeof props.height === "string"
      ? parseInt(props.height, 10)
      : props.height;
  return `${h}px`;
});

const loading = ref(true);
const onLoad = () => {
  loading.value = false;
};
</script>

<template>
  <ClientOnly>
    <div class="demo-iframe-container">
      <!-- 浏览器风格工具栏 -->
      <div class="demo-iframe-toolbar">
        <div class="demo-iframe-dots">
          <span class="dot red" />
          <span class="dot yellow" />
          <span class="dot green" />
        </div>
        <span class="demo-iframe-title">{{ title }}</span>
        <a
          :href="fullUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="demo-iframe-open"
          title="在新窗口中打开"
        >
          ↗ 新窗口打开
        </a>
      </div>

      <!-- iframe 主体 -->
      <div class="demo-iframe-body" :style="{ height: iframeHeight }">
        <div v-if="loading" class="demo-iframe-loading">
          <div class="spinner" />
          <span>加载演示中…</span>
        </div>
        <iframe
          :src="fullUrl"
          :title="title"
          width="100%"
          height="100%"
          frameborder="0"
          allow="fullscreen"
          loading="lazy"
          :style="{ border: 'none', display: 'block', colorScheme: isDark ? 'dark' : 'light' }"
          @load="onLoad"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.demo-iframe-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  margin: 16px 0;
  background: var(--vp-c-bg);
}

/* 工具栏 */
.demo-iframe-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 13px;
}

.demo-iframe-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red {
  background: #ff5f57;
}
.dot.yellow {
  background: #febc2e;
}
.dot.green {
  background: #28c840;
}

.demo-iframe-title {
  flex: 1;
  text-align: center;
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.demo-iframe-open {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-size: 12px;
  white-space: nowrap;
  transition: color 0.2s;
}

.demo-iframe-open:hover {
  color: var(--vp-c-brand-2);
}

/* iframe 主体 */
.demo-iframe-body {
  position: relative;
  width: 100%;
  background: #fff;
}

.dark .demo-iframe-body {
  background: #1e1e1e;
}

/* 加载状态 */
.demo-iframe-loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-3);
  font-size: 14px;
  z-index: 1;
}

.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .demo-iframe-body {
    min-height: 300px;
  }

  .demo-iframe-toolbar {
    padding: 6px 10px;
    font-size: 12px;
  }

  .demo-iframe-open {
    font-size: 11px;
  }

  .dot {
    width: 10px;
    height: 10px;
  }
}
</style>
