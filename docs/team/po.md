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
    avatar: `${baseURL}/史乐乐.png`,
    name: '史乐乐',
    title: 'Product Owner Lead',
    desc: '冲',
  },

  {
    avatar: `${baseURL}/巩敏政.png`,
    name: '巩敏政',
    title: 'Product Owner Lead',
    desc: '世界一直在变化，结果由我们来决定'
  },

  {
    avatar: `${baseURL}/白赟.png`,
    name: '白赟',
    title: 'Product Owner',
    desc: '大道至简',
  },
  {
    avatar: `${baseURL}/白彬彬.png`,
    name: '白彬彬',
    title: 'Product Owner',
    desc: '生死看淡，不服就干',
  },
  {
    avatar: `${baseURL}/樊聪.png`,
    name: '樊聪',
    title: 'Product Owner',
    desc: '快乐工作，快乐生活',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },

]



const partners = [
  {
    avatar: `${baseURL}/付晨璞.png`,
    name: '付晨璞',
    title: 'Product Owner',
    desc: 'Connecting The Dots'
  },
  {
    avatar: `${baseURL}/加霖.png`,
    name: '加霖',
    title: 'Product Owner',
    desc: '好的软件特征是，明明没用过，但总觉得用过似的',
  },
  {
    avatar: `${baseURL}/李彦芝.png`,
    name: '李彦芝',
    title: 'Product Owner',
    desc: '山不向我走来，我便向山走去',
  },
    {
    avatar: `${baseURL}/雷振杰.png`,
    name: '雷振杰',
    title: 'Product Owner',
    desc: '永不停歇，持续迭代',

  },
  {
    avatar: `${baseURL}/李孟奇.png`,
    name: '李孟奇',
    title: 'Product Owner',
    desc: '嗷，向优秀的产品迈进',

  },
]


</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的产品</template>
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
