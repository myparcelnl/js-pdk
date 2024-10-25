import {type App} from 'vue';
import {type AdminAppConfig} from '../types/admin.types';
import {testIdDirective} from './testIdDirective';
import {createVueQueryPlugin} from './instance/plugins/createVueQueryPlugin';
import {createStorePlugin} from './instance/plugins/createStorePlugin';
import {createRegisterComponentsPlugin} from './instance/plugins/createRegisterComponentsPlugin';
import {createLoggerPlugin} from './instance/plugins/createLoggerPlugin';
import {createContextPlugin} from './instance/plugins/createContextPlugin';

export const setupAdminApp = (app: App<Element>, appConfig: AdminAppConfig): void => {
  app.use(createStorePlugin(appConfig));
  app.use(createVueQueryPlugin(appConfig));
  app.use(createContextPlugin(appConfig));
  app.use(createRegisterComponentsPlugin(appConfig));
  app.use(createLoggerPlugin(appConfig));

  app.directive('test', testIdDirective);
};
