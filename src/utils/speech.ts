import type { Language } from '../types';

const LOCALE_MAP: Record<Language, string> = {
  ES: 'es-ES',
  EN: 'en-US',
  FR: 'fr-FR',
  PT: 'pt-PT',
};

export function speakText(
  text: string,
  language: Language,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LOCALE_MAP[language] || 'es-ES';
    utterance.rate = 0.96;
    utterance.pitch = 1.05;
    if (onStart) utterance.onstart = onStart;
    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

interface SpeechRecognitionAlternative {
  transcript: string;
}

interface SpeechRecognitionResult {
  0: SpeechRecognitionAlternative;
}

interface SpeechRecognitionEvent {
  results: ArrayLike<SpeechRecognitionResult>;
}

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

export function startVoiceRecognition(
  language: Language,
  onTranscript: (transcript: string) => void,
  onError: (message: string) => void,
  onEnd: () => void
): (() => void) | null {
  if (typeof window === 'undefined') {
    onError('El navegador no admite dictado por voz.');
    return null;
  }

  const win = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  const Recognition = win.SpeechRecognition || win.webkitSpeechRecognition;

  if (!Recognition) {
    onError(
      'Tu navegador no tiene dictado por voz nativo. Puedes escribir directamente a LUMI.'
    );
    return null;
  }

  try {
    const recognition = new Recognition();
    recognition.lang = LOCALE_MAP[language] || 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim();
      if (transcript) {
        onTranscript(transcript);
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed') {
        onError('Permiso de micrófono denegado. Escribe tu consulta a LUMI.');
      } else if (event.error !== 'aborted') {
        onError('No pude captar el audio con claridad. Intenta de nuevo o escribe.');
      }
    };

    recognition.onend = () => {
      onEnd();
    };

    recognition.start();
    return () => {
      try {
        recognition.stop();
      } catch {
        // Ignore stop errors
      }
    };
  } catch {
    onError('No fue posible iniciar el micrófono en este entorno.');
    return null;
  }
}
