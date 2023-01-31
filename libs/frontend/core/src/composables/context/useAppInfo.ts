import {PdkContextObject} from '../../types';
import {useGlobalContext} from './useGlobalContext';

export const useAppInfo = (): PdkContextObject['global']['appInfo'] => {
  const globalContext = useGlobalContext();

  return globalContext.appInfo;
};
