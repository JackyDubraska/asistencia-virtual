import { useState } from 'react';
import { UI_COPY } from '../data/catalog';
import type { Language, NotificationItem, PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onNotificationClick: (notification: NotificationItem) => void;
  isListening: boolean;
  onToggleVoice: () => void;
  savedCount: number;
}

const LANGUAGES: Language[] = ['ES', 'EN', 'FR', 'PT'];

export function Header({
  currentPage,
  onNavigate,
  language,
  onLanguageChange,
  notifications,
  onMarkAllRead,
  onNotificationClick,
  isListening,
  onToggleVoice,
  savedCount,
}: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const copy = UI_COPY[language];
  const unreadCount = notifications.filter((n) => n.unread).length;

  const navItems: { id: PageId; label: string }[] = [
    { id: 'inicio', label: copy.nav.inicio },
    { id: 'asistente', label: copy.nav.asistente },
    { id: 'sugerencias', label: copy.nav.sugerencias },
    { id: 'tendencias', label: copy.nav.tendencias },
    { id: 'medidas', label: copy.nav.medidas },
    {
      id: 'lista',
      label: savedCount > 0 ? `${copy.nav.lista} (${savedCount})` : copy.nav.lista,
    },
  ];

  const cycleLanguage = () => {
    const idx = LANGUAGES.indexOf(language);
    onLanguageChange(LANGUAGES[(idx + 1) % LANGUAGES.length]);
  };

  return (
    <header className="sticky top-0 z-30 bg-light-surface-container-lowest border-b border-light-outline-variant">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-3 flex items-center justify-between gap-2 lg:gap-4">
        <button
          type="button"
          onClick={() => onNavigate('inicio')}
          className="flex items-center gap-2.5 lg:gap-3 shrink-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-light-primary rounded-md cursor-pointer"
        >
          <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-md bg-pastel-lila text-light-on-primary-container flex items-center justify-center relative shrink-0 border border-light-outline-variant">
            <span className="material-symbols-outlined text-[22px] lg:text-[24px]" aria-hidden="true">
              shopping_bag
            </span>
            <span
              className="material-symbols-outlined material-symbols-filled text-[12px] lg:text-[14px] text-light-primary absolute top-1 right-1"
              aria-hidden="true"
            >
              auto_awesome
            </span>
          </div>
          <div className="flex flex-col shrink-0">
            <span className="font-headline text-title-md text-light-on-surface tracking-tight whitespace-nowrap">
              SUGERENCIAS
            </span>
            <span className="font-label text-label-sm text-light-on-surface-variant whitespace-nowrap">
              {copy.brandSub}
            </span>
          </div>
        </button>

        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-1 shrink-0">
          {navItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={active ? 'page' : undefined}
                onClick={() => onNavigate(item.id)}
                className={`min-h-[44px] px-3.5 rounded-full font-label text-label-lg inline-flex items-center shrink-0 whitespace-nowrap transition-colors duration-state-change cursor-pointer ${
                  active
                    ? 'bg-pastel-lila text-light-on-primary-container'
                    : 'text-light-on-surface-variant hover:bg-light-surface-container-low'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0 relative">
          {/* Desktop Language Selector */}
          <div
            className="hidden sm:flex items-center bg-light-surface-container-low border border-light-outline-variant rounded-full p-1 shrink-0"
            role="group"
            aria-label="Selector de idioma"
          >
            {LANGUAGES.map((lang) => {
              const active = language === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  className={`min-h-[36px] px-2.5 rounded-full font-label text-label-sm cursor-pointer transition-colors ${
                    active
                      ? 'bg-light-surface-container-lowest text-light-primary shadow-sm'
                      : 'text-light-on-surface-variant hover:text-light-on-surface'
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>

          {/* Mobile Compact Language Button */}
          <button
            type="button"
            onClick={cycleLanguage}
            aria-label={`Cambiar idioma (${language})`}
            className="sm:hidden min-h-[40px] px-3 rounded-full bg-light-surface-container-lowest border border-light-outline-variant font-label text-label-sm text-light-primary cursor-pointer"
          >
            {language}
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen((prev) => !prev)}
              aria-expanded={notifOpen}
              aria-label={`Notificaciones (${unreadCount} nuevas)`}
              className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-pastel-amarillo text-light-on-tertiary-container hover:opacity-90 inline-flex items-center justify-center relative shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] lg:text-[22px]" aria-hidden="true">
                notifications
              </span>
              {unreadCount > 0 && (
                <span
                  className="w-2.5 h-2.5 rounded-full bg-light-primary absolute top-2 right-2 lg:top-2.5 lg:right-2.5"
                  aria-hidden="true"
                />
              )}
            </button>

            {notifOpen && (
              <div
                role="dialog"
                aria-label="Notificaciones de LUMI"
                className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-light-surface-container-lowest border border-light-outline-variant shadow-lg p-4 z-50 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-light-outline-variant">
                  <span className="font-title text-title-md text-light-on-surface">
                    Notificaciones ({unreadCount})
                  </span>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={onMarkAllRead}
                      className="font-label text-label-sm text-light-primary hover:underline cursor-pointer"
                    >
                      Marcar leídas
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => {
                        onNotificationClick(n);
                        setNotifOpen(false);
                      }}
                      className={`text-left rounded-lg p-3 border transition-colors cursor-pointer ${
                        n.unread
                          ? 'bg-pastel-amarillo/35 border-pastel-durazno hover:bg-pastel-amarillo/55'
                          : 'bg-light-surface-container-low border-light-outline-variant hover:bg-pastel-rosa/30'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-label text-label-sm text-light-primary">
                          {n.category}
                        </span>
                        <span className="font-label text-label-sm text-light-on-surface-variant">
                          {n.time}
                        </span>
                      </div>
                      <p className="font-title text-title-md text-light-on-surface mt-0.5">
                        {n.title}
                      </p>
                      <p className="font-body text-body-md text-light-on-surface-variant mt-0.5">
                        {n.detail}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Voice LUMI Button */}
          <button
            type="button"
            id="header-voice-btn"
            onClick={onToggleVoice}
            aria-pressed={isListening}
            className={`min-h-[40px] lg:min-h-[44px] px-3 lg:px-5 py-2 rounded-full border hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-secondary transition-all duration-state-change inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer ${
              isListening
                ? 'bg-light-secondary text-light-on-secondary border-light-secondary'
                : 'bg-pastel-menta text-light-on-secondary-container border-light-secondary'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              {isListening ? 'graphic_eq' : 'mic'}
            </span>
            <span className="hidden md:inline font-label text-label-lg whitespace-nowrap">
              {isListening ? 'Escuchando...' : copy.voiceBtn}
            </span>
          </button>
        </div>
      </div>

      {/* Compact Mobile Navigation Pills */}
      <nav
        aria-label="Navegación móvil"
        className="lg:hidden px-4 pb-2.5 flex items-center gap-2 overflow-x-auto"
      >
        {navItems.map((item) => {
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-current={active ? 'page' : undefined}
              onClick={() => onNavigate(item.id)}
              className={`min-h-[36px] px-3.5 rounded-full font-label text-label-sm inline-flex items-center shrink-0 whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-pastel-lila text-light-on-primary-container'
                  : 'bg-light-surface-container-low text-light-on-surface-variant'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
