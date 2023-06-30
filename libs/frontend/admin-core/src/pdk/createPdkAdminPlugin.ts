import {type Plugin} from 'vue';
import {createAdminConfig} from '@myparcel-pdk/frontend-admin-core';
import {type AdminConfiguration, type AdminContextObject} from '../types';
import {globalLogger} from '../services';
import {setupAdminApp} from './setupAdminApp';

export const createPdkAdminPlugin = (config: AdminConfiguration, context: AdminContextObject): Plugin => {
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
