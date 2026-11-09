import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CrisisModal } from './components/CrisisModal';
import { AssessmentProgress } from './components/AssessmentProgress';
import { QuestionCard } from './components/QuestionCard';
import { ResultsSummary } from './components/ResultsSummary';
import { LanguageSelector } from './components/LanguageSelector';
import { BirthYearStep } from './components/BirthYearStep';
import { ModeSelector } from './components/ModeSelector';
import { getQuestions } from './data/questions';
import { evaluateAssessment, saveDraft, loadDraft, clearDraft } from './core/engine';
import { AssessmentMode, AssessmentResult } from './types/assessment';
import { Language, translations } from './data/translations';

type FlowStage = 'language' | 'birth_year' | 'mode' | 'assessment' | 'result';

export default function App() {
  const [stage, setStage] = useState<FlowStage>('language');
  const [language, setLanguage] = useState<Language>('uk');
  const [birthYear, setBirthYear] = useState<number | undefined>(undefined);
  const [mode, setMode] = useState<AssessmentMode>('deep');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);

  const isUnder18 = birthYear ? (2026 - birthYear < 18) : false;
  const t = translations[language];

  // Restore draft if available
  useEffect(() => {
    const draft = loadDraft();
    if (draft && Object.keys(draft.answers).length > 0) {
      setAnswers(draft.answers);
      setCurrentStep(draft.currentStep || 0);
      setMode(draft.mode || 'deep');
      setLanguage(draft.language || 'uk');
      setBirthYear(draft.birthYear);
      setStage('assessment');
    }
  }, []);

  const questions = getQuestions(mode, language);
  const currentQuestion = questions[currentStep];

  // When an option is clicked: auto-advance to next question!
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

    // Immediate crisis safety trigger
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
      setStage('mode');
    }
  };

  const handleRetake = () => {
    clearDraft();
    setAnswers({});
    setCurrentStep(0);
    setStage('language');
  };

  const result: AssessmentResult = evaluateAssessment(answers, mode, birthYear, language);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Header
        language={language}
        onChangeLanguage={() => setStage('language')}
        onCrisisClick={() => setIsCrisisModalOpen(true)}
      />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 sm:py-12">
        {/* Step 1: Language Selection */}
        {stage === 'language' && (
          <LanguageSelector
            currentLanguage={language}
            onSelect={(lang) => {
              setLanguage(lang);
              setStage('birth_year');
            }}
          />
        )}

        {/* Step 2: Birth Year Selection */}
        {stage === 'birth_year' && (
          <BirthYearStep
            language={language}
            selectedYear={birthYear}
            onSelectYear={(yr) => setBirthYear(yr)}
            onContinue={() => setStage('mode')}
            onBack={() => setStage('language')}
          />
        )}

        {/* Step 3: Mode Selection (Express vs Deep) */}
        {stage === 'mode' && (
          <ModeSelector
            language={language}
            selectedMode={mode}
            onSelectMode={(m) => setMode(m)}
            onStart={() => {
              clearDraft();
              setAnswers({});
              setCurrentStep(0);
              setStage('assessment');
            }}
            onBack={() => setStage('birth_year')}
          />
        )}

        {/* Step 4: Assessment Questions (Auto-advance on click) */}
        {stage === 'assessment' && currentQuestion && (
          <div>
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

        {/* Step 5: Results */}
        {stage === 'result' && (
          <ResultsSummary
            result={result}
            onRetake={handleRetake}
            onCrisisClick={() => setIsCrisisModalOpen(true)}
            language={language}
          />
        )}
      </main>

      <footer className="border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-400">
        <p>{t.footerText}</p>
        <p className="mt-1">{t.footerLocal}</p>
      </footer>

      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
        language={language}
        isUnder18={isUnder18}
      />
    </div>
  );
}
