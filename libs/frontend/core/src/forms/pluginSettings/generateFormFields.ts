import {AnyElementConfiguration, defineField} from '@myparcel/vue-form-builder/src';
import {Ref, ref} from 'vue';
import {Plugin} from '@myparcel-pdk/common/src';
import {resolveFormComponent} from '../resolveFormComponent';

type GenerateFormFields = (
  config: {
    fields: null | Plugin.Field[];
    values: Record<string, unknown>;
  },
  prefix?: string,
) => AnyElementConfiguration[];

const refs: Record<string, Ref> = {};

export const generateFormFields: GenerateFormFields = ({fields, values}, prefix = '') => {
  if (!fields) {
    return [];
  }

  return fields.map((data) => {
    const {name, $component, $slot, label, ...props} = data;
    const component = resolveFormComponent($component);

    // Plain element
    if (!label || !name) {
      return defineField({
        slots: $slot ? {default: $slot} : undefined,
        wrapper: false,
        component,
        props: {...props},
      });
    }

    refs[name] ??= ref(values?.[name]);

    return defineField({
      name: prefix + name,
      ref: refs[name],
      label,
      component,
      props: {...props},
    });
  });
};
