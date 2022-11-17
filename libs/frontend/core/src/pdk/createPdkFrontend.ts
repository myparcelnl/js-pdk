import {logError, logSuccess} from '@myparcel-pdk/frontend-shared';
import {GlobalPdkFrontend} from './GlobalPdkFrontend';
import {InputPdkConfiguration} from '../types';
import {createPdkConfig} from './createPdkConfig';
import {isOfType} from '@myparcel/ts-utils';
import {sendBootEvent} from './sendBootEvent';

export type CreatePdkFrontend = (configuration?: InputPdkConfiguration) => undefined | GlobalPdkFrontend;

export const createPdkFrontend: CreatePdkFrontend = (configuration?) => {
  try {
    const config = createPdkConfig(configuration);
    const pdkFrontend = new GlobalPdkFrontend(config);

    sendBootEvent(pdkFrontend);
    logSuccess('Created PDK core!', config.context);

    return pdkFrontend;
  } catch (e) {
    if (isOfType<Error>(e, 'message')) {
      logError('Failed to create PDK core:', e.message);
      return;
    }

    // eslint-disable-next-line no-console
    console.error(e);
  }
};
