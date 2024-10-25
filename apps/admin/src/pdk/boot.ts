import {type AdminContextObject} from '../types/context.types';
import {globalLogger} from '../services/logger';
import {sendBootEvent} from './sendBootEvent';
import {type PdkAdmin} from './PdkAdmin';

export const boot = (pdkAdmin: PdkAdmin, context: AdminContextObject): void => {
  sendBootEvent(pdkAdmin, context);

  document.addEventListener(context.global.eventPing, () => {
    sendBootEvent(pdkAdmin, context);
  });

  globalLogger.debug('Created PDK admin!', {context});
};
