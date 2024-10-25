import {type AdminContextObject} from '../../types/context.types';
import {useGlobalContext} from './useGlobalContext';

export const useAppInfo = (): AdminContextObject['global']['appInfo'] => {
  return useGlobalContext().appInfo;
};
