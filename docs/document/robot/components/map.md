---
outline: 'deep'
---

# C_Map 地图组件

> 🗺️ 基于 [Leaflet](https://leafletjs.com/) 封装的通用地图组件，开箱即用，同时支持免费的 OpenStreetMap 和国内商业高德地图

## 🚀 特性

- **🌍 双地图引擎**: OpenStreetMap（免费，无需 Key）和高德地图（需申请 API Key）
- **📍 标记点管理**: 支持添加任意数量的地图标记，标记可绑定弹出气泡文本
- **🖱️ 标记点交互**: 点击标记触发事件，可在回调中获取标记数据
- **🔄 响应式更新**: 标记列表、中心点、缩放级别均支持响应式动态更新
- **🔀 地图类型切换**: 运行时在 OSM 和高德之间无缝切换，自动重新初始化
- **📐 自定义尺寸**: 高度通过 CSS 字符串自由设置，宽度自动撑满容器
- **🧭 定位支持**: 配合浏览器 Geolocation API 实现一键定位
- **⚡ 懒加载高德 SDK**: 高德 JS SDK 仅在切换到高德地图时动态注入，不影响首屏
- **🌗 主题适配**: 组件背景自动跟随系统明暗主题

## 📦 安装

::: code-group

```bash [bun (推荐)]
bun add leaflet
bun add -D @types/leaflet
```

```bash [pnpm]
pnpm add leaflet
pnpm add -D @types/leaflet
```

```bash [yarn]
yarn add leaflet
yarn add -D @types/leaflet
```

```bash [npm]
npm install leaflet
npm install -D @types/leaflet
```

:::

> **说明**: 高德地图 SDK 通过动态 `<script>` 标签懒加载，无需 npm 安装。

## 🎯 快速开始

### 最简用法

```vue {3,6,9}
<template>
  <!-- 默认以北京为中心 -->
  <C_Map />

  <!-- 指定中心点和缩放级别 -->
  <C_Map
    :center="[31.2304, 121.4737]"
    :zoom="12"
  />

  <!-- 自定义高度 -->
  <C_Map height="600px" />
</template>

<script setup>
  // 无需导入，已全局注册
</script>
```

::: details 📍 三种常见场景 - 快速上手

```vue {5-10,17-26,34-44}
<template>
  <div>
    <!-- 1. 纯展示地图 -->
    <section>
      <h4>城市地图</h4>
      <C_Map
        :center="[31.2304, 121.4737]"
        :zoom="13"
        height="300px"
      />
    </section>

    <!-- 2. 带标记点 -->
    <section>
      <h4>门店分布</h4>
      <C_Map
        :center="[39.9042, 116.4074]"
        :zoom="11"
        height="350px"
        :markers="storeMarkers"
        @marker-click="onMarkerClick"
      />
    </section>

    <!-- 3. 高德地图（需 API Key） -->
    <section>
      <h4>高德地图</h4>
      <C_Map
        map-type="amap"
        :amap-key="amapKey"
        :center="[39.9042, 116.4074]"
        :zoom="12"
        height="350px"
        :markers="storeMarkers"
        @ready="onMapReady"
      />
    </section>
  </div>
</template>

<script setup>
  const amapKey = 'your-amap-api-key'

  const storeMarkers = [
    { lat: 39.9042, lng: 116.4074, popup: '总部 · 北京' },
    { lat: 31.2304, lng: 121.4737, popup: '上海分部' },
    { lat: 23.1291, lng: 113.2644, popup: '广州分部' },
  ]

  function onMarkerClick(marker, event) {
    console.log('点击了标记:', marker.popup, marker.lat, marker.lng)
  }

  function onMapReady(mapInstance) {
    console.log('高德地图就绪:', mapInstance)
  }
</script>
```

:::

::: details 🔧 编程式控制 - 通过 ready 事件操作地图实例

```vue {5-6,20-30}
<template>
  <div>
    <C_Map
      ref="mapRef"
      :center="center"
      :zoom="zoom"
      height="400px"
      :markers="markers"
      @ready="onMapReady"
      @marker-click="onMarkerClick"
    />
    <div class="controls">
      <n-button @click="flyToShanghai">飞到上海</n-button>
      <n-button @click="addDynamicMarker">动态添加标记</n-button>
    </div>
  </div>
</template>

<script setup>
  import L from 'leaflet'

  let mapInstance = null
  const center = ref([39.9042, 116.4074])
  const zoom = ref(10)
  const markers = ref([{ lat: 39.9042, lng: 116.4074, popup: '北京' }])

  // 通过 ready 事件获取原始 Leaflet 实例
  function onMapReady(map) {
    mapInstance = map
    console.log('地图就绪，可调用所有 Leaflet API')
  }

  // 飞行动画到目标城市
  function flyToShanghai() {
    mapInstance?.flyTo([31.2304, 121.4737], 12, {
      animate: true,
      duration: 1.5,
    })
  }

  // 响应式更新标记（自动重渲染）
  function addDynamicMarker() {
    markers.value.push({
      lat: 31.2304 + (Math.random() - 0.5) * 0.5,
      lng: 121.4737 + (Math.random() - 0.5) * 0.5,
      popup: `随机标记 ${markers.value.length + 1}`,
    })
  }

  function onMarkerClick(marker, event) {
    console.log('点击了标记:', marker)
  }
</script>
```

:::

## 🔧 完整 API

### Props

| 属性      | 类型               | 默认值                | 说明                                      |
| --------- | ------------------ | --------------------- | ----------------------------------------- |
| `height`  | `string`           | `'400px'`             | 地图高度，支持任意 CSS 高度字符串         |
| `center`  | `[number, number]` | `[39.9042, 116.4074]` | 地图中心点 `[纬度, 经度]`，默认北京天安门 |
| `zoom`    | `number`           | `10`                  | 初始缩放级别，范围 1（全球）~ 19（街道）  |
| `markers` | `MapMarker[]`      | `[]`                  | 标记点列表，支持响应式数组                |
| `mapType` | `'osm' \| 'amap'`  | `'osm'`               | 地图引擎，`osm` 免费，`amap` 需要 API Key |
| `amapKey` | `string`           | `''`                  | 高德地图 API Key，`mapType='amap'` 时必填 |

### MapMarker 标记点

| 字段    | 类型     | 必填 | 说明                               |
| ------- | -------- | ---- | ---------------------------------- |
| `lat`   | `number` | ✅   | 纬度（-90 ~ 90）                   |
| `lng`   | `number` | ✅   | 经度（-180 ~ 180）                 |
| `popup` | `string` | ❌   | 标记气泡文本，有值时标记可点击弹窗 |

### Events

| 事件名        | 参数                              | 说明                                                          |
| ------------- | --------------------------------- | ------------------------------------------------------------- |
| `ready`       | `(map: any)`                      | 地图初始化完成，OSM 返回 Leaflet 实例，高德返回 AMap.Map 实例 |
| `markerClick` | `(marker: MapMarker, event: any)` | 点击标记点时触发，返回标记数据和原生事件对象                  |

## 🗺️ 地图引擎对比

| 功能         | OpenStreetMap              | 高德地图                      |
| ------------ | -------------------------- | ----------------------------- |
| **费用**     | 完全免费                   | 免费额度，超量收费            |
| **API Key**  | 不需要                     | 需要申请                      |
| **国内速度** | 较慢，依赖海外 CDN         | 快，国内服务器                |
| **国内合规** | 坐标系 WGS84，境内地图偏移 | 坐标系 GCJ-02，符合国内规范   |
| **适用场景** | 开发测试、海外项目         | 国内生产项目                  |
| **Leaflet**  | ✅ 基于 Leaflet，API 完整  | JS SDK，通过 `ready` 获取实例 |

## ⚡ 注意事项

> [!WARNING]
> **高德坐标系**: 高德地图使用 GCJ-02 坐标系（国测局坐标），而非 GPS 的 WGS84。如果你的标记坐标来源于 GPS 设备或 Google Maps，需要进行坐标转换，否则位置会有偏移。

> [!NOTE]
> **OSM 国内访问**: OpenStreetMap 的瓦片服务器在境外，国内访问可能较慢。生产项目建议自建瓦片服务或使用高德地图。

> [!TIP]
> **高德 API Key 申请**: 访问 [高德开放平台](https://lbs.amap.com/api/javascript-api/guide/create/) 注册并申请 Web 端（JS API）Key，个人开发者每日有免费配额。

## 🐛 常见问题

::: details ❌ 地图显示灰色/空白

通常是容器高度为 0 导致。确保父容器有明确高度，或通过 `height` prop 指定：

```vue
<!-- ✅ 正确 - 通过 prop 指定高度 -->
<C_Map height="400px" />

<!-- ❌ 错误 - 父容器高度为 0 -->
<div>
  <C_Map />  <!-- height 默认 400px，但父 div 没有高度时可能异常 -->
</div>
```

:::

::: details ❌ Leaflet 图标不显示（404 错误）

这是 Leaflet 在 Webpack/Vite 打包时的经典问题，组件已内置修复：

```typescript
// 组件内部已处理，无需用户操作
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions(MAP_ICONS) // 使用 CDN 图标地址
```

如果仍出现图标问题，可通过自定义图标解决：

```ts
const customIcon = L.icon({
  iconUrl: '/icons/map-marker.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})
```

:::

::: details ❌ 高德地图标记坐标偏移

高德地图使用 GCJ-02 坐标系，GPS 坐标（WGS84）需要转换：

```typescript
// 简单的 WGS84 → GCJ-02 转换（近似算法）
function wgs84ToGcj02(lat: number, lng: number) {
  const a = 6378245.0
  const ee = 0.00669342162296594323
  let dLat = transformLat(lng - 105.0, lat - 35.0)
  let dLng = transformLng(lng - 105.0, lat - 35.0)
  const radLat = (lat / 180.0) * Math.PI
  let magic = Math.sin(radLat)
  magic = 1 - ee * magic * magic
  const sqrtMagic = Math.sqrt(magic)
  dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * Math.PI)
  dLng = (dLng * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * Math.PI)
  return { lat: lat + dLat, lng: lng + dLng }
}
```

:::

::: details ❌ 切换地图类型后旧地图残留

版本内已处理，切换 `mapType` 时会自动销毁旧实例、重新初始化：

```vue
<!-- 响应式切换，无需手动处理 -->
<C_Map :map-type="currentType" :amap-key="amapKey" />

<script setup>
  // 直接切换即可，组件内部 watch 会自动重建
  const currentType = ref('osm')
  function switchToAmap() {
    currentType.value = 'amap'
  }
</script>
```

:::

## 🔄 未来规划

- [ ] 支持 Mapbox 地图引擎
- [ ] 聚合标记（大量 Marker 自动聚合）
- [ ] 自定义标记图标（Icon / DivIcon）
- [ ] 绘制多边形 / 折线
- [ ] 热力图层支持
- [ ] 地理围栏
- [ ] 路线规划（依赖高德路线 API）

## 📚 相关资源

- [数据配置](./data.ts)
- [演示页面源码](../../views/demo/36-map/index.vue)
- [Leaflet 官方文档](https://leafletjs.com/)
- [高德开放平台](https://lbs.amap.com/api/javascript-api/guide/create/)

<!--@include: ./snippets/contribute.md -->
