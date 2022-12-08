/* eslint-disable @typescript-eslint/no-magic-numbers */
import {FormatterFunction} from '../formatter.types';
import {IetfLanguageTag} from '@myparcel-pdk/frontend-core';
import {createLongDateFormat} from './createLongDateFormat';
import {createRelativeTimeFormat} from './createRelativeTimeFormat';
import {parseDate} from './parseDate';

let formatDateLong: Intl.DateTimeFormat;

let formatDateRelative: Intl.RelativeTimeFormat;

export const createDefaultDateLongFormatter = (locale: IetfLanguageTag): FormatterFunction => {
  formatDateLong ??= createLongDateFormat(locale);
  return (input) => {
    return formatDateLong.format(parseDate(input));
  };
};

export const createDefaultDateRelativeFormatter = (locale: IetfLanguageTag): FormatterFunction => {
  formatDateLong ??= createLongDateFormat(locale);
  formatDateRelative ??= createRelativeTimeFormat(locale);

  return (input) => {
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

    return diff > 0 ? 'time_seconds_future' : 'time_seconds_past';
  };
};
