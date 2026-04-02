import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {type CarrierOptionData} from '../carrierOptionData.types';
import {createHasShipmentOptionWatcher, isPackageTypeMailbox} from '../../helpers';
import {createShipmentOptionField} from './createShipmentOptionField';

/**
 * Custom field factory for the priority delivery shipment option.
 *
 * Uses a mailbox package type validator instead of the default package type
 * check, because priority delivery is only available for mailbox shipments.
 *
 * @TODO Replace with context-driven show/hide when the carrier options
 *       reactively update based on the selected package type.
 */
export const createPriorityDeliveryField = (
  refs: ShipmentOptionsRefs,
  fieldName: string,
  optionData: CarrierOptionData,
): InteractiveElementConfiguration => {
  const optionKey = fieldName.split('.').pop() ?? fieldName;

  return createShipmentOptionField(refs, fieldName, optionData, {
    visibleWhen: createHasShipmentOptionWatcher(optionKey, false, isPackageTypeMailbox),
    disabledWhen: createHasShipmentOptionWatcher(optionKey, true, isPackageTypeMailbox),
  });
};
