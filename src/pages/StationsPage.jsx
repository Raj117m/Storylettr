import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  Sparkles,
  BookOpen,
  MessageSquareQuote,
  Shield,
  UserCheck,
  ThumbsUp,
  Trash2,
  Send,
  Plus
} from 'lucide-react';
import PageMeta from '../components/PageMeta';
import DemoBadge from '../components/DemoBadge';
import StarfieldButton from '../components/ui/StarfieldButton';
import StoryMap from '../components/StoryMap';
import CommunityDispatchesSection from '../components/CommunityDispatchesSection';
import { STATIONS_GEO } from '../data/stationsGeo';
import { CONTENT, CONTRIBUTORS } from '../data/content';
import {
  getCommunityDispatches,
  deleteCommunityDispatch,
  upvoteCommunityDispatch,
  isModModeActive
} from '../data/communityDispatches';

export default function StationsPage() {
  const location = useLocation();
  const [selectedStation, setSelectedStation] = useState('bkc');
  const [activeTab, setActiveTab] = useState('opinions'); // 'story' | 'opinions'
  const [allDispatches, setAllDispatches] = useState(getCommunityDispatches());
  const [isMod, setIsMod] = useState(false);
  const [upvotedSet, setUpvotedSet] = useState(new Set());

  // Parse ?station= from query string if present
  useEffect(() => {
    if (typeof window !== 'undefined' && location.search) {
      const params = new URLSearchParams(location.search);
      const st = params.get('station');
      if (st && STATIONS_GEO[st]) {
        setSelectedStation(st);
      }
    }
  }, [location.search]);

  // Synchronize dispatches and mod state
  useEffect(() => {
    setAllDispatches(getCommunityDispatches());
    setIsMod(isModModeActive());

    const handleUpdate = (e) => {
      setAllDispatches(e.detail || getCommunityDispatches());
    };
    const handleMod = (e) => {
      setIsMod(e.detail);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storylettr:dispatches-updated', handleUpdate);
      window.addEventListener('storylettr:mod-mode-changed', handleMod);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storylettr:dispatches-updated', handleUpdate);
        window.removeEventListener('storylettr:mod-mode-changed', handleMod);
      }
    };
  }, []);

  const stationInfo = STATIONS_GEO[selectedStation] || STATIONS_GEO.bkc;
  const stationStory = CONTENT.find((c) => c.station === selectedStation);
  const contributor = stationStory ? CONTRIBUTORS[stationStory.byline] : null;

  // Filter dispatches for this selected station
  const stationDispatches = allDispatches.filter(
    (d) => d.localitySlug === selectedStation
  );

  const handleUpvote = (id) => {
    if (upvotedSet.has(id)) return;
    const next = new Set(upvotedSet);
    next.add(id);
    setUpvotedSet(next);
    upvoteCommunityDispatch(id);
  };

  const handleDelete = (id, author) => {
    if (typeof window !== 'undefined' && confirm(`Delete dispatch by "${author}"?`)) {
      deleteCommunityDispatch(id);
    }
  };

  return (
    <>
      <PageMeta
        title="Story Atlas | Discover Where the People and Stories Come From"
        description="Discover where the people, verified stories, and reader opinions behind StoryLettr come from across Mumbai, Thane, and Navi Mumbai."
        path="/atlas"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 font-interface">
        {/* Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className="text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full border flex items-center gap-1.5"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-medium)',
                color: 'var(--sapphire)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--brass)]" />
              People &bull; Stories &bull; Reader Dispatches
            </span>
            <DemoBadge label="Interactive geographic atlas" />
          </div>

          <h1 className="font-headline text-4xl sm:text-6xl font-normal leading-[1.08] text-[var(--text-primary)]">
            Story Atlas
          </h1>

          <p className="text-base sm:text-xl font-editorial leading-relaxed text-[var(--text-secondary)]">
            Discover where the people, verified stories, and ground opinions behind StoryLettr come from. 
            Click any pin on the map to explore what practitioners and readers are seeing across Mumbai, Thane, and Navi Mumbai.
          </p>
        </div>

        {/* Panoramic Map & Interactive Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Panoramic Map */}
          <div className="lg:col-span-8 w-full">
            <StoryMap
              selectedStation={selectedStation}
              onSelectStation={(slug) => setSelectedStation(slug)}
            />
          </div>

          {/* Connected Location, Story & Opinions Card */}
          <div className="lg:col-span-4 w-full">
            <div
              className="rounded-3xl p-6 sm:p-7 border shadow-xl relative overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-medium)',
              }}
            >
              {/* Station Badge Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-5">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--brass)] block font-semibold">
                    {stationInfo.region}
                  </span>
                  <h3 className="font-headline text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] flex items-center gap-2 mt-0.5">
                    <MapPin className="w-5 h-5 text-[var(--oxblood)] shrink-0" />
                    <span>{stationInfo.name}</span>
                  </h3>
                </div>

                <div className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold text-[#F5EFE6] bg-[var(--sapphire)] border border-[#CCA352] shadow-sm shrink-0">
                  SL
                </div>
              </div>

              {/* Station Geographic Context */}
              <p className="text-xs sm:text-sm font-editorial leading-relaxed text-[var(--text-secondary)] mb-5">
                {stationInfo.description}
              </p>

              {/* Tab Navigation: Editorial Story vs Reader Opinions */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] mb-5">
                <button
                  type="button"
                  onClick={() => setActiveTab('opinions')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'opinions'
                      ? 'bg-[var(--sapphire)] text-[#F5EFE6] shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <MessageSquareQuote className="w-3.5 h-3.5" />
                  <span>Reader Dispatches ({stationDispatches.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('story')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'story'
                      ? 'bg-[var(--sapphire)] text-[#F5EFE6] shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Story ({stationStory ? '1' : '0'})</span>
                </button>
              </div>

              {/* TAB 1: READER OPINIONS & DISPATCHES */}
              {activeTab === 'opinions' && (
                <div className="space-y-4 mb-6">
                  {stationDispatches.length > 0 ? (
                    <div className="space-y-3.5 max-h-[340px] overflow-y-auto pr-1">
                      {stationDispatches.map((d) => (
                        <div
                          key={d.id}
                          className="p-4 rounded-2xl border space-y-2.5 transition-all text-xs"
                          style={{
                            backgroundColor: 'var(--bg-surface)',
                            borderColor: d.isAnonymous ? 'var(--border-subtle)' : 'var(--border-medium)',
                          }}
                        >
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            {/* Anonymous vs Named Tag */}
                            {d.isAnonymous ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/25">
                                <Shield className="w-3 h-3" />
                                <span>Stayed Anonymous</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/25">
                                <UserCheck className="w-3 h-3" />
                                <span>{d.authorName}</span>
                              </span>
                            )}

                            <span className="text-[10px] font-mono text-[var(--text-muted)]">
                              {d.createdAt}
                            </span>
                          </div>

                          <div className="text-[11px] font-mono text-[var(--text-muted)]">
                            {d.authorRole}
                          </div>

                          <p className="font-editorial text-xs italic leading-relaxed text-[var(--text-primary)] pl-2.5 border-l-2 border-[var(--brass)]">
                            &ldquo;{d.opinion}&rdquo;
                          </p>

                          <div className="flex items-center justify-between pt-1 border-t border-[var(--border-subtle)] text-[10px] font-mono">
                            <button
                              type="button"
                              onClick={() => handleUpvote(d.id)}
                              className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--sapphire)] cursor-pointer"
                            >
                              <ThumbsUp className="w-3 h-3 text-[var(--brass)]" />
                              <span>{d.upvotes} agree</span>
                            </button>

                            {isMod && (
                              <button
                                type="button"
                                onClick={() => handleDelete(d.id, d.authorName)}
                                className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                                title="Delete dispatch (Mod only)"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="rounded-2xl p-4 border text-center space-y-2"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        borderColor: 'var(--border-subtle)',
                      }}
                    >
                      <p className="text-xs text-[var(--text-muted)] font-editorial">
                        No reader opinions pinned at {stationInfo.name} yet.
                      </p>
                    </div>
                  )}

                  {/* Quick button to add opinion */}
                  <a
                    href="#community-dispatches"
                    className="w-full py-2.5 px-3 rounded-xl border border-[var(--brass)] bg-[var(--sapphire)] text-[#F5EFE6] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Plus className="w-3.5 h-3.5 text-[var(--brass)]" />
                    <span>Attach Opinion at {stationInfo.name}</span>
                  </a>
                </div>
              )}

              {/* TAB 2: EDITORIAL PRACTITIONER STORY */}
              {activeTab === 'story' && (
                <div className="space-y-4 mb-6">
                  {stationStory && contributor ? (
                    <div
                      className="rounded-2xl p-5 border space-y-4 transition-all"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        borderColor: 'var(--border-medium)',
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={contributor.avatar}
                          alt={contributor.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-[var(--brass)] shrink-0 shadow-sm"
                          loading="lazy"
                        />
                        <div>
                          <h4 className="font-headline text-xl font-semibold text-[var(--text-primary)] leading-tight">
                            {contributor.name}
                          </h4>
                          <p className="text-xs font-medium text-[var(--brass)] mt-0.5">
                            {contributor.role}
                          </p>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                          Featured Story
                        </span>
                        <p className="font-headline text-base font-semibold leading-snug text-[var(--text-primary)]">
                          &ldquo;{stationStory.headline}&rdquo;
                        </p>
                      </div>

                      {contributor.featuredInsight && (
                        <div className="p-3 rounded-xl border-l-2 bg-[var(--bg-elevated)] border-l-[var(--brass)] border border-[var(--border-subtle)] text-xs">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--brass)] block mb-0.5 font-bold">
                            Quick Insight:
                          </span>
                          <p className="italic text-[var(--text-secondary)] font-editorial">
                            &ldquo;{contributor.featuredInsight}&rdquo;
                          </p>
                        </div>
                      )}

                      <div className="pt-1">
                        <StarfieldButton
                          to={`/stories/${stationStory.slug}`}
                          variant="sapphire"
                          size="sm"
                          className="w-full"
                        >
                          <span>Open Story</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </StarfieldButton>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="rounded-2xl p-5 border text-center space-y-2"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        borderColor: 'var(--border-subtle)',
                      }}
                    >
                      <BookOpen className="w-6 h-6 mx-auto text-[var(--text-muted)]" />
                      <h4 className="font-headline text-lg text-[var(--text-primary)]">
                        Field Research in Progress
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] font-editorial max-w-xs mx-auto">
                        We are currently conducting practitioner interviews in {stationInfo.name}. Subscribe to receive the letter once verified.
                      </p>
                      <div className="pt-2">
                        <Link
                          to="/newsletter"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--sapphire)] hover:underline"
                        >
                          <span>Get notified for {stationInfo.name}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Station Quick Selector Chips */}
              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2 font-semibold">
                  Jump to Locality:
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {Object.entries(STATIONS_GEO).map(([slug, s]) => {
                    const isSelected = slug === selectedStation;
                    const hasStory = CONTENT.some((c) => c.station === slug);
                    const count = allDispatches.filter((d) => d.localitySlug === slug).length;

                    return (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => setSelectedStation(slug)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[var(--sapphire)] text-[#F5EFE6] border-[var(--brass)] shadow-xs font-semibold'
                            : count > 0
                            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--brass)]/50 hover:border-[var(--brass)]'
                            : hasStory
                            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-medium)] hover:border-[var(--brass)]'
                            : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <span>{s.name}</span>
                        {count > 0 && (
                          <span className="text-[9px] font-mono px-1 rounded-full bg-[var(--brass)] text-[#1C1612] font-bold">
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Complete Community Dispatches Feed & Submission Section */}
        <CommunityDispatchesSection initialStation={selectedStation} />

      </div>
    </>
  );
}
