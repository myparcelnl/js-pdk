import {type FormInstance} from '@myparcel/vue-form-builder';
import {getCarrier} from './getCarrier';

export const getInsurancePossibilities = (form: FormInstance): number[] => {
  const carrier = getCarrier(form);

  return carrier?.capabilities.shipmentOptions.insurance ?? [];
};
