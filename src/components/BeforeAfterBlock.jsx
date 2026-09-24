import React from 'react';
import { CheckCircle, BarChart3, Sparkles } from 'lucide-react';
import DemoBadge from './DemoBadge';

export default function BeforeAfterBlock({
  title,
  subtitle,
  beforeLabel = 'Before (Ad-Led Model)',
  beforeValue,
  afterLabel = 'After (Referral Architecture)',
  afterValue,
  metrics,
  explanation,
  keyTakeaway,
}) {
  // If structured metrics aren't provided, parse piped strings if present
  let displayMetrics = metrics;

  if (!displayMetrics && beforeValue && afterValue) {
    const beforeParts = typeof beforeValue === 'string' ? beforeValue.split('|').map((s) => s.trim()) : [beforeValue];
    const afterParts = typeof afterValue === 'string' ? afterValue.split('|').map((s) => s.trim()) : [afterValue];

    displayMetrics = beforeParts.map((b, idx) => ({
      metric: `Metric ${idx + 1}`,
      before: b,
      after: afterParts[idx] || afterValue,
      delta: 'Improved',
      trend: 'better',
    }));
  }

  // Fallback default rich metrics if it's the Paid Ads story and no metrics passed
  if (!displayMetrics && title && title.toLowerCase().includes('paid ads')) {
    displayMetrics = [
      {
        metric: 'Blended Acquisition Cost (CAC)',
        before: '₹18,400',
        after: '₹5,800',
        delta: '-68.5% Cost Reduction',
        trend: 'better',
        note: 'Cold ads required expensive repeat impressions; referrals arrived pre-sold on peer trust.',
      },
      {
        metric: '90-Day Customer Churn Rate',
        before: '42%',
        after: '11%',
        delta: '-73.8% Churn Drop',
        trend: 'better',
        note: 'Ad traffic bought on promo discounts; referral traffic bought for core workflow utility.',
      },
      {
        metric: 'Average Sales Cycle Length',
        before: '44 Days',
        after: '14 Days',
        delta: '3.1x Faster Closing',
        trend: 'better',
        note: 'Peer recommendations eliminated committee procurement skepticism.',
      },
      {
        metric: 'Lead-to-Paid Conversion Rate',
        before: '3.2%',
        after: '9.8%',
        delta: '+206% Conversion Lift',
        trend: 'better',
        note: 'Inbound referral shift leads arrived with urgent operational mandates.',
      },
      {
        metric: 'Compounding Dynamics',
        before: 'Linear (Halts on Zero Spend)',
        after: 'Exponential (Perpetual Asset)',
        delta: 'Self-Sustaining Loop',
        trend: 'better',
        note: 'Laminated warehouse guides stayed permanently pinned to operations bulletin boards.',
      },
    ];
  }

  return (
    <section
      className="relative rounded-2xl p-6 sm:p-9 my-12 border card-depth-rich overflow-hidden font-interface transition-all duration-300"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--paper) 98%, white)',
        borderColor: 'color-mix(in srgb, var(--primary) 32%, transparent)',
      }}
    >
      {/* Background Soft Ambient Illumination */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none pulse-glow blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, color-mix(in srgb, var(--action) 40%, transparent) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="space-y-2 mb-8 border-b pb-6 relative z-10" style={{ borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)' }}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--primary) 12%, var(--paper))',
                borderColor: 'color-mix(in srgb, var(--primary) 35%, transparent)',
                color: 'var(--primary)',
              }}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Performance Comparison &bull; Decision Framework</span>
            </span>
          </div>

          <DemoBadge />
        </div>

        <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.2] pt-1" style={{ color: 'var(--ink)' }}>
          {title || 'Performance Comparison: Paid Ads vs Referral Architecture'}
        </h3>

        <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--forward)' }}>
          {subtitle || 'Side-by-side empirical audit of unit economics, velocity, and compounding dynamics.'}
        </p>
      </div>

      {/* Strategic Comparison Columns Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
        {/* Baseline / Old Regime */}
        <div
          className="p-4 sm:p-5 rounded-xl border flex items-center justify-between gap-3"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--forward) 8%, var(--paper))',
            borderColor: 'color-mix(in srgb, var(--forward) 30%, transparent)',
          }}
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: 'var(--forward)' }}>
              Baseline Regime
            </span>
            <span className="font-headline text-xl font-bold block pt-0.5" style={{ color: 'var(--ink)' }}>
              {beforeLabel}
            </span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded border opacity-80" style={{ borderColor: 'var(--forward)', color: 'var(--forward)' }}>
            Linear Return
          </span>
        </div>

        {/* Pivot / New Regime */}
        <div
          className="p-4 sm:p-5 rounded-xl border flex items-center justify-between gap-3 shadow-xs"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--primary) 10%, var(--paper))',
            borderColor: 'var(--primary)',
          }}
        >
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--action)' }} />
              <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: 'var(--primary)' }}>
                The Operational Pivot
              </span>
            </div>
            <span className="font-headline text-xl font-bold block pt-0.5" style={{ color: 'var(--ink)' }}>
              {afterLabel}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full text-emerald-800 bg-emerald-100 border border-emerald-300">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Winning Model</span>
          </div>
        </div>
      </div>

      {/* Metric Comparison Cards */}
      {displayMetrics && displayMetrics.length > 0 ? (
        <div className="space-y-3.5 relative z-10">
          {displayMetrics.map((row, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl border transition-all duration-200 hover:shadow-xs"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--paper) 90%, white)',
                borderColor: 'color-mix(in srgb, var(--primary) 18%, transparent)',
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Metric Label & Note */}
                <div className="space-y-1 lg:max-w-xs">
                  <span className="font-semibold text-sm sm:text-base block" style={{ color: 'var(--ink)' }}>
                    {row.metric}
                  </span>
                  {row.note && (
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--forward)' }}>
                      {row.note}
                    </p>
                  )}
                </div>

                {/* Values Comparison Strip */}
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap lg:justify-end grow">
                  {/* Before */}
                  <div
                    className="p-2.5 sm:p-3 rounded-lg border text-center min-w-[120px] shrink-0"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--forward) 6%, var(--paper))',
                      borderColor: 'color-mix(in srgb, var(--forward) 25%, transparent)',
                    }}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--forward)' }}>
                      Paid Ads
                    </span>
                    <span className="font-headline text-lg sm:text-xl font-bold" style={{ color: 'var(--forward)' }}>
                      {row.before}
                    </span>
                  </div>

                  {/* Transition Arrow / Directional Indicator */}
                  <div className="flex flex-col items-center justify-center px-1">
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full border shadow-2xs whitespace-nowrap"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--primary) 12%, var(--paper))',
                        borderColor: 'color-mix(in srgb, var(--primary) 35%, transparent)',
                        color: 'var(--primary)',
                      }}
                    >
                      {row.delta || '→'}
                    </span>
                  </div>

                  {/* After */}
                  <div
                    className="p-2.5 sm:p-3 rounded-lg border text-center min-w-[140px] shrink-0 shadow-xs"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--primary) 10%, var(--paper))',
                      borderColor: 'var(--primary)',
                    }}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: 'var(--primary)' }}>
                      Referral Loop
                    </span>
                    <span className="font-headline text-lg sm:text-xl font-bold" style={{ color: 'var(--ink)' }}>
                      {row.after}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Legacy simple fallback */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          <div className="p-4 rounded-xl border" style={{ backgroundColor: 'color-mix(in srgb, var(--forward) 8%, var(--paper))', borderColor: 'color-mix(in srgb, var(--forward) 30%, transparent)' }}>
            <span className="text-xs uppercase font-bold block" style={{ color: 'var(--forward)' }}>{beforeLabel}</span>
            <p className="font-headline text-xl font-bold mt-1" style={{ color: 'var(--ink)' }}>{beforeValue}</p>
          </div>
          <div className="p-4 rounded-xl border" style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 10%, var(--paper))', borderColor: 'var(--primary)' }}>
            <span className="text-xs uppercase font-bold block" style={{ color: 'var(--primary)' }}>{afterLabel}</span>
            <p className="font-headline text-xl font-bold mt-1" style={{ color: 'var(--ink)' }}>{afterValue}</p>
          </div>
        </div>
      )}

      {/* Winning Insight Highlight */}
      <div
        className="mt-6 p-4 sm:p-5 rounded-xl border flex items-start gap-3 relative z-10"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--action) 10%, var(--paper))',
          borderColor: 'color-mix(in srgb, var(--action) 45%, transparent)',
        }}
      >
        <Sparkles className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--action)' }} />
        <div className="space-y-1 text-xs sm:text-sm">
          <span className="font-bold uppercase tracking-wider block" style={{ color: 'var(--action-ink)' }}>
            The Core Operational Insight:
          </span>
          <p className="leading-relaxed" style={{ color: 'var(--ink)' }}>
            {keyTakeaway ||
              'Paid ads purchased fleeting attention on a rental model. The physical milestone artifact purchased permanent operational desk presence on shift managers’ desks, creating compounding word-of-mouth with zero recurring ad cost.'}
          </p>
        </div>
      </div>

      {/* Explanation & Audit Footer */}
      {explanation && (
        <div className="mt-4 pt-4 border-t flex items-center justify-between flex-wrap gap-2 text-[11px] relative z-10" style={{ borderColor: 'color-mix(in srgb, var(--forward) 20%, transparent)', color: 'var(--forward)' }}>
          <span>{explanation}</span>
          <span className="font-mono opacity-80">Audited CRM Cohort &bull; 6-Month Trajectory</span>
        </div>
      )}
    </section>
  );
}
