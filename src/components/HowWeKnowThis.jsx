import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Collapsed-by-default drawer styled like an envelope flap. Lists
 * sources, what was verified, and what couldn't be.
 */
export default function HowWeKnowThis({ verified = [], couldNotVerify = [] }) {
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
        <span className="font-headline text-base" style={{ color: 'var(--ink)' }}>
          How we know this
        </span>
        <ChevronDown
          className="w-4 h-4 shrink-0 transition-transform"
          style={{ color: 'var(--ink)', transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </button>

      {open && (
        <div className="px-4 py-4 space-y-4 text-sm" style={{ color: 'var(--ink)' }}>
          {verified.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--forward)' }}>
                Verified
              </h4>
              <ul className="space-y-1.5 list-disc list-inside">
                {verified.map((item, i) => (
                  <li key={i} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          )}
          {couldNotVerify.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--forward)' }}>
                Could not verify
              </h4>
              <ul className="space-y-1.5 list-disc list-inside">
                {couldNotVerify.map((item, i) => (
                  <li key={i} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
