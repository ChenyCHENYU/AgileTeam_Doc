// 前端文档相关的sidebar

const WEB = '/web'
const COMPONENT = '/web-component'

export const WEB_DOC = [
  {
    text: '快速上手',
    items: [
      {
        text: '了解前端工程化',
        link: `${WEB}/get-familiar-quickly/engineering`,
      },
      {
        text: '工程化的前期准备',
        link: `${WEB}/get-familiar-quickly/guide`,
      },
      {
        text: '快速上手 TypeScript',
        link: `${WEB}/get-familiar-quickly/typescript`,
      },
    ],
  },
  {
    text: 'Vue3 基础指北',
    items: [
      {
        text: '脚手架的升级与配置',
        link: `${WEB}/introduction/upgrade`,
      },
      {
        text: '单组件的编写',
        link: `${WEB}/introduction/component`,
      },
      {
        text: '路由的使用',
        link: `${WEB}/introduction/router`,
      },
      {
        text: '插件的开发和使用',
        link: `${WEB}/introduction/plugin`,
      },
      {
        text: '组件之间的通信',
        link: `${WEB}/introduction/communication`,
      },
      {
        text: '全局状态的管理',
        link: `${WEB}/introduction/pinia`,
      },
      {
        text: 'Vue3.2 语法糖',
        link: `${WEB}/introduction/efficient`,
      },
    ],
  },
  {
    text: '编码风格及规范',
    items: [
      {
        text: '编码工具',
        link: `${WEB}/coding-specification/codeing-tool`,
      },
      {
        text: '编码规范',
        link: `${WEB}/coding-specification/codeing-standard`,
      },
      {
        text: 'ES6实践',
        link: `${WEB}/coding-specification/es6-practice`,
      },
    ],
  },
  {
    text: '聚焦 Vue3 实战',
    items: [
      {
        text: 'Composition API',
        link: `${WEB}/actual-ombat/vue3-composition-api`,
      },
      {
        text: '更多新语法细节',
        link: `${WEB}/actual-ombat/vue3-new-grammar`,
      },
      {
        text: '掌握 JSX 语法场景',
        link: `${WEB}/actual-ombat/vue3-jsx-component-writing`,
      },
      {
        text: 'Git 的使用',
        link: `${WEB}/actual-ombat/git`,
      },
      {
        text: 'Npm、Nvm、Yarn、Pnpm 使用',
        link: `${WEB}/actual-ombat/npm`,
      },
    ],
  },
  {
    text: '扩展阅读',
    items: [
      {
        text: '常用文档',
        link: `${WEB}/links`,
      },
    ],
  },
]

// 前端组件相关的sidebar

export const WEB_COMPONENT = [
  {
    text: '组件',
    items: [
      {
        text: '前言',
        link: `${COMPONENT}/preface`,
      },
    ],
  },
  {
    text: '常用组件',
    items: [
      {
        text: 'Icon 图标',
        link: `${COMPONENT}/icon`,
      },
      {
        text: 'Cascade 级联选择器',
        link: `${COMPONENT}/cascade`,
      },
      {
        text: 'Notice 通知',
        link: `${COMPONENT}/notice`,
      },
      {
        text: 'Menu 菜单',
        link: `${COMPONENT}/menu`,
      },
      {
        text: 'Progress 进度条',
        link: `${COMPONENT}/progress`,
      },
      {
        text: 'Time 时间选择器',
        link: `${COMPONENT}/time`,
      },
      {
        text: 'Date 日期选择器',
        link: `${COMPONENT}/date`,
      },
      {
        text: 'City 城市选择器',
        link: `${COMPONENT}/city`,
      },
      {
        text: 'Form 表单',
        link: `${COMPONENT}/form`,
      },
      {
        text: 'FormSearch 表单搜索',
        link: `${COMPONENT}/form-search`,
      },
      {
        text: 'Table 表格',
        link: `${COMPONENT}/table`,
      },
      {
        text: 'Calendar 日历',
        link: `${COMPONENT}/calendar`,
      },
    ],
  },
]

// 产品文档相关的sidebar

const PO = '/po'

export const PO_DOC = [
  {
    text: 'WEB 端产品设计规范',
    items: [
      {
        text: '写在前面的话',
        link: `${PO}/standard/introduction`,
      },
      {
        text: '设计价值观',
        link: `${PO}/standard/value`,
      },
      {
        text: '设计原则',
        link: `${PO}/standard/principle`,
      },
      {
        text: '视觉风格',
        link: `${PO}/standard/visual-style`,
      },
      {
        text: '通用模式',
        link: `${PO}/standard/universal-mode`,
      },
    ],
  },
  {
    text: '产品需求的管理方法',
    items: [
      {
        text: '调研问卷提纲',
        link: `${PO}/requirement/survey`,
      },
      {
        text: '需求池示例',
        link: `${PO}/requirement/demand-pool`,
      },
      {
        text: '需求规格说明书',
        link: `${PO}/requirement/specification`,
      },
      {
        text: '需求分析标准工作方法',
        link: `${PO}/requirement/analyze`,
      },
      {
        text: '需求分析工具表单',
        link: `${PO}/requirement/tool-form`,
      },
      {
        text: '解决方案模板',
        link: `${PO}/requirement/scheme`,
      },
      {
        text: '需求调研标准流程',
        link: `${PO}/requirement/survey-criteria`,
      },
      {
        text: '需求调研计划',
        link: `${PO}/requirement/plan`,
      },
      {
        text: '需求调研报告',
        link: `${PO}/requirement/report`,
      },
    ],
  },
]

// 设计文档相关的sidebar
const UI = '/ui'

export const UI_DOC = [
  {
    text: 'ui 设计规范',
    items: [
      {
        text: '浅谈设计规范',
        link: `${UI}/standard/introduction`,
      },
      {
        text: '文字规范',
        link: `${UI}/standard/text`,
      },
      {
        text: '色彩规范',
        link: `${UI}/standard/color`,
      },
      {
        text: '阴影规范',
        link: `${UI}/standard/shadow`,
      },
      {
        text: '圆角规范',
        link: `${UI}/standard/fillet`,
      },
      {
        text: '布局规范',
        link: `${UI}/standard/layout`,
      },
      {
        text: '图标规范',
        link: `${UI}/standard/icon`,
      },
      {
        text: '文案规范',
        link: `${UI}/standard/copywriting`,
      },
      {
        text: '组件库规范',
        link: `${UI}/standard/components`,
      },
    ],
  },
  {
    text: 'ui 工作流程',
    items: [
      {
        text: '需求分析',
        link: `${UI}/work-flow/demand-analysis`,
      },
      {
        text: '原型设计',
        link: `${UI}/work-flow/prototype`,
      },
      {
        text: '视觉设计',
        link: `${UI}/work-flow/visual`,
      },
      {
        text: '设计评审',
        link: `${UI}/work-flow/review`,
      },
    ],
  },
  {
    text: 'ui 其他资料',
    items: [
      {
        text: '图片资源',
        link: `${UI}/other/imgs`,
      },
    ],
  },
]

// 后端文档相关的sidebar

const REAR_END = '/rear-end'

export const REAR_END_DOC = [
  {
    text: '后端标准规范',
    items: [
      {
        text: '天智 java 规范',
        link: `${REAR_END}/standard/norm`,
      },
      {
        text: '版本管理(后续完善迁移)',
        link: `${REAR_END}/edition`,
      },
    ],
  },
]

// 测试文档相关的sidebar

const QC = '/qc'

export const QC_DOC = [
  {
    text: '测试标准流程',
    items: [
      {
        text: '测试流程规范',
        link: `${QC}/standard/norm`,
      },
      {
        text: '测试策略设计',
        link: `${QC}/standard/strategy`,
      },
      {
        text: '测试用例设计标准',
        link: `${QC}/standard/use-case`,
      },
      {
        text: '测试用例设计方法',
        link: `${QC}/standard/desgin`,
      },
      {
        text: '测试过程度量规范',
        link: `${QC}/standard/desgin`,
      },
    ],
  },
]
