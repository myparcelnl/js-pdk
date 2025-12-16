import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {FIELD_CARRIER} from '../shipmentOptions';
import {resolveCarrier} from '../../utils';

export const getFormCarrierName = (form: FormInstance): string | undefined => {
  return resolveCarrier(form.getValue(FIELD_CARRIER));
};
