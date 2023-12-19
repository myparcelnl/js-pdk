import {TriState} from '@myparcel-pdk/common';
import {type ElementInstance, type SelectOption} from '../../types';
import {Format, type Formatter} from '../../composables';
import {getCarrier} from './getCarrier';

export const getInsuranceOptions = (field: ElementInstance, formatter: Formatter): SelectOption[] => {
  const carrier = getCarrier(field.form);

  const insurancePossibilities = carrier?.capabilities.shipmentOptions.insurance ?? [];

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
