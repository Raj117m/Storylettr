import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CHAPTERS } from '../data/content';

export default function ChapterFilterRow() {
  const { pathname } = useLocation();

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
      <Link
        to="/"
        className="px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border"
        style={
          pathname === '/'
            ? { backgroundColor: 'var(--ink)', color: 'var(--paper)', borderColor: 'var(--ink)' }
            : { color: 'var(--ink)', borderColor: 'var(--forward)' }
        }
      >
        All letters
      </Link>
      {CHAPTERS.map((chapter) => {
        const active = pathname === `/chapters/${chapter.id}`;
        return (
          <Link
            key={chapter.id}
            to={`/chapters/${chapter.id}`}
            className="px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border"
            style={
              active
                ? { backgroundColor: 'var(--ink)', color: 'var(--paper)', borderColor: 'var(--ink)' }
                : { color: 'var(--ink)', borderColor: 'var(--forward)' }
            }
          >
            {chapter.name}
          </Link>
        );
      })}
    </div>
  );
}
