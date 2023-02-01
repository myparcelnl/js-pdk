import {ContextKey, PdkContextObject} from '../../types';
import {useContext} from './useContext';

export const useGlobalContext = (): PdkContextObject['global'] => {
  return useContext(ContextKey.GLOBAL);
};
