/* eslint-disable @typescript-eslint/no-magic-numbers */
import {upperFirst} from 'lodash-unified';
import {type FormatterFunction, type FormatterTranslateFunction} from '../formatter.types';
import {parseDate} from './parseDate';
import {createRelativeTimeFormat} from './createRelativeTimeFormat';
import {createLongDateFormat} from './createLongDateFormat';

let formatDateLong: Intl.DateTimeFormat;

let formatDateRelative: Intl.RelativeTimeFormat;

export const createDefaultDateLongFormatter = (locale: string): FormatterFunction => {
  formatDateLong ??= createLongDateFormat(locale);
  return (input) => {
    return formatDateLong.format(parseDate(input));
  };
};

export const createDefaultDateRelativeFormatter = (
  locale: string,
  translate: FormatterTranslateFunction,
): FormatterFunction => {
  formatDateLong ??= createLongDateFormat(locale);
  formatDateRelative ??= createRelativeTimeFormat(locale);

  const getFormattedDate: FormatterFunction = (input) => {
    const parsedDate = parseDate(input);
    const diff = parsedDate.getTime() - Date.now();

    const minutes = Math.round(diff / 1000 / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (Math.abs(days) >= 14) {
      return formatDateLong.format(parsedDate);
    }

    if (Math.abs(hours) >= 24) {
      return formatDateRelative.format(days, 'day');
    }

    if (Math.abs(minutes) >= 60) {
      return formatDateRelative.format(hours, 'hour');
    }

    if (Math.abs(minutes) >= 1) {
      return formatDateRelative.format(minutes, 'minute');
    }

    return translate(`time_seconds_${diff > 0 ? 'future' : 'past'}`);
  };

  return (input) => {
    return upperFirst(getFormattedDate(input));
  };
};

export const createDefaultWeekdayFormatter = (locale: string): FormatterFunction => {
  return (input) => {
    // const date = parseDate(input);
    // return date.toLocaleDateString(locale, {weekday: 'long'});

    switch (input) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';

      default:
        return 'Unknown';
    }
  };
};
