import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedStoryCard from './components/FeaturedStoryCard';
import StoryGrid from './components/StoryGrid';
import ProcessPipeline from './components/ProcessPipeline';
import StoryPage from './components/StoryPage';
import ExperimentsSection from './components/ExperimentsSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import { FEATURED_STORY, STORIES_LIST } from './data/storiesData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentStory, setCurrentStory] = useState(null);
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
      } else if (['experiments', 'how-it-works', 'about', 'stories'].includes(hash)) {
        setCurrentStory(null);
        setActiveTab(hash);
        const elem = document.getElementById(hash);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        return;
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

  const handleSelectStoryBySlug = (slug) => {
    const found = STORIES_LIST.find(s => s.slug === slug || s.id === slug);
    if (found) {
      handleSelectStory(found);
    }
  };

  const handleNavClick = (tabId) => {
    setCurrentStory(null);
    setActiveTab(tabId);
    if (tabId === 'home') {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = tabId;
      const elem = document.getElementById(tabId);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-200">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleNavClick}
        onOpenSearch={() => setSearchOpen(true)}
        currentStory={currentStory}
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
            {/* Hero Banner */}
            <Hero 
              onExploreClick={() => handleNavClick('stories')}
              onHowItWorksClick={() => handleNavClick('how-it-works')}
              onFeaturedClick={() => handleSelectStory(FEATURED_STORY)}
            />

            {/* Featured Story Section */}
            <FeaturedStoryCard 
              story={FEATURED_STORY} 
              onSelectStory={handleSelectStory} 
            />

            {/* Explore StoryLettrs Grid */}
            <StoryGrid 
              onSelectStory={handleSelectStory} 
            />

            {/* How StoryLettr Works Pipeline */}
            <ProcessPipeline />

            {/* Empirical Experiments Showcase */}
            <ExperimentsSection 
              onSelectStoryBySlug={handleSelectStoryBySlug} 
            />

            {/* About & Methodology */}
            <AboutSection 
              onExploreClick={() => handleNavClick('stories')} 
            />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavClick={handleNavClick} />

      {/* Global Search Modal */}
      <SearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
        onSelectStory={handleSelectStory}
      />

    </div>
  );
}
