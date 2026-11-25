import { UI_COPY } from '../data/catalog';
import type { Language } from '../types';

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const copy = UI_COPY[language];

  return (
    <footer className="bg-light-surface-container-low border-t border-light-outline-variant mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-title text-title-md text-light-on-surface">
            SUGERENCIAS · Sugerencias AI
          </span>
          <span className="font-body text-body-md text-light-on-surface-variant">
            {copy.footerTagline}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-label text-label-sm text-light-on-surface-variant inline-flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[18px] text-light-secondary"
              aria-hidden="true"
            >
              accessibility_new
            </span>
            {copy.footerAccess}
          </span>
          <span className="font-label text-label-sm text-light-on-surface-variant">
            {copy.footerDisclaimer}
          </span>
        </div>
      </div>
    </footer>
  );
}
