import {PdkContextObject} from '../../types';
import {useGlobalContext} from './useGlobalContext';

export const usePluginSettings = (): PdkContextObject['global']['pluginSettings'] => {
  const globalContext = useGlobalContext();

  return globalContext.pluginSettings;
};
