/* eslint-disable @typescript-eslint/no-magic-numbers */

import {Ref, ref} from 'vue';

let formatters: Ref<
  Record<
    string,
    {
      relative: Intl.RelativeTimeFormat;
      long: Intl.DateTimeFormat;
    }
  >
>;

export const useDateFormatter = (locale?: string) => {
  formatters ??= ref({});

  const resolvedLocale = locale ?? navigator.language;

  const getFormatters = (locale: string) => {
    if (!formatters.value[locale]) {
      formatters.value[locale] = {
        long: new Intl.DateTimeFormat(locale, {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        relative: new Intl.RelativeTimeFormat(locale, {numeric: 'auto'}),
      };
    }

    return formatters.value[locale];
  };

  const parseDate = (date: Date | string): Date => {
    if (typeof date === 'string') {
      return new Date(date);
    }

    return date;
  };

  return {
    formatLong: (date: Date | string) => {
      const {long} = getFormatters(resolvedLocale);

      return long.format(parseDate(date));
    },

    formatRelative: (date: Date | string) => {
      const {relative, long} = getFormatters(resolvedLocale);

      const parsedDate = parseDate(date);
      const diff = parsedDate.getTime() - Date.now();

      const minutes = Math.round(diff / 1000 / 60);
      const hours = Math.round(minutes / 60);
      const days = Math.round(hours / 24);

      if (Math.abs(days) >= 14) {
        return long.format(parsedDate);
      }

      if (Math.abs(hours) >= 24) {
        return relative.format(days, 'day');
      }

      if (Math.abs(minutes) >= 60) {
        return relative.format(hours, 'hour');
      }

      if (Math.abs(minutes) >= 1) {
        return relative.format(minutes, 'minute');
      }

      return diff > 0 ? 'time_seconds_future' : 'time_seconds_past';
    },
  };
};
