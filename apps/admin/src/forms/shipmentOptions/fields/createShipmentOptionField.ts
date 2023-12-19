import {snakeCase} from 'lodash-unified';
import {type Shipment, TriState} from '@myparcel-pdk/common';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {type FieldName, SHIPMENT_OPTIONS} from '../field';
import {createHasShipmentOptionWatcher, defineFormField, resolveFormComponent} from '../../helpers';
import {AdminComponent} from '../../../data';
import {createRef} from './createRef';

export const createShipmentOptionField = (
  refs: ShipmentOptionsRefs,
  fieldName: FieldName,
  config?: Partial<InteractiveElementConfiguration>,
): InteractiveElementConfiguration => {
  const name = (fieldName.split('.').pop() ?? fieldName) as keyof Shipment.ModelShipmentOptions;

  return defineFormField({
    name: fieldName,
    component: resolveFormComponent(AdminComponent.TriStateInput),
    ref: createRef(refs, fieldName, TriState.Inherit),
    label: snakeCase(`${SHIPMENT_OPTIONS}_${name}`),
    visibleWhen: createHasShipmentOptionWatcher(name),
    disabledWhen: createHasShipmentOptionWatcher(name, true),
    ...config,
  });
};
