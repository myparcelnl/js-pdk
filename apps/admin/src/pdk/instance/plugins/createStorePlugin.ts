import {createPinia, type Pinia} from 'pinia';
import {type PdkAppPlugin} from './plugins.types';

let store: Pinia;
let initialized = false;

export const createStorePlugin: PdkAppPlugin = ({config, logger, store: instanceStore}) => {
  const pinia = instanceStore ?? (store ??= createPinia());

  logger.debug('Preparing store plugin');

  pinia.use((storeContext) => {
    if (initialized || !config.onCreateStore) {
      return;
    }

    initialized = true;
    logger.debug('Calling store renderer hook');
    config.onCreateStore(storeContext);
  });

  return pinia;
};
