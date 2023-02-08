import {AnyElementConfiguration, defineField} from '@myparcel/vue-form-builder/src';
import {InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
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
    const {name, $component, $visibleWhen, $slot, label, ...props} = data;
    const component = resolveFormComponent($component);

    const common: AnyElementConfiguration = {
      component,
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

    refs[name] ??= ref(values?.[name]);

    return defineField({
      ...common,
      name: prefix + name,
      ref: refs[name],
      label,
    } as InteractiveElementConfiguration);
  });
};
