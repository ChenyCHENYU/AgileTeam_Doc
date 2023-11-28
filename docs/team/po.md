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
     desc: 'Connecting The Dots'
  },
  {
    avatar: '/assets/team/史乐乐.png',
    name: '史乐乐',
    title: 'Product Manager',
    desc: '冲',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
    {
    avatar: '/assets/team/加霖.png',
    name: '加霖',
    title: 'Product Manager',
    desc: '好的软件特征是，明明没用过，但总觉得用过似的',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/巩敏政.png',
    name: '巩敏政',
    title: 'Product Manager',
    desc: '世界一直在变化，结果由我们来决定'
  },
  {
    avatar: '/assets/team/李彦芝.png',
    name: '李彦芝',
    title: 'Product Manager',
    desc: '山不向我走来，我便向山走去',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/白赟.png',
    name: '白赟',
    title: 'Product Manager',
    desc: '大道至简',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/雷振杰.png',
    name: '雷振杰',
    title: 'Product Manager',
    desc: '永不停歇，持续迭代',
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
