import {Pinia, createPinia} from 'pinia';
import {PdkAppPlugin} from '../types';
import {globalLogger} from '../../services';

let store: Pinia;
let initialized = false;

export const createStorePlugin: PdkAppPlugin = ({config}) => {
  store ??= createPinia();

  globalLogger.debug(`Preparing store plugin`);

  store.use((storeContext) => {
    if (initialized || !config.onCreateStore) {
      return;
    }

    initialized = true;
    globalLogger.debug(`Calling store renderer hook`);
    config.onCreateStore(storeContext);
  });

  return store;
};
