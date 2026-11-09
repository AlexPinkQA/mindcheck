import React from 'react';
import { Language, translations } from '../data/translations';
import { AssessmentMode } from '../types/assessment';
import { Zap, Microscope, ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface ModeSelectorProps {
  language: Language;
  selectedMode: AssessmentMode;
  onSelectMode: (mode: AssessmentMode) => void;
  onStart: () => void;
  onBack: () => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  language,
  selectedMode,
  onSelectMode,
  onStart,
  onBack,
}) => {
  const t = translations[language];

  return (
    <div className="space-y-6 animate-fade-in max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold">
          <span>Крок 3 з 3 • Step 3 of 3</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.selectModeTitle}
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          {t.selectModeSubtitle}
        </p>
      </div>

      <div className="space-y-3">
        {/* Express Card */}
        <button
          type="button"
          onClick={() => onSelectMode('express')}
          className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start justify-between gap-4 group ${
            selectedMode === 'express'
              ? 'border-teal-600 bg-teal-50/70 shadow-sm ring-1 ring-teal-600'
              : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50/70'
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div className={`p-2.5 rounded-xl ${selectedMode === 'express' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-teal-100 group-hover:text-teal-800'}`}>
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-900">{t.expressTitle}</span>
              </div>
              <span className="text-xs font-semibold text-teal-700 block mt-0.5">{t.expressTime}</span>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{t.expressDesc}</p>
            </div>
          </div>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${selectedMode === 'express' ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'}`}>
            {selectedMode === 'express' && <Check className="w-3.5 h-3.5" />}
          </div>
        </button>

        {/* Deep Research Card */}
        <button
          type="button"
          onClick={() => onSelectMode('deep')}
          className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start justify-between gap-4 group ${
            selectedMode === 'deep'
              ? 'border-teal-600 bg-teal-50/70 shadow-sm ring-1 ring-teal-600'
              : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50/70'
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div className={`p-2.5 rounded-xl ${selectedMode === 'deep' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-teal-100 group-hover:text-teal-800'}`}>
              <Microscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-900">{t.deepTitle}</span>
              </div>
              <span className="text-xs font-semibold text-teal-700 block mt-0.5">{t.deepTime}</span>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{t.deepDesc}</p>
            </div>
          </div>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${selectedMode === 'deep' ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'}`}>
            {selectedMode === 'deep' && <Check className="w-3.5 h-3.5" />}
          </div>
        </button>
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
          onClick={onStart}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-teal-700 text-white hover:bg-teal-800 transition shadow-sm"
        >
          <span>{t.startBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
