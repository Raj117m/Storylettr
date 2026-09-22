import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GLOSSARY } from '../data/content';

/**
 * A term with a dotted underline that expands inline when tapped. The
 * full explanation also lives on its own glossary page (linked here).
 */
export default function TapForContext({ termKey, children }) {
  const [open, setOpen] = useState(false);
  const entry = GLOSSARY[termKey];
  if (!entry) return <>{children}</>;

  return (
    <span>
      <button
        type="button"
        className="context-term"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {children}
      </button>
      {open && (
        <span
          className="block my-2 text-sm rounded-md px-3 py-2 border"
          style={{ borderColor: 'var(--forward)', color: 'var(--ink)', backgroundColor: 'color-mix(in srgb, var(--forward) 8%, transparent)' }}
        >
          {entry.short}{' '}
          <Link to={`/glossary/${termKey}`} className="underline font-medium">
            Read more
          </Link>
        </span>
      )}
    </span>
  );
}
