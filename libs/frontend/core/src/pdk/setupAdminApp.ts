import {
  createContextPlugin,
  createLoggerPlugin,
  createRegisterComponentsPlugin,
  createStorePlugin,
  createVueQueryPlugin,
} from './instance';
import {AdminAppConfig} from '../data';
import {App} from 'vue';
import {testIdDirective} from './testIdDirective';

export const setupAdminApp = (app: App<Element>, appConfig: AdminAppConfig): void => {
  app.use(createStorePlugin(appConfig));
  app.use(createVueQueryPlugin(appConfig));
  app.use(createContextPlugin(appConfig));
  app.use(createRegisterComponentsPlugin(appConfig));
  app.use(createLoggerPlugin(appConfig));

  app.directive('test', testIdDirective);
};
