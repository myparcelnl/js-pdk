import {PdkContextObject} from '../types';
import {PdkAdmin} from '../pdk';

export const sendBootEvent = (pdkAdmin: PdkAdmin, context: PdkContextObject): void => {
  const globalContext = context.global;

  if (!globalContext) {
    throw new Error('Global context not found');
  }

  document.dispatchEvent(new CustomEvent(globalContext.event, {detail: pdkAdmin}));
};
