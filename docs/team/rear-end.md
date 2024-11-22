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
    avatar: `${baseURL}/潘超越.png`,
    name: '潘超越',
    title: 'Tech Lead Architect',
    desc: '认知是我们的一生之敌',
  },
  {
    avatar: `${baseURL}/赵建昌.png`,
    name: '赵建昌',
    title: 'Tech Lead',
    desc: '知行合一，方能成就',
  },
  {
    avatar: `${baseURL}/郝伟伟.png`,
    name: '郝伟伟',
    title: 'PM',
    desc: '凡事换位思考，人生就会瞬间豁然开朗'
  },
  {
    avatar: `${baseURL}/何光明.png`,
    name: '何光明',
    title: 'Developers',
    desc: '相信自己，并了解你自己',
  },

  {
    avatar: `${baseURL}/马钧.png`,
    name: '马钧',
    title: 'Developers',
    desc: '正义绝不妥协！',
  },
  {
    avatar: `${baseURL}/肖斌.png`,
    name: '肖斌',
    title: 'Developers',
    desc: '只要思想不滑坡，办法总比困难多',
  },
  {
    avatar: `${baseURL}/常海.png`,
    name: '常海',
    title: 'Developers',
    desc: '干就完了',
  },
  {
    avatar: `${baseURL}/张杰.png`,
    name: '张杰',
    title: 'Developers',
    desc: '快乐是旅程，而非终点',
  },
  {
    avatar: `${baseURL}/权雷雷.png`,
    name: '权雷雷',
    title: 'Developers',
    desc:'纵有疾风起，人生不言弃',
  },
  {
    avatar: `${baseURL}/李杨.png`,
    name: '李杨',
    title: 'Developers',
    desc: '用代码改变世界，用科技引领未来',
  },
  {
    avatar: `${baseURL}/王云一.png`,
    name: '王云一',
    title: 'Developers',
    desc: '心脏是最强大的肌肉',
  },
  {
    avatar: `${baseURL}/罗栋楠.png`,
    name: '罗栋楠',
    title: 'Developers',
    desc: '遇事不要慌，太阳明早会照常升起',
  },
  {
    avatar: `${baseURL}/李建超.png`,
    name: '李建超',
    title: 'Developers',
    desc: '不为小事烦恼，宽容待人才是明智之举',
  },
  {
    avatar: `${baseURL}/邓源鹤.png`,
    name: '邓源鹤',
    title: 'Developers',
    desc: '不去羡慕别人的成功，只专注当下的努力，用奋斗拼搏出一个未来',
  },
  {
    avatar: `${baseURL}/许志成.png`,
    name: '许志成',
    title: 'Developers',
    desc: '乐观的人永葆青春，悲观的人虽生犹死',
  },
]


const partners = [
  {
    avatar: `${baseURL}/王宇坤.png`,
    name: '王宇坤',
    title: 'Technical Supervisor',
    desc: '智慧源于勤奋，未来属于创新',
  },
  {
    avatar: `${baseURL}/陈超.png`,
    name: '陈超',
    title: 'Developers',
    desc:'知足常乐',
  },
  {
    avatar: `${baseURL}/宋凯.png`,
    name: '宋凯',
    title: 'Developers',
    desc:'脚踏实地,不负韶华',
  },
  {
    avatar: `${baseURL}/周湛.png`,
    name: '周湛', 
    title: 'Developers',
    desc:'精诚所至，金石为开',
  },
  {
    avatar: `${baseURL}/兰杨岩.png`,
    name: '兰杨岩',
    title: 'Developers',
    desc: '勇敢的人先享受世界！',
  },
  {
    avatar: `${baseURL}/苏杰.png`,
    name: '苏杰',
    title: 'Developers',
    desc: '只有高手才能活下来！',
  },
]


</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的后端</template>
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
