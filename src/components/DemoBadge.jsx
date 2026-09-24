import React from 'react';

export default function DemoBadge({ type = 'story', className = '' }) {
  const label = type === 'data' ? 'Example data' : 'Illustrative story';
  return (
    <span
      className={`text-[11px] font-mono tracking-tight inline-flex items-center gap-1 select-none ${className}`}
      style={{ color: 'var(--text-muted)' }}
      title={type === 'data' ? 'Example dataset for illustrative exploration' : 'Illustrative story demonstrating real-world operational principles'}
      aria-label={label}
    >
      <span className="w-1 h-1 rounded-full opacity-60" style={{ backgroundColor: 'var(--text-muted)' }} aria-hidden="true" />
      <span className="italic">{label}</span>
    </span>
  );
}
