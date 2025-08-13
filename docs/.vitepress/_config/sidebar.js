/*
 * @Author: ChenYu ycyplus@gmail.com
 * @Date: 2025-08-02 20:05:40
 * @LastEditors: ChenYu ycyplus@gmail.com
 * @LastEditTime: 2025-08-04 23:04:44
 * @FilePath: \agile_team_doc\docs\.vitepress\_config\sidebar.js
 * @Description:
 * Copyright (c) 2025 by CHENY, All Rights Reserved 😎.
 */
import {
  ROBOT_GUIDE_DOC,
  ROBOT_COMPONENTS_DOC,
  WEB_DOC,
  PO_DOC,
  REAR_END_DOC,
  QC_DOC,
  UI_DOC,
  MANAGE_DOC,
  ROBOT_PLUGIN_DOC
} from "./sidebarArr";

export default {
  "/robot/guide/": ROBOT_GUIDE_DOC,
  "/robot/components/": ROBOT_COMPONENTS_DOC,
  "/robot/plugin/": ROBOT_PLUGIN_DOC,
  "/po/": PO_DOC,
  "/ui/": UI_DOC,
  "/web/": WEB_DOC,
  "/rear-end/": REAR_END_DOC,
  "/qc/": QC_DOC,
  "/manage/": MANAGE_DOC,
};
