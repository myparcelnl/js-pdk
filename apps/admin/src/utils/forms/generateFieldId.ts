import {unref} from 'vue';
import {type MaybeRef} from '@vueuse/core';
import {type InteractiveElementInstance, useElement} from '@myparcel/vue-form-builder';
import {type ElementInstance} from '../../types/form.types';
import {type FORM_KEYS} from '../../forms/formKeys';
import {useAdminConfig} from '../../composables/useAdminConfig';

export const generateFieldId = (element?: MaybeRef<ElementInstance>): string => {
  const config = useAdminConfig();
  const resolvedElement = unref(element) ?? useElement();

  const formBaseName = resolvedElement.form.name.split('--')[0] as (typeof FORM_KEYS)[number];

  const method = config.formConfigOverrides?.[formBaseName]?.generateFieldId ?? config.generateFieldId;

  return method(resolvedElement as InteractiveElementInstance);
};
