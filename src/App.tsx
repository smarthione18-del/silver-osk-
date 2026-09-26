/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewMode, Story } from './types';
import { STORIES } from './data/stories';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AudioPlayerDrawer } from './components/AudioPlayerDrawer';
import { SearchModal } from './components/SearchModal';
import { PairDeviceModal } from './components/PairDeviceModal';
import { FellowshipModal } from './components/FellowshipModal';

import { DiscoverView } from './views/DiscoverView';
import { StoryDetailView } from './views/StoryDetailView';
import { ExploreByAgeView } from './views/ExploreByAgeView';
import { GenresView } from './views/GenresView';
import { LibraryView } from './views/LibraryView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('discover');
  const [selectedStory, setSelectedStory] = useState<Story>(STORIES[0]);
  const [selectedAgeBracketId, setSelectedAgeBracketId] = useState<string>('little-dreamers');
  
  // 14 default bookmarked stories matching the mockup count
  const [bookmarkedStoryIds, setBookmarkedStoryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('storyweave_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [
      'clockwork-alchemist',
      'whispers-banyan-tree',
      'last-stargazer-andromeda',
      'bakers-guide-dragon-bread',
      'shadows-victorian-underground',
      'glassmakers-sunken-canal',
      'scribe-whispering-vaults',
      'clay-constellations',
      'hedgehog-touch-moon',
      'barnaby-flying-teapot',
      'little-river-forgot-flow',
      'detective-pip-carrot-cake',
      'weaver-of-solitude',
      'foxfire-iron-bells',
    ];
  });

  // Audio player state
  const [activeAudioStory, setActiveAudioStory] = useState<Story | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPairModalOpen, setIsPairModalOpen] = useState(false);
  const [isFellowshipModalOpen, setIsFellowshipModalOpen] = useState(false);

  // Ambient Study Atmosphere Mode
  const [isAmbientMode, setIsAmbientMode] = useState(false);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('storyweave_bookmarks', JSON.stringify(bookmarkedStoryIds));
    } catch (e) {
      // ignore
    }
  }, [bookmarkedStoryIds]);

  const toggleBookmark = (storyId: string) => {
    setBookmarkedStoryIds((prev) =>
      prev.includes(storyId) ? prev.filter((id) => id !== storyId) : [...prev, storyId]
    );
  };

  const handleSelectStory = (story: Story) => {
    setSelectedStory(story);
    setCurrentView('story-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAgeBracket = (bracketId: string) => {
    setSelectedAgeBracketId(bracketId);
    setCurrentView('explore-by-age');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayAudio = (story: Story) => {
    if (activeAudioStory?.id === story.id) {
      setIsAudioPlaying(!isAudioPlaying);
    } else {
      setActiveAudioStory(story);
      setIsAudioPlaying(true);
    }
  };

  const handleUnlockAllChapters = () => {
    alert("🎉 Scholastic Pass Activated! All chapters and folio map downloads unlocked for your study.");
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${
        isAmbientMode ? 'bg-[#fff5ee] text-[#1d0f00]' : 'bg-[#fff8f7] text-[#410004]'
      }`}
    >
      {/* Top Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookmarkCount={bookmarkedStoryIds.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        isAmbientMode={isAmbientMode}
        onToggleAmbient={() => setIsAmbientMode(!isAmbientMode)}
      />

      {/* Main Screen Router with padding top for fixed header */}
      <main className="w-full pt-20 flex-1">
        {currentView === 'discover' && (
          <DiscoverView
            heroStory={STORIES[0]}
            trendingStories={[STORIES[1], STORIES[2], STORIES[3], STORIES[4]]}
            onSelectStory={handleSelectStory}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectAgeBracket={handleSelectAgeBracket}
            bookmarkedStoryIds={bookmarkedStoryIds}
            onToggleBookmark={toggleBookmark}
            onPlayAudio={handlePlayAudio}
          />
        )}

        {currentView === 'story-detail' && (
          <StoryDetailView
            story={selectedStory}
            allStories={STORIES}
            onSelectStory={handleSelectStory}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isBookmarked={bookmarkedStoryIds.includes(selectedStory.id)}
            onToggleBookmark={toggleBookmark}
            onPlayAudio={handlePlayAudio}
            isAudioPlaying={isAudioPlaying && activeAudioStory?.id === selectedStory.id}
            onOpenFellowshipModal={() => setIsFellowshipModalOpen(true)}
          />
        )}

        {currentView === 'explore-by-age' && (
          <ExploreByAgeView
            stories={STORIES}
            selectedBracketId={selectedAgeBracketId}
            onSelectBracket={setSelectedAgeBracketId}
            onSelectStory={handleSelectStory}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPairModal={() => setIsPairModalOpen(true)}
            bookmarkedStoryIds={bookmarkedStoryIds}
            onToggleBookmark={toggleBookmark}
            onPlayAudio={handlePlayAudio}
          />
        )}

        {currentView === 'genres' && (
          <GenresView
            stories={STORIES}
            onSelectStory={handleSelectStory}
            bookmarkedStoryIds={bookmarkedStoryIds}
            onToggleBookmark={toggleBookmark}
            onPlayAudio={handlePlayAudio}
          />
        )}

        {currentView === 'my-library' && (
          <LibraryView
            stories={STORIES}
            bookmarkedStoryIds={bookmarkedStoryIds}
            onToggleBookmark={toggleBookmark}
            onSelectStory={handleSelectStory}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onPlayAudio={handlePlayAudio}
          />
        )}
      </main>

      {/* Floating Audio Player Drawer */}
      <AudioPlayerDrawer
        currentStory={activeAudioStory}
        isPlaying={isAudioPlaying}
        onTogglePlay={() => setIsAudioPlaying(!isAudioPlaying)}
        onClose={() => {
          setIsAudioPlaying(false);
          setActiveAudioStory(null);
        }}
      />

      {/* ⌘K Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        stories={STORIES}
        onSelectStory={handleSelectStory}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Family Read-Together Dual Device Pairing Modal */}
      <PairDeviceModal
        isOpen={isPairModalOpen}
        onClose={() => setIsPairModalOpen(false)}
      />

      {/* Scholastic Fellowship Modal */}
      <FellowshipModal
        isOpen={isFellowshipModalOpen}
        onClose={() => setIsFellowshipModalOpen(false)}
        onUnlockAll={handleUnlockAllChapters}
      />

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
