import {type AdminContextObject} from '../types';
import {globalLogger} from '../services';
import {sendBootEvent} from './sendBootEvent';
import {type PdkAdmin} from './PdkAdmin';

/**
 * Sends the boot event now and again on every ping, until the instance is
 * disposed. The listener and its cleanup exist before the first event, so a
 * handler of that event can already dispose the instance.
 */
export const boot = (pdkAdmin: PdkAdmin, context: AdminContextObject): void => {
  const onPing = () => {
    sendBootEvent(pdkAdmin, context);
  };

  document.addEventListener(context.global.eventPing, onPing);
  pdkAdmin.onDispose(() => {
    document.removeEventListener(context.global.eventPing, onPing);
  });

  sendBootEvent(pdkAdmin, context);

  globalLogger.debug('Created PDK admin!', {context});
};
