import {vi} from 'vitest';
import {config} from '@vue/test-utils';
import {createTestingPinia} from '@pinia/testing';
import {prefixComponent} from '../utils/prefixComponent';
import {type AdminAppConfig, type AdminComponentMap} from '../types/admin.types';
import {useQueryStore} from '../stores/useQueryStore';
import {globalLogger, LogLevel} from '../services/logger';
import {testIdDirective} from '../pdk/testIdDirective';
import {createVueQueryPlugin} from '../pdk/instance/plugins/createVueQueryPlugin';
import {createRegisterComponentsPlugin} from '../pdk/instance/plugins/createRegisterComponentsPlugin';
import {createLoggerPlugin} from '../pdk/instance/plugins/createLoggerPlugin';
import {createContextPlugin} from '../pdk/instance/plugins/createContextPlugin';
import {allAdminComponentNames} from '../data/components';
import {mockDefaultAppConfig, mockDefaultConfig, mockDefaultLogger} from './mocks';

export const doComponentTestSetup = (components?: Partial<AdminComponentMap>): void => {
  const logger = mockDefaultLogger();
  logger.level = LogLevel.Off;

  const appConfig: AdminAppConfig = {
    ...mockDefaultAppConfig(),
    config: {
      ...mockDefaultConfig(),
      components: (components ?? {}) as AdminComponentMap,
    },
    logger,
  };

  globalLogger.level = LogLevel.Off;

  config.global.plugins = [
    createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    }),
    createVueQueryPlugin(appConfig),
    createContextPlugin(appConfig),
    createLoggerPlugin(appConfig),
    createRegisterComponentsPlugin(appConfig),
    (app) => {
      app.runWithContext(() => {
        useQueryStore().registerContextQueries();
      });
    },
  ];

  config.global.directives.test = testIdDirective;

  const stubsArray = allAdminComponentNames.map((name) => [prefixComponent(name), true]);

  config.global.stubs = Object.fromEntries(stubsArray);
};
