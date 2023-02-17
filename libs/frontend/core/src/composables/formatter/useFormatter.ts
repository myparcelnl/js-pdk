/* eslint-disable @typescript-eslint/no-magic-numbers */
import {Formatter, LocaleFormatterObject} from './formatter.types';
import {Ref, ref} from 'vue';
import {
  createDefaultCurrencyFormatter,
  createDefaultDateLongFormatter,
  createDefaultDateRelativeFormatter,
  createDefaultWeekdayFormatter,
} from './default';
import {useAdminConfig} from '../useAdminConfig';

let formats: Ref<LocaleFormatterObject>;

export const useFormatter = (locale: string): Formatter => {
  formats ??= ref({});

  const config = useAdminConfig();

  const getFormatters: Formatter['getFormatters'] = (locale) => {
    if (!formats.value[locale]) {
      formats.value[locale] = {
        currency: config.formatters?.currency ?? createDefaultCurrencyFormatter(locale),
        dateLong: config.formatters?.dateLong ?? createDefaultDateLongFormatter(locale),
        dateRelative: config.formatters?.dateRelative ?? createDefaultDateRelativeFormatter(locale),
        weekday: config.formatters?.weekday ?? createDefaultWeekdayFormatter(locale),
      };
    }

    return formats.value[locale];
  };

  return {
    getFormatters,

    format: (format, input) => {
      const formatters = getFormatters(locale);
      const formatter = formatters[format];

      if (!formatter) {
        return '';
      }

      return formatter(input);
    },
  };
};
