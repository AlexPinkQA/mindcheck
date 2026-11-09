import React from 'react';
import { ShieldCheck, HeartHandshake, Globe } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface HeaderProps {
  language: Language;
  onChangeLanguage: () => void;
  onCrisisClick: () => void;
}

const langLabels: Record<Language, string> = {
  uk: '🇺🇦 UA',
  en: '🇬🇧 EN',
  es: '🇪🇸 ES',
  pt: '🇵🇹 PT',
};

export const Header: React.FC<HeaderProps> = ({ language, onChangeLanguage, onCrisisClick }) => {
  const t = translations[language];

  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            M
          </div>
          <div>
            <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">MindCheck</span>
            <span className="hidden sm:inline-block ml-2 text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full font-medium border border-teal-200/60">
              Zero-Data
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onChangeLanguage}
            className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-200/80 font-medium transition"
            title="Змінити мову / Change language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{langLabels[language]}</span>
          </button>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100/80 px-2.5 py-1.5 rounded-lg border border-slate-200/60">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>{t.anonymousBadge}</span>
          </div>

          <button
            onClick={onCrisisClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 text-xs font-semibold hover:bg-rose-100 border border-rose-200 transition"
          >
            <HeartHandshake className="w-4 h-4 text-rose-600" />
            <span>{t.crisisHelpBtn}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
