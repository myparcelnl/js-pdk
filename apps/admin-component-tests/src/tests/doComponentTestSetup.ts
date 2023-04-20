import {
  AdminAppConfig,
  AdminContextObject,
  LogLevel,
  createContextPlugin,
  createLogger,
  createStorePlugin,
  globalLogger,
} from '@myparcel-pdk/frontend-admin-core/src';
import {
  AdminComponentMap,
  BackendEndpoint,
  optionalAdminPlainWrapperComponentNames,
  requiredAdminComponentNames,
} from '@myparcel-pdk/common/src';
import {config} from '@vue/test-utils';

const context: AdminContextObject = {
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
    } as AdminContextObject['global']['pluginSettings'],
    baseUrl: '',
    bootId: '',
    mode: '',
    endpoints: Object.keys(BackendEndpoint).reduce(
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
      {} as AdminContextObject['global']['endpoints'],
    ),
    translations: {},
  },
};

const appConfig: AdminAppConfig = {
  appName: 'test',
  logger: createLogger('test'),
  config: {components: {} as AdminComponentMap, logLevel: LogLevel.Off},
  context,
};

export const doComponentTestSetup = (): void => {
  globalLogger.level = LogLevel.Off;

  config.global.plugins = [createStorePlugin(appConfig), createContextPlugin(appConfig)];

  // config.global.provide ??= {};
  // // @ts-expect-error yes we can
  // config.global.provide[INJECT_PDK_INSTANCE] = {...appConfig, context: {}};

  [...requiredAdminComponentNames, ...optionalAdminPlainWrapperComponentNames].forEach((name) => {
    config.global.stubs[name] = true;
  });
};
