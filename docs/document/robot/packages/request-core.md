---
outline: "deep"
description: "@robot-admin/request-core 0.7.0：实例级 Axios 请求编排与 Vue 3 Headless CRUD 工具。统一处理并发、缓存、取消、重试、Token 恢复与数据列表生命周期。"
reviewAfter: "2027-05-16"
---

# request-core 请求与 CRUD

> **让请求、认证恢复与列表状态，拥有一致的生命周期。** Axios · 隔离 Client · 并发策略 · Vue Headless CRUD

`@robot-admin/request-core` 是实例化请求编排与 Vue 3 Headless CRUD 工具，当前版本 **0.7.0**。基于 Axios，每个 Client 隔离运行状态；Vue 层不绑定表格或 UI 组件，Naive UI 通过单独兼容适配层接入。

## 能力地图

| 领域 | 提供能力 |
| :---: | :--- |
| 请求 Client | 类型化方法、响应适配、拦截器与统一 `RequestError` |
| 并发 | `join`、`takeLatest`、`takeFirst`、`allow` |
| 缓存与重试 | LRU / TTL、标签失效、退避、抖动、Retry-After 与时间预算 |
| 认证恢复 | 主动刷新、并发 401 恢复与重新登录共用 single-flight |
| Vue 请求 | `useRequest` 的数据、错误、loading、取消和过期结果隔离 |
| Headless CRUD | 数据源、分页查询、编辑器、详情、增删改与应用级预配置 |

## 入口选择

| 入口 | 依赖与用途 |
| :---: | :--- |
| `/axios` | 仅 Axios；纯请求项目优先使用 |
| `/vue` | Axios + Vue；注入、`useRequest`、`useTableCrud` / `createTableCrud` |
| `/naive` | Axios + Vue + Naive UI；`useNaiveTableCrud` 兼容适配 |
| 根入口 | 完整兼容聚合，当前仍引用 Naive UI |

## 快速开始

```bash
bun add @robot-admin/request-core axios@^1.7.0
```

Vue 能力另需 **Vue ^3.4**，Naive UI 适配另需 **Naive UI ^2.38**；两者均声明为可选 peer。

### 创建应用 Client

```ts
import { createRequestClient } from "@robot-admin/request-core/axios";

interface User { id: number; name: string }

const request = createRequestClient({
  request: { baseURL: "/api", timeout: 10_000 },
});

export function searchUsers(keyword: string) {
  return request.get<User[]>("/users", {
    params: { keyword },
    concurrency: "takeLatest",
    scope: "users-page",
  });
}
```

若后端返回 `{ code, data, message }`，通过 `response` 适配器定义成功判定、数据解包与错误消息。

### 给列表接入数据源

```ts
import { useTableCrud } from "@robot-admin/request-core/vue";

const table = useTableCrud({
  client: request,
  source: { list: "/users" },
  autoLoad: "mounted",
  createNewRow: () => ({ id: 0, name: "" }),
});
```

CRUD 不提供后端实现，也不要求使用特定表格；从 0.6.3 起可透传组件库列契约（含数字键与原生多列排序/筛选定义），业务行类型在 `render` 中保持原样。`createMemoryTableSource()` 可接入演示数据。

## 默认行为与边界

- 缓存 / 重试默认关闭，按 Client 或单次请求显式启用
- 安全读取请求共享结果（隐式去重）；POST 不自动重试
- 认证恢复在提供真实 token、refresh 和重新登录回调后生效
- Vue 作用域结束取消请求，忽略晚到结果
- `raw()` 返回完整 Axios 响应，其他方法返回适配后的数据；错误通过 `RequestError` 分类处理

## 相关链接

- [生态包总览](/robot/packages/preface) · [dictionary 字典管理](/robot/packages/dictionary)
- [github.com/ChenyCHENYU/robot-admin-packages](https://github.com/ChenyCHENYU/robot-admin-packages) · [npm](https://www.npmjs.com/package/@robot-admin/request-core)
