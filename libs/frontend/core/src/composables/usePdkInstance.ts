import {INJECT_PDK_INSTANCE, PdkAppInstance} from '../data';
import {inject} from 'vue';

export const usePdkInstance = (): PdkAppInstance => {
  const instance = inject(INJECT_PDK_INSTANCE);

  if (!instance) {
    throw new Error('No instance found');
  }

  return instance;
};
