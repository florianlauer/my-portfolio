import type { ComponentProps } from "react";
import { Link as RouterLink, useLocation } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { getPathname, hasLocale, toSourcePath, type Locale, type SourcePath } from "./routing";

export { getPathname };

/** Router route for each source path. The router's `rewrite` turns them into localized URLs. */
export const ROUTE_BY_SOURCE_PATH = {
  "/": "/$locale",
  "/a-propos": "/$locale/a-propos",
  "/galerie": "/$locale/galerie",
  "/stack": "/$locale/stack",
} as const satisfies Record<SourcePath, string>;

type LinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: SourcePath;
  /** Target locale, defaults to the current one. */
  locale?: Locale;
};

/** Locale-aware link taking a source path (`/a-propos`), rendered as the localized URL. */
export function Link({ href, locale, ...props }: LinkProps): React.JSX.Element {
  const currentLocale = useLocale();
  return (
    <RouterLink
      {...props}
      to={ROUTE_BY_SOURCE_PATH[href]}
      params={{ locale: locale ?? currentLocale }}
    />
  );
}

/** Current source path without the locale prefix (`/`, `/a-propos`...), like next-intl's usePathname. */
export function usePathname(): SourcePath | undefined {
  const { pathname } = useLocation();
  const [, locale, ...rest] = pathname.split("/");
  if (!hasLocale(locale)) return undefined;
  const path = `/${rest.filter(Boolean).join("/")}`;
  return toSourcePath(path, locale) ?? (isSourcePath(path) ? path : undefined);
}

/** Internal router path (`/en/a-propos`) ↔ public URL (`/en/about`). */
export const localeRewrite = {
  input: ({ url }: { url: URL }): URL => rewritePath(url, toInternalPath),
  output: ({ url }: { url: URL }): URL => rewritePath(url, toPublicPath),
};

function rewritePath(url: URL, rewrite: (locale: Locale, rest: string) => string | undefined): URL {
  const [, locale, ...rest] = url.pathname.split("/");
  if (!hasLocale(locale)) return url;
  const next = rewrite(locale, `/${rest.filter(Boolean).join("/")}`);
  if (next) url.pathname = next;
  return url;
}

function toInternalPath(locale: Locale, localizedPath: string): string | undefined {
  const sourcePath = toSourcePath(localizedPath, locale);
  if (!sourcePath) return undefined;
  return sourcePath === "/" ? `/${locale}` : `/${locale}${sourcePath}`;
}

function toPublicPath(locale: Locale, path: string): string | undefined {
  return isSourcePath(path) ? getPathname({ locale, href: path }) : undefined;
}

export function isSourcePath(path: string): path is SourcePath {
  return path in ROUTE_BY_SOURCE_PATH;
}
