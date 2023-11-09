---
outline: 'deep'
---

# C_Form

> 在 `ElementPlus` 提供的表单组件基础上，封装了关于表单的通用使用，同时把 `Upload` 组件融入其中，以满足业务表单数据驱动。

## Usage

`<C_Form :options="your options"/>`

### Props

| 属性        | 类型              | 默认值                 | 说明                                         |
| ----------- | ----------------- | ---------------------- | -------------------------------------------- |
| options     | `I_FormOptions[]` | -                      | 需要渲染的表单项                             |
| type        | `string`          | 下方 Interface type 项 | 要渲染的基础组件                             |
| value       | `any`             | -                      | 表单项的值                                   |
| label       | `string`          | -                      | 表单 label                                   |
| prop        | `string`          | -                      | 表单的标识                                   |
| rules       | `RuleItem[]`      | -                      | 表单项的验证规则                             |
| placeholder | `string`          | -                      | 表单项默认提示语                             |
| attrs       | `object`          | -                      | 表单元素原生特有属性                         |
| children    | `I_FormOptions[]` | -                      | 表单项的子元素                               |
| uploadAttrs | `object`          | 下方 uploadAttrs 项    | 处理上传组件的属性和方法                     |
| selectValue | `string[]`        | -                      | 选择性动态表单                               |
| for         | `string`          | -                      | 选择组件和动态添加的组件产生的唯一关联同字段 |
| show        | `boolean`         | false                  | 默认是否显示                                 |

### Interface

```ts
interface Props {
  options: I_FormOptions[]
  // 用户自定义上传方法
  httpRequest?: () => any
}
```

```ts
export interface I_FormOptions {
  // 表单显示的组件元素 根据实际情况 +++++
  type:
    | 'cascader'
    | 'checkbox'
    | 'checkbox-group'
    | 'checkbox-button'
    | 'color-picker'
    | 'date-picker'
    | 'input'
    | 'input-number'
    | 'radio'
    | 'radio-group'
    | 'radio-button'
    | 'rate'
    | 'select'
    | 'option'
    | 'slider'
    | 'switch'
    | 'time-picker'
    | 'time-select'
    | 'transfer'
    | 'upload'
    | 'editor'
  // 表单项的值
  value?: any
  label?: string
  prop?: string
  rules?: RuleItem[]
  placeholder?: string
  attrs?: {
    clearable?: boolean
    showPassword?: boolean
    disabled?: boolean
    prefixIcon?: string
    className?: string
    style?: CSSProperties
    activeText?: string
    inactiveText?: string
    inlinePrompt?: boolean
  }
  // 表单项的子元素
  children?: I_FormOptions[]
  // 处理上传组件的属性和方法
  uploadAttrs?: {
    action: string
    headers?: object
    method?: 'post' | 'put' | 'patch'
    multiple?: boolean
    data?: any
    name?: string
    withCredentials?: boolean
    showFileList?: boolean
    drag?: boolean
    accept?: string
    thumbnailMode?: boolean
    fileList?: UploadFile[]
    listType?: 'text' | 'picture' | 'picture-card'
    autoUpload?: boolean
    disabled?: boolean
    limit?: number
  }
  // TODO: 动态选择表单配置项
  selectValue?: string[]
  for?: string
  show?: boolean
}
```

```ts
export interface I_ValidateFieldCallback {
  (message?: string, invalidFields?: ValidateFieldsError): void
}

// TODO: ElementPlus 中对于 Form的类型约束
export interface I_FormInstance {
  registerLabelWidth(width: number, oldWidth: number): void
  deregisterLabelWidth(width: number): void
  autoLabelWidth: string | undefined
  emit: (evt: string, ...args: any[]) => void
  labelSuffix: string
  inline?: boolean
  model?: Record<string, unknown>
  size?: string
  showMessage?: boolean
  labelPosition?: string
  labelWidth?: string
  rules?: Record<string, unknown>
  statusIcon?: boolean
  hideRequiredAsterisk?: boolean
  disabled?: boolean
  validate: (callback?: Callback) => Promise<boolean>
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
  validateField: (props: string | string[], cb: ValidateFieldCallback) => void
}
```

### Events

注意，这里主要是内嵌的 `Upload` 组件暴露的方法。

| 事件名        | 说明                                                                                                     | 回调参数                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| on-preview    | 点击文件列表中已上传的文件时的钩子                                                                       | `(uploadFile: UploadFile) => void`                                                            |
| on-remove     | 文件列表移除文件时的钩子                                                                                 | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                                  |
| on-success    | 文件上传成功时的钩子                                                                                     | `(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                   |
| on-error      | 文件上传失败时的钩子                                                                                     | `(error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                    |
| on-progress   | 文件上传时的钩子                                                                                         | `(evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`        |
| on-change     | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用                                           | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                                  |
| before-upload | 上传文件之前的钩子，参数为上传的文件， 若返回 false 或者返回 Promise 且被 reject，则停止上传。           | `(rawFile: UploadRawFile) => Awaitable<void \| undefined \| null \| boolean \| File \| Blob>` |
| before-remove | 删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除。 | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>`                    |
| on-exceed     | 当超出限制时，执行的钩子函数                                                                             | `(files: File[], uploadFiles: UploadFiles) => void`                                           |

## Scene

下面是一个包含上传组件的完整的表单使用场景，包含简单的动态切换表单场景。

### 示栗

```vue
<template>
  <C_Form
    ref="formRef"
    :options="OPTIONS"
    label-width="100px"
    @on-preview="handlePreview"
    @on-remove="handleRemove"
    @before-remove="handleBeforRemove"
    @on-exceed="handleExceed"
    @on-success="handleSuccess"
  >
    <template #uploadClick>
      <ElButton>点击上传</ElButton>
    </template>
    <template #uploadTip>
      <div style="color: #ccc">jpg/png files with a size less than 500kb</div>
    </template>
    <template #action="scope">
      <ElButton type="primary" @click="submitForm(scope)">提交</ElButton>
      <ElButton @click="resetForm">重置</ElButton>
    </template>
  </C_Form>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { OPTIONS } from './data'
import './index.scss'

// 拿到当前组件的实例
const formRef = ref()

const handleExceed = (val: any) => {
  console.log('handleExceed')
  console.log('val ==》', val)
  ElMessage.warning(
    `The limit is 3, you selected ${
      val.files.length
    } files this time, add up to ${
      val.files.length + val.fileList.length
    } totally`
  )
}

const handleBeforRemove = (val: any) => {
  return ElMessageBox.confirm(`Cancel the transfert of ${val.name} ?`).then(
    () => true,
    () => false
  )
}

// TODO: 下面全是自有方法 非组件及外部方法
const submitForm = (formScope: any) => {
  formScope.form.validate((valid: boolean) => {
    if (valid) {
      console.log(formScope?.model)
      ElMessage.success('提交成功')
    } else {
      ElMessage.error('表单填写有误，请查看错误提示')
    }
  })
  console.log('slotScope ===>', formScope)
}
// 重置表单
const resetForm = () => formRef.value.resetFields()
</script>
```

其他更多交互形式以及使用场景可以参考 `ElementPlus` 表单组件和上传组件：[ElForm](http://element-plus.org/zh-CN/component/form.html) 、 [ElUpload](http://element-plus.org/zh-CN/component/upload.html) ，更多属性传递可通过原组件的 `attrs` 进行使用。
