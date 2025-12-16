import {toValue} from 'vue';
import {TriState} from '@myparcel-dev/pdk-common';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {type ElementInstance, type TriStateInputProps} from '../../types';

export const triStateFieldIsEnabled = (form: FormInstance, fieldName: string): boolean => {
  const field = form.getField(fieldName) as unknown as ElementInstance<TriState, TriStateInputProps> | undefined;

  if (!field) {
    return false;
  }

  const value = toValue(field.ref);

  if (TriState.Inherit === value) {
    return TriState.On === field.props.defaultValue;
  }

  return TriState.On === value;
};
