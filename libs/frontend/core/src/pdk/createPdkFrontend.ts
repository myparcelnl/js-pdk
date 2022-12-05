import {GlobalPdkFrontend} from './GlobalPdkFrontend';
import {InputPdkConfiguration} from '../types';
import {createPdkConfig} from './createPdkConfig';
import {isDef} from '@vueuse/core';
import {isOfType} from '@myparcel/ts-utils';
import {logger} from '@myparcel-pdk/frontend-shared';
import {sendBootEvent} from './utils/sendBootEvent';

export type CreatePdkFrontend = (configuration?: InputPdkConfiguration) => undefined | GlobalPdkFrontend;

export const createPdkFrontend: CreatePdkFrontend = (configuration?) => {
  try {
    const config = createPdkConfig(configuration);
    const pdkFrontend = new GlobalPdkFrontend(config);

    if (isDef(config.logLevel)) {
      logger.level = config.logLevel;
    }

    sendBootEvent(pdkFrontend);
    logger.debug('Created PDK core!', config.context);

    return pdkFrontend;
  } catch (e) {
    if (isOfType<Error>(e, 'message')) {
      logger.error('Failed to create PDK core:', e.message);
      return;
    }

    // eslint-disable-next-line no-console
    console.error(e);
  }
};
