import { MusicPreset } from '../types';

class IndianMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentPreset: MusicPreset = 'bansuri';
  private masterGain: GainNode | null = null;
  private intervalIds: any[] = [];
  private activeNodes: (AudioNode | { stop?: () => void })[] = [];
  private customAudioEl: HTMLAudioElement | null = null;

  public async resumeAudio(): Promise<boolean> {
    try {
      this.initContext();
      if (this.ctx && this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      return this.ctx?.state === 'running';
    } catch (e) {
      console.warn('Audio resume notice:', e);
      return false;
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.45, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Play a clear audible chime to test & unlock browser audio immediately
  public async testSound(): Promise<boolean> {
    await this.resumeAudio();
    if (!this.ctx) return false;

    const now = this.ctx.currentTime;
    const notes = [587.33, 880.0]; // D5 and A5 crystal chime

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.18);

      gain.gain.setValueAtTime(0.001, now + idx * 0.18);
      gain.gain.linearRampToValueAtTime(0.4, now + idx * 0.18 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.18 + 1.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.18);
      osc.stop(now + idx * 0.18 + 1.8);
    });

    return true;
  }

  public async play(preset: MusicPreset = 'bansuri', volume: number = 0.45) {
    await this.resumeAudio();
    if (!this.ctx || !this.masterGain) return;

    this.stop();
    this.currentPreset = preset;
    this.isPlaying = true;
    this.setVolume(volume);

    switch (preset) {
      case 'tanpura':
        this.playTanpura();
        break;
      case 'bansuri':
        this.playBansuri();
        break;
      case 'sitar':
        this.playSitar();
        break;
      case 'monsoon':
        this.playMonsoon();
        break;
      case 'temple':
        this.playTempleChimes();
        break;
      case 'spooky_night':
        this.playSpookyNight();
        break;
      case 'shankh_aarti':
        this.playShankhAarti();
        break;
      case 'royal_court':
        this.playRoyalCourt();
        break;
      case 'light_folk':
        this.playLightFolk();
        break;
      case 'forest_nature':
        this.playForestNature();
        break;
      case 'adventure_cinematic':
        this.playAdventureCinematic();
        break;
      case 'bedtime_calm':
        this.playBedtimeCalm();
        break;
      case 'magical_fantasy':
        this.playMagicalFantasy();
        break;
      case 'emotional_gentle':
        this.playEmotionalGentle();
        break;
      case 'cheerful_playful':
        this.playCheerfulPlayful();
        break;
      case 'suspense_mystery':
        this.playSuspenseMystery();
        break;
      default:
        this.playBansuri();
    }
  }

  public stop() {
    this.stopCustomAudio();
    this.intervalIds.forEach((id) => clearInterval(id));
    this.intervalIds = [];

    this.activeNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof node.stop === 'function') {
          node.stop();
        }
        if ('disconnect' in node && typeof node.disconnect === 'function') {
          node.disconnect();
        }
      } catch (e) {
        // ignore
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
  }

  public playCustomAudio(audioUrl: string, volume: number = 0.25) {
    this.stop();
    try {
      const audio = new Audio(audioUrl);
      audio.loop = true;
      audio.volume = Math.max(0, Math.min(1, volume));
      audio.play().catch((e) => console.warn('Custom audio playback notice:', e));
      this.customAudioEl = audio;
      this.isPlaying = true;
    } catch (e) {
      console.warn('Custom audio load notice:', e);
    }
  }

  public stopCustomAudio() {
    if (this.customAudioEl) {
      try {
        this.customAudioEl.pause();
        this.customAudioEl.src = '';
      } catch (_) {}
      this.customAudioEl = null;
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentPreset(): MusicPreset {
    return this.currentPreset;
  }

  // 1. Tanpura: Sa - Pa - Sa meditative drone
  private playTanpura() {
    if (!this.ctx || !this.masterGain) return;

    const strings = [220.0, 293.66, 293.66, 146.83]; // Pa, Sa, Sa, Kharaj Sa
    let stringIdx = 0;

    const pluckString = (freq: number) => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 3.5, this.ctx.currentTime);
      filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.8);
    };

    pluckString(strings[0]);
    const id = setInterval(() => {
      stringIdx = (stringIdx + 1) % strings.length;
      pluckString(strings[stringIdx]);
    }, 1100);

    this.intervalIds.push(id);
  }

  // 2. Bansuri: Bamboo Flute with gentle vibrato and Raga Yaman notes
  private playBansuri() {
    if (!this.ctx || !this.masterGain) return;

    const yamanScale = [293.66, 329.63, 369.99, 415.3, 440.0, 493.88, 554.37, 587.33];
    let noteIdx = 0;

    // Gentle constant background Tanpura drone
    const drone = this.ctx.createOscillator();
    const droneGain = this.ctx.createGain();
    drone.type = 'sine';
    drone.frequency.setValueAtTime(146.83, this.ctx.currentTime);
    droneGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    drone.connect(droneGain);
    droneGain.connect(this.masterGain);
    drone.start();
    this.activeNodes.push(drone, droneGain);

    const playFluteNote = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;

      const osc = this.ctx.createOscillator();
      const vibrato = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      const gain = this.ctx.createGain();

      const freq = yamanScale[noteIdx];
      noteIdx = (noteIdx + Math.floor(Math.random() * 3) + 1) % yamanScale.length;

      vibrato.frequency.setValueAtTime(4.8, this.ctx.currentTime);
      vibratoGain.gain.setValueAtTime(freq * 0.025, this.ctx.currentTime);
      vibrato.connect(osc.frequency);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.45);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

      vibrato.start(now);
      osc.start(now);
      vibrato.stop(now + 3.3);
      osc.stop(now + 3.3);

      osc.connect(gain);
      gain.connect(this.masterGain);
    };

    playFluteNote();
    const id = setInterval(playFluteNote, 2700);
    this.intervalIds.push(id);
  }

  // 3. Sitar: Plucked string with metallic buzz and drone
  private playSitar() {
    if (!this.ctx || !this.masterGain) return;

    const ragaNotes = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33];

    const pluckSitar = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const freq = ragaNotes[Math.floor(Math.random() * ragaNotes.length)];

      const osc = this.ctx.createOscillator();
      const buzzOsc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      buzzOsc.type = 'triangle';
      buzzOsc.frequency.setValueAtTime(freq * 2.01, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);
      filter.Q.setValueAtTime(5.0, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.32, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.6);

      osc.connect(filter);
      buzzOsc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      buzzOsc.start(now);
      osc.stop(now + 2.7);
      buzzOsc.stop(now + 2.7);
    };

    pluckSitar();
    const id = setInterval(pluckSitar, 1600);
    this.intervalIds.push(id);
  }

  // 4. Monsoon Rain & Ghungroo
  private playMonsoon() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
    this.activeNodes.push(noise, filter, gain);

    const playGhungroo = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(1480 + Math.random() * 250, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      chimeGain.gain.setValueAtTime(0.001, now);
      chimeGain.gain.linearRampToValueAtTime(0.08, now + 0.04);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.masterGain);
      chimeOsc.start(now);
      chimeOsc.stop(now + 1.3);
    };

    const id = setInterval(playGhungroo, 3000);
    this.intervalIds.push(id);
  }

  // 5. Temple Chimes: Singing bowl & peaceful brass bell
  private playTempleChimes() {
    if (!this.ctx || !this.masterGain) return;

    const bellNotes = [587.33, 739.99, 880.0, 1174.66];

    const strikeBowl = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const note = bellNotes[Math.floor(Math.random() * bellNotes.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 4.8);
    };

    strikeBowl();
    const id = setInterval(strikeBowl, 3200);
    this.intervalIds.push(id);
  }

  // 6. Spooky Night (भूतिया रात): Eerie wind whistle, tension drone, cricket flutter
  private playSpookyNight() {
    if (!this.ctx || !this.masterGain) return;

    // Low tension drone
    const darkDrone = this.ctx.createOscillator();
    const darkGain = this.ctx.createGain();
    darkDrone.type = 'sawtooth';
    darkDrone.frequency.setValueAtTime(73.42, this.ctx.currentTime); // D2 low ominous drone

    const lowFilter = this.ctx.createBiquadFilter();
    lowFilter.type = 'lowpass';
    lowFilter.frequency.setValueAtTime(160, this.ctx.currentTime);

    darkGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    darkDrone.connect(lowFilter);
    lowFilter.connect(darkGain);
    darkGain.connect(this.masterGain);
    darkDrone.start();
    this.activeNodes.push(darkDrone, darkGain, lowFilter);

    // Whistling wind sweep
    const playWindGust = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;

      const windOsc = this.ctx.createOscillator();
      const windGain = this.ctx.createGain();
      const windFilter = this.ctx.createBiquadFilter();

      windOsc.type = 'triangle';
      const baseFreq = 220 + Math.random() * 80;
      windOsc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);

      // Pitch sweep up and down like ghostly wind
      const now = this.ctx.currentTime;
      windOsc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 1.5);
      windOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + 3.5);

      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(baseFreq, now);
      windFilter.Q.setValueAtTime(8.0, now);

      windGain.gain.setValueAtTime(0.001, now);
      windGain.gain.linearRampToValueAtTime(0.18, now + 1.2);
      windGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

      windOsc.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(this.masterGain);

      windOsc.start(now);
      windOsc.stop(now + 4.0);
    };

    playWindGust();
    const id = setInterval(playWindGust, 4200);
    this.intervalIds.push(id);
  }

  // 7. Shankh & Aarti (शंख व महाआरती): Divine sacred blast & rhythmic brass temple bells
  private playShankhAarti() {
    if (!this.ctx || !this.masterGain) return;

    // Sacred Shankh tone
    const blowShankh = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;

      const shankhOsc = this.ctx.createOscillator();
      const shankhGain = this.ctx.createGain();
      shankhOsc.type = 'sawtooth';

      const baseShankh = 220; // A3
      const now = this.ctx.currentTime;
      shankhOsc.frequency.setValueAtTime(baseShankh * 0.9, now);
      shankhOsc.frequency.linearRampToValueAtTime(baseShankh, now + 0.3);
      shankhOsc.frequency.setValueAtTime(baseShankh * 1.25, now + 1.5); // soaring octave fifth

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);
      filter.Q.setValueAtTime(4.0, now);

      shankhGain.gain.setValueAtTime(0.001, now);
      shankhGain.gain.linearRampToValueAtTime(0.28, now + 0.4);
      shankhGain.gain.exponentialRampToValueAtTime(0.001, now + 4.0);

      shankhOsc.connect(filter);
      filter.connect(shankhGain);
      shankhGain.connect(this.masterGain);

      shankhOsc.start(now);
      shankhOsc.stop(now + 4.2);
    };

    // Rhythmic Aarti Bell
    const ringAartiBell = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;

      const bellFreqs = [880.0, 1046.5];
      bellFreqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const bell = this.ctx.createOscillator();
        const bellG = this.ctx.createGain();
        bell.type = 'sine';
        bell.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const now = this.ctx.currentTime + idx * 0.12;
        bellG.gain.setValueAtTime(0.001, now);
        bellG.gain.linearRampToValueAtTime(0.15, now + 0.02);
        bellG.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        bell.connect(bellG);
        bellG.connect(this.masterGain);
        bell.start(now);
        bell.stop(now + 1.3);
      });
    };

    blowShankh();
    const idShankh = setInterval(blowShankh, 6000);
    const idBell = setInterval(ringAartiBell, 1400);
    this.intervalIds.push(idShankh, idBell);
  }

  // 8. Royal Court (राजसी दरबार): Majestic Shehnai & Santoor notes with grand Tanpura (Akbar-Birbal)
  private playRoyalCourt() {
    if (!this.ctx || !this.masterGain) return;

    // Majestic Tanpura Kharaj drone
    const drone = this.ctx.createOscillator();
    const droneGain = this.ctx.createGain();
    drone.type = 'sawtooth';
    drone.frequency.setValueAtTime(146.83, this.ctx.currentTime); // D3
    const droneFilter = this.ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(320, this.ctx.currentTime);

    droneGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    drone.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.masterGain);
    drone.start();
    this.activeNodes.push(drone, droneGain, droneFilter);

    // Royal Santoor & Shehnai notes (Raga Darbari/Bhairavi regal motifs)
    const royalNotes = [293.66, 329.63, 349.23, 440.0, 493.88, 523.25, 587.33];
    let noteIndex = 0;

    const playRoyalMelody = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const freq = royalNotes[noteIndex];
      noteIndex = (noteIndex + 1 + Math.floor(Math.random() * 2)) % royalNotes.length;

      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      oscHarmonic.type = 'sawtooth';
      oscHarmonic.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

      osc.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + 2.5);
      oscHarmonic.stop(now + 2.5);
    };

    playRoyalMelody();
    const id = setInterval(playRoyalMelody, 2100);
    this.intervalIds.push(id);
  }

  // 9. Light Folk (पारंपरिक लोक संगीत): Bouncy acoustic strings and playful rhythm (Tenali Raman)
  private playLightFolk() {
    if (!this.ctx || !this.masterGain) return;

    const folkNotes = [329.63, 369.99, 440.0, 493.88, 554.37, 659.25]; // E major folk pentatonic

    const pluckFolkString = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const freq = folkNotes[Math.floor(Math.random() * folkNotes.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 1.5, this.ctx.currentTime);
      filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.3);
    };

    pluckFolkString();
    const id = setInterval(pluckFolkString, 950);
    this.intervalIds.push(id);
  }

  // 10. Forest Nature (वन व प्रकृति): Gentle birds chirp, rustling leaves, wooden bamboo flute (Animals/Panchatantra)
  private playForestNature() {
    if (!this.ctx || !this.masterGain) return;

    // Gentle breeze pink noise
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }
    const breeze = this.ctx.createBufferSource();
    breeze.buffer = buffer;
    breeze.loop = true;

    const breezeFilter = this.ctx.createBiquadFilter();
    breezeFilter.type = 'lowpass';
    breezeFilter.frequency.setValueAtTime(450, this.ctx.currentTime);

    const breezeGain = this.ctx.createGain();
    breezeGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    breeze.connect(breezeFilter);
    breezeFilter.connect(breezeGain);
    breezeGain.connect(this.masterGain);
    breeze.start();
    this.activeNodes.push(breeze, breezeFilter, breezeGain);

    // Sweet bird chirp
    const chirpBird = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const birdOsc = this.ctx.createOscillator();
      const birdGain = this.ctx.createGain();
      birdOsc.type = 'sine';

      const baseFreq = 2200 + Math.random() * 800;
      const now = this.ctx.currentTime;

      birdOsc.frequency.setValueAtTime(baseFreq, now);
      birdOsc.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 0.08);
      birdOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.18);

      birdGain.gain.setValueAtTime(0.001, now);
      birdGain.gain.linearRampToValueAtTime(0.08, now + 0.02);
      birdGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      birdOsc.connect(birdGain);
      birdGain.connect(this.masterGain);

      birdOsc.start(now);
      birdOsc.stop(now + 0.25);
    };

    // Soft wooden flute note
    const playForestFlute = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const pentatonic = [349.23, 392.0, 440.0, 523.25, 587.33];
      const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];

      const flute = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      flute.type = 'triangle';
      flute.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

      flute.connect(gain);
      gain.connect(this.masterGain);

      flute.start(now);
      flute.stop(now + 2.5);
    };

    playForestFlute();
    const idFlute = setInterval(playForestFlute, 3200);
    const idBird = setInterval(chirpBird, 2400);
    this.intervalIds.push(idFlute, idBird);
  }

  // 11. Adventure Cinematic (साहसिक यात्रा): Heroic pulse, cinematic Indian strings, driving energy
  private playAdventureCinematic() {
    if (!this.ctx || !this.masterGain) return;

    // Rhythmic adventurous pulse
    const pulseChord = [146.83, 220.0, 293.66]; // D-A-D heroic chord

    const triggerPulse = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      pulseChord.forEach((freq) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.95);
      });
    };

    triggerPulse();
    const id = setInterval(triggerPulse, 1000);
    this.intervalIds.push(id);
  }

  // 12. Bedtime Calm (शयन समय / शांति): Very soft, relaxing lullaby chime & soothing warm drone
  private playBedtimeCalm() {
    if (!this.ctx || !this.masterGain) return;

    // Gentle warm calming hum
    const hum = this.ctx.createOscillator();
    const humGain = this.ctx.createGain();
    hum.type = 'sine';
    hum.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 soft drone
    humGain.gain.setValueAtTime(0.09, this.ctx.currentTime);

    hum.connect(humGain);
    humGain.connect(this.masterGain);
    hum.start();
    this.activeNodes.push(hum, humGain);

    // Slow lullaby music box notes
    const lullabyNotes = [329.63, 392.0, 440.0, 493.88, 587.33, 659.25];
    let noteIdx = 0;

    const playLullabyNote = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const freq = lullabyNotes[noteIdx];
      noteIdx = (noteIdx + 1) % lullabyNotes.length;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.3);
    };

    playLullabyNote();
    const id = setInterval(playLullabyNote, 3000);
    this.intervalIds.push(id);
  }

  // 13. Magical Fantasy (जादुई संसार): Ethereal fairy chimes and shimmering starlight harmonics
  private playMagicalFantasy() {
    if (!this.ctx || !this.masterGain) return;

    const fairyScale = [587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66];

    const playSparkle = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const freq = fairyScale[Math.floor(Math.random() * fairyScale.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 2.3);
    };

    playSparkle();
    const id = setInterval(playSparkle, 1300);
    this.intervalIds.push(id);
  }

  // 14. Emotional Gentle (भावुक व हृदयस्पर्शी): Tender warm melody, slow and touching
  private playEmotionalGentle() {
    if (!this.ctx || !this.masterGain) return;

    const emotionalScale = [220.0, 261.63, 293.66, 329.63, 392.0, 440.0];
    let step = 0;

    const playTenderNote = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const freq = emotionalScale[step % emotionalScale.length];
      step++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.2);
    };

    playTenderNote();
    const id = setInterval(playTenderNote, 2800);
    this.intervalIds.push(id);
  }

  // 15. Cheerful Playful (हंसमुख व नटखट): Bright, bouncy, joyful notes for comedy & funny stories
  private playCheerfulPlayful() {
    if (!this.ctx || !this.masterGain) return;

    const playfulScale = [392.0, 440.0, 493.88, 523.25, 587.33, 659.25];

    const bounceNote = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const freq = playfulScale[Math.floor(Math.random() * playfulScale.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.75);
    };

    bounceNote();
    const id = setInterval(bounceNote, 700);
    this.intervalIds.push(id);
  }

  // 16. Suspense Mystery (रहस्यमयी सस्पेंस): Quiet suspense, soft footsteps, mysterious atmosphere
  private playSuspenseMystery() {
    if (!this.ctx || !this.masterGain) return;

    // Heartbeat pulse
    const heartbeat = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.45);
    };

    heartbeat();
    const id = setInterval(heartbeat, 1800);
    this.intervalIds.push(id);
  }
}

export const indianMusic = new IndianMusicEngine();
