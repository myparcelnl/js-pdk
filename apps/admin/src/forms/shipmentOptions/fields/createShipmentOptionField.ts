import {toRaw} from 'vue';
import {TriState} from '@myparcel-dev/pdk-common';
import {type InteractiveElementConfiguration, type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {getFieldDependencies} from '../fieldDependencies';
import {
  createHasShipmentOptionWatcher,
  defineFormField,
  getCarrier,
  getFieldLabel,
  hasShipmentOption,
  resolveFormComponent,
} from '../../helpers';
import {AdminComponent} from '../../../data';
import {createRef} from './createRef';

const SHIPMENT_OPTIONS_PREFIX = 'deliveryOptions.shipmentOptions';

/**
 * Set the ref value of a form field, working around vue-form-builder's
 * reactive proxy auto-unwrapping refs (which breaks `form.setValue()`).
 */
const setFieldValue = (field: InteractiveElementInstance, value: TriState): void => {
  toRaw(field).ref.value = value;
};

/**
 * Creates a generic shipment option field as a TriState toggle.
 *
 * This is the default factory for any option from `carrier.options` that
 * does not have a custom factory in the field factory registry.
 *
 * @param refs - current form field refs built from order data
 * @param fieldName - full dotted path, e.g. `deliveryOptions.shipmentOptions.requiresSignature`
 * @param config - optional overrides (used by custom factories that extend this base)
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
    visibleWhen: createHasShipmentOptionWatcher(name),
    // Disabled when the carrier doesn't support this option.
    // Required options use readOnlyWhen instead, keeping them enabled
    // so their value is included in the form body by getEnabledValues().
    disabledWhen: ({form}) => !hasShipmentOption(form, name),
    // Read-only prevents the TriState "inherit" toggle from being used,
    // fully locking the field when the carrier requires this option.
    readOnlyWhen: ({form}) => {
      return getCarrier(form)?.options?.[name]?.isRequired === true;
    },

    afterUpdate(field, value) {
      const carrier = getCarrier(field.form);
      const carrierName = carrier?.carrier;

      if (!carrierName) {
        return;
      }

      // Enforce isRequired: revert any user change back to TriState.On.
      if (carrier.options?.[name]?.isRequired === true && value !== TriState.On) {
        setFieldValue(field, TriState.On);

        return;
      }

      const deps = getFieldDependencies(carrierName, name);

      if (!deps) {
        return;
      }

      const isEnabled = TriState.On === value;

      for (const requiredOption of deps.requires ?? []) {
        const targetFieldName = `${SHIPMENT_OPTIONS_PREFIX}.${requiredOption}`;
        const targetField = field.form.getField(targetFieldName);

        if (!targetField) {
          continue;
        }

        if (isEnabled) {
          setFieldValue(targetField as InteractiveElementInstance, TriState.On);
          targetField.props.readOnly = true;
        } else {
          // Only clear readOnly if the carrier doesn't independently require this option.
          const isRequiredByCarrier = carrier.options?.[requiredOption]?.isRequired === true;

          if (!isRequiredByCarrier) {
            targetField.props.readOnly = false;
          }
        }
      }

      for (const excludedOption of deps.excludes ?? []) {
        const targetFieldName = `${SHIPMENT_OPTIONS_PREFIX}.${excludedOption}`;
        const targetField = field.form.getField(targetFieldName);

        if (!targetField) {
          continue;
        }

        if (isEnabled) {
          setFieldValue(targetField as InteractiveElementInstance, TriState.Off);
          targetField.props.readOnly = true;
        } else {
          const isRequiredByCarrier = carrier.options?.[excludedOption]?.isRequired === true;

          if (!isRequiredByCarrier) {
            targetField.props.readOnly = false;
          }
        }
      }
    },

    ...config,
  });
};
