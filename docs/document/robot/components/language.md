---
outline: "deep"
---

# C_Language 语言切换组件

> 🌐 基于 NDropdown 的语言切换组件，支持自定义语言列表和 v-model 双向绑定

## 🚀 在线演示

::: tip 💻 在线体验
该组件已集成在 Robot Admin 顶部工具栏中，点击语言图标即可切换 → [Robot Admin](https://robotadmin.cn)
:::

## ✨ 特性

- **🔄 v-model 双向绑定**: 与父组件状态实时同步
- **🌍 内置 4 种语言**: 中文、英文、日文、韩文（可自定义扩展）
- **🎨 图标支持**: 每种语言可配置图标
- **📐 紧凑设计**: 图标按钮 + hover 下拉菜单，不占空间

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

### 基础使用

```vue {3}
<template>
  <!-- 默认显示 4 种语言：中/英/日/韩 -->
  <C_Language v-model="currentLang" @change="handleLangChange" />
</template>

<script setup>
import { ref } from "vue";

const currentLang = ref("zh-cn");

const handleLangChange = (lang) => {
  console.log("切换语言:", lang);
  // 在此处更新 i18n locale
};
</script>
```

### 自定义语言列表

```vue {4-9}
<template>
  <C_Language
    v-model="currentLang"
    :options="[
      { key: 'zh-cn', label: '简体中文', iconClass: 'mdi:alpha-c' },
      { key: 'zh-tw', label: '繁體中文', iconClass: 'mdi:alpha-t' },
      { key: 'en', label: 'English', iconClass: 'mdi:alpha-u' },
      { key: 'fr', label: 'Français', iconClass: 'mdi:alpha-f' },
    ]"
  />
</template>
```

### 配合 i18n 使用

```vue
<template>
  <C_Language v-model="locale" @change="switchLocale" />
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const switchLocale = (lang) => {
  locale.value = lang;
  // 可选：持久化到 localStorage
  localStorage.setItem("lang", lang);
};
</script>
```

## 📖 API 文档

### Props

| 参数           | 类型               | 默认值    | 说明                         |
| -------------- | ------------------ | --------- | ---------------------------- |
| **modelValue** | `string`           | `'zh-cn'` | 当前语言 key（v-model 绑定） |
| **options**    | `LanguageOption[]` | 内置4种   | 语言选项列表                 |

### LanguageOption

| 参数          | 类型     | 说明                        |
| ------------- | -------- | --------------------------- |
| **key**       | `string` | 语言标识（如 `'zh-cn'`）    |
| **label**     | `string` | 显示名称（如 `'简体中文'`） |
| **iconClass** | `string` | 图标名称（Iconify，可选）   |

### Events

| 事件名                | 参数            | 说明           |
| --------------------- | --------------- | -------------- |
| **update:modelValue** | `(key: string)` | 语言切换时触发 |
| **change**            | `(key: string)` | 语言切换时触发 |

### 默认语言列表

```typescript
const defaultOptions: LanguageOption[] = [
  { key: "zh-cn", label: "简体中文", iconClass: "mdi:alpha-c" },
  { key: "en", label: "English", iconClass: "mdi:alpha-u" },
  { key: "ja", label: "日本語", iconClass: "mdi:alpha-j" },
  { key: "ko", label: "한국어", iconClass: "mdi:alpha-k" },
];
```

## ⚠️ 注意事项

### 1. 与路由/i18n 集成

语言切换组件只负责 UI 交互，**实际的语言切换逻辑需要在 `change` 事件中自行处理**：

```vue
<script setup>
const handleChange = (lang) => {
  // 1. 更新 i18n
  i18n.global.locale.value = lang;
  // 2. 更新 HTML lang 属性
  document.documentElement.setAttribute("lang", lang);
  // 3. 持久化
  localStorage.setItem("language", lang);
};
</script>
```

### 2. 在头部栏中使用

通常在应用头部的导航右侧区域使用：

```vue
<template>
  <div class="navbar-right">
    <C_Language v-model="lang" @change="switchLang" />
    <C_Theme v-model="theme" />
    <!-- 其他头部组件 -->
  </div>
</template>
```

## 📝 更新日志

### v0.4.0 (2025-11-19)

- ✨ 新增语言切换组件
- ✨ 支持自定义语言列表
- ✨ 支持 v-model 双向绑定

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个组件设计用于团队协作，如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更好的开发体验！ 🚀
