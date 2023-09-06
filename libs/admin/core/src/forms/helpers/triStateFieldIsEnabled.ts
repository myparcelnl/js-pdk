import {get} from '@vueuse/core';
import {type FormInstance} from '@myparcel/vue-form-builder';
import {type ElementInstance} from '../../types';
import {TriState} from '../../data';
import {type TriStateElementProps} from '../../composables';

export const triStateFieldIsEnabled = (form: FormInstance, fieldName: string): boolean => {
  const field = form.getField(fieldName) as ElementInstance<TriStateElementProps> | undefined;

  if (!field) {
    return false;
  }

  const value = get(field.ref);

  if (TriState.Inherit === value) {
    return TriState.On === field.props.defaultValue;
  }

  return TriState.On === value;
};
