import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_DIRECT_RETURN} from '../field';
import {createShipmentOptionField} from './createShipmentOptionField';

export const createDirectReturnField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return createShipmentOptionField(refs, FIELD_DIRECT_RETURN);
};
