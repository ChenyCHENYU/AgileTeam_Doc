---
outline: "deep"
---

# C_Guide 功能引导组件

> 🎯 基于 Driver.js 的新手引导组件，帮助用户快速了解系统功能

## ✨ 特性

- **🚀 一键启动**: 点击按钮即可开始引导流程
- **📍 精准定位**: 自动高亮目标元素并显示说明
- **🎨 优雅动画**: 平滑的过渡动画和遮罩效果
- **📱 响应式**: 自适应不同屏幕尺寸
- **🔄 步骤控制**: 支持上一步、下一步操作
- **💡 进度显示**: 实时显示引导进度

## 📦 安装

```bash
# 安装 Driver.js 依赖
bun add driver.js
```

组件已全局注册，直接使用即可：

```vue
<template>
  <C_Guide />
</template>
```

## 🎯 快速开始

### 基础用法

```vue
<template>
  <!-- 在页面头部或工具栏中放置引导按钮 -->
  <div class="toolbar">
    <C_Guide />
  </div>
</template>
```

### 自定义引导步骤

```vue
<template>
  <C_Guide :steps="customSteps" />
</template>

<script setup>
const customSteps = [
  {
    element: "#welcome-banner",
    popover: {
      title: "欢迎使用",
      description: "这是我们的全新系统，让我带你了解一下主要功能",
      side: "bottom",
    },
  },
  {
    element: "#main-feature",
    popover: {
      title: "核心功能",
      description: "这里是系统的核心功能区域",
      side: "left",
    },
  },
];
</script>
```

## 📖 默认引导步骤

组件默认包含以下引导步骤：

| 步骤 | 元素 ID                | 标题             | 说明                             |
| ---- | ---------------------- | ---------------- | -------------------------------- |
| 1    | `#guide-menu-top`      | 导航菜单头部区域 | 设置头部 logo/头部信息           |
| 2    | `#guide-menu`          | 导航菜单         | 展开/收起侧边多级导航菜单        |
| 3    | `#guide-menu-collapse` | 折叠菜单         | 折叠导航菜单，获得更宽的工作区域 |
| 4    | `#guide-breadcrumb`    | 位置导航/面包屑  | 显示当前页面路径，快速返回上级   |
| 5    | `#guide-tags-view`     | 快速切换标签栏   | 标记常用页面，便于快速切换       |
| 6    | `#guide-actions`       | 整体操作区域     | 各种操作功能集中区域             |

## 🎨 使用示例

### 场景 1: 首次登录引导

::: details 🎯 查看首次登录引导代码
```vue
<template>
  <div class="app-container">
    <!-- 检测是否首次登录，自动触发引导 -->
    <C_Guide ref="guideRef" />
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const guideRef = ref();
const userStore = useUserStore();

onMounted(() => {
  // 检查是否首次登录
  const isFirstLogin = localStorage.getItem("first_login_guide");

  if (!isFirstLogin) {
    // 延迟启动引导，让页面完全加载
    setTimeout(() => {
      guideRef.value?.startGuide();
      localStorage.setItem("first_login_guide", "completed");
    }, 1000);
  }
});
</script>
```
:::

### 场景 2: 功能更新引导

::: details 🆕 查看功能更新引导代码
```vue
<template>
  <div class="update-notification">
    <NAlert type="info" closable>
      <template #header> 系统功能更新 </template>
      我们新增了一些功能，
      <NButton text type="primary" @click="showNewFeatures">
        点击查看新功能引导
      </NButton>
    </NAlert>

    <C_Guide ref="updateGuideRef" :steps="newFeatureSteps" />
  </div>
</template>

<script setup>
const updateGuideRef = ref();

const newFeatureSteps = [
  {
    element: "#new-feature-1",
    popover: {
      title: "🎉 新功能：数据导出",
      description: "现在可以一键导出报表数据了",
      side: "bottom",
    },
  },
  {
    element: "#new-feature-2",
    popover: {
      title: "🎨 新功能：主题切换",
      description: "支持深色/浅色主题自由切换",
      side: "left",
    },
  },
  {
    element: "#new-feature-3",
    popover: {
      title: "📊 新功能：数据可视化",
      description: "新增多种图表类型，数据展示更直观",
      side: "top",
    },
  },
];

const showNewFeatures = () => {
  updateGuideRef.value?.startGuide();
};
</script>
```
:::

### 场景 3: 分模块引导

::: details 📋 查看分模块引导代码
```vue
<template>
  <div class="module-guide">
    <NSpace>
      <NButton @click="startBasicGuide">基础功能引导</NButton>
      <NButton @click="startAdvancedGuide">高级功能引导</NButton>
      <NButton @click="startSettingsGuide">设置引导</NButton>
    </NSpace>

    <C_Guide ref="moduleGuideRef" :steps="currentSteps" />
  </div>
</template>

<script setup>
const moduleGuideRef = ref();
const currentSteps = ref([]);

// 基础功能引导
const basicSteps = [
  {
    element: "#dashboard",
    popover: {
      title: "仪表盘",
      description: "查看系统整体运行状况",
      side: "bottom",
    },
  },
  {
    element: "#data-table",
    popover: {
      title: "数据管理",
      description: "管理您的业务数据",
      side: "right",
    },
  },
];

// 高级功能引导
const advancedSteps = [
  {
    element: "#workflow",
    popover: {
      title: "工作流",
      description: "配置自动化工作流程",
      side: "bottom",
    },
  },
  {
    element: "#api-config",
    popover: {
      title: "API 配置",
      description: "管理外部接口集成",
      side: "left",
    },
  },
];

// 设置引导
const settingsSteps = [
  {
    element: "#user-settings",
    popover: {
      title: "用户设置",
      description: "个性化您的使用体验",
      side: "bottom",
    },
  },
  {
    element: "#system-config",
    popover: {
      title: "系统配置",
      description: "调整系统参数",
      side: "left",
    },
  },
];

const startBasicGuide = () => {
  currentSteps.value = basicSteps;
  nextTick(() => {
    moduleGuideRef.value?.startGuide();
  });
};

const startAdvancedGuide = () => {
  currentSteps.value = advancedSteps;
  nextTick(() => {
    moduleGuideRef.value?.startGuide();
  });
};

const startSettingsGuide = () => {
  currentSteps.value = settingsSteps;
  nextTick(() => {
    moduleGuideRef.value?.startGuide();
  });
};
</script>
```
:::

## 🎨 样式定制

### 自定义主题样式

::: details 🎨 查看自定义主题样式代码
```css
/* 自定义 Driver.js 主题 */
.driverjs-theme {
  /* 自定义遮罩颜色 */
  --driver-overlay-bg: rgba(0, 0, 0, 0.75);

  /* 自定义弹出框样式 */
  --driver-popover-bg: #fff;
  --driver-popover-border-radius: 12px;
  --driver-popover-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.driverjs-theme .driver-popover-title {
  font-size: 18px;
  font-weight: 600;
  color: #1890ff;
}

.driverjs-theme .driver-popover-description {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
}

/* 自定义按钮样式 */
.driverjs-theme .driver-popover-navigation-btn {
  background: #1890ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
}

.driverjs-theme .driver-popover-prev-btn {
  background: #f5f5f5;
  color: #666;
}

/* 自定义进度条 */
.driverjs-theme .driver-popover-progress-text {
  color: #999;
  font-size: 12px;
}
```
:::

### 暗色主题适配

::: details 🌙 查看暗色主题适配代码
```css
/* 暗色模式下的引导样式 */
.dark .driverjs-theme {
  --driver-popover-bg: #1f1f1f;
  --driver-popover-text-color: #e5e5e5;
}

.dark .driverjs-theme .driver-popover-title {
  color: #58a6ff;
}

.dark .driverjs-theme .driver-popover-description {
  color: #b1b1b1;
}

.dark .driverjs-theme .driver-popover-navigation-btn {
  background: #58a6ff;
}

.dark .driverjs-theme .driver-popover-prev-btn {
  background: #2d2d2d;
  color: #b1b1b1;
}
```
:::

## ⚙️ 高级用法

### 程序化控制

::: details 🔧 查看程序化控制代码
```vue
<template>
  <C_Guide ref="guideRef" />
</template>

<script setup>
const guideRef = ref();

// 启动引导
const start = () => {
  guideRef.value?.startGuide();
};

// 自定义配置启动
const startWithOptions = () => {
  const driver = guideRef.value?.getDriver();
  driver?.setConfig({
    animate: false, // 禁用动画
    allowClose: false, // 禁止 ESC 关闭
    onNextClick: (element, step, options) => {
      console.log("进入下一步", step);
    },
    onPrevClick: (element, step, options) => {
      console.log("返回上一步", step);
    },
    onDestroyStarted: () => {
      console.log("引导结束");
      // 记录完成状态
      saveGuideStatus();
    },
  });
  driver?.drive();
};
</script>
```
:::

### 动态步骤生成

::: details 🔄 查看动态步骤生成代码
```vue
<script setup>
// 根据用户角色生成不同的引导步骤
const generateStepsByRole = (role) => {
  const commonSteps = [
    {
      element: "#dashboard",
      popover: {
        title: "欢迎页",
        description: "系统概览",
      },
    },
  ];

  const adminSteps = [
    {
      element: "#admin-panel",
      popover: {
        title: "管理面板",
        description: "系统管理功能",
      },
    },
  ];

  const userSteps = [
    {
      element: "#user-workspace",
      popover: {
        title: "工作区",
        description: "您的个人工作空间",
      },
    },
  ];

  return [...commonSteps, ...(role === "admin" ? adminSteps : userSteps)];
};

// 使用动态步骤
const userRole = ref("admin");
const dynamicSteps = computed(() => generateStepsByRole(userRole.value));
</script>
```
:::

## 🐛 常见问题

### Q1: 引导元素定位不准确？

**A1:** 确保目标元素已完全渲染：

::: details 查看解决方案代码
```javascript
// ✅ 正确：等待 DOM 更新
nextTick(() => {
  guideRef.value?.startGuide();
});

// 或使用延迟
setTimeout(() => {
  guideRef.value?.startGuide();
}, 500);
```
:::

### Q2: 引导步骤中的元素不存在？

**A2:** Driver.js 会自动跳过不存在的元素，但建议添加条件判断：

::: details 查看解决方案代码
```javascript
const steps = [
  // 只添加存在的元素
  ...(document.querySelector("#feature-1")
    ? [
        {
          element: "#feature-1",
          popover: { title: "功能1", description: "..." },
        },
      ]
    : []),
];
```
:::

### Q3: 引导遮罩层级问题？

**A3:** 调整 z-index：

::: details 查看解决方案代码
```css
.driver-overlay {
  z-index: 10000 !important;
}

.driver-popover {
  z-index: 10001 !important;
}
```
:::

## 🎯 最佳实践

### 1. 引导时机控制

```javascript
// 合适的触发时机
const guideManager = {
  // 首次访问
  checkFirstVisit() {
    if (!localStorage.getItem("guide_completed")) {
      this.startGuide();
    }
  },

  // 功能更新后
  checkVersionUpdate() {
    const lastVersion = localStorage.getItem("guide_version");
    const currentVersion = "1.2.0";
    if (lastVersion !== currentVersion) {
      this.startUpdateGuide();
      localStorage.setItem("guide_version", currentVersion);
    }
  },

  // 用户请求时
  startManualGuide() {
    this.startGuide();
  },
};
```

### 2. 步骤设计原则

```javascript
// 好的步骤设计
const wellDesignedSteps = [
  {
    element: "#important-feature",
    popover: {
      title: "核心功能", // 简洁的标题
      description: "这个功能可以帮助您...", // 清晰的价值说明
      side: "bottom", // 合理的位置
    },
  },
  // 3-7 个步骤为宜，避免过多
];
```

### 3. 性能优化

```javascript
// 懒加载 Driver.js
const lazyLoadGuide = async () => {
  const { driver } = await import("driver.js");
  await import("driver.js/dist/driver.css");

  return driver({
    // 配置项
  });
};
```

## 📝 更新日志

### v1.0.0 (2025-06-01)

- ✨ 初始版本发布
- ✨ 基于 Driver.js 实现
- ✨ 支持自定义步骤
- ✨ 包含默认系统引导
- ✨ 支持程序化控制

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 功能引导组件基于 Driver.js 构建，提供了优雅的新手引导体验。通过高亮目标元素和显示说明文字，帮助用户快速了解系统功能。组件默认包含了常用的系统导航引导，也支持自定义步骤以适应不同场景需求。