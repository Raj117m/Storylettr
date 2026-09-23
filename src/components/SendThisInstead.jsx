import React from 'react';
import { Send } from 'lucide-react';

/**
 * Antique-brass WhatsApp share button (sticky at the bottom of the screen on mobile). Opens WhatsApp with a
 * 3-4 line plain-text summary plus the link, signed "via StoryLettr.com".
 */
export default function SendThisInstead({ headline, summary, url, sticky = false }) {
  const message = `${headline}\n\n${summary}\n\n${url}\n\nvia StoryLettr.com`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 font-semibold text-sm px-5 py-3 rounded-full ${
        sticky ? 'fixed bottom-4 left-1/2 -translate-x-1/2 z-30 sm:hidden' : ''
      }`}
      style={{ backgroundColor: 'var(--action)', color: 'var(--action-ink)' }}
    >
      <Send className="w-4 h-4" />
      Send this instead
    </a>
  );
}
