import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite-plus";
import { IMAGE_WIDTHS } from "./src/components/image/widths";

/**
 * Public base URL, resolved at build time for canonical URLs, hreflang, sitemap and robots.
 * VERCEL_PROJECT_PRODUCTION_URL is preferred over VERCEL_URL (which changes per preview deploy).
 */
function resolveSiteUrl(): string {
  const { SITE_URL, VERCEL_PROJECT_PRODUCTION_URL, VERCEL_URL, VERCEL_ENV } = process.env;
  if (SITE_URL) return SITE_URL.replace(/\/$/, "");
  if (VERCEL_PROJECT_PRODUCTION_URL) return `https://${VERCEL_PROJECT_PRODUCTION_URL}`;
  if (VERCEL_URL) return `https://${VERCEL_URL}`;
  // A production deploy without a resolved URL would ship wrong sitemaps and hreflang.
  if (VERCEL_ENV === "production") {
    throw new Error("[siteUrl] Set SITE_URL (or VERCEL_PROJECT_PRODUCTION_URL) for production.");
  }
  return "http://localhost:3000";
}

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  define: {
    __SITE_URL__: JSON.stringify(resolveSiteUrl()),
    // `/_vercel/image` only exists on Vercel; elsewhere images are served as-is.
    __VERCEL_IMAGES__: JSON.stringify(process.env.VERCEL === "1"),
  },
  // Framework plugins boot the app's server entry, which unit tests don't need (and which fails
  // under Vitest). Add them back here if component tests ever need them.
  plugins: process.env.VITEST
    ? []
    : [
        tailwindcss(),
        tanstackStart(),
        nitro({
          rolldownConfig: {
            onwarn(warning, warn) {
              // Dependencies ship "use client" directives, meaningless without RSC.
              if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
              warn(warning);
            },
          },
          // Umami, served first-party: Nitro emits this as a Vercel CDN rewrite.
          routeRules: { "/u/**": { proxy: "https://stats.flauercase.dev/**" } },
          vercel: {
            config: {
              version: 3,
              images: {
                sizes: IMAGE_WIDTHS,
                domains: [],
                formats: ["image/avif", "image/webp"],
                minimumCacheTTL: 60 * 60 * 24 * 30,
              },
            },
          },
        }),
        // React's plugin must come after Start's.
        viteReact(),
      ],
  lint: {
    plugins: ["react", "jsx-a11y", "typescript"],
    categories: {
      correctness: "error",
      suspicious: "warn",
      perf: "warn",
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      // Introduced by the oxlint upgrade that came with Vite+; following them means reworking
      // the gallery/lightbox/filters markup, which is out of scope for the toolchain migration.
      "jsx-a11y/prefer-tag-over-role": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
    },
    settings: {
      react: {
        linkComponents: [{ name: "Link", attribute: "href" }],
      },
    },
    env: { builtin: true },
    ignorePatterns: [".output/**", ".nitro/**", ".tanstack/**", "src/routeTree.gen.ts"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    // Planning/docs markdown is hand-written; only code is formatted.
    ignorePatterns: [
      "src/routeTree.gen.ts",
      ".planning/**",
      "_bmad/**",
      "_bmad-output/**",
      "docs/**",
    ],
  },
});
