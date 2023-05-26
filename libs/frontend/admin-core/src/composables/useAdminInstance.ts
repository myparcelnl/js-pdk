import {inject} from 'vue';
import {type AdminInstance, INJECT_ADMIN_INSTANCE} from '../data';

export const useAdminInstance = (): AdminInstance => {
  const instance = inject(INJECT_ADMIN_INSTANCE);

  if (!instance) {
    throw new Error('No PDK instance found');
  }

  return instance;
};
