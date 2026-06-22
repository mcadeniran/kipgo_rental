export type Currency = {
  code: string;
  symbol: string;
  name: {
    en: string;
    ru: string;
    tr: string;
  };
};

export const Currencies: Currency[] = [
  {
    code: 'USD',
    symbol: '$',
    name: {
      en: 'US Dollar',
      ru: 'Доллар США',
      tr: 'ABD Doları',
    },
  },
  {
    code: 'GBP',
    symbol: '£',
    name: {
      en: 'British Pound',
      ru: 'Британский фунт',
      tr: 'İngiliz Sterlini',
    },
  },
  {
    code: 'EUR',
    symbol: '€',
    name: {
      en: 'Euro',
      ru: 'Евро',
      tr: 'Euro',
    },
  },
  {
    code: 'TRY',
    symbol: '₺',
    name: {
      en: 'Turkish Lira',
      ru: 'Турецкая лира',
      tr: 'Türk Lirası',
    },
  },
];
