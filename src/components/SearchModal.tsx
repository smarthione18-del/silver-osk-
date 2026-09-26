import React, { useState, useEffect, useRef } from 'react';
import { Story, ViewMode } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  onSelectStory: (story: Story) => void;
  onNavigate: (view: ViewMode) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  stories,
  onSelectStory,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredStories = stories.filter((s) => {
    const q = query.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.author.toLowerCase().includes(q) ||
      s.genre.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      s.synopsis.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-[#fff8f7] rounded-2xl shadow-2xl border border-[#c6c6ce]/40 overflow-hidden flex flex-col max-h-[75vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#ffe9e7] bg-white">
          <span className="material-symbols-outlined text-[#be8222] text-[22px]">
            travel_explore
          </span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-[#06102b] placeholder:text-[#45464d]/60 text-base font-medium focus:outline-none"
            placeholder="Search stories, authors, mythical realms, age groups..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={onClose}
            className="px-2 py-1 rounded bg-[#fff0ef] text-xs font-semibold text-[#45464d] hover:bg-[#ffe1df]"
          >
            ESC
          </button>
        </div>

        {/* Quick Category Jump Shortcuts */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#fff0ef] border-b border-[#ffe9e7] text-xs text-[#45464d] overflow-x-auto no-scrollbar">
          <span className="font-bold text-[#06102b] shrink-0">Jump to:</span>
          <button
            onClick={() => {
              onNavigate('discover');
              onClose();
            }}
            className="px-2 py-0.5 rounded bg-white hover:bg-[#ffe1df] shrink-0 font-medium"
          >
            Folio Anthologies
          </button>
          <button
            onClick={() => {
              onNavigate('explore-by-age');
              onClose();
            }}
            className="px-2 py-0.5 rounded bg-white hover:bg-[#ffe1df] shrink-0 font-medium"
          >
            Ages 5–8 Little Dreamers
          </button>
          <button
            onClick={() => {
              onNavigate('genres');
              onClose();
            }}
            className="px-2 py-0.5 rounded bg-white hover:bg-[#ffe1df] shrink-0 font-medium"
          >
            Spatial Audio Stories
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1.5 flex-1 divide-y divide-[#ffe9e7]/50">
          {filteredStories.length === 0 ? (
            <div className="text-center py-12 text-[#45464d]">
              <span className="material-symbols-outlined text-4xl text-[#be8222] mb-2">
                menu_book
              </span>
              <p className="font-serif text-lg font-bold text-[#06102b]">
                No manuscripts match "{query}"
              </p>
              <p className="text-xs text-[#45464d] mt-1">
                Try searching for 'Prague', 'Folklore', 'Fry', 'Hedgehog', or 'Sci-Fi'
              </p>
            </div>
          ) : (
            filteredStories.map((story) => (
              <div
                key={story.id}
                onClick={() => {
                  onSelectStory(story);
                  onClose();
                }}
                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[#ffe9e7] cursor-pointer transition-colors pt-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    alt={story.title}
                    src={story.coverImage}
                    className="w-12 h-12 rounded-lg object-cover ring-1 ring-[#c6c6ce]/40 group-hover:scale-105 transition-transform shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="font-serif font-bold text-sm text-[#06102b] group-hover:text-[#be8222] truncate transition-colors">
                      {story.title}
                    </h5>
                    <p className="text-xs text-[#45464d] truncate">
                      By {story.author} • {story.readingMinutes} min read • {story.lexile}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] px-1.5 py-0.2 bg-[#fff0ef] rounded text-[#06102b] font-medium">
                        {story.genre}
                      </span>
                      <span className="text-[10px] text-[#be8222] font-semibold">
                        ★ {story.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="material-symbols-outlined text-[#45464d] group-hover:translate-x-1 group-hover:text-[#be8222] text-[18px] transition-all">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
