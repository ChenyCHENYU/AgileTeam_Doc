---
outline: "deep"
description: "@robot-admin/file-utils 3.0.4：浏览器与 Vue 3 应用的文件处理工具集。Excel / CSV / ZIP / 图片 / 下载 / 可续传分片传输，统一隔离配置、资源限额、结构化错误与进度模型。"
reviewAfter: "2027-05-16"
---

# file-utils 文件工具集

> **让导入、导出和大文件传输，有统一的边界与反馈。** Excel · CSV · ZIP · Image · Download · Chunk Transfer

`@robot-admin/file-utils` 是面向浏览器与 Vue 3 应用的文件处理工具集，当前版本 **3.0.4**。除格式处理外，还统一提供隔离配置、资源限额、结构化错误、取消信号与进度模型。推荐为每个应用或测试创建独立实例，按模块子路径选择能力。

## 能力地图

| 模块入口 | 提供能力 |
| :---: | :--- |
| `/excel` | 工作簿读取、Excel 导出、模板与报表；内置 SheetJS 官方 `xlsx 0.20.3` |
| `/csv` | RFC 4180 解析／生成、BOM、列结构约束与公式策略 |
| `/file` | 文本、JSON、XML、Base64 与文件读取 |
| `/image` | 压缩、裁剪、格式转换、尺寸处理与可选签名校验 |
| `/zip` | 文件归档、模板与报表打包、路径和资源上限 |
| `/download` | 下载响应归一化、文件名处理与浏览器保存 |
| `/chunk` | 分片上传、断点续传、重试、哈希与 sink 流式下载 |
| `/config` | 隔离上下文、默认限额与兼容全局配置 |

## 快速开始

需要 **Vue ≥3.3.0** peer：

```bash
bun add @robot-admin/file-utils vue@^3.3.0
```

### 创建实例并导出 Excel

```ts
import { createFileUtils } from "@robot-admin/file-utils";

const files = createFileUtils({
  limits: { maxRows: 50_000 },
});

export async function exportContacts() {
  const rows = files.csv.parse("姓名,部门\nRobot,Engineering");
  return files.excel.exportToExcel(rows, { fileName: "contacts.xlsx" });
}
```

实例包含 `csv`、`file`、`image`、`excel`、`zip`、`download()`、`chunkUpload()` 和 `chunkDownload()`；消息和日志默认静默，按需注入应用适配器。

### 只使用 CSV

```ts
import { useCSV } from "@robot-admin/file-utils/csv";

const csv = useCSV();
const rows = csv.parse("name,enabled\nRobot,true");
```

SheetJS 运行时与工作簿类型已随包提供，使用侧不需要安装 `xlsx` 或访问其 CDN；`jszip` 仍是独立运行依赖。CSV、下载、文件、图片、分片与配置子路径不会加载电子表格运行时。

## 可靠性与使用边界

| 关注点 | 当前行为 |
| :---: | :--- |
| 资源使用 | 文件大小、行列、图片像素、ZIP 与缓冲下载各有限额，可按业务覆盖 |
| 数据与路径 | CSV / Excel 默认转义潜在公式；XML 转义；ZIP 路径清洗 |
| 取消与错误 | 主要操作接入 `AbortSignal`，通过 `FileUtilsError.code` 区分失败 |
| 传输进度 | 以字节为基础提供进度、速度和预计剩余时间 |
| 大文件下载 | 传入 sink 时逐块写入；无 sink 时仍受内存缓冲上限约束 |
| 上传完整性 | 默认 sampled 哈希用于协商；全文件 SHA-256 需显式 `hashMode: 'full'` |

服务端仍负责最终内容、权限与合并完整性校验；SSR 能力与默认限额见仓库完整指南。

## 相关链接

- [生态包总览](/robot/packages/preface) · [组件文档 C_Upload](/robot/components/upload)
- [github.com/ChenyCHENYU/robot-admin-packages](https://github.com/ChenyCHENYU/robot-admin-packages) · [npm](https://www.npmjs.com/package/@robot-admin/file-utils)
