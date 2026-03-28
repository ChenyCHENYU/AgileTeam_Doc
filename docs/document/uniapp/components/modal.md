---
outline: "deep"
---

# C_Modal 弹框

> 💬 模态弹框组件，提供标题、内容和确认/取消按钮，支持插槽自定义内容，用于信息确认、表单弹框等场景。

## ✨ 特性

- **🎛️ 灵活按钮**：确认/取消可独立控制显示，支持自定义文案
- **🪟 插槽内容**：默认插槽替代纯文本 `content`，可放置任意 UI
- **❌ 右上角关闭**：`showClose` 控制关闭按钮
- **🖱️ 遮罩关闭**：`closeOnClickOverlay` 控制点击遮罩是否关闭
- **📐 宽度可调**：`width` 支持任意 CSS 宽度值

## 🎯 快速开始

```vue
<template>
  <!-- 确认对话框 -->
  <C_Modal
    v-model:visible="confirmVisible"
    title="删除确认"
    content="确认要删除这条工单吗？此操作不可撤销。"
    @confirm="doDelete"
    @cancel="confirmVisible = false"
  />

  <!-- 自定义内容弹框 -->
  <C_Modal
    v-model:visible="formVisible"
    title="填写备注"
    confirm-text="提交"
    @confirm="submitRemark"
  >
    <wd-input v-model="remark" type="textarea" :rows="4" />
  </C_Modal>
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | 是否显示（v-model:visible） |
| `title` | `string` | `'提示'` | 弹框标题 |
| `content` | `string` | `''` | 纯文本内容（插槽优先） |
| `showClose` | `boolean` | `false` | 是否显示右上角关闭按钮 |
| `showCancel` | `boolean` | `true` | 是否显示取消按钮 |
| `showConfirm` | `boolean` | `true` | 是否显示确认按钮 |
| `confirmText` | `string` | `'确定'` | 确认按钮文案 |
| `cancelText` | `string` | `'取消'` | 取消按钮文案 |
| `closeOnClickOverlay` | `boolean` | `false` | 点击遮罩是否关闭 |
| `width` | `string` | `'80%'` | 弹框宽度 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:visible` | `boolean` | v-model:visible 更新 |
| `confirm` | - | 点击确认按钮 |
| `cancel` | - | 点击取消按钮 |
| `close` | - | 弹框关闭（任意方式） |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 弹框内容区（替代 content prop） |

## 🎨 使用示例

::: details 💡 危险操作二次确认
```vue
<template>
  <C_Modal
    v-model:visible="deleteConfirm"
    title="⚠️ 删除确认"
    :content="`确定删除「${target.name}」吗？删除后不可恢复。`"
    confirm-text="立即删除"
    @confirm="confirmDelete"
    @cancel="deleteConfirm = false"
  />
</template>

<script setup lang="ts">
async function confirmDelete() {
  await deleteApi(target.value.id)
  deleteConfirm.value = false
  uni.showToast({ title: '删除成功', icon: 'success' })
  refresh()
}
</script>
:::

::: details 💡 图片预览弹框（仅确认按钮）
```vue
<template>
  <C_Modal
    v-model:visible="previewVisible"
    title="附件预览"
    :show-cancel="false"
    confirm-text="关闭"
    width="90%"
    @confirm="previewVisible = false"
  >
    <image class="w-full rounded" :src="previewUrl" mode="widthFix" />
  </C_Modal>
</template>
:::
