import React, { useState } from 'react';
import { Story, ViewMode } from '../types';
import { SILK_ROAD_ANTHOLOGY, DAILY_EPIGRAPH } from '../data/stories';

interface DiscoverViewProps {
  heroStory: Story;
  trendingStories: Story[];
  onSelectStory: (story: Story) => void;
  onNavigate: (view: ViewMode) => void;
  onSelectAgeBracket: (bracketId: string) => void;
  bookmarkedStoryIds: string[];
  onToggleBookmark: (storyId: string) => void;
  onPlayAudio: (story: Story) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  heroStory,
  trendingStories,
  onSelectStory,
  onNavigate,
  onSelectAgeBracket,
  bookmarkedStoryIds,
  onToggleBookmark,
  onPlayAudio,
}) => {
  const [activeFormatFilter, setActiveFormatFilter] = useState('all');
  const [sortOption, setSortOption] = useState("Curator's Pick");
  const [quoteShared, setQuoteShared] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const alternateQuotes = [
    DAILY_EPIGRAPH,
    {
      quote: "“A reader lives a thousand lives before he dies. The man who never reads lives only one.”",
      author: "George R.R. Martin",
      source: "A Dance with Dragons",
      year: "2011"
    },
    {
      quote: "“Words are, in my not-so-humble opinion, our most inexhaustible source of magic.”",
      author: "Albus Dumbledore",
      source: "King’s Cross Folio",
      year: "1998"
    }
  ];

  const handleShareQuote = () => {
    navigator.clipboard?.writeText(
      `${alternateQuotes[currentQuoteIndex].quote} — ${alternateQuotes[currentQuoteIndex].author}`
    );
    setQuoteShared(true);
    setTimeout(() => setQuoteShared(false), 2500);
  };

  const isHeroBookmarked = bookmarkedStoryIds.includes(heroStory.id);

  // Filter trending based on format filter if selected
  const displayedTrending = trendingStories.filter((s) => {
    if (activeFormatFilter === 'all') return true;
    if (activeFormatFilter === 'illustrated') return s.format === 'illustrated';
    if (activeFormatFilter === 'audio') return s.format === 'audio';
    if (activeFormatFilter === 'quick') return s.readingMinutes <= 8;
    if (activeFormatFilter === 'epic') return s.readingMinutes > 15;
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      {/* 1. Top Reading Pulse Announcement Bar */}
      <div className="w-full bg-[#ffe1df] px-4 sm:px-8 lg:px-12 py-2 flex flex-col sm:flex-row items-center justify-between text-[#45464d] text-xs gap-2 border-b border-[#c6c6ce]/20">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[#be8222] animate-pulse" />
          <span className="font-bold text-[#06102b]">Scholarly Dispatch:</span>
          <span>Autumnal Solstice Anthology now accepting manuscripts until Oct 31</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[#5f5e5b]">
          <span className="flex items-center gap-1 font-mono">
            <span className="material-symbols-outlined text-[15px] text-[#be8222]">headphones</span>
            4,820 listening now
          </span>
          <span className="flex items-center gap-1 font-mono">
            <span className="material-symbols-outlined text-[15px] text-[#be8222]">local_fire_department</span>
            15,400 stories woven this week
          </span>
        </div>
      </div>

      {/* 2. Hero Spotlight: Story of the Day */}
      <section className="relative w-full px-4 sm:px-8 lg:px-12 pt-6 pb-12 max-w-7xl mx-auto">
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#06102b] text-white shadow-2xl border border-[#1c2541]">
          {/* Background Atmospheric Image with Vignette Scrim */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center mix-blend-luminosity opacity-40 transform scale-105 transition-transform duration-1000 ease-out hover:scale-100"
            style={{ backgroundImage: `url('${heroStory.heroBackground || heroStory.coverImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06102b] via-[#06102b]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06102b] via-transparent to-transparent" />

          {/* Hero Content Grid */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-4">
              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-[#be8222] text-white font-bold tracking-wider uppercase flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  Story of the Day
                </span>
                <span className="px-3 py-1 rounded-full bg-[#ffe1df]/25 backdrop-blur-md text-[#dbe1ff] font-medium border border-white/10">
                  {heroStory.genre}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#1c2541] text-[#bdc5e9] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  {heroStory.readingMinutes} min read
                </span>
                <span className="px-3 py-1 rounded-full bg-[#ffdad7]/20 text-[#ffddb4] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">headphones</span>
                  Narration by Stephen Fry (28 min)
                </span>
              </div>

              {/* Title & Author */}
              <div className="space-y-2 max-w-3xl">
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white leading-tight font-bold tracking-tight">
                  {heroStory.title}
                </h1>
                <p className="font-sans text-base sm:text-lg text-[#bdc5e9] font-medium italic">
                  By {heroStory.author}{' '}
                  <span className="not-italic text-[#c6c6ce] mx-2">•</span>{' '}
                  Illuminated by {heroStory.illustrator}
                </p>
              </div>

              {/* Synopsis */}
              <p className="font-serif text-base sm:text-lg text-[#838cae] max-w-2xl leading-relaxed">
                {heroStory.synopsis}
              </p>

              {/* CTAs Deck */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectStory(heroStory)}
                  className="px-6 py-3 rounded-lg bg-[#be8222] hover:bg-[#feb956] text-white hover:text-[#1d0f00] font-sans text-base font-bold shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">menu_book</span>
                  Begin Reading
                </button>
                <button
                  onClick={() => onPlayAudio(heroStory)}
                  className="px-5 py-3 rounded-lg bg-[#1c2541] hover:bg-white/15 text-[#dbe1ff] hover:text-white font-sans text-sm font-semibold flex items-center gap-2 backdrop-blur-sm transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">play_circle</span>
                  Listen Preview
                </button>
                <button
                  onClick={() => onToggleBookmark(heroStory.id)}
                  className={`p-3 rounded-lg border transition-colors flex items-center justify-center ${
                    isHeroBookmarked
                      ? 'bg-[#be8222] text-white border-[#be8222]'
                      : 'bg-[#1c2541]/70 text-[#838cae] hover:text-white border-white/10'
                  }`}
                  title={isHeroBookmarked ? 'Saved in Library' : 'Save to Library'}
                >
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontVariationSettings: isHeroBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {isHeroBookmarked ? 'bookmark_added' : 'bookmark_add'}
                  </span>
                </button>
                <div className="hidden xl:flex items-center gap-2 pl-4 text-[#838cae] text-xs">
                  <span className="material-symbols-outlined text-[18px] text-[#feb956]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <strong className="text-white font-mono text-sm">{heroStory.rating}</strong>
                  <span>({heroStory.reviewCount.toLocaleString()} readers review)</span>
                </div>
              </div>
            </div>

            {/* Cover Book Mockup Card */}
            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <div
                onClick={() => onSelectStory(heroStory)}
                className="relative group cursor-pointer"
              >
                <div className="w-64 h-96 rounded-lg overflow-hidden shadow-2xl bg-white transform rotate-2 group-hover:rotate-0 transition-transform duration-500 ring-2 ring-[#be8222]/40">
                  <img
                    alt={heroStory.title}
                    src={heroStory.coverImage}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06102b]/95 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-[10px] uppercase tracking-widest text-[#ffddb4] font-mono">
                      {heroStory.editionFolio || 'Folio Edition № 142'}
                    </span>
                    <span className="font-serif text-lg font-bold">{heroStory.author}</span>
                  </div>
                </div>
                <div className="absolute -inset-2 rounded-lg bg-[#be8222]/20 -z-10 blur-sm transform -rotate-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Filter Bar */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-2 max-w-7xl mx-auto">
        <div className="bg-[#fff0ef] rounded-xl p-2.5 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs border border-[#c6c6ce]/30">
          {/* Format Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
            {[
              { id: 'all', label: 'All Formats', icon: '' },
              { id: 'illustrated', label: 'Illustrated Editions', icon: 'palette' },
              { id: 'audio', label: 'Audio Narrated', icon: 'headphones' },
              { id: 'quick', label: 'Quick Reads (< 8m)', icon: 'timer' },
              { id: 'epic', label: 'Longform Epics', icon: 'history_edu' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFormatFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1 ${
                  activeFormatFilter === f.id
                    ? 'bg-[#06102b] text-white shadow-sm'
                    : 'bg-[#ffe9e7] hover:bg-[#ffe1df] text-[#45464d] hover:text-[#06102b]'
                }`}
              >
                {f.icon && <span className="material-symbols-outlined text-[14px]">{f.icon}</span>}
                {f.label}
              </button>
            ))}
          </div>

          {/* Sorting Controls */}
          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
            <span className="text-xs text-[#45464d]">Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-[#ffe9e7] text-xs font-semibold text-[#06102b] py-1.5 px-3 rounded-lg focus:outline-none cursor-pointer border border-[#c6c6ce]/20"
            >
              <option>Curator's Pick</option>
              <option>Most Celebrated</option>
              <option>New Releases</option>
              <option>Highest Audio Quality</option>
            </select>
          </div>
        </div>
      </section>

      {/* 4. Trending Across Realms Grid */}
      <section className="w-full px-4 sm:px-8 lg:px-12 pt-10 pb-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#be8222] font-bold">
              Current Resonances
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#06102b] font-bold">
              Trending Across Realms
            </h2>
          </div>
          <button
            onClick={() => onNavigate('genres')}
            className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#be8222] hover:underline underline-offset-4"
          >
            Explore full index <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedTrending.map((story) => {
            const isBookmarked = bookmarkedStoryIds.includes(story.id);
            return (
              <article
                key={story.id}
                onClick={() => onSelectStory(story)}
                className="group bg-[#fff0ef] rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer border border-[#c6c6ce]/20"
              >
                {/* Visual Image */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#ffe9e7]">
                  <img
                    alt={story.title}
                    src={story.coverImage}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span className="px-2 py-0.5 rounded-full bg-[#06102b]/80 backdrop-blur-md text-white text-[10px] font-semibold">
                      {story.genre}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/90 text-[#06102b] text-[10px] font-semibold">
                      {story.targetAgeLabel.split('•')[0].trim()}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(story.id);
                    }}
                    className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
                      isBookmarked
                        ? 'bg-[#be8222] text-white'
                        : 'bg-white/80 text-[#06102b] hover:bg-white'
                    }`}
                    title="Bookmark Story"
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {isBookmarked ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3 bg-[#fff0ef]">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-[#5f5e5b]">
                      <span className="flex items-center gap-1 font-mono">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {story.readingMinutes} min
                      </span>
                      <span className="flex items-center gap-1 text-[#be8222] font-mono font-bold">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        {story.rating}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#06102b] group-hover:text-[#be8222] transition-colors line-clamp-1">
                      {story.title}
                    </h3>
                    <p className="text-xs text-[#5f5e5b] line-clamp-2 leading-relaxed">
                      {story.synopsis}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#c6c6ce]/20 text-xs text-[#45464d] font-medium">
                    <span>By {story.author}</span>
                    <span className="material-symbols-outlined text-[16px] text-[#76767e] group-hover:translate-x-1 transition-transform">
                      east
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. Generational Archways (Stories Tuned to Every Chapter of Life) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <span className="text-[11px] uppercase tracking-widest text-[#be8222] font-bold">
            Generational Archways
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#06102b] font-bold">
            Stories Tuned to Every Chapter of Life
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Early Wonders */}
          <div
            onClick={() => onSelectAgeBracket('tiny-tales')}
            className="relative h-44 rounded-xl overflow-hidden group shadow-sm hover:shadow-xl transition-all p-4 flex flex-col justify-between text-white cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCk-Okw3eVdVMTNjLLf8znSLMRcRk1YH5UeugqmBNrDCoiIUP6gmgrqHVz2kewHh50lekcyC63GxCFYtd_klOQCwY6kaqdQjJ-cbR-tOjJqz6giev6DZldYIehibwyIe7Si2eYeNQmc4-1Pvpw22TVmRLQGzwnyGswF4ZsHvcbPAaNLim__CLHTfsCJKl3L3taQGt1yDysSfkmi7FA6y7kMjwWX224koXjAgWQDRcNiZ5Om2-aYofO6')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06102b]/95 via-[#06102b]/50 to-transparent" />
            <span className="relative z-10 px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm text-[#ffddb4] text-[11px] font-bold self-start">
              3 - 6 Years
            </span>
            <div className="relative z-10">
              <h3 className="font-serif text-lg font-bold">Early Wonders</h3>
              <p className="text-xs text-[#bdc5e9] line-clamp-1">Bedtime rhymes, fable animals &amp; picture books</p>
            </div>
          </div>

          {/* Adventurers */}
          <div
            onClick={() => onSelectAgeBracket('junior-adventurers')}
            className="relative h-44 rounded-xl overflow-hidden group shadow-sm hover:shadow-xl transition-all p-4 flex flex-col justify-between text-white cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDk4DrGXR8qbZvpZBiINWuZmv9897A_bMlxqEE8QB-ZkBiNxZPll5ry_g1XPDuZzkC7U7i5CjZKhaYKcBMc6Di6XaCjFXD0HUlAg_JRvV9BWTQeroIeHPGKoPRIqCMMUdJiroc18KB_OHa49eOQ5Spg8AzVMhvt6c2ikdu98y9TV5KaaE13bOZn7iZqp4xC67UmCcKwCHjrIQsUFK70ErwWyDuX4aJ1mCPUdO7QQvpujmIvs-KiX8Wb')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06102b]/95 via-[#06102b]/50 to-transparent" />
            <span className="relative z-10 px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm text-[#ffddb4] text-[11px] font-bold self-start">
              7 - 12 Years
            </span>
            <div className="relative z-10">
              <h3 className="font-serif text-lg font-bold">Adventurers</h3>
              <p className="text-xs text-[#bdc5e9] line-clamp-1">Hidden realms, puzzles &amp; courageous companions</p>
            </div>
          </div>

          {/* Young Adult */}
          <div
            onClick={() => onSelectAgeBracket('young-adult')}
            className="relative h-44 rounded-xl overflow-hidden group shadow-sm hover:shadow-xl transition-all p-4 flex flex-col justify-between text-white cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPjX6MdaOkHtbWpaj9GgpDfr8m57zHwNVn7d1_rjpjyuE_Plc_vsQrO8fZhYAtL0gGqYFf8eDkb7QGSDGoV96Wv4e2fh7uMyVwRmfmibv73iDEN5eW0LjlecBojzAy-aG0_kQiaKE-dCcJ7oSVqYT4AYwi-lV0P2O-l_zgBP9XTDpXupwWWkxP4F9XuDGdw4s7vLpHCBk9RIBC4snZlkBueuOo0jgeRlk6ELc8_CI-A8ryiKkIdxt0')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06102b]/95 via-[#06102b]/50 to-transparent" />
            <span className="relative z-10 px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm text-[#ffddb4] text-[11px] font-bold self-start">
              13 - 17 Years
            </span>
            <div className="relative z-10">
              <h3 className="font-serif text-lg font-bold">Young Adult</h3>
              <p className="text-xs text-[#bdc5e9] line-clamp-1">Dystopian sagas, mythic identity &amp; first epics</p>
            </div>
          </div>

          {/* Adult & Literary */}
          <div
            onClick={() => onSelectAgeBracket('adult-timeless')}
            className="relative h-44 rounded-xl overflow-hidden group shadow-sm hover:shadow-xl transition-all p-4 flex flex-col justify-between text-white cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATvOEVMR4KGGqXyMlPXlUPIFRD5ZTjRakFRLgYFhqcP9FNcxPPIoA23q9DPrwP70iqUrFyO0TBhw-VHEWQ3UBbT4R09POHaCmmQgBJlTxqMpTQX5V6sPhhE2o8mxBizTjUc8CMKLHFrPiprNxgoBDAdwrbrdTs6KIvSEW5NcfltuU88PEc7bpHuGWj7LX4hkOoabq04VjL7uhJxHhiS3quh0LjIuzazy9pGwehazefV34Dr2NDoJyI')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06102b]/95 via-[#06102b]/50 to-transparent" />
            <span className="relative z-10 px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm text-[#ffddb4] text-[11px] font-bold self-start">
              18+ Years
            </span>
            <div className="relative z-10">
              <h3 className="font-serif text-lg font-bold">Adult &amp; Literary</h3>
              <p className="text-xs text-[#bdc5e9] line-clamp-1">Dense prose, philosophical speculative fiction &amp; poetry</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Staff Curations & Silk Road Anthology Spotlight */}
      <section className="w-full px-4 sm:px-8 lg:px-12 py-10 max-w-7xl mx-auto">
        <div className="bg-[#ffe9e7] rounded-2xl p-6 sm:p-10 shadow-md border border-[#c6c6ce]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Feature Graphic & Salon Quote */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-lg bg-[#ffdad7]">
                <img
                  alt={SILK_ROAD_ANTHOLOGY.title}
                  src={SILK_ROAD_ANTHOLOGY.image}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-[#06102b]/90 backdrop-blur-md px-4 py-2 rounded-lg text-white">
                  <span className="text-[10px] text-[#ffddb4] uppercase font-bold tracking-wider">
                    {SILK_ROAD_ANTHOLOGY.badge}
                  </span>
                  <p className="font-serif text-base font-bold">{SILK_ROAD_ANTHOLOGY.volume}</p>
                </div>
              </div>

              {/* Reader Salon Quote Box */}
              <div className="bg-white p-4 rounded-xl shadow-xs space-y-2 border border-[#c6c6ce]/20">
                <div className="flex items-center gap-1.5 text-[#be8222] text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">forum</span>
                  <span>Salon Discussion Spotlight</span>
                </div>
                <p className="text-xs text-[#45464d] italic leading-relaxed">
                  {SILK_ROAD_ANTHOLOGY.quote.text}
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#5f5e5b] pt-1 border-t border-[#ffe9e7]">
                  <span>{SILK_ROAD_ANTHOLOGY.quote.author} ({SILK_ROAD_ANTHOLOGY.quote.role})</span>
                  <span className="font-bold text-[#06102b]">
                    {SILK_ROAD_ANTHOLOGY.quote.annotations} Annotations
                  </span>
                </div>
              </div>
            </div>

            {/* Chapters & Details */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-[#1c2541] text-white text-xs font-semibold">
                    Curated Collection
                  </span>
                  <span className="text-xs text-[#5f5e5b]">{SILK_ROAD_ANTHOLOGY.updated}</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#06102b] font-bold">
                  {SILK_ROAD_ANTHOLOGY.title}
                </h2>
                <p className="font-serif text-sm text-[#45464d] leading-relaxed">
                  {SILK_ROAD_ANTHOLOGY.description}
                </p>
              </div>

              {/* Chapter list */}
              <div className="space-y-2">
                {SILK_ROAD_ANTHOLOGY.chapters.map((ch, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onPlayAudio(heroStory);
                    }}
                    className="bg-[#fff0ef] hover:bg-white p-3 rounded-xl flex items-center justify-between transition-colors group cursor-pointer border border-[#c6c6ce]/20"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-base font-bold text-[#76767e] group-hover:text-[#be8222] w-6 text-center">
                        {ch.roman}
                      </span>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#06102b] group-hover:text-[#be8222] transition-colors">
                          {ch.title}
                        </h4>
                        <p className="text-[11px] text-[#5f5e5b]">{ch.subtitle}</p>
                      </div>
                    </div>
                    <button
                      className="p-1.5 text-[#45464d] group-hover:text-[#be8222] transition-colors"
                      title="Play Chapter Audio"
                    >
                      <span className="material-symbols-outlined text-[22px]">play_circle</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectStory(heroStory)}
                  className="px-5 py-2.5 bg-[#06102b] text-white rounded-lg text-sm font-semibold hover:bg-[#1c2541] transition-colors shadow-sm"
                >
                  Open Full Anthology
                </button>
                <button
                  onClick={() => alert("You are now following 'Folktales of the Silk Road' anthology updates.")}
                  className="px-5 py-2.5 bg-white text-[#45464d] hover:text-[#06102b] rounded-lg text-sm font-semibold transition-colors border border-[#c6c6ce]/40"
                >
                  Follow Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Epigraph of the Day & Live Reading Streak Band */}
      <section className="w-full px-4 sm:px-8 lg:px-12 pb-14 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#fff0ef] rounded-2xl p-6 sm:p-8 shadow-xs border border-[#c6c6ce]/30">
          {/* Daily Quote Section */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4 border-b lg:border-b-0 lg:border-r border-[#ffe1df] pb-6 lg:pb-0 lg:pr-8">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#be8222] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">format_quote</span>
                Epigraph of the Day
              </span>
              <blockquote className="font-serif text-lg sm:text-xl text-[#06102b] italic leading-relaxed">
                {alternateQuotes[currentQuoteIndex].quote}
              </blockquote>
              <p className="text-xs text-[#45464d] font-medium pt-1">
                — {alternateQuotes[currentQuoteIndex].author} ({alternateQuotes[currentQuoteIndex].year})
              </p>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={handleShareQuote}
                className="text-xs text-[#be8222] font-bold flex items-center gap-1 hover:underline"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {quoteShared ? 'check' : 'share'}
                </span>
                {quoteShared ? 'Copied to Study' : 'Share Excerpt'}
              </button>
              <button
                onClick={() =>
                  setCurrentQuoteIndex((prev) => (prev + 1) % alternateQuotes.length)
                }
                className="text-xs text-[#5f5e5b] hover:text-[#06102b] flex items-center gap-1 font-medium"
              >
                <span className="material-symbols-outlined text-[16px]">history</span>
                Cycle Previous Quotes
              </button>
            </div>
          </div>

          {/* User Reading Habit & Live Community Meter */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider text-[#5f5e5b] font-bold">
                  Your Reading Habit
                </span>
                <span className="px-2.5 py-0.5 bg-[#ffdad7] rounded-full text-[#06102b] text-[11px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#be8222]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    local_fire_department
                  </span>
                  7 Day Streak
                </span>
              </div>

              {/* Day Indicators */}
              <div className="flex items-center justify-between gap-1 pt-1 pb-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <div key={d} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-[#5f5e5b]">{d}</span>
                    <span className="w-8 h-8 rounded-full bg-[#06102b] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      ✓
                    </span>
                  </div>
                ))}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-[#06102b] font-bold">Today</span>
                  <span className="w-8 h-8 rounded-full bg-[#be8222] text-white flex items-center justify-center text-[11px] font-bold animate-pulse shadow-sm">
                    14m
                  </span>
                </div>
              </div>
            </div>

            {/* Global Reading Guild Activity Meter */}
            <div className="bg-[#ffe9e7] p-3 rounded-xl flex items-center justify-between border border-[#c6c6ce]/20">
              <div className="flex items-center gap-3">
                <svg className="w-10 h-10 text-[#be8222]" viewBox="0 0 36 36">
                  <path
                    className="text-[#ffdad7]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-[#be8222]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="82, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <div>
                  <p className="text-xs text-[#06102b] font-bold">Community Reading Guild</p>
                  <p className="text-[11px] text-[#5f5e5b]">82% of weekly collective goal met</p>
                </div>
              </div>
              <span className="font-serif font-bold text-sm text-[#06102b]">15,400 wove</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
