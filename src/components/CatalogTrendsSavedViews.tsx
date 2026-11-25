import { useMemo, useState } from 'react';
import { PRODUCTS_CATALOG, TREND_ITEMS } from '../data/catalog';
import type { Language, PageId, Product, UserMeasurements } from '../types';
import { ProductCard } from './ProductCard';

interface SugerenciasCatalogViewProps {
  language: Language;
  measurements: UserMeasurements;
  savedIds: string[];
  onCompareProduct: (product: Product) => void;
  onListenProduct: (product: Product) => void;
  onToggleSave: (productId: string) => void;
}

export function SugerenciasCatalogView({
  language,
  measurements,
  savedIds,
  onCompareProduct,
  onListenProduct,
  onToggleSave,
}: SugerenciasCatalogViewProps) {
  const [category, setCategory] = useState<'Todos' | Product['category']>('Todos');
  const [budget, setBudget] = useState<'all' | 'under50' | 'under60'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return PRODUCTS_CATALOG.filter((p) => {
      if (category !== 'Todos' && p.category !== category) return false;
      if (budget === 'under50' && p.price > 50) return false;
      if (budget === 'under60' && p.price > 60) return false;
      if (
        query.trim() &&
        !`${p.name} ${p.description} ${p.category}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [category, budget, query]);

  const categories: ('Todos' | Product['category'])[] = [
    'Todos',
    'Calzado',
    'Tecnología',
    'Ropa',
    'Hogar',
  ];

  return (
    <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 lg:px-6 py-8 flex flex-col gap-8">
      <section className="rounded-xl bg-gradient-to-r from-pastel-lila/40 via-light-surface-container-lowest to-pastel-menta/40 border border-light-outline-variant p-6 lg:p-8 flex flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-display-lg-mobile lg:text-headline-lg text-light-on-surface">
              Todas las sugerencias de LUMI
            </h1>
            <p className="font-body text-body-lg text-light-on-surface-variant">
              Catálogo curado para tu talla {measurements.shoeSizeEU} EU /{' '}
              {measurements.clothingSize}, con precios claros y lectura por voz.
            </p>
          </div>
          <div className="w-full sm:w-80 flex items-center gap-2 bg-light-surface-container-lowest border border-light-outline-variant rounded-full px-4 py-1.5">
            <span className="material-symbols-outlined text-[20px] text-light-primary">
              search
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filtrar productos..."
              aria-label="Filtrar sugerencias"
              className="flex-1 min-w-0 bg-transparent border-none focus:outline-none font-body text-body-md text-light-on-surface"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Categorías">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`min-h-[40px] px-4 rounded-full font-label text-label-sm cursor-pointer transition-colors ${
                  category === cat
                    ? 'bg-light-primary text-light-on-primary'
                    : 'bg-light-surface-container-lowest border border-light-outline-variant text-light-on-surface-variant hover:bg-pastel-lila/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2" role="group" aria-label="Presupuesto">
            <button
              type="button"
              onClick={() => setBudget('all')}
              className={`min-h-[36px] px-3 rounded-full font-label text-label-sm cursor-pointer ${
                budget === 'all'
                  ? 'bg-pastel-menta text-light-on-secondary-container border border-light-secondary'
                  : 'bg-light-surface-container-lowest border border-light-outline-variant text-light-on-surface-variant'
              }`}
            >
              Cualquier precio
            </button>
            <button
              type="button"
              onClick={() => setBudget('under60')}
              className={`min-h-[36px] px-3 rounded-full font-label text-label-sm cursor-pointer ${
                budget === 'under60'
                  ? 'bg-pastel-menta text-light-on-secondary-container border border-light-secondary'
                  : 'bg-light-surface-container-lowest border border-light-outline-variant text-light-on-surface-variant'
              }`}
            >
              Menos de $60
            </button>
            <button
              type="button"
              onClick={() => setBudget('under50')}
              className={`min-h-[36px] px-3 rounded-full font-label text-label-sm cursor-pointer ${
                budget === 'under50'
                  ? 'bg-pastel-menta text-light-on-secondary-container border border-light-secondary'
                  : 'bg-light-surface-container-lowest border border-light-outline-variant text-light-on-surface-variant'
              }`}
            >
              Menos de $50
            </button>
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-xl bg-light-surface-container-lowest border border-light-outline-variant p-10 text-center flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-[40px] text-light-primary">
            search_off
          </span>
          <p className="font-title text-title-lg text-light-on-surface">
            No encontramos productos con esos filtros
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory('Todos');
              setBudget('all');
              setQuery('');
            }}
            className="min-h-[44px] px-5 rounded-full bg-pastel-lila text-light-on-primary-container font-label text-label-lg cursor-pointer"
          >
            Mostrar todos los productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filtered.map((product) => (
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
      )}
    </main>
  );
}

interface TendenciasViewProps {
  measurements: UserMeasurements;
  alertsEnabled: boolean;
  onToggleAlerts: () => void;
  onCompareProduct: (product: Product) => void;
  onSpeakText: (text: string) => void;
}

export function TendenciasView({
  measurements,
  alertsEnabled,
  onToggleAlerts,
  onCompareProduct,
  onSpeakText,
}: TendenciasViewProps) {
  return (
    <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 lg:px-6 py-8 flex flex-col gap-8">
      <section className="rounded-xl bg-pastel-menta/30 border border-light-outline-variant p-6 lg:p-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="font-display text-display-lg-mobile lg:text-headline-lg text-light-on-surface">
            Tendencias y novedades para ti
          </h1>
          <p className="font-body text-body-lg text-light-on-surface-variant">
            Bajadas de precio y novedades accesibles filtradas según tu talla{' '}
            {measurements.shoeSizeEU} EU y tus intereses, sin ruido ni prisa.
          </p>
        </div>
        <button
          type="button"
          onClick={onToggleAlerts}
          className={`min-h-[44px] px-5 rounded-full font-label text-label-lg inline-flex items-center gap-2 cursor-pointer ${
            alertsEnabled
              ? 'bg-pastel-amarillo text-light-on-tertiary-container'
              : 'bg-light-surface-container-lowest border border-light-outline-variant text-light-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {alertsEnabled ? 'notifications_active' : 'notifications_off'}
          </span>
          <span>{alertsEnabled ? 'Alertas activas' : 'Alertas pausadas'}</span>
        </button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TREND_ITEMS.map((trend) => {
          const related = PRODUCTS_CATALOG.find((p) => p.id === trend.relatedProductId);
          return (
            <article
              key={trend.id}
              className="rounded-xl bg-light-surface-container-lowest border border-light-outline-variant p-6 shadow-sm flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-label text-label-sm text-light-primary">
                    {trend.categoryLabel}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-pastel-amarillo text-light-on-tertiary-container font-label text-label-sm">
                    {trend.savingsBadge}
                  </span>
                </div>
                <h2 className="font-title text-title-lg text-light-on-surface">
                  {trend.title}
                </h2>
                <p className="font-body text-body-md text-light-on-surface-variant">
                  {trend.description}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-light-outline-variant">
                {related && (
                  <button
                    type="button"
                    onClick={() => onCompareProduct(related)}
                    className="flex-1 min-h-[44px] px-4 rounded-full bg-pastel-lila text-light-on-primary-container font-label text-label-lg cursor-pointer hover:opacity-90"
                  >
                    Comparar {related.name}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onSpeakText(`${trend.title}. ${trend.description}`)}
                  aria-label={`Escuchar novedad: ${trend.title}`}
                  className="w-11 h-11 rounded-full bg-pastel-menta text-light-on-secondary-container inline-flex items-center justify-center cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">volume_up</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

interface ListaSavedViewProps {
  language: Language;
  measurements: UserMeasurements;
  savedIds: string[];
  onNavigate: (page: PageId) => void;
  onCompareProduct: (product: Product) => void;
  onListenProduct: (product: Product) => void;
  onToggleSave: (productId: string) => void;
}

export function ListaSavedView({
  language,
  measurements,
  savedIds,
  onNavigate,
  onCompareProduct,
  onListenProduct,
  onToggleSave,
}: ListaSavedViewProps) {
  const savedProducts = PRODUCTS_CATALOG.filter((p) => savedIds.includes(p.id));
  const totalEstimate = savedProducts.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 lg:px-6 py-8 flex flex-col gap-8">
      <section className="rounded-xl bg-pastel-lila/35 border border-light-outline-variant p-6 lg:p-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-display text-display-lg-mobile lg:text-headline-lg text-light-on-surface">
            Mi lista guardada
          </h1>
          <p className="font-body text-body-lg text-light-on-surface-variant">
            Guarda tus opciones favoritas aquí para compararlas con calma junto a LUMI.
          </p>
        </div>

        <div className="rounded-xl bg-light-surface-container-lowest border border-light-outline-variant px-5 py-3 flex items-center gap-6">
          <div className="flex flex-col">
            <span className="font-label text-label-sm text-light-on-surface-variant">
              Productos
            </span>
            <span className="font-mono text-title-lg text-light-on-surface tabular-nums">
              {savedProducts.length}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label text-label-sm text-light-on-surface-variant">
              Estimado total
            </span>
            <span className="font-mono text-title-lg text-light-primary tabular-nums">
              ${totalEstimate.toFixed(2)} USD
            </span>
          </div>
        </div>
      </section>

      {savedProducts.length === 0 ? (
        <div className="rounded-xl bg-light-surface-container-lowest border border-light-outline-variant p-10 text-center flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-[44px] text-light-primary">
            bookmark_add
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="font-headline text-title-lg text-light-on-surface">
              Tu lista está vacía por ahora
            </h2>
            <p className="font-body text-body-md text-light-on-surface-variant">
              Toca el icono de marcador en cualquier producto para guardarlo aquí.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('sugerencias')}
            className="min-h-[44px] px-6 rounded-full bg-light-primary text-light-on-primary font-label text-label-lg cursor-pointer"
          >
            Explorar sugerencias
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {savedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              measurements={measurements}
              language={language}
              isSaved={true}
              onCompare={onCompareProduct}
              onListen={onListenProduct}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      )}
    </main>
  );
}
