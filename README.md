# Diotima Chang Personal Website

This repository contains the source for a Vite + React personal website.

## Local Development

Install dependencies:

```sh
npm ci
```

Start the development server:

```sh
npm run dev
```

Build the static site:

```sh
npm run build
```

The generated site is written to `dist/`.

## GitHub Pages

The site is deployed by GitHub Actions from `.github/workflows/pages.yml`.

When changes are pushed to `main`, the workflow installs dependencies, runs `npm run build`, uploads `dist/`, and deploys it to GitHub Pages.

The repository no longer needs `node_modules/`, `dist/`, or `dist.tar.gz` committed. Those files are generated locally or inside the GitHub Actions runner.

## Search engine metadata

Edit `src/config/seo.js` to configure each route's title, description, original language and canonical URL. Titles use `Page | Diotima’s blog`. When adding a route in `src/config/routes.js`, also add its SEO entry; the build checks this coverage.

`npm run build` renders each page into its own `dist/<route>/index.html`, including the original-language body, metadata, Open Graph/Twitter tags and WebSite JSON-LD. React hydrates these pages for navigation and language switching. The build also generates `dist/sitemap.xml` from the same route metadata; it does not invent modification dates. The sitemap lists original pages, since translations share their URLs.

`public/robots.txt` allows crawling and advertises the sitemap. Unknown paths use a separate `404.html` with `noindex`; valid pages no longer depend on a 404 fallback. Use `npm run preview` to inspect the production output.
