import {TriState} from '@myparcel-pdk/common';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type PromiseOr} from '@myparcel/ts-utils';
import {CarrierName} from '@myparcel/constants';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_AGE_CHECK, FIELD_ONLY_RECIPIENT, FIELD_SIGNATURE} from '../field';
import {getFormCarrierName, triStateFieldIsEnabled} from '../../helpers';
import {createShipmentOptionField} from './createShipmentOptionField';

export const createAgeCheckField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return createShipmentOptionField(refs, FIELD_AGE_CHECK, {
    afterUpdate(field): PromiseOr<void> {
      const {form} = field;

      if (!triStateFieldIsEnabled(field.form, FIELD_AGE_CHECK)) {
        return;
      }

      switch (getFormCarrierName(form)) {
        case CarrierName.PostNl:
          form.setValue(FIELD_SIGNATURE, TriState.On);
          form.setValue(FIELD_ONLY_RECIPIENT, TriState.On);
          break;

        case CarrierName.DhlForYou:
          form.setValue(FIELD_SIGNATURE, TriState.Off);
          break;
      }
    },
  });
};
