import {AnyElementConfiguration, InteractiveElementConfiguration, defineField} from '@myparcel/vue-form-builder/src';
import {Plugin} from '@myparcel-pdk/common/src';
import {ref} from 'vue';
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
    const {name, $component, $visibleWhen, $slot, label, ...props} = data;

    const common: AnyElementConfiguration = {
      component: resolveFormComponent($component),
      props: {...props},
    };

    if ($visibleWhen) {
      common.visibleWhen = (field) => {
        return Object.entries($visibleWhen).every(([fieldName, value]) => {
          return field.form.model[prefix + fieldName]?.ref.value === value;
        });
      };
    }

    // Plain element
    if (!label || !name) {
      return defineField({
        ...common,
        slots: $slot ? {default: $slot} : undefined,
        wrapper: false,
      });
    }

    return defineField({
      ...common,
      name: prefix + name,
      ref: ref(values?.[name]),
      label,
    } as InteractiveElementConfiguration);
  });
};
