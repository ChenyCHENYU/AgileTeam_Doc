---
outline: "deep"
---

# 路由与导航

> 🧭 UniApp 不使用 Vue Router，而是通过 `pages.json` 管理路由，结合 `uni.navigateTo` 等 API 实现导航。

## 📋 路由配置（pages.json）

UniApp 的路由配置全部集中在 `pages.json`：

```json
{
  "pages": [
    // 主包页面（首次加载必须）
    {
      "path": "pages/login/index",
      "style": {
        "navigationBarTitleText": "登录",
        "navigationStyle": "custom" // 使用自定义导航栏
      }
    },
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "主控台",
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/robot/index",
      "style": {
        "navigationBarTitleText": "组件库",
        "navigationStyle": "custom"
      }
    }
  ],

  "subPackages": [
    // 分包页面（按需加载，减小主包体积）
    {
      "root": "pages/demo",
      "pages": [
        { "path": "icon/index", "style": { "navigationStyle": "custom" } },
        { "path": "card/index", "style": { "navigationStyle": "custom" } }
      ]
    }
  ],

  "tabBar": {
    // TabBar 配置（通常由 C_Tabbar 组件接管，此处可留空）
  }
}
```

::: tip 分包策略
将组件演示页（`pages/demo/`）放入分包，主包仅含核心页面。微信小程序主包有 2MB 限制，分包策略是大型项目的必备优化手段。
:::

## 🔄 常用导航 API

Robot uniApp 对 UniApp 导航 API 进行了封装（`utils/router.ts`）：

### 基础导航

```ts
// 推入新页面（可返回）
uni.navigateTo({ url: "/pages/detail/index?id=123" });

// 关闭当前页 + 打开新页（不可返回）
uni.redirectTo({ url: "/pages/login/index" });

// 返回上一页
uni.navigateBack({ delta: 1 });

// 关闭所有页面 + 打开新页（重置页面栈）
uni.reLaunch({ url: "/pages/index/index" });

// 切换 TabBar 页面
uni.switchTab({ url: "/pages/index/index" });
```

### 携带参数

```ts
// 跳转时传参
uni.navigateTo({ url: `/pages/detail/index?id=${item.id}&type=order` });
```

```vue
<!-- 目标页面接收参数 -->
<script setup lang="ts">
const props = defineProps<{ id: string; type: string }>();
// 或用 onLoad 生命周期接收
import { onLoad } from "@dcloudio/uni-app";

onLoad((query) => {
  console.log(query.id); // '123'
  console.log(query.type); // 'order'
});
</script>
```

### 页面间通信（EventChannel）

```ts
// 父页面跳转并传递回调
uni.navigateTo({
  url: "/pages/select/index",
  events: {
    // 监听子页面发送的事件
    onSelectComplete(data) {
      console.log("selected:", data);
    },
  },
});
```

```ts
// 子页面发送事件并关闭
const eventChannel = uni.getCurrentPages().pop()?.getOpenerEventChannel?.();
eventChannel?.emit("onSelectComplete", { id: 1, name: "选中项" });
uni.navigateBack();
```

## 🛡️ 权限守卫

通过拦截器实现全局路由守卫：

```ts
// utils/router.ts — initRouter()
export function initRouter() {
  const interceptor = {
    invoke(args) {
      const path = args.url.split("?")[0].split("#")[0];
      const { isLoggedIn } = getCurrentUserState();

      // 白名单直放
      if (routeConfig.whiteList.includes(path)) return true;

      // 未登录，保存来源，跳登录
      if (!isLoggedIn) {
        uni.redirectTo({
          url: `/pages/login/index?redirect=${encodeURIComponent(args.url)}`,
        });
        return false;
      }

      return true;
    },
  };

  // 拦截各种跳转方式
  uni.addInterceptor("navigateTo", interceptor);
  uni.addInterceptor("redirectTo", interceptor);
  uni.addInterceptor("reLaunch", interceptor);
  uni.addInterceptor("switchTab", interceptor);
}
```

**登录成功后回跳：**

```ts
// pages/login/index.vue
import { onLoad } from "@dcloudio/uni-app";

let redirectUrl = "";

onLoad((query) => {
  redirectUrl = decodeURIComponent(query.redirect || "");
});

const handleLoginSuccess = () => {
  if (redirectUrl) {
    uni.navigateTo({ url: redirectUrl });
  } else {
    uni.switchTab({ url: "/pages/index/index" });
  }
};
```

## 🗺️ 路由白名单配置

```ts
// utils/router.ts
export const routeConfig = {
  // 无需登录即可访问的页面路径（精确匹配）
  whiteList: [
    "/pages/login/index",
    "/pages/register/index",
    "/pages/index/index", // 首页允许游客浏览
  ],

  // 需要特定权限的页面（可选精细化配置）
  permissionPages: {
    "/pages/admin/dashboard": ["admin"],
    "/pages/finance/report": ["finance:view"],
  },
};
```

## 🧩 C_Layout 内置导航

`C_Layout` 组件内置了导航逻辑，直接传入配置即可：

```vue
<!-- 带返回按钮的二级页面 -->
<C_Layout :show-tabbar="false">
  <C_Header title="订单详情" show-back />
  <!-- 页面内容 -->
</C_Layout>

<!-- 带 Tabbar 的主页面 -->
<C_Layout show-tabbar show-header>
  <C_Header title="主控台" />
  <view class="page-content">
    <slot />
  </view>
</C_Layout>
```

## 📊 页面栈管理

```ts
// 获取页面栈
const pages = getCurrentPages();
console.log(pages.length); // 当前页面深度

// 获取当前页面路由
const currentPage = pages[pages.length - 1];
console.log(currentPage.route); // 'pages/detail/index'

// 跳回栈中特定级别
uni.navigateBack({ delta: 2 }); // 返回前两页
```

::: warning 页面栈限制
UniApp / 微信小程序对页面栈有最大 10 层的限制，超出则 `navigateTo` 会失效。深层嵌套时建议使用 `redirectTo`。
:::
