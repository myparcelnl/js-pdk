/* eslint-disable max-nested-callbacks,@typescript-eslint/no-non-null-asserted-optional-chain */
import {type App, type Component} from 'vue';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {prefixComponent} from '../../../utils';
import {type AdminComponentMap} from '../../../types';
import {allAdminComponentNames, requiredAdminComponentNames} from '../../../data';
import {mockDefaultAppConfig} from '../../../__tests__';
import {createRegisterComponentsPlugin} from './createRegisterComponentsPlugin';

describe('createRegisterComponentsPlugin', () => {
  it.each([
    ['with prefix', true],
    ['without prefix', false],
  ])('registers components %s', (_, withPrefix) => {
    const registeredComponents: string[] = [];

    mockDefaultAppConfig.mockImplementationOnce(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const defaults = mockDefaultAppConfig.getMockImplementation()?.()!;

      return {
        ...defaults,
        config: {
          ...defaults?.config,
          components: requiredAdminComponentNames.reduce((acc, name) => {
            const resolvedName = withPrefix ? prefixComponent(name) : name;

            return {
              ...acc,
              [resolvedName]: {} as Component,
            };
          }, {} as AdminComponentMap),
        },
      };
    });

    const app = {
      component: vi.fn((name, component) => {
        if (component) {
          registeredComponents.push(name);
          return {name};
        }

        return registeredComponents.includes(name) ? {name} : undefined;
      }),
      use: vi.fn(),
    } as unknown as App;

    const plugin = createRegisterComponentsPlugin(mockDefaultAppConfig());

    expect(plugin).toHaveProperty('install');

    plugin?.install?.(app);

    expect(app.use).toHaveBeenCalledTimes(1);
    expect(registeredComponents).toEqual(allAdminComponentNames.map(prefixComponent));
  });
});
