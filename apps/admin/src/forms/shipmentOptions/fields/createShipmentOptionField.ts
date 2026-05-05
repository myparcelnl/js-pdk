import {type InteractiveElementConfiguration, type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {TriState} from '@myparcel-dev/pdk-common';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_SHIPMENT_OPTIONS_PREFIX} from '../field';
import {
  defineFormField,
  getCarrierForShipment,
  getFieldLabel,
  hasShipmentOption,
  resolveFormComponent,
} from '../../helpers';
import {setFieldRef} from '../../form-builder/utils/createValueSetter';
import {AdminComponent} from '../../../data';
import {createRef} from './createRef';

/**
 * Creates a generic shipment option field as a TriState toggle.
 *
 * This is the default factory for any option from `carrier.options` that does not have a
 * custom factory in the field factory registry.
 *
 * `requires` / `excludes` are sourced from the shipment-scoped capabilities response
 * (`getCarrierForShipment`). They're undefined while the shipment query is loading or when
 * the helper is falling back to order-level data — locking simply doesn't run in those
 * windows. Once shipment data arrives, the next `afterUpdate` call will apply the rules.
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
    visibleWhen: ({form}) => hasShipmentOption(form, name),
    // Disabled when the carrier doesn't support this option.
    // Required options use readOnlyWhen instead, keeping them enabled
    // so their value is included in the form body by getEnabledValues().
    disabledWhen: ({form}) => !hasShipmentOption(form, name),
    // Read-only prevents the TriState "inherit" toggle from being used,
    // fully locking the field when the carrier requires this option.
    readOnlyWhen: ({form}) => {
      return getCarrierForShipment(form)?.options?.[name]?.isRequired === true;
    },

    afterUpdate(field, value) {
      const carrier = getCarrierForShipment(field.form);
      const option = carrier?.options?.[name];

      if (!option) {
        return;
      }

      // Enforce isRequired: revert any user change back to TriState.On.
      if (option.isRequired === true && value !== TriState.On) {
        setFieldRef(field, TriState.On);

        return;
      }

      const isEnabled = TriState.On === value;

      for (const requiredOption of option.requires ?? []) {
        const targetFieldName = `${FIELD_SHIPMENT_OPTIONS_PREFIX}.${requiredOption}`;
        const targetField = field.form.getField(targetFieldName);

        if (!targetField) {
          continue;
        }

        if (isEnabled) {
          setFieldRef(targetField as InteractiveElementInstance, TriState.On);
          targetField.props.readOnly = true;
        } else {
          // Only clear readOnly if the carrier doesn't independently require this option.
          const isRequiredByCarrier = carrier?.options?.[requiredOption]?.isRequired === true;

          if (!isRequiredByCarrier) {
            targetField.props.readOnly = false;
          }
        }
      }

      for (const excludedOption of option.excludes ?? []) {
        const targetFieldName = `${FIELD_SHIPMENT_OPTIONS_PREFIX}.${excludedOption}`;
        const targetField = field.form.getField(targetFieldName);

        if (!targetField) {
          continue;
        }

        if (isEnabled) {
          setFieldRef(targetField as InteractiveElementInstance, TriState.Off);
          targetField.props.readOnly = true;
        } else {
          const isRequiredByCarrier = carrier?.options?.[excludedOption]?.isRequired === true;

          if (!isRequiredByCarrier) {
            targetField.props.readOnly = false;
          }
        }
      }
    },

    ...config,
  });
};
