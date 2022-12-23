export const createCurrencyFormat = (locale: string): Intl.NumberFormat => {
  return new Intl.NumberFormat(locale, {
    currency: 'EUR',
    style: 'currency',
  });
};
