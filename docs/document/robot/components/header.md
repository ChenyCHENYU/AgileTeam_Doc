---
outline: 'deep'
---

# C_Header 头部组件

> 🎯 应用顶部导航栏，集成面包屑、搜索、操作按钮和用户信息

## ✨ 特性

- **📐 双层结构**: 上层操作栏 + 下层标签页
- **🔄 折叠控制**: 控制侧边栏展开/折叠状态
- **🍞 面包屑导航**: 显示当前页面路径
- **🔍 全局搜索**: 集成搜索功能
- **🎨 主题适配**: 支持亮色/暗色主题切换
- **🔌 组件插槽**: 灵活配置操作按钮
- **👤 用户菜单**: 下拉式用户操作菜单

## 📦 安装

组件已全局注册，在布局中使用：

```vue
<template>
  <C_Header :isLightTheme="!isDarkMode" />
</template>
```

## 🎯 快速开始

### 基础用法

```vue
<template>
  <NLayout>
    <!-- 头部组件 -->
    <C_Header :isLightTheme="true" />
    
    <!-- 内容区 -->
    <NLayoutContent>
      <RouterView />
    </NLayoutContent>
  </NLayout>
</template>
```

### 配合主题使用

```vue
<template>
  <C_Header :isLightTheme="!themeStore.isDark" />
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>
```

## 📖 API 文档

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| **isLightTheme** | `boolean` | `true` | 是否为亮色主题 |

### Inject 依赖

组件依赖布局组件提供的数据：

```typescript
interface MenuCollapse {
  isCollapsed: Ref<boolean>      // 侧边栏折叠状态
  handleCollapsedChange: Function // 切换折叠状态
}
```

### 操作按钮配置

```typescript
interface HeaderAction {
  type?: 'component' | 'button'  // 类型
  componentName?: string          // 组件名称
  icon?: string                   // 图标类名
  tooltip?: string                // 提示文字
  action?: () => void            // 点击事件
}
```

### 用户菜单选项

```typescript
interface UserOption {
  key: string                     // 唯一标识
  label: string                   // 显示文字
  icon?: () => VNode             // 图标渲染函数
}
```

## 🎨 使用示例

### 场景 1: 标准后台管理系统

```vue
<template>
  <NLayout>
    <NLayoutSider>
      <C_Menu />
    </NLayoutSider>
    
    <NLayout>
      <!-- 头部导航 -->
      <C_Header 
        :isLightTheme="!isDark"
        @menu-collapse="handleMenuCollapse"
      />
      
      <NLayoutContent>
        <RouterView />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

const handleMenuCollapse = (collapsed) => {
  console.log('菜单状态:', collapsed ? '折叠' : '展开')
}
</script>
```

### 场景 2: 自定义操作按钮

```vue
<script setup>
// 自定义头部操作按钮
const customHeaderActions = [
  {
    type: 'component',
    componentName: 'C_Notice',  // 通知组件
  },
  {
    icon: 'i-mdi:refresh',
    tooltip: '刷新页面',
    action: () => location.reload(),
  },
  {
    icon: 'i-mdi:help-circle',
    tooltip: '帮助文档',
    action: () => window.open('/docs'),
  },
  {
    type: 'component',
    componentName: 'C_Theme',  // 主题切换组件
  },
  {
    icon: 'i-mdi:github',
    tooltip: 'GitHub',
    action: () => window.open('https://github.com'),
  },
]

// 通过 provide 注入自定义配置
provide('headerActions', customHeaderActions)
</script>
```

### 场景 3: 扩展用户菜单

```vue
<script setup>
import { s_userStore } from '@/stores/user'

const userStore = s_userStore()
const router = useRouter()

// 扩展的用户菜单选项
const extendedUserOptions = computed(() => [
  {
    key: 'profile',
    label: '个人中心',
    icon: () => h('span', { class: 'i-mdi:account-circle' }),
  },
  {
    key: 'settings',
    label: '账号设置',
    icon: () => h('span', { class: 'i-mdi:account-cog' }),
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    key: 'help',
    label: '帮助中心',
    icon: () => h('span', { class: 'i-mdi:help-circle' }),
  },
  {
    key: 'feedback',
    label: '意见反馈',
    icon: () => h('span', { class: 'i-mdi:message-alert' }),
  },
  {
    type: 'divider',
    key: 'd2',
  },
  {
    key: 'logout',
    label: '退出登录',
    icon: () => h('span', { class: 'i-mdi:logout' }),
  },
])

// 处理菜单选择
const handleUserMenuSelect = (key) => {
  switch (key) {
    case 'profile':
      router.push('/profile')
      break
    case 'settings':
      router.push('/settings')
      break
    case 'help':
      window.open('/help')
      break
    case 'feedback':
      // 打开反馈对话框
      openFeedbackDialog()
      break
    case 'logout':
      userStore.logout()
      break
  }
}
</script>
```

### 场景 4: 动态显示用户信息

```vue
<template>
  <C_Header :isLightTheme="!isDark">
    <template #user>
      <!-- 自定义用户信息显示 -->
      <div class="user-info flex items-center gap-3">
        <NAvatar 
          :src="userInfo.avatar" 
          :fallback-src="defaultAvatar"
          round 
          size="medium"
        />
        
        <div class="user-details">
          <div class="user-name font-medium">
            {{ userInfo.name }}
          </div>
          <div class="user-role text-xs opacity-60">
            {{ userInfo.role }}
          </div>
        </div>
        
        <NDropdown 
          :options="userOptions" 
          @select="handleUserAction"
        >
          <NButton text>
            <NIcon><ChevronDown /></NIcon>
          </NButton>
        </NDropdown>
      </div>
    </template>
  </C_Header>
</template>

<script setup>
import { s_userStore } from '@/stores/user'

const userStore = s_userStore()

const userInfo = computed(() => ({
  name: userStore.userInfo?.name || '访客',
  role: userStore.userInfo?.role || '未登录',
  avatar: userStore.userInfo?.avatar || '',
}))

const defaultAvatar = '/default-avatar.png'
</script>
```

## 🎨 样式定制

### 自定义头部样式

```scss
// 头部容器样式
.layout-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  z-index: 1000;
  background: var(--header-bg);
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  
  // 亮色主题
  &.light-theme {
    --header-bg: #ffffff;
    --border-color: #e8e8e8;
  }
  
  // 暗色主题
  &.dark-theme {
    --header-bg: #1f1f1f;
    --border-color: #333333;
  }
}

// 上层操作栏
.header-top {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  
  .header-content {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
  }
}

// 下层标签栏
.header-bottom {
  height: 44px;
  display: flex;
  align-items: flex-end;
  padding: 0 20px;
  border-top: 1px solid var(--border-color);
}

// 用户信息区域
.user-info {
  .user-details {
    max-width: 120px;
    
    .user-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
```

### 响应式适配

```scss
// 平板设备
@media (max-width: 1024px) {
  .layout-header {
    .header-actions {
      // 隐藏部分操作按钮
      > *:nth-child(n+4) {
        display: none;
      }
    }
  }
}

// 移动设备
@media (max-width: 768px) {
  .layout-header {
    height: auto;
    
    .header-top {
      flex-wrap: wrap;
      height: auto;
      padding: 12px;
    }
    
    // 面包屑在移动端隐藏
    .c-breadcrumb {
      display: none;
    }
    
    // 简化操作区
    .header-actions {
      width: auto;
      
      > *:not(:last-child) {
        display: none;
      }
    }
  }
}
```

## ⚙️ 高级用法

### 动态操作按钮

```vue
<script setup>
// 根据权限动态显示操作按钮
const dynamicActions = computed(() => {
  const actions = [
    {
      icon: 'i-mdi:bell',
      tooltip: '通知',
      action: () => {},
      permission: 'notification:view',
    },
    {
      icon: 'i-mdi:cog',
      tooltip: '设置',
      action: () => {},
      permission: 'settings:manage',
    },
  ]
  
  // 根据权限过滤
  return actions.filter(action => 
    hasPermission(action.permission)
  )
})

const hasPermission = (permission) => {
  return userStore.permissions.includes(permission)
}
</script>
```

### 全屏功能增强

```javascript
// 全屏管理器
class FullscreenManager {
  constructor() {
    this.isFullscreen = ref(false)
    this.init()
  }
  
  init() {
    // 监听全屏变化
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen.value = !!document.fullscreenElement
    })
  }
  
  toggle() {
    if (!document.fullscreenElement) {
      this.enter()
    } else {
      this.exit()
    }
  }
  
  enter() {
    const elem = document.documentElement
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen()
    }
  }
  
  exit() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
}

const fullscreen = new FullscreenManager()
```

### 消息通知集成

```vue
<script setup>
// 消息通知管理
const notificationStore = useNotificationStore()

const unreadCount = computed(() => notificationStore.unreadCount)
const notifications = computed(() => notificationStore.list)

// 轮询获取新消息
const pollInterval = ref(null)

onMounted(() => {
  // 每30秒检查新消息
  pollInterval.value = setInterval(() => {
    notificationStore.fetchNotifications()
  }, 30000)
})

onUnmounted(() => {
  if (pollInterval.value) {
    clearInterval(pollInterval.value)
  }
})
</script>
```

## 🐛 常见问题

### Q1: 折叠按钮不生效？

**A1:** 确保正确注入了 menuCollapse：

```javascript
// ✅ 正确：从 inject 获取
const { isCollapsed, handleCollapsedChange } = inject('menuCollapse')

// ❌ 错误：自定义状态
const isCollapsed = ref(false)
```

### Q2: 主题切换不同步？

**A2:** 检查主题 prop 传递：

```vue
<!-- ✅ 正确：使用计算属性 -->
<C_Header :isLightTheme="!themeStore.isDark" />

<!-- ❌ 错误：硬编码值 -->
<C_Header :isLightTheme="true" />
```

### Q3: 用户信息不更新？

**A3:** 确保使用响应式数据：

```javascript
// ✅ 正确：使用 computed
const userName = computed(() => userStore.userInfo?.name)

// ❌ 错误：直接赋值
const userName = userStore.userInfo?.name
```

### Q4: 操作按钮不显示？

**A4:** 检查组件是否正确注册：

```javascript
// 确保动态组件已全局注册
app.component('C_Notice', CNotice)
app.component('C_Theme', CTheme)
app.component('C_Language', CLanguage)
```

## 🎯 最佳实践

### 1. 组件化管理

```javascript
// 将操作按钮配置抽离
// config/headerActions.js
export const headerActionsConfig = {
  notice: {
    type: 'component',
    componentName: 'C_Notice',
  },
  fullscreen: {
    icon: 'i-mdi:fullscreen',
    tooltip: '全屏',
    action: () => toggleFullscreen(),
  },
  // ... 更多配置
}
```

### 2. 权限控制

```vue
<script setup>
// 根据角色显示不同菜单
const getUserOptions = (role) => {
  const baseOptions = [
    { key: 'profile', label: '个人中心' },
    { key: 'logout', label: '退出登录' },
  ]
  
  if (role === 'admin') {
    baseOptions.splice(1, 0, 
      { key: 'admin', label: '管理控制台' }
    )
  }
  
  return baseOptions
}
</script>
```

### 3. 性能优化

```vue
<script setup>
// 使用 shallowRef 优化大量操作按钮
const headerActions = shallowRef([...])

// 防抖处理频繁操作
import { debounce } from 'lodash-es'

const debouncedToggle = debounce(() => {
  handleCollapsedChange(!isCollapsed.value)
}, 300)
</script>
```

## 📝 更新日志

### v1.0.0 (2025-05-26)

- ✨ 初始版本发布
- ✨ 双层结构设计
- ✨ 集成面包屑导航
- ✨ 折叠控制功能
- ✨ 用户菜单下拉
- ✨ 动态操作按钮
- ✨ 主题适配支持

## 🤝 贡献指南

组件位置：`src/components/global/C_Header/index.vue`

如需扩展功能，请考虑：
1. 保持头部布局的稳定性
2. 确保响应式适配正常
3. 维护组件间的通信
4. 更新文档说明

## 📄 许可证

Copyright (c) 2025 by ChenYu, All Rights Reserved 😎

---

**💡 提示**: C_Header 组件是应用的顶部导航栏，采用双层结构设计，上层包含操作按钮和用户信息，下层展示标签页导航。通过灵活的配置方式，可以根据需求定制操作按钮和用户菜单。组件与布局系统深度集成，提供统一的交互体验。