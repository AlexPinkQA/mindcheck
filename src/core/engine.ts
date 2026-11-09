import { AssessmentResult, SeverityLevel, AssessmentMode } from '../types/assessment';
import { Language } from '../data/translations';

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

export function evaluateAssessment(
  answers: Record<string, number>,
  mode: AssessmentMode = 'deep',
  birthYear?: number,
  language: Language = 'uk'
): AssessmentResult {
  const currentYear = 2026;
  const isUnder18 = birthYear ? (currentYear - birthYear < 18) : false;

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

  // Insights generation
  if (language === 'uk') {
    if ((answers['phq_1'] ?? 0) >= 2) {
      insights.push('Ангедонія: відчутна втрата радості та інтересу до звичних справ.');
    }
    if ((answers['phq_3'] ?? 0) >= 2 || (answers['sleep_quality'] ?? 0) >= 2) {
      insights.push('Порушення сну та відсутність відновлення сил після ночі.');
    }
    if ((answers['phq_4'] ?? 0) >= 2) {
      insights.push('Хронічне виснаження та різкий брак фізичної й розумової енергії.');
    }
    if (anxietyScore >= 10) {
      insights.push('Підвищений рівень фонової тривожності та внутрішнього напруження (шкала GAD-7).');
    }
    if ((answers['phq_7'] ?? 0) >= 2) {
      insights.push('Труднощі з утриманням уваги та концентрацією («brain fog»).');
    }
    if ((answers['social_withdrawal'] ?? 0) >= 2) {
      insights.push('Тенденція до соціальної ізоляції та небажання виходити на звʼязок.');
    }
    if ((answers['context_duration'] ?? 0) >= 2) {
      insights.push('Тривалий характер симптомів (понад 1–6 місяців), що свідчить про стійкість стану.');
    }
    if ((answers['context_impact'] ?? 0) >= 2) {
      insights.push('Симптоми відчутно заважають навчанню, роботі та щоденному життю.');
    }

    // Recommendations
    if (crisisFlag) {
      insights.push('Зафіксовано суїцидальні думки або думки про самопошкодження.');
      if (isUnder18) {
        recommendations.push('Будь ласка, памʼятай: ти не один/одна. Поговори з дорослим, якому довіряєш (батьки, вчитель, шкільний психолог), або анонімно напиши в підлітковий чат Teenergizer чи Ла Страда.');
      } else {
        recommendations.push('Не залишайтеся наодинці з цими думками. Зверніться до спеціаліста або зателефонуйте/напишіть у безкоштовну службу довіри (7333).');
      }
    }

    if (depressionLevel === 'severe' || depressionLevel === 'moderately_severe' || anxietyLevel === 'severe') {
      recommendations.push(
        isUnder18
          ? 'Показники свідчать про глибокий емоційний дистрес. Дуже важливо звернутися за підтримкою до підліткового психотерапевта або лікаря.'
          : 'Рекомендується консультація лікаря-психіатра або клінічного психотерапевта для комплексної оцінки та підбору лікування.'
      );
      recommendations.push('Скопіюйте це резюме для першого візиту — це полегшить розмову з фахівцем.');
    } else if (depressionLevel === 'moderate' || anxietyLevel === 'moderate') {
      recommendations.push('Рекомендується психотерапевтична підтримка для опрацювання тригерів та відновлення ресурсу.');
      recommendations.push('Зверніть увагу на гігієну сну, режим дня та зниження стресового навантаження.');
    } else if (depressionLevel === 'mild' || anxietyLevel === 'mild') {
      recommendations.push('Симптоми легкі або ситуативні. Вони сигналізують про перевтому — подбайте про відновлення сил.');
    } else {
      recommendations.push('Ваш рівень симптомів мінімальний. Продовжуйте піклуватися про своє психоемоційне здоров’я.');
    }
  } else {
    // English / International fallback
    if ((answers['phq_1'] ?? 0) >= 2) {
      insights.push('Anhedonia: significant loss of interest or pleasure in activities.');
    }
    if ((answers['phq_3'] ?? 0) >= 2 || (answers['sleep_quality'] ?? 0) >= 2) {
      insights.push('Sleep disturbances and lack of physical recovery in the morning.');
    }
    if ((answers['phq_4'] ?? 0) >= 2) {
      insights.push('Persistent fatigue and diminished energy levels.');
    }
    if (anxietyScore >= 10) {
      insights.push('Elevated baseline anxiety and physical tension (GAD-7 scale).');
    }
    if ((answers['phq_7'] ?? 0) >= 2) {
      insights.push('Cognitive difficulties with concentration and mental focus.');
    }
    if ((answers['context_impact'] ?? 0) >= 2) {
      insights.push('Symptoms are noticeably impacting daily activities and responsibilities.');
    }

    if (crisisFlag) {
      recommendations.push(
        isUnder18
          ? "Please remember you don't have to face this alone. Reach out to a trusted adult or connect with a free confidential youth support line."
          : 'Please do not stay alone with thoughts of self-harm. Reach out to a mental health professional or a crisis helpline.'
      );
    }

    if (depressionLevel === 'severe' || depressionLevel === 'moderately_severe' || anxietyLevel === 'severe') {
      recommendations.push('A clinical consultation with a mental health professional (psychotherapist or psychiatrist) is strongly recommended.');
      recommendations.push('Save or copy this summary to share with your specialist during your first consultation.');
    } else if (depressionLevel === 'moderate' || anxietyLevel === 'moderate') {
      recommendations.push('Psychotherapy (such as Cognitive Behavioral Therapy) is recommended to manage stressors and rebuild emotional resilience.');
      recommendations.push('Focus on sleep hygiene, balanced daily rhythm, and reducing overwhelming commitments.');
    } else {
      recommendations.push('Your symptom level is low. Continue prioritizing your mental well-being and rest.');
    }
  }

  return {
    depressionScore,
    depressionLevel,
    anxietyScore: hasAnxiety ? anxietyScore : undefined,
    anxietyLevel,
    crisisFlag,
    completionDate: new Date().toLocaleDateString(language === 'uk' ? 'uk-UA' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
    answers,
    insights,
    recommendations,
    birthYear,
    isUnder18,
    mode,
    language,
  };
}

const STORAGE_KEY = 'mindcheck_assessment_draft';

export function saveDraft(data: {
  answers: Record<string, number>;
  currentStep: number;
  mode: AssessmentMode;
  language: Language;
  birthYear?: number;
}) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, updatedAt: Date.now() }));
  } catch (e) {
    console.warn('Could not save draft to localStorage', e);
  }
}

export function loadDraft(): {
  answers: Record<string, number>;
  currentStep: number;
  mode: AssessmentMode;
  language: Language;
  birthYear?: number;
} | null {
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
