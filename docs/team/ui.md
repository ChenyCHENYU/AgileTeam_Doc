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
    avatar: '/assets/team/傅会文.png',
    name: '傅会文',
    title: 'Ui Tech Lead',
    // links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    //   { icon: 'yotube', link: 'https://gitee.com/ycyplus163' },
    // ],
     desc: ''
  },
  {
    avatar: '/assets/team/刘凯.png',
    name: '刘凯',
    title: 'Ui Design',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
    {
    avatar: '/assets/team/廉国崴.png',
    name: '廉国崴',
    title: 'Ui Design',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/刘旭洋.png',
    name: '刘旭洋',
    title: 'Modeler Tech Lead',
    desc: ''
  },
  {
    avatar: '/assets/team/许扬沛.png',
    name: '许扬沛',
    title: 'Modeler',
    desc: '',

  }
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
