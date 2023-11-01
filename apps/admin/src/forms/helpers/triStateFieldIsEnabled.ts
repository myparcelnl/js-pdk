import {get} from '@vueuse/core';
import {type FormInstance} from '@myparcel/vue-form-builder';
import {type ElementInstance, type TriStateInputProps} from '../../types';
import {TriState} from '../../data';

export const triStateFieldIsEnabled = (form: FormInstance, fieldName: string): boolean => {
  const field = form.getField(fieldName) as unknown as ElementInstance<TriStateInputProps> | undefined;

  if (!field) {
    return false;
  }

  const value = get(field.ref);

  if (TriState.Inherit === value) {
    return TriState.On === field.props.defaultValue;
  }

  return TriState.On === value;
};
