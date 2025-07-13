import type { DefaultTheme } from 'vitepress'

import {
  WEB_DOC,
  WEB_COMPONENT,
  PO_DOC,
  REAR_END_DOC,
  QC_DOC,
  UI_DOC,
  MANAGE_DOC
} from './sidebarArr'

export const sidebar: DefaultTheme.Sidebar = {
  '/web/': WEB_DOC,
  '/web-component/': WEB_COMPONENT,
  '/po/': PO_DOC,
  '/rear-end/': REAR_END_DOC,
  '/qc/': QC_DOC,
  '/ui/': UI_DOC,
  '/manage/': MANAGE_DOC,
}
