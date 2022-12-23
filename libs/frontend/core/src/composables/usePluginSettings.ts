import {PdkContextObject} from '../types';
import {useContextStore} from '../stores';

export const usePluginSettings = (): PdkContextObject['global']['pluginSettings'] => {
  const contextStore = useContextStore();

  return contextStore.context.global.pluginSettings;
};
