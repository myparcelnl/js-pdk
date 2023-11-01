import {vi} from 'vitest';
import {config} from '@vue/test-utils';
import {createTestingPinia} from '@pinia/testing';
import {globalLogger, LogLevel} from '../services';
import {createContextPlugin, createLoggerPlugin, createVueQueryPlugin} from '../pdk';
import {optionalAdminPlainWrapperComponentNames, requiredAdminComponentNames} from '../data';
import {mockDefaultAppConfig} from './mocks';

export const doComponentTestSetup = (): void => {
  const appConfig = mockDefaultAppConfig();

  globalLogger.level = LogLevel.Off;

  config.global.plugins = [
    createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    }),
    createVueQueryPlugin(appConfig),
    createContextPlugin(appConfig),
    createLoggerPlugin(appConfig),
  ];

  [...requiredAdminComponentNames, ...optionalAdminPlainWrapperComponentNames].forEach((name) => {
    config.global.stubs[name] = true;
  });
};
