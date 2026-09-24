import React from 'react';
import DemoBadge from './DemoBadge';

export default function BeforeAfterBlock({ title, beforeLabel = 'Before', beforeValue, afterLabel = 'After', afterValue, explanation }) {
  return (
    <div
      className="rounded-lg p-6 my-8 border font-interface shadow-2xs space-y-4"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--paper) 97%, var(--forward))',
        borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)',
      }}
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
          {title || 'Operational Shift Comparison'}
        </h4>
        <DemoBadge />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {/* Before */}
        <div
          className="p-4 rounded-md border space-y-1.5"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--forward) 8%, var(--paper))',
            borderColor: 'color-mix(in srgb, var(--forward) 30%, transparent)',
          }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-wider block" style={{ color: 'var(--forward)' }}>
            {beforeLabel}
          </span>
          <p className="font-headline text-lg sm:text-xl font-semibold leading-tight" style={{ color: 'var(--ink)' }}>
            {beforeValue}
          </p>
        </div>

        {/* After */}
        <div
          className="p-4 rounded-md border space-y-1.5"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--primary) 10%, var(--paper))',
            borderColor: 'var(--primary)',
          }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-wider block" style={{ color: 'var(--primary)' }}>
            {afterLabel}
          </span>
          <p className="font-headline text-lg sm:text-xl font-semibold leading-tight" style={{ color: 'var(--ink)' }}>
            {afterValue}
          </p>
        </div>
      </div>

      {explanation && (
        <p className="text-xs font-interface" style={{ color: 'var(--forward)' }}>
          {explanation}
        </p>
      )}
    </div>
  );
}
