import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_HIDE_SENDER} from '../field';
import {createShipmentOptionField} from './createShipmentOptionField';

export const createHideSenderField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return createShipmentOptionField(refs, FIELD_HIDE_SENDER);
};
