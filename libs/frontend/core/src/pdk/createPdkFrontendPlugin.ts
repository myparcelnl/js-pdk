import {INJECT_GLOBAL_PDK_FRONTEND} from '../data';
import {PdkConfiguration} from '../types';
import {Plugin} from 'vue';
import {createPdkFrontend} from './index';

export const createPdkFrontendPlugin = (options: PdkConfiguration): Plugin => {
  return {
    install(app) {
      const pdkFrontend = createPdkFrontend(options);

      app.provide(INJECT_GLOBAL_PDK_FRONTEND, pdkFrontend);
    },
  };
};
