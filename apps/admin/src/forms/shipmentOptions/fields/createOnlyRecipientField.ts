import {TriState} from '@myparcel-pdk/common';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {CarrierName} from '@myparcel/constants';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_AGE_CHECK, FIELD_ONLY_RECIPIENT} from '../field';
import {hasPostNlAgeCheck} from '../../helpers/hasPostNlAgeCheck';
import {getFormCarrierName} from '../../helpers/getFormCarrierName';
import {createShipmentOptionField} from './createShipmentOptionField';

export const createOnlyRecipientField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return createShipmentOptionField(refs, FIELD_ONLY_RECIPIENT, {
    readOnlyWhen: ({form}) => hasPostNlAgeCheck(form),

    afterUpdate({form}, value) {
      if (!(CarrierName.DhlForYou === getFormCarrierName(form) && TriState.On === value)) {
        return;
      }

      form.setValue(FIELD_AGE_CHECK, TriState.Off);
    },
  });
};
