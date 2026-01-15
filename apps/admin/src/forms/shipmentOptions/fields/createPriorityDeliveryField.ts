import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_PRIORITY_DELIVERY, PRIORITY_DELIVERY} from '../field';
import {createHasShipmentOptionWatcher, isPackageTypeMailbox} from '../../helpers';
import {createShipmentOptionField} from './createShipmentOptionField';

export const createPriorityDeliveryField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return createShipmentOptionField(refs, FIELD_PRIORITY_DELIVERY, {
    visibleWhen: createHasShipmentOptionWatcher(PRIORITY_DELIVERY, false, isPackageTypeMailbox),
  });
};
