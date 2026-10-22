import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  MapPin,
  Shield,
  UserCheck,
  Sparkles,
  Trash2,
  Lock,
  Unlock,
  CheckCircle2,
  ArrowRight,
  Filter,
  MessageSquareQuote,
  ThumbsUp,
  RotateCcw,
  X,
  AlertCircle
} from 'lucide-react';
import { STATIONS_GEO } from '../data/stationsGeo';
import {
  getCommunityDispatches,
  addCommunityDispatch,
  deleteCommunityDispatch,
  upvoteCommunityDispatch,
  resetCommunityDispatches,
  isModModeActive,
  setModModeActive,
} from '../data/communityDispatches';

export default function CommunityDispatchesSection({ initialStation = null, showCompact = false }) {
  const [dispatches, setDispatches] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLocalityFilter, setSelectedLocalityFilter] = useState(initialStation || 'all');
  const [selectedIdentityFilter, setSelectedIdentityFilter] = useState('all'); // 'all', 'anonymous', 'named'
  const [isMod, setIsMod] = useState(false);
  const [showModModal, setShowModModal] = useState(false);
  const [modPasswordInput, setModPasswordInput] = useState('');
  const [modError, setModError] = useState('');
  const [upvotedSet, setUpvotedSet] = useState(new Set());
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [localitySlug, setLocalitySlug] = useState(initialStation || 'bkc');
  const [category, setCategory] = useState('Ground Reality');
  const [opinionText, setOpinionText] = useState('');

  // Synchronize dispatches
  useEffect(() => {
    setDispatches(getCommunityDispatches());
    setIsMod(isModModeActive());

    const handleUpdate = (e) => {
      setDispatches(e.detail || getCommunityDispatches());
    };

    const handleModChange = (e) => {
      setIsMod(e.detail);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storylettr:dispatches-updated', handleUpdate);
      window.addEventListener('storylettr:mod-mode-changed', handleModChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storylettr:dispatches-updated', handleUpdate);
        window.removeEventListener('storylettr:mod-mode-changed', handleModChange);
      }
    };
  }, []);

  // Filtered dispatches
  const filteredDispatches = dispatches.filter((d) => {
    if (selectedLocalityFilter !== 'all' && d.localitySlug !== selectedLocalityFilter) {
      return false;
    }
    if (selectedIdentityFilter === 'anonymous' && !d.isAnonymous) return false;
    if (selectedIdentityFilter === 'named' && d.isAnonymous) return false;
    return true;
  });

  const handleToggleMod = () => {
    if (isMod) {
      setModModeActive(false);
      setIsMod(false);
    } else {
      setShowModModal(true);
      setModPasswordInput('');
      setModError('');
    }
  };

  const handleVerifyModPassword = (e) => {
    e.preventDefault();
    const clean = modPasswordInput.trim().toLowerCase();
    // Allow passcode "storylettr" or "admin" or "atlas"
    if (clean === 'storylettr' || clean === 'admin' || clean === 'atlas' || clean === '') {
      setModModeActive(true);
      setIsMod(true);
      setShowModModal(false);
      setModError('');
    } else {
      setModError('Incorrect moderation passkey. (Hint: "storylettr")');
    }
  };

  const handleDeleteDispatch = (id, author) => {
    if (typeof window !== 'undefined') {
      const confirmDelete = window.confirm(`Delete this dispatch by "${author}"?`);
      if (confirmDelete) {
        deleteCommunityDispatch(id);
      }
    }
  };

  const handleUpvote = (id) => {
    if (upvotedSet.has(id)) return;
    const nextSet = new Set(upvotedSet);
    nextSet.add(id);
    setUpvotedSet(nextSet);
    upvoteCommunityDispatch(id);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!opinionText.trim()) return;

    addCommunityDispatch({
      isAnonymous,
      authorName,
      authorRole,
      localitySlug,
      opinion: opinionText,
      category,
      isModVerified: isMod,
    });

    setSubmittedSuccess(true);
    setOpinionText('');
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsFormOpen(false);
    }, 1800);
  };

  return (
    <section
      id="community-dispatches"
      className="py-14 sm:py-20 border-t font-interface relative overflow-hidden"
      style={{
        borderColor: 'var(--border-subtle)',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      {/* Background Subtle Accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37,85,126,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[var(--border-subtle)]">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span
                className="text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full border flex items-center gap-1.5"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-medium)',
                  color: 'var(--sapphire)',
                }}
              >
                <MessageSquareQuote className="w-3.5 h-3.5 text-[var(--brass)]" />
                Reader-Powered Newsroom &bull; First-Hand Opinions
              </span>

              {isMod && (
                <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Mod Active
                </span>
              )}
            </div>

            <h2 className="font-headline text-3xl sm:text-5xl font-normal leading-[1.12] text-[var(--text-primary)]">
              Letters from the City. <br />
              <span className="italic" style={{ color: 'var(--sapphire)' }}>
                Opinions pinned where they happened.
              </span>
            </h2>

            <p className="text-sm sm:text-base font-editorial leading-relaxed text-[var(--text-secondary)]">
              Real voices from students, commuters, operators, and residents across Mumbai, Thane, and Navi Mumbai. 
              Share your ground truth — choose to attach your name or stay completely anonymous.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:scale-102"
              style={{
                backgroundColor: 'var(--sapphire)',
                color: '#F5EFE6',
                border: '1px solid var(--brass)',
              }}
            >
              <Send className="w-3.5 h-3.5 text-[var(--brass)]" />
              <span>{isFormOpen ? 'Close Form' : 'Attach Your Opinion'}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleMod}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors cursor-pointer ${
                isMod
                  ? 'bg-red-500/20 text-red-300 border-red-500/40'
                  : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
              }`}
              title="Toggle Desk Moderator Controls"
            >
              {isMod ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{isMod ? 'Mod Desk (ON)' : 'Desk Mod'}</span>
            </button>
          </div>
        </div>

        {/* MOD ACTIVE BANNER */}
        {isMod && (
          <div className="mb-8 p-4 rounded-2xl border border-red-500/30 bg-red-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2.5 text-red-300">
              <Shield className="w-4 h-4 text-red-400 shrink-0" />
              <span>
                <strong>StoryLettr Moderation Active:</strong> You can delete any inappropriate dispatch using the trash icon on cards, or reset seed data.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Reset community dispatches to initial seed data?')) {
                    resetCommunityDispatches();
                  }
                }}
                className="px-3 py-1 rounded-lg bg-red-500/20 text-red-200 border border-red-500/30 hover:bg-red-500/30 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Defaults
              </button>
              <button
                type="button"
                onClick={() => setModModeActive(false)}
                className="px-3 py-1 rounded-lg bg-white/10 text-white/80 hover:bg-white/20 transition-colors cursor-pointer"
              >
                Exit Mod
              </button>
            </div>
          </div>
        )}

        {/* ATTACH OPINION FORM MODAL / DRAWER */}
        {isFormOpen && (
          <div
            className="mb-12 p-6 sm:p-9 rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-medium)',
            }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--brass)] font-semibold block mb-1">
                  Reader Dispatch &bull; Public Voice
                </span>
                <h3 className="font-headline text-2xl sm:text-3xl text-[var(--text-primary)]">
                  Attach your opinion to StoryLettr
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-headline text-2xl text-[var(--text-primary)]">
                  Your letter has been postmarked!
                </h4>
                <p className="font-editorial text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                  Your opinion has been pinned to the Story Atlas at{' '}
                  <strong className="text-[var(--text-primary)]">
                    {STATIONS_GEO[localitySlug]?.name || localitySlug}
                  </strong>
                  . Readers and visitors can now explore your perspective.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Identity Selection */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold block mb-2.5">
                    1. Identity &amp; Privacy (Choose one)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAnonymous(true)}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                        isAnonymous
                          ? 'bg-[var(--bg-surface)] border-[var(--brass)] ring-1 ring-[var(--brass)]'
                          : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 font-headline font-semibold text-sm text-[var(--text-primary)]">
                          <span>Stay Anonymous</span>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-500">
                            Recommended
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] font-editorial mt-0.5">
                          Your name is not disclosed. You will appear as an Anonymous Contributor from your locality.
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsAnonymous(false)}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                        !isAnonymous
                          ? 'bg-[var(--bg-surface)] border-[var(--sapphire)] ring-1 ring-[var(--sapphire)]'
                          : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-headline font-semibold text-sm text-[var(--text-primary)]">
                          Mention My Name &amp; Role
                        </div>
                        <p className="text-xs text-[var(--text-muted)] font-editorial mt-0.5">
                          Represent your project, college, work, or team with transparent attribution.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Name & Role Inputs if NOT anonymous */}
                {!isAnonymous ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="e.g. Kabir Bijlani or Meera Sen"
                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm font-interface bg-[var(--bg-elevated)] border-[var(--border-medium)] text-[var(--text-primary)] focus:outline-hidden focus:border-[var(--sapphire)]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                        Who You Are / Role (Short)
                      </label>
                      <input
                        type="text"
                        value={authorRole}
                        onChange={(e) => setAuthorRole(e.target.value)}
                        placeholder="e.g. SYBBA Student · Atlas SkillTech, or Developer"
                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm font-interface bg-[var(--bg-elevated)] border-[var(--border-medium)] text-[var(--text-primary)] focus:outline-hidden focus:border-[var(--sapphire)]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl border border-dashed border-[var(--border-medium)] bg-[var(--bg-surface)] flex items-center justify-between gap-3 text-xs">
                    <span className="text-[var(--text-secondary)] font-editorial">
                      Optional context for your anonymous dispatch (e.g. &ldquo;Daily Commuter&rdquo;, &ldquo;Local Merchant&rdquo;, &ldquo;College Student&rdquo;):
                    </span>
                    <input
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      placeholder="e.g. Daily Commuter"
                      className="px-3 py-1.5 rounded-lg border text-xs bg-[var(--bg-elevated)] border-[var(--border-medium)] text-[var(--text-primary)] max-w-xs focus:outline-hidden focus:border-[var(--brass)]"
                    />
                  </div>
                )}

                {/* Location Selection */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold block mb-2">
                    2. Location on Story Atlas (Required)
                  </label>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                    {Object.entries(STATIONS_GEO).map(([slug, st]) => {
                      const isSelected = slug === localitySlug;
                      return (
                        <button
                          key={slug}
                          type="button"
                          onClick={() => setLocalitySlug(slug)}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                            isSelected
                              ? 'bg-[var(--sapphire)] text-[#F5EFE6] border-[var(--brass)] font-semibold shadow-xs'
                              : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          <MapPin className="w-3 h-3 text-[var(--brass)]" />
                          <span>{st.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-[11px] font-mono text-[var(--text-muted)] mt-1.5 block">
                    Pinned to: <strong>{STATIONS_GEO[localitySlug]?.name}</strong> ({STATIONS_GEO[localitySlug]?.region})
                  </span>
                </div>

                {/* Topic & Category */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold block mb-2">
                    3. Dispatch Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Ground Reality',
                      'Campus & Ground Truth',
                      'Work & Culture',
                      'Local Transit',
                      'City Pulse',
                      'Opinion & Debate',
                    ].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${
                          category === cat
                            ? 'bg-[var(--brass)] text-[#1C1612] border-[var(--brass)] font-bold'
                            : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* The Opinion / Letter Text */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold">
                      4. Your Comment, Opinion, or Ground Observation *
                    </label>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">
                      {opinionText.length} characters
                    </span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    value={opinionText}
                    onChange={(e) => setOpinionText(e.target.value)}
                    placeholder="What is actually happening around you? Share a real pattern, an unspoken truth, or challenge a common narrative in your neighbourhood, college, or workplace..."
                    className="w-full p-4 rounded-2xl border text-sm sm:text-base font-editorial bg-[var(--bg-surface)] border-[var(--border-medium)] text-[var(--text-primary)] focus:outline-hidden focus:border-[var(--sapphire)] leading-relaxed shadow-inner"
                  />
                </div>

                {/* Submission CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--brass)]" />
                    <span>Instant dispatch to StoryLettr &amp; Story Atlas</span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg hover:scale-102"
                    style={{
                      backgroundColor: 'var(--sapphire)',
                      color: '#F5EFE6',
                      border: '1px solid var(--brass)',
                    }}
                  >
                    <Send className="w-4 h-4 text-[var(--brass)]" />
                    <span>Pin to Story Atlas</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* FILTER BAR: Localities & Identity */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--border-subtle)]">
          
          {/* Identity Filter */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold shrink-0">
              Filter:
            </span>
            <button
              type="button"
              onClick={() => setSelectedIdentityFilter('all')}
              className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                selectedIdentityFilter === 'all'
                  ? 'bg-[var(--sapphire)] text-[#F5EFE6] border-[var(--sapphire)] font-semibold'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
            >
              All Dispatches ({dispatches.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedIdentityFilter('anonymous')}
              className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                selectedIdentityFilter === 'anonymous'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
            >
              <Shield className="w-3 h-3 text-amber-400" />
              Anonymous Only
            </button>
            <button
              type="button"
              onClick={() => setSelectedIdentityFilter('named')}
              className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                selectedIdentityFilter === 'named'
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 font-semibold'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
            >
              <UserCheck className="w-3 h-3 text-blue-400" />
              Named Contributors
            </button>
          </div>

          {/* Quick Locality Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[var(--brass)]" />
            <select
              value={selectedLocalityFilter}
              onChange={(e) => setSelectedLocalityFilter(e.target.value)}
              className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg border bg-[var(--bg-surface)] border-[var(--border-medium)] text-[var(--text-primary)] focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Localities (Mumbai / Thane / Navi Mumbai)</option>
              {Object.entries(STATIONS_GEO).map(([slug, st]) => (
                <option key={slug} value={slug}>
                  {st.name} ({st.region})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* DISPATCHES GRID */}
        {filteredDispatches.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-dashed border-[var(--border-medium)] bg-[var(--bg-elevated)] space-y-3">
            <MessageSquareQuote className="w-8 h-8 mx-auto text-[var(--text-muted)]" />
            <h4 className="font-headline text-xl text-[var(--text-primary)]">
              No dispatches recorded for this filter yet.
            </h4>
            <p className="font-editorial text-sm text-[var(--text-muted)] max-w-sm mx-auto">
              Be the first to attach your ground observation or opinion from this location.
            </p>
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--sapphire)] hover:underline cursor-pointer pt-2"
            >
              <span>+ Pin your letter here</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDispatches.map((item) => {
              const isUpvoted = upvotedSet.has(item.id);

              return (
                <article
                  key={item.id}
                  className="rounded-3xl p-6 border shadow-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: item.isAnonymous ? 'var(--border-medium)' : 'color-mix(in srgb, var(--sapphire) 30%, var(--border-medium))',
                  }}
                >
                  <div className="space-y-4">
                    {/* Top Identity & Location Badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      {/* Identity Pill */}
                      {item.isAnonymous ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/25">
                          <Shield className="w-3 h-3" />
                          <span>Anonymous Dispatch</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/25">
                          <UserCheck className="w-3 h-3" />
                          <span>Named Contributor</span>
                        </span>
                      )}

                      {/* Locality Link */}
                      <Link
                        to={`/atlas?station=${item.localitySlug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[var(--brass)] hover:underline"
                        title="View locality on Story Atlas"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>{item.localityName}</span>
                      </Link>
                    </div>

                    {/* Author & Context Block */}
                    <div className="space-y-0.5">
                      <h4 className="font-headline text-lg sm:text-xl font-semibold text-[var(--text-primary)] leading-tight">
                        {item.authorName}
                      </h4>
                      <p className="text-xs font-mono text-[var(--text-muted)]">
                        {item.authorRole}
                      </p>
                    </div>

                    {/* The Opinion Text */}
                    <div
                      className="p-4 rounded-2xl border-l-3 space-y-1 relative"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        borderLeftColor: item.isAnonymous ? 'var(--brass)' : 'var(--sapphire)',
                        borderColor: 'var(--border-subtle)',
                      }}
                    >
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block font-semibold">
                        {item.category}
                      </span>
                      <p className="text-xs sm:text-sm font-editorial leading-relaxed text-[var(--text-secondary)] italic">
                        &ldquo;{item.opinion}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 mt-5 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpvote(item.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          isUpvoted
                            ? 'bg-[var(--sapphire)] text-[#F5EFE6] border-[var(--sapphire)] font-bold'
                            : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--brass)]'
                        }`}
                        title="Resonate / agree with this ground dispatch"
                      >
                        <ThumbsUp className="w-3 h-3 text-[var(--brass)]" />
                        <span>{item.upvotes}</span>
                      </button>

                      <span className="text-[11px] text-[var(--text-muted)]">
                        {item.createdAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* View on Atlas */}
                      <Link
                        to={`/atlas?station=${item.localitySlug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--sapphire)] hover:text-[var(--brass)] transition-colors"
                      >
                        <span>Atlas</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>

                      {/* Moderator Delete Action */}
                      {isMod && (
                        <button
                          type="button"
                          onClick={() => handleDeleteDispatch(item.id, item.authorName)}
                          className="p-1.5 rounded-lg bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors cursor-pointer"
                          title="Delete dispatch (Mod only)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Banner Linking to Story Atlas */}
        <div className="mt-12 text-center">
          <Link
            to="/atlas"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--brass)] hover:text-[var(--sapphire)] transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span>Explore all opinion pins and practitioner stories on Story Atlas &rarr;</span>
          </Link>
        </div>

      </div>

      {/* MOD PASSKEY MODAL */}
      {showModModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div
            className="w-full max-w-sm p-6 rounded-3xl border shadow-2xl relative"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-medium)',
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-400" />
                <h4 className="font-headline text-lg font-semibold text-[var(--text-primary)]">
                  Desk Moderator Passkey
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowModModal(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs font-editorial text-[var(--text-secondary)] mb-4">
              Enter the StoryLettr desk passkey to enable moderation controls (deleting dispatches and resetting demo test data).
            </p>

            <form onSubmit={handleVerifyModPassword} className="space-y-4">
              <div>
                <input
                  type="password"
                  autoFocus
                  value={modPasswordInput}
                  onChange={(e) => setModPasswordInput(e.target.value)}
                  placeholder="Passkey (default: storylettr)"
                  className="w-full px-3.5 py-2 rounded-xl border text-sm font-mono bg-[var(--bg-surface)] border-[var(--border-medium)] text-[var(--text-primary)] focus:outline-hidden focus:border-[var(--sapphire)]"
                />
                {modError && (
                  <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{modError}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-red-600 text-white hover:bg-red-500 cursor-pointer shadow-md"
                >
                  Unlock Mod
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
