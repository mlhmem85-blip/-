/**
 * Web Audio API synthesizer for romantic ambient music and sound effects.
 * Requires no external audio files, works completely offline and reliably.
 */

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private chordIndex: number = 0;

  // Romantic chord frequencies (Hz) - lush voicing
  // Chord 1: Cmaj9 (C3, G3, B3, E4, D5)
  // Chord 2: Am9 (A2, E3, G3, C4, B4)
  // Chord 3: Fmaj7#11 (F2, C3, A3, E4, B4)
  // Chord 4: Gadd9 (G2, D3, B3, F#4, A4)
  // Chord 5: Em9 (E2, B2, G3, D4, F#4)
  private readonly chords: number[][] = [
    [130.81, 196.00, 246.94, 329.63, 587.33], // Cmaj9
    [110.00, 164.81, 196.00, 261.63, 493.88], // Am9
    [87.31, 130.81, 220.00, 329.63, 493.88],  // Fmaj7#11
    [98.00, 146.83, 246.94, 369.99, 440.00],  // Gadd9
    [82.41, 123.47, 196.00, 293.66, 369.99],  // Em9
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;
    this.playNextChord();
  }

  private playNextChord() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const chord = this.chords[this.chordIndex];
    this.chordIndex = (this.chordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;
    const duration = 6.5; // slow, dreamy romantic pace

    // Play pad + bell notes
    chord.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;

      // Warm Sine/Triangle Pad
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = i === 0 ? 'sine' : i % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600 + i * 200, now);
      filter.Q.setValueAtTime(1.5, now);

      // Gentle attack and long romantic decay
      const peak = 0.05 / (i + 1);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(peak, now + 2.0);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);

      // Subtle celestial sparkle note on higher register
      if (i >= 3) {
        const chimeOsc = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(freq * 2, now + 0.8 + i * 0.4);

        chimeGain.gain.setValueAtTime(0.0001, now + 0.8 + i * 0.4);
        chimeGain.gain.linearRampToValueAtTime(0.02, now + 1.0 + i * 0.4);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0 + i * 0.4);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(this.masterGain);

        chimeOsc.start(now + 0.8 + i * 0.4);
        chimeOsc.stop(now + 3.2 + i * 0.4);
      }
    });

    this.timerId = window.setTimeout(() => {
      if (this.isPlaying) {
        this.playNextChord();
      }
    }, 5500);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.0);
      setTimeout(() => {
        if (!this.isPlaying && this.masterGain && this.ctx) {
          this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        }
      }, 1100);
    }
  }

  public playHeartSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.65);
  }

  public playWaxSealBreak() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Gentle soft harp cascade
    [440, 554.37, 659.25, 880].forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.85);
    });
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();
