<!--
 * @Author: ChenYu
 * @Date: 2022-10-18 10:11:08
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-10-21 10:34:49
 * @FilePath: \vitepress-cheny\docs\src\components\Tag.vue
 * @Description: Tag
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <ElTag simple :type="type" class="tag">{{ props.text }}</ElTag>
</template>

<script lang="ts" setup>
interface Props {
  text: string
  type: string
}

const props = defineProps<Props>()
</script>
<style lang="scss" scoped>
.tag {
  border-radius: 4px;
}
</style>
