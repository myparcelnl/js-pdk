import {Pinia, createPinia} from 'pinia';
import {FinalPdkConfiguration} from '../config/types';
import {log} from '../../services/logging';

let store: Pinia;
let initialized = false;

type CreateStore = (config?: FinalPdkConfiguration) => Pinia;

export const createStore: CreateStore = (config) => {
  store ??= createPinia();

  store.use((storeContext) => {
    if (initialized || !config?.onCreateStore) {
      return;
    }

    initialized = true;
    log('Calling store setup hook');
    config.onCreateStore(storeContext);
  });

  return store;
};
