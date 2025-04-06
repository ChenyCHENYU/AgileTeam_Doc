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

import { gitee, blog, robot} from '../../.vitepress/svg.ts'

import { baseURL } from './baseURL.ts'


const coreMembers = [
  {
    avatar: `${baseURL}/cheny.png`,
    name: 'CHENY',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/ChenyCHENYU'},
      { icon: gitee, link: 'https://gitee.com/ycyplus163'},
      { icon: blog, link: 'https://www.yangchenyu.com/'}, 
      { icon: robot, link: 'https://www.robotadmin.cn/'},
    ],
    desc: '不忘初心，方得始终',
    sponsor: 'https://www.tzagileteam.com/',
    actionText: 'Contribution'
  },
  {
    avatar: `${baseURL}/何乾.png`,
    name: '何乾',
    title: 'OM',
    desc:'扶我青云志，踏歌至山巅'
    },
  {
    avatar: `${baseURL}/孔慧.png`,
    name: '孔慧',
    title: 'HRD',
    desc:'准备好，跟着节奏走就对了'
  }
]

const tecList = [
  {
    avatar: `${baseURL}/史乐乐.png`,
    name: '史乐乐',
    title: 'Product Owner Lead',
    desc: '冲',
  },
  {
    avatar: `${baseURL}/张东.png`,
    name: '张东',
    title: 'Tech Lead',
    desc: '只要拼不死，就往死里拼',
  },
  {
    avatar: `${baseURL}/潘超越.png`,
    name: '潘超越',
    title: 'Tech Lead Architect',
    desc: '认知是我们的一生之敌',
  },
  {
    avatar: `${baseURL}/千静妮.png`,
    name: '千静妮',
    title: 'Quality Control Lead',
    desc: '知行合一，笃行致远',
  },
  {
    avatar: `${baseURL}/薛旭杰.png`,
    name: '薛旭杰', 
    title: 'DevOps Lead',
    desc:'洞察力是取胜的关键，一定不要让你的警觉松懈',
  },
]
const pmoList = [
  // {
  //   avatar: `${baseURL}/潘超越.png`,
  //   name: '潘超越',
  //   title: 'Platform PM',
  //   desc: '认知是我们的一生之敌',
  //   links: [
  //   //   { icon: 'github', link: 'https://github.com/yyx990803' },
  //   ]
  // },
  {
    avatar: `${baseURL}/陶夺旗.png`,
    name: '陶夺旗',
    title: 'PM',
    desc: '天生傲骨，怎可认输',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: `${baseURL}/郝伟伟.png`,
    name: '郝伟伟',
    title: 'PM',
    desc: '凡事换位思考，人生就会瞬间豁然开朗'
  },
  {
    avatar: `${baseURL}/巩敏政.png`,
    name: '巩敏政',
    title: 'PO PM',
    desc: '世界一直在变化，结果由我们来决定'
  },
  {
    avatar: `${baseURL}/何光明.png`,
    name: '何光明',
    title: 'PM Substitute',
    desc: '相信自己，并了解你自己',
  },
]

const pmoSubList = [
  {
    avatar: `${baseURL}/马钧.png`,
    name: '马钧',
    title: 'Developers',
    desc: '正义绝不妥协！',
  },
  {
    avatar: `${baseURL}/肖斌.png`,
    name: '肖斌',
    title: 'PM Substitute',
    desc: '只要思想不滑坡，办法总比困难多',
  },
]

</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>TEC & PMO</template>
    <template #lead>组长 | PMS | 委员</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <VPTeamPageSection>
    <template #title>Teacher Effect Controls</template>
    <template #lead>核心成员</template>
    <template #members>
      <VPTeamMembers size="small" :members="tecList" />
    </template>
  </VPTeamPageSection>    
  <VPTeamPageSection>
    <template #title>Project Management Office</template>
    <template #lead>核心成员</template>
    <template #members>
      <VPTeamMembers size="small" :members="pmoList" />
    </template>
  </VPTeamPageSection>
  <VPTeamPageSection>
    <template #title></template>
    <template #lead>潜补成员</template>
    <template #members>
      <VPTeamMembers size="small" :members="pmoSubList" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>

