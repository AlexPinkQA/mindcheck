import React, { useState, useEffect } from 'react';
import { Globe, Calendar, Zap, Microscope, Activity, X, ArrowRight, ArrowLeft, Check, Sparkles, Shield } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { AssessmentMode, AssessmentCategory } from '../types/assessment';

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
  isOnboarding?: boolean;
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
  isOnboarding = false,
}) => {
  const getCategoryForMode = (m: AssessmentMode): AssessmentCategory => {
    if (m === 'express' || m === 'deep') return 'mood';
    if (m === 'dass21') return 'stress';
    return 'trauma';
  };

  const [activeStep, setActiveStep] = useState<SetupStep>(initialStep);
  const [selectedCategory, setSelectedCategory] = useState<AssessmentCategory>(() => getCategoryForMode(mode));

  useEffect(() => {
    if (isOpen) {
      setActiveStep(initialStep);
      setSelectedCategory(getCategoryForMode(mode));
    }
  }, [isOpen, initialStep, mode]);

  if (!isOpen) return null;

  const t = translations[language];
  const isUnder18 = birthYear ? currentYear - birthYear < 18 : false;

  const handleStart = () => {
    onStartAssessment();
  };

  const stepNumber = activeStep === 'language' ? 1 : activeStep === 'birth_year' ? 2 : 3;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fade-in"
      onClick={isOnboarding ? undefined : onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/70 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                {isOnboarding ? t.onboardingStepOf(stepNumber, 3) : t.setupTitle}
              </span>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                MindCheck
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {activeStep === 'language' && t.selectLanguage}
              {activeStep === 'birth_year' && t.birthYearTitle}
              {activeStep === 'mode' && t.selectModeTitle}
            </h2>
          </div>

          {!isOnboarding && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label={t.closeBtn}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Navigation Bar */}
        <div className="px-6 pt-3 pb-2 bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setActiveStep('language')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-bold rounded-xl transition ${
                activeStep === 'language'
                  ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 shadow-2xs border border-slate-200 dark:border-slate-700'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="truncate">{t.stepLanguage}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (!isOnboarding || birthYear || activeStep === 'mode') {
                  setActiveStep('birth_year');
                }
              }}
              disabled={isOnboarding && activeStep === 'language'}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-bold rounded-xl transition ${
                activeStep === 'birth_year'
                  ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 shadow-2xs border border-slate-200 dark:border-slate-700'
                  : isOnboarding && activeStep === 'language'
                  ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="truncate">{t.stepAge}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (!isOnboarding && birthYear) {
                  setActiveStep('mode');
                } else if (birthYear) {
                  setActiveStep('mode');
                }
              }}
              disabled={!birthYear}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-bold rounded-xl transition ${
                activeStep === 'mode'
                  ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 shadow-2xs border border-slate-200 dark:border-slate-700'
                  : !birthYear
                  ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="truncate">{t.stepMode}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Step 1: Language */}
          {activeStep === 'language' && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {t.languageDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {languages.map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => onSelectLanguage(lang.code)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group cursor-pointer ${
                        isSelected
                          ? 'border-teal-600 dark:border-teal-400 bg-teal-50 dark:bg-teal-950/80 shadow-md shadow-teal-500/10 text-teal-950 dark:text-teal-100 font-bold ring-2 ring-teal-500/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-400 dark:hover:border-teal-500 text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <div>
                          <span className="text-sm block font-bold leading-tight text-slate-900 dark:text-white">
                            {lang.nativeName}
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                            {lang.name}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-teal-600 bg-teal-600 dark:border-teal-400 dark:bg-teal-400 text-white dark:text-slate-950'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white dark:text-slate-950" />}
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
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.birthYearSubtitle}
              </p>

              <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <div>
                  <label
                    htmlFor="modal-birth-year"
                    className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide mb-2"
                  >
                    {t.birthYearLabel}
                  </label>
                  <select
                    id="modal-birth-year"
                    value={birthYear || ''}
                    onChange={(e) => onSelectBirthYear(Number(e.target.value))}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-300 dark:border-slate-600 focus:border-teal-600 dark:focus:border-teal-400 focus:outline-hidden bg-white dark:bg-slate-800 font-bold text-slate-900 dark:text-white text-base shadow-2xs"
                  >
                    <option value="" disabled className="text-slate-400">
                      {t.birthYearPlaceholder}
                    </option>
                    {years.map((y) => (
                      <option key={y} value={y} className="text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">
                        {y} ({currentYear - y} {t.yearsOldShort})
                      </option>
                    ))}
                  </select>
                </div>

                {birthYear ? (
                  <div className="p-4 rounded-xl border transition-all text-xs flex items-center gap-3 bg-teal-50 dark:bg-teal-950/70 border-teal-200 dark:border-teal-800 text-teal-950 dark:text-teal-200">
                    <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <div>
                      <span className="font-extrabold text-sm block">
                        {isUnder18 ? t.youthBadge : `${currentYear - birthYear} ${t.yearsOldFull}`}
                      </span>
                      <span className="text-xs text-teal-800 dark:text-teal-300">
                        {isUnder18 ? t.youthChatNote : t.adultChatNote}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                    {t.birthYearRequiredWarning}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Test Mode */}
          {activeStep === 'mode' && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.selectModeSubtitle}
              </p>

              {/* Category Segmented Switcher */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('mood');
                    if (mode !== 'express' && mode !== 'deep') onSelectMode('express');
                  }}
                  className={`py-2 px-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedCategory === 'mood'
                      ? 'bg-white dark:bg-slate-900 text-teal-800 dark:text-teal-300 shadow-xs border border-slate-200/60 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>🌧️</span>
                  <span className="truncate">{t.sectionMood}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('stress');
                    onSelectMode('dass21');
                  }}
                  className={`py-2 px-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedCategory === 'stress'
                      ? 'bg-white dark:bg-slate-900 text-teal-800 dark:text-teal-300 shadow-xs border border-slate-200/60 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>⚖️</span>
                  <span className="truncate">{t.sectionStress}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('trauma');
                    if (mode !== 'pc_ptsd_5' && mode !== 'pcl5' && mode !== 'itq') onSelectMode('pc_ptsd_5');
                  }}
                  className={`py-2 px-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedCategory === 'trauma'
                      ? 'bg-white dark:bg-slate-900 text-teal-800 dark:text-teal-300 shadow-xs border border-slate-200/60 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>🛡️</span>
                  <span className="truncate">{t.sectionTrauma}</span>
                </button>
              </div>

              {/* Category Subtitle Helper */}
              <p className="text-xs text-slate-500 dark:text-slate-400 px-1 leading-relaxed">
                {selectedCategory === 'mood' && t.sectionMoodDesc}
                {selectedCategory === 'stress' && t.sectionStressDesc}
                {selectedCategory === 'trauma' && t.sectionTraumaDesc}
              </p>

              <div className="space-y-3 pt-1">
                {/* MOOD CATEGORY */}
                {selectedCategory === 'mood' && (
                  <>
                    {/* Express Option */}
                    <button
                      type="button"
                      onClick={() => onSelectMode('express')}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start justify-between gap-4 group cursor-pointer ${
                        mode === 'express'
                          ? 'border-teal-600 dark:border-teal-400 bg-teal-50 dark:bg-teal-950/80 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-400 dark:hover:border-teal-500'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`p-2.5 rounded-xl shrink-0 ${
                            mode === 'express'
                              ? 'bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-950'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50'
                          }`}
                        >
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-extrabold text-base text-slate-900 dark:text-white block">
                            {t.expressTitle}
                          </span>
                          <span className="text-xs font-bold text-teal-700 dark:text-teal-400 block mt-0.5">
                            {t.expressTime}
                          </span>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
                            {t.expressDesc}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                          mode === 'express'
                            ? 'border-teal-600 bg-teal-600 dark:border-teal-400 dark:bg-teal-400 text-white dark:text-slate-950'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {mode === 'express' && <Check className="w-3.5 h-3.5 text-white dark:text-slate-950" />}
                      </div>
                    </button>

                    {/* Deep Research Option */}
                    <button
                      type="button"
                      onClick={() => onSelectMode('deep')}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start justify-between gap-4 group cursor-pointer ${
                        mode === 'deep'
                          ? 'border-teal-600 dark:border-teal-400 bg-teal-50 dark:bg-teal-950/80 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-400 dark:hover:border-teal-500'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`p-2.5 rounded-xl shrink-0 ${
                            mode === 'deep'
                              ? 'bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-950'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50'
                          }`}
                        >
                          <Microscope className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-extrabold text-base text-slate-900 dark:text-white block">
                            {t.deepTitle}
                          </span>
                          <span className="text-xs font-bold text-teal-700 dark:text-teal-400 block mt-0.5">
                            {t.deepTime}
                          </span>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
                            {t.deepDesc}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                          mode === 'deep'
                            ? 'border-teal-600 bg-teal-600 dark:border-teal-400 dark:bg-teal-400 text-white dark:text-slate-950'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {mode === 'deep' && <Check className="w-3.5 h-3.5 text-white dark:text-slate-950" />}
                      </div>
                    </button>
                  </>
                )}

                {/* STRESS CATEGORY */}
                {selectedCategory === 'stress' && (
                  <>
                    {/* DASS-21 Option */}
                    <button
                      type="button"
                      onClick={() => onSelectMode('dass21')}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start justify-between gap-4 group cursor-pointer ${
                        mode === 'dass21'
                          ? 'border-teal-600 dark:border-teal-400 bg-teal-50 dark:bg-teal-950/80 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-400 dark:hover:border-teal-500'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`p-2.5 rounded-xl shrink-0 ${
                            mode === 'dass21'
                              ? 'bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-950'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50'
                          }`}
                        >
                          <Activity className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-extrabold text-base text-slate-900 dark:text-white block">
                            {t.dassTitle}
                          </span>
                          <span className="text-xs font-bold text-teal-700 dark:text-teal-400 block mt-0.5">
                            {t.dassTime}
                          </span>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
                            {t.dassDesc}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                          mode === 'dass21'
                            ? 'border-teal-600 bg-teal-600 dark:border-teal-400 dark:bg-teal-400 text-white dark:text-slate-950'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {mode === 'dass21' && <Check className="w-3.5 h-3.5 text-white dark:text-slate-950" />}
                      </div>
                    </button>
                  </>
                )}

                {/* TRAUMA & PTSD CATEGORY */}
                {selectedCategory === 'trauma' && (
                  <>
                    {/* PC-PTSD-5 Screen */}
                    <button
                      type="button"
                      onClick={() => onSelectMode('pc_ptsd_5')}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start justify-between gap-4 group cursor-pointer ${
                        mode === 'pc_ptsd_5'
                          ? 'border-teal-600 dark:border-teal-400 bg-teal-50 dark:bg-teal-950/80 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-400 dark:hover:border-teal-500'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`p-2.5 rounded-xl shrink-0 ${
                            mode === 'pc_ptsd_5'
                              ? 'bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-950'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50'
                          }`}
                        >
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-extrabold text-base text-slate-900 dark:text-white block">
                            {t.pcPtsdTitle}
                          </span>
                          <span className="text-xs font-bold text-teal-700 dark:text-teal-400 block mt-0.5">
                            {t.pcPtsdTime}
                          </span>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
                            {t.pcPtsdDesc}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                          mode === 'pc_ptsd_5'
                            ? 'border-teal-600 bg-teal-600 dark:border-teal-400 dark:bg-teal-400 text-white dark:text-slate-950'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {mode === 'pc_ptsd_5' && <Check className="w-3.5 h-3.5 text-white dark:text-slate-950" />}
                      </div>
                    </button>

                    {/* PCL-5 DSM-5 Standard */}
                    <button
                      type="button"
                      onClick={() => onSelectMode('pcl5')}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start justify-between gap-4 group cursor-pointer ${
                        mode === 'pcl5'
                          ? 'border-teal-600 dark:border-teal-400 bg-teal-50 dark:bg-teal-950/80 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-400 dark:hover:border-teal-500'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`p-2.5 rounded-xl shrink-0 ${
                            mode === 'pcl5'
                              ? 'bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-950'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50'
                          }`}
                        >
                          <Microscope className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-extrabold text-base text-slate-900 dark:text-white block">
                            {t.pcl5Title}
                          </span>
                          <span className="text-xs font-bold text-teal-700 dark:text-teal-400 block mt-0.5">
                            {t.pcl5Time}
                          </span>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
                            {t.pcl5Desc}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                          mode === 'pcl5'
                            ? 'border-teal-600 bg-teal-600 dark:border-teal-400 dark:bg-teal-400 text-white dark:text-slate-950'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {mode === 'pcl5' && <Check className="w-3.5 h-3.5 text-white dark:text-slate-950" />}
                      </div>
                    </button>

                    {/* ITQ ICD-11 */}
                    <button
                      type="button"
                      onClick={() => onSelectMode('itq')}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start justify-between gap-4 group cursor-pointer ${
                        mode === 'itq'
                          ? 'border-teal-600 dark:border-teal-400 bg-teal-50 dark:bg-teal-950/80 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-400 dark:hover:border-teal-500'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`p-2.5 rounded-xl shrink-0 ${
                            mode === 'itq'
                              ? 'bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-950'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50'
                          }`}
                        >
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-extrabold text-base text-slate-900 dark:text-white block">
                            {t.itqTitle}
                          </span>
                          <span className="text-xs font-bold text-teal-700 dark:text-teal-400 block mt-0.5">
                            {t.itqTime}
                          </span>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
                            {t.itqDesc}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                          mode === 'itq'
                            ? 'border-teal-600 bg-teal-600 dark:border-teal-400 dark:bg-teal-400 text-white dark:text-slate-950'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {mode === 'itq' && <Check className="w-3.5 h-3.5 text-white dark:text-slate-950" />}
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            {activeStep === 'language' ? (
              !isOnboarding ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
                >
                  {t.closeBtn}
                </button>
              ) : (
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  {t.onboardingStepOf(1, 3)}
                </span>
              )
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (activeStep === 'mode') setActiveStep('birth_year');
                  if (activeStep === 'birth_year') setActiveStep('language');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
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
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white transition shadow-sm cursor-pointer active:scale-95"
              >
                <span>{t.continueBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {activeStep === 'birth_year' && (
              <button
                type="button"
                onClick={() => {
                  if (birthYear) setActiveStep('mode');
                }}
                disabled={!birthYear}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm ${
                  birthYear
                    ? 'bg-teal-700 hover:bg-teal-800 text-white cursor-pointer active:scale-95'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
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
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-md shadow-teal-600/20 transition cursor-pointer active:scale-95"
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
