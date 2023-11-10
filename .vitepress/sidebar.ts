/*
 * @Author: ChenYu
 * @Date: 2022-10-22 17:14:01
 * @LastEditors: ChenYu ycyplus@gmail.com
 * @LastEditTime: 2023-11-09 16:11:58
 * @FilePath: \my-agile-team-document\.vitepress\sidebar.ts
 * @Description:
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */


import type { DefaultTheme } from 'vitepress'

import { 
  WEB_DOC,
  WEB_COMPONENT, 
  PO_DOC
} from './sidebarArr'


export const sidebar: DefaultTheme.Sidebar = {
  '/web/':   WEB_DOC,
  '/web-component/': WEB_COMPONENT,
  '/po/': PO_DOC,
}

