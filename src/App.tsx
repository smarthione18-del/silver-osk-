/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewMode, Story, AppLanguage, ThemeSettings } from './types';
import { STORIES } from './data/stories';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AudioPlayerDrawer } from './components/AudioPlayerDrawer';
import { SearchModal } from './components/SearchModal';
import { PairDeviceModal } from './components/PairDeviceModal';
import { FellowshipModal } from './components/FellowshipModal';
import { IndianMusicBar } from './components/IndianMusicBar';
import { StorySaathiVoiceAgent } from './components/StorySaathiVoiceAgent';
import { ColorThemePanel } from './components/ColorThemePanel';
import { MusicGeneratorModal } from './components/MusicGeneratorModal';
import { AudioTranscriberModal } from './components/AudioTranscriberModal';
import { loadSavedThemeSettings, saveThemeSettings, CANVAS_MODES, PALETTES } from './utils/themeConfig';
import { Palette } from 'lucide-react';

import { SimpleIndianView } from './views/SimpleIndianView';
import { DiscoverView } from './views/DiscoverView';
import { StoryDetailView } from './views/StoryDetailView';
import { ExploreByAgeView } from './views/ExploreByAgeView';
import { GenresView } from './views/GenresView';
import { LibraryView } from './views/LibraryView';

export default function App() {
  // Start on simple-indian mode for simple Indian readers, with full archive accessible anytime
  const [currentView, setCurrentView] = useState<ViewMode>('simple-indian');
  const [selectedStory, setSelectedStory] = useState<Story>(STORIES[0]);
  const [selectedAgeBracketId, setSelectedAgeBracketId] = useState<string>('little-dreamers');

  // Language state (defaults to Hindi 'hi' with multilingual support for English, Gujarati, Marathi)
  const [language, setLanguage] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem('storyweave_lang');
      if (saved === 'en' || saved === 'hi' || saved === 'gu' || saved === 'mr') return saved as AppLanguage;
    } catch (e) {
      // ignore
    }
    return 'hi';
  });

  const handleSelectLanguage = (nextLang: AppLanguage) => {
    setLanguage(nextLang);
    try {
      localStorage.setItem('storyweave_lang', nextLang);
    } catch (e) {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang: AppLanguage = language === 'hi' ? 'en' : 'hi';
    handleSelectLanguage(nextLang);
  };

  // Voice Agent State (Speaks and Listens)
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);
  const [voiceAgentStory, setVoiceAgentStory] = useState<Story | null>(STORIES[0]);

  const handleOpenVoiceAgent = (story?: Story) => {
    setVoiceAgentStory(story || selectedStory || STORIES[0]);
    setIsVoiceAgentOpen(true);
  };
  
  // 14 default bookmarked stories matching the mockup count
  const [bookmarkedStoryIds, setBookmarkedStoryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('storyweave_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [
      'clever-crow',
      'tenali-raman-thieves',
      'akbar-birbal-sweetest',
      'kabuliwala-tagore',
      'swami-malgudi',
      'clockwork-alchemist',
      'whispers-banyan-tree',
      'last-stargazer-andromeda',
      'bakers-guide-dragon-bread',
      'shadows-victorian-underground',
      'glassmakers-sunken-canal',
      'scribe-whispering-vaults',
      'clay-constellations',
      'hedgehog-touch-moon',
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

  // Attractive Colour UI Panel & Theme Studio State
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(loadSavedThemeSettings);
  const [isColorThemeOpen, setIsColorThemeOpen] = useState(false);

  // Lyria Music Generator & Gemini 3.5 Audio Transcriber Modals
  const [isMusicGeneratorOpen, setIsMusicGeneratorOpen] = useState(false);
  const [isTranscriberOpen, setIsTranscriberOpen] = useState(false);

  // Sync theme settings and apply dark mode class to html element
  useEffect(() => {
    saveThemeSettings(themeSettings);
    const isDark = themeSettings.canvasMode === 'night' || themeSettings.palette === 'midnight-starlight';
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeSettings]);

  const handleUpdateThemeSettings = (newSettings: Partial<ThemeSettings>) => {
    setThemeSettings((prev) => ({ ...prev, ...newSettings }));
  };

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
    alert(
      language === 'hi'
        ? "🎉 छात्रवृत्ति पास सक्रिय! सभी अध्याय और ऑडियोबुक अध्ययन के लिए अनलॉक हो गए हैं।"
        : "🎉 Scholastic Pass Activated! All chapters and audiobooks unlocked for your study."
    );
  };

  const activePalette = PALETTES[themeSettings.palette] || PALETTES['royal-amber'];
  const activeCanvas = CANVAS_MODES[themeSettings.canvasMode] || CANVAS_MODES['cream'];

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${activeCanvas.bgClass} ${activeCanvas.textClass} ${
        themeSettings.fontFamily === 'serif' ? 'font-serif' : themeSettings.fontFamily === 'dyslexic' ? 'font-sans tracking-wide' : 'font-sans'
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
        language={language}
        onToggleLanguage={toggleLanguage}
        onSelectLanguage={handleSelectLanguage}
        onOpenVoiceAgent={() => handleOpenVoiceAgent(selectedStory)}
        onOpenColorTheme={() => setIsColorThemeOpen(true)}
        onOpenMusicGenerator={() => setIsMusicGeneratorOpen(true)}
        onOpenTranscriber={() => setIsTranscriberOpen(true)}
      />

      {/* Main Screen Router with padding top for fixed header */}
      <main className="w-full pt-20 flex-1">
        {currentView === 'simple-indian' && (
          <SimpleIndianView
            stories={STORIES}
            onSelectStory={handleSelectStory}
            onPlayAudio={handlePlayAudio}
            onOpenVoiceAgent={handleOpenVoiceAgent}
            bookmarkedStoryIds={bookmarkedStoryIds}
            onToggleBookmark={toggleBookmark}
            language={language}
            onToggleLanguage={toggleLanguage}
            onSwitchToFullAnthology={() => {
              setCurrentView('discover');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            themeSettings={themeSettings}
            onOpenColorTheme={() => setIsColorThemeOpen(true)}
            onUpdateThemeSettings={handleUpdateThemeSettings}
          />
        )}

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
            onOpenVoiceAgent={handleOpenVoiceAgent}
            language={language}
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

      {/* Soothing Indian Classical Ambient Music Player Bar */}
      <IndianMusicBar language={language} />

      {/* Floating Story Saathi Voice Assistant Trigger (Speak & Listen) */}
      <button
        onClick={() => handleOpenVoiceAgent(selectedStory)}
        className="fixed bottom-5 right-5 z-40 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-500 hover:to-amber-500 text-white p-3 sm:px-5 sm:py-3.5 rounded-full shadow-[0_4px_25px_rgba(234,88,12,0.4)] flex items-center gap-2.5 font-bold text-sm border-2 border-white/70 active:scale-95 transition-all group"
        title={language === 'hi' ? 'कहानी साथी (दीदी) से बोलकर पूछें' : 'Ask Story Saathi (Voice)'}
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg shadow-inner">
          🧕
        </div>
        <div className="flex flex-col text-left leading-tight hidden sm:flex">
          <span className="text-xs font-bold text-white flex items-center gap-1">
            <span>{language === 'hi' ? 'बोलकर पूछें' : 'Voice Saathi'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </span>
          <span className="text-[10px] text-amber-200">
            {language === 'hi' ? 'दीदी से समझें' : 'Speak & Listen'}
          </span>
        </div>
      </button>

      {/* Floating Attractive Colour UI Panel & Theme Studio Trigger */}
      <button
        onClick={() => setIsColorThemeOpen(true)}
        className="fixed bottom-5 left-5 z-40 bg-gradient-to-r from-amber-500 via-pink-500 to-rose-600 hover:from-amber-400 hover:to-pink-500 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-[0_4px_25px_rgba(244,63,94,0.38)] flex items-center gap-2 font-bold text-xs sm:text-sm border-2 border-white/80 active:scale-95 transition-all group backdrop-blur-sm"
        title={language === 'hi' ? '🎨 रंग व थीम स्टूडियो खोलें' : '🎨 Open Color & Atmosphere Studio'}
      >
        <div className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center text-base shadow-xs group-hover:rotate-45 transition-transform">
          🎨
        </div>
        <div className="flex flex-col text-left leading-none hidden sm:flex">
          <span className="text-xs font-bold text-white flex items-center gap-1">
            <span>{language === 'hi' ? 'रंग व थीम' : 'Color Studio'}</span>
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
          </span>
          <span className="text-[10px] text-amber-100 font-medium mt-0.5">
            {activePalette.emoji} {language === 'hi' ? activePalette.nameHi.split(' ')[0] : activePalette.nameEn.split(' ')[0]}
          </span>
        </div>
      </button>

      {/* Attractive Colour UI Panel & Atmosphere Studio Modal */}
      <ColorThemePanel
        isOpen={isColorThemeOpen}
        onClose={() => setIsColorThemeOpen(false)}
        settings={themeSettings}
        onUpdateSettings={handleUpdateThemeSettings}
        language={language}
      />

      {/* Lyria AI Music Generator Modal */}
      <MusicGeneratorModal
        isOpen={isMusicGeneratorOpen}
        onClose={() => setIsMusicGeneratorOpen(false)}
        language={language}
        currentStory={activeAudioStory || selectedStory}
      />

      {/* Gemini 3.5 Audio Transcriber Modal */}
      <AudioTranscriberModal
        isOpen={isTranscriberOpen}
        onClose={() => setIsTranscriberOpen(false)}
        language={language}
        onSendToVoiceAgent={(text) => {
          handleOpenVoiceAgent(selectedStory);
        }}
        onSearchStoryWithText={() => {
          setIsSearchOpen(true);
        }}
      />

      {/* Voice Agent Dialog (Speak & Listen for Book Comprehension) */}
      <StorySaathiVoiceAgent
        isOpen={isVoiceAgentOpen}
        onClose={() => setIsVoiceAgentOpen(false)}
        currentStory={voiceAgentStory || selectedStory}
        language={language}
        onSelectStory={handleSelectStory}
        onPlayAudio={handlePlayAudio}
      />

      {/* Floating Audio Player Drawer */}
      <AudioPlayerDrawer
        currentStory={activeAudioStory}
        isPlaying={isAudioPlaying}
        onTogglePlay={() => setIsAudioPlaying(!isAudioPlaying)}
        onClose={() => {
          setIsAudioPlaying(false);
          setActiveAudioStory(null);
        }}
        language={language}
        onLanguageChange={handleSelectLanguage}
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
