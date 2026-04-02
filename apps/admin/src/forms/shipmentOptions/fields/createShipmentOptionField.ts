import {TriState} from '@myparcel-dev/pdk-common';
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {type CarrierOptionData} from '../carrierOptionData.types';
import {getFieldDependencies} from '../fieldDependencies';
import {createHasShipmentOptionWatcher, defineFormField, getFieldLabel, resolveFormComponent} from '../../helpers';
import {getFormCarrierName} from '../../helpers/getFormCarrierName';
import {AdminComponent} from '../../../data';
import {createRef} from './createRef';

const SHIPMENT_OPTIONS_PREFIX = 'deliveryOptions.shipmentOptions';

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

    afterUpdate(field, value) {
      const carrierName = getFormCarrierName(field.form);

      if (!carrierName) {
        return;
      }

      const deps = getFieldDependencies(carrierName, name);

      if (!deps) {
        return;
      }

      const isEnabled = TriState.On === value;

      for (const requiredOption of deps.requires ?? []) {
        const targetField = field.form.getField(`${SHIPMENT_OPTIONS_PREFIX}.${requiredOption}`);

        if (!targetField) {
          continue;
        }

        if (isEnabled) {
          field.form.setValue(targetField.name, TriState.On);
          targetField.props.readOnly = true;
        } else {
          targetField.props.readOnly = false;
        }
      }

      for (const excludedOption of deps.excludes ?? []) {
        const targetField = field.form.getField(`${SHIPMENT_OPTIONS_PREFIX}.${excludedOption}`);

        if (!targetField) {
          continue;
        }

        if (isEnabled) {
          field.form.setValue(targetField.name, TriState.Off);
          targetField.props.readOnly = true;
        } else {
          targetField.props.readOnly = false;
        }
      }
    },

    ...config,
  });
};
