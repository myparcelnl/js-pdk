export const createRelativeTimeFormat = (locale: string): Intl.RelativeTimeFormat => {
  return new Intl.RelativeTimeFormat(locale, {
    numeric: 'auto',
  });
};
