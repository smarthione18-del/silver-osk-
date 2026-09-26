export type ViewMode = 'discover' | 'story-detail' | 'explore-by-age' | 'genres' | 'my-library';

export type ReadingTheme = 'warm' | 'sepia' | 'midnight';

export interface Chapter {
  id: string;
  number: number;
  title: string;
  wordCount: number;
  readingMinutes: number;
  isUnlocked: boolean;
  content: string;
}

export interface Story {
  id: string;
  title: string;
  subtitle?: string;
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
  extendedPremise?: string;
  format: 'illustrated' | 'audio' | 'text' | 'cyoa';
  audioNarration?: {
    narrator: string;
    durationMinutes: number;
    audioPreviewSnippetUrl?: string;
  };
  chapters: Chapter[];
  themes: string[];
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
