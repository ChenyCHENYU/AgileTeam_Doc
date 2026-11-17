---
outline: "deep"
description: "@robot-admin/dictionary 0.6.1：独立的字典与枚举插件。根入口无框架依赖，Vue 插件与 hooks 从 /vue 导入。一次接入，任意页面直接取字典。"
reviewAfter: "2027-05-16"
---

# dictionary 字典管理

> **一次接入，任意页面直接取字典。** 静态枚举 · 远程字典 · 独立插件 · 按需加载 · 作用域隔离

`@robot-admin/dictionary` 是独立的字典与枚举插件，当前版本 **0.6.1**。根入口无框架、组件库或请求库依赖，Vue 插件与 hooks 从 `/vue` 导入；项目自由绑定普通选项、状态和标签函数。

## 安装

```bash
bun add @robot-admin/dictionary
```

Vue 入口需要项目已有 **Vue ≥3.4**；无 Vue 的脚本直接使用根入口。

## 接入一次

在项目配置文件声明通用接口：

```ts
// src/config/dictionary.ts
import { getDictionaryOptionsApi } from "../api/dictionary";

export default { load: getDictionaryOptionsApi };
```

在现有 Vue 应用中安装：

```ts
import { createDictionaryPlugin } from "@robot-admin/dictionary/vue";
import dictionaryConfig from "./config/dictionary";

app.use(createDictionaryPlugin(dictionaryConfig));
```

接口签名为 `load(code, { signal, scope })`，返回 `{ value, label, disabled? }[]`。远程字典按后台码加载，无需逐项注册；仅用静态枚举时省略 `load`。

## 页面使用

**取选项或单值标签：**

```ts
import { useDictionary } from "@robot-admin/dictionary/vue";

const status = useDictionary("order_status");
// status.options / loading / error 是响应式值；status.label(value) 同步翻译。
```

**批量绑定详情字段：**

```ts
import { ref } from "vue";
import { useDictLabels } from "@robot-admin/dictionary/vue";

const order = ref({ status: 0 });
const { labels } = useDictLabels(order, { status: "order_status" });
// 模板中直接使用 {{ labels.status }}
```

| 场景 | 用法 |
| :---: | :--- |
| 下拉、搜索 | `status.options.value` 绑定控件选项属性，加载和重试用 `loading/error/reload` |
| 列表、提示 | 调用 `status.label(value)`，保留原始模型 |
| 详情、弹窗 | 普通字段映射配合 `labels.status`，按可见状态启用 |
| 静态枚举、脚本、导入 | 使用根入口或静态注册 |

## 默认行为

- 安装不请求，消费时按需加载；同码请求合并，按应用隔离缓存
- 成功缓存 5 分钟、失败冷却 5 秒、超时 15 秒，均可在配置文件覆盖
- 失败保留同身份旧标签，错误局部可见；未知值保留原码，翻译不修改模型
- 零、布尔值、字符串原码严格区分；身份切换隔离旧请求，插件管理卸载清理

## 相关链接

- [生态包总览](/robot/packages/preface) · [request-core 请求与 CRUD](/robot/packages/request-core)
- [github.com/ChenyCHENYU/robot-admin-packages](https://github.com/ChenyCHENYU/robot-admin-packages) · [npm](https://www.npmjs.com/package/@robot-admin/dictionary)
