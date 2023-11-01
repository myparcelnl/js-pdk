import {type FormatterFunction} from '../formatter.types';
import {createCurrencyFormat} from './createCurrencyFormat';

let formatCurrency: Intl.NumberFormat;

export const createDefaultCurrencyFormatter = (locale: string): FormatterFunction => {
  formatCurrency ??= createCurrencyFormat(locale);

  return (input) => {
    if (typeof input === 'number') {
      return formatCurrency.format(input);
    }

    return '';
  };
};
