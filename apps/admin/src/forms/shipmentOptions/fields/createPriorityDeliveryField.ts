import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {PackageTypeName} from '@myparcel-dev/constants';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_PACKAGE_TYPE, FIELD_PRIORITY_DELIVERY} from '../field';
import {createShipmentOptionField} from './createShipmentOptionField';

export const createPriorityDeliveryField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return createShipmentOptionField(refs, FIELD_PRIORITY_DELIVERY, {
    visibleWhen(field) {
      return PackageTypeName.Mailbox === field.form.model[FIELD_PACKAGE_TYPE].ref.value;
    },
  });
};
