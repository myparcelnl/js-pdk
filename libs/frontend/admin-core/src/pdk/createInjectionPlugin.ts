import {AdminConfiguration} from '../types';
import {INJECT_GLOBAL_PDK_ADMIN} from '../data';
import {Plugin} from 'vue';
import {createPdkAdmin} from './index';

export const createInjectionPlugin = (options: AdminConfiguration): Plugin => {
  return {
    install(app) {
      const pdkAdmin = createPdkAdmin(options);

      app.provide(INJECT_GLOBAL_PDK_ADMIN, pdkAdmin);
    },
  };
};
