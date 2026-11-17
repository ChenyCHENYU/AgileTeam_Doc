export default [
  ["link", { rel: "icon", href: "/favicon.ico", sizes: "any" }],
  ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
  ["meta", { name: "theme-color", content: "#667eea" }],
  [
    "meta",
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ],
  // og:title / og:description / og:url / og:image / canonical 由 config.js transformHead 按页注入
  ["meta", { property: "og:type", content: "website" }],
  ["meta", { property: "og:locale", content: "zh-CN" }],
  ["meta", { property: "og:site_name", content: "AGILE TEAM" }],
  ["meta", { name: "twitter:card", content: "summary_large_image" }],
];
