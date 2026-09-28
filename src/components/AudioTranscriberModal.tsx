import React, { useState, useRef, useEffect } from 'react';
import { AppLanguage } from '../types';
import {
  X,
  Mic,
  MicOff,
  Upload,
  Copy,
  Check,
  Sparkles,
  Volume2,
  FileAudio,
  Radio,
  Clock,
  Play,
  Pause,
  AlertCircle,
  MessageSquare,
  BookOpen,
  RotateCcw,
} from 'lucide-react';

interface AudioTranscriberModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: AppLanguage;
  onSendToVoiceAgent?: (text: string) => void;
  onSearchStoryWithText?: (text: string) => void;
}

interface TranscriptionItem {
  id: string;
  transcript: string;
  timestamp: string;
  audioUrl?: string;
  durationSec?: number;
}

export const AudioTranscriberModal: React.FC<AudioTranscriberModalProps> = ({
  isOpen,
  onClose,
  language,
  onSendToVoiceAgent,
  onSearchStoryWithText,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState<string>('');
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<TranscriptionItem[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Timer while recording
  useEffect(() => {
    if (isRecording) {
      setRecordDuration(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isRecording]);

  // Clean up media recorder and audio on close or unmount
  useEffect(() => {
    return () => {
      stopRecordingImmediate();
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isHindi = language === 'hi';
  const isGujarati = language === 'gu';
  const isMarathi = language === 'mr';

  const stopRecordingImmediate = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (_) {}
    }
    setIsRecording(false);
  };

  const startRecording = async () => {
    setErrorMessage(null);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Stop all audio tracks to turn off hardware mic light
        stream.getTracks().forEach((track) => track.stop());

        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorder.mimeType || 'audio/webm',
        });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);

        // Auto transcribe the recorded audio
        await transcribeBlob(audioBlob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err: any) {
      console.error('Microphone error:', err);
      setErrorMessage(
        'Unable to access microphone. Please grant mic permission in your browser or upload an audio file.'
      );
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setRecordedAudioUrl(url);
    transcribeBlob(file);
  };

  const transcribeBlob = async (blob: Blob) => {
    setIsTranscribing(true);
    setErrorMessage(null);

    try {
      // Convert blob to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          const res = reader.result as string;
          resolve(res);
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(blob);
      const dataUrl = await base64Promise;

      const res = await fetch('/api/transcribe-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64: dataUrl,
          mimeType: blob.type || 'audio/webm',
          prompt:
            'Transcribe the audio faithfully with proper punctuation and formatting. Support multilingual Indian speech in Hindi, Gujarati, Marathi, or English accurately.',
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Transcription failed.');
      }

      const text = data.transcript || '';
      setCurrentTranscript(text);

      const newItem: TranscriptionItem = {
        id: Date.now().toString(),
        transcript: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        audioUrl: recordedAudioUrl || undefined,
        durationSec: recordDuration,
      };
      setHistory((prev) => [newItem, ...prev]);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Error occurred during audio transcription.');
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleCopy = () => {
    if (!currentTranscript) return;
    navigator.clipboard.writeText(currentTranscript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const togglePreviewPlay = () => {
    if (!previewAudioRef.current || !recordedAudioUrl) return;
    if (isPlayingAudio) {
      previewAudioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      previewAudioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => {});
    }
  };

  const formatSecs = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#fffdfa] dark:bg-slate-900 text-[#1c2541] dark:text-slate-100 w-full max-w-xl rounded-3xl shadow-2xl border-2 border-amber-500/40 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-4 px-6 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center text-xl shadow-inner">
              🎙️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg font-serif tracking-wide leading-tight">
                  {isHindi
                    ? 'ध्वनि ट्रांसक्रिप्शन (Audio Transcribe)'
                    : isGujarati
                    ? 'ઑડિયો ટ્રાંસ્ક્રાઇબર (Audio Transcribe)'
                    : isMarathi
                    ? 'ऑडिओ ट्रान्सक्रिप्शन (Audio Transcribe)'
                    : 'Audio Transcriber (gemini-3.5-transcribe)'}
                </h3>
                <span className="bg-amber-300 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Gemini 3.5
                </span>
              </div>
              <p className="text-xs text-amber-100">
                {isHindi
                  ? 'माइक से बोलें या ऑडियो अपलोड करें — सटीक पाठ में बदलें'
                  : 'Speak into your microphone or upload audio to transcribe with gemini-3.5-transcribe'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopRecordingImmediate();
              if (previewAudioRef.current) previewAudioRef.current.pause();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            aria-label="Close transcriber"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hidden Audio Player for Preview */}
        {recordedAudioUrl && (
          <audio
            ref={previewAudioRef}
            src={recordedAudioUrl}
            onEnded={() => setIsPlayingAudio(false)}
          />
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Microphone Interactive Record Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/80 p-5 rounded-3xl border border-amber-200 dark:border-slate-700 text-center space-y-3">
            <div className="flex flex-col items-center justify-center gap-2">
              {/* Big Record Button */}
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isTranscribing}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                  isRecording
                    ? 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.7)] animate-pulse ring-8 ring-red-200'
                    : 'bg-gradient-to-tr from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white shadow-lg active:scale-95'
                }`}
                title={isRecording ? 'Click to Stop & Transcribe' : 'Click to Record Microphone'}
              >
                {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
              </button>

              {/* Status and Timer */}
              {isRecording ? (
                <div className="space-y-1 animate-in fade-in">
                  <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span>{isHindi ? 'रिकॉर्डिंग चालू है...' : 'Recording Live...'}</span>
                    <span className="font-mono text-base ml-1">{formatSecs(recordDuration)}</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {isHindi
                      ? 'रोकने और ट्रांसक्राइब करने के लिए बटन दबाएं'
                      : 'Tap button again when done to transcribe'}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {isHindi ? 'माइक से बोलना शुरू करें' : 'Tap to Start Speaking'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {isHindi
                      ? 'हिंदी, अंग्रेजी, गुजराती, मराठी में बोलें'
                      : 'Speak in English, Hindi, Gujarati, or Marathi'}
                  </p>
                </div>
              )}
            </div>

            {/* Alternative: File Upload button */}
            {!isRecording && (
              <div className="pt-2 border-t border-amber-200/60 dark:border-slate-700/60 flex items-center justify-center gap-2">
                <span className="text-xs text-slate-400 font-medium">or</span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-slate-600 border border-amber-300 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <Upload size={13} />
                  <span>{isHindi ? 'ऑडियो फ़ाइल अपलोड करें' : 'Upload Audio File'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Transcribing Indicator */}
          {isTranscribing && (
            <div className="p-4 bg-amber-100/70 dark:bg-slate-800 border border-amber-300 dark:border-slate-700 rounded-2xl flex items-center justify-center gap-3 text-amber-900 dark:text-amber-200 animate-pulse">
              <Radio className="animate-spin text-amber-600" size={19} />
              <div className="text-xs sm:text-sm font-semibold">
                <span>Transcribing audio with model </span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-300">
                  gemini-3.5-transcribe
                </span>
                <span>...</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-300 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Current Transcript Result Display */}
          {currentTranscript && (
            <div className="space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-amber-600" />
                  {isHindi ? 'सटीक ट्रांसक्रिप्शन परिणाम:' : 'Transcription Result:'}
                </span>

                <div className="flex items-center gap-1.5">
                  {recordedAudioUrl && (
                    <button
                      type="button"
                      onClick={togglePreviewPlay}
                      className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-slate-700 hover:bg-amber-200 text-amber-900 dark:text-amber-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      {isPlayingAudio ? <Pause size={12} /> : <Play size={12} />}
                      <span>{isPlayingAudio ? 'Pause' : 'Play Audio'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Transcript Box */}
              <div className="p-4 bg-white dark:bg-slate-900 border border-amber-300 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-slate-100 text-sm leading-relaxed shadow-inner max-h-48 overflow-y-auto font-sans">
                {currentTranscript}
              </div>

              {/* Action Buttons to connect with Story Saathi Voice Agent or Search */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {onSendToVoiceAgent && (
                  <button
                    type="button"
                    onClick={() => {
                      onSendToVoiceAgent(currentTranscript);
                      onClose();
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <MessageSquare size={13} />
                    <span>
                      {isHindi
                        ? 'कहानी साथी से पूछें (Ask Voice Saathi)'
                        : 'Ask Story Saathi Voice Agent'}
                    </span>
                  </button>
                )}

                {onSearchStoryWithText && (
                  <button
                    type="button"
                    onClick={() => {
                      onSearchStoryWithText(currentTranscript);
                      onClose();
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center gap-1.5 border border-amber-300 dark:border-slate-600 transition-colors"
                  >
                    <BookOpen size={13} />
                    <span>{isHindi ? 'कहानियों में खोजें' : 'Search in Stories'}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* History of transcripts */}
          {history.length > 1 && (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {isHindi ? 'हालिया ट्रांसक्रिप्शन इतिहास:' : 'Recent Transcriptions:'}
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {history.slice(1).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setCurrentTranscript(item.transcript)}
                    className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs hover:border-amber-300 cursor-pointer transition-colors"
                  >
                    <p className="line-clamp-2 text-slate-700 dark:text-slate-300">{item.transcript}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                      {item.timestamp}
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
