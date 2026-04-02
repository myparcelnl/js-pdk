import {TriState} from '@myparcel-dev/pdk-common';
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {type ShipmentOptionsRefs} from '../types';
import {type CarrierOptionData} from '../carrierOptionData.types';
import {getFieldDependencies} from '../fieldDependencies';
import {
  createHasShipmentOptionWatcher,
  defineFormField,
  getCarrier,
  getFieldLabel,
  hasShipmentOption,
  resolveFormComponent,
} from '../../helpers';
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

  return defineFormField({
    name: fieldName,
    component: resolveFormComponent(AdminComponent.TriStateInput),
    ref: createRef(refs, fieldName, TriState.Inherit),
    label: getFieldLabel(name),
    visibleWhen: createHasShipmentOptionWatcher(name),
    // Disabled when the carrier doesn't support this option, or when the
    // carrier marks it as required (preventing user overrides).
    disabledWhen: ({form}) => {
      if (!hasShipmentOption(form, name)) {
        return true;
      }

      return getCarrier(form)?.options?.[name]?.isRequired === true;
    },
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
        field.form.setValue(fieldName, TriState.On);

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
          field.form.setValue(targetFieldName, TriState.On);
          targetField.props.readOnly = true;
        } else {
          targetField.props.readOnly = false;
        }
      }

      for (const excludedOption of deps.excludes ?? []) {
        const targetFieldName = `${SHIPMENT_OPTIONS_PREFIX}.${excludedOption}`;
        const targetField = field.form.getField(targetFieldName);

        if (!targetField) {
          continue;
        }

        if (isEnabled) {
          field.form.setValue(targetFieldName, TriState.Off);
          targetField.props.readOnly = true;
        } else {
          targetField.props.readOnly = false;
        }
      }
    },

    ...config,
  });
};
