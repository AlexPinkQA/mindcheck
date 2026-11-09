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
  insightsTitle: string;
  recommendationsTitle: string;
  copyDoctorReport: string;
  copied: string;
  retakeBtn: string;
  footerText: string;
  footerLocal: string;
}

export const translations: Record<Language, TranslationStrings> = {
  uk: {
    title: 'MindCheck',
    subtitle: 'Психоемоційний скринінг без страху, ярликів та передачі даних',
    selectLanguage: 'Оберіть мову',
    languageDesc: 'Виберіть мову для проходження оцінювання',
    continueBtn: 'Продовжити',
    backBtn: 'Назад',
    birthYearTitle: 'Вкажіть ваш рік народження',
    birthYearSubtitle: 'Це потрібно для адаптації рекомендацій та кризової підтримки під вашу вікову групу (100% анонімно)',
    birthYearPlaceholder: 'Оберіть рік...',
    youthBadge: 'Програма адаптована для підлітків та молоді',
    selectModeTitle: 'Оберіть формат проходження',
    selectModeSubtitle: 'Ви можете обрати швидкий експрес-скринінг або комплексне поглиблене дослідження',
    expressTitle: '⚡ Експрес-тест',
    expressTime: '3–5 хвилин • 9 питань',
    expressDesc: 'Швидка первинна оцінка рівня депресивних симптомів за валідованою міжнародною шкалою PHQ-9.',
    deepTitle: '🔬 Deep Research (Поглиблений)',
    deepTime: '10–12 хвилин • 20 питань',
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
    disclaimer: 'Цей звіт є клінічним скринінгом для самоусвідомлення, а не медичним діагнозом. Він допоможе вам зрозуміти свій стан і сформулювати симптоми для бесіди зі спеціалістом.',
    crisisAlertTitle: 'Важливий сигнал підтримки',
    crisisAlertDesc: 'У ваших відповідях зафіксовано думки про важкість життя або самопошкодження. Ви не мусите нести цей тягар самотужки.',
    crisisAlertLink: 'Отримати безкоштовну анонімну підтримку (лінії довіри / чати)',
    insightsTitle: 'Що вплинуло на ваші показники',
    recommendationsTitle: 'Рекомендовані кроки підтримки',
    copyDoctorReport: 'Скопіювати звіт для лікаря',
    copied: 'Скопійовано в буфер!',
    retakeBtn: 'Пройти оцінювання знову',
    footerText: 'MindCheck — Некомерційний відкритий проєкт психоемоційного скринінгу.',
    footerLocal: 'Усі обчислення виконуються локально у вашому браузері.',
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
    deepTime: '10–12 mins • 20 questions',
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
    insightsTitle: 'Factors influencing your score',
    recommendationsTitle: 'Recommended Next Steps',
    copyDoctorReport: 'Copy Summary for Doctor',
    copied: 'Copied to clipboard!',
    retakeBtn: 'Retake Assessment',
    footerText: 'MindCheck — Open confidential mental wellness screening.',
    footerLocal: 'All calculations are performed locally inside your browser.',
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
    deepTime: '10–12 minutos • 20 preguntas',
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
    insightsTitle: 'Factores que influyeron en su resultado',
    recommendationsTitle: 'Pasos recomendados',
    copyDoctorReport: 'Copiar informe para el médico',
    copied: '¡Copiado al portapapeles!',
    retakeBtn: 'Realizar la prueba de nuevo',
    footerText: 'MindCheck — Proyecto abierto de evaluación psicoemocional.',
    footerLocal: 'Todos los cálculos se realizan localmente en su navegador.',
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
    deepTime: '10–12 minutos • 20 perguntas',
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
    insightsTitle: 'O que influenciou os seus resultados',
    recommendationsTitle: 'Passos recomendados',
    copyDoctorReport: 'Copiar relatório para o médico',
    copied: 'Copiado para a área de transferência!',
    retakeBtn: 'Repetir avaliação',
    footerText: 'MindCheck — Projeto aberto de rastreio psicoemocional.',
    footerLocal: 'Todos os cálculos são executados localmente no seu navegador.',
  }
};
