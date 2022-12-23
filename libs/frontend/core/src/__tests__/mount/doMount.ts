import {EndpointName, componentNames} from '@myparcel-pdk/common';
import {LogLevel, createLogger, globalLogger} from '../../services';
import {MountingOptions, mount as vtuMount, shallowMount as vtuShallowMount} from '@vue/test-utils';
import {PdkFrontendAppConfig, createContextPlugin, createStorePlugin} from '../../pdk';
import {Component} from 'vue';
import {PdkContextObject} from '../../types';

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
  config: {components: {}, logLevel: LogLevel.OFF},
  context,
};

export const doMount = <R extends typeof vtuMount | typeof vtuShallowMount>(
  mountFunction: R,
  component: Component,
  options: MountingOptions<Component>,
): ReturnType<R> => {
  globalLogger.level = LogLevel.OFF;

  options ??= {};
  options.global ??= {};
  options.global.provide ??= {};
  options.global.stubs ??= {};
  options.global.plugins ??= [];
  options.global.plugins.push(createStorePlugin(appConfig));
  options.global.plugins.push(createContextPlugin(appConfig));

  componentNames.forEach((name) => {
    // @ts-expect-error todo
    options.global.stubs[name] = true;
  });

  // @ts-expect-error todo
  return mountFunction(component, options);
};
