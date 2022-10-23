<!--
 * @Author: ChenYu
 * @Date: 2022-10-18 20:29:51
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-10-18 20:36:38
 * @FilePath: \vitepress-template-master\docs\src\components\FontColor.vue
 * @Description: FontColor组件 处理字体颜色
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <span shadow="always" :style="{ color }">{{ props.text }}</span>
</template>

<script lang="ts" setup>
interface Props {
  color: string
  text: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'skyblue',
})
</script>
