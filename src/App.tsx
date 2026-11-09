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
import { AssessmentMode, AssessmentResult } from './types/assessment';
import { Language, translations } from './data/translations';
import { ShieldCheck, ArrowRight, Settings2, Brain, Sliders } from 'lucide-react';

type FlowStage = 'welcome' | 'assessment' | 'result';

export default function App() {
  const [stage, setStage] = useState<FlowStage>('welcome');
  const [language, setLanguage] = useState<Language>('uk');
  const [birthYear, setBirthYear] = useState<number | undefined>(undefined);
  const [mode, setMode] = useState<AssessmentMode>('express');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentStep, setCurrentStep] = useState(0);

  // Modals state
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [isConfirmRestartModalOpen, setIsConfirmRestartModalOpen] = useState(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [setupInitialStep, setSetupInitialStep] = useState<SetupStep>('language');

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

  // Restore draft if available
  useEffect(() => {
    const draft = loadDraft();
    if (draft && Object.keys(draft.answers).length > 0) {
      setAnswers(draft.answers);
      setCurrentStep(draft.currentStep || 0);
      setMode(draft.mode || 'express');
      setLanguage(draft.language || 'uk');
      setBirthYear(draft.birthYear);
      setStage('assessment');
    }
  }, []);

  const isUnder18 = birthYear ? 2026 - birthYear < 18 : false;
  const t = translations[language];
  const questions = getQuestions(mode, language);
  const currentQuestion = questions[currentStep];

  // Open setup popup at a specific step
  const handleOpenSetup = (step: SetupStep = 'language') => {
    setSetupInitialStep(step);
    setIsSetupModalOpen(true);
  };

  // Start assessment from welcome or setup modal
  const handleStartAssessment = () => {
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
    });
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
    saveDraft({
      answers: updated,
      currentStep,
      mode,
      language,
      birthYear,
    });

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
      });
    } else {
      setStage('result');
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
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-teal-500 selection:text-white">
      {/* Modern Ambient Radial Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden flex justify-center -z-10">
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

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Welcome / Home Stage */}
        {stage === 'welcome' && (
          <div className="space-y-6 animate-fade-in">
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

              {/* Current Configuration Summary Card with popup edit links */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 dark:bg-slate-850/70 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Параметри оцінювання
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenSetup('language')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 transition cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Змінити всі</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {/* Language Item */}
                  <button
                    type="button"
                    onClick={() => handleOpenSetup('language')}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-left hover:border-teal-400 dark:hover:border-teal-500 transition group cursor-pointer shadow-2xs"
                  >
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 block font-semibold mb-0.5">Мова</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {language === 'uk' && '🇺🇦 Українська'}
                      {language === 'en' && '🇬🇧 English'}
                      {language === 'es' && '🇪🇸 Español'}
                      {language === 'pt' && '🇵🇹 Português'}
                    </span>
                  </button>

                  {/* Birth Year / Age Item */}
                  <button
                    type="button"
                    onClick={() => handleOpenSetup('birth_year')}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-left hover:border-teal-400 dark:hover:border-teal-500 transition group cursor-pointer shadow-2xs"
                  >
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 block font-semibold mb-0.5">{t.selectedAge}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors truncate block">
                      {birthYear ? `${2026 - birthYear} р. (${birthYear})` : t.notSpecified}
                    </span>
                  </button>

                  {/* Mode Item */}
                  <button
                    type="button"
                    onClick={() => handleOpenSetup('mode')}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-left hover:border-teal-400 dark:hover:border-teal-500 transition group cursor-pointer shadow-2xs"
                  >
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 block font-semibold mb-0.5">{t.selectedFormat}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {mode === 'express' ? '⚡ 9 питань (5 хв)' : '🔬 20 питань (10 хв)'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleStartAssessment}
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-base font-bold bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg shadow-teal-600/25 transition-all duration-200 transform active:scale-[0.99] cursor-pointer"
                >
                  <span>{t.welcomeCta}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenSetup('language')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-sm font-semibold border border-slate-300/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer active:scale-[0.99]"
                >
                  <Settings2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>{t.configureBtn}</span>
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

              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-2.5 shadow-sm">
                <div className="p-2.5 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 rounded-2xl w-fit">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{t.clinicalTitle}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.clinicalDesc}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Assessment Stage (Questions) */}
        {stage === 'assessment' && currentQuestion && (
          <div className="space-y-6">
            <AssessmentProgress
              currentStep={currentStep}
              totalSteps={questions.length}
              stageTitle={mode === 'express' ? `${t.expressTitle} (${questions.length})` : `${t.deepTitle} (${questions.length})`}
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
        onSelectLanguage={(l) => setLanguage(l)}
        birthYear={birthYear}
        onSelectBirthYear={(y) => setBirthYear(y)}
        mode={mode}
        onSelectMode={(m) => setMode(m)}
        onStartAssessment={handleStartAssessment}
        initialStep={setupInitialStep}
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
      />
    </div>
  );
}