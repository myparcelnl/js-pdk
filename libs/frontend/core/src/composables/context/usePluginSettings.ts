import {Plugin} from '@myparcel-pdk/common';
import {useDynamicContext} from './useDynamicContext';

export const usePluginSettings = (): Plugin.ModelContextDynamicContext['pluginSettings'] => {
  const dynamicContext = useDynamicContext();

  return dynamicContext.pluginSettings;
};
