import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_LARGE_FORMAT} from '../field';
import {createShipmentOptionField} from './createShipmentOptionField';

export const createLargeFormatField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return createShipmentOptionField(refs, FIELD_LARGE_FORMAT);
};
