import {type Plugin} from 'vue';
import {type AdminContextObject} from '../types/context.types';
import {type InputAdminConfiguration} from '../types/configuration.types';
import {globalLogger} from '../services/logger';
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
