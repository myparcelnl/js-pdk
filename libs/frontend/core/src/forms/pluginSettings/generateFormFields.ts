import {AnyElementConfiguration, defineField} from '@myparcel/vue-form-builder';
import {Plugin} from '@myparcel-pdk/common';
import {ref} from 'vue';
import {resolveFormComponent} from '../resolveFormComponent';

type GenerateFormFields = (
  config: {
    fields: Plugin.Field[];
    values: Record<string, unknown>;
  },
  prefix?: string,
) => AnyElementConfiguration[];

export const generateFormFields: GenerateFormFields = ({fields, values}, prefix = '') => {
  return fields.map((data) => {
    const {name, $component, $slot, label, ...props} = data;

    const component = resolveFormComponent($component);

    console.log('generateFormFields', {name, $component, $slot, label, props});

    // Plain element
    if (!label || !name) {
      return defineField({
        slots: $slot ? {default: $slot} : undefined,
        wrapper: false,
        component,
        props,
      });
    }

    // Interactive element
    return defineField({
      name: prefix + name,
      ref: ref(values[name]),
      label,
      component,
      props,
    });
  });
};
