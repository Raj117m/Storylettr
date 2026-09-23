// Prerenders every route to real static HTML at build time, so story
// text (and every other page's content) is present in the page's HTML
// rather than injected by JavaScript after load. Run after both the
// client and SSR builds (see package.json's "build" script).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(__dirname, 'dist/client');
const serverDir = path.join(__dirname, 'dist/server');
const finalDir = path.join(__dirname, 'dist');

const { render } = await import(path.join(serverDir, 'entry-server.js'));
// Plain data, no JSX/React involved, so it's safe to import directly
// from source here to enumerate routes.
const { CHAPTERS, STATIONS, AUTHORS, GLOSSARY, CONTENT, datelineName, chapterById } = await import(
  path.join(__dirname, 'src/data/content.js')
);
const og = await import(path.join(__dirname, 'scripts/og.js'));

const ORIGIN = 'https://storylettr.com';

function routeHrefFor(item) {
  if (item.type === 'fact-check') return `/fact-checks/${item.slug}`;
  if (item.type === 'explainer') return `/explainers/${item.slug}`;
  return `/stories/${item.slug}`;
}

const routes = new Set([
  '/',
  '/mumbai',
  '/truth-desk',
  '/about',
  '/corrections',
  '/newsletter',
]);
CHAPTERS.forEach((c) => routes.add(`/chapters/${c.id}`));
Object.keys(STATIONS).forEach((slug) => routes.add(`/mumbai/${slug}`));
Object.keys(AUTHORS).forEach((slug) => routes.add(`/authors/${slug}`));
Object.keys(GLOSSARY).forEach((term) => routes.add(`/glossary/${term}`));
CONTENT.forEach((item) => routes.add(routeHrefFor(item)));

const template = fs.readFileSync(path.join(clientDir, 'index.html'), 'utf-8');

// --- Link-preview images (1200x630) and app icons ----------------------
// Each story, explainer and fact-check gets its own card; a fact-check's
// card shows the finding itself, not a teaser. Every other page uses the
// site's default card.
og.writeIcons(clientDir);
og.writePng(path.join(clientDir, 'og/default.png'), og.defaultCard());
const OG_BY_ROUTE = {};
for (const item of CONTENT) {
  const route = routeHrefFor(item);
  const file = `og/${item.type}-${item.slug}.png`;
  const dateline = `${datelineName(item.station)} · ${og.datelineDate(item.postmark.date)}`;
  const svg = item.type === 'fact-check'
    ? og.factCheckCard({ question: item.headline, finding: item.finding || item.verdict, datelineText: dateline })
    : og.storyCard({ chapter: chapterById(item.chapter)?.name || '', headline: item.headline, summary: item.summary, datelineText: dateline });
  og.writePng(path.join(clientDir, file), svg);
  OG_BY_ROUTE[route] = { url: `${ORIGIN}/${file}`, alt: item.type === 'fact-check' ? `${item.headline} ${item.finding || item.verdict}` : item.headline };
}
const DEFAULT_OG = { url: `${ORIGIN}/og/default.png`, alt: "StoryLettr.com: Mumbai's news, told as it happened." };

function buildHeadTags(head, urlPath) {
  if (!head) return '';
  const { title, description, canonical, image, type, siteName } = head;
  const esc = (s) => String(s || '').replace(/"/g, '&quot;');
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta property="og:type" content="${esc(type || 'website')}" />`,
    `<meta property="og:site_name" content="${esc(siteName || 'StoryLettr.com')}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
  ];
  const ogImage = OG_BY_ROUTE[urlPath] || DEFAULT_OG;
  tags.push(
    `<meta property="og:image" content="${esc(image || ogImage.url)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(ogImage.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(image || ogImage.url)}" />`,
  );
  tags.push(`<link rel="canonical" href="${esc(canonical)}" />`);
  return tags.join('\n    ');
}

function writePage(urlPath, html) {
  const outDir = urlPath === '/' ? clientDir : path.join(clientDir, urlPath);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
}

let count = 0;
for (const route of routes) {
  const { html, head } = render(route);
  const page = template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace('<!--app-head-->', buildHeadTags(head, route))
    // The default <title>/<meta description>/OG tags baked into the
    // template are for the homepage only; every other route's head tags
    // fully replace them via the block appended above, so strip the
    // template's own copies to avoid duplicates.
    .replace(/\n\s*<title>.*?<\/title>/, '')
    .replace(/\n\s*<meta name="description"[^>]*>/, '')
    .replace(/\n\s*<meta property="og:type"[^>]*>/, '')
    .replace(/\n\s*<meta property="og:site_name"[^>]*>/, '')
    .replace(/\n\s*<meta property="og:title"[^>]*>/, '')
    .replace(/\n\s*<meta property="og:description"[^>]*>/, '')
    .replace(/\n\s*<meta property="og:url"[^>]*>/, '')
    .replace(/\n\s*<link rel="canonical"[^>]*>/, '');
  writePage(route, page);
  count += 1;
}

// A real 404 page for GitHub Pages (served automatically for any
// unmatched path when a file named 404.html sits at the site root).
const notFound = render('/this-page-does-not-exist');
const notFoundPage = template
  .replace('<div id="root"></div>', `<div id="root">${notFound.html}</div>`)
  .replace('<!--app-head-->', buildHeadTags(notFound.head, '/404'));
fs.writeFileSync(path.join(clientDir, '404.html'), notFoundPage, 'utf-8');

// Sitemap
const sitemapEntries = [...routes].map((r) => `  <url><loc>${ORIGIN}${r === '/' ? '/' : r}</loc></url>`).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
fs.writeFileSync(path.join(clientDir, 'sitemap.xml'), sitemap, 'utf-8');
fs.writeFileSync(path.join(clientDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml\n`, 'utf-8');

console.log(`Prerendered ${count} routes + 404.html + sitemap.xml + ${Object.keys(OG_BY_ROUTE).length + 1} share images + app icons`);

// Promote dist/client to the final dist/, drop the server-only build.
fs.rmSync(finalDir + '__old', { recursive: true, force: true });
for (const entry of fs.readdirSync(finalDir)) {
  if (entry === 'client' || entry === 'server') continue;
  fs.rmSync(path.join(finalDir, entry), { recursive: true, force: true });
}
for (const entry of fs.readdirSync(clientDir)) {
  fs.renameSync(path.join(clientDir, entry), path.join(finalDir, entry));
}
fs.rmSync(clientDir, { recursive: true, force: true });
fs.rmSync(serverDir, { recursive: true, force: true });

console.log('dist/ is ready to deploy.');
