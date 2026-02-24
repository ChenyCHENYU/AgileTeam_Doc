---
outline: 'deep'
---

# C_Signature 电子签名组件

> ✍️ 基于原生 Canvas 的高性能电子签名组件，让签名更流畅、更专业

## 🚀 特性

- **✍️ 双输入模式**: 支持鼠标和触摸屏输入，完美适配移动端
- **🎨 双绘制模式**: 画笔模式和橡皮擦模式自由切换
- **↩️ 历史管理**: 撤销/重做功能，最多支持 50 步历史
- **📤 多格式导出**: PNG、JPEG、Blob、SVG 多种导出格式
- **🏷️ 水印支持**: 可添加时间戳或用户名水印，4 种位置可选
- **💾 数据持久化**: 支持保存和恢复完整笔画路径
- **👀 只读模式**: 展示历史签名，不可编辑
- **🎯 高 DPI 适配**: 自动适配 Retina 屏幕，签名更清晰
- **🌗 主题支持**: 自动适配明暗主题
- **💪 TypeScript**: 完整的类型定义和类型安全
- **⚡ 零依赖**: 纯原生 Canvas API 实现

## 📦 安装

::: code-group

```bash [bun (推荐)]
# 无需额外安装，纯原生 Canvas 实现
# 已内置在项目中
```

```bash [pnpm]
# 无需额外安装，纯原生 Canvas 实现
# 已内置在项目中
```

```bash [yarn]
# 无需额外安装，纯原生 Canvas 实现
# 已内置在项目中
```

```bash [npm]
# 无需额外安装，纯原生 Canvas 实现
# 已内置在项目中
```

:::

## 🎯 快速开始

### 基础使用

```vue {3,6,9}
<template>
  <!-- 最简单的签名板 -->
  <C_Signature />

  <!-- 自定义尺寸 -->
  <C_Signature :width="600" :height="300" />

  <!-- 自定义画笔配置 -->
  <C_Signature :pen-config="{ color: '#0000FF', width: 3 }" />
</template>

<script setup>
// 无需导入，已全局注册
</script>
```

::: details ✍️ 三种常见使用场景 - 快速上手
```vue {5-11,14-25,28-40}
<template>
  <div class="signature-demos">
    <!-- 1. 基础签名 -->
    <div class="demo-item">
      <h4>基础签名</h4>
      <C_Signature
        ref="basicRef"
        :height="200"
        @change="handleBasicChange"
      />
    </div>

    <!-- 2. 合同签名（带水印） -->
    <div class="demo-item">
      <h4>合同签名</h4>
      <C_Signature
        :height="200"
        :watermark="{
          show: true,
          text: watermarkText,
          position: 'bottom-right',
        }"
        @change="handleContractChange"
      />
    </div>

    <!-- 3. 只读展示 -->
    <div class="demo-item">
      <h4>历史签名展示</h4>
      <C_Signature
        ref="readonlyRef"
        :height="200"
        :readonly="true"
        :show-toolbar="false"
      />
      <n-button @click="loadHistorySignature">
        加载历史签名
      </n-button>
    </div>
  </div>
</template>

<script setup>
const basicRef = ref()
const readonlyRef = ref()

const watermarkText = computed(() => {
  const now = new Date()
  return `签署时间: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
})

const handleBasicChange = (data) => {
  console.log('签名变化:', data.length, '个笔画')
}

const handleContractChange = (data) => {
  console.log('合同签名变化:', data)
}

const loadHistorySignature = () => {
  // 加载历史签名数据
  const historyData = getHistorySignatureData()
  readonlyRef.value?.loadSignatureData(historyData)
}
</script>

<style scoped>
.signature-demos {
  display: grid;
  gap: 24px;
}

.demo-item {
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
}
</style>
```
:::

## 📖 API 文档

### Props

| 参数                | 类型                              | 默认值                  | 说明                   |
| ------------------- | --------------------------------- | ----------------------- | ---------------------- |
| **width**           | `number \| string`                | `'100%'`                | 画布宽度               |
| **height**          | `number \| string`                | `300`                   | 画布高度               |
| **penConfig**       | `Partial<PenConfig>`              | `见下方 PenConfig`      | 画笔配置               |
| **eraserConfig**    | `Partial<EraserConfig>`           | `{ size: 20 }`          | 橡皮擦配置             |
| **disabled**        | `boolean`                         | `false`                 | 是否禁用               |
| **readonly**        | `boolean`                         | `false`                 | 是否只读（不可编辑）   |
| **backgroundImage** | `string`                          | `-`                     | 背景图片 URL           |
| **backgroundColor** | `string`                          | `-`                     | 背景颜色               |
| **watermark**       | `Partial<WatermarkConfig>`        | `见下方 WatermarkConfig` | 水印配置               |
| **showToolbar**     | `boolean`                         | `true`                  | 是否显示工具栏         |
| **maxHistory**      | `number`                          | `50`                    | 最大撤销/重做步数      |

### 配置项类型

#### PenConfig - 画笔配置

```typescript
interface PenConfig {
  color: string    // 画笔颜色，默认 '#000000'
  width: number    // 画笔粗细（px），默认 2
  opacity: number  // 透明度 0-1，默认 1
}
```

#### EraserConfig - 橡皮擦配置

```typescript
interface EraserConfig {
  size: number  // 橡皮擦大小（px），默认 20
}
```

#### WatermarkConfig - 水印配置

```typescript
interface WatermarkConfig {
  show: boolean      // 是否显示水印，默认 false
  text: string       // 水印文本
  fontSize: number   // 字体大小，默认 12
  color: string      // 颜色，默认 '#999999'
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'  // 位置，默认 'bottom-right'
}
```

### Events

| 事件名         | 参数                                | 说明           |
| -------------- | ----------------------------------- | -------------- |
| **start-draw** | `-`                                 | 开始绘制时触发 |
| **drawing**    | `(point: SignaturePoint)`           | 绘制过程中触发 |
| **end-draw**   | `(stroke: SignatureStroke)`         | 结束绘制时触发 |
| **clear**      | `-`                                 | 清空画布时触发 |
| **undo**       | `-`                                 | 撤销时触发     |
| **redo**       | `-`                                 | 重做时触发     |
| **change**     | `(data: SignatureStroke[])`         | 签名数据变化   |

### 暴露方法

| 方法名                      | 参数                                           | 返回值                    | 说明                     |
| --------------------------- | ---------------------------------------------- | ------------------------- | ------------------------ |
| **clear**                   | `-`                                            | `void`                    | 清空画布                 |
| **undo**                    | `-`                                            | `boolean`                 | 撤销（返回是否成功）     |
| **redo**                    | `-`                                            | `boolean`                 | 重做（返回是否成功）     |
| **export**                  | `options?: ExportOptions`                      | `Promise<string \| Blob>` | 导出签名                 |
| **download**                | `filename?: string, options?: ExportOptions`   | `Promise<void>`           | 下载签名图片             |
| **loadImage**               | `imageUrl: string`                             | `Promise<void>`           | 加载签名图片             |
| **getSignatureData**        | `-`                                            | `SignatureStroke[]`       | 获取签名笔画数据（JSON） |
| **loadSignatureData**       | `data: SignatureStroke[]`                      | `void`                    | 加载签名数据             |
| **isEmpty**                 | `-`                                            | `boolean`                 | 判断是否为空             |

### 导出选项

#### ExportOptions - 导出配置

```typescript
interface ExportOptions {
  format?: 'png' | 'jpeg' | 'svg' | 'blob'  // 导出格式，默认 'png'
  quality?: number                           // 图片质量 0-1（仅 jpeg 有效），默认 0.92
  includeBackground?: boolean                // 是否包含背景，默认 false
  backgroundColor?: string                   // 背景颜色，默认 '#FFFFFF'
  includeWatermark?: boolean                 // 是否包含水印，默认 false
}
```

## 🎨 使用示例

::: details 📝 电子合同签署 - 带时间戳水印
```vue 
<template>
  <div class="contract-signing">
    <h3>电子合同签署</h3>
    
    <!-- 合同内容 -->
    <n-card title="服务协议" class="contract-content">
      <div class="contract-text">
        <p>本协议由以下双方于 {{ currentDate }} 签订：</p>
        <p><strong>甲方：</strong>某某公司</p>
        <p><strong>乙方：</strong>{{ userName }}</p>
        <p>...</p>
        <p>（此处省略合同内容）</p>
      </div>
    </n-card>

    <!-- 签名区域 -->
    <n-card title="乙方签名" class="signature-area">
      <C_Signature
        ref="contractSignatureRef"
        :height="250"
        :watermark="{
          show: true,
          text: watermarkText,
          fontSize: 12,
          color: '#999999',
          position: 'bottom-right',
        }"
        @change="handleSignatureChange"
      />
      
      <div class="action-buttons">
        <n-button
          type="primary"
          size="large"
          :disabled="!signed"
          :loading="submitting"
          @click="handleSubmitContract"
        >
          确认签署
        </n-button>
        <n-button @click="handleClear">重新签署</n-button>
      </div>
    </n-card>

    <!-- 签署结果 -->
    <n-modal
      v-model:show="showResult"
      title="签署成功"
      preset="card"
      style="width: 600px"
    >
      <n-result status="success" title="合同签署成功" description="您的签署信息已保存">
        <template #footer>
          <div class="signature-preview">
            <img :src="signatureImage" alt="签名" />
            <p class="signature-info">{{ watermarkText }}</p>
          </div>
        </template>
      </n-result>
      <template #footer>
        <n-button type="primary" @click="handleDownloadContract">
          下载合同
        </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
const contractSignatureRef = ref()
const signed = ref(false)
const submitting = ref(false)
const showResult = ref(false)
const signatureImage = ref('')

const userName = '张三'
const currentDate = new Date().toLocaleDateString('zh-CN')

const watermarkText = computed(() => {
  const now = new Date()
  return `签署时间: ${now.toLocaleDateString('zh-CN')} ${now.toLocaleTimeString('zh-CN')} | 签署人: ${userName}`
})

const handleSignatureChange = (data) => {
  signed.value = data.length > 0
}

const handleClear = () => {
  contractSignatureRef.value?.clear()
}

const handleSubmitContract = async () => {
  if (!contractSignatureRef.value || contractSignatureRef.value.isEmpty()) {
    $message.warning('请先签名')
    return
  }

  submitting.value = true
  
  try {
    // 导出签名（含水印）
    signatureImage.value = await contractSignatureRef.value.export({
      format: 'png',
      includeBackground: true,
      backgroundColor: '#FFFFFF',
      includeWatermark: true,
    })

    // 获取签名数据
    const signatureData = contractSignatureRef.value.getSignatureData()

    // 提交到服务器
    await api.submitContract({
      userId: currentUser.id,
      contractId: 'CONTRACT-2026-001',
      signatureImage: signatureImage.value,
      signatureData: JSON.stringify(signatureData),
      signedAt: new Date().toISOString(),
    })

    showResult.value = true
    $message.success('合同签署成功')
  } catch (error) {
    $message.error('签署失败，请重试')
    console.error(error)
  } finally {
    submitting.value = false
  }
}

const handleDownloadContract = async () => {
  await contractSignatureRef.value.download('电子合同-已签署', {
    format: 'png',
    includeBackground: true,
    backgroundColor: '#FFFFFF',
    includeWatermark: true,
  })
}
</script>

<style scoped>
.contract-signing {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}

.contract-content {
  margin-bottom: 24px;
}

.contract-text {
  line-height: 2;
}

.signature-area {
  margin-bottom: 24px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.signature-preview {
  text-align: center;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
}

.signature-preview img {
  max-width: 100%;
  max-height: 200px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
}

.signature-info {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
}
</style>
```
:::

::: details 🔄 工作流审批签名 - 多级审批流程
```vue 
<template>
  <div class="approval-flow">
    <h3>费用报销审批</h3>

    <!-- 报销信息 -->
    <n-card title="报销信息" class="expense-info">
      <n-descriptions :columns="2" bordered>
        <n-descriptions-item label="报销人">{{ expense.applicant }}</n-descriptions-item>
        <n-descriptions-item label="报销金额">¥{{ expense.amount }}</n-descriptions-item>
        <n-descriptions-item label="报销类型">{{ expense.type }}</n-descriptions-item>
        <n-descriptions-item label="申请时间">{{ expense.createdAt }}</n-descriptions-item>
        <n-descriptions-item label="报销事由" :span="2">
          {{ expense.reason }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <!-- 审批流程 -->
    <n-card title="审批流程" class="approval-steps">
      <n-steps :current="currentStep" vertical>
        <n-step
          v-for="(step, index) in approvalSteps"
          :key="step.id"
          :title="step.title"
          :description="step.description"
        >
          <template #icon>
            <Icon
              :icon="getStepIcon(step.status)"
              :style="{ color: getStepColor(step.status) }"
            />
          </template>
        </n-step>
      </n-steps>
    </n-card>

    <!-- 当前审批签名 -->
    <n-card
      v-if="canApprove"
      title="审批签名"
      class="current-approval"
    >
      <n-alert type="info" :show-icon="false" class="approval-tip">
        请在下方签名确认审批意见
      </n-alert>

      <n-form
        :model="approvalForm"
        label-placement="top"
        class="approval-form"
      >
        <n-form-item label="审批意见">
          <n-radio-group v-model:value="approvalForm.decision">
            <n-space>
              <n-radio value="approved">同意</n-radio>
              <n-radio value="rejected">拒绝</n-radio>
              <n-radio value="revise">退回修改</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="审批备注">
          <n-input
            v-model:value="approvalForm.comment"
            type="textarea"
            placeholder="请输入审批备注"
            :rows="3"
          />
        </n-form-item>

        <n-form-item label="审批签名">
          <C_Signature
            ref="approvalSignatureRef"
            :height="200"
            :watermark="{
              show: true,
              text: currentApproverWatermark,
              fontSize: 11,
              color: '#999999',
              position: 'bottom-right',
            }"
            @change="handleApprovalSignatureChange"
          />
        </n-form-item>
      </n-form>

      <div class="approval-actions">
        <n-button
          type="primary"
          size="large"
          :disabled="!approvalForm.hasSigned"
          :loading="submitting"
          @click="handleSubmitApproval"
        >
          提交审批
        </n-button>
        <n-button @click="handleClearSignature">重签</n-button>
      </div>
    </n-card>

    <!-- 历史审批记录 -->
    <n-card title="审批历史" class="approval-history">
      <n-timeline>
        <n-timeline-item
          v-for="record in approvalHistory"
          :key="record.id"
          :type="getRecordType(record.status)"
          :title="record.approverName"
          :content="record.comment"
          :time="record.approvedAt"
        >
          <template #icon>
            <Icon :icon="getRecordIcon(record.status)" />
          </template>
          
          <div v-if="record.signature" class="history-signature">
            <n-image
              :src="record.signature"
              width="150"
              :preview-disabled="false"
            />
          </div>
        </n-timeline-item>
      </n-timeline>
    </n-card>
  </div>
</template>

<script setup>
const approvalSignatureRef = ref()
const submitting = ref(false)
const currentStep = ref(1)

const expense = ref({
  id: 'EXP-2026-001',
  applicant: '张三',
  amount: 5200.00,
  type: '差旅费',
  reason: '参加技术交流会议，往返机票和住宿费用',
  createdAt: '2026-02-20 10:30:00',
})

const approvalForm = reactive({
  decision: 'approved',
  comment: '',
  hasSigned: false,
})

const approvalSteps = ref([
  {
    id: 1,
    title: '部门经理审批',
    description: '已通过 - 李四 (2026-02-21 14:20)',
    status: 'approved',
  },
  {
    id: 2,
    title: '财务审核',
    description: '待审批',
    status: 'pending',
  },
  {
    id: 3,
    title: '总经理审批',
    description: '待审批',
    status: 'waiting',
  },
])

const approvalHistory = ref([
  {
    id: 1,
    approverName: '李四 (部门经理)',
    status: 'approved',
    comment: '同意报销，费用合理',
    approvedAt: '2026-02-21 14:20:00',
    signature: '/path/to/signature1.png',
  },
])

const canApprove = computed(() => {
  // 判断当前用户是否可以审批
  return currentStep.value === 1 // 示例：当前是财务审核步骤
})

const currentApproverWatermark = computed(() => {
  const now = new Date()
  return `审批人: ${currentUser.name} | 审批时间: ${now.toLocaleString('zh-CN')}`
})

const getStepIcon = (status) => {
  const iconMap = {
    approved: 'mdi:check-circle',
    pending: 'mdi:clock-outline',
    waiting: 'mdi:dots-horizontal-circle-outline',
    rejected: 'mdi:close-circle',
  }
  return iconMap[status] || 'mdi:help-circle'
}

const getStepColor = (status) => {
  const colorMap = {
    approved: '#52c41a',
    pending: '#1890ff',
    waiting: '#d9d9d9',
    rejected: '#ff4d4f',
  }
  return colorMap[status] || '#d9d9d9'
}

const getRecordType = (status) => {
  const typeMap = {
    approved: 'success',
    rejected: 'error',
    revise: 'warning',
  }
  return typeMap[status] || 'default'
}

const getRecordIcon = (status) => {
  const iconMap = {
    approved: 'mdi:check',
    rejected: 'mdi:close',
    revise: 'mdi:arrow-u-left-top',
  }
  return iconMap[status] || 'mdi:help'
}

const handleApprovalSignatureChange = (data) => {
  approvalForm.hasSigned = data.length > 0
}

const handleClearSignature = () => {
  approvalSignatureRef.value?.clear()
}

const handleSubmitApproval = async () => {
  if (!approvalSignatureRef.value || approvalSignatureRef.value.isEmpty()) {
    $message.warning('请先签名')
    return
  }

  if (!approvalForm.decision) {
    $message.warning('请选择审批意见')
    return
  }

  submitting.value = true

  try {
    // 导出签名
    const signatureImage = await approvalSignatureRef.value.export({
      format: 'png',
      includeBackground: true,
      backgroundColor: '#FFFFFF',
      includeWatermark: true,
    })

    // 获取签名数据
    const signatureData = approvalSignatureRef.value.getSignatureData()

    // 提交审批
    await api.submitApproval({
      expenseId: expense.value.id,
      decision: approvalForm.decision,
      comment: approvalForm.comment,
      signatureImage,
      signatureData: JSON.stringify(signatureData),
      approvedAt: new Date().toISOString(),
    })

    $message.success('审批提交成功')
    
    // 更新审批历史
    approvalHistory.value.push({
      id: Date.now(),
      approverName: `${currentUser.name} (财务)`,
      status: approvalForm.decision,
      comment: approvalForm.comment,
      approvedAt: new Date().toLocaleString('zh-CN'),
      signature: signatureImage,
    })

    // 更新审批步骤
    currentStep.value++
    
  } catch (error) {
    $message.error('审批提交失败')
    console.error(error)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.approval-flow {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
}

.expense-info,
.approval-steps,
.current-approval,
.approval-history {
  margin-bottom: 24px;
}

.approval-tip {
  margin-bottom: 16px;
}

.approval-form {
  margin-top: 16px;
}

.approval-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.history-signature {
  margin-top: 8px;
}
</style>
```
:::

::: details 💳 银行业务签名 - 身份确认与签名对比
```vue 
<template>
  <div class="bank-signature">
    <h3>银行开户签名验证</h3>

    <!-- 业务信息 -->
    <n-card title="业务信息">
      <n-descriptions :columns="2" bordered>
        <n-descriptions-item label="客户姓名">{{ customer.name }}</n-descriptions-item>
        <n-descriptions-item label="证件号码">{{ customer.idCard }}</n-descriptions-item>
        <n-descriptions-item label="业务类型">{{ businessType }}</n-descriptions-item>
        <n-descriptions-item label="办理时间">{{ currentTime }}</n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-grid :x-gap="24" :cols="2">
      <!-- 预留签名 -->
      <n-gi>
        <n-card title="预留签名">
          <n-alert type="info" show-icon class="mb-4">
            请在以下区域签下您的姓名，此签名将作为您的预留签名
          </n-alert>
          
          <C_Signature
            ref="reservedSignatureRef"
            :height="250"
            :watermark="{
              show: true,
              text: `预留签名 | ${customer.name}`,
              position: 'bottom-right',
            }"
            @change="handleReservedSignatureChange"
          />
          
          <div class="signature-actions">
            <n-button
              type="primary"
              :disabled="!hasReservedSignature"
              @click="handleSaveReservedSignature"
            >
              保存预留签名
            </n-button>
            <n-button @click="reservedSignatureRef?.clear()">
              重新签署
            </n-button>
          </div>
        </n-card>
      </n-gi>

      <!-- 验证签名 -->
      <n-gi>
        <n-card title="验证签名">
          <n-alert type="warning" show-icon class="mb-4">
            请重新签署您的姓名，系统将与预留签名进行比对
          </n-alert>
          
          <C_Signature
            ref="verifySignatureRef"
            :height="250"
            :disabled="!savedReservedSignature"
            @change="handleVerifySignatureChange"
          />
          
          <div class="signature-actions">
            <n-button
              type="primary"
              :disabled="!hasVerifySignature"
              :loading="comparing"
              @click="handleCompareSignatures"
            >
              验证签名
            </n-button>
            <n-button @click="verifySignatureRef?.clear()">
              重新签署
            </n-button>
          </div>

          <!-- 比对结果 -->
          <n-alert
            v-if="comparisonResult"
            :type="comparisonResult.passed ? 'success' : 'error'"
            :title="comparisonResult.title"
            show-icon
            class="mt-4"
          >
            <template #icon>
              <Icon
                :icon="comparisonResult.passed ? 'mdi:check-circle' : 'mdi:alert-circle'"
              />
            </template>
            {{ comparisonResult.message }}
            <div class="similarity-score">
              相似度: {{ comparisonResult.similarity }}%
            </div>
          </n-alert>
        </n-card>
      </n-gi>
    </n-grid>

    <!-- 对比预览 -->
    <n-card v-if="showComparison" title="签名对比" class="mt-6">
      <n-grid :x-gap="24" :cols="2">
        <n-gi>
          <div class="comparison-item">
            <h4>预留签名</h4>
            <img
              :src="savedReservedSignature"
              alt="预留签名"
              class="comparison-image"
            />
          </div>
        </n-gi>
        <n-gi>
          <div class="comparison-item">
            <h4>验证签名</h4>
            <img
              :src="currentVerifySignature"
              alt="验证签名"
              class="comparison-image"
            />
          </div>
        </n-gi>
      </n-grid>
    </n-card>
  </div>
</template>

<script setup>
const reservedSignatureRef = ref()
const verifySignatureRef = ref()

const hasReservedSignature = ref(false)
const hasVerifySignature = ref(false)
const savedReservedSignature = ref('')
const currentVerifySignature = ref('')
const comparing = ref(false)
const comparisonResult = ref(null)
const showComparison = ref(false)

const customer = ref({
  name: '张三',
  idCard: '110101199001011234',
})

const businessType = '借记卡开户'
const currentTime = new Date().toLocaleString('zh-CN')

const handleReservedSignatureChange = (data) => {
  hasReservedSignature.value = data.length > 0
}

const handleVerifySignatureChange = (data) => {
  hasVerifySignature.value = data.length > 0
}

const handleSaveReservedSignature = async () => {
  if (!reservedSignatureRef.value || reservedSignatureRef.value.isEmpty()) {
    $message.warning('请先签名')
    return
  }

  try {
    // 导出预留签名
    savedReservedSignature.value = await reservedSignatureRef.value.export({
      format: 'png',
      includeBackground: true,
      backgroundColor: '#FFFFFF',
      includeWatermark: true,
    })

    // 获取签名数据
    const signatureData = reservedSignatureRef.value.getSignatureData()

    // 保存到服务器
    await api.saveReservedSignature({
      customerId: customer.value.id,
      signatureImage: savedReservedSignature.value,
      signatureData: JSON.stringify(signatureData),
    })

    $message.success('预留签名保存成功')
  } catch (error) {
    $message.error('保存失败')
    console.error(error)
  }
}

const handleCompareSignatures = async () => {
  if (!savedReservedSignature.value) {
    $message.warning('请先保存预留签名')
    return
  }

  if (!verifySignatureRef.value || verifySignatureRef.value.isEmpty()) {
    $message.warning('请先进行验证签名')
    return
  }

  comparing.value = true
  showComparison.value = true

  try {
    // 导出验证签名
    currentVerifySignature.value = await verifySignatureRef.value.export({
      format: 'png',
      includeBackground: true,
      backgroundColor: '#FFFFFF',
    })

    // 获取两个签名的数据
    const reservedData = await getReservedSignatureData()
    const verifyData = verifySignatureRef.value.getSignatureData()

    // 调用签名比对 API
    const result = await api.compareSignatures({
      reservedData: JSON.stringify(reservedData),
      verifyData: JSON.stringify(verifyData),
    })

    // 显示比对结果
    const similarity = result.similarity
    const passed = similarity >= 85 // 相似度阈值 85%

    comparisonResult.value = {
      passed,
      similarity,
      title: passed ? '签名验证通过' : '签名验证失败',
      message: passed
        ? '您的签名与预留签名匹配，可以继续办理业务'
        : '您的签名与预留签名不匹配，请重新签署或联系柜台工作人员',
    }

    if (passed) {
      $message.success('签名验证通过')
    } else {
      $message.error('签名验证失败')
    }
  } catch (error) {
    $message.error('验证失败')
    console.error(error)
  } finally {
    comparing.value = false
  }
}

const getReservedSignatureData = async () => {
  // 从服务器获取预留签名数据
  const result = await api.getReservedSignature(customer.value.id)
  return JSON.parse(result.signatureData)
}
</script>

<style scoped>
.bank-signature {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

.signature-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.similarity-score {
  margin-top: 8px;
  font-size: 16px;
  font-weight: bold;
}

.comparison-item {
  text-align: center;
}

.comparison-item h4 {
  margin-bottom: 12px;
}

.comparison-image {
  width: 100%;
  max-height: 250px;
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  background: #fafafa;
}

.mb-4 {
  margin-bottom: 16px;
}

.mt-4 {
  margin-top: 16px;
}

.mt-6 {
  margin-top: 24px;
}
</style>
```
:::

## 🛠️ 高级用法

::: details 🎨 自定义工具栏 - 扩展签名功能
```vue 
<template>
  <div class="custom-toolbar-demo">
    <!-- 隐藏默认工具栏，使用自定义工具栏 -->
    <C_Signature
      ref="signatureRef"
      :height="300"
      :show-toolbar="false"
      :pen-config="currentPenConfig"
    />

    <!-- 自定义工具栏 -->
    <div class="custom-toolbar">
      <n-button-group>
        <n-button
          :type="currentTool === 'pen' ? 'primary' : 'default'"
          @click="handleSelectTool('pen')"
        >
          <template #icon><Icon icon="mdi:pen" /></template>
          画笔
        </n-button>
        <n-button
          :type="currentTool === 'eraser' ? 'primary' : 'default'"
          @click="handleSelectTool('eraser')"
        >
          <template #icon><Icon icon="mdi:eraser" /></template>
          橡皮擦
        </n-button>
      </n-button-group>

      <n-divider vertical />

      <n-color-picker
        v-model:value="currentPenConfig.color"
        :swatches="colorSwatches"
        :show-alpha="false"
      />

      <n-slider
        v-model:value="currentPenConfig.width"
        :min="1"
        :max="20"
        :step="1"
        style="width: 150px"
      />

      <n-divider vertical />

      <n-button @click="handleUndo" :disabled="!canUndo">
        <template #icon><Icon icon="mdi:undo" /></template>
      </n-button>
      <n-button @click="handleRedo" :disabled="!canRedo">
        <template #icon><Icon icon="mdi:redo" /></template>
      </n-button>
      <n-button @click="handleClear">
        <template #icon><Icon icon="mdi:delete" /></template>
      </n-button>

      <n-divider vertical />

      <n-dropdown :options="exportOptions" @select="handleExport">
        <n-button>
          <template #icon><Icon icon="mdi:export" /></template>
          导出
        </n-button>
      </n-dropdown>
    </div>
  </div>
</template>

<script setup>
const signatureRef = ref()
const currentTool = ref('pen')
const canUndo = ref(false)
const canRedo = ref(false)

const currentPenConfig = reactive({
  color: '#000000',
  width: 2,
})

const colorSwatches = [
  '#000000',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
]

const exportOptions = [
  { label: '导出 PNG', key: 'png' },
  { label: '导出 JPEG', key: 'jpeg' },
  { label: '导出 SVG', key: 'svg' },
]

const handleSelectTool = (tool) => {
  currentTool.value = tool
  // 根据工具类型调整配置
}

const handleUndo = () => {
  const success = signatureRef.value?.undo()
  canUndo.value = success
}

const handleRedo = () => {
  const success = signatureRef.value?.redo()
  canRedo.value = success
}

const handleClear = () => {
  signatureRef.value?.clear()
}

const handleExport = async (key) => {
  const dataURL = await signatureRef.value.export({ format: key })
  console.log('导出结果:', dataURL)
}
</script>

<style scoped>
.custom-toolbar-demo {
  max-width: 800px;
  margin: 0 auto;
}

.custom-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-top: 16px;
  background: #f5f5f5;
  border-radius: 8px;
}
</style>
```
:::

::: details 📱 移动端优化 - 触摸友好的签名体验
```vue
<template>
  <div class="mobile-signature">
    <n-alert type="info" show-icon class="tip-alert">
      请使用手指在下方签名区域书写您的姓名
    </n-alert>

    <div class="signature-wrapper" @touchmove.prevent>
      <C_Signature
        ref="signatureRef"
        :width="'100%'"
        :height="isMobile ? 250 : 300"
        :pen-config="mobilePenConfig"
        :show-toolbar="!isMobile"
        @start-draw="handleStartDraw"
        @end-draw="handleEndDraw"
      />
    </div>

    <!-- 移动端底部操作栏 -->
    <div v-if="isMobile" class="mobile-actions">
      <n-button
        size="large"
        secondary
        @click="handleUndo"
      >
        <template #icon><Icon icon="mdi:undo" /></template>
        撤销
      </n-button>
      <n-button
        size="large"
        secondary
        @click="handleClear"
      >
        <template #icon><Icon icon="mdi:delete" /></template>
        清空
      </n-button>
      <n-button
        size="large"
        type="primary"
        :disabled="isEmpty"
        @click="handleConfirm"
      >
        <template #icon><Icon icon="mdi:check" /></template>
        确认
      </n-button>
    </div>
  </div>
</template>

<script setup>
const signatureRef = ref()
const isEmpty = ref(true)
const isMobile = ref(window.innerWidth < 768)

// 移动端使用更粗的画笔
const mobilePenConfig = {
  color: '#000000',
  width: isMobile.value ? 4 : 2,
  opacity: 1,
}

const handleStartDraw = () => {
  console.log('开始签名')
}

const handleEndDraw = (stroke) => {
  isEmpty.value = false
  console.log('签名笔画:', stroke)
}

const handleUndo = () => {
  signatureRef.value?.undo()
  isEmpty.value = signatureRef.value?.isEmpty() ?? true
}

const handleClear = () => {
  signatureRef.value?.clear()
  isEmpty.value = true
}

const handleConfirm = async () => {
  const dataURL = await signatureRef.value.export({
    format: 'png',
    includeBackground: false,
  })
  
  // 处理签名数据
  emit('confirm', dataURL)
}

// 监听屏幕尺寸变化
onMounted(() => {
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768
  })
})
</script>

<style scoped>
.mobile-signature {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.tip-alert {
  margin: 16px;
}

.signature-wrapper {
  flex: 1;
  padding: 16px;
  overflow: hidden;
  touch-action: none;
}

.mobile-actions {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid #e8e8e8;
  background: #fafafa;
}

@media (min-width: 768px) {
  .mobile-signature {
    height: auto;
  }
  
  .mobile-actions {
    display: none;
  }
}
</style>
```
:::

::: details 💾 批量签名处理 - 多文档连续签名
```vue
<template>
  <div class="batch-signature">
    <h3>批量文档签名</h3>

    <!-- 文档列表 -->
    <n-card title="待签署文档">
      <n-list bordered>
        <n-list-item
          v-for="(doc, index) in documents"
          :key="doc.id"
        >
          <template #prefix>
            <n-tag
              :type="getDocStatusType(doc.status)"
              size="small"
            >
              {{ getDocStatusText(doc.status) }}
            </n-tag>
          </template>
          
          <n-thing :title="doc.title" :description="doc.description" />
          
          <template #suffix>
            <n-button
              v-if="doc.status === 'pending'"
              type="primary"
              size="small"
              @click="handleSignDocument(doc, index)"
            >
              签署
            </n-button>
            <Icon
              v-else-if="doc.status === 'signed'"
              icon="mdi:check-circle"
              style="color: #52c41a; font-size: 24px"
            />
          </template>
        </n-list-item>
      </n-list>

      <div class="batch-progress">
        <n-progress
          type="line"
          :percentage="signedPercentage"
          :status="allSigned ? 'success' : 'default'"
        />
        <p class="progress-text">
          已签署 {{ signedCount }} / {{ documents.length }} 份文档
        </p>
      </div>
    </n-card>

    <!-- 签名模态框 -->
    <n-modal
      v-model:show="showSignModal"
      :title="`签署文档: ${currentDocument?.title}`"
      preset="card"
      style="width: 700px"
    >
      <div class="document-content">
        <p>{{ currentDocument?.content }}</p>
      </div>

      <n-divider />

      <C_Signature
        ref="batchSignatureRef"
        :height="200"
        :watermark="{
          show: true,
          text: watermarkText,
          position: 'bottom-right',
        }"
      />

      <template #footer>
        <n-space justify="end">
          <n-button @click="showSignModal = false">取消</n-button>
          <n-button
            type="primary"
            :loading="signing"
            @click="handleConfirmSign"
          >
            确认签署
          </n-button>
          <n-button
            v-if="hasNextDocument"
            type="primary"
            :loading="signing"
            @click="handleSignAndNext"
          >
            签署并下一份
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
const batchSignatureRef = ref()
const showSignModal = ref(false)
const signing = ref(false)
const currentDocument = ref(null)
const currentIndex = ref(-1)

const documents = ref([
  {
    id: 1,
    title: '员工保密协议',
    description: '关于公司商业机密保护的协议',
    content: '本协议内容...',
    status: 'pending',
  },
  {
    id: 2,
    title: '劳动合同',
    description: '三年期固定期限劳动合同',
    content: '本合同内容...',
    status: 'pending',
  },
  {
    id: 3,
    title: '培训协议',
    description: '技术培训服务期协议',
    content: '本协议内容...',
    status: 'pending',
  },
])

const signedCount = computed(() => {
  return documents.value.filter(d => d.status === 'signed').length
})

const signedPercentage = computed(() => {
  return Math.round((signedCount.value / documents.value.length) * 100)
})

const allSigned = computed(() => {
  return signedCount.value === documents.value.length
})

const hasNextDocument = computed(() => {
  return currentIndex.value < documents.value.length - 1
})

const watermarkText = computed(() => {
  return `签署人: ${currentUser.name} | ${new Date().toLocaleString('zh-CN')}`
})

const getDocStatusType = (status) => {
  return status === 'signed' ? 'success' : 'default'
}

const getDocStatusText = (status) => {
  return status === 'signed' ? '已签署' : '待签署'
}

const handleSignDocument = (doc, index) => {
  currentDocument.value = doc
  currentIndex.value = index
  showSignModal.value = true
  
  // 清空之前的签名
  setTimeout(() => {
    batchSignatureRef.value?.clear()
  }, 100)
}

const handleConfirmSign = async () => {
  if (!batchSignatureRef.value || batchSignatureRef.value.isEmpty()) {
    $message.warning('请先签名')
    return
  }

  signing.value = true

  try {
    // 导出签名
    const signatureImage = await batchSignatureRef.value.export({
      format: 'png',
      includeBackground: true,
      includeWatermark: true,
    })

    // 保存签名
    await api.signDocument({
      documentId: currentDocument.value.id,
      signatureImage,
      signedAt: new Date().toISOString(),
    })

    // 更新状态
    documents.value[currentIndex.value].status = 'signed'

    $message.success('签署成功')
    showSignModal.value = false

  } catch (error) {
    $message.error('签署失败')
    console.error(error)
  } finally {
    signing.value = false
  }
}

const handleSignAndNext = async () => {
  await handleConfirmSign()
  
  // 如果签署成功且有下一份文档
  if (hasNextDocument.value) {
    const nextIndex = currentIndex.value + 1
    const nextDoc = documents.value[nextIndex]
    
    setTimeout(() => {
      handleSignDocument(nextDoc, nextIndex)
    }, 300)
  }
}
</script>

<style scoped>
.batch-signature {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}

.batch-progress {
  margin-top: 24px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
}

.progress-text {
  margin-top: 8px;
  text-align: center;
  font-weight: 500;
  color: #666;
}

.document-content {
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
}
</style>
```
:::

## ⚠️ 注意事项

### 1. 触摸事件冲突

::: code-group

```vue [✅ 推荐]
<!-- 正确：阻止页面滚动 -->
<div class="signature-container" @touchmove.prevent>
  <C_Signature />
</div>

<style>
.signature-container {
  touch-action: none;
  overflow: hidden;
}
</style>
```

```vue [❌ 不推荐]
<!-- 错误：未阻止默认行为 -->
<div class="signature-container">
  <C_Signature />
</div>
<!-- 签名时可能触发页面滚动 -->
```

:::

### 2. 导出格式选择

::: code-group

```vue [✅ 推荐]
<!-- PNG 透明背景（推荐）-->
<script setup>
const exportSignature = async () => {
  return await signatureRef.value.export({
    format: 'png',
    includeBackground: false, // 透明背景
  })
}
</script>
```

```vue [❌ 不推荐]
<!-- JPEG 不支持透明背景 -->
<script setup>
const exportSignature = async () => {
  return await signatureRef.value.export({
    format: 'jpeg',
    includeBackground: false, // ❌ JPEG 不支持透明
  })
}
</script>
```

:::

### 3. 只读模式使用

::: code-group

```vue [✅ 推荐]
<!-- 只读模式隐藏工具栏 -->
<C_Signature
  :readonly="true"
  :show-toolbar="false"
/>
```

```vue [❌ 不推荐]
<!-- 只读但显示工具栏（误导用户）-->
<C_Signature
  :readonly="true"
  :show-toolbar="true"
/>
```

:::

## 🐛 故障排除

### 常见问题

::: details ❓ Q1: 移动端签名不流畅或有延迟？
**A1:** 检查以下几点：

1. 确保没有其他触摸事件监听器干扰
2. 添加 `touch-action: none` 样式
3. 阻止 touchmove 的默认行为

```vue
<div class="signature-wrapper" @touchmove.prevent>
  <C_Signature />
</div>

<style>
.signature-wrapper {
  touch-action: none;
  -webkit-overflow-scrolling: touch;
}
</style>
```
:::

::: details ❓ Q2: 导出的图片模糊？
**A2:** 组件已自动适配高 DPI 屏幕，如果仍然模糊：

```vue
<!-- 确保导出时没有进行 CSS 缩放 -->
<script setup>
const exportHighQuality = async () => {
  const dataURL = await signatureRef.value.export({
    format: 'png',
    quality: 1, // 最高质量
    includeBackground: true,
    backgroundColor: '#FFFFFF',
  })
  
  // 不要对导出的图片进行 CSS transform: scale()
  return dataURL
}
</script>
```
:::

::: details ❓ Q3: 水印不显示？
**A3:** 检查水印配置：

::: code-group

```vue [✅ 正确]
<C_Signature
  :watermark="{
    show: true,  // ✅ 必须设置
    text: '签署时间: 2026-02-25',  // ✅ 必须有文本
  }"
/>

<!-- 导出时包含水印 -->
<script setup>
const exportWithWatermark = async () => {
  return await signatureRef.value.export({
    includeWatermark: true,  // ✅ 必须设置
  })
}
</script>
```

```vue [❌ 错误]
<C_Signature
  :watermark="{
    show: true,
    text: '',  // ❌ 空文本不显示
  }"
/>

<!-- 导出时忘记设置  -->
<script setup>
const exportWithWatermark = async () => {
  return await signatureRef.value.export({
    // ❌ 缺少 includeWatermark: true
  })
}
</script>
```

:::

::: details ❓ Q4: 橡皮擦擦不干净？
**A4:** 调整橡皮擦大小：

```vue
<C_Signature
  :eraser-config="{
    size: 30  <!-- 增大橡皮擦尺寸 -->
  }"
/>
```

或者直接使用清空功能：
```vue
<n-button @click="signatureRef?.clear()">清空全部</n-button>
```
:::

::: details ❓ Q5: 如何实现签名对比验证？
**A5:** 使用笔画数据进行比对：

```vue
<script setup>
// 1. 保存预留签名
const saveReservedSignature = () => {
  const data = signatureRef.value.getSignatureData()
  localStorage.setItem('reserved-signature', JSON.stringify(data))
}

// 2. 验证新签名
const verifySignature = () => {
  const reservedData = JSON.parse(localStorage.getItem('reserved-signature'))
  const currentData = signatureRef.value.getSignatureData()
  
  // 方法1: 简单对比笔画数量
  if (Math.abs(reservedData.length - currentData.length) > 2) {
    return { passed: false, message: '笔画数量差异过大' }
  }
  
  // 方法2: 使用图像相似度算法（推荐）
  const similarity = calculateSimilarity(reservedData, currentData)
  return {
    passed: similarity >= 0.85,
    similarity,
    message: `相似度: ${(similarity * 100).toFixed(2)}%`,
  }
}

// 图像相似度计算（示例）
const calculateSimilarity = (data1, data2) => {
  // 实现签名数据的相似度算法
  // 可以基于笔画路径、点坐标、速度等特征
  return 0.90 // 示例返回值
}
</script>
```
:::

## 🎯 最佳实践

### 1. 根据场景选择配置

```vue
<script setup>
// ✅ 合同签署：需要水印和高质量导出
const contractConfig = {
  height: 250,
  watermark: {
    show: true,
    text: `${userName} | ${timestamp}`,
    position: 'bottom-right',
  },
  exportOptions: {
    format: 'png',
    includeBackground: true,
    backgroundColor: '#FFFFFF',
    includeWatermark: true,
    quality: 1,
  },
}

// ✅ 审批流程：需要保存笔画数据
const approvalConfig = {
  height: 200,
  showToolbar: true,
  onSave: (data) => {
    // 保存完整笔画数据到数据库
    api.saveApprovalSignature({
      signatureData: JSON.stringify(data),
      signedAt: new Date().toISOString(),
    })
  },
}

// ✅ 移动端签到：使用更粗画笔
const mobileConfig = {
  penConfig: {
    width: 4,  // 移动端使用更粗的画笔
    color: '#000000',
  },
  showToolbar: false,  // 移动端隐藏工具栏，使用自定义按钮
}
</script>
```

### 2. 性能优化

```vue
<script setup>
// ✅ 使用防抖优化保存操作
import { useDebounceFn } from '@vueuse/core'

const debouncedSave = useDebounceFn((data) => {
  localStorage.setItem('signature-draft', JSON.stringify(data))
}, 500)

const handleSignatureChange = (data) => {
  debouncedSave(data)
}

// ✅ 批量签名时复用签名数据
const batchSign = async (documents) => {
  // 获取一次签名数据
  const signatureImage = await signatureRef.value.export()
  const signatureData = signatureRef.value.getSignatureData()
  
  // 批量提交
  await Promise.all(
    documents.map(doc => 
      api.signDocument({
        documentId: doc.id,
        signatureImage,
        signatureData: JSON.stringify(signatureData),
      })
    )
  )
}
</script>
```

### 3. 错误处理

```vue
<script setup>
const handleExportWithRetry = async (maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await signatureRef.value.export({
        format: 'png',
        includeBackground: true,
      })
      
      // 验证结果
      if (!result || result.length < 100) {
        throw new Error('导出结果无效')
      }
      
      return result
    } catch (error) {
      console.error(`导出失败 (第 ${i + 1} 次):`, error)
      
      if (i === maxRetries - 1) {
        $message.error('导出失败，请重试')
        throw error
      }
      
      // 等待后重试
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}
</script>
```

### 4. 数据安全

```vue
<script setup>
// ✅ 签名数据加密存储
import CryptoJS from 'crypto-js'

const saveSecureSignature = async () => {
  const data = signatureRef.value.getSignatureData()
  
  // 加密签名数据
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    'your-secret-key'
  ).toString()
  
  // 保存到服务器
  await api.saveSignature({
    userId: currentUser.id,
    encryptedData: encrypted,
    timestamp: Date.now(),
  })
}

// ✅ 加载时解密
const loadSecureSignature = async () => {
  const result = await api.getSignature(currentUser.id)
  
  // 解密
  const decrypted = CryptoJS.AES.decrypt(
    result.encryptedData,
    'your-secret-key'
  ).toString(CryptoJS.enc.Utf8)
  
  const data = JSON.parse(decrypted)
  signatureRef.value.loadSignatureData(data)
}
</script>
```

## 📝 更新日志

### v1.0.0 (2026-02-25)

- ✨ 支持鼠标和触摸屏双输入模式
- ✨ 画笔和橡皮擦模式切换
- ✨ 撤销/重做功能（最多 50 步）
- ✨ 多种格式导出（PNG/JPEG/Blob/SVG）
- ✨ 水印功能（4 种位置可选）
- ✨ 签名数据持久化
- ✨ 只读模式支持
- ✨ 高 DPI 屏幕自动适配
- ✨ 完整的 TypeScript 类型定义
- ✨ 暗黑模式支持

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个组件专门为电子签名场景设计，适用于合同签署、审批流程、身份确认等业务。零依赖、高性能、易集成。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更好的开发体验！ 🚀
