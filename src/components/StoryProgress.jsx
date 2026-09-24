import React, { useState, useEffect } from 'react';

export default function StoryProgress({ stages = [] }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setScrollProgress(progress);

      if (stages.length > 0) {
        const stageIndex = Math.min(
          stages.length - 1,
          Math.floor((progress / 100) * stages.length)
        );
        setActiveStageIndex(stageIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stages]);

  return (
    <div
      className="sticky top-16 z-30 border-b backdrop-blur-md transition-all font-interface"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-primary) 92%, transparent)',
        borderColor: 'var(--border-subtle)',
      }}
      aria-label="Reading progress"
    >
      {/* Thin Sapphire Progress Track */}
      <div className="h-0.5 w-full bg-[var(--border-subtle)] overflow-hidden">
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress}%`,
            backgroundColor: 'var(--sapphire)',
            boxShadow: '0 0 8px var(--sapphire-glow)',
          }}
        />
      </div>

      {/* Stage Indicators (derived naturally from story sections) */}
      {stages.length > 0 && (
        <div className="max-w-2xl mx-auto px-4 py-1 flex items-center justify-between text-[11px] font-mono tracking-wider uppercase">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {stages.map((stage, idx) => {
              const isCurrent = idx === activeStageIndex;
              return (
                <span
                  key={stage.id || idx}
                  className="whitespace-nowrap transition-colors flex items-center gap-1.5"
                  style={{
                    color: isCurrent ? 'var(--sapphire)' : 'var(--text-muted)',
                    fontWeight: isCurrent ? 600 : 400,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: isCurrent ? 'var(--sapphire)' : 'transparent',
                      border: `1px solid ${isCurrent ? 'var(--sapphire)' : 'var(--border-strong)'}`,
                    }}
                  />
                  <span>{stage.label || stage.id}</span>
                </span>
              );
            })}
          </div>

          <span className="font-mono text-xs text-[var(--text-muted)] shrink-0 hidden sm:inline">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      )}
    </div>
  );
}
