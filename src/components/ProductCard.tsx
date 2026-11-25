import { UI_COPY } from '../data/catalog';
import type { Language, Product, UserMeasurements } from '../types';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: Product;
  measurements: UserMeasurements;
  language: Language;
  isSaved: boolean;
  onCompare: (product: Product) => void;
  onListen: (product: Product) => void;
  onToggleSave: (productId: string) => void;
}

export function ProductCard({
  product,
  measurements,
  language,
  isSaved,
  onCompare,
  onListen,
  onToggleSave,
}: ProductCardProps) {
  const copy = UI_COPY[language];

  let badgeLabel = product.badgeText || '';
  let badgeClass = 'bg-pastel-menta text-light-on-secondary-container';

  if (product.badgeType === 'size_shoe') {
    badgeLabel = `Tu talla: ${measurements.shoeSizeEU} EU`;
    badgeClass = 'bg-pastel-menta text-light-on-secondary-container';
  } else if (product.badgeType === 'size_cloth') {
    badgeLabel = `Tu talla: ${measurements.clothingSize}`;
    badgeClass = 'bg-pastel-durazno text-light-on-tertiary-container';
  } else if (product.badgeType === 'discount') {
    badgeClass = 'bg-pastel-amarillo text-light-on-tertiary-container';
  } else if (product.badgeType === 'trend') {
    badgeClass = 'bg-pastel-rosa text-light-on-surface';
  }

  return (
    <article className="h-full rounded-lg bg-light-surface-container-lowest border border-light-outline-variant p-5 flex flex-col justify-between gap-4 shadow-sm hover:-translate-y-0.5 transition-transform duration-state-change">
      <div className="flex flex-col gap-3">
        <div className="relative rounded-md overflow-hidden bg-light-surface-container-low">
          <ResilientImage
            src={product.image}
            alt={product.imageAlt}
            fallbackIcon={product.fallbackIcon}
            className="w-full h-44 object-cover"
          />
          {badgeLabel && (
            <span
              className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full font-label text-label-sm ${badgeClass}`}
            >
              {badgeLabel}
            </span>
          )}
        </div>

        <header className="flex flex-col gap-1">
          <h3 className="font-title text-title-lg text-light-on-surface">
            {product.name}
          </h3>
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-mono-md text-light-primary tabular-nums">
              ${product.price.toFixed(2)} USD
            </p>
            <span
              className={`font-label text-label-sm ${
                product.highlightText === 'Mejor precio' ||
                product.highlightText === 'Ajuste ideal'
                  ? 'text-success'
                  : 'text-light-on-surface-variant'
              }`}
            >
              {product.highlightText}
            </span>
          </div>
        </header>

        <p className="font-body text-body-md text-light-on-surface-variant text-pretty">
          {product.description}
        </p>
      </div>

      <footer className="flex items-center gap-2 pt-3 border-t border-light-outline-variant">
        <button
          type="button"
          onClick={() => onCompare(product)}
          className="flex-1 min-h-[44px] px-4 rounded-full bg-pastel-lila text-light-on-primary-container hover:opacity-90 font-label text-label-lg cursor-pointer whitespace-nowrap"
        >
          {copy.compareBtn}
        </button>
        <button
          type="button"
          onClick={() => onListen(product)}
          aria-label={`Escuchar descripción de ${product.name}`}
          className="w-11 h-11 rounded-full bg-pastel-menta text-light-on-secondary-container hover:opacity-90 inline-flex items-center justify-center cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            volume_up
          </span>
        </button>
        <button
          type="button"
          onClick={() => onToggleSave(product.id)}
          aria-pressed={isSaved}
          aria-label={
            isSaved
              ? `Quitar ${product.name} de guardados`
              : `Guardar ${product.name}`
          }
          className={`w-11 h-11 rounded-full hover:opacity-90 inline-flex items-center justify-center cursor-pointer shrink-0 transition-colors ${
            isSaved
              ? 'bg-light-primary text-light-on-primary'
              : 'bg-pastel-rosa text-light-on-surface'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              isSaved ? 'material-symbols-filled' : ''
            }`}
            aria-hidden="true"
          >
            bookmark
          </span>
        </button>
      </footer>
    </article>
  );
}
