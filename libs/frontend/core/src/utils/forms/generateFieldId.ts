import {ElementInstance} from '../../types';

export const generateFieldId = (element: ElementInstance): string => {
  return `${element.form.name}-${element.name}`;
};
