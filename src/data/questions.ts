import { Question, AssessmentMode } from '../types/assessment';
import { Language } from './translations';

interface LocalizedQuestionData {
  id: string;
  category: 'depression' | 'anxiety' | 'stress' | 'trauma' | 'sleep' | 'context' | 'crisis';
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

const dassFrequencyOptions: Record<Language, { value: number; label: string }[]> = {
  uk: [
    { value: 0, label: 'Зовсім не стосувалося мене' },
    { value: 1, label: 'Стосувалося певною мірою / іноді' },
    { value: 2, label: 'Стосувалося значною мірою / часто' },
    { value: 3, label: 'Стосувалося дуже сильно / майже постійно' },
  ],
  en: [
    { value: 0, label: 'Did not apply to me at all' },
    { value: 1, label: 'Applied to me to some degree / sometimes' },
    { value: 2, label: 'Applied to me considerably / a good part of time' },
    { value: 3, label: 'Applied to me very much / most of the time' },
  ],
  es: [
    { value: 0, label: 'No se aplicó a mí en absoluto' },
    { value: 1, label: 'Se aplicó a mí en algún grado / a veces' },
    { value: 2, label: 'Se aplicó a mí en grado considerable / con frecuencia' },
    { value: 3, label: 'Se aplicó a mí mucho / la mayor parte del tiempo' },
  ],
  pt: [
    { value: 0, label: 'Não se aplicou a mim de todo' },
    { value: 1, label: 'Aplicou-se a mim em algum grau / às vezes' },
    { value: 2, label: 'Aplicou-se a mim em grau considerável / frequentemente' },
    { value: 3, label: 'Aplicou-se a mim muito / a maior parte do tempo' },
  ],
};

const yesNoOptions: Record<Language, { value: number; label: string }[]> = {
  uk: [
    { value: 0, label: 'Ні' },
    { value: 1, label: 'Так' },
  ],
  en: [
    { value: 0, label: 'No' },
    { value: 1, label: 'Yes' },
  ],
  es: [
    { value: 0, label: 'No' },
    { value: 1, label: 'Sí' },
  ],
  pt: [
    { value: 0, label: 'Não' },
    { value: 1, label: 'Sim' },
  ],
};

const pclLikertOptions: Record<Language, { value: number; label: string }[]> = {
  uk: [
    { value: 0, label: 'Зовсім ні' },
    { value: 1, label: 'Трохи' },
    { value: 2, label: 'Помірно' },
    { value: 3, label: 'Сильно' },
    { value: 4, label: 'Надзвичайно' },
  ],
  en: [
    { value: 0, label: 'Not at all' },
    { value: 1, label: 'A little bit' },
    { value: 2, label: 'Moderately' },
    { value: 3, label: 'Quite a bit' },
    { value: 4, label: 'Extremely' },
  ],
  es: [
    { value: 0, label: 'Para nada' },
    { value: 1, label: 'Un poco' },
    { value: 2, label: 'Moderadamente' },
    { value: 3, label: 'Bastante' },
    { value: 4, label: 'Extremadamente' },
  ],
  pt: [
    { value: 0, label: 'De modo nenhum' },
    { value: 1, label: 'Um pouco' },
    { value: 2, label: 'Moderadamente' },
    { value: 3, label: 'Bastante' },
    { value: 4, label: 'Extremamente' },
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

const dassSubtext: Record<Language, string> = {
  uk: 'Протягом останнього тижня',
  en: 'Over the past week',
  es: 'Durante la última semana',
  pt: 'Durante a última semana',
};

const rawDassQuestions: LocalizedQuestionData[] = [
  // 1 (Stress)
  {
    id: 'dass_1',
    category: 'stress',
    text: {
      uk: 'Мені було важко заспокоїтися / розслабитися після напруги',
      en: 'I found it hard to wind down',
      es: 'Me costó calmarme o relajarme',
      pt: 'Achei difícil relaxar ou acalmar-me',
    },
    subtext: dassSubtext,
  },
  // 2 (Anxiety)
  {
    id: 'dass_2',
    category: 'anxiety',
    text: {
      uk: 'Я відчував(-ла) сухість у роті',
      en: 'I was aware of dryness of my mouth',
      es: 'Noté que tenía la boca seca',
      pt: 'Notei que tinha a boca seca',
    },
    subtext: dassSubtext,
  },
  // 3 (Depression)
  {
    id: 'dass_3',
    category: 'depression',
    text: {
      uk: 'Я зовсім не міг(-ла) відчути позитивних емоцій чи радості',
      en: "I couldn't seem to experience any positive feeling at all",
      es: 'Parecía que no podía experimentar ningún sentimiento positivo',
      pt: 'Parecia que não conseguia ter qualquer sentimento positivo',
    },
    subtext: dassSubtext,
  },
  // 4 (Anxiety)
  {
    id: 'dass_4',
    category: 'anxiety',
    text: {
      uk: 'Я відчував(-ла) утруднене дихання (задишку без фізичного навантаження)',
      en: 'I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness without physical exertion)',
      es: 'Experimenté dificultades para respirar (respiración rápida o falta de aire sin esfuerzo físico)',
      pt: 'Senti dificuldades em respirar (respiração ofegante ou falta de ar sem esforço físico)',
    },
    subtext: dassSubtext,
  },
  // 5 (Depression)
  {
    id: 'dass_5',
    category: 'depression',
    text: {
      uk: 'Мені було важко знайти в собі ініціативу або сили, щоб почати щось робити',
      en: 'I found it difficult to work up the initiative to do things',
      es: 'Me resultó difícil tomar la iniciativa para hacer cosas',
      pt: 'Achei difícil tomar a iniciativa para fazer coisas',
    },
    subtext: dassSubtext,
  },
  // 6 (Stress)
  {
    id: 'dass_6',
    category: 'stress',
    text: {
      uk: 'Я був(-ла) схильний(-а) занадто гостро або емоційно реагувати на ситуації',
      en: 'I tended to over-react to situations',
      es: 'Tendí a reaccionar exageradamente ante las situaciones',
      pt: 'Tive tendência a reagir exageradamente às situações',
    },
    subtext: dassSubtext,
  },
  // 7 (Anxiety)
  {
    id: 'dass_7',
    category: 'anxiety',
    text: {
      uk: 'Я відчував(-ла) тремтіння (наприклад, у руках)',
      en: 'I experienced trembling (e.g. in the hands)',
      es: 'Sentí temblores (por ejemplo, en las manos)',
      pt: 'Senti tremores (por exemplo, nas mãos)',
    },
    subtext: dassSubtext,
  },
  // 8 (Stress)
  {
    id: 'dass_8',
    category: 'stress',
    text: {
      uk: 'Я відчував(-ла), що витрачаю занадто багато нервової енергії',
      en: 'I felt that I was using a lot of nervous energy',
      es: 'Sentí que consumía mucha energía nerviosa',
      pt: 'Senti que estava a gastar muita energia nervosa',
    },
    subtext: dassSubtext,
  },
  // 9 (Anxiety)
  {
    id: 'dass_9',
    category: 'anxiety',
    text: {
      uk: 'Я хвилювався(-лася) через ситуації, де міг(-ла) запанікувати і втратити контроль',
      en: 'I was worried about situations in which I might panic and make a fool of myself',
      es: 'Me preocupaban situaciones en las que pudiera entrar en pánico o hacer el ridículo',
      pt: 'Preocupavam-me situações em que pudesse entrar em pânico e fazer má figura',
    },
    subtext: dassSubtext,
  },
  // 10 (Depression)
  {
    id: 'dass_10',
    category: 'depression',
    text: {
      uk: 'Я відчував(-ла), що мені немає на що з оптимізмом чекати попереду',
      en: 'I felt that I had nothing to look forward to',
      es: 'Sentí que no tenía nada ilusionante por delante',
      pt: 'Senti que não tinha nada pelo qual ansiar no futuro',
    },
    subtext: dassSubtext,
  },
  // 11 (Stress)
  {
    id: 'dass_11',
    category: 'stress',
    text: {
      uk: 'Я помічав(-ла), що стаю збудженим(-ою), неспокійним(-ою) або роздратованим(-ою)',
      en: 'I found myself getting agitated',
      es: 'Me sentí agitado o inquieto',
      pt: 'Dei comigo a ficar agitado ou inquieto',
    },
    subtext: dassSubtext,
  },
  // 12 (Stress)
  {
    id: 'dass_12',
    category: 'stress',
    text: {
      uk: 'Мені було важко по-справжньому розслабитися',
      en: 'I found it difficult to relax',
      es: 'Me resultó difícil relajarme',
      pt: 'Achei difícil relaxar',
    },
    subtext: dassSubtext,
  },
  // 13 (Depression)
  {
    id: 'dass_13',
    category: 'depression',
    text: {
      uk: 'Я почувався(-лася) пригніченим(-ою), сумним(-ою) та зневіреним(-ою)',
      en: 'I felt down-hearted and blue',
      es: 'Me sentí triste y desanimado',
      pt: 'Senti-me em baixo e triste',
    },
    subtext: dassSubtext,
  },
  // 14 (Stress)
  {
    id: 'dass_14',
    category: 'stress',
    text: {
      uk: 'Я нетерпляче реагував(-ла) на будь-які затримки або коли мене відволікали від справ',
      en: 'I was intolerant of anything that kept me from getting on with what I was doing',
      es: 'No toleraba nada que me impidiera seguir con lo que estaba haciendo',
      pt: 'Fiquei intolerante com tudo o que me impedia de continuar o que estava a fazer',
    },
    subtext: dassSubtext,
  },
  // 15 (Anxiety)
  {
    id: 'dass_15',
    category: 'anxiety',
    text: {
      uk: 'Я відчував(-ла), що стан близький до паніки',
      en: 'I felt I was close to panic',
      es: 'Sentí que estaba cerca del pánico',
      pt: 'Senti que estava à beira do pânico',
    },
    subtext: dassSubtext,
  },
  // 16 (Depression)
  {
    id: 'dass_16',
    category: 'depression',
    text: {
      uk: 'Я не міг(-ла) відчути ентузіазму ні щодо чого',
      en: 'I was unable to become enthusiastic about anything',
      es: 'Fui incapaz de entusiasmarme con nada',
      pt: 'Fui incapaz de me entusiasmar com o que quer que fosse',
    },
    subtext: dassSubtext,
  },
  // 17 (Depression)
  {
    id: 'dass_17',
    category: 'depression',
    text: {
      uk: 'Я відчував(-ла), що мало чого вартий(-а) як особистість',
      en: "I felt I wasn't worth much as a person",
      es: 'Sentí que no valía mucho como persona',
      pt: 'Senti que não valia muito como pessoa',
    },
    subtext: dassSubtext,
  },
  // 18 (Stress)
  {
    id: 'dass_18',
    category: 'stress',
    text: {
      uk: 'Я відчував(-ла) себе досить вразливим(-ою) або легко дратувався(-лася)',
      en: 'I felt that I was rather touchy',
      es: 'Sentí que estaba bastante susceptible o irritable',
      pt: 'Senti que estava bastante suscetível ou irritável',
    },
    subtext: dassSubtext,
  },
  // 19 (Anxiety)
  {
    id: 'dass_19',
    category: 'anxiety',
    text: {
      uk: 'Я виразно відчував(-ла) своє серцебиття без фізичних навантажень (тахікардія)',
      en: 'I was aware of the action of my heart in the absence of physical exertion',
      es: 'Sentí los latidos de mi corazón sin haber hecho esfuerzo físico',
      pt: 'Senti os batimentos do meu coração na ausência de esforço físico',
    },
    subtext: dassSubtext,
  },
  // 20 (Anxiety)
  {
    id: 'dass_20',
    category: 'anxiety',
    text: {
      uk: 'Я відчував(-ла) безпричинний страх чи тривожність',
      en: 'I felt scared without any good reason',
      es: 'Sentí miedo sin ninguna razón válida',
      pt: 'Senti medo sem qualquer motivo aparente',
    },
    subtext: dassSubtext,
  },
  // 21 (Depression)
  {
    id: 'dass_21',
    category: 'depression',
    text: {
      uk: 'Я відчував(-ла), що життя втратило будь-який сенс',
      en: 'I felt that life was meaningless',
      es: 'Sentí que la vida carecía de sentido',
      pt: 'Senti que a vida não tinha sentido',
    },
    subtext: dassSubtext,
  },
];

// --- Trauma Subtexts ---
const pcPtsdSubtext: Record<Language, string> = {
  uk: "У зв'язку з пережитими важкими або травматичними подіями (за останній місяць):",
  en: 'In the past month, in relation to stressful or traumatic events you experienced:',
  es: 'En el último mes, en relación con sucesos traumáticos o muy estresantes vividos:',
  pt: 'No último mês, relativamente a acontecimentos stressantes ou traumáticos vivenciados:',
};

const pclSubtext: Record<Language, string> = {
  uk: 'Протягом останнього місяця, наскільки сильно вас турбувало:',
  en: 'In the past month, how much were you bothered by:',
  es: 'En el último mes, ¿en qué medida le ha molestado:',
  pt: 'No último mês, quanto o incomodou:',
};

const itqSubtext: Record<Language, string> = {
  uk: 'Протягом останнього місяця у звʼязку з пережитим стресовим досвідом:',
  en: 'In the past month in relation to your stressful experience:',
  es: 'En el último mes en relación con su experiencia estresante:',
  pt: 'No último mês relativamente à sua experiência stressante:',
};

// --- PC-PTSD-5 (Primary Care PTSD Screen - 5 questions) ---
const rawPcPtsdQuestions: LocalizedQuestionData[] = [
  {
    id: 'pc_1',
    category: 'trauma',
    text: {
      uk: 'Мали кошмари про подію(-ї) або думали про неї, коли не хотіли цього?',
      en: 'Had nightmares about the event(s) or thought about the event(s) when you did not want to?',
      es: '¿Ha tenido pesadillas sobre el suceso o ha pensado en él cuando no quería hacerlo?',
      pt: 'Teve pesadelos sobre o acontecimento ou pensou nele quando não queria?',
    },
    subtext: pcPtsdSubtext,
    customOptions: yesNoOptions,
  },
  {
    id: 'pc_2',
    category: 'trauma',
    text: {
      uk: 'Докладали зусиль, щоб не думати про подію(-ї) або уникали ситуацій, місць чи людей, що нагадують про неї?',
      en: 'Tried hard not to think about the event(s) or went out of your way to avoid situations that reminded you of it?',
      es: '¿Se esforzó mucho por no pensar en el suceso o evitó situaciones que se lo recordaban?',
      pt: 'Esforçou-se muito para não pensar no acontecimento ou evitou situações que o recordavam?',
    },
    subtext: pcPtsdSubtext,
    customOptions: yesNoOptions,
  },
  {
    id: 'pc_3',
    category: 'trauma',
    text: {
      uk: 'Були постійно насторожі, напружені або легко лякалися від звичайних звуків чи рухів?',
      en: 'Were constantly on guard, watchful, or easily startled?',
      es: '¿Estuvo constantemente en guardia, alerta o se asustaba con facilidad?',
      pt: 'Esteve constantemente em alerta, vigilante ou sobressaltava-se facilmente?',
    },
    subtext: pcPtsdSubtext,
    customOptions: yesNoOptions,
  },
  {
    id: 'pc_4',
    category: 'trauma',
    text: {
      uk: 'Відчували оніміння або відстороненість від інших людей, занять чи свого оточення?',
      en: 'Felt numb or detached from people, activities, or your surroundings?',
      es: '¿Se sintió insensible o distanciado de las personas, actividades o de su entorno?',
      pt: 'Sentiu-se dormente ou distante das pessoas, atividades ou do ambiente ao seu redor?',
    },
    subtext: pcPtsdSubtext,
    customOptions: yesNoOptions,
  },
  {
    id: 'pc_5',
    category: 'trauma',
    text: {
      uk: 'Відчували провину або не могли перестати звинувачувати себе чи інших у тому, що сталося?',
      en: 'Felt guilty or unable to stop blaming yourself or others for the event(s) or problems it caused?',
      es: '¿Se sintió culpable o incapaz de dejar de culparse a sí mismo o a otros por lo sucedido?',
      pt: 'Sentiu culpa ou incapacidade de parar de culpar a si próprio ou a terceiros pelo sucedido?',
    },
    subtext: pcPtsdSubtext,
    customOptions: yesNoOptions,
  },
];

// --- PCL-5 (PTSD Checklist for DSM-5 - 20 questions) ---
const rawPcl5Questions: LocalizedQuestionData[] = [
  // Cluster B: Intrusions (1-5)
  {
    id: 'pcl_1',
    category: 'trauma',
    text: {
      uk: 'Повторювані, навʼязливі та тривожні спогади про стресову подію?',
      en: 'Repeated, disturbing, and unwanted memories of the stressful experience?',
      es: '¿Recuerdos repetidos, angustiantes e involuntarios de la experiencia estresante?',
      pt: 'Memórias repetidas, perturbadoras e involuntárias da experiência stressante?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_2',
    category: 'trauma',
    text: {
      uk: 'Повторювані тривожні сни чи кошмари, повʼязані зі стресовою подією?',
      en: 'Repeated, disturbing dreams related to the stressful experience?',
      es: '¿Sueños perturbadores o pesadillas repetidas relacionadas con la experiencia?',
      pt: 'Sonhos perturbadores ou pesadelos repetidos relacionados com a experiência?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_3',
    category: 'trauma',
    text: {
      uk: 'Раптове відчуття чи дія так, ніби стресова подія відбувається знову (флешбеки)?',
      en: 'Suddenly feeling or acting as if the stressful experience were happening again (flashbacks)?',
      es: '¿Sentir o actuar repentinamente como si la experiencia estuviera ocurriendo de nuevo (flashbacks)?',
      pt: 'Sentir ou agir subitamente como se a experiência estivesse a acontecer de novo (flashbacks)?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_4',
    category: 'trauma',
    text: {
      uk: 'Сильне емоційне потрясіння чи хвилювання, коли щось нагадувало про подію?',
      en: 'Feeling very upset when something reminded you of the stressful experience?',
      es: '¿Sentirse muy alterado cuando algo le recordaba la experiencia estresante?',
      pt: 'Sentir-se muito perturbado quando algo o lembrava da experiência stressante?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_5',
    category: 'trauma',
    text: {
      uk: 'Сильні тілесні реакції (серцебиття, брак повітря, пітливість), коли щось нагадувало про подію?',
      en: 'Strong physical reactions (heart pounding, trouble breathing, sweating) when reminded of the experience?',
      es: '¿Reacciones físicas intensas (latidos fuertes, dificultad para respirar, sudor) ante recordatorios?',
      pt: 'Reações físicas fortes (palpitações, falta de ar, suores) ao ser lembrado da experiência?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  // Cluster C: Avoidance (6-7)
  {
    id: 'pcl_6',
    category: 'trauma',
    text: {
      uk: 'Уникнення спогадів, думок або почуттів, повʼязаних зі стресовою подією?',
      en: 'Avoiding memories, thoughts, or feelings related to the stressful experience?',
      es: '¿Evitar recuerdos, pensamientos o sentimientos relacionados con la experiencia?',
      pt: 'Evitar memórias, pensamentos ou sentimentos relacionados com a experiência?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_7',
    category: 'trauma',
    text: {
      uk: 'Уникнення зовнішніх нагадувань (людей, місць, розмов, предметів, ситуацій) про подію?',
      en: 'Avoiding external reminders (people, places, conversations, objects, situations) of the experience?',
      es: '¿Evitar recordatorios externos (personas, lugares, conversaciones, objetos, situaciones)?',
      pt: 'Evitar lembretes externos (pessoas, lugares, conversas, objetos, situações) da experiência?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  // Cluster D: Negative Cognitions and Mood (8-14)
  {
    id: 'pcl_8',
    category: 'trauma',
    text: {
      uk: 'Труднощі з пригадуванням важливих деталей стресової події?',
      en: 'Trouble remembering important parts of the stressful experience?',
      es: '¿Dificultad para recordar partes importantes de la experiencia estresante?',
      pt: 'Dificuldade em lembrar partes importantes da experiência stressante?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_9',
    category: 'trauma',
    text: {
      uk: 'Стійкі та перебільшені негативні переконання про себе, інших людей чи світ («я зламаний», «нікому не можна вірити»)?',
      en: 'Strongly negative beliefs about yourself, other people, or the world ("I am damaged", "no one can be trusted")?',
      es: '¿Creencias marcadamente negativas sobre usted, los demás o el mundo ("estoy roto", "no se puede confiar en nadie")?',
      pt: 'Crenças fortemente negativas sobre si mesmo, outras pessoas ou o mundo ("estou danificado", "não se pode confiar em ninguém")?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_10',
    category: 'trauma',
    text: {
      uk: 'Звинувачення себе або інших у тому, що сталося, чи в наслідках цієї події?',
      en: 'Blaming yourself or someone else for the stressful experience or what happened after it?',
      es: '¿Culparse a sí mismo o a otra persona por lo que ocurrió o por sus consecuencias?',
      pt: 'Culpar-se a si próprio ou a outrem pela experiência vivida ou pelas suas consequências?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_11',
    category: 'trauma',
    text: {
      uk: 'Стійкі негативні емоції, такі як страх, жах, гнів, провина чи сором?',
      en: 'Having strong negative feelings such as fear, horror, anger, guilt, or shame?',
      es: '¿Sentimientos negativos intensos y constantes como miedo, terror, ira, culpa o vergüenza?',
      pt: 'Sentimentos negativos fortes e contínuos como medo, terror, raiva, culpa ou vergonha?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_12',
    category: 'trauma',
    text: {
      uk: 'Втрата інтересу до занять, які раніше подобалися?',
      en: 'Loss of interest in activities that you used to enjoy?',
      es: '¿Pérdida de interés en actividades que antes disfrutaba?',
      pt: 'Perda de interesse em atividades que costumava apreciar?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_13',
    category: 'trauma',
    text: {
      uk: 'Відчуття відстороненості або відчуженості від інших людей?',
      en: 'Feeling distant or cut off from other people?',
      es: '¿Sentirse distante o desconectado de los demás?',
      pt: 'Sentir-se distante ou desconectado das outras pessoas?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_14',
    category: 'trauma',
    text: {
      uk: 'Труднощі з переживанням позитивних емоцій (нездатність відчувати любов чи радість)?',
      en: 'Trouble experiencing positive feelings (being unable to feel happiness or love)?',
      es: '¿Dificultad para experimentar sentimientos positivos (incapacidad para sentir felicidad o amor)?',
      pt: 'Dificuldade em sentir emoções positivas (incapacidade de sentir felicidade ou afeto)?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  // Cluster E: Hyperarousal and Reactivity (15-20)
  {
    id: 'pcl_15',
    category: 'trauma',
    text: {
      uk: 'Дратівливість, спалахи гніву або агресивна поведінка?',
      en: 'Irritable behavior, angry outbursts, or acting aggressively?',
      es: '¿Comportamiento irritable, arrebatos de ira o agresividad?',
      pt: 'Comportamento irritável, acessos de raiva ou atitudes agressivas?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_16',
    category: 'trauma',
    text: {
      uk: 'Необачна або саморуйнівна поведінка (невиправданий ризик)?',
      en: 'Taking too many risks or doing things that could cause you harm?',
      es: '¿Asumir demasiados riesgos o hacer cosas que podrían hacerle daño?',
      pt: 'Correr riscos excessivos ou fazer coisas que possam causar danos a si próprio?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_17',
    category: 'trauma',
    text: {
      uk: 'Стан підвищеної пильності, настороженості чи постійного очікування небезпеки («надпильність»)?',
      en: 'Being "superalert" or watchful or on guard (hypervigilance)?',
      es: '¿Estar "hiperalerta", excesivamente vigilante o en guardia continua?',
      pt: 'Estar em estado de "hiperalerta", excessivamente vigilante ou em guarda contínua?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_18',
    category: 'trauma',
    text: {
      uk: 'Здригання від несподіваних звуків чи легка переляканість?',
      en: 'Feeling jumpy or easily startled?',
      es: '¿Sentirse asustadizo o sobresaltarse con facilidad?',
      pt: 'Sentir-se assustadiço ou sobressaltar-se com facilidade?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_19',
    category: 'trauma',
    text: {
      uk: 'Труднощі з концентрацією уваги?',
      en: 'Having difficulty concentrating?',
      es: '¿Tener dificultad para concentrarse?',
      pt: 'Dificuldade em concentrar-se?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'pcl_20',
    category: 'trauma',
    text: {
      uk: 'Труднощі із засинанням або неспокійний, уривчастий сон?',
      en: 'Trouble falling or staying asleep?',
      es: '¿Dificultad para conciliar o mantener el sueño?',
      pt: 'Dificuldade em adormecer ou manter o sono?',
    },
    subtext: pclSubtext,
    customOptions: pclLikertOptions,
  },
];

// --- ITQ (International Trauma Questionnaire, ICD-11 - 18 questions) ---
const rawItqQuestions: LocalizedQuestionData[] = [
  // PTSD Core - Re-experiencing (1-2)
  {
    id: 'itq_1',
    category: 'trauma',
    text: {
      uk: 'У розпачі через яскраві спогади, картинки або звуки події?',
      en: 'Having upsetting vivid dreams, memories, or pictures of the event in your mind?',
      es: '¿Sentir angustia por recuerdos vívidos, imágenes o sonidos del suceso?',
      pt: 'Sentir angústia por memórias vívidas, imagens ou sons do acontecimento?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'itq_2',
    category: 'trauma',
    text: {
      uk: 'Відчуття, ніби стресова подія відбувається знову тут і зараз?',
      en: 'Feeling as if the stressful event is happening again in the here and now?',
      es: '¿Sentir como si el suceso estuviera ocurriendo de nuevo aquí y ahora?',
      pt: 'Sentir como se o acontecimento estivesse a acontecer de novo aqui e agora?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  // PTSD Core - Avoidance (3-4)
  {
    id: 'itq_3',
    category: 'trauma',
    text: {
      uk: 'Уникнення внутрішніх думок або почуттів про подію?',
      en: 'Avoiding internal thoughts or feelings related to the event?',
      es: '¿Evitar pensamientos o sentimientos internos relacionados con el suceso?',
      pt: 'Evitar pensamentos ou sentimentos internos relacionados com o acontecimento?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'itq_4',
    category: 'trauma',
    text: {
      uk: 'Уникнення зовнішніх нагадувань (людей, місць, розмов) про подію?',
      en: 'Avoiding external reminders (people, places, conversations) of the event?',
      es: '¿Evitar recordatorios externos (personas, lugares, conversaciones) del suceso?',
      pt: 'Evitar lembretes externos (pessoas, lugares, conversas) do acontecimento?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  // PTSD Core - Sense of Current Threat (5-6)
  {
    id: 'itq_5',
    category: 'trauma',
    text: {
      uk: 'Відчуття постійної небезпеки чи перебування насторожі?',
      en: 'Being constantly on guard or feeling in danger even when safe?',
      es: '¿Estar constantemente en guardia o sentir peligro incluso estando seguro?',
      pt: 'Estar constantemente em alerta ou sentir perigo mesmo quando em segurança?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'itq_6',
    category: 'trauma',
    text: {
      uk: 'Легко здригаєтеся чи лякаєтеся від несподіваних речей?',
      en: 'Feeling jumpy or easily startled by everyday sounds or movements?',
      es: '¿Sobresaltarse o asustarse fácilmente con sonidos o movimientos cotidianos?',
      pt: 'Sobressaltar-se ou assustar-se facilmente com sons ou movimentos quotidianos?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  // PTSD Functional Impairment (7-9)
  {
    id: 'itq_7',
    category: 'trauma',
    text: {
      uk: 'Чи шкодять ці симптоми вашим стосункам або соціальному життю?',
      en: 'Do these symptoms affect your relationships or social life?',
      es: '¿Afectan estos síntomas a sus relaciones o vida social?',
      pt: 'Estes sintomas afetam os seus relacionamentos ou vida social?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'itq_8',
    category: 'trauma',
    text: {
      uk: 'Чи шкодять вони вашій роботі, навчанню або здатності працювати?',
      en: 'Do these symptoms affect your work, studies, or ability to work?',
      es: '¿Afectan a su trabajo, estudios o capacidad para trabajar?',
      pt: 'Afetam o seu trabalho, estudos ou capacidade laboral?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'itq_9',
    category: 'trauma',
    text: {
      uk: 'Чи шкодять вони іншим важливим сферам щоденного життя?',
      en: 'Do these symptoms affect other important areas of your daily life?',
      es: '¿Afectan a otras áreas importantes de su vida diaria?',
      pt: 'Afetam outras áreas importantes da sua vida diária?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  // DSO - Affective Dysregulation (10-11)
  {
    id: 'itq_10',
    category: 'trauma',
    text: {
      uk: 'Потрібно багато часу, щоб заспокоїтися після хвилювання або злості?',
      en: 'When upset, does it take a very long time to calm down?',
      es: '¿Cuando se altera, tarda mucho tiempo en calmarse?',
      pt: 'Quando se perturba, demora muito tempo a acalmar-se?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'itq_11',
    category: 'trauma',
    text: {
      uk: 'Відчуваєте емоційне оніміння або нездатність відчувати емоції?',
      en: 'Do you feel emotionally numb or shut down from feeling emotions?',
      es: '¿Se siente emocionalmente insensible o incapaz de experimentar emociones?',
      pt: 'Sente-se emocionalmente dormente ou incapaz de sentir emoções?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  // DSO - Negative Self-Concept (12-13)
  {
    id: 'itq_12',
    category: 'trauma',
    text: {
      uk: 'Відчуття себе невдахою або нездатним нічого досягти?',
      en: 'Feeling like a failure or having lost confidence in yourself?',
      es: '¿Sentirse como un fracaso o haber perdido la confianza en sí mismo?',
      pt: 'Sentir-se um fracasso ou ter perdido a confiança em si próprio?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'itq_13',
    category: 'trauma',
    text: {
      uk: 'Відчуття нікчемності чи втрати власної людської цінності?',
      en: 'Feeling worthless or having no self-worth?',
      es: '¿Sentirse inútil o carente de valor personal?',
      pt: 'Sentir-se inútil ou sem valor pessoal?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  // DSO - Disturbed Relationships (14-15)
  {
    id: 'itq_14',
    category: 'trauma',
    text: {
      uk: 'Відчуття відстороненості чи відчуження від близьких людей?',
      en: 'Feeling distant or cut off from people close to you?',
      es: '¿Sentirse distante o desconectado de las personas cercanas?',
      pt: 'Sentir-se distante ou desligado das pessoas próximas?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'itq_15',
    category: 'trauma',
    text: {
      uk: 'Складно залишатися емоційно близьким з іншими людьми?',
      en: 'Finding it difficult to stay emotionally close to other people?',
      es: '¿Le resulta difícil mantenerse emocionalmente cercano a otras personas?',
      pt: 'Acha difícil manter-se emocionalmente próximo de outras pessoas?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  // DSO Functional Impairment (16-18)
  {
    id: 'itq_16',
    category: 'trauma',
    text: {
      uk: 'Чи шкодять ці труднощі з емоціями та самооцінкою вашим стосункам?',
      en: 'Do these difficulties with emotions and self-worth affect your relationships?',
      es: '¿Afectan estas dificultades emocionales y de autoestima a sus relaciones?',
      pt: 'Estas dificuldades com emoções e autoestima afetam as suas relações?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'itq_17',
    category: 'trauma',
    text: {
      uk: 'Чи шкодять вони роботі, навчанню або карʼєрним цілям?',
      en: 'Do they affect your work, studies, or daily productivity?',
      es: '¿Afectan a su trabajo, estudios o productividad cotidiana?',
      pt: 'Afetam o seu trabalho, estudos ou produtividade diária?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
  {
    id: 'itq_18',
    category: 'trauma',
    text: {
      uk: 'Чи шкодять вони іншим важливим аспектам вашого життя?',
      en: 'Do they affect other important aspects of your everyday life?',
      es: '¿Afectan a otros aspectos importantes de su vida cotidiana?',
      pt: 'Afetam outros aspetos importantes da sua vida quotidiana?',
    },
    subtext: itqSubtext,
    customOptions: pclLikertOptions,
  },
];

export function getQuestions(mode: AssessmentMode, lang: Language = 'uk'): Question[] {
  if (mode === 'dass21') {
    return rawDassQuestions.map(q => ({
      id: q.id,
      category: q.category,
      text: q.text[lang] || q.text['en'],
      subtext: q.subtext ? (q.subtext[lang] || q.subtext['en']) : undefined,
      options: dassFrequencyOptions[lang] || dassFrequencyOptions['en'],
    }));
  }

  if (mode === 'pc_ptsd_5') {
    return rawPcPtsdQuestions.map(q => ({
      id: q.id,
      category: q.category,
      text: q.text[lang] || q.text['en'],
      subtext: q.subtext ? (q.subtext[lang] || q.subtext['en']) : undefined,
      options: q.customOptions
        ? (q.customOptions[lang] || q.customOptions['en'])
        : (yesNoOptions[lang] || yesNoOptions['en']),
    }));
  }

  if (mode === 'pcl5') {
    return rawPcl5Questions.map(q => ({
      id: q.id,
      category: q.category,
      text: q.text[lang] || q.text['en'],
      subtext: q.subtext ? (q.subtext[lang] || q.subtext['en']) : undefined,
      options: q.customOptions
        ? (q.customOptions[lang] || q.customOptions['en'])
        : (pclLikertOptions[lang] || pclLikertOptions['en']),
    }));
  }

  if (mode === 'itq') {
    return rawItqQuestions.map(q => ({
      id: q.id,
      category: q.category,
      text: q.text[lang] || q.text['en'],
      subtext: q.subtext ? (q.subtext[lang] || q.subtext['en']) : undefined,
      options: q.customOptions
        ? (q.customOptions[lang] || q.customOptions['en'])
        : (pclLikertOptions[lang] || pclLikertOptions['en']),
    }));
  }

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
