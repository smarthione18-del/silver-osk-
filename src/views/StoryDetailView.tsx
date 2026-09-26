import React, { useState, useEffect, useRef } from 'react';
import { Story, ViewMode, ReadingTheme } from '../types';

interface StoryDetailViewProps {
  story: Story;
  allStories: Story[];
  onSelectStory: (story: Story) => void;
  onNavigate: (view: ViewMode) => void;
  isBookmarked: boolean;
  onToggleBookmark: (storyId: string) => void;
  onPlayAudio: (story: Story) => void;
  isAudioPlaying: boolean;
  onOpenFellowshipModal: () => void;
}

export const StoryDetailView: React.FC<StoryDetailViewProps> = ({
  story,
  allStories,
  onSelectStory,
  onNavigate,
  isBookmarked,
  onToggleBookmark,
  onPlayAudio,
  isAudioPlaying,
  onOpenFellowshipModal,
}) => {
  const [readingTheme, setReadingTheme] = useState<ReadingTheme>('warm');
  const [fontScale, setFontScale] = useState(100);
  const [useDyslexicFont, setUseDyslexicFont] = useState(false);
  const [autoScrollSpeed, setAutoScrollSpeed] = useState('off');
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [unlockedChapters, setUnlockedChapters] = useState<number[]>([0]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [offlineDownloaded, setOfflineDownloaded] = useState(false);
  const [activeGlossaryWord, setActiveGlossaryWord] = useState<string | null>(null);

  const readerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    let scrollTimer: any;
    if (autoScrollSpeed !== 'off') {
      const speedMs = autoScrollSpeed === 'gentle' ? 50 : autoScrollSpeed === 'narrative' ? 25 : 12;
      scrollTimer = setInterval(() => {
        window.scrollBy({ top: 1, behavior: 'smooth' });
      }, speedMs);
    }
    return () => clearInterval(scrollTimer);
  }, [autoScrollSpeed]);

  const scrollToReader = () => {
    readerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadOffline = () => {
    setOfflineDownloaded(true);
    setTimeout(() => alert(`"${story.title}" has been saved to offline storage in your Scholastic Cache.`), 300);
  };

  // Terminology glossary map
  const glossary: Record<string, string> = {
    horologe: 'An early clock, sundial, or mechanical timepiece recording celestial rhythms.',
    astrolabe: 'An intricate astronomical instrument used by medieval navigators and astrologers.',
    escapement: 'A mechanical mechanism in a clock that regulates movement and imparts impulses to the balance wheel.',
    quicksilver: 'Alchemical mercury, believed in the Renaissance to hold transmutation memory.',
  };

  // Related stories lookup
  const relatedStories = (story.relatedStoryIds || [])
    .map((id) => allStories.find((s) => s.id === id))
    .filter(Boolean) as Story[];

  const activeChapter = story.chapters[activeChapterIndex] || story.chapters[0];
  const isCurrentChapterUnlocked = unlockedChapters.includes(activeChapterIndex) || activeChapter.isUnlocked;

  return (
    <div className="flex flex-col w-full relative">
      {/* Ambient background glows */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#ffddb4]/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 right-10 w-80 h-80 bg-[#ffe1df]/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full px-4 sm:px-8 lg:px-12 py-6 flex flex-col gap-12 max-w-7xl mx-auto">
        {/* 1. Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#45464d]/80 tracking-wide font-medium">
          <button
            onClick={() => onNavigate('discover')}
            className="hover:text-[#06102b] transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">explore</span>
            Discover
          </button>
          <span className="text-[#c6c6ce] font-light">/</span>
          <button
            onClick={() => onNavigate('genres')}
            className="hover:text-[#06102b] transition-colors"
          >
            {story.genre}
          </button>
          <span className="text-[#c6c6ce] font-light">/</span>
          <span className="text-[#06102b] font-bold truncate max-w-xs sm:max-w-md">
            {story.title}
          </span>
        </nav>

        {/* 2. Hero Story Presentation Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (5 Cols) - Cover Art Stage */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start relative group w-full">
            <div className="relative w-full max-w-sm mx-auto lg:max-w-none shadow-2xl rounded-2xl overflow-hidden bg-[#fff0ef] transition-transform duration-500 group-hover:-translate-y-1 border border-[#c6c6ce]/30">
              {/* Ornate Gold Foil Framing */}
              <div className="p-3 bg-gradient-to-b from-[#ffddb4] via-[#ffe1df] to-[#feb956]/40 rounded-xl">
                <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-[#1c2541] shadow-inner">
                  <img
                    alt={story.title}
                    src={story.coverImage}
                    className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  {/* Crimson Ribbon Bookmark */}
                  <div className="absolute -top-1 left-6 w-7 h-16 bg-[#ba1a1a] shadow-md rounded-b-xs flex items-end justify-center pb-1">
                    <div className="w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-[#fff8f7]" />
                  </div>
                  {/* Floating Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#06102b]/90 backdrop-blur-md text-[#ffddb4] text-[11px] font-bold tracking-widest uppercase rounded-full shadow-md">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        stars
                      </span>
                      Staff Pick
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-md text-[#06102b] text-[11px] font-semibold rounded-full shadow-md">
                      <span className="material-symbols-outlined text-[14px]">headphones</span>
                      {story.audioNarration?.durationMinutes || 28}m Audio
                    </span>
                  </div>

                  {/* Bottom Glass Scrim */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#06102b] via-[#06102b]/70 to-transparent flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="material-symbols-outlined text-[16px] text-[#feb956]">verified</span>
                      <span>Verified Prague Archive Master</span>
                    </div>
                    <span className="text-[11px] tracking-wider uppercase font-mono opacity-80">
                      {story.editionFolio || 'Folio Ed. #1402'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Audio Preview Player Capsule */}
            <div className="w-full mt-4 bg-[#ffe9e7] p-3 rounded-xl flex items-center justify-between gap-3 shadow-xs border border-[#c6c6ce]/30">
              <button
                onClick={() => onPlayAudio(story)}
                className="w-10 h-10 rounded-full bg-[#06102b] text-white flex items-center justify-center shrink-0 hover:bg-[#1c2541] transition-transform active:scale-95 shadow"
                title="Play Audio Chapter Preview"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isAudioPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#06102b] font-bold truncate">Audio Chapter Preview</p>
                <p className="text-xs text-[#45464d] truncate">
                  Voice: {story.audioNarration?.narrator || 'Stephen Fry'} • High Master Audio
                </p>
              </div>
              <div className="flex items-center gap-1 pr-2">
                <span className={`w-1 h-3 bg-[#feb956] rounded-full ${isAudioPlaying ? 'animate-pulse' : ''}`} />
                <span className={`w-1 h-5 bg-[#feb956] rounded-full ${isAudioPlaying ? 'animate-pulse delay-75' : ''}`} />
                <span className={`w-1 h-2 bg-[#feb956] rounded-full ${isAudioPlaying ? 'animate-pulse delay-150' : ''}`} />
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols) - Story Editorial Dossier */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Category Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#ffe1df] text-[#45464d] text-xs uppercase tracking-wider font-bold border border-[#c6c6ce]/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Main Title & Subtitle */}
            <div className="flex flex-col gap-2">
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#06102b] tracking-tight leading-tight">
                {story.title}
              </h1>
              <p className="font-serif text-base sm:text-lg text-[#45464d] italic">
                {story.subtitle || story.synopsis}
              </p>
            </div>

            {/* Author Lockup */}
            <div className="flex items-center gap-3.5 py-1">
              <div className="relative">
                <img
                  alt={story.author}
                  className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-[#be8222]/30"
                  src={
                    story.authorAvatar ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDqXyIK-DNotTvr2GxAYgG2pMMe-jcYLvZDhX6p4pHnQKN7rHIe789zklJkSnkoxzHw0f5D8GOaIG7rJne8HUz4-m8ZFfP1XPFQ_v8m7pqiFiL7_8F_86Ftp25ErfMZIpdP4ALBp2FDyYwJj1kf-BD0-yZATAh4SUn4sXWly7mZLWCUyhZVyKpwxwCiUSdprBrYyQM1NU-EQfOddQvfFiQutGt4aWuzunNI6Ip_Es5VLoOVJ6DiB58z'
                  }
                />
                <span className="absolute -bottom-1 -right-1 bg-[#ffddb4] text-[#06102b] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    history_edu
                  </span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base text-[#06102b] font-bold">{story.author}</span>
                  <span className="material-symbols-outlined text-[16px] text-[#feb956]" title="Verified Master Storyteller">
                    verified
                  </span>
                </div>
                <span className="text-xs text-[#45464d]">
                  {story.authorTitle || 'Archivist in Residence, Charles University Fellowship'}
                </span>
              </div>
            </div>

            {/* Literary Metadata Bento Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#fff0ef] rounded-xl shadow-xs border border-[#c6c6ce]/30">
              <div className="flex flex-col">
                <span className="text-[11px] text-[#45464d] uppercase tracking-wider font-semibold">
                  Reading Time
                </span>
                <span className="font-serif text-lg text-[#06102b] font-bold mt-0.5">
                  {story.readingMinutes} min
                </span>
                <span className="text-xs text-[#5f5e5b] font-mono">
                  {story.wordCount.toLocaleString()} words
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#45464d] uppercase tracking-wider font-semibold">
                  Target Age
                </span>
                <span className="font-serif text-lg text-[#06102b] font-bold mt-0.5">
                  {story.targetAgeLabel.split('•')[0].trim()}
                </span>
                <span className="text-xs text-[#5f5e5b]">Middle Grade / YA</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#45464d] uppercase tracking-wider font-semibold">
                  Lexile Measure
                </span>
                <span className="font-serif text-lg text-[#06102b] font-bold mt-0.5">
                  {story.lexile.split(' ')[0]}
                </span>
                <span className="text-xs text-[#5f5e5b]">Rich Prose</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#45464d] uppercase tracking-wider font-semibold">
                  Anthology Score
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="font-serif text-lg text-[#06102b] font-bold">
                    {story.rating}
                  </span>
                  <span className="material-symbols-outlined text-[#feb956] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                </div>
                <span className="text-xs text-[#5f5e5b] font-mono">
                  {story.reviewCount.toLocaleString()} readers
                </span>
              </div>
            </div>

            {/* Primary Action Buttons Deck */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={scrollToReader}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#06102b] text-white font-sans text-sm font-bold shadow-md hover:bg-[#1c2541] transition-all active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[20px]">auto_stories</span>
                Start Reading Chapter 1
              </button>
              <button
                onClick={() => onPlayAudio(story)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#ffe9e7] hover:bg-[#ffe1df] text-[#06102b] font-sans text-sm font-semibold transition-all border border-[#c6c6ce]/30"
              >
                <span className="material-symbols-outlined text-[20px]">headphones</span>
                Listen Audio Edition
              </button>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => onToggleBookmark(story.id)}
                  className={`p-3 rounded-lg border transition-colors shadow-xs ${
                    isBookmarked
                      ? 'bg-[#be8222] text-white border-[#be8222]'
                      : 'bg-[#fff0ef] hover:bg-[#ffe1df] text-[#45464d] hover:text-[#06102b] border-[#c6c6ce]/30'
                  }`}
                  title={isBookmarked ? 'Bookmarked in Library' : 'Save to Collection'}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {isBookmarked ? 'bookmark_added' : 'bookmark_add'}
                  </span>
                </button>
                <button
                  onClick={handleDownloadOffline}
                  className={`p-3 rounded-lg border transition-colors shadow-xs ${
                    offlineDownloaded
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-[#fff0ef] hover:bg-[#ffe1df] text-[#45464d] hover:text-[#06102b] border-[#c6c6ce]/30'
                  }`}
                  title="Download for Offline Reading"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {offlineDownloaded ? 'download_done' : 'download'}
                  </span>
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-lg bg-[#fff0ef] hover:bg-[#ffe1df] text-[#45464d] hover:text-[#06102b] transition-colors border border-[#c6c6ce]/30 shadow-xs"
                  title="Share Story Link"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {copiedLink ? 'check' : 'share'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Ambient Reader Customizer Dock */}
        <section className="w-full bg-white p-4 sm:p-5 rounded-2xl shadow-md border border-[#c6c6ce]/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#5f5e5b] text-[18px]">palette</span>
              <span className="text-[11px] uppercase tracking-wider text-[#5f5e5b] font-bold">
                Reading Tone
              </span>
            </div>
            {/* Theme switcher */}
            <div className="inline-flex p-1 bg-[#fff0ef] rounded-xl gap-1 border border-[#c6c6ce]/30">
              <button
                onClick={() => setReadingTheme('warm')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  readingTheme === 'warm'
                    ? 'bg-white text-[#06102b] shadow-xs'
                    : 'text-[#45464d] hover:text-[#06102b]'
                }`}
              >
                Warm Parchment
              </button>
              <button
                onClick={() => setReadingTheme('sepia')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  readingTheme === 'sepia'
                    ? 'bg-[#e5e2dd] text-[#1d0f00] shadow-xs'
                    : 'text-[#45464d] hover:text-[#06102b]'
                }`}
              >
                Sepia Ink
              </button>
              <button
                onClick={() => setReadingTheme('midnight')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  readingTheme === 'midnight'
                    ? 'bg-[#06102b] text-white shadow-xs'
                    : 'text-[#45464d] hover:text-[#06102b]'
                }`}
              >
                Midnight Sky
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {/* Font Scale Controls */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-[#45464d] font-bold">
                Scale
              </span>
              <div className="flex items-center bg-[#fff0ef] rounded-lg p-0.5 border border-[#c6c6ce]/30">
                <button
                  onClick={() => setFontScale((s) => Math.max(80, s - 10))}
                  className="w-7 h-7 flex items-center justify-center font-bold text-[#45464d] hover:text-[#06102b] hover:bg-white rounded"
                  title="Smaller font"
                >
                  A-
                </button>
                <span className="px-2 text-xs font-bold text-[#06102b] font-mono">
                  {fontScale}%
                </span>
                <button
                  onClick={() => setFontScale((s) => Math.min(150, s + 10))}
                  className="w-7 h-7 flex items-center justify-center font-bold text-[#45464d] hover:text-[#06102b] hover:bg-white rounded"
                  title="Larger font"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Dyslexic Toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useDyslexicFont}
                onChange={(e) => setUseDyslexicFont(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-8 h-4 bg-[#c6c6ce] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#06102b] relative" />
              <span className="text-xs font-bold text-[#06102b]">OpenDyslexic</span>
            </label>

            {/* Autoscroll Control */}
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#5f5e5b]">speed</span>
              <select
                value={autoScrollSpeed}
                onChange={(e) => setAutoScrollSpeed(e.target.value)}
                className="bg-[#fff0ef] text-[#06102b] text-xs font-medium rounded-lg px-2.5 py-1 outline-none border border-[#c6c6ce]/30 cursor-pointer"
              >
                <option value="off">Auto-Scroll Off</option>
                <option value="gentle">Gentle (10 wpm)</option>
                <option value="narrative">Narrative (25 wpm)</option>
                <option value="scholarly">Scholarly (40 wpm)</option>
              </select>
            </div>
          </div>
        </section>

        {/* 4. Synopsis & Story Anatomy Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Synopsis (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#be8222]" />
              <h2 className="font-serif text-2xl font-bold text-[#06102b]">The Premise</h2>
            </div>
            <div className="font-serif text-base sm:text-lg text-[#06102b]/90 flex flex-col gap-4 bg-[#fff0ef]/60 p-6 sm:p-8 rounded-2xl border border-[#c6c6ce]/20 leading-relaxed shadow-xs">
              <p>
                {story.extendedPremise
                  ? story.extendedPremise.split('\n\n')[0]
                  : story.synopsis}
              </p>
              {story.extendedPremise && story.extendedPremise.includes('\n\n') && (
                <p>{story.extendedPremise.split('\n\n')[1]}</p>
              )}
            </div>

            {/* Themes & Motifs Shelf */}
            <div className="flex flex-col gap-2 pt-2">
              <span className="text-[11px] uppercase tracking-widest text-[#45464d] font-bold">
                Themes &amp; Narrative Motifs
              </span>
              <div className="flex flex-wrap gap-2">
                {story.themes.map((theme) => (
                  <span
                    key={theme}
                    className="px-3 py-1 rounded-lg bg-[#ffe9e7] text-[#06102b] text-xs font-medium border border-[#c6c6ce]/20 shadow-xs"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Suitability Guide Dossier (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4 bg-[#ffe9e7] p-6 rounded-2xl shadow-xs border border-[#c6c6ce]/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#06102b] text-[22px]">family_restroom</span>
              <h3 className="font-serif text-xl font-bold text-[#06102b]">Suitability Guide</h3>
            </div>
            <p className="text-xs text-[#45464d] leading-relaxed">
              Carefully examined by StoryWeave educators for young scholars, classrooms, and family reading hours.
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#feb956] text-[20px] shrink-0 mt-0.5">
                  sentiment_calm
                </span>
                <div>
                  <p className="text-xs font-bold text-[#06102b]">Atmospheric Tension</p>
                  <p className="text-[11px] text-[#45464d]">
                    Mild gothic suspense and shadowy clocktowers, without graphic peril or gore.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#feb956] text-[20px] shrink-0 mt-0.5">
                  extension
                </span>
                <div>
                  <p className="text-xs font-bold text-[#06102b]">Intellectual Puzzles</p>
                  <p className="text-[11px] text-[#45464d]">
                    Plot advancement through cipher-solving, mechanical logic, and astronomy.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#feb956] text-[20px] shrink-0 mt-0.5">
                  spellcheck
                </span>
                <div>
                  <p className="text-xs font-bold text-[#06102b]">Rich Historical Vocabulary</p>
                  <p className="text-[11px] text-[#45464d]">
                    Includes an integrated popover glossary for authentic Renaissance terminology.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-auto pt-3 bg-white/80 p-3 rounded-xl flex items-center justify-between border border-[#c6c6ce]/20">
              <span className="text-[11px] font-bold uppercase text-[#45464d]">
                Audience Verified
              </span>
              <span className="text-xs bg-[#06102b] text-white px-2.5 py-0.5 rounded-full font-bold">
                {story.suitability?.audience || 'Ages 12 to 102'}
              </span>
            </div>
          </div>
        </section>

        {/* 5. Interactive Chapter Index & Live Reader Preview */}
        <section ref={readerRef} className="flex flex-col gap-5 pt-4 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#be8222] font-bold">
                Direct Access Codex
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#06102b]">
                Chapters &amp; Live Reader Preview
              </h2>
            </div>
            <span className="text-xs text-[#45464d] font-medium">
              {unlockedChapters.length} of {story.chapters.length} Chapters Unlocked
            </span>
          </div>

          {/* Chapter Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {story.chapters.map((ch, idx) => {
              const isUnlocked = unlockedChapters.includes(idx) || ch.isUnlocked;
              const isActive = activeChapterIndex === idx;

              return (
                <div
                  key={ch.id}
                  onClick={() => {
                    if (isUnlocked) {
                      setActiveChapterIndex(idx);
                    } else {
                      onOpenFellowshipModal();
                    }
                  }}
                  className={`p-4 rounded-xl shadow-xs transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-white border-[#be8222] ring-2 ring-[#be8222]/20'
                      : 'bg-[#fff0ef] hover:bg-white border-[#c6c6ce]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#be8222] uppercase tracking-widest">
                      Chapter {ch.number}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        isUnlocked
                          ? 'bg-[#ffe9e7] text-[#06102b]'
                          : 'bg-[#ffe1df] text-[#45464d]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        {isUnlocked ? 'lock_open' : 'lock'}
                      </span>
                      {isUnlocked ? 'Unlocked' : 'Member Vault'}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#06102b] mt-2 line-clamp-1">
                    {ch.title}
                  </h4>
                  <p className="text-[11px] text-[#5f5e5b] mt-1 font-mono">
                    {ch.wordCount.toLocaleString()} Words • {ch.readingMinutes} Min Read
                  </p>
                </div>
              );
            })}
          </div>

          {/* Reading Well Container (Interactive Theme Canvas) */}
          <article
            className={`relative w-full max-w-4xl mx-auto p-6 sm:p-12 rounded-2xl shadow-xl transition-all duration-300 border ${
              readingTheme === 'warm'
                ? 'bg-white text-[#410004] border-[#c6c6ce]/30'
                : readingTheme === 'sepia'
                ? 'bg-[#ffe1df] text-[#1d0f00] border-[#feb956]/40'
                : 'bg-[#06102b] text-[#dbe1ff] border-[#1c2541]'
            }`}
          >
            {/* Folio Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-current/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#feb956]">menu_book</span>
                <span className="text-[11px] uppercase tracking-widest font-bold opacity-80">
                  Act I: The Nocturnal Astrolabe
                </span>
              </div>
              <span className="text-[11px] italic opacity-80">
                Folio Page {activeChapterIndex + 1} of 12
              </span>
            </div>

            {/* Chapter Heading */}
            <div className="text-center max-w-lg mx-auto mb-8">
              <span className="text-[11px] uppercase tracking-widest text-[#be8222] font-bold">
                Chapter {activeChapter.number}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                {activeChapter.title}
              </h3>
              <div className="w-12 h-0.5 bg-[#feb956] mx-auto mt-3" />
            </div>

            {/* Story Text Content with Drop Cap */}
            <div
              className={`leading-loose space-y-6 ${
                useDyslexicFont ? 'font-sans' : 'font-serif'
              }`}
              style={{
                fontSize: `${(fontScale / 100) * 1.15}rem`,
                lineHeight: `${(fontScale / 100) * 2.1}rem`,
              }}
            >
              {activeChapter.content.split('\n\n').map((paragraph, pIdx) => {
                if (pIdx === 0) {
                  const firstChar = paragraph.charAt(0);
                  const remaining = paragraph.slice(1);
                  return (
                    <p key={pIdx}>
                      <span className="float-left text-5xl leading-none font-serif font-bold pr-3 pt-1 text-[#06102b]">
                        {firstChar}
                      </span>
                      {remaining}
                    </p>
                  );
                }
                return <p key={pIdx}>{paragraph}</p>;
              })}
            </div>

            {/* Interactive Glossary helper */}
            <div className="mt-8 pt-4 border-t border-current/15 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold opacity-80 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">spellcheck</span>
                Integrated Glossary:
              </span>
              {Object.keys(glossary).map((term) => (
                <button
                  key={term}
                  onClick={() =>
                    setActiveGlossaryWord(activeGlossaryWord === term ? null : term)
                  }
                  className="px-2 py-0.5 rounded bg-black/5 hover:bg-black/10 underline decoration-dotted font-medium transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

            {activeGlossaryWord && (
              <div className="mt-3 p-3 rounded-lg bg-[#ffe9e7] text-[#06102b] text-xs shadow-sm border border-[#c6c6ce]/30 flex items-center justify-between">
                <div>
                  <strong className="capitalize text-sm">{activeGlossaryWord}: </strong>
                  <span>{glossary[activeGlossaryWord]}</span>
                </div>
                <button
                  onClick={() => setActiveGlossaryWord(null)}
                  className="text-xs p-1 hover:text-[#be8222]"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Bottom Fade Out Curtain to Lock Wall */}
            {!unlockedChapters.includes(1) && (
              <div className="relative mt-8 pt-12 text-center bg-gradient-to-t from-current/5 via-current/2 to-transparent rounded-b-xl pb-4">
                <div className="inline-flex flex-col items-center gap-2">
                  <span className="w-10 h-10 rounded-full bg-[#06102b] text-white flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-[18px]">key</span>
                  </span>
                  <p className="font-serif text-lg font-bold">Continue with Chapter 2 &amp; 3</p>
                  <p className="text-xs max-w-md opacity-80">
                    Join the StoryWeave Scholastic Fellowship to unlock the full grimoire, voice dramatization, and printable cartography.
                  </p>
                  <button
                    onClick={() => {
                      onOpenFellowshipModal();
                    }}
                    className="mt-2 px-6 py-2.5 rounded-lg bg-[#be8222] hover:bg-[#feb956] text-white hover:text-[#1d0f00] font-sans text-xs font-bold shadow-md transition-all active:scale-95"
                  >
                    Unlock Complete Tale • Free Trial
                  </button>
                </div>
              </div>
            )}
          </article>
        </section>

        {/* 6. 'Readers Also Wandered Into' Shelf */}
        <section className="flex flex-col gap-5 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#45464d] font-bold">
                Curated Alignments
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#06102b]">
                Readers Also Wandered Into
              </h3>
            </div>
            <button
              onClick={() => onNavigate('genres')}
              className="text-xs font-bold uppercase tracking-wider text-[#06102b] hover:text-[#be8222] transition-colors flex items-center gap-1"
            >
              Explore Full Shelf
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStories.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectStory(rel)}
                className="group bg-[#fff0ef] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col cursor-pointer border border-[#c6c6ce]/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1c2541]">
                  <img
                    alt={rel.title}
                    src={rel.coverImage}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur text-[#06102b] text-[11px] font-bold shadow-xs">
                    95% Match
                  </span>
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-[#06102b]/80 backdrop-blur text-white text-[11px]">
                    {rel.targetAgeLabel.split('•')[0].trim()}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#45464d] font-semibold">
                      {rel.genre}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#06102b] group-hover:text-[#be8222] transition-colors mt-1 line-clamp-1">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[#45464d] line-clamp-2 mt-1">
                      {rel.synopsis}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#c6c6ce]/20">
                    <span className="text-xs text-[#5f5e5b] font-medium">
                      By {rel.author} • {rel.readingMinutes} min
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-[#feb956] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
