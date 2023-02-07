/* eslint-disable no-magic-numbers */
import {PdkAppInstance, createLogger, createPdkConfig} from '@myparcel-pdk/frontend-core/src';
import {afterAll, beforeAll, describe, vi} from 'vitest';
import {Component} from 'vue';
import {PdkComponentName} from '@myparcel-pdk/common/src';
import {testMap} from './testMap';

export const executePdkComponentTest = (name: PdkComponentName, component: Omit<Component, 'props'>): void => {
  const test = testMap[name];

  if (!test) {
    // eslint-disable-next-line no-console
    console.warn(`No test found for component: ${name}`);
    return;
  }

  describe(name, () => {
    beforeAll(() => {
      vi.mock('../usePdkInstance', () => ({
        usePdkInstance: (): PdkAppInstance => ({
          appName: 'test',
          context: {},
          config: createPdkConfig(),
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
