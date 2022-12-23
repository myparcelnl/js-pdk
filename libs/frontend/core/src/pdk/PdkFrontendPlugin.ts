import {INJECT_GLOBAL_PDK_FRONTEND} from '../data';
import {PdkConfiguration} from '../types';
import {Plugin} from 'vue';
import {createPdkFrontend} from './index';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PdkFrontendPlugin: Plugin = {
  install(app, options: PdkConfiguration) {
    const pdkFrontend = createPdkFrontend(options);

    app.provide(INJECT_GLOBAL_PDK_FRONTEND, pdkFrontend);
  },
};
