import { useState, FormEvent } from 'react';
import { LUMI_HOLOGRAM_IMAGE, SHOE_SIZE_CONVERSION } from '../data/catalog';
import type { UserMeasurements } from '../types';
import { ResilientImage } from './ResilientImage';

interface MeasurementsViewProps {
  measurements: UserMeasurements;
  onSaveMeasurements: (updated: UserMeasurements) => void;
}

export function MeasurementsView({
  measurements,
  onSaveMeasurements,
}: MeasurementsViewProps) {
  const [formState, setFormState] = useState<UserMeasurements>(measurements);
  const [converterEU, setConverterEU] = useState<number>(measurements.shoeSizeEU);
  const [savedVisible, setSavedVisible] = useState(false);

  const convRow = SHOE_SIZE_CONVERSION[converterEU] || {
    us: '8.5',
    uk: '7.5',
    cm: '26.0',
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSaveMeasurements(formState);
    setSavedVisible(true);
    window.setTimeout(() => setSavedVisible(false), 4000);
  };

  return (
    <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 lg:px-6 py-8 flex flex-col gap-8">
      {/* Page Header + LUMI Assistant Guidance */}
      <section
        aria-labelledby="medidas-title"
        className="rounded-xl bg-gradient-to-r from-pastel-durazno/40 via-pastel-rosa/35 to-pastel-menta/45 border border-light-outline-variant p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
      >
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-pastel-amarillo text-light-on-tertiary-container">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              straighten
            </span>
            <span className="font-label text-label-sm">
              Mis medidas y tallas personales
            </span>
          </div>
          <h1
            id="medidas-title"
            className="font-display text-display-lg-mobile lg:text-display-lg text-light-on-surface text-balance"
          >
            Tus tallas exactas en un solo lugar
          </h1>
          <p className="font-body text-body-lg text-light-on-surface-variant max-w-prose text-pretty">
            Registra tus medidas una sola vez. LUMI las usa para recomendarte ropa y
            calzado que se ajusten mejor a ti, sin importar el país o la tienda.
          </p>
        </div>

        <div className="lg:col-span-4 flex items-center gap-4 bg-light-surface-container-lowest/90 border border-light-outline-variant rounded-xl p-4">
          <ResilientImage
            src={LUMI_HOLOGRAM_IMAGE}
            alt="LUMI explicando cómo usar tus medidas"
            fallbackIcon="straighten"
            fallbackClassName="h-28 w-20 flex items-center justify-center text-light-primary shrink-0"
            className="h-28 w-auto object-contain shrink-0"
          />
          <div className="flex flex-col gap-1.5">
            <span className="font-title text-title-md text-light-on-surface">
              LUMI te ayuda
            </span>
            <p className="font-body text-body-md text-light-on-surface-variant text-pretty">
              "Puedes dictarme tus medidas por voz o usar el conversor US, EU y UK
              aquí abajo."
            </p>
          </div>
        </div>
      </section>

      {/* Forms & Size Converter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 cols: Ropa & Calzado Forms */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-6">
          {/* Ropa Section */}
          <section
            aria-labelledby="ropa-title"
            className="rounded-xl bg-light-surface-container-lowest border border-light-outline-variant p-6 shadow-sm flex flex-col gap-5"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-full bg-pastel-lila text-light-on-primary-container inline-flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    checkroom
                  </span>
                </span>
                <h2
                  id="ropa-title"
                  className="font-headline text-headline-md text-light-on-surface"
                >
                  Medidas para ropa
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-pastel-rosa text-light-on-surface font-label text-label-sm">
                En centímetros (cm)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-lg text-light-on-surface">
                  Contorno de pecho (cm)
                </span>
                <input
                  type="number"
                  min={60}
                  max={160}
                  value={formState.chestCm}
                  onChange={(e) =>
                    setFormState({ ...formState, chestCm: Number(e.target.value) || 0 })
                  }
                  className="min-h-[44px] rounded-md bg-light-surface-container-low border border-light-outline-variant px-4 font-mono text-mono-md text-light-on-surface tabular-nums focus:border-light-primary focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-lg text-light-on-surface">
                  Cintura (cm)
                </span>
                <input
                  type="number"
                  min={50}
                  max={160}
                  value={formState.waistCm}
                  onChange={(e) =>
                    setFormState({ ...formState, waistCm: Number(e.target.value) || 0 })
                  }
                  className="min-h-[44px] rounded-md bg-light-surface-container-low border border-light-outline-variant px-4 font-mono text-mono-md text-light-on-surface tabular-nums focus:border-light-primary focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-lg text-light-on-surface">
                  Cadera (cm)
                </span>
                <input
                  type="number"
                  min={60}
                  max={170}
                  value={formState.hipCm}
                  onChange={(e) =>
                    setFormState({ ...formState, hipCm: Number(e.target.value) || 0 })
                  }
                  className="min-h-[44px] rounded-md bg-light-surface-container-low border border-light-outline-variant px-4 font-mono text-mono-md text-light-on-surface tabular-nums focus:border-light-primary focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-lg text-light-on-surface">
                  Largo de piernas (cm)
                </span>
                <input
                  type="number"
                  min={60}
                  max={140}
                  value={formState.legLengthCm}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      legLengthCm: Number(e.target.value) || 0,
                    })
                  }
                  className="min-h-[44px] rounded-md bg-light-surface-container-low border border-light-outline-variant px-4 font-mono text-mono-md text-light-on-surface tabular-nums focus:border-light-primary focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-lg text-light-on-surface">
                  Largo de brazos (cm)
                </span>
                <input
                  type="number"
                  min={40}
                  max={100}
                  value={formState.armLengthCm}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      armLengthCm: Number(e.target.value) || 0,
                    })
                  }
                  className="min-h-[44px] rounded-md bg-light-surface-container-low border border-light-outline-variant px-4 font-mono text-mono-md text-light-on-surface tabular-nums focus:border-light-primary focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-lg text-light-on-surface">
                  Talla habitual de ropa
                </span>
                <select
                  value={formState.clothingSize}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      clothingSize: e.target.value as UserMeasurements['clothingSize'],
                    })
                  }
                  className="min-h-[44px] rounded-md bg-light-surface-container-low border border-light-outline-variant px-4 font-body text-body-lg text-light-on-surface focus:border-light-primary focus:outline-none"
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M (Mediana)</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </label>
            </div>
          </section>

          {/* Calzado Section */}
          <section
            aria-labelledby="calzado-title"
            className="rounded-xl bg-light-surface-container-lowest border border-light-outline-variant p-6 shadow-sm flex flex-col gap-5"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-full bg-pastel-menta text-light-on-secondary-container inline-flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    steps
                  </span>
                </span>
                <h2
                  id="calzado-title"
                  className="font-headline text-headline-md text-light-on-surface"
                >
                  Medidas para calzado
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-pastel-menta text-light-on-secondary-container font-label text-label-sm">
                US · EU · UK
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-lg text-light-on-surface">
                  Longitud del pie (cm)
                </span>
                <input
                  id="foot-cm"
                  type="number"
                  step="0.5"
                  min={20}
                  max={33}
                  value={formState.footLengthCm}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      footLengthCm: Number(e.target.value) || 26,
                    })
                  }
                  className="min-h-[44px] rounded-md bg-light-surface-container-low border border-light-outline-variant px-4 font-mono text-mono-md text-light-on-surface tabular-nums focus:border-light-primary focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-lg text-light-on-surface">
                  Ancho del pie
                </span>
                <select
                  value={formState.footWidth}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      footWidth: e.target.value as UserMeasurements['footWidth'],
                    })
                  }
                  className="min-h-[44px] rounded-md bg-light-surface-container-low border border-light-outline-variant px-4 font-body text-body-lg text-light-on-surface focus:border-light-primary focus:outline-none"
                >
                  <option value="Estrecho">Estrecho</option>
                  <option value="Estándar">Estándar</option>
                  <option value="Ancho">Ancho (Mayor comodidad)</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-lg text-light-on-surface">
                  Talla habitual (EU)
                </span>
                <select
                  value={formState.shoeSizeEU}
                  onChange={(e) => {
                    const eu = Number(e.target.value);
                    const conv = SHOE_SIZE_CONVERSION[eu];
                    setFormState({
                      ...formState,
                      shoeSizeEU: eu,
                      footLengthCm: conv ? Number(conv.cm) : formState.footLengthCm,
                    });
                    setConverterEU(eu);
                  }}
                  className="min-h-[44px] rounded-md bg-light-surface-container-low border border-light-outline-variant px-4 font-mono text-mono-md text-light-on-surface tabular-nums focus:border-light-primary focus:outline-none"
                >
                  {Object.keys(SHOE_SIZE_CONVERSION).map((eu) => (
                    <option key={eu} value={eu}>
                      {eu} EU
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-lg text-light-on-surface">
                  Sistema de tallas preferido
                </span>
                <select
                  value={formState.preferredSystem}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      preferredSystem: e.target
                        .value as UserMeasurements['preferredSystem'],
                    })
                  }
                  className="min-h-[44px] rounded-md bg-light-surface-container-low border border-light-outline-variant px-4 font-body text-body-lg text-light-on-surface focus:border-light-primary focus:outline-none"
                >
                  <option value="EU">EU (Europa)</option>
                  <option value="US">US (Estados Unidos)</option>
                  <option value="UK">UK (Reino Unido)</option>
                </select>
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                className="min-h-[44px] px-6 py-2.5 rounded-full bg-light-primary text-light-on-primary hover:bg-morado-tecnologico font-label text-label-lg inline-flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  save
                </span>
                <span>Guardar mis medidas</span>
              </button>
              {savedVisible && (
                <span
                  role="status"
                  className="font-label text-label-sm text-success inline-flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    check_circle
                  </span>
                  Medidas guardadas para LUMI
                </span>
              )}
            </div>
          </section>
        </form>

        {/* Right 5 cols: Interactive Size Converter + Orientation Disclaimer */}
        <aside
          aria-label="Conversor de tallas y advertencia"
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Interactive US / EU / UK Converter */}
          <section className="rounded-xl bg-pastel-menta/30 border-2 border-pastel-menta p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-headline-md text-light-on-surface">
                Conversor de tallas
              </h2>
              <span
                className="material-symbols-outlined text-[24px] text-light-secondary"
                aria-hidden="true"
              >
                swap_horiz
              </span>
            </div>
            <p className="font-body text-body-md text-light-on-surface-variant text-pretty">
              Elige una talla en cualquier sistema para ver al instante su equivalencia
              aproximada en calzado:
            </p>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-lg text-light-on-surface">
                Selecciona tu talla base (EU)
              </span>
              <select
                id="converter-eu"
                value={converterEU}
                onChange={(e) => setConverterEU(Number(e.target.value))}
                className="min-h-[44px] rounded-md bg-light-surface-container-lowest border border-light-outline-variant px-4 font-mono text-mono-md text-light-on-surface tabular-nums focus:border-light-primary focus:outline-none"
              >
                {Object.entries(SHOE_SIZE_CONVERSION).map(([eu, info]) => (
                  <option key={eu} value={eu}>
                    {eu} EU ({info.cm} cm)
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-light-surface-container-lowest border border-light-outline-variant p-4 flex flex-col items-center gap-1">
                <span className="font-label text-label-sm text-light-on-surface-variant">
                  EU
                </span>
                <span className="font-mono text-title-lg text-light-primary tabular-nums">
                  {converterEU}
                </span>
              </div>
              <div className="rounded-lg bg-light-surface-container-lowest border border-light-outline-variant p-4 flex flex-col items-center gap-1">
                <span className="font-label text-label-sm text-light-on-surface-variant">
                  US
                </span>
                <span className="font-mono text-title-lg text-light-on-surface tabular-nums">
                  {convRow.us}
                </span>
              </div>
              <div className="rounded-lg bg-light-surface-container-lowest border border-light-outline-variant p-4 flex flex-col items-center gap-1">
                <span className="font-label text-label-sm text-light-on-surface-variant">
                  UK
                </span>
                <span className="font-mono text-title-lg text-light-on-surface tabular-nums">
                  {convRow.uk}
                </span>
              </div>
            </div>
          </section>

          {/* Required Disclaimer Card */}
          <div className="rounded-xl bg-pastel-amarillo/55 border border-light-outline-variant p-5 flex items-start gap-3">
            <span
              className="material-symbols-outlined text-[24px] text-light-on-tertiary-container shrink-0"
              aria-hidden="true"
            >
              info
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-title text-title-md text-light-on-tertiary-container">
                Aviso sobre tallas
              </h3>
              <p className="font-body text-body-md text-light-on-tertiary-container text-pretty">
                Las tallas pueden variar según la marca y el diseño de cada fabricante.
                Las recomendaciones y conversiones de LUMI son orientativas.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
