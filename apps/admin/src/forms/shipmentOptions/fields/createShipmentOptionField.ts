import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {TriState} from '@myparcel-dev/pdk-common';
import {getOptionState} from '../useShipmentOptionsState';
import {type ShipmentOptionsRefs} from '../types';
import {defineFormField, getFieldLabel, resolveFormComponent} from '../../helpers';
import {AdminComponent} from '../../../data';
import {createRef} from './createRef';

/**
 * Creates a generic shipment option field as a TriState toggle.
 *
 * Default factory for any option from `carrier.options` that doesn't have a custom factory in
 * `fieldFactoryRegistry`.
 *
 * All availability and locking decisions live in the option-state module
 * ({@link getOptionState} / `useShipmentOptionsState`) — the hooks below only read the
 * resolved state. Locked fields use readOnly, not disabled, so their value is included in the
 * form body by `getEnabledValues()` and persists on the order.
 *
 * @param refs - Initial values for all form fields, keyed by full field name (built by
 *   `buildDynamicRefs` from the order's stored data). The field's own initial value is read
 *   from `refs[fieldName]`.
 * @param fieldName - The full field name including prefix, e.g.
 *   `deliveryOptions.shipmentOptions.requiresSignature`.
 * @param config - Optional field configuration overrides, merged over the defaults built here.
 */
export const createShipmentOptionField = (
  refs: ShipmentOptionsRefs,
  fieldName: string,
  config?: Partial<InteractiveElementConfiguration>,
): InteractiveElementConfiguration => {
  const name = fieldName.split('.').pop() ?? fieldName;

  return defineFormField({
    name: fieldName,
    component: resolveFormComponent(AdminComponent.TriStateInput),
    ref: createRef(refs, fieldName, TriState.Inherit),
    label: getFieldLabel(name),
    visibleWhen: ({form}) => getOptionState(form, name).supported,
    disabledWhen: ({form}) => !getOptionState(form, name).supported,
    readOnlyWhen: ({form}) => getOptionState(form, name).readOnly,

    ...config,
  });
};
