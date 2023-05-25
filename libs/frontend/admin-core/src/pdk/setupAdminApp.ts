import {App} from 'vue';
import {AdminAppConfig} from '../data';
import {testIdDirective} from './testIdDirective';
import {
  createContextPlugin,
  createLoggerPlugin,
  createRegisterComponentsPlugin,
  createStorePlugin,
  createVueQueryPlugin,
} from './instance';

export const setupAdminApp = (app: App<Element>, appConfig: AdminAppConfig): void => {
  app.use(createStorePlugin(appConfig));
  app.use(createVueQueryPlugin(appConfig));
  app.use(createContextPlugin(appConfig));
  app.use(createRegisterComponentsPlugin(appConfig));
  app.use(createLoggerPlugin(appConfig));

  app.directive('test', testIdDirective);
};
