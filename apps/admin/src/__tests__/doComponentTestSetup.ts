import {type Component} from 'vue';
import {vi} from 'vitest';
import {config} from '@vue/test-utils';
import {createTestingPinia} from '@pinia/testing';
import {prefixComponent} from '../utils';
import {type AdminAppConfig, type AdminComponentMap} from '../types';
import {useQueryStore} from '../stores';
import {globalLogger, LogLevel} from '../services';
import {createContextPlugin, createLoggerPlugin, createRegisterComponentsPlugin, createVueQueryPlugin} from '../pdk';
import {type AdminComponent, allAdminComponentNames} from '../data';
import {mockDefaultAppConfig, mockDefaultConfig, mockDefaultLogger} from './mocks';

export const doComponentTestSetup = (components?: Partial<Record<AdminComponent, Component>>): void => {
  const logger = mockDefaultLogger();
  logger.level = LogLevel.Off;

  const appConfig: AdminAppConfig = {
    ...mockDefaultAppConfig(),
    config: {
      ...mockDefaultConfig(),
      components: components as AdminComponentMap,
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

  config.global.directives.test = vi.fn();

  const stubsArray = allAdminComponentNames.map((name) => [prefixComponent(name), true]);

  config.global.stubs = Object.fromEntries(stubsArray);
};
