import { createFileRoute } from "@tanstack/react-router";

// The storefront is a standalone vanilla site: public/index.html + /styles.css + /app.js.
// This route serves that HTML file directly at "/" — no React on the page.
import indexHtml from "../../public/index.html?raw";

export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: () =>
        new Response(indexHtml, {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    },
  },
});
