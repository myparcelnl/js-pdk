import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {TriState} from '@myparcel-dev/pdk-common';
import {type SelectOption} from '../../types';
import {Format, type Formatter} from '../../composables';
import {getCarrier} from './getCarrier';

interface InsuranceAmountData {
  insuredAmount?: {
    min: {amount: number; currency: string};
    max: {amount: number; currency: string};
    default: {amount: number; currency: string};
  };
}

/**
 * Generate insurance amount bracket options from the currently selected
 * carrier's insurance data.
 *
 * Reads `insuredAmount.min` and `insuredAmount.max` from the carrier's
 * options to produce select options. Amounts in the context are in cents.
 */
export const getInsuranceOptions = (form: FormInstance, formatter: Formatter): SelectOption[] => {
  const carrier = getCarrier(form);
  const insuranceData = (carrier?.options?.insurance ?? {}) as InsuranceAmountData;
  const insurancePossibilities: number[] = [];

  const min = insuranceData.insuredAmount?.min.amount
    ? insuranceData.insuredAmount.min.amount / 100
    : 0;
  const max = insuranceData.insuredAmount?.max.amount
    ? insuranceData.insuredAmount.max.amount / 100
    : 0;

  if (max === 0) {
    return [];
  }

  const LOW_STEPS = 250;
  const HIGH_STEPS = 500;
  const LOW_THRESHOLD = 500;

  for (let i = min; i <= max; i += i < LOW_THRESHOLD ? LOW_STEPS : HIGH_STEPS) {
    insurancePossibilities.push(i * 100);
  }

  const carrierPossibilities = insurancePossibilities.map((amount) => ({
    plainLabel: formatter.format(Format.Currency, amount / 100),
    value: amount.toString(),
  }));

  return [
    {
      label: 'option_default',
      value: TriState.Inherit,
    },
    ...carrierPossibilities,
  ];
};
