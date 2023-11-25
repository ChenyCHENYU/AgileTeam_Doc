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
    avatar: '/assets/team/付晨璞.png',
    name: '付晨璞',
    title: 'Tech Lead',
    // links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    //   { icon: 'yotube', link: 'https://gitee.com/ycyplus163' },
    // ],
     desc: ''
  },
  {
    avatar: '/assets/team/史乐乐.png',
    name: '史乐乐',
    title: 'Product Manager',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
    {
    avatar: '/assets/team/加霖.png',
    name: '加霖',
    title: 'Product Manager',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/巩敏政.png',
    name: '巩敏政',
    title: 'Product Manager',
    desc: ''
  },
  {
    avatar: '/assets/team/李彦芝.png',
    name: '李彦芝',
    title: 'Product Manager',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/白赟.png',
    name: '白赟',
    title: 'Product Manager',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/雷振杰.png',
    name: '雷振杰',
    title: 'Product Manager',
    desc: ' ',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/李孟奇.png',
    name: '李孟奇',
    title: 'Product Manager',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
]


</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的产品</template>
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
