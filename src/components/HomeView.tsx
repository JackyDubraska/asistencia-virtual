import { useState, FormEvent } from 'react';
import {
  LUMI_HOLOGRAM_IMAGE,
  PRODUCTS_CATALOG,
  SHOE_SIZE_CONVERSION,
  TREND_ITEMS,
  UI_COPY,
} from '../data/catalog';
import type {
  ChatMessage,
  GestureState,
  Language,
  PageId,
  Product,
  UserMeasurements,
} from '../types';
import { ProductCard } from './ProductCard';
import { ResilientImage } from './ResilientImage';

interface HomeViewProps {
  language: Language;
  measurements: UserMeasurements;
  savedIds: string[];
  alertsEnabled: boolean;
  onToggleAlerts: () => void;
  onNavigate: (page: PageId) => void;
  onCompareProduct: (product: Product) => void;
  onListenProduct: (product: Product) => void;
  onToggleSave: (productId: string) => void;
  onToggleVoice: () => void;
  messages: ChatMessage[];
  isChatLoading: boolean;
  onSendChat: (text: string) => void;
  onAskFromHero: (query: string) => void;
}

export function HomeView({
  language,
  measurements,
  savedIds,
  alertsEnabled,
  onToggleAlerts,
  onNavigate,
  onCompareProduct,
  onListenProduct,
  onToggleSave,
  onToggleVoice,
  messages,
  isChatLoading,
  onSendChat,
  onAskFromHero,
}: HomeViewProps) {
  const copy = UI_COPY[language];
  const [heroQuery, setHeroQuery] = useState('');
  const [inlineInput, setInlineInput] = useState('');
  const [gestureStatus, setGestureStatus] = useState<GestureState>('Saludando');
  const [isExcited, setIsExcited] = useState(false);

  const featuredProducts = PRODUCTS_CATALOG.filter((p) => p.featuredOnHome);
  const sizeConv = SHOE_SIZE_CONVERSION[measurements.shoeSizeEU] || {
    us: '8.5',
    uk: '7.5',
    cm: '26.0',
  };

  const triggerGesture = (gesture: GestureState) => {
    setGestureStatus(gesture);
    setIsExcited(true);
    window.setTimeout(() => setIsExcited(false), 1800);
  };

  const handleHeroSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = heroQuery.trim();
    if (!q) return;
    onAskFromHero(q);
    setHeroQuery('');
  };

  const handleInlineSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = inlineInput.trim();
    if (!text || isChatLoading) return;
    onSendChat(text);
    setInlineInput('');
  };

  return (
    <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 lg:px-6 py-6 lg:py-8 flex flex-col gap-10 lg:gap-12">
      {/* Hero Section: Bright Pastel Wash + Articulated LUMI Hologram */}
      <section
        aria-labelledby="hero-title"
        className="rounded-xl bg-gradient-to-br from-pastel-lila/40 via-light-surface-container-lowest to-pastel-menta/40 border border-light-outline-variant p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
      >
        <div className="lg:col-span-7 flex flex-col gap-5 lg:gap-6">
          <div className="inline-flex items-center gap-2 self-start px-3.5 lg:px-4 py-1.5 rounded-full bg-pastel-amarillo text-light-on-tertiary-container">
            <span
              className="material-symbols-outlined material-symbols-filled text-[18px]"
              aria-hidden="true"
            >
              auto_awesome
            </span>
            <span className="font-label text-label-sm">{copy.heroBadge}</span>
          </div>

          <div className="flex flex-col gap-3">
            <h1
              id="hero-title"
              className="font-display text-display-lg-mobile lg:text-display-lg text-light-on-surface text-balance"
            >
              {copy.heroTitle}
            </h1>
            <p className="font-body text-body-lg text-light-on-surface-variant max-w-prose text-pretty">
              {copy.heroDesc}
            </p>
          </div>

          <form
            role="search"
            onSubmit={handleHeroSubmit}
            className="w-full flex items-center gap-2 bg-light-surface-container-lowest border-2 border-pastel-lila rounded-full pl-4 lg:pl-5 pr-2 py-1.5 shadow-sm focus-within:border-light-primary"
          >
            <span
              className="material-symbols-outlined text-[22px] text-light-primary shrink-0"
              aria-hidden="true"
            >
              search
            </span>
            <input
              id="hero-search-input"
              type="search"
              value={heroQuery}
              onChange={(e) => setHeroQuery(e.target.value)}
              aria-label="Buscar productos o preguntar a LUMI"
              placeholder={copy.searchPlaceholder}
              className="flex-1 min-w-0 bg-transparent border-none focus:outline-none focus:ring-0 font-body text-body-lg text-light-on-surface placeholder:text-light-outline"
            />
            <button
              type="button"
              onClick={onToggleVoice}
              aria-label="Dictar búsqueda por voz"
              className="w-11 h-11 rounded-full bg-pastel-menta text-light-on-secondary-container hover:opacity-90 flex items-center justify-center cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                mic
              </span>
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 lg:px-6 rounded-full bg-light-primary text-light-on-primary font-label text-label-lg hover:bg-morado-tecnologico transition-colors duration-state-change cursor-pointer shrink-0 whitespace-nowrap"
            >
              {copy.askBtn}
            </button>
          </form>

          {/* Quick Voice & Action Prompts */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-label text-label-sm text-light-on-surface-variant">
              {copy.trySaying}
            </span>
            <button
              type="button"
              onClick={() => setHeroQuery(copy.chips[0])}
              className="min-h-[36px] px-3.5 rounded-full bg-pastel-rosa text-light-on-surface hover:opacity-90 font-label text-label-sm cursor-pointer"
            >
              "{copy.chips[0]}"
            </button>
            <button
              type="button"
              onClick={() => setHeroQuery(copy.chips[1])}
              className="min-h-[36px] px-3.5 rounded-full bg-pastel-menta text-light-on-secondary-container hover:opacity-90 font-label text-label-sm cursor-pointer"
            >
              "{copy.chips[1]}"
            </button>
            <button
              type="button"
              onClick={() => onNavigate('medidas')}
              className="min-h-[36px] px-3.5 rounded-full bg-pastel-amarillo text-light-on-tertiary-container hover:opacity-90 font-label text-label-sm cursor-pointer"
            >
              "{copy.chips[2]}"
            </button>
          </div>
        </div>

        {/* Interactive Hologram of LUMI + Integrated Live Chat */}
        <div
          id="lumi-holo-stage"
          className={`lg:col-span-5 flex flex-col items-center gap-4 bg-light-surface-container-lowest border-2 border-pastel-lila rounded-xl p-5 lg:p-6 shadow-sm relative overflow-hidden ${
            isExcited ? 'holo-excited' : ''
          }`}
        >
          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-pastel-lila text-light-on-primary-container font-label text-label-sm whitespace-nowrap">
                {copy.holoTitle}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-pastel-menta text-light-on-secondary-container font-label text-label-sm whitespace-nowrap">
                {copy.holoLive}
              </span>
            </div>
            <span
              id="holo-status-text"
              className="font-label text-label-sm text-light-on-surface-variant truncate"
            >
              {gestureStatus}
            </span>
          </div>

          {/* Transparent 3D Assistant Character in Pastel Holographic Stage */}
          <div className="w-full flex flex-col items-center justify-center py-4 bg-gradient-to-b from-pastel-durazno/45 via-pastel-rosa/40 to-pastel-menta/60 rounded-lg border border-light-outline-variant relative overflow-hidden">
            <div className="holo-body relative z-10 flex items-center justify-center">
              <ResilientImage
                src={LUMI_HOLOGRAM_IMAGE}
                alt="Asistente virtual LUMI saludando en proyección holográfica"
                fallbackIcon="smart_toy"
                fallbackClassName="h-56 w-40 flex items-center justify-center text-light-primary"
                className="h-52 lg:h-64 w-auto object-contain drop-shadow-lg"
              />
            </div>
            <div
              className="holo-ring w-40 lg:w-48 h-5 lg:h-6 rounded-full bg-light-secondary/35 border-2 border-light-secondary -mt-3 relative z-0"
              aria-hidden="true"
            />
            <div
              className="w-32 lg:w-36 h-3 rounded-full bg-light-primary/30 border border-light-primary -mt-4 relative z-0"
              aria-hidden="true"
            />
          </div>

          {/* Interactive Hologram Gesture Controls */}
          <div className="w-full grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => triggerGesture('Saludando con la mano')}
              className="min-h-[40px] px-2.5 rounded-full bg-pastel-lila text-light-on-primary-container font-label text-label-sm inline-flex items-center justify-center gap-1 cursor-pointer hover:opacity-90"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                waving_hand
              </span>
              <span className="truncate">{copy.gestureGreet}</span>
            </button>
            <button
              type="button"
              onClick={() => triggerGesture('Interactuando feliz')}
              className="min-h-[40px] px-2.5 rounded-full bg-pastel-menta text-light-on-secondary-container font-label text-label-sm inline-flex items-center justify-center gap-1 cursor-pointer hover:opacity-90"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                directions_walk
              </span>
              <span className="truncate">{copy.gestureInteract}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                triggerGesture('Escuchando tu voz');
                onToggleVoice();
              }}
              className="min-h-[40px] px-2.5 rounded-full bg-pastel-amarillo text-light-on-tertiary-container font-label text-label-sm inline-flex items-center justify-center gap-1 cursor-pointer hover:opacity-90"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                record_voice_over
              </span>
              <span className="truncate">{copy.gestureListen}</span>
            </button>
          </div>

          {/* Integrated Live Assistant Chat inside Inicio */}
          <div
            id="integrated-chat-box"
            className="w-full rounded-lg bg-light-surface-container-low border border-light-outline-variant p-3.5 flex flex-col gap-2.5"
          >
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
              {messages.slice(-4).map((msg) => (
                <div
                  key={msg.id}
                  className={
                    msg.role === 'user'
                      ? 'rounded-md bg-light-primary text-light-on-primary px-3 py-2 self-end max-w-[85%]'
                      : 'rounded-md bg-light-surface-container-lowest border border-light-outline-variant px-3 py-2'
                  }
                >
                  <p className="font-body text-body-md text-pretty">
                    {msg.role === 'lumi' && <strong>LUMI: </strong>}
                    {msg.text}
                  </p>
                </div>
              ))}
              {isChatLoading && (
                <div className="rounded-md bg-light-surface-container-lowest border border-light-outline-variant px-3 py-2">
                  <p className="font-body text-body-md text-light-on-surface-variant">
                    <strong>LUMI:</strong> Pensando en la mejor opción para ti...
                  </p>
                </div>
              )}
            </div>

            <form
              onSubmit={handleInlineSubmit}
              className="flex items-center gap-2 bg-light-surface-container-lowest border border-light-outline-variant rounded-full pl-3.5 pr-1.5 py-1 focus-within:border-light-primary"
            >
              <input
                type="text"
                value={inlineInput}
                onChange={(e) => setInlineInput(e.target.value)}
                aria-label="Escribe a LUMI directamente aquí"
                placeholder={copy.integratedPlaceholder}
                className="flex-1 min-w-0 bg-transparent border-none focus:outline-none focus:ring-0 font-body text-body-md text-light-on-surface placeholder:text-light-outline py-1"
              />
              <button
                type="submit"
                disabled={isChatLoading}
                aria-label="Enviar mensaje a LUMI"
                className="min-h-[36px] px-4 rounded-full bg-light-primary text-light-on-primary hover:bg-morado-tecnologico font-label text-label-sm inline-flex items-center gap-1 cursor-pointer shrink-0 disabled:opacity-60"
              >
                <span>{copy.sendBtn}</span>
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  send
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Section: Sugerencias para ti */}
      <section id="sugerencias" aria-labelledby="sugerencias-title" className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2
              id="sugerencias-title"
              className="font-headline text-headline-md lg:text-headline-lg text-light-on-surface"
            >
              {copy.suggestionsTitle}
            </h2>
            <p className="font-body text-body-md text-light-on-surface-variant">
              Seleccionadas según tu presupuesto, comodidad y medidas guardadas (Talla{' '}
              {measurements.shoeSizeEU} EU / {measurements.clothingSize}).
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('sugerencias')}
            className="min-h-[44px] px-5 rounded-full bg-pastel-lila text-light-on-primary-container hover:opacity-90 font-label text-label-lg inline-flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>{copy.seeAll}</span>
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              arrow_forward
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              measurements={measurements}
              language={language}
              isSaved={savedIds.includes(product.id)}
              onCompare={onCompareProduct}
              onListen={onListenProduct}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      </section>

      {/* Section: Herramientas clave (Mis medidas + Tendencias y novedades) */}
      <section
        aria-label="Herramientas y novedades"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
      >
        {/* Mis Medidas Card */}
        <div className="lg:col-span-5 rounded-xl bg-pastel-lila/30 border border-light-outline-variant p-6 flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-pastel-lila text-light-on-primary-container font-label text-label-sm">
                {copy.mySizesBadge}
              </span>
              <span
                className="material-symbols-outlined text-[24px] text-light-primary"
                aria-hidden="true"
              >
                straighten
              </span>
            </div>
            <h2 className="font-headline text-headline-md text-light-on-surface">
              {copy.mySizesTitle}
            </h2>
            <p className="font-body text-body-md text-light-on-surface-variant text-pretty">
              {copy.mySizesDesc}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-md bg-light-surface-container-lowest p-3 border border-light-outline-variant flex flex-col gap-0.5">
              <span className="font-label text-label-sm text-light-on-surface-variant">
                Calzado EU
              </span>
              <span className="font-mono text-title-md text-light-primary tabular-nums">
                {measurements.shoeSizeEU} EU
              </span>
            </div>
            <div className="rounded-md bg-light-surface-container-lowest p-3 border border-light-outline-variant flex flex-col gap-0.5">
              <span className="font-label text-label-sm text-light-on-surface-variant">
                Equiv. US
              </span>
              <span className="font-mono text-title-md text-light-on-surface tabular-nums">
                {sizeConv.us} US
              </span>
            </div>
            <div className="rounded-md bg-light-surface-container-lowest p-3 border border-light-outline-variant flex flex-col gap-0.5">
              <span className="font-label text-label-sm text-light-on-surface-variant">
                Ropa
              </span>
              <span className="font-mono text-title-md text-light-on-surface tabular-nums">
                Talla {measurements.clothingSize}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('medidas')}
            className="min-h-[44px] px-5 rounded-full bg-light-surface-container-lowest border border-light-outline-variant text-light-primary hover:bg-light-surface-variant font-label text-label-lg inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{copy.updateSizesBtn}</span>
          </button>
        </div>

        {/* Tendencias y Novedades Card */}
        <div
          id="tendencias"
          className="lg:col-span-7 rounded-xl bg-pastel-menta/25 border border-light-outline-variant p-6 flex flex-col justify-between gap-5 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-headline text-headline-md text-light-on-surface">
                {copy.trendsTitle}
              </h2>
              <p className="font-body text-body-md text-light-on-surface-variant">
                {copy.trendsDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={onToggleAlerts}
              aria-pressed={alertsEnabled}
              className={`min-h-[44px] px-4 rounded-full font-label text-label-sm inline-flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors ${
                alertsEnabled
                  ? 'bg-pastel-amarillo text-light-on-tertiary-container'
                  : 'bg-light-surface-container-lowest border border-light-outline-variant text-light-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                {alertsEnabled ? 'notifications_active' : 'notifications_off'}
              </span>
              <span>{alertsEnabled ? copy.alertsActive : copy.alertsPaused}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TREND_ITEMS.slice(0, 2).map((trend, idx) => (
              <button
                key={trend.id}
                type="button"
                onClick={() => onNavigate('tendencias')}
                className={`text-left rounded-lg bg-light-surface-container-lowest border border-light-outline-variant p-4 flex flex-col gap-2 transition-colors duration-state-change cursor-pointer ${
                  idx === 0 ? 'hover:bg-pastel-rosa/30' : 'hover:bg-pastel-amarillo/30'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`font-label text-label-sm ${
                      idx === 0 ? 'text-light-primary' : 'text-light-secondary'
                    }`}
                  >
                    {trend.categoryLabel}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      idx === 0 ? 'text-light-primary' : 'text-light-secondary'
                    }`}
                    aria-hidden="true"
                  >
                    {trend.icon}
                  </span>
                </div>
                <h3 className="font-title text-title-md text-light-on-surface">
                  {trend.title}
                </h3>
                <p className="font-body text-body-md text-light-on-surface-variant">
                  {idx === 0
                    ? `Disponibles en talla ${measurements.shoeSizeEU} EU con envío gratuito.`
                    : trend.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
