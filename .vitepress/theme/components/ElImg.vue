<template>
  <ElImage :src="src" :preview-src-list="[src]" hide-on-click-modal />
</template>

<script setup lang="ts">
defineProps<{
  src: string
}>()
</script>
