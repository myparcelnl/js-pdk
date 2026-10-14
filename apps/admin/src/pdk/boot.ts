import {type AdminContextObject} from '../types';
import {globalLogger} from '../services';
import {sendBootEvent} from './sendBootEvent';
import {type PdkAdmin} from './PdkAdmin';

/**
 * Sends the boot event now and again on every ping.
 *
 * @returns a function that stops answering pings
 */
export const boot = (pdkAdmin: PdkAdmin, context: AdminContextObject): (() => void) => {
  const onPing = () => {
    sendBootEvent(pdkAdmin, context);
  };

  sendBootEvent(pdkAdmin, context);
  document.addEventListener(context.global.eventPing, onPing);

  globalLogger.debug('Created PDK admin!', {context});

  return () => {
    document.removeEventListener(context.global.eventPing, onPing);
  };
};
