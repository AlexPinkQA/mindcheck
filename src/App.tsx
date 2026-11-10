import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CrisisModal } from './components/CrisisModal';
import { ConfirmModal } from './components/ConfirmModal';
import { SetupModal, SetupStep } from './components/SetupModal';
import { AssessmentProgress } from './components/AssessmentProgress';
import { QuestionCard } from './components/QuestionCard';
import { ResultsSummary } from './components/ResultsSummary';
import { getQuestions } from './data/questions';
import { evaluateAssessment, saveDraft, loadDraft, clearDraft } from './core/engine';
import { AssessmentCategory, AssessmentMode, AssessmentResult } from './types/assessment';
import { Language, translations } from './data/translations';
import { ShieldCheck, ArrowRight, Brain, Globe, Calendar, Zap, Microscope, Activity, Shield, Check } from 'lucide-react';

const getCategoryForMode = (m: AssessmentMode): AssessmentCategory => {
  if (m === 'express' || m === 'deep') return 'mood';
  if (m === 'dass21') return 'stress';
  return 'trauma';
};

type FlowStage = 'welcome' | 'assessment' | 'result';

export default function App() {
  const [stage, setStage] = useState<FlowStage>('welcome');
  const [language, setLanguage] = useState<Language>('uk');
  const [birthYear, setBirthYear] = useState<number | undefined>(undefined);
  const [mode, setMode] = useState<AssessmentMode>('express');
  const [activeCategory, setActiveCategory] = useState<AssessmentCategory>(() => getCategoryForMode(mode));
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setActiveCategory(getCategoryForMode(mode));
  }, [mode]);

  // Modals state
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [isConfirmRestartModalOpen, setIsConfirmRestartModalOpen] = useState(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [setupInitialStep, setSetupInitialStep] = useState<SetupStep>('language');
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false);

  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('mindcheck_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mindcheck_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mindcheck_theme', 'light');
    }
  }, [darkMode]);

  // Restore draft or trigger onboarding if first visit
  useEffect(() => {
    const draft = loadDraft();
    const onboardingDone = localStorage.getItem('mindcheck_onboarding_completed');
    if (draft && Object.keys(draft.answers).length > 0) {
      setAnswers(draft.answers);
      setCurrentStep(draft.currentStep || 0);
      const draftMode = draft.mode || 'express';
      const draftLang = draft.language || 'uk';
      setMode(draftMode);
      setLanguage(draftLang);
      setBirthYear(draft.birthYear);

      // Check if all questions for this mode have been answered or draft explicitly says 'result'
      const questionsForMode = getQuestions(draftMode, draftLang);
      const allAnswered =
        questionsForMode.length > 0 &&
        questionsForMode.every((q) => draft.answers[q.id] !== undefined);

      if (draft.stage === 'result' || allAnswered) {
        setStage('result');
      } else {
        setStage('assessment');
      }
    } else if (!onboardingDone) {
      setIsOnboarding(true);
      setSetupInitialStep('language');
      setIsSetupModalOpen(true);
    }
  }, []);

  const isUnder18 = birthYear ? 2026 - birthYear < 18 : false;
  const t = translations[language];
  const questions = getQuestions(mode, language);
  const currentQuestion = questions[currentStep];

  // Open setup popup at a specific step
  const handleOpenSetup = (step: SetupStep = 'language', onboardingMode = false) => {
    setIsOnboarding(onboardingMode);
    setSetupInitialStep(step);
    setIsSetupModalOpen(true);
  };

  // Start assessment from welcome or setup modal (birthYear is strictly required)
  const handleStartAssessment = () => {
    if (!birthYear) {
      handleOpenSetup('birth_year', true);
      return;
    }
    localStorage.setItem('mindcheck_onboarding_completed', 'true');
    setIsOnboarding(false);
    setIsSetupModalOpen(false);
    clearDraft();
    setAnswers({});
    setCurrentStep(0);
    setStage('assessment');
  };

  // Upgrade from Express to Deep Research (preserving already answered 9 questions)
  const handleUpgradeToDeep = () => {
    setMode('deep');
    // Start at question 10 (index 9 in 0-based array)
    const nextIndex = 9;
    setCurrentStep(nextIndex);
    setStage('assessment');
    saveDraft({
      answers,
      currentStep: nextIndex,
      mode: 'deep',
      language,
      birthYear,
      stage: 'assessment',
    });
  };

  // Upgrade from PC-PTSD-5 to comprehensive PCL-5
  const handleUpgradeToPcl = () => {
    setMode('pcl5');
    clearDraft();
    setAnswers({});
    setCurrentStep(0);
    setStage('assessment');
  };

  // Header Logo click: ask confirmation if currently taking test or on results
  const handleLogoClick = () => {
    if (stage === 'assessment' || stage === 'result' || Object.keys(answers).length > 0) {
      setIsConfirmRestartModalOpen(true);
    } else {
      setStage('welcome');
    }
  };

  const handleConfirmRestart = () => {
    clearDraft();
    setAnswers({});
    setCurrentStep(0);
    setStage('welcome');
    setIsConfirmRestartModalOpen(false);
  };

  // When an option is clicked: auto-advance to next question
  const handleSelectAndNext = (value: number) => {
    if (!currentQuestion) return;
    const updated = { ...answers, [currentQuestion.id]: value };
    setAnswers(updated);

    // Immediate crisis safety trigger if suicidality item > 0
    if (currentQuestion.isCrisisTrigger && value > 0) {
      setIsCrisisModalOpen(true);
    }

    if (currentStep < questions.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      saveDraft({
        answers: updated,
        currentStep: nextStep,
        mode,
        language,
        birthYear,
        stage: 'assessment',
      });
    } else {
      setStage('result');
      saveDraft({
        answers: updated,
        currentStep,
        mode,
        language,
        birthYear,
        stage: 'result',
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      saveDraft({
        answers,
        currentStep: prev,
        mode,
        language,
        birthYear,
        stage: 'assessment',
      });
    } else {
      setIsConfirmRestartModalOpen(true);
    }
  };

  const handleRetake = () => {
    clearDraft();
    setAnswers({});
    setCurrentStep(0);
    setStage('welcome');
  };

  const result: AssessmentResult = evaluateAssessment(answers, mode, birthYear, language);

  return (
    <div className="relative min-h-screen min-h-[100dvh] bg-slate-50 dark:bg-slate-950 flex flex-col flex-1 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-teal-500 selection:text-white w-full overflow-x-hidden">
      {/* Modern Ambient Radial Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden flex justify-center -z-10 w-full h-full">
        <div className="w-[600px] h-[350px] bg-teal-500/10 dark:bg-teal-500/15 blur-[120px] rounded-full -top-24 left-1/4 transform -translate-x-1/2" />
        <div className="w-[500px] h-[300px] bg-cyan-500/10 dark:bg-cyan-500/15 blur-[120px] rounded-full top-48 right-1/4 transform translate-x-1/2" />
      </div>

      <Header
        language={language}
        onLogoClick={handleLogoClick}
        onOpenSetup={() => handleOpenSetup('language')}
        onCrisisClick={() => setIsCrisisModalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
      />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col justify-start">
        {/* Welcome / Home Stage */}
        {stage === 'welcome' && (
          <div className="space-y-6 animate-fade-in my-auto">
            {/* Hero Card */}
            <div className="relative overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-7">
              <div className="space-y-3.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200/80 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-bold shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>{t.anonymousBadge}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl sm:leading-[1.15] font-black text-slate-900 dark:text-white tracking-tight">
                  {t.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {t.subtitle}
                </p>
              </div>

              {/* Quick Settings Profile Bar (Apple Health / Alan inspired clean paired chips) */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <button
                  type="button"
                  onClick={() => handleOpenSetup('language')}
                  className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 hover:border-teal-500 dark:hover:border-teal-400 transition text-left shadow-2xs cursor-pointer group min-w-0"
                >
                  <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/60 transition">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">
                      {t.languageLabel}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                      {language === 'uk' ? '🇺🇦 Українська' : language === 'en' ? '🇬🇧 English' : language === 'es' ? '🇪🇸 Español' : '🇵🇹 Português'}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenSetup('birth_year')}
                  className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 hover:border-teal-500 dark:hover:border-teal-400 transition text-left shadow-2xs cursor-pointer group min-w-0"
                >
                  <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/60 transition">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">
                      {t.birthYearLabel}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                      {birthYear ? `${2026 - birthYear} ${t.yearsOldShort} (${birthYear})` : t.notSpecified}
                    </div>
                  </div>
                </button>
              </div>

              {/* Main Thematic Assessment Selection */}
              <div className="space-y-3.5 pt-1">
                <div className="flex items-center justify-between gap-2 px-0.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 whitespace-nowrap">
                    {t.selectModeTitle}
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200/60 dark:border-teal-800 whitespace-nowrap shrink-0">
                    {mode === 'express' && t.expressBadge}
                    {mode === 'deep' && t.deepBadge}
                    {mode === 'dass21' && t.dassBadge}
                    {mode === 'pc_ptsd_5' && t.pcPtsdBadge}
                    {mode === 'pcl5' && t.pcl5Badge}
                    {mode === 'itq' && t.itqBadge}
                  </span>
                </div>

                {/* Category Segmented Tabs */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 bg-slate-100/90 dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('mood');
                      if (mode !== 'express' && mode !== 'deep') setMode('express');
                    }}
                    className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeCategory === 'mood'
                        ? 'bg-white dark:bg-slate-900 text-teal-900 dark:text-teal-300 shadow-sm border border-slate-200/60 dark:border-slate-700'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>🌧️</span>
                    <span className="whitespace-nowrap">{t.sectionMood}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('stress');
                      setMode('dass21');
                    }}
                    className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeCategory === 'stress'
                        ? 'bg-white dark:bg-slate-900 text-teal-900 dark:text-teal-300 shadow-sm border border-slate-200/60 dark:border-slate-700'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>⚖️</span>
                    <span className="whitespace-nowrap">{t.sectionStress}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('trauma');
                      if (mode !== 'pc_ptsd_5' && mode !== 'pcl5' && mode !== 'itq') setMode('pc_ptsd_5');
                    }}
                    className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeCategory === 'trauma'
                        ? 'bg-white dark:bg-slate-900 text-teal-900 dark:text-teal-300 shadow-sm border border-slate-200/60 dark:border-slate-700'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>🛡️</span>
                    <span className="whitespace-nowrap">{t.sectionTrauma}</span>
                  </button>
                </div>

                {/* Category Helper Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 px-1 leading-relaxed">
                  {activeCategory === 'mood' && t.sectionMoodDesc}
                  {activeCategory === 'stress' && t.sectionStressDesc}
                  {activeCategory === 'trauma' && t.sectionTraumaDesc}
                </p>

                {/* Direct Interactive Assessment Cards for Active Category */}
                <div className="space-y-2.5 pt-1">
                  {/* Mood Tests */}
                  {activeCategory === 'mood' && (
                    <>
                      {/* Express (PHQ-9) */}
                      <button
                        type="button"
                        onClick={() => setMode('express')}
                        className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all flex items-start justify-between gap-3.5 group cursor-pointer ${
                          mode === 'express'
                            ? 'border-teal-600 dark:border-teal-400 bg-teal-50/70 dark:bg-teal-950/70 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-teal-400 dark:hover:border-teal-500'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2.5 rounded-xl shrink-0 ${mode === 'express' ? 'bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-950' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                            <Zap className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">{t.expressTitle}</span>
                              <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 bg-teal-100/70 dark:bg-teal-900/60 px-2 py-0.5 rounded-md">{t.expressTime}</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{t.expressDesc}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${mode === 'express' ? 'border-teal-600 bg-teal-600 dark:border-teal-400 dark:bg-teal-400 text-white dark:text-slate-950' : 'border-slate-300 dark:border-slate-600'}`}>
                          {mode === 'express' && <Check className="w-3.5 h-3.5 text-white dark:text-slate-950" />}
                        </div>
                      </button>

                      {/* Deep Research */}
                      <button
                        type="button"
                        onClick={() => setMode('deep')}
                        className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all flex items-start justify-between gap-3.5 group cursor-pointer ${
                          mode === 'deep'
                            ? 'border-teal-600 dark:border-teal-400 bg-teal-50/70 dark:bg-teal-950/70 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-teal-400 dark:hover:border-teal-500'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2.5 rounded-xl shrink-0 ${mode === 'deep' ? 'bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-950' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                            <Microscope className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">{t.deepTitle}</span>
                              <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 bg-teal-100/70 dark:bg-teal-900/60 px-2 py-0.5 rounded-md">{t.deepTime}</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{t.deepDesc}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${mode === 'deep' ? 'border-teal-600 bg-teal-600 dark:border-teal-400 dark:bg-teal-400 text-white dark:text-slate-950' : 'border-slate-300 dark:border-slate-600'}`}>
                          {mode === 'deep' && <Check className="w-3.5 h-3.5 text-white dark:text-slate-950" />}
                        </div>
                      </button>
                    </>
                  )}

                  {/* Stress Tests */}
                  {activeCategory === 'stress' && (
                    <button
                      type="button"
                      onClick={() => setMode('dass21')}
                      className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all flex items-start justify-between gap-3.5 group cursor-pointer ${
                        mode === 'dass21'
                          ? 'border-teal-600 dark:border-teal-400 bg-teal-50/70 dark:bg-teal-950/70 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-teal-400 dark:hover:border-teal-500'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-xl shrink-0 ${mode === 'dass21' ? 'bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-950' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                          <Activity className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">{t.dassTitle}</span>
                            <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 bg-teal-100/70 dark:bg-teal-900/60 px-2 py-0.5 rounded-md">{t.dassTime}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{t.dassDesc}</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${mode === 'dass21' ? 'border-teal-600 bg-teal-600 dark:border-teal-400 dark:bg-teal-400 text-white dark:text-slate-950' : 'border-slate-300 dark:border-slate-600'}`}>
                        {mode === 'dass21' && <Check className="w-3.5 h-3.5 text-white dark:text-slate-950" />}
                      </div>
                    </button>
                  )}

                  {/* Trauma Tests */}
                  {activeCategory === 'trauma' && (
                    <>
                      {/* PC-PTSD-5 */}
                      <button
                        type="button"
                        onClick={() => setMode('pc_ptsd_5')}
                        className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all flex items-start justify-between gap-3.5 group cursor-pointer ${
                          mode === 'pc_ptsd_5'
                            ? 'border-teal-600 dark:border-teal-400 bg-teal-50/70 dark:bg-teal-950/70 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-teal-400 dark:hover:border-teal-500'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2.5 rounded-xl shrink-0 ${mode === 'pc_ptsd_5' ? 'bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-950' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                            <Zap className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">{t.pcPtsdTitle}</span>
                              <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 bg-teal-100/70 dark:bg-teal-900/60 px-2 py-0.5 rounded-md">{t.pcPtsdTime}</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{t.pcPtsdDesc}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${mode === 'pc_ptsd_5' ? 'border-teal-600 bg-teal-600 dark:border-teal-400 dark:bg-teal-400 text-white dark:text-slate-950' : 'border-slate-300 dark:border-slate-600'}`}>
                          {mode === 'pc_ptsd_5' && <Check className="w-3.5 h-3.5 text-white dark:text-slate-950" />}
                        </div>
                      </button>

                      {/* PCL-5 */}
                      <button
                        type="button"
                        onClick={() => setMode('pcl5')}
                        className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all flex items-start justify-between gap-3.5 group cursor-pointer ${
                          mode === 'pcl5'
                            ? 'border-teal-600 dark:border-teal-400 bg-teal-50/70 dark:bg-teal-950/70 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-teal-400 dark:hover:border-teal-500'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2.5 rounded-xl shrink-0 ${mode === 'pcl5' ? 'bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-950' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                            <Microscope className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">{t.pcl5Title}</span>
                              <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 bg-teal-100/70 dark:bg-teal-900/60 px-2 py-0.5 rounded-md">{t.pcl5Time}</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{t.pcl5Desc}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${mode === 'pcl5' ? 'border-teal-600 bg-teal-600 dark:border-teal-400 dark:bg-teal-400 text-white dark:text-slate-950' : 'border-slate-300 dark:border-slate-600'}`}>
                          {mode === 'pcl5' && <Check className="w-3.5 h-3.5 text-white dark:text-slate-950" />}
                        </div>
                      </button>

                      {/* ITQ */}
                      <button
                        type="button"
                        onClick={() => setMode('itq')}
                        className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all flex items-start justify-between gap-3.5 group cursor-pointer ${
                          mode === 'itq'
                            ? 'border-teal-600 dark:border-teal-400 bg-teal-50/70 dark:bg-teal-950/70 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-teal-400 dark:hover:border-teal-500'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2.5 rounded-xl shrink-0 ${mode === 'itq' ? 'bg-teal-600 text-white dark:bg-teal-400 dark:text-slate-950' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                            <Shield className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">{t.itqTitle}</span>
                              <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 bg-teal-100/70 dark:bg-teal-900/60 px-2 py-0.5 rounded-md">{t.itqTime}</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{t.itqDesc}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${mode === 'itq' ? 'border-teal-600 bg-teal-600 dark:border-teal-400 dark:bg-teal-400 text-white dark:text-slate-950' : 'border-slate-300 dark:border-slate-600'}`}>
                          {mode === 'itq' && <Check className="w-3.5 h-3.5 text-white dark:text-slate-950" />}
                        </div>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Action Start Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartAssessment}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4.5 rounded-2xl text-base sm:text-lg font-bold bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg shadow-teal-600/25 transition-all duration-200 transform active:scale-[0.99] cursor-pointer"
                >
                  <span>{t.welcomeCta}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-2.5 shadow-sm">
                <div className="p-2.5 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 rounded-2xl w-fit">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{t.privacyTitle}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.privacyDesc}
                </p>
              </div>

              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-sm">
                <div className="p-2.5 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 rounded-2xl w-fit">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{t.clinicalTitle}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.clinicalDesc}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700">
                    PHQ-9
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700">
                    GAD-7
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700">
                    DASS-21
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700">
                    PC-PTSD-5
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700">
                    PCL-5 (DSM-5)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700">
                    ITQ (МКХ-11)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assessment Stage (Questions) */}
        {stage === 'assessment' && currentQuestion && (
          <div className="space-y-6 animate-fade-in my-auto">
            <AssessmentProgress
              currentStep={currentStep}
              totalSteps={questions.length}
              stageTitle={
                mode === 'express'
                  ? `${t.expressTitle} (${questions.length})`
                  : mode === 'deep'
                  ? `${t.deepTitle} (${questions.length})`
                  : mode === 'dass21'
                  ? `${t.dassTitle} (${questions.length})`
                  : mode === 'pc_ptsd_5'
                  ? `${t.pcPtsdTitle} (${questions.length})`
                  : mode === 'pcl5'
                  ? `${t.pcl5Title} (${questions.length})`
                  : `${t.itqTitle} (${questions.length})`
              }
              language={language}
            />

            <QuestionCard
              question={currentQuestion}
              selectedValue={answers[currentQuestion.id]}
              onSelectAndNext={handleSelectAndNext}
              onPrev={handlePrev}
              canPrev={true}
              language={language}
            />
          </div>
        )}

        {/* Results Stage */}
        {stage === 'result' && (
          <ResultsSummary
            result={result}
            onRetake={handleRetake}
            onCrisisClick={() => setIsCrisisModalOpen(true)}
            onUpgradeToDeep={mode === 'express' ? handleUpgradeToDeep : undefined}
            onUpgradeToPcl={mode === 'pc_ptsd_5' && (result.traumaScore ?? 0) >= 3 ? handleUpgradeToPcl : undefined}
            language={language}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md py-6 text-center text-xs text-slate-400 dark:text-slate-500 transition-colors">
        <p>{t.footerText}</p>
        <p className="mt-1">{t.footerLocal}</p>
      </footer>

      {/* Setup Modal Popup (Language, Birth Year, Mode) */}
      <SetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        language={language}
        onSelectLanguage={(l) => {
          setLanguage(l);
          if (Object.keys(answers).length > 0) {
            saveDraft({ answers, currentStep, mode, language: l, birthYear, stage });
          }
        }}
        birthYear={birthYear}
        onSelectBirthYear={(y) => {
          setBirthYear(y);
          if (Object.keys(answers).length > 0) {
            saveDraft({ answers, currentStep, mode, language, birthYear: y, stage });
          }
        }}
        mode={mode}
        onSelectMode={(m) => setMode(m)}
        onStartAssessment={handleStartAssessment}
        initialStep={setupInitialStep}
        isOnboarding={isOnboarding}
      />

      {/* Logo Restart Confirmation Popup */}
      <ConfirmModal
        isOpen={isConfirmRestartModalOpen}
        onClose={() => setIsConfirmRestartModalOpen(false)}
        onConfirm={handleConfirmRestart}
        language={language}
      />

      {/* Crisis Help Intervention Modal */}
      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
        language={language}
        isUnder18={isUnder18}
        isTraumaContext={mode === 'pc_ptsd_5' || mode === 'pcl5' || mode === 'itq'}
      />
    </div>
  );
}