import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  X,
  BookOpen,
  MessageCircle,
  HelpCircle,
  StopCircle,
  RefreshCw,
  CheckCircle2,
  Play,
  Languages,
} from 'lucide-react';
import { Story, AppLanguage } from '../types';
import { indianMusic } from '../utils/indianMusic';
import {
  analyzeStoryIntelligence,
  getLocalizedStoryContent,
  selectBestVoiceForLanguage,
} from '../utils/storytellerEngine';

interface StorySaathiVoiceAgentProps {
  isOpen: boolean;
  onClose: () => void;
  currentStory?: Story | null;
  language?: AppLanguage;
  onSelectStory?: (story: Story) => void;
  onPlayAudio?: (story: Story) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export const StorySaathiVoiceAgent: React.FC<StorySaathiVoiceAgentProps> = ({
  isOpen,
  onClose,
  currentStory,
  language = 'hi',
  onPlayAudio,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [activeLang, setActiveLang] = useState<AppLanguage>(language);
  const [currentCaption, setCurrentCaption] = useState<string>('');
  const [soundTested, setSoundTested] = useState(false);

  const recognitionRef = useRef<any>(null);
  const isStartedRef = useRef<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Analyze story intelligence
  const intelligence = currentStory ? analyzeStoryIntelligence(currentStory) : null;

  // Sync active language from props
  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  // Check speech recognition support once on mount
  useEffect(() => {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setSpeechSupported(!!SpeechRecognitionClass);
  }, []);

  // Cleanup speech & listening on unmount
  useEffect(() => {
    return () => {
      stopListening();
      stopSpeaking();
    };
  }, []);

  // Stop listening if modal closes or active language changes
  useEffect(() => {
    stopListening();
  }, [activeLang, isOpen]);

  // Set greeting when opening or switching story or language
  useEffect(() => {
    if (isOpen) {
      const loc = currentStory ? getLocalizedStoryContent(currentStory, activeLang, 0) : null;
      const storyName = loc?.title || currentStory?.title || null;

      let greetingText = '';
      if (activeLang === 'gu') {
        greetingText = storyName
          ? `નમસ્તે! 🙏 હું તમારી 'વાર્તા સાથી' છું. અત્યારે આપણે "${storyName}" જોઈ રહ્યા છીએ. તમને આ વાર્તા, પાત્રો કે શીખ વિશે શું જાણવું છે? બોલીને કે લખીને પૂછો!`
          : `નમસ્તે! 🙏 હું તમારી વાર્તા સાથી છું. આપણી પાસે પંચતંત્ર, અકબર-બીરબલ અને તેનાલીરામની સુંદર વાર્તાઓ છે. તમને જે પણ પૂછવું હોય તે પૂછી શકો છો!`;
      } else if (activeLang === 'mr') {
        greetingText = storyName
          ? `नमस्कार! 🙏 मी तुमची 'कथा सखी' आहे. आपण आता "${storyName}" ही गोष्ट पाहत आहोत. तुम्हाला या कथेबद्दल, पात्रांबद्दल किंवा शिकवणीबद्दल काय जाणून घ्यायचे आहे? विचारून पहा!`
          : `नमस्कार! 🙏 मी तुमची कथा सखी आहे. आपल्याकडे पंचतंत्र, तेनालीरामन आणि अकबर-बिरबल यांच्या सुंदर गोष्टी आहेत. काहीही विचारा!`;
      } else if (activeLang === 'hi') {
        greetingText = storyName
          ? `नमस्ते! 🙏 मैं आपकी 'कहानी साथी' हूँ। अभी हम "${storyName}" देख रहे हैं। आपको इस कहानी, इसके पात्रों या सीख के बारे में क्या समझना है? मुझसे बोलकर या लिखकर पूछिए!`
          : `नमस्ते! 🙏 मैं आपकी 'कहानी साथी' हूँ। हमारे पास पंचतंत्र, तेनालीराम, अकबर-बिरबल और विश्व की सुंदर कहानियाँ हैं। आप मुझसे कुछ भी पूछ या समझ सकते हैं!`;
      } else {
        greetingText = storyName
          ? `Namaste! 🙏 I am your Story Saathi (Voice Companion). We are exploring "${storyName}". What would you like to understand about this book, characters, or moral? Speak or type your question!`
          : `Namaste! 🙏 I am your Story Saathi. Ask me to explain any story, characters, moral, or read aloud for you!`;
      }

      setMessages([
        {
          id: 'welcome',
          sender: 'agent',
          text: greetingText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [isOpen, currentStory?.id, activeLang]);

  // Scroll to bottom of message list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Safely stop any running SpeechRecognition session
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
      } catch (_) {
        // ignore
      }
      recognitionRef.current = null;
    }
    isStartedRef.current = false;
    setIsListening(false);
  };

  // Safely start SpeechRecognition with fresh instance preventing "already started" errors
  const startListening = () => {
    stopSpeaking();
    stopListening();

    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = false;

      if (activeLang === 'gu') recognition.lang = 'gu-IN';
      else if (activeLang === 'mr') recognition.lang = 'mr-IN';
      else if (activeLang === 'hi') recognition.lang = 'hi-IN';
      else recognition.lang = 'en-IN';

      recognition.onstart = () => {
        isStartedRef.current = true;
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setInputQuestion(transcript);
          handleSend(transcript);
        }
        isStartedRef.current = false;
        setIsListening(false);
      };

      recognition.onerror = (err: any) => {
        if (err?.error && err.error !== 'no-speech' && err.error !== 'aborted') {
          console.warn('Speech recognition notice:', err.error);
        }
        isStartedRef.current = false;
        setIsListening(false);
      };

      recognition.onend = () => {
        isStartedRef.current = false;
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      isStartedRef.current = true;
      setIsListening(true);
    } catch (e: any) {
      if (e?.message?.includes('already started') || e?.name === 'InvalidStateError') {
        isStartedRef.current = true;
        setIsListening(true);
      } else {
        console.warn('Mic start notice:', e);
        isStartedRef.current = false;
        setIsListening(false);
      }
    }
  };

  const toggleMicListening = () => {
    if (!speechSupported) {
      return;
    }

    if (isListening || isStartedRef.current) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Speak aloud function using Web Speech Synthesis with natural prosody
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      setCurrentCaption(text);
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();

      const bestVoice = selectBestVoiceForLanguage(voices, activeLang);
      if (bestVoice) {
        utterance.voice = bestVoice;
        utterance.lang = bestVoice.lang;
      } else {
        utterance.lang = activeLang === 'hi' ? 'hi-IN' : activeLang === 'gu' ? 'gu-IN' : activeLang === 'mr' ? 'mr-IN' : 'en-IN';
      }

      utterance.rate = 0.92;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        console.warn('Voice agent speech notice:', e);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
      setIsSpeaking(false);
    }
  };

  const handleTestVoiceAudio = async () => {
    await indianMusic.testSound();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
      const testMsg =
        activeLang === 'gu'
          ? 'નમસ્તે! મારી અવાજ ચાલુ છે.'
          : activeLang === 'mr'
          ? 'नमस्कार! माझा आवाज सुरू आहे.'
          : activeLang === 'hi'
          ? 'नमस्ते! मेरी आवाज़ चालू है।'
          : 'Namaste! Story Saathi voice is active.';
      speakText(testMsg);
    }
    setSoundTested(true);
    setTimeout(() => setSoundTested(false), 3000);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentCaption('');
    }
  };


  const handleSend = async (customQuery?: string) => {
    const query = (customQuery || inputQuestion).trim();
    if (!query || isLoading) return;

    stopSpeaking();
    setInputQuestion('');

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const loc = currentStory ? getLocalizedStoryContent(currentStory, activeLang, 0) : null;
      const contextContent = currentStory
        ? `${loc?.title || currentStory.title}. ${loc?.synopsis || currentStory.synopsis}. ${
            loc?.chapterContent || currentStory.chapters?.[0]?.content || ''
          }. Moral: ${loc?.moral || currentStory.moral || ''}`
        : 'Indian folklore, Panchatantra stories, moral tales, and world classics.';

      const res = await fetch('/api/voice-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          storyTitle: loc?.title || currentStory?.title || 'Story',
          storyContent: contextContent,
          language: activeLang,
        }),
      });

      const data = await res.json();
      const reply =
        data.answer ||
        (activeLang === 'gu'
          ? 'માફ કરશો, હું સમજી ન શકી. શું તમે ફરીથી પૂછી શકો છો?'
          : activeLang === 'mr'
          ? 'माफ करा, मला समजले नाही. तुम्ही पुन्हा विचारू शकता का?'
          : 'माफ़ कीजिए, मैं समझ नहीं पाई। क्या आप दोबारा पूछ सकते हैं?');

      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, agentMsg]);
      speakText(reply);
    } catch (err) {
      console.error(err);
      const fallbackReply =
        activeLang === 'gu'
          ? 'આ વાર્તા આપણને ધીરજ, સચ્ચાઈ અને બુદ્ધિથી કામ લેવાની સુંદર શીખ આપે છે.'
          : activeLang === 'mr'
          ? 'ही कथा आपल्याला संयम, सत्य आणि बुद्धीने संकटावर मात करण्याची शिकवण देते.'
          : activeLang === 'hi'
          ? 'यह कहानी हमें सच्चाई, धैर्य और बुद्धि से काम लेने की सीख देती है। हमेशा भलाई के रास्ते पर चलें।'
          : 'This story teaches us patience, wisdom, and truthfulness. Doing good always brings light.';

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      speakText(fallbackReply);
    } finally {
      setIsLoading(false);
    }
  };

  // 1-Tap Read Story Aloud with Voice
  const handleReadStoryAloud = () => {
    if (!currentStory) return;
    const loc = getLocalizedStoryContent(currentStory, activeLang, 0);

    const announcement =
      activeLang === 'gu'
        ? `હું તમારા માટે "${loc.title}" વાંચી રહી છું. શાંતિથી સાંભળો:`
        : activeLang === 'mr'
        ? `मी तुमच्यासाठी "${loc.title}" ही कथा वाचून दाखवत आहे. लक्षपूर्वक ऐका:`
        : activeLang === 'hi'
        ? `मैं आपके लिए "${loc.title}" पढ़कर सुना रही हूँ। ध्यान से सुनिए:`
        : `I am reading "${loc.title}" aloud for you. Listen gently:`;

    const fullStoryScript = `${loc.title}। ${loc.synopsis}। ${loc.chapterContent}। ${loc.moral}`;

    const readMsg: Message = {
      id: Date.now().toString(),
      sender: 'agent',
      text: announcement,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, readMsg]);
    speakText(`${announcement} ${fullStoryScript}`);
  };

  if (!isOpen) return null;

  const loc = currentStory ? getLocalizedStoryContent(currentStory, activeLang, 0) : null;
  const isHindi = activeLang === 'hi';

  const quickPrompts =
    activeLang === 'gu'
      ? [
          '🌟 આ વાર્તાની શીખ (Moral) શું છે?',
          '📖 સરળ શબ્દોમાં સમજાવો',
          '👧 બાળકો માટે આમાં શું સંદેશ છે?',
          '❓ મુખ્ય પાત્રો કોણ છે?',
        ]
      : activeLang === 'mr'
      ? [
          '🌟 या कथेची शिकवण (Moral) काय आहे?',
          '📖 सोप्या भाषेत कथा सांगा',
          '👧 मुलांसाठी काय शिकवण आहे?',
          '❓ मुख्य पात्रे कोण आहेत?',
        ]
      : isHindi
      ? [
          '🌟 इस कहानी की सीख (Moral) क्या है?',
          '📖 आसान शब्दों में समझाइए',
          '👧 बच्चों के लिए मुख्य बात क्या है?',
          '❓ मुख्य पात्र कौन हैं और क्या हुआ?',
        ]
      : [
          '🌟 What is the moral of this story?',
          '📖 Explain the plot simply',
          '👧 What does it teach children?',
          '❓ Who are the main characters?',
        ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#fffdfa] text-[#1c2541] w-full max-w-xl rounded-3xl shadow-2xl border-2 border-amber-500/40 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header with Saathi identity and Language toggle */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-4 px-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center text-2xl shadow-inner">
                🧕
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg leading-tight font-serif tracking-wide">
                  {activeLang === 'gu'
                    ? 'વાર્તા સાથી (દીદી)'
                    : activeLang === 'mr'
                    ? 'कथा सखी (दीदी)'
                    : isHindi
                    ? 'कहानी साथी (दीदी)'
                    : 'Story Saathi (Voice Companion)'}
                </h3>
                <span className="bg-amber-300 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  AI Voice
                </span>
              </div>
              <p className="text-xs text-amber-100">
                {activeLang === 'gu'
                  ? 'બોલો અને સાંભળો • વાર્તા સરળતાથી સમજો'
                  : activeLang === 'mr'
                  ? 'बोला आणि ऐका • कथा सहज समजून घ्या'
                  : isHindi
                  ? 'बोलिए और सुनिए • किताब को आसानी से समझें'
                  : 'Speak & Listen • Understand any story easily'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Audio Test & Unmute Button */}
            <button
              onClick={handleTestVoiceAudio}
              className={`px-2 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
                soundTested
                  ? 'bg-emerald-400 text-slate-950 ring-2 ring-white'
                  : 'bg-white/20 hover:bg-white/30 text-amber-100 border border-white/40'
              }`}
              title="Sound Test / Unmute"
            >
              {soundTested ? <CheckCircle2 size={12} /> : <Volume2 size={12} />}
              <span>{soundTested ? 'OK' : 'Test'}</span>
            </button>

            <button
              onClick={() => {
                stopListening();
                stopSpeaking();
                onClose();
              }}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
              aria-label="Close voice agent"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Multilingual Selector Strip */}
        <div className="bg-amber-800 text-white px-4 py-1.5 flex items-center justify-between text-xs border-b border-amber-700/60">
          <span className="flex items-center gap-1.5 text-amber-200 font-medium">
            <Languages size={13} />
            <span>
              {activeLang === 'gu'
                ? 'ભાષા પસંદ કરો:'
                : activeLang === 'mr'
                ? 'भाषा निवडा:'
                : isHindi
                ? 'भाषा चुनें:'
                : 'Language:'}
            </span>
          </span>
          <div className="flex items-center gap-1">
            {[
              { id: 'hi' as AppLanguage, label: 'हिन्दी' },
              { id: 'en' as AppLanguage, label: 'English' },
              { id: 'gu' as AppLanguage, label: 'ગુજરાતી' },
              { id: 'mr' as AppLanguage, label: 'मराठी' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveLang(item.id)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                  activeLang === item.id
                    ? 'bg-amber-300 text-slate-950 font-bold shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Subtitles Strip when speaking */}
        {(isSpeaking || currentCaption) && (
          <div className="bg-amber-950 text-amber-200 px-4 py-2 border-b border-amber-800 text-xs flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="font-bold text-[11px] text-amber-400 shrink-0">
                {isHindi ? 'लाइव सबटाइटल्स:' : 'Live Caption:'}
              </span>
              <span className="truncate italic text-white text-[12px]">{currentCaption}</span>
            </div>
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="text-[10px] font-bold bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 rounded-full shrink-0"
              >
                Stop
              </button>
            )}
          </div>
        )}

        {/* Current Story Context Card with Intelligence and Launch Player */}
        {currentStory && (
          <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 truncate">
              <BookOpen size={15} className="text-amber-700 shrink-0" />
              <span className="text-amber-900 font-semibold truncate">
                {loc?.title || currentStory.title}
              </span>
              {intelligence && (
                <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-medium">
                  {intelligence.mood.split(' ')[0]}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleReadStoryAloud}
                className="flex items-center gap-1 px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium text-[11px] shadow-sm transition-all"
                title="Read aloud via voice agent"
              >
                <Volume2 size={12} />
                <span>{isHindi ? 'सुनाएं' : 'Read'}</span>
              </button>

              {onPlayAudio && (
                <button
                  onClick={() => {
                    onPlayAudio(currentStory);
                    onClose();
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-lg font-bold text-[11px] shadow-sm transition-all"
                  title="Start Full Audio Narration + Background Music Deck"
                >
                  <Play size={12} fill="currentColor" />
                  <span>{isHindi ? '▶ संगीत सहित सुनें' : '▶ Narration + Music'}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Conversation Message List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fefcf8]">
          {messages.map((m) => {
            const isAgent = m.sender === 'agent';
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 ${isAgent ? 'justify-start' : 'justify-end'}`}
              >
                {isAgent && (
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm shrink-0 mt-0.5 shadow-sm">
                    🧕
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-sm leading-relaxed ${
                    isAgent
                      ? 'bg-white text-slate-800 border border-amber-100 rounded-tl-none'
                      : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-tr-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <div className="mt-2 flex items-center justify-between gap-2 pt-1 border-t border-black/5 text-[10px] opacity-75">
                    <span>{m.timestamp}</span>
                    {isAgent && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => speakText(m.text)}
                          className="hover:text-amber-600 flex items-center gap-0.5 font-medium underline"
                        >
                          <Volume2 size={12} />
                          <span>{isHindi ? 'आवाज़ सुनें' : 'Listen'}</span>
                        </button>
                        {isSpeaking && (
                          <button
                            onClick={stopSpeaking}
                            className="text-red-600 hover:text-red-700 flex items-center gap-0.5 font-medium"
                          >
                            <StopCircle size={12} />
                            <span>Stop</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {!isAgent && (
                  <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                    👤
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2.5 justify-start items-center">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm shrink-0">
                🧕
              </div>
              <div className="bg-white border border-amber-200 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-2 text-xs text-amber-800">
                <RefreshCw size={14} className="animate-spin text-amber-600" />
                <span>
                  {activeLang === 'gu'
                    ? 'દીદી સુંદર ઉત્તર તૈયાર કરી રહી છે...'
                    : activeLang === 'mr'
                    ? 'दीदी सुंदर उत्तर तयार करत आहेत...'
                    : isHindi
                    ? 'दीदी सोच रही हैं और सुंदर जवाब बना रही हैं...'
                    : 'Story Saathi is preparing your explanation...'}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="p-2.5 bg-amber-50/70 border-t border-amber-200/50">
          <p className="text-[11px] text-amber-900 font-semibold mb-1.5 flex items-center gap-1">
            <Sparkles size={12} className="text-amber-600" />
            <span>
              {activeLang === 'gu'
                ? 'ઝડપી પ્રશ્નો (ટૅપ કરો):'
                : activeLang === 'mr'
                ? 'जलद प्रश्न (टॅप करा):'
                : isHindi
                ? 'झटपट सवाल (टैप करें):'
                : 'Quick Questions (Tap to ask):'}
            </span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-xs bg-white hover:bg-amber-100 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-full shadow-2xs transition-all active:scale-95"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar with big Microphone for Speaking */}
        <div className="p-3 bg-white border-t border-amber-200/80 flex items-center gap-2">
          {/* Big Voice Button */}
          <button
            onClick={toggleMicListening}
            className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all shrink-0 ${
              isListening
                ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.7)] animate-pulse ring-4 ring-red-200'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-md'
            }`}
            title={
              isListening
                ? 'Listening... Tap to stop'
                : 'Tap to speak your question'
            }
          >
            {isListening ? <MicOff size={22} /> : <Mic size={22} />}
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder={
                isListening
                  ? activeLang === 'gu'
                    ? 'સાંભળી રહી છું... તમે બોલો...'
                    : activeLang === 'mr'
                    ? 'ऐकत आहे... बोला...'
                    : isHindi
                    ? 'सुन रही हूँ... आप बोलिए...'
                    : 'Listening... please speak...'
                  : activeLang === 'gu'
                  ? 'અહીં બોલો અથવા પ્રશ્ન લખો...'
                  : activeLang === 'mr'
                  ? 'येथे बोला किंवा प्रश्न टाइप करा...'
                  : isHindi
                  ? 'यहाँ बोलें या सवाल टाइप करें...'
                  : 'Speak or type your question...'
              }
              className="w-full pl-3.5 pr-10 py-3 bg-[#fdfaf5] border border-amber-300 rounded-full text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {inputQuestion && (
              <button
                onClick={() => handleSend()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center transition-transform active:scale-90"
              >
                <Send size={15} />
              </button>
            )}
          </div>

          {/* Stop audio button if speaking */}
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors shrink-0"
              title="Stop voice playback"
            >
              <VolumeX size={15} />
              <span className="hidden sm:inline">Stop</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
