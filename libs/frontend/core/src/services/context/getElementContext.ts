import {PdkContextObject} from '../../types';
import {logWarning} from '@myparcel-pdk/frontend-shared';

export const getElementContext = (selector: string): Partial<PdkContextObject> => {
  const element = document.querySelector(selector);
  const context = element?.getAttribute('data-pdk-context');
  const parsedContext = context ? JSON.parse(context) : null;

  if (parsedContext && Object.keys(parsedContext).length) {
    element?.removeAttribute('data-pdk-context');
    return parsedContext;
  }

  logWarning(`No context found in ${selector}`);
  return {};
};
