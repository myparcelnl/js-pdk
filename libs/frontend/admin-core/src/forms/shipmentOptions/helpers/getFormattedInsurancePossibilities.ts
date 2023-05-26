import {type SelectOption} from '@myparcel-pdk/common';
import {type ElementInstance} from '../../../types';
import {Format, type Formatter} from '../../../composables';
import {getInsurancePossibilities} from './getInsurancePossibilities';

export const getFormattedInsurancePossibilities = (field: ElementInstance, formatter: Formatter): SelectOption[] => {
  const insurancePossibilities = getInsurancePossibilities(field.form);

  return insurancePossibilities.map((amount) => ({
    plainLabel: formatter.format(Format.Currency, amount / 100),
    value: amount.toString(),
  }));
};
