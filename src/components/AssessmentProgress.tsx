import React from 'react';

interface AssessmentProgressProps {
  currentStep: number;
  totalSteps: number;
  stageTitle: string;
}

export const AssessmentProgress: React.FC<AssessmentProgressProps> = ({
  currentStep,
  totalSteps,
  stageTitle,
}) => {
  const percent = Math.min(100, Math.round(((currentStep + 1) / totalSteps) * 100));

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
        <span className="text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100 font-semibold">
          {stageTitle}
        </span>
        <span>
          Питання {currentStep + 1} з {totalSteps} ({percent}%)
        </span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
