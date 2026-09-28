import { ColorPaletteId, CanvasMode, ThemeSettings, MusicPreset } from '../types';

export interface PaletteDefinition {
  id: ColorPaletteId;
  nameHi: string;
  nameEn: string;
  emoji: string;
  descriptionHi: string;
  descriptionEn: string;
  swatchColors: [string, string, string]; // 3 gradient stops
  headerGradient: string;
  accentBadge: string;
  activeBorder: string;
  buttonClass: string;
  highlightText: string;
  cardGlow: string;
  chipActive: string;
}

export const PALETTES: Record<ColorPaletteId, PaletteDefinition> = {
  'royal-amber': {
    id: 'royal-amber',
    nameHi: 'राजसी केसरिया व स्वर्ण',
    nameEn: 'Royal Amber & Saffron',
    emoji: '👑',
    descriptionHi: 'भारतीय दरबार, दीप और स्वर्णिम कथाओं का पवित्र रंग',
    descriptionEn: 'Warm royal saffron, glowing temple gold and amber rays',
    swatchColors: ['#d97706', '#ea580c', '#fbbf24'],
    headerGradient: 'from-amber-600 via-orange-600 to-amber-700',
    accentBadge: 'bg-amber-100 text-amber-900 border-amber-300',
    activeBorder: 'border-amber-500',
    buttonClass: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-amber-500/25',
    highlightText: 'text-amber-600 dark:text-amber-400',
    cardGlow: 'hover:shadow-[0_8px_30px_rgba(217,119,6,0.18)]',
    chipActive: 'bg-amber-600 text-white border-amber-600',
  },
  'peacock-teal': {
    id: 'peacock-teal',
    nameHi: 'मयूर नील व फ़िरोज़ी',
    nameEn: 'Peacock Sapphire & Teal',
    emoji: '🦚',
    descriptionHi: 'श्रीकृष्ण के मयूरपंख और सावन की ठंडी घटाओं की आभा',
    descriptionEn: 'Enchanting Krishna peacock plume, cyan skies and teal lakes',
    swatchColors: ['#0284c7', '#0d9488', '#06b6d4'],
    headerGradient: 'from-teal-600 via-cyan-700 to-sky-800',
    accentBadge: 'bg-teal-100 text-teal-900 border-teal-300',
    activeBorder: 'border-teal-500',
    buttonClass: 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-teal-500/25',
    highlightText: 'text-teal-600 dark:text-cyan-400',
    cardGlow: 'hover:shadow-[0_8px_30px_rgba(13,148,136,0.2)]',
    chipActive: 'bg-teal-600 text-white border-teal-600',
  },
  'lotus-rose': {
    id: 'lotus-rose',
    nameHi: 'कमल वन्दन व गुलाबी',
    nameEn: 'Lotus Bloom & Coral Rose',
    emoji: '🌸',
    descriptionHi: 'पवित्र कमल पुष्प और बच्चों के कोमल सपनों का सुंदर रंग',
    descriptionEn: 'Sweet sacred pink lotus, soft coral blush and rose petals',
    swatchColors: ['#e11d48', '#db2777', '#fb7185'],
    headerGradient: 'from-rose-600 via-pink-600 to-rose-700',
    accentBadge: 'bg-rose-100 text-rose-900 border-rose-300',
    activeBorder: 'border-rose-500',
    buttonClass: 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-rose-500/25',
    highlightText: 'text-rose-600 dark:text-pink-400',
    cardGlow: 'hover:shadow-[0_8px_30px_rgba(225,29,72,0.18)]',
    chipActive: 'bg-rose-600 text-white border-rose-600',
  },
  'forest-emerald': {
    id: 'forest-emerald',
    nameHi: 'पंचतंत्र हरितिमा व मरकत',
    nameEn: 'Forest Emerald & Jade',
    emoji: '🌿',
    descriptionHi: 'घने वनों के पशु-पक्षी, नदियाँ और पंचतंत्र की हरी-भरी दुनिया',
    descriptionEn: 'Lush Panchatantra jungle greens, sparkling rivers and jade flora',
    swatchColors: ['#059669', '#16a34a', '#34d399'],
    headerGradient: 'from-emerald-700 via-green-600 to-teal-800',
    accentBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    activeBorder: 'border-emerald-500',
    buttonClass: 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-emerald-500/25',
    highlightText: 'text-emerald-600 dark:text-emerald-400',
    cardGlow: 'hover:shadow-[0_8px_30px_rgba(5,150,105,0.2)]',
    chipActive: 'bg-emerald-600 text-white border-emerald-600',
  },
  'midnight-starlight': {
    id: 'midnight-starlight',
    nameHi: 'तारों भरी रात (डार्क मोड)',
    nameEn: 'Midnight Starlight (Dark Mode)',
    emoji: '🌌',
    descriptionHi: 'सोने से पहले आरामदायक पठन, शांत नीलिमा और चमकते तारे',
    descriptionEn: 'Velvety night sky, golden starlight, soothing bedtime reading',
    swatchColors: ['#312e81', '#6366f1', '#fbbf24'],
    headerGradient: 'from-slate-900 via-indigo-950 to-slate-900',
    accentBadge: 'bg-indigo-900/60 text-indigo-200 border-indigo-500/40',
    activeBorder: 'border-indigo-400',
    buttonClass: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/30',
    highlightText: 'text-indigo-400 dark:text-indigo-300',
    cardGlow: 'hover:shadow-[0_8px_30px_rgba(99,102,241,0.25)]',
    chipActive: 'bg-indigo-600 text-white border-indigo-400',
  },
  'parchment-warm': {
    id: 'parchment-warm',
    nameHi: 'प्राचीन ग्रंथ व चंदन',
    nameEn: 'Antique Parchment & Sandalwood',
    emoji: '📜',
    descriptionHi: 'दादी माँ के हस्तलिखित किस्सों और पुरानी पाण्डुलिपियों की महक',
    descriptionEn: 'Warm sepia antique manuscript, spiced sandalwood and vintage warmth',
    swatchColors: ['#78350f', '#92400e', '#d97706'],
    headerGradient: 'from-[#713f12] via-[#854d0e] to-[#582b09]',
    accentBadge: 'bg-amber-100/80 text-amber-950 border-amber-300',
    activeBorder: 'border-amber-700',
    buttonClass: 'bg-gradient-to-r from-[#92400e] to-[#78350f] text-white shadow-amber-900/20',
    highlightText: 'text-amber-800 dark:text-amber-500',
    cardGlow: 'hover:shadow-[0_8px_30px_rgba(120,53,15,0.18)]',
    chipActive: 'bg-[#92400e] text-white border-[#78350f]',
  },
  'candy-rainbow': {
    id: 'candy-rainbow',
    nameHi: 'रंग-बिरंगा बाल मेला (Kids Fun)',
    nameEn: 'Rainbow Carnival Mela',
    emoji: '🎪',
    descriptionHi: 'नन्हे बच्चों की खुशी, खिलौने और उल्लास से भरपूर इंद्रधनुषी रंग',
    descriptionEn: 'Cheerful, joyful rainbow candy hues designed especially for little kids',
    swatchColors: ['#8b5cf6', '#ec4899', '#f59e0b'],
    headerGradient: 'from-purple-600 via-pink-500 to-amber-500',
    accentBadge: 'bg-fuchsia-100 text-purple-900 border-fuchsia-300',
    activeBorder: 'border-purple-500',
    buttonClass: 'bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 text-white shadow-purple-500/25',
    highlightText: 'text-purple-600 dark:text-pink-400',
    cardGlow: 'hover:shadow-[0_8px_30px_rgba(236,72,153,0.22)]',
    chipActive: 'bg-gradient-to-r from-purple-600 to-pink-500 text-white border-purple-400',
  },
};

export const CANVAS_MODES: Record<CanvasMode, {
  id: CanvasMode;
  nameHi: string;
  nameEn: string;
  emoji: string;
  bgClass: string;
  containerBg: string;
  textClass: string;
  subtextClass: string;
  cardBg: string;
  cardBorder: string;
}> = {
  cream: {
    id: 'cream',
    nameHi: 'स्वच्छ दिन (Daylight)',
    nameEn: 'Daylight Clean',
    emoji: '☀️',
    bgClass: 'bg-[#fffaf5]',
    containerBg: 'bg-white',
    textClass: 'text-slate-900',
    subtextClass: 'text-slate-600',
    cardBg: 'bg-white',
    cardBorder: 'border-amber-200/60',
  },
  warm: {
    id: 'warm',
    nameHi: 'दीपक की छांव (Warm Sunset)',
    nameEn: 'Candlelight Sunset',
    emoji: '🕯️',
    bgClass: 'bg-[#fef6ec]',
    containerBg: 'bg-[#fff9f0]',
    textClass: 'text-[#382008]',
    subtextClass: 'text-[#6d4b24]',
    cardBg: 'bg-[#fffbf5]',
    cardBorder: 'border-[#ebd7bc]',
  },
  night: {
    id: 'night',
    nameHi: 'तारों की रात (Night Bedtime)',
    nameEn: 'Starlight Bedtime',
    emoji: '🌙',
    bgClass: 'bg-[#090d16]',
    containerBg: 'bg-[#0f172a]',
    textClass: 'text-slate-100',
    subtextClass: 'text-slate-400',
    cardBg: 'bg-[#111827]',
    cardBorder: 'border-slate-800',
  },
};

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  palette: 'royal-amber',
  canvasMode: 'cream',
  textSize: 'large',
  fontFamily: 'serif',
  showSparkles: true,
  bgMusicEnabled: true,
  bgMusicPreset: 'bansuri',
  bgMusicVolume: 0.35,
  narrationVolume: 1.0,
};

const THEME_STORAGE_KEY = 'kahanikunj_theme_settings';

export function loadSavedThemeSettings(): ThemeSettings {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_THEME_SETTINGS, ...parsed };
    }
  } catch (e) {
    // ignore
  }
  return DEFAULT_THEME_SETTINGS;
}

export function saveThemeSettings(settings: ThemeSettings): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    // ignore
  }
}
