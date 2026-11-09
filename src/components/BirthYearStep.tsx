import React from 'react';
import { Language, translations } from '../data/translations';
import { Calendar, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface BirthYearStepProps {
  language: Language;
  selectedYear?: number;
  onSelectYear: (year: number) => void;
  onContinue: () => void;
  onBack: () => void;
}

const currentYear = 2026;
const years: number[] = Array.from({ length: 80 }, (_, i) => currentYear - 10 - i);

export const BirthYearStep: React.FC<BirthYearStepProps> = ({
  language,
  selectedYear,
  onSelectYear,
  onContinue,
  onBack,
}) => {
  const t = translations[language];
  const isUnder18 = selectedYear ? (currentYear - selectedYear < 18) : false;

  return (
    <div className="space-y-6 animate-fade-in max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-teal-600" />
          <span>Крок 2 з 3 • Step 2 of 3</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.birthYearTitle}
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          {t.birthYearSubtitle}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div>
          <label htmlFor="birth-year" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
            Рік народження / Birth year
          </label>
          <select
            id="birth-year"
            value={selectedYear || ''}
            onChange={(e) => onSelectYear(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-600 focus:outline-hidden bg-slate-50 font-medium text-slate-900 text-base"
          >
            <option value="" disabled>
              {t.birthYearPlaceholder}
            </option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y} ({currentYear - y} {language === 'uk' ? 'р.' : 'y.o.'})
              </option>
            ))}
          </select>
        </div>

        {selectedYear && (
          <div className="p-3.5 rounded-xl border transition-all text-xs flex items-center gap-2.5 bg-teal-50/70 border-teal-200 text-teal-900">
            <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
            <div>
              <span className="font-bold block">
                {isUnder18 ? t.youthBadge : `${currentYear - selectedYear} років / years old`}
              </span>
              <span className="text-[11px] text-teal-800/80">
                {isUnder18
                  ? 'Вам будуть доступні делікатні підліткові чати та лінії допомоги.'
                  : 'Рекомендації будуть адаптовані для дорослої аудиторії.'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 text-sm font-medium transition"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.backBtn}
        </button>

        <button
          type="button"
          onClick={onContinue}
          disabled={!selectedYear}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm ${
            selectedYear
              ? 'bg-teal-700 text-white hover:bg-teal-800'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>{t.continueBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
