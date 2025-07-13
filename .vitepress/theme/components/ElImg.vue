<template>
  <div class="demo-image__error">
    <div class="block">
      <ElImage
        :src="src.includes('https') ? src : dSrc + src"
        :preview-src-list="[dSrc + src]"
        hide-on-click-modal
        :style="{
          width: width ? width : '100%',
        }"
      >
      </ElImage>
      <span style="color: rgb(198, 198, 198)">
        {{ title ? '图：' + title : '' }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  style: object
  title?: string
  width?: string
}>()

const dSrc =
  'https://cheny-chenyu.oss-cn-chengdu.aliyuncs.com/my-agile-team-document/'
</script>

<style scoped>
.demo-image__error .block {
  padding: 16px 0;
  text-align: center;
  display: inline-block;
  width: 99%;
  box-sizing: border-box;
  vertical-align: top;
}

.demo-image__error .el-image {
  padding: 0 5px;
  width: 100%;
}

.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
</style>
