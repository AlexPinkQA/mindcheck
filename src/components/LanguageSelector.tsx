import React from 'react';
import { Language, translations } from '../data/translations';
import { Globe2, ArrowRight } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onSelect: (lang: Language) => void;
}

const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onSelect }) => {
  const t = translations[currentLanguage];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold">
          <Globe2 className="w-3.5 h-3.5 text-teal-600" />
          <span>Крок 1 з 3 • Step 1 of 3</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.selectLanguage}
        </h1>
        <p className="text-sm text-slate-500">
          {t.languageDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
        {languages.map((lang) => {
          const isSelected = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSelect(lang.code)}
              className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${
                isSelected
                  ? 'border-teal-600 bg-teal-50/70 shadow-sm text-teal-950 font-bold'
                  : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50/80 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <div>
                  <span className="text-base block font-bold leading-tight">{lang.nativeName}</span>
                  <span className="text-xs text-slate-400 font-normal">{lang.name}</span>
                </div>
              </div>
              <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isSelected ? 'text-teal-700' : 'text-slate-300'}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
