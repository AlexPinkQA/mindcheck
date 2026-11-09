import { Question } from '../types/assessment';

const frequencyOptions = [
  { value: 0, label: 'Абсолютно ні' },
  { value: 1, label: 'Кілька днів' },
  { value: 2, label: 'Більше половини днів' },
  { value: 3, label: 'Майже щодня' },
];

export const assessmentQuestions: Question[] = [
  // --- Блок 1: Настрій та депресивні прояви (PHQ-9) ---
  {
    id: 'phq_1',
    category: 'depression',
    text: 'Малий інтерес або задоволення від занять, які раніше приносили радість?',
    subtext: 'Протягом останніх 2 тижнів',
    options: frequencyOptions,
  },
  {
    id: 'phq_2',
    category: 'depression',
    text: 'Відчуття пригніченості, депресії, порожнечі або безнадії?',
    subtext: 'Протягом останніх 2 тижнів',
    options: frequencyOptions,
  },
  {
    id: 'phq_3',
    category: 'sleep',
    text: 'Труднощі із засинанням, переривчастий сон або занадто тривалий сон?',
    subtext: 'Протягом останніх 2 тижнів',
    options: frequencyOptions,
  },
  {
    id: 'phq_4',
    category: 'depression',
    text: 'Відчуття втоми, виснаження або відсутності фізичної енергії?',
    subtext: 'Протягом останніх 2 тижнів',
    options: frequencyOptions,
  },
  {
    id: 'phq_5',
    category: 'depression',
    text: 'Поганий апетит або, навпаки, неконтрольоване переїдання?',
    subtext: 'Протягом останніх 2 тижнів',
    options: frequencyOptions,
  },
  {
    id: 'phq_6',
    category: 'depression',
    text: 'Погане ставлення до себе — відчуття власної невдачі або почуття провини?',
    subtext: 'Протягом останніх 2 тижнів',
    options: frequencyOptions,
  },
  {
    id: 'phq_7',
    category: 'depression',
    text: 'Труднощі з концентрацією (читання, робота, навчання, перегляд фільмів)?',
    subtext: 'Протягом останніх 2 тижнів',
    options: frequencyOptions,
  },
  {
    id: 'phq_8',
    category: 'depression',
    text: 'Уповільненість рухів або мови, або навпаки — неспокій, метушливість?',
    subtext: 'Протягом останніх 2 тижнів',
    options: frequencyOptions,
  },
  {
    id: 'phq_9',
    category: 'crisis',
    text: 'Думки про те, що краще було б померти, або бажання заподіяти собі шкоду?',
    subtext: 'Відповідайте щиро — ваші відповіді залишаються лише на вашому пристрої',
    options: frequencyOptions,
    isCrisisTrigger: true,
  },

  // --- Блок 2: Тривожність і психоемоційне напруження (GAD-7) ---
  {
    id: 'gad_1',
    category: 'anxiety',
    text: 'Відчуття нервозності, тривоги або постійного очікування небезпеки?',
    subtext: 'Протягом останніх 2 тижнів',
    options: frequencyOptions,
  },
  {
    id: 'gad_2',
    category: 'anxiety',
    text: 'Нездатність зупинити або контролювати власне хвилювання?',
    subtext: 'Протягом останніх 2 тижнів',
    options: frequencyOptions,
  },
  {
    id: 'gad_3',
    category: 'anxiety',
    text: 'Надмірне занепокоєння з приводу різних повсякденних речей?',
    subtext: 'Протягом останніх 2 тижнів',
    options: frequencyOptions,
  },
  {
    id: 'gad_4',
    category: 'anxiety',
    text: 'Труднощі з розслабленням, постійне відчуття внутрішньої пружини?',
    subtext: 'Протягом останніх 2 тижнів',
    options: frequencyOptions,
  },
  {
    id: 'gad_5',
    category: 'anxiety',
    text: 'Настільки сильний внутрішній неспокій, що важко всидіти на місці?',
    subtext: 'Протягом останніх 2 тижнів',
    options: frequencyOptions,
  },
  {
    id: 'gad_6',
    category: 'anxiety',
    text: 'Швидка дратівливість, спалахи злості або нетерплячість?',
    subtext: 'Протягом останніх 2 тижнів',
    options: frequencyOptions,
  },
  {
    id: 'gad_7',
    category: 'anxiety',
    text: 'Відчуття паніки або страху, ніби зараз станеться щось жахливе?',
    subtext: 'Протягом останніх 2 тижнів',
    options: frequencyOptions,
  },

  // --- Блок 3: Відновлення та соматичні прояви ---
  {
    id: 'sleep_quality',
    category: 'sleep',
    text: 'Чи відчуваєте ви себе відпочилими після пробудження вранці?',
    options: [
      { value: 0, label: 'Так, зазвичай відновлюю сили' },
      { value: 1, label: 'Іноді відчуваю ранкову втому' },
      { value: 2, label: 'Рідко відчуваю бадьорість' },
      { value: 3, label: 'Майже ніколи, прокидаюся розбитими' },
    ],
  },
  {
    id: 'social_withdrawal',
    category: 'context',
    text: 'Чи помічаєте ви бажання уникати спілкування та ізолюватися від близьких?',
    options: [
      { value: 0, label: 'Ні, спілкуюся у звичному режимі' },
      { value: 1, label: 'Іноді відмовляюся від зустрічей' },
      { value: 2, label: 'Помітно обмежив(ла) контакт з оточенням' },
      { value: 3, label: 'Повне усамітнення, важко вийти на звʼязок' },
    ],
  },

  // --- Блок 4: Тривалість та функціональний вплив ---
  {
    id: 'context_duration',
    category: 'context',
    text: 'Як довго в цілому триває цей стан або його виражене погіршення?',
    subtext: 'Тривалість симптомів допомагає відрізнити ситуативну втому від клінічного епізоду',
    options: [
      { value: 0, label: 'Менше 2 тижнів (нещодавно)' },
      { value: 1, label: 'Від 2 тижнів до 1 місяця' },
      { value: 2, label: 'Від 1 до 6 місяців' },
      { value: 3, label: 'Понад пів року або хронічно з періодами полегшення' },
    ],
  },
  {
    id: 'context_impact',
    category: 'context',
    text: 'Наскільки ці симптоми заважають вашій роботі, навчанню чи домашнім справам?',
    options: [
      { value: 0, label: 'Зовсім не заважають' },
      { value: 1, label: 'Дещо ускладнюють повсякденні справи' },
      { value: 2, label: 'Суттєво заважають продуктивності' },
      { value: 3, label: 'Вкрай ускладнюють, часом неможливо виконувати елементарні завдання' },
    ],
  },
];
