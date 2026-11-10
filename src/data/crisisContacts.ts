import { CrisisContact } from '../types/assessment';

export const crisisContacts: Record<string, CrisisContact[]> = {
  UA: [
    {
      country: 'UA',
      name: 'Lifeline Ukraine',
      phone: '7333',
      description: 'Національна лінія запобігання самогубствам та психологічної підтримки (24/7, безкоштовно)',
      isYouthSpecific: false,
    },
    {
      country: 'UA',
      name: 'Teenergizer (Підтримка для підлітків)',
      chatUrl: 'https://teenergizer.org/consultations',
      description: 'Безкоштовні та конфіденційні онлайн-консультації психологів для підлітків у чаті',
      isYouthSpecific: true,
    },
    {
      country: 'UA',
      name: 'Національна гаряча лінія для дітей та молоді (Ла Страда)',
      phone: '116 111 або 0 800 500 225',
      chatUrl: 'https://t.me/childhotline_ukraine',
      description: 'Підтримка дітей, підлітків та студентів (дзвінки та чат у Telegram)',
      isYouthSpecific: true,
    },
    {
      country: 'UA',
      name: 'Гаряча лінія Українського ветеранського фонду',
      phone: '0 800 33 20 29',
      description: 'Кризова підтримка для ветеранів, військовослужбовців та їхніх родин (24/7, безкоштовно)',
      isYouthSpecific: false,
      isTraumaSpecific: true,
    },
    {
      country: 'UA',
      name: 'Лінія психологічної допомоги НПА',
      phone: '0 800 100 102',
      description: 'Безкоштовна фахова психологічна допомога для постраждалих від війни (щодня 10:00–20:00)',
      isYouthSpecific: false,
      isTraumaSpecific: true,
    },
    {
      country: 'UA',
      name: 'Гаряча лінія психологічної підтримки',
      phone: '0 800 211 444',
      description: 'Безкоштовна кваліфікована допомога фахівців (щодня з 9:00 до 18:00)',
      isYouthSpecific: false,
    }
  ],
  US: [
    {
      country: 'US',
      name: '988 Suicide & Crisis Lifeline',
      phone: '988',
      chatUrl: 'https://988lifeline.org/chat/',
      description: 'Free, confidential 24/7 support across the US (Call or Text)',
      isYouthSpecific: false,
    },
    {
      country: 'US',
      name: 'The Trevor Project (LGBTQ Youth)',
      phone: '1-866-488-7386',
      chatUrl: 'https://www.thetrevorproject.org/get-help/',
      description: '24/7 crisis intervention and suicide prevention for young people',
      isYouthSpecific: true,
    }
  ],
  GLOBAL: [
    {
      country: 'GLOBAL',
      name: 'Befrienders Worldwide',
      chatUrl: 'https://www.befrienders.org',
      description: 'Global network of confidential emotional support centers worldwide',
      isYouthSpecific: false,
    }
  ]
};
