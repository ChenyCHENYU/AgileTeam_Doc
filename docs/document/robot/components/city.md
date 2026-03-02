---
outline: 'deep'
---

# C_City 城市选择器组件

> 🏙️ 基于 Naive UI 的智能城市选择器，让城市选择变得简单而优雅

## 🚀 在线演示

<DemoIframe src="/preview/city" title="城市选择器" height="700" />


## ✨ 特性

- **🎯 双重选择模式**: 按城市分组、按省份分组两种显示方式
- **🔍 智能搜索功能**: 支持拼音/汉字模糊搜索，快速定位城市
- **🔤 字母导航栏**: 26字母快速跳转，提升选择效率
- **🎨 自定义触发器**: 支持插槽自定义触发器样式
- **📱 响应式设计**: 自适应布局，完美支持移动端
- **💪 TypeScript**: 完整的类型定义和类型安全
- **🌏 数据完整**: 覆盖全国省市数据，支持港澳台
- **⚡ 高性能**: 虚拟滚动优化，大数据量依然流畅
- **✅ 智能验证**: 集成自定义验证规则，确保数据准确性

## 📦 安装

::: code-group

```bash [bun (推荐)]
# 基于 Naive UI，确保已安装依赖
bun install naive-ui
```

```bash [pnpm]
# 基于 Naive UI，确保已安装依赖
pnpm install naive-ui
```

```bash [yarn]
# 基于 Naive UI，确保已安装依赖
yarn add naive-ui
```

```bash [npm]
# 基于 Naive UI，确保已安装依赖
npm install naive-ui
```

:::

## 🎯 快速开始

### 基础用法

```vue {3-6,9-13}
<template>
  <!-- 最简单的城市选择 -->
  <C_City
    v-model="selectedCity"
    @change="handleCityChange"
  />

  <!-- 自定义占位符 -->
  <C_City
    v-model="selectedCity"
    placeholder="请选择您的城市"
    @change="handleCityChange"
  />
</template>

<script setup>
const selectedCity = ref('')

const handleCityChange = (city) => {
  console.log('选中的城市:', city)
}
</script>
```

::: details 🎨 多种触发器样式 - 输入框、按钮、标签等自定义样式
```vue
<template>
  <div class="city-selector-demos">
    <!-- 输入框样式触发器 -->
    <C_City
      v-model="inputStyleCity"
      @change="handleCityChange"
    >
      <template #trigger="{ value, visible }">
        <n-input
          :value="value"
          placeholder="请选择城市"
          readonly
          :class="{ 'input-focused': visible }"
        >
          <template #suffix>
            <n-icon :class="{ 'rotate-180': visible }">
              <ChevronDownOutlined />
            </n-icon>
          </template>
        </n-input>
      </template>
    </C_City>

    <!-- 按钮样式触发器 -->
    <C_City v-model="buttonStyleCity">
      <template #trigger="{ value, visible }">
        <n-button :type="visible ? 'primary' : 'default'">
          <template #icon><n-icon><LocationOutlined /></n-icon></template>
          {{ value || '选择城市' }}
        </n-button>
      </template>
    </C_City>

    <!-- 标签样式触发器 -->
    <C_City v-model="tagStyleCity">
      <template #trigger="{ value }">
        <n-tag :type="value ? 'primary' : 'default'" :bordered="false">
          <n-icon><EnvironmentOutlined /></n-icon>
          {{ value || '选择城市' }}
        </n-tag>
      </template>
    </C_City>
  </div>
</template>

<script setup>
import { LocationOutlined, ChevronDownOutlined, EnvironmentOutlined } from '@vicons/antd'

const inputStyleCity = ref('')
const buttonStyleCity = ref('')
const tagStyleCity = ref('')

const handleCityChange = (city) => {
  console.log('选中的城市:', city)
  message.success(`已选择：${city}`)
}
</script>

<style scoped>
.city-selector-demos {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-focused {
  border-color: var(--n-primary-color);
}

.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
</style>
```
:::

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| **modelValue** | `string` | `''` | 当前选中的城市名称（双向绑定） |
| **placeholder** | `string` | `'请选择城市'` | 占位符文本 |
| **showLetters** | `boolean` | `true` | 是否显示字母导航栏 |
| **disabled** | `boolean` | `false` | 是否禁用选择器 |
| **clearable** | `boolean` | `true` | 是否可清空 |
| **filterable** | `boolean` | `true` | 是否可搜索 |
| **size** | `'small' \| 'medium' \| 'large'` | `'medium'` | 组件尺寸 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| **update:modelValue** | `(value: string)` | 城市选择变化时触发 |
| **change** | `(value: string)` | 城市选择变化时触发 |
| **clear** | `-` | 清空城市时触发 |
| **blur** | `(event: FocusEvent)` | 失去焦点时触发 |
| **focus** | `(event: FocusEvent)` | 获得焦点时触发 |

### Slots

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| **trigger** | `{ value: string, visible: boolean }` | 自定义触发器 |
| **empty** | `-` | 无数据时的内容 |

### 暴露方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| **focus** | `-` | `void` | 聚焦组件 |
| **blur** | `-` | `void` | 失焦组件 |
| **clear** | `-` | `void` | 清空选中值 |
| **validate** | `-` | `Promise<boolean>` | 验证选中值 |

##  类型定义
#### 城市数据项接口

```typescript
interface CityItem {
  id: number
  spell: string  // 拼音
  name: string   // 城市名称
}
```

#### 省份数据项接口

```typescript
interface ProvinceItem {
  id?: string
  name: string    // 省份名称
  data: string[]  // 城市列表
}
```

#### 组件 Props 接口

```typescript
interface CityProps {
  modelValue?: string
  placeholder?: string
  showLetters?: boolean
  disabled?: boolean
  clearable?: boolean
  filterable?: boolean
  size?: 'small' | 'medium' | 'large'
}
```

#### 组件 Emits 接口

```typescript
interface CityEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'clear'): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}
```

## 🎨 使用示例

::: details 📝 用户注册表单 - 城市选择与表单验证集成
```vue
<template>
  <div class="user-registration">
    <n-card title="用户注册" class="registration-card">
      <n-form
        :model="userForm"
        :rules="userRules"
        ref="formRef"
        label-placement="left"
        label-width="100px"
      >
        <n-form-item label="用户名" path="username">
          <n-input
            v-model:value="userForm.username"
            placeholder="请输入用户名"
            clearable
          />
        </n-form-item>

        <n-form-item label="手机号" path="phone">
          <n-input
            v-model:value="userForm.phone"
            placeholder="请输入手机号"
            clearable
            :maxlength="11"
          />
        </n-form-item>

        <n-form-item label="所在城市" path="city">
          <C_City
            v-model="userForm.city"
            placeholder="请选择您的城市"
            @change="handleCityChange"
          />
        </n-form-item>

        <n-form-item label="详细地址" path="address">
          <n-input
            v-model:value="userForm.address"
            type="textarea"
            placeholder="请输入详细地址"
            :rows="3"
          />
        </n-form-item>

        <n-form-item>
          <n-space>
            <n-button
              type="primary"
              @click="handleRegister"
              :loading="registering"
            >
              注册
            </n-button>
            <n-button @click="handleReset">重置</n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>

<script setup>
import { PRESET_RULES, RULE_COMBOS } from '@/utils/v_verify'

const message = useMessage()
const formRef = ref()
const registering = ref(false)

const userForm = ref({
  username: '',
  phone: '',
  city: '',
  address: '',
})

// 使用自定义验证规则
const userRules = {
  username: RULE_COMBOS.username('用户名'),
  phone: PRESET_RULES.mobile('手机号'),
  city: {
    required: true,
    message: '请选择所在城市',
    trigger: ['change', 'blur'],
  },
  address: [
    PRESET_RULES.required('详细地址'),
    PRESET_RULES.length('详细地址', 5, 200),
  ],
}

/**
 * 处理城市选择变化
 */
const handleCityChange = (city) => {
  console.log('选择的城市:', city)
  
  // 根据城市获取相关信息
  fetchCityRelatedInfo(city)
  
  // 清空地址（城市变更后需要重新填写）
  if (userForm.value.address) {
    userForm.value.address = ''
    message.info('城市已变更，请重新填写详细地址')
  }
}

/**
 * 处理用户注册
 */
const handleRegister = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      registering.value = true
      
      try {
        // 模拟注册请求
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        registering.value = false
        message.success('注册成功！')
      } catch (error) {
        registering.value = false
        message.error(error.message || '注册失败，请重试')
      }
    }
  })
}

/**
 * 重置表单
 */
const handleReset = () => {
  userForm.value = {
    username: '',
    phone: '',
    city: '',
    address: '',
  }
  formRef.value?.restoreValidation()
}

/**
 * 根据城市获取相关信息
 */
const fetchCityRelatedInfo = async (city) => {
  try {
    // 模拟获取城市相关信息
    console.log(`获取 ${city} 的相关信息`)
  } catch (error) {
    console.error('获取城市信息失败:', error)
  }
}
</script>

<style scoped>
.user-registration {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
}

.registration-card {
  margin-bottom: 24px;
}
</style>
```
:::

::: details 🎬 演示页面 - 多种触发器样式和功能展示
```vue 
<template>
  <div class="city-demo">
    <NH1 class="main-title">城市选择器组件场景示例</NH1>
    
    <!-- 基础用法 -->
    <div class="demo-section">
      <h3>基础用法（默认触发器）</h3>
      <C_City
        v-model="basicCity"
        @change="handleBasicCityChange"
        @clear="handleCityClear"
      />
      <div class="demo-result" v-if="basicCity">
        <n-tag type="info">当前选择：{{ basicCity }}</n-tag>
      </div>
    </div>

    <!-- 自定义触发器 -->
    <div class="demo-section">
      <h3>自定义触发器（多种样式）</h3>
      <n-space vertical>
        <!-- 卡片样式 -->
        <C_City
          v-model="cardCity"
          @change="handleCityChange"
        >
          <template #trigger="{ value }">
            <n-card
              class="city-card-trigger"
              hoverable
              content-style="padding: 12px;"
            >
              <div class="city-info">
                <n-icon size="24" color="#1890ff">
                  <BuildingOutlined />
                </n-icon>
                <div class="city-text">
                  <div class="city-label">办公城市</div>
                  <div class="city-value">{{ value || '请选择城市' }}</div>
                </div>
              </div>
            </n-card>
          </template>
        </C_City>

        <!-- 带图标的输入框 -->
        <C_City v-model="iconInputCity">
          <template #trigger="{ value, visible }">
            <n-input-group>
              <n-input-group-label>
                <n-icon><EnvironmentOutlined /></n-icon>
              </n-input-group-label>
              <n-input
                :value="value"
                placeholder="选择城市"
                readonly
                style="width: 200px;"
              />
              <n-button>
                <n-icon :class="{ 'rotate-180': visible }">
                  <ChevronDownOutlined />
                </n-icon>
              </n-button>
            </n-input-group>
          </template>
        </C_City>
      </n-space>
    </div>

    <!-- 禁用和尺寸 -->
    <div class="demo-section">
      <h3>禁用状态和不同尺寸</h3>
      <n-space vertical>
        <n-space>
          <C_City
            v-model="disabledCity"
            disabled
            placeholder="禁用状态"
          />
          <n-button @click="toggleDisabled">
            {{ isDisabled ? '启用' : '禁用' }}
          </n-button>
        </n-space>
        
        <n-space align="center">
          <span>小尺寸：</span>
          <C_City v-model="smallCity" size="small" />
        </n-space>
        
        <n-space align="center">
          <span>中尺寸：</span>
          <C_City v-model="mediumCity" size="medium" />
        </n-space>
        
        <n-space align="center">
          <span>大尺寸：</span>
          <C_City v-model="largeCity" size="large" />
        </n-space>
      </n-space>
    </div>

    <!-- 表单验证集成 -->
    <div class="demo-section">
      <h3>表单验证集成</h3>
      <n-form
        :model="validationForm"
        :rules="validationRules"
        ref="validationFormRef"
        label-placement="left"
        label-width="120px"
      >
        <n-form-item label="出发城市" path="departureCity">
          <C_City
            v-model="validationForm.departureCity"
            placeholder="请选择出发城市"
            @change="handleDepartureCityChange"
          />
        </n-form-item>
        
        <n-form-item label="到达城市" path="arrivalCity">
          <C_City
            v-model="validationForm.arrivalCity"
            placeholder="请选择到达城市"
            @change="handleArrivalCityChange"
          />
        </n-form-item>
        
        <n-form-item>
          <n-button
            type="primary"
            @click="handleValidate"
          >
            验证表单
          </n-button>
          <n-button
            @click="handleResetValidation"
            style="margin-left: 12px;"
          >
            重置
          </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  BuildingOutlined, 
  EnvironmentOutlined, 
  ChevronDownOutlined
} from '@vicons/antd'
import { PRESET_RULES, customRule } from '@/utils/v_verify'

const message = useMessage()
const validationFormRef = ref()

// 基础示例
const basicCity = ref('')
const cardCity = ref('')
const iconInputCity = ref('')

// 禁用和尺寸
const disabledCity = ref('北京')
const isDisabled = ref(false)
const smallCity = ref('')
const mediumCity = ref('')
const largeCity = ref('')

// 表单验证
const validationForm = ref({
  departureCity: '',
  arrivalCity: '',
})

// 自定义验证规则：到达城市不能与出发城市相同
const arrivalCityRule = customRule(
  (value) => {
    if (!value) return true
    return value !== validationForm.value.departureCity
  },
  '到达城市不能与出发城市相同',
  'change'
)

const validationRules = {
  departureCity: [PRESET_RULES.required('出发城市')],
  arrivalCity: [PRESET_RULES.required('到达城市'), arrivalCityRule],
}

/**
 * 处理基础城市选择
 */
function handleBasicCityChange(city: string) {
  console.log('基础示例选择:', city)
  message.success(`已选择：${city}`)
}

/**
 * 处理城市清空
 */
function handleCityClear() {
  message.info('已清空城市选择')
}

/**
 * 通用城市选择处理
 */
function handleCityChange(city: string) {
  console.log('城市选择:', city)
}

/**
 * 切换禁用状态
 */
function toggleDisabled() {
  isDisabled.value = !isDisabled.value
}

/**
 * 处理出发城市变化
 */
function handleDepartureCityChange(city: string) {
  console.log('出发城市:', city)
  // 如果到达城市与出发城市相同，清空到达城市
  if (validationForm.value.arrivalCity === city) {
    validationForm.value.arrivalCity = ''
    message.warning('到达城市已清空，请重新选择')
  }
}

/**
 * 处理到达城市变化
 */
function handleArrivalCityChange(city: string) {
  console.log('到达城市:', city)
}

/**
 * 验证表单
 */
function handleValidate() {
  validationFormRef.value?.validate((errors: any) => {
    if (!errors) {
      message.success('验证通过！')
      const { departureCity, arrivalCity } = validationForm.value
      message.info(`路线：${departureCity} → ${arrivalCity}`)
    }
  })
}

/**
 * 重置验证表单
 */
function handleResetValidation() {
  validationForm.value = {
    departureCity: '',
    arrivalCity: '',
  }
  validationFormRef.value?.restoreValidation()
}
</script>

<style lang="scss" scoped>
.city-demo {
  padding: 20px;

  .main-title {
    margin-bottom: 24px;
    text-align: center;
  }

  .demo-section {
    margin-bottom: 40px;

    h3 {
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--n-primary-color);
    }
  }

  .demo-result {
    margin-top: 12px;
  }

  .city-card-trigger {
    width: 260px;
    cursor: pointer;
  }

  .city-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .city-text {
    flex: 1;
  }

  .city-label {
    font-size: 12px;
    color: var(--n-text-color-3);
    margin-bottom: 4px;
  }

  .city-value {
    font-size: 14px;
    font-weight: 500;
  }

  .rotate-180 {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }
}
</style>
```
:::

::: details 🚚 物流配送管理 - 配送范围设置和订单管理系统
```vue
<template>
  <div class="logistics-management">
    <n-card title="物流配送管理系统" class="header-card">
      <template #header-extra>
        <n-statistic label="今日配送" :value="todayDeliveryCount" />
      </template>
    </n-card>

    <!-- 配送范围设置 -->
    <n-card title="配送范围设置" class="delivery-range-card">
      <n-form
        :model="deliveryForm"
        :rules="deliveryRules"
        ref="deliveryFormRef"
        label-placement="left"
        label-width="100px"
      >
        <n-form-item label="配送中心" path="centerCity">
          <C_City
            v-model="deliveryForm.centerCity"
            placeholder="请选择配送中心城市"
            @change="handleCenterCityChange"
          >
            <template #trigger="{ value, visible }">
              <div class="center-city-trigger">
                <n-icon size="20" color="#1890ff">
                  <EnvironmentOutlined />
                </n-icon>
                <span>{{ value || '选择配送中心' }}</span>
                <n-icon :class="{ 'rotate-180': visible }">
                  <ChevronDownOutlined />
                </n-icon>
              </div>
            </template>
          </C_City>
        </n-form-item>

        <n-form-item label="配送城市" path="deliveryCities">
          <div class="delivery-cities-container">
            <C_City
              v-model="newDeliveryCity"
              placeholder="添加配送城市"
              :clearable="false"
              @change="handleAddDeliveryCity"
            />
            <div class="selected-cities" v-if="deliveryForm.deliveryCities.length > 0">
              <n-tag
                v-for="city in deliveryForm.deliveryCities"
                :key="city"
                closable
                @close="handleRemoveDeliveryCity(city)"
                style="margin: 4px;"
              >
                {{ city }}
              </n-tag>
            </div>
            <n-empty
              v-else
              description="暂未添加配送城市"
              style="margin-top: 12px;"
            />
          </div>
        </n-form-item>

        <n-form-item label="基础运费" path="baseFee">
          <n-input-number
            v-model:value="deliveryForm.baseFee"
            :min="0"
            :max="999"
            :precision="2"
            placeholder="基础运费"
            style="width: 200px;"
          >
            <template #prefix>¥</template>
            <template #suffix>元</template>
          </n-input-number>
        </n-form-item>

        <n-form-item>
          <n-space>
            <n-button
              type="primary"
              @click="handleSaveDeliveryConfig"
              :loading="savingConfig"
            >
              保存配置
            </n-button>
            <n-button @click="handleResetDeliveryConfig">重置</n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </n-card>

    <!-- 配送订单管理 -->
    <n-card title="配送订单管理" class="delivery-orders-card">
      <template #header-extra>
        <n-space>
          <C_City
            v-model="orderFilter.city"
            placeholder="筛选城市"
            @change="handleOrderCityFilter"
          >
            <template #trigger="{ value }">
              <n-button
                :type="value ? 'primary' : 'default'"
                size="small"
              >
                <template #icon>
                  <n-icon><FilterOutlined /></n-icon>
                </template>
                {{ value || '全部城市' }}
              </n-button>
            </template>
          </C_City>

          <n-select
            v-model:value="orderFilter.status"
            :options="orderStatusOptions"
            placeholder="订单状态"
            clearable
            style="width: 120px;"
            @update:value="handleOrderStatusFilter"
          />

          <n-button
            type="primary"
            size="small"
            @click="showCreateOrder = true"
          >
            <template #icon>
              <n-icon><PlusOutlined /></n-icon>
            </template>
            创建订单
          </n-button>
        </n-space>
      </template>

      <n-data-table
        :columns="orderColumns"
        :data="filteredOrders"
        :pagination="orderPagination"
        :loading="ordersLoading"
        :row-key="row => row.id"
      />
    </n-card>

    <!-- 创建订单弹窗 -->
    <n-modal
      v-model:show="showCreateOrder"
      preset="card"
      title="创建配送订单"
      style="width: 600px"
    >
      <n-form
        :model="orderForm"
        :rules="orderRules"
        ref="orderFormRef"
        label-placement="left"
        label-width="100px"
      >
        <n-form-item label="收货人" path="receiverName">
          <n-input
            v-model:value="orderForm.receiverName"
            placeholder="请输入收货人姓名"
          />
        </n-form-item>

        <n-form-item label="配送城市" path="deliveryCity">
          <C_City
            v-model="orderForm.deliveryCity"
            placeholder="请选择配送城市"
            @change="handleOrderCityChange"
          />
        </n-form-item>

        <n-form-item label="详细地址" path="deliveryAddress">
          <n-input
            v-model:value="orderForm.deliveryAddress"
            type="textarea"
            placeholder="请输入详细地址"
            :rows="3"
          />
        </n-form-item>

        <n-form-item label="商品重量" path="weight">
          <n-input-number
            v-model:value="orderForm.weight"
            :min="0.1"
            :max="999"
            :precision="1"
            placeholder="商品重量"
            style="width: 200px;"
          >
            <template #suffix>kg</template>
          </n-input-number>
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button @click="showCreateOrder = false">取消</n-button>
          <n-button
            type="primary"
            @click="handleCreateOrder"
            :loading="creatingOrder"
          >
            创建订单
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { 
  EnvironmentOutlined, 
  ChevronDownOutlined,
  FilterOutlined,
  PlusOutlined 
} from '@vicons/antd'
import { PRESET_RULES, customRule } from '@/utils/v_verify'

const message = useMessage()
const deliveryFormRef = ref()
const orderFormRef = ref()

// 配送配置表单
const deliveryForm = ref({
  centerCity: '',
  deliveryCities: [],
  baseFee: 8.00,
})

const newDeliveryCity = ref('')
const savingConfig = ref(false)

// 配送配置验证规则
const deliveryRules = {
  centerCity: PRESET_RULES.required('配送中心'),
  deliveryCities: customRule(
    (value) => Array.isArray(value) && value.length > 0,
    '请至少添加一个配送城市',
    'change'
  ),
  baseFee: [
    PRESET_RULES.required('基础运费'),
    PRESET_RULES.range('基础运费', 0, 999),
  ],
}

// 订单筛选
const orderFilter = ref({
  city: '',
  status: null,
})

const ordersLoading = ref(false)
const showCreateOrder = ref(false)
const creatingOrder = ref(false)

// 创建订单表单
const orderForm = ref({
  receiverName: '',
  deliveryCity: '',
  deliveryAddress: '',
  weight: 1.0,
})

// 订单验证规则
const orderRules = {
  receiverName: PRESET_RULES.required('收货人'),
  deliveryCity: PRESET_RULES.required('配送城市'),
  deliveryAddress: PRESET_RULES.required('详细地址'),
  weight: PRESET_RULES.range('商品重量', 0.1, 999),
}

const orderStatusOptions = [
  { label: '全部状态', value: null },
  { label: '待配送', value: 'pending' },
  { label: '配送中', value: 'delivering' },
  { label: '已完成', value: 'completed' },
]

// 模拟订单数据
const allOrders = ref([
  {
    id: 1,
    orderNo: 'D202507180001',
    receiverName: '张三',
    city: '北京',
    address: '朝阳区三里屯SOHO 3号楼1502室',
    weight: 2.5,
    deliveryFee: 15.00,
    status: 'pending',
    createTime: '2025-07-18 09:30:00',
  },
  // ... 更多数据
])

const orderColumns = [
  { title: '订单号', key: 'orderNo', width: 150 },
  { title: '收货人', key: 'receiverName', width: 100 },
  { title: '配送城市', key: 'city', width: 100 },
  { title: '地址', key: 'address', ellipsis: { tooltip: true } },
  { 
    title: '重量', 
    key: 'weight',
    width: 80,
    render: row => `${row.weight}kg`
  },
  { 
    title: '运费', 
    key: 'deliveryFee',
    width: 100,
    render: row => h('span', { style: 'color: #52c41a' }, `¥${row.deliveryFee}`)
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render: row => {
      const statusMap = {
        pending: { type: 'warning', text: '待配送' },
        delivering: { type: 'info', text: '配送中' },
        completed: { type: 'success', text: '已完成' },
      }
      const status = statusMap[row.status]
      return h(NTag, { type: status.type, size: 'small' }, () => status.text)
    },
  },
  { title: '下单时间', key: 'createTime', width: 160 },
]

const orderPagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
})

// 计算属性
const filteredOrders = computed(() => {
  let result = allOrders.value

  if (orderFilter.value.city) {
    result = result.filter(order => order.city === orderFilter.value.city)
  }

  if (orderFilter.value.status) {
    result = result.filter(order => order.status === orderFilter.value.status)
  }

  return result
})

const todayDeliveryCount = computed(() => allOrders.value.length)

/**
 * 处理配送中心城市变化
 */
const handleCenterCityChange = (city) => {
  console.log('配送中心城市:', city)
  // 清空配送城市列表
  deliveryForm.value.deliveryCities = []
  message.info('配送中心已变更，请重新设置配送城市')
}

/**
 * 添加配送城市
 */
const handleAddDeliveryCity = (city) => {
  if (!city) return
  
  if (city === deliveryForm.value.centerCity) {
    message.warning('配送城市不能与配送中心相同')
    newDeliveryCity.value = ''
    return
  }
  
  if (deliveryForm.value.deliveryCities.includes(city)) {
    message.warning('该城市已在配送范围内')
    newDeliveryCity.value = ''
    return
  }
  
  deliveryForm.value.deliveryCities.push(city)
  newDeliveryCity.value = ''
  message.success(`已添加配送城市：${city}`)
}

/**
 * 移除配送城市
 */
const handleRemoveDeliveryCity = (city) => {
  const index = deliveryForm.value.deliveryCities.indexOf(city)
  if (index > -1) {
    deliveryForm.value.deliveryCities.splice(index, 1)
  }
}

/**
 * 保存配送配置
 */
const handleSaveDeliveryConfig = () => {
  deliveryFormRef.value?.validate(async (errors) => {
    if (!errors) {
      savingConfig.value = true
      
      try {
        // 模拟保存请求
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        savingConfig.value = false
        message.success('配送配置已保存')
      } catch (error) {
        savingConfig.value = false
        message.error('保存失败，请重试')
      }
    }
  })
}

/**
 * 重置配送配置
 */
const handleResetDeliveryConfig = () => {
  deliveryForm.value = {
    centerCity: '',
    deliveryCities: [],
    baseFee: 8.00,
  }
  newDeliveryCity.value = ''
  deliveryFormRef.value?.restoreValidation()
}

/**
 * 处理订单城市筛选
 */
const handleOrderCityFilter = (city) => {
  console.log('筛选订单城市:', city)
}

/**
 * 处理订单状态筛选
 */
const handleOrderStatusFilter = (status) => {
  console.log('筛选订单状态:', status)
}

/**
 * 处理订单城市变化
 */
const handleOrderCityChange = (city) => {
  if (!deliveryForm.value.deliveryCities.includes(city) && 
      city !== deliveryForm.value.centerCity) {
    message.warning(`${city} 不在配送范围内`)
  }
}

/**
 * 创建配送订单
 */
const handleCreateOrder = () => {
  orderFormRef.value?.validate(async (errors) => {
    if (!errors) {
      creatingOrder.value = true
      
      try {
        // 模拟创建订单
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const newOrder = {
          id: Date.now(),
          orderNo: `D${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${String(allOrders.value.length + 1).padStart(4, '0')}`,
          receiverName: orderForm.value.receiverName,
          city: orderForm.value.deliveryCity,
          address: orderForm.value.deliveryAddress,
          weight: orderForm.value.weight,
          deliveryFee: 15.00,
          status: 'pending',
          createTime: new Date().toLocaleString('zh-CN'),
        }
        
        allOrders.value.unshift(newOrder)
        
        creatingOrder.value = false
        showCreateOrder.value = false
        
        // 重置表单
        orderForm.value = {
          receiverName: '',
          deliveryCity: '',
          deliveryAddress: '',
          weight: 1.0,
        }
        
        message.success('订单创建成功')
      } catch (error) {
        creatingOrder.value = false
        message.error('创建订单失败，请重试')
      }
    }
  })
}
</script>

<style scoped>
.logistics-management {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

.header-card,
.delivery-range-card,
.delivery-orders-card {
  margin-bottom: 16px;
}

.center-city-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid var(--n-border-color);
  border-radius: var(--n-border-radius);
  cursor: pointer;
  min-width: 200px;
  justify-content: space-between;
  transition: all 0.3s;
}

.center-city-trigger:hover {
  border-color: var(--n-primary-color);
}

.delivery-cities-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.selected-cities {
  padding: 12px;
  background: var(--n-color-modal);
  border-radius: var(--n-border-radius);
  min-height: 60px;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
</style>
```
:::

## 🛠️ 高级用法

::: details 🔗 城市数据联动 - 路线规划与途经城市管理
```vue
<template>
  <div class="city-linkage">
    <h4>城市联动示例</h4>
    
    <n-form
      :model="routeForm"
      :rules="routeRules"
      ref="routeFormRef"
      label-placement="left"
      label-width="100px"
    >
      <n-form-item label="出发城市" path="departureCity">
        <C_City
          v-model="routeForm.departureCity"
          placeholder="请选择出发城市"
          @change="handleDepartureCityChange"
        />
      </n-form-item>

      <n-form-item label="到达城市" path="arrivalCity">
        <C_City
          v-model="routeForm.arrivalCity"
          placeholder="请选择到达城市"
          :disabled-cities="[routeForm.departureCity]"
          @change="handleArrivalCityChange"
        />
      </n-form-item>

      <n-form-item label="途经城市" path="viaCities">
        <n-dynamic-tags
          v-model:value="routeForm.viaCities"
          :max="5"
        >
          <template #trigger="{ activate, disabled }">
            <n-button
              dashed
              :disabled="disabled"
              @click="showViaCitySelector = true"
            >
              + 添加途经城市
            </n-button>
          </template>
        </n-dynamic-tags>
      </n-form-item>

      <n-form-item>
        <n-button
          type="primary"
          @click="handleCalculateRoute"
        >
          计算路线
        </n-button>
      </n-form-item>
    </n-form>

    <!-- 路线信息展示 -->
    <n-alert
      v-if="routeInfo"
      type="info"
      title="路线信息"
    >
      <n-descriptions :column="2" bordered>
        <n-descriptions-item label="总距离">
          {{ routeInfo.distance }} 公里
        </n-descriptions-item>
        <n-descriptions-item label="预计时间">
          {{ routeInfo.duration }} 小时
        </n-descriptions-item>
      </n-descriptions>
    </n-alert>

    <!-- 途经城市选择弹窗 -->
    <n-modal
      v-model:show="showViaCitySelector"
      preset="card"
      title="选择途经城市"
      style="width: 400px"
    >
      <C_City
        v-model="tempViaCity"
        placeholder="选择途经城市"
        :disabled-cities="disabledViaCities"
      />
      <template #footer>
        <n-space justify="end">
          <n-button @click="showViaCitySelector = false">取消</n-button>
          <n-button
            type="primary"
            @click="handleConfirmViaCity"
            :disabled="!tempViaCity"
          >
            确定
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { PRESET_RULES, customRule } from '@/utils/v_verify'

const message = useMessage()
const routeFormRef = ref()

const routeForm = ref({
  departureCity: '',
  arrivalCity: '',
  viaCities: [],
})

const showViaCitySelector = ref(false)
const tempViaCity = ref('')
const routeInfo = ref(null)

// 自定义验证规则：途经城市不能包含出发或到达城市
const viaCitiesRule = customRule(
  (value) => {
    if (!Array.isArray(value)) return true
    const { departureCity, arrivalCity } = routeForm.value
    return !value.includes(departureCity) && !value.includes(arrivalCity)
  },
  '途经城市不能包含出发或到达城市',
  'change'
)

const routeRules = {
  departureCity: PRESET_RULES.required('出发城市'),
  arrivalCity: [
    PRESET_RULES.required('到达城市'),
    customRule(
      (value) => value !== routeForm.value.departureCity,
      '到达城市不能与出发城市相同',
      'change'
    ),
  ],
  viaCities: viaCitiesRule,
}

const disabledViaCities = computed(() => {
  return [
    routeForm.value.departureCity,
    routeForm.value.arrivalCity,
    ...routeForm.value.viaCities,
  ].filter(Boolean)
})

/**
 * 处理出发城市变化
 */
const handleDepartureCityChange = (city) => {
  console.log('出发城市:', city)
  // 如果到达城市与出发城市相同，清空到达城市
  if (routeForm.value.arrivalCity === city) {
    routeForm.value.arrivalCity = ''
  }
  routeInfo.value = null
}

/**
 * 处理到达城市变化
 */
const handleArrivalCityChange = (city) => {
  console.log('到达城市:', city)
  routeInfo.value = null
}

/**
 * 确认添加途经城市
 */
const handleConfirmViaCity = () => {
  if (tempViaCity.value && !routeForm.value.viaCities.includes(tempViaCity.value)) {
    routeForm.value.viaCities.push(tempViaCity.value)
    tempViaCity.value = ''
    showViaCitySelector.value = false
    routeInfo.value = null
  }
}

/**
 * 计算路线
 */
const handleCalculateRoute = () => {
  routeFormRef.value?.validate((errors) => {
    if (!errors) {
      // 模拟计算路线
      const baseDistance = 850
      const viaDistance = routeForm.value.viaCities.length * 150
      const totalDistance = baseDistance + viaDistance
      
      routeInfo.value = {
        distance: totalDistance,
        duration: (totalDistance / 80).toFixed(1),
      }
      
      message.success('路线计算完成')
    }
  })
}
</script>
```
:::

::: details ⚡ 性能优化配置 - 虚拟滚动和搜索防抖
```vue 
<template>
  <div class="performance-optimized">
    <h4>性能优化示例</h4>
    
    <!-- 虚拟滚动优化 -->
    <C_City
      v-model="optimizedCity"
      :virtual-scroll="true"
      :item-height="32"
      :visible-items="10"
      placeholder="虚拟滚动优化"
      @change="handleOptimizedCityChange"
    />

    <!-- 搜索防抖优化 -->
    <C_City
      v-model="debouncedCity"
      :search-debounce="300"
      placeholder="搜索防抖优化"
      @change="handleDebouncedCityChange"
    />

    <!-- 懒加载优化 -->
    <C_City
      v-model="lazyLoadCity"
      :lazy-load="true"
      :load-delay="100"
      placeholder="懒加载优化"
      @change="handleLazyLoadCityChange"
    />
  </div>
</template>

<script setup>
const optimizedCity = ref('')
const debouncedCity = ref('')
const lazyLoadCity = ref('')

const handleOptimizedCityChange = (city) => {
  console.log('虚拟滚动城市:', city)
}

const handleDebouncedCityChange = (city) => {
  console.log('防抖搜索城市:', city)
}

const handleLazyLoadCityChange = (city) => {
  console.log('懒加载城市:', city)
}
</script>
```
:::

## 🎨 自定义样式

::: details 🎨 CSS 变量定制 - 主题色彩和尺寸配置
```scss
.c-city-wrapper {
  --city-primary-color: var(--n-primary-color);
  --city-border-color: var(--n-border-color);
  --city-hover-color: var(--n-primary-color-hover);
  --city-active-bg: var(--n-primary-color-suppl);
  --city-popover-width: 430px;
  --city-popover-max-height: 400px;
  --city-item-padding: 8px 12px;
  --city-group-margin: 16px 0;
  --city-text-color: var(--n-text-color);
  --city-disabled-color: var(--n-text-color-disabled);
}
```
:::

::: details 📱 响应式布局 - 移动端适配优化
```vue
<template>
  <C_City
    v-model="selectedCity"
    class="responsive-city"
  />
</template>

<style scoped>
.responsive-city {
  width: 100%;

  :deep(.city-selector-content) {
    @media (max-width: 768px) {
      width: 95vw !important;
      max-width: none !important;
    }
  }

  :deep(.city-selector-header) {
    @media (max-width: 480px) {
      flex-direction: column;
      gap: 12px;
    }
  }

  :deep(.city-selector-letters) {
    @media (max-width: 480px) {
      display: none;
    }
  }

  :deep(.city-group__cities) {
    @media (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
```
:::

::: details 🌈 主题定制 - 深色主题和彩色主题
```vue
<template>
  <div class="custom-theme">
    <!-- 深色主题 -->
    <C_City
      v-model="darkCity"
      class="dark-theme"
    />

    <!-- 彩色主题 -->
    <C_City
      v-model="colorfulCity"
      class="colorful-theme"
    />
  </div>
</template>

<style scoped>
.dark-theme {
  --city-primary-color: #177ddc;
  --city-border-color: #434343;
  --city-hover-color: #40a9ff;
  --city-bg-color: #1f1f1f;
  --city-text-color: #ffffff;
  --city-active-bg: rgba(23, 125, 220, 0.2);
}

.colorful-theme {
  --city-primary-color: #ff6b6b;
  --city-hover-color: #ff5252;
  --city-active-bg: rgba(255, 107, 107, 0.1);
  --city-border-radius: 12px;
}
</style>
```
:::

## ⚠️ 注意事项

### 1. 数据源配置

::: code-group

```vue [✅ 推荐] 
<!-- 使用完整的城市数据 -->
<script setup>
import { cityData, provinceData } from './cityData'

// 确保数据格式正确
const validateCityData = (data) => {
  return data.every(item => 
    item.id && item.name && item.spell
  )
}
</script>
```

```vue [❌ 不推荐] 
<!-- 使用不完整的数据 -->
<script setup>
// 缺少必要字段
const incompleteCityData = [
  { name: '北京' }, // 缺少 id 和 spell
]
</script>
```

:::

### 2. 性能优化

::: code-group

```vue [✅ 推荐] 
<!-- 大数据量时启用虚拟滚动 -->
<C_City
  v-model="selectedCity"
  :virtual-scroll="true"
  :item-height="32"
/>
```

```vue [❌ 不推荐]
<!-- 大数据量不优化 -->
<C_City
  v-model="selectedCity"
  <!-- 数据量大但不启用优化 -->
/>
```
:::



### 3. 表单验证集成

::: code-group

```javascript [✅ 推荐] 
// 完整的验证规则
const cityRules = {
  city: [
    PRESET_RULES.required('城市'),
    customRule(
      (value) => {
        // 验证城市是否在允许范围内
        return allowedCities.includes(value)
      },
      '该城市不在服务范围内',
      'change'
    ),
  ],
}
```

```javascript [❌ 不推荐] 
// 简单的验证
const cityRules = {
  city: { required: true, message: '请选择城市' },
}
```

:::

## 🐛 故障排除

### 常见问题

::: details ❓ Q1: 城市数据不显示？
**A1:** 检查数据源配置：

```javascript
// 确保正确导入数据
import { cityData } from './city'
import { provinceData } from './province'

// 检查数据格式
console.log('城市数据:', cityData)
console.log('省份数据:', provinceData)
```
:::

::: details ❓ Q2: 搜索功能不工作？
**A2:** 检查搜索配置：

```vue
<!-- 确保启用搜索功能 -->
<C_City
  v-model="selectedCity"
  :filterable="true"  <!-- 确保未设置为 false -->
/>
```
:::

::: details ❓ Q3: 字母导航不显示？
**A3:** 检查配置项：

```vue 
<!-- 确保显示字母导航 -->
<C_City
  v-model="selectedCity"
  :show-letters="true"  <!-- 默认为 true -->
/>
```
:::

::: details ❓ Q4: 自定义触发器不生效？
**A4:** 检查插槽使用：

```vue 
<!-- 正确使用插槽 -->
<C_City v-model="selectedCity">
  <template #trigger="{ value, visible }">
    <!-- 确保使用了插槽参数 -->
    <div>{{ value || '请选择' }}</div>
  </template>
</C_City>
```
:::

## 🎯 最佳实践

### 1. 合理的默认值

```javascript
// ✅ 推荐：根据用户位置设置默认城市
const getDefaultCity = async () => {
  try {
    const location = await getUserLocation()
    return location.city || '北京'
  } catch {
    return '北京'
  }
}

const selectedCity = ref(await getDefaultCity())
```

### 2. 搜索优化

```javascript 
// ✅ 推荐：使用防抖优化搜索性能
import { debounce } from 'lodash-es'

const searchCity = debounce((keyword) => {
  // 搜索逻辑
}, 300)
```

### 3. 错误处理

```javascript
// ✅ 推荐：完善的错误处理
const handleCityChange = async (city) => {
  try {
    await validateCity(city)
    await updateUserCity(city)
    message.success('城市更新成功')
  } catch (error) {
    console.error('城市更新失败:', error)
    message.error('城市更新失败，请重试')
    // 恢复原值
    selectedCity.value = previousCity
  }
}
```

### 4. 数据缓存

```javascript
// ✅ 推荐：缓存城市数据减少请求
const cityDataCache = new Map()

const getCityData = async (province) => {
  if (cityDataCache.has(province)) {
    return cityDataCache.get(province)
  }
  
  const data = await fetchCityData(province)
  cityDataCache.set(province, data)
  return data
}
```

## 📝 更新日志

### v1.0.0 (2025-07-18)

- ✨ 支持按城市/按省份两种显示模式
- ✨ 智能搜索功能，支持拼音/汉字模糊搜索
- ✨ 字母导航快速跳转
- ✨ 自定义触发器插槽
- ✨ 完整的 TypeScript 支持
- ✨ 响应式设计，支持移动端
- ✨ 虚拟滚动性能优化
- ✨ 集成自定义验证规则

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个城市选择器组件专为各种需要城市选择的场景而设计，支持丰富的自定义配置和完整的验证集成。通过虚拟滚动和搜索优化，即使在大数据量下也能保持流畅的用户体验。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更好的城市选择体验！ 🏙️