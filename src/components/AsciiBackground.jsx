import React, { useState, useEffect } from 'react';
import { AsciiFlow } from './ui/AsciiEffect';

export default function AsciiBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      style={{
        opacity: 0.045, // Deliberately lowered so it creates deep ambient texture without interfering with reading or UI
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    >
      <AsciiFlow
        imageSrc="/apple-touch-icon.png"
        colors={['#CCA352', '#5490C0', '#F5EFE6']}
        backgroundColor="transparent"
        fontSize={10}
        flowSpeed={0.12}
        flowStrength={8}
        flowFrequency={0.012}
        mouseRadius={140}
        mouseStrength={14}
        scale={1.2}
        chars=" ·:+=*#%"
      />
    </div>
  );
}
