import {ref, toRaw} from 'vue';
import {get} from '@vueuse/core';
import {type Plugin} from '@myparcel-pdk/common';
import {
  type AnyElementConfiguration,
  type InteractiveElementConfiguration,
  defineField,
} from '@myparcel/vue-form-builder';
import {resolveFormComponent} from '../helpers';

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
    const {name, $component, $visibleWhen, $slot, $wrapper, label, ...props} = data;

    const common: AnyElementConfiguration = {
      component: resolveFormComponent($component),
      props: {...props},
      slots: $slot ? {default: $slot} : undefined,
      wrapper: $wrapper && typeof $wrapper === 'string' ? resolveFormComponent($wrapper) : undefined,
    };

    if ($visibleWhen) {
      common.visibleWhen = (field) => {
        return Object.entries($visibleWhen).every(([fieldName, value]) => {
          return get(field.form.model[prefix + fieldName]?.ref) === value;
        });
      };
    }

    // Plain element
    if (!label || !name) {
      return defineField(common);
    }

    return defineField({
      ...common,
      name: prefix + name,
      ref: ref(toRaw(values?.[name])),
      label,
    } as InteractiveElementConfiguration);
  });
};
