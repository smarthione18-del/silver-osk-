import React, { useState } from 'react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  bookmarkCount: number;
  onOpenSearch: () => void;
  isAmbientMode: boolean;
  onToggleAmbient: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  bookmarkCount,
  onOpenSearch,
  isAmbientMode,
  onToggleAmbient,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#fff8f7]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#1c2541]/5 transition-colors duration-300">
      <div className="h-20 w-full px-4 sm:px-8 lg:px-12 mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => onNavigate('discover')}
          className="flex items-center gap-3 shrink-0 cursor-pointer group"
          role="button"
          tabIndex={0}
        >
          <img
            alt="StoryWeave Brand Logo"
            className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AEtjO1VSvdTRewgs___1wSoWjbr71ValK9el78m6kCSYL-9AmYusBfvd24zQmycAdfu2o1Z6F7NZLzuRKERG-82YQxP9aGaIqdTAzsrBlnGCcNwX4nbU2NVggvCCgSozMUBylS6iK_rBn-VKd209avJk0sYlHDpVebIKitwUidNqsbtWw53czPhX9OBHtb-O8tvPz4vSIscIxOTleUkScLaSZazfQQI9AskZ8Buj2F70AYPNEcakf4Ke5Hae-Qg"
          />
          <div className="flex flex-col">
            <span className="font-serif text-2xl text-[#06102b] font-bold tracking-tight leading-none group-hover:text-[#be8222] transition-colors">
              StoryWeave
            </span>
            <span className="text-[11px] text-[#45464d] tracking-wide mt-1 hidden sm:inline">
              Weaving tales across generations
            </span>
          </div>
        </div>

        {/* Primary Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-[#ffe9e7]/50 rounded-xl border border-[#c6c6ce]/30">
          <button
            onClick={() => onNavigate('discover')}
            className={`font-sans text-[14px] font-semibold px-4 py-2 rounded-lg transition-all ${
              currentView === 'discover'
                ? 'bg-[#1c2541] text-[#ffffff] shadow-sm'
                : 'text-[#45464d] hover:bg-[#ffe1df] hover:text-[#06102b]'
            }`}
          >
            Discover
          </button>
          <button
            onClick={() => onNavigate('explore-by-age')}
            className={`font-sans text-[14px] font-semibold px-4 py-2 rounded-lg transition-all ${
              currentView === 'explore-by-age'
                ? 'bg-[#1c2541] text-[#ffffff] shadow-sm'
                : 'text-[#45464d] hover:bg-[#ffe1df] hover:text-[#06102b]'
            }`}
          >
            Explore by Age
          </button>
          <button
            onClick={() => onNavigate('genres')}
            className={`font-sans text-[14px] font-semibold px-4 py-2 rounded-lg transition-all ${
              currentView === 'genres'
                ? 'bg-[#1c2541] text-[#ffffff] shadow-sm'
                : 'text-[#45464d] hover:bg-[#ffe1df] hover:text-[#06102b]'
            }`}
          >
            Genres &amp; Types
          </button>
          <button
            onClick={() => onNavigate('my-library')}
            className={`font-sans text-[14px] font-semibold px-4 py-2 rounded-lg transition-all ${
              currentView === 'my-library'
                ? 'bg-[#1c2541] text-[#ffffff] shadow-sm'
                : 'text-[#45464d] hover:bg-[#ffe1df] hover:text-[#06102b]'
            }`}
          >
            My Library
          </button>
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="relative hidden xl:flex items-center text-left bg-[#fff0ef] hover:bg-white text-[#45464d] pl-9 pr-12 py-2 rounded-lg w-72 text-sm border border-[#c6c6ce]/30 transition-all shadow-xs"
            title="Search stories, authors, mythical realms"
          >
            <span className="material-symbols-outlined absolute left-2.5 text-[#45464d] text-[18px]">
              search
            </span>
            <span className="truncate">Search stories, authors, realms...</span>
            <span className="absolute right-2 px-1.5 py-0.5 bg-[#ffdad7] text-[#45464d] text-[11px] font-semibold rounded">
              ⌘K
            </span>
          </button>

          {/* Mobile search icon button */}
          <button
            onClick={onOpenSearch}
            className="xl:hidden p-2 text-[#45464d] hover:bg-[#ffe1df] hover:text-[#06102b] rounded-lg transition-colors flex items-center justify-center"
            title="Search"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Ambient Study Mode Button */}
          <button
            onClick={onToggleAmbient}
            className={`p-2 rounded-lg transition-colors flex items-center justify-center relative ${
              isAmbientMode
                ? 'bg-[#ffddb4] text-[#1d0f00] shadow-sm'
                : 'text-[#45464d] hover:bg-[#ffe1df] hover:text-[#06102b]'
            }`}
            title={isAmbientMode ? 'Ambient Study Mode: Active' : 'Switch to Warm Study Atmosphere'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isAmbientMode ? 'candle' : 'auto_stories'}
            </span>
            {isAmbientMode && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#be8222] animate-ping" />
            )}
          </button>

          {/* Saved Bookmarks Pill */}
          <button
            onClick={() => onNavigate('my-library')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fff0ef] hover:bg-[#ffe1df] text-[#06102b] rounded-full transition-colors border border-[#c6c6ce]/30 shadow-xs"
            title="Saved Bookmarks & Manuscripts"
          >
            <span className="material-symbols-outlined text-[18px] text-[#be8222]" style={{ fontVariationSettings: "'FILL' 1" }}>
              bookmark
            </span>
            <span className="text-xs font-bold font-mono">{bookmarkCount}</span>
          </button>

          {/* User Profile Avatar Lockup */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-1.5 pl-1 focus:outline-none"
              title="Scholar Account"
            >
              <img
                alt="Scholar Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#be8222]/30 shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaQRmnb6qpkTDdqZNHIN_uCi0MoNAUTc7sxmydQzjsz1K0zCHWsz9RZYikV5cLV8kEcv6iuvFyMv3rKq19ao-jpMs_c6zTVmqoCcKgaryQshpR7RmIgPxoSA6s4CSv58ksaXQVvpM-OqaHLJ7v2MkHDmJVt5MskP-2HTp1Rd9lKBDZLhyGRAWcWfCvBRmT8Sz2eDA-V7840lfZk5_TaOXVJIlA9aIDIWCe-BxVVk1iuBuO-6e7jxXO"
              />
              <span className="material-symbols-outlined text-[#45464d] text-[16px]">
                expand_more
              </span>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#c6c6ce]/40 p-3 z-50 text-left">
                <div className="flex items-center gap-3 pb-3 border-b border-[#ffe9e7]">
                  <img
                    alt="Scholar Profile"
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaQRmnb6qpkTDdqZNHIN_uCi0MoNAUTc7sxmydQzjsz1K0zCHWsz9RZYikV5cLV8kEcv6iuvFyMv3rKq19ao-jpMs_c6zTVmqoCcKgaryQshpR7RmIgPxoSA6s4CSv58ksaXQVvpM-OqaHLJ7v2MkHDmJVt5MskP-2HTp1Rd9lKBDZLhyGRAWcWfCvBRmT8Sz2eDA-V7840lfZk5_TaOXVJIlA9aIDIWCe-BxVVk1iuBuO-6e7jxXO"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#06102b]">Sophia Vane</p>
                    <p className="text-[11px] text-[#be8222] font-semibold">Scholar Fellow • Tier 1</p>
                  </div>
                </div>

                <div className="py-2 space-y-1 text-xs text-[#45464d]">
                  <div className="px-2 py-1.5 rounded-lg bg-[#fff0ef] flex items-center justify-between">
                    <span>Reading Habit</span>
                    <strong className="text-[#06102b]">7-Day Streak 🔥</strong>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('my-library');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-[#ffe9e7] text-[#06102b] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    My Library &amp; Bookmarks ({bookmarkCount})
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('explore-by-age');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-[#ffe9e7] text-[#06102b] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">military_tech</span>
                    Reading Passport &amp; Badges
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
