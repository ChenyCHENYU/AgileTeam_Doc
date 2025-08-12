---
outline: "deep"
---

# C_Layout 布局组件

> 🏠 应用主布局框架，提供侧边栏、头部、内容区和底部的标准后台布局

## ✨ 特性

- **📱 响应式侧边栏**: 支持展开/折叠，自适应内容宽度
- **🎨 主题切换**: 内置暗色/亮色主题，无闪烁切换
- **🔐 权限集成**: 与权限系统深度集成，自动渲染菜单
- **📦 组件化设计**: 模块化拆分，易于维护和扩展
- **⚡ 性能优化**: 预渲染样式，消除主题切换闪烁
- **🎯 灵活配置**: 支持自定义宽度、折叠模式等

## 📦 安装

组件已全局注册，在路由布局中使用：

```vue
<template>
  <C_Layout />
</template>
```

## 🎯 快速开始

### 基础用法

```vue
<!-- App.vue -->
<template>
  <C_Layout v-if="isAuthenticated" />
  <LoginPage v-else />
</template>

<script setup>
const isAuthenticated = computed(() => userStore.token);
</script>
```

### 路由配置

```javascript
// router/index.js
const routes = [
  {
    path: "/",
    component: () => import("@/components/global/C_Layout/index.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          title: "工作台",
          icon: "mdi:view-dashboard",
        },
      },
      // 其他子路由...
    ],
  },
];
```

## 📖 API 文档

### Props

组件无对外暴露的 props，通过 Store 管理状态。

### Store 依赖

| Store               | 说明     | 主要方法                         |
| ------------------- | -------- | -------------------------------- |
| **permissionStore** | 权限管理 | `showMenuListGet` - 获取菜单数据 |
| **themeStore**      | 主题管理 | `isDark` - 暗色模式状态          |

### Provide 数据

组件向子组件提供以下数据：

```typescript
interface MenuCollapse {
  isCollapsed: Ref<boolean>; // 侧边栏折叠状态
  handleCollapsedChange: Function; // 切换折叠状态
}
```

### 布局结构

```typescript
interface LayoutStructure {
  sider: {
    width: 240; // 展开宽度
    collapsedWidth: 64; // 折叠宽度
    collapseMode: "width"; // 折叠模式
  };
  content: {
    padding: "16px"; // 内容区内边距
  };
}
```

## 🎨 使用示例

### 场景 1: 标准后台管理系统

```vue
<template>
  <div id="app">
    <!-- 登录后显示布局 -->
    <C_Layout v-if="userStore.isLogin" />

    <!-- 未登录显示登录页 -->
    <RouterView v-else />
  </div>
</template>

<script setup>
import { s_userStore } from "@/stores/user";

const userStore = s_userStore();

// 初始化权限
onMounted(async () => {
  if (userStore.token) {
    await permissionStore.fetchMenuList();
  }
});
</script>
```

### 场景 2: 自定义布局内容

::: details 🎛️ 自定义内容区示例
```vue
<template>
  <C_Layout>
    <template #content>
      <!-- 自定义内容区 -->
      <div class="custom-content">
        <NCard>
          <RouterView v-slot="{ Component }">
            <KeepAlive>
              <component :is="Component" />
            </KeepAlive>
          </RouterView>
        </NCard>
      </div>
    </template>
  </C_Layout>
</template>
```
:::

### 场景 3: 控制侧边栏状态

::: details 🔧 侧边栏控制示例
```vue
<template>
  <div class="workspace">
    <NButton @click="toggleSider">切换侧边栏</NButton>
  </div>
</template>

<script setup>
// 注入布局提供的控制方法
const { isCollapsed, handleCollapsedChange } = inject("menuCollapse");

const toggleSider = () => {
  handleCollapsedChange(!isCollapsed.value);
};

// 监听折叠状态
watch(isCollapsed, (collapsed) => {
  console.log("侧边栏状态:", collapsed ? "折叠" : "展开");
});
</script>
```
:::

### 场景 4: 主题切换集成

::: details 🎨 主题切换示例
```vue
<script setup>
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

// 切换主题
const toggleTheme = () => {
  themeStore.toggleTheme();
};

// 设置特定主题
const setDarkTheme = () => {
  themeStore.setTheme("dark");
};

// 跟随系统主题
const followSystem = () => {
  themeStore.setTheme("auto");
};
</script>
```
:::

## 🎨 样式定制

### 自定义布局样式

::: details 🎨 查看样式定制代码
```scss
// index.scss
.layout-container {
  height: 100vh;
  overflow: hidden;

  // 亮色主题
  &.light-mode {
    --layout-bg: #ffffff;
    --sider-bg: #f5f5f5;
  }

  // 暗色主题
  &.dark-mode {
    --layout-bg: #1c1c1c;
    --sider-bg: #2c2c2c;
  }
}

// 侧边栏样式
.layout-sider {
  transition: all 0.3s ease;

  // 禁用横向滚动
  &.no-horizontal-scroll {
    overflow-x: hidden;
  }

  // 菜单滚动容器
  .menu-scroll-container {
    height: calc(100vh - 64px); // 减去顶部高度
    overflow-y: auto;

    // 自定义滚动条
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
  }
}

// 内容区样式
.content-with-header {
  padding: 16px;
  height: calc(100vh - 64px); // 减去头部高度
  overflow-y: auto;
}
```
:::

### 响应式适配

::: details 📱 查看响应式适配代码
```scss
// 移动端适配
@media (max-width: 768px) {
  .layout-sider {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    height: 100vh;

    // 折叠时隐藏
    &.collapsed {
      transform: translateX(-100%);
    }
  }

  // 遮罩层
  .layout-mask {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 998;
  }
}
```
:::

## ⚙️ 高级用法

### 动态菜单权限

::: details 🔐 查看权限管理代码
```javascript
// stores/permission.js
export const s_permissionStore = defineStore("permission", {
  state: () => ({
    menuList: [],
    routes: [],
  }),

  getters: {
    showMenuListGet(state) {
      // 根据权限过滤菜单
      return filterMenuByPermission(state.menuList);
    },
  },

  actions: {
    async fetchMenuList() {
      const { data } = await api.getMenuList();
      this.menuList = data;

      // 动态添加路由
      const dynamicRoutes = generateRoutes(data);
      dynamicRoutes.forEach((route) => {
        router.addRoute("Layout", route);
      });
    },
  },
});
```
:::

### 主题防闪烁处理

::: details ⚡ 查看防闪烁处理代码
```vue
<script setup>
// 预渲染暗色主题样式，避免刷新闪烁
const _disposeThemeEffect = () => {
  if (isDarkMode.value) {
    const style = document.createElement("style");
    style.textContent = `
      body, #app {
        background-color: #1c1c21 !important;
      }
    `;
    document.head.appendChild(style);

    // 布局加载后移除临时样式
    nextTick(() => {
      setTimeout(() => {
        document.head.removeChild(style);
        isReady.value = true;
      }, 10);
    });
  } else {
    isReady.value = true;
  }
};
</script>
```
:::

### 自定义布局组件

::: details 🛠️ 查看自定义布局代码
```vue
<!-- CustomLayout.vue -->
<template>
  <C_Layout>
    <template #sider-top>
      <!-- 自定义侧边栏顶部 -->
      <div class="logo-container">
        <img src="/logo.png" alt="Logo" />
      </div>
    </template>

    <template #header-extra>
      <!-- 自定义头部额外内容 -->
      <div class="header-actions">
        <NotificationBell />
        <UserAvatar />
      </div>
    </template>
  </C_Layout>
</template>
```
:::

## 🐛 常见问题

### Q1: 主题切换时页面闪烁？

**A1:** 确保使用了预渲染样式：

::: details 查看解决方案代码
```javascript
// ✅ 正确：使用预渲染避免闪烁
onMounted(() => _disposeThemeEffect());

// ❌ 错误：直接切换会闪烁
onMounted(() => {
  isReady.value = true;
});
```
:::

### Q2: 侧边栏菜单不显示？

**A2:** 检查权限 Store 是否正确初始化：

::: details 查看调试代码
```javascript
// 确保获取了菜单数据
await permissionStore.fetchMenuList();

// 检查菜单数据
console.log(permissionStore.showMenuListGet);
```
:::

### Q3: 布局高度异常？

**A3:** 检查容器高度设置：

::: details 查看高度设置代码
```scss
// 确保根容器占满视口
.layout-container {
  height: 100vh; // 必需
  overflow: hidden; // 防止滚动条
}
```
:::

### Q4: 折叠状态不同步？

**A4:** 使用 inject 获取统一的状态：

::: details 查看状态同步代码
```javascript
// ✅ 正确：使用 inject
const { isCollapsed } = inject("menuCollapse");

// ❌ 错误：自定义状态
const isCollapsed = ref(false);
```
:::

## 🎯 最佳实践

### 1. 权限初始化时机

```javascript
// 在路由守卫中初始化
router.beforeEach(async (to, from, next) => {
  if (userStore.token && !permissionStore.hasInit) {
    await permissionStore.fetchMenuList();
    permissionStore.hasInit = true;
  }
  next();
});
```

### 2. 主题持久化

```javascript
// stores/theme.js
export const useThemeStore = defineStore("theme", {
  persist: {
    key: "theme-storage",
    storage: localStorage,
    paths: ["mode", "isDark"],
  },
});
```

### 3. 性能优化

```vue
<script setup>
// 使用 shallowRef 优化大型菜单数据
const menuData = shallowRef(permissionStore.showMenuListGet);

// 懒加载子组件
const C_Menu = defineAsyncComponent(() =>
  import("@/components/global/C_Menu/index.vue")
);
</script>
```

## 📝 更新日志

### v1.0.0 (2025-05-11)

- ✨ 初始版本发布
- ✨ 基础布局结构
- ✨ 主题切换支持
- ✨ 侧边栏折叠功能
- ✨ 权限菜单集成
- ✨ 防闪烁优化

<!--@include: ./snippets/contribute.md -->

**💡 提示**: C_Layout 是应用的核心布局组件，提供了标准的后台管理系统布局结构。通过集成权限和主题系统，实现了动态菜单渲染和流畅的主题切换。组件采用模块化设计，易于扩展和定制。