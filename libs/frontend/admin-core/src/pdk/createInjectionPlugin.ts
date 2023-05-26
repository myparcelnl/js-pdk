import {type Plugin} from 'vue';
import {type AdminConfiguration} from '../types';
import {INJECT_GLOBAL_PDK_ADMIN} from '../data';
import {createPdkAdmin} from './createPdkAdmin';

export const createInjectionPlugin = (options: AdminConfiguration): Plugin => {
  return {
    install(app) {
      const pdkAdmin = createPdkAdmin(options);

      app.provide(INJECT_GLOBAL_PDK_ADMIN, pdkAdmin);
    },
  };
};
