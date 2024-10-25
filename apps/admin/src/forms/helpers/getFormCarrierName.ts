import {type FormInstance} from '@myparcel/vue-form-builder';
import {FIELD_CARRIER} from '../shipmentOptions/field';
import {resolveCarrier} from '../../utils/resolveCarrier';

export const getFormCarrierName = (form: FormInstance): string | undefined => {
  return resolveCarrier(form.getValue(FIELD_CARRIER));
};
