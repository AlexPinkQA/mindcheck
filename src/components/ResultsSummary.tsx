import React, { useState } from 'react';
import { AssessmentResult, SeverityLevel } from '../types/assessment';
import { CheckCircle2, AlertTriangle, RotateCcw, Heart, Copy, Check } from 'lucide-react';

interface ResultsSummaryProps {
  result: AssessmentResult;
  onRetake: () => void;
  onCrisisClick: () => void;
}

const severityConfig: Record<SeverityLevel, { label: string; color: string; desc: string }> = {
  minimal: {
    label: 'Мінімальний рівень',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    desc: 'Ваші відповіді не свідчать про наявність клінічно значущих депресивних або тривожних симптомів.',
  },
  mild: {
    label: 'Легкий рівень',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    desc: 'Присутні окремі ознаки втоми або пригніченості. Це типова реакція на стрес, перевтому чи нестачу відновлення.',
  },
  moderate: {
    label: 'Помірний рівень',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    desc: 'Симптоми відчутно впливають на працездатність, настрій та якість життя. Варто приділити увагу своєму стану.',
  },
  moderately_severe: {
    label: 'Виражений рівень',
    color: 'bg-orange-100 text-orange-800 border-orange-300',
    desc: 'Симптоми суттєво обмежують активність. Рекомендується обговорити результат із фахівцем (психотерапевтом).',
  },
  severe: {
    label: 'Тяжкий рівень',
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    desc: 'Виражений дистрес, який потребує професійної медико-психологічної оцінки (психіатр, клінічний психолог).',
  },
};

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  result,
  onRetake,
  onCrisisClick,
}) => {
  const [copied, setCopied] = useState(false);
  const depSeverity = severityConfig[result.depressionLevel];
  const anxSeverity = result.anxietyLevel ? severityConfig[result.anxietyLevel] : null;

  const handleCopyReport = () => {
    const reportText = `=== MindCheck: Зведення клінічного скринінгу ===
Дата проходження: ${result.completionDate}

1. Шкала депресії PHQ-9: ${result.depressionScore}/27 (${depSeverity.label})
${result.anxietyScore !== undefined && anxSeverity ? `2. Шкала тривожності GAD-7: ${result.anxietyScore}/21 (${anxSeverity.label})` : ''}

Ключові спостереження:
${result.insights.map((i) => `• ${i}`).join('\n') || '• Без специфічних ускладнень'}

Рекомендації:
${result.recommendations.map((r) => `• ${r}`).join('\n')}

*Примітка: Результат є інструментом самоусвідомлення та первинного скринінгу, а не медичним діагнозом.*`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Disclaimer Banner */}
      <div className="bg-slate-100/90 border border-slate-200 text-slate-700 px-4 py-3 rounded-xl text-xs sm:text-sm leading-relaxed">
        <strong>Зверніть увагу:</strong> Цей звіт є <strong>клінічним скринінгом</strong>, а не медичним діагнозом. Він створений, щоб допомогти вам усвідомити свій стан і мати структуровану основу для розмови зі спеціалістом.
      </div>

      {/* Main Score Cards (Depression & Anxiety) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
            Результати оцінювання
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Психоемоційний профіль
          </h2>
        </div>

        {/* Depression Score Block */}
        <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-base">Депресивні прояви (PHQ-9)</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${depSeverity.color}`}>
                {depSeverity.label}
              </span>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-lg">
              {depSeverity.desc}
            </p>
          </div>
          <div className="sm:text-right shrink-0 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{result.depressionScore}</span>
            <span className="text-xs font-medium text-slate-400"> / 27 балів</span>
          </div>
        </div>

        {/* Anxiety Score Block */}
        {result.anxietyScore !== undefined && anxSeverity && (
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base">Рівень тривожності (GAD-7)</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${anxSeverity.color}`}>
                  {anxSeverity.label}
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-lg">
                {anxSeverity.desc}
              </p>
            </div>
            <div className="sm:text-right shrink-0 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{result.anxietyScore}</span>
              <span className="text-xs font-medium text-slate-400"> / 21 бал</span>
            </div>
          </div>
        )}

        {/* Crisis Alert if flagged */}
        {result.crisisFlag && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-rose-900 text-sm">Важливий сигнал підтримки</span>
              <p className="text-xs text-rose-800 leading-relaxed">
                У ваших відповідях зафіксовано думки про важкість життя або самопошкодження. Ви не мусите нести цей тягар самотужки.
              </p>
              <button
                onClick={onCrisisClick}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-900 underline underline-offset-2 pt-1"
              >
                <Heart className="w-3.5 h-3.5" />
                Отримати безкоштовну анонімну підтримку (лінії довіри / чати)
              </button>
            </div>
          </div>
        )}

        {/* Insights list */}
        {result.insights.length > 0 && (
          <div className="pt-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
              Що вплинуло на ваші показники
            </h3>
            <ul className="space-y-2">
              {result.insights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations list */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
            Рекомендовані кроки підтримки
          </h3>
          <ul className="space-y-2.5">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/50 text-sm text-slate-700 leading-relaxed">
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Copy for Doctor Button */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-sm font-bold text-slate-900 block">Зведення для візиту до спеціаліста</span>
            <p className="text-xs text-slate-500">Скопіюйте стисле резюме симптомів, щоб полегшити розмову на прийомі</p>
          </div>
          <button
            onClick={handleCopyReport}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-teal-600" />
                <span>Скопійовано в буфер!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Скопіювати звіт для лікаря</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Retake Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onRetake}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition shadow-2xs"
        >
          <RotateCcw className="w-4 h-4" />
          Пройти оцінювання знову
        </button>
      </div>
    </div>
  );
};
