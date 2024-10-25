import {get} from '@vueuse/core';
import {TriState} from '@myparcel-pdk/common';
import {type FormInstance} from '@myparcel/vue-form-builder';
import {type ElementInstance} from '../../types/form.types';
import {type TriStateInputProps} from '../../types/component-bindings.types';

export const triStateFieldIsEnabled = (form: FormInstance, fieldName: string): boolean => {
  const field = form.getField(fieldName) as unknown as ElementInstance<TriState, TriStateInputProps> | undefined;

  if (!field) {
    return false;
  }

  const value = get(field.ref);

  if (TriState.Inherit === value) {
    return TriState.On === field.props.defaultValue;
  }

  return TriState.On === value;
};
