/* eslint-disable no-magic-numbers */
import {type Component} from 'vue';
import {afterAll, beforeAll, beforeEach, describe, vi} from 'vitest';
import {
  type AdminComponent,
  type AdminInstance,
  type AdminView,
  createAdminConfig,
  createLogger,
} from '@myparcel-pdk/admin';
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
      vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    });

    beforeAll(() => {
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

    describe(name, () => {
      componentTest(component);
    });

    afterAll(() => {
      vi.restoreAllMocks();
    });
  });
};
