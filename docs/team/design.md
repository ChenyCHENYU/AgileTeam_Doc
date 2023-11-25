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
    name: '傅会文',
    title: 'Ui Tech Lead',
    // links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    //   { icon: 'yotube', link: 'https://gitee.com/ycyplus163' },
    // ],
     desc: ''
  },
  {
    avatar: '/assets/team/张东.png',
    name: '刘凯',
    title: 'Ui Design',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
    {
    avatar: '/assets/team/杨佩.png',
    name: '廉国崴',
    title: 'Ui Design',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/赵成刚.png',
    name: '刘旭洋',
    title: '建模师 Tech Lead',
    desc: ''
  },
  {
    avatar: '/assets/team/徐杨沛.png',
    name: '徐杨沛',
    title: '建模师',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
]


</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的设计</template>
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
