import {type FormInstance} from '@myparcel/vue-form-builder';
import {CarrierName} from '@myparcel/constants';
import {FIELD_AGE_CHECK} from '../shipmentOptions';
import {triStateFieldIsEnabled} from './triStateFieldIsEnabled';
import {getFormCarrierName} from './getFormCarrierName';

export const hasPostNlAgeCheck = (form: FormInstance): boolean => {
  const carrier = getFormCarrierName(form);

  return CarrierName.PostNl === carrier && triStateFieldIsEnabled(form, FIELD_AGE_CHECK);
};
