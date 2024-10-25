import {set} from 'lodash-unified';
import {type AnyElementInstance, type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {type PropVal} from '../types/common.types';

export type FormPropSetter = (prop: string, value: PropVal, target?: string) => void;

export const createPropSetter = (instance: InteractiveElementInstance, prefix: string): FormPropSetter => {
  return (prop, value, target) => {
    let field: AnyElementInstance;

    if (target) {
      field = instance.form.getField(`${prefix}${target}`);
    } else {
      field = instance;
    }

    set(field.props, prop, value);
  };
};
