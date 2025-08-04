<template>
  <div class="doc-image">
    <div class="doc-image__block">
      <img
        :src="imageSrc"
        :alt="title"
        :style="{ width: width || '40%' }"
        class="doc-image__img"
        @click="showPreview = true"
        @error="handleError"
        @load="handleLoad"
      />
      <span v-if="title" class="doc-image__title">
        图：{{ title }}
      </span>
    </div>

    <!-- 预览遮罩 -->
    <div
      v-if="showPreview"
      class="doc-image__preview"
      @click="closePreview"
    >
      <img
        :src="previewSrc"
        class="doc-image__preview-img"
        @click.stop
      />
      <div class="doc-image__close" @click="closePreview">
        ✕
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImgPreview',
  props: {
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    style: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showPreview: false,
      imageError: false,
      imageLoaded: false
    }
  },
  computed: {
    imageSrc() {
      const dSrc = 'https://cheny-chenyu.oss-cn-chengdu.aliyuncs.com/my-agile-team-document/'
      return this.src.includes('https') ? this.src : dSrc + this.src
    },
    previewSrc() {
      const dSrc = 'https://cheny-chenyu.oss-cn-chengdu.aliyuncs.com/my-agile-team-document/'
      return dSrc + this.src
    }
  },
  methods: {
    closePreview() {
      this.showPreview = false
    },
    handleError() {
      this.imageError = true
    },
    handleLoad() {
      this.imageLoaded = true
      this.imageError = false
    }
  },
  mounted() {
    // 监听 ESC 键关闭预览
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.showPreview) {
        this.closePreview()
      }
    })
  }
}
</script>

<style scoped>
.doc-image {
  margin: 16px 0;
}

.doc-image__block {
  padding: 16px 0;
  text-align: center;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
}

.doc-image__img {
  display: block;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.doc-image__img:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.doc-image__title {
  display: block;
  margin-top: 8px;
  color: #c6c6c6;
  font-size: 14px;
  line-height: 1.5;
}

/* 预览遮罩 */
.doc-image__preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
}

.doc-image__preview-img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.doc-image__close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: white;
  font-size: 24px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  transition: background 0.3s ease;
}

.doc-image__close:hover {
  background: rgba(0, 0, 0, 0.7);
}

/* 适应暗色主题 */
html.dark .doc-image__img {
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
}

html.dark .doc-image__img:hover {
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.15);
}

/* 响应式 */
@media (max-width: 768px) {
  .doc-image__preview-img {
    max-width: 95vw;
    max-height: 85vh;
  }
  
  .doc-image__close {
    top: 10px;
    right: 15px;
    font-size: 20px;
    width: 36px;
    height: 36px;
  }
}
</style>