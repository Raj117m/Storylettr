import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';

import HomePage from './pages/HomePage';
import ChapterPage from './pages/ChapterPage';
import StationsPage from './pages/StationsPage';
import LocalityPage from './pages/LocalityPage';
import ArticlePage from './pages/ArticlePage';
import FactCheckPage from './pages/FactCheckPage';
import TruthDeskPage from './pages/TruthDeskPage';
import AuthorPage from './pages/AuthorPage';
import GlossaryTermPage from './pages/GlossaryTermPage';
import AboutPage from './pages/AboutPage';
import CorrectionsPage from './pages/CorrectionsPage';
import NewsletterPage from './pages/NewsletterPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between" style={{ backgroundColor: 'var(--paper)' }}>
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      <main className="grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chapters/:chapterId" element={<ChapterPage />} />
          <Route path="/mumbai" element={<StationsPage />} />
          <Route path="/mumbai/:station" element={<LocalityPage />} />
          <Route path="/stories/:slug" element={<ArticlePage type="story" />} />
          <Route path="/explainers/:slug" element={<ArticlePage type="explainer" />} />
          <Route path="/fact-checks/:slug" element={<FactCheckPage />} />
          <Route path="/truth-desk" element={<TruthDeskPage />} />
          <Route path="/authors/:authorSlug" element={<AuthorPage />} />
          <Route path="/glossary/:term" element={<GlossaryTermPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/corrections" element={<CorrectionsPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
