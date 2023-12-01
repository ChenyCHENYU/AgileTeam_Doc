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
    avatar: '/assets/team/杨晓明.png',
    name: '杨晓明',
    title: 'Technical Director',
    // links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    //   { icon: 'yotube', link: 'https://gitee.com/ycyplus163' },
    // ],
     desc: '初心如磐，笃行致远， 行而不辍，未来可期'
  },
  {
    avatar: '/assets/team/王宇坤.png',
    name: '王宇坤',
    title: 'Technical Supervisor',
    desc: '智慧源于勤奋，未来属于创新',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/郝伟伟.png',
    name: '郝伟伟',
    title: 'Tech Lead',
    desc: '凡事换位思考，人生就会瞬间豁然开朗'
  },
  {
    avatar: '/assets/team/潘超越.png',
    name: '潘超越',
    title: 'Architect',
    desc: '认知是我们的一生之敌',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/何光明.png',
    name: '何光明',
    title: 'Developers',
    desc: '相信自己，并了解你自己',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/苏杰.png',
    name: '苏杰',
    title: 'Developers',
    desc: '只有高手才能活下来！',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
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
    avatar: '/assets/team/杨佩.png',
    name: '肖斌',
    title: 'Developers',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/兰杨岩.png',
    name: '兰杨岩',
    title: 'Developers',
    desc: '勇敢的人先享受世界！',
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
    avatar: '/assets/team/权雷雷.png',
    name: '权雷雷',
    title: 'Developers',
    desc:'纵有疾风起，人生不言弃',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/宋凯.png',
    name: '宋凯',
    title: 'Developers',
    desc:'脚踏实地,不负韶华',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/陈超.png',
    name: '陈超',
    title: 'Developers',
    desc:'知足常乐',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/周湛.png',
    name: '周湛', 
    title: 'Developers',
    desc:'精诚所至，金石为开',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/郭森淼.png',
    name: '郭森淼', 
    title: 'Big Data',
    desc:'Dare and the world always yields',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/薛旭杰.png',
    name: '薛旭杰', 
    title: 'DevOps',
    desc:'洞察力是取胜的关键!一定不要让你的警觉松懈!',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
]



</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的后端</template>
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
