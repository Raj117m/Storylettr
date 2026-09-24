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
  let displayMetrics = metrics;

  if (!displayMetrics && beforeValue && afterValue) {
    const beforeParts = typeof beforeValue === 'string' ? beforeValue.split('|').map((s) => s.trim()) : [beforeValue];
    const afterParts = typeof afterValue === 'string' ? afterValue.split('|').map((s) => s.trim()) : [afterValue];

    displayMetrics = beforeParts.map((b, idx) => ({
      metric: `Metric ${idx + 1}`,
      before: b,
      after: afterParts[idx] || afterValue,
      delta: 'Observed Shift',
      trend: 'better',
    }));
  }

  if (!displayMetrics && title && title.toLowerCase().includes('paid ads')) {
    displayMetrics = [
      {
        metric: 'Blended Customer Acquisition Cost (CAC)',
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
      className="relative rounded-2xl p-6 sm:p-9 my-12 border overflow-hidden font-interface transition-all duration-300"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--border-medium)',
        boxShadow: '0 10px 30px -10px var(--border-subtle)',
      }}
    >
      {/* Background Soft Lighting Depth */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(circle, var(--brass) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="space-y-2 mb-8 border-b pb-6 relative z-10" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium uppercase tracking-wider text-[var(--sapphire)]"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Performance Comparison &bull; Decision Framework</span>
            </span>
          </div>

          <DemoBadge type="data" />
        </div>

        <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] pt-1" style={{ color: 'var(--text-primary)' }}>
          {title || 'Performance Comparison: Paid Ads vs Referral Architecture'}
        </h3>

        <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          {subtitle || 'Side-by-side empirical audit of unit economics, velocity, and compounding dynamics.'}
        </p>
      </div>

      {/* Strategic Comparison Columns Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
        {/* Baseline / Old Regime */}
        <div
          className="p-4 sm:p-5 rounded-xl border flex items-center justify-between gap-3"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider block text-[var(--text-muted)]">
              Baseline Regime
            </span>
            <span className="font-headline text-xl font-normal block pt-0.5 text-[var(--text-primary)]">
              {beforeLabel}
            </span>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--text-muted)]">
            Linear return
          </span>
        </div>

        {/* Pivot / New Regime */}
        <div
          className="p-4 sm:p-5 rounded-xl border flex items-center justify-between gap-3 shadow-xs"
          style={{
            backgroundColor: 'var(--sapphire-light)',
            borderColor: 'var(--sapphire)',
          }}
        >
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--brass)' }} />
              <span className="text-[11px] font-mono uppercase tracking-wider block text-[var(--sapphire)]">
                The Operational Pivot
              </span>
            </div>
            <span className="font-headline text-xl font-normal block pt-0.5 text-[var(--text-primary)]">
              {afterLabel}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full text-emerald-800 bg-emerald-100 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Observed Lift</span>
          </div>
        </div>
      </div>

      {/* Metric Comparison Cards */}
      {displayMetrics && displayMetrics.length > 0 ? (
        <div className="space-y-3.5 relative z-10">
          {displayMetrics.map((row, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl border transition-all duration-200"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Metric Label & Note */}
                <div className="space-y-1 lg:max-w-xs">
                  <span className="font-semibold text-sm sm:text-base block text-[var(--text-primary)]">
                    {row.metric}
                  </span>
                  {row.note && (
                    <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                      {row.note}
                    </p>
                  )}
                </div>

                {/* Values Comparison Strip (Stacked naturally on mobile) */}
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap lg:justify-end grow">
                  {/* Before */}
                  <div
                    className="p-3 rounded-lg border text-center min-w-[120px] grow sm:grow-0 shrink-0"
                    style={{
                      backgroundColor: 'var(--bg-elevated)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider block text-[var(--text-muted)]">
                      Paid Ads
                    </span>
                    <span className="font-headline text-lg sm:text-xl font-normal text-[var(--text-muted)]">
                      {row.before}
                    </span>
                  </div>

                  {/* Transition Arrow / Directional Indicator */}
                  <div className="flex flex-col items-center justify-center px-1">
                    <span
                      className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full border shadow-2xs whitespace-nowrap"
                      style={{
                        backgroundColor: 'var(--sapphire-light)',
                        borderColor: 'var(--sapphire)',
                        color: 'var(--sapphire)',
                      }}
                    >
                      {row.delta || '→'}
                    </span>
                  </div>

                  {/* After */}
                  <div
                    className="p-3 rounded-lg border text-center min-w-[140px] grow sm:grow-0 shrink-0 shadow-xs"
                    style={{
                      backgroundColor: 'var(--bg-elevated)',
                      borderColor: 'var(--sapphire)',
                    }}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider block text-[var(--sapphire)]">
                      Referral Loop
                    </span>
                    <span className="font-headline text-lg sm:text-xl font-normal text-[var(--text-primary)]">
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
          <div className="p-4 rounded-xl border bg-[var(--bg-surface)] border-[var(--border-subtle)]">
            <span className="text-xs uppercase font-mono block text-[var(--text-muted)]">{beforeLabel}</span>
            <p className="font-headline text-xl font-normal mt-1 text-[var(--text-primary)]">{beforeValue}</p>
          </div>
          <div className="p-4 rounded-xl border bg-[var(--sapphire-light)] border-[var(--sapphire)]">
            <span className="text-xs uppercase font-mono block text-[var(--sapphire)]">{afterLabel}</span>
            <p className="font-headline text-xl font-normal mt-1 text-[var(--text-primary)]">{afterValue}</p>
          </div>
        </div>
      )}

      {/* Winning Insight Highlight */}
      <div
        className="mt-6 p-4 sm:p-5 rounded-xl border flex items-start gap-3 relative z-10"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--brass) 10%, var(--bg-surface))',
          borderColor: 'var(--brass)',
        }}
      >
        <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-[var(--brass)]" />
        <div className="space-y-1 text-xs sm:text-sm">
          <span className="font-semibold uppercase tracking-wider block text-[var(--brass)]">
            The Strategic Pivot:
          </span>
          <p className="leading-relaxed text-[var(--text-primary)]">
            {keyTakeaway ||
              'Paid ads purchased fleeting attention on a rental model. The physical milestone artifact purchased permanent operational desk presence on shift managers’ desks, creating compounding word-of-mouth with zero recurring ad cost.'}
          </p>
        </div>
      </div>

      {/* Explanation & Audit Footer */}
      {explanation && (
        <div className="mt-4 pt-4 border-t flex items-center justify-between flex-wrap gap-2 text-xs relative z-10 border-[var(--border-subtle)] text-[var(--text-muted)]">
          <span>{explanation}</span>
          <span className="font-mono text-[11px] opacity-75">Data source audited · 6-Month Cohort</span>
        </div>
      )}
    </section>
  );
}
