import {toValue} from 'vue';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {TriState} from '@myparcel-dev/pdk-common';
import {type ElementInstance, type TriStateInputProps} from '../../types';

/**
 * Whether a tri-state value counts as enabled: explicitly on, or inheriting while the
 * inherited default is on. The single definition of this rule — use it instead of comparing
 * tri-state values inline.
 *
 * @param value - The raw tri-state value.
 * @param defaultValue - The inherited default shown when the value is `Inherit`.
 */
export const triStateValueIsEnabled = (value: TriState | undefined, defaultValue: TriState | undefined): boolean => {
  if (TriState.Inherit === value) {
    return TriState.On === defaultValue;
  }

  return TriState.On === value;
};

/**
 * Whether a tri-state form field is effectively enabled, reading its value and inherited
 * default (`props.defaultValue`, maintained by `updateFieldsDefaults`) from the form.
 *
 * @param form - The form holding the field.
 * @param fieldName - The full field name, e.g. `deliveryOptions.shipmentOptions.requiresSignature`.
 */
export const triStateFieldIsEnabled = (form: FormInstance, fieldName: string): boolean => {
  const field = form.getField(fieldName) as unknown as ElementInstance<TriState, TriStateInputProps> | undefined;

  if (!field) {
    return false;
  }

  return triStateValueIsEnabled(toValue(field.ref), field.props.defaultValue);
};
