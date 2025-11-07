import { Injectable } from '@angular/core';

type SpeechTone = 'pride' | 'shame' | 'neutral';

@Injectable()
export class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    if ('speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      // Some browsers load voices asynchronously.
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = this.loadVoices;
      }
    } else {
      console.warn('ATHENEA: Speech Synthesis API no soportada. El informe de voz será silenciado.');
    }
  }

  private loadVoices = () => {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (voices.length === 0) return;

    // Prefer a specific, more robotic/authoritative Spanish voice if available
    this.voice = voices.find(v => v.name === 'Google español') || 
                 voices.find(v => v.lang === 'es-ES') ||
                 voices.find(v => v.lang === 'es-MX') ||
                 voices.find(v => v.lang.startsWith('es-')) ||
                 voices.find(v => v.lang.startsWith('en-')) || // Fallback to English
                 voices[0];
  }

  speak(text: string, tone: SpeechTone): void {
    if (!this.synth || !text) {
      return;
    }

    if (this.synth.speaking) {
      this.synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Ensure a voice is selected before speaking
    if (!this.voice) {
      this.loadVoices();
    }

    if (this.voice) {
      utterance.voice = this.voice;
    }
    
    switch (tone) {
      case 'pride':
        utterance.pitch = 1.2;
        utterance.rate = 1;
        break;
      case 'shame':
        utterance.pitch = 0.8;
        utterance.rate = 0.9;
        break;
      case 'neutral':
        utterance.pitch = 1;
        utterance.rate = 1;
        break;
    }

    this.synth.speak(utterance);
  }
}
