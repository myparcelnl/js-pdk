import {PdkContextObject} from '../types';
import {PdkFrontend} from '../pdk';

export const sendBootEvent = (pdkFrontend: PdkFrontend, context: PdkContextObject): void => {
  const globalContext = context.global;

  if (!globalContext) {
    throw new Error('Global context not found');
  }

  document.dispatchEvent(new CustomEvent(globalContext.event, {detail: pdkFrontend}));
};
