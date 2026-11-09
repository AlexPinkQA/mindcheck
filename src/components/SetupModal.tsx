import React, { useState, useEffect } from 'react';
import { Globe, Calendar, Zap, Microscope, X, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { AssessmentMode } from '../types/assessment';

export type SetupStep = 'language' | 'birth_year' | 'mode';

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  birthYear?: number;
  onSelectBirthYear: (year: number) => void;
  mode: AssessmentMode;
  onSelectMode: (mode: AssessmentMode) => void;
  onStartAssessment: () => void;
  initialStep?: SetupStep;
}

const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
];

const currentYear = 2026;
const years: number[] = Array.from({ length: 80 }, (_, i) => currentYear - 10 - i);

export const SetupModal: React.FC<SetupModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectLanguage,
  birthYear,
  onSelectBirthYear,
  mode,
  onSelectMode,
  onStartAssessment,
  initialStep = 'language',
}) => {
  const [activeStep, setActiveStep] = useState<SetupStep>(initialStep);

  useEffect(() => {
    if (isOpen) {
      setActiveStep(initialStep);
    }
  }, [isOpen, initialStep]);

  if (!isOpen) return null;

  const t = translations[language];
  const isUnder18 = birthYear ? currentYear - birthYear < 18 : false;

  const handleStart = () => {
    onClose();
    onStartAssessment();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Налаштування тестування / Setup
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              MindCheck
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Закрити"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Navigation Tabs */}
        <div className="px-6 pt-3 pb-1 bg-slate-50/70 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setActiveStep('language')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-xl transition ${
                activeStep === 'language'
                  ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-400 shadow-2xs border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="truncate">1. Мова</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveStep('birth_year')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-xl transition ${
                activeStep === 'birth_year'
                  ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-400 shadow-2xs border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="truncate">2. Вік</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveStep('mode')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-xl transition ${
                activeStep === 'mode'
                  ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-400 shadow-2xs border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="truncate">3. Формат</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Step 1: Language */}
          {activeStep === 'language' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t.selectLanguage}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.languageDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {languages.map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => onSelectLanguage(lang.code)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/80 dark:bg-teal-950/60 shadow-2xs text-teal-950 dark:text-teal-200 font-bold'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-teal-400 dark:hover:border-teal-500 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <div>
                          <span className="text-sm block font-bold leading-tight">{lang.nativeName}</span>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">{lang.name}</span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Birth Year */}
          {activeStep === 'birth_year' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t.birthYearTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.birthYearSubtitle}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-4">
                <div>
                  <label htmlFor="modal-birth-year" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-2">
                    Рік народження / Birth year
                  </label>
                  <select
                    id="modal-birth-year"
                    value={birthYear || ''}
                    onChange={(e) => onSelectBirthYear(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-teal-600 dark:focus:border-teal-500 focus:outline-hidden bg-white dark:bg-slate-800 font-medium text-slate-900 dark:text-slate-100 text-base"
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

                {birthYear && (
                  <div className="p-3.5 rounded-xl border transition-all text-xs flex items-center gap-2.5 bg-teal-50/80 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200">
                    <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <div>
                      <span className="font-bold block">
                        {isUnder18 ? t.youthBadge : `${currentYear - birthYear} років / years old`}
                      </span>
                      <span className="text-[11px] text-teal-800/80 dark:text-teal-300/80">
                        {isUnder18
                          ? 'Вам будуть доступні делікатні підліткові чати та лінії допомоги.'
                          : 'Рекомендації будуть адаптовані для дорослої аудиторії.'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Test Mode */}
          {activeStep === 'mode' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t.selectModeTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.selectModeSubtitle}
                </p>
              </div>

              <div className="space-y-3 pt-1">
                {/* Express Option */}
                <button
                  type="button"
                  onClick={() => onSelectMode('express')}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start justify-between gap-4 group ${
                    mode === 'express'
                      ? 'border-teal-600 bg-teal-50/80 dark:bg-teal-950/60 shadow-2xs ring-1 ring-teal-600'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-teal-400 dark:hover:border-teal-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl ${
                      mode === 'express'
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50'
                    }`}>
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white block">{t.expressTitle}</span>
                      <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 block mt-0.5">{t.expressTime}</span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{t.expressDesc}</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                    mode === 'express' ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {mode === 'express' && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Deep Research Option */}
                <button
                  type="button"
                  onClick={() => onSelectMode('deep')}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start justify-between gap-4 group ${
                    mode === 'deep'
                      ? 'border-teal-600 bg-teal-50/80 dark:bg-teal-950/60 shadow-2xs ring-1 ring-teal-600'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-teal-400 dark:hover:border-teal-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl ${
                      mode === 'deep'
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50'
                    }`}>
                      <Microscope className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white block">{t.deepTitle}</span>
                      <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 block mt-0.5">{t.deepTime}</span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{t.deepDesc}</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                    mode === 'deep' ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {mode === 'deep' && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            {activeStep === 'language' ? (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
              >
                Закрити / Close
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (activeStep === 'mode') setActiveStep('birth_year');
                  if (activeStep === 'birth_year') setActiveStep('language');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.backBtn}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {activeStep === 'language' && (
              <button
                type="button"
                onClick={() => setActiveStep('birth_year')}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white transition shadow-sm"
              >
                <span>{t.continueBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {activeStep === 'birth_year' && (
              <button
                type="button"
                onClick={() => setActiveStep('mode')}
                disabled={!birthYear}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm ${
                  birthYear
                    ? 'bg-teal-700 hover:bg-teal-800 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{t.continueBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {activeStep === 'mode' && (
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-md transition"
              >
                <span>{t.startBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};