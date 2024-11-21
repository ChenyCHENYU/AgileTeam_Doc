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
    avatar: '/assets/team/潘超越.png',
    name: '潘超越',
    title: 'Tech Lead Architect',
    desc: '认知是我们的一生之敌',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/赵建昌.png',
    name: '赵建昌',
    title: 'Tech Lead',
    desc: '知行合一，方能成就',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/郝伟伟.png',
    name: '郝伟伟',
    title: 'PM',
    desc: '凡事换位思考，人生就会瞬间豁然开朗'
  },
  {
    avatar: '/assets/team/何光明.png',
    name: '何光明',
    title: 'Developers',
    desc: '相信自己，并了解你自己',
  },

  {
    avatar: '/assets/team/马钧.png',
    name: '马钧',
    title: 'Developers',
    desc: '正义绝不妥协！',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/肖斌.png',
    name: '肖斌',
    title: 'Developers',
    desc: '只要思想不滑坡，办法总比困难多',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/常海.png',
    name: '常海',
    title: 'Developers',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/张杰.png',
    name: '张杰',
    title: 'Developers',
    desc: '快乐是旅程，而非终点',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/权雷雷.png',
    name: '权雷雷',
    title: 'Developers',
    desc:'纵有疾风起，人生不言弃',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/李杨.png',
    name: '李杨',
    title: 'Developers',
    desc: '用代码改变世界，用科技引领未来',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/王云一.png',
    name: '王云一',
    title: 'Developers',
    desc: '心脏是最强大的肌肉',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/罗栋楠.png',
    name: '罗栋楠',
    title: 'Developers',
    desc: '遇事不要慌，太阳明早会照常升起',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/李建超.png',
    name: '李建超',
    title: 'Developers',
    desc: '不为小事烦恼，宽容待人才是明智之举',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/邓源鹤.png',
    name: '邓源鹤',
    title: 'Developers',
    desc: '不去羡慕别人的成功，只专注当下的努力，用奋斗拼搏出一个未来',
  },
  {
    avatar: '/assets/team/许志成.png',
    name: '许志成',
    title: 'Developers',
    desc: '乐观的人永葆青春，悲观的人虽生犹死',
  },
]


const partners = [
  {
    avatar: '/assets/team/王宇坤.png',
    name: '王宇坤',
    title: 'Technical Supervisor',
    desc: '智慧源于勤奋，未来属于创新',
  },
  {
    avatar: '/assets/team/陈超.png',
    name: '陈超',
    title: 'Developers',
    desc:'知足常乐',
  },
  {
    avatar: '/assets/team/宋凯.png',
    name: '宋凯',
    title: 'Developers',
    desc:'脚踏实地,不负韶华',
  },
  {
    avatar: '/assets/team/周湛.png',
    name: '周湛', 
    title: 'Developers',
    desc:'精诚所至，金石为开',
  },
  {
    avatar: '/assets/team/兰杨岩.png',
    name: '兰杨岩',
    title: 'Developers',
    desc: '勇敢的人先享受世界！',
  },
  {
    avatar: '/assets/team/苏杰.png',
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
