const ROBOT = "/robot";

export const ROBOT_GUIDE_DOC = [
  {
    text: "开始入门",
    items: [
      {
        text: "概述",
        link: `${ROBOT}/guide/overview`,
      },
      {
        text: "快速上手",
        link: `${ROBOT}/guide/get-started`,
      },
    ],
  },
  {
    text: "深度搜索",
    collapsed: false,
    items: [
      {
        text: "架构",
        collapsed: false,
        items: [
          {
            text: "应用架构",
            link: `${ROBOT}/components/icon/overview`,
          },
          {
            text: "组件系统",
            link: `${ROBOT}/components/icon/basic`,
          },
          {
            text: "插件架构",
            link: `${ROBOT}/components/icon/library`,
          },
        ],
      },
      {
        text: "核心功能",
        collapsed: true,
        items: [
          {
            text: "认证与授权",
            link: `${ROBOT}/components/button/basic`,
          },
          {
            text: "路由与导航",
            link: `${ROBOT}/components/button/types`,
          },
          {
            text: "状态管理",
            link: `${ROBOT}/components/button/sizes`,
          },
        ],
      },
    ],
  },
  {
    text: "表单组件",
    collapsed: false,
    items: [
      {
        text: "级联选择器",
        items: [
          {
            text: "基础用法",
            link: `${ROBOT}/components/cascade/basic`,
          },
          {
            text: "数据源配置",
            link: `${ROBOT}/components/cascade/datasource`,
          },
        ],
      },
    ],
  },
];

export const ROBOT_COMPONENTS_DOC = [
  {
    text: "写在前面的话",
    items: [
      {
        text: "前言",
        link: `${ROBOT}/components/preface`,
      },
    ],
  },
  {
    text: "示范组件",
    items: [
      {
        text: "[C_Icon] 图标",
        link: `${ROBOT}/components/icon`,
      },
      {
        text: "[C_Cascade] 级联选择器",
        link: `${ROBOT}/components/cascade`,
      },
      {
        text: "[C_Progress] 进度条",
        link: `${ROBOT}/components/progress`,
      },
      {
        text: "[C_Time] 时间选择器",
        link: `${ROBOT}/components/time`,
      },
      {
        text: "[C_Date] 日期选择器",
        link: `${ROBOT}/components/date`,
      },
      {
        text: "[C_City] 城市选择器",
        link: `${ROBOT}/components/city`,
      },
      {
        text: "[C_Form] 表单",
        link: `${ROBOT}/components/form`,
      },
      {
        text: "[C_FormSearch] 搜索表单",
        link: `${ROBOT}/components/form-search`,
      },
      {
        text: "[C_Table] 表格",
        link: `${ROBOT}/components/table`,
      },
    ],
  },
  {
    text: "插件组件",
    items: [
      {
        text: "[C_FullCalendar] 日历",
        link: `${ROBOT}/components/calendar`,
      },
      {
        text: "[C_Cascade] 拖拽",
        link: `${ROBOT}/components/dragable`,
      },
    ],
  },
  {
    text: "编辑器组件",
    items: [
      {
        text: "[C_Code] 代码编辑器",
        link: `${ROBOT}/components/code`,
      },
      {
        text: "[C_Markdown] MD编辑器",
        link: `${ROBOT}/components/markdown`,
      },
      {
        text: "[C_Editor] 富文本编辑器",
        link: `${ROBOT}/components/editor`,
      },
      {
        text: "[C_Workflow] 工作流编辑器",
        link: `${ROBOT}/components/work-flow`,
      },
      {
        text: "[C_AntV] 图形编辑器",
        link: `${ROBOT}/components/antv`,
      },
    ],
  },
];

const WEB = "/web";

export const WEB_DOC = [
  {
    text: "快速上手",
    items: [
      {
        text: "了解前端工程化",
        link: `${WEB}/get-familiar-quickly/engineering`,
      },
      {
        text: "工程化的前期准备",
        link: `${WEB}/get-familiar-quickly/guide`,
      },
      {
        text: "快速上手 TypeScript",
        link: `${WEB}/get-familiar-quickly/typescript`,
      },
    ],
  },
  {
    text: "Vue3 基础指北",
    items: [
      {
        text: "脚手架的升级与配置",
        link: `${WEB}/introduction/upgrade`,
      },
      {
        text: "单组件的编写",
        link: `${WEB}/introduction/component`,
      },
      {
        text: "路由的使用",
        link: `${WEB}/introduction/router`,
      },
      {
        text: "插件的开发和使用",
        link: `${WEB}/introduction/plugin`,
      },
      {
        text: "组件之间的通信",
        link: `${WEB}/introduction/communication`,
      },
      {
        text: "全局状态的管理",
        link: `${WEB}/introduction/pinia`,
      },
      {
        text: "Vue3.2 语法糖",
        link: `${WEB}/introduction/efficient`,
      },
    ],
  },
  {
    text: "编码风格及规范",
    items: [
      {
        text: "编码工具",
        link: `${WEB}/coding-specification/codeing-tool`,
      },
      {
        text: "编码规范",
        link: `${WEB}/coding-specification/codeing-standard`,
      },
      {
        text: "ES6实践",
        link: `${WEB}/coding-specification/es6-practice`,
      },
      {
        text: "git提交规范",
        link: `${WEB}/coding-specification/git-commit`,
      },
    ],
  },
  {
    text: "聚焦 Vue3 实战",
    items: [
      {
        text: "Composition API",
        link: `${WEB}/actual-ombat/vue3-composition-api`,
      },
      {
        text: "更多新语法细节",
        link: `${WEB}/actual-ombat/vue3-new-grammar`,
      },
      {
        text: "掌握 JSX 语法场景",
        link: `${WEB}/actual-ombat/vue3-jsx-component-writing`,
      },
      {
        text: "Git 的使用",
        link: `${WEB}/actual-ombat/git`,
      },
      {
        text: "Npm、Nvm、Yarn、Pnpm 使用",
        link: `${WEB}/actual-ombat/npm`,
      },
      {
        text: "测试页面",
        link: `${WEB}/actual-ombat/test-demo`,
      },
    ],
  },
  {
    text: "扩展阅读",
    items: [
      {
        text: "常用文档",
        link: `${WEB}/links`,
      },
    ],
  },
];

// 产品文档相关的sidebar

const PO = "/po";

export const PO_DOC = [
  {
    text: "WEB 端产品设计规范",
    items: [
      {
        text: "写在前面的话",
        link: `${PO}/standard/introduction`,
      },
      {
        text: "设计价值观",
        link: `${PO}/standard/value`,
      },
      {
        text: "设计原则",
        link: `${PO}/standard/principle`,
      },
      {
        text: "视觉风格",
        link: `${PO}/standard/visual-style`,
      },
      {
        text: "通用模式",
        link: `${PO}/standard/universal-mode`,
      },
    ],
  },
  {
    text: "产品需求的管理方法",
    items: [
      {
        text: "调研问卷提纲",
        link: `${PO}/requirement/survey`,
      },
      {
        text: "需求池示例",
        link: `${PO}/requirement/demand-pool`,
      },
      {
        text: "需求规格说明书",
        link: `${PO}/requirement/specification`,
      },
      {
        text: "需求分析标准工作方法",
        link: `${PO}/requirement/analyze`,
      },
      {
        text: "需求分析工具表单",
        link: `${PO}/requirement/tool-form`,
      },
      {
        text: "解决方案模板",
        link: `${PO}/requirement/scheme`,
      },
      {
        text: "需求调研标准流程",
        link: `${PO}/requirement/survey-criteria`,
      },
      {
        text: "需求调研计划",
        link: `${PO}/requirement/plan`,
      },
      {
        text: "需求调研报告",
        link: `${PO}/requirement/report`,
      },
    ],
  },
];

// 设计文档相关的sidebar
const UI = "/ui";

export const UI_DOC = [
  {
    text: "ui 设计规范",
    items: [
      {
        text: "浅谈设计规范",
        link: `${UI}/standard/introduction`,
      },
      {
        text: "文字规范",
        link: `${UI}/standard/text`,
      },
      {
        text: "色彩规范",
        link: `${UI}/standard/color`,
      },
      {
        text: "阴影规范",
        link: `${UI}/standard/shadow`,
      },
      {
        text: "圆角规范",
        link: `${UI}/standard/fillet`,
      },
      {
        text: "布局规范",
        link: `${UI}/standard/layout`,
      },
      {
        text: "图标规范",
        link: `${UI}/standard/icon`,
      },
      {
        text: "文案规范",
        link: `${UI}/standard/copywriting`,
      },
      {
        text: "组件库规范",
        link: `${UI}/standard/components`,
      },
    ],
  },
  {
    text: "ui 工作流程",
    items: [
      {
        text: "需求分析",
        link: `${UI}/work-flow/demand-analysis`,
      },
      {
        text: "原型设计",
        link: `${UI}/work-flow/prototype`,
      },
      {
        text: "视觉设计",
        link: `${UI}/work-flow/visual`,
      },
      {
        text: "设计评审",
        link: `${UI}/work-flow/review`,
      },
    ],
  },
  {
    text: "ui 其他资料",
    items: [
      {
        text: "图片资源",
        link: `${UI}/other/imgs`,
      },
    ],
  },
];

// 后端文档相关的sidebar

const REAR_END = "/rear-end";

export const REAR_END_DOC = [
  {
    text: "后端标准规范",
    items: [
      {
        text: "天智 java 规范",
        link: `${REAR_END}/standard/norm`,
      },
      {
        text: "版本管理(后续完善迁移)",
        link: `${REAR_END}/edition`,
      },
    ],
  },
];

// 测试文档相关的sidebar

const QC = "/qc";

export const QC_DOC = [
  {
    text: "QC 测试规范",
    items: [
      {
        text: "流程规范",
        link: `${QC}/standard/norm`,
      },
      {
        text: "策略设计",
        link: `${QC}/standard/strategy`,
      },
      {
        text: "用例设计标准",
        link: `${QC}/standard/use-case`,
      },
      {
        text: "用例设计方法",
        link: `${QC}/standard/desgin`,
      },
    ],
  },
];

// 管理文档相关的sidebar

const JOB_RESPONSIBILITY = "/manage/job-responsibility";

const TEMPLATES = "/manage/templates";

export const MANAGE_DOC = [
  {
    text: "职责模型（心法）",
    items: [
      {
        text: "PM：项目经理",
        link: `${JOB_RESPONSIBILITY}/pm`,
      },
      {
        text: "PO：产品经理",
        link: `${JOB_RESPONSIBILITY}/po`,
      },
      {
        text: "UX：界面交互设计师",
        link: `${JOB_RESPONSIBILITY}/ui`,
      },
      {
        text: "RD：前端工程师",
        link: `${JOB_RESPONSIBILITY}/rd`,
      },
      {
        text: "BD：后端工程师",
        link: `${JOB_RESPONSIBILITY}/bd`,
      },
      {
        text: "QC：测试工程师",
        link: `${JOB_RESPONSIBILITY}/qc`,
      },
      {
        text: "OP：运维工程师",
        link: `${JOB_RESPONSIBILITY}/op`,
      },
    ],
  },
  {
    text: "模板库（打法）",
    items: [
      {
        text: "PM：Manager",
        link: `${TEMPLATES}/pm-template`,
      },
      {
        text: "PO：Manager",
        link: `${TEMPLATES}/po-template`,
      },
      {
        text: "UX：Manager",
        link: `${TEMPLATES}/ui-template`,
      },
    ],
  },
  {
    text: "考核模型（办法）",
    items: [
      {
        text: "PM：Verify",
        link: `${TEMPLATES}/pm-verify`,
      },
    ],
  },
];
