import {type Plugin} from 'vue';
import {type AdminContextObject, type InputAdminConfiguration} from '../types';
import {globalLogger} from '../services';
import {setupAdminApp} from './setupAdminApp';
import {createAdminConfig} from './createAdminConfig';

export const createPdkAdminPlugin = (config: InputAdminConfiguration, context: AdminContextObject): Plugin => {
  return {
    install(app) {
      setupAdminApp(app, {
        appName: '',
        config: createAdminConfig(config),
        context,
        logger: globalLogger,
      });
    },
  };
};
