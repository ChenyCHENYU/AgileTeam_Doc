/**
 * 生态版本事实源 —— 全站唯一的机器可读版本数据。
 *
 * 维护约定：
 * 1. 升级生态包时先改这里，再同步 grep 各 md 中的旧版本号（reviewAfter 到期会强制提醒复核）。
 * 2. README.md / README_EN.md 使用 npm 动态徽章，不需要手工改版本。
 * 3. 此文件供 HomePage.vue 等构建期代码引用；文档正文中的版本号仍为文本，依赖 check-freshness 门禁兜底。
 */
export const VERSIONS = {
  robotAdmin: "v2.7.0",
  naiveUiComponents: "v0.40.5",
  componentCount: "63",
  uniappComponents: "35",
  machTable: "v0.42.1",
  machReport: "v2.26.1",
  machEngines: "2",
  robotCli: "v3.3.0",
  packagesCount: "8",
  engineeringPlugins: "8",
  robotUniapp: "v1.0.0",
  robotH5: "v1.8.0",
  h5Core: "v1.2.0",
  robotCloud: "v1.0.0-SNAPSHOT",
  docPages: "270+",
  roleTracks: "6",
};
