import React, { useEffect } from 'react';
import { setHead } from '../head';

const SITE = 'StoryLettr.com';
const ORIGIN = 'https://storylettr.com';

/**
 * Sets the page's <title>, meta description, and Open Graph tags.
 * Renders nothing itself: during prerendering, the values are captured
 * via the head side-channel and injected into <head> by the build
 * script; in the browser, a client-side route change re-applies them
 * directly to the DOM.
 */
// Section index pages a nested path can point back to in its breadcrumbs.
const SECTION_INDEXES = {
  mumbai: { name: 'Browse by neighbourhood', path: '/mumbai' },
};

// BreadcrumbList for any page, built from its path and title:
// StoryLettr.com > (section index, when one exists) > this page.
function breadcrumbsFor(path, title) {
  const home = { name: SITE, path: '/' };
  if (path === '/') return [home];
  const crumbs = [home];
  const section = SECTION_INDEXES[path.split('/')[1]];
  if (section && section.path !== path) crumbs.push(section);
  crumbs.push({ name: title.split(' | ')[0], path });
  return crumbs;
}

/**
 * Pages that build their own, more specific BreadcrumbList (stories,
 * explainers and fact-checks) pass breadcrumbs={false}.
 */
export default function PageMeta({ title, description, path, image, type = 'website', breadcrumbs = true }) {
  const canonical = `${ORIGIN}${path}`;
  const head = { title, description, canonical, image, type, siteName: SITE };

  // Runs during render on both server and client (renderToString is
  // synchronous), so it's always current by the time the page finishes.
  setHead(head);

  useEffect(() => {
    document.title = title;
    const setMeta = (selector, attrs) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        Object.entries(attrs).forEach(([k, v]) => {
          if (k !== 'content') el.setAttribute(k, v);
        });
        document.head.appendChild(el);
      }
      el.setAttribute('content', attrs.content);
    };
    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE });
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);
  }, [title, description, canonical]);

  if (!breadcrumbs || path === '/404') return null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbsFor(path, title).map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${ORIGIN}${c.path}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
