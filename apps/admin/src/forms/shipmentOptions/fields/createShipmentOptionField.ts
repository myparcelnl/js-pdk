import {TriState} from '@myparcel-dev/pdk-common';
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {type CarrierOptionData} from '../carrierOptionData.types';
import {createHasShipmentOptionWatcher, defineFormField, getFieldLabel, resolveFormComponent} from '../../helpers';
import {AdminComponent} from '../../../data';
import {createRef} from './createRef';

/**
 * Creates a generic shipment option field as a TriState toggle.
 *
 * This is the default factory for any option from `carrier.options` that
 * does not have a custom factory in the field factory registry.
 *
 * @param refs - current form field refs built from order data
 * @param fieldName - full dotted path, e.g. `deliveryOptions.shipmentOptions.requiresSignature`
 * @param optionData - metadata from the carrier context (`isRequired`, `isSelectedByDefault`)
 * @param config - optional overrides (used by custom factories that extend this base)
 */
export const createShipmentOptionField = (
  refs: ShipmentOptionsRefs,
  fieldName: string,
  optionData: CarrierOptionData,
  config?: Partial<InteractiveElementConfiguration>,
): InteractiveElementConfiguration => {
  const name = fieldName.split('.').pop() ?? fieldName;
  const defaultValue = optionData.isSelectedByDefault ? TriState.On : TriState.Inherit;
  const refValue = optionData.isRequired ? TriState.On : defaultValue;

  return defineFormField({
    name: fieldName,
    component: resolveFormComponent(AdminComponent.TriStateInput),
    ref: createRef(refs, fieldName, refValue),
    label: getFieldLabel(name),
    visibleWhen: createHasShipmentOptionWatcher(name),
    disabledWhen: optionData.isRequired ? () => true : createHasShipmentOptionWatcher(name, true),
    ...config,
  });
};
