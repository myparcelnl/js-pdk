import {createApp} from 'vue';
import {describe, expect, it, vi} from 'vitest';
import {createPinia, defineStore, type Pinia} from 'pinia';
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

  it('calls onCreateStore once for every pdk admin instance store', () => {
    const onCreateStore = vi.fn();
    const useTestStore = defineStore('test', {state: () => ({value: 1})});

    const useStoreIn = (store: Pinia) => {
      const app = createApp({render: () => null});

      app.use(createStorePlugin(createAppConfig({store, config: {onCreateStore} as never})));
      app.use(createStorePlugin(createAppConfig({store, config: {onCreateStore} as never})));
      app.runWithContext(() => useTestStore(store));
    };

    useStoreIn(createPinia());
    useStoreIn(createPinia());

    expect(onCreateStore).toHaveBeenCalledTimes(2);
  });
});
