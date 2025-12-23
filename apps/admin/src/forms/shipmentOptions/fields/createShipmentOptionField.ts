import {type Shipment, TriState} from '@myparcel-dev/pdk-common';
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {type FieldName} from '../field';
import {createHasShipmentOptionWatcher, defineFormField, getFieldLabel, resolveFormComponent} from '../../helpers';
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
    label: getFieldLabel(name),
    visibleWhen: createHasShipmentOptionWatcher(name),
    disabledWhen: createHasShipmentOptionWatcher(name, true),
    ...config,
  });
};
