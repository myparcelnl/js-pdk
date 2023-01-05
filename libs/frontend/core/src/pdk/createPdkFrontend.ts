import {getElementContext, globalLogger} from '../services';
import {PdkConfiguration} from '../types';
import {PdkFrontend} from './PdkFrontend';
import {createPdkConfig} from './createPdkConfig';
import {sendBootEvent} from '../utils';

export type CreatePdkFrontend = (configuration?: PdkConfiguration) => undefined | PdkFrontend;

/**
 * Must match \MyParcelNL\Pdk\Plugin\Service\RenderService::BOOTSTRAP_CONTAINER_ID.
 *
 * @see https://github.com/myparcelnl/pdk/blob/main/src/Plugin/Service/RenderService.php
 */
const BOOTSTRAP_CONTAINER_SELECTOR = '#myparcel-pdk-boot';

/**
 * Initialize the pdk frontend, parse configuration, and send a boot event that triggers the
 * components to render themselves using the PdkFrontend class.
 */
export const createPdkFrontend: CreatePdkFrontend = (configuration?) => {
  try {
    const config = createPdkConfig(configuration);
    const context = getElementContext(BOOTSTRAP_CONTAINER_SELECTOR);

    const pdkFrontend = new PdkFrontend(config, context);

    if (config.logLevel) {
      globalLogger.level = config.logLevel;
    }

    sendBootEvent(pdkFrontend, context);
    globalLogger.debug('Created PDK core!', {context});

    return pdkFrontend;
  } catch (e) {
    globalLogger.error('Failed to create PDK core:');

    // eslint-disable-next-line no-console
    console.error(e);
  }
};
