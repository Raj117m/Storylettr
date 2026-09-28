import React, { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { STATIONS_GEO } from '../data/stationsGeo';
import { CONTENT, CONTRIBUTORS } from '../data/content';
import { useTheme } from '../context/ThemeContext';

export default function StoryMap({ selectedStation, onSelectStation }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const { theme } = useTheme();
  const [mapLoaded, setMapLoaded] = useState(false);
  const isDark = theme === 'dark';

  // Station stories lookup
  const hasStory = (slug) => CONTENT.some((c) => c.station === slug);

  // Initialize MapLibre GL on client
  useEffect(() => {
    let map = null;
    let isCancelled = false;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      const maplibre = await import('maplibre-gl');
      if (isCancelled || !mapContainerRef.current) return;

      const styleUrl = isDark
        ? 'https://tiles.openfreemap.org/styles/dark'
        : 'https://tiles.openfreemap.org/styles/positron';

      map = new maplibre.Map({
        container: mapContainerRef.current,
        style: styleUrl,
        center: [72.92, 19.06],
        zoom: 10.3,
        minZoom: 9,
        maxZoom: 16,
        attributionControl: false,
      });

      map.addControl(
        new maplibre.AttributionControl({
          compact: true,
          customAttribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> · <a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a>',
        }),
        'bottom-right'
      );

      mapInstanceRef.current = map;

      map.on('load', () => {
        if (isCancelled) return;
        setMapLoaded(true);

        // Add station markers
        Object.entries(STATIONS_GEO).forEach(([slug, station]) => {
          const el = document.createElement('button');
          el.className = 'storylettr-map-pin group cursor-pointer';
          el.setAttribute('aria-label', `Select ${station.name}`);

          const hasDispatch = hasStory(slug);
          const isSelected = slug === selectedStation;

          el.innerHTML = `
            <div class="relative flex items-center justify-center transition-all duration-300 ${
              isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-10'
            }">
              <!-- Soft Glow Aura -->
              <span class="absolute -inset-2 rounded-full blur-xs opacity-75 ${
                isSelected
                  ? 'bg-[#CCA352] opacity-90 animate-pulse'
                  : hasDispatch
                  ? 'bg-[#5490C0] opacity-50'
                  : 'bg-black/20'
              }"></span>
              
              <!-- Pin Core -->
              <div class="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 shadow-md transition-colors ${
                isSelected
                  ? 'bg-[#6A1E2D] border-[#CCA352] text-[#F5EFE6]'
                  : hasDispatch
                  ? 'bg-[#1B3D5C] border-[#F5EFE6] text-[#F5EFE6]'
                  : 'bg-[#221B16] border-[#72675C] text-[#D4C7B5]'
              }">
                <span class="font-mono text-[10px] font-bold tracking-tight">
                  ${hasDispatch ? 'SL' : '•'}
                </span>
              </div>

              <!-- Station Label Tag -->
              <span class="absolute top-full mt-1.5 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold tracking-wide whitespace-nowrap shadow-sm border transition-all ${
                isSelected
                  ? 'bg-[#1B3D5C] text-[#F5EFE6] border-[#CCA352] font-bold z-40'
                  : 'bg-[#16120E]/90 text-[#F5EFE6] border-white/10 opacity-85 group-hover:opacity-100'
              }">
                ${station.name}
              </span>
            </div>
          `;

          el.addEventListener('click', (e) => {
            e.stopPropagation();
            onSelectStation(slug);
          });

          const marker = new maplibre.Marker({ element: el, anchor: 'center' })
            .setLngLat(station.coordinates)
            .addTo(map);

          markersRef.current[slug] = { marker, element: el };
        });
      });
    }

    initMap();

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map style when theme changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded) return;

    const styleUrl = isDark
      ? 'https://tiles.openfreemap.org/styles/dark'
      : 'https://tiles.openfreemap.org/styles/positron';

    map.setStyle(styleUrl);
  }, [isDark, mapLoaded]);

  // Update selected station marker styling and camera flyTo
  useEffect(() => {
    if (!selectedStation || !STATIONS_GEO[selectedStation]) return;
    const station = STATIONS_GEO[selectedStation];

    // Smoothly fly camera to selected station
    if (mapInstanceRef.current && mapLoaded) {
      mapInstanceRef.current.flyTo({
        center: station.coordinates,
        zoom: Math.max(mapInstanceRef.current.getZoom(), 11.8),
        speed: 1.1,
        curve: 1.2,
        essential: true,
      });
    }

    // Refresh marker DOM classes
    Object.entries(markersRef.current).forEach(([slug, { element }]) => {
      const isSelected = slug === selectedStation;
      const hasDispatch = hasStory(slug);
      const stationName = STATIONS_GEO[slug]?.name || slug;

      element.innerHTML = `
        <div class="relative flex items-center justify-center transition-all duration-300 ${
          isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-10'
        }">
          <!-- Soft Glow Aura -->
          <span class="absolute -inset-2 rounded-full blur-xs ${
            isSelected
              ? 'bg-[#CCA352] opacity-95 animate-pulse'
              : hasDispatch
              ? 'bg-[#5490C0] opacity-50'
              : 'bg-black/20 opacity-30'
          }"></span>
          
          <!-- Pin Core -->
          <div class="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 shadow-md transition-colors ${
            isSelected
              ? 'bg-[#6A1E2D] border-[#CCA352] text-[#F5EFE6]'
              : hasDispatch
              ? 'bg-[#1B3D5C] border-[#F5EFE6] text-[#F5EFE6]'
              : 'bg-[#221B16] border-[#72675C] text-[#D4C7B5]'
          }">
            <span class="font-mono text-[10px] font-bold tracking-tight">
              ${hasDispatch ? 'SL' : '•'}
            </span>
          </div>

          <!-- Station Label Tag -->
          <span class="absolute top-full mt-1.5 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold tracking-wide whitespace-nowrap shadow-sm border transition-all ${
            isSelected
              ? 'bg-[#1B3D5C] text-[#F5EFE6] border-[#CCA352] font-bold z-40'
              : 'bg-[#16120E]/90 text-[#F5EFE6] border-white/10 opacity-85'
          }">
            ${stationName}
          </span>
        </div>
      `;
    });
  }, [selectedStation, mapLoaded]);

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: [72.92, 19.06],
        zoom: 10.3,
        speed: 1.2,
      });
    }
  };

  const handleZoom = (delta) => {
    if (mapInstanceRef.current) {
      const z = mapInstanceRef.current.getZoom();
      mapInstanceRef.current.easeTo({ zoom: z + delta, duration: 250 });
    }
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[680px] rounded-3xl overflow-hidden border border-[var(--border-medium)] shadow-2xl bg-[var(--bg-elevated)]">
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Map Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <div
          className="rounded-xl border p-1 shadow-lg flex flex-col gap-1 backdrop-blur-md"
          style={{
            backgroundColor: 'var(--glass-bg)',
            borderColor: 'var(--glass-border)',
          }}
        >
          <button
            type="button"
            onClick={() => handleZoom(1)}
            className="p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors cursor-pointer"
            title="Zoom in"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleZoom(-1)}
            className="p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors cursor-pointer"
            title="Zoom out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetView}
            className="p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors cursor-pointer border-t border-[var(--border-subtle)]"
            title="Reset overview"
            aria-label="Reset overview"
          >
            <RotateCcw className="w-4 h-4 text-[var(--brass)]" />
          </button>
        </div>
      </div>

      {/* Legend & Geography Badges Overlay */}
      <div
        className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-2 p-2 px-3 rounded-xl border text-[11px] font-mono shadow-md backdrop-blur-md"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderColor: 'var(--glass-border)',
          color: 'var(--text-secondary)',
        }}
      >
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1B3D5C] border border-[#CCA352] shadow-xs"></span>
          Story Verified
        </span>
        <span className="text-[var(--border-strong)]">•</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#72675C]"></span>
          Location Context
        </span>
        <span className="text-[var(--border-strong)]">•</span>
        <span className="text-[var(--text-muted)] italic">
          Arabian Sea &bull; Thane Creek &bull; Mumbai Harbour
        </span>
      </div>
    </div>
  );
}
