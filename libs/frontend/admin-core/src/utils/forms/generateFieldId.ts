import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {type ElementInstance} from '../../types';
import {useElement, useAdminConfig} from '../../index';

export const generateFieldId = (element?: ElementInstance): string => {
  const config = useAdminConfig();
  const resolvedElement = element ?? useElement();

  return config.generateFieldId(resolvedElement as InteractiveElementInstance);
};
