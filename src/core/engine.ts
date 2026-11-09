import { AssessmentResult, SeverityLevel } from '../types/assessment';

export function calculateDepressionLevel(score: number): SeverityLevel {
  if (score <= 4) return 'minimal';
  if (score <= 9) return 'mild';
  if (score <= 14) return 'moderate';
  if (score <= 19) return 'moderately_severe';
  return 'severe';
}

export function calculateAnxietyLevel(score: number): SeverityLevel {
  if (score <= 4) return 'minimal';
  if (score <= 9) return 'mild';
  if (score <= 14) return 'moderate';
  return 'severe';
}

export function evaluateAssessment(answers: Record<string, number>): AssessmentResult {
  // PHQ-9 (0-27)
  let depressionScore = 0;
  for (let i = 1; i <= 9; i++) {
    const val = answers[`phq_${i}`];
    if (typeof val === 'number') {
      depressionScore += val;
    }
  }

  // GAD-7 (0-21)
  let anxietyScore = 0;
  let hasAnxiety = false;
  for (let i = 1; i <= 7; i++) {
    const val = answers[`gad_${i}`];
    if (typeof val === 'number') {
      anxietyScore += val;
      hasAnxiety = true;
    }
  }

  const crisisFlag = (answers['phq_9'] ?? 0) > 0;
  const depressionLevel = calculateDepressionLevel(depressionScore);
  const anxietyLevel = hasAnxiety ? calculateAnxietyLevel(anxietyScore) : undefined;

  const insights: string[] = [];
  const recommendations: string[] = [];

  // Insights
  if ((answers['phq_1'] ?? 0) >= 2) {
    insights.push('Ангедонія: виражена втрата інтересу та радості від улюблених справ.');
  }
  if ((answers['phq_3'] ?? 0) >= 2 || (answers['sleep_quality'] ?? 0) >= 2) {
    insights.push('Порушення сну та відсутність відновлення сил після ночі.');
  }
  if ((answers['phq_4'] ?? 0) >= 2) {
    insights.push('Хронічна втома та дефіцит енергії навіть за мінімальних навантажень.');
  }
  if (anxietyScore >= 10) {
    insights.push('Підвищений рівень фонової тривожності та внутрішнього напруження (шкала GAD-7).');
  }
  if ((answers['phq_7'] ?? 0) >= 2) {
    insights.push('Труднощі з утриманням уваги та концентрацією («brain fog»).');
  }
  if ((answers['social_withdrawal'] ?? 0) >= 2) {
    insights.push('Тенденція до соціальної самоізоляції та уникання контактів.');
  }
  if ((answers['context_duration'] ?? 0) >= 2) {
    insights.push('Тривалий характер симптомів (понад 1–6 місяців), що свідчить про стійкість стану.');
  }
  if ((answers['context_impact'] ?? 0) >= 2) {
    insights.push('Симптоми відчутно заважають роботі, навчанню та щоденному функціонуванню.');
  }

  // Recommendations
  if (crisisFlag) {
    recommendations.push('Не залишайтеся наодинці з цими думками. Зверніться до спеціаліста або зателефонуйте/напишіть у безкоштовну службу довіри.');
  }

  if (depressionLevel === 'severe' || depressionLevel === 'moderately_severe' || (anxietyLevel === 'severe')) {
    recommendations.push('Рекомендується консультація лікаря-психіатра або клінічного психотерапевта для комплексної оцінки та підбору терапії.');
    recommendations.push('Використайте згенероване резюме для первинної розмови з лікарем — це заощадить сили та допоможе точно передати стан.');
  } else if (depressionLevel === 'moderate' || anxietyLevel === 'moderate') {
    recommendations.push('Рекомендується психотерапевтична підтримка (наприклад, когнітивно-поведінкова терапія) для розвантаження та відновлення ресурсу.');
    recommendations.push('Зверніть увагу на гігієну сну, інформаційну дієту та м’яку фізичну активність без самокритики.');
  } else if (depressionLevel === 'mild' || anxietyLevel === 'mild') {
    recommendations.push('Симптоми помірні або легкі. Вони можуть бути сигналом про виснаження або тривалий стрес. Важливо подбати про якісний відпочинок.');
  } else {
    recommendations.push('Ваш поточний рівень симптомів мінімальний. Продовжуйте турбуватися про власні психоемоційні потреби та кордони.');
  }

  return {
    depressionScore,
    depressionLevel,
    anxietyScore: hasAnxiety ? anxietyScore : undefined,
    anxietyLevel,
    crisisFlag,
    completionDate: new Date().toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }),
    answers,
    insights,
    recommendations,
  };
}

const STORAGE_KEY = 'mindcheck_assessment_draft';

export function saveDraft(answers: Record<string, number>, currentStep: number) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentStep, updatedAt: Date.now() }));
  } catch (e) {
    console.warn('Could not save draft to localStorage', e);
  }
}

export function loadDraft(): { answers: Record<string, number>; currentStep: number } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
