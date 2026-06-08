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
