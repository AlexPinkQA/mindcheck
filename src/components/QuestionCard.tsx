import React, { useState } from 'react';
import { Question } from '../types/assessment';
import { ArrowLeft } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface QuestionCardProps {
  question: Question;
  selectedValue?: number;
  onSelectAndNext: (value: number) => void;
  onPrev: () => void;
  canPrev: boolean;
  language: Language;
}

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

  const handleOptionClick = (val: number) => {
    setAnimatingValue(val);
    // Smooth brief delay for tactile feedback before advancing
    setTimeout(() => {
      onSelectAndNext(val);
      setAnimatingValue(null);
    }, 220);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 transition-all animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
          {question.text}
        </h2>
        {question.subtext && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{question.subtext}</p>
        )}
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((opt) => {
          const isSelected = (animatingValue !== null ? animatingValue === opt.value : selectedValue === opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleOptionClick(opt.value)}
              className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all flex items-center justify-between group active:scale-[0.99] ${
                isSelected
                  ? 'border-teal-600 bg-teal-50/80 dark:bg-teal-950/60 shadow-sm text-teal-950 dark:text-teal-200 font-bold ring-1 ring-teal-500/30'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850/80 hover:border-teal-400 dark:hover:border-teal-500 hover:bg-slate-50/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
              }`}
            >
              <span className="text-base leading-relaxed">{opt.label}</span>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ml-3 ${
                  isSelected ? 'border-teal-600 bg-teal-600 dark:border-teal-500 dark:bg-teal-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-teal-400'
                }`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
            canPrev
              ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t.backBtn}
        </button>

        <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">
          Натисніть варіант для переходу далі
        </span>
      </div>
    </div>
  );
};