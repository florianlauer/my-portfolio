import type { IntlError, Messages } from "use-intl";
import type { Locale } from "./routing";

export async function loadMessages(locale: Locale): Promise<Messages> {
  return (await import(`../messages/${locale}.json`)).default;
}

/** Missing keys render as `!!!ns.key!!!` in dev so they stand out, and as the key path in prod. */
export const intlFallbacks = {
  onError(error: IntlError): void {
    if (import.meta.env.DEV) console.error("[use-intl]", error);
  },
  getMessageFallback({ namespace, key }: { namespace?: string; key: string }): string {
    const path = namespace ? `${namespace}.${key}` : key;
    return import.meta.env.DEV ? `!!!${path}!!!` : path;
  },
};
