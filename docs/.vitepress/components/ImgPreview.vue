<template>
  <div class="doc-image">
    <div class="doc-image__block">
      <!-- 安全模式：Canvas渲染 -->
      <canvas
        v-if="blur"
        ref="thumbnailCanvas"
        :style="{ width: width || '20%', cursor: 'pointer' }"
        class="doc-image__img"
        @click="showPreview = true"
        @contextmenu.prevent
        @selectstart.prevent
        @dragstart.prevent
      ></canvas>
      
      <!-- 普通模式：正常img标签 -->
      <img
        v-else
        :src="imageSrc"
        :alt="title"
        :style="{ width: width || '20%' }"
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
      :class="{ 'doc-image__preview--secure': blur }"
      @click="closePreview"
      @contextmenu.prevent="blur"
      @selectstart.prevent="blur"
    >
      <!-- 缩放控制按钮 -->
      <div class="doc-image__controls">
        <div class="doc-image__zoom-controls">
          <button @click.stop="zoomOut" class="doc-image__zoom-btn" :disabled="scale <= 0.5">-</button>
          <span class="doc-image__zoom-text">{{ Math.round(scale * 100) }}%</span>
          <button @click.stop="zoomIn" class="doc-image__zoom-btn" :disabled="scale >= 3">+</button>
        </div>
        <button @click.stop="resetZoom" class="doc-image__reset-btn">重置</button>
      </div>

      <!-- 预览容器 -->
      <div 
        class="doc-image__container"
        @wheel.prevent="handleWheel"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
        ref="imageContainer"
      >
        <!-- 安全模式：Canvas预览 -->
        <canvas
          v-if="blur"
          ref="previewCanvas"
          class="doc-image__preview-img"
          :style="canvasStyle"
          @click.stop
          @contextmenu.prevent
          @selectstart.prevent
          @dragstart.prevent
        ></canvas>
        
        <!-- 普通模式：正常img预览 -->
        <img
          v-else
          :src="previewSrc"
          class="doc-image__preview-img"
          :style="imageStyle"
          @click.stop
          @dragstart.prevent
          ref="previewImage"
        />
      </div>

      <!-- 关闭按钮 -->
      <div class="doc-image__close" @click="closePreview">✕</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecureImgPreview',
  props: {
    src: { type: String, required: true },
    title: { type: String, default: '' },
    width: { type: String, default: '' },
    blur: { type: Boolean, default: false }, // 是否启用安全防护
    blurLevel: { type: Number, default: 8 }, // 模糊程度 0-20
    watermarkOpacity: { type: Number, default: 0.2 } // 水印透明度 0-1
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
    // Canvas样式（安全模式）
    canvasStyle() {
      return {
        transform: `scale(${this.scale}) translate(${this.translateX}px, ${this.translateY}px)`,
        cursor: this.scale > 1 ? (this.isDragging ? 'grabbing' : 'grab') : 'default',
        transition: this.isDragging ? 'none' : 'transform 0.3s ease'
      }
    },
    // 图片样式（普通模式）
    imageStyle() {
      return {
        transform: `scale(${this.scale}) translate(${this.translateX}px, ${this.translateY}px)`,
        cursor: this.scale > 1 ? (this.isDragging ? 'grabbing' : 'grab') : 'default',
        transition: this.isDragging ? 'none' : 'transform 0.3s ease'
      }
    }
  },
  methods: {
    // 加载图片并渲染（仅安全模式）
    loadImage(isPreview = false) {
      if (!this.blur) return // 非安全模式不处理
      
      const img = new Image()
      img.onload = () => {
        isPreview ? this.drawPreviewImage(img) : this.renderBlurredThumbnail(img)
      }
      img.onerror = () => console.error(`Failed to load ${isPreview ? 'preview' : 'thumbnail'} image`)
      img.src = this.imageSrc
    },

    // 渲染模糊缩略图（仅安全模式）
    renderBlurredThumbnail(img) {
      const canvas = this.$refs.thumbnailCanvas
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      const { width, height } = this.calculateSize(img.width, img.height, 300, 200)
      
      canvas.width = width
      canvas.height = height
      canvas.style.width = this.width || '20%'
      canvas.style.height = 'auto'
      
      // 绘制模糊图片
      ctx.filter = `blur(${this.blurLevel}px)`
      ctx.drawImage(img, 0, 0, width, height)
      ctx.filter = 'none'
      
      // 添加蒙层和提示文字
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.fillRect(0, 0, width, height)
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.font = `${Math.max(12, width / 25)}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('点击查看清晰图片', width / 2, height / 2)
    },

    // 绘制清晰预览图（仅安全模式）
    drawPreviewImage(img) {
      const canvas = this.$refs.previewCanvas
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      const maxWidth = window.innerWidth * 0.9
      const maxHeight = window.innerHeight * 0.9
      const { width, height } = this.calculateSize(img.width, img.height, maxWidth, maxHeight)
      
      canvas.width = width
      canvas.height = height
      canvas.style.maxWidth = '90vw'
      canvas.style.maxHeight = '90vh'
      
      // 绘制清晰图片
      ctx.drawImage(img, 0, 0, width, height)
      
      // 添加水印保护
      this.addWatermark(ctx, width, height)
    },

    // 添加水印（仅安全模式）
    addWatermark(ctx, width, height) {
      ctx.save()
      ctx.globalAlpha = this.watermarkOpacity
      ctx.fillStyle = '#ffffff'
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 1
      ctx.font = `${Math.max(20, Math.min(width, height) / 20)}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      const watermarkText = '仅供预览 禁止保存'
      const step = Math.min(width, height) / 5
      
      for (let x = step / 2; x < width; x += step) {
        for (let y = step / 2; y < height; y += step) {
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(-Math.PI / 8)
          ctx.strokeText(watermarkText, 0, 0)
          ctx.fillText(watermarkText, 0, 0)
          ctx.restore()
        }
      }
      ctx.restore()
    },

    // 计算合适的显示尺寸
    calculateSize(imgWidth, imgHeight, maxWidth, maxHeight) {
      const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight)
      return {
        width: Math.floor(imgWidth * ratio),
        height: Math.floor(imgHeight * ratio)
      }
    },

    // 启用防护措施（仅安全模式）
    enableProtection() {
      if (!this.blur) return // 非安全模式不启用防护
      
      const events = [
        ['contextmenu', this.preventDefault],
        ['selectstart', this.preventDefault], 
        ['dragstart', this.preventDefault],
        ['keydown', this.preventHotkeys]
      ]
      
      events.forEach(([event, handler]) => {
        document.addEventListener(event, handler, true)
      })
      
      // 控制台警告
      console.clear()
      console.log('%c🚫 图片受保护，禁止下载！', 'color: red; font-size: 20px; font-weight: bold;')
      console.log('%c⚠️  未经授权的下载行为将被记录！', 'color: orange; font-size: 14px;')
    },

    // 移除防护措施
    removeProtection() {
      if (!this.blur) return
      
      const events = ['contextmenu', 'selectstart', 'dragstart', 'keydown']
      events.forEach(event => {
        document.removeEventListener(event, this.preventDefault, true)
        document.removeEventListener(event, this.preventHotkeys, true)
      })
    },

    // 阻止默认事件
    preventDefault(e) {
      e.preventDefault()
      e.stopPropagation()
      return false
    },

    // 阻止快捷键
    preventHotkeys(e) {
      const blocked = [
        e.key === 'F12',
        e.ctrlKey && e.shiftKey && ['I', 'C'].includes(e.key),
        e.ctrlKey && ['U', 's'].includes(e.key)
      ]
      
      if (blocked.some(Boolean)) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    },

    // 普通模式的图片加载处理
    handleError() {
      this.imageError = true
    },
    handleLoad() {
      this.imageLoaded = true
      this.imageError = false
    },

    // 预览控制
    closePreview() {
      this.showPreview = false
      this.resetZoom()
    },
    
    // 缩放控制
    zoomIn() { this.scale = Math.min(3, this.scale + 0.25) },
    zoomOut() { 
      this.scale = Math.max(0.5, this.scale - 0.25)
      this.adjustPosition()
    },
    resetZoom() {
      this.scale = 1
      this.translateX = 0
      this.translateY = 0
    },
    
    // 鼠标交互
    handleWheel(event) {
      const delta = event.deltaY > 0 ? -0.1 : 0.1
      this.scale = Math.max(0.5, Math.min(3, this.scale + delta))
      if (this.scale <= 1) this.adjustPosition()
    },
    
    handleMouseDown(event) {
      if (this.scale > 1) {
        this.isDragging = true
        this.lastMouseX = event.clientX
        this.lastMouseY = event.clientY
      }
    },
    
    handleMouseMove(event) {
      if (this.isDragging && this.scale > 1) {
        this.translateX += (event.clientX - this.lastMouseX) / this.scale
        this.translateY += (event.clientY - this.lastMouseY) / this.scale
        this.lastMouseX = event.clientX
        this.lastMouseY = event.clientY
      }
    },
    
    handleMouseUp() {
      this.isDragging = false
    },
    
    adjustPosition() {
      if (this.scale <= 1) {
        this.translateX = 0
        this.translateY = 0
      }
    }
  },
  watch: {
    showPreview(newVal) {
      document.body.style.overflow = newVal ? 'hidden' : ''
      if (newVal && this.blur) {
        this.resetZoom()
        this.$nextTick(() => this.loadImage(true))
      }
    }
  },
  mounted() {
    // 只在安全模式启用防护和加载特殊处理
    if (this.blur) {
      this.enableProtection()
      this.loadImage()
    }
    
    // ESC关闭预览（通用功能）
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.showPreview) {
        this.closePreview()
      }
    })
  },
  beforeUnmount() {
    document.body.style.overflow = ''
    this.removeProtection()
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
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
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
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
}

/* 安全模式额外样式 */
.doc-image__preview--secure {
  -webkit-user-select: none;
  user-select: none;
}

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
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  user-select: none;
}

/* 控件样式 */
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

.doc-image__zoom-btn,
.doc-image__reset-btn {
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.doc-image__zoom-btn {
  width: 32px;
  height: 32px;
  font-size: 18px;
  font-weight: bold;
}

.doc-image__reset-btn {
  padding: 8px 16px;
  font-size: 14px;
}

.doc-image__zoom-btn:hover:not(:disabled),
.doc-image__reset-btn:hover {
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

/* 暗色主题适配 */
html.dark .doc-image__img {
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
}

html.dark .doc-image__img:hover {
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
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
}

/* 安全模式防护样式 */
.doc-image__preview--secure *,
.doc-image__preview--secure *::before,
.doc-image__preview--secure *::after {
  -webkit-touch-callout: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  user-select: none !important;
  -webkit-user-drag: none !important;
}
</style>