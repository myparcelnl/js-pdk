import {AnyElementConfiguration, defineField} from '@myparcel/vue-form-builder';
import {Form} from '@myparcel-pdk/common/src';
import {RequireOnly} from '@myparcel/ts-utils';
import {ref} from 'vue';
import {resolveFormComponent} from './resolveFormComponent';

type FormField = RequireOnly<Form.ModelInputBaseInput, 'name' | 'type' | 'label'>;

type GenerateFormFields = (
  config: {fields: FormField[]; values: Record<string, unknown>},
  prefix?: string,
) => AnyElementConfiguration[];

export const generateFormFields: GenerateFormFields = ({fields, values}, prefix) => {
  return fields.map((data) => {
    const {type, name, label, ...props} = data;

    return defineField({
      name: `${prefix}${name}`,
      label: label,
      component: resolveFormComponent(type),
      ref: ref(values[name]),
      props,
    });
  });
};
