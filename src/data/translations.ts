export type Language = 'uk' | 'en' | 'es' | 'pt';

export interface TranslationStrings {
  title: string;
  subtitle: string;
  selectLanguage: string;
  languageDesc: string;
  continueBtn: string;
  backBtn: string;
  birthYearTitle: string;
  birthYearSubtitle: string;
  birthYearPlaceholder: string;
  youthBadge: string;
  selectModeTitle: string;
  selectModeSubtitle: string;
  expressTitle: string;
  expressTime: string;
  expressDesc: string;
  deepTitle: string;
  deepTime: string;
  deepDesc: string;
  startBtn: string;
  questionOf: (current: number, total: number) => string;
  anonymousBadge: string;
  crisisHelpBtn: string;
  crisisModalTitle: string;
  crisisModalSubtitle: string;
  crisisModalDesc: string;
  crisisYouthTag: string;
  crisisCall: (phone: string) => string;
  crisisChat: string;
  crisisDismiss: string;
  resultTitle: string;
  resultProfile: string;
  depTitle: string;
  anxTitle: string;
  points: string;
  disclaimer: string;
  crisisAlertTitle: string;
  crisisAlertDesc: string;
  crisisAlertLink: string;
  crisisTraumaTag: string;
  traumaSupportTitle: string;
  traumaSupportDesc: string;
  traumaSupportBtn: string;
  insightsTitle: string;
  recommendationsTitle: string;
  copyDoctorReport: string;
  copied: string;
  retakeBtn: string;
  footerText: string;
  footerLocal: string;
  welcomeCta: string;
  configureBtn: string;
  selectedFormat: string;
  selectedAge: string;
  notSpecified: string;
  privacyTitle: string;
  privacyDesc: string;
  clinicalTitle: string;
  clinicalDesc: string;
  upgradeToDeepTitle: string;
  upgradeToDeepDesc: string;
  upgradeToDeepBtn: string;
  upgradeToDeepDecline: string;
  stepLanguage: string;
  stepAge: string;
  stepMode: string;
  onboardingStepOf: (current: number, total: number) => string;
  testParameters: string;
  changeAll: string;
  languageLabel: string;
  yearsOldShort: string;
  yearsOldFull: string;
  autoAdvanceHint: string;
  gaugeMin: string;
  gaugeMod: string;
  gaugeSev: string;
  gaugeHigh: string;
  doctorReportSubtext: string;
  youthChatNote: string;
  adultChatNote: string;
  birthYearRequiredWarning: string;
  closeBtn: string;
  setupTitle: string;
  birthYearLabel: string;
  expressBadge: string;
  deepBadge: string;
  dassBadge: string;
  dassTitle: string;
  dassTime: string;
  dassDesc: string;
  stressTitle: string;
  stressDesc: string;
  continueAssessmentTag: string;
  themeLight: string;
  themeDark: string;
  startOverTooltip: string;
  setupTooltip: string;
  // Category tabs & sections
  sectionMood: string;
  sectionMoodDesc: string;
  sectionStress: string;
  sectionStressDesc: string;
  sectionTrauma: string;
  sectionTraumaDesc: string;
  categoryLabel: string;
  allCategoriesTab: string;
  // PTSD Assessments
  pcPtsdTitle: string;
  pcPtsdTime: string;
  pcPtsdBadge: string;
  pcPtsdDesc: string;
  pcl5Title: string;
  pcl5Time: string;
  pcl5Badge: string;
  pcl5Desc: string;
  itqTitle: string;
  itqTime: string;
  itqBadge: string;
  itqDesc: string;
  // Trauma Results & Clusters
  traumaTitle: string;
  clusterIntrusion: string;
  clusterAvoidance: string;
  clusterMood: string;
  clusterArousal: string;
  itqPtsdScoreTitle: string;
  itqDsoScoreTitle: string;
  cptsdNone: string;
  cptsdPtsd: string;
  cptsdComplex: string;
  upgradeToPclTitle: string;
  upgradeToPclDesc: string;
  upgradeToPclBtn: string;
  positiveScreen: string;
  negativeScreen: string;
  screenPositiveDesc: string;
  screenNegativeDesc: string;
  cutoffThresholdLabel: string;
  scoringCriteriaTitle: string;
  pcPtsdCutoffLabel: string;
  pcPtsdThresholdNote: string;
  pclCutoffLabel: string;
  pclThresholdNote: string;
  clustersBreakdownTitle: string;
}

export const translations: Record<Language, TranslationStrings> = {
  uk: {
    title: 'MindCheck',
    subtitle: 'Психоемоційний клінічний скринінг без страху, ярликів та передачі даних',
    selectLanguage: 'Оберіть мову',
    languageDesc: 'Виберіть зручну мову для проходження тестування',
    continueBtn: 'Продовжити',
    backBtn: 'Назад',
    birthYearTitle: 'Вкажіть ваш рік народження',
    birthYearSubtitle: 'Це потрібно для адаптації вікових рекомендацій та контактів підтримки (100% анонімно)',
    birthYearPlaceholder: 'Оберіть рік...',
    youthBadge: 'Програма адаптована для підлітків та молоді',
    selectModeTitle: 'Оберіть формат тестування',
    selectModeSubtitle: 'Ви можете обрати швидкий експрес-скринінг або комплексне поглиблене дослідження',
    expressTitle: '⚡ Експрес-тест',
    expressTime: '3–5 хвилин • 9 питань',
    expressDesc: 'Швидка первинна оцінка рівня депресивних симптомів за валідованою міжнародною шкалою PHQ-9.',
    deepTitle: '🔬 Deep Research (Поглиблений)',
    deepTime: '8–10 хвилин • 20 питань',
    deepDesc: 'Комплексний аналіз депресії (PHQ-9), тривожності (GAD-7), соматики, якості сну та впливу на повсякденне життя.',
    startBtn: 'Почати тестування',
    questionOf: (c, t) => `Питання ${c} з ${t}`,
    anonymousBadge: '100% анонімно: дані лише на пристрої',
    crisisHelpBtn: 'Термінова допомога',
    crisisModalTitle: 'Твоє життя має значення',
    crisisModalSubtitle: 'Ти не мусиш проходити крізь це наодинці',
    crisisModalDesc: 'Якщо ти відчуваєш нестерпний душевний біль або думаєш про заподіяння собі шкоди — звернися до людей, які готові підтримати. Це цілком безкоштовно та анонімно.',
    crisisYouthTag: 'Для молоді',
    crisisCall: (p) => `Зателефонувати (${p})`,
    crisisChat: 'Написати в чат підтримки',
    crisisDismiss: 'Я розумію, продовжити тестування',
    resultTitle: 'Результати оцінювання',
    resultProfile: 'Психоемоційний профіль',
    depTitle: 'Депресивні прояви (PHQ-9)',
    anxTitle: 'Рівень тривожності (GAD-7)',
    points: 'балів',
    disclaimer: 'Цей звіт є клінічним скринінгом для самоусвідомлення, а не медичним діагнозом. Він допоможе вам краще зрозуміти свій стан і сформулювати симптоми для бесіди зі спеціалістом.',
    crisisAlertTitle: 'Важливий сигнал підтримки',
    crisisAlertDesc: 'У ваших відповідях зафіксовано думки про важкість життя або самопошкодження. Ви не мусите нести цей тягар самотужки.',
    crisisAlertLink: 'Отримати безкоштовну анонімну підтримку (лінії довіри / чати)',
    crisisTraumaTag: 'Травма / Військовий стрес',
    traumaSupportTitle: 'Підтримка при травматичному стресі та ПТСР',
    traumaSupportDesc: 'Ваші показники перевищують клінічний поріг і вказують на суттєвий вплив пережитого стресового досвіду на нервову систему. Фахова підтримка (травматерапія EMDR, КПТ) допомагає ефективно опрацювати ці реакції. Ви можете звернутися до спеціалізованих ліній допомоги.',
    traumaSupportBtn: 'Контакти ліній психологічної підтримки',
    insightsTitle: 'Що вплинуло на ваші показники',
    recommendationsTitle: 'Рекомендовані кроки підтримки',
    copyDoctorReport: 'Скопіювати звіт для лікаря',
    copied: 'Скопійовано в буфер обміну!',
    retakeBtn: 'Пройти оцінювання знову',
    footerText: 'MindCheck — Некомерційний відкритий проєкт психоемоційного скринінгу.',
    footerLocal: 'Усі обчислення виконуються локально у вашому браузері.',
    welcomeCta: 'Почати тестування',
    configureBtn: 'Налаштувати параметри',
    selectedFormat: 'Формат тесту',
    selectedAge: 'Вікова категорія',
    notSpecified: 'Не вказано (натисніть щоб обрати)',
    privacyTitle: 'Zero-Data Конфіденційність',
    privacyDesc: 'Ваші відповіді не надсилаються на жоден сервер і зберігаються лише у памʼяті вашого пристрою.',
    clinicalTitle: 'Науково валідовані шкали',
    clinicalDesc: 'Стандартизовані міжнародні клінічні шкали: PHQ-9 (депресія), GAD-7 (тривожність), DASS-21 (стрес), PC-PTSD-5 / PCL-5 (DSM-5) та ITQ (ПТСР та кПТСР за МКХ-11 ВООЗ).',
    upgradeToDeepTitle: 'Бажаєте глибший аналіз? (якщо маєте сили та ресурс)',
    upgradeToDeepDesc: 'Ви успішно пройшли експрес-оцінку депресивних проявів (PHQ-9). Психічний стан часто складається з кількох компонентів. Якщо ви зараз відчуваєте в собі внутрішній ресурс — ви можете відповісти ще на 11 питань (шкала тривожності GAD-7, якість сну та соматика). Усі ваші вже заповнені відповіді зберігаються!',
    upgradeToDeepBtn: '✨ Продовжити до Deep Research (+11 питань)',
    upgradeToDeepDecline: 'Залишити поточний результат',
    stepLanguage: '1. Мова',
    stepAge: '2. Вік',
    stepMode: '3. Формат',
    onboardingStepOf: (c, t) => `Крок ${c} з ${t}`,
    testParameters: 'Параметри оцінювання',
    changeAll: 'Змінити всі',
    languageLabel: 'Мова',
    yearsOldShort: 'р.',
    yearsOldFull: 'років',
    autoAdvanceHint: 'Оберіть варіант для автопереходу',
    gaugeMin: 'Мінімум',
    gaugeMod: 'Помірний',
    gaugeSev: 'Тяжкий',
    gaugeHigh: 'Виражений',
    doctorReportSubtext: 'Скопіюйте стисле резюме симптомів для комфортного обговорення на прийомі',
    youthChatNote: 'Вам будуть доступні делікатні підліткові чати та лінії підтримки.',
    adultChatNote: 'Рекомендації та шкали адаптовані для дорослої аудиторії.',
    birthYearRequiredWarning: '⚠️ Будь ласка, оберіть ваш рік народження, щоб продовжити.',
    closeBtn: 'Закрити',
    setupTitle: 'Налаштування',
    birthYearLabel: 'Рік народження',
    expressBadge: '⚡ 9 питань (5 хв)',
    deepBadge: '🔬 20 питань (10 хв)',
    dassBadge: '📊 21 питання (6 хв)',
    dassTitle: '📊 DASS-21 (Баланс стресу)',
    dassTime: '5–7 хвилин • 21 питання',
    dassDesc: 'Комплексна валідована тріада (UNSW). Вимірює три стани окремо: рівень хронічного стресу / вигорання, тривожності та депресії.',
    stressTitle: 'Рівень стресу та виснаження',
    stressDesc: 'Хронічне напруження, дратівливість, виснаження нервової системи та труднощі з розслабленням.',
    continueAssessmentTag: 'Продовження тестування',
    themeLight: 'Світлий режим',
    themeDark: 'Нічний режим',
    startOverTooltip: 'Повернутися на початок',
    setupTooltip: 'Налаштування тестування',
    sectionMood: 'Настрій',
    sectionMoodDesc: 'Скринінг депресивних станів, тривожності та життєвого тонусу',
    sectionStress: 'Стрес',
    sectionStressDesc: 'Баланс хронічного перевантаження, тривоги та виснаження (DASS-21)',
    sectionTrauma: 'Травма',
    sectionTraumaDesc: 'Оцінка наслідків стресових подій, військового досвіду та комплексного ПТСР',
    categoryLabel: 'Категорія',
    allCategoriesTab: 'Всі тести',
    pcPtsdTitle: '⚡ PC-PTSD-5 (Швидкий скринінг)',
    pcPtsdTime: '1–2 хвилини • 5 питань',
    pcPtsdBadge: '⚡ 5 питань (2 хв)',
    pcPtsdDesc: 'Короткий клінічний експрес-скринінг первинної ланки (VA/DoD). Швидко визначає наявність ознак посттравматичного дистресу.',
    pcl5Title: '🔬 PCL-5 (Клінічний стандарт ПТСР)',
    pcl5Time: '8–12 хвилин • 20 питань',
    pcl5Badge: '🔬 20 питань (10 хв)',
    pcl5Desc: 'Золотий стандарт DSM-5. Детально аналізує 4 групи симптомів: навʼязливі спогади (інтрузії), уникнення тригерів, негативні зміни в думках/настрої та гіперзбудження.',
    itqTitle: '🌐 ITQ (МКХ-11: ПТСР та кПТСР)',
    itqTime: '7–10 хвилин • 18 питань',
    itqBadge: '🌐 18 питань (8 хв)',
    itqDesc: 'Міжнародний опитувальник травми за МКХ-11 ВООЗ. Діагностує як класичний ПТСР, так і Комплексний ПТСР (кПТСР) внаслідок тривалої хронічної травматизації.',
    traumaTitle: 'Скринінг травматичного стресу та ПТСР',
    clusterIntrusion: 'Навʼязливі спогади (Інтрузії)',
    clusterAvoidance: 'Уникнення тригерів',
    clusterMood: 'Негативні зміни думок і настрою',
    clusterArousal: 'Гіперзбудження та пильність',
    itqPtsdScoreTitle: 'Симптоми ПТСР (спогади, уникнення, загроза)',
    itqDsoScoreTitle: 'Порушення самоорганізації (DSO: емоції, самооцінка, стосунки)',
    cptsdNone: 'Ознак ПТСР або Комплексного ПТСР не виявлено',
    cptsdPtsd: 'Відповідає діагностичним критеріям ПТСР (МКХ-11)',
    cptsdComplex: 'Відповідає критеріям Комплексного ПТСР (кПТСР, МКХ-11)',
    upgradeToPclTitle: 'Бажаєте пройти поглиблену оцінку симптомів (PCL-5)?',
    upgradeToPclDesc: 'Ваш експрес-скринінг показав помітні реакції на травматичний стрес. Для детального розбору всіх 4 кластерів симптомів ви можете пройти повну клінічну шкалу PCL-5 (20 питань).',
    upgradeToPclBtn: '🔬 Пройти повну шкалу PCL-5 (20 питань)',
    positiveScreen: 'Позитивний скринінг (ймовірний ПТСР)',
    negativeScreen: 'Негативний скринінг',
    screenPositiveDesc: 'Результат (≥ 3 балів) вказує на клінічно значущі ознаки травматичного дистресу. Рекомендовано детальне обстеження (наприклад, шкалу PCL-5) та консультацію фахівця.',
    screenNegativeDesc: 'Кількість симптомів нижче клінічного порогу (3 бали). Ознак гострого посттравматичного дистресу не виявлено.',
    cutoffThresholdLabel: 'Клінічний поріг (DSM-5: 33 бали)',
    scoringCriteriaTitle: 'Критерій інтерпретації',
    pcPtsdCutoffLabel: 'Клінічний поріг: 3 з 5',
    pcPtsdThresholdNote: 'У скринінгу PC-PTSD-5 оцінюються 5 симптомів (максимум 5 балів). За стандартом DSM-5 клінічним порогом є 3 ствердні відповіді: результат ≥ 3 балів вказує на ймовірний посттравматичний стрес і доцільність проходження повної клінічної шкали PCL-5 (де максимум 80 балів, а клінічний поріг становить 33 бали).',
    pclCutoffLabel: 'Клінічний поріг (DSM-5: ≥ 33 з 80)',
    pclThresholdNote: 'У повній шкалі PCL-5 сумарний бал 33 або вище (з 80 можливих) є визнаним орієнтиром DSM-5 для ймовірної наявності ПТСР та необхідності фахової психотерапії.',
    clustersBreakdownTitle: 'Розподіл симптомів за кластерами DSM-5',
  },
  en: {
    title: 'MindCheck',
    subtitle: 'Confidential psychoemotional screening without stigma or data tracking',
    selectLanguage: 'Choose Language',
    languageDesc: 'Select your preferred language for the assessment',
    continueBtn: 'Continue',
    backBtn: 'Back',
    birthYearTitle: 'What is your year of birth?',
    birthYearSubtitle: 'Used to adapt crisis guidance and recommendations for your age group (100% anonymous)',
    birthYearPlaceholder: 'Select year...',
    youthBadge: 'Adapted for youth and adolescents',
    selectModeTitle: 'Choose assessment mode',
    selectModeSubtitle: 'Choose between a quick screening or a comprehensive deep assessment',
    expressTitle: '⚡ Express Screening',
    expressTime: '3–5 mins • 9 questions',
    expressDesc: 'Quick initial assessment of depressive symptoms using the validated clinical PHQ-9 scale.',
    deepTitle: '🔬 Deep Research Assessment',
    deepTime: '8–10 mins • 20 questions',
    deepDesc: 'In-depth analysis of depression (PHQ-9), anxiety (GAD-7), somatic factors, sleep, and functional life impact.',
    startBtn: 'Start Assessment',
    questionOf: (c, t) => `Question ${c} of ${t}`,
    anonymousBadge: '100% Anonymous: Local-only',
    crisisHelpBtn: 'Crisis Support',
    crisisModalTitle: 'Your Life Matters',
    crisisModalSubtitle: "You don't have to carry this alone",
    crisisModalDesc: 'If you are experiencing intense emotional distress or thinking about self-harm, confidential and free help is available right now.',
    crisisYouthTag: 'Youth Support',
    crisisCall: (p) => `Call (${p})`,
    crisisChat: 'Open Support Chat',
    crisisDismiss: 'I understand, continue assessment',
    resultTitle: 'Assessment Results',
    resultProfile: 'Psychoemotional Profile',
    depTitle: 'Depression Symptoms (PHQ-9)',
    anxTitle: 'Anxiety Level (GAD-7)',
    points: 'points',
    disclaimer: 'This report is a clinical screening tool for self-awareness, not a medical diagnosis. It helps structure your thoughts before consulting a specialist.',
    crisisAlertTitle: 'Important Support Signal',
    crisisAlertDesc: 'Your responses indicate thoughts of severe distress or self-harm. Free, compassionate help is available.',
    crisisAlertLink: 'Get free confidential crisis support',
    crisisTraumaTag: 'Trauma / War Stress',
    traumaSupportTitle: 'Trauma & PTSD Support Resources',
    traumaSupportDesc: 'Your responses exceed the clinical cutoff, indicating significant post-traumatic distress. Specialized trauma therapy (EMDR, CPT, TF-CBT) is highly effective in processing these symptoms. You can connect with dedicated confidential support hotlines.',
    traumaSupportBtn: 'View Crisis & Support Contacts',
    insightsTitle: 'Factors influencing your score',
    recommendationsTitle: 'Recommended Next Steps',
    copyDoctorReport: 'Copy Summary for Doctor',
    copied: 'Copied to clipboard!',
    retakeBtn: 'Retake Assessment',
    footerText: 'MindCheck — Open confidential mental wellness screening.',
    footerLocal: 'All calculations are performed locally inside your browser.',
    welcomeCta: 'Start Assessment',
    configureBtn: 'Configure Settings',
    selectedFormat: 'Assessment format',
    selectedAge: 'Age category',
    notSpecified: 'Not specified (click to set)',
    privacyTitle: 'Zero-Data Privacy',
    privacyDesc: 'Your answers are never sent to any server. Everything is evaluated locally in your browser.',
    clinicalTitle: 'Clinically Validated Scales',
    clinicalDesc: 'Standardized international clinical scales: PHQ-9 (depression), GAD-7 (anxiety), DASS-21 (stress), PC-PTSD-5 / PCL-5 (DSM-5), and ITQ (PTSD & Complex PTSD under WHO ICD-11).',
    upgradeToDeepTitle: 'Ready for a deeper analysis? (If you have the energy)',
    upgradeToDeepDesc: 'You completed the express screening (PHQ-9). Mental well-being is multifaceted. If you feel up to it and have the emotional capacity, you can expand this into Deep Research (11 more questions covering GAD-7 anxiety, sleep quality, and daily impact). Your existing answers are preserved!',
    upgradeToDeepBtn: '✨ Continue to Deep Research (+11 questions)',
    upgradeToDeepDecline: 'Keep current result',
    stepLanguage: '1. Language',
    stepAge: '2. Age',
    stepMode: '3. Format',
    onboardingStepOf: (c, t) => `Step ${c} of ${t}`,
    testParameters: 'Assessment Parameters',
    changeAll: 'Change all',
    languageLabel: 'Language',
    yearsOldShort: 'y.o.',
    yearsOldFull: 'years old',
    autoAdvanceHint: 'Select an option to auto-advance',
    gaugeMin: 'Minimal',
    gaugeMod: 'Moderate',
    gaugeSev: 'Severe',
    gaugeHigh: 'Mod. Severe',
    doctorReportSubtext: 'Copy a concise summary of your symptoms to discuss comfortably with your doctor',
    youthChatNote: 'Youth-friendly support chats and hotlines will be available.',
    adultChatNote: 'Recommendations and scales are adapted for an adult audience.',
    birthYearRequiredWarning: '⚠️ Please select your year of birth to continue.',
    closeBtn: 'Close',
    setupTitle: 'Settings',
    birthYearLabel: 'Birth year',
    expressBadge: '⚡ 9 questions (5 min)',
    deepBadge: '🔬 20 questions (10 min)',
    dassBadge: '📊 21 questions (6 min)',
    dassTitle: '📊 DASS-21 (Stress Balance)',
    dassTime: '5–7 minutes • 21 questions',
    dassDesc: 'Comprehensive validated triad (UNSW). Separately assesses chronic stress / burnout, anxiety, and depression levels.',
    stressTitle: 'Stress & Burnout Level',
    stressDesc: 'Chronic tension, irritability, nervous exhaustion, and difficulty unwinding.',
    continueAssessmentTag: 'Extend Assessment',
    themeLight: 'Light mode',
    themeDark: 'Dark mode',
    startOverTooltip: 'Start over',
    setupTooltip: 'Assessment settings',
    sectionMood: 'Mood',
    sectionMoodDesc: 'Depression, generalized anxiety, and emotional vitality screening',
    sectionStress: 'Stress',
    sectionStressDesc: 'Balance of chronic stress, anxiety, and exhaustion triad (DASS-21)',
    sectionTrauma: 'Trauma',
    sectionTraumaDesc: 'Screening for war experiences, traumatic stress, PTSD & Complex PTSD',
    categoryLabel: 'Category',
    allCategoriesTab: 'All Assessments',
    pcPtsdTitle: '⚡ PC-PTSD-5 (Primary Care Screen)',
    pcPtsdTime: '1–2 mins • 5 questions',
    pcPtsdBadge: '⚡ 5 questions (2 min)',
    pcPtsdDesc: 'Quick primary care screening tool (VA/DoD). Rapidly identifies active post-traumatic stress responses.',
    pcl5Title: '🔬 PCL-5 (PTSD Clinical Standard)',
    pcl5Time: '8–12 mins • 20 questions',
    pcl5Badge: '🔬 20 questions (10 min)',
    pcl5Desc: 'Gold standard DSM-5 PTSD checklist. Thoroughly measures 4 symptom clusters: intrusions, avoidance, mood/cognition alterations, and hyperarousal.',
    itqTitle: '🌐 ITQ (ICD-11: PTSD & Complex PTSD)',
    itqTime: '7–10 mins • 18 questions',
    itqBadge: '🌐 18 questions (8 min)',
    itqDesc: 'International Trauma Questionnaire (WHO ICD-11). Differentiates between classic PTSD and Complex PTSD (C-PTSD) from chronic trauma.',
    traumaTitle: 'Traumatic Stress & PTSD Screening',
    clusterIntrusion: 'Intrusions (Re-experiencing)',
    clusterAvoidance: 'Avoidance of Reminders',
    clusterMood: 'Negative Alterations in Cognitions & Mood',
    clusterArousal: 'Hyperarousal & Reactivity',
    itqPtsdScoreTitle: 'PTSD Core Symptoms (re-experiencing, avoidance, threat)',
    itqDsoScoreTitle: 'Disturbances in Self-Organization (DSO: affect, self-worth, relations)',
    cptsdNone: 'No clinical criteria met for PTSD or Complex PTSD',
    cptsdPtsd: 'Meets diagnostic criteria for PTSD (WHO ICD-11)',
    cptsdComplex: 'Meets diagnostic criteria for Complex PTSD (C-PTSD, WHO ICD-11)',
    upgradeToPclTitle: 'Would you like a deeper trauma assessment (PCL-5)?',
    upgradeToPclDesc: 'Your screening indicates notable traumatic stress responses. For a comprehensive analysis across all 4 symptom clusters, you can take the full clinical PCL-5 assessment (20 questions).',
    upgradeToPclBtn: '🔬 Take full PCL-5 assessment (20 questions)',
    positiveScreen: 'Positive Screen (Probable PTSD)',
    negativeScreen: 'Negative Screen',
    screenPositiveDesc: 'Score (≥ 3 points) indicates clinically significant signs of post-traumatic distress. Further evaluation (such as PCL-5) and specialist consultation are recommended.',
    screenNegativeDesc: 'Symptom count is below the clinical cutoff (3 points). No signs of acute post-traumatic distress detected.',
    cutoffThresholdLabel: 'Clinical cutoff (DSM-5: 33 points)',
    scoringCriteriaTitle: 'Scoring criteria',
    pcPtsdCutoffLabel: 'Screening cutoff: 3 of 5',
    pcPtsdThresholdNote: 'PC-PTSD-5 evaluates 5 core symptoms (maximum 5 points). Per DSM-5 validation, 3 affirmative answers serve as the clinical cutoff: a score of ≥ 3 indicates probable post-traumatic stress and suggests taking the comprehensive PCL-5 assessment (where maximum score is 80 and the clinical cutoff is 33 points).',
    pclCutoffLabel: 'Clinical cutoff (DSM-5: ≥ 33 of 80)',
    pclThresholdNote: 'In the full PCL-5 scale, a score of 33 or higher (out of 80) is the established DSM-5 benchmark indicating probable PTSD and advising professional consultation.',
    clustersBreakdownTitle: 'Symptom Breakdown by DSM-5 Clusters',
  },
  es: {
    title: 'MindCheck',
    subtitle: 'Evaluación psicoemocional confidencial sin estigmas ni registro de datos',
    selectLanguage: 'Seleccionar idioma',
    languageDesc: 'Elija su idioma preferido para la evaluación',
    continueBtn: 'Continuar',
    backBtn: 'Atrás',
    birthYearTitle: '¿Cuál es su año de nacimiento?',
    birthYearSubtitle: 'Se utiliza para adaptar el apoyo y las recomendaciones según su edad (100% anónimo)',
    birthYearPlaceholder: 'Seleccionar año...',
    youthBadge: 'Adaptado para adolescentes y jóvenes',
    selectModeTitle: 'Seleccione el formato',
    selectModeSubtitle: 'Elija entre una evaluación rápida o un estudio profundo integral',
    expressTitle: '⚡ Evaluación Exprés',
    expressTime: '3–5 minutos • 9 preguntas',
    expressDesc: 'Evaluación rápida de síntomas depresivos mediante la escala validada PHQ-9.',
    deepTitle: '🔬 Deep Research (Profundo)',
    deepTime: '8–10 minutos • 20 preguntas',
    deepDesc: 'Análisis integral de depresión (PHQ-9), ansiedad (GAD-7), somatización, sueño e impacto en la vida.',
    startBtn: 'Comenzar evaluación',
    questionOf: (c, t) => `Pregunta ${c} de ${t}`,
    anonymousBadge: '100% Anónimo: solo en su dispositivo',
    crisisHelpBtn: 'Ayuda urgente',
    crisisModalTitle: 'Tu vida importa',
    crisisModalSubtitle: 'No tienes que pasar por esto a solas',
    crisisModalDesc: 'Si sientes un dolor emocional abrumador o piensas en hacerte daño, hay apoyo gratuito y confidencial disponible ahora mismo.',
    crisisYouthTag: 'Para jóvenes',
    crisisCall: (p) => `Llamar (${p})`,
    crisisChat: 'Abrir chat de ayuda',
    crisisDismiss: 'Entendido, continuar evaluación',
    resultTitle: 'Resultados de la evaluación',
    resultProfile: 'Perfil psicoemocional',
    depTitle: 'Síntomas depresivos (PHQ-9)',
    anxTitle: 'Nivel de ansiedad (GAD-7)',
    points: 'puntos',
    disclaimer: 'Este informe es un cribado clínico para el autoconocimiento, no un diagnóstico médico.',
    crisisAlertTitle: 'Señal de apoyo importante',
    crisisAlertDesc: 'Sus respuestas indican pensamientos de malestar grave o autolesión. Hay ayuda compasiva disponible.',
    crisisAlertLink: 'Obtener apoyo de crisis confidencial y gratuito',
    crisisTraumaTag: 'Trauma / Estrés postraumático',
    traumaSupportTitle: 'Recursos de apoyo para trauma y TEPT',
    traumaSupportDesc: 'Su puntuación supera el umbral clínico e indica un impacto postraumático notable. La terapia especializada en trauma (EMDR, TCC) ayuda a procesar estas reacciones. Puede acceder a líneas de apoyo confidenciales y gratuitas.',
    traumaSupportBtn: 'Ver contactos de apoyo y crisis',
    insightsTitle: 'Factores que influyeron en su resultado',
    recommendationsTitle: 'Pasos recomendados',
    copyDoctorReport: 'Copiar informe para el médico',
    copied: '¡Copiado al portapapeles!',
    retakeBtn: 'Realizar la prueba de nuevo',
    footerText: 'MindCheck — Proyecto abierto de evaluación psicoemocional.',
    footerLocal: 'Todos los cálculos se realizan localmente en su navegador.',
    welcomeCta: 'Comenzar evaluación',
    configureBtn: 'Configurar parámetros',
    selectedFormat: 'Formato de prueba',
    selectedAge: 'Categoría de edad',
    notSpecified: 'No especificado (clic para elegir)',
    privacyTitle: 'Privacidad Zero-Data',
    privacyDesc: 'Sus respuestas nunca se envían a ningún servidor. Todo se calcula localmente.',
    clinicalTitle: 'Escalas clínicamente validadas',
    clinicalDesc: 'Protocolos clínicos estandarizados: PHQ-9 (depresión), GAD-7 (ansiedad), DASS-21 (estrés), PC-PTSD-5 / PCL-5 (DSM-5) e ITQ (TEPT y TEPT Complejo según la CIE-11 de la OMS).',
    upgradeToDeepTitle: '¿Desea un análisis más profundo? (Si dispone de energía)',
    upgradeToDeepDesc: 'Ha completado la evaluación exprés (PHQ-9). Si se siente con fuerzas y recursos emocionales, puede ampliarla a Deep Research (11 preguntas adicionales sobre ansiedad GAD-7, calidad del sueño y somatización). ¡Sus respuestas se conservan!',
    upgradeToDeepBtn: '✨ Continuar a Deep Research (+11 preguntas)',
    upgradeToDeepDecline: 'Conservar resultado actual',
    stepLanguage: '1. Idioma',
    stepAge: '2. Edad',
    stepMode: '3. Formato',
    onboardingStepOf: (c, t) => `Paso ${c} de ${t}`,
    testParameters: 'Parámetros de evaluación',
    changeAll: 'Cambiar todo',
    languageLabel: 'Idioma',
    yearsOldShort: 'años',
    yearsOldFull: 'años',
    autoAdvanceHint: 'Seleccione una opción para avanzar automáticamente',
    gaugeMin: 'Mínimo',
    gaugeMod: 'Moderado',
    gaugeSev: 'Grave',
    gaugeHigh: 'Marcado',
    doctorReportSubtext: 'Copie un resumen conciso de los síntomas para comentarlo con su médico',
    youthChatNote: 'Tendrá disponibles chats y líneas de ayuda adaptados para jóvenes.',
    adultChatNote: 'Recomendaciones y escalas adaptadas para público adulto.',
    birthYearRequiredWarning: '⚠️ Por favor, seleccione su año de nacimiento para continuar.',
    closeBtn: 'Cerrar',
    setupTitle: 'Configuración',
    birthYearLabel: 'Año de nacimiento',
    expressBadge: '⚡ 9 preguntas (5 min)',
    deepBadge: '🔬 20 preguntas (10 min)',
    dassBadge: '📊 21 preguntas (6 min)',
    dassTitle: '📊 DASS-21 (Balance de estrés)',
    dassTime: '5–7 minutos • 21 preguntas',
    dassDesc: 'Tríada validada integral (UNSW). Evalúa por separado los niveles de estrés crónico / agotamiento, ansiedad y depresión.',
    stressTitle: 'Nivel de estrés y agotamiento',
    stressDesc: 'Tensión crónica, irritabilidad, fatiga nerviosa y dificultad para relajarse.',
    continueAssessmentTag: 'Continuar evaluación',
    themeLight: 'Modo claro',
    themeDark: 'Modo oscuro',
    startOverTooltip: 'Volver al inicio',
    setupTooltip: 'Configuración de la prueba',
    sectionMood: 'Ánimo',
    sectionMoodDesc: 'Cribado de depresión, ansiedad generalizada y vitalidad emocional',
    sectionStress: 'Estrés',
    sectionStressDesc: 'Balance de sobrecarga crónica, tensión y fatiga nerviosa (DASS-21)',
    sectionTrauma: 'Trauma',
    sectionTraumaDesc: 'Evaluación de experiencias traumáticas, estrés de guerra y TEPT complejo',
    categoryLabel: 'Categoría',
    allCategoriesTab: 'Todas las pruebas',
    pcPtsdTitle: '⚡ PC-PTSD-5 (Cribado rápido)',
    pcPtsdTime: '1–2 minutos • 5 preguntas',
    pcPtsdBadge: '⚡ 5 preguntas (2 min)',
    pcPtsdDesc: 'Cribado rápido de atención primaria (VA/DoD). Identifica de forma inmediata la presencia de estrés postraumático.',
    pcl5Title: '🔬 PCL-5 (Estándar clínico TEPT)',
    pcl5Time: '8–12 minutos • 20 preguntas',
    pcl5Badge: '🔬 20 preguntas (10 min)',
    pcl5Desc: 'Estándar clínico del DSM-5. Evalúa en detalle los 4 grupos de síntomas: intrusiones, evitación, cambios negativos en cognición/ánimo e hiperactivación.',
    itqTitle: '🌐 ITQ (CIE-11: TEPT y TEPT Complejo)',
    itqTime: '7–10 minutos • 18 preguntas',
    itqBadge: '🌐 18 preguntas (8 min)',
    itqDesc: 'Cuestionario Internacional de Trauma (CIE-11 OMS). Distingue entre el TEPT clásico y el TEPT Complejo por trauma prolongado.',
    traumaTitle: 'Cribado de estrés traumático y TEPT',
    clusterIntrusion: 'Intrusiones (Reviviscencia)',
    clusterAvoidance: 'Evitación de recordatorios',
    clusterMood: 'Alteraciones cognitivas y del estado de ánimo',
    clusterArousal: 'Hiperactivación y alerta',
    itqPtsdScoreTitle: 'Síntomas principales de TEPT (recuerdos, evitación, amenaza)',
    itqDsoScoreTitle: 'Alteraciones de la autoorganización (DSO: afecto, autoestima, relaciones)',
    cptsdNone: 'No se cumplen criterios clínicos de TEPT ni TEPT Complejo',
    cptsdPtsd: 'Cumple con los criterios diagnósticos de TEPT (CIE-11 OMS)',
    cptsdComplex: 'Cumple con los criterios de TEPT Complejo (CIE-11 OMS)',
    upgradeToPclTitle: '¿Desea una evaluación más profunda (PCL-5)?',
    upgradeToPclDesc: 'Su cribado inicial indica signos de estrés postraumático. Para un desglose exhaustivo de los 4 grupos de síntomas, puede completar la escala clínica completa PCL-5 (20 preguntas).',
    upgradeToPclBtn: '🔬 Realizar evaluación completa PCL-5 (20 preguntas)',
    positiveScreen: 'Detección Positiva (Probable TEPT)',
    negativeScreen: 'Detección Negativa',
    screenPositiveDesc: 'El puntaje (≥ 3 puntos) indica signos clínicamente significativos de distrés postraumático. Se recomienda una evaluación más detallada (como PCL-5) y consulta con un especialista.',
    screenNegativeDesc: 'La cantidad de síntomas está por debajo del umbral clínico (3 puntos). No se detectaron signos de distrés postraumático agudo.',
    cutoffThresholdLabel: 'Umbral clínico (DSM-5: 33 puntos)',
    scoringCriteriaTitle: 'Criterio de interpretación',
    pcPtsdCutoffLabel: 'Umbral de detección: 3 de 5',
    pcPtsdThresholdNote: 'En el cribado PC-PTSD-5 se evalúan 5 síntomas (máximo 5 puntos). Según el DSM-5, el umbral clínico es de 3 respuestas afirmativas: una puntuación ≥ 3 indica probable distrés postraumático y sugiere realizar la escala completa PCL-5 (con máximo de 80 puntos y umbral clínico de 33 puntos).',
    pclCutoffLabel: 'Umbral clínico (DSM-5: ≥ 33 de 80)',
    pclThresholdNote: 'En la escala completa PCL-5, una puntuación total de 33 o superior (sobre 80) es el punto de corte estándar del DSM-5 que indica probable TEPT y aconseja evaluación especializada.',
    clustersBreakdownTitle: 'Distribución de síntomas por grupos del DSM-5',
  },
  pt: {
    title: 'MindCheck',
    subtitle: 'Rastreio psicoemocional confidencial sem estigmas ou recolha de dados',
    selectLanguage: 'Escolha o idioma',
    languageDesc: 'Selecione o idioma de sua preferência para a avaliação',
    continueBtn: 'Continuar',
    backBtn: 'Voltar',
    birthYearTitle: 'Qual é o seu ano de nascimento?',
    birthYearSubtitle: 'Usado para adaptar o suporte e as recomendações para a sua faixa etária (100% anónimo)',
    birthYearPlaceholder: 'Selecione o ano...',
    youthBadge: 'Adaptado para jovens e adolescentes',
    selectModeTitle: 'Escolha o formato',
    selectModeSubtitle: 'Escolha entre uma triagem rápida ou uma avaliação aprofundada',
    expressTitle: '⚡ Teste Expresso',
    expressTime: '3–5 minutos • 9 perguntas',
    expressDesc: 'Avaliação inicial rápida de sintomas depressivos com a escala validada PHQ-9.',
    deepTitle: '🔬 Deep Research (Aprofundado)',
    deepTime: '8–10 minutos • 20 perguntas',
    deepDesc: 'Análise aprofundada de depressão (PHQ-9), ansiedade (GAD-7), somatização, sono e impacto funcional.',
    startBtn: 'Iniciar avaliação',
    questionOf: (c, t) => `Pergunta ${c} de ${t}`,
    anonymousBadge: '100% Anónimo: apenas no dispositivo',
    crisisHelpBtn: 'Apoio Imediato',
    crisisModalTitle: 'A tua vida tem valor',
    crisisModalSubtitle: 'Não precisas de passar por isto sozinho(a)',
    crisisModalDesc: 'Se estás a sentir uma dor emocional insuportável ou pensamentos de autoflagelação, existe ajuda gratuita e confidencial disponível.',
    crisisYouthTag: 'Apoio Jovem',
    crisisCall: (p) => `Ligar (${p})`,
    crisisChat: 'Abrir chat de apoio',
    crisisDismiss: 'Compreendo, continuar avaliação',
    resultTitle: 'Resultados da Avaliação',
    resultProfile: 'Perfil Psicoemocional',
    depTitle: 'Sintomas Depressivos (PHQ-9)',
    anxTitle: 'Nível de Ansiedade (GAD-7)',
    points: 'pontos',
    disclaimer: 'Este relatório é um rastreio clínico de autoconsciência, não um diagnóstico médico.',
    crisisAlertTitle: 'Sinal de apoio importante',
    crisisAlertDesc: 'As suas respostas indicam sofrimento agudo ou pensamentos de autolesão.',
    crisisAlertLink: 'Obter apoio confidencial e gratuito',
    crisisTraumaTag: 'Trauma / Stress pós-traumático',
    traumaSupportTitle: 'Recursos de apoio para trauma e PTSR',
    traumaSupportDesc: 'A sua pontuação ultrapassa o limiar clínico, indicando um impacto pós-traumático significativo. A terapia especializada em trauma (EMDR, TCC) é eficaz no processamento destes sintomas. Pode aceder a linhas de apoio gratuitas e confidenciais.',
    traumaSupportBtn: 'Ver contactos de apoio e crise',
    insightsTitle: 'O que influenciou os seus resultados',
    recommendationsTitle: 'Passos recomendados',
    copyDoctorReport: 'Copiar relatório para o médico',
    copied: 'Copiado para a área de transferência!',
    retakeBtn: 'Repetir avaliação',
    footerText: 'MindCheck — Projeto aberto de rastreio psicoemocional.',
    footerLocal: 'Todos os cálculos são executados localmente no seu navegador.',
    welcomeCta: 'Iniciar avaliação',
    configureBtn: 'Configurar parâmetros',
    selectedFormat: 'Formato da avaliação',
    selectedAge: 'Faixa etária',
    notSpecified: 'Não especificado (clique para escolher)',
    privacyTitle: 'Privacidade Zero-Data',
    privacyDesc: 'As suas respostas nunca são enviadas para nenhum servidor. Tudo ocorre localmente.',
    clinicalTitle: 'Escalas clinicamente validadas',
    clinicalDesc: 'Protocolos clínicos estandardizados: PHQ-9 (depressão), GAD-7 (ansiedade), DASS-21 (stress), PC-PTSD-5 / PCL-5 (DSM-5) e ITQ (PTSR e PTSR Complexo sob a CID-11 da OMS).',
    upgradeToDeepTitle: 'Deseja uma análise mais profunda? (Se tiver energia)',
    upgradeToDeepDesc: 'Concluiu a avaliação expressa (PHQ-9). Se sentir que tem energia e capacidade emocional no momento, pode expandir para o Deep Research (mais 11 perguntas sobre ansiedade GAD-7, sono e impacto no quotidiano). As respostas anteriores são mantidas!',
    upgradeToDeepBtn: '✨ Continuar para Deep Research (+11 perguntas)',
    upgradeToDeepDecline: 'Manter resultado atual',
    stepLanguage: '1. Idioma',
    stepAge: '2. Idade',
    stepMode: '3. Formato',
    onboardingStepOf: (c, t) => `Passo ${c} de ${t}`,
    testParameters: 'Parâmetros de avaliação',
    changeAll: 'Alterar tudo',
    languageLabel: 'Idioma',
    yearsOldShort: 'anos',
    yearsOldFull: 'anos',
    autoAdvanceHint: 'Selecione uma opção para avançar automaticamente',
    gaugeMin: 'Mínimo',
    gaugeMod: 'Moderado',
    gaugeSev: 'Grave',
    gaugeHigh: 'Marcado',
    doctorReportSubtext: 'Copie um resumo conciso dos sintomas para partilhar com o seu médico',
    youthChatNote: 'Estarão disponíveis chats e linhas de apoio adaptados para jovens.',
    adultChatNote: 'Recomendações e escalas adaptadas para público adulto.',
    birthYearRequiredWarning: '⚠️ Por favor, selecione o seu ano de nascimento para continuar.',
    closeBtn: 'Fechar',
    setupTitle: 'Configurações',
    birthYearLabel: 'Ano de nascimento',
    expressBadge: '⚡ 9 perguntas (5 min)',
    deepBadge: '🔬 20 perguntas (10 min)',
    dassBadge: '📊 21 perguntas (6 min)',
    dassTitle: '📊 DASS-21 (Balanço de stress)',
    dassTime: '5–7 minutos • 21 perguntas',
    dassDesc: 'Tríade validada abrangente (UNSW). Avalia separadamente os níveis de stress crónico / esgotamento, ansiedade e depressão.',
    stressTitle: 'Nível de stress e esgotamento',
    stressDesc: 'Tensão crónica, irritabilidade, fadiga nervosa e dificuldade em relaxar.',
    continueAssessmentTag: 'Continuar avaliação',
    themeLight: 'Modo claro',
    themeDark: 'Modo escuro',
    startOverTooltip: 'Voltar ao início',
    setupTooltip: 'Definições da avaliação',
    sectionMood: 'Humor',
    sectionMoodDesc: 'Rastreio de depressão, ansiedade generalizada e vitalidade emocional',
    sectionStress: 'Stress',
    sectionStressDesc: 'Equilíbrio de sobrecarga crónica, ansiedade e exaustão nervosa (DASS-21)',
    sectionTrauma: 'Trauma',
    sectionTraumaDesc: 'Avaliação de experiências traumáticas, stress de guerra e PTSR complexo',
    categoryLabel: 'Categoria',
    allCategoriesTab: 'Todas as avaliações',
    pcPtsdTitle: '⚡ PC-PTSD-5 (Rastreio rápido)',
    pcPtsdTime: '1–2 minutos • 5 perguntas',
    pcPtsdBadge: '⚡ 5 perguntas (2 min)',
    pcPtsdDesc: 'Rastreio rápido de cuidados primários (VA/DoD). Identifica de forma expedita a presença de stress pós-traumático.',
    pcl5Title: '🔬 PCL-5 (Padrão clínico PTSR)',
    pcl5Time: '8–12 minutos • 20 perguntas',
    pcl5Badge: '🔬 20 perguntas (10 min)',
    pcl5Desc: 'Padrão clínico DSM-5. Avalia minuciosamente os 4 grupos de sintomas: intrusões, evitamento, alterações cognitivas/humor e hiperativação.',
    itqTitle: '🌐 ITQ (CID-11: PTSR e PTSR Complexo)',
    itqTime: '7–10 minutos • 18 perguntas',
    itqBadge: '🌐 18 perguntas (8 min)',
    itqDesc: 'Questionário Internacional de Trauma (CID-11 OMS). Distingue entre o PTSR clássico e o PTSR Complexo por trauma crónico.',
    traumaTitle: 'Rastreio de stress traumático e PTSR',
    clusterIntrusion: 'Intrusões (Revivência)',
    clusterAvoidance: 'Evitamento de gatilhos',
    clusterMood: 'Alterações cognitivas e do humor',
    clusterArousal: 'Hiperativação e reatividade',
    itqPtsdScoreTitle: 'Sintomas principais de PTSR (memórias, evitamento, ameaça)',
    itqDsoScoreTitle: 'Perturbações da auto-organização (DSO: afeto, autoestima, relações)',
    cptsdNone: 'Não foram preenchidos critérios para PTSR nem PTSR Complexo',
    cptsdPtsd: 'Cumpre critérios de diagnóstico de PTSR (CID-11 OMS)',
    cptsdComplex: 'Cumpre critérios de diagnóstico de PTSR Complexo (CID-11 OMS)',
    upgradeToPclTitle: 'Deseja uma avaliação mais aprofundada (PCL-5)?',
    upgradeToPclDesc: 'O seu rastreio inicial indica sinais de stress pós-traumático. Para uma análise detalhada dos 4 grupos de sintomas, pode completar a escala clínica PCL-5 (20 perguntas).',
    upgradeToPclBtn: '🔬 Realizar avaliação completa PCL-5 (20 perguntas)',
    positiveScreen: 'Triagem Positiva (Provável TEPT)',
    negativeScreen: 'Triagem Negativa',
    screenPositiveDesc: 'A pontuação (≥ 3 pontos) indica sinais clinicamente significativos de estresse pós-traumático. Recomenda-se avaliação detalhada (como PCL-5) e consulta com especialista.',
    screenNegativeDesc: 'A contagem de sintomas está abaixo do limiar clínico (3 pontos). Não foram detectados sinais de estresse pós-traumático agudo.',
    cutoffThresholdLabel: 'Limiar clínico (DSM-5: 33 pontos)',
    scoringCriteriaTitle: 'Critério de interpretação',
    pcPtsdCutoffLabel: 'Limiar de rastreio: 3 de 5',
    pcPtsdThresholdNote: 'No rastreio PC-PTSD-5 avaliam-se 5 sintomas (máximo de 5 pontos). Conforme o DSM-5, o limiar é de 3 respostas afirmativas: um resultado ≥ 3 indica provável stress pós-traumático e aconselha a escala clínica completa PCL-5 (com máximo de 80 pontos e limiar clínico de 33 pontos).',
    pclCutoffLabel: 'Limiar clínico (DSM-5: ≥ 33 de 80)',
    pclThresholdNote: 'Na escala completa PCL-5, uma pontuação de 33 ou mais (em 80 possíveis) é a referência clínica do DSM-5 que indica provável PTSR e necessidade de acompanhamento profissional.',
    clustersBreakdownTitle: 'Distribuição de sintomas por grupos do DSM-5',
  }
};