import { createRouter } from "@tanstack/react-router";
import { localeRewrite } from "@/i18n/navigation";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    rewrite: localeRewrite,
    scrollRestoration: true,
    defaultPreload: "intent",
  });
}
