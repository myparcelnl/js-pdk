import {inject, provide} from 'vue';
import {merge} from 'lodash-unified';
import {type AdminInstance} from '../types';
import {INJECT_ADMIN_INSTANCE} from '../data';

export const extendAdminInstance = (data: Partial<AdminInstance>): void => {
  const instance = inject(INJECT_ADMIN_INSTANCE);

  provide(INJECT_ADMIN_INSTANCE, merge({}, instance, data));
};
