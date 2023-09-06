import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {type ElementInstance} from '../../types';
import {type FORM_KEYS, useAdminConfig, useElement} from '../../index';

export const generateFieldId = (element?: ElementInstance): string => {
  const config = useAdminConfig();
  const resolvedElement = element ?? useElement();

  const formBaseName = resolvedElement.form.name.split('--')[0] as (typeof FORM_KEYS)[number];

  const method = config.formConfigOverrides?.[formBaseName]?.generateFieldId ?? config.generateFieldId;

  return method(resolvedElement as InteractiveElementInstance);
};
