import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { seoPages, siteUrl, routePath } from '../src/config/seo.js';

const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.equal(new Set(urls).size, Object.keys(seoPages).length);
for (const [route, page] of Object.entries(seoPages)) {
  const path = routePath(route);
  const url = siteUrl + path;
  const html = await readFile(`dist${path === '/' ? '' : path}/index.html`, 'utf8');
  assert.ok(urls.includes(url), `Sitemap entry: ${route}`);
  assert.ok(html.includes(`<html lang="${page.language}">`));
  assert.ok(html.includes(`<title>${page.title}</title>`), `Title: ${route}`);
  assert.ok(html.includes('name="robots" content="index, follow"'));
  assert.ok(html.includes('name="description" content="'));
  assert.equal([...html.matchAll(/rel="canonical"/g)].length, 1);
  assert.ok(html.includes(`rel="canonical" href="${url}"`));
  assert.ok(html.includes(`property="og:url" content="${url}"`));
  assert.ok(html.includes('<main') && html.includes('<h1'), `Rendered body: ${route}`);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema['@type'], 'WebSite');
  assert.equal(schema.url, siteUrl + '/');
  for (const [, href] of html.matchAll(/<a[^>]*href="(\/[^"?#]*)"/g)) {
    await access(`dist${href === '/' ? '' : href.replace(/\/$/, '')}/index.html`);
  }
}
assert.ok((await readFile('dist/404.html', 'utf8')).includes('noindex, follow'));
assert.ok((await readFile('dist/robots.txt', 'utf8')).includes(`Sitemap: ${siteUrl}/sitemap.xml`));
console.log(`SEO checks passed for ${urls.length} pages: metadata, rendered content, links, JSON-LD, sitemap and robots rules.`);
