import {type InteractiveElementConfiguration, type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {TriState} from '@myparcel-dev/pdk-common';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_SHIPMENT_OPTIONS_PREFIX} from '../field';
import {defineFormField, getFieldLabel, resolveFormComponent, useFormCapabilities} from '../../helpers';
import {setFieldRef} from '../../form-builder/utils/createValueSetter';
import {AdminComponent} from '../../../data';
import {createRef} from './createRef';

/**
 * Creates a generic shipment option field as a TriState toggle.
 *
 * Default factory for any option from `carrier.options` that doesn't have a custom factory in
 * `fieldFactoryRegistry`. `requires` / `excludes` are sourced from the shipment-scoped
 * response (`getCarrierForShipment`); they're absent while the shipment query is loading or
 * falling back to order-level data — locking doesn't run during those windows.
 *
 * `useFormCapabilities()` is called at factory invocation (setup-time) so visibility, disabled,
 * readOnly and afterUpdate handlers close over a captured Pinia store + orderId — no
 * `inject()` calls during form-builder's watchEffect-driven re-evaluators.
 */
export const createShipmentOptionField = (
  refs: ShipmentOptionsRefs,
  fieldName: string,
  config?: Partial<InteractiveElementConfiguration>,
): InteractiveElementConfiguration => {
  const name = fieldName.split('.').pop() ?? fieldName;
  const caps = useFormCapabilities();

  return defineFormField({
    name: fieldName,
    component: resolveFormComponent(AdminComponent.TriStateInput),
    ref: createRef(refs, fieldName, TriState.Inherit),
    label: getFieldLabel(name),
    visibleWhen: ({form}) => caps.hasShipmentOption(form, name),
    // Disabled when the carrier doesn't support this option.
    // Required options use readOnlyWhen instead, keeping them enabled
    // so their value is included in the form body by getEnabledValues().
    disabledWhen: ({form}) => !caps.hasShipmentOption(form, name),
    // Read-only prevents the TriState "inherit" toggle from being used,
    // fully locking the field when the carrier requires this option.
    readOnlyWhen: ({form}) => {
      return caps.getCarrierForShipment(form)?.options?.[name]?.isRequired === true;
    },

    afterUpdate(field, value) {
      const carrier = caps.getCarrierForShipment(field.form);
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
