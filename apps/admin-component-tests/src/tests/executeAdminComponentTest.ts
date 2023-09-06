/* eslint-disable no-magic-numbers */
import {type Component} from 'vue';
import {afterAll, afterEach, beforeAll, beforeEach, describe, test, vi} from 'vitest';
import {type QueryKey} from '@tanstack/vue-query';
import {type AdminComponent, type AdminView} from '@myparcel-pdk/common';
import {type AdminInstance, createAdminConfig, createLogger} from '@myparcel-pdk/admin-core';
import {testMap} from './testMap';

export const executeAdminComponentTest = (name: AdminComponent, component: Omit<Component, 'props'>): void => {
  const componentTest = testMap[name];

  if (!componentTest) {
    // eslint-disable-next-line no-console
    console.warn(`No test found for component: ${name}`);
    return;
  }

  describe(name, () => {
    beforeEach(() => {
      vi.spyOn(console, 'log');
      vi.spyOn(console, 'warn');
      vi.spyOn(console, 'error');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    beforeAll(() => {
      vi.mock('@myparcel-pdk/admin-core', async () => ({
        // @ts-expect-error this works
        ...(await vi.importActual('@myparcel-pdk/admin-core')),
        useQueryStore: () => ({
          get(queryKey: QueryKey) {
            return vi.fn(() => queryKey);
          },
          has: () => true,
        }),
      }));

      vi.mock('../usePdkInstance', () => ({
        usePdkInstance: (): AdminInstance => ({
          appName: 'test',
          config: createAdminConfig(),
          context: {},
          logger: createLogger('test'),
          view: 'test' as AdminView,
        }),
      }));
    });

    test(name, () => {
      componentTest(component);
    });

    afterAll(() => {
      vi.restoreAllMocks();
    });
  });
};
