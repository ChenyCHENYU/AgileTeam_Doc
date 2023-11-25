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
    name: '杨晓明',
    title: 'Technical Director',
    // links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    //   { icon: 'yotube', link: 'https://gitee.com/ycyplus163' },
    // ],
     desc: '不忘初心，方得始终'
  },
  {
    avatar: '/assets/team/张东.png',
    name: '王宇坤',
    title: 'Technical Supervisor',
    desc: '只要拼不死，就往死里拼',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/赵成刚.png',
    name: '郝伟伟',
    title: 'Tech Lead',
    desc: '快乐编码，快乐捞钱'
  },
  {
    avatar: '/assets/team/曹翔.png',
    name: '潘超越',
    title: 'Architect',
    desc: '人若有志，万事可为',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/王凯文.png',
    name: '何光明',
    title: 'Developers',
    desc: '人生如逆旅，我亦是行人',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/马佳瑞.png',
    name: '苏杰',
    title: 'Developers',
    desc: ' 挣钱脱发，花钱植发',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/董亚婷.png',
    name: '马钧',
    title: 'Developers',
    desc: '爱敲代码，糊涂时读书，独处时思考',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/杨佩.png',
    name: '肖斌',
    title: 'Developers',
    desc: '每天都要优雅的写好每一行代码',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/赵保山.png',
    name: '兰杨岩',
    title: 'Developers',
    desc: '在谷底也要开花，在海底也要望月',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/杨博.png',
    name: '李扬',
    title: 'Developers',
    desc: '风物长，宜放眼量',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },

  {
    avatar: '/assets/team/陈晶华.png',
    name: '权雷雷',
    title: 'Developers',
    desc:'所有的胜利都是有备而来',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/陈晶华.png',
    name: '宋凯',
    title: 'Developers',
    desc:'所有的胜利都是有备而来',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/陈晶华.png',
    name: '陈超',
    title: 'Developers',
    desc:'所有的胜利都是有备而来',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/陈晶华.png',
    name: '周沾',
    title: 'Developers',
    desc:'所有的胜利都是有备而来',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
]



</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的后端</template>
    <template #lead>核心成员</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <!-- <VPTeamPageSection>
    <template #title>特别感谢</template>
    <template #lead>社区伙伴</template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection> -->
</VPTeamPage>
