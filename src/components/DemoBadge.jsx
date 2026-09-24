import React from 'react';

export default function DemoBadge({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${className}`}
      style={{
        backgroundColor: 'color-mix(in srgb, var(--action) 12%, transparent)',
        borderColor: 'var(--action)',
        color: 'var(--ink)',
        fontWeight: 600,
      }}
      title="Prototype illustration: Real-world operational concept with sample/demo data."
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--action)' }} />
      Demo / Prototype Example
    </span>
  );
}
