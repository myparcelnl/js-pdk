import {type AdminContextObject} from '../types';
import {globalLogger} from '../services';
import {sendBootEvent} from './sendBootEvent';
import {type PdkAdmin} from './PdkAdmin';

export const boot = (pdkAdmin: PdkAdmin, context: AdminContextObject): void => {
  sendBootEvent(pdkAdmin, context);

  document.addEventListener(context.global.eventPing, () => {
    sendBootEvent(pdkAdmin, context);
  });

  globalLogger.debug('Created PDK admin!', {context});
};
