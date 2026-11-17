---
outline: "deep"
description: "Robot_H5 v1.8.0 企业移动端 Vue 应用模板：Vue 3 + Vite 7 + TypeScript + Vant + UnoCSS + Pinia，一套移动应用底座连接页面、业务与设备能力，覆盖浏览器、App/PDA WebView 与 wl-mbase 子应用。"
reviewAfter: "2027-05-18"
---

# Robot_H5 移动应用框架

> 💧 **一套移动应用底座，连接页面、业务与设备能力。** Vue 3 · TypeScript · Vite 7 · Vant · UnoCSS · Pinia

[Robot_H5](https://github.com/ChenyCHENYU/Robot_H5)（v1.8.0）是企业移动端 Vue 应用模板，面向**独立浏览器、App/PDA WebView 和 wl-mbase 子应用**三种宿主。页面使用同一套组件与设计令牌；拍照、扫码、定位等设备能力由 [`@robot-h5/core`](https://www.npmjs.com/package/@robot-h5/core)（v1.2.0，20+ Hooks）适配运行平台。

## 能力地图

| 模块 | 当前能力 | 状态 |
| --- | --- | --- |
| 账号 | 登录、图形验证码、注册、短信、找回/修改密码 | 可验证的 Mock 流程；上线接真实账号服务 |
| 业务示例 | 客户档案：搜索筛选、详情、增删改、转化、公海、作废 | 接口驱动的完整演示 |
| 个人中心 | 昵称、签名、性别、行业、头像和封面 | 保存后同步用户状态 |
| 外观 | 浅色/深色、跟随系统、主题色、字体大小、减少动态效果 | 全局同步与持久化 |
| 公共组件 | 表单、移动列表、弹层、导航、图标、头像等 `C_*` 移动组件 | 分页支持刷新与失败重试 |
| 设备能力 | 拍照、定位、扫码、NFC、文件、签名、录音、蓝牙等 **15 个 Hook** | `@robot-h5/core` 统一适配；可用性取决于设备与宿主 |
| wl-mbase | 免登、公司上下文、动态标题、原生返回、单头部 | 已集成；发布前验证真实宿主 |
| 领域模板 | 设备、物流、计量等领域入口 | 规划中，入口明确标注状态 |

## 快速开始

需要 **Node.js 22.13+ 或 24.x**、**pnpm 11.8+**：

```bash
git clone https://github.com/ChenyCHENYU/Robot_H5.git
cd Robot_H5
pnpm install --frozen-lockfile
pnpm dev
# → http://localhost:8888/robot-h5/login
```

| 本地演示 | 值 |
| --- | --- |
| 默认账号 / 密码 | `CHENY` / `123456` |
| 图形验证码 | 按图片输入；2 分钟有效，提交后失效 |
| 短信验证码 | 点击发送后使用 `123456`，5 分钟有效 |
| 桌面预览 | 390 × 844，与 wl-mbase 模拟器尺寸一致 |

默认开发环境开启 Mock；真实集成环境不注入演示接口。创建自己的项目时用 `pnpm setup` 初始化模板信息（配置入口 `project.config.json`）。

## 页面与路由

页面目录使用 `index.vue`（模板与交互）+ `index.scss`（页面样式）+ `data.ts`（类型与静态配置）三文件分离；公共类型放 `types/`，通过 `#/*` 导入。

- TabBar 页面注册在 `src/router/menu.ts`，独立页面注册在 `src/router/modules.ts`
- 路由 `name` 与 `defineOptions({ name })` 一致，配置 `meta.title`
- 需要缓存的页面配置 `meta.keepAlive`，setup 中调用 `useScrollCache` 保存实际容器位置
- App/PDA 业务根页配置 `meta.mbaseRoot`，标题由路由完成事件统一上报

## 接口与数据

```ts
import { get, post } from '@/utils/http';
import type { Customer, CustomerInput } from '#/Customer/type';

export const getCustomerList = () => get<Customer[]>('/customer/list');
export const addCustomer = (data: CustomerInput) => post<Customer>('/customer', data);
```

类型化接口一业务模块一文件；HTTP 层内置响应校验、安全重试与会话处理。

## 项目结构

```text
Robot_H5/
├── src/
│   ├── api/              # 类型化接口，一业务模块一文件
│   ├── components/       # C_* 公共移动组件
│   ├── hooks/            # 分页、缓存、主题等组合函数
│   ├── platform/mbase/   # 宿主导航与公司上下文
│   ├── router/           # TabBar 与独立页面路由
│   ├── store/            # 用户、权限、主题、路由状态
│   ├── styles/           # 全局设计令牌与纯 Sass 工具
│   └── views/            # 首页、示例、账号、个人中心
├── mock/                 # 演示接口及独立数据仓库
├── tests/                # 浏览器回归测试
├── scripts/              # 初始化、构建、契约与兼容性校验
└── docs/                 # 构建、宿主接入、设计与维护文档
```

## 与 Robot 生态的关系

| 项 | 说明 |
| --- | --- |
| Robot_Admin | 中后台主框架；与本框架共用团队设计规范 |
| Robot_Uniapp | 跨端框架（H5/小程序/App），一套代码多端；Robot_H5 面向纯 H5/WebView 深度体验 |
| @robot-h5/core | 本框架的设备能力核心包，可独立用于其他 Vue 3 移动项目 |
| Robot_Cloud | 认证与系统管理后端 |

## 相关链接

- 仓库：[github.com/ChenyCHENYU/Robot_H5](https://github.com/ChenyCHENYU/Robot_H5)（完整能力地图、页面截图、宿主接入与维护文档）
- npm：[@robot-h5/core](https://www.npmjs.com/package/@robot-h5/core) — Bridge 通信 · 20+ Hooks · 离线存储
