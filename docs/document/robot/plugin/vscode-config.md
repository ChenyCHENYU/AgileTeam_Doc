# @agile-team/vscode-config

> 让 VSCode 配置统一不再是团队噩梦 ⚙️

专门解决多人协作中那些让人头疼的 VSCode 配置问题。每次新人入职都要花半天配置开发环境？团队成员的编辑器设置五花八门导致代码风格不一？插件版本不同引发莫名其妙的问题？这个工具就是为了这些烦恼而生的。

## 🤔 为什么要做这个？

团队开发中经常遇到的痛点：

- 😤 **环境配置耗时长**：新人入职光配置 VSCode 就要大半天，还容易出错
- 🤦‍♂️ **团队设置不统一**：每个人的编辑器配置不同，代码格式乱七八糟
- 😮‍💨 **插件管理混乱**：不知道该装哪些插件，版本不一致导致奇怪问题
- 🔍 **配置更新困难**：团队配置升级了，怎么同步到每个人的机器上？

就想着能不能有个工具，一条命令就能让所有人的 VSCode 保持一致，大家专注写代码就行。

## ✨ 现在的效果

### ⚡ 一键标准化

60 秒内完成从配置到插件的全套安装，新人入职即刻上手。

### 🌐 智能网络适配

GitHub + Gitee 双源保障，国内外网络环境都能稳定下载。

### 💾 安全备份机制

自动备份现有配置，出问题可以一键回滚，不怕搞坏环境。

### 🔧 全面状态监控

随时检查配置健康度，团队环境一致性一目了然。

## ✨ 工具特性

简单说就是做了这几件事：

- 🎯 **一键标准化** - 团队配置、插件、代码片段全套同步
- 🌐 **智能源切换** - GitHub 主源 + Gitee 备源，自动选择最佳下载路径
- 💾 **安全备份还原** - 自动备份现有配置，支持一键恢复
- 🔍 **全面状态检查** - 配置健康度监控，问题诊断
- 🧹 **智能维护** - 自动清理旧备份，释放存储空间
- 🛡️ **容错设计** - 部分失败不影响整体，最大化成功率

## 🚀 快速体验

### 装个包

```bash
npm i @agile-team/vscode-config
```

### 试试看

```bash
# 一键安装团队标准配置
vscode-config install

# 网络不好？用国内源
vscode-config install --source gitee

# 网速慢？延长超时时间
vscode-config install --timeout 60
```

就这么简单！🎉

## 🎭 效果展示

### 标准安装流程

```
🚀 VSCode 配置安装工具
=======================================
版本: 2.0.0
配置源: GitHub → Gitee

⏳ 开始 VSCode 配置安装流程...

✓ 系统依赖检查通过 ✓
📁 VSCode 配置目录: ~/.config/Code/User
📁 已备份配置: settings.json, keybindings.json, snippets

✓ settings.json 获取成功 ✓
✓ VSCode 设置安装完成 ✓
✓ keybindings.json 获取成功 ✓
✓ 键盘快捷键安装完成 ✓

📦 扩展安装分析:
   配置包含: 37 个扩展
   本地已有: 15 个
   需要安装: 22 个

🔄 开始安装 22 个新扩展...
✓ ms-python.python ✓
✓ esbenp.prettier-vscode ✓
✓ bradlc.vscode-tailwindcss ✓
...

✅ 成功安装: 22 个扩展

🎉 VSCode 配置安装完成！

📊 安装统计:
  • 配置文件: 已更新
  • 成功安装扩展: 22 个
  • 本地已有扩展: 15 个
```

### 状态检查输出

```bash
$ vscode-config status

📊 VSCode 配置状态检查
=======================================

✓ VSCode 已安装 (版本: 1.84.2, 架构: x64)

📁 配置文件状态:
   ✓ settings.json (2.1 KB, 2小时前)
   ✓ keybindings.json (0.5 KB, 2小时前)  
   ✓ snippets (目录, 2小时前)

🧩 已安装扩展 (50个):
   • ms-python.python@2023.20.0
   • esbenp.prettier-vscode@10.1.0
   ... 还有 48 个扩展

💾 配置备份 (3个):
   • backup-1698765432000 (156KB, 2小时前)
   • backup-1698679032000 (154KB, 1天前)

✅ 状态检查完成！
```

## 🛠️ 完整命令参考

### 主要功能

| 命令      | 说明                 | 使用场景           |
| --------- | -------------------- | ------------------ |
| `install` | 安装/更新团队配置    | 新人入职、配置更新 |
| `status`  | 检查当前配置状态     | 日常检查、问题排查 |
| `restore` | 恢复历史备份         | 配置出问题时回滚   |
| `clean`   | 清理旧备份文件       | 定期维护、释放空间 |

### 常用选项

| 选项                    | 说明               | 适用场景         |
| ----------------------- | ------------------ | ---------------- |
| `--source gitee`        | 使用国内镜像源     | 国内网络环境     |
| `--timeout 60`          | 延长超时时间       | 网络较慢时       |
| `--force`               | 强制安装，跳过备份 | 快速重装         |
| `--older-than 7`        | 清理 7 天前的备份  | 定期清理维护     |

## 🎨 使用场景

### 新人入职场景

```bash
# 新员工第一天
npm i @agile-team/vscode-config
vscode-config install

# 验证安装效果  
vscode-config status

# 5分钟搞定，直接开始写代码！
```

### 团队配置升级

```bash
# 配置管理员更新了团队标准
vscode-config install --force

# 检查是否同步成功
vscode-config status

# 通知团队：大家都执行一下这个命令
```

### 网络环境差

```bash
# 公司网络访问 GitHub 慢
vscode-config install --source gitee --timeout 120

# 或者设置代理
export HTTP_PROXY=http://proxy.company.com:8080
vscode-config install
```

### 配置出问题了

```bash
# 看看有哪些备份
vscode-config restore --list

# 恢复到最近的正常状态
vscode-config restore

# 或者指定某个备份
vscode-config restore --backup ~/backup-1698765432000
```

### 定期维护

```bash
# 每月清理一次旧备份
vscode-config clean --older-than 30

# 检查当前状态
vscode-config status
```

## 🔧 安装内容详解

### 配置文件同步

**settings.json** - 编辑器核心设置
- 代码格式化规则
- 主题和字体配置  
- 语言特定设置
- 自动保存和格式化

**keybindings.json** - 快捷键统一
- 常用操作快捷键
- 插件相关绑定
- 自定义命令映射

**snippets/** - 代码片段库
- 各语言模板代码
- 常用代码块
- 团队编码规范

### 插件生态管理

```bash
# 从配置文件读取插件列表
extensions.json 或 extensions.list

# 智能安装策略
- 并发安装提高速度
- 自动跳过已安装
- 重试机制提高成功率
- 详细的安装报告
```

## 💾 备份系统详解

### 备份策略

每次安装前自动备份当前配置：

```
VSCode配置目录/
├── settings.json           # 当前配置
├── keybindings.json       
├── snippets/
├── backup-1635648000000/  # 自动备份
│   ├── settings.json      # 历史配置快照
│   ├── keybindings.json
│   └── snippets/
└── backup-1635734400000/  # 更早的备份
```

### 备份管理

```bash
# 查看所有备份
vscode-config restore --list

# 输出示例：
# 📁 可用的配置备份:
# ● [1] backup-1698765432000 (156KB, 2小时前)
# ○ [2] backup-1698679032000 (154KB, 1天前)  
# ○ [3] backup-1698593032000 (152KB, 3天前)

# 恢复指定备份
vscode-config restore --backup backup-1698679032000

# 定期清理
vscode-config clean --older-than 7  # 清理7天前的备份
```

## 🌐 双源加速机制

### 智能源选择

```bash
# 自动选择最佳源
vscode-config install
# ↓
# 1. 尝试 GitHub (海外速度快)
# 2. 超时/失败 → 自动切换 Gitee (国内速度快)  
# 3. 确保下载成功

# 手动指定源
vscode-config install --source github  # 强制使用 GitHub
vscode-config install --source gitee   # 强制使用 Gitee（推荐国内用户）
```

### 配置源对比

| 配置源  | 优势           | 适用场景       |
| ------- | -------------- | -------------- |
| GitHub  | 更新最及时     | 海外网络环境   |
| Gitee   | 国内访问快     | 国内网络环境   |
| 自动    | 智能选择最优   | 大部分情况推荐 |

## 🤔 一些说明

**Q: 会覆盖我现有的配置吗？**  
A: 不会直接覆盖，会先自动备份，可以随时恢复。

**Q: 网络不好怎么办？**  
A: 工具会自动切换到国内镜像源，也可以手动指定 `--source gitee`。

**Q: 某些插件安装失败怎么办？**  
A: 这很正常！工具会显示失败的插件列表和手动安装命令，不影响其他功能。

**Q: 如何更新到最新团队配置？**  
A: 直接运行 `vscode-config install` 即可，会自动备份现有配置后更新。

**Q: 备份文件在哪里？**  
A: 在 VSCode 配置目录下，可以用 `vscode-config status` 查看位置。

**Q: 支持自定义配置源吗？**  
A: 目前支持 GitHub 和 Gitee，如需其他源可以提 issue 讨论。

## 🆘 常见问题排查

### 环境检查失败

```bash
# 问题：提示找不到 code 命令
# 解决：重新安装 VSCode 并添加到 PATH

# macOS:
# VSCode → Command Palette → "Shell Command: Install 'code' command in PATH"

# Windows: 
# 重新安装时勾选 "Add to PATH"
```

### 网络连接问题

```bash
# 问题：下载超时或失败
# 解决方案：

# 1. 使用国内源
vscode-config install --source gitee

# 2. 延长超时时间
vscode-config install --timeout 120

# 3. 配置代理（公司网络）
export HTTP_PROXY=http://proxy.company.com:8080
```

### 插件安装失败

```bash
# 问题：部分插件安装失败
# 原因：网络问题、需要登录、插件下架等

# 解决：工具会提供手动安装命令
code --install-extension ms-python.python
code --install-extension esbenp.prettier-vscode
```

### 权限问题

```bash
# Linux/macOS 权限错误
sudo chown -R $(whoami) ~/.config/Code/User/

# Windows 需要管理员权限
# 右键 → "以管理员身份运行"
```

## 🎉 一起完善

这个工具还在持续改进中，如果你：

- 🐛 遇到了安装问题或 bug
- 💡 有好的功能想法或改进建议  
- 🔧 想贡献代码或帮助完善文档
- 📝 发现使用文档需要补充

都很欢迎在 GitHub 上参与讨论！

**快速开始**

```bash
# 立即体验
npm install -g vscode-config-installer
vscode-config install

# 问题反馈
# https://github.com/ChenyCHENYU/vscode-config-installer/issues
```

### 开发贡献

```bash
# 本地开发设置
git clone https://github.com/ChenyCHENYU/vscode-config-installer.git
cd vscode-config-installer && npm install

# 本地测试
npm link
vscode-config --help

# 代码检查
npm run lint && npm test
```

---

## 📎 相关链接

[![npm version](https://badge.fury.io/js/%40agile-team%2Fvscode-config.svg)](https://badge.fury.io/js/@agile-team/vscode-config)
[![GitHub stars](https://img.shields.io/github/stars/ChenyCHENYU/vscode-config-installer?style=social)](https://github.com/ChenyCHENYU/vscode-config-installer)

如果这个工具让你的团队 VSCode 配置管理变得更轻松，给个 star 支持一下吧 ⭐

[📚 配置内容](https://github.com/ChenyCHENYU/vscode-config) • [🏠 项目仓库](https://github.com/ChenyCHENYU/vscode-config-installer) • [📦 NPM 包](https://www.npmjs.com/package/vscode-config-installer) • [🐛 问题反馈](https://github.com/ChenyCHENYU/vscode-config-installer/issues)

---

**让团队 VSCode 配置管理变得简单高效，专注于代码质量的提升！** ⚙️