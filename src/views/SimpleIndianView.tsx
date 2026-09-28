import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, BookOpen, Mic, Sparkles, Heart, Bookmark, ArrowRight, Music2, Share2, HelpCircle, CheckCircle2, Flame, Bell, Subtitles, Moon, Sun, Palette, Star, Users, RotateCcw } from 'lucide-react';
import { Story, AppLanguage, MusicPreset, ThemeSettings, ColorPaletteId } from '../types';
import { indianMusic } from '../utils/indianMusic';
import { PALETTES } from '../utils/themeConfig';
import { getLocalizedStoryContent, loadStoryMemory, SavedStoryState } from '../utils/storytellerEngine';

interface SimpleIndianViewProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
  onPlayAudio: (story: Story) => void;
  onOpenVoiceAgent: (story?: Story) => void;
  bookmarkedStoryIds: string[];
  onToggleBookmark: (storyId: string) => void;
  language: AppLanguage;
  onToggleLanguage: () => void;
  onSwitchToFullAnthology?: () => void;
  themeSettings?: ThemeSettings;
  onOpenColorTheme?: () => void;
  onUpdateThemeSettings?: (settings: Partial<ThemeSettings>) => void;
}

export const SimpleIndianView: React.FC<SimpleIndianViewProps> = ({
  stories,
  onSelectStory,
  onPlayAudio,
  onOpenVoiceAgent,
  bookmarkedStoryIds,
  onToggleBookmark,
  language,
  onToggleLanguage,
  onSwitchToFullAnthology,
  themeSettings,
  onOpenColorTheme,
  onUpdateThemeSettings,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAgeBracket, setSelectedAgeBracket] = useState<string>('all');
  const [selectedCharacterFilter, setSelectedCharacterFilter] = useState<string>('all');
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentMusicPreset, setCurrentMusicPreset] = useState<MusicPreset>('bansuri');
  const [isDiyaLit, setIsDiyaLit] = useState(true);
  const [soundTestStatus, setSoundTestStatus] = useState<string | null>(null);
  const [showSubtitlesEverywhere, setShowSubtitlesEverywhere] = useState(true);
  const [isSpookyMode, setIsSpookyMode] = useState(false);
  const [savedMemory, setSavedMemory] = useState<SavedStoryState | null>(null);

  useEffect(() => {
    const mem = loadStoryMemory();
    if (mem && mem.storyId) {
      setSavedMemory(mem);
    }
  }, []);

  const isHindi = language === 'hi';
  const activePalette = themeSettings ? PALETTES[themeSettings.palette] : PALETTES['royal-amber'];

  // Categorized Age Brackets matching prompt specification
  const ageBrackets = [
    { id: 'all', labelHi: '👨‍👩‍👧‍👦 सभी उम्र • All Ages', labelEn: 'All Ages', emoji: '👨‍👩‍👧‍👦' },
    { id: 'kids_3_6', labelHi: '👶 नन्हे बच्चे (3–6 वर्ष)', labelEn: 'Kids (3–6 yrs)', emoji: '👶' },
    { id: 'children_7_10', labelHi: '🧒 बाल पाठक (7–10 वर्ष)', labelEn: 'Children (7–10 yrs)', emoji: '🧒' },
    { id: 'teens_11_14', labelHi: '👦 किशोर (11–14 वर्ष)', labelEn: 'Young Readers (11–14 yrs)', emoji: '👦' },
    { id: 'family', labelHi: '👨‍👩‍👧 पारिवारिक कथाएँ', labelEn: 'Family Stories', emoji: '👨‍👩‍👧' },
  ];

  // Comprehensive Story Categories
  const categories = [
    { id: 'all', labelHi: 'सभी कहानियाँ (All)', labelEn: 'All Stories', icon: '📚' },
    { id: 'moral', labelHi: 'नैतिक शिक्षा (Moral Stories)', labelEn: 'Moral Stories', icon: '🧠' },
    { id: 'historical_legend', labelHi: 'ऐतिहासिक व दरबारी (Akbar & Tenali)', labelEn: 'Historical & Legends', icon: '👑' },
    { id: 'animal', labelHi: 'पशु-पक्षी (Animal & Panchatantra)', labelEn: 'Animal Stories', icon: '🦁' },
    { id: 'gods', labelHi: 'देवी-देवता (Mythology & Epics)', labelEn: 'Mythology & Gods', icon: '🕉️' },
    { id: 'folk_traditional', labelHi: 'लोककथाएँ (Folk Tales)', labelEn: 'Folk & Traditional', icon: '🏰' },
    { id: 'funny', labelHi: 'हास्य कथाएँ (Funny Stories)', labelEn: 'Funny Stories', icon: '😂' },
    { id: 'magical_fantasy', labelHi: 'जादुई व रहस्य (Magical & Fantasy)', labelEn: 'Magical & Fantasy', icon: '✨' },
    { id: 'ghosts', labelHi: 'भूत-प्रेत व चुड़ैल (Supernatural Lore)', labelEn: 'Supernatural Lore', icon: '👻' },
    { id: 'classics', labelHi: 'कालजयी साहित्य (Tagore & Malgudi)', labelEn: 'Indian Classics', icon: '📖' },
  ];

  // Character-Based Collections
  const characterCollections = [
    { id: 'all', nameHi: 'सभी पात्र', nameEn: 'All Characters', icon: '🌟' },
    { id: 'akbar_birbal', nameHi: 'अकबर-बीरबल', nameEn: 'Akbar & Birbal', icon: '👑' },
    { id: 'tenali_raman', nameHi: 'तेनालीराम', nameEn: 'Tenali Raman', icon: '💡' },
    { id: 'panchatantra', nameHi: 'पंचतंत्र के पशु', nameEn: 'Panchatantra', icon: '🐘' },
    { id: 'krishna', nameHi: 'श्रीकृष्ण बाल-लीला', nameEn: 'Sri Krishna', icon: '🪈' },
    { id: 'shiva', nameHi: 'महादेव शिव', nameEn: 'Lord Shiva', icon: '🔱' },
    { id: 'vikram_betal', nameHi: 'विक्रम-बेताल', nameEn: 'Vikram & Betal', icon: '⚔️' },
  ];

  const mahadevStory = stories.find((s) => s.id === 'shiva-neelkanth') || stories[0];

  const filteredStories = stories.filter((story) => {
    // 1. Character Filter
    if (selectedCharacterFilter !== 'all') {
      if (selectedCharacterFilter === 'akbar_birbal' && !story.id.includes('akbar')) return false;
      if (selectedCharacterFilter === 'tenali_raman' && !story.id.includes('tenali')) return false;
      if (selectedCharacterFilter === 'panchatantra' && !story.id.includes('crow') && !story.id.includes('jackal')) return false;
      if (selectedCharacterFilter === 'krishna' && !story.id.includes('krishna')) return false;
      if (selectedCharacterFilter === 'shiva' && !story.id.includes('shiva')) return false;
      if (selectedCharacterFilter === 'vikram_betal' && !story.id.includes('betal')) return false;
    }

    // 2. Age Group Filter (3-6, 7-10, 11-14, family)
    if (selectedAgeBracket === 'kids_3_6') {
      const isKid =
        story.id.includes('crow') ||
        story.id.includes('jackal') ||
        story.id.includes('ganesha') ||
        story.ageBracket === 'little-dreamers';
      if (!isKid) return false;
    } else if (selectedAgeBracket === 'children_7_10') {
      const isChild =
        story.id.includes('krishna') ||
        story.id.includes('tenali') ||
        story.id.includes('akbar') ||
        story.id.includes('swami') ||
        story.id.includes('bakers') ||
        story.id.includes('hedgehog');
      if (!isChild) return false;
    } else if (selectedAgeBracket === 'teens_11_14') {
      const isTeen =
        story.id.includes('hanuman') ||
        story.id.includes('durga') ||
        story.id.includes('kabuliwala') ||
        story.id.includes('chudail') ||
        story.id.includes('dayan') ||
        story.id.includes('pishaach') ||
        story.id.includes('clockwork') ||
        story.ageBracket === 'young-adult';
      if (!isTeen) return false;
    } else if (selectedAgeBracket === 'family') {
      const isFamily =
        story.id.includes('shiva') ||
        story.id.includes('betal') ||
        story.id.includes('bramha') ||
        story.id.includes('banyan') ||
        story.ageBracket === 'all-ages';
      if (!isFamily) return false;
    }

    // 3. Category Filter
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'moral') {
      return Boolean(story.moral || story.hindiMoral) || story.id.includes('crow') || story.id.includes('jackal') || story.id.includes('bramha') || story.id.includes('akbar');
    }
    if (selectedCategory === 'historical_legend') {
      return story.id.includes('akbar') || story.id.includes('tenali') || story.tags.some(t => t.includes('Akbar') || t.includes('Tenali'));
    }
    if (selectedCategory === 'animal') {
      return story.id.includes('crow') || story.id.includes('jackal') || story.tags.some(t => t.includes('पंचतंत्र') || t.includes('Animal'));
    }
    if (selectedCategory === 'gods') {
      return (
        story.id.includes('shiva') ||
        story.id.includes('krishna') ||
        story.id.includes('hanuman') ||
        story.id.includes('durga') ||
        story.id.includes('ganesha') ||
        story.tags.some((t) => t.includes('देवी-देवता') || t.includes('Gods'))
      );
    }
    if (selectedCategory === 'folk_traditional') {
      return story.genre.includes('Folklore') || story.tags.some(t => t.includes('Folklore') || t.includes('लोककथा'));
    }
    if (selectedCategory === 'funny') {
      return story.id.includes('akbar') || story.id.includes('tenali') || story.id.includes('crow');
    }
    if (selectedCategory === 'magical_fantasy') {
      return story.id.includes('shiva') || story.id.includes('krishna') || story.id.includes('durga') || story.id.includes('betal') || story.id.includes('bramha');
    }
    if (selectedCategory === 'ghosts') {
      return (
        story.tags.some((t) => t.includes('भूत-प्रेत') || t.includes('Chudail') || t.includes('Dayan') || t.includes('Pishaach') || t.includes('Betal') || t.includes('Bramharakshas') || t.includes('Spooky')) ||
        story.id.includes('chudail') || story.id.includes('dayan') || story.id.includes('pishaach') || story.id.includes('betal') || story.id.includes('bramha')
      );
    }
    if (selectedCategory === 'classics') {
      return story.tags.some((t) => t.includes('Tagore') || t.includes('Malgudi')) || story.id.includes('banyan') || story.id.includes('kabuliwala') || story.id.includes('swami');
    }
    return true;
  });

  const featuredStory =
    selectedCategory === 'gods' || selectedCategory === 'all'
      ? mahadevStory
      : selectedCategory === 'ghosts'
      ? stories.find((s) => s.id === 'peepal-chudail') || stories[0]
      : filteredStories[0] || mahadevStory;

  const handleQuickMusic = async (preset: MusicPreset) => {
    if (isMusicPlaying && currentMusicPreset === preset) {
      indianMusic.stop();
      setIsMusicPlaying(false);
    } else {
      setCurrentMusicPreset(preset);
      await indianMusic.play(preset, 0.4);
      setIsMusicPlaying(true);
    }
  };

  const handleSolveAudioProblem = async () => {
    try {
      setSoundTestStatus('testing');
      const worked = await indianMusic.testSound();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.resume();
        const testSpeech = new SpeechSynthesisUtterance(isHindi ? 'नमस्ते! कहानीकुंज में आवाज़ चालू हो गई है।' : 'Namaste! KahaniKunj audio is working.');
        testSpeech.lang = isHindi ? 'hi-IN' : 'en-US';
        window.speechSynthesis.speak(testSpeech);
      }
      setSoundTestStatus('success');
      setTimeout(() => setSoundTestStatus(null), 5000);
    } catch (e) {
      console.warn('Audio test error:', e);
      setSoundTestStatus('error');
    }
  };

  const handleRingBell = async () => {
    await indianMusic.testSound();
  };

  const handleBlowShankh = async () => {
    await indianMusic.play('shankh_aarti', 0.5);
    setIsMusicPlaying(true);
    setCurrentMusicPreset('shankh_aarti');
  };

  const handleToggleSpookyMode = async () => {
    const nextMode = !isSpookyMode;
    setIsSpookyMode(nextMode);
    if (nextMode) {
      await indianMusic.play('spooky_night', 0.45);
      setIsMusicPlaying(true);
      setCurrentMusicPreset('spooky_night');
      setSelectedCategory('ghosts');
    } else {
      indianMusic.stop();
      setIsMusicPlaying(false);
      setSelectedCategory('all');
    }
  };

  const handleShareStoryOnWhatsApp = (story: Story) => {
    const title = isHindi ? story.hindiTitle || story.title : story.title;
    const moral = isHindi ? story.hindiMoral || story.moral : story.moral;
    const msg = `📖 *${title}*\n\n${story.synopsis}\n\n✨ *सीख / Moral:* ${moral || 'अद्भुत प्रेरणादायी गाथा'}\n\n🎧 *KahaniKunj (कहानीकुंज)* पर पूरी कथा ऑडियो सहित सुनें व पढ़ें:\n${window.location.origin}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const getTextClass = () => {
    if (textSize === 'normal') return 'text-sm';
    if (textSize === 'xlarge') return 'text-lg leading-relaxed';
    return 'text-base leading-normal';
  };

  // Helper for Age Range formatting
  const getStoryAgeDisplay = (story: Story) => {
    if (story.id.includes('crow') || story.id.includes('jackal') || story.id.includes('ganesha')) {
      return { label: isHindi ? '👶 नन्हे बच्चे • 3–6 वर्ष' : '👶 Kids • 3–6 yrs', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
    }
    if (story.id.includes('krishna') || story.id.includes('tenali') || story.id.includes('akbar') || story.id.includes('swami')) {
      return { label: isHindi ? '🧒 बच्चे • 7–10 वर्ष' : '🧒 Children • 7–10 yrs', color: 'bg-sky-100 text-sky-900 border-sky-300' };
    }
    if (story.id.includes('hanuman') || story.id.includes('durga') || story.id.includes('kabuliwala') || story.id.includes('chudail') || story.id.includes('dayan')) {
      return { label: isHindi ? '👦 युवा पाठक • 11–14 वर्ष' : '👦 Young Readers • 11–14 yrs', color: 'bg-purple-100 text-purple-900 border-purple-300' };
    }
    return { label: isHindi ? '👨‍👩‍👧 सभी उम्र • Family' : '👨‍👩‍👧 Family • All Ages', color: 'bg-amber-100 text-amber-900 border-amber-300' };
  };

  const getMusicPresetLabel = (preset?: MusicPreset) => {
    switch (preset) {
      case 'shankh_aarti': return '🐚 शंख आरती';
      case 'bansuri': return '🪈 बांसुरी';
      case 'sitar': return '🪕 सितार';
      case 'temple': return '🔔 मंदिर घंटियाँ';
      case 'monsoon': return '🌧️ सावन वर्षा';
      case 'spooky_night': return '🕯️ रहस्यमयी रात';
      default: return '🎵 शास्त्रीय संगीत';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-text">
      {/* Top Sound Diagnostic Alert Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-2 border-amber-400/50 rounded-3xl p-4 sm:p-5 shadow-lg mb-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center text-2xl font-bold shadow-md shrink-0 animate-pulse">
            🔊
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base sm:text-lg text-white font-serif">
                {isHindi ? 'कहानीकुंज ऑडियो व संगीत केंद्र' : "KahaniKunj Audio & Story Listening Experience"}
              </h3>
              <span className="bg-emerald-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Ready
              </span>
            </div>
            <p className="text-xs sm:text-sm text-indigo-200">
              {isHindi
                ? 'कहानियों को मधुर पृष्ठभूमि संगीत व लाइव सबटाइटल्स के साथ सुनें। आवाज़ न आए तो "ध्वनि टेस्ट" दबाएं!'
                : 'Enjoy stories with authentic background music and synchronized subtitles. Click "Unlock Sound" to test!'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSolveAudioProblem}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 ${
              soundTestStatus === 'success'
                ? 'bg-emerald-400 text-slate-950 ring-2 ring-white animate-bounce'
                : 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 hover:brightness-110'
            }`}
          >
            {soundTestStatus === 'success' ? <CheckCircle2 size={18} /> : <Volume2 size={18} />}
            <span>{soundTestStatus === 'success' ? (isHindi ? '✅ आवाज़ चालू हो गई!' : 'Sound Active!') : (isHindi ? '🔊 ध्वनि टेस्ट करें' : 'Unlock & Test Audio')}</span>
          </button>

          <button
            onClick={() => setShowSubtitlesEverywhere(!showSubtitlesEverywhere)}
            className={`px-3 py-2.5 rounded-2xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              showSubtitlesEverywhere
                ? 'bg-white/20 border-white/40 text-amber-200'
                : 'bg-black/30 border-white/20 text-slate-300'
            }`}
            title="लाइव सबटाइटल्स ऑन/ऑफ"
          >
            <Subtitles size={16} />
            <span className="hidden sm:inline">{isHindi ? 'सबटाइटल्स' : 'Captions'}</span>
          </button>
        </div>
      </div>

      {/* Smart Story Memory: Continue Story (कहानी जारी रखें) */}
      {savedMemory && (
        <div className="bg-gradient-to-r from-amber-900/90 via-orange-950/90 to-slate-900 border-2 border-amber-400 rounded-3xl p-4 sm:p-5 shadow-xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white animate-fadeIn">
          <div className="flex items-center gap-3.5 min-w-0">
            {savedMemory.coverImage ? (
              <img
                src={savedMemory.coverImage}
                alt={savedMemory.storyTitle}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-400 shadow-md shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-2xl font-bold shadow-md shrink-0">
                📖
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 shadow-xs">
                  <RotateCcw size={11} />
                  <span>
                    {language === 'gu'
                      ? 'વાર્તા ચાલુ રાખો'
                      : language === 'mr'
                      ? 'कथा पुढे सुरू ठेवा'
                      : isHindi
                      ? 'कहानी जारी रखें'
                      : 'Continue Story'}
                  </span>
                </span>
                <span className="text-[11px] text-amber-200 font-mono">
                  {Math.floor(savedMemory.positionSec / 60)}m {savedMemory.positionSec % 60}s
                </span>
              </div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-white mt-1 truncate">
                {savedMemory.storyTitle}
              </h4>
              <p className="text-xs text-amber-100/80 truncate">
                {language === 'gu'
                  ? 'તમે જ્યાંથી અટક્યા હતા, ત્યાંથી જ ફરી સાંભળવાનું શરૂ કરો'
                  : language === 'mr'
                  ? 'तुम्ही जेथे थांबला होतात, तेथूनच पुन्हा ऐकणे सुरू करा'
                  : isHindi
                  ? 'जहाँ आपने रोका था, वहीं से दोबारा सुनना व पढ़ना शुरू करें'
                  : 'Resume your story right where you left off.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {(() => {
              const matched = stories.find((s) => s.id === savedMemory.storyId) || stories[0];
              return (
                <>
                  <button
                    onClick={() => onPlayAudio(matched)}
                    className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-bold text-xs sm:text-sm rounded-2xl shadow-md flex items-center gap-2 transition-all active:scale-95"
                  >
                    <Play size={15} fill="currentColor" />
                    <span>
                      {language === 'gu'
                        ? 'અહીંથી સાંભળો'
                        : language === 'mr'
                        ? 'येथून ऐका'
                        : isHindi
                        ? 'यहाँ से सुनें'
                        : 'Resume Audio'}
                    </span>
                  </button>
                  <button
                    onClick={() => onSelectStory(matched)}
                    className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-2xl border border-white/20 transition-all"
                  >
                    <span>
                      {language === 'gu'
                        ? 'વાંચો'
                        : language === 'mr'
                        ? 'वाचा'
                        : isHindi
                        ? 'पढ़ें'
                        : 'Read'}
                    </span>
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Hero Welcome Banner: KahaniKunj - Where Every Story Comes Alive! */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-10 shadow-xl mb-6 border-2 transition-all ${
        isSpookyMode
          ? 'bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 border-purple-500/40 text-white'
          : `bg-gradient-to-r ${activePalette.headerGradient} text-white border-amber-300/30`
      }`}>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-white/30 shadow-xs">
              <span className="text-base">{isSpookyMode ? '👻' : '🪔'}</span>
              <span>{isHindi ? 'कहानीकुंज में आपका स्वागत है' : 'Welcome to KahaniKunj'}</span>
              <span>•</span>
              <span className="text-amber-200">
                {isHindi ? 'हर कहानी जीवंत हो उठती है ✨' : 'Where Every Story Comes Alive! ✨'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white drop-shadow-md">
              {isHindi
                ? 'कहानीकुंज — कहानियों का जादुई संसार'
                : 'KahaniKunj — Where Every Story Comes Alive!'}
            </h1>

            <p className="text-white/90 text-sm sm:text-lg max-w-2xl leading-relaxed font-medium">
              {isHindi
                ? 'सुनें, पढ़ें, कल्पना करें और हर नन्हे मन के लिए अद्भुत पौराणिक, नैतिक, ऐतिहासिक व पशु-पक्षियों की कहानियों की खोज करें।'
                : 'Listen, read, imagine, and discover wonderful stories for every young mind with immersive background music and audio.'}
            </p>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs font-semibold text-white/80">
              <span className="bg-black/25 px-3 py-1 rounded-full backdrop-blur-sm border border-white/15">
                👶 Kids: 3–6 वर्ष
              </span>
              <span className="bg-black/25 px-3 py-1 rounded-full backdrop-blur-sm border border-white/15">
                🧒 Children: 7–10 वर्ष
              </span>
              <span className="bg-black/25 px-3 py-1 rounded-full backdrop-blur-sm border border-white/15">
                👦 Young Readers: 11–14 वर्ष
              </span>
              <span className="bg-black/25 px-3 py-1 rounded-full backdrop-blur-sm border border-white/15">
                🎵 पृष्ठभूमि संगीत
              </span>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {/* Color Theme Studio Button */}
            {onOpenColorTheme && (
              <button
                onClick={onOpenColorTheme}
                className="flex items-center gap-2 bg-white text-slate-900 font-bold px-4 py-3 rounded-2xl shadow-lg hover:bg-amber-50 active:scale-95 transition-all text-xs sm:text-sm border border-amber-200 group"
                title="रंग पैलेट व शैली स्टूडियो खोलें"
              >
                <Palette size={16} className="text-amber-600 group-hover:rotate-45 transition-transform" />
                <span>{isHindi ? '🎨 रंग व थीम स्टूडियो' : '🎨 Themes & Colors'}</span>
              </button>
            )}

            {/* Language Switch */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-2 bg-black/30 hover:bg-black/45 text-white font-bold px-4 py-3 rounded-2xl border border-white/30 active:scale-95 transition-all text-xs sm:text-sm"
              title="भाषा बदलें / Change Language"
            >
              <span className="text-base">🇮🇳</span>
              <span>{isHindi ? 'English' : 'हिन्दी'}</span>
            </button>
          </div>
        </div>

        {/* Decorative background emoji */}
        <div className="absolute -bottom-8 -right-8 opacity-15 text-9xl select-none pointer-events-none">
          {isSpookyMode ? '👻' : '🦚'}
        </div>
      </div>

      {/* Attractive Colour UI Panel Bar (Quick Palette Strip) */}
      <div className="bg-white dark:bg-slate-900 border-2 border-amber-300/80 dark:border-slate-800 rounded-3xl p-4 sm:p-5 mb-8 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-pink-500 text-white flex items-center justify-center text-xl shadow-sm shrink-0">
            🎨
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base font-serif flex items-center gap-2">
              <span>{isHindi ? 'आकर्षक रंग व शैली पैलेट (Choose Color Theme)' : 'Magical Color Themes'}</span>
              <span className="text-xs bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded-full font-sans font-bold">
                {activePalette.emoji} {isHindi ? activePalette.nameHi.split(' ')[0] : activePalette.nameEn.split(' ')[0]}
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isHindi ? 'अपनी पसंदीदा रंग शैली पर क्लिक करें और पूरी वेबसाइट का रंग बदलें:' : 'Click to instantly transform the look and feel:'}
            </p>
          </div>
        </div>

        {/* Swatch Chips */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
          {(Object.keys(PALETTES) as ColorPaletteId[]).map((pid) => {
            const pal = PALETTES[pid];
            const isSelected = themeSettings?.palette === pid;
            return (
              <button
                key={pid}
                onClick={() => onUpdateThemeSettings && onUpdateThemeSettings({ palette: pid })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? `${pal.chipActive} shadow-md scale-105`
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                }`}
                title={isHindi ? pal.nameHi : pal.nameEn}
              >
                <span>{pal.emoji}</span>
                <span className="hidden sm:inline">{isHindi ? pal.nameHi.split(' ')[0] : pal.nameEn.split(' ')[0]}</span>
              </button>
            );
          })}

          {onOpenColorTheme && (
            <button
              onClick={onOpenColorTheme}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 hover:bg-amber-200 transition-all flex items-center gap-1"
            >
              <Palette size={13} />
              <span>{isHindi ? 'सभी सेटिंग्स...' : 'More...'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Feature: Sacred Puja & Aarti Corner + Background Music Quick Bar */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border-2 border-amber-300 rounded-3xl p-5 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            onClick={() => setIsDiyaLit(!isDiyaLit)}
            className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex flex-col items-center justify-center cursor-pointer shadow-md relative group select-none"
            title="दीपक जलाएं / बुझाएं"
          >
            <span className="text-2xl transition-transform group-hover:scale-110">
              {isDiyaLit ? '🪔' : '🕯️'}
            </span>
            {isDiyaLit && (
              <span className="absolute -top-1 w-3 h-3 rounded-full bg-amber-300 blur-[2px] animate-ping" />
            )}
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-base font-serif flex items-center gap-2">
              <span>{isHindi ? 'पवित्र पूजा व आरती कॉर्नर' : 'Sacred Puja & Aarti Corner'}</span>
              <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full font-sans uppercase font-bold">
                {isDiyaLit ? (isHindi ? 'दीपक प्रज्वलित' : 'Diya Lit') : (isHindi ? 'दीपक जलाएं' : 'Light Diya')}
              </span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              {isHindi
                ? 'भगवान की कथाएं पढ़ते समय मंदिर की घंटी बजाएं या पवित्र शंखनाद व बांसुरी सुनें।'
                : 'Ring the temple bell or listen to sacred Shankh and bansuri flute while reading.'}
            </p>
          </div>
        </div>

        {/* Quick Ambient Music Preset Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRingBell}
            className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
            title="मंदिर की घंटी बजाएं"
          >
            <Bell size={16} className="text-amber-600 animate-wiggle" />
            <span>{isHindi ? '🔔 घंटी बजाएं' : 'Ring Bell'}</span>
          </button>

          <button
            onClick={handleBlowShankh}
            className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
            title="पवित्र शंखनाद सुनें"
          >
            <span>🐚</span>
            <span>{isHindi ? 'शंखनाद आरती' : 'Shankh Blast'}</span>
          </button>

          <button
            onClick={() => handleQuickMusic('bansuri')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
              isMusicPlaying && currentMusicPreset === 'bansuri'
                ? 'bg-amber-900 text-white ring-2 ring-amber-400'
                : 'bg-white hover:bg-amber-50 text-amber-900 border border-amber-300'
            }`}
            title="मधुर बांसुरी धुन सुनें"
          >
            <span>🪈</span>
            <span>{isHindi ? 'मधुर बांसुरी' : 'Bansuri Flute'}</span>
          </button>

          <button
            onClick={() => handleQuickMusic('sitar')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
              isMusicPlaying && currentMusicPreset === 'sitar'
                ? 'bg-amber-900 text-white ring-2 ring-amber-400'
                : 'bg-white hover:bg-amber-50 text-amber-900 border border-amber-300'
            }`}
            title="सितार की राग सुनें"
          >
            <span>🪕</span>
            <span>{isHindi ? 'सितार राग' : 'Sitar Melody'}</span>
          </button>
        </div>
      </div>

      {/* Section: Character-Based Story Discovery */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
            <span>{isHindi ? 'पात्रों के अनुसार कथा संग्रह (Explore by Character)' : 'Character Collections'}</span>
          </h3>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {characterCollections.map((char) => {
            const isSelected = selectedCharacterFilter === char.id;
            return (
              <button
                key={char.id}
                onClick={() => setSelectedCharacterFilter(char.id)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-2xs ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-amber-50'
                }`}
              >
                <span>{char.icon}</span>
                <span>{isHindi ? char.nameHi : char.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section: Age Bracket Filter Selector (Prompt requirement: 3-6, 7-10, 11-14, Family) */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">
          {isHindi ? 'उम्र के अनुसार (Age Range):' : 'Age Group:'}
        </span>
        {ageBrackets.map((age) => (
          <button
            key={age.id}
            onClick={() => setSelectedAgeBracket(age.id)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-2xs flex items-center gap-1.5 ${
              selectedAgeBracket === age.id
                ? 'bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-md ring-2 ring-slate-400'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>{age.emoji}</span>
            <span>{isHindi ? age.labelHi : age.labelEn}</span>
          </button>
        ))}
      </div>

      {/* Section: Category Filter Pills */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
            <span>{isHindi ? 'कथा श्रेणियाँ (Story Categories)' : 'Story Categories'}</span>
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400 font-sans">
              ({filteredStories.length} {isHindi ? 'कहानियाँ' : 'Stories'})
            </span>
          </h3>
          {onSwitchToFullAnthology && (
            <button
              onClick={onSwitchToFullAnthology}
              className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>{isHindi ? 'विस्तृत संग्रह देखें (Full Archive)' : 'Full Archive'}</span>
              <ArrowRight size={13} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 shadow-xs ${
                  isSelected
                    ? cat.id === 'ghosts'
                      ? 'bg-purple-900 text-white shadow-md ring-2 ring-purple-400'
                      : 'bg-amber-700 text-white shadow-md ring-2 ring-amber-400'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-amber-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{isHindi ? cat.labelHi : cat.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mahadev Special 3-Page Illustrated Showcase Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 text-white mb-10 shadow-xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-extrabold rounded-full flex items-center gap-1.5 shadow-md">
                <span>🕉️</span>
                <span>{isHindi ? 'महादेव विशेष सचित्र गाथा' : 'Lord Shiva Illustrated Folio'}</span>
              </span>
              <span className="px-2.5 py-1 bg-white/10 text-amber-200 text-xs font-semibold rounded-full border border-white/15">
                {isHindi ? '3 सचित्र पन्ने (3 Pages)' : '3 Illustrated Pages'}
              </span>
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-400/30">
                {isHindi ? 'सभी उम्र के लिए' : 'All Ages'}
              </span>
            </div>

            <button
              onClick={() => onSelectStory(mahadevStory)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95"
            >
              <BookOpen size={16} />
              <span>{isHindi ? '📖 पन्ना 1 से पढ़ना शुरू करें' : 'Read Page by Page'}</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 mb-2">
            {isHindi ? mahadevStory.hindiTitle : mahadevStory.title}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl mb-6 leading-relaxed">
            {isHindi ? mahadevStory.hindiSubtitle : mahadevStory.subtitle}
          </p>

          {/* 3 Page-by-Page Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {mahadevStory.chapters.map((ch, idx) => (
              <div
                key={ch.id}
                onClick={() => onSelectStory(mahadevStory)}
                className="group/page bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/60 rounded-2xl overflow-hidden cursor-pointer transition-all flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                  <img
                    src={ch.image || mahadevStory.coverImage}
                    alt={ch.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover/page:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-amber-200 text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-white/15">
                    {isHindi ? `पन्ना ${idx + 1}` : `Page ${idx + 1}`}
                  </div>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-amber-200 line-clamp-1 mb-1 group-hover/page:text-amber-300">
                    {isHindi ? ch.hindiTitle : ch.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 italic">
                    {isHindi ? ch.hindiImageCaption || ch.hindiTitle : ch.imageCaption || ch.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Spotlight Card */}
      {featuredStory && (
        <div className={`rounded-3xl border-2 shadow-lg overflow-hidden mb-10 transition-all ${
          selectedCategory === 'ghosts'
            ? 'bg-[#121927] border-purple-500/50 text-white'
            : 'bg-white border-amber-300/80 text-slate-900'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image side */}
            <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[280px]">
              <img
                src={featuredStory.coverImage}
                alt={featuredStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                ⭐ {isHindi ? 'मुख्य कथा' : 'Featured Story'}
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg">
                ⏱️ {featuredStory.readingMinutes} {isHindi ? 'मिनट की कथा' : 'min read'}
              </div>
            </div>

            {/* Content side */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    {featuredStory.author}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleShareStoryOnWhatsApp(featuredStory)}
                      className="text-emerald-600 hover:text-emerald-700 p-1"
                      title="Share on WhatsApp"
                    >
                      <Share2 size={18} />
                    </button>
                    <button
                      onClick={() => onToggleBookmark(featuredStory.id)}
                      className="text-slate-400 hover:text-amber-600 transition-colors p-1"
                      title="Bookmark"
                    >
                      <Bookmark
                        size={20}
                        className={
                          bookmarkedStoryIds.includes(featuredStory.id)
                            ? 'fill-amber-600 text-amber-600'
                            : ''
                        }
                      />
                    </button>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">
                  {isHindi
                    ? featuredStory.hindiTitle || featuredStory.title
                    : featuredStory.title}
                </h2>

                <p className="text-xs sm:text-sm text-amber-700 italic mb-4">
                  {isHindi
                    ? featuredStory.hindiSubtitle || featuredStory.subtitle
                    : featuredStory.subtitle}
                </p>

                <p className={`mb-4 ${getTextClass()} ${selectedCategory === 'ghosts' ? 'text-slate-200' : 'text-slate-700'}`}>
                  {isHindi
                    ? featuredStory.hindiSynopsis || featuredStory.synopsis
                    : featuredStory.synopsis}
                </p>

                {/* Golden Moral Highlight Box */}
                {(featuredStory.hindiMoral || featuredStory.moral) && (
                  <div className={`p-3.5 rounded-r-2xl mb-6 shadow-2xs border-l-4 ${
                    selectedCategory === 'ghosts'
                      ? 'bg-purple-950/60 border-purple-500 text-purple-100'
                      : 'bg-amber-50 border-amber-600 text-amber-950'
                  }`}>
                    <div className="flex items-center gap-1.5 text-xs font-bold mb-1">
                      <Sparkles size={14} className="text-amber-500" />
                      <span>{isHindi ? 'कथा की अमर सीख (Moral):' : 'Moral of the Story:'}</span>
                    </div>
                    <p className="text-sm font-medium">
                      {isHindi
                        ? featuredStory.hindiMoral || featuredStory.moral
                        : featuredStory.moral}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200/40">
                <button
                  onClick={() => onPlayAudio(featuredStory)}
                  className="flex-1 min-w-[130px] flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-2xl shadow transition-all active:scale-95 text-sm"
                >
                  <Volume2 size={18} />
                  <span>{isHindi ? '🎧 ऑडियो सुनें' : 'Listen Audio'}</span>
                </button>

                <button
                  onClick={() => onSelectStory(featuredStory)}
                  className="flex-1 min-w-[130px] flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-2xl shadow transition-all active:scale-95 text-sm"
                >
                  <BookOpen size={18} />
                  <span>{isHindi ? '📖 पूरी कथा पढ़ें' : 'Read Story'}</span>
                </button>

                <button
                  onClick={() => onOpenVoiceAgent(featuredStory)}
                  className="flex items-center justify-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-900 font-bold py-3 px-4 rounded-2xl transition-all active:scale-95 text-sm"
                  title="दीदी से बात करें"
                >
                  <Mic size={18} className="text-orange-600" />
                  <span>{isHindi ? 'दीदी से समझें' : 'Ask Saathi'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => {
          const isSaved = bookmarkedStoryIds.includes(story.id);
          const isGhostStory = story.tags.some((t) => t.includes('भूत-प्रेत') || t.includes('Chudail') || t.includes('Dayan') || t.includes('Pishaach') || t.includes('Betal') || t.includes('Bramharakshas'));
          const isGodStory = story.tags.some((t) => t.includes('देवी-देवता') || t.includes('Gods') || t.includes('Shiva') || t.includes('Krishna') || t.includes('Hanuman') || t.includes('Durga') || t.includes('Ganesha'));

          return (
            <div
              key={story.id}
              className={`rounded-3xl border-2 transition-all duration-300 flex flex-col overflow-hidden group shadow-sm hover:shadow-xl ${
                isGhostStory && isSpookyMode
                  ? 'bg-[#151c2c] border-purple-500/40 hover:border-purple-400 text-white'
                  : 'bg-white border-slate-200/90 hover:border-amber-400 text-slate-900'
              }`}
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[75%]">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shadow-xs backdrop-blur-md ${getStoryAgeDisplay(story).color}`}>
                    {getStoryAgeDisplay(story).label}
                  </span>
                  <span className="bg-slate-900/85 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    {isGodStory ? '🔱 देवी-देवता' : isGhostStory ? '👻 भूत-प्रेत' : story.genre}
                  </span>
                  {story.musicPreset && (
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
                      {getMusicPresetLabel(story.musicPreset)}
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareStoryOnWhatsApp(story);
                    }}
                    className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-[#25D366] hover:bg-emerald-50 flex items-center justify-center shadow transition-all"
                    title="Share on WhatsApp"
                  >
                    <Share2 size={15} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(story.id);
                    }}
                    className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 hover:text-amber-600 flex items-center justify-center shadow transition-all"
                    title="Bookmark"
                  >
                    <Bookmark
                      size={16}
                      className={isSaved ? 'fill-amber-600 text-amber-600' : ''}
                    />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1.5">
                  <span>⏱️ {story.readingMinutes} {isHindi ? 'मिनट' : 'mins'}</span>
                  <span className="text-amber-300">•</span>
                  <span>🖼️ {story.chapters.length} {isHindi ? 'सचित्र पन्ने' : 'pages'}</span>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                    {story.author}
                  </div>
                  <h3
                    onClick={() => onSelectStory(story)}
                    className="text-xl font-bold font-serif mb-2 cursor-pointer hover:text-amber-600 transition-colors line-clamp-1"
                  >
                    {isHindi ? story.hindiTitle || story.title : story.title}
                  </h3>
                  <p className={`text-xs line-clamp-2 mb-3 leading-relaxed ${isGhostStory && isSpookyMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {isHindi ? story.hindiSynopsis || story.synopsis : story.synopsis}
                  </p>

                  {/* Moral snippet */}
                  {(story.hindiMoral || story.moral) && (
                    <div className={`p-2.5 rounded-xl text-xs mb-4 line-clamp-2 border ${
                      isGhostStory && isSpookyMode
                        ? 'bg-purple-950/40 border-purple-800 text-purple-200'
                        : 'bg-amber-50/80 border-amber-200 text-amber-900'
                    }`}>
                      <span className="font-bold">✨ {isHindi ? 'सीख:' : 'Moral:'} </span>
                      <span>
                        {isHindi
                          ? story.hindiMoral?.replace('सीख: ', '') || story.moral
                          : story.moral}
                      </span>
                    </div>
                  )}
                </div>

                {/* 3 Large Action Buttons */}
                <div className="pt-3 border-t border-slate-200/40 grid grid-cols-3 gap-2">
                  <button
                    onClick={() => onPlayAudio(story)}
                    className="flex flex-col sm:flex-row items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2 px-1 rounded-xl transition-all"
                    title={isHindi ? 'ऑडियो सुनें' : 'Listen'}
                  >
                    <Volume2 size={15} />
                    <span>{isHindi ? 'सुनें' : 'Listen'}</span>
                  </button>

                  <button
                    onClick={() => onSelectStory(story)}
                    className="flex flex-col sm:flex-row items-center justify-center gap-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2 px-1 rounded-xl transition-all shadow-xs"
                    title={isHindi ? 'सचित्र पन्ने पढ़ें' : 'Read Illustrated Pages'}
                  >
                    <BookOpen size={15} />
                    <span>{isHindi ? 'सचित्र पढ़ें' : 'Read'}</span>
                  </button>

                  <button
                    onClick={() => onOpenVoiceAgent(story)}
                    className="flex flex-col sm:flex-row items-center justify-center gap-1 bg-orange-100 hover:bg-orange-200 text-orange-900 text-xs font-bold py-2 px-1 rounded-xl transition-all"
                    title={isHindi ? 'दीदी से समझें' : 'Ask Didi'}
                  >
                    <Mic size={15} className="text-orange-600" />
                    <span>{isHindi ? 'समझें' : 'Ask'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
