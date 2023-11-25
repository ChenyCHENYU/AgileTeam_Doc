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
    name: '付晨璞',
    title: 'Tech Lead',
    // links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    //   { icon: 'yotube', link: 'https://gitee.com/ycyplus163' },
    // ],
     desc: ''
  },
  {
    avatar: '/assets/team/张东.png',
    name: '史乐乐',
    title: 'Product Manager',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
    {
    avatar: '/assets/team/杨佩.png',
    name: '加霖',
    title: 'Developers',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/赵成刚.png',
    name: '巩敏政',
    title: 'Product Manager',
    desc: ''
  },
  {
    avatar: '/assets/team/曹翔.png',
    name: '李彦芝',
    title: 'Product Manager',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/王凯文.png',
    name: '白赟',
    title: 'Product Manager',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/马佳瑞.png',
    name: '雷振杰',
    title: 'Product Manager',
    desc: ' ',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/董亚婷.png',
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


