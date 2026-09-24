import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function TenSecondSummary({ takeaways = [] }) {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div
      className="rounded-lg p-5 my-6 border space-y-3 font-interface shadow-2xs"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--forward) 8%, var(--paper))',
        borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)',
        color: 'var(--ink)',
      }}
    >
      <div className="flex items-center justify-between">
        <h3
          className="text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          style={{ color: 'var(--primary)' }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
          The Letter in 10 Seconds
        </h3>
        <span className="text-[11px] font-mono text-xs" style={{ color: 'var(--forward)' }}>
          Quick Takeaway
        </span>
      </div>

      <ul className="space-y-2 text-[15px] leading-relaxed">
        {takeaways.map((point, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span
              className="font-bold text-base leading-none select-none mt-1"
              style={{ color: 'var(--primary)' }}
            >
              •
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div
        className="pt-2 border-t flex items-center gap-1.5 text-xs font-semibold"
        style={{ borderColor: 'color-mix(in srgb, var(--primary) 15%, transparent)', color: 'var(--forward)' }}
      >
        <span>Keep reading to see the mechanism</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </div>
  );
}
