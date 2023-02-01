import {PdkContextObject} from '../../types';
import {useGlobalContext} from './useGlobalContext';

export const useAppInfo = (): PdkContextObject['global']['appInfo'] => {
  return useGlobalContext().appInfo;
};
