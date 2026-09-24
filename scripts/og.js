// Build-time image generation: app icons and 1200x630 Open Graph link
// previews. Draws plain SVG strings (same shapes as Logo.jsx / Seal.jsx,
// in the light-mode palette) and rasterises them with resvg, using the
// site's own fonts so previews match the pages.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { Resvg } from '@resvg/resvg-js';

const require = createRequire(import.meta.url);
const font = (pkg, file) => require.resolve(`@expo-google-fonts/${pkg}/${file}`);
const FONT_FILES = [
  font('cormorant-garamond', '600SemiBold/CormorantGaramond_600SemiBold.ttf'),
  font('cormorant-garamond', '600SemiBold_Italic/CormorantGaramond_600SemiBold_Italic.ttf'),
  font('libre-franklin', '400Regular/LibreFranklin_400Regular.ttf'),
  font('libre-franklin', '600SemiBold/LibreFranklin_600SemiBold.ttf'),
];

// Light-mode palette (the brief's tokens), plus the logo-only gold.
const C = {
  paper: '#F1E9D8',
  ink: '#2A211C',
  primary: '#1C3D5C',
  seal: '#6B2331',
  forward: '#6E655A',
  logoGold: '#C9A45C',
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function render(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontFiles: FONT_FILES, loadSystemFonts: false, defaultFontFamily: 'Libre Franklin' },
  });
  return resvg.render().asPng();
}

// --- Logo (same drawing as src/components/Logo.jsx) --------------------

function logoInner() {
  return `
    <g fill="none" stroke="${C.logoGold}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="10.5" y="18.5" width="11" height="7.5" rx="1" fill="${C.primary}"/>
      <path d="M10.5 19 L16 23 L21.5 19"/>
      <path d="M8 15.5c1-3 4-5.5 7.5-5.5 4 0 7 2.8 7.7 6.3.2 1-.5 1.9-1.5 1.9H10c-1.3 0-2.3-1.3-2-2.7z" fill="${C.primary}"/>
      <path d="M13 11c1.5-1.8 3.6-2.6 5.6-2 1.6.5 2.6 1.8 2.9 3.3"/>
      <circle cx="21.3" cy="10.6" r="1.9" fill="${C.primary}"/>
      <path d="M23 10.3 L24.6 10.9 L23 11.6" fill="${C.logoGold}" stroke="none"/>
    </g>`;
}

function logoSvg({ rounded = true } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="${rounded ? 8 : 0}" fill="${C.primary}"/>${logoInner()}</svg>`;
}

// --- Wax seal (same shapes as src/components/Seal.jsx) ------------------

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function blobPath(cx, cy, r, seed, wobble = 0.06) {
  const rand = mulberry32(seed);
  let d = '';
  for (let i = 0; i <= 18; i++) {
    const angle = (i / 18) * Math.PI * 2;
    const rr = r * (1 - wobble / 2 + rand() * wobble);
    d += `${i === 0 ? 'M' : 'L'} ${(cx + rr * Math.cos(angle)).toFixed(2)} ${(cy + rr * Math.sin(angle)).toFixed(2)} `;
  }
  return d + 'Z';
}

function laurel(flip) {
  return [0, 1, 2, 3, 4].map((i) => {
    const t = i / 4;
    const x = 50 + (flip ? -1 : 1) * (6 + t * 13);
    const y = 78 - t * 9;
    const rot = (flip ? -1 : 1) * (30 + t * 25);
    return `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="1.6" fill="${C.paper}" opacity="0.85" transform="rotate(${rot} ${x} ${y})"/>`;
  }).join('');
}

// Returns a <g> drawing the seal in a 100x100 box, for placement with a transform.
function sealGroup({ broken, seed = 0, id }) {
  const blob = blobPath(50, 50, 45, seed * 97 + 11);
  const sheen = `<radialGradient id="${id}" cx="38%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.32"/>
      <stop offset="55%" stop-color="#FFFFFF" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>`;
  const letter = (ch, x, y) =>
    `<text x="${x}" y="${y}" font-size="30" text-anchor="middle" fill="${C.paper}" opacity="0.95" font-family="Cormorant Garamond" font-weight="600">${ch}</text>`;
  const medallion = `<path d="${blob}" fill="${C.seal}"/><path d="${blob}" fill="url(#${id})"/>
      <circle cx="50" cy="50" r="35" fill="none" stroke="${C.paper}" stroke-width="1" opacity="0.55"/>`;
  if (!broken) {
    return `<defs>${sheen}</defs>${medallion}${laurel(false)}${laurel(true)}${letter('S', 42, 58)}${letter('L', 58, 50)}`;
  }
  return `<defs>${sheen}
      <clipPath id="${id}-l"><path d="M 50 4 L 46 22 L 51 38 L 45 54 L 50 70 L 47 96 L 2 96 L 2 4 Z"/></clipPath>
      <clipPath id="${id}-r"><path d="M 50 4 L 54 22 L 49 38 L 55 54 L 50 70 L 53 96 L 98 96 L 98 4 Z"/></clipPath></defs>
    <g transform="translate(-3.5 -1) rotate(-7 50 50)"><g clip-path="url(#${id}-l)">${medallion}${letter('S', 40, 58)}</g></g>
    <g transform="translate(3.5 1) rotate(7 50 50)"><g clip-path="url(#${id}-r)">${medallion}${letter('L', 60, 50)}</g></g>`;
}

// --- Text layout ---------------------------------------------------------

// Greedy word wrap using an average glyph width per font (good enough for
// headline-length text; the budget leaves slack for wide glyphs).
function wrap(text, fontSize, maxWidth, avgCharEm) {
  const maxChars = Math.max(8, Math.floor(maxWidth / (fontSize * avgCharEm)));
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function textBlock(lines, { x, y, size, lineHeight, family, weight = 400, italic = false, fill }) {
  return lines
    .map((l, i) => `<text x="${x}" y="${y + i * size * lineHeight}" font-family="${family}" font-size="${size}" font-weight="${weight}"${italic ? ' font-style="italic"' : ''} fill="${fill}">${esc(l)}</text>`)
    .join('');
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const datelineDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${String(d).padStart(2, '0')} ${MONTHS[m - 1]} ${y}`;
};

// --- Open Graph cards ----------------------------------------------------

const W = 1200;
const H = 630;

function frame(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${C.paper}"/>
    <rect x="0" y="${H - 18}" width="${W}" height="18" fill="${C.ink}"/>
    <g transform="translate(64 56) scale(1.75)">${logoSvg().replace(/<\/?svg[^>]*>/g, '')}</g>
    <text x="134" y="98" font-family="Cormorant Garamond" font-weight="600" font-size="40" fill="${C.ink}">StoryLettr.com</text>
    ${inner}
  </svg>`;
}

function sealBlock({ broken, datelineText, markText, x = 930, y = 190, size = 200 }) {
  const s = size / 100;
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(-3 50 50)">${sealGroup({ broken, seed: 1, id: 'og-seal' })}</g>
    <text x="${x + size / 2}" y="${y + size + 40}" text-anchor="middle" font-family="Libre Franklin" font-weight="600" font-size="20" letter-spacing="2" fill="${C.forward}">${esc(datelineText)}</text>
    <text x="${x + size / 2}" y="${y + size + 78}" text-anchor="middle" font-family="Libre Franklin" font-weight="600" font-size="26" fill="${C.seal}">${esc(markText)}</text>`;
}

export function factCheckCard({ question, finding, datelineText }) {
  const q = wrap(question, 34, 760, 0.42);
  const f = wrap(finding, 56, 780, 0.43);
  const qY = 190;
  const fY = qY + q.length * 34 * 1.25 + 46;
  return frame(`
    <text x="64" y="160" font-family="Libre Franklin" font-weight="600" font-size="24" fill="${C.forward}">Truth Desk · Forward vs. letter</text>
    ${textBlock(q, { x: 64, y: qY + 30, size: 34, lineHeight: 1.25, family: 'Cormorant Garamond', weight: 600, italic: true, fill: C.forward })}
    ${textBlock(f, { x: 64, y: fY + 50, size: 56, lineHeight: 1.12, family: 'Cormorant Garamond', weight: 600, fill: C.ink })}
    ${sealBlock({ broken: true, datelineText, markText: 'Checked' })}`);
}

export function storyCard({ chapter, headline, summary, datelineText }) {
  const h = wrap(headline, 66, 780, 0.42);
  const sm = wrap(summary, 28, 780, 0.5).slice(0, 3);
  const hY = 230;
  const sY = hY + (h.length - 1) * 66 * 1.1 + 70;
  return frame(`
    <text x="64" y="170" font-family="Libre Franklin" font-weight="600" font-size="24" fill="${C.forward}">${esc(chapter)}</text>
    ${textBlock(h, { x: 64, y: hY, size: 66, lineHeight: 1.1, family: 'Cormorant Garamond', weight: 600, fill: C.ink })}
    ${textBlock(sm, { x: 64, y: sY, size: 28, lineHeight: 1.4, family: 'Libre Franklin', fill: C.ink })}
    ${sealBlock({ broken: false, datelineText, markText: 'Verified' })}`);
}

export function defaultCard() {
  return frame(`
    <text x="64" y="300" font-family="Cormorant Garamond" font-weight="600" font-size="84" fill="${C.ink}">Real stories,</text>
    <text x="64" y="390" font-family="Cormorant Garamond" font-weight="600" font-size="84" fill="${C.ink}">tested in the real world.</text>
    <text x="64" y="470" font-family="Cormorant Garamond" font-weight="600" font-style="italic" font-size="40" fill="${C.primary}">Sharing stories, building real human connection.</text>
    ${sealBlock({ broken: false, datelineText: 'STORYLETTR.COM', markText: 'Verified' })}`);
}

export function writePng(file, svg, width = W) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, render(svg, width));
}

// App icons: full-bleed (platforms apply their own rounding/mask), plus a manifest.
export function writeIcons(outDir) {
  writePng(path.join(outDir, 'apple-touch-icon.png'), logoSvg({ rounded: false }), 180);
  writePng(path.join(outDir, 'icon-192.png'), logoSvg({ rounded: false }), 192);
  writePng(path.join(outDir, 'icon-512.png'), logoSvg({ rounded: false }), 512);
  const manifest = {
    name: 'StoryLettr.com',
    short_name: 'StoryLettr.com',
    description: 'Sharing stories, building real human connection.',
    start_url: '/',
    display: 'standalone',
    background_color: C.paper,
    theme_color: C.primary,
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
  };
  fs.writeFileSync(path.join(outDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
}

export { datelineDate };
