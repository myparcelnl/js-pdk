import {FormInstance} from '@myparcel/vue-form-builder/src';
import {getCarrierOptions} from './getCarrierOptions';

export const getInsurancePossibilities = (form: FormInstance): number[] => {
  const carrierOptions = getCarrierOptions(form);

  return carrierOptions?.capabilities.shipmentOptions.insurance ?? [];
};
