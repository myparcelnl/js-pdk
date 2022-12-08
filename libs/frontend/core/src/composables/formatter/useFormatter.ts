/* eslint-disable @typescript-eslint/no-magic-numbers */
import {IetfLanguageTag} from '@myparcel-pdk/common';
import {usePdkConfig} from '@myparcel-pdk/frontend-core';
import {Ref, ref} from 'vue';
import {
  createDefaultCurrencyFormatter,
  createDefaultDateLongFormatter,
  createDefaultDateRelativeFormatter,
} from 'libs/frontend/core/src/composables/formatter/default';
import {Formatter, LocaleFormatterObject} from './formatter.types';

let formats: Ref<LocaleFormatterObject>;

export const useFormatter = (locale?: IetfLanguageTag): Formatter => {
  formats ??= ref({});

  const config = usePdkConfig();
  const resolvedLocale = locale ?? config.locale;

  const getFormatters: Formatter['getFormatters'] = (locale) => {
    if (!formats.value[locale]) {
      formats.value[locale] = {
        currency: config.formatters?.currency ?? createDefaultCurrencyFormatter(locale),
        dateLong: config.formatters?.dateLong ?? createDefaultDateLongFormatter(locale),
        dateRelative: config.formatters?.dateRelative ?? createDefaultDateRelativeFormatter(locale),
      };
    }

    return formats.value[locale];
  };

  return {
    getFormatters,

    format: (format, input) => {
      const formatters = getFormatters(resolvedLocale);
      const formatter = formatters[format];

      if (!formatter) {
        return '';
      }

      return formatter(input);
    },
  };
};
