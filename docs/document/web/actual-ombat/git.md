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

<ImgPreview src="img/git.jpg" title="Git 工作区、暂存区、版本库之间的关系"/>

- 图左侧为工作区，右侧为版本库。在版本库中标记为 **index** 的区域是暂存，标记为 **master** 的是 **master** 分支所代表的目录树。

- 图右 **HEAD** 实际是指向 **master** 分支的一个 "游标"，所以图示的命令中出现 **HEAD** 的地方可以用 **master** 来替换。

- 图右下方的 **objects** 标识的区域为 **Git** 的对象库，实际位于 `.git/objects` 目录下，里面包含了创建的各种对象及内容。

## Git 的安装和配置

官网下载安装 [Git](https://git-scm.com/docs)，一路默认安装，如果需要安装到其他盘符，安装完成后需要配置下全局变量，这一块很简单，自行百度，不做赘述。

:::tip
安装路径要求必须全英文路径，且没有空格。  
全局变量配置需要根据自己的电脑系统，下面以 w10 为栗，注意路径层级下钻到 `/bin` 目录。
:::

<ImgPreview src="img/02.png" title="Git 全局变量配置"/>

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

## 项目中常用 Git 命令小解

### git clone 克隆代码

将代码从托管平台克隆到本地。

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

<ImgPreview src="img/ssh.png" title=".ssh 生成图"/>

看到这样的界面，表示生成成功，然后继续在终端面板输入如下命令：

```bash
cat ~/.ssh/id_rsa.pub
```

复制里面的 **ssh-rsa** 公钥信息， **ssh-rsa** 开头，邮箱结尾。

<ImgPreview src="img/ras-pub.png" title=".ssh 生成图"/>

2、然后把复制的信息，塞到代码托管平台 **SSH 配置** 的地方。

<ImgPreview src="img/03.png" title="SSH 配置"/>

然后就可以愉快的拉取平台上已授权的所有项目代码了。

### git add 暂存提交

将工作区代码提交到暂存区。

:::tip 命令：`git add`

- 示栗： `git add .` // 代表提交目录下所有文件，除却 git 过滤的目录。
- 注释：**add** 后面是要指定添加到暂存区的文件夹及文件，一般使用 `.` 代表非过滤的所有文件。

:::

### git status 暂存状态

查看当前操作的哪些修改被提交到了暂存区。

:::tip 命令：`git status`

- 示栗: `git status`
- 注释：此命令不显示已经 `commit` 到本地仓库中的信息。

:::

### git commit 提交本地仓库

将暂存区代码提交到本地仓库。

:::tip 命令：`git commit`

- 示栗: `git commit -m '此次提交的描述信息'`
- 注释：执行此命令除了将暂存区代码提交到工作区之外，还生成提交记录可以使用 `git log` 查看。

:::

### git push 推送远端

将本地仓储的代码推送到了远端代码托管平台仓库。

:::tip 命令：`git push`

- 示栗: `git push origin master`
- 注释：`origin` 是默认别名， `master` 是指定的推送分支，若只有此分支可以直接执行 `git push`。
- 注意： 如遇交叉开发，每次 `push` 之前切记 `pull` 一下，否则会提示本地落后远端导致推送失败。

:::

### git pull 拉取更新

将远端的仓库代码拉取到本地更新。

:::tip 命令：`git pull`

- 示栗: `git pull 别名 分支名`，如 `git pull origin dev`
- 注释：若没有设置多个别名，或已存在默认 `origin`，直接 `git pull` 即可。
- 注意：协作开发的话，需要解决代码冲突。

:::

### git branch 分支操作

用来创建分支，查看分支，删除分支。

:::tip 命令：`git branch`

- `git branch test` // 创建 test 分支，test 为自定义的分支名。
- `git branch -d test` // 删除本地自定义的 test 分支。
- `git branch -D test` // 强制删除本地和远端 test 分支。
- `git branch` // 查看本地分支。
- `git branch -a` // 查看所有分支，包括本地和远端。
- `git branch -m '要修改的名称'` // 修改分支名称

:::

:bell: 注意：删除远端分支可以使用 `git push origin --delete test` 强制远端 test 分支。

### git checkout 切换分支

用来进行分支的切换。

:::tip 命令：`git checkout`

- 示栗: `git checkout test` | `git checkout test_20221106 -b`
- 注释：切换到 `test` 分支，或者在切换分支的时候创新要切换的新分支。
- 注意：切换时当前分支修改已至少进行本地仓库存储 `commit` 提交。

:::

### git fetch 更新分支

同步更新远端仓库的分支指针到本地。

:::tip 命令：`git fetch`

- 示栗: `git fetch` | `git fetch origin`
- 注释：直白点说就是同步获取远端仓库分支或分支上的的最新状态。
- 注意：通过 `git branch -a`，可以看到同步过来的远端分支，但并不会创建本地分支。

:::

### git stash 临时缓存

用于临时想要保存当前修改，但想回到之前最后一次提交干净的工作仓库时进行的操作。  
看不懂？好吧，场景直白点就是说，想把当前写了一半的代码，临时存储下来做个记号，然后切换到正式分支上处理着急解决的问题，处理完毕以后切换回来继续未完成的代码编写。

:::tip 命令：`git stash`

- `git stash save test` // test 为当前暂存别名。
- `git stash list` // 查看当前工作区暂存的任务列表。
- `git stash apply stash@{0}` // 恢复到指定的暂存区任务编号， stash@{0} 是编号。
- `git statsh apply` // 恢复到当前上一次缓存。
- `git stash drop stash@{$num}` // 丢弃 stash@{$num}存储，从列表中删除这个存储。
- `git stash clear` // 删除所有缓存的 stash。

:::

### git log 和 git reflog 记录查询

:::tip 命令：`git log`| `git reflog`

- 示栗: `git log` | `git reflog`
- 注释：查看当前分支已经 `commit` 以后的历史记录 | 查看所有分支的历史记录。
- 注意：执行一些分支回滚动作的时候，一般使用 `git log` 查看要回退的 `hashID`。

:::

### 提交忽略指定文件或目录

若项目不存在 **.gitignore** 文件，在根目录创建，将需要忽略的文件名加进去，每个文件占一行。

```txt
// .gitignore 文件
.DS_Store
.idea
```

或者提交的时候，使用命令强制添加忽略文件。

```bash
$ git add -f .DS_Store (.DS_Store 是文件名)
```

项目常用命令大概这些就够了，可视化的 Git 集成到 VSCode 插件集中了，使用很简单不赘述。

## 其他高级命令

这些命令一般项目上不常用，但是在根据场景需要的时候，那是大大的便利哇。

### git checkout --patch 穿梭同步

用来将其他分支的修改，轻量的将文件上传同步到当前的分支上，这句话也可以反过来解读。

:::tip 命令：`git checkout --patch`

- 示栗: `git checkout --patch dev_cheny src/demo.js`
- 注释：比如当前在 master 分支上，将 dev_cheny 分支上的 src 目录下的 demo.js 合并过来。
- 注意：使用记得提交当前修改，避免穿梭带来问题。

:::

### git remote 远程操作

对于远程仓储地址信息的查看，设置（包括别名，fetct / push 地址）。

:::tip **命令** `git remote`

- `git remote -v` // 查看当前项目远程地址信息，包含 push 和 fetch 的地址。
- `git remote add 别名 'SSH地址信息'` // 添加当前项目远程地址信息，可以添加多个远端地址。
- `git remote remove '别名'` // 删除当前项目远程地址信息

:::

### git push -u 默认推送

指定默认推送地址，使用别名即可。

```bash
$ git push -u myhub
```

:bell: 注意：这里的 `myhub` 是 `git remote add` 添加地址设置的别名，等同默认的 `origin`。

### git fetch --prune origin

用来标注已经删除的分支。

```bash
$ git fetch --prune origin
```

:bell: 注意：看到 `:gone`  的标识，说明远程分支已经被删除。

### git branch -vv 失效分支

用来查看关联失效的分支。

```bash
$ git branch -vv
``

`
```

### git branch --set-upstream-to

设置默认推送和拉取追踪的分支，比如使 `git pll` 等同于 `git pull origin master` 。

```bash
$ git branch --set-upstream-to=origin/master master
```

### git diff 版本比对

用来比较不同版本之间的差异，可以同分支，也可以不同分支之间进行比较。

**同分支不同版本**
:::tip
**当前与历史版本的对比**

- `git log ` // 找到提交记录的 id
- `git diff commitId` // commitId 就是提交记录中的 id, 跟该 id 版本进行比对

**两个历史版本的对比**

- `git diff id1 id2` // 传递两个对比的版本号 id 即可

:::

:bell: 注意：不给第三个参数，也就是 commitId 的话, 默认跟上一次提交的版本比较。

**跨分支版本对比**

当前分支跟其他分支做比较。

```bash
$ git diff dev_base_cheny
```

### git cherry-pick 条件合并

用来复制记录到当前分支，该命令可以避免将整个分支合并过来，只合并需要的版本记录。
:::tip **命令** `cherry-pick`

- 比如在 `develop` 分支找到稳定版本的 `commitid`。
- 切换分支到 `test` 然后依次执行  `git cherry-pick`  命令。
- 最后通过  `git log`  检查是否正确。

:::

## 谨慎操作的命令

### 恢复已删除、误删除的分支

:::tip

- 通过 `git reflog show` 查看提交日志 找到对应的 `commitID`。
- 以 `commit_id`  方式建立一个新的分支作为要恢复的分支名，参考命令如下：

:::

```bash
$ git checkout -b  retest_v3  b52b955  // 这个 id 编号就是提交的历史版本编号。
```

###  revert  的版本回滚

:bell: 跟 `reset` 有较大区别， `revert` 去恢复某个版本代码时，**Git** 只会撤销指定版本的代码，而不是指定版本后的所有版本。

比如说你提交了 1、2、3 三个版本，当你撤销版本 2 的时候，会生成版本 4，但是不会对版本 3 产生影响。

```bash
$ git revert 6d8feb147973711d08211f953f3d7c463ee1e88f  // 这是一个 commitID
```

执行该命令以后，需要我们编辑一些备注信息，编辑完成以后 esc && :wq 即可！

:::tip 注意几个区别：

- `git reset`  命令会改变之前的版本记录，可能会导致不能提交到远程仓库。
- `git revert`  命令只会撤销某个版本的代码，然后在当前分支增加一条版本新记录。
- `git revert`  只会撤销指定版本的代码，而不是指定版本后的所有版本。

:::

### svn 迁移代码到 git

1、使用 `git svn clone -r` 命令克隆 svn 地址。

```bash
$ git svn clone -r 6000:HEAD http://svn.data.tzecc.com/svn/bgy/src/trunk/new_bgy/Web --no-metadata
```

2、创建 Gitlab 或者其他代码托管平台项目，这里以 Gitlab 举栗。

3、设置 GitLab 远端地址源。

```bash
$ git remote add bgy_admin git@172.16.226.146:ChenYu/bgy_admin.git
```

4、设置推送的默认分支。

```bash
$ git push --set-upstream bgy_admin master
```

5 　如果不成功就先执行一下合并。

```bash
$ git pull --rebase origin master
```

:bell: 注意：要迁移的代码可能体量很大，老项目有非常多的提交记录，可以进行优雅的合并，使用 `git rebase` 来完成，使提交记录更整洁，非主合并分支记录在下方。

:::tip

- 在使用 `merge` 的时候，建议使用 `rebase` ，使其提交历史记录更清晰。
- `merge` 合并的代码，版本记录会按照时间顺序排序，并自动产生一个  **Merge branch**。
- `rebase ` 合并代码之后，版本记录会将目标分支放在后面，当前分支的版本记录放在前边。

:::

针对老的项目，还可以克隆最新的一次的版本，或者只获取它最近量次的提交记录。

```bash
$ git clone https://gitee.com/songboy/test201907.git  tempdemo --depth==1
```

### 优雅清空版本记录

```bash
$ git checkout --orphan new_branch  // 切换的新分支拿到最近一次的记录。
```

对于老项目，大量早起无用的历史记录，使用这种清空方式比较优雅，应该叫做重生或金蝉脱壳，不是彻底删除，不能往那面想哦，小心腿打断。。。

## 其他统计查看命令

### 查看提交次数

```bash
$ git log --oneline | wc -l  //  查看总提交次数
$ git log --author="用户名" --oneline | wc -l  // 查看某个用户提交次数 
$ git shortlog -s -n  // 查看每个用户提交次数
$ git log --pretty='%aN' | sort -u | wc -l  // 贡献者统计
```

### 查看总代码行数

```bash
git log --since=2021-03-20 --until=2021-11-30 --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }'
```

### 统计每个人删除的行数

```bash
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s ", add, subs, loc }' -; done
```

### 根据用户名统计

```bash
git log --author="username" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
```

### 某用户时间范围的提交数

```bash
git log --author="用户名" --since="2014-07-01" --oneline | wc -l
```
