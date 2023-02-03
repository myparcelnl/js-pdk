import {INJECT_GLOBAL_PDK_ADMIN} from '../data';
import {PdkConfiguration} from '../types';
import {Plugin} from 'vue';
import {createPdkAdmin} from './index';

export const createPdkAdminPlugin = (options: PdkConfiguration): Plugin => {
  return {
    install(app) {
      const pdkAdmin = createPdkAdmin(options);

      app.provide(INJECT_GLOBAL_PDK_ADMIN, pdkAdmin);
    },
  };
};
