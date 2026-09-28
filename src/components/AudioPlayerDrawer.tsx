import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Story, AppLanguage, MusicPreset, StoryIntelligence, StoryNarrationSegment } from '../types';
import { indianMusic } from '../utils/indianMusic';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Subtitles,
  HelpCircle,
  CheckCircle2,
  RotateCcw,
  Languages,
  Crown,
  Smile,
  Trees,
  Compass,
  Moon,
  Wand2,
  Heart,
  Ghost,
  Info,
} from 'lucide-react';
import {
  analyzeStoryIntelligence,
  getLocalizedStoryContent,
  normalizePronunciation,
  prepareNarrationSegments,
  selectBestVoiceForLanguage,
  saveStoryMemory,
} from '../utils/storytellerEngine';

interface AudioPlayerDrawerProps {
  currentStory: Story | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  language?: AppLanguage;
  onLanguageChange?: (lang: AppLanguage) => void;
  onCurrentSentenceChange?: (sentence: string, segmentIdx: number) => void;
}

export const AudioPlayerDrawer: React.FC<AudioPlayerDrawerProps> = ({
  currentStory,
  isPlaying,
  onTogglePlay,
  onClose,
  language = 'hi',
  onLanguageChange,
  onCurrentSentenceChange,
}) => {
  // Local language selection inside the player
  const [playerLang, setPlayerLang] = useState<AppLanguage>(language);
  const [speed, setSpeed] = useState<number>(1);
  const [musicVolume, setMusicVolume] = useState<number>(0.18); // Default 18% (perfect lower balance)
  const [narrationVolume, setNarrationVolume] = useState<number>(0.95); // Default 95%
  const [isMusicEnabled, setIsMusicEnabled] = useState<boolean>(true);
  const [ambientFx, setAmbientFx] = useState<MusicPreset>('bansuri');
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [soundTested, setSoundTested] = useState<boolean>(false);
  const [showIntelligenceInfo, setShowIntelligenceInfo] = useState<boolean>(false);
  const [currentSegmentIdx, setCurrentSegmentIdx] = useState<number>(0);
  const [currentSentence, setCurrentSentence] = useState<string>('');
  const [currentSpeaker, setCurrentSpeaker] = useState<string>('Narrator');
  const [currentTime, setCurrentTime] = useState<number>(0);

  const pauseTimeoutRef = useRef<any>(null);
  const currentSegmentIdxRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(isPlaying);

  isPlayingRef.current = isPlaying;
  currentSegmentIdxRef.current = currentSegmentIdx;

  // Sync prop language
  useEffect(() => {
    if (language) {
      setPlayerLang(language);
    }
  }, [language]);

  // Automatic Story-Type Detection & Intelligence Calculation
  const intelligence: StoryIntelligence = useMemo(() => {
    if (!currentStory) {
      return {
        genre: 'Folklore',
        genreType: 'folk_traditional',
        mood: 'Cheerful & Moral',
        characters: ['Narrator'],
        ageGroup: 'children_7_10',
        setting: 'Indian Countryside',
        emotionalTone: 'Inspiring',
        storyIntensity: 'moderate',
        culturalContext: 'Indian Heritage',
        recommendedMusic: 'bansuri',
        musicReason: 'Bamboo flute warmth',
        narratorPace: 0.92,
        characterVoices: {},
      };
    }
    return analyzeStoryIntelligence(currentStory);
  }, [currentStory?.id]);

  // Step 2 & 3: AUTOMATIC BACKGROUND MUSIC SELECTION WHEN STORY STARTS
  // Automatically choose recommended music and set volume to ~18% (so narration is ~95%)
  useEffect(() => {
    if (currentStory && intelligence) {
      setAmbientFx(intelligence.recommendedMusic);
      // Ensure narration is louder and music is softer
      if (musicVolume > 0.3) {
        setMusicVolume(0.18);
      }
    }
  }, [currentStory?.id, intelligence]);

  // Localized story content (title, synopsis, moral, chapter text)
  const localized = useMemo(() => {
    if (!currentStory) return null;
    return getLocalizedStoryContent(currentStory, playerLang, 0);
  }, [currentStory?.id, playerLang]);

  // Story narration segments with character prosody & intelligent pauses
  const segments: StoryNarrationSegment[] = useMemo(() => {
    if (!currentStory || !localized) return [];
    const fullText = `${localized.title}. ${localized.chapterTitle ? localized.chapterTitle + '. ' : ''}${localized.chapterContent}`;
    return prepareNarrationSegments(fullText, intelligence, localized.moral);
  }, [currentStory?.id, localized, intelligence]);

  const duration = useMemo(() => {
    if (currentStory?.audioNarration?.durationMinutes) {
      return currentStory.audioNarration.durationMinutes * 60;
    }
    return Math.max(180, segments.length * 7);
  }, [currentStory?.id, segments.length]);

  // Stop narration helper
  const cancelNarration = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }
  };

  // Perform narration segment by segment with character pitch/rate and natural pauses
  const speakSegment = (idx: number) => {
    if (!isPlayingRef.current || !('speechSynthesis' in window) || idx >= segments.length) {
      if (idx >= segments.length && isPlayingRef.current) {
        onTogglePlay(); // Story finished
      }
      return;
    }

    const seg = segments[idx];
    if (!seg) return;

    setCurrentSegmentIdx(idx);
    setCurrentSentence(seg.text);
    setCurrentSpeaker(seg.speaker);
    if (onCurrentSentenceChange) {
      onCurrentSentenceChange(seg.text, idx);
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    const normalizedText = normalizePronunciation(seg.text, playerLang);
    const utterance = new SpeechSynthesisUtterance(normalizedText);

    // Dynamic pitch and rate based on character voice & speed setting
    utterance.pitch = Math.max(0.6, Math.min(1.8, seg.pitch));
    utterance.rate = Math.max(0.6, Math.min(1.6, seg.rate * speed));
    utterance.volume = narrationVolume;

    // Pick proper voice for player language
    const voices = window.speechSynthesis.getVoices();
    const voice = selectBestVoiceForLanguage(voices, playerLang);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = playerLang === 'hi' ? 'hi-IN' : playerLang === 'gu' ? 'gu-IN' : playerLang === 'mr' ? 'mr-IN' : 'en-IN';
    }

    utterance.onend = () => {
      if (!isPlayingRef.current) return;
      // Intelligent natural pause between sentences, dialogue, or moral
      const pauseDuration = Math.max(250, seg.pauseAfterMs || 450);
      pauseTimeoutRef.current = setTimeout(() => {
        if (isPlayingRef.current) {
          speakSegment(idx + 1);
        }
      }, pauseDuration);
    };

    utterance.onerror = (e) => {
      console.warn('Utterance speech notice:', e);
      if (isPlayingRef.current) {
        pauseTimeoutRef.current = setTimeout(() => {
          if (isPlayingRef.current) {
            speakSegment(idx + 1);
          }
        }, 500);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  // Play / Pause Narration & Synchronize Background Music
  useEffect(() => {
    if (!currentStory) return;

    if (isPlaying) {
      // 1. Start soft ambient background music matching story type
      if (isMusicEnabled && ambientFx) {
        indianMusic.play(ambientFx, musicVolume);
      } else {
        indianMusic.stop();
      }

      // 2. Start speech synthesis narration
      speakSegment(currentSegmentIdxRef.current);
    } else {
      // Pause narration and stop background music smoothly
      cancelNarration();
      indianMusic.stop();
    }

    return () => {
      cancelNarration();
      indianMusic.stop();
    };
  }, [isPlaying, currentStory?.id, speed, playerLang, isMusicEnabled]);

  // Adjust volume dynamically during playback
  useEffect(() => {
    if (isPlaying && isMusicEnabled) {
      indianMusic.setVolume(musicVolume);
    }
  }, [musicVolume, isPlaying, isMusicEnabled]);

  // Save story memory to localStorage periodically
  useEffect(() => {
    if (currentStory && (isPlaying || currentTime > 0)) {
      saveStoryMemory({
        storyId: currentStory.id,
        language: playerLang,
        chapterIndex: 0,
        positionSec: currentTime,
        musicPreset: ambientFx,
        musicVolume,
        narrationVolume,
        musicEnabled: isMusicEnabled,
        speed,
        storyTitle: localized?.title || currentStory.title,
        coverImage: currentStory.coverImage,
      });
    }
  }, [currentTime, isPlaying, playerLang, ambientFx, musicVolume, narrationVolume, speed]);

  // Timer Scrubber
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Music switch handler
  const handleAmbientChange = (mode: MusicPreset) => {
    setAmbientFx(mode);
    if (isPlaying && isMusicEnabled) {
      indianMusic.play(mode, musicVolume);
    }
  };

  const handleToggleMusic = () => {
    const nextState = !isMusicEnabled;
    setIsMusicEnabled(nextState);
    if (!nextState) {
      indianMusic.stop();
    } else if (isPlaying) {
      indianMusic.play(ambientFx, musicVolume);
    }
  };

  // Switch Language smoothly in real-time
  const handleLanguageSwitch = (newLang: AppLanguage) => {
    if (newLang === playerLang) return;
    setPlayerLang(newLang);
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
    // Continue from approximate position
    if (isPlaying) {
      cancelNarration();
      setTimeout(() => {
        if (isPlayingRef.current) {
          speakSegment(currentSegmentIdxRef.current);
        }
      }, 200);
    }
  };

  // Test sound helper
  const handleTestSound = async () => {
    await indianMusic.testSound();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
      const testMsg =
        playerLang === 'gu'
          ? 'ધ્વનિ ચાલુ છે!'
          : playerLang === 'mr'
          ? 'आवाज सुरू आहे!'
          : playerLang === 'hi'
          ? 'ध्वनि चालू है!'
          : 'Sound is working!';
      const testUtter = new SpeechSynthesisUtterance(testMsg);
      const voices = window.speechSynthesis.getVoices();
      const voice = selectBestVoiceForLanguage(voices, playerLang);
      if (voice) testUtter.voice = voice;
      testUtter.volume = narrationVolume;
      window.speechSynthesis.speak(testUtter);
    }
    setSoundTested(true);
    setTimeout(() => setSoundTested(false), 3500);
  };

  // 10s Skip handlers
  const handleRewind10 = () => {
    setCurrentTime((t) => Math.max(0, t - 10));
    const targetIdx = Math.max(0, currentSegmentIdx - 1);
    setCurrentSegmentIdx(targetIdx);
    if (isPlaying) {
      cancelNarration();
      speakSegment(targetIdx);
    }
  };

  const handleForward10 = () => {
    setCurrentTime((t) => Math.min(duration, t + 10));
    const targetIdx = Math.min(segments.length - 1, currentSegmentIdx + 1);
    setCurrentSegmentIdx(targetIdx);
    if (isPlaying) {
      cancelNarration();
      speakSegment(targetIdx);
    }
  };

  if (!currentStory) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Minimized Widget
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-[#06102b] text-white p-3 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center gap-3">
        <button
          onClick={onTogglePlay}
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-bold flex items-center justify-center hover:bg-amber-400 transition-colors shadow-md"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>
        <div className="max-w-[160px] cursor-pointer" onClick={() => setIsMinimized(false)}>
          <p className="text-xs font-bold truncate">
            {localized?.title || currentStory.title}
          </p>
          <p className="text-[10px] text-amber-300 truncate flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {isPlaying
                ? `${currentSpeaker}: ${playerLang.toUpperCase()}`
                : 'Paused'}
            </span>
          </p>
        </div>
        <button
          onClick={() => setIsMinimized(false)}
          className="p-1 text-slate-300 hover:text-white"
          title="Expand"
        >
          <span className="material-symbols-outlined text-[18px]">open_in_full</span>
        </button>
      </div>
    );
  }

  // Story Type Badge Icon
  const getGenreIcon = () => {
    switch (intelligence.genreType) {
      case 'historical_royal':
        return <Crown size={13} className="text-amber-400" />;
      case 'traditional_folk':
        return <Smile size={13} className="text-yellow-400" />;
      case 'animal_fable':
        return <Trees size={13} className="text-emerald-400" />;
      case 'adventure':
        return <Compass size={13} className="text-blue-400" />;
      case 'bedtime':
        return <Moon size={13} className="text-indigo-300" />;
      case 'magical_fantasy':
        return <Wand2 size={13} className="text-purple-400" />;
      case 'emotional':
        return <Heart size={13} className="text-rose-400" />;
      case 'mystery_suspense':
        return <Ghost size={13} className="text-purple-300" />;
      default:
        return <Sparkles size={13} className="text-amber-300" />;
    }
  };

  return (
    <div className="fixed bottom-4 inset-x-3 sm:inset-x-auto sm:right-6 sm:w-[520px] max-w-[96vw] z-50 bg-[#091226]/98 backdrop-blur-xl text-white p-4 sm:p-5 rounded-3xl shadow-2xl border-2 border-amber-500/40 transition-all duration-300">
      {/* Top Header Row with Status, AI Detection Badge, Sound Test & Controls */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/10 gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              isPlaying ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'
            }`}
          />
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 truncate">
            {playerLang === 'gu'
              ? 'વાર્તા સાથી (AI વાચક)'
              : playerLang === 'mr'
              ? 'कथा सखी (AI वाचक)'
              : playerLang === 'hi'
              ? 'कहानी साथी (AI वाचन)'
              : 'AI Storyteller Deck'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Automatic Story-Type Intelligence Insight Button */}
          <button
            onClick={() => setShowIntelligenceInfo(!showIntelligenceInfo)}
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
              showIntelligenceInfo
                ? 'bg-amber-500 text-slate-950 ring-1 ring-amber-300'
                : 'bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-400/30'
            }`}
            title="AI Story-Type Detection & Mood Profile"
          >
            {getGenreIcon()}
            <span className="hidden sm:inline">AI Analysis</span>
          </button>

          {/* Sound Diagnostic Helper */}
          <button
            onClick={handleTestSound}
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
              soundTested
                ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-300'
                : 'bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-400/30'
            }`}
            title="Sound Test / Unmute"
          >
            {soundTested ? <CheckCircle2 size={11} /> : <Volume2 size={11} />}
            <span>{soundTested ? 'OK!' : 'Test'}</span>
          </button>

          {/* Subtitles Toggle */}
          <button
            onClick={() => setShowCaptions(!showCaptions)}
            className={`p-1 rounded-lg transition-colors ${
              showCaptions ? 'text-amber-400 bg-white/10' : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle Live Subtitles (लाइव सबटाइटल्स)"
          >
            <Subtitles size={16} />
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            title="Minimize"
          >
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button
            onClick={() => {
              if (isPlaying) onTogglePlay();
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            title="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>

      {/* Intelligence Accordion: Automatic Story-Type Detection breakdown */}
      {showIntelligenceInfo && (
        <div className="my-2.5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5 animate-fadeIn">
          <div className="flex items-center justify-between text-amber-300 font-bold">
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>AI Story Intelligence Profile</span>
            </span>
            <span className="text-[10px] text-amber-200/80 font-mono">
              Auto Configured
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div>
              <span className="text-slate-400">Genre:</span>{' '}
              <span className="text-white font-medium">{intelligence.genre}</span>
            </div>
            <div>
              <span className="text-slate-400">Mood:</span>{' '}
              <span className="text-amber-200 font-medium">{intelligence.mood}</span>
            </div>
            <div>
              <span className="text-slate-400">Setting:</span>{' '}
              <span className="text-slate-200">{intelligence.setting}</span>
            </div>
            <div>
              <span className="text-slate-400">Target Age:</span>{' '}
              <span className="text-emerald-300 font-medium">
                {intelligence.ageGroup === 'kids_3_6'
                  ? '3-6 Yrs (Gentle & Slower)'
                  : intelligence.ageGroup === 'children_7_10'
                  ? '7-10 Yrs (Expressive)'
                  : '11-14 Yrs (Conversational)'}
              </span>
            </div>
            <div className="col-span-2 text-[10px] text-amber-200/90 pt-1 border-t border-white/10">
              <span className="font-semibold">🎵 Auto Background Music:</span>{' '}
              {intelligence.musicReason}
            </div>
          </div>
        </div>
      )}

      {/* Story Info Row */}
      <div className="flex items-center gap-3.5 py-3">
        <img
          alt={localized?.title || currentStory.title}
          src={currentStory.coverImage}
          className="w-14 h-14 rounded-xl object-cover ring-2 ring-amber-500/50 shrink-0 shadow-md"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-serif font-bold text-white truncate">
            {localized?.title || currentStory.title}
          </h4>
          <p className="text-xs text-amber-200/90 truncate">
            {currentStory.author}
          </p>
          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-300">
            <span className="flex items-center gap-1 text-amber-300 font-medium">
              {getGenreIcon()}
              <span>{intelligence.mood.split(' ')[0]}</span>
            </span>
            <span>•</span>
            <span className="text-slate-400">
              🎵 {isMusicEnabled ? ambientFx.replace('_', ' ') : 'Music Muted'}
            </span>
            <span>•</span>
            <span className="text-emerald-300 font-mono">
              Vol: {Math.round(narrationVolume * 100)}% / {Math.round(musicVolume * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Multilingual Selector directly in the Story Player */}
      <div className="flex items-center justify-between py-1 px-2 mb-2 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold shrink-0">
          <Languages size={14} />
          <span className="text-[11px]">
            {playerLang === 'gu'
              ? 'ભાષા'
              : playerLang === 'mr'
              ? 'भाषा'
              : playerLang === 'hi'
              ? 'भाषा चुनें'
              : 'Language'}
            :
          </span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
          {[
            { id: 'hi' as AppLanguage, label: 'हिन्दी', flag: '🇮🇳' },
            { id: 'en' as AppLanguage, label: 'English', flag: '🇬🇧' },
            { id: 'gu' as AppLanguage, label: 'ગુજરાતી', flag: '🇮🇳' },
            { id: 'mr' as AppLanguage, label: 'मराठी', flag: '🇮🇳' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleLanguageSwitch(item.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                playerLang === item.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white'
              }`}
            >
              <span>{item.flag}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Text + Audio Synchronization Highlighting */}
      {showCaptions && (
        <div className="bg-black/60 border border-amber-500/30 rounded-2xl p-3 my-2 text-center shadow-inner relative overflow-hidden">
          <div className="flex items-center justify-between text-[10px] text-amber-300 font-bold mb-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>
                {currentSpeaker !== 'Narrator'
                  ? `🎭 ${currentSpeaker} बोल रहे हैं`
                  : playerLang === 'gu'
                  ? 'વાર્તા વાચક'
                  : playerLang === 'mr'
                  ? 'कथा वाचक'
                  : playerLang === 'hi'
                  ? 'कहानी वाचक'
                  : 'Narrator'}
              </span>
            </span>
            <span className="text-slate-400 text-[10px]">
              {segments.length > 0
                ? `${currentSegmentIdx + 1} / ${segments.length}`
                : ''}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-amber-100 min-h-[42px] flex items-center justify-center italic px-2 leading-relaxed">
            "{currentSentence || localized?.synopsis || currentStory.synopsis}"
          </p>
        </div>
      )}

      {/* Scrubber slider */}
      <div className="space-y-1 mt-1">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={(e) => setCurrentTime(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
        />
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span className="text-amber-300/90 font-sans text-[10px] flex items-center gap-1">
            <span>
              {isPlaying
                ? playerLang === 'hi'
                  ? 'वाचन चालू है'
                  : playerLang === 'gu'
                  ? 'વાર્તા ચાલુ છે'
                  : playerLang === 'mr'
                  ? 'वाचन सुरू आहे'
                  : 'Narrating'
                : 'Paused'}
            </span>
          </span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Playback Controls: 10s Rewind, Play/Pause, 10s Forward, Speed, Music Preset */}
      <div className="flex items-center justify-between pt-2">
        {/* Playback speed: 0.75x, 1x, 1.25x, 1.5x */}
        <button
          onClick={() => {
            const speeds = [0.75, 1, 1.25, 1.5];
            const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
            setSpeed(speeds[nextIdx]);
          }}
          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-amber-300 transition-colors"
          title="Playback Speed (0.75x, 1x, 1.25x, 1.5x)"
        >
          {speed}x
        </button>

        {/* Center transport buttons with 10s skip */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleRewind10}
            className="p-2 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all flex items-center gap-0.5 text-xs font-bold active:scale-95"
            title="10s Rewind"
          >
            <span className="material-symbols-outlined text-[18px]">replay_10</span>
            <span className="text-[10px]">10s</span>
          </button>

          <button
            onClick={onTogglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold flex items-center justify-center shadow-lg transition-transform active:scale-95"
            title={isPlaying ? 'Pause Narration' : 'Play Narration'}
          >
            <span className="material-symbols-outlined text-[28px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={handleForward10}
            className="p-2 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all flex items-center gap-0.5 text-xs font-bold active:scale-95"
            title="10s Forward"
          >
            <span className="material-symbols-outlined text-[18px]">forward_10</span>
            <span className="text-[10px]">10s</span>
          </button>
        </div>

        {/* Background Music Preset Selector */}
        <div className="flex items-center gap-1">
          <select
            value={ambientFx}
            onChange={(e) => handleAmbientChange(e.target.value as MusicPreset)}
            className="bg-white/10 text-amber-300 text-xs rounded-lg px-2 py-1.5 border border-white/20 focus:outline-none cursor-pointer max-w-[130px] truncate"
            title="Story Background Music Preset"
          >
            <option value="royal_court" className="bg-slate-900 text-white">👑 राजसी दरबार (Royal)</option>
            <option value="light_folk" className="bg-slate-900 text-white">🪕 लोक संगीत (Folk)</option>
            <option value="forest_nature" className="bg-slate-900 text-white">🌳 वन व प्रकृति (Nature)</option>
            <option value="adventure_cinematic" className="bg-slate-900 text-white">🧭 साहसिक यात्रा (Adventure)</option>
            <option value="bedtime_calm" className="bg-slate-900 text-white">🌙 शयन संगीत (Bedtime)</option>
            <option value="magical_fantasy" className="bg-slate-900 text-white">✨ जादुई लोक (Fantasy)</option>
            <option value="emotional_gentle" className="bg-slate-900 text-white">❤️ भावुक राग (Emotional)</option>
            <option value="cheerful_playful" className="bg-slate-900 text-white">😄 हास्य व खुशी (Playful)</option>
            <option value="bansuri" className="bg-slate-900 text-white">🪈 बांसुरी (Bansuri)</option>
            <option value="sitar" className="bg-slate-900 text-white">🪕 सितार (Sitar)</option>
            <option value="shankh_aarti" className="bg-slate-900 text-white">🐚 शंख व आरती (Aarti)</option>
            <option value="temple" className="bg-slate-900 text-white">🔔 मंदिर (Temple)</option>
            <option value="spooky_night" className="bg-slate-900 text-white">👻 रहस्यमयी रात (Spooky)</option>
            <option value="tanpura" className="bg-slate-900 text-white">🧘 तानपुरा (Tanpura)</option>
          </select>
        </div>
      </div>

      {/* Dual Volume Sliders: Narration Volume (80-100%) & Music Volume (10-25%) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2.5 border-t border-white/10 mt-2.5">
        {/* Narration Volume */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-amber-200/90 flex items-center gap-1 shrink-0 font-medium">
            <Volume2 size={12} className="text-amber-400" />
            <span>{playerLang === 'hi' ? 'आवाज़' : 'Voice'}:</span>
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={narrationVolume}
            onChange={(e) => setNarrationVolume(Number(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <span className="text-[10px] text-slate-400 font-mono w-7 text-right">
            {Math.round(narrationVolume * 100)}%
          </span>
        </div>

        {/* Music Volume & On/Off Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleMusic}
            className={`p-0.5 rounded text-[10px] font-bold transition-colors ${
              isMusicEnabled ? 'text-amber-300' : 'text-slate-500'
            }`}
            title={isMusicEnabled ? 'Mute Background Music' : 'Enable Background Music'}
          >
            {isMusicEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
          </button>
          <span className="text-[10px] text-slate-300 shrink-0 font-medium">
            {playerLang === 'hi' ? 'संगीत' : 'Music'}:
          </span>
          <input
            type="range"
            min={0}
            max={0.5}
            step={0.02}
            disabled={!isMusicEnabled}
            value={isMusicEnabled ? musicVolume : 0}
            onChange={(e) => setMusicVolume(Number(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 disabled:opacity-40"
          />
          <span className="text-[10px] text-slate-400 font-mono w-7 text-right">
            {isMusicEnabled ? `${Math.round(musicVolume * 100)}%` : 'OFF'}
          </span>
        </div>
      </div>
    </div>
  );
};
