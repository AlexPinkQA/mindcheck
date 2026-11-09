import { Question, AssessmentMode } from '../types/assessment';
import { Language } from './translations';

interface LocalizedQuestionData {
  id: string;
  category: 'depression' | 'anxiety' | 'stress' | 'sleep' | 'context' | 'crisis';
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
