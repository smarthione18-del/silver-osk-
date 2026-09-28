import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles, CheckCircle2 } from 'lucide-react';
import { indianMusic } from '../utils/indianMusic';
import { MusicPreset, AppLanguage } from '../types';

interface IndianMusicBarProps {
  language?: AppLanguage;
  autoStart?: boolean;
  onOpenMusicGenerator?: () => void;
}

export const IndianMusicBar: React.FC<IndianMusicBarProps> = ({
  language = 'hi',
  onOpenMusicGenerator,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [preset, setPreset] = useState<MusicPreset>('bansuri');
  const [volume, setVolume] = useState<number>(0.45);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [soundTested, setSoundTested] = useState(false);

  const presets: { id: MusicPreset; nameEn: string; nameHi: string; icon: string; descEn: string; descHi: string }[] = [
    {
      id: 'bansuri',
      nameEn: 'Bansuri Flute',
      nameHi: 'मधुर बांसुरी (राग यमन)',
      icon: '🪈',
      descEn: 'Gentle bamboo flute melodies in Raga Yaman',
      descHi: 'मन को शांत करने वाली मधुर बांसुरी',
    },
    {
      id: 'royal_court',
      nameEn: 'Royal Court',
      nameHi: 'राजसी दरबार (अकबर-बीरबल)',
      icon: '👑',
      descEn: 'Regal Santoor, Shehnai and grand Tanpura',
      descHi: 'शाही दरबार व अकबर-बीरबल की कथाओं के लिए संगीत',
    },
    {
      id: 'light_folk',
      nameEn: 'Light Folk Wit',
      nameHi: 'पारंपरिक लोक संगीत (तेनालीराम)',
      icon: '🪕',
      descEn: 'Playful bouncing strings and cheerful trill',
      descHi: 'तेनालीराम व हास्य-कथाओं के लिए चपल लोक संगीत',
    },
    {
      id: 'forest_nature',
      nameEn: 'Forest & Birds',
      nameHi: 'वन, पक्षी व प्रकृति (पंचतंत्र)',
      icon: '🌳',
      descEn: 'Chirping birds, soft breeze, and wooden flute',
      descHi: 'पंचतंत्र व पशु-पक्षियों की कथाओं के लिए प्राकृतिक संगीत',
    },
    {
      id: 'adventure_cinematic',
      nameEn: 'Adventure Cinematic',
      nameHi: 'साहसिक यात्रा व शौर्य',
      icon: '🧭',
      descEn: 'Driving cinematic pulse and heroic strings',
      descHi: 'साहसिक और खोजपूर्ण कहानियों के लिए ऊर्जावान धुन',
    },
    {
      id: 'bedtime_calm',
      nameEn: 'Bedtime Calm',
      nameHi: 'शयन समय / शांति',
      icon: '🌙',
      descEn: 'Soft calming lullaby chime and soothing drone',
      descHi: 'बच्चों को मीठी नींद दिलाने वाली मधुर लोरी',
    },
    {
      id: 'magical_fantasy',
      nameEn: 'Magical Fantasy',
      nameHi: 'जादुई संसार व कल्पना',
      icon: '✨',
      descEn: 'Sparkling fairy chimes and celestial harmonics',
      descHi: 'अद्भुत जादुई लोक व परियों की कल्पना',
    },
    {
      id: 'emotional_gentle',
      nameEn: 'Emotional Gentle',
      nameHi: 'भावुक व हृदयस्पर्शी राग',
      icon: '❤️',
      descEn: 'Tender, slow, touching melodic phrase',
      descHi: 'हृदय को छू लेने वाली करुणा व वात्सल्य की धुन',
    },
    {
      id: 'cheerful_playful',
      nameEn: 'Cheerful & Playful',
      nameHi: 'हंसमुख व नटखट हास्य',
      icon: '😄',
      descEn: 'Bouncy, cheerful joyful notes for comedy',
      descHi: 'मजेदार व गुदगुदाने वाली कहानियों के लिए संगीत',
    },
    {
      id: 'suspense_mystery',
      nameEn: 'Mystery Suspense',
      nameHi: 'रहस्यमयी सस्पेंस',
      icon: '🕯️',
      descEn: 'Soft heartbeat pulse and eerie wind',
      descHi: 'विक्रम-बेताल व रहस्यमयी पहेलियों के लिए सस्पेंस',
    },
    {
      id: 'shankh_aarti',
      nameEn: 'Shankh & Aarti Chimes',
      nameHi: 'शंख व महाआरती घंटियां',
      icon: '🪔',
      descEn: 'Sacred conch blast and holy temple brass bells',
      descHi: 'पवित्र शंखनाद और पूजा की आरती घंटियां',
    },
    {
      id: 'spooky_night',
      nameEn: 'Spooky Midnight Wind',
      nameHi: 'भूतिया रात व सायं-सायं हवा',
      icon: '👻',
      descEn: 'Eerie whistling wind & cricket echoes for ghost lore',
      descHi: 'चुड़ैल और डायन की कहानियों के लिए रहस्यमयी धुन',
    },
    {
      id: 'tanpura',
      nameEn: 'Tanpura Drone',
      nameHi: 'तानपुरा ध्यान',
      icon: '🪕',
      descEn: 'Soothing meditative Sa-Pa drone harmonics',
      descHi: 'गहरे ध्यान और एकाग्रता के लिए तानपुरा',
    },
    {
      id: 'sitar',
      nameEn: 'Acoustic Sitar',
      nameHi: 'सितार झंकार',
      icon: '🎶',
      descEn: 'Classic sympathetic strings resonance',
      descHi: 'भारतीय शास्त्रीय सितार की गूंज',
    },
    {
      id: 'monsoon',
      nameEn: 'Monsoon Rain & Bells',
      nameHi: 'सावन की रिमझिम व घुंघरू',
      icon: '🌧️',
      descEn: 'Atmospheric Indian monsoon with ankle bells',
      descHi: 'बरसात की बूंदें और मंदिर के घुंघरू',
    },
    {
      id: 'temple',
      nameEn: 'Temple Singing Bowls',
      nameHi: 'मंदिर की घंटियाँ व नाद',
      icon: '🔔',
      descEn: 'Tibetan singing bowl and peaceful brass chime',
      descHi: 'पवित्र वातावरण और शांत घंटे की ध्वनि',
    },
  ];

  const handleTogglePlay = async () => {
    if (isPlaying) {
      indianMusic.stop();
      setIsPlaying(false);
    } else {
      const vol = isMuted ? 0 : volume;
      await indianMusic.play(preset, vol);
      setIsPlaying(true);
    }
  };

  const handleSelectPreset = async (newPreset: MusicPreset) => {
    setPreset(newPreset);
    if (isPlaying) {
      indianMusic.stop();
      await indianMusic.play(newPreset, isMuted ? 0 : volume);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (isMuted && newVol > 0) setIsMuted(false);
    indianMusic.setVolume(newVol);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      indianMusic.setVolume(volume);
    } else {
      setIsMuted(true);
      indianMusic.setVolume(0);
    }
  };

  const handleTestAudio = async () => {
    await indianMusic.testSound();
    setSoundTested(true);
    setTimeout(() => setSoundTested(false), 3000);
  };

  useEffect(() => {
    return () => {
      indianMusic.stop();
    };
  }, []);

  const isHindi = language === 'hi';
  const activePresetInfo = presets.find((p) => p.id === preset) || presets[0];

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm sm:max-w-md transition-all duration-300">
      <div className="bg-[#1c2541]/95 text-white rounded-2xl shadow-2xl border border-amber-500/30 backdrop-blur-md p-3 px-4">
        {/* Main Controls Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Play/Pause Button with animated ring */}
          <button
            onClick={handleTogglePlay}
            className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all shrink-0 ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse'
                : 'bg-white/10 hover:bg-white/20 text-amber-300'
            }`}
            title={isPlaying ? (isHindi ? 'संगीत रोकें' : 'Pause Music') : (isHindi ? 'पृष्ठभूमि संगीत चालू करें' : 'Play Background Music')}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </button>

          {/* Active Preset Info & Wave Animation */}
          <div
            className="flex-1 min-w-0 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-base">{activePresetInfo.icon}</span>
              <span className="font-semibold text-xs text-amber-300 truncate">
                {isHindi ? activePresetInfo.nameHi : activePresetInfo.nameEn}
              </span>
              {isPlaying && (
                <span className="flex items-end gap-0.5 h-3 ml-1 shrink-0">
                  <span className="w-0.5 h-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-0.5 h-2 bg-amber-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 h-3 bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-300 truncate">
              {isPlaying
                ? (isHindi ? 'सुरीला शांत संगीत बज रहा है • टैप करें' : 'Playing soothing raga • tap to tune')
                : (isHindi ? 'कहानियों के साथ मधुर संगीत सुनें' : 'Tap to choose instruments')}
            </p>
          </div>

          {/* Volume Mute, Sound Test & Expand Toggle */}
          <div className="flex items-center gap-1 shrink-0">
            {/* 1-Click Audio Test Bell */}
            <button
              onClick={handleTestAudio}
              className={`p-1.5 rounded-lg transition-colors text-[10px] font-bold flex items-center gap-0.5 ${
                soundTested ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-300' : 'text-amber-300 hover:bg-white/10'
              }`}
              title={isHindi ? 'आवाज़ परीक्षण करें (घंटी बजाएं)' : 'Test sound bell'}
            >
              {soundTested ? <CheckCircle2 size={14} /> : <span>🔔</span>}
            </button>

            <button
              onClick={handleToggleMute}
              className="p-1.5 text-slate-300 hover:text-amber-400 transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[11px] font-medium text-amber-200 transition-colors"
            >
              {isExpanded ? (isHindi ? 'बंद' : 'Hide') : (isHindi ? 'बदलें' : 'Raga')}
            </button>
          </div>
        </div>

        {/* Expanded Drawer for Raga/Instrument Selection */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-white/10 space-y-3">
            <div>
              <div className="flex items-center justify-between text-[11px] text-amber-300/90 mb-1.5 font-medium">
                <span className="flex items-center gap-1">
                  <Sparkles size={12} />
                  {isHindi ? 'वाद्य यंत्र व माहौल चुनें (Select Instrument & Vibe)' : 'Select Instrument & Ambience'}
                </span>
                {onOpenMusicGenerator && (
                  <button
                    onClick={onOpenMusicGenerator}
                    className="text-[10px] px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-bold hover:scale-105 transition-transform flex items-center gap-1 shadow-xs"
                    title="Lyria AI से नया संगीत बनाएं"
                  >
                    <span>🎵 Lyria AI Music</span>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {presets.map((item) => {
                  const isSelected = item.id === preset;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectPreset(item.id)}
                      className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-amber-500/25 border border-amber-400 text-white shadow-sm'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent text-slate-300'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold leading-tight text-white">
                          {isHindi ? item.nameHi : item.nameEn}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {isHindi ? item.descHi : item.descEn}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Volume slider & Diagnostic */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-300 shrink-0">
                {isHindi ? 'आवाज़:' : 'Vol:'}
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span className="text-[10px] text-amber-300 w-8 text-right font-mono">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
              <button
                onClick={handleTestAudio}
                className="px-2 py-0.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] rounded font-bold shrink-0"
              >
                {isHindi ? 'टेस्ट' : 'Test'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
