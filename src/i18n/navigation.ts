import { createNavigation } from "next-intl/navigation";
import { routing, type SourcePath } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

type RouteParams = Record<string, string | string[]>;

/**
 * Build a typed-pathnames href from `usePathname()` + `useParams()`.
 * - Strips the [locale] segment (next-intl's typed Href expects only route-specific params).
 * - Localizes the cast in one place so callers stay clean.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Href = any;

export function localeHref(pathname: string, params: RouteParams): Href {
  const { locale: _locale, ...routeParams } = params;
  return { pathname: pathname as SourcePath, params: routeParams } as Href;
}
