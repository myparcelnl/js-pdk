import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {CarrierName} from '@myparcel-dev/constants';
import {FIELD_AGE_CHECK} from '../shipmentOptions';
import {triStateFieldIsEnabled} from './triStateFieldIsEnabled';
import {getFormCarrierName} from './getFormCarrierName';

export const hasPostNlAgeCheck = (form: FormInstance): boolean => {
  const carrier = getFormCarrierName(form);

  return CarrierName.PostNl === carrier && triStateFieldIsEnabled(form, FIELD_AGE_CHECK);
};
