import {FormInstance} from '@myparcel/vue-form-builder';
import {getCarrierOptions} from './getCarrierOptions';

export const getInsurancePossibilities = (form: FormInstance): number[] => {
  return getCarrierOptions(form)?.capabilities.shipmentOptions.insurance ?? [];
};
