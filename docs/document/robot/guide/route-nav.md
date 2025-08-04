---
outline: "deep"
---

# Robot Admin 路由与导航详解

<div class="hero-banner">
  <h2>🛣️ 智能路由系统架构解析</h2>
  <p>深入理解动态路由生成、权限控制和导航守卫机制，构建灵活可扩展的导航体系</p>
</div>

Robot Admin 实现了一个全面的路由和导航系统，包括动态路由生成、权限控制和智能导航守卫。本文档将详细介绍路由系统的工作原理，以及如何实现自定义路由和导航功能。

<ImgPreview src="robot/guide/13.png" title="路由系统架构图" width="70%"/>

## 🎯 系统设计理念

路由系统基于以下核心设计原则：

| 原则         | 说明                     | 实现价值               |
| ------------ | ------------------------ | ---------------------- |
| **动态生成** | 基于用户权限动态构建路由 | 灵活适应不同角色需求   |
| **权限控制** | 路由级别的访问控制       | 确保数据安全和用户隔离 |
| **懒加载**   | 组件按需加载优化性能     | 提升首屏加载速度       |
| **可扩展**   | 支持多种路由模式和配置   | 适应不同业务场景       |

::: tip 💡 架构优势
系统由四个主要组件组成：核心路由实例、公共路由、动态路由和权限守卫，各组件职责清晰，协同工作构建完整的导航体系。
:::

## 🏗️ 路由架构概述

### 核心组件结构

```
src/router/
├── 🔧 index.ts           # 核心路由实例
├── 📋 publicRouter.ts    # 公共路由定义
├── 🔄 dynamicRouter.ts   # 动态路由处理
└── 🛡️ permission.ts     # 权限守卫
```

### 路由配置系统

核心路由实例支持多种模式配置，通过环境变量灵活切换：

::: code-group

```typescript [index.ts - 路由配置]
// 路由模式通过环境变量配置
const mode = import.meta.env.VITE_ROUTER_MODE as "hash" | "history";

const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory(),
};

const historyCreator = routerMode[mode] || createWebHashHistory;

// 创建路由实例
const router = createRouter({
  routes: [...publicRoutes, ...errorRoutes],
  history: historyCreator(),
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 全局路由配置
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title
    ? `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE}`
    : import.meta.env.VITE_APP_TITLE;

  next();
});
```

```typescript [环境配置示例]
# .env.development
VITE_ROUTER_MODE=history
VITE_APP_TITLE=Robot Admin

# .env.production
VITE_ROUTER_MODE=hash
VITE_APP_TITLE=Robot Admin Pro
```

:::

## 📋 路由类型系统

### 公共路由

公共路由始终可访问，无需认证，包括登录页面和错误页面：

::: code-group

```typescript [publicRouter.ts - 公共路由]
export const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      icon: "login",
      hidden: true,
      requiresAuth: false,
    },
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      title: "页面不存在",
      hidden: true,
    },
  },
];
```

```typescript [白名单配置]
// 无需认证的路由白名单
export const WHITE_LIST = [
  "/login",
  "/404",
  "/401",
  "/register",
];

// 检查是否为白名单路由
export const isWhiteListRoute = (path: string): boolean => {
  return WHITE_LIST.includes(path);
};
```

:::

### 动态路由

动态路由基于用户权限生成，在认证成功后动态初始化：

::: code-group

```typescript [dynamicRouter.ts - 动态路由处理]
// 路由处理核心函数
const processRoute = (route: DynamicRoute, isChild = false): RouteRecordRaw => {
  return {
    ...route,
    path: normalizePath(route.path, isChild),
    component: resolveComponent(route.component),
    children: route.children?.map((child) => processRoute(child, true)),
    meta: {
      ...route.meta,
      isLayout: route.component === "layout",
      level: isChild ? 2 : 1,
    },
  } as RouteRecordRaw;
};

// 组件解析器
const resolveComponent = (path?: string) => {
  if (!path) return undefined;

  // 检查预定义组件
  if (path in COMPONENTS) {
    return COMPONENTS[path as keyof typeof COMPONENTS];
  }

  try {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const viewPath = `/src/views${normalizedPath}.vue`;
    const modules = import.meta.glob("@/views/**/*.vue");

    if (modules[viewPath]) {
      return modules[viewPath];
    }

    console.warn(`组件未找到: ${path}`);
    return COMPONENTS["404"];
  } catch (error) {
    console.error(`组件解析失败: ${path}`, error);
    return COMPONENTS["404"];
  }
};
```

:::

## 📊 路由元属性系统

路由元属性控制路由的行为和在导航系统中的显示方式：

::: code-group

```typescript [route-meta.ts - 元属性定义]
interface RouteMeta {
  /** 页面标题 */
  title: string;
  /** 菜单图标 */
  icon?: string;
  /** 是否在菜单中隐藏 */
  hidden?: boolean;
  /** 是否固定标签页，不可关闭 */
  affix?: boolean;
  /** 是否缓存组件 */
  keepAlive?: boolean;
  /** 是否全屏显示 */
  full?: boolean;
  /** 外部链接URL */
  link?: string;
  /** 是否需要认证 */
  requiresAuth?: boolean;
  /** 所需权限列表 */
  permissions?: string[];
}
```

```typescript [元属性使用示例]
// 典型的路由元属性配置
const routeExamples = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/dashboard/index.vue"),
    meta: {
      title: "仪表板",
      icon: "dashboard",
      affix: true, // 固定标签页
      keepAlive: true, // 缓存组件
      requiresAuth: true, // 需要认证
      permissions: ["dashboard:view"],
    },
  },
];
```

:::

## 🔄 动态路由生成

动态路由初始化是整个路由系统的核心环节：

::: code-group

```typescript [dynamic-init.ts - 初始化流程]
// 初始化动态路由
export const initDynamicRouter = async (): Promise<boolean> => {
  try {
    const permissionStore = s_permissionStore();

    // 获取用户权限路由数据
    const { code, data: routes, msg } = await permissionStore.getAuthMenuList();

    if (code !== "0" || !Array.isArray(routes)) {
      throw new Error(msg || "无效的路由数据格式");
    }

    // 清理现有动态路由
    clearExistingRoutes(["login", "404", "401"]);

    // 处理并注册新路由
    const processedRoutes = routes
      .filter(validateRoute)
      .map((route) => processRoute(route));

    processedRoutes.forEach((route) => {
      router.addRoute(route);
    });

    // 添加通配符路由（必须最后添加）
    router.addRoute({
      path: "/:pathMatch(.*)*",
      name: "NotFoundCatch",
      redirect: "/404",
    });

    return true;
  } catch (error) {
    console.error("动态路由初始化失败:", error);
    return false;
  }
};
```

:::

## 🛡️ 权限控制与导航守卫

权限控制系统的核心是导航守卫，处理认证检查和权限验证：

::: code-group

```typescript [permission.ts - 导航守卫]
// 主导航守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start();

  try {
    const userStore = s_userStore();
    const permissionStore = s_permissionStore();
    const { token } = userStore;
    const { authMenuList } = permissionStore;

    // 处理未认证用户
    if (!token) {
      if (isWhiteListRoute(to.path)) {
        next();
        return;
      }
      next("/login");
      return;
    }

    // 已认证用户访问登录页，重定向到首页
    if (to.path === "/login") {
      next("/");
      return;
    }

    // 初始化动态路由（如果未加载）
    if (!authMenuList.length) {
      const success = await initDynamicRouter();
      if (success) {
        next({ ...to, replace: true });
      } else {
        await userStore.logout();
        next("/login");
      }
      return;
    }

    // 权限检查
    if (to.meta.requiresAuth) {
      const hasPermission = checkRoutePermission(
        to,
        permissionStore.permissions
      );

      if (!hasPermission) {
        next("/401");
        return;
      }
    }

    next();
  } catch (error) {
    console.error("导航守卫错误:", error);
    next("/500");
  }
});

// 导航后置守卫
router.afterEach(() => {
  NProgress.done();
});
```

:::

## 🛠️ 自定义路由开发

### 添加静态公共路由

::: code-group

```typescript [static-route-example.ts]
// 添加静态公共路由
export const publicRoutes: RouteRecordRaw[] = [
  // 现有路由...

  // 新增公共路由
  {
    path: "/public-dashboard",
    name: "publicDashboard",
    component: () => import("@/views/public/Dashboard.vue"),
    meta: {
      title: "公共仪表板",
      icon: "dashboard",
      requiresAuth: false,
    },
  },
];
```

:::

### 创建动态路由

::: code-group

```typescript [dynamic-route-config.ts]
// 后端路由数据格式示例
interface BackendRouteData {
  code: string;
  data: DynamicRoute[];
  msg: string;
}

// 标准的动态路由配置格式
const dynamicRouteExample: DynamicRoute[] = [
  {
    path: "/system",
    name: "System",
    component: "layout",
    redirect: "/system/users",
    meta: {
      title: "系统管理",
      icon: "system",
    },
    children: [
      {
        path: "users",
        name: "Users",
        component: "system/users/index",
        meta: {
          title: "用户管理",
          keepAlive: true,
          permissions: ["user:list", "user:view"],
        },
      },
    ],
  },
];
```

:::

### 常见路由模式

::: code-group

```typescript [route-patterns.ts]
// 嵌套路由模式
const nestedRoutePattern = {
  path: "/workspace",
  component: "layout",
  redirect: "/workspace/projects",
  meta: { title: "工作台" },
  children: [
    {
      path: "projects",
      component: "workspace/Projects",
      meta: { title: "项目管理" },
    },
  ],
};

// 带参数的路由
const parameterizedRoute = {
  path: "/user/:id",
  component: "user/Detail",
  meta: { title: "用户详情" },
};

// 外部链接路由
const externalLinkRoute = {
  path: "/external-link",
  meta: {
    title: "GitHub 仓库",
    link: "https://github.com/ChenyCHENYU/Robot_Admin",
  },
};
```

:::

## 📋 最佳实践指南

| 建议           | 说明                         | 重要性  |
| -------------- | ---------------------------- | ------- |
| **组件懒加载** | 始终使用动态导入实现代码分割 | 🔴 关键 |
| **路由元属性** | 一致使用元属性控制路由行为   | 🟡 重要 |
| **错误处理**   | 实现完善的路由错误处理机制   | 🟡 重要 |
| **权限控制**   | 前后端权限验证双重保障       | 🔴 关键 |

### 代码规范

::: code-group

```typescript [coding-standards.ts]
// ✅ 推荐的路由定义方式
const goodRouteExample = {
  path: "/users",
  name: "UserManagement", // 使用描述性名称
  component: () => import("@/views/users/index.vue"), // 懒加载
  meta: {
    title: "用户管理",
    icon: "users",
    requiresAuth: true,
    permissions: ["user:view"],
    keepAlive: true,
  },
};

// ❌ 避免的做法
const badRouteExample = {
  path: "/u", // 路径不够描述性
  name: "u1", // 名称不清晰
  component: UsersComponent, // 同步导入，影响性能
};
```

:::

::: tip 🎯 开发建议
通过遵循这些指南并深入理解 Robot Admin 中的路由架构，您可以有效地实现和自定义应用程序所需的路由功能。记住始终考虑安全性、性能和用户体验三个核心要素。
:::

---

<!-- GitHub徽章组件 -->
<GitHubBadges />

<style>
.hero-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  color: white;
  margin: 2rem 0;
}

.hero-banner h2 {
  margin: 0 0 1rem 0;
  font-size: 1.8rem;
  font-weight: bold;
}

.hero-banner p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .hero-banner h2 {
    font-size: 1.5rem;
  }
}
</style>