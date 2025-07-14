import type { DefaultTheme } from 'vitepress'

import {
  ROBOT_DOC,
  WEB_DOC,
  PO_DOC,
  REAR_END_DOC,
  QC_DOC,
  UI_DOC,
  MANAGE_DOC,
} from './sidebarArr'

export const sidebar: DefaultTheme.Sidebar = {
  '/robot/': ROBOT_DOC,
  '/po/': PO_DOC,
  '/ui/': UI_DOC,
  '/web/': WEB_DOC,
  '/rear-end/': REAR_END_DOC,
  '/qc/': QC_DOC,
  '/manage/': MANAGE_DOC,
}
