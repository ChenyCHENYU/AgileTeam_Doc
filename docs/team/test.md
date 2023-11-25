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
    name: '李斌',
    title: 'QC Lead',
    // links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    //   { icon: 'yotube', link: 'https://gitee.com/ycyplus163' },
    // ],
     desc: '不忘初心，方得始终'
  },
  {
    avatar: '/assets/team/张东.png',
    name: '千静妮',
    title: 'QC',
    desc: '只要拼不死，就往死里拼',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/赵成刚.png',
    name: '孙飞燕',
    title: 'Tech Lead',
    desc: '快乐编码，快乐捞钱'
  },
  {
    avatar: '/assets/team/曹翔.png',
    name: '马艳平',
    title: 'Architect',
    desc: '人若有志，万事可为',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/王凯文.png',
    name: '王超',
    title: 'Developers',
    desc: '人生如逆旅，我亦是行人',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/马佳瑞.png',
    name: '廖磊',
    title: 'Developers',
    desc: ' 挣钱脱发，花钱植发',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
]




</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的测试</template>
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
