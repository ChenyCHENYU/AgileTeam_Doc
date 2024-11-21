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
    avatar: '/assets/team/薛旭杰.png',
    name: '薛旭杰', 
    title: 'DevOps Lead',
    desc:'洞察力是取胜的关键，一定不要让你的警觉松懈!',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/郭森淼.png',
    name: '郭森淼', 
    title: 'Big Data',
    desc:'Dare and the world always yields',
  },


]

const partners = [

]


</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的运维</template>
    <template #lead>核心成员</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <!-- <VPTeamPageSection>
    <template #title>特别感谢</template>
    <template #lead>协同伙伴</template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection> -->
</VPTeamPage>
