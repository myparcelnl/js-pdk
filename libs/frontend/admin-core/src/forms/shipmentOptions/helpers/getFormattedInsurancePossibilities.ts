import {Format, Formatter} from '../../../composables';
import {ElementInstance} from '../../../types';
import {SelectOption} from '@myparcel-pdk/common/src';
import {getInsurancePossibilities} from './getInsurancePossibilities';

export const getFormattedInsurancePossibilities = (field: ElementInstance, formatter: Formatter): SelectOption[] => {
  const insurancePossibilities = getInsurancePossibilities(field.form);

  return insurancePossibilities.map((amount) => ({
    plainLabel: formatter.format(Format.Currency, amount / 100),
    value: amount.toString(),
  }));
};
