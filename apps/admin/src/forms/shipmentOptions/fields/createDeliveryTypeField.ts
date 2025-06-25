import {snakeCase} from 'lodash-unified';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {DeliveryTypeName} from '@myparcel/constants';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_DELIVERY_TYPE, SHIPMENT_OPTIONS} from '../field';
import {defineFormField, resolveFormComponent} from '../../helpers';
import {AdminComponent} from '../../../data';
import {createRef} from './createRef';

export const createDeliveryTypeField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  return defineFormField({
    name: FIELD_DELIVERY_TYPE,
    label: snakeCase(`${SHIPMENT_OPTIONS}_delivery_type`),
    ref: createRef<DeliveryTypeName>(refs, FIELD_DELIVERY_TYPE, DeliveryTypeName.Standard),
    component: resolveFormComponent(AdminComponent.RadioGroup),
    // options defined in afterUpdate of `createCarrierField`
  });
};
