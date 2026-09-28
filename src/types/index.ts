export type ViewMode = 'discover' | 'story-detail' | 'explore-by-age' | 'genres' | 'my-library' | 'simple-indian';

export type ReadingTheme = 'warm' | 'sepia' | 'midnight';

export type AppLanguage = 'hi' | 'en' | 'gu' | 'mr' | 'bn' | 'ta' | 'te' | 'kn' | 'ml' | 'pa' | 'ur';

export type MusicPreset =
  | 'bansuri'
  | 'tanpura'
  | 'sitar'
  | 'monsoon'
  | 'temple'
  | 'spooky_night'
  | 'shankh_aarti'
  | 'royal_court'
  | 'light_folk'
  | 'forest_nature'
  | 'adventure_cinematic'
  | 'bedtime_calm'
  | 'magical_fantasy'
  | 'emotional_gentle'
  | 'cheerful_playful'
  | 'suspense_mystery';

// Attractive Colour UI Panel types
export type ColorPaletteId =
  | 'royal-amber'
  | 'peacock-teal'
  | 'lotus-rose'
  | 'forest-emerald'
  | 'midnight-starlight'
  | 'parchment-warm'
  | 'candy-rainbow';

export type CanvasMode = 'cream' | 'warm' | 'night';

export type StoryTextSize = 'normal' | 'large' | 'xlarge';

export type StoryFontFamily = 'serif' | 'rounded' | 'literary' | 'dyslexic';

export interface ThemeSettings {
  palette: ColorPaletteId;
  canvasMode: CanvasMode;
  textSize: StoryTextSize;
  fontFamily: StoryFontFamily;
  showSparkles: boolean;
  bgMusicEnabled: boolean;
  bgMusicPreset: MusicPreset;
  bgMusicVolume: number;
  narrationVolume: number;
}

export type StoryAgeGroup = 'kids_3_6' | 'children_7_10' | 'teens_11_14' | 'family_all';

export type StoryCategoryType =
  | 'moral'
  | 'folk_traditional'
  | 'animal'
  | 'historical_legend'
  | 'funny'
  | 'magical_fantasy'
  | 'educational'
  | 'mythological_gods'
  | 'spooky_mystery';

export interface StoryIntelligence {
  genre: string;
  genreType: string;
  mood: string;
  characters: string[];
  ageGroup: 'kids_3_6' | 'children_7_10' | 'teens_11_14';
  setting: string;
  emotionalTone: string;
  storyIntensity: 'gentle' | 'moderate' | 'dramatic';
  culturalContext: string;
  recommendedMusic: MusicPreset;
  musicReason: string;
  narratorPace: number;
  characterVoices: { [name: string]: { pitch: number; rate: number; tone: string } };
}

export interface StoryNarrationSegment {
  id: string;
  text: string;
  speaker: string;
  pitch: number;
  rate: number;
  pauseAfterMs: number;
  isMoral?: boolean;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  hindiTitle?: string;
  gujaratiTitle?: string;
  marathiTitle?: string;
  wordCount: number;
  readingMinutes: number;
  isUnlocked: boolean;
  content: string;
  hindiContent?: string;
  gujaratiContent?: string;
  marathiContent?: string;
  image?: string;
  imageCaption?: string;
  hindiImageCaption?: string;
  gujaratiImageCaption?: string;
  marathiImageCaption?: string;
}

export interface Story {
  id: string;
  title: string;
  hindiTitle?: string;
  gujaratiTitle?: string;
  marathiTitle?: string;
  subtitle?: string;
  hindiSubtitle?: string;
  gujaratiSubtitle?: string;
  marathiSubtitle?: string;
  author: string;
  authorTitle?: string;
  authorAvatar?: string;
  illustrator?: string;
  coverImage: string;
  heroBackground?: string;
  tags: string[];
  genre: string;
  ageBracket: string;
  targetAgeLabel: string;
  readingMinutes: number;
  wordCount: number;
  lexile: string;
  rating: number;
  reviewCount: number;
  synopsis: string;
  hindiSynopsis?: string;
  gujaratiSynopsis?: string;
  marathiSynopsis?: string;
  moral?: string;
  hindiMoral?: string;
  gujaratiMoral?: string;
  marathiMoral?: string;
  extendedPremise?: string;
  format: 'illustrated' | 'audio' | 'text' | 'cyoa';
  audioNarration?: {
    narrator: string;
    durationMinutes: number;
    audioPreviewSnippetUrl?: string;
  };
  chapters: Chapter[];
  themes: string[];
  musicPreset?: MusicPreset;
  intelligence?: StoryIntelligence;
  ageCategory?: 'kids_3_7' | 'teens_8_14' | 'all_ages';
  suitability?: {
    tension: string;
    puzzles: string;
    vocabulary: string;
    audience: string;
  };
  relatedStoryIds?: string[];
  featured?: boolean;
  editionFolio?: string;
}

export interface AgeCategory {
  id: string;
  label: string;
  ageRange: string;
  description: string;
  subgenre: string;
  icon: string;
  image: string;
}

export interface GenreCategory {
  id: string;
  title: string;
  storyCount: number;
  description: string;
  icon: string;
  themeColor?: string;
}

export interface Epigraph {
  quote: string;
  author: string;
  source: string;
  year?: string;
}
