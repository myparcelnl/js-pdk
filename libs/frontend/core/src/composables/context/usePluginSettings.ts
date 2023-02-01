import {Plugin} from '@myparcel-pdk/common';
import {useContext} from './useContext';

export const usePluginSettings = (): Plugin.ModelContextDynamicContext['pluginSettings'] => {
  const context = useContext();

  if (!context.pluginSettings) {
    throw new Error(`No pluginSettings found`);
  }

  return context.pluginSettings;
};
