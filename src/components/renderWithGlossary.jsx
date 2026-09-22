import React from 'react';
import TapForContext from './TapForContext';
import { GLOSSARY } from '../data/content';

/**
 * Wraps the first occurrence of each glossary term (from a story's
 * tapForContext list) in a paragraph with a tap-for-context expander.
 * Only the very first mention across the whole article is wrapped, so
 * reading isn't cluttered with repeats.
 */
export default function renderWithGlossary(paragraphs, tapForContextKeys = []) {
  const remaining = new Set(tapForContextKeys);

  return paragraphs.map((text, pIdx) => {
    if (remaining.size === 0) return <p key={pIdx}>{text}</p>;

    let nodes = [text];
    for (const key of Array.from(remaining)) {
      const term = GLOSSARY[key]?.term;
      if (!term) continue;
      const idx = nodes.findIndex((n) => typeof n === 'string' && n.toLowerCase().includes(term.toLowerCase()));
      if (idx === -1) continue;

      const str = nodes[idx];
      const lower = str.toLowerCase();
      const pos = lower.indexOf(term.toLowerCase());
      const before = str.slice(0, pos);
      const match = str.slice(pos, pos + term.length);
      const after = str.slice(pos + term.length);

      const replacement = [];
      if (before) replacement.push(before);
      replacement.push(
        <TapForContext key={`${pIdx}-${key}`} termKey={key}>{match}</TapForContext>
      );
      if (after) replacement.push(after);

      nodes = [...nodes.slice(0, idx), ...replacement, ...nodes.slice(idx + 1)];
      remaining.delete(key);
    }

    return <p key={pIdx}>{nodes}</p>;
  });
}
