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
     desc: '不忘初心，方得始终'
  },
  {
    avatar: '/assets/team/王宇坤.png',
    name: '王宇坤',
    title: 'Technical Supervisor',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/郝伟伟.png',
    name: '郝伟伟',
    title: 'Tech Lead',
    desc: ''
  },
  {
    avatar: '/assets/team/潘超越.png',
    name: '潘超越',
    title: 'Architect',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/何光明.png',
    name: '何光明',
    title: 'Developers',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/苏杰.png',
    name: '苏杰',
    title: 'Developers',
    desc: ' ',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/马钧.png',
    name: '马钧',
    title: 'Developers',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/杨佩.png',
    name: '肖斌',
    title: 'Developers',
    desc: '每天都要优雅的写好每一行代码',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/兰杨岩.png',
    name: '兰杨岩',
    title: 'Developers',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/李杨.png',
    name: '李杨',
    title: 'Developers',
    desc: '',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },

  {
    avatar: '/assets/team/权雷雷.png',
    name: '权雷雷',
    title: 'Developers',
    desc:'',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/宋凯.png',
    name: '宋凯',
    title: 'Developers',
    desc:'',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/陈超.png',
    name: '陈超',
    title: 'Developers',
    desc:'',
    links: [
    //   { icon: 'github', link: 'https://github.com/yyx990803' },
    ]
  },
  {
    avatar: '/assets/team/周湛.png',
    name: '周湛', 
    title: 'Developers',
    desc:'',
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
