import {Pinia, createPinia} from 'pinia';
import {FinalPdkConfiguration} from '../../types';
import {logger} from '@myparcel-pdk/frontend-shared';

let store: Pinia;
let initialized = false;

type CreateStore = (config?: FinalPdkConfiguration) => Pinia;

export const createStorePlugin: CreateStore = (config) => {
  store ??= createPinia();

  logger.debug('Preparing store plugin');

  store.use((storeContext) => {
    if (initialized || !config?.onCreateStore) {
      return;
    }

    initialized = true;
    logger.debug('Calling store renderer hook');
    config.onCreateStore(storeContext);
  });

  return store;
};
