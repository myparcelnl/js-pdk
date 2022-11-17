import {Pinia, createPinia} from 'pinia';
import {FinalPdkConfiguration} from '../../types';
import {logDebug} from '@myparcel-pdk/frontend-shared';

let store: Pinia;
let initialized = false;

type CreateStore = (config?: FinalPdkConfiguration) => Pinia;

export const createStorePlugin: CreateStore = (config) => {
  store ??= createPinia();

  store.use((storeContext) => {
    if (initialized || !config?.onCreateStore) {
      return;
    }

    initialized = true;
    logDebug('Calling store renderer hook');
    config.onCreateStore(storeContext);
  });

  return store;
};
