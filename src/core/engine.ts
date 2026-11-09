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

export function calculateDassDepressionLevel(score: number): SeverityLevel {
  if (score <= 4) return 'minimal';
  if (score <= 6) return 'mild';
  if (score <= 10) return 'moderate';
  if (score <= 13) return 'moderately_severe';
  return 'severe';
}

export function calculateDassAnxietyLevel(score: number): SeverityLevel {
  if (score <= 3) return 'minimal';
  if (score <= 5) return 'mild';
  if (score <= 7) return 'moderate';
  if (score <= 9) return 'moderately_severe';
  return 'severe';
}

export function calculateDassStressLevel(score: number): SeverityLevel {
  if (score <= 7) return 'minimal';
  if (score <= 9) return 'mild';
  if (score <= 12) return 'moderate';
  if (score <= 16) return 'moderately_severe';
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

  // DASS-21 (0-21 per subscale)
  if (mode === 'dass21') {
    let depressionScore = 0;
    const depItems = [3, 5, 10, 13, 16, 17, 21];
    depItems.forEach((num) => {
      depressionScore += answers[`dass_${num}`] ?? 0;
    });

    let anxietyScore = 0;
    const anxItems = [2, 4, 7, 9, 15, 19, 20];
    anxItems.forEach((num) => {
      anxietyScore += answers[`dass_${num}`] ?? 0;
    });

    let stressScore = 0;
    const stressItems = [1, 6, 8, 11, 12, 14, 18];
    stressItems.forEach((num) => {
      stressScore += answers[`dass_${num}`] ?? 0;
    });

    const depressionLevel = calculateDassDepressionLevel(depressionScore);
    const anxietyLevel = calculateDassAnxietyLevel(anxietyScore);
    const stressLevel = calculateDassStressLevel(stressScore);

    const insights: string[] = [];
    const recommendations: string[] = [];

    if (language === 'uk') {
      if (stressScore >= 10) {
        insights.push('Підвищений рівень хронічного стресу: перенапруження нервової системи, труднощі з розслабленням.');
      }
      if ((answers['dass_8'] ?? 0) >= 2 || (answers['dass_1'] ?? 0) >= 2) {
        insights.push('Надмірне витрачання нервової енергії та складнощі зі «скиданням» напруги після стресорів.');
      }
      if (anxietyScore >= 8) {
        insights.push('Виражені вегетативні та психосоматичні прояви тривожності (тахікардія, тремтіння, дихання).');
      }
      if (depressionScore >= 7) {
        insights.push('Знижений життєвий тонус, ангедонія та зневіра в майбутньому.');
      }
      if ((answers['dass_18'] ?? 0) >= 2 || (answers['dass_14'] ?? 0) >= 2) {
        insights.push('Зниження порогу терплячості та схильність до швидкого роздратування через вичерпання ресурсу.');
      }

      if (stressLevel === 'severe' || stressLevel === 'moderately_severe' || depressionLevel === 'severe' || anxietyLevel === 'severe') {
        recommendations.push(
          isUnder18
            ? 'Показники свідчать про стан вираженого нервового перенапруження. Обговоріть це з батьками або шкільним психологом.'
            : 'Рекомендується фахова консультація психотерапевта для запобігання повному синдрому вигорання (Burnout Syndrome).'
        );
        recommendations.push('Терміново перегляньте щоденний баланс: мінімізуйте фонові стресори та додайте обовʼязковий час на відпочинок.');
      } else if (stressLevel === 'moderate' || depressionLevel === 'moderate' || anxietyLevel === 'moderate') {
        recommendations.push('Організм сигналізує про вичерпання адаптаційних резервів. Практикуйте тілесні техніки релаксації та нормалізуйте сон.');
        recommendations.push('Зверніть увагу на розмежування роботи/навчання та особистого простору.');
      } else if (stressLevel === 'mild' || depressionLevel === 'mild' || anxietyLevel === 'mild') {
        recommendations.push('Легке ситуативне напруження. Додайте прогулянки на свіжому повітрі та повноцінний відпочинок на вихідних.');
      } else {
        recommendations.push('Усі три шкали (стрес, тривога, депресія) перебувають у межах здорової норми. Продовжуйте підтримувати баланс.');
      }
    } else {
      if (stressScore >= 10) {
        insights.push('Elevated levels of chronic stress: nervous system over-arousal and difficulty winding down.');
      }
      if ((answers['dass_8'] ?? 0) >= 2 || (answers['dass_1'] ?? 0) >= 2) {
        insights.push('Excessive expenditure of nervous energy and struggle to relax after taxing situations.');
      }
      if (anxietyScore >= 8) {
        insights.push('Noticeable autonomic/somatic anxiety responses (heart rate awareness, breathlessness, trembling).');
      }
      if (depressionScore >= 7) {
        insights.push('Low mood, anhedonia, and diminished optimism about the future.');
      }
      if ((answers['dass_18'] ?? 0) >= 2 || (answers['dass_14'] ?? 0) >= 2) {
        insights.push('Reduced threshold for tolerance and increased irritability due to emotional depletion.');
      }

      if (stressLevel === 'severe' || stressLevel === 'moderately_severe' || depressionLevel === 'severe' || anxietyLevel === 'severe') {
        recommendations.push('Consultation with a mental health professional is strongly recommended to prevent clinical burnout.');
        recommendations.push('Urgent recovery protocol: establish firm boundaries with work/commitments and prioritize sleep.');
      } else if (stressLevel === 'moderate' || depressionLevel === 'moderate' || anxietyLevel === 'moderate') {
        recommendations.push('Your nervous system is signaling resource depletion. Consider mindfulness, breathwork, and reducing cognitive load.');
      } else {
        recommendations.push('All three subscales (stress, anxiety, depression) are within the normal baseline range.');
      }
    }

    return {
      depressionScore,
      depressionLevel,
      anxietyScore,
      anxietyLevel,
      stressScore,
      stressLevel,
      crisisFlag: false,
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
