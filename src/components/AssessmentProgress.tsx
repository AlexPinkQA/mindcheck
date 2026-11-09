import React from 'react';
import { Language, translations } from '../data/translations';

interface AssessmentProgressProps {
  currentStep: number;
  totalSteps: number;
  stageTitle: string;
  language: Language;
}

export const AssessmentProgress: React.FC<AssessmentProgressProps> = ({
  currentStep,
  totalSteps,
  stageTitle,
  language,
}) => {
  const percent = Math.min(100, Math.round(((currentStep + 1) / totalSteps) * 100));
  const t = translations[language];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2.5 font-medium">
        <span className="text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-lg border border-teal-100 dark:border-teal-800 font-bold">
          {stageTitle}
        </span>
        <span className="font-semibold text-slate-600 dark:text-slate-300">
          {t.questionOf(currentStep + 1, totalSteps)} ({percent}%)
        </span>
      </div>
      <div className="w-full h-2.5 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-300 ease-out shadow-xs"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
