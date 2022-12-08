import {PdkContextObject} from '../../types';
import {logger} from '@myparcel-pdk/common';

export const getElementContext = (selector: string): Partial<PdkContextObject> => {
  const element = document.querySelector(selector);
  const context = element?.getAttribute('data-pdk-context');
  const parsedContext = context ? JSON.parse(context) : null;

  if (parsedContext && Object.keys(parsedContext).length) {
    element?.removeAttribute('data-pdk-context');
    return parsedContext;
  }

  logger.info(`No context found in ${selector}`);
  return {};
};
