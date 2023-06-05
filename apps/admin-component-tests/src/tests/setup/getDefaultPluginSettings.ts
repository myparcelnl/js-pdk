import {vi} from 'vitest';
import {type Plugin} from '@myparcel-pdk/admin';

export const getDefaultPluginSettings = vi.fn((): Plugin.ModelContextDynamicContext['pluginSettings'] => ({
  account: {
    apiKey: 'test',
  },
  carrier: {},
  checkout: {} as Plugin.ModelContextDynamicContext['pluginSettings']['checkout'],
  customs: {} as Plugin.ModelContextDynamicContext['pluginSettings']['customs'],
  general: {} as Plugin.ModelContextDynamicContext['pluginSettings']['general'],
  label: {} as Plugin.ModelContextDynamicContext['pluginSettings']['label'],
  order: {} as Plugin.ModelContextDynamicContext['pluginSettings']['order'],
}));
