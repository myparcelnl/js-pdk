export const createLongDateFormat = (locale: string): Intl.DateTimeFormat => {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
