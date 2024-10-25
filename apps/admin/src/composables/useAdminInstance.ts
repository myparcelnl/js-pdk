import {inject} from 'vue';
import {type AdminInstance} from '../types/admin.types';
import {INJECT_ADMIN_INSTANCE} from '../symbols';

export const useAdminInstance = (): AdminInstance => {
  const instance = inject(INJECT_ADMIN_INSTANCE);

  if (!instance) {
    throw new Error('No PDK instance found');
  }

  return instance;
};
