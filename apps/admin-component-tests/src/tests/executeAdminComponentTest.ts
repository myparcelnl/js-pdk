/* eslint-disable no-magic-numbers */
import {AdminInstance, createAdminConfig, createLogger} from '@myparcel-pdk/frontend-core/src';
import {afterAll, beforeAll, describe, vi} from 'vitest';
import {AdminComponentName} from '@myparcel-pdk/common/src';
import {Component} from 'vue';
import {testMap} from './testMap';

export const executeAdminComponentTest = (name: AdminComponentName, component: Omit<Component, 'props'>): void => {
  const test = testMap[name];

  if (!test) {
    // eslint-disable-next-line no-console
    console.warn(`No test found for component: ${name}`);
    return;
  }

  describe(name, () => {
    beforeAll(() => {
      vi.mock('../usePdkInstance', () => ({
        usePdkInstance: (): AdminInstance => ({
          appName: 'test',
          context: {},
          config: createAdminConfig(),
          logger: createLogger('test'),
        }),
      }));
    });

    test(component);

    afterAll(() => {
      vi.restoreAllMocks();
    });
  });
};
