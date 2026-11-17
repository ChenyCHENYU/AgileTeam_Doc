---
outline: "deep"
description: "MachReport Node Runtime 与服务端：createReportRuntime（describe/validate/prepare/export）、默认预算与任务队列、OpenAPI 3.1 与 Java 17 门面、按页文档存储 DocumentStore、浏览器 Worker 与持久任务。"
reviewAfter: "2027-05-16"
---

# MachReport Node Runtime

MachReport 的模板、参数、字段校验和分页核心不依赖 Vue。`/server` 提供无 HTTP 框架的运行时；`/server/node` 提供 Node 线程隔离；`/worker` 提供浏览器原生 Worker 适配。PDF、Excel 只在调用相应导出时加载。

> 🔍 **检索关键词**：createReportRuntime、createProviderReport、describe、validate、prepare、export、exportPrepared、budget、maxRows、maxPages、maxCells、maxDurationMs、createReportTaskQueue、concurrency、maxQueued、enqueue、cancel、progress、createReportOpenApi、reportHttpError、MachReportClient、basePath、ReportDocumentStore、createMemoryReportDocumentStore、writeReportDocument、readReportDocumentPages、openFileReportDocumentStore、createReportDocumentSource、ReportDocumentPreview、createBrowserReportExecutor、serveReportWorker、createNodeReportExecutor、createReportJobService、openFileReportJobStore、runLabelStream、customFontFaces、stats、revisions

## 最小 Node 接入

```ts
import { writeFile } from "node:fs/promises";
import { createProviderReport, createTableTemplate } from "@agile-team/mach-report";
import { createReportRuntime } from "@agile-team/mach-report/server";

const reports = {
  sales: createProviderReport({
    template: createTableTemplate({
      title: "销售明细",
      columns: [{ header: "商品", field: "name" }, { header: "金额", field: "amount" }]
    }),
    params: [{ field: "date", type: "date", required: true }],
    dataSchema: { detail: { fields: [
      { field: "name", type: "text", required: true },
      { field: "amount", type: "number", required: true }
    ] } },
    provider: {
      query: async ({ params, signal }) => ({
        datasets: await salesApi.query(params, { signal }),   // 返回 { detail: [...] }
        revision: "业务接口返回的修订号"
      })
    }
  })
};

const runtime = createReportRuntime({ reports });
const request = { reportIds: ["sales"], params: { date: "2026-10-16" } };
const prepared = await runtime.prepare(request);
console.log(prepared.stats, prepared.revisions, prepared.diagnostics);
const file = await runtime.export({ ...request, format: "xlsx" });
await writeFile("sales.xlsx", file.bytes);
```

`salesApi` 是宿主业务客户端，库不规定 URL、鉴权或响应包装；已有 `load` / `defineReport` / 静态 `datasets` 继续使用。

## Runtime 方法

| 方法 | 结果 |
| --- | --- |
| `describe(ids?)` | 参数元数据、`paramsSchema`、各数据集 `datasetsSchema`、Provider 可选能力 |
| `validate(request)` | `{ ok, values, typedValues, issues }`，只校验已声明参数，不取数 |
| `prepare(request)` | `{ plan, diagnostics, stats, revisions }`，实际取数、校验与分页 |
| `export(request)` | `{ bytes, format, contentType, diagnostics, stats, revisions }`，支持 PDF / XLSX |
| `exportPrepared` / `generation.exportInstance` | 确认结果后固定导出 / 已保存实例导出，复用同一编码管线 |

`stats` 包含行数、页数、单元格数、执行时长和导出字节数。中文 PDF 传 `pdf.customFontFaces: { regular, bold, italic, boldItalic }` 字体字节——运行时自动用同一字体度量分页并传给 PDF 输出。

## 预算、队列和取消

默认预算：**100000 行、10000 页、2000000 渲染单元格、100000000 输出字节、120000ms**，可通过 `budget` 显式调整：

```ts
const runtime = createReportRuntime({
  reports,
  budget: { maxRows: 50_000, maxPages: 2_000, maxCells: 1_000_000 }
});
```

分页前检查行数并预检逻辑规模；页预算在追加超限页前中止，多报表请求共用额度；文件字节数在生成后检查。`paginateTemplate` 可选传 `{ maxPages, maxCells, maxChartComponents }`，超限抛结构化错误（Runtime 统一归为 `ReportRuntimeError`，`code="budget"`）。

任务队列（并发与排队上限）：

```ts
import { createReportTaskQueue } from "@agile-team/mach-report/server";

const queue = createReportTaskQueue({ concurrency: 2, maxQueued: 10 });
const task = queue.enqueue(({ signal }) => runtime.export({ ...request, format: "pdf", signal }));
const file = await task.result;
task.cancel();          // 发送取消
// task.status / task.progress 用于任务面板；自定义任务通过 reportProgress(completed, total?) 报进度
```

## HTTP 契约与 Java 门面

`createReportOpenApi(runtime.describe(authorizedIds))` 生成 **OpenAPI 3.1** 文档（`GET /reports`、`POST /reports/{id}/prepare` 与 PDF/XLSX 下载）；`reportHttpError` 统一参数、预算、取消、超时和过载的状态映射。它们不创建 HTTP 服务，也不替宿主判断授权范围。

可复制的 `MachReportClient.java`（Java 17 标准库门面）提供 `prepare` / `export` 与受限 `send`：

```java
var reports = new MachReportClient(URI.create("http://127.0.0.1:8620"));
var response = reports.prepare("sales", mapper.writeValueAsString(params),
    Duration.ofSeconds(30), "request-42");
```

Java 不直接执行 npm 包——由已有 Java 后端完成认证、数据查询、事务与保存，通过 JSON/HTTP 调用 Node 运行时。参考实现见仓库 `examples/server-java-node`。

| 宿主接口职责 | 对应运行时调用 |
| --- | --- |
| 描述已授权报表的参数和字段 | `runtime.describe(authorizedIds)` |
| 校验查询参数 | `runtime.validate(request)` |
| 生成预览计划或快照 | `runtime.prepare(request)` |
| 下载报表文件 | `runtime.export(request)` |

## 按页文档存储（渐进预览）

需要提前展示已排出的页面或按页持久化时，使用可选的 `ReportDocumentStore`：

```ts
import {
  createMemoryReportDocumentStore, writeReportDocument, readReportDocumentPages
} from "@agile-team/mach-report/server";
import { RENDER_PLAN_SCHEMA_VERSION, paginateTemplatePages } from "@agile-team/mach-report";

const documents = createMemoryReportDocumentStore();
const manifest = await writeReportDocument(documents, {
  scope: authorizedTenantId, id: "run-42", version: generationId,
  plan: { schemaVersion: RENDER_PLAN_SCHEMA_VERSION },
  pages: paginateTemplatePages(template, datasets), signal
});
const window = await readReportDocumentPages(documents, {
  scope: authorizedTenantId, id: manifest.id, version: manifest.version,
  fromPage: 0, limit: 4, signal
});
```

- 低层 `create → append → complete` 支持生产者与读者并行：append 以 revision 做 CAS，已提交页不覆盖，complete 后禁止追加
- 读取必须指定 `version`（不可复用的生成实例身份）；`scope` 必须来自宿主已认证上下文
- 默认最多 32 份文档、总计 64MB、每份 10000 页、单页 4MB；满容量显式报错，不驱逐正在查看的文档
- Node 可用 `openFileReportDocumentStore({ directory, ...budget })`（`/server/node`）：页面存文件、单页读取、关闭后可重新打开（目录独占锁 + 原子 rename，不支持多进程）

前端对接组件为 `ReportDocumentPreview`（远程页窗口预览），`createReportDocumentSource(store, identity, { export })` 复用存储的页窗口。

## Worker 与持久任务

| 入口 | API | 场景 |
| --- | --- | --- |
| `/worker` | `createBrowserReportExecutor` / `serveReportWorker` | 浏览器原生 Worker，运行同步分页可硬取消；有界队列限制并发和排队 |
| `/server/node` | `createNodeReportExecutor` / `serveNodeReportWorker` | Node worker_threads 线程隔离 |
| `/server` | `createReportJobService` / `ReportJobStore` | 持久任务协议：幂等、租约、取消、失败重试 |
| `/server/node` | `openFileReportJobStore` / `reportArtifactSha256` | 单进程文件适配器与输出摘要 |
| `/server` | `runLabelStream()` | 大量异步标签分批交付：等待归档回执后消费下一块，不缓存全部文件 |

默认同步执行仅在阶段边界检查取消，不宣称阻塞期间可抢占；需要硬取消的同步分页使用 Worker 执行器。

## 相关文档

[Vue 组件](/mach/report-vue) · [参数与数据](/mach/report-data) · [输出与导出](/mach/report-export) · [工业标签](/mach/report-labels)
· 仓库文档：[服务端](https://github.com/ChenyCHENYU/MachReport/blob/main/docs/SERVER.md) · [持久任务](https://github.com/ChenyCHENYU/MachReport/blob/main/docs/DURABLE_JOBS.md)
