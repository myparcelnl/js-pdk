import {Format, Formatter} from '../../../composables';
import {ElementInstance} from '../../../types';
import {SelectOption} from '@myparcel/vue-form-builder/src';
import {getInsurancePossibilities} from './getInsurancePossibilities';

export const getFormattedInsurancePossibilities = (field: ElementInstance, formatter: Formatter): SelectOption[] => {
  const insurancePossibilities = getInsurancePossibilities(field.form);

  return insurancePossibilities.map((amount) => ({
    label: formatter.format(Format.Currency, amount / 100),
    value: amount.toString(),
  }));
};
