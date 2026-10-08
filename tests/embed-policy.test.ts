/*
 * @Author: ChenYu ycyplus@gmail.com
 * @Date: 2026-10-09
 * @FilePath: \AgileTeam_Doc\tests\embed-policy.test.ts
 * @Description: 文档站嵌入来源与安全响应头的部署契约
 */
import { describe, expect, test } from "bun:test";
import config from "../vercel.json";

const headers =
  config.headers.find((rule) => rule.source === "/(.*)")?.headers ?? [];
const header = (name: string) =>
  headers.find((item) => item.key.toLowerCase() === name.toLowerCase())?.value;

describe("文档站嵌入策略", () => {
  test("允许正式 Robot Admin 与本机开发来源，拒绝泛域放行", () => {
    const csp = header("Content-Security-Policy") ?? "";
    const ancestors =
      csp
        .match(/(?:^|;)\s*frame-ancestors\s+([^;]+)/)?.[1]
        ?.trim()
        .split(/\s+/) ?? [];
    expect(ancestors).toContain("'self'");
    expect(ancestors).toContain("https://robotadmin.cn");
    expect(ancestors).toContain("https://www.robotadmin.cn");
    expect(ancestors).toContain("http://localhost:*");
    expect(ancestors).toContain("http://127.0.0.1:*");
    expect(
      ancestors.every(
        (source) =>
          source === "'self'" ||
          /^(?:https:\/\/(?:www\.)?robotadmin\.cn|http:\/\/(?:localhost|127\.0\.0\.1):\*)$/.test(
            source,
          ),
      ),
    ).toBe(true);
    expect(header("X-Frame-Options")).toBeUndefined();
  });

  test("保留 MIME、来源与静态资源缓存响应头", () => {
    expect(header("X-Content-Type-Options")).toBe("nosniff");
    expect(header("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(
      config.headers.find((rule) => rule.source === "/assets/(.*)")?.headers,
    ).toContainEqual({
      key: "Cache-Control",
      value: "public, max-age=31536000, immutable",
    });
  });
});
