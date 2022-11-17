import {INJECT_GLOBAL_PDK_FRONTEND} from '../data';
import {InputPdkConfiguration} from '../types';
import {Plugin} from 'vue';
import {createPdkFrontend} from './index';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PdkFrontendPlugin: Plugin = {
  install(app, options: InputPdkConfiguration) {
    const pdkFrontend = createPdkFrontend(options);

    app.provide(INJECT_GLOBAL_PDK_FRONTEND, pdkFrontend);
  },
};
