---
outline: "deep"
description: "@robot-admin/form-validate 3.4.4：框架无关的 RuleSpec 规则源，一份规则定义贯通 Naive UI、Element Plus 界面校验与纯数据批量提交，零运行时依赖。"
reviewAfter: "2027-05-16"
---

# form-validate 表单校验

> **一份规则定义，贯通界面校验与数据提交。** RuleSpec · Naive UI · Element Plus · 批量校验 · 零运行时依赖

`@robot-admin/form-validate` 以框架无关的 `RuleSpec` 为规则源，通过适配器输出 Naive UI 与 Element Plus 规则，也支持对纯数据执行校验，当前版本 **3.4.4**。无需安装 Vue 或 UI 框架即可使用规则核心，适用于表单实时反馈、导入数据检查、表格多行提交，以及 SQL 数值契约等场景。组件库 `@robot-admin/naive-ui-components`（0.40.5）的 C_Form / C_FormSearch / C_FormModal 均基于本包。

## 能力地图

| 领域 | 提供能力 |
| :---: | :--- |
| 基础与格式 | 必填、长度、数值、日期、邮箱、URL 与正则 |
| 业务规则 | 手机号、身份证、银行卡、车牌、统一社会信用代码 |
| 数值契约 | `numeric` 对齐整数及 SQL `DECIMAL(p,s)` 的精度、范围与边界 |
| 规则组合 | 条件、跨字段比较、OR / AND、自定义与防抖异步校验 |
| 数据提交 | `validateValue`、`validateRecord`、`validateRows` 返回首条失败 |
| 框架适配 | 同一套 `RuleSpec` 输出 Naive UI、Element Plus 或自定义规则 |

```text
RuleSpec 规则源 ─┬─ Naive UI 规则（PRESET_RULES / NAIVE_COMBOS）
                ├─ Element Plus 规则（ELEMENT_RULES / ELEMENT_COMBOS）
                └─ 纯数据 / 记录 / 多行校验（validateRecord / validateRows）
```

## 快速开始

```bash
bun add @robot-admin/form-validate
```

### 先校验一条数据

```ts
import { SPEC_RULES, validateRecord } from "@robot-admin/form-validate";

const rules = {
  name: [SPEC_RULES.required("姓名")],
  email: [SPEC_RULES.email("邮箱")],
};

const error = await validateRecord(
  { name: "Robot", email: "robot@example.com" },
  rules,
);
// 全部通过为 null；失败时返回 { field, message }
```

### 在表单中使用

```ts
import { NAIVE_COMBOS, PRESET_RULES, ELEMENT_COMBOS, ELEMENT_RULES } from "@robot-admin/form-validate";

const naiveRules = {
  name: NAIVE_COMBOS.username("用户名"),
  email: [PRESET_RULES.email("邮箱")],
};

const elementRules = {
  name: ELEMENT_COMBOS.username("用户名"),
  email: [ELEMENT_RULES.email("邮箱")],
};
```

业务规则只需维护一次；需要跨界面与批量提交复用时，直接维护 `RuleSpec` 并调用 `toNaiveRules` / `toElementRules`。

## API 速查

| 使用环境 | 推荐 API |
| :---: | :--- |
| 框架无关规则 | `SPEC_RULES`、`numeric`、`whenSpec`、`someSpec` / `everySpec` |
| Naive UI | `PRESET_RULES`、`NAIVE_COMBOS`（`RULE_COMBOS` 为兼容名称） |
| Element Plus | `ELEMENT_RULES`、`ELEMENT_COMBOS`、`whenElement` |
| 提交前校验 | `validateValue`、`validateRecord`、`validateRows` |
| 自定义适配 | `toNaiveRule(s)`、`toElementRule(s)`、`createSpec` / `createAsyncSpec` |

纯数据校验顺序执行，遇到首条失败即返回；UI 触发与展示仍由使用侧表单控制，服务端也应执行业务校验。

## 相关链接

- [生态包总览](/robot/packages/preface) · [组件文档 C_Form](/robot/components/form)
- [github.com/ChenyCHENYU/robot-admin-packages](https://github.com/ChenyCHENYU/robot-admin-packages) · [npm](https://www.npmjs.com/package/@robot-admin/form-validate)
