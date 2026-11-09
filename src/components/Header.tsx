import React from 'react';
import { ShieldCheck, HeartHandshake, Globe, Moon, Sun, Settings } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface HeaderProps {
  language: Language;
  onLogoClick: () => void;
  onOpenSetup: () => void;
  onCrisisClick: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const langLabels: Record<Language, string> = {
  uk: '🇺🇦 UA',
  en: '🇬🇧 EN',
  es: '🇪🇸 ES',
  pt: '🇵🇹 PT',
};

export const Header: React.FC<HeaderProps> = ({
  language,
  onLogoClick,
  onOpenSetup,
  onCrisisClick,
  darkMode,
  onToggleDarkMode,
}) => {
  const t = translations[language];

  return (
    <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Clickable Logo with restart confirmation */}
        <button
          type="button"
          onClick={onLogoClick}
          className="flex items-center gap-2.5 text-left group transition cursor-pointer select-none"
          title="Повернутися на початок / Start over"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-700 flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-base sm:text-lg group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                MindCheck
              </span>
              <span className="hidden sm:inline-block text-[11px] text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-full font-medium border border-teal-200/60 dark:border-teal-800">
                Zero-Data
              </span>
            </div>
          </div>
        </button>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Setup / Language Popup trigger */}
          <button
            type="button"
            onClick={onOpenSetup}
            className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-2.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 font-semibold transition"
            title="Налаштування тестування / Test settings"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>{langLabels[language]}</span>
            <Settings className="w-3 h-3 text-slate-400 dark:text-slate-500 hidden sm:inline-block ml-0.5" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-1.5 sm:p-2 text-slate-700 dark:text-amber-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-200/80 dark:border-slate-700 transition"
            aria-label={darkMode ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}
            title={darkMode ? 'Світлий режим' : 'Нічний режим'}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Anonymous badge (desktop) */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700">
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="truncate max-w-[130px]">{t.anonymousBadge}</span>
          </div>

          {/* Crisis Help Button */}
          <button
            type="button"
            onClick={onCrisisClick}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200/80 dark:border-rose-900 transition shrink-0"
          >
            <HeartHandshake className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="hidden xs:inline-block sm:inline-block">{t.crisisHelpBtn}</span>
          </button>
        </div>
      </div>
    </header>
  );
};