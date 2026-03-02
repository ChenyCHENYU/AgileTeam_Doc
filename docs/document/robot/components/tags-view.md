---
outline: 'deep'
---

# C_TagsView 标签页导航组件

> 🏷️ 路由感知的多标签页导航，内置 **useTagsView** 状态管理、持久化、右键菜单、i18n

## ✨ 特性

- **📌 标签管理**: 路由变化自动添加标签，支持固定（affix）、右键操作
- **🖱️ 右键菜单**: 关闭 / 关闭其他 / 关闭左侧 / 关闭右侧 / 关闭所有
- **💾 持久化**: 自动保存到 localStorage，可自定义 key 或关闭
- **🌍 i18n 支持**: `labelFormatter` 翻译标签文本，`contextMenuLabels` 翻译右键菜单
- **🔄 自治架构**: 内置 `useTagsView` composable，**不依赖外部 Store**
- **📜 横向滚轮**: 标签过多时支持鼠标滚轮横向滚动
- **🎨 视觉反馈**: 当前标签 primary 高亮，滚动到可视区域
- **💪 TypeScript**: 完整的类型导出（`TagItem`、`UseTagsViewOptions`、`ContextMenuLabels`）

## 📦 安装

::: code-group

```bash [bun (推荐)]
bun add @robot-admin/naive-ui-components
```

```bash [pnpm]
pnpm add @robot-admin/naive-ui-components
```

```bash [npm]
npm install @robot-admin/naive-ui-components
```

:::

## 🎯 快速开始

### 基础用法

```vue
<template>
  <C_TagsView
    :label-formatter="$t"
    @close="router.push"
  />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t: $t } = useI18n()
</script>
```

### 自定义首页 & 持久化

```vue
<template>
  <C_TagsView
    home-path="/dashboard"
    home-title="Dashboard"
    home-icon="mdi:view-dashboard"
    persist-key="my-tags"
    :label-formatter="$t"
    :context-menu-labels="{
      close: t('tags.close'),
      closeOthers: t('tags.closeOthers'),
      closeLeft: t('tags.closeLeft'),
      closeRight: t('tags.closeRight'),
      closeAll: t('tags.closeAll'),
    }"
    @close="router.push"
    @close-all="router.push('/dashboard')"
  />
</template>
```

### 禁用持久化

```vue
<template>
  <!-- persist-key 传空字符串即可关闭 -->
  <C_TagsView persist-key="" />
</template>
```

## 📖 API 文档

### Props

| 参数                  | 类型                        | 默认值                    | 说明                                                 |
| --------------------- | --------------------------- | ------------------------- | ---------------------------------------------------- |
| **labelFormatter**    | `(label: string) => string` | —                         | 标签文本格式化函数（用于 i18n）                      |
| **homePath**          | `string`                    | `'/home'`                 | 首页路径，关闭所有标签后的回退地址                   |
| **homeTitle**         | `string`                    | `'首页'`                  | 首页标签的原始标题                                   |
| **homeIcon**          | `string`                    | `'mdi:home'`              | 首页标签的图标                                       |
| **persistKey**        | `string`                    | `'__tags_view_list__'`    | localStorage 持久化 key，传空字符串禁用持久化        |
| **contextMenuLabels** | `ContextMenuLabels`         | 中文默认值                | 右键菜单文案（国际化适配）                           |
| **tagsViewOptions**   | `UseTagsViewOptions`        | —                         | useTagsView 配置项（优先级最高，覆盖上面的 homePath & persistKey） |

### Events

| 事件名       | 参数                        | 说明                   |
| ------------ | --------------------------- | ---------------------- |
| **close**    | `(fallbackPath: string)`    | 标签被关闭后，返回应跳转的路径 |
| **closeAll** | —                           | 关闭所有标签后触发     |

### Expose

| 方法/属性       | 类型                            | 说明                        |
| --------------- | ------------------------------- | --------------------------- |
| **tags**        | `ReturnType<typeof useTagsView>` | useTagsView composable 实例 |
| **scrollToTag** | `(path: string) => void`       | 滚动到指定路径的标签        |

### TagItem 类型

```typescript
interface TagItem {
  path: string           // 路由路径
  title: string          // 显示标题（已翻译）
  originalTitle?: string // 原始标题（未翻译，用于语言切换后重新翻译）
  icon?: string          // 图标名称
  meta?: {
    affix?: boolean      // 是否固定（不可关闭）
    [key: string]: any
  }
}
```

### ContextMenuLabels 类型

```typescript
interface ContextMenuLabels {
  close?: string       // 默认 '关闭'
  closeOthers?: string // 默认 '关闭其他'
  closeLeft?: string   // 默认 '关闭左侧'
  closeRight?: string  // 默认 '关闭右侧'
  closeAll?: string    // 默认 '关闭所有'
}
```

### UseTagsViewOptions 类型

```typescript
interface UseTagsViewOptions {
  persistKey?: string  // localStorage key，传空字符串不持久化
  homePath?: string    // 首页路径
}
```

## 🔧 useTagsView Composable

组件内部使用 `useTagsView` 管理标签状态，此 composable **也可独立使用**：

```typescript
import { useTagsView } from '@robot-admin/naive-ui-components'

const tags = useTagsView({ persistKey: 'my-tags', homePath: '/home' })

// 返回值
tags.tagsViewList  // Ref<TagItem[]>  — 标签列表
tags.activeTag     // Ref<string>     — 当前激活路径
tags.homePath      // string          — 首页路径

// 方法
tags.initTags(tagItems?)      // 初始化（传数组则替换，不传则去重）
tags.setActiveTag(path)       // 设置激活标签
tags.addTag(tagItem)          // 添加或更新标签
tags.removeTag(index)         // 移除指定位置标签（返回被移除路径）
tags.removeOtherTags(index)   // 保留首项 + 指定项，关闭其余
tags.removeLeftTags(index)    // 保留首项 + 指定项及其右侧
tags.removeRightTags(index)   // 保留指定项及其左侧
tags.removeAllTags()          // 关闭所有非 affix 标签
```

## 🎨 使用示例

::: details 📋 后台管理系统 — 完整布局配合

```vue
<template>
  <NLayout>
    <NLayoutHeader bordered>
      <C_Breadcrumb :label-formatter="$t" @select="router.push" />
    </NLayoutHeader>

    <!-- 标签栏 -->
    <C_TagsView
      ref="tagsViewRef"
      home-path="/home"
      :label-formatter="$t"
      :context-menu-labels="contextMenuLabels"
      @close="router.push"
      @close-all="router.push('/home')"
    />

    <NLayoutContent>
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </NLayoutContent>
  </NLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t: $t } = useI18n()
const tagsViewRef = ref()

const contextMenuLabels = computed(() => ({
  close: $t('tags.close'),
  closeOthers: $t('tags.closeOthers'),
  closeLeft: $t('tags.closeLeft'),
  closeRight: $t('tags.closeRight'),
  closeAll: $t('tags.closeAll'),
}))
</script>
```

:::

::: details 📌 固定常用标签 — 路由 meta.affix

```javascript
const routes = [
  {
    path: '/home',
    meta: {
      title: '首页',
      icon: 'mdi:home',
      affix: true,  // ✅ 固定标签，不可关闭
    },
  },
  {
    path: '/todo',
    meta: {
      title: '待办事项',
      icon: 'mdi:format-list-checks',
      affix: true,  // ✅ 固定标签
    },
  },
  {
    path: '/report',
    meta: {
      title: '数据报表',
      icon: 'mdi:chart-line',
      // 普通标签，可关闭
    },
  },
]
```

:::

::: details 🔧 通过 Expose 外部控制标签

```vue
<template>
  <NButton @click="addCustomTag">添加临时标签</NButton>
  <NButton @click="scrollToHome">滚动到首页</NButton>
  <C_TagsView ref="tagsViewRef" @close="router.push" />
</template>

<script setup>
import { ref } from 'vue'

const tagsViewRef = ref()

const addCustomTag = () => {
  tagsViewRef.value?.tags.addTag({
    path: `/temp/${Date.now()}`,
    title: '临时标签',
    icon: 'mdi:file-document',
  })
}

const scrollToHome = () => {
  tagsViewRef.value?.scrollToTag('/home')
}
</script>
```

:::

::: details ⚡ useTagsView 独立使用（脱离 C_TagsView 组件）

```typescript
// 在其他地方管理标签状态
import { useTagsView } from '@robot-admin/naive-ui-components'

const tags = useTagsView({ persistKey: 'custom-tags' })

// 编程式添加标签
tags.addTag({
  path: '/user/123',
  title: '用户详情',
  originalTitle: 'user.detail',
  icon: 'mdi:account',
})

// 清理标签
tags.removeAllTags()
```

:::

## ⚠️ 注意事项

::: code-group

```vue [✅ 推荐 — 监听 close 事件]
<!-- 组件关闭标签后不自动跳转，需监听事件 -->
<C_TagsView
  @close="router.push"
  @close-all="router.push('/home')"
/>
```

```vue [❌ 避免 — 忘记处理跳转]
<!-- 不传 @close，关闭活跃标签后页面不会跳转 -->
<C_TagsView />
```

:::

### 迁移指南（从旧版迁移）

旧版依赖外部 `s_appStore` / `appStore` 管理标签状态，新版改为内置 `useTagsView` composable：

| 旧版                                 | 新版                                                    |
| ------------------------------------ | ------------------------------------------------------- |
| `appStore.addTag(tag)`               | 自动完成（路由变化时内部调用 `tags.addTag`）             |
| `appStore.removeTag(index)`          | 监听 `@close` 获取回退路径                               |
| `appStore.removeAllTags()`           | 监听 `@closeAll`                                         |
| `appStore.tagsViewList`              | `tagsViewRef.value?.tags.tagsViewList`（Expose 访问）    |
| `appStore.setActiveTag(path)`        | 内部自动管理                                              |
| localStorage key: `tagsViewList`     | `:persist-key="'__tags_view_list__'"` 或自定义           |
| 无 i18n 支持                         | `:label-formatter="$t"` + `:context-menu-labels="{...}"` |

### 持久化注意事项

- 默认 key 为 `__tags_view_list__`，避免与旧版的 `tagsViewList` 冲突
- 语言切换后组件会自动重新翻译持久化标签（通过 `originalTitle` 字段）
- 传 `persist-key=""` 可完全关闭持久化

## 📝 更新日志

### v0.5.0 (2025-06)

- ♻️ **破坏性变更**: 移除外部 Store 依赖，改为内置 `useTagsView` composable
- ♻️ **破坏性变更**: 不再自动跳转路由，改为 `@close` / `@closeAll` 事件
- ✨ 新增 `homePath` / `homeTitle` / `homeIcon` props
- ✨ 新增 `persistKey` 持久化控制
- ✨ 新增 `labelFormatter` i18n 支持
- ✨ 新增 `contextMenuLabels` 国际化右键菜单
- ✨ 新增 `tagsViewOptions` 高级配置
- ✨ Expose `tags` composable 实例 + `scrollToTag`
- ✨ 语言切换后自动重新翻译持久化标签

### v0.3.0 (2025-03)

- ✨ 初始版本（依赖外部 appStore）


<!--@include: ./snippets/contribute.md -->


**💡 提示**: 这个组件设计用于团队协作，如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更好的开发体验！ 🚀
