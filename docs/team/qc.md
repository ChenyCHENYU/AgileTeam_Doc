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
    avatar: '/assets/team/李斌.png',
    name: '李斌',
    title: 'Quality Control Lead',
    // links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    //   { icon: 'yotube', link: 'https://gitee.com/ycyplus163' },
    // ],
     desc: ''
  },
  {
    avatar: '/assets/team/千静妮.png',
    name: '千静妮',
    title: 'Quality Control',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/孙飞燕.png',
    name: '孙飞燕',
    title: 'Quality Control',
    desc: ''
  },
  {
    avatar: '/assets/team/马艳平.png',
    name: '马艳平',
    title: 'Quality Control',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/王超.png',
    name: '王超',
    title: 'Quality Control',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/廖磊.png',
    name: '廖磊',
    title: 'Quality Control',
    desc: ' ',
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
