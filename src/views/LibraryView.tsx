import React, { useState } from 'react';
import { Story, ViewMode } from '../types';

interface LibraryViewProps {
  stories: Story[];
  bookmarkedStoryIds: string[];
  onToggleBookmark: (storyId: string) => void;
  onSelectStory: (story: Story) => void;
  onNavigate: (view: ViewMode) => void;
  onPlayAudio: (story: Story) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  stories,
  bookmarkedStoryIds,
  onToggleBookmark,
  onSelectStory,
  onNavigate,
  onPlayAudio,
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history' | 'downloads' | 'passport'>('bookmarks');

  // Bookmarked stories
  const bookmarkedStories = stories.filter((s) => bookmarkedStoryIds.includes(s.id));

  return (
    <div className="flex flex-col w-full px-4 sm:px-8 lg:px-12 py-10 max-w-7xl mx-auto">
      {/* Header Profile / Study Desk Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#ffe9e7]">
        <div className="flex items-center gap-4">
          <img
            alt="Scholar Sophia Vane"
            className="w-16 h-16 rounded-full object-cover shadow-md ring-4 ring-[#ffddb4]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaQRmnb6qpkTDdqZNHIN_uCi0MoNAUTc7sxmydQzjsz1K0zCHWsz9RZYikV5cLV8kEcv6iuvFyMv3rKq19ao-jpMs_c6zTVmqoCcKgaryQshpR7RmIgPxoSA6s4CSv58ksaXQVvpM-OqaHLJ7v2MkHDmJVt5MskP-2HTp1Rd9lKBDZLhyGRAWcWfCvBRmT8Sz2eDA-V7840lfZk5_TaOXVJIlA9aIDIWCe-BxVVk1iuBuO-6e7jxXO"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-3xl font-bold text-[#06102b]">Sophia Vane’s Study</h1>
              <span className="px-2 py-0.5 rounded-full bg-[#ffddb4] text-[#1d0f00] text-[10px] font-bold uppercase">
                Scholar Fellow
              </span>
            </div>
            <p className="text-xs text-[#45464d] mt-1">
              Charles University Fellowship • Member since Autumn 2024 • 14 Manuscripts Archived
            </p>
          </div>
        </div>

        {/* Quick Streak Card */}
        <div className="flex items-center gap-4 bg-[#fff0ef] p-3 rounded-xl border border-[#c6c6ce]/30">
          <div className="text-right">
            <span className="text-[11px] text-[#45464d] font-bold uppercase block">Current Habit</span>
            <span className="font-serif font-bold text-lg text-[#06102b]">7 Days Reading</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#be8222] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            14m
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 py-6 overflow-x-auto no-scrollbar">
        {[
          { id: 'bookmarks', label: `Saved Bookmarks (${bookmarkedStories.length})`, icon: 'bookmark' },
          { id: 'history', label: 'Recent Chapter History', icon: 'history' },
          { id: 'downloads', label: 'Offline Manuscripts (3)', icon: 'download_for_offline' },
          { id: 'passport', label: 'Family Reader Passport', icon: 'military_tech' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#06102b] text-white border-[#06102b] shadow-sm'
                : 'bg-[#fff0ef] hover:bg-[#ffe9e7] text-[#45464d] border-[#c6c6ce]/30'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#06102b]">
              Saved Folios &amp; Manuscripts
            </h3>
            <span className="text-xs text-[#45464d]">
              {bookmarkedStories.length} stories marked for study
            </span>
          </div>

          {bookmarkedStories.length === 0 ? (
            <div className="text-center py-16 bg-[#fff0ef] rounded-2xl border border-dashed border-[#c6c6ce]/60 p-8">
              <span className="material-symbols-outlined text-4xl text-[#be8222] mb-2">
                bookmark_border
              </span>
              <p className="font-serif text-lg font-bold text-[#06102b]">Your desk is clear</p>
              <p className="text-xs text-[#45464d] mt-1 max-w-sm mx-auto">
                Explore the Discover or Genres catalog and bookmark stories to save them here for later study.
              </p>
              <button
                onClick={() => onNavigate('discover')}
                className="mt-4 px-5 py-2 rounded-lg bg-[#06102b] text-white text-xs font-bold"
              >
                Explore Discover
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedStories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => onSelectStory(story)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all border border-[#c6c6ce]/30 flex flex-col justify-between cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#1c2541]">
                    <img
                      alt={story.title}
                      src={story.coverImage}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(story.id);
                      }}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 text-[#be8222] hover:bg-white shadow-xs"
                      title="Remove Bookmark"
                    >
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        bookmark
                      </span>
                    </button>
                    <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-[#06102b]/80 text-white text-[10px] font-bold">
                      {story.genre}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#5f5e5b] mb-1">
                        <span>{story.readingMinutes} min read</span>
                        <span className="text-[#be8222] font-bold">★ {story.rating}</span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#06102b] group-hover:text-[#be8222] transition-colors line-clamp-1">
                        {story.title}
                      </h4>
                      <p className="text-xs text-[#45464d] line-clamp-2 mt-1">
                        {story.synopsis}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#ffe9e7] flex items-center justify-between text-xs">
                      <span className="text-[#45464d] font-medium">By {story.author}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlayAudio(story);
                        }}
                        className="p-1 text-[#06102b] hover:text-[#be8222]"
                        title="Listen Audio"
                      >
                        <span className="material-symbols-outlined text-[18px]">play_circle</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* History tab */}
      {activeTab === 'history' && (
        <div className="space-y-4 bg-white p-6 rounded-2xl border border-[#c6c6ce]/30 shadow-xs">
          <h3 className="font-serif text-lg font-bold text-[#06102b]">
            Recent Reading History &amp; Progress
          </h3>
          <div className="divide-y divide-[#ffe9e7]">
            {stories.slice(0, 4).map((story, idx) => (
              <div
                key={story.id}
                onClick={() => onSelectStory(story)}
                className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#fff0ef] p-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#be8222]">
                    {(idx + 1).toString().padStart(2, '0')}.
                  </span>
                  <div>
                    <h5 className="font-serif font-bold text-sm text-[#06102b]">{story.title}</h5>
                    <p className="text-xs text-[#45464d]">
                      Completed Act I: Chapter 1 • {idx === 0 ? 'Just now' : `${idx * 2} days ago`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-[#ffe9e7] h-2 rounded-full overflow-hidden hidden sm:block">
                    <div
                      className="bg-[#be8222] h-full rounded-full"
                      style={{ width: `${100 - idx * 25}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#06102b]">
                    {100 - idx * 25}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Downloads tab */}
      {activeTab === 'downloads' && (
        <div className="space-y-4 bg-white p-6 rounded-2xl border border-[#c6c6ce]/30 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#06102b]">
              Offline Manuscripts Cache
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
              Device Storage: 14.2 MB Cached
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {stories.slice(0, 2).map((story) => (
              <div
                key={story.id}
                onClick={() => onSelectStory(story)}
                className="p-4 rounded-xl bg-[#fff0ef] border border-[#c6c6ce]/20 flex items-center gap-3 cursor-pointer hover:bg-[#ffe9e7] transition-colors"
              >
                <img
                  alt={story.title}
                  src={story.coverImage}
                  className="w-12 h-16 rounded object-cover shadow-xs shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h5 className="font-serif font-bold text-sm text-[#06102b] truncate">
                    {story.title}
                  </h5>
                  <p className="text-xs text-[#45464d] truncate">By {story.author}</p>
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Available Offline
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Passport tab */}
      {activeTab === 'passport' && (
        <div className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#c6c6ce]/30 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ffe9e7]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#be8222] font-bold">
                Scholastic Milestone Log
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#06102b]">
                Family Reader Passport
              </h3>
            </div>
            <button
              onClick={() => alert("Printing Fine-Press Reading Certificate for Sophia Vane...")}
              className="px-4 py-2 bg-[#06102b] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              Print Scholastic Certificate
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#fff0ef] border border-[#c6c6ce]/20 text-center">
              <span className="text-3xl mb-1 block">🏆</span>
              <h5 className="font-serif font-bold text-[#06102b]">Nightly Flame</h5>
              <p className="text-xs text-[#45464d] mt-1">7 Day Bedtime Streak Accomplished</p>
            </div>
            <div className="p-4 rounded-xl bg-[#fff0ef] border border-[#c6c6ce]/20 text-center">
              <span className="text-3xl mb-1 block">📜</span>
              <h5 className="font-serif font-bold text-[#06102b]">Lexile 800+ Pioneer</h5>
              <p className="text-xs text-[#45464d] mt-1">Mastered Rich Historical Prose in Prague Grimoire</p>
            </div>
            <div className="p-4 rounded-xl bg-[#fff0ef] border border-[#c6c6ce]/20 text-center">
              <span className="text-3xl mb-1 block">🌌</span>
              <h5 className="font-serif font-bold text-[#06102b]">Realm Voyager</h5>
              <p className="text-xs text-[#45464d] mt-1">Explored 5 Unique Narrative Realms</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
