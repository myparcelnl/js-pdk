import {TriState} from '@myparcel-dev/pdk-common';
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {CarrierName} from '@myparcel-dev/constants';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_AGE_CHECK, FIELD_RECEIPT_CODE} from '../field';
import {getFormCarrierName, hasPostNlAgeCheck} from '../../helpers';
import {createShipmentOptionField} from './createShipmentOptionField';

export const createReceiptCodeField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return createShipmentOptionField(refs, FIELD_RECEIPT_CODE, {
    readOnlyWhen: ({form}) => hasPostNlAgeCheck(form),

    afterUpdate({form}, value) {
      if (!(CarrierName.DhlForYou === getFormCarrierName(form) && TriState.On === value)) {
        return;
      }

      form.setValue(FIELD_AGE_CHECK, TriState.Off);
    },
  });
};
