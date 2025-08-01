---
outline: 'deep'
---

# 设计评审

> 「设计评审」一词颇为广义，涉及数种可用性测查方法，且每一种的运用因人（评审员）而异、因评审目的而异。常见的设计评审方法有：

:::info 🔎 启发式 | 独立设计 | 专家

• **启发式评估**（`Heuristic Evaluation`）。启发式评估的标准是设计方案需遵循一套设计原则，比如尼尔森十大可用性原则。

• **独立设计准则**（`Standalone Design Critique`）。独立设计准则是（通常以群组对话的形式）对进行中的设计加以分析，以决策设计方案是否达成目标、体验友好的一种评估方法。

• **专家评审**（`Expert Review`）。专家评审是指由 UX 专家对网站/或网站部分功能，App 应用/App 中部分功能进行可用性问题的精细检查。很多公司分不清专家评审和启发式评估两者的界限，把专家评审当做是比启发式评估更加通用的方法也是可以的。

:::

## 原型交互评审

原型完成后召集至少两三个设计师或者对交互比较了解的人，使用并评测原型。可以将原型所关注的几个任务列出来，以免专家不知道原型哪部分可交互哪部分不可交互。

:::tip 第一种方法 "启发式评估"

启发式评估法，而这种方法比较常见的标准是尼尔森交互设计法则（Nielsen Heuristic）。以下是十条尼尔森交互设计法则：

• 系统状态是否可见。  
• 系统是否符合现实世界的习惯。  
• 用户是否能自由地控制系统。  
• 统一与标准。  
• 错误防范。  
• 减轻低用户的记忆负担。  
• 灵活性和效率。  
• 美观简洁。  
• 帮助用户认知、了解错误，并从错误中恢复。  
• 帮助文档。

:::

:::tip 第二种方法 "SUS(系统可用性量表)"

最初是 `Brooke` 于 1986 年编制，量表由 10 个题目组成，包括奇数项的正面陈述和偶数项的反面陈述，要求参与者在使用系统或产品后对每个题目进行 `5` 点评分。

• 量表公开免费。  
• 整个量表题目陈述简单，只需参与者打分，实施起来很快。  
• 测量结果是介于 0-100 之间的分数，容易理解。  
• 可测量多种用户界面，比如网页、手机、平板等。

<ElImg src="ui/98.png"/>

:::

当参与者做完一系列任务后，就可以快速对 `SUS` 进行打分。然后就需要对每个题目的分值进行转换，奇数项计分采用「`原始得分-1`」，偶数项计分采用「`5-原始得分`」。由于是 `5` 点量表，每个题目的得分范围记为 0~4（`最大值为 40`），而 `SUS` 的范围在` 0~100`，故需要把所有项的转换分相加，最终再乘以 `2.5`，即可获得 `SUS` 分数。

将 `SUS` 分数换算成百分等级来解释，百分等级的意思是指测量的产品或系统相对于总数据库里其他产品或系统的可用性程度。

<ElImg src="ui/99.png"/>

从图中我们可以看出评分达到 `70` 分左右，就可以比市面上一半产品可用性要好，也就是说这个产品的用户体验算是合格了。

## 用户体验评审

使用用户体验问题记录表，组织相应的评估小组人员，参与评估人数越多越好，样本越多越好。为了提升工作效率，可以直接通过发放记录表给到评估人员，再统一回收就好。

<ElImg src="ui/100.png"/>

> 包括问题所在位置、对应的二十一条可用性原则、严重程度等级、问题描述。

### 问题分析整理

通过收集用户体验问题记录表，进行小组会议讨论，把问题总结归类，并对所有问题做一个统一的规范分类。（例可优化问题保留，不是体验问题的舍弃）。

当问题总结归类完成后，下一步需要引入「`用户体验八阵图`」来对应相应页面，让我们能够更直观的了解到现有项目中精细到`单个页面`中所面临的`用户体验`设计问题，这样一来，可以快速`发现体验问题`最多是哪个页面？体验问题最严重的是哪个页面？体验问题中哪个模块的问题最多？等。

<ElImg src="ui/101.png"/>

中心向外为问题严重等级，依次为：`小问题（1）、次要问题（2）、主要问题（3）、灾难性问题（4）`。

应对到「`用户体验问题记录表`」中的「`问题严重等级`」。

<ElImg src="ui/102.png"/>

### 优化方案

####

<ElCard shadow="hover">

• 通过 SUS 系统可用性量表知道了产品的整体体验处于什么水平。

• 通过协作启发式评估知道了产品的用户体验到底有哪些问题。

• 通过最新 21 条可用性原则知道了如何避免出现体验问题。

• 通过用户体验八阵图知道了哪些模块最迫切需要优化。

</ElCard>

## 项目走查

### 检查需求

检查设计方案是否满足需求，是否完成了原型设计中覆盖的全部设计点。

### 检查规范

检查方案排版和对齐是否准确，产品设计要检查控件尺寸字体字号是否符合设计规范，运营设计要检查字体字号是否符合运营设计规范。

### 阅读顺序

产品设计检查方案的使用顺序是否符合产品使用流程及用户预期，运营设计检查阅读顺序是否满足运营引导用户阅读的需求。

### 视觉表达

评估设计创意是否有服务于设计目标，视觉表达手法是否处理到位。

<ElImg src="ui/103.png"/>


