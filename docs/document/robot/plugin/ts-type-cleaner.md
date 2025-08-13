# Ts Type Cleaner

> 让 TypeScript 类型检查不再是噩梦 ✨

专门解决 Vue3 + TypeScript 项目中那些让人头疼的类型问题。每次类型报错都要翻半天？不知道哪些类型定义重复了？这个工具就是为了这些烦恼而生的。

## 🎯 为什么要做这个？

Vue3 + TypeScript 开发中经常遇到的痛点：

- 😤 **类型错误难定位**：TS 报错信息复杂，找到出错位置费劲
- 🤦‍♂️ **重复定义满天飞**：不知不觉定义了一堆重复类型，代码变得混乱
- 😮‍💨 **垃圾类型清理难**：哪些类型没用了？手动清理容易出错
- 🔍 **项目健康度不明**：不知道类型系统质量如何，心里没底

就想着能不能有个工具，一键分析这些问题，让类型管理变得简单一些。

## ✨ 现在的效果

### 🔍 精准定位问题

自动扫描 src 目录，准确找出类型错误的具体位置。

### 📊 量化代码质量

给项目打个健康度分数，让类型质量一目了然。

### 🗑️ 智能清理建议

找出重复和未使用的类型，提供具体的清理建议。

### 📋 详细报告生成

生成漂亮的控制台输出和 Markdown 报告，便于团队协作。

## ✨ 工具特性

简单说就是做了这几件事：

- 🔍 **智能扫描** - 只看 src 目录，支持 .ts、.tsx、.vue 文件
- 🎯 **精准检测** - 使用 TS 编译器 API，保证结果准确
- 🎨 **清晰展示** - 彩色输出和进度条，信息分类明确
- 📊 **健康评分** - 给项目类型质量打分，量化改进效果
- 📋 **报告生成** - 控制台 + Markdown 双重报告
- ⚡ **快速模式** - 适合 CI/CD 的快速检查

## 🚀 快速体验

### 安装个包

```bash
npm install vue-type-checker -D
```

### 试试看

```bash
# 快速检查
npx vue-type-checker check

# 完整分析
npx vue-type-checker analyze

# 看看统计
npx vue-type-checker summary
```

## 🎭 效果展示

### 检查结果

```
──────────────────────────────────────────────────
🎯 TypeScript 类型检查
──────────────────────────────────────────────────
📊 健康度评分: 85/100
🚨 类型错误: 0
⚠️ 重复定义: 2
🗑️ 未使用类型: 5
──────────────────────────────────────────────────

🎉 检查通过！
```

### 详细分析

```
═══════════════════════════════════════════════════════════
🛠️  TypeScript 类型分析报告
═══════════════════════════════════════════════════════════

📊 健康度评分
─────────────────────────
🟢 综合评分: 85/100 (良好)
[████████████████████████░░░░░░] 85%

⚠️ 重复类型定义 (2)
─────────────────────────────────────────────────

🔄 User
  1. src/types/user.ts:5 (interface)
  2. src/components/User.vue:12 (interface)

🗑️ 未使用类型 (8)
─────────────────────────────────────────────────
• ApiResponse    • UserConfig     • ThemeOptions   • FormState

💡 改进建议
─────────────────────────
1. ⚠️ 合并或重命名 2 个重复类型
2. 🗑️  清理 8 个未使用类型
```

## 🎨 检测能力

### 类型错误检测

能发现这些常见问题：

- 类型不匹配、参数错误
- 找不到名称、属性不存在
- 对象可能为空或未定义
- 其他 TypeScript 编译错误

### 重复类型检测

- 跨文件的同名类型定义
- 自动排除框架类型
- 提供具体位置和合并建议

### 未使用类型检测

- 定义但没引用的类型
- 排除导出类型（可能被外部使用）
- 安全清理建议

## 🛠️ 使用方式

### 三种模式

**快速检查 - 适合 CI**

```bash
npx vue-type-checker check --threshold 80
```

**完整分析 - 生成报告**

```bash
npx vue-type-checker analyze --verbose
```

**统计概览 - 了解现状**

```bash
npx vue-type-checker summary
```

### 集成到项目

**Package.json 脚本**

```json
{
  "scripts": {
    "type:check": "vue-type-checker check",
    "type:analyze": "vue-type-checker analyze",
    "precommit": "vue-type-checker check --threshold 80"
  }
}
```

**GitHub Actions**

```yaml
- name: Type check
  run: npx vue-type-checker check --threshold 75
```

### 配置选项

| 参数          | 说明       | 默认值   |
| ------------- | ---------- | -------- |
| `--root`      | 项目根目录 | 当前目录 |
| `--threshold` | 健康度阈值 | 70       |
| `--verbose`   | 详细输出   | false    |
| `--no-report` | 不生成报告 | false    |

### 使用示例

**个人项目**

```bash
npx vue-type-checker analyze --verbose
```

**团队项目**

```bash
npx vue-type-checker check --threshold 85
```

**CI 环境**

```bash
npx vue-type-checker check --threshold 75 --no-report
```

## 🔧 技术实现

主要技术点：

**分析引擎**

- 基于 TypeScript Compiler API
- 智能文件过滤（只扫描 src 目录）
- 支持 Vue SFC 的 `<script lang="ts">` 块

**健康度计算**

- 类型错误：50% 权重
- 重复定义：25% 权重
- 未使用类型：15% 权重

**性能优化**

- 并行文件分析
- 增量编译缓存
- 内存使用优化

## 🤔 一些说明

**Q: 支持哪些文件？**  
A: .ts、.tsx、.vue (需要 `<script lang="ts">`)

**Q: 会扫描 node_modules 吗？**  
A: 不会，只扫描 src 目录，自动跳过 .d.ts、test 文件。

**Q: 健康度怎么算的？**  
A: 主要看类型错误（权重最高）、重复定义和未使用类型。

**Q: 可以用在 monorepo 吗？**  
A: 可以，用 `--root` 指定每个包的目录。

**Q: 报告保存在哪？**  
A: 默认在项目根目录的 `type-reports/` 文件夹。

## 🎉 一起完善

这个工具还在持续改进中，如果你：

- 🐛 发现了问题或 bug
- 💡 有好的改进想法
- 🔧 想贡献代码

都很欢迎在 GitHub 上参与讨论！

---

## 📎 相关链接

[![npm version](https://img.shields.io/npm/v/ts-type-cleaner.svg)](https://www.npmjs.com/package/ts-type-cleaner)
[![GitHub stars](https://img.shields.io/github/stars/ChenyCHENYU/ts-type-cleaner?style=social)](https://github.com/ChenyCHENYU/ts-type-cleaner)

如果这个工具帮你解决了类型管理的烦恼，给个 star 支持一下吧 ⭐

[GitHub 仓库](https://github.com/ChenyCHENYU/ts-type-cleaner) • [NPM 包](https://www.npmjs.com/package/ts-type-cleaner) • [问题反馈](https://github.com/ChenyCHENYU/ts-type-cleaner/issues)
