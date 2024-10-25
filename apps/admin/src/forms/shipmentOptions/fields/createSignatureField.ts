import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_SIGNATURE} from '../field';
import {hasPostNlAgeCheck} from '../../helpers/hasPostNlAgeCheck';
import {createShipmentOptionField} from './createShipmentOptionField';

export const createSignatureField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return createShipmentOptionField(refs, FIELD_SIGNATURE, {
    readOnlyWhen: ({form}) => hasPostNlAgeCheck(form),
  });
};
