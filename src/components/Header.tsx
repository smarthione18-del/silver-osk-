import React, { useState } from 'react';
import { ViewMode, AppLanguage } from '../types';
import { Mic, Globe, Sparkles, Volume2, CheckCircle2, Palette, Music, FileAudio } from 'lucide-react';
import { indianMusic } from '../utils/indianMusic';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  bookmarkCount: number;
  onOpenSearch: () => void;
  isAmbientMode: boolean;
  onToggleAmbient: () => void;
  language: AppLanguage;
  onToggleLanguage: () => void;
  onSelectLanguage?: (lang: AppLanguage) => void;
  onOpenVoiceAgent: () => void;
  onOpenColorTheme?: () => void;
  onOpenMusicGenerator?: () => void;
  onOpenTranscriber?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  bookmarkCount,
  onOpenSearch,
  isAmbientMode,
  onToggleAmbient,
  language,
  onToggleLanguage,
  onSelectLanguage,
  onOpenVoiceAgent,
  onOpenColorTheme,
  onOpenMusicGenerator,
  onOpenTranscriber,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [soundTested, setSoundTested] = useState(false);
  const isHindi = language === 'hi';

  const handleQuickAudioTest = async () => {
    await indianMusic.testSound();
    setSoundTested(true);
    setTimeout(() => setSoundTested(false), 3000);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#fff8f7]/95 dark:bg-[#0f172a]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#1c2541]/5 dark:border-slate-800 transition-colors duration-300">
      <div className="h-20 w-full px-4 sm:px-6 lg:px-10 mx-auto flex items-center justify-between gap-3">
        {/* Brand / Logo: KahaniKunj */}
        <div
          onClick={() => onNavigate(currentView === 'simple-indian' ? 'simple-indian' : 'discover')}
          className="flex items-center gap-3 shrink-0 cursor-pointer group"
          role="button"
          tabIndex={0}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 text-white flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform border border-amber-200">
            🪔
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl text-[#06102b] dark:text-white font-bold tracking-tight leading-none group-hover:text-amber-600 transition-colors">
                KahaniKunj
              </span>
              <span className="text-[10px] font-sans font-extrabold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs">
                कहानीकुंज
              </span>
            </div>
            <span className="text-[11px] text-[#45464d] dark:text-slate-400 tracking-wide mt-1 hidden sm:inline font-medium">
              {isHindi ? 'जहाँ हर कहानी जीवंत हो उठती है ✨' : 'Where Every Story Comes Alive! ✨'}
            </span>
          </div>
        </div>

        {/* Primary Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-[#ffe9e7]/50 dark:bg-slate-800/60 rounded-xl border border-[#c6c6ce]/30 dark:border-slate-700">
          {/* Simple Indian Mode Highlighted Tab */}
          <button
            onClick={() => onNavigate('simple-indian')}
            className={`font-sans text-[13px] font-bold px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              currentView === 'simple-indian'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-amber-900 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/40 hover:bg-amber-200'
            }`}
          >
            <span>🇮🇳</span>
            <span>{isHindi ? 'कहानीकुंज मुख्य' : 'KahaniKunj Home'}</span>
          </button>

          <button
            onClick={() => onNavigate('discover')}
            className={`font-sans text-[13px] font-semibold px-3 py-2 rounded-lg transition-all ${
              currentView === 'discover'
                ? 'bg-[#1c2541] text-[#ffffff] shadow-sm'
                : 'text-[#45464d] dark:text-slate-300 hover:bg-[#ffe1df] dark:hover:bg-slate-700 hover:text-[#06102b]'
            }`}
          >
            {isHindi ? 'खोजें (Discover)' : 'Discover'}
          </button>
          <button
            onClick={() => onNavigate('explore-by-age')}
            className={`font-sans text-[13px] font-semibold px-3 py-2 rounded-lg transition-all ${
              currentView === 'explore-by-age'
                ? 'bg-[#1c2541] text-[#ffffff] shadow-sm'
                : 'text-[#45464d] dark:text-slate-300 hover:bg-[#ffe1df] dark:hover:bg-slate-700 hover:text-[#06102b]'
            }`}
          >
            {isHindi ? 'उम्र अनुसार (Age Groups)' : 'By Age'}
          </button>
          <button
            onClick={() => onNavigate('genres')}
            className={`font-sans text-[13px] font-semibold px-3 py-2 rounded-lg transition-all ${
              currentView === 'genres'
                ? 'bg-[#1c2541] text-[#ffffff] shadow-sm'
                : 'text-[#45464d] dark:text-slate-300 hover:bg-[#ffe1df] dark:hover:bg-slate-700 hover:text-[#06102b]'
            }`}
          >
            {isHindi ? 'श्रेणियाँ (Categories)' : 'Categories'}
          </button>
          <button
            onClick={() => onNavigate('my-library')}
            className={`font-sans text-[13px] font-semibold px-3 py-2 rounded-lg transition-all ${
              currentView === 'my-library'
                ? 'bg-[#1c2541] text-[#ffffff] shadow-sm'
                : 'text-[#45464d] dark:text-slate-300 hover:bg-[#ffe1df] dark:hover:bg-slate-700 hover:text-[#06102b]'
            }`}
          >
            {isHindi ? 'मेरी लाइब्रेरी' : 'My Library'}
          </button>
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Attractive Colour UI Panel Trigger Button */}
          {onOpenColorTheme && (
            <button
              onClick={onOpenColorTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-400/50 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-pink-500/10 hover:from-amber-500/20 hover:to-pink-500/20 text-amber-900 dark:text-amber-200 text-xs font-bold transition-all shadow-xs active:scale-95 group"
              title="रंग, थीम व फ़ॉन्ट बदलें (Customize Color & Style)"
            >
              <Palette size={15} className="text-amber-600 dark:text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>{isHindi ? 'थीम' : 'Themes'}</span>
            </button>
          )}

          {/* AI Music Generation Button (Lyria) */}
          {onOpenMusicGenerator && (
            <button
              onClick={onOpenMusicGenerator}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-slate-800 dark:to-slate-800 hover:from-amber-200 hover:to-orange-200 text-amber-950 dark:text-amber-200 text-xs font-bold transition-all shadow-xs active:scale-95"
              title="Lyria AI से संगीत बनाएं (Generate Music with Lyria)"
            >
              <Music size={15} className="text-amber-600" />
              <span className="hidden md:inline">{isHindi ? 'AI संगीत' : 'AI Music'}</span>
              <span className="text-[10px] px-1 py-0.2 bg-amber-400 text-slate-900 font-extrabold rounded">
                Lyria
              </span>
            </button>
          )}

          {/* Audio Transcribe Button (gemini-3.5-transcribe) */}
          {onOpenTranscriber && (
            <button
              onClick={onOpenTranscriber}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-orange-500/40 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-slate-800 dark:to-slate-800 hover:from-orange-200 hover:to-amber-200 text-amber-950 dark:text-amber-200 text-xs font-bold transition-all shadow-xs active:scale-95"
              title="माइक से ऑडियो ट्रांसक्राइब करें (Transcribe Speech with gemini-3.5-transcribe)"
            >
              <FileAudio size={15} className="text-orange-600" />
              <span className="hidden md:inline">{isHindi ? 'ट्रांसक्राइब' : 'Transcribe'}</span>
              <span className="text-[10px] px-1 py-0.2 bg-orange-400 text-slate-900 font-extrabold rounded">
                3.5
              </span>
            </button>
          )}

          {/* Voice Agent Trigger Button (Speaks & Listens) */}
          <button
            onClick={onOpenVoiceAgent}
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-bold text-xs shadow-sm hover:shadow-md hover:scale-102 active:scale-95 transition-all"
            title="बोलकर समझें / Ask Story Saathi"
          >
            <Mic size={15} className="animate-pulse" />
            <span className="hidden sm:inline">
              {isHindi ? 'बोलकर पूछें' : 'Voice Saathi'}
            </span>
          </button>

          {/* Multilingual Selector (हिन्दी / English / ગુજરાતી / मराठी) */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#fff0ef] dark:bg-slate-800 hover:bg-[#ffe1df] dark:hover:bg-slate-700 text-amber-900 dark:text-amber-300 rounded-xl border border-amber-300/40 dark:border-slate-700 text-xs font-bold transition-all shadow-2xs"
              title="Select Language (भाषा चुनें)"
            >
              <Globe size={14} className="text-amber-700 dark:text-amber-400" />
              <span>
                {language === 'hi'
                  ? 'हिन्दी'
                  : language === 'gu'
                  ? 'ગુજરાતી'
                  : language === 'mr'
                  ? 'मराठी'
                  : 'English'}
              </span>
              <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-amber-500/20 p-1.5 z-50 animate-fadeIn">
                {[
                  { id: 'hi' as AppLanguage, label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
                  { id: 'en' as AppLanguage, label: 'English', flag: '🇬🇧' },
                  { id: 'gu' as AppLanguage, label: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
                  { id: 'mr' as AppLanguage, label: 'मराठी (Marathi)', flag: '🇮🇳' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (onSelectLanguage) {
                        onSelectLanguage(item.id);
                      } else {
                        onToggleLanguage();
                      }
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                      language === item.id
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>
                      {item.flag} {item.label}
                    </span>
                    {language === item.id && <CheckCircle2 size={12} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 1-Click Audio Unlock & Test Bell */}
          <button
            onClick={handleQuickAudioTest}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs ${
              soundTested
                ? 'bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-200'
                : 'bg-[#fff0ef] dark:bg-slate-800 hover:bg-[#ffe1df] dark:hover:bg-slate-700 text-amber-900 dark:text-amber-300 border-amber-300/40 dark:border-slate-700'
            }`}
            title="आवाज़ नहीं आ रही? यहाँ क्लिक करके टेस्ट करें"
          >
            {soundTested ? <CheckCircle2 size={14} /> : <Volume2 size={14} className="text-amber-700 dark:text-amber-400" />}
            <span className="hidden md:inline">{soundTested ? (isHindi ? 'चालू है!' : 'Working!') : (isHindi ? 'ध्वनि टेस्ट' : 'Sound Test')}</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#45464d] dark:text-slate-400 hover:bg-[#ffe1df] dark:hover:bg-slate-800 hover:text-[#06102b] dark:hover:text-white rounded-lg transition-colors flex items-center justify-center"
            title="Search"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Saved Bookmarks Pill */}
          <button
            onClick={() => onNavigate('my-library')}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-[#fff0ef] dark:bg-slate-800 hover:bg-[#ffe1df] dark:hover:bg-slate-700 text-[#06102b] dark:text-white rounded-full transition-colors border border-[#c6c6ce]/30 dark:border-slate-700 shadow-xs"
            title="Saved Bookmarks & Manuscripts"
          >
            <span className="material-symbols-outlined text-[17px] text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>
              bookmark
            </span>
            <span className="text-xs font-bold font-mono">{bookmarkCount}</span>
          </button>

          {/* User Profile Avatar Lockup */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-1 pl-1 focus:outline-none"
              title="Scholar Account"
            >
              <img
                alt="Scholar Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500/30 shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaQRmnb6qpkTDdqZNHIN_uCi0MoNAUTc7sxmydQzjsz1K0zCHWsz9RZYikV5cLV8kEcv6iuvFyMv3rKq19ao-jpMs_c6zTVmqoCcKgaryQshpR7RmIgPxoSA6s4CSv58ksaXQVvpM-OqaHLJ7v2MkHDmJVt5MskP-2HTp1Rd9lKBDZLhyGRAWcWfCvBRmT8Sz2eDA-V7840lfZk5_TaOXVJIlA9aIDIWCe-BxVVk1iuBuO-6e7jxXO"
              />
              <span className="material-symbols-outlined text-[#45464d] dark:text-slate-400 text-[16px]">
                expand_more
              </span>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1e293b] rounded-xl shadow-xl border border-[#c6c6ce]/40 dark:border-slate-700 p-3 z-50 text-left">
                <div className="flex items-center gap-3 pb-3 border-b border-[#ffe9e7] dark:border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 text-xl flex items-center justify-center">
                    🪔
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#06102b] dark:text-white">KahaniKunj Reader</p>
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">{isHindi ? 'कहानी प्रेमी • 7-दिन स्ट्रीक 🔥' : 'Story Lover • 7-Day Streak 🔥'}</p>
                  </div>
                </div>

                <div className="py-2 space-y-1 text-xs text-[#45464d] dark:text-slate-300">
                  <button
                    onClick={() => {
                      onNavigate('simple-indian');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-900 dark:text-amber-200 font-semibold flex items-center gap-2"
                  >
                    <span>🇮🇳</span>
                    <span>{isHindi ? 'कहानीकुंज मुख्य पृष्ठ' : 'KahaniKunj Home'}</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('my-library');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    <span>{isHindi ? `मेरी लाइब्रेरी (${bookmarkCount})` : `My Library & Bookmarks (${bookmarkCount})`}</span>
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

