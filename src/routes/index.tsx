import { createFileRoute } from "@tanstack/react-router";
import { negotiateLocale } from "@/i18n/routing";

// `/` has no content: send visitors to their preferred locale (replaces next-intl's middleware).
export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const locale = negotiateLocale(request.headers.get("accept-language"));
        return new Response(null, {
          status: 307,
          headers: { Location: `/${locale}`, Vary: "Accept-Language" },
        });
      },
    },
  },
});
