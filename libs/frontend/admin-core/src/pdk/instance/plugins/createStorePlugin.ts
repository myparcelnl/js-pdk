import {Pinia, createPinia} from 'pinia';
import {PdkAppPlugin} from './plugins.types';

let store: Pinia;
let initialized = false;

export const createStorePlugin: PdkAppPlugin = ({config, logger}) => {
  store ??= createPinia();

  logger.debug('Preparing store plugin');

  store.use((storeContext) => {
    if (initialized || !config.onCreateStore) {
      return;
    }

    initialized = true;
    logger.debug('Calling store renderer hook');
    config.onCreateStore(storeContext);
  });

  return store;
};
