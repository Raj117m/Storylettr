import React, { useState, useEffect } from 'react';
import { ArrowUp, CornerDownRight, MessageSquare, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { INITIAL_COUNTERPOINTS } from '../data/counterpoints';

export default function CounterpointSection({ storySlug = 'default', storyTitle = '' }) {
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

    const initial = INITIAL_COUNTERPOINTS[storySlug] || INITIAL_COUNTERPOINTS.default;
    setCounterpoints(initial);
  }, [storySlug]);

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
    <section
      id="counterpoint"
      className="my-16 font-interface border rounded-3xl p-6 sm:p-10 relative overflow-hidden transition-all"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--border-medium)',
        boxShadow: '0 10px 30px -10px var(--border-subtle)',
      }}
    >
      {/* Editorial Header */}
      <div className="border-b pb-6 mb-8" style={{ borderColor: 'var(--border-subtle)' }}>
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
            Challenge this StoryLettr
          </span>

          <span className="text-xs font-mono text-[var(--text-muted)]">
            {counterpoints.length} {counterpoints.length === 1 ? 'case presented' : 'cases presented'}
          </span>
        </div>

        <h2 className="font-headline text-3xl sm:text-4xl font-normal text-[var(--text-primary)]">
          Counterpoint
        </h2>
        <p className="text-sm sm:text-base font-editorial text-[var(--text-secondary)] mt-1">
          Disagree? Make the case. StoryLettr insights are empirical records, not dogma. Here are intelligent alternative explanations and counterarguments from practitioners.
        </p>
      </div>

      {/* Discussion Thread */}
      <div className="space-y-8">
        {counterpoints.map((cp, idx) => (
          <div key={cp.id} className="group">
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
                      className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold text-[#F5EFE6] bg-[var(--sapphire)]"
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
                      ? 'bg-[var(--sapphire)] text-[#F5EFE6] border-[var(--sapphire)] shadow-xs'
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
              <form
                onSubmit={(e) => handleAddReply(cp.id, e)}
                className="mt-4 ml-10 p-4 rounded-xl border space-y-3 bg-[var(--bg-surface)] border-[var(--border-subtle)] animate-modal-expand"
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
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold text-[#F5EFE6] bg-[var(--sapphire)] hover:opacity-90 shadow-xs cursor-pointer"
                  >
                    Post Reply
                  </button>
                </div>
              </form>
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
                            ? 'bg-[var(--sapphire)] text-[#F5EFE6] border-[var(--sapphire)]'
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
          </div>
        ))}
      </div>

      {/* Add a Counterpoint Trigger / Form */}
      <div className="mt-10 pt-6 border-t border-[var(--border-subtle)]">
        {!showAddForm ? (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="w-full py-3.5 px-5 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 text-sm font-semibold transition-all cursor-pointer text-[var(--text-primary)] border-[var(--border-medium)] hover:border-[var(--brass)] hover:bg-[var(--bg-surface)]"
          >
            <MessageSquare className="w-4 h-4 text-[var(--brass)]" />
            <span>[ Add a counterpoint ]</span>
          </button>
        ) : (
          <form
            onSubmit={handleAddCounterpoint}
            className="rounded-2xl p-5 sm:p-7 border space-y-4 bg-[var(--bg-surface)] border-[var(--border-medium)] animate-modal-expand"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
              <div>
                <h4 className="font-headline text-xl text-[var(--text-primary)]">
                  Make the Case
                </h4>
                <p className="text-xs text-[var(--text-muted)] font-editorial">
                  Surface evidence, question assumptions, or explain why this model may fail in your category.
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
                The Counterargument *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Where does the logic break down? What did the practitioner miss or oversimplify?"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full text-sm font-editorial p-3.5 rounded-xl border bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--sapphire)] resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[var(--text-muted)] italic">
                Encouraging thoughtful, nuanced disagreement.
              </span>

              <button
                type="submit"
                disabled={submitted}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#F5EFE6] bg-[var(--sapphire)] hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[var(--brass-bright)]" />
                    <span>Submitted!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Counterpoint</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
