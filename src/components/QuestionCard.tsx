import React, { useState } from 'react';
import { Question } from '../types/assessment';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface QuestionCardProps {
  question: Question;
  selectedValue?: number;
  onSelectAndNext: (value: number) => void;
  onPrev: () => void;
  canPrev: boolean;
  language: Language;
}

const categoryLabels: Record<string, Record<Language, string>> = {
  depression: {
    uk: 'PHQ-9 • Настрій та депресивний спектр',
    en: 'PHQ-9 • Mood & Depression',
    es: 'PHQ-9 • Estado de ánimo',
    pt: 'PHQ-9 • Humor e depressão',
  },
  anxiety: {
    uk: 'GAD-7 • Тривожність та напруга',
    en: 'GAD-7 • Anxiety & Tension',
    es: 'GAD-7 • Ansiedad y tensión',
    pt: 'GAD-7 • Ansiedade e tensão',
  },
  sleep: {
    uk: 'Сон та відновлення сил',
    en: 'Sleep & Recovery',
    es: 'Sueño y recuperación',
    pt: 'Sono e recuperação',
  },
  context: {
    uk: 'Вплив на життя та тривалість',
    en: 'Daily Impact & Duration',
    es: 'Impacto vital y duración',
    pt: 'Impacto diário e duração',
  },
  crisis: {
    uk: 'Критична безпека та підтримка',
    en: 'Safety & Emotional Support',
    es: 'Seguridad y apoyo emocional',
    pt: 'Segurança e apoio emocional',
  },
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedValue,
  onSelectAndNext,
  onPrev,
  canPrev,
  language,
}) => {
  const [animatingValue, setAnimatingValue] = useState<number | null>(null);
  const t = translations[language];
  const catLabel = categoryLabels[question.category]?.[language] || categoryLabels[question.category]?.['uk'] || 'Скринінг';

  const handleOptionClick = (val: number) => {
    setAnimatingValue(val);
    setTimeout(() => {
      onSelectAndNext(val);
      setAnimatingValue(null);
    }, 200);
  };

  return (
    <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-6 sm:p-9 transition-all animate-fade-in">
      {/* Category Pill */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200/70 dark:border-teal-800">
          <Sparkles className="w-3 h-3 text-teal-600 dark:text-teal-400" />
          {catLabel}
        </span>
      </div>

      {/* Question Header */}
      <div className="mb-7">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug tracking-tight">
          {question.text}
        </h2>
        {question.subtext && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
            {question.subtext}
          </p>
        )}
      </div>

      {/* Modern Options Stack */}
      <div className="space-y-3 mb-7">
        {question.options.map((opt, idx) => {
          const isSelected = (animatingValue !== null ? animatingValue === opt.value : selectedValue === opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleOptionClick(opt.value)}
              className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-150 flex items-center justify-between group active:scale-[0.99] cursor-pointer ${
                isSelected
                  ? 'border-teal-600 dark:border-teal-500 bg-teal-50/90 dark:bg-teal-950/70 shadow-md shadow-teal-500/10 text-teal-950 dark:text-teal-100 font-bold ring-2 ring-teal-500/20'
                  : 'border-slate-200/90 dark:border-slate-800 bg-white/70 dark:bg-slate-850/60 hover:border-teal-400 dark:hover:border-teal-500 hover:bg-teal-50/40 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/60 group-hover:text-teal-800'
                }`}>
                  {idx + 1}
                </span>
                <span className="text-sm sm:text-base leading-relaxed">{opt.label}</span>
              </div>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ml-3 ${
                  isSelected
                    ? 'border-teal-600 bg-teal-600 dark:border-teal-400 dark:bg-teal-400 scale-105'
                    : 'border-slate-300 dark:border-slate-600 group-hover:border-teal-400'
                }`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-white dark:bg-slate-950" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800/80">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            canPrev
              ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backBtn}</span>
        </button>

        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          Оберіть варіант для автопереходу
        </span>
      </div>
    </div>
  );
};