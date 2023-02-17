import {AdminContextObject} from '../../types';
import {globalLogger} from '../logger';

export const getElementContext = (selector: string): AdminContextObject => {
  const element = document.querySelector(selector);
  const context = element?.getAttribute('data-pdk-context');
  const parsedContext = context ? JSON.parse(context) : null;

  if (parsedContext && Object.keys(parsedContext).length) {
    globalLogger.info(`Found context in ${selector}`, parsedContext);
    element?.removeAttribute('data-pdk-context');
    return parsedContext;
  }

  globalLogger.info(`No context found in ${selector}`);
  return {} as AdminContextObject;
};
