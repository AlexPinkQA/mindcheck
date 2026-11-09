import React from 'react';
import { Question } from '../types/assessment';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedValue?: number;
  onSelect: (value: number) => void;
  onNext: () => void;
  onPrev: () => void;
  canPrev: boolean;
  isLast: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedValue,
  onSelect,
  onNext,
  onPrev,
  canPrev,
  isLast,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 transition-all">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 leading-snug">
          {question.text}
        </h2>
        {question.subtext && (
          <p className="text-sm text-slate-500 mt-2">{question.subtext}</p>
        )}
      </div>

      <div className="space-y-3 mb-8">
        {question.options.map((opt) => {
          const isSelected = selectedValue === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                isSelected
                  ? 'border-teal-600 bg-teal-50/60 shadow-sm text-teal-950 font-medium'
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
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
            canPrev
              ? 'text-slate-700 hover:bg-slate-100'
              : 'text-slate-300 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={selectedValue === undefined}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm ${
            selectedValue !== undefined
              ? 'bg-teal-700 text-white hover:bg-teal-800'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>{isLast ? 'Отримати результат' : 'Далі'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
