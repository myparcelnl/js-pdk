import {
  EndpointName,
  PdkComponentMap,
  optionalPlainWrapperComponentNames,
  requiredComponentNames,
} from '@myparcel-pdk/common';
import {
  LogLevel,
  PdkContextObject,
  PdkFrontendAppConfig,
  createContextPlugin,
  createLogger,
  createStorePlugin,
  globalLogger,
} from '@myparcel-pdk/frontend-core';
import {config} from '@vue/test-utils';

const context: PdkContextObject = {
  global: {
    event: 'test',
    language: 'en-US',
    pluginSettings: {
      label: {},
      carrier: {},
      checkout: {},
      customs: {},
      general: {},
      order: {},
    } as PdkContextObject['global']['pluginSettings'],
    baseUrl: '',
    bootId: '',
    mode: '',
    endpoints: Object.keys(EndpointName).reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          body: '',
          headers: [],
          method: '',
          parameters: [],
          path: '',
          property: '',
        },
      }),
      {} as PdkContextObject['global']['endpoints'],
    ),
    translations: {},
  },
};

const appConfig: PdkFrontendAppConfig = {
  appName: 'test',
  logger: createLogger('test'),
  config: {components: {} as PdkComponentMap, logLevel: LogLevel.OFF},
  context,
};

export const doVitestSetup = (): void => {
  globalLogger.level = LogLevel.OFF;

  config.global.plugins = [createStorePlugin(appConfig), createContextPlugin(appConfig)];

  [...requiredComponentNames, ...optionalPlainWrapperComponentNames].forEach((name) => {
    config.global.stubs[name] = true;
  });
};
