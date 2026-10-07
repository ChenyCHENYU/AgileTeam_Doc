---
outline: "deep"
description: "Robot Admin 提供了一套全面的自定义 Vue Composition API 钩子，旨在简化应用程序中的常见任务。这些钩子封装了可重用的逻辑，使您的组件更加简洁和易于维护"
---

# Robot Admin Vue Hooks 使用指南

<div class="hero-banner">
  <h2>🪝 强大的 Vue 组合式 API 钩子集合</h2>
  <p>提供全面的自定义钩子，简化应用程序中的常见任务，让组件更加简洁和易于维护</p>
</div>

Robot Admin 提供了一套全面的自定义 Vue Composition API 钩子，旨在简化应用程序中的常见任务。这些钩子封装了可重用的逻辑，使您的组件更加简洁和易于维护。

## 🎯 可用钩子概览

Robot Admin 项目中提供了以下自定义钩子：

| 钩子名称              | 描述               | 关键特性                       |
| --------------------- | ------------------ | ------------------------------ |
| **useCopy**           | 将文本复制到剪贴板 | 支持多种数据格式，浏览器兼容性 |
| **useDownload**       | 从 API 下载文件    | 支持多种文件类型，通知功能     |
| **useExcel**          | Excel 文件操作     | 导入/导出，模板，多工作表支持  |
| **useFormSubmit**     | 表单提交处理       | 验证，API 集成，防抖           |
| **useImage**          | 图像处理工具       | 优化，转换，预览               |
| **useJsZip**          | 文件压缩与解压     | ZIP 文件创建，解压，进度跟踪   |
| **useOnClickOutside** | 检测外部点击       | 元素引用，自定义处理程序       |
| **usePrintWatermark** | 向页面添加水印     | 文本/图像水印，可配置选项      |
| **useStorage**        | 本地/会话存储封装  | 类型安全，过期，加密           |

::: tip 💡 设计理念
这些钩子遵循 Vue 3 Composition API 的最佳实践，提供响应式状态管理和清晰的 API 接口。
:::

## 📋 详细钩子文档

### useCopy - 剪贴板操作

useCopy 钩子提供了一种简单的方法来将文本复制到剪贴板，支持多种数据格式和浏览器兼容性。

::: code-group

```javascript [基本用法]
import { useCopy } from "@/hooks/useCopy";

// 基本用法
const { copyText } = useCopy();
copyText("这段文本将被复制到剪贴板");
```

```javascript [高级用法]
// 高级用法，带选项
const { copy } = useCopy();
copy(dataObject, {
  dataType: "json",
  formatData: true,
  successTip: "JSON 数据已复制！",
  onSuccess: (text) => console.log("已复制：", text),
});
```

:::

#### API 参考

::: code-group

```javascript [API 接口]
const {
  // 核心方法
  copy,                // 带完整选项的复制
  copyText,            // 快速文本复制
  copyJSON,            // 格式化并复制 JSON
  copyURL,             // 格式化并复制 URL
  copyCode,            // 复制代码片段
  copyRichText,        // 复制带格式的 HTML
  readClipboard,       // 从剪贴板读取（需要权限）

  // 状态
  state,               // 当前状态（加载中，最后复制的文本等）
  canCopy,             // 是否支持复制
  recentlyCopied,      // 最近 2 秒内是否复制了内容

  // 工具
  clearHistory,        // 清除复制历史
  checkSupport,        // 检查浏览器支持详情
  formatters           // 访问数据格式化器
} = useCopy(defaultOptions?)
```

:::

该钩子支持多种数据类型，包括文本、URL、电子邮件、JSON、HTML、Markdown 和 CSV，并为每种类型提供专门的格式化。

### useDownload - 文件下载

useDownload 钩子简化了从 API 端点下载文件的过程，处理浏览器兼容性并提供用户反馈。

::: code-group

```javascript [基本下载]
import { useDownload, FileType, useDownloadExcel } from "@/hooks/useDownload";

// 基本用法
const downloadApi = (params) =>
  fetch("/api/download").then((res) => res.blob());

// 通用下载
await useDownload(downloadApi, {
  fileName: "报告",
  fileType: FileType.PDF,
  params: { id: 123 },
});
```

```javascript [专用下载]
// 常见文件类型的专用下载
await useDownloadExcel(downloadApi, "月度报告", { month: "一月" });
```

:::

#### API 参考

::: code-group

```javascript [下载函数]
// 主下载函数
useDownload(
  api: (params?) => Promise<Blob>,
  config: {
    fileName: string,
    fileType: FileType,
    params?: Record<string, unknown>,
    showNotification?: boolean,
    notificationConfig?: {
      loading?: string,
      success?: string,
      error?: string
    }
  }
): Promise<void>
```

```javascript [专用助手]
// 专用下载助手
useDownloadExcel(api, fileName, params?): Promise<void>
useDownloadCSV(api, fileName, params?): Promise<void>
useDownloadPDF(api, fileName, params?): Promise<void>
useDownloadJSON(api, fileName, params?): Promise<void>

// 获取支持的文件类型
getSupportedFileTypes(): Array<{ label: string, value: FileType }>
```

:::

该钩子处理不同文件类型，使用适当的 MIME 类型，并提供浏览器特定的下载实现，以实现最大兼容性。

### useExcel - Excel 文件操作

useExcel 钩子使用 xlsx 库提供全面的 Excel 文件操作，包括导入、导出和模板生成。

::: code-group

```javascript [读取文件]
import { useExcel } from "@/hooks/useExcel";

const { readFile, exportToExcel, exportMultipleSheets, generateTemplate } =
  useExcel();

// 读取 Excel 文件
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const data = await readFile(file);
  console.log("Excel 数据：", data);
});
```

```javascript [导出数据]
// 导出数据到 Excel
const data = [
  { name: "张三", age: 30 },
  { name: "李四", age: 25 },
];
await exportToExcel(data, { fileName: "用户.xlsx", sheetName: "用户" });

// 导出多个工作表
const sheetsData = {
  用户: [{ name: "张三", age: 30 }],
  订单: [{ id: 1, product: "笔记本电脑", price: 999 }],
};
await exportMultipleSheets(sheetsData, "公司数据.xlsx");
```

:::

#### API 参考

::: code-group

```javascript [Excel API]
const {
  // 状态
  loading, // 加载状态
  error, // 错误信息（如果有）

  // 数据
  workbook, // 当前工作簿
  sheets, // 可用工作表名称
  data, // 从工作表中解析的数据

  // 基本方法
  readFile, // 读取 Excel 文件
  exportToExcel, // 导出数据到 Excel
  exportMultipleSheets, // 导出多个工作表

  // 模板方法
  generateTemplate, // 生成模板文件
  getPresetTemplates, // 获取预定义模板

  // 工具
  clearData, // 清除解析的数据
  clearError, // 清除错误状态
} = useExcel();
```

:::

该钩子处理数据处理、列宽优化，并提供一个简单的 API 用于复杂的 Excel 操作。

### useFormSubmit - 表单提交

useFormSubmit 钩子简化了表单提交，内置验证、API 集成、错误处理和防抖保护。

::: code-group

```vue [表单提交示例]
<script setup lang="ts">
import { useFormSubmit } from "@/hooks/useFormSubmit";

// 在您的组件设置中
const { loading, createSubmit } = useFormSubmit();

// 创建一个带 API 集成的提交处理程序
const loginApi = (formData) => api.post("/login", formData);
const submitLogin = createSubmit(loginApi, {
  successMsg: "登录成功！",
  errorMsg: "登录失败，请检查您的凭据。",
  onSuccess: ({ token }) => {
    // 处理成功登录
    userStore.setToken(token);
    router.push("/dashboard");
  },
  debounce: 500, // 防止多次点击
});
</script>

<template>
  <!-- 在模板中使用 -->
  <n-button :loading="loading" @click="submitLogin(formRef)"> 登录 </n-button>
</template>
```

:::

#### API 参考

::: code-group

```javascript [提交处理]
const {
  loading,          // 响应式加载状态
  createSubmit      // 创建提交处理程序的函数
} = useFormSubmit<T>()

// 创建提交处理程序
const submitFn = createSubmit(
  apiFunction: (model: any) => Promise<ApiResponse>,
  options?: {
    successCode?: string,         // 成功响应代码（默认：'0'）
    successMsg?: string,          // 成功通知消息
    errorMsg?: string,            // 错误通知消息
    onSuccess?: (data) => void,   // 成功回调
    globalErrorHandler?: (error) => void, // 自定义错误处理程序
    debounce?: number | false     // 防抖时间（毫秒，默认：500）
  }
)
```

:::

该钩子自动在提交前验证表单，显示适当的通知，并处理 API 响应。

### useOnClickOutside - 外部点击检测

useOnClickOutside 钩子检测指定元素外的点击，适用于在点击外部时关闭下拉菜单、模态框或其他交互组件。

::: code-group

```vue [外部点击检测]
<script setup lang="ts">
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

// 在您的组件设置中
const dropdownRef = ref(null);
const isOpen = ref(true);

// 设置外部点击检测
useOnClickOutside(dropdownRef, () => {
  isOpen.value = false;
});
</script>

<template>
  <div ref="dropdownRef" v-show="isOpen">
    <!-- 下拉菜单内容 -->
  </div>
</template>
```

:::

### usePrintWatermark - 页面水印

usePrintWatermark 钩子向您的应用程序页面添加水印覆盖层，适用于标记机密信息或保护知识产权。

::: code-group

```javascript [水印使用]
import { usePrintWatermark } from "@/hooks/usePrintWatermark";

// 基本用法，带文本
const { addWatermark, removeWatermark } = usePrintWatermark();

addWatermark({
  content: "机密",
  fontSize: 16,
  opacity: 0.1,
  angle: -30,
});

// 后续，当不再需要水印时
removeWatermark();
```

:::

### useStorage - 存储管理

useStorage 钩子提供增强的浏览器存储，具有类型安全、自动序列化/反序列化、可选过期和加密支持。

::: code-group

```javascript [存储使用]
import { useStorage } from "@/hooks/useStorage";

// 带类型安全的本地存储
const userName = useStorage < string > ("user.name", "访客");
const userSettings =
  useStorage <
  { theme: string, fontSize: number } >
  ("user.setting",
  {
    theme: "light",
    fontSize: 14,
  });

// 更新存储的值
userName.value = "约翰·多伊"; // 自动持久化

// 带过期（24小时）
const authToken = useStorage("auth.token", "", {
  expires: 24 * 60 * 60 * 1000,
  session: false, // 使用 localStorage（默认）
  encrypt: true, // 加密敏感数据
});
```

:::

## 🚀 使用钩子的最佳实践

### 开发建议

| 实践                | 说明                                    | 重要性  |
| ------------------- | --------------------------------------- | ------- |
| **按需导入**        | 解构仅需要的方法和属性，保持代码简洁    | 🟡 重要 |
| **组合钩子**        | 结合多个钩子实现复杂工作流              | 🟡 重要 |
| **TypeScript 类型** | 利用完整的类型定义确保正确使用          | 🔴 关键 |
| **加载状态处理**    | 使用响应式加载状态显示 UI 指示器        | 🟡 重要 |
| **错误处理**        | 使用 try-catch 块优雅地处理异步操作错误 | 🔴 关键 |

### 使用规范

::: code-group

```javascript [错误处理示例]
// ✅ 推荐：正确的错误处理
try {
  await copyJSON(complexData);
} catch (error) {
  console.error("复制 JSON 数据失败：", error);
}
```

```javascript [组合使用示例]
// ✅ 推荐：组合钩子实现完整工作流
const { exportToExcel } = useExcel();
const { useDownloadExcel } = useDownload();

// 结合使用实现完整的 Excel 工作流
const handleExportAndDownload = async (data) => {
  try {
    const excelBlob = await exportToExcel(data);
    await useDownloadExcel(() => Promise.resolve(excelBlob), "导出数据.xlsx");
  } catch (error) {
    console.error("导出失败：", error);
  }
};
```

:::

## 🛠️ 创建自定义钩子

您可以按照内置钩子使用的相同模式创建自己的自定义钩子。推荐的结构如下：

- 为参数和返回值定义清晰的接口
- 使用 ref 或 reactive 管理响应式状态
- 通过方法和状态暴露一致的 API
- 处理边缘情况并提供有意义的错误消息
- 使用 JSDoc 注释文档化您的钩子

::: code-group

```javascript [自定义钩子模板]
// 示例自定义钩子模板
export function useCustomFeature(options = {}) {
  // 状态
  const loading = ref(false);
  const error = ref(null);

  // 方法
  const doSomething = async () => {
    loading.value = true;
    try {
      // 实现逻辑
      return result;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    doSomething,
  };
}
```

:::

::: tip 🎯 开发建议
通过利用这些强大的钩子，您可以显著减少样板代码，并提高组件的可维护性。遵循最佳实践，确保您的应用程序既高效又可靠。
:::

---

<!-- GitHub徽章组件 -->
<GitHubBadges />

<style>
.hero-banner {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  color: white;
  margin: 2rem 0;
}

.hero-banner h2 {
  margin: 0 0 1rem 0;
  font-size: 1.8rem;
  font-weight: bold;
}

.hero-banner p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .hero-banner h2 {
    font-size: 1.5rem;
  }
}
</style>
