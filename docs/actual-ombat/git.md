---
outline: 'deep'
---

# Git 的使用

> Git (读音为 /gɪt/) 是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理，Git 也是目前最先进的分布式版本控制系统。

## 基本概念

先理解下 `Git` **工作区**、**暂存区** 和 **版本库** 的概念。

<ElCard shadow="hover">

\- **工作区**：简单理解就是电脑里能看到和存放项的目录。  
\- **暂存区**：这里指 `index`，一般存放在 `.git` 目录下的 `index` 文件（`.git/index`）中，所以我们把暂存区有时也叫作索引。  
\- **版本库**：工作区有一个隐藏目录 `.git`，这个不算工作区，而是 **Git** 的版本库。

</ElCard>

下图很直观的展示了工作区、版本库中的暂存区和版本库之间的关系。

![Git 工作区、暂存区、版本库之间的关系](/assets/img/git.jpg)

- 图左侧为工作区，右侧为版本库。在版本库中标记为 **index** 的区域是暂存，标记为 **master** 的是 **master** 分支所代表的目录树。

- 图右 **HEAD** 实际是指向 **master** 分支的一个 "游标"，所以图示的命令中出现 **HEAD** 的地方可以用 **master** 来替换。

- 图右下方的 **objects** 标识的区域为 **Git** 的对象库，实际位于 `.git/objects` 目录下，里面包含了创建的各种对象及内容。

## Git 的安装和配置

官网下载安装 [Git](https://git-scm.com/docs)，一路默认安装，如果需要安装到其他盘符，安装完成后需要配置下全局变量，这一块很简单，自行百度，不做赘述。

:::tip
安装路径要求必须全英文路径，且没有空格。  
全局变量配置需要根据自己的电脑系统，下面以 w10 为栗，注意路径层级下钻到 `/bin` 目录。
:::

![Git 全局变量配置](/assets/img/git配置.png)

安装配置完成以后，验证是否安装成功。

```bash
$ git -v
// 如果下方提示版本信息，表示安装成功
git version 2.38.1.windows.
```

## Git 的基本使用

可以利用终端使用 `git` 命令行来操作，也可以使用 VSCode 市场的 `git` 插件进行可视化操作。

### 常用命令

 <!-- <img width="300"> -->

| 命令名称                           | 作用                                         |
| :--------------------------------- | :------------------------------------------- |
| git config --global user.name      | 设置用户签名                                 |
| git config --global user.email     | 设置用户邮箱                                 |
| git config user.name               | 查看用户签名                                 |
| git config user.email              | 查看用户邮箱                                 |
| git init                           | 初始化本地仓库                               |
| git status                         | 查看本地仓库状态                             |
| git add 文件名                     | 将工作区内容添加到暂存区                     |
| git commit "日志信息" 文件名[可选] | 将暂存区内容提交到本地仓库                   |
| git push 源或源+指定分支名         | 将本地仓库内容提交到云端托管平台仓库         |
| git log                            | 查看当前分支历史记录，不含 commit 和已删除的 |
| git reflog                         | 查看所有提交的历史记录 (提供后悔药) 😂       |
| git reset --hard 版本号            | 俗称回滚，版本(提交历史)切换                 |

首次安装 Git 必须设置用户签名，否则无法提交代码，设置完成后使用查看指令查看一下即可。

```bash
$ git config --global user.name cheny
$ git config --global user.email cheny@email.com
```

## 项目使用 Git

### git clone

:::tip 命令：`git clone`

- 示栗： `git clone git@172.16.226.146:ChenYu/project.git`
- 注释：`git clone` 后面可以是任意代码托管平台上，项目中的 **SSH** 地址或 **HTTPS** 地址，此命令只在初拉取代码使用。

:::

> :bell: 注意：为了方便后续项目分支代码提交，建议初次便配置代码托管平台 SSH 密钥，这里将以 [工蜂](https://git.code.tencent.com/) 为栗。

1、生成 .ssh，先打开终端窗口，这里以 `Cmder` 为栗

```bash
ssh-keygen -t rsa -C "your email"
```

如图：
![.ssh 生成图](/assets/img/ssh.png)

看到这样的界面，表示生成成功，然后继续在终端面板输入如下命令：

```bash
cat ~/.ssh/id_rsa.pub
```

复制里面的 **ssh-rsa** 公钥信息， **ssh-rsa** 开头，邮箱结尾。

![.ssh 生成图](/assets/img/ras-pub.png)

2、然后把复制的信息，塞到代码托管平台 **SSH 配置** 的地方。

![SSH 配置](/assets/img/ssh配置.png)

然后就可以愉快的拉取平台上已授权的所有项目代码了。

### git add

:::tip 命令：`git add`

- 示栗： `git add .` // 代表提交目录下所有文件，除却 git 过滤的目录。
- 注释：**add** 后面是要指定添加到暂存区的文件夹及文件，一般使用 `.` 代表非过滤的所有文件。

:::

### git status

:::tip 命令：`git status`

- 示栗: `git status`
- 注释：用来查看那些修改被暂存了，哪些文件没有被 Git tracked 到，此命令不显示已经 `commit` 到项目历史中去的信息。

:::
