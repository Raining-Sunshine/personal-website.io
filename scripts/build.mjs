import { build } from "vite";
import react from "@vitejs/plugin-react";
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { routes } from "../src/config/routes.js";
import { routePath, seoPages, siteUrl, siteName, websiteSchema } from "../src/config/seo.js";

const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
if (Object.values(routes).some((route) => !seoPages[route])) throw new Error("Missing route SEO metadata");
await build();
const template = await readFile("dist/index.html", "utf8");
await build({
  configFile: false,
  plugins: [react()],
  publicDir: false,
  build: {
    ssr: "src/prerender.jsx",
    outDir: "dist/.prerender",
    rollupOptions: { output: { entryFileNames: "render.mjs" } },
  },
});
try {
  const { render } = await import("../dist/.prerender/render.mjs");
  for (const [route, page] of Object.entries(seoPages)) {
    const path = routePath(route);
    const url = siteUrl + path;
    const metadata = `
    <meta name="description" content="${escape(page.description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:title" content="${escape(page.title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${siteUrl}/header.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(page.title)}" />
    <meta name="twitter:description" content="${escape(page.description)}" />
    <meta name="twitter:image" content="${siteUrl}/header.png" />
    <script type="application/ld+json">${JSON.stringify(websiteSchema).replaceAll("<", "\\u003c")}</script>`;
    const html = template.replace('<html lang="en">', `<html lang="${page.language}">`)
      .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
      .replace("</head>", `${metadata}\n  </head>`)
      .replace('<div id="root"></div>', () => `<div id="root">${render(route)}</div>`);
    const directory = path === "/" ? "dist" : `dist${path}`;
    await mkdir(directory, { recursive: true });
    await writeFile(`${directory}/index.html`, html);
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(seoPages).map(route => `  <url><loc>${siteUrl}${routePath(route)}</loc></url>`).join("\n")}\n</urlset>\n`;
  await writeFile("dist/sitemap.xml", sitemap);
  await writeFile("dist/404.html", '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, follow"><title>Page not found | Diotima’s blog</title></head><body><main><h1>Page not found</h1><p><a href="/">Return to Home</a></p></main></body></html>');
  console.log(`Generated ${Object.keys(seoPages).length} pages and sitemap.xml`);
} finally {
  await rm("dist/.prerender", { recursive: true, force: true });
}
