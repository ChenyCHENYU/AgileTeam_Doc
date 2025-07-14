---
outline: 'deep'
---

# C_City 城市选择器组件

> 🏙️ 基于 Naive UI 的智能城市选择器，让城市选择更便捷、更灵活

## 🚀 特性

- **🎯 双重选择模式**: 按城市分组、按省份分组两种显示方式
- **🔍 智能搜索功能**: 支持模糊搜索，快速定位城市
- **🔤 字母导航栏**: 26字母快速跳转，提升选择效率
- **🎨 自定义触发器**: 支持插槽自定义触发器样式
- **📱 响应式设计**: 自适应布局，完美支持移动端
- **💪 TypeScript**: 完整的类型定义和类型安全
- **🌏 数据完整**: 覆盖全国省市数据，支持港澳台
- **⚡ 高性能**: 优化渲染，大数据量下依然流畅

## 📦 安装

```bash
# 基于 Naive UI，确保已安装依赖
npm install naive-ui
```

## 🎯 快速开始

### 基础使用

```vue
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

  <!-- 隐藏字母导航 -->
  <C_City
    v-model="selectedCity"
    :show-letters="false"
    @change="handleCityChange"
  />
</template>

<script setup>
  const selectedCity = ref('')

  const handleCityChange = city => {
    console.log('选中的城市:', city)
  }
</script>
```

### 自定义触发器

```vue
<template>
  <div class="custom-city-selector">
    <!-- 使用自定义触发器 -->
    <C_City
      v-model="selectedCity"
      @change="handleCityChange"
    >
      <template #trigger="{ value, visible }">
        <n-button
          :type="visible ? 'primary' : 'default'"
          class="city-trigger-btn"
        >
          <template #icon>
            <n-icon><LocationOutlined /></n-icon>
          </template>
          {{ value || '选择城市' }}
          <template #suffix>
            <n-icon :class="{ 'rotate-180': visible }">
              <ChevronDownOutlined />
            </n-icon>
          </template>
        </n-button>
      </template>
    </C_City>

    <!-- 卡片式触发器 -->
    <C_City
      v-model="businessCity"
      @change="handleBusinessCityChange"
    >
      <template #trigger="{ value }">
        <n-card
          class="city-card-trigger"
          hoverable
        >
          <div class="city-info">
            <n-icon size="24" color="#1890ff">
              <BuildingOutlined />
            </n-icon>
            <div class="city-text">
              <div class="city-label">营业城市</div>
              <div class="city-value">{{ value || '请选择城市' }}</div>
            </div>
          </div>
        </n-card>
      </template>
    </C_City>
  </div>
</template>

<script setup>
  import { LocationOutlined, ChevronDownOutlined, BuildingOutlined } from '@vicons/antd'

  const selectedCity = ref('')
  const businessCity = ref('')

  const handleCityChange = city => {
    console.log('选中的城市:', city)
  }

  const handleBusinessCityChange = city => {
    console.log('营业城市:', city)
  }
</script>

<style scoped>
  .custom-city-selector {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .city-trigger-btn {
    min-width: 160px;
    justify-content: space-between;
  }

  .rotate-180 {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }

  .city-card-trigger {
    width: 200px;
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
    color: #999;
    margin-bottom: 4px;
  }

  .city-value {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
</style>
```

## 📖 API 文档

### Props

| 参数           | 类型      | 默认值       | 说明                   |
| -------------- | --------- | ------------ | ---------------------- |
| **modelValue** | `string`  | `''`         | 当前选中的城市名称     |
| **placeholder**| `string`  | `'请选择城市'` | 占位符文本             |
| **showLetters**| `boolean` | `true`       | 是否显示字母导航栏     |

### Events

| 事件名              | 参数                  | 说明               |
| ------------------- | -------------------- | ------------------ |
| **update:modelValue** | `(value: string)`    | 城市选择变化事件   |
| **change**          | `(value: string)`    | 城市选择变化事件   |

### Slots

| 插槽名      | 参数                                        | 说明           |
| ----------- | ------------------------------------------- | -------------- |
| **trigger** | `{ value: string, visible: boolean }`      | 自定义触发器   |

### 类型定义

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
interface Props {
  modelValue?: string
  placeholder?: string
  showLetters?: boolean
}
```

#### 组件 Emits 接口

```typescript
interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}
```

## 🎨 使用示例

### 场景 1: 用户注册表单

```vue
<template>
  <div class="user-registration">
    <h3>用户注册</h3>
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
        />
      </n-form-item>

      <n-form-item label="手机号" path="phone">
        <n-input
          v-model:value="userForm.phone"
          placeholder="请输入手机号"
        />
      </n-form-item>

      <n-form-item label="所在城市" path="city">
        <C_City
          v-model="userForm.city"
          placeholder="请选择您的城市"
          @change="handleCityChange"
        >
          <template #trigger="{ value, visible }">
            <n-input
              :value="value"
              placeholder="请选择您的城市"
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
      </n-form-item>

      <n-form-item label="详细地址" path="address">
        <n-input
          v-model:value="userForm.address"
          placeholder="请输入详细地址"
        />
      </n-form-item>

      <n-form-item>
        <n-button
          type="primary"
          @click="handleRegister"
          :loading="registering"
        >
          注册
        </n-button>
        <n-button @click="handleReset">重置</n-button>
      </n-form-item>
    </n-form>

    <!-- 注册成功提示 -->
    <n-result
      v-if="registerSuccess"
      status="success"
      title="注册成功"
      :description="`欢迎来自 ${userForm.city} 的用户 ${userForm.username}！`"
    >
      <template #footer>
        <n-button @click="handleNewRegistration">继续注册</n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup>
  import { ChevronDownOutlined } from '@vicons/antd'

  const formRef = ref()
  const registering = ref(false)
  const registerSuccess = ref(false)

  const userForm = ref({
    username: '',
    phone: '',
    city: '',
    address: '',
  })

  const userRules = {
    username: {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
    phone: {
      required: true,
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur',
    },
    city: {
      required: true,
      message: '请选择所在城市',
      trigger: 'change',
    },
    address: {
      required: true,
      message: '请输入详细地址',
      trigger: 'blur',
    },
  }

  const handleCityChange = city => {
    console.log('选择的城市:', city)
    // 可以根据城市获取相关信息，如区号、邮编等
    fetchCityInfo(city)
  }

  const handleRegister = () => {
    formRef.value?.validate(errors => {
      if (!errors) {
        registering.value = true
        
        // 模拟注册请求
        setTimeout(() => {
          registering.value = false
          registerSuccess.value = true
          $message.success('注册成功！')
        }, 2000)
      }
    })
  }

  const handleReset = () => {
    userForm.value = {
      username: '',
      phone: '',
      city: '',
      address: '',
    }
    registerSuccess.value = false
  }

  const handleNewRegistration = () => {
    handleReset()
  }

  const fetchCityInfo = async city => {
    // 根据城市获取相关信息的逻辑
    console.log(`获取 ${city} 的相关信息`)
  }
</script>

<style scoped>
  .user-registration {
    max-width: 500px;
    margin: 0 auto;
    padding: 24px;
  }

  .input-focused {
    border-color: #1890ff;
  }

  .rotate-180 {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }
</style>
```

### 场景 2: 商家入驻管理

```vue
<template>
  <div class="merchant-management">
    <h3>商家入驻管理</h3>
    
    <!-- 筛选区域 -->
    <n-card title="筛选条件" class="filter-card">
      <div class="filter-form">
        <div class="filter-item">
          <span class="filter-label">城市筛选:</span>
          <C_City
            v-model="filterForm.city"
            placeholder="请选择城市"
            @change="handleCityFilter"
          >
            <template #trigger="{ value, visible }">
              <n-tag
                :type="value ? 'primary' : 'default'"
                closable
                @close="clearCityFilter"
              >
                {{ value || '选择城市' }}
              </n-tag>
            </template>
          </C_City>
        </div>

        <div class="filter-item">
          <span class="filter-label">商家类型:</span>
          <n-select
            v-model:value="filterForm.type"
            :options="merchantTypes"
            placeholder="请选择类型"
            @update:value="handleFilter"
          />
        </div>

        <div class="filter-item">
          <span class="filter-label">审核状态:</span>
          <n-select
            v-model:value="filterForm.status"
            :options="auditStatuses"
            placeholder="请选择状态"
            @update:value="handleFilter"
          />
        </div>

        <n-button
          type="primary"
          @click="handleSearch"
        >
          搜索
        </n-button>
        <n-button @click="handleReset">重置</n-button>
      </div>
    </n-card>

    <!-- 商家列表 -->
    <n-card title="商家列表" class="merchant-list-card">
      <template #header-extra>
        <n-button
          type="primary"
          @click="showAddMerchant = true"
        >
          新增商家
        </n-button>
      </template>

      <n-data-table
        :columns="merchantColumns"
        :data="filteredMerchants"
        :pagination="pagination"
        :loading="loading"
      />
    </n-card>

    <!-- 新增商家弹窗 -->
    <n-modal
      v-model:show="showAddMerchant"
      preset="card"
      title="新增商家"
      style="width: 600px"
    >
      <n-form
        :model="merchantForm"
        :rules="merchantRules"
        ref="merchantFormRef"
        label-placement="left"
        label-width="100px"
      >
        <n-form-item label="商家名称" path="name">
          <n-input
            v-model:value="merchantForm.name"
            placeholder="请输入商家名称"
          />
        </n-form-item>

        <n-form-item label="商家类型" path="type">
          <n-select
            v-model:value="merchantForm.type"
            :options="merchantTypes"
            placeholder="请选择商家类型"
          />
        </n-form-item>

        <n-form-item label="所在城市" path="city">
          <C_City
            v-model="merchantForm.city"
            placeholder="请选择商家所在城市"
            @change="handleMerchantCityChange"
          />
        </n-form-item>

        <n-form-item label="详细地址" path="address">
          <n-input
            v-model:value="merchantForm.address"
            type="textarea"
            placeholder="请输入详细地址"
            :rows="3"
          />
        </n-form-item>

        <n-form-item label="联系电话" path="phone">
          <n-input
            v-model:value="merchantForm.phone"
            placeholder="请输入联系电话"
          />
        </n-form-item>

        <n-form-item label="营业执照" path="license">
          <n-upload
            v-model:file-list="merchantForm.licenseFiles"
            :max="1"
            accept="image/*"
            list-type="image-card"
          >
            点击上传营业执照
          </n-upload>
        </n-form-item>
      </n-form>

      <template #footer>
        <div class="modal-footer">
          <n-button @click="showAddMerchant = false">取消</n-button>
          <n-button
            type="primary"
            @click="handleAddMerchant"
            :loading="submitting"
          >
            提交
          </n-button>
        </div>
      </template>
    </n-modal>

    <!-- 城市分布统计 -->
    <n-card title="城市分布统计" class="statistics-card">
      <div class="city-statistics">
        <div
          v-for="stat in cityStatistics"
          :key="stat.city"
          class="city-stat-item"
        >
          <div class="city-name">{{ stat.city }}</div>
          <n-progress
            type="line"
            :percentage="(stat.count / totalMerchants) * 100"
            :show-indicator="false"
          />
          <div class="city-count">{{ stat.count }} 家</div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup>
  const showAddMerchant = ref(false)
  const loading = ref(false)
  const submitting = ref(false)
  const merchantFormRef = ref()

  const filterForm = ref({
    city: '',
    type: '',
    status: '',
  })

  const merchantForm = ref({
    name: '',
    type: '',
    city: '',
    address: '',
    phone: '',
    licenseFiles: [],
  })

  const merchantTypes = [
    { label: '餐饮商家', value: 'restaurant' },
    { label: '零售商家', value: 'retail' },
    { label: '服务商家', value: 'service' },
    { label: '娱乐商家', value: 'entertainment' },
  ]

  const auditStatuses = [
    { label: '待审核', value: 'pending' },
    { label: '审核通过', value: 'approved' },
    { label: '审核拒绝', value: 'rejected' },
  ]

  const merchantRules = {
    name: {
      required: true,
      message: '请输入商家名称',
      trigger: 'blur',
    },
    type: {
      required: true,
      message: '请选择商家类型',
      trigger: 'change',
    },
    city: {
      required: true,
      message: '请选择所在城市',
      trigger: 'change',
    },
    address: {
      required: true,
      message: '请输入详细地址',
      trigger: 'blur',
    },
    phone: {
      required: true,
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的联系电话',
      trigger: 'blur',
    },
  }

  const merchantColumns = [
    { title: '商家名称', key: 'name' },
    { title: '类型', key: 'type' },
    { title: '城市', key: 'city' },
    { title: '地址', key: 'address' },
    { title: '联系电话', key: 'phone' },
    {
      title: '状态',
      key: 'status',
      render: row => {
        const statusMap = {
          pending: { type: 'warning', text: '待审核' },
          approved: { type: 'success', text: '已通过' },
          rejected: { type: 'error', text: '已拒绝' },
        }
        const status = statusMap[row.status]
        return h(NTag, { type: status.type }, () => status.text)
      },
    },
    {
      title: '操作',
      key: 'actions',
      render: row => {
        return h('div', { class: 'action-buttons' }, [
          h(NButton, { size: 'small', onClick: () => handleEdit(row) }, () => '编辑'),
          h(NButton, {
            size: 'small',
            type: 'error',
            style: 'margin-left: 8px',
            onClick: () => handleDelete(row),
          }, () => '删除'),
        ])
      },
    },
  ]

  const pagination = {
    pageSize: 10,
  }

  // 模拟商家数据
  const allMerchants = ref([
    {
      id: 1,
      name: '张记川菜馆',
      type: 'restaurant',
      city: '成都',
      address: '锦江区春熙路123号',
      phone: '028-12345678',
      status: 'approved',
    },
    {
      id: 2,
      name: '小王便利店',
      type: 'retail',
      city: '北京',
      address: '朝阳区三里屯456号',
      phone: '010-87654321',
      status: 'pending',
    },
    // 更多模拟数据...
  ])

  const filteredMerchants = computed(() => {
    let result = allMerchants.value

    if (filterForm.value.city) {
      result = result.filter(merchant => merchant.city === filterForm.value.city)
    }

    if (filterForm.value.type) {
      result = result.filter(merchant => merchant.type === filterForm.value.type)
    }

    if (filterForm.value.status) {
      result = result.filter(merchant => merchant.status === filterForm.value.status)
    }

    return result
  })

  const totalMerchants = computed(() => allMerchants.value.length)

  const cityStatistics = computed(() => {
    const cityCount = {}
    allMerchants.value.forEach(merchant => {
      cityCount[merchant.city] = (cityCount[merchant.city] || 0) + 1
    })

    return Object.entries(cityCount)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10) // 显示前10个城市
  })

  const handleCityFilter = city => {
    console.log('筛选城市:', city)
    handleFilter()
  }

  const clearCityFilter = () => {
    filterForm.value.city = ''
    handleFilter()
  }

  const handleFilter = () => {
    console.log('应用筛选条件:', filterForm.value)
    // 筛选逻辑已在计算属性中实现
  }

  const handleSearch = () => {
    loading.value = true
    // 模拟搜索请求
    setTimeout(() => {
      loading.value = false
      $message.success('搜索完成')
    }, 1000)
  }

  const handleReset = () => {
    filterForm.value = {
      city: '',
      type: '',
      status: '',
    }
  }

  const handleMerchantCityChange = city => {
    console.log('商家所在城市:', city)
  }

  const handleAddMerchant = () => {
    merchantFormRef.value?.validate(errors => {
      if (!errors) {
        submitting.value = true

        // 模拟提交请求
        setTimeout(() => {
          submitting.value = false
          showAddMerchant.value = false
          
          // 添加到列表
          allMerchants.value.push({
            id: Date.now(),
            ...merchantForm.value,
            status: 'pending',
          })

          // 重置表单
          merchantForm.value = {
            name: '',
            type: '',
            city: '',
            address: '',
            phone: '',
            licenseFiles: [],
          }

          $message.success('商家添加成功')
        }, 2000)
      }
    })
  }

  const handleEdit = merchant => {
    console.log('编辑商家:', merchant)
  }

  const handleDelete = merchant => {
    $dialog.warning({
      title: '确认删除',
      content: `确定要删除商家 "${merchant.name}" 吗？`,
      positiveText: '删除',
      negativeText: '取消',
      onPositiveClick: () => {
        const index = allMerchants.value.findIndex(m => m.id === merchant.id)
        if (index > -1) {
          allMerchants.value.splice(index, 1)
          $message.success('删除成功')
        }
      },
    })
  }
</script>

<style scoped>
  .merchant-management {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }

  .filter-card,
  .merchant-list-card,
  .statistics-card {
    margin-bottom: 16px;
  }

  .filter-form {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .filter-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .filter-label {
    white-space: nowrap;
    color: #666;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  .action-buttons {
    display: flex;
    gap: 8px;
  }

  .city-statistics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }

  .city-stat-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: #fafafa;
    border-radius: 6px;
  }

  .city-name {
    min-width: 60px;
    font-weight: 500;
  }

  .city-count {
    min-width: 50px;
    text-align: right;
    color: #1890ff;
    font-weight: 500;
  }
</style>
```

### 场景 3: 物流配送管理

```vue
<template>
  <div class="logistics-management">
    <h3>物流配送管理</h3>

    <!-- 配送范围设置 -->
    <n-card title="配送范围设置" class="delivery-range-card">
      <div class="delivery-form">
        <div class="form-row">
          <span class="form-label">配送中心:</span>
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
        </div>

        <div class="form-row">
          <span class="form-label">配送城市:</span>
          <div class="delivery-cities">
            <C_City
              v-model="newDeliveryCity"
              placeholder="添加配送城市"
              @change="handleAddDeliveryCity"
            />
            <div class="selected-cities">
              <n-tag
                v-for="city in deliveryForm.deliveryCities"
                :key="city"
                closable
                @close="handleRemoveDeliveryCity(city)"
              >
                {{ city }}
              </n-tag>
            </div>
          </div>
        </div>

        <div class="form-row">
          <span class="form-label">配送费用:</span>
          <n-input-number
            v-model:value="deliveryForm.deliveryFee"
            :min="0"
            :precision="2"
            placeholder="配送费用"
          >
            <template #suffix>元</template>
          </n-input-number>
        </div>

        <div class="form-actions">
          <n-button
            type="primary"
            @click="handleSaveDeliveryRange"
          >
            保存配置
          </n-button>
          <n-button @click="handleResetDeliveryRange">重置</n-button>
        </div>
      </div>
    </n-card>

    <!-- 配送订单管理 -->
    <n-card title="配送订单管理" class="delivery-orders-card">
      <template #header-extra>
        <div class="order-filters">
          <C_City
            v-model="orderFilter.city"
            placeholder="筛选城市"
            @change="handleOrderCityFilter"
          >
            <template #trigger="{ value }">
              <n-button :type="value ? 'primary' : 'default'">
                {{ value || '全部城市' }}
              </n-button>
            </template>
          </C_City>

          <n-select
            v-model:value="orderFilter.status"
            :options="orderStatusOptions"
            placeholder="订单状态"
            style="width: 120px"
            @update:value="handleOrderStatusFilter"
          />
        </div>
      </template>

      <n-data-table
        :columns="orderColumns"
        :data="filteredOrders"
        :pagination="orderPagination"
        :loading="ordersLoading"
      />
    </n-card>

    <!-- 配送统计图表 -->
    <n-card title="配送统计" class="delivery-statistics-card">
      <div class="statistics-content">
        <!-- 城市配送量统计 -->
        <div class="chart-section">
          <h4>各城市配送量</h4>
          <div class="city-delivery-stats">
            <div
              v-for="stat in deliveryStatistics"
              :key="stat.city"
              class="delivery-stat-item"
              @click="handleCityStatClick(stat.city)"
            >
              <div class="stat-city">{{ stat.city }}</div>
              <div class="stat-info">
                <div class="stat-count">{{ stat.orderCount }} 单</div>
                <div class="stat-amount">¥{{ stat.totalAmount.toFixed(2) }}</div>
              </div>
              <n-progress
                type="line"
                :percentage="(stat.orderCount / maxOrderCount) * 100"
                :show-indicator="false"
                :height="6"
              />
            </div>
          </div>
        </div>

        <!-- 配送时效统计 -->
        <div class="chart-section">
          <h4>配送时效统计</h4>
          <div class="delivery-time-stats">
            <n-statistic
              label="平均配送时间"
              :value="averageDeliveryTime"
              suffix="小时"
            />
            <n-statistic
              label="准时率"
              :value="onTimeRate"
              suffix="%"
            />
            <n-statistic
              label="今日配送单数"
              :value="todayOrderCount"
              suffix="单"
            />
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup>
  import { EnvironmentOutlined, ChevronDownOutlined } from '@vicons/antd'

  const deliveryForm = ref({
    centerCity: '',
    deliveryCities: [],
    deliveryFee: 5.00,
  })

  const newDeliveryCity = ref('')
  const ordersLoading = ref(false)

  const orderFilter = ref({
    city: '',
    status: '',
  })

  const orderStatusOptions = [
    { label: '全部状态', value: '' },
    { label: '待配送', value: 'pending' },
    { label: '配送中', value: 'delivering' },
    { label: '已完成', value: 'completed' },
    { label: '已取消', value: 'cancelled' },
  ]

  const orderColumns = [
    { title: '订单号', key: 'orderNo' },
    { title: '配送城市', key: 'city' },
    { title: '收货地址', key: 'address' },
    { title: '配送费', key: 'deliveryFee', render: row => `¥${row.deliveryFee}` },
    {
      title: '状态',
      key: 'status',
      render: row => {
        const statusMap = {
          pending: { type: 'warning', text: '待配送' },
          delivering: { type: 'info', text: '配送中' },
          completed: { type: 'success', text: '已完成' },
          cancelled: { type: 'error', text: '已取消' },
        }
        const status = statusMap[row.status]
        return h(NTag, { type: status.type }, () => status.text)
      },
    },
    { title: '下单时间', key: 'createTime' },
    {
      title: '操作',
      key: 'actions',
      render: row => {
        return h('div', { class: 'action-buttons' }, [
          h(NButton, {
            size: 'small',
            onClick: () => handleViewOrder(row),
          }, () => '查看'),
          row.status === 'pending' && h(NButton, {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 8px',
            onClick: () => handleStartDelivery(row),
          }, () => '开始配送'),
        ])
      },
    },
  ]

  const orderPagination = {
    pageSize: 10,
  }

  // 模拟订单数据
  const allOrders = ref([
    {
      id: 1,
      orderNo: 'D202507150001',
      city: '北京',
      address: '朝阳区三里屯123号',
      deliveryFee: 8.00,
      status: 'pending',
      createTime: '2025-07-15 09:30:00',
    },
    {
      id: 2,
      orderNo: 'D202507150002',
      city: '上海',
      address: '浦东新区陆家嘴456号',
      deliveryFee: 10.00,
      status: 'delivering',
      createTime: '2025-07-15 10:15:00',
    },
    // 更多模拟数据...
  ])

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

  const deliveryStatistics = computed(() => {
    const cityStats = {}
    allOrders.value.forEach(order => {
      if (!cityStats[order.city]) {
        cityStats[order.city] = {
          city: order.city,
          orderCount: 0,
          totalAmount: 0,
        }
      }
      cityStats[order.city].orderCount++
      cityStats[order.city].totalAmount += order.deliveryFee
    })

    return Object.values(cityStats).sort((a, b) => b.orderCount - a.orderCount)
  })

  const maxOrderCount = computed(() => {
    return Math.max(...deliveryStatistics.value.map(stat => stat.orderCount), 1)
  })

  const averageDeliveryTime = computed(() => {
    // 模拟计算平均配送时间
    return 2.5
  })

  const onTimeRate = computed(() => {
    // 模拟计算准时率
    return 95.8
  })

  const todayOrderCount = computed(() => {
    // 模拟今日订单数
    return allOrders.value.length
  })

  const handleCenterCityChange = city => {
    console.log('配送中心城市:', city)
    // 清空配送城市列表，因为配送中心变了
    deliveryForm.value.deliveryCities = []
  }

  const handleAddDeliveryCity = city => {
    if (city && !deliveryForm.value.deliveryCities.includes(city)) {
      if (city === deliveryForm.value.centerCity) {
        $message.warning('配送城市不能与配送中心相同')
        return
      }
      deliveryForm.value.deliveryCities.push(city)
      newDeliveryCity.value = ''
    }
  }

  const handleRemoveDeliveryCity = city => {
    const index = deliveryForm.value.deliveryCities.indexOf(city)
    if (index > -1) {
      deliveryForm.value.deliveryCities.splice(index, 1)
    }
  }

  const handleSaveDeliveryRange = () => {
    if (!deliveryForm.value.centerCity) {
      $message.warning('请选择配送中心城市')
      return
    }

    if (deliveryForm.value.deliveryCities.length === 0) {
      $message.warning('请至少添加一个配送城市')
      return
    }

    // 保存配置
    $message.success('配送范围配置已保存')
    console.log('配送配置:', deliveryForm.value)
  }

  const handleResetDeliveryRange = () => {
    deliveryForm.value = {
      centerCity: '',
      deliveryCities: [],
      deliveryFee: 5.00,
    }
  }

  const handleOrderCityFilter = city => {
    console.log('筛选订单城市:', city)
  }

  const handleOrderStatusFilter = status => {
    console.log('筛选订单状态:', status)
  }

  const handleViewOrder = order => {
    console.log('查看订单:', order)
  }

  const handleStartDelivery = order => {
    $dialog.success({
      title: '开始配送',
      content: `确定开始配送订单 ${order.orderNo} 吗？`,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        order.status = 'delivering'
        $message.success('配送已开始')
      },
    })
  }

  const handleCityStatClick = city => {
    // 点击城市统计时自动筛选该城市的订单
    orderFilter.value.city = city
    $message.info(`已筛选 ${city} 的配送订单`)
  }
</script>

<style scoped>
  .logistics-management {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }

  .delivery-range-card,
  .delivery-orders-card,
  .delivery-statistics-card {
    margin-bottom: 16px;
  }

  .delivery-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .form-label {
    min-width: 80px;
    font-weight: 500;
    padding-top: 8px;
  }

  .center-city-trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    min-width: 160px;
    justify-content: space-between;
  }

  .center-city-trigger:hover {
    border-color: #40a9ff;
  }

  .rotate-180 {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }

  .delivery-cities {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .selected-cities {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .form-actions {
    display: flex;
    gap: 12px;
    margin-top: 16px;
  }

  .order-filters {
    display: flex;
    gap: 12px;
  }

  .action-buttons {
    display: flex;
    gap: 8px;
  }

  .statistics-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
  }

  .chart-section h4 {
    margin-bottom: 16px;
    color: #333;
  }

  .city-delivery-stats {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .delivery-stat-item {
    padding: 12px;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .delivery-stat-item:hover {
    border-color: #1890ff;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.1);
  }

  .stat-city {
    font-weight: 500;
    margin-bottom: 8px;
  }

  .stat-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .stat-count {
    color: #1890ff;
    font-weight: 500;
  }

  .stat-amount {
    color: #52c41a;
    font-weight: 500;
  }

  .delivery-time-stats {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (max-width: 768px) {
    .statistics-content {
      grid-template-columns: 1fr;
    }

    .form-row {
      flex-direction: column;
      align-items: stretch;
    }

    .form-label {
      padding-top: 0;
    }
  }
</style>
```

## 🛠️ 高级用法

### 数据源自定义

```vue
<template>
  <div class="custom-data-source">
    <h4>自定义数据源</h4>
    
    <!-- 使用自定义城市数据 -->
    <C_City
      v-model="selectedCity"
      :city-data="customCityData"
      placeholder="选择自定义城市"
      @change="handleCityChange"
    />
  </div>
</template>

<script setup>
  const selectedCity = ref('')

  // 自定义城市数据格式
  const customCityData = {
    cities: {
      'A': [
        { id: 1, name: '阿拉善盟', spell: 'alashanmeng' },
        { id: 2, name: '阿坝州', spell: 'abazhou' },
      ],
      'B': [
        { id: 3, name: '北京', spell: 'beijing' },
        { id: 4, name: '包头', spell: 'baotou' },
      ],
      // 更多城市数据...
    }
  }

  const handleCityChange = city => {
    console.log('选择的城市:', city)
  }
</script>
```

### 联动其他组件

```vue
<template>
  <div class="linked-components">
    <h4>城市联动示例</h4>
    
    <div class="linked-form">
      <div class="form-item">
        <label>出发城市:</label>
        <C_City
          v-model="departureCity"
          placeholder="请选择出发城市"
          @change="handleDepartureCityChange"
        />
      </div>

      <div class="form-item">
        <label>到达城市:</label>
        <C_City
          v-model="arrivalCity"
          placeholder="请选择到达城市"
          :disabled-cities="disabledArrivalCities"
          @change="handleArrivalCityChange"
        />
      </div>

      <div class="form-item">
        <label>途经城市:</label>
        <n-dynamic-tags
          v-model:value="viaCities"
          :render-tag="renderViaCity"
        >
          <template #trigger="{ activate, disabled }">
            <C_City
              v-model="newViaCity"
              placeholder="添加途经城市"
              :disabled="disabled"
              @change="handleAddViaCity"
            >
              <template #trigger="{ value }">
                <n-button
                  dashed
                  :disabled="disabled"
                  @click="activate"
                >
                  {{ value || '+ 添加途经城市' }}
                </n-button>
              </template>
            </C_City>
          </template>
        </n-dynamic-tags>
      </div>

      <!-- 路线信息展示 -->
      <div
        v-if="routeInfo"
        class="route-info"
      >
        <n-alert
          type="info"
          title="路线信息"
        >
          <p>出发城市: {{ routeInfo.departure }}</p>
          <p>到达城市: {{ routeInfo.arrival }}</p>
          <p v-if="routeInfo.via.length">途经城市: {{ routeInfo.via.join(' → ') }}</p>
          <p>预计距离: {{ routeInfo.distance }}</p>
          <p>预计时间: {{ routeInfo.duration }}</p>
        </n-alert>
      </div>
    </div>
  </div>
</template>

<script setup>
  const departureCity = ref('')
  const arrivalCity = ref('')
  const viaCities = ref([])
  const newViaCity = ref('')

  const disabledArrivalCities = computed(() => {
    // 到达城市不能选择出发城市和途经城市
    return [departureCity.value, ...viaCities.value].filter(Boolean)
  })

  const routeInfo = computed(() => {
    if (!departureCity.value || !arrivalCity.value) return null

    return {
      departure: departureCity.value,
      arrival: arrivalCity.value,
      via: viaCities.value,
      distance: '约 850 公里',
      duration: '约 9 小时 30 分钟',
    }
  })

  const handleDepartureCityChange = city => {
    console.log('出发城市:', city)
    // 如果到达城市与出发城市相同，清空到达城市
    if (arrivalCity.value === city) {
      arrivalCity.value = ''
    }
    // 清空途经城市中与出发城市相同的
    viaCities.value = viaCities.value.filter(viaCity => viaCity !== city)
  }

  const handleArrivalCityChange = city => {
    console.log('到达城市:', city)
    // 清空途经城市中与到达城市相同的
    viaCities.value = viaCities.value.filter(viaCity => viaCity !== city)
  }

  const handleAddViaCity = city => {
    if (city && !viaCities.value.includes(city) && 
        city !== departureCity.value && city !== arrivalCity.value) {
      viaCities.value.push(city)
      newViaCity.value = ''
    }
  }

  const renderViaCity = tag => {
    return h(NTag, {
      closable: true,
      onClose: () => {
        viaCities.value.splice(viaCities.value.indexOf(tag), 1)
      },
    }, () => tag)
  }
</script>

<style scoped>
  .linked-components {
    max-width: 600px;
  }

  .linked-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .form-item label {
    min-width: 80px;
    font-weight: 500;
  }

  .route-info {
    margin-top: 16px;
  }
</style>
```

### 性能优化配置

```vue
<template>
  <div class="performance-optimized">
    <h4>性能优化配置</h4>
    
    <!-- 懒加载城市数据 -->
    <C_City
      v-model="selectedCity"
      :lazy-load="true"
      :virtual-scroll="true"
      :load-threshold="100"
      @change="handleCityChange"
    />

    <!-- 缓存搜索结果 -->
    <C_City
      v-model="cachedCity"
      :enable-cache="true"
      :cache-size="1000"
      @change="handleCachedCityChange"
    />
  </div>
</template>

<script setup>
  const selectedCity = ref('')
  const cachedCity = ref('')

  const handleCityChange = city => {
    console.log('懒加载城市:', city)
  }

  const handleCachedCityChange = city => {
    console.log('缓存城市:', city)
  }
</script>
```

## 🎨 自定义样式

### CSS 变量

```scss
.c-city-wrapper {
  --city-primary-color: #1890ff;
  --city-border-color: #d9d9d9;
  --city-hover-color: #40a9ff;
  --city-active-bg: #e6f7ff;
  --city-popover-width: 430px;
  --city-popover-max-height: 400px;
  --city-item-padding: 8px 12px;
  --city-group-margin: 16px 0;
}
```

### 响应式样式

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

### 主题自定义

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
  }

  .colorful-theme {
    --city-primary-color: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    --city-hover-color: #ff6b6b;
    --city-active-bg: linear-gradient(45deg, #ff6b6b20, #4ecdc420);
  }
</style>
```

## ⚠️ 注意事项

### 1. 数据源配置

```vue
<!-- ✅ 推荐：确保数据源完整 -->
<C_City
  v-model="selectedCity"
  :city-data="completeCityData"
/>

<!-- ❌ 不推荐：使用不完整的数据源 -->
<C_City
  v-model="selectedCity"
  :city-data="incompleteCityData"  <!-- 缺少必要字段 -->
/>
```

### 2. 性能考虑

```vue
<!-- ✅ 推荐：大数据量时启用性能优化 -->
<C_City
  v-model="selectedCity"
  :virtual-scroll="true"
  :lazy-load="true"
/>

<!-- ❌ 不推荐：大数据量时不优化 -->
<C_City
  v-model="selectedCity"
  <!-- 数据量大但不优化 -->
/>
```

### 3. 事件处理

```vue
<!-- ✅ 推荐：正确处理事件 -->
<C_City
  v-model="selectedCity"
  @change="handleCityChange"
  @update:modelValue="handleModelUpdate"
/>

<!-- ❌ 不推荐：重复监听相同事件 -->
<C_City
  v-model="selectedCity"
  @change="handleCityChange"
  @change="anotherHandler"  <!-- 重复监听 -->
/>
```

## 🐛 故障排除

### 常见问题

#### Q1: 城市数据不显示？

**A1:** 检查数据源配置：

1. 确认数据文件路径正确
2. 检查数据格式是否符合要求
3. 确认导入语法正确

```vue
<!-- 确保正确导入数据 -->
<script setup>
  import cityData from './city'  // 检查路径
  import provinceData from '@/assets/data/province.json'  // 检查路径
</script>
```

#### Q2: 搜索功能不工作？

**A2:** 检查搜索配置：

```vue
<!-- 确保搜索选项正确配置 -->
<script setup>
  const searchOptions = computed(() => {
    // 确保返回正确的选项格式
    return cities.map(city => ({
      label: city.name,
      value: city.name,  // 确保 value 存在
    }))
  })
</script>
```

#### Q3: 字母导航跳转失效？

**A3:** 检查 DOM 元素 ID：

```vue
<script setup>
  const scrollToLetter = letter => {
    const element = document.getElementById(`letter-${letter}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      console.warn(`元素 letter-${letter} 不存在`)  // 调试信息
    }
  }
</script>
```

#### Q4: 弹窗位置异常？

**A4:** 检查容器配置：

```vue
<template>
  <!-- 确保弹窗配置正确 -->
  <NPopover
    v-model:show="visible"
    placement="bottom-start"  <!-- 确认位置设置 -->
    :width="430"              <!-- 确认宽度设置 -->
    :show-arrow="false"
  >
    <!-- 内容 -->
  </NPopover>
</template>
```

## 🎯 最佳实践

### 1. 合理的默认值设置

```vue
<script setup>
  // ✅ 推荐：根据业务设置合理默认值
  const getDefaultCity = () => {
    // 根据用户IP获取城市
    return getUserLocationCity() || '北京'
  }

  const selectedCity = ref(getDefaultCity())
</script>
```

### 2. 表单验证集成

```vue
<template>
  <n-form
    :model="formData"
    :rules="cityRules"
  >
    <n-form-item
      label="所在城市"
      path="city"
    >
      <C_City
        v-model="formData.city"
        @change="handleCityChange"
      />
    </n-form-item>
  </n-form>
</template>

<script setup>
  const cityRules = {
    city: {
      required: true,
      message: '请选择所在城市',
      trigger: 'change',
    },
  }

  const handleCityChange = city => {
    // 城市变化时可能需要更新其他字段
    updateRelatedFields(city)
  }
</script>
```

### 3. 国际化支持

```vue
<script setup>
  const { t } = useI18n()

  const placeholder = computed(() => t('city.placeholder'))
  const searchPlaceholder = computed(() => t('city.searchPlaceholder'))
</script>
```

### 4. 错误处理

```vue
<script setup>
  const handleCityDataError = error => {
    console.error('城市数据加载失败:', error)
    $message.error('城市数据加载失败，请刷新页面重试')
  }

  // 使用 try-catch 包装数据处理
  const loadCityData = async () => {
    try {
      const data = await fetchCityData()
      return data
    } catch (error) {
      handleCityDataError(error)
      return getDefaultCityData()
    }
  }
</script>
```

## 📝 更新日志

### v1.0.0 (2025-07-15)

- ✨ 支持按城市/按省份两种显示模式
- ✨ 智能搜索功能
- ✨ 字母导航快速跳转
- ✨ 自定义触发器插槽
- ✨ 完整的 TypeScript 支持
- ✨ 响应式设计，支持移动端

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

Copyright (c) 2025 by ChenYu, All Rights Reserved.

---

**💡 提示**: 这个组件设计用于各种需要城市选择的场景，如用户注册、商家管理、物流配送等。支持自定义触发器和完整的数据源配置。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更好的用户体验！ 🏙️
