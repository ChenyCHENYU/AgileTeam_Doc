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
    avatar: `${baseURL}/刘凯.png`,
    name: '刘凯',
    title: 'Ui Design Lead',
    desc: '有道无术术可求，有术无道止于术',
  },

]


const partners = [
  {
    avatar: `${baseURL}/傅会文.png`,
    name: '傅会文',
    title: 'Ui Design',
     desc: 'UI出品，必是精品'
  },
  {
    avatar: `${baseURL}/廉国崴.png`,
    name: '廉国崴',
    title: 'Ui Design',
    desc: '凡事预则立，不预则废',
  },
  {
    avatar: `${baseURL}/刘旭洋.png`,
    name: '刘旭洋',
    title: 'Modeler Tech Lead',
    desc: '成大事者，争百年，不争一息'
  },
  {
    avatar: `${baseURL}/许扬沛.png`,
    name: '许扬沛',
    title: 'Modeler',
    desc: '耐心和持久胜过激烈和狂热',
  }
]




</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的设计</template>
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
