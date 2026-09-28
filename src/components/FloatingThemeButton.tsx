import React from 'react';
import { Palette, Sparkles } from 'lucide-react';
import { AppLanguage, ColorPaletteId } from '../types';
import { PALETTES } from '../utils/themeConfig';

interface FloatingThemeButtonProps {
  onOpen: () => void;
  language: AppLanguage;
  currentPaletteId: ColorPaletteId;
}

export const FloatingThemeButton: React.FC<FloatingThemeButtonProps> = ({
  onOpen,
  language,
  currentPaletteId,
}) => {
  const isHindi = language === 'hi';
  const palette = PALETTES[currentPaletteId] || PALETTES['royal-amber'];

  return (
    <button
      onClick={onOpen}
      className={`fixed bottom-24 right-5 z-40 p-3 sm:px-4 sm:py-3 rounded-full text-white shadow-2xl flex items-center gap-2 font-bold text-xs sm:text-sm border-2 border-white/80 active:scale-95 transition-all group backdrop-blur-md ${palette.buttonClass}`}
      title={isHindi ? 'रंग पैलेट, फ़ॉन्ट व पृष्ठभूमि संगीत बदलें' : 'Change Theme Color & Atmosphere'}
    >
      <div className="relative">
        <Palette size={18} className="group-hover:rotate-45 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-300 animate-ping" />
      </div>
      <span className="hidden sm:inline">
        {isHindi ? 'रंग व थीम' : 'Themes & Colors'}
      </span>
      <span className="text-xs">{palette.emoji}</span>
    </button>
  );
};
