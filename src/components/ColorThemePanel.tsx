import React from 'react';
import {
  Palette,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  Sun,
  Moon,
  Flame,
  Check,
  Music,
  RotateCcw,
  Sliders,
  Type,
  BookOpen
} from 'lucide-react';
import { ThemeSettings, AppLanguage, MusicPreset, ColorPaletteId, CanvasMode, StoryTextSize, StoryFontFamily } from '../types';
import { PALETTES, CANVAS_MODES, DEFAULT_THEME_SETTINGS } from '../utils/themeConfig';
import { indianMusic } from '../utils/indianMusic';

interface ColorThemePanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ThemeSettings;
  onUpdateSettings: (newSettings: Partial<ThemeSettings>) => void;
  language: AppLanguage;
}

export const ColorThemePanel: React.FC<ColorThemePanelProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  language,
}) => {
  const isHindi = language === 'hi';
  const currentPalette = PALETTES[settings.palette] || PALETTES['royal-amber'];

  if (!isOpen) return null;

  const musicPresets: { id: MusicPreset; nameHi: string; nameEn: string; icon: string }[] = [
    { id: 'royal_court', nameHi: 'राजसी दरबार (Royal Court)', nameEn: 'Royal Court', icon: '👑' },
    { id: 'light_folk', nameHi: 'पारंपरिक लोक संगीत (Light Folk)', nameEn: 'Light Folk', icon: '🪕' },
    { id: 'forest_nature', nameHi: 'वन व पक्षी (Forest Nature)', nameEn: 'Forest Nature', icon: '🌳' },
    { id: 'adventure_cinematic', nameHi: 'साहसिक यात्रा (Adventure)', nameEn: 'Adventure Cinematic', icon: '🧭' },
    { id: 'bedtime_calm', nameHi: 'शयन समय / शांति (Bedtime Calm)', nameEn: 'Bedtime Calm', icon: '🌙' },
    { id: 'magical_fantasy', nameHi: 'जादुई संसार (Magical Fantasy)', nameEn: 'Magical Fantasy', icon: '✨' },
    { id: 'emotional_gentle', nameHi: 'भावुक राग (Emotional Gentle)', nameEn: 'Emotional Gentle', icon: '❤️' },
    { id: 'cheerful_playful', nameHi: 'हंसमुख हास्य (Playful)', nameEn: 'Cheerful Playful', icon: '😄' },
    { id: 'suspense_mystery', nameHi: 'रहस्यमयी सस्पेंस (Suspense)', nameEn: 'Mystery Suspense', icon: '🕯️' },
    { id: 'bansuri', nameHi: 'बांसुरी (Bansuri Flute)', nameEn: 'Bansuri Flute', icon: '🪈' },
    { id: 'sitar', nameHi: 'सितार (Sitar Melodies)', nameEn: 'Sitar Melody', icon: '🪕' },
    { id: 'shankh_aarti', nameHi: 'शंख व महाआरती (Shankh Aarti)', nameEn: 'Shankh & Aarti', icon: '🐚' },
    { id: 'temple', nameHi: 'मंदिर घंटियाँ (Temple Bells)', nameEn: 'Temple Bells', icon: '🔔' },
    { id: 'monsoon', nameHi: 'सावन की फुहार (Monsoon Rain)', nameEn: 'Monsoon Rain', icon: '🌧️' },
    { id: 'spooky_night', nameHi: 'भूतिया रात (Spooky Night)', nameEn: 'Spooky Night', icon: '👻' },
    { id: 'tanpura', nameHi: 'तानपुरा ध्यान (Tanpura Drone)', nameEn: 'Tanpura Drone', icon: '🧘' },
  ];

  const handlePaletteSelect = (paletteId: ColorPaletteId) => {
    onUpdateSettings({ palette: paletteId });
  };

  const handleCanvasModeSelect = (mode: CanvasMode) => {
    onUpdateSettings({ canvasMode: mode });
  };

  const handleTextSizeSelect = (size: StoryTextSize) => {
    onUpdateSettings({ textSize: size });
  };

  const handleFontFamilySelect = (font: StoryFontFamily) => {
    onUpdateSettings({ fontFamily: font });
  };

  const handleMusicPresetChange = (preset: MusicPreset) => {
    onUpdateSettings({ bgMusicPreset: preset });
    if (settings.bgMusicEnabled) {
      indianMusic.play(preset, settings.bgMusicVolume);
    }
  };

  const handleToggleMusic = () => {
    const next = !settings.bgMusicEnabled;
    onUpdateSettings({ bgMusicEnabled: next });
    if (next) {
      indianMusic.play(settings.bgMusicPreset, settings.bgMusicVolume);
    } else {
      indianMusic.stop();
    }
  };

  const handleVolumeChange = (vol: number) => {
    onUpdateSettings({ bgMusicVolume: vol });
    indianMusic.setVolume(vol);
  };

  const handleResetDefaults = () => {
    onUpdateSettings(DEFAULT_THEME_SETTINGS);
    indianMusic.stop();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#111827] text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl border-2 border-amber-500/30 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel Header */}
        <div className={`p-4 sm:p-5 bg-gradient-to-r ${currentPalette.headerGradient} text-white flex items-center justify-between shrink-0 shadow-md`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">
              🎨
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl flex items-center gap-2">
                <span>{isHindi ? 'कहानीकुंज रंग व शैली स्टूडियो' : 'KahaniKunj Theme & Color Studio'}</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-sans font-normal">
                  {currentPalette.emoji} {isHindi ? currentPalette.nameHi.split(' ')[0] : currentPalette.nameEn.split(' ')[0]}
                </span>
              </h3>
              <p className="text-xs text-white/80">
                {isHindi
                  ? 'अपनी पसंदीदा रंग-बिरंगी थीम, पठन मोड और पृष्ठभूमि संगीत चुनें'
                  : 'Customize magical color palettes, reading canvas, text size, and story music'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors active:scale-95"
            title="Close Panel"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm divide-y divide-slate-100 dark:divide-slate-800">
          {/* Section 1: Color Palettes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                <Palette size={16} className="text-amber-500" />
                <span>{isHindi ? '१. आकर्षक रंग पैलेट (Choose Color Theme)' : '1. Magical Color Palette'}</span>
              </label>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {Object.keys(PALETTES).length} {isHindi ? 'सुंदर शैलियाँ' : 'themes'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(PALETTES) as ColorPaletteId[]).map((pid) => {
                const pal = PALETTES[pid];
                const isSelected = settings.palette === pid;
                return (
                  <button
                    key={pid}
                    onClick={() => handlePaletteSelect(pid)}
                    className={`text-left p-3 rounded-2xl border-2 transition-all flex items-start gap-3 relative ${
                      isSelected
                        ? `${pal.activeBorder} bg-gradient-to-r from-amber-500/10 to-transparent dark:bg-white/5 shadow-md`
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50'
                    }`}
                  >
                    {/* Visual Swatch Circle */}
                    <div className="shrink-0 w-10 h-10 rounded-xl overflow-hidden shadow-sm flex flex-col border border-white/40 ring-1 ring-black/5">
                      <div className="flex-1" style={{ backgroundColor: pal.swatchColors[0] }} />
                      <div className="flex-1" style={{ backgroundColor: pal.swatchColors[1] }} />
                      <div className="flex-1" style={{ backgroundColor: pal.swatchColors[2] }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                        <span>{pal.emoji}</span>
                        <span className="truncate">{isHindi ? pal.nameHi : pal.nameEn}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {isHindi ? pal.descriptionHi : pal.descriptionEn}
                      </p>
                    </div>

                    {isSelected && (
                      <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Canvas Lighting Mode */}
          <div className="pt-5 space-y-3">
            <label className="font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <Sun size={16} className="text-amber-500" />
              <span>{isHindi ? '२. पठन रोशनी मोड (Canvas Reading Light)' : '2. Reading Canvas Mode'}</span>
            </label>

            <div className="grid grid-cols-3 gap-2.5">
              {(Object.keys(CANVAS_MODES) as CanvasMode[]).map((cm) => {
                const mode = CANVAS_MODES[cm];
                const isSelected = settings.canvasMode === cm;
                return (
                  <button
                    key={cm}
                    onClick={() => handleCanvasModeSelect(cm)}
                    className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1.5 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-2xl">{mode.emoji}</span>
                    <span className="text-xs font-semibold">{isHindi ? mode.nameHi : mode.nameEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Text Size & Font Style */}
          <div className="pt-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  <Type size={16} className="text-amber-500" />
                  <span>{isHindi ? '३. अक्षर का आकार (Story Text Size)' : '3. Story Text Size'}</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isHindi ? 'बच्चों और बड़ों के लिए सुविधाजनक पठन' : 'Easy reading for kids and family'}
                </p>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0">
                {(['normal', 'large', 'xlarge'] as StoryTextSize[]).map((sz) => {
                  const isSel = settings.textSize === sz;
                  const labels: Record<StoryTextSize, { hi: string; en: string }> = {
                    normal: { hi: 'मध्यम A', en: 'Medium A' },
                    large: { hi: 'बड़ा A+', en: 'Large A+' },
                    xlarge: { hi: 'विशाल A++', en: 'Jumbo A++' },
                  };
                  return (
                    <button
                      key={sz}
                      onClick={() => handleTextSizeSelect(sz)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isSel
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                      }`}
                    >
                      {isHindi ? labels[sz].hi : labels[sz].en}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Font Family Choice */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <BookOpen size={14} className="text-amber-500" />
                <span>{isHindi ? 'फ़ॉन्ट शैली:' : 'Typeface Style:'}</span>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleFontFamilySelect('serif')}
                  className={`px-3 py-1 rounded-lg text-xs font-serif transition-all ${
                    settings.fontFamily === 'serif'
                      ? 'bg-amber-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {isHindi ? '📖 राजसी क्लासिक (Serif)' : '📖 Classic Serif'}
                </button>
                <button
                  onClick={() => handleFontFamilySelect('rounded')}
                  className={`px-3 py-1 rounded-lg text-xs font-sans transition-all ${
                    settings.fontFamily === 'rounded'
                      ? 'bg-amber-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {isHindi ? '🎈 बाल सुलभ (Rounded)' : '🎈 Playful Rounded'}
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Background Music & Audio Controls */}
          <div className="pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  <Music size={16} className="text-amber-500" />
                  <span>{isHindi ? '४. कहानी का पृष्ठभूमि संगीत (Story Background Music)' : '4. Story Background Music'}</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isHindi ? 'हर कहानी के अनुसार वाद्य संगीत का आनंद लें' : 'Royalty-free Indian classical & ambient melodies'}
                </p>
              </div>

              <button
                onClick={handleToggleMusic}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                  settings.bgMusicEnabled
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {settings.bgMusicEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                <span>{settings.bgMusicEnabled ? (isHindi ? 'चालू है (ON)' : 'Music ON') : (isHindi ? 'बंद है (OFF)' : 'Music OFF')}</span>
              </button>
            </div>

            {/* Preset Selection Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {musicPresets.map((preset) => {
                const isSelected = settings.bgMusicPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleMusicPresetChange(preset.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-base">{preset.icon}</span>
                    <span className="truncate">{isHindi ? preset.nameHi.split(' ')[0] : preset.nameEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Volume Sliders */}
            <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Volume2 size={13} className="text-amber-500" />
                  <span>{isHindi ? 'संगीत आवाज़ (Music Volume)' : 'Music Volume'}</span>
                </span>
                <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">
                  {Math.round(settings.bgMusicVolume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.bgMusicVolume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* Section 5: Magical Diya & Sparkle Animations */}
          <div className="pt-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🪔</span>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                  {isHindi ? 'जादुई दीप व चमक (Diya Flame & Sparkles)' : 'Magical Diya Flame & Sparkles'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isHindi ? 'कहानियों के साथ सुंदर दीप और तैरते तारे' : 'Subtle floating sparkles and ambient diya flame'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onUpdateSettings({ showSparkles: !settings.showSparkles })}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                settings.showSparkles ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  settings.showSparkles ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Panel Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <button
            onClick={handleResetDefaults}
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={13} />
            <span>{isHindi ? 'डिफ़ॉल्ट सेटिंग्स' : 'Reset Defaults'}</span>
          </button>

          <button
            onClick={onClose}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-transform active:scale-95 ${currentPalette.buttonClass}`}
          >
            {isHindi ? '✓ सुंदर रूप लागू करें' : '✓ Apply Theme'}
          </button>
        </div>
      </div>
    </div>
  );
};
