import React, { useState } from 'react';
import { AssessmentResult, SeverityLevel } from '../types/assessment';
import { CheckCircle2, AlertTriangle, RotateCcw, Heart, Copy, Check } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface ResultsSummaryProps {
  result: AssessmentResult;
  onRetake: () => void;
  onCrisisClick: () => void;
  language: Language;
}

const severityConfig: Record<Language, Record<SeverityLevel, { label: string; color: string; desc: string }>> = {
  uk: {
    minimal: {
      label: 'Мінімальний рівень',
      color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      desc: 'Ваші відповіді не свідчать про наявність клінічно значущих депресивних або тривожних симптомів.',
    },
    mild: {
      label: 'Легкий рівень',
      color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800',
      desc: 'Присутні окремі ознаки втоми або пригніченості. Це типова реакція на стрес, перевтому чи нестачу відновлення.',
    },
    moderate: {
      label: 'Помірний рівень',
      color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      desc: 'Симптоми відчутно впливають на працездатність, настрій та якість життя. Варто приділити увагу своєму стану.',
    },
    moderately_severe: {
      label: 'Виражений рівень',
      color: 'bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-800',
      desc: 'Симптоми суттєво обмежують активність. Рекомендується обговорити результат із фахівцем (психотерапевтом).',
    },
    severe: {
      label: 'Тяжкий рівень',
      color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800',
      desc: 'Виражений дистрес, який потребує професійної медико-психологічної оцінки (психіатр, клінічний психолог).',
    },
  },
  en: {
    minimal: {
      label: 'Minimal Level',
      color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      desc: 'Your responses do not indicate clinically significant symptoms at this time.',
    },
    mild: {
      label: 'Mild Level',
      color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800',
      desc: 'Mild symptoms of fatigue or low mood present, often linked to situational stress or burnout.',
    },
    moderate: {
      label: 'Moderate Level',
      color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      desc: 'Symptoms noticeably impact daily functioning, energy, or sleep. Worth discussing with a counselor.',
    },
    moderately_severe: {
      label: 'Moderately Severe',
      color: 'bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-800',
      desc: 'Significant clinical distress present. Consultation with a healthcare provider or therapist is recommended.',
    },
    severe: {
      label: 'Severe Level',
      color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800',
      desc: 'Substantial distress requiring professional clinical evaluation and compassionate support.',
    },
  },
  es: {
    minimal: {
      label: 'Nivel Mínimo',
      color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      desc: 'Sus respuestas no indican síntomas clínicamente significativos en este momento.',
    },
    mild: {
      label: 'Nivel Leve',
      color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800',
      desc: 'Presencia de síntomas leves de cansancio o desánimo, frecuentemente asociados al estrés.',
    },
    moderate: {
      label: 'Nivel Moderado',
      color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      desc: 'Los síntomas afectan perceptiblemente su rutina y bienestar. Se recomienda apoyo psicológico.',
    },
    moderately_severe: {
      label: 'Moderadamente Grave',
      color: 'bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-800',
      desc: 'Malestar significativo. Se recomienda consultar a un profesional de la salud mental.',
    },
    severe: {
      label: 'Nivel Grave',
      color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800',
      desc: 'Malestar severo que requiere atención clínica especializada y apoyo compasivo.',
    },
  },
  pt: {
    minimal: {
      label: 'Nível Mínimo',
      color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      desc: 'As suas respostas não indicam sintomas clinicamente significativos.',
    },
    mild: {
      label: 'Nível Leve',
      color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800',
      desc: 'Sintomas ligeiros de fadiga ou desânimo, associados frequentemente ao cansaço ou stress.',
    },
    moderate: {
      label: 'Nível Moderado',
      color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      desc: 'Os sintomas afetam o seu dia a dia. É recomendável falar com um profissional de apoio.',
    },
    moderately_severe: {
      label: 'Moderadamente Grave',
      color: 'bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-800',
      desc: 'Sofrimento clínico significativo. Recomenda-se consulta com psicoterapeuta ou médico.',
    },
    severe: {
      label: 'Nível Grave',
      color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800',
      desc: 'Sofrimento intenso que exige avaliação clínica profissional.',
    },
  },
};

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  result,
  onRetake,
  onCrisisClick,
  language,
}) => {
  const [copied, setCopied] = useState(false);
  const t = translations[language];
  const langConfig = severityConfig[language] || severityConfig['uk'];
  const depSeverity = langConfig[result.depressionLevel];
  const anxSeverity = result.anxietyLevel ? langConfig[result.anxietyLevel] : null;

  const handleCopyReport = () => {
    const reportText = `=== MindCheck: ${t.resultTitle} ===
${t.title}: ${result.completionDate}
${result.birthYear ? `Рік народження / Birth year: ${result.birthYear}` : ''}
Формат / Mode: ${result.mode === 'express' ? 'Express (PHQ-9)' : 'Deep Research'}

1. ${t.depTitle}: ${result.depressionScore}/27 (${depSeverity.label})
${result.anxietyScore !== undefined && anxSeverity ? `2. ${t.anxTitle}: ${result.anxietyScore}/21 (${anxSeverity.label})` : ''}

${t.insightsTitle}:
${result.insights.map((i) => `• ${i}`).join('\n') || '• N/A'}

${t.recommendationsTitle}:
${result.recommendations.map((r) => `• ${r}`).join('\n')}

*${t.disclaimer}*`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Disclaimer Banner */}
      <div className="bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed">
        <strong>{t.disclaimer}</strong>
      </div>

      {/* Main Score Cards */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
              {t.resultTitle}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {t.resultProfile}
            </h2>
          </div>
          <span className="text-xs text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full font-bold border border-teal-200 dark:border-teal-800">
            {result.mode === 'express' ? '⚡ Express' : '🔬 Deep Research'}
          </span>
        </div>

        {/* Depression Score Block */}
        <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white text-base">{t.depTitle}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${depSeverity.color}`}>
                {depSeverity.label}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
              {depSeverity.desc}
            </p>
          </div>
          <div className="sm:text-right shrink-0 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{result.depressionScore}</span>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500"> / 27 {t.points}</span>
          </div>
        </div>

        {/* Anxiety Score Block (if deep assessment) */}
        {result.anxietyScore !== undefined && anxSeverity && (
          <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white text-base">{t.anxTitle}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${anxSeverity.color}`}>
                  {anxSeverity.label}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
                {anxSeverity.desc}
              </p>
            </div>
            <div className="sm:text-right shrink-0 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{result.anxietyScore}</span>
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500"> / 21 {t.points}</span>
            </div>
          </div>
        )}

        {/* Crisis Alert if flagged */}
        {result.crisisFlag && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-rose-900 dark:text-rose-200 text-sm">{t.crisisAlertTitle}</span>
              <p className="text-xs text-rose-800 dark:text-rose-300 leading-relaxed">
                {t.crisisAlertDesc}
              </p>
              <button
                type="button"
                onClick={onCrisisClick}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 hover:text-rose-900 dark:hover:text-rose-300 underline underline-offset-2 pt-1"
              >
                <Heart className="w-3.5 h-3.5" />
                {t.crisisAlertLink}
              </button>
            </div>
          </div>
        )}

        {/* Insights list */}
        {result.insights.length > 0 && (
          <div className="pt-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-3">
              {t.insightsTitle}
            </h3>
            <ul className="space-y-2">
              {result.insights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations list */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-3">
            {t.recommendationsTitle}
          </h3>
          <ul className="space-y-2.5">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="p-3.5 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl border border-slate-200/50 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Copy for Doctor Button */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-sm font-bold text-slate-900 dark:text-white block">{t.copyDoctorReport}</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">Скопіюйте стисле резюме симптомів, щоб полегшити розмову на прийомі</p>
          </div>
          <button
            type="button"
            onClick={handleCopyReport}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>{t.copyDoctorReport}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Retake Button */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition shadow-2xs"
        >
          <RotateCcw className="w-4 h-4" />
          {t.retakeBtn}
        </button>
      </div>
    </div>
  );
};