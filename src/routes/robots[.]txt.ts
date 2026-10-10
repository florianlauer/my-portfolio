import { createFileRoute } from "@tanstack/react-router";
import { getBaseUrl } from "@/utils/siteUrl";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(`User-Agent: *\nAllow: /\n\nSitemap: ${getBaseUrl()}/sitemap.xml\n`, {
          headers: { "Content-Type": "text/plain" },
        }),
    },
  },
});
