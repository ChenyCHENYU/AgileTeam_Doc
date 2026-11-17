export default [
  {
    text: "Robot Admin",
    activeMatch: "^/robot/",
    items: [
      { text: "深度指南", link: "/robot/guide/overview" },
      { text: "组件文档", link: "/robot/components/preface" },
      { text: "插件文档", link: "/robot/plugin/console" },
      { text: "生态包", link: "/robot/packages/preface" },
      { text: "脚手架-cli", link: "/robot/cli/index" },
    ],
  },
  {
    text: "Robot uniApp",
    activeMatch: "^/(uniapp|h5)/",
    items: [
      { text: "深度指南", link: "/uniapp/guide/overview" },
      { text: "组件文档", link: "/uniapp/components/preface" },
      { text: "Robot_H5 框架", link: "/h5/overview" },
    ],
  },
  {
    text: "Mach 生态",
    activeMatch: "^/mach/",
    items: [
      { text: "生态总览", link: "/mach/preface" },
      { text: "MachTable 表格引擎", link: "/mach/table" },
      { text: "MachReport 报表引擎", link: "/mach/report" },
      { text: "配置参考", link: "/mach/table-grid-options" },
      { text: "编辑与填报", link: "/mach/report-editing" },
    ],
  },
  {
    text: "文档中心",
    activeMatch: "^/(po|ui|web|rear-end|qc|op|manage|changelog)/",
    items: [
      {
        text: "岗位文档",
        items: [
          { text: "📋 产品文档", link: "/po/standard/introduction" },
          { text: "🎨 设计文档", link: "/ui/standard/introduction" },
          {
            text: "💻 前端文档",
            link: "/web/get-familiar-quickly/engineering",
          },
          { text: "⚙️ 后端文档", link: "/rear-end/standard/norm" },
          { text: "🧪 测试文档", link: "/qc/standard/norm" },
          { text: "🔧 运维文档", link: "/manage/job-responsibility/op" },
        ],
      },
      {
        text: "管理",
        items: [
          { text: "👔 岗位职责", link: "/manage/job-responsibility/pm" },
          { text: "📋 更新日志", link: "/changelog" },
        ],
      },
    ],
  },
  {
    text: "团队英雄墙",
    activeMatch: "/team/",
    items: [
      { text: "📋 产品伙伴", link: "/team/po" },
      { text: "🎨 设计伙伴", link: "/team/ui" },
      { text: "💻 前端伙伴", link: "/team/front-end" },
      { text: "⚙️ 后端伙伴", link: "/team/rear-end" },
      { text: "🧪 测试伙伴", link: "/team/qc" },
      { text: "🔧 运维伙伴", link: "/team/op" },
      { text: "👥 虚拟小组", link: "/team/manage" },
    ],
  },
];
