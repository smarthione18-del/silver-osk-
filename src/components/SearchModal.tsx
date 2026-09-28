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
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      s.title.toLowerCase().includes(q) ||
      (s.hindiTitle && s.hindiTitle.toLowerCase().includes(q)) ||
      s.author.toLowerCase().includes(q) ||
      (s.authorTitle && s.authorTitle.toLowerCase().includes(q)) ||
      s.genre.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      s.synopsis.toLowerCase().includes(q) ||
      (s.hindiSynopsis && s.hindiSynopsis.toLowerCase().includes(q)) ||
      (s.moral && s.moral.toLowerCase().includes(q)) ||
      (s.hindiMoral && s.hindiMoral.toLowerCase().includes(q)) ||
      (s.targetAgeLabel && s.targetAgeLabel.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-[#fff8f7] dark:bg-slate-900 rounded-2xl shadow-2xl border border-[#c6c6ce]/40 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#ffe9e7] dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-xl">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-[#06102b] dark:text-white placeholder:text-[#45464d]/60 dark:placeholder:text-slate-400 text-base font-medium focus:outline-none"
            placeholder="Search stories, Tenali, Akbar, Krishna, Panchatantra, age group..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-2"
            >
              ✕
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded bg-[#fff0ef] dark:bg-slate-800 text-xs font-semibold text-[#45464d] dark:text-slate-300 hover:bg-[#ffe1df]"
          >
            ESC
          </button>
        </div>

        {/* Quick Category Jump Shortcuts */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#fff0ef] dark:bg-slate-800/60 border-b border-[#ffe9e7] dark:border-slate-800 text-xs text-[#45464d] dark:text-slate-300 overflow-x-auto no-scrollbar">
          <span className="font-bold text-[#06102b] dark:text-white shrink-0">Quick:</span>
          {['Tenali', 'Akbar', 'Shiva', 'Krishna', 'Panchatantra', 'Moral', '3–6', '7–10', '11–14'].map((chip) => (
            <button
              key={chip}
              onClick={() => setQuery(chip)}
              className="px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shrink-0 font-medium text-[11px] transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1.5 flex-1 divide-y divide-[#ffe9e7]/50 dark:divide-slate-800">
          {filteredStories.length === 0 ? (
            <div className="text-center py-12 text-[#45464d] dark:text-slate-400">
              <span className="text-4xl mb-2 block">📖</span>
              <p className="font-serif text-lg font-bold text-[#06102b] dark:text-white">
                No stories match "{query}"
              </p>
              <p className="text-xs text-[#45464d] dark:text-slate-400 mt-1">
                Try searching for 'Tenali', 'Akbar', 'Krishna', 'Shiva', 'Crow', or 'Folklore'
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
                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[#ffe9e7] dark:hover:bg-slate-800 cursor-pointer transition-colors pt-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    alt={story.title}
                    src={story.coverImage}
                    className="w-12 h-12 rounded-lg object-cover ring-1 ring-[#c6c6ce]/40 dark:ring-slate-700 group-hover:scale-105 transition-transform shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="font-serif font-bold text-sm text-[#06102b] dark:text-white group-hover:text-amber-600 truncate transition-colors">
                      {story.hindiTitle ? `${story.hindiTitle} (${story.title})` : story.title}
                    </h5>
                    <p className="text-xs text-[#45464d] dark:text-slate-400 truncate">
                      {story.author} • {story.readingMinutes} min read
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 dark:bg-amber-950/60 rounded text-amber-900 dark:text-amber-300 font-bold">
                        {story.targetAgeLabel.split('•')[0].trim()}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#fff0ef] dark:bg-slate-700 rounded text-slate-700 dark:text-slate-300 font-medium">
                        {story.genre}
                      </span>
                      <span className="text-[10px] text-amber-600 font-bold">
                        ★ {story.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-amber-600 group-hover:translate-x-1 text-base transition-transform font-bold">
                    →
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
