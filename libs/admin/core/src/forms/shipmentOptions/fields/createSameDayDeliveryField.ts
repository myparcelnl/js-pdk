import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_SAME_DAY_DELIVERY} from '../field';
import {createShipmentOptionField} from './createShipmentOptionField';

export const createSameDayDeliveryField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return createShipmentOptionField(refs, FIELD_SAME_DAY_DELIVERY);
};
