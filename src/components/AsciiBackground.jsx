import React, { useState, useEffect } from 'react';
import { AsciiFlow } from './ui/AsciiEffect';
import { useTheme } from '../context/ThemeContext';

export default function AsciiBackground() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none transition-opacity duration-500"
      style={{
        opacity: isDark ? 0.045 : 0.032,
        mixBlendMode: isDark ? 'screen' : 'multiply',
      }}
      aria-hidden="true"
    >
      <AsciiFlow
        imageSrc="/apple-touch-icon.png"
        colors={isDark ? ['#CCA352', '#5490C0', '#F5EFE6'] : ['#9E742D', '#1B3D5C', '#4A3E36']}
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
