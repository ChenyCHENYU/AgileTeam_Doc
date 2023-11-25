---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
   VPTeamPageSection
} from 'vitepress/theme'




const coreMembers = [
  {
    // avatar: 'https://www.github.com/yyx990803.png',
    avatar: '/assets/team/cheny.png',
    name: 'Cheny',
    title: 'Creator',
    // links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    //   { icon: 'yotube', link: 'https://gitee.com/ycyplus163' },
    // ],
     desc: '不忘初心，方得始终'
  },
  {
    avatar: '/assets/team/张东.png',
    name: '张东',
    title: 'Developers',
    desc: '只要拼不死，就往死里拼',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/赵成刚.png',
    name: '赵成刚',
    title: 'Developers',
    desc: '快乐编码，快乐捞钱'
  },
  {
    avatar: '/assets/team/曹翔.png',
    name: 'Asher',
    title: 'Developers',
    desc: '人若有志，万事可为',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/王凯文.png',
    name: 'Kevin',
    title: 'Developers',
    desc: '人生如逆旅，我亦是行人',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/马佳瑞.png',
    name: 'Destiny',
    title: 'Developers',
    desc: ' 挣钱脱发，花钱植发',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/董亚婷.png',
    name: 'Aris',
    title: 'Developers',
    desc: '爱敲代码，糊涂时读书，独处时思考',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/杨佩.png',
    name: 'Amy',
    title: 'Developers',
    desc: '每天都要优雅的写好每一行代码',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/赵保山.png',
    name: 'Brenton',
    title: 'Developers',
    desc: '在谷底也要开花，在海底也要望月',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/杨博.png',
    name: 'Youwei',
    title: 'Developers',
    desc: '风物长，宜放眼量',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },

  {
    avatar: '/assets/team/陈晶华.png',
    name: '陈晶华',
    title: 'Developers',
    desc:'所有的胜利都是有备而来',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/陈晶华.png',
    name: '原宁宁',
    title: 'Developers',
    desc:'所有的胜利都是有备而来',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/陈晶华.png',
    name: '丁铭',
    title: 'Developers',
    desc:'所有的胜利都是有备而来',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
]


const partners = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/9710546?s=200&v=4',
    name: '杰克',
    title: '技术卷王，西安前端社群群主',
    desc: '不要@我，有事儿你直接说'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/13547390?v=4',
    name: '雪源',
    title: '广联达前端组长',
    desc: '资深前端开发，Vue发烧选手'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/51934415?v=4',
    name: 'Brian',
    title: '全栈大佬，10年互联网老鸟',
    desc: '一线大厂出身，精通全栈、全端开发，负责过多个领域的全栈项目开发，纵跨技术、直播、新媒体等多个行业领域，自创多种优化流程，热爱分享'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/24845958?v=4',
    name: 'chengpeiquan',
    title: '前端工程师 / 贝斯手 / 猫奴',
    desc: '优秀的社区开源作者，文档部分的核心贡献者',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/73180970?v=4',
    name: '田同学',
    title: '最怕你一生碌碌无为，还安慰自己平凡可贵',
    desc: '基于 Vue3 的 ui 框架 《FightingDesign》作者'
  },
  {
    avatar: 'https://q2.qlogo.cn/headimg_dl?spec=100&dst_uin=1157445650',
    name: 'Fate',
    title: '你敲代码，我敲脑子',
    desc: 'css 资深玩家，有丰富的可视化看板动效开发经验'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/44045271?v=4',
    name: '坏、毛病',
    title: '震有科技前端负责人',
    desc: '重度编码洁癖，擅长代码重构设计，有大量C转B项目和可视化开发的经验'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/23090352?v=4',
    name: 'lili',
    title: '资深前端',
    desc: '坐标东北沈阳的一个前端老炮儿，出道9年，热爱编码，热爱生活，喜欢极限编程'
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的前端</template>
    <template #lead>核心成员</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <VPTeamPageSection>
    <template #title>特别感谢</template>
    <template #lead>社区伙伴</template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>

