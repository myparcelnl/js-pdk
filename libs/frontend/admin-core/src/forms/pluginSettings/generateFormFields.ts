import {ref, toRaw} from 'vue';
import {type Plugin} from '@myparcel-pdk/common';
import {
  type AnyElementConfiguration,
  defineField,
  type InteractiveElementConfiguration,
} from '@myparcel/vue-form-builder';
import {resolveFormComponent} from '../helpers';
import {createFormStateWatcher} from '../../forms';

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
    const {
      $attributes,
      $component,
      $disabledWhen,
      $readOnlyWhen,
      $slot,
      $visibleWhen,
      $wrapper,
      label,
      name,
      ...props
    } = data;

    const common: AnyElementConfiguration = {
      component: resolveFormComponent($component),
      props: {...props},
      attributes: {...$attributes},
      optional: true,
      slots: $slot ? {default: () => $slot} : undefined,
      wrapper: $wrapper && typeof $wrapper === 'string' ? resolveFormComponent($wrapper) : undefined,
    };

    if ($visibleWhen) {
      common.visibleWhen = createFormStateWatcher($visibleWhen, prefix);
    }

    // Plain element
    if (!label || !name) {
      return defineField(common);
    }

    if ($disabledWhen) {
      common.disabledWhen = createFormStateWatcher($disabledWhen, prefix);
    }

    if ($readOnlyWhen) {
      common.readOnlyWhen = createFormStateWatcher($readOnlyWhen, prefix);
    }

    return defineField({
      ...common,
      name: prefix + name,
      ref: ref(toRaw(values?.[name])),
      label,
    } as InteractiveElementConfiguration);
  });
};
