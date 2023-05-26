/* eslint-disable no-magic-numbers */
import {type Component} from 'vue';
import {afterAll, beforeAll, describe, vi} from 'vitest';
import {type QueryKey} from '@tanstack/vue-query';
import {type AdminInstance, createAdminConfig, createLogger} from '@myparcel-pdk/frontend-admin-core';
import {type AdminComponent, type AdminView} from '@myparcel-pdk/common';
import {testMap} from './testMap';

export const executeAdminComponentTest = (name: AdminComponent, component: Omit<Component, 'props'>): void => {
  const test = testMap[name];

  if (!test) {
    // eslint-disable-next-line no-console
    console.warn(`No test found for component: ${name}`);
    return;
  }

  describe(name, () => {
    beforeAll(() => {
      vi.mock('@myparcel-pdk/frontend-admin-core', async () => ({
        // @ts-expect-error this works
        ...(await vi.importActual('@myparcel-pdk/frontend-admin-core')),
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

    test(component);

    afterAll(() => {
      vi.restoreAllMocks();
    });
  });
};
