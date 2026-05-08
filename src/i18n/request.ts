import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    onError(error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[next-intl]", error);
      }
    },
    getMessageFallback({ namespace, key }) {
      const path = namespace ? `${namespace}.${key}` : key;
      return process.env.NODE_ENV === "production" ? path : `!!!${path}!!!`;
    },
  };
});
