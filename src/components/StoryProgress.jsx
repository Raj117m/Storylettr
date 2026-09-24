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
        backgroundColor: 'color-mix(in srgb, var(--paper) 95%, transparent)',
        borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)',
      }}
    >
      {/* Progress Track */}
      <div className="h-1 w-full bg-transparent overflow-hidden">
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress}%`,
            backgroundColor: 'var(--primary)',
          }}
        />
      </div>

      {/* Stage Indicators */}
      {stages.length > 0 && (
        <div className="max-w-2xl mx-auto px-4 py-1.5 flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {stages.map((stage, idx) => {
              const isPast = idx <= activeStageIndex;
              const isCurrent = idx === activeStageIndex;
              return (
                <span
                  key={stage.id || idx}
                  className="whitespace-nowrap transition-colors flex items-center gap-1.5"
                  style={{
                    color: isCurrent
                      ? 'var(--primary)'
                      : isPast
                      ? 'var(--ink)'
                      : 'var(--forward)',
                    opacity: isCurrent ? 1 : isPast ? 0.75 : 0.45,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: isCurrent
                        ? 'var(--primary)'
                        : isPast
                        ? 'var(--ink)'
                        : 'var(--forward)',
                    }}
                  />
                  {stage.label || stage}
                </span>
              );
            })}
          </div>

          <span
            className="text-[11px] font-mono shrink-0 ml-3"
            style={{ color: 'var(--forward)' }}
          >
            {Math.round(scrollProgress)}%
          </span>
        </div>
      )}
    </div>
  );
}
