import React, { useState } from 'react';
import { AssessmentResult, SeverityLevel } from '../types/assessment';
import { CheckCircle2, AlertTriangle, RotateCcw, Heart, Copy, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface ResultsSummaryProps {
  result: AssessmentResult;
  onRetake: () => void;
  onCrisisClick: () => void;
  onUpgradeToDeep?: () => void;
  language: Language;
}

const severityConfig: Record<Language, Record<SeverityLevel, { label: string; color: string; desc: string }>> = {
  uk: {
    minimal: {
      label: 'Мінімальний рівень',
      color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      desc: 'Ваші відповіді не свідчать про наявність клінічно значущих симптомів. Поточний емоційний стан у межах норми.',
    },
    mild: {
      label: 'Легкий рівень',
      color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800',
      desc: 'Присутні окремі ознаки втоми або пригніченості. Це типова реакція на стрес, перевтому чи нестачу відновлення.',
    },
    moderate: {
      label: 'Помірний рівень',
      color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      desc: 'Симптоми відчутно впливають на працездатність, настрій та якість життя. Варто звернути увагу на відновлення ресурсу.',
    },
    moderately_severe: {
      label: 'Виражений рівень',
      color: 'bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-800',
      desc: 'Симптоми суттєво обмежують активність. Рекомендується обговорити результат із фахівцем (психологом чи психотерапевтом).',
    },
    severe: {
      label: 'Тяжкий рівень',
      color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800',
      desc: 'Виражений дистрес, який потребує фахової медико-психологічної оцінки (психіатр, клінічний психолог).',
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
      desc: 'Los síntomas afectan su rutina y bienestar. Se recomienda apoyo psicológico.',
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

const severityBarGradient: Record<SeverityLevel, string> = {
  minimal: 'bg-emerald-500',
  mild: 'bg-gradient-to-r from-emerald-500 to-teal-500',
  moderate: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500',
  moderately_severe: 'bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-500',
  severe: 'bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-600',
};

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  result,
  onRetake,
  onCrisisClick,
  onUpgradeToDeep,
  language,
}) => {
  const [copied, setCopied] = useState(false);
  const [showUpgradeCard, setShowUpgradeCard] = useState(true);
  const t = translations[language];
  const langConfig = severityConfig[language] || severityConfig['uk'];
  const depSeverity = langConfig[result.depressionLevel];
  const anxSeverity = result.anxietyLevel ? langConfig[result.anxietyLevel] : null;
  const stressSeverity = result.stressLevel ? langConfig[result.stressLevel] : null;

  const modeBadge =
    result.mode === 'express'
      ? { icon: '⚡', label: 'Express (PHQ-9)' }
      : result.mode === 'deep'
      ? { icon: '🔬', label: 'Deep Research (PHQ-9 + GAD-7)' }
      : { icon: '📊', label: 'DASS-21 (UNSW Triad)' };

  const depMax = result.mode === 'dass21' ? 21 : 27;

  const handleCopyReport = () => {
    const reportText = `=== MindCheck: ${t.resultTitle} ===
${t.title}: ${result.completionDate}
${result.birthYear ? `${t.birthYearLabel}: ${result.birthYear}` : ''}
${t.selectedFormat}: ${modeBadge.label}

1. ${t.depTitle}: ${result.depressionScore}/${depMax} (${depSeverity.label})
${result.anxietyScore !== undefined && anxSeverity ? `2. ${t.anxTitle}: ${result.anxietyScore}/21 (${anxSeverity.label})` : ''}
${result.stressScore !== undefined && stressSeverity ? `3. ${t.stressTitle}: ${result.stressScore}/21 (${stressSeverity.label})` : ''}

${t.insightsTitle}:
${result.insights.map((i) => `• ${i}`).join('\n') || '• N/A'}

${t.recommendationsTitle}:
${result.recommendations.map((r) => `• ${r}`).join('\n')}

*${t.disclaimer}*`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Severity progress percentage for visual bar
  const depPercent = Math.min(100, Math.round((result.depressionScore / depMax) * 100));
  const anxPercent = result.anxietyScore !== undefined ? Math.min(100, Math.round((result.anxietyScore / 21) * 100)) : 0;
  const stressPercent = result.stressScore !== undefined ? Math.min(100, Math.round((result.stressScore / 21) * 100)) : 0;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Disclaimer Banner */}
      <div className="bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 p-4 rounded-3xl text-xs sm:text-sm leading-relaxed flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
        <p className="font-medium">{t.disclaimer}</p>
      </div>

      {/* COMPASSIONATE UPGRADE OFFER: Express -> Deep Research */}
      {result.mode === 'express' && showUpgradeCard && onUpgradeToDeep && (
        <div className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-teal-950/50 dark:via-cyan-950/40 dark:to-slate-900 rounded-3xl border-2 border-teal-300/80 dark:border-teal-700/80 p-6 sm:p-7 shadow-lg shadow-teal-500/5 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-100/80 dark:bg-teal-900/60 px-2.5 py-0.5 rounded-full">
                  {t.continueAssessmentTag}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {t.upgradeToDeepTitle}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.upgradeToDeepDesc}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={onUpgradeToDeep}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-md shadow-teal-600/20 transition active:scale-[0.99] cursor-pointer"
                >
                  <span>{t.upgradeToDeepBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowUpgradeCard(false)}
                  className="px-4 py-3 rounded-2xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  {t.upgradeToDeepDecline}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Score Cards */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
              {t.resultTitle}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              {t.resultProfile}
            </h2>
          </div>
          <div className="self-start sm:self-center shrink-0">
            <span className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/70 px-3.5 py-1.5 rounded-full border border-teal-200 dark:border-teal-800 shadow-2xs leading-none">
              <span className="text-sm leading-none">{modeBadge.icon}</span>
              <span>{modeBadge.label}</span>
            </span>
          </div>
        </div>

        {/* Depression Score Block */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg leading-snug">{t.depTitle}</span>
                <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold leading-none border shrink-0 ${depSeverity.color}`}>
                  {depSeverity.label}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-200 text-xs sm:text-sm leading-relaxed max-w-lg">
                {depSeverity.desc}
              </p>
            </div>
            <div className="sm:text-right shrink-0 bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
              <span className="text-3xl font-black text-slate-900 dark:text-white">{result.depressionScore}</span>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-400"> / {depMax} {t.points}</span>
            </div>
          </div>

          {/* Clinical Visual Gauge Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-[11px] font-semibold text-slate-400 dark:text-slate-500">
              <span>0 ({t.gaugeMin})</span>
              <span>{result.mode === 'dass21' ? '7' : '10'} ({t.gaugeMod})</span>
              <span>{result.mode === 'dass21' ? '14' : '20'} ({t.gaugeSev})</span>
              <span>{depMax}</span>
            </div>
            <div className="h-3 w-full bg-slate-200/70 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out shadow-xs ${severityBarGradient[result.depressionLevel]}`}
                style={{ width: `${depPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Anxiety Score Block (if deep assessment) */}
        {result.anxietyScore !== undefined && anxSeverity && (
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg leading-snug">{t.anxTitle}</span>
                  <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold leading-none border shrink-0 ${anxSeverity.color}`}>
                    {anxSeverity.label}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-200 text-xs sm:text-sm leading-relaxed max-w-lg">
                  {anxSeverity.desc}
                </p>
              </div>
              <div className="sm:text-right shrink-0 bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
                <span className="text-3xl font-black text-slate-900 dark:text-white">{result.anxietyScore}</span>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-400"> / 21 {t.points}</span>
              </div>
            </div>

            {/* Anxiety Visual Gauge */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                <span>0 ({t.gaugeMin})</span>
                <span>10 ({t.gaugeMod})</span>
                <span>15 ({t.gaugeHigh})</span>
                <span>21</span>
              </div>
              <div className="h-3 w-full bg-slate-200/70 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out shadow-xs ${severityBarGradient[result.anxietyLevel!]}`}
                  style={{ width: `${anxPercent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Stress Score Block (DASS-21) */}
        {result.stressScore !== undefined && stressSeverity && (
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg leading-snug">{t.stressTitle}</span>
                  <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold leading-none border shrink-0 ${stressSeverity.color}`}>
                    {stressSeverity.label}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-200 text-xs sm:text-sm leading-relaxed max-w-lg">
                  {stressSeverity.desc}
                </p>
              </div>
              <div className="sm:text-right shrink-0 bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
                <span className="text-3xl font-black text-slate-900 dark:text-white">{result.stressScore}</span>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-400"> / 21 {t.points}</span>
              </div>
            </div>

            {/* Stress Visual Gauge */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                <span>0 ({t.gaugeMin})</span>
                <span>10 ({t.gaugeMod})</span>
                <span>15 ({t.gaugeHigh})</span>
                <span>21</span>
              </div>
              <div className="h-3 w-full bg-slate-200/70 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out shadow-xs ${severityBarGradient[result.stressLevel!]}`}
                  style={{ width: `${stressPercent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Crisis Alert if flagged */}
        {result.crisisFlag && (
          <div className="p-5 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-200 dark:border-rose-900 flex items-start gap-3.5">
            <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <span className="font-extrabold text-rose-900 dark:text-rose-200 text-sm">{t.crisisAlertTitle}</span>
              <p className="text-xs sm:text-sm text-rose-800 dark:text-rose-300 leading-relaxed">
                {t.crisisAlertDesc}
              </p>
              <button
                type="button"
                onClick={onCrisisClick}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-700 dark:text-rose-400 hover:text-rose-900 dark:hover:text-rose-200 underline underline-offset-4 pt-1"
              >
                <Heart className="w-4 h-4" />
                {t.crisisAlertLink}
              </button>
            </div>
          </div>
        )}

        {/* Insights list */}
        {result.insights.length > 0 && (
          <div className="pt-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              {t.insightsTitle}
            </h3>
            <ul className="space-y-2.5">
              {result.insights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 text-sm text-slate-800 dark:text-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <span className="font-medium">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations list */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
            {t.recommendationsTitle}
          </h3>
          <ul className="space-y-3">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="p-4 bg-slate-50/80 dark:bg-slate-800/80 rounded-2xl border border-slate-200/70 dark:border-slate-700/80 text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Copy for Doctor Button */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-sm font-bold text-slate-900 dark:text-white block">{t.copyDoctorReport}</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.doctorReportSubtext}</p>
          </div>
          <button
            type="button"
            onClick={handleCopyReport}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-2xs cursor-pointer active:scale-95"
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
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-2xs cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.retakeBtn}</span>
        </button>
      </div>
    </div>
  );
};