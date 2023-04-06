import {AdminInstance, INJECT_ADMIN_INSTANCE} from '../data';
import {inject, provide} from 'vue';
import {merge} from 'lodash-unified';

export const extendAdminInstance = (data: Partial<AdminInstance>): void => {
  const instance = inject(INJECT_ADMIN_INSTANCE);

  provide(INJECT_ADMIN_INSTANCE, merge({}, instance, data));
};
