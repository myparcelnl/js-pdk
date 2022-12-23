import {INJECT_PDK_INSTANCE, PdkInstance} from '../data';
import {inject} from 'vue';

export const usePdkInstance = (): PdkInstance => {
  const instance = inject(INJECT_PDK_INSTANCE);

  if (!instance) {
    throw new Error('No instance found');
  }

  return instance;
};
