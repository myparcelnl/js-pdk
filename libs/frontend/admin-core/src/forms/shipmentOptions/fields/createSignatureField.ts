import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {CarrierName} from '@myparcel/constants';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_AGE_CHECK, FIELD_SIGNATURE} from '../field';
import {getFormCarrierName, triStateFieldIsEnabled} from '../../helpers';
import {createShipmentOptionField} from './createShipmentOptionField';

export const createSignatureField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return createShipmentOptionField(refs, FIELD_SIGNATURE, {
    readOnlyWhen: ({form}) => {
      const carrier = getFormCarrierName(form);

      return CarrierName.PostNl === carrier && triStateFieldIsEnabled(form, FIELD_AGE_CHECK);
    },
  });
};
