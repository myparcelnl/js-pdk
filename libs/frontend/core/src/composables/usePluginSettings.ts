import {GlobalContext} from '../types';
import {useContextStore} from '../stores';

export const usePluginSettings = (): GlobalContext['pluginSettings'] => {
  const contextStore = useContextStore();

  return contextStore.context.global.pluginSettings;
};
