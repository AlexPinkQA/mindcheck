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

export function calculatePcPtsdLevel(score: number): SeverityLevel {
  if (score === 0) return 'minimal';
  if (score <= 2) return 'mild';
  if (score === 3) return 'moderate';
  if (score === 4) return 'moderately_severe';
  return 'severe';
}

export function calculatePcl5Level(score: number): SeverityLevel {
  if (score <= 18) return 'minimal';
  if (score <= 30) return 'mild';
  if (score <= 45) return 'moderate';
  if (score <= 59) return 'moderately_severe';
  return 'severe';
}

export function calculateClusterLevel(score: number, maxScore: number): SeverityLevel {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  if (pct < 25) return 'minimal';
  if (pct < 50) return 'mild';
  if (pct < 70) return 'moderate';
  if (pct < 85) return 'moderately_severe';
  return 'severe';
}

export function calculateItqTraumaLevel(score: number): SeverityLevel {
  if (score <= 5) return 'minimal';
  if (score <= 10) return 'mild';
  if (score <= 15) return 'moderate';
  if (score <= 19) return 'moderately_severe';
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

  // --- PC-PTSD-5 (Primary Care Screen, 0-5) ---
  if (mode === 'pc_ptsd_5') {
    let traumaScore = 0;
    for (let i = 1; i <= 5; i++) {
      traumaScore += answers[`pc_${i}`] ?? 0;
    }

    const traumaLevel = calculatePcPtsdLevel(traumaScore);
    const isPositiveScreen = traumaScore >= 3;
    const insights: string[] = [];
    const recommendations: string[] = [];

    if (language === 'uk') {
      if ((answers['pc_1'] ?? 0) === 1) {
        insights.push('Навʼязливі спогади та тривожні сни про травматичні або стресові події.');
      }
      if ((answers['pc_2'] ?? 0) === 1) {
        insights.push('Активне уникнення розмов, людей або місць, що нагадують про пережите.');
      }
      if ((answers['pc_3'] ?? 0) === 1) {
        insights.push('Стан постійної настороженості («надпильність») та здригання від звичайних звуків.');
      }
      if ((answers['pc_4'] ?? 0) === 1) {
        insights.push('Емоційне оніміння, відстороненість від інших людей та втрата життєвої радості.');
      }
      if ((answers['pc_5'] ?? 0) === 1) {
        insights.push('Стійке почуття провини або самозвинувачення у тому, що сталося.');
      }

      if (isPositiveScreen) {
        recommendations.push(
          'Результат показує позитивний скринінг (≥ 3 балів): висока ймовірність посттравматичного дистресу чи ПТСР.'
        );
        recommendations.push(
          isUnder18
            ? 'Дуже важливо не тримати цей тягар у собі. Поділіться самопочуттям з батьками або шкільним психологом.'
            : 'Рекомендується фахова консультація психотерапевта, який працює з травмою (методи EMDR або КПТ травми / TF-CBT).'
        );
        recommendations.push(
          'Ви також можете пройти повний клінічний опитувальник PCL-5 (20 питань) для детальної діагностики всіх 4 кластерів симптомів.'
        );
      } else {
        recommendations.push(
          'Результат скринінгу негативний: виражених симптомів посттравматичного стресу не виявлено.'
        );
        recommendations.push(
          'Якщо окремі стресові спогади все ж викликають дискомфорт, практикуйте техніки заземлення та відновлення безпеки.'
        );
      }
    } else {
      if ((answers['pc_1'] ?? 0) === 1) {
        insights.push('Intrusive memories and distressing dreams related to stressful experiences.');
      }
      if ((answers['pc_2'] ?? 0) === 1) {
        insights.push('Efforts to avoid thoughts, places, or reminders of the stressful events.');
      }
      if ((answers['pc_3'] ?? 0) === 1) {
        insights.push('Hypervigilance, feeling constantly on guard, or easily startled.');
      }
      if ((answers['pc_4'] ?? 0) === 1) {
        insights.push('Emotional numbness, feeling detached from people and surroundings.');
      }
      if ((answers['pc_5'] ?? 0) === 1) {
        insights.push('Persistent guilt or blaming oneself/others for what happened.');
      }

      if (isPositiveScreen) {
        recommendations.push(
          'Positive screen for traumatic stress (score ≥ 3): high probability of clinically significant PTSD symptoms.'
        );
        recommendations.push(
          'Consultation with a trauma-informed mental health professional (EMDR or trauma-focused CBT) is recommended.'
        );
        recommendations.push(
          'Consider completing the full PCL-5 assessment (20 questions) for detailed insights across all 4 symptom clusters.'
        );
      } else {
        recommendations.push('Negative screen: responses fall below the clinical threshold for active PTSD.');
        recommendations.push('Continue prioritizing restorative routines and stress-reduction strategies.');
      }
    }

    return {
      depressionScore: 0,
      depressionLevel: 'minimal',
      traumaScore,
      traumaLevel,
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

  // --- PCL-5 (DSM-5 PTSD Checklist, 0-80) ---
  if (mode === 'pcl5') {
    let totalScore = 0;
    for (let i = 1; i <= 20; i++) {
      totalScore += answers[`pcl_${i}`] ?? 0;
    }

    // 4 DSM-5 Clusters
    let intrusionScore = 0;
    for (let i = 1; i <= 5; i++) intrusionScore += answers[`pcl_${i}`] ?? 0;

    let avoidanceScore = 0;
    for (let i = 6; i <= 7; i++) avoidanceScore += answers[`pcl_${i}`] ?? 0;

    let moodScore = 0;
    for (let i = 8; i <= 14; i++) moodScore += answers[`pcl_${i}`] ?? 0;

    let arousalScore = 0;
    for (let i = 15; i <= 20; i++) arousalScore += answers[`pcl_${i}`] ?? 0;

    const traumaLevel = calculatePcl5Level(totalScore);

    const traumaClusters = [
      {
        key: 'intrusion',
        name: language === 'uk' ? 'Інтрузії (спогади)' : 'Intrusions',
        score: intrusionScore,
        maxScore: 20,
        level: calculateClusterLevel(intrusionScore, 20),
      },
      {
        key: 'avoidance',
        name: language === 'uk' ? 'Уникнення тригерів' : 'Avoidance',
        score: avoidanceScore,
        maxScore: 8,
        level: calculateClusterLevel(avoidanceScore, 8),
      },
      {
        key: 'mood',
        name: language === 'uk' ? 'Думки та настрій' : 'Cognition & Mood',
        score: moodScore,
        maxScore: 28,
        level: calculateClusterLevel(moodScore, 28),
      },
      {
        key: 'arousal',
        name: language === 'uk' ? 'Гіперзбудження' : 'Hyperarousal',
        score: arousalScore,
        maxScore: 24,
        level: calculateClusterLevel(arousalScore, 24),
      },
    ];

    const insights: string[] = [];
    const recommendations: string[] = [];

    if (language === 'uk') {
      if (intrusionScore >= 8) {
        insights.push('Виражені інтрузивні спогади: флешбеки, кошмари та тривога при нагадуванні про подію.');
      }
      if (avoidanceScore >= 4) {
        insights.push('Активне уникнення думок, місць, розмов або людей, повʼязаних із пережитим.');
      }
      if (moodScore >= 12) {
        insights.push('Негативні зрушення в когніціях: почуття провини, відчуження від людей та втрата радості.');
      }
      if (arousalScore >= 10) {
        insights.push('Нейрофізіологічне перезбудження: надпильність, спалахи роздратування та здригання.');
      }

      if (totalScore >= 33) {
        recommendations.push(
          'Загальний бал (≥ 33) перевищує клінічний поріг DSM-5, що вказує на ймовірну наявність ПТСР.'
        );
        recommendations.push(
          isUnder18
            ? 'Будь ласка, зверніться до дитячого чи підліткового психотерапевта або довірених дорослих для фахової допомоги.'
            : 'Настійно рекомендується звернутися до лікаря-психотерапевта (EMDR, пролонгована експозиція, травмафокусована КПТ).'
        );
        recommendations.push('Скопіюйте це резюме для лікаря — воно містить детальний розподіл за всіма 4 кластерами.');
      } else if (totalScore >= 19) {
        recommendations.push(
          'Помірні посттравматичні реакції. Нервова система продовжує опрацьовувати стресовий досвід.'
        );
        recommendations.push(
          'Корисними будуть консультації психолога та практики соматичної стабілізації (дихальні вправи, техніки безпечного місця).'
        );
      } else {
        recommendations.push('Показники перебувають у межах легкої або мінімальної реакції. ПТСР малоймовірний.');
      }
    } else {
      if (intrusionScore >= 8) {
        insights.push('Significant intrusive re-experiencing: flashbacks, disturbing nightmares, or intense reactions to reminders.');
      }
      if (avoidanceScore >= 4) {
        insights.push('Strong behavioral avoidance of external and internal trauma reminders.');
      }
      if (moodScore >= 12) {
        insights.push('Negative alterations in cognitions: feelings of guilt, emotional detachment, and diminished positive affect.');
      }
      if (arousalScore >= 10) {
        insights.push('Marked hyperarousal: hypervigilance, irritability, and exaggerated startle response.');
      }

      if (totalScore >= 33) {
        recommendations.push(
          'Total score (≥ 33) exceeds the DSM-5 clinical cutoff indicating probable PTSD.'
        );
        recommendations.push(
          'Evidence-based trauma therapy (EMDR, Prolonged Exposure, or Trauma-Focused CBT) is strongly advised.'
        );
        recommendations.push('Share this structured cluster report with your healthcare or psychological specialist.');
      } else if (totalScore >= 19) {
        recommendations.push('Moderate traumatic stress symptoms present. Somatic grounding and counseling support are beneficial.');
      } else {
        recommendations.push('Symptom levels are minimal to mild. Clinical PTSD criteria are not indicated.');
      }
    }

    return {
      depressionScore: 0,
      depressionLevel: 'minimal',
      traumaScore: totalScore,
      traumaLevel,
      traumaClusters,
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

  // --- ITQ (International Trauma Questionnaire, ICD-11: PTSD & C-PTSD) ---
  if (mode === 'itq') {
    // PTSD Core Items (itq_1 .. itq_6)
    let ptsdScore = 0;
    for (let i = 1; i <= 6; i++) ptsdScore += answers[`itq_${i}`] ?? 0;

    // DSO Items (itq_10 .. itq_15)
    let dsoScore = 0;
    for (let i = 10; i <= 15; i++) dsoScore += answers[`itq_${i}`] ?? 0;

    // ICD-11 Diagnostic Logic:
    // PTSD criteria:
    // Re-experiencing in the here & now: itq_1 >= 2 or itq_2 >= 2
    // Avoidance: itq_3 >= 2 or itq_4 >= 2
    // Sense of threat: itq_5 >= 2 or itq_6 >= 2
    // Functional impairment: itq_7 >= 2 or itq_8 >= 2 or itq_9 >= 2
    const ptsdRe = (answers['itq_1'] ?? 0) >= 2 || (answers['itq_2'] ?? 0) >= 2;
    const ptsdAv = (answers['itq_3'] ?? 0) >= 2 || (answers['itq_4'] ?? 0) >= 2;
    const ptsdTh = (answers['itq_5'] ?? 0) >= 2 || (answers['itq_6'] ?? 0) >= 2;
    const ptsdFi = (answers['itq_7'] ?? 0) >= 2 || (answers['itq_8'] ?? 0) >= 2 || (answers['itq_9'] ?? 0) >= 2;
    const meetsPtsd = ptsdRe && ptsdAv && ptsdTh && ptsdFi;

    // DSO criteria:
    // Affective dysregulation: itq_10 >= 2 or itq_11 >= 2
    // Negative self-concept: itq_12 >= 2 or itq_13 >= 2
    // Disturbed relationships: itq_14 >= 2 or itq_15 >= 2
    // Functional impairment: itq_16 >= 2 or itq_17 >= 2 or itq_18 >= 2
    const dsoAd = (answers['itq_10'] ?? 0) >= 2 || (answers['itq_11'] ?? 0) >= 2;
    const dsoNsc = (answers['itq_12'] ?? 0) >= 2 || (answers['itq_13'] ?? 0) >= 2;
    const dsoDr = (answers['itq_14'] ?? 0) >= 2 || (answers['itq_15'] ?? 0) >= 2;
    const dsoFi = (answers['itq_16'] ?? 0) >= 2 || (answers['itq_17'] ?? 0) >= 2 || (answers['itq_18'] ?? 0) >= 2;
    const meetsDso = dsoAd && dsoNsc && dsoDr && dsoFi;

    let cptsdResult: 'none' | 'ptsd' | 'cptsd' = 'none';
    if (meetsPtsd && meetsDso) {
      cptsdResult = 'cptsd';
    } else if (meetsPtsd) {
      cptsdResult = 'ptsd';
    }

    const traumaLevel = calculateItqTraumaLevel(ptsdScore);

    const insights: string[] = [];
    const recommendations: string[] = [];

    if (language === 'uk') {
      if (ptsdRe) insights.push('Навʼязливі спогади або відчуття переживання події знову тут і зараз.');
      if (ptsdAv) insights.push('Уникнення думок, почуттів або зовнішніх тригерів, що нагадують про пережите.');
      if (ptsdTh) insights.push('Стійке відчуття поточної загрози, надпильність та підвищена реактивність.');
      if (dsoAd) insights.push('Порушення емоційної регуляції: тривале заспокоєння або відчуття емоційного оніміння.');
      if (dsoNsc) insights.push('Негативний образ себе: відчуття поразки, провини або втрати власної цінності.');
      if (dsoDr) insights.push('Труднощі у міжособистісних стосунках та відчуття відстороненості від людей.');

      if (cptsdResult === 'cptsd') {
        recommendations.push(
          'Результати відповідають діагностичним критеріям Комплексного ПТСР (кПТСР, МКХ-11 ВООЗ).'
        );
        recommendations.push(
          'кПТСР зазвичай розвивається внаслідок тривалої чи повторюваної травматизації (війна, окупація, насильство).'
        );
        recommendations.push(
          'Рекомендується комплексна трифазна психотерапія: 1) стабілізація та безпека, 2) опрацювання спогадів, 3) інтеграція та відновлення звʼязків.'
        );
      } else if (cptsdResult === 'ptsd') {
        recommendations.push(
          'Результати відповідають діагностичним критеріям класичного ПТСР за МКХ-11.'
        );
        recommendations.push(
          'Рекомендується фахова травматерапія (EMDR або КПТ травми) для опрацювання травматичного сліду.'
        );
      } else {
        recommendations.push('Критерії клінічного ПТСР або кПТСР за МКХ-11 не досягнуті.');
        recommendations.push('Якщо ви відчуваєте окремі складнощі зі стресом, продовжуйте підтримувати свій емоційний баланс.');
      }
    } else {
      if (ptsdRe) insights.push('Re-experiencing the trauma in the here-and-now with vivid emotional activation.');
      if (ptsdAv) insights.push('Avoidance of traumatic memories, external places, and conversations.');
      if (ptsdTh) insights.push('Persistent sense of current threat, hypervigilance, and heightened startle.');
      if (dsoAd) insights.push('Affective dysregulation: difficulty calming down or emotional numbing.');
      if (dsoNsc) insights.push('Negative self-concept: deep feelings of failure, shame, or worthlessness.');
      if (dsoDr) insights.push('Interpersonal difficulties: feeling cut off and struggling to stay close to others.');

      if (cptsdResult === 'cptsd') {
        recommendations.push(
          'Meets diagnostic criteria for Complex PTSD (C-PTSD, WHO ICD-11).'
        );
        recommendations.push(
          'C-PTSD reflects both core PTSD symptoms and disturbances in self-organization (affect, identity, relationships).'
        );
        recommendations.push(
          'Multi-phase trauma-informed therapy (safety & stabilization, trauma processing, social reintegration) is recommended.'
        );
      } else if (cptsdResult === 'ptsd') {
        recommendations.push('Meets diagnostic criteria for PTSD according to WHO ICD-11.');
        recommendations.push('Evidence-based trauma interventions (EMDR, TF-CBT) are recommended.');
      } else {
        recommendations.push('Did not meet clinical criteria for PTSD or Complex PTSD (ICD-11).');
      }
    }

    return {
      depressionScore: 0,
      depressionLevel: 'minimal',
      traumaScore: ptsdScore,
      traumaLevel,
      dsoScore,
      cptsdResult,
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
