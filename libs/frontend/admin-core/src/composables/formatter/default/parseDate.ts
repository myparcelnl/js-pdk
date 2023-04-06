export const parseDate = (date: unknown): Date => {
  if (typeof date === 'string') {
    return new Date(date);
  }

  if (date instanceof Date) {
    return date;
  }

  // eslint-disable-next-line no-console
  throw new Error(`Invalid date. Expected string or Date, got ${typeof date}`);
};
