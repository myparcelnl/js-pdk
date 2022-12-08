import {FormatterFunction} from '../formatter.types';
import {IetfLanguageTag} from '@myparcel-pdk/frontend-core';
import {createCurrencyFormat} from './createCurrencyFormat';

let formatCurrency: Intl.NumberFormat;

export const createDefaultCurrencyFormatter = (locale: IetfLanguageTag): FormatterFunction => {
  formatCurrency ??= createCurrencyFormat(locale);

  return (input) => {
    if (typeof input === 'number') {
      return formatCurrency.format(input);
    }

    return '';
  };
};
