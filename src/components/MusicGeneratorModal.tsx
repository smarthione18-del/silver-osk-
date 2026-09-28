import React, { useState, useRef, useEffect } from 'react';
import { AppLanguage, Story } from '../types';
import {
  X,
  Music,
  Play,
  Pause,
  Download,
  Sparkles,
  Volume2,
  Clock,
  Radio,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sliders,
  Layers,
} from 'lucide-react';
import { indianMusic } from '../utils/indianMusic';

export interface GeneratedMusicTrack {
  id: string;
  prompt: string;
  model: 'lyria-3-clip-preview' | 'lyria-3-pro-preview';
  audioUrl: string;
  mimeType: string;
  lyrics?: string;
  createdAt: string;
}

interface MusicGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: AppLanguage;
  currentStory?: Story | null;
  onApplyBackgroundMusic?: (audioUrl: string, trackTitle: string) => void;
}

export const MusicGeneratorModal: React.FC<MusicGeneratorModalProps> = ({
  isOpen,
  onClose,
  language,
  currentStory,
  onApplyBackgroundMusic,
}) => {
  const [modelType, setModelType] = useState<'clip' | 'pro'>('clip');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tracks, setTracks] = useState<GeneratedMusicTrack[]>(() => {
    try {
      const saved = localStorage.getItem('lyria_saved_tracks');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [];
  });
  const [currentTrack, setCurrentTrack] = useState<GeneratedMusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [appliedNotice, setAppliedNotice] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync currentStory to prompt if prompt is empty
  useEffect(() => {
    if (isOpen && !prompt && currentStory) {
      setPrompt(
        `Traditional Indian acoustic soundtrack for story "${currentStory.title}". Warm santoor, gentle bansuri flute, meditative tanpura drone, and soft rhythmic tabla.`
      );
    }
  }, [isOpen, currentStory]);

  // Audio player events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  if (!isOpen) return null;

  const isHindi = language === 'hi';
  const isGujarati = language === 'gu';
  const isMarathi = language === 'mr';

  const presets = [
    {
      title: isHindi
        ? '👑 अकबर-बीरबल शाही दरबार'
        : isGujarati
        ? '👑 અકબર-બીરબલ શાહી દરબાર'
        : isMarathi
        ? '👑 अकबर-बिरबल राजदरबार'
        : '👑 Akbar-Birbal Royal Court',
      prompt:
        'Majestic Indian royal court instrumental with regal shehnai, acoustic santoor, resonant tanpura drone, and subtle tabla rhythm.',
      model: 'clip' as const,
    },
    {
      title: isHindi
        ? '🎭 तेनालीराम हास्य व चातुर्य'
        : isGujarati
        ? '🎭 તેનાલીરામ ચતુર સૂર'
        : isMarathi
        ? '🎭 तेनालीरामन चातुर्य सूर'
        : '🎭 Tenali Raman Playful Wits',
      prompt:
        'Lighthearted playful South Indian classical instrumental with veena, bamboo flute, bouncing mridangam rhythm, and cheerful melody.',
      model: 'clip' as const,
    },
    {
      title: isHindi
        ? '🌙 शांत शयनकाल बांसुरी (Bedtime)'
        : isGujarati
        ? '🌙 શાંત સૂવાની વાંસળી (Bedtime)'
        : isMarathi
        ? '🌙 शांत निद्रा बासरी (Bedtime)'
        : '🌙 Soothing Bedtime Bansuri',
      prompt:
        'Ultra-calming soothing ambient bedtime music with delicate bansuri flute, warm soft drone, quiet chimes, and slow peaceful lullaby cadence.',
      model: 'pro' as const,
    },
    {
      title: isHindi
        ? '🐾 पंचतंत्र जंगल और प्रकृति'
        : isGujarati
        ? '🐾 પંચતંત્ર જંગલ અને પ્રકૃતિ'
        : isMarathi
        ? '🐾 पंचतंत्र जंगल आणि निसर्ग'
        : '🐾 Panchatantra Forest Nature',
      prompt:
        'Atmospheric enchanted Indian forest sounds with whispering sitar, flowing stream acoustic textures, gentle birdsong, and serene melody.',
      model: 'clip' as const,
    },
    {
      title: isHindi
        ? '⚔️ सिनेमाई ऐतिहासिक गाथा (Epic)'
        : isGujarati
        ? '⚔️ સિનેમેટિક ઐતિહાસિક વાર્તા'
        : isMarathi
        ? '⚔️ सिनेमॅटिक ऐतिहासिक गाथा'
        : '⚔️ Cinematic Indian Epic Score',
      prompt:
        'Grand cinematic storytelling score with thunderous pakhawaj, soaring bansuri melodies, dramatic orchestral strings, and deep resonant brass.',
      model: 'pro' as const,
    },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setErrorMessage(null);

    const chosenModel = modelType === 'pro' ? 'lyria-3-pro-preview' : 'lyria-3-clip-preview';

    try {
      const res = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          model: chosenModel,
          storyTitle: currentStory?.title,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Music generation failed. Please try again.');
      }

      // Convert base64 to Blob URL
      const byteChars = atob(data.audioBase64);
      const byteNumbers = new Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: data.mimeType || 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);

      const newTrack: GeneratedMusicTrack = {
        id: Date.now().toString(),
        prompt: prompt.trim(),
        model: chosenModel,
        audioUrl,
        mimeType: data.mimeType || 'audio/wav',
        lyrics: data.lyrics,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const updated = [newTrack, ...tracks];
      setTracks(updated);
      try {
        localStorage.setItem('lyria_saved_tracks', JSON.stringify(updated.slice(0, 10)));
      } catch (_) {}

      setCurrentTrack(newTrack);

      // Play immediately
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err?.message ||
          'Failed to generate audio. Make sure Lyria model access is available.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleApplyAsBackground = () => {
    if (!currentTrack) return;
    indianMusic.playCustomAudio(currentTrack.audioUrl, 0.25);
    if (onApplyBackgroundMusic) {
      onApplyBackgroundMusic(currentTrack.audioUrl, currentTrack.prompt.slice(0, 30));
    }
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 3500);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#fffdfa] dark:bg-slate-900 text-[#1c2541] dark:text-slate-100 w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-amber-500/40 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-4 px-6 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center text-xl shadow-inner">
              🎵
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg font-serif tracking-wide leading-tight">
                  {isHindi
                    ? 'AI संगीत रचनाकार (Lyria AI Music)'
                    : isGujarati
                    ? 'AI સંગીત નિર્માતા (Lyria AI Music)'
                    : isMarathi
                    ? 'AI संगीत निर्माता (Lyria AI Music)'
                    : 'AI Music Studio (Lyria Models)'}
                </h3>
                <span className="bg-amber-300 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Lyria 3
                </span>
              </div>
              <p className="text-xs text-amber-100">
                {isHindi
                  ? 'अपनी कहानी के लिए मौलिक भारतीय शास्त्रीय व लोक संगीत बनाएं'
                  : 'Compose authentic background soundtracks for any story with Lyria AI'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            aria-label="Close music generator"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} />

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Model Selector Card */}
          <div className="bg-amber-50/70 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-amber-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <Sliders size={13} />
                {isHindi ? 'संगीत मॉडल चुनें:' : 'Select Lyria Engine:'}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {modelType === 'clip' ? 'lyria-3-clip-preview' : 'lyria-3-pro-preview'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setModelType('clip')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  modelType === 'clip'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-amber-200 dark:border-slate-700 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                  <span>⚡ 30s Short Clip</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/10 text-inherit font-mono">
                    Clip
                  </span>
                </div>
                <p className={`text-[11px] mt-1 ${modelType === 'clip' ? 'text-amber-100' : 'text-slate-500'}`}>
                  {isHindi
                    ? 'त्वरित 30 सेकंड का बैकग्राउंड म्यूजिक क्लिप'
                    : 'Fast 30-second soundtrack clip for stories'}
                </p>
              </button>

              <button
                type="button"
                onClick={() => setModelType('pro')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  modelType === 'pro'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-amber-200 dark:border-slate-700 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                  <span>🎼 Full-Length Track</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/10 text-inherit font-mono">
                    Pro
                  </span>
                </div>
                <p className={`text-[11px] mt-1 ${modelType === 'pro' ? 'text-amber-100' : 'text-slate-500'}`}>
                  {isHindi
                    ? 'विस्तृत पूर्ण लंबाई की सिनेमाई पृष्ठभूमि धुन'
                    : 'Full-length immersive musical composition'}
                </p>
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-600" />
                {isHindi ? 'कहानी के आधार पर तैयार सुझाव:' : 'Story-Ready Musical Presets:'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPrompt(item.prompt);
                    setModelType(item.model);
                  }}
                  className="text-xs px-2.5 py-1.5 bg-amber-50 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 border border-amber-200 dark:border-slate-700 rounded-lg text-amber-900 dark:text-amber-300 transition-colors"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {isHindi ? 'संगीत का विवरण (Music Prompt):' : 'Soundtrack Description & Instruments:'}
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Peaceful Indian classical bansuri and santoor lullaby with soft tanpura drone for bedtime storytelling..."
              className="w-full p-3 bg-white dark:bg-slate-900 border border-amber-300 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-300 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Generate Button */}
          <button
            type="button"
            disabled={isGenerating || !prompt.trim()}
            onClick={handleGenerate}
            className={`w-full py-3 px-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md transition-all ${
              isGenerating || !prompt.trim()
                ? 'bg-amber-300 cursor-not-allowed text-slate-700'
                : 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 active:scale-[0.99]'
            }`}
          >
            {isGenerating ? (
              <>
                <Radio className="animate-spin" size={17} />
                <span>
                  {modelType === 'pro'
                    ? 'Composing Full Track with Lyria Pro...'
                    : 'Generating 30s Soundtrack with Lyria Clip...'}
                </span>
              </>
            ) : (
              <>
                <Music size={17} />
                <span>
                  {isHindi
                    ? 'संगीत बनाएं (Generate with Lyria)'
                    : `Generate Music (${modelType === 'pro' ? 'Lyria Pro' : 'Lyria Clip'})`}
                </span>
              </>
            )}
          </button>

          {/* Active Audio Player if a track is generated */}
          {currentTrack && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/80 p-4 rounded-2xl border-2 border-amber-400/60 shadow-md space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
                    🎵
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-amber-950 dark:text-amber-200 line-clamp-1">
                      {currentTrack.prompt}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      Model: {currentTrack.model} • {currentTrack.createdAt}
                    </span>
                  </div>
                </div>
                <a
                  href={currentTrack.audioUrl}
                  download="story-soundtrack.wav"
                  className="p-2 bg-white dark:bg-slate-700 hover:bg-amber-100 rounded-xl text-amber-800 dark:text-amber-200 border border-amber-200 transition-colors"
                  title="Download WAV"
                >
                  <Download size={15} />
                </a>
              </div>

              {/* Scrubber & Controls */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center shadow-sm shrink-0"
                >
                  {isPlaying ? <Pause size={17} /> : <Play size={17} className="ml-0.5" />}
                </button>

                <div className="flex-1 space-y-1">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = Number(e.target.value);
                      }
                    }}
                    className="w-full accent-amber-600 cursor-pointer h-1.5 bg-amber-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>

              {/* Actions: Apply as background music */}
              <div className="pt-2 border-t border-amber-200/80 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleApplyAsBackground}
                  className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <CheckCircle2 size={13} />
                  <span>
                    {isHindi
                      ? 'कहानी में बैकग्राउंड संगीत के रूप में बजाएं'
                      : 'Set as Story Background Music'}
                  </span>
                </button>

                {appliedNotice && (
                  <span className="text-xs text-emerald-700 font-semibold animate-in fade-in">
                    ✓ Applied to story playback!
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Past Generated Tracks History */}
          {tracks.length > 1 && (
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Layers size={13} />
                {isHindi ? 'पूर्व में तैयार किए गए संगीत ट्रैक:' : 'Your Created Soundtracks:'}
              </span>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {tracks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setCurrentTrack(t);
                      if (audioRef.current) {
                        audioRef.current.src = t.audioUrl;
                        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                      currentTrack?.id === t.id
                        ? 'bg-amber-100/70 border-amber-400 dark:bg-slate-800'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Music size={13} className="text-amber-600 shrink-0" />
                      <span className="truncate font-medium">{t.prompt}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono ml-2">
                      {t.model.includes('pro') ? 'Pro' : '30s'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
