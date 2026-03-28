---
outline: "deep"
---

# C_Form 表单

> 📋 轻量表单容器，提供统一的数据校验、错误提示和布局管理，通过 `provide/inject` 与表单项共享验证状态。

## ✨ 特性

- **✔️ 内置校验引擎**：支持 `required`、`pattern` 正则和自定义 `validator` 函数
- **🏷️ 标签对齐**：`left`（行内）和 `top`（顶部）两种标签位置
- **🔗 注入机制**：子表单项自动注入 context，无需层层传参
- **📤 暴露实例**：通过模板引用调用 `validate()` / `resetValidation()`

## 🎯 快速开始

```vue
<template>
  <C_Form ref="formRef" :model="form" :rules="rules" label-width="80px">
    <wd-form-item label="姓名" prop="name">
      <wd-input v-model="form.name" placeholder="请输入" />
    </wd-form-item>
    <wd-form-item label="手机号" prop="phone">
      <wd-input v-model="form.phone" placeholder="请输入" />
    </wd-form-item>

    <template #footer>
      <wd-button block @click="onSubmit">提交</wd-button>
    </template>
  </C_Form>
</template>

<script setup lang="ts">
const formRef = ref()

const form = reactive({ name: '', phone: '' })

const rules = {
  name:  [{ required: true, message: '请输入姓名' }],
  phone: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
  ],
}

async function onSubmit() {
  if (!formRef.value.validate()) return
  await submitApi(form)
}
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `model` | `object` | - (**必填**) | 表单数据对象 |
| `rules` | `object` | `{}` | 校验规则（key 对应 model 字段名） |
| `labelWidth` | `string` | `'80px'` | 标签宽度 |
| `labelPosition` | `'left' \| 'top'` | `'left'` | 标签位置 |
| `disabled` | `boolean` | `false` | 是否全部禁用 |
| `colon` | `boolean` | `false` | 标签后是否显示冒号 |

### 校验规则类型

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `required` | `boolean` | 是否必填 |
| `message` | `string` | 校验失败提示 |
| `pattern` | `RegExp` | 正则校验 |
| `validator` | `(value, model) => string \| void` | 自定义校验，返回字符串表示错误 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 表单内容（放置 wd-form-item 等） |
| `footer` | 表单底部操作区（提交按钮等） |

### 实例方法（模板引用）

| 方法名 | 返回值 | 说明 |
| --- | --- | --- |
| `validate()` | `boolean` | 校验所有字段，返回是否全部通过 |
| `resetValidation()` | - | 清空所有错误提示 |

## 🎨 使用示例

::: details 💡 多字段动态表单校验
```vue
<template>
  <C_Form ref="formRef" :model="form" :rules="rules">
    <wd-form-item label="问题描述" prop="desc">
      <wd-textarea v-model="form.desc" :maxlength="500" show-count />
    </wd-form-item>
    <wd-form-item label="优先级" prop="priority">
      <wd-select v-model="form.priority" :options="priorityOptions" />
    </wd-form-item>
    <wd-form-item label="截止日期" prop="deadline">
      <C_Calendar v-model="form.deadline" />
    </wd-form-item>
  </C_Form>
</template>
:::
