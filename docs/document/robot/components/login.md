---
outline: "deep"
---

# C_Login 登录组件

通用插拔式登录面板，通过 `features` 开关控制功能模块，支持 CSS 变量主题定制。

## 特性

- 🔑 **密码登录** — 用户名 + 密码表单，支持记住密码
- 📱 **验证码登录** — 手机号 / 邮箱 + 短信验证码
- 📷 **扫码登录** — 二维码展示 + 定时刷新
- 🌐 **社交登录** — GitHub / 微信 / QQ 等第三方
- 📝 **注册** — 手机号 + 验证码 + 密码确认
- 🤖 **人机验证** — 拼图验证码集成
- 🎨 **CSS 变量** — 完全可定制主题
- 🌍 **国际化** — 内置 i18n 支持

## 基础用法

```vue
<template>
  <C_Login
    title="欢迎回来"
    subtitle="Robot Admin 后台管理系统"
    logo-icon="mdi:robot"
    :loading="loading"
    @submit="handleSubmit"
    @social-login="handleSocialLogin"
  />
</template>

<script setup lang="ts">
const loading = ref(false);

const handleSubmit = async (data) => {
  loading.value = true;
  try {
    await loginApi(data);
  } finally {
    loading.value = false;
  }
};

const handleSocialLogin = (provider: string) => {
  console.log("社交登录:", provider);
};
</script>
```

## 功能开关

通过 `features` prop 控制各模块的显隐：

```vue
<C_Login
  :features="{
    passwordLogin: true,
    captchaLogin: true,
    qrcodeLogin: false,
    socialLogin: true,
    register: true,
    humanVerify: false,
    rememberMe: true,
    forgotPassword: true,
  }"
/>
```

## API

### Props

| 参数              | 类型               | 默认值               | 说明               |
| ----------------- | ------------------ | -------------------- | ------------------ |
| **title**           | `string`           | `'欢迎回来'`         | 面板标题           |
| **subtitle**        | `string`           | —                    | 副标题             |
| **logoIcon**        | `string`           | —                    | Iconify 图标名     |
| **features**        | `LoginFeatures`    | 全部 `true`          | 功能开关           |
| **socialProviders** | `SocialProvider[]` | GitHub/微信/QQ       | 社交登录配置       |
| **qrcodeUrl**       | `string`           | —                    | 扫码登录二维码地址 |
| **storageKey**      | `string`           | `'c_login_remember'` | 记住密码的存储键名 |
| **loading**         | `boolean`          | `false`              | 提交按钮加载状态   |
| **defaultUsername** | `string`           | `''`                 | 默认用户名         |
| **defaultPassword** | `string`           | `''`                 | 默认密码           |

### LoginFeatures

| 字段             | 类型      | 默认值 | 说明       |
| ---------------- | --------- | ------ | ---------- |
| `passwordLogin`  | `boolean` | `true` | 密码登录   |
| `captchaLogin`   | `boolean` | `true` | 验证码登录 |
| `qrcodeLogin`    | `boolean` | `true` | 扫码登录   |
| `socialLogin`    | `boolean` | `true` | 社交登录   |
| `register`       | `boolean` | `true` | 注册入口   |
| `humanVerify`    | `boolean` | `true` | 人机验证   |
| `rememberMe`     | `boolean` | `true` | 记住密码   |
| `forgotPassword` | `boolean` | `true` | 忘记密码   |

### Events

| 事件                 | 参数                                                      | 说明           |
| -------------------- | --------------------------------------------------------- | -------------- |
| **submit**             | `PasswordFormData & { captchaToken?, captchaTimestamp? }` | 密码登录提交   |
| **captcha-submit**     | `CaptchaFormData`                                         | 验证码登录提交 |
| **send-code**          | `account: string`                                         | 请求发送验证码 |
| **social-login**       | `provider: string`                                        | 社交登录点击   |
| **forgot-password**    | —                                                         | 忘记密码点击   |
| **qrcode-refresh**     | —                                                         | 刷新二维码     |
| **register-submit**    | `RegisterFormData`                                        | 注册提交       |
| **register-send-code** | `phone: string`                                           | 注册发送验证码 |

### Slots

| 插槽     | 说明             |
| -------- | ---------------- |
| `logo`   | 自定义 Logo 区域 |
| `footer` | 面板底部内容     |

### 类型定义

```ts
interface PasswordFormData {
  username: string;
  password: string;
}

interface CaptchaFormData {
  account: string;
  code: string;
}

interface RegisterFormData {
  phone: string;
  code: string;
  password: string;
  confirmPassword: string;
}

interface SocialProvider {
  key: string;
  label: string;
  icon: string;
}
```

### CSS 变量

| 变量                   | 默认值             | 说明       |
| ---------------------- | ------------------ | ---------- |
| `--c-login-bg`         | `var(--c-bg-body)` | 面板背景色 |
| `--c-login-width`      | `420px`            | 面板宽度   |
| `--c-login-padding`    | `40px`             | 面板内边距 |
| `--c-login-radius`     | `var(--c-radius)`  | 圆角       |
| `--c-login-title-size` | `24px`             | 标题字号   |

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 登录组件提供完整的认证体验，支持密码登录、验证码登录、扫码登录和社交登录。如果遇到问题请先查看文档，或者在团队群里讨论。🔐
