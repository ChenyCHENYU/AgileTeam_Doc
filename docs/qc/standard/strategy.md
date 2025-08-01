---
outline: 'deep'
---

# 测试策略设计

## 前言

> 伴随着 **敏捷** 和 `DevOps` 的出现，传统的软件开发模式发生了改变，同时测试也面临着不小的挑战。在 **敏捷开发模式** 下，**短周期迭代交付模式** 意味着时间短，拥抱变化则意味着变更频繁，用户故事描述需求的方式意味着文档变少，全功能团队中意味着专门的测试人员变少。基于上述情况，如何让测试也变得敏捷，做好测试工作，有效的保证产品质量，成为了我们的头等大事。

## 适用范围

参与软件产品测试的各测试工程师。

## 测试策略思路

-

### 一个问题

敏捷需不需要测试策略吗？目前迭代的需求功能比较明确，迭代周期比较紧张，需要测试策略吗？

先看一个概念，何为策略？

:::tip 策略，指计策，谋略，一般是指：

1.可以实现目标的方案集合；  
2.根据形势发展而制定的行动方针和斗争方法；  
3.有斗争艺术，能注意方式方法。

:::

下来看测试策略，测试策略就是测试的一个纲领，做价值排序！测试策略的另一重理解就是取舍！测什么，不测试什么！

综上来看，我们只能给出一个比较中庸的答案。

时间紧，目标比较明确的项目，可以没有测试策略；

项目复杂，节奏正常，涉及系统比较多，可能就需要一个稍微细化的测试策略。

### 如何实现业务价值排序

我们知道，敏捷交付价值，敏捷测试要以业务价值驱动，要以优化业务价值为目标。

业务价值到底是什么？

:::tip 业务价值可以简单理解为：

• 帮助企业盈利；  
• 满足企业业务发展要求；  
• 能够带来业务价值的产品需要满足用户需求、让用户使用方便。

:::

### 测试从哪些维度关注业务价值

我们需要从`用户行为`、`业务流程`、`业务影响`、`业务指标`来思考和组织相应的测试活动，以`实现优化业务价值`。

<ElCard shadow="hover">

**1.从终端用户角度进行测试**

从终端用户角度进行测试是基本的测试思维，是测试人员必备的技能要求。

在思考、设计测试用例并执行测试的时候，不能简单的套用用例设计方法去机械地进行，而是要考虑用户可能的行为习惯、使用场景等。
除此之外，还要考虑终端用户的体验，比如说页面的布局、配色、易操作性、页面加载时间等都是在测试过程中需要考虑的因素。这样有助于交付一个增强用户体验的系统，对优化业务价值是有帮助的。

**2.以业务为重点的测试**

单个终端用户的操作可能只是业务流程的一部分，除了从终端用户角度去测试，还需要看得更高一点，那就是业务流程的合理性、流畅性和完整性。这就要求能够真正理解企业的业务，以业务为重点来测试。
深刻理解业务流程、以业务为重点的测试，能够更容易发现关键业务流程中遗漏的点或相应的缺陷，测试带来的业务价值又上了一个台阶。

**3.映射业务影响**

保证了每个业务流程的流畅性，还需要综合企业多个业务来看业务的优先级，能够区分哪些是关键业务和外围业务，要能理解每个业务对于企业的影响、给企业带来的价值。
在测试过程中需要把系统的质量状况跟业务紧密关联起来，需要能够识别出系统缺陷对业务带来的影响，包括可能影响到的用户数、具体的影响是什么、有没有可以绕过的方法不至于中断业务的开展等。如果影响到最关键的客户，那么相同严重性的 bug，对于只影响少量不怎么重要的客户来说，优先级也是完全不一样的。

**4.关联业务指标**

除了前面三个维度，在度量项目 / 产品的测试或质量的时候，不能仅局限于项目 / 产品范围，要跟企业的业务指标相关联，跟踪、量化测试活动对业务指标的影响。这个维度是非常重要的。测试不再是考虑发现尽量多的缺陷，而是要基于如何快速将产品投递到市场的战略，尽快让企业能够借助产品盈利。

</ElCard>

### 测试策略总体思路

我们都知道，测试策略包括以下两方面的内容：

**测什么（What）？**

测什么是指质量需求是什么、需要关注质量的哪些方面，比如应用的`功能范围、性能、安全、易用性`等非功能需求。

**怎么测（How）？**

怎么测就是采用什么办法来帮助系统实现质量需求，而不仅仅是手动和自动化的测试方法，也包括一切为质量保障服务的`流程、环境、基础设施和人员`等。

综上来看，测试策略描述了测试工程的总体方法和目标，描述目前在进行哪一阶段的测试以及每个阶段内在进行的测试种类（`功能测试、性能测试、覆盖测试`等）以及测试人力安排等，可以按照`测试的目的`、`范围`、`起止时间`、`人员安排`、`工具`，即 `5W1H` 法来规划合理的测试策略。

:::tip :eyes:

● why：为什么要进行测试，测试的目的是什么?

● what:测试的内容及范围，测哪些，确定测试重点；

● when：测试的起止时间，考虑影响时间的因素；

● where：相关文档的存放位置、缺陷的存放、测试环境、预发布环境；

● who ：测试人员的安排；

● how：选用何种测试工具及方法进行测试。

:::

### Why

根据敏捷测试原则，测试的目的是用来预防缺陷，帮助团队构建最好的系统。可以根据业务和项目的特点，设置一个测试的总体目标。

### What

根据测试四象限，从业务和技术的角度、以及程序和产品的角度将测试内容进行类划分，如下图所示。

<ElImg src="qc/2.png"/>

依据敏捷的分层计划原则，测试测试也采用不同级别的测试，可以参考 `Epic-Feature-Story-Task` 制定策略。

下面可以作为制定策略的参考，业务和产品大多是不相同的，可以根据自己业务和产品的特点进行调整。

敏捷开发过程是由迭代组成的，`Epic` 是由若干个迭代完成，通常为集成测试和端到端的测试。

**Feature** 通常若干迭代来实现，通常会进行`特性测试`、`功能测试`、`UAT`、`场景测试`；

**Story** 通常在迭代内完成，通常进行`功能测试`、`用户故事测试`；
Task 为迭代内的测试，通常进行`单元测试`、`模块测试`、`代码质量测试`。
其中性能测试会覆盖到 `Story`、`Feature` 和 `Epic` 层级。

### When

在敏捷开发模式下，测试不只是一个阶段，而是一个活动，每个 `Sprint` 都有测试活动。每个迭代都会进行`单元测试`、`代码质量测试`、`用户故事测试`、`特性和能力验收测试`；从 `Sprint2` 开始都要进行一次 `Sprint` 级别的`回归测试`，以自动化测试的形式实现。累积了几个迭代之后，在发布前要进行端到端的`集成测试`。

如下图所示。

<ElImg src="qc/3.png"/>

### Where

尽管敏捷开发中采用轻文档的形式，但同样也要做好相关文档的管理。在测试初始要约定相关测试交付物的管理和存放形式，包括不限于`测试策略`、`测试工件`、`缺陷`、`测试数据`、`虚拟服务和自动化脚本`等。通常会在项目管理工具中进行管理，和开发的工作项之间建立关联，这样便于后续进行追溯和查看，可以将文档上传到语雀的项目中，然后在工作项中建立关联。

### Who

敏捷开发中，测试活动为团队的共同工作，而不仅仅是测试人员。其中开发人员做好 `TDD`、`单元测试` 和 `代码质量测试`，同时因为接口测试涉及到接口间的数据交换、传递和控制管理等内部逻辑的问题，也建议由开发人员进行。测试人员包括迭代内的测试人员和跨迭代的技术人员。迭代内的测试人员主要负责迭代测试的设计和执行，包括`探索性测试`和 `API`、`UI` `测试自动化脚本`的开发和执行，还有自动化的回归`冒烟测试`。跨迭代的测试人员更多专注在协调测试和制定自动化测试策略。

:bell: 同时，测试人员为团队中的一员，不仅仅执行**测试工作**，还要参与**测试计划**、**评估和工作安排**、**回顾及任何其他团队活动**。

### How

为了能够更好的配合敏捷开发的小步快跑、尽早交付的模式，测试就需要具备快速测试和及早反馈的能力。在敏捷方法紧迫时间的框架下，自动化测试能力必不可少，这样可以极大的缓解测试的压力。

在自动化工具选择上，要从实际情况出发，从**成本预算**、**支持平台**、**支持语言**、**可测的应用**、**技术要求**等多方面去考虑。

:bell: 开源工具节省成本，商业工具成本高；在开源的选择上也要结合团队成员的能力情况，开源也有技术难易之分；工具的后续支持程度也要考虑进去，在使用的过程中不可避免的会遇到问题。

## 测试策略示例

<ElImg src="qc/4.png"/>
