import {type AdminContextObject} from '../types';
import {type PdkAdmin} from './PdkAdmin';

export const sendBootEvent = (pdkAdmin: PdkAdmin, context: AdminContextObject): void => {
  const globalContext = context.global;

  if (!globalContext) {
    throw new Error('Global context not found');
  }

  document.dispatchEvent(new CustomEvent(globalContext.eventPong, {detail: pdkAdmin}));
};
