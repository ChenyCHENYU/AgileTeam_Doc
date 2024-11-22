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

import { baseURL } from './baseURL.ts'

const coreMembers = [
  {
    avatar: `${baseURL}/千静妮.png`,
    name: '千静妮',
    title: 'Quality Control Lead',
    desc: '知行合一，笃行致远',
  },
  {
    avatar: `${baseURL}/王超.png`,
    name: '王超',
    title: 'Quality Control',
    desc: '每天都是一个新的开始，走向更好的自己',
  },
  {
    avatar: `${baseURL}/孙飞燕.png`,
    name: '孙飞燕',
    title: 'Quality Control',
    desc: '道阻且长，行则将至'
  },

]

const partners = [
  {
    avatar: `${baseURL}/李斌.png`,
    name: '李斌',
    title: 'Quality Control',
     desc: '千里之行，始于足下'
  },
  {
    avatar: `${baseURL}/马艳平.png`,
    name: '马艳平',
    title: 'Quality Control',
    desc: '行而不辍，未来可期',
  },
  {
    avatar: `${baseURL}/廖磊.png`,
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
