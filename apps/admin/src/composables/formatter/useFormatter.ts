import {type Ref, ref} from 'vue';
import {useAdminConfig} from '../useAdminConfig';
import {type Formatter, type FormatterTranslateFunction, type LocaleFormatterObject} from './formatter.types';
import {
  createDefaultDateLongFormatter,
  createDefaultDateRelativeFormatter,
  createDefaultWeekdayFormatter,
} from './default/defaultDateFormatters';
import {createDefaultCurrencyFormatter} from './default/defaultCurrencyFormatters';

let formats: Ref<LocaleFormatterObject>;

export const useFormatter = (
  locale: string,
  translate: FormatterTranslateFunction = (string) => string ?? '',
): Formatter => {
  formats ??= ref({});

  const config = useAdminConfig();

  const getFormatters: Formatter['getFormatters'] = (locale) => {
    if (!formats.value[locale]) {
      formats.value[locale] = {
        currency: config.formatters?.currency ?? createDefaultCurrencyFormatter(locale),
        dateLong: config.formatters?.dateLong ?? createDefaultDateLongFormatter(locale),
        dateRelative: config.formatters?.dateRelative ?? createDefaultDateRelativeFormatter(locale, translate),
        weekday: config.formatters?.weekday ?? createDefaultWeekdayFormatter(locale),
      };
    }

    return formats.value[locale];
  };

  return {
    format: (format, input) => {
      const formatters = getFormatters(locale);
      const formatter = formatters[format];

      if (!formatter) {
        return '';
      }

      return formatter(input);
    },

    formats,

    getFormatters,
  };
};
