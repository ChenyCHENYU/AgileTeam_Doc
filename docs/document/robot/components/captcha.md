---
outline: 'deep'
---

# C_Captcha 拼图验证码组件

> 🧩 基于 vue3-puzzle-vcode 的现代化拼图验证组件，提供优雅的人机验证体验

## 🚀 在线演示

::: tip 💻 在线体验
该组件已集成在 Robot Admin 登录页中，访问即可体验人机验证 → [Robot Admin](https://robotadmin.cn)
:::

## ✨ 特性

- **🧩 拼图验证**: 滑动拼图完成人机验证
- **🎨 现代化设计**: 优雅的 UI 和流畅的交互体验
- **✅ 状态反馈**: 成功、失败、重置的视觉反馈
- **🔐 Token 生成**: 验证成功后生成唯一 token
- **🎯 自定义图片**: 支持自定义验证图片
- **♿ 无障碍**: 支持键盘操作和屏幕阅读器
- **🌓 主题支持**: 适配深色/浅色主题

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
  <C_Captcha
    @success="handleSuccess"
    @fail="handleFail"
  />
</template>

<script setup>
const handleSuccess = (data) => {
  console.log('验证成功:', data)
  // data: { token: 'puzzle_xxx', timestamp: 1234567890 }
}

const handleFail = (error) => {
  console.log('验证失败:', error)
}
</script>
```

### 自定义配置

```vue
<template>
  <C_Captcha
    trigger-text="点击完成安全验证"
    :images="customImages"
    :disabled="isDisabled"
    theme="dark"
    @success="onVerified"
  />
</template>

<script setup>
const customImages = [
  '/captcha/image1.jpg',
  '/captcha/image2.jpg',
  '/captcha/image3.jpg',
]

const isDisabled = ref(false)

const onVerified = ({ token }) => {
  // 使用 token 进行后续操作
  submitForm(token)
}
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| **triggerText** | `string` | `'点击进行人机验证'` | 触发按钮文字 |
| **images** | `string[]` | `[]` | 自定义验证图片数组 |
| **disabled** | `boolean` | `false` | 是否禁用 |
| **theme** | `'light' \| 'dark'` | `'dark'` | 主题模式 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| **success** | `{ token: string, timestamp: number }` | 验证成功时触发 |
| **fail** | `error: string` | 验证失败时触发 |
| **change** | `valid: boolean` | 验证状态改变时触发 |
| **reset** | - | 重置验证时触发 |

### 暴露方法

| 方法名 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| **validate** | - | `boolean` | 获取验证状态 |
| **getToken** | - | `string` | 获取验证 token |
| **getVerificationData** | - | `object \| null` | 获取完整验证数据 |
| **reset** | - | `void` | 重置验证状态 |
| **show** | - | `void` | 手动显示验证弹窗 |

## 🎨 使用示例

### 场景 1: 登录表单集成

::: details 🔐 查看登录表单集成代码
```vue
<template>
  <NForm ref="formRef" :model="formData">
    <NFormItem label="用户名">
      <NInput v-model:value="formData.username" />
    </NFormItem>
    
    <NFormItem label="密码">
      <NInput v-model:value="formData.password" type="password" />
    </NFormItem>
    
    <NFormItem label="人机验证">
      <C_Captcha
        ref="captchaRef"
        @success="handleCaptchaSuccess"
        @fail="handleCaptchaFail"
      />
    </NFormItem>
    
    <NButton
      type="primary"
      :disabled="!isVerified"
      @click="handleLogin"
    >
      登录
    </NButton>
  </NForm>
</template>

<script setup>
const formRef = ref()
const captchaRef = ref()
const isVerified = ref(false)

const formData = ref({
  username: '',
  password: '',
})

const handleCaptchaSuccess = ({ token }) => {
  isVerified.value = true
  formData.value.captchaToken = token
  message.success('验证成功，请继续登录')
}

const handleCaptchaFail = () => {
  isVerified.value = false
  message.error('验证失败，请重试')
}

const handleLogin = async () => {
  // 获取验证数据
  const verificationData = captchaRef.value.getVerificationData()
  
  if (!verificationData) {
    message.warning('请先完成人机验证')
    return
  }
  
  try {
    const res = await api.login({
      ...formData.value,
      ...verificationData,
    })
    
    if (res.success) {
      message.success('登录成功')
      router.push('/dashboard')
    }
  } catch (error) {
    // 登录失败，重置验证码
    captchaRef.value.reset()
    isVerified.value = false
  }
}
</script>
```
:::

### 场景 2: 注册表单二次验证

::: details 📝 查看注册表单二次验证代码
```vue
<template>
  <NForm>
    <!-- 其他表单项 -->
    
    <NFormItem>
      <NButton
        type="primary"
        @click="showVerification"
      >
        提交注册
      </NButton>
    </NFormItem>
  </NForm>

  <!-- 二次验证弹窗 -->
  <NModal v-model:show="showVerifyModal">
    <NCard title="安全验证" style="width: 400px">
      <p>为了您的账户安全，请完成验证</p>
      
      <C_Captcha
        ref="modalCaptchaRef"
        trigger-text="滑动完成验证"
        @success="onVerifySuccess"
      />
      
      <template #footer>
        <NButton @click="showVerifyModal = false">取消</NButton>
      </template>
    </NCard>
  </NModal>
</template>

<script setup>
const showVerifyModal = ref(false)
const modalCaptchaRef = ref()

const showVerification = () => {
  // 先验证表单
  if (!validateForm()) return
  
  // 显示验证弹窗
  showVerifyModal.value = true
  
  // 自动触发验证
  nextTick(() => {
    modalCaptchaRef.value?.show()
  })
}

const onVerifySuccess = async ({ token }) => {
  showVerifyModal.value = false
  
  // 提交注册
  await submitRegistration(token)
}
</script>
```
:::

### 场景 3: 重要操作保护

::: details ⚠️ 查看重要操作保护代码
```vue
<template>
  <div class="danger-zone">
    <NAlert type="warning">
      危险操作区域，请谨慎操作
    </NAlert>
    
    <NSpace>
      <NButton
        type="error"
        @click="confirmDelete"
      >
        删除账户
      </NButton>
      
      <NButton
        type="warning"
        @click="confirmReset"
      >
        重置数据
      </NButton>
    </NSpace>
    
    <!-- 操作验证 -->
    <C_Captcha
      ref="dangerCaptchaRef"
      trigger-text="验证身份后继续"
      :disabled="!pendingAction"
      @success="executeDangerAction"
    />
  </div>
</template>

<script setup>
const dangerCaptchaRef = ref()
const pendingAction = ref(null)

const confirmDelete = () => {
  dialog.warning({
    title: '确认删除账户？',
    content: '此操作不可恢复',
    positiveText: '继续',
    onPositiveClick: () => {
      pendingAction.value = 'delete'
      dangerCaptchaRef.value.show()
    },
  })
}

const confirmReset = () => {
  dialog.warning({
    title: '确认重置数据？',
    content: '所有数据将被清空',
    positiveText: '继续',
    onPositiveClick: () => {
      pendingAction.value = 'reset'
      dangerCaptchaRef.value.show()
    },
  })
}

const executeDangerAction = async ({ token }) => {
  const action = pendingAction.value
  
  try {
    if (action === 'delete') {
      await api.deleteAccount({ token })
      message.success('账户已删除')
    } else if (action === 'reset') {
      await api.resetData({ token })
      message.success('数据已重置')
    }
  } finally {
    pendingAction.value = null
    dangerCaptchaRef.value.reset()
  }
}
</script>
```
:::

### 场景 4: 防刷保护

::: details 🛡️ 查看防刷保护代码
```vue
<template>
  <div class="api-tester">
    <NInput v-model:value="apiEndpoint" />
    
    <NButton
      @click="testApi"
      :loading="loading"
    >
      发送请求
    </NButton>
    
    <!-- 频率限制验证 -->
    <C_Captcha
      v-if="needCaptcha"
      ref="rateLimitCaptcha"
      trigger-text="请先完成验证"
      @success="handleRateLimitVerify"
    />
  </div>
</template>

<script setup>
const apiEndpoint = ref('')
const loading = ref(false)
const needCaptcha = ref(false)
const requestCount = ref(0)
const rateLimitCaptcha = ref()

const MAX_REQUESTS = 5

const testApi = async () => {
  requestCount.value++
  
  // 超过限制需要验证
  if (requestCount.value > MAX_REQUESTS && !needCaptcha.value) {
    needCaptcha.value = true
    message.warning('请求频率过高，请完成验证')
    return
  }
  
  if (needCaptcha.value && !rateLimitCaptcha.value?.validate()) {
    message.warning('请先完成人机验证')
    rateLimitCaptcha.value?.show()
    return
  }
  
  loading.value = true
  try {
    await api.test(apiEndpoint.value)
    message.success('请求成功')
  } finally {
    loading.value = false
  }
}

const handleRateLimitVerify = () => {
  // 重置计数
  requestCount.value = 0
  needCaptcha.value = false
  message.success('验证成功，请继续操作')
  
  // 10分钟后重新计数
  setTimeout(() => {
    requestCount.value = 0
  }, 10 * 60 * 1000)
}
</script>
```
:::

## 🎨 样式定制

### 自定义触发按钮样式

::: details 🎨 查看自定义触发按钮样式代码
```scss
// index.scss
.c-captcha-modern {
  .captcha-trigger {
    display: inline-flex;
    align-items: center;
    padding: 10px 16px;
    background: #f5f5f5;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: #fafafa;
      border-color: #40a9ff;
    }
    
    &.verified {
      background: #f6ffed;
      border-color: #52c41a;
      color: #52c41a;
    }
    
    &.error {
      background: #fff2f0;
      border-color: #ff4d4f;
      color: #ff4d4f;
    }
    
    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .captcha-icon {
    font-size: 20px;
    margin-right: 8px;
  }
  
  .success-icon {
    color: #52c41a;
  }
  
  .error-icon {
    color: #ff4d4f;
  }
  
  .refresh-button {
    margin-left: auto;
    padding: 0 8px;
    font-size: 18px;
    cursor: pointer;
    transition: transform 0.3s;
    
    &:hover {
      transform: rotate(180deg);
    }
  }
}

// 暗色主题
.dark {
  .captcha-trigger {
    background: #1f1f1f;
    border-color: #434343;
    color: #rgba(255, 255, 255, 0.85);
    
    &:hover {
      background: #2a2a2a;
    }
  }
}
```
:::

### 自定义验证弹窗

::: details 🔧 查看自定义验证弹窗代码
```css
/* 覆盖 vue3-puzzle-vcode 样式 */
:deep(.vue-puzzle-vcode) {
  /* 自定义弹窗背景 */
  .pv-modal {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
  }
  
  /* 自定义滑块样式 */
  .pv-slider {
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }
  
  /* 自定义成功提示 */
  .pv-success {
    background: #52c41a;
  }
}
```
:::

## 🐛 常见问题

### Q1: 验证图片不显示？

**A1:** 检查图片路径和格式：

::: details 查看解决方案代码
```javascript
// ✅ 正确：使用绝对路径或 public 目录
const images = [
  '/captcha/1.jpg',
  '/captcha/2.jpg',
]

// ❌ 错误：相对路径可能有问题
const images = [
  './images/1.jpg',
  '../assets/2.jpg',
]
```
:::

### Q2: Token 如何使用？

**A2:** Token 用于后端验证：

::: details 查看解决方案代码
```javascript
// 前端发送
const { token } = captchaRef.value.getVerificationData()
await api.submit({ token, ...data })

// 后端验证（示例）
if (!verifyPuzzleToken(token)) {
  throw new Error('验证失败')
}
```
:::

### Q3: 如何自定义验证逻辑？

**A3:** 可以在成功回调中添加额外验证：

::: details 查看解决方案代码
```javascript
const handleSuccess = async ({ token }) => {
  // 二次验证
  const isValid = await api.verifyCaptcha(token)
  
  if (!isValid) {
    captchaRef.value.reset()
    message.error('验证无效，请重试')
    return
  }
  
  // 继续后续操作
}
```
:::

## 🎯 最佳实践

### 1. 合理使用场景

```javascript
// 推荐使用场景
const USE_CASES = {
  LOGIN: true,           // 登录保护
  REGISTER: true,        // 注册验证
  RESET_PASSWORD: true,  // 密码重置
  SENSITIVE_ACTION: true,// 敏感操作
  API_PROTECTION: true,  // API 防护
}

// 不推荐场景
const AVOID_CASES = {
  EVERY_FORM: false,     // 每个表单都加
  SEARCH: false,         // 搜索功能
  NAVIGATION: false,     // 页面导航
}
```

### 2. 错误处理

```javascript
// 完善的错误处理
const handleVerification = async () => {
  try {
    const data = captchaRef.value.getVerificationData()
    if (!data) throw new Error('未完成验证')
    
    await api.submit(data)
  } catch (error) {
    console.error('验证错误:', error)
    captchaRef.value.reset()
    
    // 记录错误
    errorLogger.log({
      type: 'captcha_error',
      error: error.message,
      timestamp: Date.now(),
    })
  }
}
```

### 3. 性能优化

```javascript
// 延迟加载验证组件
const C_Captcha = defineAsyncComponent(() =>
  import('@/components/global/C_Captcha/index.vue')
)

// 图片预加载
const preloadImages = (images) => {
  images.forEach(src => {
    const img = new Image()
    img.src = src
  })
}
```

## 📝 更新日志

### v1.0.0 (2025-07-23)

- ✨ 初始版本发布
- ✨ 基于 vue3-puzzle-vcode 封装
- ✨ 支持自定义图片
- ✨ Token 生成机制
- ✨ 完整的状态管理
- ✨ 主题适配支持

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 拼图验证码组件提供了友好的人机验证体验，通过滑动拼图完成验证。组件封装了完整的验证流程，包括成功、失败、重置等状态管理，并生成唯一 token 供后端验证。适用于登录、注册、敏感操作等需要人机验证的场景。