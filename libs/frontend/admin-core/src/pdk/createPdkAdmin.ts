import {sendBootEvent} from '../utils';
import {AdminConfiguration} from '../types';
import {getElementContext, globalLogger} from '../services';
import {createAdminConfig} from './createAdminConfig';
import {PdkAdmin} from './PdkAdmin';

export type CreatePdkAdmin = (configuration?: AdminConfiguration) => undefined | PdkAdmin;

/**
 * Must match \MyParcelNL\Pdk\Plugin\Service\Frontend::BOOTSTRAP_CONTAINER_ID.
 *
 * @see https://github.com/myparcelnl/pdk/blob/main/src/Frontend/Service/FrontendRenderService.php
 */
const BOOTSTRAP_CONTAINER_SELECTOR = '#myparcel-pdk-boot';

/**
 * Initialize the pdk frontend, parse configuration, and send a boot event that triggers the
 * components to render themselves using the PdkAdmin class.
 */
export const createPdkAdmin: CreatePdkAdmin = (configuration?) => {
  try {
    const config = createAdminConfig(configuration);
    const context = getElementContext(BOOTSTRAP_CONTAINER_SELECTOR);

    const pdkAdmin = new PdkAdmin(config, context);

    if (config.logLevel) {
      globalLogger.level = config.logLevel;
    }

    sendBootEvent(pdkAdmin, context);
    globalLogger.debug('Created PDK admin!', {context});

    return pdkAdmin;
  } catch (e) {
    globalLogger.error('Failed to create PDK admin:');

    // eslint-disable-next-line no-console
    console.error(e);
  }
};
