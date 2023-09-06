import {vi} from 'vitest';
import {type Plugin} from '@myparcel-pdk/admin-common';

export const mockDefaultPluginSettings = vi.fn((): Plugin.ModelContextDynamicContext['pluginSettings'] => {
  return {
    account: {
      apiKey: 'test',
    },
    carrier: {},
    checkout: {},
    customs: {},
    general: {},
    label: {},
    order: {},
  } as Plugin.ModelContextDynamicContext['pluginSettings'];
});
