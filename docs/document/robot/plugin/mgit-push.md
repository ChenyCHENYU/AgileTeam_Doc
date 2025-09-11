# mgit-push

> 让多平台代码同步不再是噩梦 🚀

专门解决多平台推送中那些让人抓狂的重复操作。每次都要分别推送到 GitHub、Gitee、GitLab？不同平台命令记不住？网络问题导致部分平台推送失败？这个工具就是为了解决这些烦恼而生的。

## 🤔 为什么要做这个？

开发中经常遇到的痛点：

- 😤 **重复操作烦人**：同一份代码要推送多次，每个平台都要敲一遍命令
- 🤦‍♂️ **平台管理混乱**：GitHub 国内访问慢，Gitee 国外用户看不到，两难
- 😮‍💨 **同步容易遗漏**：经常忘记推送某个平台，导致代码不同步
- 🔍 **配置管理复杂**：多个 remote 配置容易搞混，新项目配置麻烦

就想着能不能有个工具，一条命令搞定所有平台，再也不用重复操作了。

## ✨ 现在的效果

### ⚡ 一键多平台推送

一条命令同时推送到所有配置的平台，自动处理失败重试。

### 🌐 智能平台识别

自动识别项目已有的远程仓库配置，智能添加缺失平台。

### 💾 配置持久化

项目配置自动保存，下次推送无需重新设置。

### 🔧 友好交互体验

彩色命令行界面，实时显示推送进度和结果。

## ✨ 工具特性

简单说就是做了这几件事：

- 🎯 **一键推送** - 同时推送到 GitHub、Gitee、GitLab 等多个平台
- 🔧 **智能配置** - 自动识别现有仓库配置，智能补全
- 🎨 **友好界面** - 彩色命令行界面，进度实时可见
- 🛡️ **容错设计** - 单个平台失败不影响其他，自动重试机制
- 📊 **状态监控** - 实时查看各平台仓库状态
- 💾 **配置管理** - 项目级配置文件，一次配置永久使用

## 🚀 快速体验

### 装个包

```bash
npm install -g mgit-push
```

### 试试看

```bash
# 初始化配置（首次使用）
mgit init

# 一键推送到所有平台
mgit push

# 查看各平台状态
mgit status
```

就这么简单！🎉

## 🎭 效果展示

### 标准推送流程

```
🚀 多平台 Git 推送工具
=======================================
版本: 1.2.0
已配置平台: GitHub, Gitee, GitLab

⏳ 开始推送到多个平台...

📍 当前分支: main
📝 最新提交: feat: 添加新功能 (2分钟前)

🔄 推送进度:
✓ GitHub    ████████████████████ 100% ✓
✓ Gitee     ████████████████████ 100% ✓
⚠ GitLab    ████████░░░░░░░░░░░░  40% (重试中...)
✓ GitLab    ████████████████████ 100% ✓

✅ 推送完成！

📊 推送统计:
  • 成功平台: 3/3
  • 推送耗时: 8.5秒
  • 推送分支: main
  • 包含提交: 5个
```

### 状态检查输出

```bash
$ mgit status

📊 多平台仓库状态
=======================================

🔍 仓库信息:
  • 用户名: ChenyCHENYU
  • 仓库名: awesome-project
  • 当前分支: main

📡 平台状态:
  ✓ GitHub   已同步 (最后推送: 2分钟前)
    └─ git@github.com:ChenyCHENYU/awesome-project.git
  
  ✓ Gitee    已同步 (最后推送: 2分钟前)
    └─ git@gitee.com:ChenyCHENYU/awesome-project.git
  
  ⚠ GitLab   未配置
    └─ 运行 'mgit config' 添加此平台

  ✓ GitCode  已同步 (最后推送: 5分钟前)
    └─ git@gitcode.com:ChenyCHENYU/awesome-project.git

💡 提示: 所有平台都已同步到最新状态
```

## 🛠️ 完整命令参考

### 主要功能

| 命令 | 说明 | 使用场景 |
|------|------|----------|
| `init` | 初始化项目配置 | 新项目首次使用 |
| `push` | 推送到所有平台 | 日常代码推送 |
| `status` | 查看平台状态 | 检查同步情况 |
| `config` | 重新配置平台 | 添加/修改平台 |

### 推送选项

| 选项 | 说明 | 适用场景 |
|------|------|----------|
| `--force` | 强制推送 | 需要覆盖远程（谨慎） |
| `--tags` | 包含标签 | 发布版本时 |
| `--yes` | 跳过确认 | 自动化脚本 |
| `--branch <name>` | 指定分支 | 推送特定分支 |

## 🎨 使用场景

### 开源项目发布

```bash
# 同时发布到 GitHub（国际）和 Gitee（国内）
mgit push --tags

# 确保国内外用户都能访问
# GitHub: 国际用户主要入口
# Gitee: 国内用户镜像访问
```

### 团队协作场景

```bash
# 不同团队使用不同平台
# 开发团队: GitLab (内网)
# 开源社区: GitHub (公网)
# 国内镜像: Gitee (加速)

mgit push main  # 一次搞定所有平台
```

### 代码备份策略

```bash
# 多平台备份，永不丢失
mgit init      # 配置所有可用平台
mgit push      # 自动备份到所有平台

# 即使某个平台挂了，代码也安全
```

### CI/CD 集成

```bash
# 在 CI 脚本中使用
mgit push --yes --branch release

# 自动同步到所有平台的 release 分支
```

## 🌐 支持平台详解

### 平台特性对比

| 平台 | 优势 | 最佳用途 | 访问速度 |
|------|------|----------|----------|
| 🐙 GitHub | 全球最大、生态完善 | 开源项目主仓库 | 国外快 |
| 🔥 Gitee | 国内访问快 | 国内用户镜像 | 国内快 |
| 🦊 GitLab | 功能丰富、私有部署 | 企业内部协作 | 自建快 |
| 💻 GitCode | CSDN 生态 | 技术博客联动 | 国内快 |

### 平台配置示例

```json
{
  "username": "ChenyCHENYU",
  "repository": "awesome-project",
  "defaultBranch": "main",
  "platforms": {
    "github": {
      "enabled": true,
      "url": "git@github.com:ChenyCHENYU/awesome-project.git",
      "priority": 1
    },
    "gitee": {
      "enabled": true,
      "url": "git@gitee.com:ChenyCHENYU/awesome-project.git",
      "priority": 2,
      "mirror": true
    },
    "gitlab": {
      "enabled": false,
      "url": "",
      "priority": 3
    },
    "gitcode": {
      "enabled": true,
      "url": "git@gitcode.com:ChenyCHENYU/awesome-project.git",
      "priority": 4
    }
  }
}
```

## 💾 配置系统详解

### 配置文件位置

```
项目根目录/
├── .mgit-push.json      # 项目配置文件
├── .git/                # Git 仓库
└── src/                 # 项目代码
```

### 配置优先级

1. **命令行参数** - 最高优先级
2. **项目配置文件** - `.mgit-push.json`
3. **自动检测** - 从 git remote 读取
4. **默认配置** - 内置默认值

## 🤔 一些说明

**Q: 会影响原有的 git 配置吗？**  
A: 不会，工具只是添加新的 remote，不会修改已有配置。

**Q: 推送失败怎么办？**  
A: 工具会自动重试失败的平台，并显示详细错误信息。可以单独修复后再次推送。

**Q: 如何只推送到特定平台？**  
A: 可以在配置文件中禁用不需要的平台，设置 `"enabled": false`。

**Q: 支持私有仓库吗？**  
A: 完全支持！只要配置了正确的 SSH 密钥或访问令牌即可。

**Q: 配置文件需要提交到仓库吗？**  
A: 建议添加到 `.gitignore`，因为可能包含个人信息。

## 🆘 常见问题排查

### SSH 密钥问题

```bash
# 问题：Permission denied (publickey)
# 解决：检查 SSH 密钥配置

# 1. 检查密钥是否存在
ls ~/.ssh/

# 2. 测试连接
ssh -T git@github.com
ssh -T git@gitee.com

# 3. 添加密钥到 SSH agent
ssh-add ~/.ssh/id_rsa
```

### 网络连接问题

```bash
# 问题：推送超时或失败
# 解决方案：

# 1. 检查网络代理
git config --global http.proxy
git config --global https.proxy

# 2. 使用 HTTPS 而非 SSH
# 修改 .mgit-push.json 中的 url
"url": "https://github.com/username/repo.git"

# 3. 分平台推送
# 暂时禁用有问题的平台
```

### 配置文件问题

```bash
# 问题：配置文件损坏或丢失
# 解决：重新初始化

mgit config  # 重新配置
# 或
rm .mgit-push.json && mgit init
```

### 权限问题

```bash
# 问题：无推送权限
# 检查：

# 1. 确认仓库所有者
git remote -v

# 2. 确认有推送权限
# 在对应平台检查仓库设置

# 3. 使用正确的用户名
git config user.name
git config user.email
```

## 🎉 一起完善

这个工具还在持续改进中，如果你：

- 🐛 遇到了推送问题或 bug
- 💡 有新平台支持需求
- 🔧 想贡献代码或完善文档
- 📝 发现使用文档需要补充

都很欢迎在 GitHub 上参与讨论！

### 开发贡献

```bash
# 本地开发设置
git clone https://github.com/ChenyCHENYU/mgit-push.git
cd mgit-push && npm install

# 本地测试
npm link
mgit --help

# 运行测试
npm test

# 代码检查
npm run lint
```

## 📎 相关链接

[![npm version](https://badge.fury.io/js/mgit-push.svg)](https://badge.fury.io/js/mgit-push)
[![GitHub stars](https://img.shields.io/github/stars/ChenyCHENYU/mgit-push?style=social)](https://github.com/ChenyCHENYU/mgit-push)

如果这个工具让你的多平台推送变得更轻松，给个 star 支持一下吧 ⭐

[🏠 项目仓库](https://github.com/ChenyCHENYU/mgit-push) • [📦 NPM 包](https://www.npmjs.com/package/mgit-push) • [🐛 问题反馈](https://github.com/ChenyCHENYU/mgit-push/issues) • [📚 更新日志](https://github.com/ChenyCHENYU/mgit-push/releases)

---

**让多平台代码同步变得简单高效，告别重复操作的烦恼！** 🚀