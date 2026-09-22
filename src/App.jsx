import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectorNav from './components/SectorNav';
import StoryGrid from './components/StoryGrid';
import StoryPage from './components/StoryPage';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import { STORIES_LIST } from './data/storiesData';

export default function App() {
  const [currentStory, setCurrentStory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchOpen, setSearchOpen] = useState(false);

  // Sync hash routing for GitHub Pages URL navigation compatibility
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('story/')) {
        const slug = hash.replace('story/', '');
        const found = STORIES_LIST.find(s => s.slug === slug || s.id === slug);
        if (found) {
          setCurrentStory(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      } else if (hash === 'stories') {
        setCurrentStory(null);
        const elem = document.getElementById('stories');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectStory = (story) => {
    setCurrentStory(story);
    window.location.hash = `story/${story.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGrid = () => {
    setCurrentStory(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSector = (category) => {
    setCurrentStory(null);
    setSelectedCategory(category);
    window.location.hash = 'stories';
    const elem = document.getElementById('stories');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoHome = () => {
    setCurrentStory(null);
    setSelectedCategory('All');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-200">

      {/* Top Navbar */}
      <Navbar
        onSelectSector={handleSelectSector}
        onOpenSearch={() => setSearchOpen(true)}
        onGoHome={handleGoHome}
      />

      {/* Main View Area */}
      <main className="grow">
        {currentStory ? (
          <StoryPage
            story={currentStory}
            onBack={handleBackToGrid}
          />
        ) : (
          <>
            {/* Hero: brand + basic description */}
            <Hero onExploreClick={() => handleSelectSector('All')} />

            {/* Topic Sectors */}
            <SectorNav onSelectSector={handleSelectSector} />

            {/* Story Grid, filterable by sector */}
            <StoryGrid
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectStory={handleSelectStory}
            />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer onSelectSector={handleSelectSector} onGoHome={handleGoHome} />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectStory={handleSelectStory}
      />

    </div>
  );
}
