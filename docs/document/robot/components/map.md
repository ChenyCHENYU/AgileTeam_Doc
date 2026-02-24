# C_Map 组件

> 基于 [Leaflet.js](https://leafletjs.com/) 封装的地图组件，支持 OpenStreetMap 和高德地图双引擎切换。

## ✨ 特性

- ✅ **双引擎支持**: OpenStreetMap（免费） + 高德地图（国内优化），运行时可切换
- ✅ **标记管理**: 支持批量添加标记点，绑定 Popup 弹窗内容
- ✅ **响应式**: 中心点、缩放级别、标记列表变化自动更新地图
- ✅ **高德地图 SDK 动态加载**: 按需加载高德 JS SDK，无需全局引入
- ✅ **Leaflet 图标修复**: 自动修复 Leaflet 打包后默认图标丢失问题
- ✅ **加载状态**: 内置 `NSpin` 加载动画，初始化期间友好提示
- ✅ **生命周期管理**: 组件销毁时自动清理地图实例，防止内存泄漏
- ✅ **类型安全**: 完整的 TypeScript 接口定义

## 🎯 适用场景

| 场景             | 示例                   | 使用方式       |
| ---------------- | ---------------------- | -------------- |
| 📍 **位置展示**  | 公司地址、门店位置     | 单标记 + Popup |
| 🗺️ **多点标注**  | 配送站点、设备分布     | 批量标记       |
| 🏠 **地址选择**  | 表单中嵌入地图选点     | 标记点击回调   |
| 🌏 **国际/国内** | 海外用 OSM，国内用高德 | 地图引擎切换   |


## 📦 依赖

```bash
bun add leaflet
bun add -D @types/leaflet
```

> 高德地图无需安装依赖，组件内通过 `<script>` 标签动态加载 SDK。

## 📖 基础用法

### 最简示例

```vue
<template>
  <C_Map />
</template>
```

> 默认显示北京中心（39.9042, 116.4074），缩放 10 级，高度 400px，使用 OpenStreetMap。

### 自定义中心点和标记

```vue
<template>
  <C_Map
    height="500px"
    :center="[31.2304, 121.4737]"
    :zoom="12"
    :markers="markers"
    @marker-click="handleMarkerClick"
  />
</template>

<script setup lang="ts">
  import type { MapMarker } from '@/components/global/C_Map/data'

  const markers: MapMarker[] = [
    { lat: 31.2304, lng: 121.4737, popup: '上海市中心' },
    { lat: 31.2397, lng: 121.4998, popup: '陆家嘴金融中心' },
    { lat: 31.2222, lng: 121.4581, popup: '人民广场' },
  ]

  function handleMarkerClick(marker: MapMarker, event: any) {
    console.log('点击标记:', marker.popup)
  }
</script>
```

### 使用高德地图

```vue
<template>
  <C_Map
    map-type="amap"
    :amap-key="AMAP_KEY"
    :center="[39.9042, 116.4074]"
    :zoom="14"
    :markers="markers"
    @ready="onMapReady"
  />
</template>

<script setup lang="ts">
  const AMAP_KEY = 'your-amap-api-key'

  const markers = [{ lat: 39.9042, lng: 116.4074, popup: '天安门广场' }]

  function onMapReady(mapInstance: any) {
    console.log('高德地图就绪:', mapInstance)
  }
</script>
```

### 动态切换地图引擎

```vue
<template>
  <NRadioGroup v-model:value="currentMapType">
    <NRadio value="osm">OpenStreetMap</NRadio>
    <NRadio value="amap">高德地图</NRadio>
  </NRadioGroup>

  <C_Map
    :map-type="currentMapType"
    :amap-key="AMAP_KEY"
    :center="center"
    :zoom="zoom"
    :markers="markers"
  />
</template>

<script setup lang="ts">
  const currentMapType = ref<'osm' | 'amap'>('osm')
  const center = ref<[number, number]>([39.9042, 116.4074])
  const zoom = ref(12)
  const markers = ref([{ lat: 39.9042, lng: 116.4074, popup: '北京' }])
</script>
```

## 🔧 完整 API

### Props

| 属性      | 类型               | 默认值                | 说明                                        |
| --------- | ------------------ | --------------------- | ------------------------------------------- |
| `height`  | `string`           | `'400px'`             | 地图容器高度                                |
| `center`  | `[number, number]` | `[39.9042, 116.4074]` | 地图中心点 `[纬度, 经度]`                   |
| `zoom`    | `number`           | `10`                  | 缩放级别（1-19）                            |
| `markers` | `MapMarker[]`      | `[]`                  | 标记点列表                                  |
| `mapType` | `'osm' \| 'amap'`  | `'osm'`               | 地图引擎类型                                |
| `amapKey` | `string`           | `''`                  | 高德地图 API Key（`mapType='amap'` 时必填） |

### MapMarker 接口

```typescript
interface MapMarker {
  /** 纬度 */
  lat: number
  /** 经度 */
  lng: number
  /** Popup 弹窗内容（支持 HTML） */
  popup?: string
}
```

### Events

| 事件名        | 参数                                       | 说明                         |
| ------------- | ------------------------------------------ | ---------------------------- |
| `ready`       | `(map: L.Map \| AMap.Map)`                 | 地图初始化完成，返回地图实例 |
| `markerClick` | `(marker: MapMarker, event: LeafletEvent)` | 标记点击事件                 |

### 内置常量（`data.ts`）

| 导出名               | 类型             | 说明                      |
| -------------------- | ---------------- | ------------------------- |
| `MAP_TYPES`          | `readonly array` | 地图类型选项列表          |
| `DEFAULT_MAP_CONFIG` | `object`         | 默认地图配置              |
| `OSM_TILE_CONFIG`    | `object`         | OSM 瓦片图层配置          |
| `AMAP_CONFIG`        | `object`         | 高德地图 SDK 加载配置     |
| `MAP_ICONS`          | `object`         | Leaflet 默认图标 CDN 地址 |

## ❓ 常见问题

### 1. Leaflet 标记图标不显示？

组件已内置图标修复逻辑（`MAP_ICONS` + `L.Icon.Default.mergeOptions`），无需手动处理。如仍有问题，确认 CDN 地址可达。

### 2. 高德地图不加载？

请确认：

- `mapType` 设置为 `'amap'`
- 传入了有效的 `amapKey`（需前往 [高德开放平台](https://lbs.amap.com/) 申请）

### 3. 地图显示空白/灰色块？

Leaflet 地图在容器尺寸变化后需要刷新。组件已通过 `invalidateSize()` 处理，但如果外层容器使用了延迟动画（如 `v-show` + transition），可在 `ready` 事件中手动调用：

```typescript
function onMapReady(map: any) {
  setTimeout(() => map.invalidateSize(), 300)
}
```
---
