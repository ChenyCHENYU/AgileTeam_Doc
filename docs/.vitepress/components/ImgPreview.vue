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
      <!-- 缩放控制按钮 -->
      <div class="doc-image__controls">
        <div class="doc-image__zoom-controls">
          <button @click.stop="zoomOut" class="doc-image__zoom-btn" :disabled="scale <= 0.5">
            <span>-</span>
          </button>
          <span class="doc-image__zoom-text">{{ Math.round(scale * 100) }}%</span>
          <button @click.stop="zoomIn" class="doc-image__zoom-btn" :disabled="scale >= 3">
            <span>+</span>
          </button>
        </div>
        <div class="doc-image__reset-controls">
          <button @click.stop="resetZoom" class="doc-image__reset-btn">
            重置
          </button>
        </div>
      </div>

      <!-- 图片容器 -->
      <div 
        class="doc-image__container"
        @wheel.prevent="handleWheel"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
        ref="imageContainer"
      >
        <img
          :src="previewSrc"
          class="doc-image__preview-img"
          :style="imageStyle"
          @click.stop
          @dragstart.prevent
          ref="previewImage"
        />
      </div>

      <!-- 关闭按钮 -->
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
      imageLoaded: false,
      scale: 1,
      translateX: 0,
      translateY: 0,
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0
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
    },
    imageStyle() {
      return {
        transform: `scale(${this.scale}) translate(${this.translateX}px, ${this.translateY}px)`,
        cursor: this.scale > 1 ? (this.isDragging ? 'grabbing' : 'grab') : 'default',
        transition: this.isDragging ? 'none' : 'transform 0.3s ease'
      }
    }
  },
  methods: {
    closePreview() {
      this.showPreview = false
      this.resetZoom()
    },
    handleError() {
      this.imageError = true
    },
    handleLoad() {
      this.imageLoaded = true
      this.imageError = false
    },
    
    // 缩放控制
    zoomIn() {
      if (this.scale < 3) {
        this.scale = Math.min(3, this.scale + 0.25)
      }
    },
    zoomOut() {
      if (this.scale > 0.5) {
        this.scale = Math.max(0.5, this.scale - 0.25)
        // 缩小时调整位置，避免图片跑出视野
        this.adjustPosition()
      }
    },
    resetZoom() {
      this.scale = 1
      this.translateX = 0
      this.translateY = 0
    },
    
    // 鼠标滚轮缩放
    handleWheel(event) {
      event.preventDefault()
      const delta = event.deltaY
      const zoomSpeed = 0.1
      
      if (delta < 0) {
        // 向上滚动，放大
        this.scale = Math.min(3, this.scale + zoomSpeed)
      } else {
        // 向下滚动，缩小
        this.scale = Math.max(0.5, this.scale - zoomSpeed)
        this.adjustPosition()
      }
    },
    
    // 拖拽功能
    handleMouseDown(event) {
      if (this.scale > 1) {
        this.isDragging = true
        this.lastMouseX = event.clientX
        this.lastMouseY = event.clientY
      }
    },
    handleMouseMove(event) {
      if (this.isDragging && this.scale > 1) {
        const deltaX = event.clientX - this.lastMouseX
        const deltaY = event.clientY - this.lastMouseY
        
        this.translateX += deltaX / this.scale
        this.translateY += deltaY / this.scale
        
        this.lastMouseX = event.clientX
        this.lastMouseY = event.clientY
      }
    },
    handleMouseUp() {
      this.isDragging = false
    },
    
    // 调整位置，防止图片移出视野
    adjustPosition() {
      if (this.scale <= 1) {
        this.translateX = 0
        this.translateY = 0
      }
    }
  },
  watch: {
    showPreview(newVal) {
      if (newVal) {
        // 打开预览时重置缩放
        this.resetZoom()
        // 禁止页面滚动
        document.body.style.overflow = 'hidden'
      } else {
        // 关闭预览时恢复页面滚动
        document.body.style.overflow = ''
      }
    }
  },
  mounted() {
    // 监听 ESC 键关闭预览
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.showPreview) {
        this.closePreview()
      }
    })
  },
  beforeUnmount() {
    // 组件销毁时恢复页面滚动
    document.body.style.overflow = ''
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
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
}

/* 图片容器 */
.doc-image__container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.doc-image__preview-img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  user-select: none;
}

/* 缩放控制 */
.doc-image__controls {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 16px;
  z-index: 10000;
}

.doc-image__zoom-controls {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 6px;
  padding: 8px 12px;
  gap: 12px;
}

.doc-image__zoom-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.2s ease;
}

.doc-image__zoom-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.doc-image__zoom-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.doc-image__zoom-text {
  color: white;
  font-size: 14px;
  min-width: 50px;
  text-align: center;
}

.doc-image__reset-controls {
  display: flex;
  align-items: center;
}

.doc-image__reset-btn {
  padding: 8px 16px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.doc-image__reset-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 关闭按钮 */
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
  z-index: 10000;
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
  
  .doc-image__controls {
    top: 10px;
    left: 10px;
    flex-direction: column;
    gap: 8px;
  }
  
  .doc-image__zoom-controls {
    padding: 6px 8px;
    gap: 8px;
  }
  
  .doc-image__zoom-btn {
    width: 28px;
    height: 28px;
    font-size: 16px;
  }
  
  .doc-image__zoom-text {
    font-size: 12px;
    min-width: 40px;
  }
  
  .doc-image__reset-btn {
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style>