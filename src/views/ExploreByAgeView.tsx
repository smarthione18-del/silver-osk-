import React, { useState } from 'react';
import { Story, AgeCategory, ViewMode } from '../types';
import { AGE_CATEGORIES } from '../data/stories';

interface ExploreByAgeViewProps {
  stories: Story[];
  selectedBracketId: string;
  onSelectBracket: (bracketId: string) => void;
  onSelectStory: (story: Story) => void;
  onNavigate: (view: ViewMode) => void;
  onOpenPairModal: () => void;
  bookmarkedStoryIds: string[];
  onToggleBookmark: (storyId: string) => void;
  onPlayAudio: (story: Story) => void;
}

export const ExploreByAgeView: React.FC<ExploreByAgeViewProps> = ({
  stories,
  selectedBracketId,
  onSelectBracket,
  onSelectStory,
  onNavigate,
  onOpenPairModal,
  bookmarkedStoryIds,
  onToggleBookmark,
  onPlayAudio,
}) => {
  const [activeFormatFilter, setActiveFormatFilter] = useState('bedtime');
  const [phonicsLevel, setPhonicsLevel] = useState('Stage 2: Blends & Sight Words');
  const [selectedTheme, setSelectedTheme] = useState('Bedtime Calm');
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');
  const [loggedTonight, setLoggedTonight] = useState(false);

  // Filter stories by current age bracket
  const filteredStories = stories.filter((s) => {
    if (selectedBracketId === 'all') return true;
    if (selectedBracketId === 'little-dreamers') {
      return (
        s.ageBracket === 'little-dreamers' ||
        s.id === 'hedgehog-touch-moon' ||
        s.id === 'barnaby-flying-teapot' ||
        s.id === 'little-river-forgot-flow' ||
        s.id === 'detective-pip-carrot-cake'
      );
    }
    return s.ageBracket === selectedBracketId;
  });

  const activeCategory =
    AGE_CATEGORIES.find((c) => c.id === selectedBracketId) || AGE_CATEGORIES[1];

  const handleLogTonight = () => {
    setLoggedTonight(true);
    setTimeout(() => {
      alert("✨ Bedtime story logged! Tonight's 14-minute reading session recorded in your Family Reader Passport.");
    }, 200);
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Atmospheric Editorial Introduction */}
      <section className="relative px-4 sm:px-8 lg:px-12 py-10 overflow-hidden bg-gradient-to-b from-[#fff0ef] via-[#fff8f7] to-[#fff8f7]">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#ffe1df]/60 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 bottom-0 w-72 h-72 rounded-full bg-[#ffddb4]/20 blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-8 h-[1px] bg-[#1d0f00]" />
              <span className="text-[11px] uppercase tracking-widest text-[#45464d] font-bold">
                Developmental Pathways
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#06102b] tracking-tight font-bold mb-3">
              Stories Crafted for Every Stage of Curiosity
            </h1>
            <p className="font-serif text-base text-[#45464d] leading-relaxed">
              Find age-tailored stories with developmental reading levels, vocabulary notes, and family-friendly guides crafted by master narrators and child literacy educators.
            </p>
          </div>

          {/* Quick Metrics Counter */}
          <div className="bg-[#ffe9e7] p-4 rounded-2xl shadow-xs border border-[#c6c6ce]/30 flex items-center gap-6 shrink-0">
            <div>
              <span className="block font-serif text-2xl font-bold text-[#06102b]">1,420+</span>
              <span className="text-[11px] text-[#45464d]">Archived Tales</span>
            </div>
            <div className="w-px h-10 bg-[#c6c6ce]/40" />
            <div>
              <span className="block font-serif text-2xl font-bold text-[#382200]">5 Tiers</span>
              <span className="text-[11px] text-[#45464d]">Lexile Graded</span>
            </div>
            <div className="w-px h-10 bg-[#c6c6ce]/40" />
            <div>
              <span className="block font-serif text-2xl font-bold text-[#06102b]">100%</span>
              <span className="text-[11px] text-[#45464d]">Ad-Free Prose</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Age Bracket Navigation Tab Bar */}
      <section className="sticky top-20 z-40 bg-[#fff8f7]/95 backdrop-blur-md px-4 sm:px-8 lg:px-12 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-[#c6c6ce]/30">
        <div className="max-w-6xl mx-auto overflow-x-auto no-scrollbar py-1">
          <nav className="flex items-stretch gap-2.5 min-w-max">
            {AGE_CATEGORIES.map((cat) => {
              const isActive = selectedBracketId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectBracket(cat.id)}
                  className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left border ${
                    isActive
                      ? 'bg-[#1c2541] text-white shadow-md border-[#feb956]/40 ring-2 ring-[#feb956]/30'
                      : 'bg-[#fff0ef] text-[#45464d] hover:bg-[#ffe9e7] hover:text-[#06102b] border-[#c6c6ce]/20'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform ${
                      isActive
                        ? 'bg-[#be8222]/30 text-[#feb956] rotate-12'
                        : 'bg-[#ffdad7] text-[#06102b] group-hover:scale-105'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {cat.icon}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-[#06102b]'}`}>
                        {cat.label}
                      </span>
                      {isActive && (
                        <span className="inline-block w-2 h-2 rounded-full bg-[#feb956] animate-pulse" />
                      )}
                    </div>
                    <span className={`text-[11px] ${isActive ? 'text-[#dbe1ff]' : 'text-[#45464d]'}`}>
                      {cat.ageRange} • {cat.subgenre}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Main Content Stage */}
      <main className="px-4 sm:px-8 lg:px-12 py-8 max-w-6xl mx-auto w-full flex flex-col gap-10">
        {/* 3. Curator's Note & Format Quick Filters Bento Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Educator / Parent Note */}
          <div className="lg:col-span-7 bg-[#ffe9e7] p-6 rounded-2xl flex flex-col justify-between shadow-xs border border-[#c6c6ce]/30 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 opacity-10 text-[#06102b] pointer-events-none select-none">
              <span className="material-symbols-outlined text-[160px]">local_library</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#be8222]/20 text-[#1d0f00] text-[11px] font-bold tracking-wider uppercase">
                  Curator &amp; Educator Dispatch
                </span>
                <span className="text-[#45464d] text-xs">• Lexile Band: 190L–520L</span>
              </div>
              <h2 className="font-serif text-2xl text-[#06102b] font-bold mb-2">
                The Flourishing Imagination Window
              </h2>
              <p className="text-sm text-[#45464d] leading-relaxed">
                At ages 5 to 8, imagination leaps into early independent reading. Stories emphasize phonics rhythms, empathy, whimsical problem solving, and colorful illustrated vignettes. Children begin identifying narrative subtext and moral cause-and-effect.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6 pt-3 border-t border-[#c6c6ce]/20 text-xs text-[#06102b]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#be8222] text-[18px]">verified</span>
                <span className="font-semibold">Childhood Literacy Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#be8222] text-[18px]">volume_up</span>
                <span className="font-semibold">Phonemic Audio Enhancements</span>
              </div>
            </div>
          </div>

          {/* Quick Format Filter Pills */}
          <div className="lg:col-span-5 bg-[#fff0ef] p-6 rounded-2xl flex flex-col justify-between shadow-xs border border-[#c6c6ce]/30">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#45464d] font-bold block mb-1">
                Format Adaptations
              </span>
              <p className="text-xs text-[#45464d] mb-4">
                Filter reading encounters based on evening schedules or learning environments:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'bedtime', label: '5-Minute Bedtime', icon: 'bedtime' },
                  { id: 'illustrated', label: 'Illustrated Read-Alongs', icon: 'menu_book' },
                  { id: 'choices', label: 'Interactive Choices', icon: 'touch_app' },
                  { id: 'audio-fx', label: 'Audio with Sound FX', icon: 'graphic_eq' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveFormatFilter(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 border ${
                      activeFormatFilter === item.id
                        ? 'bg-[#06102b] text-white border-[#06102b]'
                        : 'bg-white text-[#45464d] hover:bg-[#ffe1df] hover:text-[#06102b] border-[#c6c6ce]/30'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#be8222]">
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[#45464d] text-xs">
              <span>
                Showing <strong>42 curated titles</strong>
              </span>
              <button
                onClick={() => {
                  setActiveFormatFilter('bedtime');
                  setSelectedTheme('Bedtime Calm');
                }}
                className="text-[#06102b] hover:text-[#be8222] font-semibold flex items-center gap-1 transition-colors"
              >
                Reset Filters
                <span className="material-symbols-outlined text-[16px]">replay</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. Lexile & Phonics Filter Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#c6c6ce]/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            {/* Lexile Scale */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#45464d] font-bold uppercase">Lexile Scale:</span>
              <div className="flex items-center gap-1 bg-[#fff0ef] px-3 py-1 rounded-lg border border-[#c6c6ce]/30 font-mono text-xs">
                <span className="font-bold text-[#06102b]">BR</span>
                <span className="text-[#76767e]">→</span>
                <span className="font-bold text-[#be8222]">340L</span>
                <span className="text-[#76767e]">→</span>
                <span className="text-[#45464d]">600L</span>
              </div>
            </div>

            <div className="h-6 w-px bg-[#c6c6ce]/40 hidden sm:block" />

            {/* Phonics selector */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#45464d] font-bold uppercase">Phonics Level:</span>
              <select
                value={phonicsLevel}
                onChange={(e) => setPhonicsLevel(e.target.value)}
                className="bg-[#fff0ef] text-[#06102b] text-xs font-semibold py-1.5 px-3 rounded-lg focus:outline-none cursor-pointer border border-[#c6c6ce]/30"
              >
                <option>All Stages (Early &amp; Fluent)</option>
                <option>Stage 1: CVC &amp; Short Vowels</option>
                <option>Stage 2: Blends &amp; Sight Words</option>
                <option>Stage 3: Complex Digraphs</option>
              </select>
            </div>

            <div className="h-6 w-px bg-[#c6c6ce]/40 hidden md:block" />

            {/* Thematic Quick Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-[11px] text-[#45464d] font-bold uppercase mr-1">Theme:</span>
              {['Courage', 'Sharing', 'Animals', 'Bedtime Calm'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTheme(t)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedTheme === t
                      ? 'bg-[#ffe1df] text-[#06102b] border border-[#c6c6ce]/30'
                      : 'bg-[#fff0ef] text-[#45464d] hover:bg-[#ffe9e7]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center gap-1 shrink-0 self-end md:self-auto">
            <button
              onClick={() => setViewLayout('grid')}
              className={`p-1.5 rounded-lg border ${
                viewLayout === 'grid'
                  ? 'bg-[#ffe9e7] text-[#06102b] border-[#c6c6ce]/40'
                  : 'text-[#45464d] border-transparent hover:bg-[#fff0ef]'
              }`}
              title="Grid View"
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
            <button
              onClick={() => setViewLayout('list')}
              className={`p-1.5 rounded-lg border ${
                viewLayout === 'list'
                  ? 'bg-[#ffe9e7] text-[#06102b] border-[#c6c6ce]/40'
                  : 'text-[#45464d] border-transparent hover:bg-[#fff0ef]'
              }`}
              title="Compact List"
            >
              <span className="material-symbols-outlined text-[18px]">view_agenda</span>
            </button>
          </div>
        </div>

        {/* 5. Featured Stories Shelf */}
        <section className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#be8222] font-bold">
                Featured Shelf
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#06102b]">
                Treasured Reads for {activeCategory.label} ({activeCategory.ageRange})
              </h3>
            </div>
            <button
              onClick={() => onNavigate('genres')}
              className="text-xs font-bold text-[#06102b] hover:text-[#be8222] flex items-center gap-1 group"
            >
              View Complete Anthology
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>

          {/* 4-Card Bento Grid */}
          <div
            className={`grid gap-5 ${
              viewLayout === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                : 'grid-cols-1'
            }`}
          >
            {filteredStories.slice(0, 4).map((item) => {
              const isBookmarked = bookmarkedStoryIds.includes(item.id);
              return (
                <article
                  key={item.id}
                  onClick={() => onSelectStory(item)}
                  className="group bg-white rounded-2xl p-4 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative border border-[#c6c6ce]/30 cursor-pointer"
                >
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-[#ffe9e7]">
                    <img
                      alt={item.title}
                      src={item.coverImage}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 bg-[#06102b] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                      {item.tags[0] || 'Staff Pick'}
                    </span>
                    <span className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-[#06102b] text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                      <span className="material-symbols-outlined text-[14px]">menu_book</span>
                      {item.lexile}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 mb-1 text-xs">
                      <span className="text-[#be8222] font-semibold">
                        {item.readingMinutes} min read
                      </span>
                      <span className="text-[#c6c6ce]">•</span>
                      <span className="text-[#45464d]">{item.genre}</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#06102b] group-hover:text-[#be8222] transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#5f5e5b] line-clamp-2 mt-1 mb-3 leading-relaxed">
                      {item.synopsis}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#c6c6ce]/20 flex items-center justify-between text-xs">
                    <span className="text-[#45464d] font-medium">By {item.author}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(item.id);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isBookmarked
                          ? 'bg-[#be8222] text-white'
                          : 'bg-[#fff0ef] hover:bg-[#06102b] hover:text-white text-[#06102b]'
                      }`}
                      title="Bookmark"
                    >
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {isBookmarked ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 6. Phonics & Comprehension Companion Deep-Dive */}
        <section className="bg-[#ffe9e7] rounded-2xl p-6 sm:p-8 shadow-xs border border-[#c6c6ce]/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#be8222] font-bold">
                Phonics &amp; Comprehension Companion
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#06102b]">
                What 5-to-8 Readers Master in This Collection
              </h3>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#45464d]">Aligned with</span>
              <span className="px-3 py-1 bg-white rounded-lg text-[#06102b] text-xs font-bold shadow-xs">
                Common Core ELA-K2
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Pillar 1 */}
            <div className="bg-white rounded-xl p-5 flex flex-col justify-between border border-[#c6c6ce]/20 shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#ffe9e7] flex items-center justify-center text-[#06102b] mb-3">
                  <span className="material-symbols-outlined text-[24px]">spellcheck</span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#06102b] mb-1">
                  Rhythmic Phonics &amp; Rhyme
                </h4>
                <p className="text-xs text-[#45464d] leading-relaxed">
                  Predictable cadences train phonemic awareness, allowing children to anticipate ending syllables and expand consonant blend fluency.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#c6c6ce]/20 text-[11px] text-[#be8222] font-bold">
                28 Phonics-Mapped Stories Available
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-xl p-5 flex flex-col justify-between border border-[#c6c6ce]/20 shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#ffe9e7] flex items-center justify-center text-[#06102b] mb-3">
                  <span className="material-symbols-outlined text-[24px]">diversity_1</span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#06102b] mb-1">
                  Empathetic Theory of Mind
                </h4>
                <p className="text-xs text-[#45464d] leading-relaxed">
                  Characters navigating big emotions—shyness, pride, fear of the dark—give early learners words to express their own inner worlds.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#c6c6ce]/20 text-[11px] text-[#be8222] font-bold">
                Included Discussion Questions
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-xl p-5 flex flex-col justify-between border border-[#c6c6ce]/20 shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#ffe9e7] flex items-center justify-center text-[#06102b] mb-3">
                  <span className="material-symbols-outlined text-[24px]">visibility</span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#06102b] mb-1">
                  Visual Literacy Anchors
                </h4>
                <p className="text-xs text-[#45464d] leading-relaxed">
                  Meticulous full-spread illustrations scaffold context clues, empowering readers to decode unknown vocabulary before seeking adult help.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#c6c6ce]/20 text-[11px] text-[#be8222] font-bold">
                Click-to-Define Illustrated Glossary
              </div>
            </div>
          </div>
        </section>

        {/* 7. Family Read-Together Mode Spotlight */}
        <section className="bg-[#06102b] text-white rounded-2xl overflow-hidden shadow-2xl relative border border-[#1c2541]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Text & Feature Highlights */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col gap-4 z-10">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1c2541] w-fit">
                <span className="material-symbols-outlined text-[#ffddb4] text-[16px]">sync_alt</span>
                <span className="text-[11px] text-[#dbe1ff] uppercase tracking-wider font-bold">
                  Dual-Device Feature
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-bold leading-tight">
                Family Read-Together Mode
              </h3>
              <p className="font-serif text-sm sm:text-base text-[#838cae] leading-relaxed">
                Connect your phone or laptop with your child’s bedside tablet. As you turn pages or read aloud, words and rich illustrations gently highlight in sync across both screens in real-time.
              </p>

              {/* Highlights Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#be8222] text-[18px]">
                    check_circle
                  </span>
                  <span>Parent Prompts: In-line questions tailored for bed-talk</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#be8222] text-[18px]">
                    check_circle
                  </span>
                  <span>Karaoke-Style Gentle Syllable Highlighting</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#be8222] text-[18px]">
                    check_circle
                  </span>
                  <span>Ambient Soundtracks &amp; Optional Voice Modulators</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#be8222] text-[18px]">
                    check_circle
                  </span>
                  <span>Night-Warmth Color Calibration (Zero Blue-Light)</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenPairModal}
                  className="bg-[#be8222] hover:bg-[#feb956] text-white hover:text-[#1d0f00] px-6 py-3 rounded-lg text-sm font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">devices</span>
                  Pair a Second Device
                </button>
                <button
                  onClick={() => alert("Simulating 60-Second Demo: Watch bedtime reading synced across rooms with zero lag.")}
                  className="text-[#dbe1ff] hover:text-white text-sm font-semibold transition-colors flex items-center gap-1"
                >
                  Watch 60-Second Demo
                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                </button>
              </div>
            </div>

            {/* Visual Bedside Mockup */}
            <div className="lg:col-span-5 p-6 flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[#1c2541] border border-white/10">
                <img
                  alt="Family Read-Together"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0hPGDrHl08-_jvel5BllpKuM-RL4nsllAbV_mwcwa8Z6J7FX1RbbapgTHX4e1iJAAfZnlTlusImZ8PCnXLWUdQS6uMD2_qWqdjnl9arACvFbjJhygrKyCKbRgElsM7Mc1OPpE19FZ__PI6YEeTXRWlYJGyOIx71jtUyoKOiGQH8u28o7PUkskG3yLCCa_Y2JZCwwoVqVxv9ft55KS5On08_8zPGwBbQW8sBpVDmarkzTIhG2DWEsh"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06102b]/90 via-transparent to-transparent flex flex-col justify-end p-4">
                  <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg flex items-center justify-between text-[#06102b]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-xs font-bold">Living Room Tablet Connected</span>
                    </div>
                    <span className="text-[11px] text-[#45464d] font-mono">Synced • Page 14</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Family Reader Passport Banner */}
        <section className="bg-[#ffe1df] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#c6c6ce]/30 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#be8222] shadow-sm shrink-0">
              <span className="material-symbols-outlined text-[32px]">military_tech</span>
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#06102b]">
                StoryWeave Family Reader Passport
              </h4>
              <p className="text-xs text-[#45464d]">
                Track bedtime streaks, collect digital fable badges, and earn printable fine-press reading certificates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('my-library')}
              className="px-4 py-2.5 rounded-lg bg-white text-[#06102b] text-xs font-bold hover:bg-[#ffe9e7] transition-colors shadow-xs border border-[#c6c6ce]/30"
            >
              View Passport
            </button>
            <button
              onClick={handleLogTonight}
              className="px-4 py-2.5 rounded-lg bg-[#06102b] text-white text-xs font-bold hover:bg-[#1c2541] transition-colors shadow-sm"
            >
              {loggedTonight ? 'Story Logged ✓' : "Log Tonight's Story"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
