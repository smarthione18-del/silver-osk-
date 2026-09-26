import React, { useState, useMemo } from 'react';
import { Story, GenreCategory } from '../types';
import { GENRE_CATEGORIES } from '../data/stories';

interface GenresViewProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
  bookmarkedStoryIds: string[];
  onToggleBookmark: (storyId: string) => void;
  onPlayAudio: (story: Story) => void;
}

export const GenresView: React.FC<GenresViewProps> = ({
  stories,
  onSelectStory,
  bookmarkedStoryIds,
  onToggleBookmark,
  onPlayAudio,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFormat, setActiveFormat] = useState<'all' | 'text' | 'illustrated' | 'audio' | 'cyoa'>('all');
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [activeDuration, setActiveDuration] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'celebrated' | 'newest' | 'trending' | 'shortest'>('celebrated');
  const [selectedGenreId, setSelectedGenreId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAuditionPlaying, setIsAuditionPlaying] = useState(false);

  // Audio showcase story: The Weaver of Solitude
  const weaverStory = stories.find((s) => s.id === 'weaver-of-solitude') || stories[0];

  // Filter and sort stories
  const filteredStories = useMemo(() => {
    let result = stories.filter((s) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          s.title.toLowerCase().includes(q) ||
          s.author.toLowerCase().includes(q) ||
          s.genre.toLowerCase().includes(q) ||
          s.synopsis.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Genre Bento Filter
      if (selectedGenreId) {
        if (selectedGenreId === 'folklore' && !s.genre.toLowerCase().includes('folk')) return false;
        if (selectedGenreId === 'cozy-whimsy' && !s.genre.toLowerCase().includes('cozy')) return false;
        if (selectedGenreId === 'scifi' && !s.genre.toLowerCase().includes('sci-fi')) return false;
        if (selectedGenreId === 'mystery' && !s.genre.toLowerCase().includes('myster')) return false;
        if (selectedGenreId === 'historical' && !s.genre.toLowerCase().includes('histor')) return false;
        if (selectedGenreId === 'micro' && !s.genre.toLowerCase().includes('micro')) return false;
        if (selectedGenreId === 'bedtime' && !s.genre.toLowerCase().includes('bedtime')) return false;
      }

      // Format
      if (activeFormat !== 'all' && s.format !== activeFormat) return false;

      // Mood
      if (activeMood) {
        const hasMoodTag = s.tags.some((t) => t.toLowerCase().includes(activeMood.toLowerCase()));
        const hasTheme = s.themes.some((t) => t.toLowerCase().includes(activeMood.toLowerCase()));
        if (!hasMoodTag && !hasTheme) return false;
      }

      // Duration
      if (activeDuration) {
        if (activeDuration === '5' && s.readingMinutes > 5) return false;
        if (activeDuration === '15' && (s.readingMinutes <= 5 || s.readingMinutes > 15)) return false;
        if (activeDuration === '30' && (s.readingMinutes <= 15 || s.readingMinutes > 30)) return false;
        if (activeDuration === 'epic' && s.readingMinutes <= 30) return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'celebrated') return b.rating - a.rating;
      if (sortBy === 'shortest') return a.readingMinutes - b.readingMinutes;
      if (sortBy === 'trending') return b.reviewCount - a.reviewCount;
      return b.wordCount - a.wordCount;
    });

    return result;
  }, [stories, searchQuery, selectedGenreId, activeFormat, activeMood, activeDuration, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGenreId(null);
    setActiveFormat('all');
    setActiveMood(null);
    setActiveDuration(null);
    setSortBy('celebrated');
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Background Ambient Blur */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#ffe9e7]/60 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-[#ffddb4]/20 blur-3xl pointer-events-none -z-10" />

      {/* 1. Atmospheric Editorial Introduction */}
      <section className="relative px-4 sm:px-8 lg:px-12 py-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[#be8222]">
                <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                <span className="text-[11px] uppercase tracking-widest font-bold">
                  Anthology Taxonomy &amp; Index
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl text-[#06102b] font-bold tracking-tight">
                Venture into Endless Realms
              </h1>
              <p className="font-serif text-base text-[#45464d] max-w-2xl leading-relaxed">
                From whispering hearthside mythologies to pulse-lit cybernetic chronicles. Filter through curated cadences, tactile illustrations, and voice-carved soundscapes.
              </p>
            </div>

            {/* Quick Search Bar */}
            <div className="w-full lg:w-96 flex flex-col gap-1.5">
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#45464d] text-[20px]">
                  travel_explore
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter realms, myths, archetypes..."
                  className="w-full bg-white text-[#06102b] pl-10 pr-20 py-2.5 rounded-xl shadow-xs border border-[#c6c6ce]/30 focus:outline-none focus:ring-1 focus:ring-[#be8222] text-sm"
                />
                <span className="absolute right-2 px-1.5 py-0.5 bg-[#ffe1df] text-[#45464d] text-[11px] font-bold rounded">
                  Ctrl /
                </span>
              </div>
              <div className="flex items-center justify-between px-1 text-xs text-[#45464d]">
                <span>1,184 Manuscripts cataloged</span>
                <span className="text-[#be8222] font-semibold">Updated 3h ago</span>
              </div>
            </div>
          </div>

          {/* Bento Grid of Key Genres */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 pt-4">
            {GENRE_CATEGORIES.map((cat, idx) => {
              const isSelected = selectedGenreId === cat.id;
              // First 3 span 4 cols, next 4 span 3 cols
              const spanClass = idx < 3 ? 'lg:col-span-4' : 'lg:col-span-3';

              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedGenreId(isSelected ? null : cat.id)}
                  className={`group ${spanClass} p-4 rounded-xl shadow-xs transition-all flex flex-col justify-between relative overflow-hidden cursor-pointer border ${
                    isSelected
                      ? 'bg-[#1c2541] text-white border-[#feb956]/50 shadow-md ring-2 ring-[#feb956]/30'
                      : 'bg-[#fff0ef] hover:bg-[#ffe9e7] text-[#06102b] border-[#c6c6ce]/30'
                  }`}
                  style={{ minHeight: idx < 3 ? '160px' : '140px' }}
                >
                  <div className="flex items-start justify-between relative z-10">
                    <span
                      className={`p-2 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-white/10 text-[#feb956]' : 'bg-white text-[#06102b]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">{cat.icon}</span>
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[11px] rounded-full font-mono ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-white/80 text-[#45464d]'
                      }`}
                    >
                      {cat.storyCount} stories
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-col gap-0.5 mt-3">
                    <h2
                      className={`font-serif text-base sm:text-lg font-bold transition-colors ${
                        isSelected ? 'text-[#feb956]' : 'text-[#06102b] group-hover:text-[#be8222]'
                      }`}
                    >
                      {cat.title}
                    </h2>
                    <p
                      className={`text-xs line-clamp-1 ${
                        isSelected ? 'text-[#dbe1ff]' : 'text-[#45464d]'
                      }`}
                    >
                      {cat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Faceted Filter & Sort Workbench */}
      <section className="px-4 sm:px-8 lg:px-12 py-4 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6 border border-[#c6c6ce]/30">
          {/* Row 1: Narrative Format & Sorting */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2 border-b border-[#ffe9e7]">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-wider text-[#45464d] font-bold">
                Narrative Format
              </label>
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'All Formats', icon: '' },
                  { id: 'text', label: 'Text Only', icon: 'notes' },
                  { id: 'illustrated', label: 'Richly Illustrated', icon: 'palette' },
                  { id: 'audio', label: 'Audio Narrated', icon: 'graphic_eq' },
                  { id: 'cyoa', label: 'Choose-Your-Own-Path', icon: 'fork_right' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFormat(f.id as any)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 border ${
                      activeFormat === f.id
                        ? 'bg-[#06102b] text-white border-[#06102b] shadow-xs'
                        : 'bg-[#fff0ef] hover:bg-[#ffe9e7] text-[#45464d] border-[#c6c6ce]/30'
                    }`}
                  >
                    {f.icon && <span className="material-symbols-outlined text-[15px]">{f.icon}</span>}
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Select & Reset */}
            <div className="flex items-center gap-3 self-start xl:self-end">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#45464d] font-bold">
                  Sort Anthology By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#fff0ef] text-[#06102b] text-xs font-semibold px-3 py-2 rounded-lg border border-[#c6c6ce]/30 cursor-pointer focus:outline-none"
                >
                  <option value="celebrated">Most Celebrated (Rating)</option>
                  <option value="newest">Newly Weaved (Recent)</option>
                  <option value="trending">Trending This Month</option>
                  <option value="shortest">Shortest Read First</option>
                </select>
              </div>

              <button
                onClick={handleResetFilters}
                className="mt-5 px-3 py-2 bg-[#ffe9e7] text-[#06102b] hover:bg-[#ffe1df] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 border border-[#c6c6ce]/30"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                Reset
              </button>
            </div>
          </div>

          {/* Row 2: Emotional Cadence & Reading Duration */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Mood Badges */}
            <div className="lg:col-span-7 flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-wider text-[#45464d] font-bold">
                Emotional Cadence &amp; Mood
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'heartwarming', label: '☀️ Heartwarming' },
                  { id: 'dark', label: '🌑 Dark & Suspenseful' },
                  { id: 'philosophical', label: '🌿 Philosophical' },
                  { id: 'lighthearted', label: '✨ Lighthearted' },
                  { id: 'poetic', label: '🪶 Poetic' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveMood(activeMood === m.id ? null : m.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors border ${
                      activeMood === m.id
                        ? 'bg-[#be8222] text-white border-[#be8222] shadow-xs'
                        : 'bg-[#fff0ef] hover:bg-[#ffe9e7] text-[#45464d] border-[#c6c6ce]/30'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reading Duration Presets */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] uppercase tracking-wider text-[#45464d] font-bold">
                  Reading Duration
                </label>
                <span className="text-xs font-mono font-bold text-[#be8222]">
                  {activeDuration ? (activeDuration === '5' ? '< 5m' : activeDuration === '15' ? '5–15m' : activeDuration === '30' ? '15–30m' : '30m+ Epic') : 'Any Duration'}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: '5', label: '< 5m' },
                  { id: '15', label: '5–15m' },
                  { id: '30', label: '15–30m' },
                  { id: 'epic', label: '30m+ Epic' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setActiveDuration(activeDuration === d.id ? null : d.id)}
                    className={`py-1.5 rounded-lg text-xs font-semibold text-center transition-colors border ${
                      activeDuration === d.id
                        ? 'bg-[#06102b] text-white border-[#06102b]'
                        : 'bg-[#fff0ef] hover:bg-[#ffe9e7] text-[#06102b] border-[#c6c6ce]/30'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Spatial Audio Feature Spotlight */}
      <section className="px-4 sm:px-8 lg:px-12 py-8 max-w-7xl mx-auto w-full">
        <div className="rounded-2xl bg-[#06102b] text-white overflow-hidden shadow-2xl relative border border-[#1c2541]">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#be8222]/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1c2541] text-[#ffddb4] rounded-full self-start">
                <span className="material-symbols-outlined text-[16px]">headphones</span>
                <span className="text-[11px] tracking-wider uppercase font-bold">
                  Immersive Format Feature
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold leading-tight">
                Immersive Audio Stories
              </h2>
              <p className="font-serif text-sm sm:text-base text-[#bdc5e9] max-w-xl leading-relaxed">
                Close your eyes and sink into bespoke spatial voice recordings. Featuring live harp accompaniments, dynamic binaural campfire rustles, and seamless sleep-timer drift.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-3 max-w-lg text-xs">
                <div className="flex flex-col gap-1">
                  <span className="material-symbols-outlined text-[#feb956] text-[24px]">surround_sound</span>
                  <span className="font-bold text-white">Spatial Audio</span>
                  <span className="text-[#838cae]">Multi-directional vocal theater</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="material-symbols-outlined text-[#feb956] text-[24px]">waves</span>
                  <span className="font-bold text-white">Ambient Scores</span>
                  <span className="text-[#838cae]">Faint rain &amp; lute backdrops</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="material-symbols-outlined text-[#feb956] text-[24px]">bookmarks</span>
                  <span className="font-bold text-white">Smart Marks</span>
                  <span className="text-[#838cae]">Auto-resumes across devices</span>
                </div>
              </div>
            </div>

            {/* Mini Audio Player Card */}
            <div className="lg:col-span-5 bg-[#1c2541] rounded-2xl p-5 shadow-inner border border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#feb956] animate-pulse" />
                  <span className="text-[11px] uppercase tracking-widest text-[#dbe1ff] font-bold">
                    Now Auditioning
                  </span>
                </div>
                <span className="text-[#838cae] font-mono">Ch. 3 of 8</span>
              </div>

              <div className="flex items-center gap-3.5 py-1">
                <div className="w-13 h-13 rounded-xl bg-[#06102b] flex items-center justify-center shrink-0 border border-[#feb956]/30">
                  <span className="material-symbols-outlined text-[#feb956] text-[26px]">graphic_eq</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-serif text-base font-bold text-white truncate">
                    {weaverStory.title}
                  </h3>
                  <p className="text-xs text-[#dbe1ff] truncate">
                    Narrated by Elizabeth Vance • Cellos &amp; Stellar Static
                  </p>
                </div>
              </div>

              {/* Waveform graphic */}
              <div className="w-full h-10 flex items-end gap-1 px-1 py-1 bg-black/40 rounded-lg">
                {[14, 28, 40, 22, 36, 44, 32, 16, 40, 28, 20, 32, 12, 24, 36, 16, 8, 20, 28, 16, 24, 12, 20, 32].map(
                  (h, i) => (
                    <div
                      key={i}
                      className={`w-full rounded-full transition-all duration-300 ${
                        i < 10 ? 'bg-[#feb956]' : 'bg-[#838cae]/40'
                      }`}
                      style={{
                        height: isAuditionPlaying
                          ? `${Math.max(15, (Math.sin(i * 0.5 + Date.now() * 0.002) * 0.5 + 0.5) * 100)}%`
                          : `${h * 2}%`,
                      }}
                    />
                  )
                )}
              </div>

              <div className="flex items-center justify-between text-[#838cae] text-xs font-mono">
                <span>07:42</span>
                <span>18:00</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => alert("Rewound 10 seconds")}
                  className="p-1.5 text-[#dbe1ff] hover:text-white"
                >
                  <span className="material-symbols-outlined text-[20px]">replay_10</span>
                </button>
                <button
                  onClick={() => {
                    setIsAuditionPlaying(!isAuditionPlaying);
                    onPlayAudio(weaverStory);
                  }}
                  className="w-11 h-11 rounded-full bg-[#be8222] hover:bg-[#feb956] text-white hover:text-[#1d0f00] flex items-center justify-center transition-transform active:scale-95 shadow-md"
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {isAuditionPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <button
                  onClick={() => alert("Forwarded 30 seconds")}
                  className="p-1.5 text-[#dbe1ff] hover:text-white"
                >
                  <span className="material-symbols-outlined text-[20px]">forward_30</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Curated Selections Stories Grid */}
      <section className="px-4 sm:px-8 lg:px-12 py-8 max-w-7xl mx-auto w-full mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#06102b] font-bold">
              Curated Selections
            </h2>
            <p className="text-xs text-[#45464d] mt-0.5">
              Handcrafted tales fitting your active atmospheric criteria
            </p>
          </div>
          <span className="text-xs text-[#45464d] font-mono">
            Showing {filteredStories.length} of 1,184
          </span>
        </div>

        {/* 3-Column Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => {
            const isBookmarked = bookmarkedStoryIds.includes(story.id);

            return (
              <article
                key={story.id}
                onClick={() => onSelectStory(story)}
                className="group bg-[#fff0ef] hover:bg-white transition-all duration-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl flex flex-col justify-between border border-[#c6c6ce]/30 cursor-pointer"
              >
                {/* Cover graphic */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#1c2541]">
                  <img
                    alt={story.title}
                    src={story.coverImage}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 bg-[#06102b]/85 backdrop-blur-sm text-white text-[10px] rounded uppercase tracking-wider font-bold">
                      {story.tags[0] || story.genre}
                    </span>
                  </div>
                  {story.format === 'audio' && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-white/95 backdrop-blur-sm text-[#be8222] text-[10px] font-bold rounded-full flex items-center gap-1 shadow-xs">
                      <span className="material-symbols-outlined text-[13px]">graphic_eq</span>
                      <span>Audio Included</span>
                    </div>
                  )}
                  {story.format === 'illustrated' && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-white/95 backdrop-blur-sm text-[#06102b] text-[10px] font-bold rounded-full flex items-center gap-1 shadow-xs">
                      <span className="material-symbols-outlined text-[13px]">palette</span>
                      <span>12 Illustrations</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs text-[#45464d]">
                      <span className="flex items-center gap-1 font-mono">
                        <span className="material-symbols-outlined text-[15px]">schedule</span>
                        {story.readingMinutes} min read
                      </span>
                      <span className="flex items-center gap-1 text-[#be8222] font-mono font-bold">
                        <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        {story.rating}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#06102b] group-hover:text-[#be8222] transition-colors line-clamp-1">
                      {story.title}
                    </h3>
                    <p className="text-xs text-[#45464d] line-clamp-2 leading-relaxed">
                      {story.synopsis}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#c6c6ce]/20 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#ffdad7] flex items-center justify-center text-[#06102b] font-bold text-[10px]">
                        {story.author.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="text-[#06102b] font-medium">{story.author}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(story.id);
                      }}
                      className={`p-1.5 rounded transition-colors ${
                        isBookmarked ? 'text-[#be8222]' : 'text-[#76767e] hover:text-[#06102b]'
                      }`}
                      title="Save to Library"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {isBookmarked ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Pagination Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#c6c6ce]/20 mt-6 text-xs text-[#45464d]">
          <span>Page {currentPage} of 198 Anthologies</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-1.5 bg-[#fff0ef] hover:bg-[#ffe9e7] text-[#06102b] font-semibold rounded-lg disabled:opacity-40 transition-colors border border-[#c6c6ce]/30"
            >
              Previous
            </button>
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-8 h-8 rounded-lg text-xs font-bold font-mono transition-colors ${
                  currentPage === num
                    ? 'bg-[#06102b] text-white shadow-xs'
                    : 'bg-[#fff0ef] hover:bg-[#ffe9e7] text-[#06102b]'
                }`}
              >
                {num}
              </button>
            ))}
            <span className="px-1 text-[#76767e]">…</span>
            <button
              onClick={() => setCurrentPage(24)}
              className="w-8 h-8 rounded-lg bg-[#fff0ef] hover:bg-[#ffe9e7] text-[#06102b] text-xs font-bold font-mono"
            >
              24
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(24, p + 1))}
              className="px-3.5 py-1.5 bg-[#fff0ef] hover:bg-[#ffe9e7] text-[#06102b] font-semibold rounded-lg transition-colors border border-[#c6c6ce]/30"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
