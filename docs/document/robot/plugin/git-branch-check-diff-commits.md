# git-branch-check-diff-commits

> 让 Git 分支对比不再让人头大 ✨

专门解决 Git 分支管理中那些让人抓狂的问题。每次合并前不知道分支状态？搞不清代码是否已经同步？这个工具就是为了这些烦恼而生的。

## 🎯 为什么要做这个？

Git 分支管理中经常遇到的痛点：

- 😤 **分支状态不明**：不知道功能分支是否已经合并到主分支
- 🤦‍♂️ **代码差异难判断**：搞不清是真有新代码，还是只是合并提交的差异
- 😮‍💨 **发布流程不透明**：不知道自动化流程是否成功执行

团队开发时这些问题更突出，经常因为搞不清分支状态而出现重复合并或漏合并。

## ✨ 现在的效果

### 🎯 智能状态识别

自动分析分支关系，一眼看出代码是否真的有差异。

### 🌊 自动化流程检测

能识别 `feature → dev → main` 这样的发布流程，显示具体的合并链路。

### 📊 精准差异分析

排除合并提交的干扰，只关注真正的功能代码差异。

### 💡 智能操作建议

基于分析结果给出具体的下一步操作建议。

## ✨ 工具特性

简单说就是做了这几件事：

- 🎯 **智能分析** - 自动识别代码是否真的有差异，不被合并提交迷惑
- 🌊 **流程追溯** - 检测自动化发布流程，显示合并历史
- 📊 **精准对比** - 排除噪音，只看实际的功能代码差异
- 🎨 **清晰展示** - 彩色输出和层级结构，信息一目了然
- 💡 **操作建议** - 告诉你下一步该做什么，不用再纠结
- 🔧 **多种集成** - 支持 CLI、API、CI/CD 等各种使用方式

## 🚀 快速体验

### 安装个包

```bash
npm install -g git-branch-check-diff-commits
```

### 试试看

```bash
# 看看当前分支和 main 的关系
gbd main

# 检查开发分支
gbd develop

# 检查功能分支是否已合并
gbd feature/user-login
```

## 🎭 效果展示

### 自动化流程完成后

```
╭─ 🔍 Git 分支智能对比分析 ─╮
├─ 🧹 工作区状态
✅ 工作区干净，可以安全进行分支操作

├─ 🌊 自动化流程分析
🔀 检测到自动化发布流程
  │ 1️⃣ feature/user-login → dev (f8299de)
  │ 2️⃣ dev → main (d7fdf79)

├─ 📊 代码状态
 🎯 代码已一致 - 分支已合并
  │ ✨ 通过自动化流程合并

├─ 🎯 智能建议
✅ 无需操作 - 代码已同步
ℹ️ 可删除已合并的本地分支
╰────────────────────────────────────────────────────╯
```

### 有真实代码差异时

```
╭─ 🔍 Git 分支智能对比分析 ─╮
├─ 📊 代码状态
 ⚠️  有新代码未同步 - 实际领先 3 个提交

├─ 📄 实际代码差异
  │ 领先的功能提交: 3
  │ 有文件变更差异
  │ 共同基础: abc1234

├─ 🎯 智能建议
ℹ️ 推送新代码
  │ git push origin feature/awesome
╰────────────────────────────────────────────────────╯
```

## 🎨 设计细节

### 智能状态识别

能识别这几种状态：

- **代码完全一致** - 分支指向同一提交
- **代码已一致 - 分支已合并** - 功能已完全合并
- **代码一致 - 只有合并提交差异** - 实质相同，历史不同
- **有新代码未同步** - 存在真实功能差异

### 自动化流程检测

- 自动识别 `feature → dev → main` 发布流程
- 显示具体的合并链路和提交哈希
- 区分自动化合并和手动操作

### 输出设计

- 使用框线和图标的层级结构
- 状态用颜色区分（绿色成功、黄色警告）
- 建议操作用具体命令展示

## 🛠️ 使用方式

### 基本命令

```bash
# 对比分支
gbd main                    # 和主分支对比
gbd develop                # 和开发分支对比
gbd origin/feature/xxx     # 和远程分支对比

# 选项
gbd main --json            # JSON 格式输出
gbd main --no-fetch        # 跳过自动 fetch
```

### 项目集成

**Package.json 脚本**

```json
{
  "scripts": {
    "check-main": "gbd main",
    "check-dev": "gbd develop",
    "sync-status": "gbd origin/main --json"
  }
}
```

**GitHub Actions**

```yaml
- name: 检查分支状态
  run: |
    npm install -g git-branch-check-diff-commits
    gbd main --json > branch-status.json
```

### 编程式调用

```javascript
import { analyzeBranches } from "git-branch-check-diff-commits";

const result = await analyzeBranches("main");
console.log(result.relationship.type); // "merged" | "ahead" | "synchronized" 等
console.log(result.realCodeDiff.realDiff); // 是否有真实代码差异
```

## 🔧 技术实现

主要技术点：

**分支分析**

- 使用 Git 底层命令分析分支关系
- 计算真实的代码差异（排除合并提交）
- 识别共同基础和分叉点

**流程检测**

- 分析提交历史中的合并模式
- 识别自动化工具的合并特征
- 构建合并链路图

**状态判断**

- 综合多个指标判断分支状态
- 区分"已合并"和"代码一致"
- 提供置信度评估

## 🤔 一些说明

**Q: 什么是"真实代码差异"？**  
A: 排除纯合并提交后的实际功能代码差异，避免被合并历史误导。

**Q: 自动化流程检测准确吗？**  
A: 基于提交信息和时间分析，大部分情况下能准确识别。

**Q: 支持哪些 Git 工作流？**  
A: 支持 Git Flow、GitHub Flow 等常见工作流。

**Q: 可以用在 CI/CD 中吗？**  
A: 可以，支持 JSON 输出格式，便于脚本处理。

**Q: 会修改 Git 仓库吗？**  
A: 不会，只是分析和展示，不做任何修改操作。

## 🎉 一起完善

这个工具还在不断改进中，如果你：

- 🐛 遇到分析不准确的情况
- 💡 有更好的状态判断思路
- 🔧 想改进检测算法

都很欢迎在 GitHub 上讨论交流！

---

## 📎 相关链接

[![npm version](https://img.shields.io/npm/v/git-branch-check-diff-commits.svg)](https://www.npmjs.com/package/git-branch-check-diff-commits)
[![GitHub stars](https://img.shields.io/github/stars/ChenyCHENYU/git-branch-diff?style=social)](https://github.com/ChenyCHENYU/git-branch-diff)

如果这个工具让你的分支管理变得更轻松，给个 star 支持一下吧 ⭐

[GitHub 仓库](https://github.com/ChenyCHENYU/git-branch-diff) • [NPM 包](https://www.npmjs.com/package/git-branch-check-diff-commits) • [问题反馈](https://github.com/ChenyCHENYU/git-branch-diff/issues)
