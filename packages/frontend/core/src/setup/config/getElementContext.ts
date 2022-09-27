import {PdkContextObject} from '@myparcel/pdk-frontend-shared';
import {logWarning} from '../../services/logging';

export const getElementContext = (id: string): Partial<PdkContextObject> => {
  const element = document.getElementById(id);
  const context = element?.getAttribute('data-core-context');
  const parsedContext = context ? JSON.parse(context) : null;

  if (parsedContext && Object.keys(parsedContext).length) {
    element?.removeAttribute('data-core-context');
    return parsedContext;
  }

  logWarning(`No context found in #${id}`);
  return {};
};
