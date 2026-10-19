import {createApp, inject} from 'vue';
import {describe, expect, it} from 'vitest';
import {createPinia} from 'pinia';
import {QueryClient} from '@tanstack/vue-query';
import {type AdminAppConfig, type AdminInstance} from '../../../types';
import {INJECT_ADMIN_INSTANCE} from '../../../symbols';
import {createContextPlugin} from './createContextPlugin';

describe('createContextPlugin', () => {
  it('gives the admin instance the store and query client of its PdkAdmin', () => {
    const store = createPinia();
    const queryClient = new QueryClient();
    const app = createApp({render: () => null});

    app.use(
      createContextPlugin({
        appName: 'test',
        config: {},
        context: {},
        logger: {debug: () => undefined},
        store,
        queryClient,
      } as unknown as AdminAppConfig),
    );

    const instance = app.runWithContext(() => inject(INJECT_ADMIN_INSTANCE)) as AdminInstance;

    expect(instance.store).toBe(store);
    expect(instance.queryClient).toBe(queryClient);
  });
});
