<template>
  <div class="gitalk-comment">
    <!-- Gitalk -->
    <div id="gitalk-container" class="gitalk-container" />
    <!-- Gitalk -->
  </div>
</template>

<script setup lang="ts">
import Gitalk from 'gitalk'
import 'gitalk/dist/gitalk.css'
import md5 from 'md5'
import { onMounted } from 'vue'

const props = defineProps<{
  issueId: number
}>()

function init() {
  const gitalk = new Gitalk({
    clientID: '8229eea3157442610af2',
    clientSecret: 'e368b6212d4aa6ad83cf9cae66ef98603b326dae',
    repo: 'document-comment',
    owner: 'chenyCHENYU',
    admin: ['chenyCHENYU'],
    id: md5(location.pathname),
    number: props.issueId,
    labels: ['Gitalk'],
    perPage: 50,
  })

  gitalk.render('gitalk-container')
}

onMounted(init)
</script>

<style scoped>
/* .gitalk-container :deep(.gt-container) a {
  color: var(--c-brand) !important;
}
.gitalk-container :deep(.gt-container) .gt-header-textarea {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--c-bg-light);
}
.gitalk-container :deep(.gt-container) .gt-svg svg {
  fill: var(--c-brand);
}
.gitalk-container :deep(.gt-container) .gt-link {
  border-color: var(--c-brand);
}
.gitalk-container :deep(.gt-container) .gt-btn {
  background-color: var(--c-brand);
  border-color: var(--c-brand);
}
.gitalk-container :deep(.gt-container) .gt-btn.gt-btn-preview {
  color: var(--c-brand);
  background-color: var(--c-bg);
}
.gitalk-container :deep(.gt-container) .gt-comments .gt-comments-null {
  color: var(--c-text);
}
.gitalk-container :deep(.gt-container) .gt-comment-content {
  background-color: var(--c-bg-light);
  box-shadow: none;
}
.gitalk-container :deep(.gt-container) .gt-comment-content .gt-comme·nt-body {
  color: var(--c-text) !important;
}
.gitalk-container :deep(.gt-container) .gt-comment-content blockquote {
  color: var(--c-text-quote) !important;
  border: 0;
  background-color: var(--c-bg-lighter);
  padding: 1em;
  margin-top: 1em !important;
} */
.gitalk-container :deep(.gt-container) .gt-avatar {
  border-radius: 50%;
  overflow: hidden;
}
/* .gitalk-container :deep(.gt-container) .gt-avatar img {
  height: 100%;
  object-fit: cover;
} */
</style>
