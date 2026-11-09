import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CrisisModal } from './components/CrisisModal';
import { AssessmentProgress } from './components/AssessmentProgress';
import { QuestionCard } from './components/QuestionCard';
import { ResultsSummary } from './components/ResultsSummary';
import { assessmentQuestions } from './data/questions';
import { evaluateAssessment, saveDraft, loadDraft, clearDraft } from './core/engine';
import { AssessmentResult } from './types/assessment';
import { ShieldCheck, Sparkles, Clock, Lock, ArrowRight } from 'lucide-react';

type AppStage = 'welcome' | 'assessment' | 'result';

export default function App() {
  const [stage, setStage] = useState<AppStage>('welcome');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

  // Check for local draft on mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft && Object.keys(draft.answers).length > 0) {
      setHasDraft(true);
    }
  }, []);

  const handleResumeDraft = () => {
    const draft = loadDraft();
    if (draft) {
      setAnswers(draft.answers);
      setCurrentStep(draft.currentStep || 0);
      setStage('assessment');
    }
  };

  const currentQuestion = assessmentQuestions[currentStep];

  const handleSelectOption = (value: number) => {
    if (!currentQuestion) return;
    const updated = { ...answers, [currentQuestion.id]: value };
    setAnswers(updated);
    saveDraft(updated, currentStep);

    // Immediate crisis safety trigger
    if (currentQuestion.isCrisisTrigger && value > 0) {
      setIsCrisisModalOpen(true);
    }
  };

  const handleNext = () => {
    if (currentStep < assessmentQuestions.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      saveDraft(answers, nextStep);
    } else {
      setStage('result');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      saveDraft(answers, prevStep);
    }
  };

  const handleStart = () => {
    clearDraft();
    setAnswers({});
    setCurrentStep(0);
    setStage('assessment');
  };

  const handleRetake = () => {
    clearDraft();
    setAnswers({});
    setCurrentStep(0);
    setStage('welcome');
    setHasDraft(false);
  };

  const result: AssessmentResult = evaluateAssessment(answers);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Header onCrisisClick={() => setIsCrisisModalOpen(true)} />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 sm:py-12">
        {/* Welcome Stage */}
        {stage === 'welcome' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Клінічно обґрунтований психоемоційний скринінг
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Оцініть свій стан без страху, ярликів та збору даних
              </h1>
              <p className="text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
                MindCheck аналізує симптоми депресії, тривожності та виснаження за валідованими клінічними шкалами.
                Повністю конфіденційно, безкоштовно та локально на вашому пристрої.
              </p>
            </div>

            {/* Resume draft notice if available */}
            {hasDraft && (
              <div className="p-4 bg-teal-50/80 border border-teal-200 rounded-2xl flex items-center justify-between gap-3">
                <div className="text-xs text-teal-900">
                  <span className="font-bold block">У вас є збережена незакінчена чернетка</span>
                  Бажаєте продовжити з того місця, де зупинилися?
                </div>
                <button
                  onClick={handleResumeDraft}
                  className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shrink-0 transition"
                >
                  Продовжити
                </button>
              </div>
            )}

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 bg-white rounded-xl border border-slate-200/70 shadow-2xs flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900">10–12 хвилин</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Виважений і точний аналіз симптомів</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200/70 shadow-2xs flex items-start gap-3">
                <Lock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Zero-Data</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Відповіді не передаються на сервер</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200/70 shadow-2xs flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900">PHQ-9 + GAD-7</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Міжнародні стандарти діагностики</p>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-2 flex flex-col items-center gap-3">
              <button
                onClick={handleStart}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-base shadow-sm hover:shadow-md transition-all"
              >
                <span>Почати оцінювання</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <span className="text-[11px] text-slate-400">Без реєстрацій • 100% анонімно</span>
            </div>
          </div>
        )}

        {/* Assessment Questions Stage */}
        {stage === 'assessment' && currentQuestion && (
          <div>
            <AssessmentProgress
              currentStep={currentStep}
              totalSteps={assessmentQuestions.length}
              stageTitle="Комплексний скринінг (PHQ-9 + GAD-7 + Контекст)"
            />

            <QuestionCard
              question={currentQuestion}
              selectedValue={answers[currentQuestion.id]}
              onSelect={handleSelectOption}
              onNext={handleNext}
              onPrev={handlePrev}
              canPrev={currentStep > 0}
              isLast={currentStep === assessmentQuestions.length - 1}
            />
          </div>
        )}

        {/* Results Stage */}
        {stage === 'result' && (
          <ResultsSummary
            result={result}
            onRetake={handleRetake}
            onCrisisClick={() => setIsCrisisModalOpen(true)}
          />
        )}
      </main>

      <footer className="border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-400">
        <p>MindCheck — Некомерційний освітній проєкт психоемоційного скринінгу.</p>
        <p className="mt-1">Усі обчислення виконуються локально у вашому браузері.</p>
      </footer>

      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
        countryCode="UA"
      />
    </div>
  );
}
