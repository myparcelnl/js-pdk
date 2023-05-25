import {Plugin} from 'vue';
import {AdminConfiguration, AdminContextObject} from '../types';
import {globalLogger} from '../services';
import {setupAdminApp} from './setupAdminApp';

export const createPdkAdminPlugin = (config: AdminConfiguration, context: AdminContextObject): Plugin => {
  return {
    install(app) {
      setupAdminApp(app, {appName: '', config, context, logger: globalLogger});
    },
  };
};
