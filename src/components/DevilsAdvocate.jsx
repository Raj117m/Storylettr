import React, { useState, useEffect } from 'react';
import {
  Scale,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import DemoBadge from './DemoBadge';
import StarfieldButton from './ui/StarfieldButton';

const INITIAL_CHALLENGES = {
  'stopped-running-ads-growth': [
    {
      id: 'c1',
      author: 'Aakash Verma',
      role: 'B2B Logistics Operator, Navi Mumbai',
      date: '2 days ago',
      endorsements: 18,
      comment:
        'We tested physical milestone artifacts for fleet managers in 2024. For operators over 40, they loved having a physical desk piece and kept it. But for tech-forward warehouse managers under 30, they considered it desk clutter and threw it away within a week. Demographic affinity determines artifact retention more than category.',
      evidence: 'Tested across 62 warehouse accounts in Bhiwandi and Taloja.',
    },
    {
      id: 'c2',
      author: 'Meera Nair',
      role: 'Performance Lead, D2C Scale',
      date: '4 days ago',
      endorsements: 24,
      comment:
        'The article treats ad spend and referral loops as mutually exclusive. In reality, you need paid channels to seed the first 500 high-LTV users who then fuel the referral flywheel. Turning off paid before reaching critical mass leads to death by quietness.',
      evidence: 'Ran referral experiment after slashing Google Ads by 80% — new inbound dropped 61% before recovering.',
    },
    {
      id: 'c3',
      author: 'Rohan Joshi',
      role: 'Hardware Systems Founder',
      date: '1 week ago',
      endorsements: 11,
      comment:
        'Unit economics were glossed over here. Premium physical artifacts, brass stamping, and secure courier across India cost ~₹850 per piece. You need annual contract values above ₹1,50,000 for the LTV/CAC ratio to absorb that without eroding margins.',
      evidence: 'Custom artifact manufacturing minimums start at 500 units upfront.',
    },
  ],
  default: [
    {
      id: 'cd1',
      author: 'Kunal Shrestha',
      role: 'Growth Practitioner, Bandra',
      date: '3 days ago',
      endorsements: 14,
      comment:
        'The framework assumes high repeatability, but customer context is rarely static. When external platform algorithms or economic cycles shift, the baseline assumptions fail first.',
      evidence: 'Observed over 12 months across three client implementations.',
    },
    {
      id: 'cd2',
      author: 'Priyanka D’Souza',
      role: 'Product Strategy Consultant',
      date: '5 days ago',
      endorsements: 9,
      comment:
        'Survivor bias is the elephant in the room. We only hear from the operators whose counter-intuitive bets paid off, not the 90% who tried the same pivot and quietly wound down operations.',
      evidence: 'Benchmarked 24 seed-stage operational pivots.',
    },
  ],
};

export default function DevilsAdvocate({ data, storySlug = 'default', storyTitle = '' }) {
  const [isOpen, setIsOpen] = useState(true);
  const [comments, setComments] = useState([]);
  const [endorsedIds, setEndorsedIds] = useState(new Set());

  // Form state
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [commentText, setCommentText] = useState('');
  const [evidenceText, setEvidenceText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const defaultData = {
    strongestCounterargument:
      'Referrals are an amplification engine, not an origination mechanism. Suresh’s cloud tool already had 3 years of stability and an 88% satisfaction rate among its initial core cohort. If an early-stage startup with an unproven product turns off advertising to rely purely on referrals, they will generate silence, not word-of-mouth.',
    whenThisMayFail:
      'In categories with low peer-to-peer discussion density or solitary utility. If a warehouse manager or consumer solves a private problem they never discuss with colleagues, physical artifacts get discarded rather than photographed and shared.',
    whatWeMayBeMissing:
      'Two operational conditions are mandatory: (1) The user must operate within a shared professional network (e.g. logistics WhatsApp groups or trade communities); (2) The artifact must deliver genuine operational utility on the job, not branded marketing swag.',
    whatWouldChangeOurView:
      'StoryLettr cannot conclude that paid advertising is universally wasteful. For zero-to-one ventures with no initial brand awareness, paid ads remain the only accessible laboratory to buy early qualitative user feedback.',
  };

  const content = {
    strongestCounterargument:
      data?.strongestCounterargument || data?.strongestCounterpoint || defaultData.strongestCounterargument,
    whenThisMayFail:
      data?.whenThisMayFail || data?.whenThisMightNotWork || defaultData.whenThisMayFail,
    whatWeMayBeMissing:
      data?.whatWeMayBeMissing || data?.whatNeedsToBeTrue || defaultData.whatWeMayBeMissing,
    whatWouldChangeOurView:
      data?.whatWouldChangeOurView || data?.cannotConclude || defaultData.whatWouldChangeOurView,
  };

  // Load persistent comments from localStorage on client
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storageKey = `storylettr_challenges_${storySlug}`;
    const saved = localStorage.getItem(storageKey);
    const initialList = INITIAL_CHALLENGES[storySlug] || INITIAL_CHALLENGES.default;

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setComments(parsed);
      } catch {
        setComments(initialList);
      }
    } else {
      setComments(initialList);
    }
  }, [storySlug]);

  const handleEndorse = (id) => {
    if (endorsedIds.has(id)) return;
    const nextEndorsed = new Set(endorsedIds);
    nextEndorsed.add(id);
    setEndorsedIds(nextEndorsed);

    const updated = comments.map((c) =>
      c.id === id ? { ...c, endorsements: c.endorsements + 1 } : c
    );
    setComments(updated);

    if (typeof window !== 'undefined') {
      const storageKey = `storylettr_challenges_${storySlug}`;
      localStorage.setItem(storageKey, JSON.stringify(updated));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !author.trim()) return;

    const newChallenge = {
      id: `user-${Date.now()}`,
      author: author.trim(),
      role: role.trim() || 'Reader & Practitioner',
      date: 'Just now',
      endorsements: 1,
      comment: commentText.trim(),
      evidence: evidenceText.trim() || 'Direct practitioner observation.',
      isUserSubmission: true,
    };

    const nextComments = [newChallenge, ...comments];
    setComments(nextComments);

    if (typeof window !== 'undefined') {
      const storageKey = `storylettr_challenges_${storySlug}`;
      localStorage.setItem(storageKey, JSON.stringify(nextComments));
    }

    setAuthor('');
    setRole('');
    setCommentText('');
    setEvidenceText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      className="relative rounded-2xl p-6 sm:p-9 my-12 border overflow-hidden font-interface transition-all duration-300"
      style={{
        backgroundColor: 'var(--oxblood-surface)',
        borderColor: 'color-mix(in srgb, var(--oxblood) 35%, transparent)',
        boxShadow: '0 8px 30px -8px color-mix(in srgb, var(--oxblood) 18%, transparent)',
      }}
    >
      {/* Background Subtle Ambient Oxblood Glow */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--oxblood) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header Bar */}
      <div
        className="flex items-start justify-between gap-4 border-b pb-5 relative z-10"
        style={{ borderColor: 'color-mix(in srgb, var(--oxblood) 20%, transparent)' }}
      >
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs"
              style={{
                backgroundColor: 'var(--oxblood)',
                borderColor: 'var(--oxblood)',
                color: '#FFFFFF',
              }}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Devil’s Advocate</span>
            </span>

            <DemoBadge type="story" />
          </div>

          <h3
            className="font-headline text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.15] pt-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Challenge the idea before you accept it.
          </h3>

          <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            StoryLettr dispatches are empirical records, not dogma. Here is how and why this strategy could fail, and where fellow practitioners push back:
          </p>
        </div>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="shrink-0 p-2.5 rounded-lg border flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-all hover:bg-black/5"
          style={{
            borderColor: 'color-mix(in srgb, var(--oxblood) 40%, transparent)',
            color: 'var(--oxblood)',
          }}
          aria-expanded={isOpen}
          aria-controls="devils-advocate-content"
        >
          <span>{isOpen ? 'Collapse' : 'Inspect Skeptical Lens'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Skeptical Content */}
      {isOpen && (
        <div id="devils-advocate-content" className="pt-6 space-y-8 relative z-10 animate-fade-in">
          
          {/* SECTION 1: Editorial Rigor Breakdown (4 Core Pillars) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. The Strongest Counterargument */}
            <div
              className="p-5 rounded-xl border space-y-2"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'color-mix(in srgb, var(--oxblood) 20%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--oxblood)' }} />
                <span
                  className="text-xs font-mono font-bold uppercase tracking-wider block"
                  style={{ color: 'var(--oxblood)' }}
                >
                  The strongest counterargument
                </span>
              </div>
              <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {content.strongestCounterargument}
              </p>
            </div>

            {/* 2. When This May Fail */}
            <div
              className="p-5 rounded-xl border space-y-2"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'color-mix(in srgb, var(--oxblood) 20%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--oxblood)' }} />
                <span
                  className="text-xs font-mono font-bold uppercase tracking-wider block"
                  style={{ color: 'var(--oxblood)' }}
                >
                  When this may fail
                </span>
              </div>
              <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {content.whenThisMayFail}
              </p>
            </div>

            {/* 3. What We May Be Missing */}
            <div
              className="p-5 rounded-xl border space-y-2"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'color-mix(in srgb, var(--oxblood) 20%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--sapphire)' }} />
                <span
                  className="text-xs font-mono font-bold uppercase tracking-wider block"
                  style={{ color: 'var(--sapphire)' }}
                >
                  What we may be missing
                </span>
              </div>
              <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {content.whatWeMayBeMissing}
              </p>
            </div>

            {/* 4. What Would Change Our View */}
            <div
              className="p-5 rounded-xl border space-y-2"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'color-mix(in srgb, var(--oxblood) 20%, transparent)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--brass)' }} />
                <span
                  className="text-xs font-mono font-bold uppercase tracking-wider block"
                  style={{ color: 'var(--brass)' }}
                >
                  What would change our view
                </span>
              </div>
              <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {content.whatWouldChangeOurView}
              </p>
            </div>

          </div>

          {/* SECTION 2: Practitioner Counterarguments & Dissenting Forum */}
          <div
            className="rounded-2xl p-6 sm:p-8 border space-y-6"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'color-mix(in srgb, var(--oxblood) 25%, var(--border-medium))',
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-4 h-4 text-[var(--oxblood)]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--oxblood)]">
                    Practitioner Counterarguments & Dissent
                  </span>
                </div>
                <h4 className="font-headline text-xl sm:text-2xl font-normal text-[var(--text-primary)]">
                  Dispute this dispatch with your own experience.
                </h4>
              </div>

              <span className="text-xs font-mono text-[var(--text-muted)] self-start sm:self-auto">
                {comments.length} Recorded Challenges
              </span>
            </div>

            {/* Reader Challenge Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-4 rounded-xl p-5 border bg-[var(--bg-elevated)] border-[var(--border-subtle)]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)]">
                <Sparkles className="w-3.5 h-3.5 text-[var(--oxblood)]" />
                <span>Submit your counter-perspective or where this idea failed for you:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Your Name or Moniker"
                  aria-label="Your Name or Moniker"
                  className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-lg px-3.5 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--oxblood)]"
                  required
                />
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Your Role / Domain (e.g. Founder, Logistics, Growth)"
                  aria-label="Your Role or Domain"
                  className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-lg px-3.5 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--oxblood)]"
                />
              </div>

              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What is your strongest critique against the narrative in this story? Why could this backfire?"
                aria-label="Your counterargument critique"
                rows={3}
                className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-lg p-3.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--oxblood)] leading-relaxed resize-y"
                required
              />

              <input
                type="text"
                value={evidenceText}
                onChange={(e) => setEvidenceText(e.target.value)}
                placeholder="Evidence / Observation context (e.g. 'Tested in 2024 across 40 accounts')"
                aria-label="Supporting evidence or context"
                className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-lg px-3.5 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--oxblood)]"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <span className="text-[11px] text-[var(--text-muted)] font-mono">
                  Contributions are evaluated for empirical rigor and operational depth.
                </span>

                <div className="flex items-center gap-3">
                  {submitted && (
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 animate-fade-in">
                      <CheckCircle2 className="w-4 h-4" />
                      Challenge recorded!
                    </span>
                  )}

                  <StarfieldButton
                    type="submit"
                    variant="oxblood"
                    size="sm"
                    className="shrink-0"
                  >
                    <span>Post Counterargument</span>
                  </StarfieldButton>
                </div>
              </div>
            </form>

            {/* List of Practitioner Challenges */}
            <div className="space-y-4 pt-2">
              {comments.map((item) => {
                const isEndorsed = endorsedIds.has(item.id);
                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl border space-y-3 transition-all bg-[var(--bg-elevated)] border-[var(--border-subtle)] hover:border-[var(--border-light)]"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-headline text-base font-semibold text-[var(--text-primary)]">
                            {item.author}
                          </span>
                          {item.isUserSubmission && (
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--oxblood)]/20 text-[var(--oxblood)] border border-[var(--oxblood)]/30">
                              Reader Dissent
                            </span>
                          )}
                          <span className="text-xs text-[var(--text-muted)]">&bull; {item.date}</span>
                        </div>
                        <span className="text-xs font-mono font-medium text-[var(--brass)] block">
                          {item.role}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleEndorse(item.id)}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isEndorsed
                            ? 'bg-[var(--oxblood)] text-white border-[var(--oxblood)] shadow-xs'
                            : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-[var(--oxblood)] hover:text-[var(--oxblood)]'
                        }`}
                        title="Endorse this counter-perspective"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{item.endorsements}</span>
                        <span className="hidden sm:inline">Endorse</span>
                      </button>
                    </div>

                    <p className="font-body text-sm leading-relaxed text-[var(--text-primary)]">
                      "{item.comment}"
                    </p>

                    {item.evidence && (
                      <div className="pt-2 border-t border-[var(--border-subtle)] flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <AlertCircle className="w-3.5 h-3.5 text-[var(--brass)] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-[var(--text-primary)]">Field Evidence: </strong>
                          {item.evidence}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Bottom Rigor Protocol Note */}
          <div
            className="p-4 rounded-xl border flex items-center justify-between flex-wrap gap-3 text-xs"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--oxblood) 10%, var(--bg-surface))',
              borderColor: 'color-mix(in srgb, var(--oxblood) 25%, transparent)',
              color: 'var(--text-primary)',
            }}
          >
            <div className="flex items-center gap-2 font-medium">
              <ShieldAlert className="w-4 h-4 shrink-0 text-[var(--oxblood)]" />
              <span>
                <strong>Truth & Rigor Standard:</strong> We publish real practitioner results, not promotional certainty. Readers are invited to dispute every dispatch with documented operational evidence.
              </span>
            </div>
            <span className="font-mono text-[11px] opacity-75">Protocol v2.4</span>
          </div>

        </div>
      )}
    </section>
  );
}
