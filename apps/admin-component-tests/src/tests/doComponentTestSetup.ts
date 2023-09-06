import {config} from '@vue/test-utils';
import {optionalAdminPlainWrapperComponentNames, requiredAdminComponentNames} from '@myparcel-pdk/common';
import {
  createContextPlugin,
  createLoggerPlugin,
  createVueQueryPlugin,
  globalLogger,
  LogLevel,
} from '@myparcel-pdk/admin-core';
import {createDefaultAppConfig} from './setup';

export const doComponentTestSetup = (): void => {
  const appConfig = createDefaultAppConfig();

  globalLogger.level = LogLevel.Off;

  config.global.plugins = [
    // createTestingPinia({createSpy: vi.fn}),
    createVueQueryPlugin(appConfig),
    createContextPlugin(appConfig),
    createLoggerPlugin(appConfig),
  ];

  [...requiredAdminComponentNames, ...optionalAdminPlainWrapperComponentNames].forEach((name) => {
    config.global.stubs[name] = true;
  });
};

export const doComponentTestTeardown = (): void => {
  config.global.plugins = [];
  config.global.stubs = {};
};
