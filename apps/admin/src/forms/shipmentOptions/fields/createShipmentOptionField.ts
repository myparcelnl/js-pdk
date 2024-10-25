import {type Shipment, TriState} from '@myparcel-pdk/common';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {type FieldName} from '../field';
import {resolveFormComponent} from '../../helpers/resolveFormComponent';
import {getFieldLabel} from '../../helpers/getFieldLabel';
import {defineFormField} from '../../helpers/defineFormField';
import {createHasShipmentOptionWatcher} from '../../helpers/createHasShipmentOptionWatcher';
import {AdminComponent} from '../../../data/components';
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
