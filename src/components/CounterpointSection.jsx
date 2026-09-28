import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUp, CornerDownRight, MessageSquare, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { INITIAL_COUNTERPOINTS } from '../data/counterpoints';

export default function CounterpointSection({ storySlug = 'default', storyTitle = '', variant = 'default', initialCounterpoints = null }) {
  const isTruthDesk = variant === 'truth-desk';
  const prefersReducedMotion = useReducedMotion();
  const [counterpoints, setCounterpoints] = useState([]);
  const [upvotedIds, setUpvotedIds] = useState(new Set());
  const [replyingToId, setReplyingToId] = useState(null);

  // New counterpoint form
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Reply form
  const [replyName, setReplyName] = useState('');
  const [replyRole, setReplyRole] = useState('');
  const [replyText, setReplyText] = useState('');

  // Load from localStorage or fallback to structured mock data
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storageKey = `storylettr-counterpoints-${storySlug}`;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setCounterpoints(JSON.parse(stored));
        return;
      }
    } catch {
      // storage unavailable
    }

    const initial = initialCounterpoints ?? INITIAL_COUNTERPOINTS[storySlug] ?? INITIAL_COUNTERPOINTS.default;
    setCounterpoints(initial);
  }, [storySlug, initialCounterpoints]);

  const saveCounterpoints = (newList) => {
    setCounterpoints(newList);
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`storylettr-counterpoints-${storySlug}`, JSON.stringify(newList));
    } catch {
      // ignore
    }
  };

  const handleUpvote = (id) => {
    const isUpvoted = upvotedIds.has(id);
    const updatedSet = new Set(upvotedIds);
    if (isUpvoted) {
      updatedSet.delete(id);
    } else {
      updatedSet.add(id);
    }
    setUpvotedIds(updatedSet);

    // Update count in list
    const updated = counterpoints.map((cp) => {
      if (cp.id === id) {
        return { ...cp, upvotes: cp.upvotes + (isUpvoted ? -1 : 1) };
      }
      if (cp.replies) {
        const updatedReplies = cp.replies.map((rep) =>
          rep.id === id ? { ...rep, upvotes: rep.upvotes + (isUpvoted ? -1 : 1) } : rep
        );
        return { ...cp, replies: updatedReplies };
      }
      return cp;
    });

    saveCounterpoints(updated);
  };

  const handleAddCounterpoint = (e) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;

    const newEntry = {
      id: `user-cp-${Date.now()}`,
      author: name.trim(),
      role: role.trim() || 'Verified Reader',
      avatar: null,
      timestamp: 'Just now',
      content: commentText.trim(),
      upvotes: 1,
      replies: [],
    };

    const nextList = [newEntry, ...counterpoints];
    saveCounterpoints(nextList);

    // Reset form
    setName('');
    setRole('');
    setCommentText('');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAddForm(false);
    }, 2000);
  };

  const handleAddReply = (parentId, e) => {
    e.preventDefault();
    if (!replyName.trim() || !replyText.trim()) return;

    const newReply = {
      id: `user-rep-${Date.now()}`,
      author: replyName.trim(),
      role: replyRole.trim() || 'Practitioner',
      avatar: null,
      timestamp: 'Just now',
      content: replyText.trim(),
      upvotes: 1,
    };

    const nextList = counterpoints.map((cp) => {
      if (cp.id === parentId) {
        return {
          ...cp,
          replies: [...(cp.replies || []), newReply],
        };
      }
      return cp;
    });

    saveCounterpoints(nextList);
    setReplyingToId(null);
    setReplyName('');
    setReplyRole('');
    setReplyText('');
  };

  return (
    <motion.section
      id="counterpoint"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`my-12 font-interface relative overflow-hidden border-y-2 px-5 py-7 sm:px-8 sm:py-9 lg:px-12 ${isTruthDesk ? 'truth-desk-discussion' : 'border rounded-3xl'}`}
      style={{
        backgroundColor: isTruthDesk ? 'var(--oxblood-surface)' : 'var(--bg-elevated)',
        borderColor: isTruthDesk ? 'var(--oxblood)' : 'var(--border-medium)',
        boxShadow: isTruthDesk ? 'inset 5px 0 0 var(--oxblood), 0 18px 48px -36px var(--oxblood)' : '0 10px 30px -10px var(--border-subtle)',
      }}
    >
      {isTruthDesk && (
        <motion.div
          aria-hidden="true"
          className="absolute right-0 top-0 h-1 w-full origin-left"
          style={{ background: 'linear-gradient(90deg, var(--oxblood), var(--brass), transparent)' }}
          animate={prefersReducedMotion ? undefined : { scaleX: [0.35, 1, 0.72] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      )}
      {/* Editorial Header */}
      <div className="border-b pb-6 mb-8" style={{ borderColor: isTruthDesk ? 'color-mix(in srgb, var(--oxblood) 28%, transparent)' : 'var(--border-subtle)' }}>
        <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
          <span
            className="text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full border flex items-center gap-1.5"
            style={{
              backgroundColor: 'var(--oxblood-surface)',
              borderColor: 'var(--oxblood)',
              color: 'var(--oxblood)',
            }}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            {isTruthDesk ? 'Challenge this finding' : 'Challenge this StoryLettr'}
          </span>

          <span className="text-xs font-mono text-[var(--text-muted)]">
            {counterpoints.length} {counterpoints.length === 1 ? 'case presented' : 'cases presented'}
          </span>
        </div>

        <h2 className="font-headline text-3xl sm:text-4xl font-normal text-[var(--text-primary)]">
          {isTruthDesk ? 'Make the case back.' : 'Counterpoint'}
        </h2>
        <p className="text-sm sm:text-base font-editorial text-[var(--text-secondary)] mt-1">
          {isTruthDesk
            ? 'Disagree with this check, have a source we missed, or know a detail from the ground? Add a considered challenge and help readers see where the evidence ends.'
            : 'Disagree? Make the case. StoryLettr insights are empirical records, not dogma. Here are intelligent alternative explanations and counterarguments from practitioners.'}
        </p>
        {isTruthDesk && storyTitle && <p className="mt-4 border-l-2 pl-3 font-editorial text-sm italic" style={{ borderColor: 'var(--oxblood)', color: 'var(--text-muted)' }}>On this report: “{storyTitle}”</p>}
        {isTruthDesk && <p className="mt-3 text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>Preview only: challenges are saved in this browser. Shared public comments need a connected discussion service.</p>}
      </div>

      {/* Discussion Thread */}
      <div className="space-y-8">
        {isTruthDesk && counterpoints.length === 0 && (
          <p className="border-l-2 py-2 pl-4 font-editorial text-sm" style={{ borderColor: 'var(--oxblood)', color: 'var(--text-secondary)' }}>
            No challenges yet. Add the first source, correction, or counterargument.
          </p>
        )}
        {counterpoints.map((cp, idx) => (
          <motion.div
            key={cp.id}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : Math.min(idx * 0.06, 0.24) }}
            className="group"
          >
            {/* Top Level Item */}
            <div className="space-y-3">
              {/* Author & Timestamp */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  {cp.avatar ? (
                    <img
                      src={cp.avatar}
                      alt={cp.author}
                      className="w-8 h-8 rounded-full object-cover border border-[var(--border-subtle)]"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold text-[#F5EFE6] ${isTruthDesk ? 'bg-[var(--oxblood)]' : 'bg-[var(--sapphire)]'}`}
                    >
                      {cp.author.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-sm text-[var(--text-primary)] leading-tight">
                      {cp.author}
                    </h4>
                    {cp.role && (
                      <span className="text-xs text-[var(--text-muted)] block leading-tight">
                        {cp.role}
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {cp.timestamp}
                </span>
              </div>

              {/* Comment Content */}
              <p className="font-editorial text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] pl-10 pr-2">
                &ldquo;{cp.content}&rdquo;
              </p>

              {/* Action row: Subtle Upvote & Reply */}
              <div className="flex items-center gap-4 pl-10 pt-1">
                <button
                  type="button"
                  onClick={() => handleUpvote(cp.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                    upvotedIds.has(cp.id)
                    ? `${isTruthDesk ? 'bg-[var(--oxblood)] border-[var(--oxblood)]' : 'bg-[var(--sapphire)] border-[var(--sapphire)]'} text-[#F5EFE6] shadow-xs`
                      : 'text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]'
                  }`}
                  title="Upvote this counterpoint"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>{cp.upvotes}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReplyingToId(replyingToId === cp.id ? null : cp.id)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <CornerDownRight className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </div>
            </div>

            {/* Inline Reply Form */}
            {replyingToId === cp.id && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.24 }}
                onSubmit={(e) => handleAddReply(cp.id, e)}
                className="mt-4 ml-2 sm:ml-10 p-4 rounded-xl border space-y-3 bg-[var(--bg-surface)] border-[var(--border-subtle)] animate-modal-expand"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={replyName}
                    onChange={(e) => setReplyName(e.target.value)}
                    required
                    className="w-full text-xs px-3 py-2 rounded-lg border bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--sapphire)]"
                  />
                  <input
                    type="text"
                    placeholder="Your role / background (optional)"
                    value={replyRole}
                    onChange={(e) => setReplyRole(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--sapphire)]"
                  />
                </div>
                <textarea
                  placeholder={`Reply to ${cp.author}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  required
                  rows={2}
                  className="w-full text-xs font-editorial p-3 rounded-lg border bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--sapphire)] resize-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setReplyingToId(null)}
                    className="px-3 py-1.5 rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold text-[#F5EFE6] ${isTruthDesk ? 'bg-[var(--oxblood)]' : 'bg-[var(--sapphire)]'} hover:opacity-90 shadow-xs cursor-pointer`}
                  >
                    Post Reply
                  </button>
                </div>
              </motion.form>
            )}

            {/* Nested Replies */}
            {cp.replies && cp.replies.length > 0 && (
              <div className="mt-4 ml-6 sm:ml-10 pl-4 border-l-2 space-y-4" style={{ borderColor: 'var(--border-subtle)' }}>
                {cp.replies.map((rep) => (
                  <div key={rep.id} className="space-y-2 pt-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        {rep.avatar ? (
                          <img
                            src={rep.avatar}
                            alt={rep.author}
                            className="w-6 h-6 rounded-full object-cover border border-[var(--border-subtle)]"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold text-[#F5EFE6] bg-[var(--brass)]">
                            {rep.author.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <span className="text-xs font-semibold text-[var(--text-primary)]">
                          {rep.author}
                        </span>
                        {rep.role && (
                          <span className="text-[11px] text-[var(--text-muted)]">
                            &bull; {rep.role}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-[var(--text-muted)]">
                        {rep.timestamp}
                      </span>
                    </div>

                    <p className="font-editorial text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] pl-8">
                      &ldquo;{rep.content}&rdquo;
                    </p>

                    <div className="pl-8">
                      <button
                        type="button"
                        onClick={() => handleUpvote(rep.id)}
                        className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded border transition-all cursor-pointer ${
                          upvotedIds.has(rep.id)
                            ? `${isTruthDesk ? 'bg-[var(--oxblood)] border-[var(--oxblood)]' : 'bg-[var(--sapphire)] border-[var(--sapphire)]'} text-[#F5EFE6]`
                            : 'text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <ArrowUp className="w-3 h-3" />
                        <span>{rep.upvotes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Divider */}
            {idx < counterpoints.length - 1 && (
              <hr className="mt-8 border-t border-[var(--border-subtle)]" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Add a Counterpoint Trigger / Form */}
      <div className="mt-10 pt-6 border-t border-[var(--border-subtle)]" style={isTruthDesk ? { borderColor: 'color-mix(in srgb, var(--oxblood) 28%, transparent)' } : undefined}>
        {!showAddForm ? (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="w-full py-3.5 px-5 rounded-none border-2 border-dashed flex items-center justify-center gap-2 text-sm font-semibold transition-all cursor-pointer text-[var(--text-primary)] border-[var(--border-medium)] hover:border-[var(--brass)] hover:bg-[var(--bg-surface)]"
            style={isTruthDesk ? { borderColor: 'var(--oxblood)', color: 'var(--oxblood)' } : undefined}
          >
            <MessageSquare className={`w-4 h-4 ${isTruthDesk ? 'text-[var(--oxblood)]' : 'text-[var(--brass)]'}`} />
            <span>{isTruthDesk ? 'Add your challenge' : '[ Add a counterpoint ]'}</span>
          </button>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            onSubmit={handleAddCounterpoint}
            className="rounded-2xl p-5 sm:p-7 border space-y-4 bg-[var(--bg-surface)] border-[var(--border-medium)] animate-modal-expand"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
              <div>
                <h4 className="font-headline text-xl text-[var(--text-primary)]">
                  {isTruthDesk ? 'Add your challenge' : 'Make the Case'}
                </h4>
                <p className="text-xs text-[var(--text-muted)] font-editorial">
                  {isTruthDesk ? 'Share a source, correction, or detail the report missed.' : 'Surface evidence, question assumptions, or explain why this model may fail in your category.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-[var(--text-muted)]">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--sapphire)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-[var(--text-muted)]">
                  Your Role / Context
                </label>
                <input
                  type="text"
                  placeholder="e.g. Growth Strategist, B2B SaaS"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--sapphire)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-[var(--text-muted)]">
                {isTruthDesk ? 'Your challenge *' : 'The Counterargument *'}
              </label>
              <textarea
                required
                rows={4}
                placeholder={isTruthDesk ? 'What should readers reconsider? Add sources or details if you have them.' : 'Where does the logic break down? What did the practitioner miss or oversimplify?'}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full text-sm font-editorial p-3.5 rounded-xl border bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--sapphire)] resize-none"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-[var(--text-muted)] italic">
                Encouraging thoughtful, nuanced disagreement.
              </span>

              <button
                type="submit"
                disabled={submitted}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold text-[#F5EFE6] ${isTruthDesk ? 'bg-[var(--oxblood)]' : 'bg-[var(--sapphire)]'} hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50`}
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[var(--brass-bright)]" />
                    <span>Submitted!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                  <span>{isTruthDesk ? 'Post challenge' : 'Submit Counterpoint'}</span>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </motion.section>
  );
}
