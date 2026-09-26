import React, { useState, useEffect } from 'react';
import { Story } from '../types';

interface AudioPlayerDrawerProps {
  currentStory: Story | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const AudioPlayerDrawer: React.FC<AudioPlayerDrawerProps> = ({
  currentStory,
  isPlaying,
  onTogglePlay,
  onClose,
}) => {
  const [currentTime, setCurrentTime] = useState(462); // 7:42
  const [speed, setSpeed] = useState(1);
  const [ambientFx, setAmbientFx] = useState<'none' | 'rain' | 'hearth' | 'clock'>('rain');
  const [isMinimized, setIsMinimized] = useState(false);

  const duration = currentStory?.audioNarration?.durationMinutes
    ? currentStory.audioNarration.durationMinutes * 60
    : 1680; // 28 mins

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, duration]);

  if (!currentStory) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-[#06102b] text-white p-3 rounded-2xl shadow-2xl border border-[#be8222]/30 flex items-center gap-3">
        <button
          onClick={onTogglePlay}
          className="w-10 h-10 rounded-full bg-[#be8222] text-white flex items-center justify-center hover:bg-[#feb956] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>
        <div className="max-w-[150px] cursor-pointer" onClick={() => setIsMinimized(false)}>
          <p className="text-xs font-bold truncate">{currentStory.title}</p>
          <p className="text-[10px] text-[#838cae] truncate">
            {currentStory.audioNarration?.narrator || 'Stephen Fry'}
          </p>
        </div>
        <button
          onClick={() => setIsMinimized(false)}
          className="p-1 text-[#838cae] hover:text-white"
          title="Expand Player"
        >
          <span className="material-symbols-outlined text-[18px]">open_in_full</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-8 md:w-[480px] z-50 bg-[#06102b]/95 backdrop-blur-xl text-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-[#be8222]/40 transition-all duration-300">
      {/* Top Header Row */}
      <div className="flex items-center justify-between pb-2 border-b border-[#1c2541]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#feb956] animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#dbe1ff]">
            High Master Spatial Audio
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[#838cae]">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 hover:text-white transition-colors"
            title="Minimize"
          >
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:text-white transition-colors"
            title="Close Audio"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>

      {/* Story Info Row */}
      <div className="flex items-center gap-3.5 py-3">
        <img
          alt={currentStory.title}
          src={currentStory.coverImage}
          className="w-13 h-13 rounded-lg object-cover ring-1 ring-[#be8222]/40 shrink-0 shadow-md"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-serif font-bold text-white truncate">
            {currentStory.title}
          </h4>
          <p className="text-xs text-[#dbe1ff] truncate">
            Narrated by {currentStory.audioNarration?.narrator || 'Stephen Fry'}
          </p>
          <span className="text-[10px] text-[#838cae]">
            Binaural Acoustics • Chapter 1
          </span>
        </div>
      </div>

      {/* Visualizer Waveform Bar */}
      <div className="w-full h-8 flex items-end gap-1 px-1 py-1 bg-black/40 rounded-lg overflow-hidden my-1">
        {Array.from({ length: 36 }).map((_, i) => {
          const height = isPlaying
            ? Math.max(15, (Math.sin(i * 0.4 + currentTime) * 0.5 + 0.5) * 100)
            : 20;
          const isPassed = (i / 36) * duration < currentTime;
          return (
            <div
              key={i}
              className={`w-full rounded-full transition-all duration-200 ${
                isPassed ? 'bg-[#feb956]' : 'bg-[#838cae]/40'
              }`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      {/* Scrubber slider */}
      <div className="space-y-1 mt-1">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={(e) => setCurrentTime(Number(e.target.value))}
          className="w-full h-1 bg-[#1c2541] rounded-lg appearance-none cursor-pointer accent-[#feb956]"
        />
        <div className="flex items-center justify-between text-[11px] text-[#838cae] font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Playback Controls */}
      <div className="flex items-center justify-between pt-2">
        {/* Speed toggle */}
        <button
          onClick={() => {
            const nextSpeed = speed === 1 ? 1.25 : speed === 1.25 ? 1.5 : 1;
            setSpeed(nextSpeed);
          }}
          className="px-2 py-1 rounded bg-[#1c2541] hover:bg-[#ffe9e7]/10 text-xs font-mono font-semibold text-[#dbe1ff] transition-colors"
          title="Playback Speed"
        >
          {speed}x
        </button>

        {/* Center transport buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTime((t) => Math.max(0, t - 15))}
            className="p-1 text-[#838cae] hover:text-white transition-colors"
            title="Rewind 15s"
          >
            <span className="material-symbols-outlined text-[22px]">replay_10</span>
          </button>
          <button
            onClick={onTogglePlay}
            className="w-11 h-11 rounded-full bg-[#be8222] hover:bg-[#feb956] text-white hover:text-[#1d0f00] flex items-center justify-center shadow-lg transition-transform active:scale-95"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <span className="material-symbols-outlined text-[26px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <button
            onClick={() => setCurrentTime((t) => Math.min(duration, t + 30))}
            className="p-1 text-[#838cae] hover:text-white transition-colors"
            title="Forward 30s"
          >
            <span className="material-symbols-outlined text-[22px]">forward_30</span>
          </button>
        </div>

        {/* Ambient background effect selector */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              const modes: Array<'none' | 'rain' | 'hearth' | 'clock'> = ['none', 'rain', 'hearth', 'clock'];
              const idx = modes.indexOf(ambientFx);
              setAmbientFx(modes[(idx + 1) % modes.length]);
            }}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
              ambientFx !== 'none'
                ? 'bg-[#be8222]/20 text-[#feb956] border border-[#be8222]/40'
                : 'bg-[#1c2541] text-[#838cae]'
            }`}
            title="Layered Ambient Room SFX"
          >
            <span className="material-symbols-outlined text-[14px]">
              {ambientFx === 'rain' ? 'rainy' : ambientFx === 'hearth' ? 'fireplace' : ambientFx === 'clock' ? 'hourglass_top' : 'volume_off'}
            </span>
            <span className="capitalize">{ambientFx === 'none' ? 'Pure Voice' : ambientFx}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
