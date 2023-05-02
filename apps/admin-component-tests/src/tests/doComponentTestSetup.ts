import {
  AdminAppConfig,
  AdminContextObject,
  LogLevel,
  createContextPlugin,
  createLogger,
  createVueQueryPlugin,
  globalLogger,
} from '@myparcel-pdk/frontend-admin-core/src';
import {
  AdminComponentMap,
  AdminView,
  BackendEndpoint,
  optionalAdminPlainWrapperComponentNames,
  requiredAdminComponentNames,
} from '@myparcel-pdk/common/src';
import {config} from '@vue/test-utils';

// eslint-disable-next-line max-lines-per-function
const createDefaultAppConfig = (): AdminAppConfig => {
  return {
    appName: 'test',
    config: {
      components: {} as AdminComponentMap,
      logLevel: LogLevel.Off,
    },
    context: {
      global: {
        appInfo: {
          name: 'test',
          version: '1.0.0',
          path: '/test',
          title: 'test',
          url: 'http://test.com',
        },
        baseUrl: '',
        bootId: '',
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
        event: 'test',
        language: 'en-US',
        mode: '',
        platform: {
          backofficeUrl: 'https://backoffice.test.com',
          defaultCarrier: 'postnl',
          defaultCarrierId: 1,
          human: 'Test',
          localCountry: 'NL',
          name: 'test',
        },
        pluginSettings: {
          carrier: {},
          checkout: {},
          customs: {},
          general: {},
          label: {},
          order: {},
        },
        translations: {},
      },
    },
    logger: createLogger('test'),
    view: AdminView.OrderBox,
  } as AdminAppConfig;
};

export const doComponentTestSetup = (): void => {
  const appConfig = createDefaultAppConfig();

  globalLogger.level = LogLevel.Off;

  config.global.plugins = [
    // createTestingPinia({createSpy: vi.fn}),
    createVueQueryPlugin(appConfig),
    createContextPlugin(appConfig),
    // createLoggerPlugin(appConfig),
  ];

  // config.global.provide ??= {};
  // // @ts-expect-error yes we can
  // config.global.provide[INJECT_PDK_INSTANCE] = {...appConfig, context: {}};

  [...requiredAdminComponentNames, ...optionalAdminPlainWrapperComponentNames].forEach((name) => {
    config.global.stubs[name] = true;
  });
};

export const doComponentTestTeardown = (): void => {
  config.global.plugins = [];
  config.global.stubs = {};
};
