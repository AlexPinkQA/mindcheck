import { Question } from '../types/assessment';
import { Language } from './translations';

interface LocalizedQuestionData {
  id: string;
  category: 'depression' | 'anxiety' | 'sleep' | 'context' | 'crisis';
  isCrisisTrigger?: boolean;
  text: Record<Language, string>;
  subtext?: Record<Language, string>;
  customOptions?: Record<Language, { value: number; label: string }[]>;
}

const standardFrequencyOptions: Record<Language, { value: number; label: string }[]> = {
  uk: [
    { value: 0, label: 'Абсолютно ні' },
    { value: 1, label: 'Кілька днів' },
    { value: 2, label: 'Більше половини днів' },
    { value: 3, label: 'Майже щодня' },
  ],
  en: [
    { value: 0, label: 'Not at all' },
    { value: 1, label: 'Several days' },
    { value: 2, label: 'More than half the days' },
    { value: 3, label: 'Nearly every day' },
  ],
  es: [
    { value: 0, label: 'Para nada' },
    { value: 1, label: 'Varios días' },
    { value: 2, label: 'Más de la mitad de los días' },
    { value: 3, label: 'Casi todos los días' },
  ],
  pt: [
    { value: 0, label: 'De modo nenhum' },
    { value: 1, label: 'Vários dias' },
    { value: 2, label: 'Mais de metade dos dias' },
    { value: 3, label: 'Quase todos os dias' },
  ],
};

const rawQuestions: LocalizedQuestionData[] = [
  // --- PHQ-9 (Express & Deep) ---
  {
    id: 'phq_1',
    category: 'depression',
    text: {
      uk: 'Малий інтерес або задоволення від занять, які раніше приносили радість?',
      en: 'Little interest or pleasure in doing things you usually enjoy?',
      es: '¿Poco interés o placer en hacer cosas que solía disfrutar?',
      pt: 'Pouco interesse ou prazer em fazer coisas que costumava gostar?',
    },
    subtext: {
      uk: 'Протягом останніх 2 тижнів',
      en: 'Over the last 2 weeks',
      es: 'Durante las últimas 2 semanas',
      pt: 'Nas últimas 2 semanas',
    },
  },
  {
    id: 'phq_2',
    category: 'depression',
    text: {
      uk: 'Відчуття пригніченості, депресії, порожнечі або безнадії?',
      en: 'Feeling down, depressed, empty, or hopeless?',
      es: '¿Sentirse desanimado, deprimido, vacío o sin esperanza?',
      pt: 'Sentir-se em baixo, deprimido, vazio ou sem esperança?',
    },
    subtext: {
      uk: 'Протягом останніх 2 тижнів',
      en: 'Over the last 2 weeks',
      es: 'Durante las últimas 2 semanas',
      pt: 'Nas últimas 2 semanas',
    },
  },
  {
    id: 'phq_3',
    category: 'sleep',
    text: {
      uk: 'Труднощі із засинанням, переривчастий сон або занадто тривалий сон?',
      en: 'Trouble falling or staying asleep, or sleeping too much?',
      es: '¿Dificultad para conciliar o mantener el sueño, o dormir demasiado?',
      pt: 'Dificuldade em adormecer, sono agitado ou dormir em excesso?',
    },
    subtext: {
      uk: 'Протягом останніх 2 тижнів',
      en: 'Over the last 2 weeks',
      es: 'Durante las últimas 2 semanas',
      pt: 'Nas últimas 2 semanas',
    },
  },
  {
    id: 'phq_4',
    category: 'depression',
    text: {
      uk: 'Відчуття втоми, виснаження або відсутності фізичної енергії?',
      en: 'Feeling tired, exhausted, or having little energy?',
      es: '¿Sentirse cansado, agotado o con poca energía?',
      pt: 'Sentir-se cansado, esgotado ou com pouca energia?',
    },
    subtext: {
      uk: 'Протягом останніх 2 тижнів',
      en: 'Over the last 2 weeks',
      es: 'Durante las últimas 2 semanas',
      pt: 'Nas últimas 2 semanas',
    },
  },
  {
    id: 'phq_5',
    category: 'depression',
    text: {
      uk: 'Поганий апетит або, навпаки, неконтрольоване переїдання?',
      en: 'Poor appetite or overeating?',
      es: '¿Falta de apetito o comer en exceso?',
      pt: 'Falta de apetite ou comer em excesso?',
    },
    subtext: {
      uk: 'Протягом останніх 2 тижнів',
      en: 'Over the last 2 weeks',
      es: 'Durante las últimas 2 semanas',
      pt: 'Nas últimas 2 semanas',
    },
  },
  {
    id: 'phq_6',
    category: 'depression',
    text: {
      uk: 'Погане ставлення до себе — відчуття власної невдачі або почуття провини?',
      en: 'Feeling bad about yourself — or that you are a failure or let yourself/family down?',
      es: '¿Sentirse mal consigo mismo — o que es un fracaso o ha decepcionado a su familia?',
      pt: 'Sentir-se mal consigo mesmo — ou que é um fracasso e desiludiu a família?',
    },
    subtext: {
      uk: 'Протягом останніх 2 тижнів',
      en: 'Over the last 2 weeks',
      es: 'Durante las últimas 2 semanas',
      pt: 'Nas últimas 2 semanas',
    },
  },
  {
    id: 'phq_7',
    category: 'depression',
    text: {
      uk: 'Труднощі з концентрацією (читання, робота, навчання, перегляд фільмів)?',
      en: 'Trouble concentrating on things, such as reading, studying, or watching videos?',
      es: '¿Dificultad para concentrarse en cosas como leer, estudiar o trabajar?',
      pt: 'Dificuldade de concentração em atividades como ler, estudar ou trabalhar?',
    },
    subtext: {
      uk: 'Протягом останніх 2 тижнів',
      en: 'Over the last 2 weeks',
      es: 'Durante las últimas 2 semanas',
      pt: 'Nas últimas 2 semanas',
    },
  },
  {
    id: 'phq_8',
    category: 'depression',
    text: {
      uk: 'Уповільненість рухів або мови, або навпаки — неспокій, метушливість?',
      en: 'Moving or speaking so slowly that others noticed, or being unusually fidgety/restless?',
      es: '¿Moverse o hablar tan despacio que otros lo notan, o estar inquieto y agitado?',
      pt: 'Mover-se ou falar tão devagar que os outros notam, ou estar inquieto e agitado?',
    },
    subtext: {
      uk: 'Протягом останніх 2 тижнів',
      en: 'Over the last 2 weeks',
      es: 'Durante las últimas 2 semanas',
      pt: 'Nas últimas 2 semanas',
    },
  },
  {
    id: 'phq_9',
    category: 'crisis',
    text: {
      uk: 'Думки про те, що краще було б померти, або бажання заподіяти собі шкоду?',
      en: 'Thoughts that you would be better off dead, or of hurting yourself in some way?',
      es: '¿Pensamientos de que estaría mejor muerto, o de hacerse daño de alguna manera?',
      pt: 'Pensamentos de que seria melhor estar morto(a), ou de magoar-se de alguma forma?',
    },
    subtext: {
      uk: 'Відповідайте щиро — ваші дані залишаються лише на вашому пристрої',
      en: 'Please answer honestly — your data remains strictly on your device',
      es: 'Responda con sinceridad — sus datos se quedan únicamente en su dispositivo',
      pt: 'Responda com sinceridade — os seus dados ficam estritamente no seu dispositivo',
    },
    isCrisisTrigger: true,
  },

  // --- GAD-7 Anxiety (Deep Assessment only) ---
  {
    id: 'gad_1',
    category: 'anxiety',
    text: {
      uk: 'Відчуття нервозності, тривоги або постійного очікування небезпеки?',
      en: 'Feeling nervous, anxious, or on edge?',
      es: '¿Sentirse nervioso, ansioso o al límite?',
      pt: 'Sentir-se nervoso, ansioso ou no limite?',
    },
    subtext: {
      uk: 'Протягом останніх 2 тижнів',
      en: 'Over the last 2 weeks',
      es: 'Durante las últimas 2 semanas',
      pt: 'Nas últimas 2 semanas',
    },
  },
  {
    id: 'gad_2',
    category: 'anxiety',
    text: {
      uk: 'Нездатність зупинити або контролювати власне хвилювання?',
      en: 'Not being able to stop or control worrying?',
      es: '¿No ser capaz de detener o controlar la preocupación?',
      pt: 'Não ser capaz de parar ou controlar as preocupações?',
    },
    subtext: {
      uk: 'Протягом останніх 2 тижнів',
      en: 'Over the last 2 weeks',
      es: 'Durante las últimas 2 semanas',
      pt: 'Nas últimas 2 semanas',
    },
  },
  {
    id: 'gad_3',
    category: 'anxiety',
    text: {
      uk: 'Надмірне занепокоєння з приводу різних повсякденних речей?',
      en: 'Worrying too much about different things?',
      es: '¿Preocuparse demasiado por diferentes cosas?',
      pt: 'Preocupar-se excessivamente com coisas diversas?',
    },
    subtext: {
      uk: 'Протягом останніх 2 тижнів',
      en: 'Over the last 2 weeks',
      es: 'Durante las últimas 2 semanas',
      pt: 'Nas últimas 2 semanas',
    },
  },
  {
    id: 'gad_4',
    category: 'anxiety',
    text: {
      uk: 'Труднощі з розслабленням, постійне відчуття внутрішньої пружини?',
      en: 'Trouble relaxing, feeling physically tense?',
      es: '¿Dificultad para relajarse, tensión física constante?',
      pt: 'Dificuldade em relaxar, tensão física constante?',
    },
    subtext: {
      uk: 'Протягом останніх 2 тижнів',
      en: 'Over the last 2 weeks',
      es: 'Durante las últimas 2 semanas',
      pt: 'Nas últimas 2 semanas',
    },
  },
  {
    id: 'gad_5',
    category: 'anxiety',
    text: {
      uk: 'Настільки сильний внутрішній неспокій, що важко всидіти на місці?',
      en: 'Being so restless that it is hard to sit still?',
      es: '¿Estar tan inquieto que le cuesta quedarse quieto?',
      pt: 'Estar tão inquieto que é difícil ficar sentado?',
    },
    subtext: {
      uk: 'Протягом останніх 2 тижнів',
      en: 'Over the last 2 weeks',
      es: 'Durante las últimas 2 semanas',
      pt: 'Nas últimas 2 semanas',
    },
  },
  {
    id: 'gad_6',
    category: 'anxiety',
    text: {
      uk: 'Швидка дратівливість, спалахи злості або нетерплячість?',
      en: 'Becoming easily annoyed or irritable?',
      es: '¿Irritarse o enfadarse con facilidad?',
      pt: 'Irritar-se facilmente ou ficar impaciente?',
    },
    subtext: {
      uk: 'Протягом останніх 2 тижнів',
      en: 'Over the last 2 weeks',
      es: 'Durante las últimas 2 semanas',
      pt: 'Nas últimas 2 semanas',
    },
  },
  {
    id: 'gad_7',
    category: 'anxiety',
    text: {
      uk: 'Відчуття паніки або страху, ніби зараз станеться щось жахливе?',
      en: 'Feeling afraid, as if something awful might happen?',
      es: '¿Sentir miedo, como si algo terrible fuera a suceder?',
      pt: 'Sentir medo, como se algo terrível estivesse prestes a acontecer?',
    },
    subtext: {
      uk: 'Протягом останніх 2 тижнів',
      en: 'Over the last 2 weeks',
      es: 'Durante las últimas 2 semanas',
      pt: 'Nas últimas 2 semanas',
    },
  },

  // --- Somatic & Context (Deep Assessment only) ---
  {
    id: 'sleep_quality',
    category: 'sleep',
    text: {
      uk: 'Чи відчуваєте ви себе відпочилими після пробудження вранці?',
      en: 'Do you feel refreshed and restored after waking up?',
      es: '¿Se siente descansado y con energía al despertar por la mañana?',
      pt: 'Sente-se revigorado(a) e com energia ao acordar de manhã?',
    },
    customOptions: {
      uk: [
        { value: 0, label: 'Так, зазвичай відновлюю сили' },
        { value: 1, label: 'Іноді відчуваю ранкову втому' },
        { value: 2, label: 'Рідко відчуваю бадьорість' },
        { value: 3, label: 'Майже ніколи, прокидаюся розбитими' },
      ],
      en: [
        { value: 0, label: 'Yes, usually well-rested' },
        { value: 1, label: 'Occasionally tired in the morning' },
        { value: 2, label: 'Rarely feel rested' },
        { value: 3, label: 'Almost never, wake up exhausted' },
      ],
      es: [
        { value: 0, label: 'Sí, normalmente descansado' },
        { value: 1, label: 'A veces siento cansancio matutino' },
        { value: 2, label: 'Rara vez me siento con energía' },
        { value: 3, label: 'Casi nunca, me despierto agotado' },
      ],
      pt: [
        { value: 0, label: 'Sim, normalmente descansado(a)' },
        { value: 1, label: 'Às vezes sinto cansaço matinal' },
        { value: 2, label: 'Raramente me sinto com energia' },
        { value: 3, label: 'Quase nunca, acordo exausto(a)' },
      ],
    },
  },
  {
    id: 'social_withdrawal',
    category: 'context',
    text: {
      uk: 'Чи помічаєте ви бажання уникати спілкування та ізолюватися від близьких?',
      en: 'Do you find yourself withdrawing socially or avoiding interactions with friends/family?',
      es: '¿Nota deseos de aislarse y evitar el contacto con amigos y familiares?',
      pt: 'Sente vontade de se isolar e evitar o contacto com amigos e familiares?',
    },
    customOptions: {
      uk: [
        { value: 0, label: 'Ні, спілкуюся у звичному режимі' },
        { value: 1, label: 'Іноді відмовляюся від зустрічей' },
        { value: 2, label: 'Помітно обмежив(ла) контакт з оточенням' },
        { value: 3, label: 'Повне усамітнення, важко вийти на звʼязок' },
      ],
      en: [
        { value: 0, label: 'No, interacting normally' },
        { value: 1, label: 'Occasionally decline social plans' },
        { value: 2, label: 'Noticeably withdrawn from others' },
        { value: 3, label: 'Almost completely isolated' },
      ],
      es: [
        { value: 0, label: 'No, me relaciono con normalidad' },
        { value: 1, label: 'A veces evito planes sociales' },
        { value: 2, label: 'Bastante distanciado de los demás' },
        { value: 3, label: 'Completamente aislado' },
      ],
      pt: [
        { value: 0, label: 'Não, interajo normalmente' },
        { value: 1, label: 'Às vezes evito planos sociais' },
        { value: 2, label: 'Bastante afastado(a) dos outros' },
        { value: 3, label: 'Completamente isolado(a)' },
      ],
    },
  },
  {
    id: 'context_duration',
    category: 'context',
    text: {
      uk: 'Як довго в цілому триває цей стан або його виражене погіршення?',
      en: 'How long have these feelings or difficulties been persisting?',
      es: '¿Cuánto tiempo llevan presentes estas dificultades o estado emocional?',
      pt: 'Há quanto tempo persistem estas dificuldades ou este estado emocional?',
    },
    customOptions: {
      uk: [
        { value: 0, label: 'Менше 2 тижнів (нещодавно)' },
        { value: 1, label: 'Від 2 тижнів до 1 місяця' },
        { value: 2, label: 'Від 1 до 6 місяців' },
        { value: 3, label: 'Понад пів року або хронічно' },
      ],
      en: [
        { value: 0, label: 'Less than 2 weeks (recent)' },
        { value: 1, label: 'Between 2 weeks and 1 month' },
        { value: 2, label: 'Between 1 and 6 months' },
        { value: 3, label: 'More than 6 months or recurring for years' },
      ],
      es: [
        { value: 0, label: 'Menos de 2 semanas (reciente)' },
        { value: 1, label: 'Entre 2 semanas y 1 mes' },
        { value: 2, label: 'Entre 1 y 6 meses' },
        { value: 3, label: 'Más de 6 meses o crónico' },
      ],
      pt: [
        { value: 0, label: 'Menos de 2 semanas (recente)' },
        { value: 1, label: 'Entre 2 semanas e 1 mês' },
        { value: 2, label: 'Entre 1 e 6 meses' },
        { value: 3, label: 'Mais de 6 meses ou crónico' },
      ],
    },
  },
  {
    id: 'context_impact',
    category: 'context',
    text: {
      uk: 'Наскільки ці симптоми заважають вашій роботі, навчанню чи домашнім справам?',
      en: 'How difficult have these issues made it for you to work, study, or manage daily life?',
      es: '¿Cuánto interfieren estos síntomas en su trabajo, estudios o vida cotidiana?',
      pt: 'Quanto é que estes sintomas interferem com o seu trabalho, estudos ou vida diária?',
    },
    customOptions: {
      uk: [
        { value: 0, label: 'Зовсім не заважають' },
        { value: 1, label: 'Дещо ускладнюють повсякденні справи' },
        { value: 2, label: 'Суттєво заважають продуктивності' },
        { value: 3, label: 'Вкрай ускладнюють нормальне функціонування' },
      ],
      en: [
        { value: 0, label: 'Not difficult at all' },
        { value: 1, label: 'Somewhat difficult' },
        { value: 2, label: 'Very difficult' },
        { value: 3, label: 'Extremely difficult to function' },
      ],
      es: [
        { value: 0, label: 'Nada difícil' },
        { value: 1, label: 'Algo difícil' },
        { value: 2, label: 'Muy difícil' },
        { value: 3, label: 'Extremadamente difícil funcionar' },
      ],
      pt: [
        { value: 0, label: 'Nada difícil' },
        { value: 1, label: 'Um pouco difícil' },
        { value: 2, label: 'Muito difícil' },
        { value: 3, label: 'Extremamente difícil de funcionar' },
      ],
    },
  },
];

export function getQuestions(mode: 'express' | 'deep', lang: Language = 'uk'): Question[] {
  const selected = mode === 'express'
    ? rawQuestions.filter(q => q.id.startsWith('phq_'))
    : rawQuestions;

  return selected.map(q => ({
    id: q.id,
    category: q.category,
    isCrisisTrigger: q.isCrisisTrigger,
    text: q.text[lang] || q.text['en'],
    subtext: q.subtext ? (q.subtext[lang] || q.subtext['en']) : undefined,
    options: q.customOptions
      ? (q.customOptions[lang] || q.customOptions['en'])
      : (standardFrequencyOptions[lang] || standardFrequencyOptions['en']),
  }));
}
