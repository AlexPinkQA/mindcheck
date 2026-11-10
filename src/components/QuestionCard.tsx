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
  trauma: {
    uk: 'Травматичний стрес та ПТСР',
    en: 'Traumatic Stress & PTSD',
    es: 'Estrés traumático y TEPT',
    pt: 'Stress traumático e PTSR',
  },
};

const dassCategoryLabels: Record<string, Record<Language, string>> = {
  stress: {
    uk: 'DASS-21 • Шкала хронічного стресу',
    en: 'DASS-21 • Chronic Stress Scale',
    es: 'DASS-21 • Escala de estrés crónico',
    pt: 'DASS-21 • Escala de stress crónico',
  },
  anxiety: {
    uk: 'DASS-21 • Шкала тривожності',
    en: 'DASS-21 • Anxiety Scale',
    es: 'DASS-21 • Escala de ansiedad',
    pt: 'DASS-21 • Escala de ansiedade',
  },
  depression: {
    uk: 'DASS-21 • Шкала депресії',
    en: 'DASS-21 • Depression Scale',
    es: 'DASS-21 • Escala de depresión',
    pt: 'DASS-21 • Escala de depressão',
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
  const isDass = question.id.startsWith('dass_');
  const catMap = isDass ? dassCategoryLabels : categoryLabels;
  const catLabel = catMap[question.category]?.[language] || catMap[question.category]?.['uk'] || 'MindCheck';

  const handleOptionClick = (val: number) => {
    setAnimatingValue(val);
    setTimeout(() => {
      onSelectAndNext(val);
      setAnimatingValue(null);
    }, 200);
  };

  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200 dark:border-slate-800 p-6 sm:p-9 transition-all animate-fade-in text-slate-900 dark:text-slate-100">
      {/* Category Pill - Centered on mobile, aligned on desktop */}
      <div className="flex items-center justify-center sm:justify-start mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
          <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          {catLabel}
        </span>
      </div>

      {/* Question Header */}
      <div className="mb-7 text-center sm:text-left">
        {question.subtext && (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-2 font-semibold leading-relaxed">
            {question.subtext}
          </p>
        )}
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug tracking-tight">
          {question.text}
        </h2>
      </div>

      {/* Modern High-Contrast Options Stack */}
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
                  ? 'border-teal-600 dark:border-teal-400 bg-teal-50 dark:bg-teal-950/80 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/30'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-teal-50/40 dark:hover:bg-slate-700/80'
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <span className={`w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-teal-600 dark:bg-teal-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/60 group-hover:text-teal-800'
                }`}>
                  {idx + 1}
                </span>
                <span className={`text-sm sm:text-base leading-relaxed font-semibold transition-colors ${
                  isSelected
                    ? 'text-teal-950 dark:text-teal-100'
                    : 'text-slate-800 dark:text-slate-100'
                }`}>
                  {opt.label}
                </span>
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
      <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800">
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
          {t.autoAdvanceHint}
        </span>
      </div>
    </div>
  );
};