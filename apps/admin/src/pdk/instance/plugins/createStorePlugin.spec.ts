import {describe, expect, it} from 'vitest';
import {createPinia} from 'pinia';
import {type AdminAppConfig} from '../../../types';
import {createStorePlugin} from './createStorePlugin';

const createAppConfig = (overrides: Partial<AdminAppConfig> = {}): AdminAppConfig =>
  ({
    appName: 'test',
    config: {},
    context: {},
    logger: {debug: () => undefined},
    ...overrides,
  } as unknown as AdminAppConfig);

describe('createStorePlugin', () => {
  it('uses the store of the pdk admin instance', () => {
    const store = createPinia();

    expect(createStorePlugin(createAppConfig({store}))).toBe(store);
  });

  it('shares one store between apps without an instance store', () => {
    expect(createStorePlugin(createAppConfig())).toBe(createStorePlugin(createAppConfig()));
  });
});
