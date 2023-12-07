import {type FormInstance} from '@myparcel/vue-form-builder';
import {isOfType} from '@myparcel/ts-utils';
import {type ElementInstance} from '../../types';

type SetFieldProp = {
  (form: FormInstance, name: string, key: string, value: unknown): void;
  (field: ElementInstance, key: string, value: unknown, arg3?: never, arg4?: never): void;
};

export const setFieldProp: SetFieldProp = (arg1, arg2, arg3, arg4) => {
  let field = arg1;
  let key = arg2;
  let value = arg3;

  if (isOfType<FormInstance>(arg1, 'fields')) {
    const foundField = arg1.getField<ElementInstance>(arg2);

    if (!foundField) {
      throw new Error(`Field ${arg2} not found`);
    }

    field = foundField;
    key = arg3 as string;
    value = arg4;
  }

  if (!isOfType<ElementInstance>(field, 'form')) {
    return;
  }

  field.props[key] = value as never;
};
