/* eslint-disable no-magic-numbers */
import {AdminComponent, AdminView} from '@myparcel-pdk/common';
import {AdminInstance, createAdminConfig, createLogger} from '@myparcel-pdk/frontend-admin-core';
import {afterAll, beforeAll, describe, vi} from 'vitest';
import {Component} from 'vue';
import {QueryKey} from '@tanstack/vue-query';
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
      vi.mock('@myparcel-pdk/frontend-admin-core/src', async () => ({
        // @ts-expect-error this works
        ...(await vi.importActual('@myparcel-pdk/frontend-admin-core/src')),
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
