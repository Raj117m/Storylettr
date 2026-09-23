import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function Section({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h4 className="font-interface text-sm font-semibold mb-1.5" style={{ color: 'var(--forward)' }}>
        {title}
      </h4>
      <ul className="space-y-1.5 list-disc pl-5">
        {items.map((item, i) => (
          <li key={i} className="leading-normal">{item}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Collapsed-by-default drawer styled like an envelope flap. Lists the
 * sources, what was verified, and what couldn't be.
 */
export default function HowWeKnowThis({ sources = [], verified = [], couldNotVerify = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-md border overflow-hidden" style={{ borderColor: 'var(--forward)' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--ink) 5%, transparent)',
          clipPath: 'polygon(0 0, 50% 12px, 100% 0, 100% 100%, 0 100%)',
        }}
      >
        <span className="font-headline text-lg font-semibold" style={{ color: 'var(--ink)' }}>
          How we know this
        </span>
        <ChevronDown
          className="w-4 h-4 shrink-0"
          style={{ color: 'var(--ink)', transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </button>

      {open && (
        <div className="font-interface px-4 py-4 space-y-4 text-[15px]" style={{ color: 'var(--ink)' }}>
          <Section title="Sources" items={sources} />
          <Section title="What we verified" items={verified} />
          <Section title="What we couldn't verify" items={couldNotVerify} />
        </div>
      )}
    </div>
  );
}
