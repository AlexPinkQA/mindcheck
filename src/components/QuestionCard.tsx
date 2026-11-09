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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 transition-all animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 leading-snug">
          {question.text}
        </h2>
        {question.subtext && (
          <p className="text-sm text-slate-500 mt-2">{question.subtext}</p>
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
              className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center justify-between group active:scale-[0.99] ${
                isSelected
                  ? 'border-teal-600 bg-teal-50/80 shadow-sm text-teal-950 font-semibold'
                  : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50/70 text-slate-800'
              }`}
            >
              <span className="text-base leading-relaxed">{opt.label}</span>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isSelected ? 'border-teal-600 bg-teal-600' : 'border-slate-300 group-hover:border-teal-400'
                }`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
            canPrev
              ? 'text-slate-700 hover:bg-slate-100'
              : 'text-slate-300 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t.backBtn}
        </button>

        <span className="text-[11px] text-slate-400 italic">
          Натисніть варіант для переходу далі
        </span>
      </div>
    </div>
  );
};
