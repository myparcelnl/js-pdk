import {ElementInstance} from '../../types';
import {useElement} from '../../index';

export const generateFieldId = (element?: ElementInstance): string => {
  const resolvedElement = element ?? useElement();

  return `${resolvedElement.form.name}-${resolvedElement.name}`;
};
