import {createApp} from 'vue';
import {describe, expect, it} from 'vitest';
import {QueryClient, useQueryClient} from '@tanstack/vue-query';
import {AdminContextKey, BackendEndpoint} from '@myparcel-dev/pdk-common';
import {type AdminAppConfig} from '../../../types';
import {createVueQueryPlugin} from './createVueQueryPlugin';

const createAppConfig = (overrides: Partial<AdminAppConfig> = {}): AdminAppConfig =>
  ({
    appName: 'test',
    config: {},
    context: {[AdminContextKey.Global]: {mode: 'production'}},
    logger: {debug: () => undefined},
    ...overrides,
  } as unknown as AdminAppConfig);

describe('createVueQueryPlugin', () => {
  it('provides the query client of the pdk admin instance, filled with the context', () => {
    const queryClient = new QueryClient();
    const app = createApp({render: () => null});

    app.use(createVueQueryPlugin(createAppConfig({queryClient})));

    expect(app.runWithContext(() => useQueryClient())).toBe(queryClient);
    expect(queryClient.getQueryData([BackendEndpoint.FetchContext, AdminContextKey.Global])).toEqual({
      mode: 'production',
    });
  });
});
