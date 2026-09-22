import { useEffect } from 'react';
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
export default function PageMeta({ title, description, path, image, type = 'website' }) {
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

  return null;
}
