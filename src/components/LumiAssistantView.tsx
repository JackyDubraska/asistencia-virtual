import { useState, FormEvent } from 'react';
import { LUMI_HOLOGRAM_IMAGE, PRODUCTS_CATALOG } from '../data/catalog';
import type {
  ChatMessage,
  Language,
  Product,
  UserMeasurements,
} from '../types';
import { ResilientImage } from './ResilientImage';

interface LumiAssistantViewProps {
  language: Language;
  measurements: UserMeasurements;
  messages: ChatMessage[];
  isChatLoading: boolean;
  naturalVoiceOn: boolean;
  onToggleNaturalVoice: () => void;
  onSendChat: (text: string) => void;
  onTranslateLatest: () => void;
  isTranslating: boolean;
  onSpeakText: (text: string) => void;
  onToggleVoice: () => void;
  comparePair: [Product, Product];
  onSelectCompareProduct: (slot: 0 | 1, product: Product) => void;
  savedIds: string[];
  onToggleSave: (productId: string) => void;
}

export function LumiAssistantView({
  measurements,
  messages,
  isChatLoading,
  naturalVoiceOn,
  onToggleNaturalVoice,
  onSendChat,
  onTranslateLatest,
  isTranslating,
  onSpeakText,
  onToggleVoice,
  comparePair,
  onSelectCompareProduct,
  savedIds,
  onToggleSave,
}: LumiAssistantViewProps) {
  const [inputValue, setInputValue] = useState('');
  const [leftProduct, rightProduct] = comparePair;
  const priceDiff = Math.abs(rightProduct.price - leftProduct.price);
  const cheaperProduct =
    leftProduct.price <= rightProduct.price ? leftProduct : rightProduct;
  const isCheaperSaved = savedIds.includes(cheaperProduct.id);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || isChatLoading) return;
    onSendChat(text);
    setInputValue('');
  };

  const readComparison = () => {
    const summary = `Comparación clara entre ${leftProduct.name} a ${leftProduct.price.toFixed(
      2
    )} dólares, y ${rightProduct.name} a ${rightProduct.price.toFixed(
      2
    )} dólares. La diferencia es de ${priceDiff.toFixed(
      2
    )} dólares. Consejo de LUMI: ${cheaperProduct.name} ofrece el mejor precio actual.`;
    onSpeakText(summary);
  };

  return (
    <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 lg:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column: Conversational Panel with LUMI (7 cols) */}
      <section
        aria-labelledby="chat-heading"
        className="lg:col-span-7 rounded-xl bg-light-surface-container-lowest border-2 border-pastel-lila shadow-sm flex flex-col overflow-hidden"
      >
        {/* Assistant Header Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-pastel-lila/35 to-pastel-menta/35 border-b border-light-outline-variant flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-pastel-lila flex items-center justify-center border border-light-primary shrink-0">
              <span
                className="material-symbols-outlined text-[24px] text-light-primary"
                aria-hidden="true"
              >
                face
              </span>
            </div>
            <div className="flex flex-col">
              <h1
                id="chat-heading"
                className="font-headline text-title-lg text-light-on-surface"
              >
                Conversación con LUMI
              </h1>
              <span className="font-label text-label-sm text-light-secondary">
                Holograma interactivo · Lectura y traducción activas
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleNaturalVoice}
              aria-pressed={naturalVoiceOn}
              className={`min-h-[40px] px-3.5 rounded-full font-label text-label-sm inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                naturalVoiceOn
                  ? 'bg-pastel-menta text-light-on-secondary-container'
                  : 'bg-light-surface-container-low text-light-on-surface-variant border border-light-outline-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                {naturalVoiceOn ? 'volume_up' : 'volume_off'}
              </span>
              <span>Voz natural: {naturalVoiceOn ? 'ON' : 'OFF'}</span>
            </button>
            <button
              type="button"
              onClick={onTranslateLatest}
              disabled={isTranslating}
              className="min-h-[40px] px-3.5 rounded-full bg-pastel-amarillo text-light-on-tertiary-container font-label text-label-sm inline-flex items-center gap-1.5 cursor-pointer hover:opacity-90 disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                translate
              </span>
              <span>{isTranslating ? 'Traduciendo...' : 'Traducir'}</span>
            </button>
          </div>
        </div>

        {/* Messages Thread */}
        <div className="p-6 flex flex-col gap-5 max-h-[560px] overflow-y-auto">
          {messages.map((msg) => {
            if (msg.role === 'user') {
              return (
                <div key={msg.id} className="flex items-start justify-end">
                  <div className="rounded-lg bg-light-primary text-light-on-primary px-5 py-3.5 max-w-md">
                    <p className="font-body text-body-lg text-pretty">{msg.text}</p>
                  </div>
                </div>
              );
            }

            const recommendedProducts = (msg.recommendedProductIds || [])
              .map((id) => PRODUCTS_CATALOG.find((p) => p.id === id))
              .filter((p): p is Product => Boolean(p));

            return (
              <div key={msg.id} className="flex items-start gap-3 max-w-2xl">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    recommendedProducts.length > 0 ? 'bg-pastel-menta' : 'bg-pastel-lila'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      recommendedProducts.length > 0
                        ? 'text-light-secondary'
                        : 'text-light-primary'
                    }`}
                    aria-hidden="true"
                  >
                    auto_awesome
                  </span>
                </div>
                <div
                  className={`rounded-lg border p-4 flex flex-col gap-3 ${
                    msg.isError
                      ? 'bg-light-error-container/50 border-light-error'
                      : recommendedProducts.length > 0
                      ? 'bg-pastel-menta/25 border-pastel-menta'
                      : 'bg-pastel-lila/25 border-pastel-lila'
                  }`}
                >
                  <p className="font-body text-body-lg text-light-on-surface text-pretty">
                    {msg.text}
                  </p>

                  {msg.translatedText && (
                    <div className="rounded-md bg-pastel-amarillo/45 border border-light-outline-variant px-3 py-2">
                      <span className="font-label text-label-sm text-light-on-tertiary-container block mb-0.5">
                        Traducción:
                      </span>
                      <p className="font-body text-body-md text-light-on-surface">
                        {msg.translatedText}
                      </p>
                    </div>
                  )}

                  {recommendedProducts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {recommendedProducts.map((prod, idx) => (
                        <button
                          key={prod.id}
                          type="button"
                          onClick={() => onSelectCompareProduct(idx === 0 ? 0 : 1, prod)}
                          className="text-left rounded-md bg-light-surface-container-lowest border border-light-outline-variant p-3.5 flex flex-col gap-2 hover:border-light-primary transition-colors cursor-pointer"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-title text-title-md text-light-on-surface">
                              {prod.name}
                            </span>
                            <span className="font-mono text-mono-md text-light-primary tabular-nums">
                              ${prod.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="font-body text-body-md text-light-on-surface-variant">
                            {prod.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => onSpeakText(msg.text)}
                      className="inline-flex items-center gap-1 text-light-primary font-label text-label-sm hover:underline cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                        volume_up
                      </span>
                      <span>
                        {recommendedProducts.length > 0
                          ? 'Leer opciones en voz alta'
                          : 'Escuchar'}
                      </span>
                    </button>
                    {recommendedProducts.length >= 2 && (
                      <>
                        <span className="font-label text-label-sm text-light-on-surface-variant">
                          ·
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectCompareProduct(0, recommendedProducts[0]);
                            onSelectCompareProduct(1, recommendedProducts[1]);
                          }}
                          className="font-label text-label-sm text-light-secondary hover:underline cursor-pointer"
                        >
                          Comparar a la derecha
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isChatLoading && (
            <div className="flex items-start gap-3 max-w-xl">
              <div className="w-9 h-9 rounded-full bg-pastel-lila flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] text-light-primary">
                  auto_awesome
                </span>
              </div>
              <div className="rounded-lg bg-pastel-lila/25 border border-pastel-lila px-4 py-3">
                <p className="font-body text-body-md text-light-on-surface-variant">
                  LUMI está revisando opciones para tu talla {measurements.shoeSizeEU} EU...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Voice Commands & Message Input */}
        <div className="p-4 bg-light-surface-container-low border-t border-light-outline-variant flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-label text-label-sm text-light-on-surface-variant">
              Comandos rápidos:
            </span>
            <button
              type="button"
              onClick={() => setInputValue('Muéstrame opciones más económicas')}
              className="min-h-[36px] px-3 rounded-full bg-pastel-rosa font-label text-label-sm text-light-on-surface hover:opacity-90 cursor-pointer"
            >
              "Muéstrame opciones más económicas"
            </button>
            <button
              type="button"
              onClick={() => readComparison()}
              className="min-h-[36px] px-3 rounded-full bg-pastel-amarillo font-label text-label-sm text-light-on-tertiary-container hover:opacity-90 cursor-pointer"
            >
              "Quiero escuchar la descripción"
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-light-surface-container-lowest border border-light-outline-variant rounded-full pl-4 pr-2 py-1.5 focus-within:border-light-primary"
          >
            <button
              type="button"
              onClick={onToggleVoice}
              aria-label="Dictar mensaje por voz"
              className="w-11 h-11 rounded-full bg-pastel-menta text-light-on-secondary-container hover:opacity-90 flex items-center justify-center shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                mic
              </span>
            </button>
            <input
              id="chat-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              aria-label="Escribe o dicta tu pregunta a LUMI"
              placeholder="Escribe aquí o toca el micrófono para hablar..."
              className="flex-1 min-w-0 bg-transparent border-none focus:outline-none focus:ring-0 font-body text-body-lg text-light-on-surface placeholder:text-light-outline"
            />
            <button
              type="submit"
              disabled={isChatLoading}
              className="min-h-[44px] px-5 py-2 rounded-full bg-light-primary text-light-on-primary hover:bg-morado-tecnologico font-label text-label-lg inline-flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-60"
            >
              <span>Enviar</span>
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                send
              </span>
            </button>
          </form>
        </div>
      </section>

      {/* Right Column: Interactive LUMI Hologram + Side-by-Side Comparison (5 cols) */}
      <aside
        aria-label="Holograma LUMI y comparación asistida"
        className="lg:col-span-5 flex flex-col gap-6"
      >
        {/* Compact Hologram Card */}
        <div className="rounded-xl bg-gradient-to-br from-pastel-durazno/45 via-pastel-rosa/35 to-pastel-menta/55 border-2 border-pastel-lila p-5 shadow-sm flex items-center gap-4">
          <div className="flex flex-col items-center shrink-0">
            <ResilientImage
              src={LUMI_HOLOGRAM_IMAGE}
              alt="Asistente virtual LUMI acompañando la conversación"
              fallbackIcon="smart_toy"
              fallbackClassName="h-44 w-28 flex items-center justify-center text-light-primary"
              className="holo-body h-44 w-auto object-contain drop-shadow-md relative z-10"
            />
            <div
              className="w-28 h-4 rounded-full bg-light-secondary/35 border border-light-secondary -mt-2 relative z-0"
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="self-start px-3 py-1 rounded-full bg-pastel-amarillo text-light-on-tertiary-container font-label text-label-sm">
              Holograma LUMI
            </span>
            <h2 className="font-headline text-title-lg text-light-on-surface">
              Te acompaño en vivo
            </h2>
            <p className="font-body text-body-md text-light-on-surface-variant text-pretty">
              Estoy aquí contigo para buscar, comparar y elegir sin prisas.
            </p>
          </div>
        </div>

        {/* Comparison Card */}
        <div className="rounded-xl bg-light-surface-container-lowest border border-light-outline-variant p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-headline text-headline-md text-light-on-surface">
              Comparación clara
            </h2>
            <span className="px-3 py-1 rounded-full bg-pastel-lila text-light-on-primary-container font-label text-label-sm">
              Sin presión
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select
              aria-label="Seleccionar primer producto a comparar"
              value={leftProduct.id}
              onChange={(e) => {
                const found = PRODUCTS_CATALOG.find((p) => p.id === e.target.value);
                if (found) onSelectCompareProduct(0, found);
              }}
              className="min-h-[36px] rounded-md bg-light-surface-container-low border border-light-outline-variant px-2 font-label text-label-sm text-light-on-surface"
            >
              {PRODUCTS_CATALOG.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <select
              aria-label="Seleccionar segundo producto a comparar"
              value={rightProduct.id}
              onChange={(e) => {
                const found = PRODUCTS_CATALOG.find((p) => p.id === e.target.value);
                if (found) onSelectCompareProduct(1, found);
              }}
              className="min-h-[36px] rounded-md bg-light-surface-container-low border border-light-outline-variant px-2 font-label text-label-sm text-light-on-surface"
            >
              {PRODUCTS_CATALOG.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Left Comparison Option */}
            <div
              className={`rounded-lg p-4 flex flex-col gap-2 ${
                leftProduct.price <= rightProduct.price
                  ? 'bg-pastel-lila/20 border-2 border-light-primary'
                  : 'bg-pastel-menta/20 border border-light-outline-variant'
              }`}
            >
              <ResilientImage
                src={leftProduct.image}
                alt={leftProduct.imageAlt}
                fallbackIcon={leftProduct.fallbackIcon}
                fallbackClassName="w-full h-28 rounded-md bg-light-surface-container-lowest flex items-center justify-center text-light-primary"
                className="w-full h-28 object-cover rounded-md"
              />
              <span className="font-title text-title-md text-light-on-surface">
                {leftProduct.name}
              </span>
              <span className="font-mono text-mono-md text-light-primary tabular-nums">
                ${leftProduct.price.toFixed(2)} USD
              </span>
              <ul className="flex flex-col gap-1 font-body text-body-md text-light-on-surface-variant">
                {leftProduct.pros.map((pro) => (
                  <li key={pro} className="flex items-center gap-1.5">
                    <span
                      className="material-symbols-outlined text-[16px] text-success shrink-0"
                      aria-hidden="true"
                    >
                      check_circle
                    </span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Comparison Option */}
            <div
              className={`rounded-lg p-4 flex flex-col gap-2 ${
                rightProduct.price < leftProduct.price
                  ? 'bg-pastel-lila/20 border-2 border-light-primary'
                  : 'bg-pastel-menta/20 border border-light-outline-variant'
              }`}
            >
              <ResilientImage
                src={rightProduct.image}
                alt={rightProduct.imageAlt}
                fallbackIcon={rightProduct.fallbackIcon}
                fallbackClassName="w-full h-28 rounded-md bg-light-surface-container-lowest flex items-center justify-center text-light-primary"
                className="w-full h-28 object-cover rounded-md"
              />
              <span className="font-title text-title-md text-light-on-surface">
                {rightProduct.name}
              </span>
              <span className="font-mono text-mono-md text-light-on-surface tabular-nums">
                ${rightProduct.price.toFixed(2)} USD
              </span>
              <ul className="flex flex-col gap-1 font-body text-body-md text-light-on-surface-variant">
                {rightProduct.pros.map((pro) => (
                  <li key={pro} className="flex items-center gap-1.5">
                    <span
                      className="material-symbols-outlined text-[16px] text-light-primary shrink-0"
                      aria-hidden="true"
                    >
                      check_circle
                    </span>
                    <span>{pro}</span>
                  </li>
                ))}
                {priceDiff > 0 && (
                  <li className="flex items-center gap-1.5">
                    <span
                      className="material-symbols-outlined text-[16px] text-light-on-surface-variant shrink-0"
                      aria-hidden="true"
                    >
                      info
                    </span>
                    <span className="tabular-nums">
                      {rightProduct.price > leftProduct.price ? '+' : '-'}$
                      {priceDiff.toFixed(2)} USD
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-pastel-menta p-4 flex items-start gap-3">
            <span
              className="material-symbols-outlined text-[22px] text-light-on-secondary-container shrink-0"
              aria-hidden="true"
            >
              tips_and_updates
            </span>
            <p className="font-body text-body-md text-light-on-secondary-container text-pretty">
              <strong>Consejo de LUMI:</strong> Si buscas ahorrar ahora,{' '}
              <em>{cheaperProduct.name}</em> (${cheaperProduct.price.toFixed(2)} USD) te
              ofrece la mejor relación comodidad-precio para tu talla{' '}
              {measurements.shoeSizeEU} EU.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onToggleSave(cheaperProduct.id)}
              className="flex-1 min-h-[44px] px-4 rounded-full bg-light-primary text-light-on-primary hover:bg-morado-tecnologico font-label text-label-lg cursor-pointer"
            >
              {isCheaperSaved ? 'Guardado en tu lista' : 'Guardar favorito'}
            </button>
            <button
              type="button"
              onClick={readComparison}
              className="min-h-[44px] px-4 rounded-full bg-pastel-amarillo text-light-on-tertiary-container hover:opacity-90 font-label text-label-lg inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                volume_up
              </span>
              <span>Leer</span>
            </button>
          </div>
        </div>
      </aside>
    </main>
  );
}
