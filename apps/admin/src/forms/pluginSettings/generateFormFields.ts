import {ref, toRaw} from 'vue';
import {type Plugin} from '@myparcel-dev/pdk-common';
import {
  type AnyElementConfiguration,
  defineField,
  type InteractiveElementConfiguration,
} from '@myparcel-dev/vue-form-builder';
import {defineFormField, resolveFormComponent} from '../helpers';
import {type FormBuilder, parseBuilders} from '../form-builder';
import {type AdminComponent} from '../../data';

type GenerateFormFields = (
  config: {
    fields: null | Plugin.Field[];
    values: Record<string, unknown>;
  },
  prefix?: string,
) => AnyElementConfiguration[];

export const generateFormFields: GenerateFormFields = ({fields, values}, prefix = '') => {
  if (!fields) {
    return [];
  }

  return fields.map((data) => {
    const {$attributes, $component, $slot, $wrapper, label, name, $builders, ...props} = toRaw(data);

    const common = {
      component: resolveFormComponent($component as AdminComponent),
      props: {...props},
      attributes: {...$attributes},
      optional: true,
      slots: $slot ? {default: () => $slot} : undefined,
      wrapper: $wrapper && typeof $wrapper === 'string' ? resolveFormComponent($wrapper as AdminComponent) : undefined,
      ...parseBuilders(($builders ?? []) as FormBuilder[], prefix),
    } as AnyElementConfiguration;

    // Plain element
    if (!label || !name) {
      return defineField(common);
    }

    return defineFormField({
      ...common,
      name: prefix + name,
      ref: ref(toRaw(values?.[name])),
      label,
    } as InteractiveElementConfiguration);
  });
};
