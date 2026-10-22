import {createPinia, type Pinia} from 'pinia';
import {type PdkAppPlugin} from './plugins.types';

let store: Pinia;

/**
 * The stores that ran the onCreateStore hook. Per store, because every PdkAdmin
 * instance has its own.
 */
const initializedStores = new WeakSet<Pinia>();

export const createStorePlugin: PdkAppPlugin = ({config, logger, store: instanceStore}) => {
  const pinia = instanceStore ?? (store ??= createPinia());

  logger.debug('Preparing store plugin');

  pinia.use((storeContext) => {
    if (initializedStores.has(pinia) || !config.onCreateStore) {
      return;
    }

    initializedStores.add(pinia);
    logger.debug('Calling store renderer hook');
    config.onCreateStore(storeContext);
  });

  return pinia;
};
