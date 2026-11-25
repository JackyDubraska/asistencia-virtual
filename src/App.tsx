import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ListaSavedView,
  SugerenciasCatalogView,
  TendenciasView,
} from './components/CatalogTrendsSavedViews';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { LumiAssistantView } from './components/LumiAssistantView';
import { MeasurementsView } from './components/MeasurementsView';
import {
  DEFAULT_MEASUREMENTS,
  INITIAL_NOTIFICATIONS,
  PRODUCTS_CATALOG,
} from './data/catalog';
import type {
  ChatMessage,
  Language,
  NotificationItem,
  PageId,
  Product,
  UserMeasurements,
} from './types';
import { speakText, startVoiceRecognition, stopSpeaking } from './utils/speech';

const STORAGE_MEASUREMENTS_KEY = 'sugerencias_measurements_v1';
const STORAGE_SAVED_KEY = 'sugerencias_saved_ids_v1';
const STORAGE_ALERTS_KEY = 'sugerencias_alerts_v1';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    role: 'lumi',
    text: '¡Hola! Soy LUMI. Estoy aquí para acompañarte sin prisas. ¿Qué te gustaría buscar o comparar hoy?',
  },
  {
    id: 'm2',
    role: 'user',
    text: 'Necesito unos tenis cómodos para caminar, que no sean demasiado caros.',
  },
  {
    id: 'm3',
    role: 'lumi',
    text: '¡Claro! Vamos a buscar algo que se adapte a ti. Como tienes guardada tu talla 41 EU, filtré opciones cómodas, bonitas y por debajo de $60 USD:',
    recommendedProductIds: ['urban-walk', 'cloudstride-lite'],
  },
];

function getInitialPage(): PageId {
  if (typeof window === 'undefined') return 'inicio';
  const hash = window.location.hash.replace('#', '') as PageId;
  const valid: PageId[] = [
    'inicio',
    'asistente',
    'sugerencias',
    'tendencias',
    'medidas',
    'lista',
  ];
  return valid.includes(hash) ? hash : 'inicio';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [language, setLanguage] = useState<Language>('ES');

  const [measurements, setMeasurements] = useState<UserMeasurements>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_MEASUREMENTS_KEY);
      return raw ? { ...DEFAULT_MEASUREMENTS, ...JSON.parse(raw) } : DEFAULT_MEASUREMENTS;
    } catch {
      return DEFAULT_MEASUREMENTS;
    }
  });

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_SAVED_KEY);
      return raw ? JSON.parse(raw) : ['urban-walk'];
    } catch {
      return ['urban-walk'];
    }
  });

  const [alertsEnabled, setAlertsEnabled] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_ALERTS_KEY);
      return raw ? JSON.parse(raw) : true;
    } catch {
      return true;
    }
  });

  const [notifications, setNotifications] =
    useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [naturalVoiceOn, setNaturalVoiceOn] = useState(true);

  const [comparePair, setComparePair] = useState<[Product, Product]>([
    PRODUCTS_CATALOG[0], // Tenis Urban Walk
    PRODUCTS_CATALOG[4], // CloudStride Lite
  ]);

  const [isListening, setIsListening] = useState(false);
  const [statusToast, setStatusToast] = useState<string | null>(null);
  const stopVoiceRef = useRef<(() => void) | null>(null);

  const showToast = useCallback((msg: string) => {
    setStatusToast(msg);
    window.setTimeout(() => {
      setStatusToast((prev) => (prev === msg ? null : prev));
    }, 4000);
  }, []);

  const navigate = useCallback((page: PageId) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      window.location.hash = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleSaveMeasurements = (updated: UserMeasurements) => {
    setMeasurements(updated);
    try {
      localStorage.setItem(STORAGE_MEASUREMENTS_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
    showToast(`Medidas guardadas (${updated.shoeSizeEU} EU / Talla ${updated.clothingSize})`);
  };

  const handleToggleSave = (productId: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      const product = PRODUCTS_CATALOG.find((p) => p.id === productId);
      if (product) {
        showToast(
          exists
            ? `${product.name} quitado de tu lista`
            : `${product.name} guardado en tu lista`
        );
      }
      return next;
    });
  };

  const handleToggleAlerts = () => {
    setAlertsEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_ALERTS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      showToast(next ? 'Alertas activadas' : 'Alertas pausadas');
      return next;
    });
  };

  const handleSpeak = useCallback(
    (text: string) => {
      const ok = speakText(text, language);
      if (!ok) {
        showToast('Tu navegador no admite lectura en voz alta.');
      }
    },
    [language, showToast]
  );

  const handleListenProduct = useCallback(
    (product: Product) => {
      const speech = `${product.name}. Precio: ${product.price.toFixed(
        2
      )} dólares. ${product.description}`;
      handleSpeak(speech);
      showToast(`Leyendo: ${product.name}`);
    },
    [handleSpeak, showToast]
  );

  const handleCompareProduct = useCallback(
    (product: Product) => {
      setComparePair((prev) => {
        if (prev[0].id === product.id) return prev;
        const second =
          prev[0].id !== product.id
            ? prev[0]
            : PRODUCTS_CATALOG.find((p) => p.id !== product.id) || prev[1];
        return [product, second];
      });
      navigate('asistente');
      showToast(`Comparando ${product.name}`);
    },
    [navigate, showToast]
  );

  const handleSelectCompareProduct = (slot: 0 | 1, product: Product) => {
    setComparePair((prev) => (slot === 0 ? [product, prev[1]] : [prev[0], product]));
  };

  const sendChatToLumi = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        text: trimmed,
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsChatLoading(true);

      try {
        const res = await fetch('/api/lumi/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            history: messages.map((m) => ({ role: m.role, text: m.text })),
            measurements,
            language,
            catalog: PRODUCTS_CATALOG.map((p) => ({
              id: p.id,
              name: p.name,
              price: p.price,
              category: p.category,
              description: p.description,
              pros: p.pros,
            })),
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(
            data?.error || 'No se pudo conectar con el servicio de LUMI.'
          );
        }

        const lumiReply: ChatMessage = {
          id: `l-${Date.now()}`,
          role: 'lumi',
          text:
            data.reply ||
            'Aquí tienes algunas opciones pensadas para tu comodidad y presupuesto.',
          recommendedProductIds: Array.isArray(data.recommendedProductIds)
            ? data.recommendedProductIds
            : [],
          comparisonTip: data.comparisonTip,
        };

        setMessages((prev) => [...prev, lumiReply]);

        if (
          Array.isArray(data.recommendedProductIds) &&
          data.recommendedProductIds.length >= 2
        ) {
          const p1 = PRODUCTS_CATALOG.find(
            (p) => p.id === data.recommendedProductIds[0]
          );
          const p2 = PRODUCTS_CATALOG.find(
            (p) => p.id === data.recommendedProductIds[1]
          );
          if (p1 && p2) {
            setComparePair([p1, p2]);
          }
        }

        if (naturalVoiceOn && lumiReply.text) {
          speakText(lumiReply.text, language);
        }
      } catch (err: unknown) {
        const errorText =
          err instanceof Error
            ? err.message
            : 'Ocurrió un error al consultar con LUMI.';
        setMessages((prev) => [
          ...prev,
          {
            id: `e-${Date.now()}`,
            role: 'lumi',
            text: errorText,
            isError: true,
          },
        ]);
      } finally {
        setIsChatLoading(false);
      }
    },
    [language, measurements, messages, naturalVoiceOn]
  );

  const handleAskFromHero = useCallback(
    (query: string) => {
      navigate('asistente');
      void sendChatToLumi(query);
    },
    [navigate, sendChatToLumi]
  );

  const handleTranslateLatest = async () => {
    const latestLumi = [...messages]
      .reverse()
      .find((m) => m.role === 'lumi' && !m.isError);
    if (!latestLumi || isTranslating) return;

    const targetLang: Language = language === 'ES' ? 'EN' : 'ES';
    setIsTranslating(true);
    try {
      const res = await fetch('/api/lumi/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: latestLumi.text,
          targetLanguage: targetLang,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Error al traducir');
      }
      setMessages((prev) =>
        prev.map((m) =>
          m.id === latestLumi.id
            ? { ...m, translatedText: data.translatedText }
            : m
        )
      );
      showToast(`Mensaje traducido a ${targetLang}`);
    } catch (err: unknown) {
      showToast(
        err instanceof Error ? err.message : 'No se pudo traducir en este momento.'
      );
    } finally {
      setIsTranslating(false);
    }
  };

  const handleToggleVoice = () => {
    if (isListening) {
      stopVoiceRef.current?.();
      stopVoiceRef.current = null;
      setIsListening(false);
      return;
    }

    stopSpeaking();
    setIsListening(true);
    showToast('LUMI te está escuchando...');

    const stopFn = startVoiceRecognition(
      language,
      (transcript) => {
        showToast(`Escuchado: "${transcript}"`);
        navigate('asistente');
        void sendChatToLumi(transcript);
      },
      (errMsg) => {
        setIsListening(false);
        showToast(errMsg);
      },
      () => {
        setIsListening(false);
      }
    );

    if (stopFn) {
      stopVoiceRef.current = stopFn;
    } else {
      setIsListening(false);
    }
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (notification: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, unread: false } : n))
    );
    navigate(notification.targetPage);
  };

  return (
    <div className="min-h-screen flex flex-col bg-light-surface text-light-on-surface pb-20 lg:pb-0">
      <Header
        currentPage={currentPage}
        onNavigate={navigate}
        language={language}
        onLanguageChange={setLanguage}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        onNotificationClick={handleNotificationClick}
        isListening={isListening}
        onToggleVoice={handleToggleVoice}
        savedCount={savedIds.length}
      />

      {statusToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 lg:right-6 z-50 rounded-full bg-light-inverse-surface text-light-inverse-on-surface px-4 py-2.5 shadow-lg font-label text-label-sm flex items-center gap-2 max-w-sm"
        >
          <span
            className="material-symbols-outlined text-[18px] text-pastel-menta"
            aria-hidden="true"
          >
            auto_awesome
          </span>
          <span>{statusToast}</span>
        </div>
      )}

      {currentPage === 'inicio' && (
        <HomeView
          language={language}
          measurements={measurements}
          savedIds={savedIds}
          alertsEnabled={alertsEnabled}
          onToggleAlerts={handleToggleAlerts}
          onNavigate={navigate}
          onCompareProduct={handleCompareProduct}
          onListenProduct={handleListenProduct}
          onToggleSave={handleToggleSave}
          onToggleVoice={handleToggleVoice}
          messages={messages}
          isChatLoading={isChatLoading}
          onSendChat={sendChatToLumi}
          onAskFromHero={handleAskFromHero}
        />
      )}

      {currentPage === 'asistente' && (
        <LumiAssistantView
          language={language}
          measurements={measurements}
          messages={messages}
          isChatLoading={isChatLoading}
          naturalVoiceOn={naturalVoiceOn}
          onToggleNaturalVoice={() => {
            const next = !naturalVoiceOn;
            setNaturalVoiceOn(next);
            if (!next) stopSpeaking();
          }}
          onSendChat={sendChatToLumi}
          onTranslateLatest={handleTranslateLatest}
          isTranslating={isTranslating}
          onSpeakText={handleSpeak}
          onToggleVoice={handleToggleVoice}
          comparePair={comparePair}
          onSelectCompareProduct={handleSelectCompareProduct}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
        />
      )}

      {currentPage === 'medidas' && (
        <MeasurementsView
          measurements={measurements}
          onSaveMeasurements={handleSaveMeasurements}
        />
      )}

      {currentPage === 'sugerencias' && (
        <SugerenciasCatalogView
          language={language}
          measurements={measurements}
          savedIds={savedIds}
          onCompareProduct={handleCompareProduct}
          onListenProduct={handleListenProduct}
          onToggleSave={handleToggleSave}
        />
      )}

      {currentPage === 'tendencias' && (
        <TendenciasView
          measurements={measurements}
          alertsEnabled={alertsEnabled}
          onToggleAlerts={handleToggleAlerts}
          onCompareProduct={handleCompareProduct}
          onSpeakText={handleSpeak}
        />
      )}

      {currentPage === 'lista' && (
        <ListaSavedView
          language={language}
          measurements={measurements}
          savedIds={savedIds}
          onNavigate={navigate}
          onCompareProduct={handleCompareProduct}
          onListenProduct={handleListenProduct}
          onToggleSave={handleToggleSave}
        />
      )}

      <Footer language={language} />

      {/* Always-Visible Floating Voice Assistant Dock */}
      <div className="fixed bottom-5 right-5 lg:bottom-6 lg:right-6 z-40">
        <button
          type="button"
          id="floating-mic-btn"
          onClick={handleToggleVoice}
          aria-pressed={isListening}
          aria-label="Activar control por voz de LUMI"
          className={`w-14 h-14 rounded-full shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary inline-flex items-center justify-center cursor-pointer transition-colors duration-state-change ${
            isListening
              ? 'bg-light-secondary text-light-on-secondary'
              : 'bg-light-primary text-light-on-primary hover:bg-morado-tecnologico'
          }`}
        >
          <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
            {isListening ? 'graphic_eq' : 'mic'}
          </span>
        </button>
      </div>
    </div>
  );
}
