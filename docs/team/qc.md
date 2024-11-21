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
    avatar: '/assets/team/千静妮.png',
    name: '千静妮',
    title: 'Quality Control Lead',
    desc: '知行合一，笃行致远',
  },
  {
    avatar: '/assets/team/王超.png',
    name: '王超',
    title: 'Quality Control',
    desc: '每天都是一个新的开始，走向更好的自己',
  },
  {
    avatar: '/assets/team/孙飞燕.png',
    name: '孙飞燕',
    title: 'Quality Control',
    desc: '道阻且长，行则将至'
  },

]

const partners = [
  {
    avatar: '/assets/team/李斌.png',
    name: '李斌',
    title: 'Quality Control',
     desc: '千里之行，始于足下'
  },
  {
    avatar: '/assets/team/马艳平.png',
    name: '马艳平',
    title: 'Quality Control',
    desc: '行而不辍，未来可期',
  },
  {
    avatar: '/assets/team/廖磊.png',
    name: '廖磊',
    title: 'Quality Control',
    desc: '时间不在于拥有多少，而在于怎么使用',
  },
]


</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的测试</template>
    <template #lead>核心成员</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <VPTeamPageSection>
    <template #title>特别感谢</template>
    <template #lead>协同伙伴</template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
